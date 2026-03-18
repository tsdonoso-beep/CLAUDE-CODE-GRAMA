// src/pages/NotFound.tsx
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import logoGrama from '@/assets/logo-grama.png'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center grama-pattern"
      style={{ background: '#043941' }}
    >
      <img src={logoGrama} alt="GRAMA" className="h-16 w-16 mb-8 object-contain opacity-60" />
      <h1 className="text-7xl font-extrabold mb-4" style={{ color: '#02d47e' }}>
        404
      </h1>
      <p className="text-xl font-bold text-white mb-2">Página no encontrada</p>
      <p className="text-sm mb-8 text-center max-w-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Esta ruta no existe en la plataforma GRAMA.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
        style={{ background: '#02d47e' }}
      >
        <Home size={16} />
        Volver al inicio
      </Link>
    </div>
  )
}
