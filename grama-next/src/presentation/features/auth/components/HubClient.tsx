'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, BookOpen, Package, ChevronRight, Shield } from 'lucide-react'
import { GramaLogo }    from '@/presentation/shared/ui/GramaLogo'
import { ProgressRing } from '@/presentation/shared/ui/ProgressRing'
import { useAuth }      from '@/presentation/providers/AuthProvider'
import { useProgress }  from '@/presentation/providers/ProgressProvider'
import type { Taller }  from '@/domain/taller/entities/Taller'

interface HubClientProps { talleres: Taller[] }

// Número formateado T01, T02...
function tallerCode(n: number) { return `T${String(n).padStart(2, '0')}` }

export function HubClient({ talleres }: HubClientProps) {
  const { profile, signOut, isAdmin } = useAuth()
  const { getTallerProgreso }         = useProgress()
  const router = useRouter()

  const visibleTalleres = isAdmin
    ? talleres
    : talleres.filter(t =>
        profile?.tallerSlugs?.includes(t.slug) || profile?.tallerSlug === t.slug
      )

  async function handleSignOut() { await signOut(); router.push('/login') }

  const displayName = profile?.nombreCompleto ?? profile?.email?.split('@')[0] ?? 'Docente'

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-grama-oscuro)' }}>

      {/* ── TopBar ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-10 py-4"
        style={{
          background:   'rgba(4,57,65,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <GramaLogo size="md" variant="light" />
        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-80"
              style={{ background: 'var(--color-acc-yellow)', color: '#6b5000' }}
            >
              <Shield size={12} /> Panel de Admin
            </Link>
          )}
          <Link
            href="/perfil"
            className="text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Mi Perfil
          </Link>
          <button
            onClick={handleSignOut}
            className="transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            title="Cerrar sesión"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pt-12 pb-10 grama-pattern">
        <p className="overline-label animate-fade-in-up" style={{ color: 'var(--color-grama-mint)' }}>
          {isAdmin ? 'ADMINISTRADOR' : 'DOCENTE EPT'}
        </p>
        <h1
          className="font-extrabold mt-2 animate-fade-in-up stagger-1"
          style={{ fontSize: 'var(--text-h1)', color: '#ffffff', lineHeight: 1.1 }}
        >
          Hola, {displayName.split(' ')[0]}
        </h1>
        <p className="text-sm mt-2 animate-fade-in-up stagger-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {profile?.email} · Plataforma GRAMA LXP
        </p>

        {/* Stats chips */}
        <div className="flex flex-wrap gap-2 mt-6 animate-fade-in-up stagger-3">
          {[
            { label: `${visibleTalleres.length} talleres asignados` },
            { label: '7 módulos · 150h cada uno' },
            { label: 'Certificación Inroprin' },
          ].map(c => (
            <span
              key={c.label}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {c.label}
            </span>
          ))}
        </div>
      </section>

      {/* ── Grid de talleres ───────────────────────────────────── */}
      <section className="px-6 md:px-10 py-8">
        <h2 className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Talleres EPT
        </h2>

        {visibleTalleres.length === 0 ? (
          <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>No tienes talleres asignados aún.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleTalleres.map((t, i) => {
              const ids     = [] as string[] // progreso real se integra con IDs de contenidos
              const prog    = getTallerProgreso(ids)
              const accent  = t.color ?? '#02d47e'
              const base    = `/taller/${t.slug}`

              return (
                <TallerCard
                  key={t.slug}
                  taller={t}
                  accent={accent}
                  base={base}
                  progreso={prog.porcentaje}
                  stagger={Math.min(i + 1, 9)}
                />
              )
            })}
          </div>
        )}
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="px-6 md:px-10 pb-10 mt-4">
        <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
          GRAMA LXP · Plataforma EPT · MINEDU-TSF
        </p>
      </footer>
    </div>
  )
}

// ── Taller Card ────────────────────────────────────────────────────────────────
function TallerCard({
  taller, accent, base, progreso, stagger,
}: {
  taller:   Taller
  accent:   string
  base:     string
  progreso: number
  stagger:  number
}) {
  return (
    <Link
      href={base}
      className={`group relative rounded-2xl overflow-hidden flex flex-col animate-fade-in-up stagger-${stagger} transition-all duration-300`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border:     '1px solid rgba(255,255,255,0.08)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background   = `${accent}14`
        el.style.borderColor  = `${accent}40`
        el.style.transform    = 'translateY(-2px)'
        el.style.boxShadow    = `0 12px 32px ${accent}20`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background   = 'rgba(255,255,255,0.04)'
        el.style.borderColor  = 'rgba(255,255,255,0.08)'
        el.style.transform    = 'translateY(0)'
        el.style.boxShadow    = 'none'
      }}
    >
      {/* Color bar top */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}60)` }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span
              className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold mb-2"
              style={{ background: `${accent}20`, color: accent }}
            >
              {tallerCode(taller.numero)}
            </span>
            <h3 className="font-bold text-sm leading-snug" style={{ color: '#ffffff' }}>
              {taller.nombre}
            </h3>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              7 Módulos · 150h
            </p>
          </div>
          <ProgressRing percentage={progreso} size={48} strokeWidth={4} dark />
        </div>

        {/* Descripción breve */}
        {taller.descripcion && (
          <p
            className="text-[11px] leading-relaxed mb-4 line-clamp-2"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            {taller.descripcion}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Quick access row */}
        <div
          className="flex items-center gap-2 pt-3 mt-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <QuickChip href={`${base}/ruta`}       icon={BookOpen} label="Ruta"        accent={accent} />
          <QuickChip href={`${base}/repositorio`} icon={Package}  label="Repositorio" accent={accent} />
          <ChevronRight
            size={14}
            className="ml-auto transition-transform group-hover:translate-x-1"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          />
        </div>
      </div>
    </Link>
  )
}

function QuickChip({
  href, icon: Icon, label, accent,
}: {
  href: string; icon: React.FC<{ size?: number }>; label: string; accent: string
}) {
  return (
    <Link
      href={href}
      onClick={e => e.stopPropagation()}
      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all hover:opacity-80"
      style={{ background: `${accent}18`, color: accent }}
    >
      <Icon size={10} /> {label}
    </Link>
  )
}
