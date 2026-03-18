// src/components/layout/Sidebar.tsx
import { NavLink, useParams } from 'react-router-dom'
import { Home, BookOpen, Package, ChevronLeft } from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'
import { mockProgreso } from '@/mock/mockEstados'
import logoGrama from '@/assets/logo-grama-full.png'

interface SidebarProps {
  onCollapse?: () => void
}

export function Sidebar({ onCollapse }: SidebarProps) {
  const { slug } = useParams<{ slug: string }>()
  const taller = talleresConfig.find(t => t.slug === slug)

  const navItems = [
    { to: `/taller/${slug}`,             icon: Home,     label: 'Inicio' },
    { to: `/taller/${slug}/ruta`,        icon: BookOpen, label: 'Ruta de Aprendizaje' },
    { to: `/taller/${slug}/repositorio`, icon: Package,  label: 'Repositorio' },
  ]

  return (
    <aside
      className="flex flex-col h-full w-60 shrink-0"
      style={{ background: '#043941' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <img src={logoGrama} alt="GRAMA Proyectos Educativos" className="h-9 object-contain" />
        {onCollapse && (
          <button
            onClick={onCollapse}
            className="text-white/40 hover:text-white transition-colors shrink-0"
            aria-label="Colapsar sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Taller activo */}
      {taller && (
        <div className="px-5 py-3 border-b border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#02d47e' }}>
            T{taller.numero}
          </p>
          <p className="text-white text-sm font-semibold leading-tight mt-0.5">
            {taller.nombreCorto}
          </p>
        </div>
      )}

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === `/taller/${slug}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`
            }
            style={({ isActive }) =>
              isActive ? { background: '#045f6c' } : undefined
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Progreso global */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-xs text-white/50 mb-2">Progreso general</p>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-white">
            {mockProgreso.modulosCompletados} de {mockProgreso.modulosTotal} módulos
          </span>
          <span className="text-xs font-semibold" style={{ color: '#02d47e' }}>
            {mockProgreso.porcentajeGeneral}%
          </span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${mockProgreso.porcentajeGeneral}%`, background: '#02d47e' }}
          />
        </div>
        <p className="text-xs text-white/40 mt-1.5">
          {mockProgreso.horasCompletadas}h / {mockProgreso.horasTotal}h totales
        </p>
      </div>

      {/* Volver al Hub */}
      <div className="px-3 pb-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <ChevronLeft size={14} />
          Ver todos los talleres
        </NavLink>
      </div>
    </aside>
  )
}
