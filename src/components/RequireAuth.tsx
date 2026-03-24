// src/components/RequireAuth.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const DEV_MODE = !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co'

export function RequireAuth() {
  const { user, loading } = useAuth()

  // En modo desarrollo, aceptar también el bypass por sessionStorage
  const devBypass = DEV_MODE && sessionStorage.getItem('grama-auth') === 'true'

  if (loading && !devBypass) {
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

  if (!user && !devBypass) return <Navigate to="/login" replace />
  return <Outlet />
}
