'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Bell, LogOut } from 'lucide-react'
import { GramaLogo }  from '@/presentation/shared/ui/GramaLogo'
import { useAuth }    from '@/presentation/providers/AuthProvider'
import { useRouter }  from 'next/navigation'
import type { Taller } from '@/domain/taller/entities/Taller'

interface TopBarProps {
  taller:      Taller
  onMenuClick: () => void
}

export function TopBar({ taller, onMenuClick }: TopBarProps) {
  const pathname = usePathname()
  const { profile, signOut, isAdmin } = useAuth()
  const router = useRouter()

  // Breadcrumb
  const crumbs = buildCrumbs(pathname, taller)

  async function handleSignOut() {
    await signOut()
    router.push('/login')
  }

  return (
    <header
      className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
      style={{
        background:   '#ffffff',
        borderColor:  'var(--color-border)',
        minHeight:    '56px',
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg transition-colors"
        style={{ color: 'var(--color-grama-oscuro)' }}
      >
        <Menu size={18} />
      </button>

      {/* Logo (solo móvil) */}
      <div className="lg:hidden">
        <GramaLogo size="sm" />
      </div>

      {/* Breadcrumb */}
      <nav className="hidden lg:flex items-center gap-1.5 text-sm flex-1">
        <Link href="/hub" className="font-medium transition-colors" style={{ color: 'var(--color-lt-muted, #5a8a90)' }}>
          Mi Perfil
        </Link>
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span style={{ color: 'var(--color-border)' }}>›</span>
            {c.href ? (
              <Link href={c.href} className="font-medium" style={{ color: 'var(--color-grama-oscuro)' }}>
                {c.label}
              </Link>
            ) : (
              <span className="font-semibold" style={{ color: 'var(--color-grama-oscuro)' }}>{c.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="flex-1 lg:flex-none" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-xl transition-colors" style={{ color: 'var(--color-grama-oscuro)' }}>
          <Bell size={17} />
        </button>

        {/* Avatar */}
        {profile && (
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer"
              style={{ background: 'var(--color-grama-mint)', color: '#043941' }}
              title={profile.nombreCompleto ?? profile.email}
            >
              {(profile.nombreCompleto ?? profile.email)[0].toUpperCase()}
            </div>
            {isAdmin && (
              <span
                className="hidden sm:block text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'var(--color-acc-yellow)', color: '#6b5000' }}
              >
                ADMIN
              </span>
            )}
          </div>
        )}

        <button
          onClick={handleSignOut}
          className="p-2 rounded-xl transition-colors"
          style={{ color: 'var(--color-grama-oscuro)' }}
          title="Cerrar sesión"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  )
}

function buildCrumbs(pathname: string, taller: Taller) {
  const crumbs: { label: string; href?: string }[] = []
  const base = `/taller/${taller.slug}`

  crumbs.push({ label: taller.nombre, href: base })

  if (pathname.includes('/ruta/modulo/')) {
    crumbs.push({ label: 'Ruta de Aprendizaje', href: `${base}/ruta` })
    const num = pathname.split('/modulo/')[1]?.split('/')[0]
    if (num) crumbs.push({ label: `Módulo ${num}` })
  } else if (pathname.includes('/ruta')) {
    crumbs.push({ label: 'Ruta de Aprendizaje' })
  } else if (pathname.includes('/repositorio/bien/')) {
    crumbs.push({ label: 'Repositorio', href: `${base}/repositorio` })
    crumbs.push({ label: 'Detalle' })
  } else if (pathname.includes('/repositorio')) {
    crumbs.push({ label: 'Repositorio' })
  }

  return crumbs
}
