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

export const ESCENARIO_COMP4: EscenarioConfig = {
  contenidoId: 'm5-s57-c3',
  competencia: 'Gestión pedagógica del taller',
  numero: 4,
  titulo: '¿Cómo gestionas una sesión compleja en el taller automotriz?',
  contexto: 'Eres docente del taller automotriz. Hoy tienes 28 estudiantes, 3 zonas activas simultáneamente (elevador, diagnóstico OBD, ficha de metrado) y 90 minutos de sesión. Al llegar al taller notas que el compresor hace un ruido inusual y un estudiante llega sin sus lentes de seguridad.',
  reflexionFinal: 'La gestión pedagógica del taller no es improvisación — es anticipación. Los protocolos de inicio, las normas no negociables y los planes de contingencia no limitan la enseñanza: la hacen posible. Un taller bien gestionado es un taller donde los estudiantes aprenden con seguridad.',
  decisions: [
    {
      situacion: 'Al llegar, notas que el compresor emite un ruido metálico inusual que no tenía antes. ¿Qué haces?',
      opciones: [
        {
          texto: 'Lo enciendo igual — probablemente es algo menor. Si falla durante la sesión, lo apago y listo.',
          correcta: false,
          feedback: 'Operar un equipo con anomalía sonora es un riesgo real: puede ser un rodamiento en mal estado, una válvula de seguridad defectuosa o presión excesiva. Una falla durante la sesión con estudiantes cerca puede causar un accidente. El principio es claro: equipo con anomalía = equipo fuera de servicio.'
        },
        {
          texto: 'Lo dejo apagado, coloco una etiqueta "NO USAR — en revisión", registro la anomalía en la bitácora del equipo y replanifico la sesión sin el compresor para hoy.',
          correcta: true,
          feedback: 'Respuesta correcta en todos los frentes: protege a los estudiantes, protege la garantía del equipo (usarlo dañado puede invalidarla), deja evidencia del problema en la bitácora y replanifico en lugar de cancelar. La gestión profesional convierte el obstáculo en decisión documentada.'
        },
        {
          texto: 'Le pido a un estudiante técnico avanzado que lo revise antes de la sesión para ganar tiempo.',
          correcta: false,
          feedback: 'Un estudiante, por más avanzado que sea, no está habilitado para diagnosticar ni intervenir equipos del taller. Hacerlo podría invalidar la garantía, generar un accidente y crear un precedente peligroso. La revisión técnica es responsabilidad del docente o del servicio técnico autorizado.'
        },
        {
          texto: 'Lo uso solo para la zona de diagnóstico OBD donde la presión es más baja, y evito usarlo en el elevador.',
          correcta: false,
          feedback: 'Un equipo con anomalía no es "uso reducido" — es fuera de servicio hasta diagnóstico. La presión "más baja" no elimina el riesgo si el problema es mecánico interno. Esta decisión pone en riesgo a los estudiantes y documenta mal uso del bien.'
        }
      ]
    },
    {
      situacion: 'Un estudiante llega al taller sin sus lentes de seguridad justo cuando vas a iniciar la sesión práctica. Dice que se le olvidaron en casa. ¿Qué haces?',
      opciones: [
        {
          texto: 'Lo dejo participar con la condición de que tenga más cuidado — no quiero que pierda la sesión por un olvido.',
          correcta: false,
          feedback: 'Esta excepción destruye la norma para todos. Si un estudiante puede participar sin EPP "con cuidado", los demás aprenden que el EPP es opcional cuando hay una buena excusa. En el taller automotriz, esa cultura cuesta accidentes.'
        },
        {
          texto: 'No puede ingresar a la zona de práctica. Le asigno la actividad de la ficha de metrado en el área de escritorio, fuera de la zona de riesgo, mientras gestiona conseguir los lentes.',
          correcta: true,
          feedback: 'La norma se mantiene sin cancelar la sesión del estudiante. La actividad alternativa mantiene su participación activa en algo productivo. Esta respuesta además muestra a todo el grupo que el EPP es innegociable — y que hay consecuencias reales, no solo advertencias.'
        },
        {
          texto: 'Le presto mis lentes de seguridad para que pueda participar — el docente siempre debe tener uno extra.',
          correcta: false,
          feedback: 'Prestar el EPP personal resuelve el problema puntual pero no desarrolla la responsabilidad del estudiante. Además, el docente queda sin su propio EPP en un taller activo. La responsabilidad del equipo de protección personal es individual e intransferible.'
        },
        {
          texto: 'Lo anoto en el registro de incidencias y lo dejo participar esta vez — la primera falta se advierte, no se sanciona.',
          correcta: false,
          feedback: '"Primera falta se advierte" es un principio válido en conducta, no en seguridad física. Un accidente ocular no espera a que sea la segunda vez. El registro sin consecuencia inmediata no protege al estudiante ni establece la cultura de seguridad del taller.'
        }
      ]
    },
    {
      situacion: 'A los 60 minutos, el Grupo A del elevador terminó su rotación 15 minutos antes de lo esperado. ¿Qué haces con ese tiempo?',
      opciones: [
        {
          texto: 'Los dejo descansar — ya cumplieron su parte y merecen el tiempo libre.',
          correcta: false,
          feedback: 'El tiempo libre en el taller es tiempo de riesgo: estudiantes desocupados cerca de equipos activos pueden generar distracciones o accidentes. La gestión pedagógica planifica qué hacer cuando algo termina antes — no lo improvisa.'
        },
        {
          texto: 'Les pido que completen la ficha técnica del elevador, registrando los valores medidos (nivel de aceite, presión, estado de seguros) — documentar el proceso es parte de la competencia.',
          correcta: true,
          feedback: 'Perfecto. Documentar el proceso es una competencia técnica real: los técnicos automotrices registran cada intervención. Esta actividad de extensión usa el tiempo productivamente, refuerza el aprendizaje de la sesión y produce un entregable evaluable.'
        },
        {
          texto: 'Los adelanto a la siguiente zona de rotación para que ganen más práctica.',
          correcta: false,
          feedback: 'Adelantar la rotación rompe la planificación de los otros grupos. Si el Grupo B aún está en diagnóstico OBD, mover al Grupo A antes genera conflicto de espacio y recursos. La gestión de zonas simultáneas requiere que las rotaciones sean predecibles.'
        },
        {
          texto: 'Les pido que ayuden al grupo que sigue más lento — así todos terminan al mismo tiempo.',
          correcta: false,
          feedback: 'Mezclar grupos durante la práctica puede confundir roles, generar dependencia y quitar tiempo al grupo más lento para resolver sus propios bloqueos. El peer teaching es válido como estrategia planificada, no como solución de emergencia a ritmos diferentes.'
        }
      ]
    }
  ]
}

