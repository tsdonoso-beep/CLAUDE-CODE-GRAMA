// src/pages/Perfil.tsx
import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import {
  ChevronRight, LogOut, ArrowRight,
  LayoutDashboard, BookOpen, Compass, User as UserIcon,
  Activity, Trophy, Award, CalendarDays,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useProgress } from '@/contexts/ProgressContext'
import { talleresConfig } from '@/data/talleresConfig'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { GramaLogo } from '@/components/GramaLogo'
import { trackNavegacion } from '@/lib/tracker'
import {
  getProximaSesion, formatFechaSesion,
  getSesionesPorTaller, diasParaSesion, formatHoraSesion,
} from '@/data/sesionesLXP'
import { modulosLXP } from '@/data/modulosLXP'

const TOTAL_HORAS   = 150
const TOTAL_MODULOS = 7

const TALLER_ACCENTS: Record<string, string> = {
  'mecanica-automotriz': '#02d47e',
  'industria-vestido':   '#045f6c',
  'cocina-reposteria':   '#02a05a',
  'ebanisteria':         '#04768a',
  'comunicaciones':      '#027b8a',
  'computacion':         '#00c16e',
  'agropecuaria':        '#019a6f',
  'electricidad':        '#01b868',
  'electronica':         '#038f6d',
  'construccion':        '#043941',
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?'
}

// Shapes únicas por taller — composición geométrica que refleja cada especialidad
function TallerHeroShapes({ slugs }: { slugs: string[] }) {
  const c1 = TALLER_ACCENTS[slugs[0]] ?? '#02d47e'
  const c2 = slugs[1] ? (TALLER_ACCENTS[slugs[1]] ?? '#d4c4fc') : '#f8ee91'
  const p = { position: 'absolute' as const, pointerEvents: 'none' as const }

  // Patrón base compartido — triángulo grande + overlap oscuro + borde derecho
  const base = (
    <>
      <div style={{ ...p, top:-220, right:'-4%', width:540, height:540, background:c1, clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:.14, animation:'heroFa 16s ease-in-out infinite' }} />
      <div style={{ ...p, top:-100, right:'2%', width:260, height:260, background:'#0b4a56', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:.22, animation:'heroFa 16s ease-in-out infinite .5s' }} />
      <div style={{ ...p, top:'15%', right:-160, width:400, height:320, background:c1, clipPath:'polygon(100% 50%,0% 0%,0% 100%)', opacity:.1, animation:'heroFc 14s ease-in-out infinite .5s' }} />
    </>
  )

  // Extras diferenciados por categoría de taller
  const slug = slugs[0]
  const isIndustrial = ['mecanica-automotriz','electricidad','electronica','computacion'].includes(slug)
  const isArtesanal  = ['ebanisteria','construccion','agropecuaria'].includes(slug)
  // resto → servicios (vestido, cocina, comunicaciones)

  const extras = isIndustrial ? (
    <>
      <div style={{ ...p, top:-55, right:'27%', width:95, height:250, background:c1, borderRadius:'0 0 48px 48px', opacity:.2, animation:'heroFb 12s ease-in-out infinite 1s' }} />
      <div style={{ ...p, bottom:'6%', right:'5%', width:58, height:58, background:c1, borderRadius:8, opacity:.28, animation:'heroFf 9s ease-in-out infinite 1.2s' }} />
      <div style={{ ...p, bottom:'18%', right:'3%', width:48, height:48, background:'#02d47e', clipPath:'polygon(38% 0%,62% 0%,62% 38%,100% 38%,100% 62%,62% 62%,62% 100%,38% 100%,38% 62%,0% 62%,0% 38%,38% 38%)', animation:'heroSpin 20s linear infinite' }} />
    </>
  ) : isArtesanal ? (
    <>
      <div style={{ ...p, top:'42%', right:-90, width:210, height:290, background:c1, clipPath:'polygon(0% 50%,100% 0%,100% 100%)', opacity:.14, animation:'heroFe 13s ease-in-out infinite 2s' }} />
      <div style={{ ...p, bottom:-80, right:'28%', width:170, height:170, background:c1, transform:'rotate(45deg)', borderRadius:20, opacity:.2, animation:'heroFd 15s ease-in-out infinite 1s' }} />
      <div style={{ ...p, top:'8%', right:'14%', width:52, height:52, background:'#f8ee91', borderRadius:6, opacity:.3, animation:'heroFf 11s ease-in-out infinite 2s' }} />
    </>
  ) : (
    // Servicios: barras verticales rítmicas
    <>
      <div style={{ ...p, top:-65, right:'26%', width:82, height:270, background:c1, borderRadius:'0 0 42px 42px', opacity:.22, animation:'heroFb 11s ease-in-out infinite 1s' }} />
      <div style={{ ...p, top:-35, right:'19%', width:52, height:190, background:'#f8ee91', borderRadius:'0 0 26px 26px', opacity:.22, animation:'heroFb 14s ease-in-out infinite 2s' }} />
      <div style={{ ...p, top:'10%', right:'8%', width:44, height:44, background:c1, borderRadius:'50%', opacity:.22, animation:'heroFd 10s ease-in-out infinite .5s' }} />
    </>
  )

  const second = slugs.length > 1 ? (
    <div style={{ ...p, bottom:-160, right:'18%', width:420, height:420, background:c2, clipPath:'polygon(50% 100%,0% 0%,100% 0%)', opacity:.1, animation:'heroFd 18s ease-in-out infinite 2s' }} />
  ) : null

  return <>{base}{extras}{second}</>
}

