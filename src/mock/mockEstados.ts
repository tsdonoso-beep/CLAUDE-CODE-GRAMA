// src/mock/mockEstados.ts
// Estado estático hardcodeado de módulos — Fase 1 (sin persistencia)
// En Fase 2: reemplazar con hook useProgress() que leerá de Supabase

export type EstadoModulo = 'disponible' | 'en_curso' | 'completado' | 'bloqueado'

export interface EstadoModuloItem {
  moduloId: string
  estado: EstadoModulo
  porcentaje: number  // 0-100
}

// M0 → completado (diagnóstico de apertura realizado)
// M1 → en_curso (actualmente trabajando en seguridad del taller)
// M2–M6 → disponible (sin bloqueos — modo inspección de desarrollo)
export const mockEstadosModulos: EstadoModuloItem[] = [
  { moduloId: 'm0', estado: 'completado', porcentaje: 100 },
  { moduloId: 'm1', estado: 'en_curso',   porcentaje: 35  },
  { moduloId: 'm2', estado: 'disponible', porcentaje: 0   },
  { moduloId: 'm3', estado: 'disponible', porcentaje: 0   },
  { moduloId: 'm4', estado: 'disponible', porcentaje: 0   },
  { moduloId: 'm5', estado: 'disponible', porcentaje: 0   },
  { moduloId: 'm6', estado: 'disponible', porcentaje: 0   },
]

// Resumen de progreso alineado con mockEstadosModulos
export const mockProgreso = {
  modulosCompletados: 1,
  modulosTotal: 7,
  horasCompletadas: 22,
  horasTotal: 150,
  porcentajeGeneral: 14
}

// Próxima sesión en vivo (para LiveSessionCard)
export const mockProximaSesion = {
  id: 'live-m1-cierre',
  titulo: 'Cierre M1 — Casos de Seguridad en el Taller',
  moduloId: 'm1',
  moduloNombre: 'Seguridad y Arquitectura del Taller',
  fecha: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días
  duracionMin: 120,
  formador: 'Ing. Carlos Mendoza',
  plataforma: 'Google Meet',
  urlAcceso: '#'
}

export function getEstadoModulo(moduloId: string): EstadoModuloItem {
  return mockEstadosModulos.find(e => e.moduloId === moduloId) ?? {
    moduloId,
    estado: 'bloqueado',
    porcentaje: 0
  }
}