export const ESCENARIO_COMP3: EscenarioConfig = {
  contenidoId: 'm5-s55-c3',
  competencia: 'Evaluación por competencias',
  numero: 3,
  titulo: '¿Cómo evalúas la competencia de diagnóstico automotriz?',
  contexto: 'Eres docente del taller automotriz. Acabas de terminar el módulo de diagnóstico con escáner OBD-II. Debes evaluar si tus 28 estudiantes lograron la competencia: "Diagnostica fallas en el sistema del motor aplicando el escáner OBD-II con procedimiento técnico correcto y actitud responsable."',
  reflexionFinal: 'La evaluación por competencias es triangulación de evidencias: el proceso (lista de cotejo), el producto (rúbrica) y la conciencia del propio aprendizaje (autoevaluación). Ningún instrumento solo es suficiente. La retroalimentación específica, oportuna y orientada a la mejora es el motor de la competencia — no la nota.',
  decisions: [
    {
      situacion: '¿Qué combinación de instrumentos de evaluación usarías para evidenciar la competencia?',
      opciones: [
        {
          texto: 'Un examen escrito de 20 preguntas sobre los códigos OBD más comunes y su significado.',
          correcta: false,
          feedback: 'El examen escrito evalúa conocimiento declarativo, no competencia. Un estudiante puede responder qué es el código P0171 sin saber diagnosticarlo en un vehículo real. La competencia se evidencia en el desempeño, no en la memoria.'
        },
        {
          texto: 'Lista de cotejo de procedimiento (observación directa) + rúbrica del informe de diagnóstico + autoevaluación del estudiante.',
          correcta: true,
          feedback: 'Triangulación perfecta. La lista de cotejo captura si siguió el procedimiento correcto (conectar escáner, leer códigos, registrar freeze frame). La rúbrica evalúa la calidad del informe. La autoevaluación desarrolla metacognición. Tres fuentes, tres dimensiones.'
        },
        {
          texto: 'Solo observo durante la práctica y anoto mentalmente quién lo hizo bien y quién no.',
          correcta: false,
          feedback: 'La observación sin instrumento es subjetiva e inconsistente — dos docentes observando al mismo estudiante llegarán a conclusiones diferentes. Además, "mentalmente" no deja evidencia ni permite retroalimentación específica al estudiante.'
        },
        {
          texto: 'Pido a cada estudiante que me explique oralmente el procedimiento al terminar la práctica.',
          correcta: false,
          feedback: 'La evaluación oral sobre el procedimiento evalúa la capacidad de explicar, no la competencia de hacer. Un estudiante puede describir perfectamente los pasos y cometer errores críticos al ejecutarlos. La evaluación de competencias requiere evidencia del desempeño real.'
        }
      ]
    },
    {
      situacion: 'Al observar la práctica, un estudiante conecta el escáner correctamente, lee todos los códigos y los registra — pero no anota el freeze frame antes de borrar. Tu rúbrica tiene el criterio "Registra datos completos del diagnóstico". ¿Qué calificación le das en ese criterio?',
      opciones: [
        {
          texto: 'Logrado — hizo casi todo bien, el freeze frame es un detalle menor.',
          correcta: false,
          feedback: 'El freeze frame no es un detalle — es la evidencia de las condiciones exactas cuando ocurrió la falla. Borrar sin registrarlo es destruir información crítica de diagnóstico. La rúbrica tiene ese criterio por una razón técnica real, no burocrática.'
        },
        {
          texto: 'En proceso — registró los códigos pero no los datos completos del diagnóstico. Retroalimentación específica: "Faltó registrar el freeze frame antes de borrar. Esa información es clave para reproducir la condición de falla."',
          correcta: true,
          feedback: 'Correcto en la calificación y en la retroalimentación. "En proceso" es honesto — hizo parte del criterio. La retroalimentación específica le dice exactamente qué faltó y por qué importa técnicamente. Así la evaluación enseña, no solo mide.'
        },
        {
          texto: 'No logrado — si no registró el freeze frame, el diagnóstico está incompleto y no merece aprobación.',
          correcta: false,
          feedback: '"No logrado" implica que no hubo evidencia del criterio. El estudiante sí registró códigos y procedimientos — solo omitió el freeze frame. La rúbrica evalúa criterios específicos con niveles graduados, no de forma binaria. No logrado debería reservarse para quien no intentó el criterio.'
        },
        {
          texto: 'Le doy Logrado y le comento al final de la sesión que la próxima vez recuerde el freeze frame.',
          correcta: false,
          feedback: 'Calificar Logrado cuando el criterio no se cumplió completamente invalida la rúbrica. Un instrumento que no mide lo que dice medir pierde confiabilidad. La retroalimentación "al final de la sesión, para la próxima vez" es tardía y poco específica.'
        }
      ]
    },
    {
      situacion: 'Tres colegas evaluaron al mismo estudiante haciendo el mismo diagnóstico: uno dio 16/20, otro 11/20 y tú diste 14/20. ¿Qué haces?',
      opciones: [
        {
          texto: 'Promedio las tres notas y uso 13.7/20 como calificación final — así se compensa la subjetividad.',
          correcta: false,
          feedback: 'Promediar no resuelve el problema — oculta la inconsistencia. Si tres evaluadores llegan a resultados tan distintos evaluando lo mismo, el problema es el instrumento, no los evaluadores. Promediar tapa el síntoma sin tratar la causa.'
        },
        {
          texto: 'Acepto mi calificación y descarto las otras — yo fui quien diseñó la rúbrica y la conozco mejor.',
          correcta: false,
          feedback: 'La confianza en el propio criterio no resuelve la inconsistencia entre evaluadores. Si la rúbrica fuera clara, los tres docentes deberían llegar a calificaciones similares. El problema no es quién evaluó — es que los descriptores admiten interpretaciones distintas.'
        },
        {
          texto: 'Reunimos a los tres, comparamos qué descriptor interpretó cada uno para el criterio con mayor diferencia, y ajustamos la redacción para que sea observable y específica.',
          correcta: true,
          feedback: 'Esta es la respuesta de un equipo docente profesional. La variación entre evaluadores es señal de que los descriptores son ambiguos. Calibrar juntos — comparar interpretaciones, acordar criterios, precisar lenguaje — mejora la confiabilidad del instrumento para todos los grupos.'
        },
        {
          texto: 'Le pido al estudiante que realice el diagnóstico de nuevo para que los tres lo veamos al mismo tiempo.',
          correcta: false,
          feedback: 'Repetir la evaluación simultánea puede mejorar la consistencia puntualmente, pero no resuelve el problema de fondo: los descriptores son ambiguos. La próxima vez que evalúen por separado, volverá la disparidad.'
        }
      ]
    }
  ]
}

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
