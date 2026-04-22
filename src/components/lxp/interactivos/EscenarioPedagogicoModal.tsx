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

export const ESCENARIO_COMP2: EscenarioConfig = {
  contenidoId: 'm5-s53-c3',
  competencia: 'Metodologías activas ABP/ABPr',
  numero: 2,
  titulo: '¿Cómo aplicas ABP en el diagnóstico automotriz?',
  contexto: 'Eres docente del taller automotriz. Decides implementar ABP por primera vez con tu grupo de 4° secundaria. El caso: un vehículo llega al taller con el testigo del motor encendido, consumo de combustible elevado y arrancada difícil en frío. El dueño no quiere gastar más de S/200.',
  reflexionFinal: 'El ABP no es dejar al estudiante solo — es diseñar el andamiaje correcto. El problema auténtico genera motivación, la pregunta socrática mantiene el protagonismo del estudiante, y el error procesado produce aprendizaje más profundo que la corrección directa. El rol del docente es más exigente, no menos.',
  decisions: [
    {
      situacion: 'Presentas el caso del vehículo al grupo. Los estudiantes te preguntan: "¿Por dónde empezamos, profe?". ¿Qué respondes?',
      opciones: [
        {
          texto: 'Les doy una guía paso a paso: primero conectar el escáner, luego revisar el sensor MAF, luego verificar la presión de combustible.',
          correcta: false,
          feedback: 'Si das los pasos, conviertes el ABP en una práctica guiada disfrazada. Los estudiantes siguen instrucciones en lugar de pensar. El valor del ABP está en que ellos decidan el primer paso — aunque se equivoquen en el camino.'
        },
        {
          texto: 'Respondo con una pregunta: "¿Qué información necesitan antes de decidir por dónde empezar? ¿Qué haría un técnico real al recibir este vehículo?"',
          correcta: true,
          feedback: 'La pregunta de reencaminamiento devuelve el protagonismo al estudiante sin dejarlo sin apoyo. "¿Qué haría un técnico real?" conecta el problema con el oficio y activa el conocimiento previo. Es la respuesta de un facilitador, no de un instructor.'
        },
        {
          texto: 'Les digo que el ABP es libre — que busquen en internet y lleguen a sus propias conclusiones.',
          correcta: false,
          feedback: 'El ABP libre sin andamiaje produce frustración y aprendizajes superficiales. El docente debe diseñar el nivel de ayuda correcto para cada momento. "Busquen en internet" sin guía de búsqueda es abandono pedagógico, no autonomía.'
        },
        {
          texto: 'Hago yo mismo el diagnóstico inicial con el escáner para que vean el procedimiento correcto antes de que ellos intenten.',
          correcta: false,
          feedback: 'Demostrar primero en un ABP cancela el proceso de investigación. Si ya saben la respuesta antes de investigar, ¿qué están resolviendo? La demostración tiene su lugar, pero no al inicio de un ABP.'
        }
      ]
    },
    {
      situacion: 'Después de 20 minutos, un grupo está paralizado: "No sabemos qué código OBD leer primero, hay muchos". ¿Cómo actúas?',
      opciones: [
        {
          texto: 'Me siento con ellos y les explico cómo priorizar los códigos según su categoría (P0xxx = motor, B = carrocería, etc.).',
          correcta: false,
          feedback: 'Dar la explicación directa resuelve el bloqueo pero roba el momento de descubrimiento. El grupo que encuentra la respuesta preguntando al manual o al manual del escáner aprende más que el que la recibe explicada.'
        },
        {
          texto: 'Los ignoro — el ABP requiere que resuelvan solos, cualquier ayuda invalida la metodología.',
          correcta: false,
          feedback: 'El andamiaje no invalida el ABP — lo hace posible. Ignorar a un grupo paralizado durante 20 minutos genera frustración que destruye la motivación. El facilitador interviene en el momento justo, no nunca.'
        },
        {
          texto: 'Les pregunto: "¿Tienen el manual del escáner cerca? ¿Qué dice sobre cómo leer los códigos activos vs. pendientes? ¿Cuáles creen que son más urgentes para el síntoma que describe el dueño?"',
          correcta: true,
          feedback: 'Perfecto. Tres preguntas encadenadas que desbloquean sin dar la respuesta: la primera dirige al recurso correcto, la segunda activa el análisis técnico, la tercera conecta el síntoma del cliente con el diagnóstico. Esto es andamiaje efectivo.'
        },
        {
          texto: 'Les doy 5 minutos más y si no avanzan, los fusiono con otro grupo que ya encontró los códigos.',
          correcta: false,
          feedback: 'Fusionar grupos al primer bloqueo evita que enfrenten el proceso de resolución de problemas. El bloqueo es parte del aprendizaje — el objetivo es ayudarlos a superarlo, no saltarlo. Un grupo que nunca se atascó no desarrolló resiliencia.'
        }
      ]
    },
    {
      situacion: 'Al final, un grupo concluye: "El problema es el sensor MAF — hay que reemplazarlo". Tú sabes que la causa real es una fuga de vacío. ¿Qué haces?',
      opciones: [
        {
          texto: 'Corrijo inmediatamente frente a todos: "No, están equivocados — la causa real es una fuga de vacío". Explico el diagnóstico correcto.',
          correcta: false,
          feedback: 'La corrección directa frente al grupo puede funcionar para transferir información, pero hace al docente el protagonista del cierre. El grupo no procesa su error — lo recibe corregido. El aprendizaje es superficial.'
        },
        {
          texto: 'Acepto su conclusión sin corregirla para no desmotivarlos — lo importante es que participaron.',
          correcta: false,
          feedback: 'No corregir un error técnico en el taller automotriz no es pedagogía — es negligencia. Un estudiante que sale creyendo que el MAF sucio no puede confundirse con una fuga de vacío tomará decisiones incorrectas con vehículos reales.'
        },
        {
          texto: 'Les pregunto que expliquen su razonamiento paso a paso: "¿Qué valor tenía el MAF en tiempo real? ¿Revisaron si hay diferencia entre el STFT y el LTFT? ¿Hicieron la prueba de fuga de vacío?" — el error emerge de su propio análisis.',
          correcta: true,
          feedback: 'El error procesado es el aprendizaje más poderoso del ABP. Cuando el grupo descubre su propio error a través de las preguntas del docente, la corrección es suya — no recibida. Ese momento de "¡ah, claro!" no se olvida.'
        },
        {
          texto: 'Dejo que propongan el reemplazo del MAF y recién corrijo cuando lo intenten físicamente — el error práctico enseña más.',
          correcta: false,
          feedback: 'Dejar que realicen un diagnóstico incorrecto sobre un vehículo real puede generar costos innecesarios y daños. El ABP tiene límites éticos — el error conceptual se corrige antes de la intervención física.'
        }
      ]
    }
  ]
}

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
