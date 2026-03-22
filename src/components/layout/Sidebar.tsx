// src/components/layout/Sidebar.tsx
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { Home, BookOpen, Package, ChevronLeft, LayoutGrid } from 'lucide-react'
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
  onCollapse?: () => void
}

export function Sidebar({ onCollapse }: SidebarProps) {
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
      className="flex flex-col h-full w-60 shrink-0 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030e12 0%, #043941 40%, #032e34 100%)' }}
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
          onClick={() => navigate('/')}
          className="transition-opacity hover:opacity-80 active:opacity-60"
          title="Ver todos los talleres"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <GramaLogo variant="light" size="sm" />
        </button>
        {onCollapse && (
          <button
            onClick={onCollapse}
            className="text-white/30 hover:text-white/70 transition-colors ml-2"
            aria-label="Colapsar sidebar"
          >
            <ChevronLeft size={15} />
          </button>
        )}
      </div>

      {/* ── Taller activo ── */}
      {taller && (
        <div
          className="relative z-10 px-4 py-3.5 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {/* Badge número + línea acento */}
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-[9px] font-black px-2 py-0.5 rounded-full tracking-[0.12em]"
              style={{
                background: `${accent}1a`,
                color: accent,
                border: `1px solid ${accent}35`,
              }}
            >
              T{String(taller.numero).padStart(2, '0')}
            </span>
            <div className="h-px flex-1" style={{ background: `${accent}25` }} />
          </div>
          <p className="text-white text-xs font-bold leading-tight">
            {taller.nombreCorto}
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Taller de Educación para el Trabajo
          </p>
        </div>
      )}

      {/* ── Navegación ── */}
      <nav className="relative z-10 flex-1 px-3 py-4 space-y-1">
        <p
          className="text-[9px] font-black uppercase tracking-[0.14em] px-3 mb-2"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          Navegación
        </p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === `/taller/${slug}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background: 'rgba(255,255,255,0.09)',
                    boxShadow: `inset 3px 0 0 ${accent}`,
                    backdropFilter: 'blur(4px)',
                  }
                : undefined
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: isActive ? `${accent}20` : 'rgba(255,255,255,0.06)',
                  }}
                >
                  <Icon size={13} style={{ color: isActive ? accent : 'rgba(255,255,255,0.5)' }} />
                </div>
                {label}
                {isActive && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full animate-pulse-soft"
                    style={{ background: accent }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Progreso ── */}
      <div
        className="relative z-10 px-4 py-4 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Progreso general
          </p>
          <span
            className="text-[10px] font-black"
            style={{ color: '#02d47e' }}
          >
            {progreso.porcentaje}%
          </span>
        </div>

        {/* Barra con glow */}
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

        <div className="flex items-center justify-between">
          <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {progreso.completados}/{progreso.total} actividades completadas
          </p>
        </div>
      </div>

      {/* ── Volver al Hub ── */}
      <div className="relative z-10 px-3 pb-4">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all text-xs text-white/30 hover:text-white/60 hover:bg-white/[0.06]"
        >
          <LayoutGrid size={13} />
          Ver todos los talleres
        </button>
      </div>
    </aside>
  )
}
