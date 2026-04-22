import { useState } from 'react'
import { X, CheckCircle2, XCircle, ChevronRight, RotateCcw, BookOpen } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'

interface Opcion {
  texto: string
  correcta: boolean
  feedback: string
}

interface Decision {
  situacion: string
  opciones: Opcion[]
}

export interface EscenarioConfig {
  contenidoId: string
  competencia: string
  numero: number
  titulo: string
  contexto: string
  decisions: Decision[]
  reflexionFinal: string
}

interface Props {
  config: EscenarioConfig
  onClose: () => void
  onComplete: () => void
}

export function EscenarioPedagogicoModal({ config, onClose, onComplete }: Props) {
  const [paso, setPaso] = useState<'intro' | number | 'final'>('intro')
  const [selecciones, setSelecciones] = useState<(number | null)[]>(
    Array(config.decisions.length).fill(null)
  )
  const [mostrandoFeedback, setMostrandoFeedback] = useState(false)

  useEscapeKey(onClose)

  const decisionActual = typeof paso === 'number' ? config.decisions[paso] : null
  const seleccionActual = typeof paso === 'number' ? selecciones[paso] : null
  const opcionSeleccionada = decisionActual && seleccionActual !== null
    ? decisionActual.opciones[seleccionActual]
    : null

  const aciertos = selecciones.filter((s, i) =>
    s !== null && config.decisions[i].opciones[s].correcta
  ).length

  function seleccionar(idx: number) {
    if (mostrandoFeedback || typeof paso !== 'number') return
    const nuevas = [...selecciones]
    nuevas[paso] = idx
    setSelecciones(nuevas)
    setMostrandoFeedback(true)
  }

  function avanzar() {
    if (typeof paso !== 'number') return
    setMostrandoFeedback(false)
    if (paso + 1 < config.decisions.length) {
      setPaso(paso + 1)
    } else {
      setPaso('final')
      onComplete()
    }
  }

  function reiniciar() {
    setPaso('intro')
    setSelecciones(Array(config.decisions.length).fill(null))
    setMostrandoFeedback(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(4,57,65,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-2xl my-8 rounded-2xl overflow-hidden shadow-2xl bg-white">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3" style={{ background: '#043941' }}>
          <div className="flex items-center gap-2">
            <BookOpen size={16} color="#02d47e" />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#02d47e' }}>
              Competencia {config.numero} — Escenario pedagógico
            </span>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-white/10">
            <X size={18} color="white" />
          </button>
        </div>

        {/* Progreso */}
        {typeof paso === 'number' && (
          <div className="flex gap-1 px-5 pt-4">
            {config.decisions.map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-all"
                style={{
                  background: i < paso ? '#02d47e' : i === paso ? '#043941' : '#e2e8f0'
                }}
              />
            ))}
          </div>
        )}

        <div className="px-6 py-5">

          {/* INTRO */}
          {paso === 'intro' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold" style={{ color: '#043941' }}>
                {config.titulo}
              </h2>
              <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: '#f0fdf8', color: '#043941', borderLeft: '4px solid #02d47e' }}>
                <p className="font-semibold mb-2">📋 Situación</p>
                <p>{config.contexto}</p>
              </div>
              <p className="text-sm" style={{ color: '#64748b' }}>
                Tomarás <strong>{config.decisions.length} decisiones</strong> clave como docente. Después de cada elección verás retroalimentación inmediata.
              </p>
              <button
                onClick={() => setPaso(0)}
                className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ background: '#043941' }}
              >
                Comenzar el escenario <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* DECISIÓN */}
          {typeof paso === 'number' && decisionActual && (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                Decisión {paso + 1} de {config.decisions.length}
              </div>
              <p className="font-semibold text-base leading-snug" style={{ color: '#043941' }}>
                {decisionActual.situacion}
              </p>

              <div className="space-y-2">
                {decisionActual.opciones.map((op, idx) => {
                  const seleccionada = seleccionActual === idx
                  const esCor = op.correcta
                  let borde = '#e2e8f0'
                  let fondo = '#f8fafc'
                  let textColor = '#1e293b'
                  if (mostrandoFeedback && seleccionada) {
                    borde = esCor ? '#02d47e' : '#f43f5e'
                    fondo = esCor ? '#f0fdf8' : '#fff1f2'
                    textColor = esCor ? '#065f46' : '#9f1239'
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => seleccionar(idx)}
                      disabled={mostrandoFeedback}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all border-2"
                      style={{ borderColor: borde, background: fondo, color: textColor }}
                    >
                      <div className="flex items-start gap-3">
                        {mostrandoFeedback && seleccionada && (
                          esCor
                            ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: '#02d47e' }} />
                            : <XCircle size={16} className="mt-0.5 shrink-0" style={{ color: '#f43f5e' }} />
                        )}
                        <span>{op.texto}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Feedback */}
              {mostrandoFeedback && opcionSeleccionada && (
                <div
                  className="rounded-xl p-4 text-sm leading-relaxed"
                  style={{
                    background: opcionSeleccionada.correcta ? '#f0fdf8' : '#fff1f2',
                    borderLeft: `4px solid ${opcionSeleccionada.correcta ? '#02d47e' : '#f43f5e'}`,
                    color: opcionSeleccionada.correcta ? '#065f46' : '#9f1239'
                  }}
                >
                  <p className="font-semibold mb-1">
                    {opcionSeleccionada.correcta ? '✓ Decisión acertada' : '✗ Hay una mejor alternativa'}
                  </p>
                  <p>{opcionSeleccionada.feedback}</p>
                </div>
              )}

              {mostrandoFeedback && (
                <button
                  onClick={avanzar}
                  className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:opacity-90"
                  style={{ background: '#043941' }}
                >
                  {paso + 1 < config.decisions.length ? 'Siguiente decisión' : 'Ver resultado final'}
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          )}

          {/* FINAL */}
          {paso === 'final' && (
            <div className="space-y-5">
              <div className="text-center">
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-bold mb-3"
                  style={{
                    background: aciertos === config.decisions.length ? '#f0fdf8' : aciertos >= config.decisions.length / 2 ? '#fefce8' : '#fff1f2',
                    color: aciertos === config.decisions.length ? '#065f46' : aciertos >= config.decisions.length / 2 ? '#854d0e' : '#9f1239'
                  }}
                >
                  {aciertos}/{config.decisions.length}
                </div>
                <h2 className="text-lg font-bold" style={{ color: '#043941' }}>
                  {aciertos === config.decisions.length
                    ? '¡Excelente criterio docente!'
                    : aciertos >= config.decisions.length / 2
                      ? 'Buen avance — sigue profundizando'
                      : 'Hay oportunidades de mejora'}
                </h2>
              </div>

              <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: '#f0fdf8', borderLeft: '4px solid #02d47e', color: '#043941' }}>
                <p className="font-semibold mb-1">Reflexión final</p>
                <p>{config.reflexionFinal}</p>
              </div>

              <div className="space-y-2">
                {config.decisions.map((d, i) => {
                  const s = selecciones[i]
                  const correcta = s !== null && d.opciones[s].correcta
                  return (
                    <div key={i} className="flex items-start gap-2 text-sm" style={{ color: correcta ? '#065f46' : '#9f1239' }}>
                      {correcta ? <CheckCircle2 size={15} className="mt-0.5 shrink-0" /> : <XCircle size={15} className="mt-0.5 shrink-0" />}
                      <span>Decisión {i + 1}: {correcta ? 'acertada' : 'mejorable'}</span>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={reiniciar}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 hover:bg-slate-50"
                  style={{ borderColor: '#043941', color: '#043941' }}
                >
                  <RotateCcw size={15} /> Reintentar
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white hover:opacity-90"
                  style={{ background: '#043941' }}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Datos de los 4 escenarios ────────────────────────────────────────────────

export const ESCENARIO_COMP1: EscenarioConfig = {
  contenidoId: 'm5-s51-c3',
  competencia: 'Planificación por competencias',
  numero: 1,
  titulo: '¿Cómo planificas la sesión de instalación del elevador?',
  contexto: 'Eres docente del taller automotriz. Mañana tienes la sesión de instalación del elevador tipo tijera con 28 estudiantes de 4° de secundaria. Es la primera vez que usarán el elevador. Tienes 90 minutos.',
  reflexionFinal: 'La planificación por competencias no es llenar un formato — es pensar con anticipación qué hará el estudiante, cómo lo sabrá y cómo lo demostrarás tú. Una sesión bien planificada reduce incidentes, maximiza el tiempo de práctica y hace visible el aprendizaje.',
  decisions: [
    {
      situacion: '¿Cómo redactas el indicador de logro de la sesión?',
      opciones: [
        {
          texto: '"El estudiante conocerá el funcionamiento del elevador tipo tijera y sus partes."',
          correcta: false,
          feedback: '"Conocerá" no es observable ni medible. Un docente no puede evaluar si alguien "conoce" — solo puede ver lo que hace. Los indicadores deben describir una acción concreta y verificable.'
        },
        {
          texto: '"El estudiante instala y opera el elevador tipo tijera siguiendo el protocolo de seguridad, verifica los seguros mecánicos y registra el proceso en la ficha técnica."',
          correcta: true,
          feedback: 'Perfecto. Este indicador es observable (instalas, operas, verificas, registras), medible (la ficha técnica es evidencia) y sitúa la competencia en contexto real del taller.'
        },
        {
          texto: '"El estudiante aprenderá sobre seguridad y el uso correcto del elevador."',
          correcta: false,
          feedback: '"Aprenderá sobre" es vago y orientado al proceso, no al resultado. Los indicadores de competencia describen el desempeño esperado al FINAL de la sesión, no lo que ocurrirá durante ella.'
        },
        {
          texto: '"El estudiante completará la actividad del elevador con nota aprobatoria."',
          correcta: false,
          feedback: 'La calificación no es un indicador de competencia — es consecuencia de ella. Este indicador no dice qué debe hacer el estudiante para demostrar que aprendió.'
        }
      ]
    },
    {
      situacion: 'Tienes 28 estudiantes y 1 elevador. ¿Cómo organizas los 90 minutos para que todos logren la competencia?',
      opciones: [
        {
          texto: 'Divido el grupo en 14 pares. Cada par usa el elevador 5 minutos mientras los demás esperan sentados.',
          correcta: false,
          feedback: '5 minutos no es suficiente para desarrollar competencia, y 26 estudiantes esperando es tiempo desperdiciado. La espera pasiva no genera aprendizaje y aumenta el riesgo de indisciplina.'
        },
        {
          texto: 'Solo demuestro yo el procedimiento y los estudiantes toman apuntes. La práctica la harán en la siguiente sesión.',
          correcta: false,
          feedback: 'Una demostración sin práctica transfiere muy poco. Los estudiantes necesitan hacer para aprender. Posponer la práctica rompe la secuencia pedagógica y hace perder el momentum de la sesión.'
        },
        {
          texto: 'Organizo 3 estaciones rotativas: Grupo A en el elevador (instalación guiada), Grupo B en fichas de metrado, Grupo C revisando el manual y protocolos. Rotamos cada 25 minutos.',
          correcta: true,
          feedback: 'Las estaciones rotativas son la solución estándar para recursos únicos. Cada grupo trabaja en una competencia complementaria. 25 minutos por estación permite práctica real sin tiempo muerto. Todos terminan habiendo pasado por el elevador.'
        },
        {
          texto: 'Pido que solo los estudiantes más avanzados usen el elevador. Los demás observan desde lejos.',
          correcta: false,
          feedback: 'La observación pasiva no desarrolla competencia. Además, seleccionar "avanzados" en la primera sesión desmotiva a los demás y no es equitativo. La planificación por competencias incluye a todos.'
        }
      ]
    },
    {
      situacion: 'Quedan 10 minutos para terminar la sesión. ¿Qué haces?',
      opciones: [
        {
          texto: 'Dejo que los estudiantes terminen lo que están haciendo y espero que el tiempo se acabe.',
          correcta: false,
          feedback: 'El cierre es uno de los momentos más importantes de la sesión — consolida el aprendizaje. Dejarlo al azar significa que los estudiantes salen sin saber qué aprendieron ni para qué sirve.'
        },
        {
          texto: 'Aplico 5S (cada herramienta a su lugar), pido a 2 estudiantes que compartan qué fue lo más difícil y anuncio el objetivo de la siguiente sesión.',
          correcta: true,
          feedback: 'El cierre efectivo tiene 3 elementos: orden del espacio (hábito profesional), metacognición (¿qué aprendí? ¿qué me costó?) y conexión con la siguiente sesión. 10 minutos son suficientes si están planificados.'
        },
        {
          texto: 'Hago un quiz escrito de 10 preguntas sobre los pasos de instalación del elevador.',
          correcta: false,
          feedback: '10 preguntas en 10 minutos genera estrés y no es representativo del aprendizaje de la sesión. Una evaluación al cierre debe ser breve, formativa y oral o visual — no un examen sorpresa.'
        },
        {
          texto: 'Felicito al grupo en general y los libero antes de tiempo como premio por el buen trabajo.',
          correcta: false,
          feedback: 'Liberar antes de tiempo cancela el cierre pedagógico. El reconocimiento es válido, pero siempre con un mínimo de reflexión sobre lo aprendido. El tiempo de cierre planificado no es negociable.'
        }
      ]
    }
  ]
}
