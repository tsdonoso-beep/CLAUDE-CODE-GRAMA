// src/data/consultasDocentes.ts
// Tipos y helpers para el sistema de consultas docentes.
// Fase 1: localStorage (DEV_MODE y sin Supabase)
// Fase 2: migrar a Supabase tabla consultas_docentes

export type EstadoConsulta = 'pendiente' | 'respondida'
export type ModuloConsulta = 'ruta' | 'sesiones_vivo' | 'repositorio'

export interface ConsultaDocente {
  id: string
  userId: string
  tallerSlug: string | null
  modulo: ModuloConsulta
  mensaje: string
  estado: EstadoConsulta
  respuesta?: string
  createdAt: string   // ISO
  respondedAt?: string
}

export interface NuevaConsulta {
  userId: string
  tallerSlug: string | null
  modulo: ModuloConsulta
  mensaje: string
}

export const MODULOS_CONSULTA: { value: ModuloConsulta; label: string }[] = [
  { value: 'ruta',          label: 'Ruta de Aprendizaje' },
  { value: 'sesiones_vivo', label: 'Sesiones en Vivo' },
  { value: 'repositorio',   label: 'Repositorio' },
]

const STORAGE_KEY = (userId: string) => `grama_consultas_${userId}`

// ── CRUD localStorage ────────────────────────────────────────────────────────

export function getConsultas(userId: string): ConsultaDocente[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(userId))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveConsulta(data: NuevaConsulta): ConsultaDocente {
  const nueva: ConsultaDocente = {
    id:         crypto.randomUUID(),
    userId:     data.userId,
    tallerSlug: data.tallerSlug,
    modulo:     data.modulo,
    mensaje:    data.mensaje,
    estado:     'pendiente',
    createdAt:  new Date().toISOString(),
  }
  const existing = getConsultas(data.userId)
  localStorage.setItem(STORAGE_KEY(data.userId), JSON.stringify([nueva, ...existing]))
  return nueva
}

export function formatFechaConsulta(iso: string): string {
  const d = new Date(iso)
  const ahora = new Date()
  const diffDias = Math.floor((ahora.getTime() - d.getTime()) / 86400000)
  if (diffDias === 0) return 'Hoy · ' + d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
  if (diffDias === 1) return 'Ayer'
  if (diffDias < 7)  return `Hace ${diffDias} días`
  return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })
}
