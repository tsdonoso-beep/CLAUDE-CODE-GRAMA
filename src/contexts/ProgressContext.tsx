import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react'
import { modulosLXP } from '@/data/modulosLXP'
import type { EstadoModulo } from '@/mock/mockEstados'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

// ── Pre-cómputo estático ──────────────────────────────────────────────────────
// Se ejecuta UNA sola vez al cargar el módulo (no en cada render ni en cada
// llamada a las funciones del contexto). Elimina los flatMap/forEach repetidos.

/** IDs de contenidos agrupados por índice de módulo */
const MODULE_IDS: readonly string[][] = modulosLXP.map(m => {
  const ids: string[] = []
  m.subSecciones.forEach(s => s.contenidos.forEach(c => ids.push(c.id)))
  return ids
})

/** IDs de todos los contenidos de todos los módulos (aplanado) */
const ALL_IDS: readonly string[] = MODULE_IDS.flat()

/** Mapa de moduloId → índice, para lookup O(1) */
const MODULO_IDX: ReadonlyMap<string, number> = new Map(
  modulosLXP.map((m, i) => [m.id, i])
)

interface ContenidoEstado {
  completed: boolean
  inProgress: boolean
}

interface ProgressContextType {
  loading: boolean
  getContenidoEstado: (contenidoId: string) => ContenidoEstado
  markContenidoCompleted: (contenidoId: string) => void
  markContenidoInProgress: (contenidoId: string) => void
  getModuloProgreso: (tallerSlug: string, moduloNum: number) => { porcentaje: number; completados: number; total: number }
  getTallerProgreso: (tallerSlug: string) => { porcentaje: number; completados: number; total: number }
  /** Calcula el EstadoModulo para un módulo de modulosLXP (m0–m6) basado en progreso real */
  getEstadoModuloLXP: (moduloId: string) => EstadoModulo
}

const ProgressContext = createContext<ProgressContextType | null>(null)

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be inside ProgressProvider')
  return ctx
}

interface ProgressRecord {
  completed: boolean
  inProgress: boolean
}

const STORAGE_KEY = 'navigator-progress'

function loadLocalRecords(): Map<string, ProgressRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Map()
    const parsed = JSON.parse(raw) as Record<string, ProgressRecord>
    return new Map(Object.entries(parsed))
  } catch {
    return new Map()
  }
}

function saveLocalRecords(records: Map<string, ProgressRecord>) {
  const obj = Object.fromEntries(records)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
}


export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user, allUnlocked } = useAuth()
  const [records, setRecords] = useState<Map<string, ProgressRecord>>(() => loadLocalRecords())
  const [loading, setLoading] = useState(false)

  // Al autenticarse, cargar progreso desde Supabase — REEMPLAZA localStorage (fuente de verdad)
  useEffect(() => {
    if (!user) return

    setLoading(true)
    supabase
      .from('progreso_contenidos')
      .select('contenido_id, estado')
      .eq('usuario_id', user.id)
      .then(({ data }) => {
        // Aunque no haya datos, reemplazamos para limpiar cualquier caché stale
        const fresh = new Map<string, ProgressRecord>()
        if (data) {
          data.forEach(({ contenido_id, estado }) => {
            fresh.set(contenido_id, {
              completed: estado === 'completado',
              inProgress: estado === 'en_progreso',
            })
          })
        }
        saveLocalRecords(fresh)
        setRecords(fresh)
        setLoading(false)
      })
  }, [user?.id])

  // Sincronizar a Supabase en background
  async function syncToSupabase(contenidoId: string, estado: 'completado' | 'en_progreso') {
    if (!user) return
    await supabase.from('progreso_contenidos').upsert(
      { usuario_id: user.id, contenido_id: contenidoId, estado, updated_at: new Date().toISOString() },
      { onConflict: 'usuario_id,contenido_id' }
    )
  }

  const getContenidoEstado = useCallback((contenidoId: string): ContenidoEstado => {
    const r = records.get(contenidoId)
    return { completed: r?.completed || false, inProgress: r?.inProgress || false }
  }, [records])

  const markContenidoCompleted = useCallback((contenidoId: string) => {
    setRecords(prev => {
      const next = new Map(prev)
      next.set(contenidoId, { completed: true, inProgress: false })
      saveLocalRecords(next)
      return next
    })
    syncToSupabase(contenidoId, 'completado')
  }, [user])

  const markContenidoInProgress = useCallback((contenidoId: string) => {
    setRecords(prev => {
      const existing = prev.get(contenidoId)
      if (existing?.completed) return prev
      const next = new Map(prev)
      next.set(contenidoId, { completed: false, inProgress: true })
      saveLocalRecords(next)
      return next
    })
    syncToSupabase(contenidoId, 'en_progreso')
  }, [user])

  /**
   * Progreso de un módulo específico.
   * Usa los IDs de modulosLXP (fuente única de verdad) en lugar de modulosConfig.
   * El parámetro tallerSlug se mantiene por compatibilidad de API pero no se usa,
   * ya que los IDs de modulosLXP son genéricos (no dependientes del taller).
   */
  const getModuloProgreso = useCallback((_tallerSlug: string, moduloNum: number) => {
    const idx = modulosLXP.findIndex(m => m.numero === moduloNum)
    const ids = idx >= 0 ? MODULE_IDS[idx] : []
    const total = ids.length
    const completados = ids.filter(id => records.get(id)?.completed).length
    const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0
    return { porcentaje, completados, total }
  }, [records])

  /**
   * Progreso total del taller.
   * Usa todos los IDs de modulosLXP (fuente única de verdad).
   * El tallerSlug se mantiene por compatibilidad pero no se usa.
   */
  const getTallerProgreso = useCallback((_tallerSlug: string) => {
    const total = ALL_IDS.length
    const completados = ALL_IDS.filter(id => records.get(id)?.completed).length
    const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0
    return { porcentaje, completados, total }
  }, [records])

  /**
   * Estado de bloqueo de un módulo LXP.
   * Regla: módulo N bloqueado si el N-1 no está al 100%.
   * Excepción: admins y docente@grama.pe (allUnlocked) nunca ven bloqueos.
   * NO se bypasea en DEV_MODE — los bloqueos son reales para docentes.
   */
  const getEstadoModuloLXP = useCallback((moduloId: string): EstadoModulo => {
    const idx = MODULO_IDX.get(moduloId)
    if (idx === undefined) return 'bloqueado'

    function pct(ids: readonly string[]): number {
      if (ids.length === 0) return 0
      return Math.round(ids.filter(id => records.get(id)?.completed).length / ids.length * 100)
    }

    // Solo admins y la cuenta demo tienen acceso libre — nunca DEV_MODE genérico
    if (idx > 0 && !allUnlocked && pct(MODULE_IDS[idx - 1]) < 100) return 'bloqueado'

    const p = pct(MODULE_IDS[idx])
    if (p === 100) return 'completado'
    if (p > 0) return 'en_curso'
    return 'disponible'
  }, [records, allUnlocked])

  const contextValue = useMemo(() => ({
    loading,
    getContenidoEstado,
    markContenidoCompleted,
    markContenidoInProgress,
    getModuloProgreso,
    getTallerProgreso,
    getEstadoModuloLXP,
  }), [loading, getContenidoEstado, markContenidoCompleted, markContenidoInProgress, getModuloProgreso, getTallerProgreso, getEstadoModuloLXP])

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  )
}
