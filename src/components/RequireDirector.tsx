// src/components/RequireDirector.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const DEV_MODE = !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co'

export function RequireDirector() {
  const { user, profile, loading } = useAuth()
  if (loading) return null
  const devBypass = DEV_MODE && sessionStorage.getItem('grama-auth') === 'true'
  const devIsDirector = DEV_MODE && sessionStorage.getItem('grama-dev-role') === 'director'
  if (!user && !devBypass) return <Navigate to="/login" replace />
  if (profile?.role !== 'director' && !devIsDirector) return <Navigate to="/" replace />
  return <Outlet />
}
