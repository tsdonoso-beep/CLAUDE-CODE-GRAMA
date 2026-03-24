// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/database'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  isAdmin: boolean
  /** true para docente@grama.pe y admins — todos los módulos desbloqueados */
  allUnlocked: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

const DEV_MODE = !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co'

/** Construye un perfil mock a partir de sessionStorage (solo DEV_MODE) */
function buildDevProfile(): Profile | null {
  const email = sessionStorage.getItem('grama-dev-email')
  const role = sessionStorage.getItem('grama-dev-role') as 'admin' | 'docente' | null
  if (!email || !role) return null
  return {
    id: 'dev-user',
    email,
    nombre_completo: email.split('@')[0].replace(/[._]/g, ' '),
    role,
    ie_id: null,
    taller_slug: null,
    created_at: new Date().toISOString(),
    last_seen_at: new Date().toISOString(),
  }
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return null
  return data as Profile
}

async function touchLastSeen(userId: string) {
  await supabase
    .from('profiles')
    .update({ last_seen_at: new Date().toISOString() })
    .eq('id', userId)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession()
      .then(async ({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          const p = await fetchProfile(session.user.id)
          setProfile(p)
          touchLastSeen(session.user.id)
        } else if (DEV_MODE) {
          // Restaurar perfil de sesión de desarrollo
          setProfile(buildDevProfile())
        }
        setLoading(false)
      })
      .catch(() => {
        if (DEV_MODE) setProfile(buildDevProfile())
        setLoading(false)
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          const p = await fetchProfile(session.user.id)
          setProfile(p)
          touchLastSeen(session.user.id)
        } else {
          setProfile(DEV_MODE ? buildDevProfile() : null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    sessionStorage.removeItem('grama-auth')
    sessionStorage.removeItem('grama-dev-email')
    sessionStorage.removeItem('grama-dev-role')
    localStorage.removeItem('navigator-progress')
    setProfile(null)
  }

  const isAdmin = profile?.role === 'admin'
  const allUnlocked = isAdmin || user?.email === 'docente@grama.pe' || profile?.email === 'docente@grama.pe'

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, isAdmin, allUnlocked, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
