'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Package, ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { useAuth }     from '@/presentation/providers/AuthProvider'
import { useProgress } from '@/presentation/providers/ProgressProvider'
import type { Taller } from '@/domain/taller/entities/Taller'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  taller:        Taller
  collapsed:     boolean
  onCollapse:    () => void
  mobileOpen:    boolean
  onMobileClose: () => void
}

interface NavItem {
  href:  string
  label: string
  icon:  React.ComponentType<{ size?: number; className?: string }>
}

export function Sidebar({ taller, collapsed, onCollapse, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname()
  const { profile, signOut } = useAuth()
  const router = useRouter()

  const base = `/taller/${taller.slug}`
  const navItems: NavItem[] = [
    { href: base,                  label: 'Inicio',      icon: Home     },
    { href: `${base}/ruta`,        label: 'Ruta de Aprendizaje', icon: BookOpen },
    { href: `${base}/repositorio`, label: 'Repositorio', icon: Package  },
  ]

  async function handleSignOut() {
    await signOut()
    router.push('/login')
  }

  const sidebarClass = [
    'flex flex-col h-full transition-all duration-300 z-30',
    'fixed lg:relative inset-y-0 left-0',
    collapsed ? 'w-16' : 'w-60',
    mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
  ].join(' ')

  return (
    <aside
      className={sidebarClass}
      style={{ background: 'var(--color-sidebar-bg)', borderRight: '1px solid var(--color-sidebar-border)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b" style={{ borderColor: 'var(--color-sidebar-border)' }}>
        {!collapsed && (
          <div>
            <span className="overline-label" style={{ color: 'var(--color-grama-mint)', fontSize: '10px' }}>
              T0{taller.numero} · {taller.nombreCorto.toUpperCase()}
            </span>
            <p className="text-sm font-bold mt-0.5 truncate" style={{ color: 'var(--color-dk-text)' }}>
              {taller.nombre}
            </p>
          </div>
        )}
        <button
          onClick={onCollapse}
          className="hidden lg:flex p-1.5 rounded-lg transition-colors"
          style={{ color: 'var(--color-dk-muted)' }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map(item => {
          const isActive = pathname === item.href || (item.href !== base && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all',
                isActive ? 'sidebar-active-glow' : 'hover:bg-white/5',
              ].join(' ')}
              style={{
                color: isActive ? 'var(--color-grama-mint)' : 'var(--color-dk-muted)',
                background: isActive ? 'rgba(2,212,126,0.08)' : undefined,
              }}
            >
              <item.icon size={17} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 pb-4 space-y-2 border-t pt-4" style={{ borderColor: 'var(--color-sidebar-border)' }}>
        {/* Ver todos los talleres */}
        <Link
          href="/hub"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors"
          style={{ color: 'var(--color-dk-muted)' }}
        >
          <Home size={15} />
          {!collapsed && <span>Ver todos los talleres</span>}
        </Link>

        {/* User info + logout */}
        {profile && (
          <div className="flex items-center gap-2 px-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: 'var(--color-grama-mint)', color: '#043941' }}
            >
              {(profile.nombreCompleto ?? profile.email)[0].toUpperCase()}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-dk-text)' }}>
                  {profile.nombreCompleto ?? profile.email.split('@')[0]}
                </p>
                <p className="text-[10px] truncate" style={{ color: 'var(--color-dk-muted)' }}>
                  {profile.email}
                </p>
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: 'var(--color-dk-muted)' }}
              title="Cerrar sesión"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
