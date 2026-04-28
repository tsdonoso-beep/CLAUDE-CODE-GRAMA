// src/pages/Perfil.tsx
import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import {
  ChevronRight, ArrowRight,
  Trophy, Award, CalendarDays,
  Zap, GraduationCap, Star, Users2,
  CheckCircle2, PlayCircle, Lock,
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

// ── Calendario de sesiones (sidebar) ─────────────────────────────────────────
// Devuelve la sesión en la que el docente está actualmente según contenidos completados
function getCurrentSession(completados: number) {
  let remaining = completados
  for (const mod of modulosLXP) {
    for (const ses of mod.sesiones) {
      if (remaining < ses.contenidos.length) {
        return { mod, ses }
      }
      remaining -= ses.contenidos.length
    }
  }
  // Todo completado → última sesión
  const lastMod = modulosLXP[modulosLXP.length - 1]
  return { mod: lastMod, ses: lastMod.sesiones[lastMod.sesiones.length - 1] }
}

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
        style={{ background: 'linear-gradient(135deg,#043941 0%,#055c6a 60%,#043941 100%)' }}
      >
        <div className="absolute inset-0 grama-pattern opacity-20" />
        <div className="relative z-10 px-8 py-6">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(2,212,126,0.65)' }}>
            {greeting}
          </p>
          <h1 className="text-xl font-black leading-tight" style={{ color: '#d2ffe1', letterSpacing: '-0.02em' }}>
            {displayName}
          </h1>
          <p className="text-xs mt-1.5 font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Docente EPT · {ieSubhead}
          </p>
        </div>
        {/* Franja de acento — conecta hero con el contenido */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${primaryAccent}, ${primaryAccent}00 70%)` }}
        />
      </div>

        {/* Content */}
        <style>{`@media(min-width:1280px){.perfil-content{display:grid;grid-template-columns:1fr 340px;grid-template-areas:"cards calendar";gap:20px;align-items:start}}`}</style>
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
                  const ta       = TALLER_ACCENTS[slug] ?? '#02d47e'
                  const p        = getTallerProgreso(slug)
                  const current  = getCurrentSession(p.completados)
                  const mod      = current.mod
                  const prox     = getProximaSesion(slug)
                  return (
                    <div
                      key={slug}
                      className="rounded-2xl overflow-hidden"
                      style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 10px rgba(4,57,65,0.07)' }}
                    >
                      <div className="relative overflow-hidden" style={{ height: 148 }}>
                        {t.imagen ? (
                          <img src={t.imagen} alt={t.nombreCorto} className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0" style={{ background: `linear-gradient(145deg,#043941 0%,${ta}55 100%)` }} />
                        )}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(4,57,65,0.25) 0%, rgba(4,57,65,0.55) 100%)' }} />
                      </div>
                      <div className="px-4 py-4">
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
                            {current.ses.id} · {p.completados} de {p.total} actividades
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


        </div>
    </div>
  )
}
