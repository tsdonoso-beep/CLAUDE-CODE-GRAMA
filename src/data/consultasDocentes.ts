// src/data/consultasDocentes.ts
// Fase 1: localStorage (DEV_MODE)
// Fase 2: Supabase tabla consultas_docentes

import { supabase } from '@/lib/supabase'

const DEV_MODE = !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co'

export type EstadoConsulta = 'pendiente' | 'respondida'
export type ModuloConsulta = 'ruta' | 'sesiones_vivo' | 'repositorio'

export interface ConsultaDocente {
  id: string
  userId: string
  nombre?: string
  tallerSlug: string | null
  modulo: ModuloConsulta
  mensaje: string
  estado: EstadoConsulta
  respuesta?: string
  createdAt: string
  respondedAt?: string
  respondedBy?: string
}

export interface NuevaConsulta {
  userId: string
  nombre?: string
  tallerSlug: string | null
  modulo: ModuloConsulta
  mensaje: string
}

// Tipo fila de BD (para el admin)
export interface ConsultaDB {
  id: string
  user_id: string
  nombre: string | null
  taller_slug: string | null
  modulo: string
  mensaje: string
  estado: 'pendiente' | 'respondida'
  respuesta: string | null
  created_at: string
  responded_at: string | null
  responded_by: string | null
}

export const MODULOS_CONSULTA: { value: ModuloConsulta; label: string }[] = [
  { value: 'ruta',          label: 'Ruta de Aprendizaje' },
  { value: 'sesiones_vivo', label: 'Sesiones en Vivo' },
  { value: 'repositorio',   label: 'Repositorio' },
]

// ── localStorage (DEV_MODE) ──────────────────────────────────────────────────

const STORAGE_KEY = (userId: string) => `grama_consultas_${userId}`

function getConsultasLocal(userId: string): ConsultaDocente[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(userId))
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveConsultaLocal(data: NuevaConsulta): ConsultaDocente {
  const nueva: ConsultaDocente = {
    id:         crypto.randomUUID(),
    userId:     data.userId,
    nombre:     data.nombre,
    tallerSlug: data.tallerSlug,
    modulo:     data.modulo,
    mensaje:    data.mensaje,
    estado:     'pendiente',
    createdAt:  new Date().toISOString(),
  }
  const existing = getConsultasLocal(data.userId)
  localStorage.setItem(STORAGE_KEY(data.userId), JSON.stringify([nueva, ...existing]))
  return nueva
}

// ── Supabase ─────────────────────────────────────────────────────────────────

function dbToConsulta(row: ConsultaDB): ConsultaDocente {
  return {
    id:          row.id,
    userId:      row.user_id,
    nombre:      row.nombre ?? undefined,
    tallerSlug:  row.taller_slug,
    modulo:      row.modulo as ModuloConsulta,
    mensaje:     row.mensaje,
    estado:      row.estado,
    respuesta:   row.respuesta ?? undefined,
    createdAt:   row.created_at,
    respondedAt: row.responded_at ?? undefined,
    respondedBy: row.responded_by ?? undefined,
  }
}

async function getConsultasDB(userId: string): Promise<ConsultaDocente[]> {
  const { data } = await supabase
    .from('consultas_docentes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return (data ?? []).map(row => dbToConsulta(row as ConsultaDB))
}

async function saveConsultaDB(data: NuevaConsulta): Promise<ConsultaDocente> {
  const { data: row } = await supabase
    .from('consultas_docentes')
    .insert({
      user_id:    data.userId,
      nombre:     data.nombre ?? null,
      taller_slug: data.tallerSlug,
      modulo:     data.modulo,
      mensaje:    data.mensaje,
    })
    .select()
    .single()
  return dbToConsulta(row as ConsultaDB)
}

// ── API pública para docentes ─────────────────────────────────────────────────

export async function loadConsultas(userId: string): Promise<ConsultaDocente[]> {
  if (DEV_MODE) return getConsultasLocal(userId)
  return getConsultasDB(userId)
}

export async function guardarConsulta(data: NuevaConsulta): Promise<ConsultaDocente> {
  if (DEV_MODE) return saveConsultaLocal(data)
  return saveConsultaDB(data)
}

// ── API pública para admin ────────────────────────────────────────────────────

export function buildMockConsultas(): ConsultaDB[] {
  return [
    { id: 'c-1', user_id: 'mock-1', nombre: 'Carlos Quispe Mamani', taller_slug: 'mecanica-automotriz', modulo: 'ruta', mensaje: '¿Cuándo se habilita el módulo 2? Ya terminé el módulo 1 completo.', estado: 'pendiente', respuesta: null, created_at: '2026-04-20T10:00:00Z', responded_at: null, responded_by: null },
    { id: 'c-2', user_id: 'mock-1', nombre: 'Carlos Quispe Mamani', taller_slug: 'mecanica-automotriz', modulo: 'repositorio', mensaje: 'El manual del torno no abre, aparece error 404.', estado: 'pendiente', respuesta: null, created_at: '2026-04-19T15:30:00Z', responded_at: null, responded_by: null },
    { id: 'c-3', user_id: 'mock-2', nombre: 'María López Vargas', taller_slug: 'electricidad', modulo: 'sesiones_vivo', mensaje: '¿La sesión de mañana tiene grabación disponible después?', estado: 'respondida', respuesta: 'Sí, todas las sesiones quedan grabadas y disponibles en el repositorio 48h después.', created_at: '2026-04-15T09:00:00Z', responded_at: '2026-04-15T14:00:00Z', responded_by: 't.donoso@inroprin.com' },
  ]
}

export async function getAllConsultasAdmin(): Promise<ConsultaDB[]> {
  const { data } = await supabase
    .from('consultas_docentes')
    .select('*')
    .order('created_at', { ascending: false })
  return (data ?? []) as ConsultaDB[]
}

export async function responderConsultaDB(id: string, respuesta: string, adminEmail: string): Promise<void> {
  await supabase
    .from('consultas_docentes')
    .update({
      respuesta,
      estado:       'respondida',
      responded_at: new Date().toISOString(),
      responded_by: adminEmail,
    })
    .eq('id', id)
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function formatFechaConsulta(iso: string): string {
  const d     = new Date(iso)
  const ahora = new Date()
  const diff  = Math.floor((ahora.getTime() - d.getTime()) / 86400000)
  if (diff === 0) return 'Hoy · ' + d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
  if (diff === 1) return 'Ayer'
  if (diff < 7)   return `Hace ${diff} días`
  return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })
}

// Legacy sync export para compatibilidad (DEV_MODE)
export function getConsultas(userId: string): ConsultaDocente[] {
  return getConsultasLocal(userId)
}
export function saveConsulta(data: NuevaConsulta): ConsultaDocente {
  return saveConsultaLocal(data)
}