// ── Tangram decorativo (copiado de Landing.tsx) ───────────────────────────────
function Tangram({
  color = '#02d47e',
  opacity = 0.12,
  className = '',
  rotate = 0,
}: {
  color?: string
  opacity?: number
  className?: string
  rotate?: number
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Triángulo grande 1 */}
      <polygon points="0,160 80,80 0,0"              fill={color} fillOpacity={opacity} />
      {/* Triángulo grande 2 */}
      <polygon points="160,0 80,80 160,160"           fill={color} fillOpacity={opacity * 0.7} />
      {/* Triángulo mediano */}
      <polygon points="0,160 80,160 80,80"            fill={color} fillOpacity={opacity * 1.2} />
      {/* Cuadrado */}
      <rect x="70" y="30" width="40" height="40" transform="rotate(45 90 50)" fill={color} fillOpacity={opacity * 0.9} />
      {/* Triángulo pequeño 1 */}
      <polygon points="80,80 120,80 120,120"          fill={color} fillOpacity={opacity * 0.8} />
      {/* Triángulo pequeño 2 */}
      <polygon points="80,80 80,120 120,120"          fill={color} fillOpacity={opacity * 0.6} />
      {/* Paralelogramo */}
      <polygon points="120,80 160,80 160,120 120,120" fill={color} fillOpacity={opacity * 0.5} />
    </svg>
  )
}

// ── Calendario de sesiones (sidebar) ─────────────────────────────────────────
const MESES_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DIAS_ES  = ['Lu','Ma','Mi','Ju','Vi','Sa','Do']

