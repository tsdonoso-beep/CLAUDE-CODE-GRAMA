// src/components/layout/Sidebar.tsx
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { Home, BookOpen, Package, ChevronLeft, ChevronRight, LayoutGrid, Globe, X } from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'
import { useProgress } from '@/contexts/ProgressContext'
import { GramaLogo } from '@/components/GramaLogo'

const TALLER_ACCENTS: Record<string, string> = {
  'mecanica-automotriz':  '#3b82f6',
  'industria-vestido':    '#ec4899',
  'cocina-reposteria':    '#f97316',
  'ebanisteria':          '#b8975a',
  'comunicaciones':       '#a78bfa',
  'computacion':          '#22d3ee',
  'agropecuaria':         '#86efac',
  'electricidad':         '#ca8a04',
  'construccion':         '#94a3b8',
}

interface SidebarProps {
  collapsed: boolean
  onCollapse: () => void
  onClose?: () => void
}

export function Sidebar({ collapsed, onCollapse, onClose }: SidebarProps) {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const taller = talleresConfig.find(t => t.slug === slug)
  const accent = TALLER_ACCENTS[slug ?? ''] ?? '#02d47e'
  const { getTallerProgreso } = useProgress()
  const progreso = slug ? getTallerProgreso(slug) : { porcentaje: 0, completados: 0, total: 0 }

  const navItems = [
    { to: `/taller/${slug}`,             icon: Home,     label: 'Inicio' },
    { to: `/taller/${slug}/ruta`,        icon: BookOpen, label: 'Ruta de Aprendizaje' },
    { to: `/taller/${slug}/repositorio`, icon: Package,  label: 'Repositorio' },
  ]

  return (
    <aside
      className="flex flex-col h-full shrink-0 relative transition-all duration-300"
      style={{
        width: collapsed ? 56 : 240,
        background: '#ffffff',
        borderRight: '1px solid rgba(4,57,65,0.09)',
      }}
    >
      {/* ── Logo ── */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(4,57,65,0.08)' }}
      >
        <button
          onClick={() => navigate('/perfil')}
          className="transition-opacity hover:opacity-75 active:opacity-50 flex items-center"
          title="Ver mi perfil"
        >
          {collapsed ? (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
              <polygon points="2,22 12,2 12,22" fill="#02d47e" />
              <polygon points="12,2 22,12 12,12" fill="#043941" opacity="0.85" />
              <rect x="12" y="12" width="10" height="10" fill="#043941" opacity="0.5" />
            </svg>
          ) : (
            <GramaLogo variant="dark" size="sm" />
          )}
        </button>

        {/* Colapsar — solo tablet/desktop */}
        <button
          onClick={onCollapse}
          className="hidden md:flex transition-colors ml-1"
          style={{ color: 'rgba(4,57,65,0.3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(4,57,65,0.7)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(4,57,65,0.3)')}
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Cerrar — solo mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden transition-colors ml-1"
            style={{ color: 'rgba(4,57,65,0.3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(4,57,65,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(4,57,65,0.3)')}
            aria-label="Cerrar menú"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Taller activo ── */}
      {taller && (
        <div
          className="border-b"
          style={{
            borderColor: 'rgba(4,57,65,0.08)',
            padding: collapsed ? '12px 0' : '12px 16px',
            display: 'flex',
            flexDirection: collapsed ? 'row' : 'column',
            alignItems: collapsed ? 'center' : 'flex-start',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <span
            className="text-[11px] font-extrabold px-2 py-0.5 rounded-full tracking-[0.12em]"
            style={{
              background: `${accent}18`,
              color: accent === '#86efac' ? '#16a34a' : accent,
              border: `1px solid ${accent}35`,
            }}
          >
            T{String(taller.numero).padStart(2, '0')}
          </span>

          {!collapsed && (
            <>
              <div className="h-px w-full mt-2 mb-1.5" style={{ background: 'rgba(4,57,65,0.07)' }} />
              <p className="text-xs font-bold leading-tight" style={{ color: 'var(--grama-oscuro)' }}>
                {taller.nombreCorto}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: 'rgba(4,57,65,0.4)' }}>
                Taller de Educación para el Trabajo
              </p>
            </>
          )}
        </div>
      )}

      {/* ── Navegación ── */}
      <nav className="flex-1 py-3 space-y-0.5" style={{ padding: collapsed ? '12px 8px' : '12px 10px' }}>
        {!collapsed && (
          <p
            className="text-[10px] font-extrabold uppercase tracking-[0.14em] px-3 mb-2"
            style={{ color: 'rgba(4,57,65,0.28)' }}
          >
            Navegación
          </p>
        )}
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === `/taller/${slug}`}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              collapsed
                ? `flex justify-center p-2 rounded-xl transition-all relative ${isActive ? '' : 'hover:bg-black/[0.04]'}`
                : `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${isActive ? '' : 'hover:bg-black/[0.04]'}`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background: `${accent}12`,
                    boxShadow: collapsed ? undefined : `inset 3px 0 0 ${accent}`,
                  }
                : undefined
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: isActive ? `${accent}20` : 'rgba(4,57,65,0.06)' }}
                >
                  <Icon size={13} style={{ color: isActive ? accent : 'rgba(4,57,65,0.45)' }} />
                </div>
                {!collapsed && (
                  <>
                    <span style={{ color: isActive ? 'var(--grama-oscuro)' : 'rgba(4,57,65,0.55)' }}>
                      {label}
                    </span>
                    {isActive && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full animate-pulse-soft"
                        style={{ background: accent }}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Progreso ── */}
      <div
        className="border-t"
        style={{
          borderColor: 'rgba(4,57,65,0.08)',
          padding: collapsed ? '12px 8px' : '14px 16px',
        }}
      >
        {collapsed ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] font-extrabold" style={{ color: '#02d47e' }}>
              {progreso.porcentaje}%
            </span>
            <div className="w-6 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(4,57,65,0.10)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${progreso.porcentaje}%`, background: 'linear-gradient(90deg, #02d47e, #00c16e)' }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold" style={{ color: 'rgba(4,57,65,0.4)' }}>
                Progreso general
              </p>
              <span className="text-[10px] font-extrabold" style={{ color: '#02a05a' }}>
                {progreso.porcentaje}%
              </span>
            </div>
            <div className="h-1.5 rounded-full mb-2 overflow-hidden" style={{ background: 'rgba(4,57,65,0.08)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${progreso.porcentaje}%`, background: 'linear-gradient(90deg, #02d47e, #00c16e)' }}
              />
            </div>
            <p className="text-[10px]" style={{ color: 'rgba(4,57,65,0.35)' }}>
              {progreso.completados}/{progreso.total} actividades completadas
            </p>
          </>
        )}
      </div>

      {/* ── Navegación secundaria ── */}
      <div style={{ padding: collapsed ? '0 8px 14px' : '0 10px 14px' }} className="space-y-0.5">
        <button
          onClick={() => navigate('/perfil')}
          title={collapsed ? 'Ver todos los talleres' : undefined}
          className={`w-full flex items-center rounded-xl transition-all text-xs hover:bg-black/[0.04] ${
            collapsed ? 'justify-center p-2' : 'gap-2 px-3 py-2.5'
          }`}
          style={{ color: 'rgba(4,57,65,0.38)' }}
        >
          <LayoutGrid size={13} />
          {!collapsed && 'Ver todos los talleres'}
        </button>
        <button
          onClick={() => navigate('/')}
          title={collapsed ? 'Página principal' : undefined}
          className={`w-full flex items-center rounded-xl transition-all text-xs hover:bg-black/[0.04] ${
            collapsed ? 'justify-center p-2' : 'gap-2 px-3 py-2.5'
          }`}
          style={{ color: 'rgba(4,57,65,0.28)' }}
        >
          <Globe size={13} />
          {!collapsed && 'Página principal'}
        </button>
      </div>
    </aside>
  )
}
