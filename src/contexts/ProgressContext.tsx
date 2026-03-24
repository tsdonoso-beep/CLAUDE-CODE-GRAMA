import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { buildModulosForTaller } from '@/data/modulosConfig'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

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
  const { user } = useAuth()
  const [records, setRecords] = useState<Map<string, ProgressRecord>>(() => loadLocalRecords())
  const [loading, setLoading] = useState(false)

  // Al autenticarse, cargar progreso desde Supabase y fusionar con localStorage
  useEffect(() => {
    if (!user) return

    setLoading(true)
    supabase
      .from('progreso_contenidos')
      .select('contenido_id, estado')
      .eq('usuario_id', user.id)
      .then(({ data }) => {
        if (!data) { setLoading(false); return }

        setRecords(prev => {
          const merged = new Map(prev)
          data.forEach(({ contenido_id, estado }) => {
            merged.set(contenido_id, {
              completed: estado === 'completado',
              inProgress: estado === 'en_progreso',
            })
          })
          saveLocalRecords(merged)
          return merged
        })
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

  const getModuloProgreso = useCallback((tallerSlug: string, moduloNum: number) => {
    const modulos = buildModulosForTaller(tallerSlug)
    const modulo = modulos.find(m => m.orden === moduloNum)
    if (!modulo) return { porcentaje: 0, completados: 0, total: 0 }

    const allIds: string[] = []
    modulo.contenidos.forEach(c => allIds.push(c.id))
    modulo.subSecciones?.forEach(s => s.contenidos.forEach(c => allIds.push(c.id)))

    const total = allIds.length
    const completados = allIds.filter(id => records.get(id)?.completed).length
    const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0
    return { porcentaje, completados, total }
  }, [records])

  const getTallerProgreso = useCallback((tallerSlug: string) => {
    const modulos = buildModulosForTaller(tallerSlug)
    const allIds: string[] = []
    modulos.forEach(m => {
      m.contenidos.forEach(c => allIds.push(c.id))
      m.subSecciones?.forEach(s => s.contenidos.forEach(c => allIds.push(c.id)))
    })

    const total = allIds.length
    const completados = allIds.filter(id => records.get(id)?.completed).length
    const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0
    return { porcentaje, completados, total }
  }, [records])

  return (
    <ProgressContext.Provider
      value={{ loading, getContenidoEstado, markContenidoCompleted, markContenidoInProgress, getModuloProgreso, getTallerProgreso }}
    >
      {children}
    </ProgressContext.Provider>
  )
}
