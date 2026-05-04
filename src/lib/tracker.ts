// src/lib/tracker.ts
// Módulo centralizado de analytics — graba eventos en Supabase sin bloquear la UI.
// En DEV_MODE (sin Supabase real) todas las funciones son no-ops silenciosas.

import { supabase } from '@/lib/supabase'

const DEV_MODE = !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co'

// ── Tipos de eventos ──────────────────────────────────────────────────────────

export type TipoEvento =
  | 'apertura_manual'
  | 'reproduccion_video'
  | 'descarga'
  | 'apertura_ficha'

export type TipoContenido =
  | 'manual'
  | 'video'
  | 'descargable'
  | 'ficha'

export type PaginaNavegacion =
  | 'perfil'
  | 'taller_hub'
  | 'repositorio'
  | 'ruta_aprendizaje'
  | 'modulo'

// ── Helpers internos ──────────────────────────────────────────────────────────

function fire(promise: Promise<unknown>) {
  promise.catch(err => console.warn('[tracker]', err))
}

// ── API pública ───────────────────────────────────────────────────────────────

/**
 * Registra un inicio de sesión (login).
 * Llámalo justo después de que Supabase confirme la sesión del usuario.
 */
export function trackLogin(usuarioId: string, _tallerSlug?: string | null) {
  if (DEV_MODE) return
  fire(
    supabase.from('eventos_sesion').insert({
      user_id: usuarioId,
      tipo: 'login',
    })
  )
}

/**
 * Registra una visita de página.
 * @param pagina  Identificador semántico de la página visitada.
 * @param referrer Página anterior si se conoce (ej. 'perfil', 'ruta_aprendizaje').
 */
export function trackNavegacion(
  usuarioId: string,
  pagina: PaginaNavegacion,
  _tallerSlug?: string | null,
  _referrer?: string | null,
) {
  if (DEV_MODE) return
  fire(
    supabase.from('eventos_navegacion').insert({
      user_id: usuarioId,
      path: pagina,
    })
  )
}

/**
 * Registra la apertura / reproducción / descarga de un contenido del repositorio.
 * @param bienId    ID único del bien (contenido), ej. "bien-m1-01".
 * @param bienNombre Nombre legible del bien para mostrar en el panel Admin.
 */
export function trackContenido(
  usuarioId: string,
  bienId: string,
  _bienNombre: string,
  tipoEvento: TipoEvento,
  _tipoContenido: TipoContenido,
  tallerSlug?: string | null,
) {
  if (DEV_MODE) return
  fire(
    supabase.from('eventos_contenido').insert({
      user_id: usuarioId,
      contenido_id: bienId,
      tipo: tipoEvento,
      taller_slug: tallerSlug ?? null,
    })
  )
}
