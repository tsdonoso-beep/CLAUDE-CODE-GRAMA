// src/components/layout/Sidebar.tsx
import { useState, useEffect, useRef } from 'react'
import { NavLink, useParams, useNavigate, useLocation } from 'react-router-dom'
import { BookOpen, Package, ChevronLeft, ChevronRight, X, User, Home, LayoutDashboard, Trophy, Award, MessageCircle } from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'
import { useProgress } from '@/contexts/ProgressContext'
import { useAuth } from '@/contexts/AuthContext'
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
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const taller = talleresConfig.find(t => t.slug === slug)
  const accent = TALLER_ACCENTS[slug ?? ''] ?? '#02d47e'
  const { getTallerProgreso } = useProgress()
  const { profile } = useAuth()
  const progreso = slug ? getTallerProgreso(slug) : { porcentaje: 0, completados: 0, total: 0 }

  const enrolledSlugs: string[] =
    profile?.taller_slugs?.length
      ? profile.taller_slugs
      : profile?.taller_slug ? [profile.taller_slug] : []

  // ── Transición de modo ───────────────────────────────────────────────────
  const targetMode = (pathname === '/perfil' ? 'perfil' : 'taller') as 'perfil' | 'taller'
  const [shownMode, setShownMode]   = useState<'perfil' | 'taller'>(targetMode)
  const [contentVisible, setContentVisible] = useState(true)
  // up = perfil→taller (drill in), down = taller→perfil (drill out)
  const directionRef = useRef<'up' | 'down'>('up')

  useEffect(() => {
    if (targetMode === shownMode) return
    directionRef.current = targetMode === 'taller' ? 'up' : 'down'
    setContentVisible(false)
    const swap = setTimeout(() => {
      setShownMode(targetMode)
      // Double RAF: ensures React paints the hidden new content, then transitions in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setContentVisible(true))
      })
    }, 180)
    return () => clearTimeout(swap)
  }, [targetMode, shownMode])

  const contentStyle: React.CSSProperties = {
    opacity:    contentVisible ? 1 : 0,
    transform:  contentVisible ? 'none' : `translateY(${directionRef.current === 'up' ? '-5px' : '5px'})`,
    transition: 'opacity 180ms ease, transform 180ms ease',
    willChange: 'opacity, transform',
  }

  // ── Orb: transición de color cuando cambia el accent ────────────────────
  const orbStyle: React.CSSProperties = {
    width: 200, height: 200,
    background: `radial-gradient(circle, ${shownMode === 'perfil' ? '#02d47e' : accent}12 0%, transparent 65%)`,
    bottom: 50, right: -50,
    transition: 'background 400ms ease',
  }

  // ── Items de navegación ──────────────────────────────────────────────────
  const isRepoOnly = slug === 'taller-general-ept'
  const tallerNavItems = [
    ...(!isRepoOnly ? [{ to: `/taller/${slug}`,          icon: Home,     label: 'Inicio' }] : []),
    ...(!isRepoOnly ? [{ to: `/taller/${slug}/ruta`,     icon: BookOpen, label: 'Ruta de Aprendizaje' }] : []),
    { to: `/taller/${slug}/repositorio`, icon: Package, label: 'Repositorio' },
  ]

  const perfilNavItems = [
    { icon: LayoutDashboard, label: 'Mis talleres',  to: '/perfil' as string | undefined },
    { icon: Trophy,          label: 'Mis logros',   to: '/perfil/logros' as string | undefined },
    { icon: Award,           label: 'Certificados', to: undefined as string | undefined },
  ]

  const progresoLabel =
    progreso.porcentaje === 0   ? 'Listo para comenzar' :
    progreso.porcentaje === 100 ? '¡Taller completado!' :
    `${progreso.porcentaje}% completado`

  return (
    <aside
      className="flex flex-col h-full shrink-0 relative overflow-hidden transition-all duration-300"
      style={{
        width: collapsed ? 56 : 240,
        background: 'linear-gradient(180deg, #030e12 0%, #043941 40%, #032e34 100%)',
      }}
    >
      {/* Orb acento — color transiciona suavemente entre modos */}
      <div className="absolute pointer-events-none animate-aurora-slow" style={orbStyle} />
      <div className="absolute pointer-events-none" style={{
        width: 140, height: 140,
        background: 'radial-gradient(circle, rgba(2,212,126,0.06) 0%, transparent 65%)',
        top: -20, left: -30,
      }} />

      {/* ── Logo — siempre visible, sin fade ── */}
      <div
        className="relative z-10 flex items-center justify-between px-4 py-3 border-b shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <button
          onClick={() => navigate('/perfil')}
          className="transition-opacity hover:opacity-80 active:opacity-60 flex items-center"
          title="Mi perfil"
        >
          {collapsed ? (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
              <polygon points="2,22 12,2 12,22" fill="#02d47e" />
              <polygon points="12,2 22,12 12,12" fill="#ffffff" opacity="0.85" />
              <rect x="12" y="12" width="10" height="10" fill="#ffffff" opacity="0.5" />
            </svg>
          ) : (
            <GramaLogo variant="light" size="sm" />
          )}
        </button>

        <button
          onClick={onCollapse}
          className="hidden md:flex text-white/25 hover:text-white/60 transition-colors ml-1"
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-white/25 hover:text-white/60 transition-colors ml-1"
            aria-label="Cerrar menú"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Contenido dinámico — transiciona entre modos ── */}
      <div className="relative z-10 flex flex-col flex-1 min-h-0" style={contentStyle}>

        {/* Contexto */}
        {shownMode === 'perfil' ? (
          !collapsed && (
            <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-[9px] font-extrabold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.28)' }}>
                Mi capacitación
              </p>
            </div>
          )
        ) : (
          taller && (
            <div
              className="border-b shrink-0"
              style={{
                borderColor: 'rgba(255,255,255,0.06)',
                boxShadow: collapsed ? undefined : `inset 3px 0 0 ${accent}22`,
              }}
            >
              {collapsed ? (
                <div className="flex justify-center py-3.5">
                  <span
                    className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md tracking-[0.1em]"
                    style={{ background: `${accent}18`, color: 'rgba(255,255,255,0.6)', border: `1px solid ${accent}25` }}
                  >
                    T{String(taller.numero).padStart(2, '0')}
                  </span>
                </div>
              ) : (
                <div className="px-4 py-3.5">
                  <span
                    className="inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-[0.12em] mb-2"
                    style={{ background: `${accent}18`, color: 'rgba(255,255,255,0.55)', border: `1px solid ${accent}28` }}
                  >
                    T{String(taller.numero).padStart(2, '0')}
                  </span>
                  <p className="text-sm font-extrabold text-white leading-snug">
                    {taller.nombreCorto}
                  </p>
                </div>
              )}
            </div>
          )
        )}


        {/* Navegación */}
        <nav
          className="flex-1 space-y-0.5 overflow-y-auto"
          style={{ padding: collapsed ? '12px 8px' : '12px 10px' }}
        >
          {shownMode === 'perfil' ? (
            perfilNavItems.map(({ icon: Icon, label, to }) => {
              const isActive = to ? pathname === to : false
              const handleClick = () => { if (to) navigate(to) }
              return (
                <div key={label}>
                  <button
                    onClick={handleClick}
                    title={collapsed ? label : undefined}
                    className={[
                      'w-full transition-all rounded-xl',
                      collapsed ? 'flex justify-center p-2.5' : 'flex items-center gap-3 px-3 py-2.5',
                      isActive ? 'text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]',
                      !to ? 'cursor-default opacity-40' : '',
                    ].join(' ')}
                    style={isActive ? {
                      background: 'rgba(255,255,255,0.08)',
                      boxShadow: collapsed ? undefined : 'inset 3px 0 0 #02d47e',
                      backdropFilter: 'blur(4px)',
                    } : undefined}
                  >
                    <div
                      className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
                      style={{ background: isActive ? 'rgba(2,212,126,0.14)' : 'rgba(255,255,255,0.05)' }}
                    >
                      <Icon size={13} style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)' }} />
                    </div>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-xs font-semibold text-left">{label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse-soft" style={{ background: '#02d47e' }} />
                        )}
                      </>
                    )}
                  </button>
                  {isActive && label === 'Mis talleres' && !collapsed && enrolledSlugs.slice(0, 3).map(s => {
                    const t  = talleresConfig.find(x => x.slug === s)
                    const ta = TALLER_ACCENTS[s] ?? '#02d47e'
                    const p  = getTallerProgreso(s)
                    return (
                      <button
                        key={s}
                        onClick={() => navigate(`/taller/${s}`)}
                        className="w-full flex items-center gap-2 pl-10 pr-3 py-1.5 rounded-lg transition-all text-left"
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ta }} />
                        <span className="flex-1 text-[11px] font-semibold truncate" style={{ color: 'rgba(255,255,255,0.55)' }}>
                          {t?.nombreCorto ?? s}
                        </span>
                        <span className="text-[10px] font-extrabold shrink-0" style={{ color: ta }}>
                          {p.porcentaje}%
                        </span>
                      </button>
                    )
                  })}
                </div>
              )
            })
          ) : (
            tallerNavItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === `/taller/${slug}`}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  collapsed
                    ? `flex justify-center p-2.5 rounded-xl transition-all ${isActive ? 'text-white' : 'text-white/40 hover:text-white/70'}`
                    : `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive ? 'text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'}`
                }
                style={({ isActive }) => isActive ? {
                  background: 'rgba(255,255,255,0.08)',
                  boxShadow: collapsed ? undefined : `inset 3px 0 0 ${accent}`,
                  backdropFilter: 'blur(4px)',
                } : undefined}
              >
                {({ isActive }) => (
                  <>
                    <div
                      className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
                      style={{ background: isActive ? `${accent}1c` : 'rgba(255,255,255,0.05)' }}
                    >
                      <Icon size={13} style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)' }} />
                    </div>
                    {!collapsed && (
                      <>
                        <span className="flex-1">{label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse-soft" style={{ background: accent }} />
                        )}
                      </>
                    )}
                  </>
                )}
              </NavLink>
            ))
          )}
        </nav>

        {/* Progreso — solo en modo taller */}
        {shownMode === 'taller' && (
          <div
            className="border-t border-b shrink-0"
            style={{
              borderColor: 'rgba(255,255,255,0.05)',
              padding: collapsed ? '10px 8px' : '12px 16px',
            }}
          >
            {collapsed ? (
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-extrabold" style={{ color: '#02d47e' }}>
                  {progreso.porcentaje}%
                </span>
                <div className="w-5 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="h-full rounded-full" style={{
                    width: `${progreso.porcentaje}%`,
                    background: 'linear-gradient(90deg, #02d47e, #00c16e)',
                  }} />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {progresoLabel}
                  </span>
                  <span className="text-[10px] font-extrabold" style={{ color: '#02d47e' }}>
                    {progreso.porcentaje}%
                  </span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${progreso.porcentaje}%`,
                      background: 'linear-gradient(90deg, #02d47e, #00c16e)',
                      boxShadow: progreso.porcentaje > 0 ? '0 0 6px rgba(2,212,126,0.4)' : 'none',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div
          className="border-t shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.05)', padding: collapsed ? '10px 8px' : '10px 10px' }}
        >
          {shownMode === 'perfil' ? (
            <button
              onClick={() => navigate('/perfil/ayuda')}
              title={collapsed ? 'Centro de ayuda' : undefined}
              className={`w-full flex items-center rounded-xl transition-all hover:bg-white/[0.05] ${
                collapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2.5'
              }`}
              style={{ color: location.pathname === '/perfil/ayuda' ? '#02d47e' : 'rgba(255,255,255,0.3)' }}
            >
              <div className="h-6 w-6 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <MessageCircle size={11} style={{ color: 'inherit' }} />
              </div>
              {!collapsed && <span className="text-xs font-semibold">Centro de ayuda</span>}
            </button>
          ) : (
            <button
              onClick={() => navigate('/perfil')}
              title={collapsed ? 'Mi Perfil' : undefined}
              className={`w-full flex items-center rounded-xl transition-all text-white/30 hover:text-white/60 hover:bg-white/[0.05] ${
                collapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2.5'
              }`}
            >
              <div className="h-6 w-6 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <User size={11} style={{ color: 'rgba(255,255,255,0.5)' }} />
              </div>
              {!collapsed && <span className="text-xs font-semibold">Mi Perfil</span>}
            </button>
          )}
        </div>

      </div>{/* fin contenido dinámico */}
    </aside>
  )
}
