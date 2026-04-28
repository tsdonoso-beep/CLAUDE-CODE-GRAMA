// src/pages/Perfil.tsx
import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import {
  ChevronRight, ArrowRight,
  Trophy, Award, CalendarDays,
  Zap, GraduationCap, Star, Users2,
  CheckCircle2, PlayCircle, Lock, MapPin,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useProgress } from '@/contexts/ProgressContext'
import { talleresConfig } from '@/data/talleresConfig'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
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

function CalendarioSidebar({ tallerSlugs, accent, maxSesiones = 4 }: { tallerSlugs: string[]; accent: string; maxSesiones?: number }) {
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
            {sesiones.slice(0, maxSesiones).map(s => {
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

  const ie        = INSTITUCIONES_EDUCATIVAS.find(i => i.id === profile?.ie_id)
  const ieLabel   = ie ? ie.nombre : 'Sin IE asignada'
  const ieSubhead = ie
    ? `${ie.nombre} – ${ie.distrito} · Año escolar 2026`
    : 'Sin IE asignada · Año escolar 2026'

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

  // ── Sesiones para "Módulos en curso" ───────────────────────────────────────
  type SesItem = {
    id: string; titulo: string; tallerNombre: string; accent: string
    unidad: string; status: 'completado' | 'en-curso' | 'pendiente'
  }
  const sesionesParaLista: SesItem[] = tallerSlugsAccesibles.flatMap(slug => {
    const t   = talleresConfig.find(x => x.slug === slug)
    const ta  = TALLER_ACCENTS[slug] ?? '#02d47e'
    const p   = getTallerProgreso(slug)
    const idx = Math.min(Math.floor((p.porcentaje / 100) * modulosLXP.length), modulosLXP.length - 1)
    const mod = modulosLXP[idx]
    if (!mod) return []
    const fraccion   = (p.porcentaje - (idx * 100 / modulosLXP.length)) / (100 / modulosLXP.length)
    const activo     = Math.min(Math.floor(fraccion * mod.sesiones.length), mod.sesiones.length - 1)
    return mod.sesiones.slice(0, 3).map((ses, i) => ({
      id:           `${slug}-${ses.id}`,
      titulo:       ses.nombre,
      tallerNombre: t?.nombreCorto ?? slug,
      accent:       ta,
      unidad:       `U${i + 1}`,
      status:       (i < activo ? 'completado' : i === activo ? 'en-curso' : 'pendiente') as SesItem['status'],
    }))
  }).slice(0, 6)

  // ── Mis logros ──────────────────────────────────────────────────────────────
  const p0   = tallerSlugsAccesibles[0] ? getTallerProgreso(tallerSlugsAccesibles[0]).porcentaje : 0
  const tN0  = talleresConfig.find(x => x.slug === tallerSlugsAccesibles[0])?.nombreCorto ?? ''
  const tN1  = talleresConfig.find(x => x.slug === tallerSlugsAccesibles[1])?.nombreCorto ?? '2do taller'
  const ta1  = TALLER_ACCENTS[tallerSlugsAccesibles[1]] ?? '#045f6c'
  const logros = [
    { titulo: 'Primer módulo',   subtitulo: 'Completado',         Icon: Trophy,        color: '#02d47e',                                      obtenido: overallProgreso > 0 },
    { titulo: 'Artesano',        subtitulo: `50% ${tN0}`,         Icon: Award,         color: TALLER_ACCENTS[tallerSlugsAccesibles[0]] ?? '#02d47e', obtenido: p0 >= 50 },
    { titulo: 'Primer chispazo', subtitulo: `Inicio ${tN1}`,      Icon: Zap,           color: ta1,                                            obtenido: tallerSlugsAccesibles.length >= 2 },
    { titulo: 'Certificado',     subtitulo: `U1 ${tN0}`,          Icon: GraduationCap, color: '#0288a3',                                      obtenido: overallProgreso >= 15 },
    { titulo: 'Maestro',         subtitulo: '100% un taller',     Icon: Star,          color: '#94a3b8',                                      obtenido: false },
    { titulo: 'Multitaller',     subtitulo: '2 talleres al 50%',  Icon: Users2,        color: '#94a3b8',                                      obtenido: tallerSlugsAccesibles.length >= 2 && tallerSlugsAccesibles.every(s => getTallerProgreso(s).porcentaje >= 50) },
  ]

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* Hero */}
        <div
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#043941 0%,#055c6a 60%,#043941 100%)', minHeight: 148 }}
        >
          <div className="absolute inset-0 grama-pattern opacity-20" />
          {tallerSlugsAccesibles.length > 0 && <TallerHeroShapes slugs={tallerSlugsAccesibles} />}
          <div className="relative z-10 px-8 py-7 flex items-center justify-between gap-6">
            {/* Left: greeting + chips */}
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(2,212,126,0.7)' }}>
                {greeting}, {firstName}
              </p>
              <h1 className="text-2xl font-black mb-4" style={{ color: '#d2ffe1', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Mis talleres
              </h1>
              <div className="flex flex-wrap gap-2">
                {tallerSlugsAccesibles.map(slug => {
                  const t  = talleresConfig.find(x => x.slug === slug)
                  const ta = TALLER_ACCENTS[slug] ?? '#02d47e'
                  return (
                    <button
                      key={slug}
                      onClick={() => navigate(`/taller/${slug}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                      style={{ background: `${ta}25`, border: `1px solid ${ta}55`, color: ta }}
                      onMouseEnter={e => (e.currentTarget.style.background = `${ta}40`)}
                      onMouseLeave={e => (e.currentTarget.style.background = `${ta}25`)}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ta }} />
                      {t?.nombreCorto ?? slug}
                    </button>
                  )
                })}
                {ie && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.65)' }}
                  >
                    <MapPin size={10} />
                    {ie.nombre}, {ie.distrito}
                  </span>
                )}
              </div>
            </div>
            {/* Right: stats */}
            <div className="hidden md:flex items-center gap-6 flex-shrink-0">
              {[
                { value: String(tallerSlugsAccesibles.length || 0), label: 'Talleres activos' },
                { value: `${overallProgreso}%`,                      label: 'Avance general' },
                { value: '1',                                         label: 'Certificado logrado' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6">
                  {i > 0 && <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.14)' }} />}
                  <div className="text-center">
                    <p className="text-2xl font-black leading-none" style={{ color: '#02d47e' }}>{stat.value}</p>
                    <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'rgba(210,255,225,0.48)' }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <style>{`@media(min-width:1280px){.perfil-content{display:grid;grid-template-columns:1fr 340px;grid-template-areas:"cards calendar" "modulos logros";gap:20px;align-items:start}}`}</style>
        <div className="perfil-content flex-1 p-6 space-y-5 xl:space-y-0">

          {/* ── 1. Cards (grid area: cards) ──────────────────────────────── */}
          <div style={{ gridArea: 'cards' }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-black" style={{ color: '#043941' }}>Mis talleres inscritos</p>
              <button
                onClick={() => tallerSlugsAccesibles[0] && navigate(`/taller/${tallerSlugsAccesibles[0]}/ruta`)}
                className="text-xs font-bold flex items-center gap-1 transition-opacity hover:opacity-70"
                style={{ color: primaryAccent }}
              >
                Ver todos los módulos <ArrowRight size={11} />
              </button>
            </div>
            <style>{`@media(min-width:640px){.pc{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}}`}</style>
            <div className="pc space-y-4 sm:space-y-0">
              {tallerSlugsAccesibles.length > 0 ? (
                tallerSlugsAccesibles.map(slug => {
                  const t    = talleresConfig.find(x => x.slug === slug)
                  if (!t) return null
                  const ta   = TALLER_ACCENTS[slug] ?? '#02d47e'
                  const p    = getTallerProgreso(slug)
                  const mIdx = Math.min(Math.floor((p.porcentaje / 100) * modulosLXP.length), modulosLXP.length - 1)
                  const mod  = modulosLXP[mIdx]
                  const prox = getProximaSesion(slug)
                  return (
                    <div
                      key={slug}
                      className="rounded-2xl overflow-hidden"
                      style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 10px rgba(4,57,65,0.07)' }}
                    >
                      <div className="relative overflow-hidden" style={{ height: 148, background: `linear-gradient(145deg,#043941 0%,${ta}55 100%)` }}>
                        <div className="absolute inset-0 grama-pattern opacity-20" />
                        <TallerHeroShapes slugs={[slug]} />
                      </div>
                      <div className="px-4 py-4">
                        <p className="text-[10px] font-extrabold uppercase tracking-widest mb-0.5" style={{ color: ta }}>
                          Taller EPT · {t.nombre}
                        </p>
                        <h3 className="text-base font-black mb-0.5" style={{ color: '#043941', letterSpacing: '-0.02em' }}>
                          {t.nombreCorto ?? t.nombre}
                        </h3>
                        <p className="text-xs mb-2.5" style={{ color: '#94a3b8' }}>
                          {modulosLXP.length} módulos · 150 horas de formación
                        </p>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs" style={{ color: 'rgba(4,57,65,0.5)' }}>Tu avance</span>
                          <span className="text-sm font-black" style={{ color: ta }}>{p.porcentaje}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden mb-2.5" style={{ background: 'rgba(4,57,65,0.07)' }}>
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.porcentaje}%`, background: `linear-gradient(90deg,${ta},${ta}cc)` }} />
                        </div>
                        <div className="flex items-center justify-between mb-2.5">
                          <p className="text-[11px]" style={{ color: '#94a3b8' }}>
                            Módulo {mIdx + 1} de {modulosLXP.length} · U{mIdx + 1} en curso
                          </p>
                          <button
                            onClick={() => navigate(`/taller/${slug}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                            style={{ background: 'transparent', color: ta, border: `1.5px solid ${ta}55` }}
                            onMouseEnter={e => (e.currentTarget.style.background = `${ta}12`)}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                          >
                            Continuar <ArrowRight size={11} />
                          </button>
                        </div>
                        {prox ? (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: `${ta}08`, border: `1px solid ${ta}22` }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ta }} />
                            <p className="text-[11px] font-medium truncate" style={{ color: 'rgba(4,57,65,0.6)' }}>
                              Próximo: {prox.titulo} · {formatFechaSesion(prox.fecha)}
                            </p>
                          </div>
                        ) : mod ? (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: `${ta}08`, border: `1px solid ${ta}22` }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ta }} />
                            <p className="text-[11px] font-medium truncate" style={{ color: 'rgba(4,57,65,0.6)' }}>{mod.nombre}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="rounded-2xl p-8 text-center" style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}>
                  <p className="text-sm font-bold mb-1" style={{ color: '#043941' }}>Sin taller asignado</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>Contacta con tu coordinador UGEL.</p>
                </div>
              )}
            </div>
          </div>

          {/* ── 2. Calendario (grid area: calendar) ──────────────────────── */}
          {tallerSlugsAccesibles.length > 0 && (
            <div style={{ gridArea: 'calendar' }}>
              <CalendarioSidebar
                tallerSlugs={tallerSlugsAccesibles}
                accent={primaryAccent}
                maxSesiones={Math.max(2, tallerSlugsAccesibles.length * 2)}
              />
            </div>
          )}

          {/* ── 3. Mis módulos (grid area: modulos) ──────────────────────── */}
          <div
            className="rounded-2xl overflow-hidden"
            id="mis-modulos"
            style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 8px rgba(4,57,65,0.04)', gridArea: 'modulos' }}
          >
            <div className="px-5 pt-4 pb-3 border-b" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
              <p className="text-sm font-black" style={{ color: '#043941' }}>Mis módulos</p>
              <p className="text-[11px]" style={{ color: '#94a3b8' }}>Continúa donde lo dejaste en cada taller</p>
            </div>
            <div>
              {tallerSlugsAccesibles.map((s, ti) => {
                const t   = talleresConfig.find(x => x.slug === s)
                const ta  = TALLER_ACCENTS[s] ?? '#02d47e'
                const p   = getTallerProgreso(s)
                const idx = Math.min(Math.floor((p.porcentaje / 100) * modulosLXP.length), modulosLXP.length - 1)
                const mod = modulosLXP[idx]
                if (!mod) return null
                const fraccion = (p.porcentaje - (idx * 100 / modulosLXP.length)) / (100 / modulosLXP.length)
                const activo   = Math.min(Math.floor(fraccion * mod.sesiones.length), mod.sesiones.length - 1)
                return (
                  <div key={s} className={ti > 0 ? 'border-t' : ''} style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
                    {/* Header de taller */}
                    <button
                      className="w-full flex items-center gap-2 px-5 py-2.5 transition-colors hover:bg-slate-50 text-left"
                      onClick={() => navigate(`/taller/${s}/ruta`)}
                    >
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: ta }} />
                      <span className="text-xs font-extrabold flex-1" style={{ color: '#043941' }}>{t?.nombreCorto ?? s}</span>
                      <span className="text-[10px] font-bold" style={{ color: ta }}>{p.porcentaje}%</span>
                      <ArrowRight size={11} style={{ color: ta }} />
                    </button>
                    {/* Sesiones del módulo activo */}
                    <div className="pb-1">
                      {mod.sesiones.slice(0, 3).map((ses, i) => {
                        const ok  = i < activo
                        const cur = i === activo
                        return (
                          <div key={ses.id} className="flex items-center gap-3 px-5 py-2.5">
                            <div className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{
                                background: ok ? 'rgba(2,212,126,0.10)' : cur ? '#043941' : 'rgba(4,57,65,0.04)',
                                border:     ok ? '1px solid rgba(2,212,126,0.22)' : cur ? 'none' : '1px solid rgba(4,57,65,0.08)',
                              }}
                            >
                              {ok  && <CheckCircle2 size={13} style={{ color: '#02d47e' }} />}
                              {cur && <PlayCircle   size={13} style={{ color: '#02d47e' }} />}
                              {!ok && !cur && <Lock size={12} style={{ color: 'rgba(4,57,65,0.25)' }} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-bold truncate" style={{ color: '#043941' }}>{ses.nombre}</p>
                              <p className="text-[10px]" style={{ color: '#94a3b8' }}>U{idx + 1} · Sesión {i + 1}</p>
                            </div>
                            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full flex-shrink-0"
                              style={{
                                background: ok ? 'rgba(2,212,126,0.10)' : cur ? `${ta}18` : 'rgba(4,57,65,0.05)',
                                color:      ok ? '#02a05a'              : cur ? ta        : 'rgba(4,57,65,0.30)',
                              }}
                            >
                              {ok ? 'Listo' : cur ? 'En curso' : 'Pendiente'}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── 4. Mis logros (grid area: logros) ────────────────────────── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 8px rgba(4,57,65,0.04)', gridArea: 'logros' }}
          >
            <div className="px-5 pt-4 pb-3 border-b flex items-start justify-between" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
              <div>
                <p className="text-sm font-black" style={{ color: '#043941' }}>Mis logros</p>
                <p className="text-[11px]" style={{ color: '#94a3b8' }}>
                  {logros.filter(l => l.obtenido).length} de {logros.length} obtenidos
                </p>
              </div>
              <button className="text-xs font-bold flex items-center gap-1 mt-0.5 transition-opacity hover:opacity-70" style={{ color: primaryAccent }}>
                Ver todos <ArrowRight size={11} />
              </button>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {logros.map(logro => (
                <div
                  key={logro.titulo}
                  className="rounded-xl p-3 flex flex-col items-center gap-1.5 text-center"
                  style={{
                    background: logro.obtenido ? `${logro.color}12` : 'rgba(4,57,65,0.03)',
                    border: `1px solid ${logro.obtenido ? logro.color + '30' : 'rgba(4,57,65,0.07)'}`,
                  }}
                >
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: logro.obtenido ? `${logro.color}22` : 'rgba(4,57,65,0.06)' }}>
                    <logro.Icon size={20} style={{ color: logro.obtenido ? logro.color : '#94a3b8' }} />
                  </div>
                  <p className="text-[11px] font-black leading-tight" style={{ color: logro.obtenido ? '#043941' : '#94a3b8' }}>
                    {logro.titulo}
                  </p>
                  <p className="text-[9px] font-medium leading-tight" style={{ color: logro.obtenido ? logro.color : '#b0c4ca' }}>
                    {logro.subtitulo}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
    </div>
  )
}
