// src/components/layout/TopBar.tsx
import { Link, useParams, useLocation } from 'react-router-dom'
import { ChevronRight, User, LogOut } from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'

export function TopBar() {
  const { slug, num } = useParams<{ slug: string; num: string }>()
  const location = useLocation()
  const taller = talleresConfig.find(t => t.slug === slug)

  // Build breadcrumbs
  const crumbs: { label: string; to?: string }[] = [
    { label: 'Inicio', to: '/' },
  ]
  if (taller) {
    crumbs.push({ label: taller.nombreCorto, to: `/taller/${slug}` })
    if (location.pathname.includes('/ruta')) {
      crumbs.push({ label: 'Ruta de Aprendizaje', to: num ? `/taller/${slug}/ruta` : undefined })
      if (num) crumbs.push({ label: `Módulo ${num}` })
    } else if (location.pathname.includes('/repositorio')) {
      crumbs.push({ label: 'Repositorio' })
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('grama-auth')
    window.location.href = '/login'
  }

  return (
    <header
      className="flex items-center justify-between h-14 px-6 border-b shrink-0"
      style={{ background: '#ffffff', borderColor: '#e3f8fb' }}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={13} className="text-gray-300" />}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="font-medium hover:underline transition-colors"
                style={{ color: '#045f6c' }}
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="font-semibold" style={{ color: '#043941' }}>
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      {/* Perfil */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: '#043941' }}
          >
            <User size={14} />
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs font-semibold leading-tight" style={{ color: '#043941' }}>
              Docente GRAMA
            </p>
            <p className="text-xs" style={{ color: '#045f6c' }}>
              docente@grama.pe
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          style={{ color: '#045f6c' }}
          title="Cerrar sesión"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  )
}
