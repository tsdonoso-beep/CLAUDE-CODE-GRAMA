// src/pages/Perfil.tsx
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Mail, MapPin, Building2, Package, Clock,
  ChevronRight, Shield, LogOut, ArrowRight, Layers,
  Play, Sparkles, Zap, CalendarDays, Pencil, Check, X, Phone,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useProgress } from '@/contexts/ProgressContext'
import { talleresConfig } from '@/data/talleresConfig'
import { getTotalBienesByTaller } from '@/data/bienesData'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { GramaLogo } from '@/components/GramaLogo'
import { ProgressRing } from '@/components/lxp/ProgressRing'
import { trackNavegacion } from '@/lib/tracker'
import { getProximaSesion, getSesionesPorTaller, formatFechaSesion, formatHoraSesion, diasParaSesion } from '@/data/sesionesLXP'
import { AtencionDocente } from '@/components/lxp/AtencionDocente'

const TOTAL_HORAS   = 150
const TOTAL_MODULOS = 7

const TALLER_ACCENTS: Record<string, string> = {
  'mecanica-automotriz': '#3b82f6',
  'industria-vestido':   '#ec4899',
  'cocina-reposteria':   '#f97316',
  'ebanisteria':         '#b8975a',
  'comunicaciones':      '#a78bfa',
  'computacion':         '#22d3ee',
  'agropecuaria':        '#86efac',
  'electricidad':        '#fde047',
  'construccion':        '#94a3b8',
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?'
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

// ── Section header (mismo estilo que TallerHub) ───────────────────────────────
function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  iconColor,
  action,
}: {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  title: string
  subtitle?: string
  iconColor: string
  action?: React.ReactNode
}) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4 border-b"
      style={{
        borderColor: 'rgba(4,57,65,0.08)',
        background: 'rgba(4,57,65,0.05)',
        boxShadow: 'var(--sh-brand-sm)',
      }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${iconColor}18` }}
        >
          <Icon size={15} style={{ color: iconColor }} />
        </div>
        <div>
          <h2 className="text-h3 font-extrabold leading-tight" style={{ color: 'var(--grama-oscuro)' }}>{title}</h2>
          {subtitle && (
            <p className="text-xs mt-0.5" style={{ color: 'rgba(4,57,65,0.45)' }}>{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
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

  const displayName  = profile?.nombre_completo || user?.email?.split('@')[0] || 'Docente'
  const firstName    = displayName.split(' ')[0]
  const displayEmail = profile?.email ?? user?.email ?? ''
  const tallerSlug   = profile?.taller_slug ?? null

  // Talleres accesibles: usa taller_slugs si existe, si no cae al taller_slug único
  const tallerSlugsAccesibles: string[] =
    profile?.taller_slugs?.length
      ? profile.taller_slugs
      : tallerSlug ? [tallerSlug] : []

  useEffect(() => {
    if (!user?.id) return
    trackNavegacion(user.id, 'perfil', tallerSlug)
  }, [user?.id])

  const ie          = INSTITUCIONES_EDUCATIVAS.find(i => i.id === profile?.ie_id)
  const taller      = tallerSlug ? talleresConfig.find(t => t.slug === tallerSlug) : null
  const accent      = taller ? (TALLER_ACCENTS[taller.slug] ?? '#02d47e') : '#02d47e'
  const totalBienes = taller ? getTotalBienesByTaller(taller.slug) : 0

  const ieLabel  = ie ? ie.nombre : 'Sin IE asignada'
  const distrito = ie ? `${ie.distrito}, ${ie.provincia}` : '—'
  const region   = ie ? ie.region : '—'

  const progreso = taller ? getTallerProgreso(taller.slug) : { porcentaje: 0, completados: 0, total: 0 }

  // ── Perfil editable (localStorage) ──────────────────────────────────────
  const localKey = `grama:perfil:${user?.id ?? 'guest'}`
  const loadLocal = () => {
    try { return JSON.parse(localStorage.getItem(localKey) ?? '{}') } catch { return {} }
  }
  const [editMode, setEditMode] = useState(false)
  const [localData, setLocalData] = useState<{ telefono?: string; correo_inst?: string }>(() => loadLocal())
  const [draft, setDraft] = useState({ telefono: '', correo_inst: '' })

  function startEdit() {
    setDraft({ telefono: localData.telefono ?? '', correo_inst: localData.correo_inst ?? '' })
    setEditMode(true)
  }
  function saveEdit() {
    const next = { telefono: draft.telefono.trim(), correo_inst: draft.correo_inst.trim() }
    setLocalData(next)
    localStorage.setItem(localKey, JSON.stringify(next))
    setEditMode(false)
  }
  function cancelEdit() { setEditMode(false) }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Manrope', sans-serif", background: '#f0faf5' }}>

      {/* ── Navbar sticky — fuera del overflow-hidden ── */}
      <div className="sticky top-0 z-30 border-b" style={{ borderColor: 'rgba(4,57,65,0.08)', background: 'rgba(240,250,245,0.92)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between" style={{ height: 52 }}>
          <button onClick={() => navigate('/')} className="transition-opacity hover:opacity-75">
            <GramaLogo variant="dark" size="sm" />
          </button>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-80"
                style={{ background: 'rgba(2,212,126,0.14)', color: '#02a05a', border: '1px solid rgba(2,212,126,0.25)' }}
              >
                <Shield size={12} />
                Panel de Admin
              </button>
            )}
            {taller && !isAdmin && (
              <button
                onClick={() => navigate(`/taller/${taller.slug}/ruta`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-80"
                style={{ background: 'rgba(4,57,65,0.07)', color: 'var(--grama-oscuro)', border: '1px solid rgba(4,57,65,0.12)' }}
              >
                Ir a mi taller <ChevronRight size={12} />
              </button>
            )}
            <button
              onClick={async () => { await signOut(); navigate('/login', { replace: true }) }}
              className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-60 px-2 py-1.5"
              style={{ color: 'rgba(4,57,65,0.35)' }}
            >
              <LogOut size={12} />
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#f0faf5', minHeight: 260 }}>

        {/* Patrón GRAMA */}
        <div className="absolute inset-0 grama-pattern opacity-60" />

        {/* Orb sutil */}
        <div className="absolute pointer-events-none" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(2,212,126,0.08) 0%, transparent 65%)', right: -80, top: -120 }} />

        {/* Tangrams fijos */}
        <Tangram color="#02d47e" opacity={0.13} rotate={15}  className="absolute w-80 h-80 -top-8 -right-8" />
        <Tangram color="#043941" opacity={0.05} rotate={-20} className="absolute w-60 h-60 bottom-6 -left-8" />

        {/* Piezas flotantes — suaves sobre claro */}
        <svg viewBox="0 0 80 80" className="absolute pointer-events-none float-a" style={{ width:58, height:58, top:'12%', left:'5%', animationDuration:'16s' }}>
          <polygon points="0,80 40,0 80,80" fill="#02d47e" fillOpacity={0.14} />
        </svg>
        <svg viewBox="0 0 60 60" className="absolute pointer-events-none float-b" style={{ width:42, height:42, top:'55%', left:'9%', animationDuration:'20s' }}>
          <polygon points="30,0 60,60 0,60" fill="#043941" fillOpacity={0.08} />
        </svg>
        <svg viewBox="0 0 50 50" className="absolute pointer-events-none float-d" style={{ width:34, height:34, top:'20%', right:'22%', animationDuration:'11s' }}>
          <polygon points="25,0 50,50 0,50" fill="#02d47e" fillOpacity={0.16} />
        </svg>
        <svg viewBox="0 0 80 40" className="absolute pointer-events-none float-c" style={{ width:52, height:26, top:'62%', right:'10%', animationDuration:'18s' }}>
          <polygon points="20,0 80,0 60,40 0,40" fill="#043941" fillOpacity={0.07} />
        </svg>

        {/* ── Hero content: horizontal layout ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 pt-8 pb-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">

            {/* Left: avatar + text */}
            <div className="flex items-start gap-5 animate-fade-in-up">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="absolute rounded-full animate-pulse pointer-events-none"
                  style={{
                    inset: -10,
                    border: `1px solid ${accent}30`,
                    background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)`,
                    borderRadius: '50%',
                  }}
                />
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: -4, border: `1px solid ${accent}35`, borderRadius: '50%' }}
                />
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center text-lg font-extrabold relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)',
                    border: `2px solid ${accent}50`,
                    color: '#02d47e',
                    boxShadow: `0 4px 20px rgba(4,57,65,0.18), 0 0 0 1px rgba(2,212,126,0.12)`,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {getInitials(displayName)}
                </div>
                {isAdmin && (
                  <div
                    className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center z-20"
                    style={{ background: '#02d47e', border: '2px solid #f0faf5', boxShadow: '0 2px 8px rgba(2,212,126,0.35)' }}
                  >
                    <Shield size={11} style={{ color: 'var(--grama-oscuro)' }} />
                  </div>
                )}
              </div>

              {/* Text block */}
              <div className="min-w-0">
                {/* Overline badge */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className="inline-flex items-center gap-1.5 overline-label font-extrabold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${accent}15`,
                      border: `1px solid ${accent}30`,
                      color: accent === '#02d47e' ? '#02a05a' : accent,
                    }}
                  >
                    <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: accent }} />
                    {isAdmin
                      ? 'ADMINISTRADOR · GRAMA'
                      : tallerSlugsAccesibles.length > 1
                        ? `DOCENTE EPT · ${tallerSlugsAccesibles.length} TALLERES`
                        : taller
                          ? `DOCENTE EPT · T${String(taller.numero).padStart(2, '0')}`
                          : 'DOCENTE EPT · PROGRAMA MSE-SFT'}
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => navigate('/admin')}
                      className="hidden sm:flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full transition-opacity hover:opacity-80"
                      style={{ background: 'rgba(2,212,126,0.14)', color: '#02a05a', border: '1px solid rgba(2,212,126,0.25)' }}
                    >
                      <Shield size={10} />
                      Panel de Admin
                    </button>
                  )}
                </div>

                <h1
                  className="t-display font-extrabold leading-tight mb-2 animate-fade-in-up stagger-1"
                  style={{ letterSpacing: '-0.025em', color: 'var(--grama-oscuro)' }}
                >
                  Hola, {firstName}
                </h1>

                <p className="text-base mb-4 animate-fade-in-up stagger-2" style={{ color: '#64748b' }}>
                  {displayName !== firstName ? displayName : ''}{displayName !== firstName && displayEmail ? ' · ' : ''}{displayEmail}
                </p>

                {/* Stat chips */}
                <div className="flex flex-wrap gap-2.5 animate-fade-in-up stagger-3">
                  {[
                    { icon: Layers,   label: `${TOTAL_MODULOS} Módulos`, sub: 'de formación' },
                    { icon: Clock,    label: `${TOTAL_HORAS}h`,          sub: 'híbrida' },
                    { icon: Package,  label: 'Constancia',               sub: 'Inroprin' },
                  ].map(stat => (
                    <div
                      key={stat.label}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                      style={{
                        background: 'rgba(4,57,65,0.06)',
                        border: '1px solid rgba(4,57,65,0.10)',
                      }}
                    >
                      <stat.icon size={13} style={{ color: accent }} />
                      <div>
                        <p className="text-xs font-bold leading-none" style={{ color: 'var(--grama-oscuro)' }}>{stat.label}</p>
                        <p className="text-[11px] mt-0.5 leading-none" style={{ color: '#64748b' }}>{stat.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: progreso — ProgressRing (1 taller) o barras (2+) */}
            {tallerSlugsAccesibles.length === 1 && taller ? (
              <div
                className="hidden lg:flex flex-col items-center gap-3 p-5 rounded-2xl animate-fade-in-up stagger-4"
                style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.10)', boxShadow: '0 2px 12px rgba(4,57,65,0.06)', minWidth: 156 }}
              >
                <p className="overline-label font-bold" style={{ color: '#64748b' }}>Tu progreso</p>
                <ProgressRing percentage={progreso.porcentaje} size={88} label={`${progreso.completados}/${progreso.total}`} sublabel="actividades" dark={false} />
                <p className="text-[10px] text-center" style={{ color: '#64748b' }}>{progreso.porcentaje}% completado</p>
              </div>
            ) : tallerSlugsAccesibles.length > 1 ? (
              <div
                className="hidden lg:flex flex-col gap-2.5 p-4 rounded-2xl animate-fade-in-up stagger-4"
                style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.10)', boxShadow: '0 2px 12px rgba(4,57,65,0.06)', minWidth: 220 }}
              >
                <p className="overline-label font-bold mb-1" style={{ color: '#64748b' }}>Mis talleres</p>
                {tallerSlugsAccesibles.map(s => {
                  const t = talleresConfig.find(x => x.slug === s)
                  if (!t) return null
                  const ta = TALLER_ACCENTS[s] ?? '#02d47e'
                  const p  = getTallerProgreso(s)
                  return (
                    <div key={s}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md"
                          style={{ background: `${ta}18`, color: ta }}>
                          T{String(t.numero).padStart(2, '0')}
                        </span>
                        <span className="text-xs font-semibold truncate" style={{ color: 'var(--grama-oscuro)' }}>{t.nombreCorto}</span>
                        <span className="ml-auto text-[10px] font-bold shrink-0" style={{ color: ta }}>{p.porcentaje}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(4,57,65,0.08)' }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${p.porcentaje}%`, background: ta }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ══ CONTENIDO PRINCIPAL ════════════════════════════════════════════════ */}
      <div className="p-6 grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-start">

        {/* ── Col principal (2/3) ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* PROGRESO MOBILE — visible solo mobile cuando hay taller */}
          {taller && (
            <div
              className="lg:hidden p-5 rounded-2xl border text-center animate-fade-in-up"
              style={{ borderColor: 'rgba(4,57,65,0.08)', background: '#ffffff' }}
            >
              <h3 className="text-xs font-extrabold mb-4" style={{ color: 'var(--grama-oscuro)' }}>Tu progreso</h3>
              <div className="flex justify-center mb-2">
                <ProgressRing
                  percentage={progreso.porcentaje}
                  size={88}
                  label={`${progreso.completados}/${progreso.total}`}
                  sublabel="actividades"
                  dark={false}
                />
              </div>
              <p className="text-xs" style={{ color: '#045f6c' }}>{progreso.porcentaje}% completado</p>
            </div>
          )}

          {/* ── Acceso a talleres (solo admin) ── */}
          {isAdmin && (
            <section
              className="rounded-2xl overflow-hidden animate-fade-in-up stagger-1"
              style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
            >
              <SectionHeader
                icon={Layers}
                title="Talleres EPT"
                subtitle={`${talleresConfig.length} talleres disponibles · Programa MSE-SFT`}
                iconColor="#045f6c"
                action={
                  <span className="text-[10px] font-bold" style={{ color: 'var(--grama-menta)' }}>
                    {talleresConfig.length} disponibles
                  </span>
                }
              />
              <div className="grid grid-cols-2 divide-x divide-y" style={{ borderColor: 'rgba(4,57,65,0.05)' }}>
                {talleresConfig.map(t => {
                  const ta      = TALLER_ACCENTS[t.slug] ?? '#02d47e'
                  const bienesT = getTotalBienesByTaller(t.slug)
                  return (
                    <button
                      key={t.slug}
                      onClick={() => navigate(`/taller/${t.slug}`)}
                      className="w-full text-left flex items-center gap-3 px-5 py-4 transition-all"
                      style={{ background: 'transparent' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(4,57,65,0.025)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                    >
                      <div className="w-0.5 self-stretch rounded-full shrink-0" style={{ background: ta, minHeight: 36 }} />
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full shrink-0"
                        style={{ background: `${ta}15`, color: ta }}>
                        T{String(t.numero).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold leading-snug truncate" style={{ color: '#043941' }}>{t.nombre}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(4,57,65,0.38)' }}>
                          {bienesT} bienes · {TOTAL_MODULOS} módulos
                        </p>
                      </div>
                      <ChevronRight size={14} style={{ color: ta, flexShrink: 0 }} />
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {/* ── Talleres activos del docente ── */}
          {tallerSlugsAccesibles.length > 0 ? (
            <>
              {tallerSlugsAccesibles.map((slug, idx) => {
                const t = talleresConfig.find(x => x.slug === slug)
                if (!t) return null
                const ta = TALLER_ACCENTS[t.slug] ?? '#02d47e'
                const bienes = getTotalBienesByTaller(t.slug)
                const isPrimario = slug === tallerSlug
                const progresoT = getTallerProgreso(t.slug)
                return (
                  <section
                    key={slug}
                    className={`rounded-2xl overflow-hidden animate-fade-in-up stagger-${idx + 1}`}
                    style={{
                      background: '#ffffff',
                      border: `1.5px solid ${ta}4d`,
                      boxShadow: `0 0 0 5px ${ta}0d, 0 8px 28px rgba(4,57,65,0.07)`,
                    }}
                  >
                    <SectionHeader
                      icon={Play}
                      title="Continuar donde lo dejaste"
                      subtitle={t.nombre}
                      iconColor={ta}
                      action={
                        <button
                          onClick={() => navigate(`/taller/${t.slug}/ruta`)}
                          className="flex items-center gap-1 text-xs font-bold transition-all"
                          style={{ color: ta }}
                        >
                          Ir al taller <ChevronRight size={13} />
                        </button>
                      }
                    />
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
                        <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg shrink-0"
                          style={{ background: `${ta}18`, color: ta, border: `1px solid ${ta}25` }}>
                          T{String(t.numero).padStart(2, '0')}
                        </span>
                        <p className="text-sm font-extrabold uppercase tracking-wide" style={{ color: 'var(--grama-oscuro)', letterSpacing: '0.04em' }}>
                          {t.nombre}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748b' }}>{t.descripcion}</p>
                      <div className="flex gap-2 mb-4">
                        {[
                          { label: `${TOTAL_MODULOS} Módulos`, color: ta },
                          { label: `${TOTAL_HORAS}h Formación`, color: '#045f6c' },
                          { label: `${bienes} Bienes`, color: '#02d47e' },
                        ].map(chip => (
                          <span key={chip.label} className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                            style={{ background: `${chip.color}12`, color: chip.color, border: `1px solid ${chip.color}20` }}>
                            {chip.label}
                          </span>
                        ))}
                      </div>
                      {/* Próxima sesión en vivo — contextual por taller */}
                      {t.slug !== 'taller-general-ept' && (() => {
                        const proxima = getProximaSesion(t.slug)
                        if (!proxima) return null
                        const dias = diasParaSesion(proxima.fecha)
                        return (
                          <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
                            style={{ background: `${ta}08`, border: `1px solid ${ta}1a` }}>
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `${ta}18` }}>
                              <Sparkles size={13} style={{ color: ta }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-extrabold uppercase tracking-wider leading-none mb-0.5" style={{ color: ta }}>
                                Próxima sesión en vivo
                              </p>
                              <p className="text-xs font-semibold truncate" style={{ color: 'var(--grama-oscuro)' }}>
                                {proxima.titulo}
                              </p>
                              <p className="text-[11px] mt-0.5" style={{ color: '#64748b' }}>
                                {formatFechaSesion(proxima.fecha)} · {formatHoraSesion(proxima.fecha)}
                              </p>
                            </div>
                            <div className="text-right shrink-0 pl-3 border-l" style={{ borderColor: `${ta}25` }}>
                              <p className="text-xl font-extrabold leading-none" style={{ color: ta }}>{dias}</p>
                              <p className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>{dias === 1 ? 'día' : 'días'}</p>
                            </div>
                          </div>
                        )
                      })()}

                      <div className="flex gap-2.5">
                        <button onClick={() => navigate(`/taller/${t.slug}/ruta`)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                          style={{ background: '#043941', color: 'var(--grama-menta)' }}>
                          <Play size={14} /> {progresoT.porcentaje === 0 ? 'Iniciar Ruta' : 'Seguir Ruta'}
                        </button>
                        <button onClick={() => navigate(`/taller/${t.slug}/repositorio`)}
                          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-opacity hover:opacity-80"
                          style={{ background: 'rgba(4,57,65,0.05)', color: 'var(--grama-oscuro)', border: '1px solid rgba(4,57,65,0.1)' }}>
                          <Package size={13} /> Repositorio
                        </button>
                      </div>
                    </div>
                  </section>
                )
              })}
            </>
          ) : !isAdmin && (
            <section
              className="rounded-2xl overflow-hidden animate-fade-in-up stagger-1"
              style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
            >
              <SectionHeader
                icon={Layers}
                title="Sin taller asignado"
                subtitle="Contacta con tu coordinador UGEL"
                iconColor="#02d47e"
              />
              <div className="p-8 text-center">
                <div
                  className="inline-flex h-14 w-14 rounded-2xl items-center justify-center mb-4"
                  style={{ background: 'rgba(2,212,126,0.08)', border: '1px solid rgba(2,212,126,0.15)' }}
                >
                  <Layers size={24} style={{ color: 'var(--grama-menta)' }} />
                </div>
                <p className="text-sm font-bold mb-1.5" style={{ color: 'var(--grama-oscuro)' }}>
                  Aún no tienes taller asignado
                </p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
                  Comunícate con tu coordinador UGEL para habilitar tu acceso a un taller EPT.
                </p>
                <a
                  href="mailto:soporte@grama.pe"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-opacity hover:opacity-90"
                  style={{ background: '#02d47e', color: 'var(--grama-oscuro)' }}
                >
                  Contactar soporte <ArrowRight size={12} />
                </a>
              </div>
            </section>
          )}


          {/* ── Atención al Docente ── */}
          <AtencionDocente
            userId={user?.id ?? 'guest'}
            tallerSlug={tallerSlug}
            displayName={displayName}
            tallerNombre={taller?.nombre}
            accent={accent}
          />

        </div>

        {/* ── Sidebar (1/3) ───────────────────────────────────────────────── */}
        <div className="space-y-4 lg:sticky lg:top-6">

          {/* Mi información */}
          <section
            className="rounded-2xl overflow-hidden animate-fade-in-up stagger-1"
            style={{
              background: '#ffffff',
              border: `1.5px solid ${accent}40`,
              boxShadow: `0 0 0 4px ${accent}0c, 0 4px 16px rgba(4,57,65,0.06)`,
            }}
          >
            <SectionHeader
              icon={Mail}
              title="Mi información"
              iconColor="#045f6c"
              action={
                !editMode ? (
                  <button
                    onClick={startEdit}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-75"
                    style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}25` }}
                  >
                    <Pencil size={11} /> Editar
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button onClick={saveEdit}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-80"
                      style={{ background: accent, color: 'var(--grama-oscuro)' }}>
                      <Check size={11} /> Guardar
                    </button>
                    <button onClick={cancelEdit}
                      className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-70"
                      style={{ color: 'rgba(4,57,65,0.4)' }}>
                      <X size={11} />
                    </button>
                  </div>
                )
              }
            />

            {/* Vista normal */}
            {!editMode && (
              <div className="divide-y" style={{ borderColor: 'rgba(4,57,65,0.05)' }}>
                {[
                  { Icon: Mail,      label: 'Correo',      value: displayEmail,               sub: null    },
                  { Icon: Building2, label: 'Institución', value: ieLabel,                    sub: distrito },
                  { Icon: MapPin,    label: 'Región',      value: region,                     sub: null    },
                  ...(localData.telefono    ? [{ Icon: Phone, label: 'Teléfono',           value: localData.telefono,    sub: null }] : []),
                  ...(localData.correo_inst ? [{ Icon: Mail,  label: 'Correo institucional', value: localData.correo_inst, sub: null }] : []),
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 px-5 py-3.5">
                    <div className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(4,57,65,0.05)' }}>
                      <item.Icon size={13} style={{ color: '#045f6c' }} />
                    </div>
                    <div className="min-w-0">
                      <p className="overline-label font-extrabold mb-0.5" style={{ color: '#b0c4ca' }}>{item.label}</p>
                      <p className="text-sm font-bold leading-snug break-words" style={{ color: 'var(--grama-oscuro)' }}>{item.value}</p>
                      {item.sub && <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{item.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Formulario de edición */}
            {editMode && (
              <div className="px-5 py-4 space-y-4">
                {/* Read-only: nombre + institución */}
                {[
                  { label: 'Nombre completo', value: displayName },
                  { label: 'Institución educativa', value: ieLabel },
                ].map(f => (
                  <div key={f.label}>
                    <p className="overline-label font-extrabold mb-1" style={{ color: '#b0c4ca' }}>{f.label}</p>
                    <p className="text-sm font-semibold px-3 py-2 rounded-lg" style={{ color: 'rgba(4,57,65,0.45)', background: 'rgba(4,57,65,0.04)', border: '1px solid rgba(4,57,65,0.07)' }}>
                      {f.value}
                    </p>
                  </div>
                ))}
                {/* Editable: teléfono */}
                <div>
                  <p className="overline-label font-extrabold mb-1" style={{ color: '#b0c4ca' }}>Teléfono</p>
                  <input
                    type="tel"
                    placeholder="Ej. 987 654 321"
                    value={draft.telefono}
                    onChange={e => setDraft(d => ({ ...d, telefono: e.target.value }))}
                    className="w-full text-sm font-semibold px-3 py-2 rounded-lg outline-none transition-all"
                    style={{
                      color: 'var(--grama-oscuro)',
                      background: '#ffffff',
                      border: `1.5px solid ${accent}35`,
                      boxShadow: `0 0 0 3px ${accent}08`,
                    }}
                  />
                </div>
                {/* Editable: correo institucional */}
                <div>
                  <p className="overline-label font-extrabold mb-1" style={{ color: '#b0c4ca' }}>Correo institucional</p>
                  <input
                    type="email"
                    placeholder="Ej. docente@ugel.gob.pe"
                    value={draft.correo_inst}
                    onChange={e => setDraft(d => ({ ...d, correo_inst: e.target.value }))}
                    className="w-full text-sm font-semibold px-3 py-2 rounded-lg outline-none transition-all"
                    style={{
                      color: 'var(--grama-oscuro)',
                      background: '#ffffff',
                      border: `1.5px solid ${accent}35`,
                      boxShadow: `0 0 0 3px ${accent}08`,
                    }}
                  />
                </div>
              </div>
            )}
          </section>


          {/* Agenda de sesiones */}
          {(isAdmin || tallerSlugsAccesibles.length > 0) && (
            <CalendarioSidebar
              tallerSlugs={isAdmin ? talleresConfig.map(t => t.slug) : tallerSlugsAccesibles}
              accent={accent}
            />
          )}


        </div>
      </div>

      <div className="h-12" />
    </div>
  )
}
