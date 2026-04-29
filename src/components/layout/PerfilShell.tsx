// src/components/layout/PerfilShell.tsx
import { Outlet, NavLink } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useProgress } from '@/contexts/ProgressContext'
import { talleresConfig } from '@/data/talleresConfig'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'

const TABS = [
  { label: 'Mis talleres',    to: '/perfil',                 end: true  },
  { label: 'Mis logros',      to: '/perfil/logros',          end: false },
  { label: 'Centro de ayuda', to: '/perfil/ayuda',           end: false },
  { label: 'Configuración',   to: '/perfil/configuracion',   end: false },
]

export function PerfilShell() {
  const { profile, user, signOut } = useAuth()
  const { getTallerProgreso } = useProgress()

  const displayName = profile?.nombre_completo
    || user?.user_metadata?.full_name
    || profile?.email?.split('@')[0]
    || 'Docente'

  const initials = displayName
    .split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase() || '?'

  const tallerSlugs: string[] = profile?.taller_slugs?.length
    ? profile.taller_slugs
    : profile?.taller_slug ? [profile.taller_slug] : []

  const progressList = tallerSlugs.map(s => getTallerProgreso(s))
  const totalCompletados = progressList.reduce((sum, p) => sum + p.completados, 0)
  const totalHoras       = Math.round(totalCompletados * 150 / 130)
  const overallPct       = progressList.length > 0
    ? Math.round(progressList.reduce((sum, p) => sum + p.porcentaje, 0) / progressList.length)
    : 0

  const ie = INSTITUCIONES_EDUCATIVAS.find(i => i.id === profile?.ie_id)

  const hour    = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  const badges = [
    'Docente EPT',
    ie?.provincia ? `${ie.provincia}` : null,
    ie?.nombre    ? `I.E. ${ie.nombre}` : null,
    `Año escolar ${new Date().getFullYear()}`,
  ].filter(Boolean) as string[]

  return (
    <div style={{ minHeight: '100vh', background: '#f0faf5', fontFamily: "'Manrope', sans-serif" }}>

      {/* ── Header oscuro ─────────────────────────────────────────────────── */}
      <header style={{
        background: 'linear-gradient(135deg, #032e34 0%, #043941 100%)',
        borderBottom: '1px solid rgba(2,212,126,0.12)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '28px 48px 0' }}>

          {/* Fila principal: avatar + info | stats + logout */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 24, gap: 24 }}>

            {/* Avatar + datos */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, minWidth: 0 }}>
              {/* Avatar */}
              <div style={{
                width: 68, height: 68, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #02d47e, #059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', fontWeight: 800, color: '#043941',
                border: '2.5px solid rgba(2,212,126,0.35)',
                boxShadow: '0 0 0 5px rgba(2,212,126,0.08)',
              }}>
                {initials}
              </div>

              {/* Info */}
              <div style={{ minWidth: 0 }}>
                <p style={{ color: 'rgba(2,212,126,0.65)', fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', margin: '0 0 4px' }}>
                  {greeting}
                </p>
                <h1 style={{ color: '#fff', fontSize: 'clamp(1.35rem, 2.5vw, 1.8rem)', fontWeight: 800, margin: '0 0 10px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {displayName}
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {badges.map((badge, i) => (
                    <span key={i} style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.11)',
                      color: 'rgba(255,255,255,0.5)',
                      padding: '3px 10px', borderRadius: 100,
                      fontSize: 11, fontWeight: 600,
                    }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats + logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexShrink: 0 }}>
              {[
                { value: `${totalHoras}h`,            label: 'Completadas' },
                { value: `${overallPct}%`,             label: 'Progreso'    },
                { value: String(tallerSlugs.length),   label: 'Talleres'    },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <p style={{ color: '#02d47e', fontSize: 'clamp(1.3rem, 2vw, 1.75rem)', fontWeight: 800, margin: 0, lineHeight: 1, letterSpacing: '-0.03em' }}>
                    {s.value}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', margin: '5px 0 0' }}>
                    {s.label}
                  </p>
                </div>
              ))}

              {/* Divider */}
              <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.08)' }} />

              {/* Logout */}
              <button
                onClick={() => signOut()}
                style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
              >
                <LogOut size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
              </button>
            </div>
          </div>

          {/* Tab nav */}
          <nav style={{ display: 'flex' }}>
            {TABS.map(tab => (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.end}
                style={({ isActive }) => ({
                  padding: '12px 22px',
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#02d47e' : 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  borderBottom: isActive ? '2px solid #02d47e' : '2px solid transparent',
                  transition: 'color .18s, border-color .18s',
                  whiteSpace: 'nowrap',
                  display: 'block',
                })}
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Contenido de la página ─────────────────────────────────────────── */}
      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 48px' }}>
        <Outlet />
      </main>
    </div>
  )
}
