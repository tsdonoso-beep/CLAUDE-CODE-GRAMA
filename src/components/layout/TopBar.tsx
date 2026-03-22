// src/components/layout/TopBar.tsx
import { Link, useParams, useLocation } from 'react-router-dom'
import { ChevronRight, LogOut, Bell } from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'

export function TopBar() {
  const { slug, num } = useParams<{ slug: string; num: string }>()
  const location = useLocation()
  const taller = talleresConfig.find(t => t.slug === slug)

  const crumbs: { label: string; to?: string }[] = [{ label: 'Inicio', to: '/' }]
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
      className="flex items-center justify-between h-12 px-5 shrink-0 relative"
      style={{
        background: 'linear-gradient(90deg, #032e34 0%, #043941 60%, #045258 100%)',
        borderBottom: '1px solid rgba(2,212,126,0.15)',
      }}
    >
      {/* Shimmer accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #02d47e 40%, #02d47e 60%, transparent)' }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1" aria-label="Breadcrumb">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={11} style={{ color: 'rgba(2,212,126,0.4)' }} />}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="text-xs font-semibold transition-colors px-1.5 py-0.5 rounded-md"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-md"
                style={{ color: '#ffffff' }}>
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button
          className="relative h-8 w-8 rounded-xl flex items-center justify-center transition-all"
          style={{ background: 'rgba(255,255,255,0.05)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(2,212,126,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          title="Sin notificaciones nuevas"
          aria-label="Notificaciones"
        >
          <Bell size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
        </button>

        {/* Divider */}
        <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.1)' }} />

        {/* User */}
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="relative">
            <div
              className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-black"
              style={{ background: 'linear-gradient(135deg, #02d47e, #059669)', color: '#043941' }}
            >
              D
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 flex items-center justify-center"
              style={{ background: '#02d47e', borderColor: '#043941' }} />
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-bold leading-none" style={{ color: '#ffffff' }}>
              Docente GRAMA
            </p>
            <p className="text-[10px] mt-0.5 leading-none" style={{ color: 'rgba(2,212,126,0.7)' }}>
              docente@grama.pe
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="h-8 w-8 rounded-xl flex items-center justify-center transition-all"
          style={{ background: 'rgba(255,255,255,0.05)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          title="Cerrar sesión"
        >
          <LogOut size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
        </button>
      </div>
    </header>
  )
}
