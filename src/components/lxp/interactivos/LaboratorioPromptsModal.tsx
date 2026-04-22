import { useState } from 'react'
import { X, ChevronRight, RotateCcw, Sparkles, CheckCircle2, XCircle } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'

interface OpcionPrompt {
  prompt: string
  calidad: 'malo' | 'regular' | 'bueno'
  preview: string
  explicacion: string
}

interface Escenario {
  necesidad: string
  contexto: string
  opciones: OpcionPrompt[]
  mejorIdx: number
}

const ESCENARIOS: Escenario[] = [
  {
    necesidad: 'Crear un protocolo de seguridad para el elevador tipo tijera',
    contexto: 'Acabas de recibir el elevador. Necesitas un protocolo de seguridad claro para que tus estudiantes lo usen correctamente desde el primer día.',
    opciones: [
      {
        prompt: '"Escríbeme un protocolo de seguridad."',
        calidad: 'malo',
        preview: 'Protocolo de Seguridad General\n1. Usar EPP adecuado\n2. Revisar el equipo antes de usar\n3. Seguir las instrucciones del fabricante\n4. Reportar fallas al responsable\n5. Mantener el área limpia...',
        explicacion: 'Sin contexto ni estructura, la IA genera un protocolo genérico que podría aplicarse a cualquier equipo. No menciona el elevador, el taller automotriz, ni los riesgos específicos del foso.'
      },
      {
        prompt: '"Crea un protocolo de seguridad para elevador tipo tijera en taller automotriz escolar, incluyendo: EPP mínimo obligatorio, verificación pre-uso de seguros hidráulicos, zona de seguridad alrededor del vehículo y protocolo si falla el sistema. Formato: lista numerada, lenguaje directo para estudiantes de secundaria. 1 página A4."',
        calidad: 'bueno',
        preview: 'PROTOCOLO DE SEGURIDAD — ELEVADOR TIPO TIJERA\n\nEPP OBLIGATORIO: Lentes + casco + overol + zapatos punta acero\n\n1. ANTES DE ELEVAR:\n   □ Verificar nivel aceite hidráulico (mirilla en verde)\n   □ Activar seguros mecánicos — escuchar el "clic" de retención\n   □ Delimitar zona de 1.5m alrededor del vehículo...',
        explicacion: 'Especificó el equipo (elevador tipo tijera), el contexto (taller escolar), la estructura requerida (EPP, verificación, zona, protocolo de falla), el formato (lista numerada) y el destinatario (estudiantes de secundaria). Resultado: documento usable directamente.'
      },
      {
        prompt: '"Hazme algo sobre seguridad en talleres automotrices para mis alumnos."',
        calidad: 'regular',
        preview: 'Seguridad en el Taller Automotriz\n\nLa seguridad es fundamental en cualquier taller. Los estudiantes deben conocer los riesgos y cómo prevenirlos. El EPP (Equipo de Protección Personal) incluye...',
        explicacion: 'Mejor que el primero porque menciona el taller automotriz y los alumnos, pero "algo sobre seguridad" es vago. El resultado es un texto informativo general, no un protocolo operativo con pasos concretos.'
      }
    ],
    mejorIdx: 1
  },
  {
    necesidad: 'Diseñar una rúbrica para evaluar el diagnóstico con escáner OBD-II',
    contexto: 'Terminaste el módulo de diagnóstico. Necesitas una rúbrica para evaluar si tus estudiantes dominan el uso del escáner OBD-II con procedimiento técnico correcto.',
    opciones: [
      {
        prompt: '"Necesito una rúbrica analítica con 4 criterios (procedimiento de conexión, lectura e interpretación de códigos, registro de datos del diagnóstico, seguridad durante el proceso) y 4 niveles (Inicio/Proceso/Logrado/Destacado) para evaluar: uso del escáner OBD-II para diagnóstico de fallas del motor. Estudiantes de 4° secundaria, taller automotriz EPT-MINEDU. Incluir descriptores observables y específicos, no genéricos."',
        calidad: 'bueno',
        preview: 'RÚBRICA — DIAGNÓSTICO CON ESCÁNER OBD-II\n\nCRITERIO 1: Procedimiento de conexión\nDestacado: Conecta al puerto OBD con llave en posición II, espera inicialización completa y verifica comunicación antes de solicitar datos\nLogrado: Conecta correctamente y verifica comunicación\nProceso: Conecta pero necesita orientación para verificar...',
        explicacion: 'Especificó el tipo de rúbrica (analítica), los 4 criterios exactos, los 4 niveles con sus nombres, la tarea concreta, el contexto y la instrucción clave ("descriptores observables, no genéricos"). El resultado es directamente evaluable.'
      },
      {
        prompt: '"Rúbrica para evaluar escáner OBD."',
        calidad: 'malo',
        preview: 'Rúbrica de Evaluación — Escáner OBD\n\nExcelente: El estudiante usa el escáner correctamente\nBueno: El estudiante usa el escáner con algunos errores\nRegular: El estudiante necesita ayuda para usar el escáner\nInsuficiente: El estudiante no puede usar el escáner...',
        explicacion: '"Correctamente", "algunos errores", "necesita ayuda" son descriptores inutilizables: dos docentes evaluando al mismo estudiante llegarán a conclusiones distintas. Este prompt produce una rúbrica que parece una rúbrica pero no puede usarse con confiabilidad.'
      },
      {
        prompt: '"Crea una rúbrica para evaluar a estudiantes de secundaria técnica usando el escáner OBD-II, con niveles de logro y criterios de evaluación relacionados al procedimiento técnico."',
        calidad: 'regular',
        preview: 'Rúbrica de Evaluación — Escáner OBD-II (Secundaria Técnica)\n\nCriterio 1: Uso del equipo\nLogrado (4): Conecta y opera el escáner siguiendo el procedimiento técnico\nEn proceso (3): Opera con supervisión del docente\nInicio (2): Requiere asistencia constante...',
        explicacion: 'Mejor — menciona el nivel educativo y el procedimiento técnico. Pero al no especificar los criterios ni pedir descriptores observables, la IA elige criterios genéricos. El resultado es mejorable pero requiere bastante edición manual.'
      }
    ],
    mejorIdx: 0
  },
  {
    necesidad: 'Generar un plan de sesión para la instalación del compresor',
    contexto: 'Tienes una sesión de 90 minutos para enseñar la instalación del compresor de aire. Quieres que la IA te ayude a estructurar la sesión con actividades concretas.',
    opciones: [
      {
        prompt: '"Diseña una sesión de aprendizaje de 90 minutos para docentes de taller automotriz sobre: instalación y puesta en marcha del compresor de aire (50L, 3HP, 220V). Incluir: objetivo en términos de competencia observable, distribución de tiempo por momento (inicio/desarrollo/cierre), actividades prácticas por estación si hay más de 20 estudiantes, materiales necesarios y criterio de evaluación de cierre. Nivel: docentes de secundaria técnica EPT-MINEDU."',
        calidad: 'bueno',
        preview: 'PLAN DE SESIÓN — Instalación del Compresor de Aire\nDuración: 90 min | Modalidad: Presencial-práctica\n\nCOMPETENCIA: Instala y pone en marcha el compresor de aire siguiendo el manual del fabricante, verificando presión de trabajo y conexiones de seguridad.\n\nINICIO (15 min)\n• Verificación de EPP (5 min)\n• Pregunta detonadora: "¿Qué pasaría si conectamos el compresor sin verificar la válvula de seguridad?" (10 min)\n\nDESARROLLO (60 min) — 3 estaciones rotativas...',
        explicacion: 'El prompt especificó duración, equipo exacto con sus especificaciones técnicas (50L, 3HP, 220V), estructura requerida (objetivo, distribución, estaciones, materiales, evaluación) y el contexto del docente. El resultado es un plan directamente aplicable.'
      },
      {
        prompt: '"Plan de clase sobre el compresor."',
        calidad: 'malo',
        preview: 'Plan de Clase: El Compresor\n\nObjetivo: Que los estudiantes conozcan el compresor.\nTiempo: A definir\nActividades:\n1. Introducción teórica\n2. Demostración\n3. Práctica\nEvaluación: Observación del docente',
        explicacion: '"El compresor" sin especificaciones genera un plan que aplica a cualquier máquina en cualquier contexto. Sin duración, sin nivel educativo, sin estructura requerida, el resultado es un esqueleto vacío que requiere rehacerse completo.'
      },
      {
        prompt: '"Arma un plan de sesión de 90 minutos para enseñar a instalar un compresor en el taller automotriz, con actividades prácticas y evaluación."',
        calidad: 'regular',
        preview: 'PLAN DE SESIÓN — Instalación del Compresor (90 min)\n\nObjetivo: El estudiante instalará el compresor correctamente.\n\nInicio (10 min): Presentar el equipo y sus características\nDesarrollo (70 min): Demostración + práctica guiada\nCierre (10 min): Evaluación de lo aprendido\n\nMateriales: Compresor, manual, herramientas básicas',
        explicacion: 'Mejor — tiene duración y contexto de taller. Pero "actividades prácticas" sin especificar cuántos estudiantes ni cómo organizarlos produce una sesión que asume un grupo pequeño con acceso simultáneo. En un grupo de 28, este plan no funciona sin adaptación mayor.'
      }
    ],
    mejorIdx: 0
  },
  {
    necesidad: 'Crear un quiz de EPP para que tus estudiantes practiquen antes de la sesión del elevador',
    contexto: 'Mañana usarán el elevador por primera vez. Quieres enviarles un quiz corto por la plataforma para asegurarte de que lleguen sabiendo qué EPP necesitan y por qué.',
    opciones: [
      {
        prompt: '"Quiz sobre EPP."',
        calidad: 'malo',
        preview: '1. ¿Qué significa EPP?\na) Equipo de Protección Personal\nb) Elemento de Prevención de Peligros\nc) Equipo de Primera Prioridad\n\n2. ¿Cuál es el EPP más importante?\na) El casco\nb) Los guantes\nc) Depende de la actividad...',
        explicacion: 'Sin contexto, la IA genera un quiz de definiciones genéricas. "¿Qué significa EPP?" mide memoria, no criterio. Los estudiantes de automotriz necesitan saber qué EPP usar en cada situación del taller, no deletrear el acrónimo.'
      },
      {
        prompt: '"Crea 5 preguntas de opción múltiple (4 opciones cada una) sobre EPP en el taller automotriz, enfocadas en situaciones reales de decisión: cuándo usar qué EPP y por qué. Contexto: estudiantes de 4° secundaria que usarán el elevador tipo tijera por primera vez. Incluir una pregunta sobre qué hacer si un compañero no tiene su EPP. Nivel de dificultad: aplicación, no memorización."',
        calidad: 'bueno',
        preview: '1. Vas a trabajar bajo un vehículo levantado con el elevador tipo tijera. ¿Cuál es el EPP mínimo obligatorio ANTES de ingresar al espacio bajo el vehículo?\na) Solo guantes de mecánico\nb) Lentes + casco + overol sin partes sueltas + zapatos punta de acero ✓\nc) Lentes y guantes son suficientes\nd) El docente decide caso por caso\n\n2. Tu compañero va a trabajar bajo el vehículo pero olvidó sus lentes de seguridad. ¿Qué haces?...',
        explicacion: 'Especificó cantidad (5), formato (4 opciones), el tipo de situaciones (decisión real), el contexto exacto (elevador tipo tijera, primera vez), una pregunta específica (compañero sin EPP) y el nivel cognitivo (aplicación). El resultado es directamente usable en la plataforma.'
      },
      {
        prompt: '"Hazme preguntas sobre el EPP que necesitan para usar el elevador del taller."',
        calidad: 'regular',
        preview: '1. ¿Qué EPP se necesita para usar el elevador?\na) Solo guantes\nb) Lentes, casco y overol\nc) No se necesita EPP si el elevador está en buen estado\nd) El docente decide\n\n2. ¿Por qué es importante usar lentes al trabajar bajo el elevador?\na) Por reglamento\nb) Para proteger los ojos de partículas y fluidos...',
        explicacion: 'Mejor que el primero — menciona el elevador y el taller. Pero "hazme preguntas" sin especificar cantidad, formato ni nivel cognitivo produce un resultado variable. Este prompt genera algo útil pero incompleto: faltan situaciones de decisión real y la pregunta del compañero sin EPP, que es la más importante pedagógicamente.'
      }
    ],
    mejorIdx: 1
  },
  {
    necesidad: 'Traducir y resumir el manual técnico del escáner LAUNCH X431 (en inglés)',
    contexto: 'Recibiste el manual del escáner LAUNCH X431 en inglés. Necesitas extraer los pasos de instalación del software y convertirlos en una lista de verificación en español para tus estudiantes.',
    opciones: [
      {
        prompt: '"Traduce este manual."',
        calidad: 'malo',
        preview: '[Traducción literal del manual completo, incluyendo advertencias legales, especificaciones técnicas en detalle, información de garantía, índice completo, apéndices...]',
        explicacion: 'Sin especificar qué parte traducir ni en qué formato, la IA traduce todo el documento. El resultado es tan extenso como el original — no resuelve el problema del docente que necesita algo concreto y usable en el aula.'
      },
      {
        prompt: '"Lee el manual adjunto del escáner LAUNCH X431. Extrae SOLO los pasos de instalación del software de diagnóstico en Windows. Conviértelos en una lista de verificación numerada en español, con lenguaje simple para estudiantes de secundaria técnica. Máximo 15 pasos. Agrega una advertencia en rojo para el paso más crítico."',
        calidad: 'bueno',
        preview: 'CHECKLIST — Instalación Software LAUNCH X431\n\n□ 1. Conectar el adaptador OBD al puerto USB de la tablet antes de instalar\n□ 2. Descargar el instalador desde: [URL oficial]\n□ 3. Ejecutar como Administrador (clic derecho → Ejecutar como administrador)\n...\n⚠️ PASO CRÍTICO — Paso 7: NO conectar el adaptador OBD al vehículo durante la instalación del driver. Puede causar error de reconocimiento permanente.\n□ 8. Reiniciar el equipo antes de la primera conexión...',
        explicacion: 'Especificó qué extraer (solo instalación del software), el formato (lista de verificación numerada), el idioma (español), el destinatario (estudiantes de secundaria técnica), el límite (15 pasos) y un elemento especial (advertencia para el paso crítico). El resultado es directamente imprimible y usable.'
      },
      {
        prompt: '"Resume el manual del escáner LAUNCH en español para mis alumnos."',
        calidad: 'regular',
        preview: 'Resumen del Manual LAUNCH X431\n\nEl escáner LAUNCH X431 es una herramienta de diagnóstico automotriz. Para instalarlo:\n1. Instalar el software desde el CD o descarga\n2. Conectar el adaptador\n3. Seguir las instrucciones en pantalla\n\nFunciones principales:\n• Lectura de códigos OBD\n• Datos en tiempo real...',
        explicacion: 'Mejor — pide resumen en español para alumnos. Pero "resume el manual" es ambiguo: ¿todo el manual o solo una parte? El resultado mezcla instalación con funciones sin estructura de checklist. Útil como punto de partida pero requiere edición para convertirse en una lista de verificación usable.'
      }
    ],
    mejorIdx: 1
  },
]

