// src/components/RequireAuth.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function RequireAuth() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen" style={{ background: '#043941' }}>
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-8 w-8 rounded-full border-2 animate-spin"
            style={{ borderColor: '#02d47e', borderTopColor: 'transparent' }}
          />
          <span className="text-xs font-semibold" style={{ color: '#02d47e' }}>
            Cargando…
          </span>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
