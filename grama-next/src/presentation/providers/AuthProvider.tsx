'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { User, Session } from '@supabase/supabase-js'
import type { Docente } from '@/domain/docente/entities/Docente'
import type { TallerSlug } from '@/domain/shared/types'

// ── DEV_MODE ─────────────────────────────────────────────────────────────────
const DEV_MODE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co'

// Usuarios dev hardcoded (equivalente a DEV_USERS de Login.tsx original)
const DEV_USERS = [
  { email: 'admin@grama.pe',          password: 'grama2026', role: 'admin'   as const, taller_slugs: [] as TallerSlug[] },
  { email: 'roberto@grama.pe',        password: 'grama2026', role: 'admin'   as const, taller_slugs: [] as TallerSlug[] },
  { email: 't.donoso@inroprin.com',   password: 'grama2026', role: 'admin'   as const, taller_slugs: [] as TallerSlug[] },
  { email: 'camila.gr@inroprin.com',  password: 'grama2026', role: 'admin'   as const, taller_slugs: [] as TallerSlug[] },
  { email: 'docente@grama.pe',        password: 'grama2026', role: 'docente' as const, taller_slugs: [] as TallerSlug[] },
  { email: 'automotriz@grama.pe',     password: 'grama2026', role: 'docente' as const, taller_slugs: ['mecanica-automotriz', 'ebanisteria'] as TallerSlug[] },
  { email: 'generalept@grama.pe',     password: 'grama2026', role: 'docente' as const, taller_slugs: ['taller-general-ept'] as TallerSlug[] },
]

const DEV_NAMES: Record<string, string> = {
  'admin@grama.pe':         'Administrador GRAMA',
  'roberto@grama.pe':       'Roberto Flores',
  't.donoso@inroprin.com':  'Tomás Donoso',
  'camila.gr@inroprin.com': 'Camila García',
  'docente@grama.pe':       'Docente Demo',
  'automotriz@grama.pe':    'Gloria Martínez',
  'generalept@grama.pe':    'Luis Pérez',
}

// ── Context ───────────────────────────────────────────────────────────────────
interface AuthContextType {
  user:             User | null
  profile:          Docente | null
  session:          Session | null
  loading:          boolean
  isAdmin:          boolean
  allUnlocked:      boolean
  signIn:           (email: string, password: string) => Promise<{ error: string | null }>
  signOut:          () => Promise<void>
  refreshProfile:   () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null)
  const [profile, setProfile] = useState<Docente | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // ── DEV_MODE: leer cookie de sesión ────────────────────────────────────────
  const initDev = useCallback(() => {
    const email = document.cookie.match(/grama-dev-email=([^;]+)/)?.[1]
    const role  = document.cookie.match(/grama-dev-role=([^;]+)/)?.[1] as 'admin' | 'docente' | undefined
    const slugsRaw = document.cookie.match(/grama-dev-slugs=([^;]+)/)?.[1]

    if (email) {
      const devUser = DEV_USERS.find(u => u.email === email)
      const mockProfile: Docente = {
        id:             'dev-' + email,
        email,
        nombreCompleto: DEV_NAMES[email] ?? email.split('@')[0],
        role:           role ?? devUser?.role ?? 'docente',
        ieId:           null,
        tallerSlug:     devUser?.taller_slugs[0] ?? null,
        tallerSlugs:    slugsRaw
          ? (decodeURIComponent(slugsRaw).split(',') as TallerSlug[])
          : (devUser?.taller_slugs ?? []),
        createdAt:      new Date().toISOString(),
        lastSeenAt:     new Date().toISOString(),
      }
      setProfile(mockProfile)
      setUser({ id: mockProfile.id, email } as User)
    }
    setLoading(false)
  }, [])

  // ── PROD: Supabase auth listener ────────────────────────────────────────────
  const initSupabase = useCallback(async () => {
    const { createBrowserClient } = await import('@supabase/ssr')
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { session: initial } } = await supabase.auth.getSession()
    setSession(initial)
    setUser(initial?.user ?? null)
    if (initial?.user) await fetchProfile(supabase, initial.user.id)

    supabase.auth.onAuthStateChange(async (_event, sess) => {
      setSession(sess)
      setUser(sess?.user ?? null)
      if (sess?.user) await fetchProfile(supabase, sess.user.id)
      else setProfile(null)
    })

    setLoading(false)
  }, [])

  async function fetchProfile(supabase: ReturnType<typeof import('@supabase/ssr').createBrowserClient>, userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (data) {
      setProfile({
        id:             data.id,
        email:          data.email,
        nombreCompleto: data.nombre_completo,
        role:           data.role,
        ieId:           data.ie_id,
        tallerSlug:     data.taller_slug,
        tallerSlugs:    data.taller_slugs ?? [],
        createdAt:      data.created_at,
        lastSeenAt:     data.last_seen_at,
      })
    }
  }

  useEffect(() => {
    if (DEV_MODE) initDev()
    else initSupabase()
  }, [initDev, initSupabase])

  // ── signIn ────────────────────────────────────────────────────────────────
  const signIn = useCallback(async (email: string, password: string) => {
    if (DEV_MODE) {
      const found = DEV_USERS.find(u => u.email === email && u.password === password)
      if (!found) return { error: 'Credenciales incorrectas' }

      const expires = new Date(Date.now() + 8 * 3600 * 1000).toUTCString()
      document.cookie = `grama-dev-email=${email}; path=/; expires=${expires}`
      document.cookie = `grama-dev-role=${found.role}; path=/; expires=${expires}`
      document.cookie = `grama-dev-slugs=${encodeURIComponent(found.taller_slugs.join(','))}; path=/; expires=${expires}`

      initDev()
      return { error: null }
    }

    const { createBrowserClient } = await import('@supabase/ssr')
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }, [initDev])

  // ── signOut ───────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    if (DEV_MODE) {
      document.cookie = 'grama-dev-email=; path=/; max-age=0'
      document.cookie = 'grama-dev-role=; path=/; max-age=0'
      document.cookie = 'grama-dev-slugs=; path=/; max-age=0'
      setUser(null); setProfile(null)
      return
    }
    const { createBrowserClient } = await import('@supabase/ssr')
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.auth.signOut()
  }, [])

  const refreshProfile = useCallback(async () => {
    if (DEV_MODE) { initDev(); return }
    if (!user) return
    const { createBrowserClient } = await import('@supabase/ssr')
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await fetchProfile(supabase, user.id)
  }, [user, initDev])

  const isAdmin     = profile?.role === 'admin'
  const allUnlocked = isAdmin || profile?.email === 'docente@grama.pe'

  return (
    <AuthContext.Provider value={{
      user, profile, session, loading,
      isAdmin, allUnlocked,
      signIn, signOut, refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
