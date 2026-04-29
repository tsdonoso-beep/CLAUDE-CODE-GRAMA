import { useState } from 'react'
import { X, CheckCircle2, XCircle, ChevronRight, RotateCcw, Layers } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'

interface Herramienta {
  nombre: string
  icono: string
  descripcion: string
  categoriaCorrecta: string
  explicacion: string
}

interface Categoria {
  id: string
  nombre: string
  color: string
  ejemplos: string
}

const CATEGORIAS: Categoria[] = [
  { id: 'documentos', nombre: 'Documentos y datos', color: '#4f46e5', ejemplos: 'Redactar, registrar, organizar información' },
  { id: 'materiales', nombre: 'Crear materiales con IA', color: '#0891b2', ejemplos: 'Presentaciones, actividades, modelos visuales' },
  { id: 'colaboracion', nombre: 'Colaborar y planificar', color: '#059669', ejemplos: 'Trabajo en equipo, calendario, mapas' },
  { id: 'diseno', nombre: 'Diseño profesional', color: '#d97706', ejemplos: 'Diseño vectorial, prototipado, 3D' },
]

const HERRAMIENTAS: Herramienta[] = [
  {
    nombre: 'Google Sheets',
    icono: '📊',
    descripcion: 'Hoja de cálculo en la nube con edición simultánea, fórmulas y filtros.',
    categoriaCorrecta: 'documentos',
    explicacion: 'Google Sheets es la herramienta de datos por excelencia: inventarios de equipos, registros de notas, seguimiento de asistencia. Su edición simultánea y fórmulas la hacen ideal para gestión de información del taller.'
  },
  {
    nombre: 'Gamma',
    icono: '✨',
    descripcion: 'Genera presentaciones completas con diseño visual desde un prompt o esquema de texto.',
    categoriaCorrecta: 'materiales',
    explicacion: 'Gamma es IA generativa para presentaciones: describe el tema y produce slides con diseño automático en segundos. Ideal para preparar materiales de clase rápidamente sin conocimientos de diseño.'
  },
  {
    nombre: 'Google Calendar',
    icono: '📅',
    descripcion: 'Gestión de eventos con horarios, invitados y reserva de espacios compartidos.',
    categoriaCorrecta: 'colaboracion',
    explicacion: 'Calendar coordina el taller: reserva la sala de práctica, invita a colegas a reuniones de planificación y programa mantenimientos de equipos. Sin Calendar, los espacios del taller se gestionan por WhatsApp — con todos los conflictos que eso genera.'
  },
  {
    nombre: 'Figma',
    icono: '🎨',
    descripcion: 'Editor vectorial profesional con capas, componentes y exportación en múltiples formatos.',
    categoriaCorrecta: 'diseno',
    explicacion: 'Figma es diseño vectorial profesional. Para el taller automotriz: planos de zonas, señalética, guías visuales institucionales. La diferencia con Miró es la precisión y la calidad de exportación para materiales impresos.'
  },
  {
    nombre: 'Miró',
    icono: '🗺️',
    descripcion: 'Pizarra colaborativa infinita para diagramas de proceso y mapas mentales en equipo.',
    categoriaCorrecta: 'colaboracion',
    explicacion: 'Miró es colaboración visual: el equipo docente mapea procesos del taller, crea diagramas de flujo de diagnóstico y organiza ideas en tiempo real. Su lienzo infinito y conectores lo hacen ideal para sesiones de planificación conjunta.'
  },
  {
    nombre: 'Teachy',
    icono: '📚',
    descripcion: 'Genera actividades pedagógicas, quizzes y organizadores visuales desde el tema y grado indicados.',
    categoriaCorrecta: 'materiales',
    explicacion: 'Teachy resuelve el problema del docente evaluador: crea rúbricas, listas de cotejo, quizzes y planes de sesión en segundos. En el taller automotriz, puedes pedir "quiz de 8 preguntas sobre EPP para 4° secundaria" y tenerlo listo antes del recreo.'
  },
  {
    nombre: 'Google Docs',
    icono: '📝',
    descripcion: 'Procesador de texto colaborativo para redactar y compartir documentos institucionales.',
    categoriaCorrecta: 'documentos',
    explicacion: 'Google Docs para el taller: protocolos de seguridad, informes de sesión, actas de entrega de equipos. Su historial de versiones y comentarios facilita la revisión entre colegas antes de entregar documentos a la UGEL.'
  },
  {
    nombre: 'Meshy',
    icono: '🧊',
    descripcion: 'Genera modelos 3D navegables desde una descripción de texto o imagen de referencia.',
    categoriaCorrecta: 'diseno',
    explicacion: 'Meshy es modelado 3D con IA. Para el taller automotriz: genera modelos de motores, sistemas de frenos o piezas mecánicas que los estudiantes pueden rotar y explorar antes de la práctica con el vehículo real. No es un plano técnico, pero es una herramienta de visualización muy potente.'
  },
]

