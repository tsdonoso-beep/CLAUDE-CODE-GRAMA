// src/components/layout/TopBar.tsx
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, LogOut, Bell, Menu } from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'
import { getBienesByTaller } from '@/data/bienesData'
import { useAuth } from '@/contexts/AuthContext'

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { slug, num, id } = useParams<{ slug: string; num: string; id: string }>()
  const location = useLocation()
  const taller = talleresConfig.find(t => t.slug === slug)
  const { profile, signOut, user } = useAuth()
  const navigate = useNavigate()

  const displayName =
    profile?.nombre_completo ||
    user?.user_metadata?.full_name ||
    profile?.email?.split('@')[0] ||
    user?.email?.split('@')[0] ||
    'Docente'
  const displayEmail = profile?.email ?? user?.email ?? ''

  const crumbs: { label: string; to?: string }[] = [{ label: 'Mi Perfil', to: '/perfil' }]
  if (taller) {
    crumbs.push({ label: taller.nombreCorto, to: `/taller/${slug}/ruta` })
    if (location.pathname.includes('/ruta')) {
      crumbs.push({ label: 'Ruta de Aprendizaje', to: num ? `/taller/${slug}/ruta` : undefined })
      if (num) crumbs.push({ label: `Módulo ${num}` })
    } else if (location.pathname.includes('/repositorio')) {
      // Si estamos en el detalle de un bien, Repositorio es navegable
      const enDetalle = id !== undefined
      crumbs.push({ label: 'Repositorio', to: enDetalle ? `/taller/${slug}/repositorio` : undefined })
      if (enDetalle && slug) {
        const bienes = getBienesByTaller(slug)
        const bien = bienes.find(b => String(b.n) === id)
        if (bien) crumbs.push({ label: bien.nombre })
      }
    }
  }

  async function handleLogout() {
    await signOut()
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

      {/* Hamburger — mobile only */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="md:hidden h-8 w-8 rounded-xl flex items-center justify-center mr-2 shrink-0 transition-all"
          style={{ background: 'rgba(255,255,255,0.07)' }}
          aria-label="Abrir menú"
        >
          <Menu size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
        </button>
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden" aria-label="Breadcrumb">
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

        {/* User — click → /perfil */}
        <button
          onClick={() => navigate('/perfil')}
          className="flex items-center gap-2.5 rounded-xl px-2 py-1 transition-all"
          style={{ background: 'transparent' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(2,212,126,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          title="Ver perfil"
        >
          {/* Avatar */}
          <div className="relative">
            <div
              className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-extrabold"
              style={{ background: 'linear-gradient(135deg, #02d47e, #059669)', color: '#043941' }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: '#02d47e', borderColor: '#043941' }} />
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold leading-none" style={{ color: '#ffffff' }}>
              {displayName}
            </p>
            <p className="text-[10px] mt-0.5 leading-none" style={{ color: 'rgba(2,212,126,0.7)' }}>
              {displayEmail}
            </p>
          </div>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="h-8 w-8 rounded-xl flex items-center justify-center transition-all"
          style={{ background: 'rgba(255,255,255,0.05)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
        >
          <LogOut size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
        </button>
      </div>
    </header>
  )
}
