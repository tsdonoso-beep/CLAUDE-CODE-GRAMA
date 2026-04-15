// src/components/layout/Sidebar.tsx
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { BookOpen, Package, ChevronLeft, ChevronRight, LayoutGrid, Globe, X } from 'lucide-react'
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
  'electricidad':         '#fde047',
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

  const isRepoOnly = slug === 'taller-general-ept'
  const navItems = [
    ...(!isRepoOnly ? [{ to: `/taller/${slug}/ruta`, icon: BookOpen, label: 'Ruta de Aprendizaje' }] : []),
    { to: `/taller/${slug}/repositorio`, icon: Package,  label: 'Repositorio' },
  ]

  return (
    <aside
      className="flex flex-col h-full shrink-0 relative overflow-hidden transition-all duration-300"
      style={{
        width: collapsed ? 56 : 240,
        background: 'linear-gradient(180deg, #030e12 0%, #043941 40%, #032e34 100%)',
      }}
    >
      {/* Orb de acento ambiente */}
      <div
        className="absolute pointer-events-none animate-aurora-slow"
        style={{
          width: 220, height: 220,
          background: `radial-gradient(circle, ${accent}12 0%, transparent 65%)`,
          bottom: 40, right: -60,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 160, height: 160,
          background: 'radial-gradient(circle, rgba(2,212,126,0.07) 0%, transparent 65%)',
          top: -20, left: -30,
        }}
      />

      {/* ── Logo ── */}
      <div
        className="relative z-10 flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <button
          onClick={() => navigate('/perfil')}
          className="transition-opacity hover:opacity-80 active:opacity-60 flex items-center"
          title="Ver mi perfil"
        >
          {collapsed ? (
            /* Solo el símbolo geométrico cuando está colapsado */
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
              <polygon points="2,22 12,2 12,22" fill="#02d47e" />
              <polygon points="12,2 22,12 12,12" fill="#ffffff" opacity="0.85" />
              <rect x="12" y="12" width="10" height="10" fill="#ffffff" opacity="0.5" />
            </svg>
          ) : (
            <GramaLogo variant="light" size="sm" />
          )}
        </button>

        {/* Botón colapsar — solo tablet/desktop */}
        <button
          onClick={onCollapse}
          className="hidden md:flex text-white/30 hover:text-white/70 transition-colors ml-1"
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {collapsed
            ? <ChevronRight size={14} />
            : <ChevronLeft size={14} />
          }
        </button>

        {/* Botón cerrar — solo mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-white/30 hover:text-white/70 transition-colors ml-1"
            aria-label="Cerrar menú"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Taller activo ── */}
      {taller && (
        <div
          className="relative z-10 border-b"
          style={{
            borderColor: 'rgba(255,255,255,0.06)',
            padding: collapsed ? '14px 0' : '14px 16px',
            display: 'flex',
            flexDirection: collapsed ? 'row' : 'column',
            alignItems: collapsed ? 'center' : 'flex-start',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <span
            className="text-[11px] font-extrabold px-2 py-0.5 rounded-full tracking-[0.12em]"
            style={{
              background: `${accent}1a`,
              color: accent,
              border: `1px solid ${accent}35`,
            }}
          >
            T{String(taller.numero).padStart(2, '0')}
          </span>

          {!collapsed && (
            <>
              <div className="h-px w-full mt-2 mb-1.5" style={{ background: `${accent}25` }} />
              <p className="text-white text-xs font-bold leading-tight">
                {taller.nombreCorto}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Taller de Educación para el Trabajo
              </p>
            </>
          )}
        </div>
      )}

      {/* ── Navegación ── */}
      <nav className="relative z-10 flex-1 py-4 space-y-1" style={{ padding: collapsed ? '16px 8px' : '16px 12px' }}>
        {!collapsed && (
          <p
            className="text-[11px] font-extrabold uppercase tracking-[0.14em] px-3 mb-2"
            style={{ color: 'rgba(255,255,255,0.2)' }}
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
                ? `flex justify-center p-2 rounded-xl transition-all relative ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'}`
                : `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'}`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background: 'rgba(255,255,255,0.09)',
                    boxShadow: collapsed ? undefined : `inset 3px 0 0 ${accent}`,
                    backdropFilter: 'blur(4px)',
                  }
                : undefined
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: isActive ? `${accent}20` : 'rgba(255,255,255,0.06)' }}
                >
                  <Icon size={13} style={{ color: isActive ? accent : 'rgba(255,255,255,0.5)' }} />
                </div>
                {!collapsed && (
                  <>
                    {label}
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
        className="relative z-10 border-t"
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
          padding: collapsed ? '12px 8px' : '16px',
        }}
      >
        {collapsed ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] font-extrabold" style={{ color: '#02d47e' }}>
              {progreso.porcentaje}%
            </span>
            <div
              className="w-6 h-1 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progreso.porcentaje}%`,
                  background: 'linear-gradient(90deg, #02d47e, #00c16e)',
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Progreso general
              </p>
              <span className="text-[10px] font-extrabold" style={{ color: '#02d47e' }}>
                {progreso.porcentaje}%
              </span>
            </div>
            <div
              className="h-1.5 rounded-full mb-2 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${progreso.porcentaje}%`,
                  background: 'linear-gradient(90deg, #02d47e, #00c16e)',
                  boxShadow: '0 0 8px rgba(2,212,126,0.4)',
                }}
              />
            </div>
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {progreso.completados}/{progreso.total} actividades completadas
            </p>
          </>
        )}
      </div>

      {/* ── Navegación secundaria ── */}
      <div
        className="relative z-10 pb-4 space-y-1"
        style={{ padding: collapsed ? '0 8px 16px' : '0 12px 16px' }}
      >
        <button
          onClick={() => navigate('/perfil')}
          title={collapsed ? 'Ver todos los talleres' : undefined}
          className={`w-full flex items-center rounded-xl transition-all text-xs text-white/30 hover:text-white/60 hover:bg-white/[0.06] ${
            collapsed ? 'justify-center p-2' : 'gap-2 px-3 py-2.5'
          }`}
        >
          <LayoutGrid size={13} />
          {!collapsed && 'Ver todos los talleres'}
        </button>
        <button
          onClick={() => navigate('/')}
          title={collapsed ? 'Página principal' : undefined}
          className={`w-full flex items-center rounded-xl transition-all text-xs text-white/20 hover:text-white/50 hover:bg-white/[0.04] ${
            collapsed ? 'justify-center p-2' : 'gap-2 px-3 py-2.5'
          }`}
        >
          <Globe size={13} />
          {!collapsed && 'Página principal'}
        </button>
      </div>
    </aside>
  )
}
