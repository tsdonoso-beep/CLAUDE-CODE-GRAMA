// src/components/lxp/QuizBlock.tsx
import { useState } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, RotateCcw, ArrowRight } from 'lucide-react'
import type { PreguntaQuiz } from '@/data/modulosLXP'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

interface QuizBlockProps {
  contenidoId: string
  titulo: string
  preguntas: PreguntaQuiz[]
  puntajeMinimo: number        // ej: 80
  bloqueaSiguiente?: boolean
  onAprobado?: () => void
  onReprobado?: () => void
}

type QuizEstado = 'inicio' | 'respondiendo' | 'resultado'

export function QuizBlock({
  contenidoId,
  titulo,
  preguntas,
  puntajeMinimo,
  onAprobado,
  onReprobado,
}: QuizBlockProps) {
  const { user } = useAuth()
  const [estado, setEstado] = useState<QuizEstado>('inicio')
  const [respuestas, setRespuestas] = useState<Record<string, number>>({})
  const [intentos, setIntentos] = useState(0)

  const totalPreguntas = preguntas.length

  function handleRespuesta(preguntaId: string, opcionIdx: number) {
    if (estado === 'resultado') return
    setRespuestas(prev => ({ ...prev, [preguntaId]: opcionIdx }))
    if (estado === 'inicio') setEstado('respondiendo')
  }

  async function handleEnviar() {
    setEstado('resultado')
    const nuevoIntento = intentos + 1
    setIntentos(nuevoIntento)
    const puntaje = calcularPuntaje()
    const aprobado = puntaje >= puntajeMinimo

    // Persistir resultado en Supabase (best-effort, sin bloquear UI)
    if (user) {
      supabase.from('quiz_resultados').insert({
        usuario_id:   user.id,
        contenido_id: contenidoId,
        intento:      nuevoIntento,
        puntaje,
        aprobado,
        respuestas,
      }).then(({ error }) => {
        if (error) console.warn('[QuizBlock] No se pudo guardar resultado:', error.message)
      })
    }

    if (aprobado) {
      onAprobado?.()
    } else {
      onReprobado?.()
    }
  }

  function handleReintentar() {
    setRespuestas({})
    setEstado('inicio')
  }

  function calcularPuntaje(): number {
    let correctas = 0
    preguntas.forEach(p => {
      if (respuestas[p.id] === p.correcta) correctas++
    })
    return Math.round((correctas / totalPreguntas) * 100)
  }

  const puntajeActual = estado === 'resultado' ? calcularPuntaje() : null
  const aprobado = puntajeActual !== null && puntajeActual >= puntajeMinimo
  const respondidas = Object.keys(respuestas).length
  const todasRespondidas = respondidas === totalPreguntas

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: '#e3f8fb' }}>
      {/* Header */}
      <div className="px-6 py-4" style={{ background: '#043941' }}>
        <h3 className="font-bold text-white text-base">{titulo}</h3>
        <p className="text-sm mt-0.5" style={{ color: '#02d47e' }}>
          {totalPreguntas} preguntas · Puntaje mínimo: {puntajeMinimo}%
        </p>
      </div>

      {/* Resultado banner */}
      {estado === 'resultado' && puntajeActual !== null && (
        <div
          className="px-6 py-4 flex items-center gap-4"
          style={{ background: aprobado ? '#d2ffe1' : '#fee2e2' }}
        >
          {aprobado ? (
            <CheckCircle2 size={32} color="#00c16e" />
          ) : (
            <XCircle size={32} color="#ef4444" />
          )}
          <div className="flex-1">
            <p className="font-bold text-lg" style={{ color: aprobado ? '#00c16e' : '#ef4444' }}>
              {aprobado ? '✅ Aprobado' : '❌ No aprobado'} — {puntajeActual}%
            </p>
            <p className="text-sm" style={{ color: '#043941' }}>
              {preguntas.filter(p => respuestas[p.id] === p.correcta).length} de {totalPreguntas} respuestas correctas
              {!aprobado && ` · Necesitas ${puntajeMinimo}% para aprobar`}
            </p>
          </div>
          {!aprobado && intentos < 3 && (
            <button
              onClick={handleReintentar}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: '#043941' }}
            >
              <RotateCcw size={14} />
              Reintentar ({3 - intentos} intentos restantes)
            </button>
          )}
          {!aprobado && intentos >= 3 && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ background: '#fdf8da', color: '#ca8a04' }}
            >
              <AlertTriangle size={14} />
              Requiere sesión de apoyo con el formador
            </div>
          )}
        </div>
      )}

      {/* Preguntas */}
      <div className="p-6 space-y-8" style={{ background: '#ffffff' }}>
        {preguntas.map((pregunta, idx) => {
          const respuestaUsuario = respuestas[pregunta.id]
          const respondida = respuestaUsuario !== undefined
          const esCorrecta = respondida && respuestaUsuario === pregunta.correcta

          return (
            <div key={pregunta.id}>
              <p className="font-semibold text-sm mb-3" style={{ color: '#043941' }}>
                <span
                  className="inline-flex items-center justify-center h-5 w-5 rounded-full text-xs font-bold text-white mr-2"
                  style={{ background: '#043941' }}
                >
                  {idx + 1}
                </span>
                {pregunta.enunciado}
              </p>

              <div className="space-y-2 ml-7">
                {pregunta.opciones.map((opcion, opIdx) => {
                  let borderColor = '#e3f8fb'
                  let bgColor = '#ffffff'
                  let textColor = '#043941'

                  if (estado === 'resultado') {
                    if (opIdx === pregunta.correcta) {
                      borderColor = '#00c16e'
                      bgColor = '#d2ffe1'
                    } else if (respondida && opIdx === respuestaUsuario && !esCorrecta) {
                      borderColor = '#ef4444'
                      bgColor = '#fee2e2'
                    }
                  } else if (respondida && opIdx === respuestaUsuario) {
                    borderColor = '#02d47e'
                    bgColor = '#d2ffe1'
                  }

                  return (
                    <button
                      key={opIdx}
                      onClick={() => handleRespuesta(pregunta.id, opIdx)}
                      disabled={estado === 'resultado'}
                      className="w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all"
                      style={{ borderColor, background: bgColor, color: textColor }}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + opIdx)}.</span>
                      {opcion}
                    </button>
                  )
                })}
              </div>

              {/* Explicación */}
              {estado === 'resultado' && pregunta.explicacion && (
                <div
                  className="ml-7 mt-3 p-3 rounded-lg text-xs"
                  style={{ background: '#e3f8fb', color: '#045f6c' }}
                >
                  <span className="font-semibold">Explicación: </span>
                  {pregunta.explicacion}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      {estado !== 'resultado' && (
        <div
          className="px-6 py-4 flex items-center justify-between border-t"
          style={{ background: '#f0faf5', borderColor: '#e3f8fb' }}
        >
          <span className="text-sm" style={{ color: '#045f6c' }}>
            {respondidas}/{totalPreguntas} respondidas
          </span>
          <button
            onClick={handleEnviar}
            disabled={!todasRespondidas}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: '#02d47e' }}
          >
            Enviar respuestas
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Continuar (visible tras aprobar) */}
      {estado === 'resultado' && aprobado && (
        <div
          className="px-6 py-4 border-t flex justify-end"
          style={{ borderColor: '#e3f8fb', background: '#f0faf5' }}
        >
          <button
            onClick={() => onAprobado?.()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#043941' }}
          >
            Continuar al siguiente módulo
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