// ─── Componente UI ────────────────────────────────────────────────────────────

const CALIDAD_COLOR: Record<string, string> = { malo: '#f43f5e', regular: '#f59e0b', bueno: '#02d47e' }
const CALIDAD_LABEL: Record<string, string> = { malo: 'Prompt débil', regular: 'Prompt mejorable', bueno: 'Prompt efectivo' }

interface Props {
  onClose: () => void
  onComplete: () => void
}

export function LaboratorioPromptsModal({ onClose, onComplete }: Props) {
  const [paso, setPaso] = useState<'intro' | number | 'final'>('intro')
  const [selecciones, setSelecciones] = useState<(number | null)[]>(Array(ESCENARIOS.length).fill(null))
  const [mostrandoFeedback, setMostrandoFeedback] = useState(false)
  const [expandedPreview, setExpandedPreview] = useState<number | null>(null)

  useEscapeKey(onClose)

  const escenario = typeof paso === 'number' ? ESCENARIOS[paso] : null
  const seleccionActual = typeof paso === 'number' ? selecciones[paso] : null
  const aciertos = selecciones.filter((s, i) => s !== null && s === ESCENARIOS[i].mejorIdx).length

  function seleccionar(idx: number) {
    if (mostrandoFeedback || typeof paso !== 'number') return
    const nuevas = [...selecciones]
    nuevas[paso] = idx
    setSelecciones(nuevas)
    setMostrandoFeedback(true)
    setExpandedPreview(null)
  }

  function avanzar() {
    if (typeof paso !== 'number') return
    setMostrandoFeedback(false)
    setExpandedPreview(null)
    if (paso + 1 < ESCENARIOS.length) setPaso(paso + 1)
    else { setPaso('final'); onComplete() }
  }

  function reiniciar() {
    setPaso('intro')
    setSelecciones(Array(ESCENARIOS.length).fill(null))
    setMostrandoFeedback(false)
    setExpandedPreview(null)
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
            <Sparkles size={16} color="#02d47e" />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#02d47e' }}>
              Laboratorio de prompts — IA para el taller automotriz
            </span>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-white/10">
            <X size={18} color="white" />
          </button>
        </div>

        {/* Progreso */}
        {typeof paso === 'number' && (
          <div className="flex gap-1 px-5 pt-4">
            {ESCENARIOS.map((_, i) => (
              <div key={i} className="h-1 flex-1 rounded-full transition-all"
                style={{ background: i < paso ? '#02d47e' : i === paso ? '#043941' : '#e2e8f0' }} />
            ))}
          </div>
        )}

        <div className="px-6 py-5">

          {/* INTRO */}
          {paso === 'intro' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold" style={{ color: '#043941' }}>
                Laboratorio de prompts para docentes
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                Te presentaré <strong>{ESCENARIOS.length} necesidades reales</strong> del taller automotriz. Para cada una, elige el prompt que mejor le comunicaría tu necesidad a una IA como Claude o ChatGPT.
              </p>
              <div className="rounded-xl p-4 text-sm" style={{ background: '#f0fdf8', borderLeft: '4px solid #02d47e', color: '#043941' }}>
                <p className="font-semibold mb-1">Un buen prompt tiene:</p>
                <ul className="space-y-1 list-disc list-inside" style={{ color: '#475569' }}>
                  <li>Contexto específico (taller, nivel, equipo)</li>
                  <li>Tarea clara (qué debe producir la IA)</li>
                  <li>Formato requerido (extensión, estructura)</li>
                  <li>Destinatario (para quién es el resultado)</li>
                </ul>
              </div>
              <button onClick={() => setPaso(0)}
                className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:opacity-90"
                style={{ background: '#043941' }}>
                Iniciar laboratorio <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* ESCENARIO */}
          {typeof paso === 'number' && escenario && (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
                Escenario {paso + 1} de {ESCENARIOS.length}
              </div>
              <div className="rounded-xl p-4 text-sm" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <p className="font-semibold mb-1" style={{ color: '#043941' }}>📋 {escenario.necesidad}</p>
                <p style={{ color: '#64748b' }}>{escenario.contexto}</p>
              </div>
              <p className="text-sm font-semibold" style={{ color: '#043941' }}>¿Cuál prompt usarías?</p>

              <div className="space-y-3">
                {escenario.opciones.map((op, idx) => {
                  const seleccionada = seleccionActual === idx
                  const esMejor = idx === escenario.mejorIdx
                  let borde = '#e2e8f0'; let fondo = '#f8fafc'
                  if (mostrandoFeedback) {
                    if (seleccionada && esMejor) { borde = '#02d47e'; fondo = '#f0fdf8' }
                    else if (seleccionada && !esMejor) { borde = '#f43f5e'; fondo = '#fff1f2' }
                    else if (!seleccionada && esMejor) { borde = '#02d47e'; fondo = '#f0fdf8' }
                  }
                  return (
                    <div key={idx} className="rounded-xl border-2 overflow-hidden transition-all" style={{ borderColor: borde, background: fondo }}>
                      <button onClick={() => seleccionar(idx)} disabled={mostrandoFeedback}
                        className="w-full text-left px-4 py-3 text-sm font-mono leading-relaxed">
                        <div className="flex items-start gap-2">
                          {mostrandoFeedback && (seleccionada || esMejor) && (
                            (esMejor)
                              ? <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: '#02d47e' }} />
                              : <XCircle size={15} className="mt-0.5 shrink-0" style={{ color: '#f43f5e' }} />
                          )}
                          <span style={{ color: '#1e293b' }}>{op.prompt}</span>
                        </div>
                      </button>
                      {mostrandoFeedback && (
                        <div className="border-t px-4 pb-3" style={{ borderColor: borde }}>
                          <button
                            onClick={() => setExpandedPreview(expandedPreview === idx ? null : idx)}
                            className="text-xs mt-2 flex items-center gap-1 font-semibold"
                            style={{ color: CALIDAD_COLOR[op.calidad] }}>
                            {CALIDAD_LABEL[op.calidad]} — {expandedPreview === idx ? 'Ocultar' : 'Ver resultado simulado'}
                          </button>
                          {expandedPreview === idx && (
                            <div className="mt-2 space-y-2">
                              <pre className="text-xs rounded-lg p-3 whitespace-pre-wrap leading-relaxed"
                                style={{ background: '#1e293b', color: '#94a3b8', fontFamily: 'monospace' }}>
                                {op.preview}
                              </pre>
                              <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>{op.explicacion}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {mostrandoFeedback && (
                <button onClick={avanzar}
                  className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:opacity-90"
                  style={{ background: '#043941' }}>
                  {paso + 1 < ESCENARIOS.length ? 'Siguiente escenario' : 'Ver resultado'}
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          )}

          {/* FINAL */}
          {paso === 'final' && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-bold mb-3"
                  style={{
                    background: aciertos >= 4 ? '#f0fdf8' : aciertos >= 3 ? '#fefce8' : '#fff1f2',
                    color: aciertos >= 4 ? '#065f46' : aciertos >= 3 ? '#854d0e' : '#9f1239'
                  }}>
                  {aciertos}/{ESCENARIOS.length}
                </div>
                <h2 className="text-lg font-bold" style={{ color: '#043941' }}>
                  {aciertos >= 4 ? '¡Excelente criterio para diseñar prompts!' : aciertos >= 3 ? 'Buen avance — sigue practicando' : 'Revisa los principios del buen prompt'}
                </h2>
              </div>
              <div className="rounded-xl p-4 text-sm" style={{ background: '#f0fdf8', borderLeft: '4px solid #02d47e', color: '#043941' }}>
                <p className="font-semibold mb-1">Recuerda</p>
                <p>Un prompt efectivo no es más largo — es más específico. Contexto + tarea + formato + destinatario. Practicar el diseño de prompts es practicar el pensamiento claro.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={reiniciar}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 hover:bg-slate-50"
                  style={{ borderColor: '#043941', color: '#043941' }}>
                  <RotateCcw size={15} /> Reintentar
                </button>
                <button onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white hover:opacity-90"
                  style={{ background: '#043941' }}>
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
