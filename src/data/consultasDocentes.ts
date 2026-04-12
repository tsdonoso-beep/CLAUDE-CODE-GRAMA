// src/data/consultasDocentes.ts
// Tipos y helpers para el sistema de consultas docentes.
// Fase 1: localStorage (DEV_MODE y sin Supabase)
// Fase 2: migrar a Supabase tabla consultas_docentes

export type EstadoConsulta = 'pendiente' | 'respondida'
export type ModuloConsulta = 'M0' | 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6' | 'B1' | 'general'

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
  { value: 'general', label: 'General / Sin módulo específico' },
  { value: 'M0',      label: 'M0 · Inicio y Diagnóstico' },
  { value: 'M1',      label: 'M1 · Reconocimiento del Taller' },
  { value: 'M2',      label: 'M2 · Zona de Investigación' },
  { value: 'M3',      label: 'M3 · Zona de Almacén' },
  { value: 'M4',      label: 'M4 · Zona de Innovación' },
  { value: 'M5',      label: 'M5 · Programa Formativo' },
  { value: 'M6',      label: 'M6 · Proyecto Final' },
  { value: 'B1',      label: 'B1 · Mantenimiento' },
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
