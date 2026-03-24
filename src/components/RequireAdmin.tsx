// src/components/RequireAdmin.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function RequireAdmin() {
  const { user, profile, loading } = useAuth()

  if (loading) return null  // RequireAuth ya muestra el spinner global

  if (!user) return <Navigate to="/login" replace />
  if (profile?.role !== 'admin') return <Navigate to="/" replace />

  return <Outlet />
}
