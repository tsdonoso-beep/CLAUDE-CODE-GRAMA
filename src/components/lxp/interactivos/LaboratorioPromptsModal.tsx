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
]
