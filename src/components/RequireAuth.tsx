// src/components/RequireAuth.tsx
import { Navigate, Outlet } from 'react-router-dom'

export function RequireAuth() {
  const isAuth = sessionStorage.getItem('grama-auth') === 'true'
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}
