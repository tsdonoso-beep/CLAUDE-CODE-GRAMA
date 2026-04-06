// src/components/layout/TopBar.tsx
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, LogOut, Bell, Menu } from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'
import { useAuth } from '@/contexts/AuthContext'

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { slug, num } = useParams<{ slug: string; num: string }>()
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
    crumbs.push({ label: taller.nombreCorto, to: `/taller/${slug}` })
    if (location.pathname.includes('/ruta')) {
      crumbs.push({ label: 'Ruta de Aprendizaje', to: num ? `/taller/${slug}/ruta` : undefined })
      if (num) crumbs.push({ label: `Módulo ${num}` })
    } else if (location.pathname.includes('/repositorio')) {
      crumbs.push({ label: 'Repositorio' })
    }
  }

  return (
    <header
      className="flex items-center justify-between h-12 px-5 shrink-0"
      style={{
        background: '#ffffff',
        borderBottom: '1px solid rgba(4,57,65,0.09)',
      }}
    >
      {/* Hamburger — mobile only */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="md:hidden h-8 w-8 rounded-xl flex items-center justify-center mr-2 shrink-0 transition-all hover:bg-black/[0.05]"
          aria-label="Abrir menú"
        >
          <Menu size={16} style={{ color: 'rgba(4,57,65,0.55)' }} />
        </button>
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden" aria-label="Breadcrumb">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={11} style={{ color: 'rgba(4,57,65,0.25)' }} />}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="text-xs font-semibold transition-colors px-1.5 py-0.5 rounded-md"
                style={{ color: 'rgba(4,57,65,0.40)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--grama-oscuro)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(4,57,65,0.40)')}
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-md" style={{ color: 'var(--grama-oscuro)' }}>
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Bell */}
        <button
          className="relative h-8 w-8 rounded-xl flex items-center justify-center transition-all hover:bg-black/[0.05]"
          title="Sin notificaciones nuevas"
          aria-label="Notificaciones"
        >
          <Bell size={14} style={{ color: 'rgba(4,57,65,0.40)' }} />
        </button>

        {/* Divider */}
        <div className="w-px h-5" style={{ background: 'rgba(4,57,65,0.10)' }} />

        {/* User */}
        <button
          onClick={() => navigate('/perfil')}
          className="flex items-center gap-2.5 rounded-xl px-2 py-1 transition-all hover:bg-black/[0.04]"
          title="Ver perfil"
        >
          <div className="relative">
            <div
              className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-extrabold"
              style={{ background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)', color: '#02d47e' }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: '#02d47e', borderColor: '#ffffff' }}
            />
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold leading-none" style={{ color: 'var(--grama-oscuro)' }}>
              {displayName}
            </p>
            <p className="text-[10px] mt-0.5 leading-none" style={{ color: 'rgba(4,57,65,0.45)' }}>
              {displayEmail}
            </p>
          </div>
        </button>

        {/* Logout */}
        <button
          onClick={signOut}
          className="h-8 w-8 rounded-xl flex items-center justify-center transition-all hover:bg-red-50"
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
        >
          <LogOut size={13} style={{ color: 'rgba(4,57,65,0.35)' }} />
        </button>
      </div>
    </header>
  )
}