function CalendarioSidebar({ tallerSlugs, accent }: { tallerSlugs: string[]; accent: string }) {
  const now = new Date()
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [viewYear,  setViewYear]  = useState(now.getFullYear())

  const sesiones = tallerSlugs
    .flatMap(slug => getSesionesPorTaller(slug))
    .filter(s => new Date(s.fecha).getTime() > Date.now())
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())

  // Map: día → colores únicos de talleres con sesión ese día
  const dayColors = new Map<number, string[]>()
  sesiones
    .filter(s => {
      const d = new Date(s.fecha)
      return d.getMonth() === viewMonth && d.getFullYear() === viewYear
    })
    .forEach(s => {
      const day    = new Date(s.fecha).getDate()
      const tColor = TALLER_ACCENTS[s.tallerSlug] ?? accent
      const prev   = dayColors.get(day) ?? []
      if (!prev.includes(tColor)) dayColors.set(day, [...prev, tColor])
    })

  const firstDay  = new Date(viewYear, viewMonth, 1).getDay()
  const startOff  = (firstDay + 6) % 7
  const daysInMon = new Date(viewYear, viewMonth + 1, 0).getDate()
  const isThisMon = now.getMonth() === viewMonth && now.getFullYear() === viewYear

  const prevMonth = () => viewMonth === 0 ? (setViewMonth(11), setViewYear(y => y - 1)) : setViewMonth(m => m - 1)
  const nextMonth = () => viewMonth === 11 ? (setViewMonth(0), setViewYear(y => y + 1)) : setViewMonth(m => m + 1)

  return (
    <section
      className="rounded-2xl overflow-hidden animate-fade-in-up stagger-2"
      style={{
        background: '#ffffff',
        border: `1.5px solid ${accent}40`,
        boxShadow: `0 0 0 4px ${accent}0c, 0 4px 16px rgba(4,57,65,0.06)`,
      }}
    >
      {/* Header — estático, siempre visible */}
      <div
        className="px-5 py-4 border-b flex items-center gap-2.5"
        style={{ borderColor: 'rgba(4,57,65,0.07)' }}
      >
        <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}18` }}>
          <CalendarDays size={15} style={{ color: accent }} />
        </div>
        <div>
          <p className="text-sm font-extrabold leading-none" style={{ color: 'var(--grama-oscuro)' }}>Agenda de Sesiones</p>
          {sesiones[0] && (
            <p className="text-[11px] mt-0.5 leading-none" style={{ color: '#94a3b8' }}>
              Próx: {formatFechaSesion(sesiones[0].fecha)}
            </p>
          )}
        </div>
      </div>

      {/* Navegación de mes */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
        <button onClick={prevMonth} className="h-6 w-6 rounded-lg flex items-center justify-center transition-colors hover:bg-black/[0.04]">
          <ChevronRight size={12} style={{ color: 'rgba(4,57,65,0.4)', transform: 'rotate(180deg)' }} />
        </button>
        <p className="text-xs font-extrabold" style={{ color: 'var(--grama-oscuro)' }}>
          {MESES_ES[viewMonth]} {viewYear}
        </p>
        <button onClick={nextMonth} className="h-6 w-6 rounded-lg flex items-center justify-center transition-colors hover:bg-black/[0.04]">
          <ChevronRight size={12} style={{ color: 'rgba(4,57,65,0.4)' }} />
        </button>
      </div>

      {/* Grilla del calendario */}
      <div className="px-4 pt-3 pb-2">
        <div className="grid grid-cols-7 mb-1.5">
          {DIAS_ES.map(d => (
            <div key={d} className="text-center text-[9px] font-extrabold uppercase tracking-wide" style={{ color: 'rgba(4,57,65,0.28)' }}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: startOff }).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({ length: daysInMon }, (_, i) => i + 1).map(day => {
            const isToday  = isThisMon && day === now.getDate()
            const colors   = dayColors.get(day) ?? []
            const hasSes   = colors.length > 0
            return (
              <div key={day} className="flex flex-col items-center py-0.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                  style={{
                    background: isToday ? accent : 'transparent',
                    color: isToday ? '#fff' : hasSes ? 'var(--grama-oscuro)' : 'rgba(4,57,65,0.4)',
                    fontWeight: (isToday || hasSes) ? 800 : 400,
                  }}
                >
                  {day}
                </div>
                {/* Un punto por cada taller con sesión ese día */}
                <div className="h-1.5 flex items-center justify-center gap-px">
                  {!isToday && colors.slice(0, 3).map((c, ci) => (
                    <span key={ci} className="w-1 h-1 rounded-full block" style={{ background: c }} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lista de próximas 4 sesiones */}
      {sesiones.length > 0 && (
        <div className="mx-4 mb-4 pt-3 border-t" style={{ borderColor: 'rgba(4,57,65,0.07)' }}>
          <p className="text-[9px] font-extrabold uppercase tracking-widest mb-2.5" style={{ color: 'rgba(4,57,65,0.3)' }}>Próximas sesiones</p>
          <div className="space-y-2.5">
            {sesiones.slice(0, 4).map(s => {
              const dias    = diasParaSesion(s.fecha)
              const tColor  = TALLER_ACCENTS[s.tallerSlug] ?? accent
              const tNombre = talleresConfig.find(t => t.slug === s.tallerSlug)?.nombreCorto ?? s.tallerSlug
              return (
                <div key={s.id} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: tColor }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold leading-snug" style={{ color: 'var(--grama-oscuro)' }}>{s.titulo}</p>
                    <p className="text-[10px]" style={{ color: '#94a3b8' }}>
                      {formatFechaSesion(s.fecha)} · {formatHoraSesion(s.fecha)}
                      <span className="mx-1">·</span>
                      <span className="font-bold" style={{ color: tColor }}>{tNombre}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-extrabold shrink-0 mt-0.5" style={{ color: tColor }}>{dias}d</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}

export default function Perfil() {
  const navigate = useNavigate()
  const { profile, user, isAdmin, signOut } = useAuth()
  const { getTallerProgreso } = useProgress()

  if (isAdmin) return <Navigate to="/admin" replace />

  const displayName  = profile?.nombre_completo || user?.email?.split('@')[0] || 'Docente'
  const firstName    = displayName.split(' ')[0]
  const displayEmail = profile?.email ?? user?.email ?? ''
  const tallerSlug   = profile?.taller_slug ?? null

  const tallerSlugsAccesibles: string[] =
    profile?.taller_slugs?.length
      ? profile.taller_slugs
      : tallerSlug ? [tallerSlug] : []

  useEffect(() => {
    if (!user?.id) return
    trackNavegacion(user.id, 'perfil', tallerSlug)
  }, [user?.id])

  const ie      = INSTITUCIONES_EDUCATIVAS.find(i => i.id === profile?.ie_id)
  const ieLabel = ie ? ie.nombre : 'Sin IE asignada'

  const primaryAccent = TALLER_ACCENTS[tallerSlugsAccesibles[0]] ?? '#02d47e'

  const overallProgreso = tallerSlugsAccesibles.length > 0
    ? Math.round(
        tallerSlugsAccesibles.reduce((sum, s) => sum + getTallerProgreso(s).porcentaje, 0)
        / tallerSlugsAccesibles.length
      )
    : 0

  const hour     = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'
  const fechaHoy = new Date().toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside
        className="fixed top-0 left-0 h-full flex-col z-40 hidden lg:flex"
        style={{ width: 220, background: '#043941', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button onClick={() => navigate('/')} className="transition-opacity hover:opacity-80">
            <GramaLogo variant="light" size="sm" />
          </button>
        </div>

        {/* MIS TALLERES */}
        {tallerSlugsAccesibles.length > 0 && (
          <div className="px-4 pt-5 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <p className="text-[9px] font-extrabold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Mis talleres
            </p>
            <div className="space-y-1">
              {tallerSlugsAccesibles.map(slug => {
                const t  = talleresConfig.find(x => x.slug === slug)
                const ta = TALLER_ACCENTS[slug] ?? '#02d47e'
                const p  = getTallerProgreso(slug)
                return (
                  <button
                    key={slug}
                    onClick={() => navigate(`/taller/${slug}`)}
                    className="w-full text-left px-3 py-2.5 rounded-xl transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold truncate" style={{ color: 'rgba(255,255,255,0.85)' }}>
                        {t?.nombreCorto ?? slug}
                      </span>
                      <span className="text-[10px] font-black flex-shrink-0 ml-1" style={{ color: ta }}>{p.porcentaje}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-full rounded-full" style={{ width: `${p.porcentaje}%`, background: ta }} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* MI CAPACITACIÓN nav */}
        <div className="px-4 pt-4 pb-3">
          <p className="text-[9px] font-extrabold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Mi capacitación
          </p>
          <div className="space-y-0.5">
            {([
              { icon: LayoutDashboard, label: 'Inicio',   active: true,  action: () => {} },
              { icon: BookOpen,        label: 'Módulos',  active: false, action: () => tallerSlugsAccesibles[0] && navigate(`/taller/${tallerSlugsAccesibles[0]}/ruta`) },
              { icon: Trophy,          label: 'Logros',   active: false, action: () => {} },
              { icon: Compass,         label: 'Explorar', active: false, action: () => navigate('/') },
            ] as const).map(item => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all"
                style={{
                  background: item.active ? 'rgba(2,212,126,0.15)' : 'transparent',
                  border: item.active ? '1px solid rgba(2,212,126,0.25)' : '1px solid transparent',
                }}
                onMouseEnter={e => { if (!item.active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                onMouseLeave={e => { if (!item.active) e.currentTarget.style.background = 'transparent' }}
              >
                <item.icon size={14} style={{ color: item.active ? '#02d47e' : 'rgba(255,255,255,0.45)', flexShrink: 0 }} />
                <span className="text-xs font-semibold" style={{ color: item.active ? '#02d47e' : 'rgba(255,255,255,0.55)' }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* GRAMA nav */}
        <div className="px-4 pt-2 pb-3 mt-auto border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-[9px] font-extrabold uppercase tracking-widest mb-3 pt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
            GRAMA
          </p>
          <div className="space-y-0.5">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all"
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <Activity size={14} style={{ color: 'rgba(255,255,255,0.45)' }} />
              <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>Ver plataforma</span>
            </button>
            <a
              href="mailto:soporte@grama.pe"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all"
              style={{ display: 'flex' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              <UserIcon size={14} style={{ color: 'rgba(255,255,255,0.45)' }} />
              <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>Soporte</span>
            </a>
          </div>
        </div>

        {/* User footer */}
        <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black"
              style={{ background: primaryAccent, color: '#043941' }}
            >
              {getInitials(displayName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: 'rgba(255,255,255,0.85)' }}>{displayName}</p>
              <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>{displayEmail}</p>
            </div>
            <button
              onClick={async () => { await signOut(); navigate('/login', { replace: true }) }}
              className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors hover:bg-white/10"
              title="Cerrar sesión"
            >
              <LogOut size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────────────────────── */}
      <main
        className="flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: 0, background: '#f5f7f6' }}
      >
        <style>{`@media (min-width:1024px){.perfil-main{margin-left:220px}}`}</style>
        <div className="perfil-main flex flex-col min-h-screen">

          {/* Sticky header */}
          <header
            className="sticky top-0 z-30 flex items-center justify-between border-b"
            style={{
              background: '#ffffff',
              borderColor: 'rgba(4,57,65,0.08)',
              height: 56,
              paddingLeft: 32,
              paddingRight: 32,
            }}
          >
            <div>
              <p className="text-sm font-black" style={{ color: '#043941' }}>Mi capacitación</p>
              <p className="text-[11px]" style={{ color: '#94a3b8' }}>{ieLabel}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-[11px] font-medium hidden sm:block" style={{ color: '#94a3b8' }}>
                {fechaHoy}
              </p>
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-black cursor-default lg:hidden"
                style={{ background: primaryAccent, color: '#043941' }}
              >
                {getInitials(displayName)}
              </div>
              <button
                onClick={async () => { await signOut(); navigate('/login', { replace: true }) }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-60 lg:hidden"
                style={{ color: 'rgba(4,57,65,0.45)' }}
              >
                <LogOut size={12} /> Salir
              </button>
            </div>
          </header>

          {/* Scrollable content */}
          <div className="flex-1">

            {/* Hero banner */}
            <div
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg,#043941 0%,#045f6c 60%,rgba(4,57,65,0.95) 100%)',
                minHeight: 200,
              }}
            >
              <div className="absolute inset-0 grama-pattern opacity-20" />
              {tallerSlugsAccesibles.length > 0 && <TallerHeroShapes slugs={tallerSlugsAccesibles} />}

              <div className="relative z-10 px-8 py-8">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(2,212,126,0.7)' }}>
                  {greeting}
                </p>
                <h1
                  className="text-3xl font-black mb-1"
                  style={{ color: '#d2ffe1', letterSpacing: '-0.04em', lineHeight: 1.1 }}
                >
                  {firstName}
                </h1>
                <p className="text-sm mb-6" style={{ color: 'rgba(210,255,225,0.45)' }}>
                  Continúa donde lo dejaste
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-3">
                  {([
                    { label: 'Talleres activos', value: String(tallerSlugsAccesibles.length || 0) },
                    { label: 'Avance general',   value: `${overallProgreso}%` },
                    { label: 'Certificados',      value: '0' },
                  ] as const).map(stat => (
                    <div
                      key={stat.label}
                      className="px-4 py-2.5 rounded-xl"
                      style={{ background: 'rgba(4,57,65,0.55)', border: '1px solid rgba(2,212,126,0.18)', backdropFilter: 'blur(8px)' }}
                    >
                      <p className="text-lg font-black leading-none" style={{ color: '#02d47e' }}>{stat.value}</p>
                      <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'rgba(210,255,225,0.45)' }}>{stat.label}</p>
                    </div>
                  ))}
                  {/* Taller chips */}
                  {tallerSlugsAccesibles.map(slug => {
                    const t  = talleresConfig.find(x => x.slug === slug)
                    const ta = TALLER_ACCENTS[slug] ?? '#02d47e'
                    return (
                      <button
                        key={slug}
                        onClick={() => navigate(`/taller/${slug}`)}
                        className="px-4 py-2.5 rounded-xl transition-all"
                        style={{ background: `${ta}22`, border: `1px solid ${ta}45` }}
                        onMouseEnter={e => (e.currentTarget.style.background = `${ta}38`)}
                        onMouseLeave={e => (e.currentTarget.style.background = `${ta}22`)}
                      >
                        <p className="text-sm font-black leading-none" style={{ color: ta }}>
                          {t?.nombreCorto ?? slug}
                        </p>
                        <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'rgba(210,255,225,0.45)' }}>
                          Ir al taller →
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Content grid */}
            <div className="p-6 grid gap-6 items-start" style={{ gridTemplateColumns: '1fr' }}>
              <style>{`@media (min-width:1280px){.perfil-grid{grid-template-columns:1fr 320px}}`}</style>
              <div className="perfil-grid grid gap-6 items-start">

                {/* Taller cards column */}
                <div className="space-y-5">
                  {tallerSlugsAccesibles.length > 0 ? (
                    tallerSlugsAccesibles.map(slug => {
                      const t = talleresConfig.find(x => x.slug === slug)
                      if (!t) return null
                      const ta      = TALLER_ACCENTS[slug] ?? '#02d47e'
                      const p       = getTallerProgreso(slug)
                      const proxima = getProximaSesion(slug)
                      const moduloIdx   = Math.min(
                        Math.floor((p.porcentaje / 100) * modulosLXP.length),
                        modulosLXP.length - 1,
                      )
                      const moduloActual = modulosLXP[moduloIdx]

                      return (
                        <div
                          key={slug}
                          className="rounded-2xl overflow-hidden animate-fade-in-up"
                          style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.06)' }}
                        >
                          {/* Card hero */}
                          <div
                            className="relative overflow-hidden"
                            style={{ height: 140, background: `linear-gradient(135deg,#043941 0%,${ta}55 100%)` }}
                          >
                            <div className="absolute inset-0 grama-pattern opacity-20" />
                            <TallerHeroShapes slugs={[slug]} />
                            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                              <div className="flex items-start justify-between">
                                <span
                                  className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full"
                                  style={{ background: `${ta}30`, color: ta, border: `1px solid ${ta}50` }}
                                >
                                  T{String(t.numero).padStart(2, '0')}
                                </span>
                                <button
                                  onClick={() => navigate(`/taller/${slug}`)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                                  style={{ background: ta, color: '#043941' }}
                                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                                >
                                  Continuar <ArrowRight size={12} />
                                </button>
                              </div>
                              <div>
                                <h3
                                  className="text-base font-black"
                                  style={{ color: '#d2ffe1', letterSpacing: '-0.02em' }}
                                >
                                  {t.nombreCorto ?? t.nombre}
                                </h3>
                                {proxima && (
                                  <p className="text-[10px] mt-0.5" style={{ color: 'rgba(210,255,225,0.5)' }}>
                                    Próx: {formatFechaSesion(proxima.fecha)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Card body */}
                          <div className="p-5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold" style={{ color: '#043941' }}>Progreso del taller</span>
                              <span className="text-sm font-black" style={{ color: ta }}>{p.porcentaje}%</span>
                            </div>
                            <div className="h-2.5 rounded-full overflow-hidden mb-4" style={{ background: 'rgba(4,57,65,0.07)' }}>
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${p.porcentaje}%`, background: `linear-gradient(90deg,${ta} 0%,${ta}cc 100%)` }}
                              />
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-1.5">
                                <BookOpen size={12} style={{ color: 'rgba(4,57,65,0.4)' }} />
                                <span className="text-xs" style={{ color: 'rgba(4,57,65,0.55)' }}>{modulosLXP.length} módulos</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Activity size={12} style={{ color: 'rgba(4,57,65,0.4)' }} />
                                <span className="text-xs" style={{ color: 'rgba(4,57,65,0.55)' }}>{p.completados}/{p.total} actividades</span>
                              </div>
                            </div>

                            {moduloActual && (
                              <div
                                className="p-3 rounded-xl"
                                style={{ background: `${ta}08`, border: `1px solid ${ta}20` }}
                              >
                                <p className="text-[9px] font-extrabold uppercase tracking-widest mb-1" style={{ color: `${ta}99` }}>
                                  Módulo en curso
                                </p>
                                <p className="text-xs font-bold" style={{ color: '#043941' }}>{moduloActual.nombre}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div
                      className="rounded-2xl p-8 text-center"
                      style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
                    >
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'rgba(2,212,126,0.08)', border: '1px solid rgba(2,212,126,0.15)' }}
                      >
                        <BookOpen size={20} style={{ color: '#02d47e' }} />
                      </div>
                      <p className="text-sm font-bold mb-1" style={{ color: '#043941' }}>Sin taller asignado</p>
                      <p className="text-xs mb-4" style={{ color: '#94a3b8' }}>
                        Contacta con tu coordinador UGEL para habilitar tu acceso.
                      </p>
                      <a
                        href="mailto:soporte@grama.pe"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
                        style={{ background: '#02d47e', color: '#043941' }}
                      >
                        Contactar soporte <ArrowRight size={12} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Calendario sidebar */}
                {tallerSlugsAccesibles.length > 0 && (
                  <CalendarioSidebar
                    tallerSlugs={tallerSlugsAccesibles}
                    accent={primaryAccent}
                  />
                )}

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
