// src/components/RequireAuth.tsx
import { Navigate, Outlet } from 'react-router-dom'

export function RequireAuth() {
  // Auth deshabilitada temporalmente — todas las rutas accesibles
  return <Outlet />
}
