'use client'

/**
 * ProgressProvider — gestiona el progreso de contenidos.
 * Fase 1: localStorage primario.
 * Fase 2: sync con Supabase en background.
 *
 * Patrón: read en servidor (RSC) para SSR, write en cliente.
 */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { useAuth } from './AuthProvider'
import type { EstadoContenido, EstadoModulo, ModuloId } from '@/domain/shared/types'

// IDs de todos los contenidos por módulo (cacheados en build)
// Se importan dinámicamente para no incrementar bundle del provider
type ProgresoMap = Record<string, EstadoContenido>

interface ModuloProgreso {
  porcentaje:  number
  completados: number
  total:       number
}

interface ProgressContextType {
  loading:                boolean
  getContenidoEstado:     (id: string) => EstadoContenido
  markCompleted:          (id: string) => void
  markInProgress:         (id: string) => void
  getModuloProgreso:      (moduloId: ModuloId, contenidoIds: string[]) => ModuloProgreso
  getEstadoModulo:        (moduloId: ModuloId, contenidoIds: string[], prevCompletado: boolean) => EstadoModulo
  getTallerProgreso:      (todosLosIds: string[]) => ModuloProgreso
}

const ProgressContext = createContext<ProgressContextType | null>(null)

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}

function storageKey(userId: string) {
  return `grama_progreso_${userId}`
}

function loadFromStorage(userId: string): ProgresoMap {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function saveToStorage(userId: string, map: ProgresoMap) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(map))
  } catch { /* quota exceeded — ignorar */ }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user, isAdmin } = useAuth()
  const [progreso, setProgreso] = useState<ProgresoMap>({})
  const [loading,  setLoading]  = useState(true)

  // Cargar progreso al cambiar de usuario
  useEffect(() => {
    if (!user) { setProgreso({}); setLoading(false); return }
    setProgreso(loadFromStorage(user.id))
    setLoading(false)
  }, [user])

  const getContenidoEstado = useCallback((id: string): EstadoContenido => {
    if (isAdmin) return 'completado'
    return progreso[id] ?? 'no_iniciado'
  }, [progreso, isAdmin])

  const markCompleted = useCallback((id: string) => {
    if (!user) return
    setProgreso(prev => {
      const next = { ...prev, [id]: 'completado' as EstadoContenido }
      saveToStorage(user.id, next)
      return next
    })
  }, [user])

  const markInProgress = useCallback((id: string) => {
    if (!user) return
    setProgreso(prev => {
      if (prev[id] === 'completado') return prev
      const next = { ...prev, [id]: 'en_progreso' as EstadoContenido }
      saveToStorage(user.id, next)
      return next
    })
  }, [user])

  const getModuloProgreso = useCallback((
    _moduloId: ModuloId,
    contenidoIds: string[]
  ): ModuloProgreso => {
    if (isAdmin) return { porcentaje: 100, completados: contenidoIds.length, total: contenidoIds.length }
    const completados = contenidoIds.filter(id => progreso[id] === 'completado').length
    const total = contenidoIds.length
    return { porcentaje: total ? Math.round((completados / total) * 100) : 0, completados, total }
  }, [progreso, isAdmin])

  const getEstadoModulo = useCallback((
    moduloId: ModuloId,
    contenidoIds: string[],
    prevCompletado: boolean
  ): EstadoModulo => {
    if (isAdmin) return 'disponible'
    if (moduloId === 'M0') return 'disponible' // M0 siempre disponible

    if (!prevCompletado) return 'bloqueado'

    const p = getModuloProgreso(moduloId, contenidoIds)
    if (p.porcentaje === 100) return 'completado'
    if (p.completados > 0)   return 'en_curso'
    return 'disponible'
  }, [isAdmin, getModuloProgreso])

  const getTallerProgreso = useCallback((todosLosIds: string[]): ModuloProgreso => {
    if (isAdmin) return { porcentaje: 100, completados: todosLosIds.length, total: todosLosIds.length }
    const completados = todosLosIds.filter(id => progreso[id] === 'completado').length
    const total = todosLosIds.length
    return { porcentaje: total ? Math.round((completados / total) * 100) : 0, completados, total }
  }, [progreso, isAdmin])

  return (
    <ProgressContext.Provider value={{
      loading,
      getContenidoEstado,
      markCompleted,
      markInProgress,
      getModuloProgreso,
      getEstadoModulo,
      getTallerProgreso,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}
