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
]
