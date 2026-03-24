// src/components/RequireAdmin.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const DEV_MODE = !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co'

export function RequireAdmin() {
  const { user, profile, loading } = useAuth()

  if (loading) return null

  const devBypass = DEV_MODE && sessionStorage.getItem('grama-auth') === 'true'

  if (!user && !devBypass) return <Navigate to="/login" replace />
  if (profile?.role !== 'admin') return <Navigate to="/" replace />

  return <Outlet />
}
