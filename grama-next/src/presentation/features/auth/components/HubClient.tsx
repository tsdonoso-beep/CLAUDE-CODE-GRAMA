'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { GramaLogo }  from '@/presentation/shared/ui/GramaLogo'
import { ProgressRing } from '@/presentation/shared/ui/ProgressRing'
import { useAuth }    from '@/presentation/providers/AuthProvider'
import { useProgress } from '@/presentation/providers/ProgressProvider'
import type { Taller } from '@/domain/taller/entities/Taller'

interface HubClientProps {
  talleres: Taller[]
}

export function HubClient({ talleres }: HubClientProps) {
  const { profile, signOut, isAdmin } = useAuth()
  const { getTallerProgreso } = useProgress()
  const router = useRouter()

  // Filtrar talleres por asignación del docente (admins ven todos)
  const visibleTalleres = isAdmin
    ? talleres
    : talleres.filter(t =>
        profile?.tallerSlugs?.includes(t.slug) ||
        profile?.tallerSlug === t.slug
      )

  async function handleSignOut() {
    await signOut()
    router.push('/login')
  }

  const displayName = profile?.nombreCompleto ?? profile?.email?.split('@')[0] ?? 'Docente'

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-grama-oscuro)' }}>
      {/* TopBar hub */}
      <header
        className="flex items-center justify-between px-6 md:px-10 py-4 border-b"
        style={{ borderColor: 'var(--color-dk-border)' }}
      >
        <GramaLogo size="md" variant="light" />
        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: 'var(--color-acc-yellow)', color: '#6b5000' }}
            >
              Panel de Admin
            </Link>
          )}
          <Link href="/perfil" className="text-xs font-medium" style={{ color: 'var(--color-dk-muted)' }}>
            Mi Perfil
          </Link>
          <button onClick={handleSignOut} style={{ color: 'var(--color-dk-muted)' }}>
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Hero saludo */}
      <section className="px-6 md:px-10 py-10 grama-pattern">
        <p className="overline-label animate-fade-in-up" style={{ color: 'var(--color-grama-mint)' }}>
          {isAdmin ? 'ADMINISTRADOR' : 'DOCENTE'}
        </p>
        <h1
          className="font-extrabold mt-2 animate-fade-in-up stagger-1"
          style={{ fontSize: 'var(--text-h1)', color: '#ffffff' }}
        >
          Hola, {displayName}
        </h1>
        <p className="text-sm mt-1 animate-fade-in-up stagger-2" style={{ color: 'var(--color-dk-muted)' }}>
          {profile?.email}
        </p>
      </section>

      {/* Grid de talleres */}
      <section className="px-6 md:px-10 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-base" style={{ color: '#ffffff' }}>
            Talleres EPT
            <span className="ml-2 text-xs font-normal" style={{ color: 'var(--color-dk-muted)' }}>
              {visibleTalleres.length} asignados
            </span>
          </h2>
        </div>

        {visibleTalleres.length === 0 ? (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background: 'var(--color-dk-surface)', border: '1px solid var(--color-dk-border)' }}
          >
            <p style={{ color: 'var(--color-dk-muted)' }}>No tienes talleres asignados aún.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleTalleres.map((t, i) => {
              // Progreso placeholder (sin IDs reales en este scaffold)
              const progreso = getTallerProgreso([])

              return (
                <Link
                  key={t.slug}
                  href={`/taller/${t.slug}`}
                  className={`card-lift rounded-2xl p-5 flex gap-4 items-start animate-fade-in-up stagger-${Math.min(i + 1, 9)}`}
                  style={{
                    background:   'var(--color-dk-surface)',
                    border:       '1px solid var(--color-dk-border)',
                  }}
                >
                  <ProgressRing percentage={progreso.porcentaje} size={56} dark />
                  <div className="flex-1 min-w-0">
                    <p className="overline-label" style={{ color: 'var(--color-grama-mint)', fontSize: '10px' }}>
                      T0{t.numero}
                    </p>
                    <h3 className="font-bold text-sm mt-0.5 leading-snug" style={{ color: '#ffffff' }}>
                      {t.nombre}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-dk-muted)' }}>
                      7 Módulos · 150h
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