interface Props {
  onClose: () => void
  onComplete: () => void
}

export function ClasificadorHerramientasModal({ onClose, onComplete }: Props) {
  const [paso, setPaso] = useState<'intro' | number | 'final'>('intro')
  const [selecciones, setSelecciones] = useState<(string | null)[]>(Array(HERRAMIENTAS.length).fill(null))
  const [mostrandoFeedback, setMostrandoFeedback] = useState(false)

  useEscapeKey(onClose)

  const herramientaActual = typeof paso === 'number' ? HERRAMIENTAS[paso] : null
  const seleccionActual = typeof paso === 'number' ? selecciones[paso] : null
  const aciertos = selecciones.filter((s, i) => s !== null && s === HERRAMIENTAS[i].categoriaCorrecta).length

  function seleccionar(catId: string) {
    if (mostrandoFeedback || typeof paso !== 'number') return
    const nuevas = [...selecciones]
    nuevas[paso] = catId
    setSelecciones(nuevas)
    setMostrandoFeedback(true)
  }

  function avanzar() {
    if (typeof paso !== 'number') return
    setMostrandoFeedback(false)
    if (paso + 1 < HERRAMIENTAS.length) {
      setPaso(paso + 1)
    } else {
      setPaso('final')
      onComplete()
    }
  }

  function reiniciar() {
    setPaso('intro')
    setSelecciones(Array(HERRAMIENTAS.length).fill(null))
    setMostrandoFeedback(false)
  }

  const categoriaActual = herramientaActual && seleccionActual
    ? CATEGORIAS.find(c => c.id === seleccionActual)
    : null
  const esCorrecta = herramientaActual && seleccionActual === herramientaActual.categoriaCorrecta

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
            <Layers size={16} color="#02d47e" />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#02d47e' }}>
              Clasificador de herramientas digitales
            </span>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-white/10">
            <X size={18} color="white" />
          </button>
        </div>

        {/* Barra de progreso */}
        {typeof paso === 'number' && (
          <div className="flex gap-1 px-5 pt-4">
            {HERRAMIENTAS.map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-all"
                style={{ background: i < paso ? '#02d47e' : i === paso ? '#043941' : '#e2e8f0' }}
              />
            ))}
          </div>
        )}

        <div className="px-6 py-5">

          {/* INTRO */}
          {paso === 'intro' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold" style={{ color: '#043941' }}>
                ¿Qué herramienta para cada tarea?
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                Te presentaré <strong>8 herramientas digitales</strong> del programa. Para cada una, elige la categoría de uso que mejor la describe en el contexto del taller automotriz.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIAS.map(cat => (
                  <div key={cat.id} className="rounded-xl p-3 text-sm" style={{ background: `${cat.color}15`, borderLeft: `3px solid ${cat.color}` }}>
                    <p className="font-semibold" style={{ color: cat.color }}>{cat.nombre}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{cat.ejemplos}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setPaso(0)}
                className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:opacity-90"
                style={{ background: '#043941' }}
              >
                Empezar a clasificar <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* HERRAMIENTA */}
          {typeof paso === 'number' && herramientaActual && (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                Herramienta {paso + 1} de {HERRAMIENTAS.length}
              </div>

              {/* Tarjeta de herramienta */}
              <div className="rounded-xl p-4 text-center" style={{ background: '#f8fafc', border: '2px solid #e2e8f0' }}>
                <div className="text-4xl mb-2">{herramientaActual.icono}</div>
                <h3 className="text-lg font-bold" style={{ color: '#043941' }}>{herramientaActual.nombre}</h3>
                <p className="text-sm mt-1" style={{ color: '#64748b' }}>{herramientaActual.descripcion}</p>
              </div>

              <p className="text-sm font-semibold text-center" style={{ color: '#043941' }}>
                ¿A qué categoría pertenece?
              </p>

              {/* Categorías */}
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIAS.map(cat => {
                  const seleccionada = seleccionActual === cat.id
                  const esLaCorrecta = herramientaActual.categoriaCorrecta === cat.id
                  let borde = '#e2e8f0'
                  let fondo = '#f8fafc'
                  if (mostrandoFeedback) {
                    if (seleccionada && esCorrecta) { borde = '#02d47e'; fondo = '#f0fdf8' }
                    else if (seleccionada && !esCorrecta) { borde = '#f43f5e'; fondo = '#fff1f2' }
                    else if (!seleccionada && esLaCorrecta) { borde = '#02d47e'; fondo = '#f0fdf8' }
                  } else if (seleccionada) {
                    borde = cat.color; fondo = `${cat.color}10`
                  }
                  return (
                    <button
                      key={cat.id}
                      onClick={() => seleccionar(cat.id)}
                      disabled={mostrandoFeedback}
                      className="rounded-xl p-3 text-left text-sm transition-all border-2"
                      style={{ borderColor: borde, background: fondo }}
                    >
                      <div className="flex items-center gap-2">
                        {mostrandoFeedback && (seleccionada || esLaCorrecta) && (
                          (seleccionada && esCorrecta) || (!seleccionada && esLaCorrecta)
                            ? <CheckCircle2 size={14} style={{ color: '#02d47e', flexShrink: 0 }} />
                            : seleccionada && <XCircle size={14} style={{ color: '#f43f5e', flexShrink: 0 }} />
                        )}
                        <span className="font-semibold" style={{ color: cat.color }}>{cat.nombre}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Feedback */}
              {mostrandoFeedback && (
                <div
                  className="rounded-xl p-4 text-sm leading-relaxed"
                  style={{
                    background: esCorrecta ? '#f0fdf8' : '#fff1f2',
                    borderLeft: `4px solid ${esCorrecta ? '#02d47e' : '#f43f5e'}`,
                    color: esCorrecta ? '#065f46' : '#9f1239'
                  }}
                >
                  <p className="font-semibold mb-1">
                    {esCorrecta ? `✓ Correcto — ${CATEGORIAS.find(c => c.id === herramientaActual.categoriaCorrecta)?.nombre}` : `✗ Es "${CATEGORIAS.find(c => c.id === herramientaActual.categoriaCorrecta)?.nombre}"`}
                  </p>
                  <p>{herramientaActual.explicacion}</p>
                </div>
              )}

              {mostrandoFeedback && (
                <button
                  onClick={avanzar}
                  className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:opacity-90"
                  style={{ background: '#043941' }}
                >
                  {paso + 1 < HERRAMIENTAS.length ? 'Siguiente herramienta' : 'Ver resultado'}
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
                    background: aciertos >= 7 ? '#f0fdf8' : aciertos >= 5 ? '#fefce8' : '#fff1f2',
                    color: aciertos >= 7 ? '#065f46' : aciertos >= 5 ? '#854d0e' : '#9f1239'
                  }}
                >
                  {aciertos}/{HERRAMIENTAS.length}
                </div>
                <h2 className="text-lg font-bold" style={{ color: '#043941' }}>
                  {aciertos >= 7 ? '¡Excelente dominio del ecosistema digital!' : aciertos >= 5 ? 'Buen comienzo — sigue explorando las herramientas' : 'Revisa las categorías y vuelve a intentarlo'}
                </h2>
              </div>

              <div className="space-y-2">
                {HERRAMIENTAS.map((h, i) => {
                  const correcta = selecciones[i] === h.categoriaCorrecta
                  const cat = CATEGORIAS.find(c => c.id === h.categoriaCorrecta)
                  return (
                    <div key={i} className="flex items-center gap-3 text-sm rounded-lg px-3 py-2"
                      style={{ background: correcta ? '#f0fdf8' : '#fff1f2' }}>
                      {correcta
                        ? <CheckCircle2 size={15} style={{ color: '#02d47e', flexShrink: 0 }} />
                        : <XCircle size={15} style={{ color: '#f43f5e', flexShrink: 0 }} />}
                      <span style={{ color: '#043941' }}><strong>{h.icono} {h.nombre}</strong> → {cat?.nombre}</span>
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
