// src/pages/TallerHub.tsx
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  BookOpen, Package, Clock, CheckCircle2, Lock, PlayCircle,
  ChevronRight, ArrowRight, Layers, Sparkles, Zap,
} from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { modulosLXP } from '@/data/modulosLXP'
import { mockProximaSesion } from '@/mock/mockEstados'
import { useProgress } from '@/contexts/ProgressContext'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { trackNavegacion } from '@/lib/tracker'
import { LiveSessionCard } from '@/components/lxp/LiveSessionCard'
import { ProgressRing } from '@/components/lxp/ProgressRing'
import { CalendarioSesiones } from '@/components/lxp/CalendarioSesiones'
import { getSesionesPorTaller, getProximaSesion } from '@/data/sesionesLXP'

const TALLER_ACCENTS: Record<string, string> = {
  'mecanica-automotriz':  '#3b82f6',
  'industria-vestido':    '#ec4899',
  'cocina-reposteria':    '#f97316',
  'ebanisteria':          '#b8975a',
  'comunicaciones':       '#a78bfa',
  'computacion':          '#22d3ee',
  'agropecuaria':         '#86efac',
  'electricidad':         '#fde047',
  'construccion':         '#94a3b8',
}

const ESTADO_CONFIG = {
  completado: { icon: CheckCircle2, color: '#00c16e', bg: 'rgba(0,193,110,0.12)', label: 'Completado',  border: 'rgba(0,193,110,0.3)' },
  en_curso:   { icon: PlayCircle,   color: '#02d47e', bg: 'rgba(2,212,126,0.1)',  label: 'En curso',    border: 'rgba(2,212,126,0.5)' },
  disponible: { icon: PlayCircle,   color: '#045f6c', bg: 'rgba(4,95,108,0.08)', label: 'Disponible',  border: 'rgba(4,95,108,0.2)' },
  bloqueado:  { icon: Lock,         color: '#475569', bg: 'rgba(71,85,105,0.06)', label: 'Bloqueado',   border: 'rgba(71,85,105,0.15)' },
}

export default function TallerHub() {
  const { taller, slug, bienes, totalBienes } = useTaller()
  const navigate = useNavigate()
  const [hoveredModulo, setHoveredModulo] = useState<string | null>(null)
  const { getTallerProgreso, getEstadoModuloLXP } = useProgress()
  const { user, profile } = useAuth()
  const progresoTaller = getTallerProgreso(slug ?? '')

  // Sincronizar taller_slug del perfil cuando el docente entra a un taller
  useEffect(() => {
    if (!user || !slug || profile?.role !== 'docente') return
    if (profile?.taller_slug === slug) return
    supabase.from('profiles').update({ taller_slug: slug }).eq('id', user.id)
  }, [user?.id, slug, profile?.taller_slug, profile?.role])

  // Registrar visita al hub del taller
  useEffect(() => {
    if (!user?.id || !slug) return
    trackNavegacion(user.id, 'taller_hub', slug)
  }, [user?.id, slug])

  if (!taller) return null

  const modulosPreview = modulosLXP.slice(0, 4)
  const accent = TALLER_ACCENTS[slug ?? ''] ?? '#02d47e'

  return (
    <div style={{ background: '#f0faf5', fontFamily: "'Manrope', sans-serif" }}>

      {/* ══ HERO CINÉMATICO ══════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ minHeight: 340 }}
      >
        {/* Foto full-bleed como fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${taller.imagen})`, filter: 'brightness(0.35) saturate(0.8)' }}
        />

        {/* Overlay degradado */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(100deg, rgba(4,10,20,0.92) 0%, rgba(4,10,20,0.75) 50%, rgba(4,10,20,0.45) 100%)`,
          }}
        />

        {/* Patrón grid sutil */}
        <div className="absolute inset-0 grama-pattern-dense opacity-60" />

        {/* Orb de acento */}
        <div
          className="absolute pointer-events-none animate-aurora-slow"
          style={{
            width: 400, height: 400,
            background: `radial-gradient(circle, ${accent}18 0%, transparent 65%)`,
            right: '-60px', top: '-60px',
          }}
        />

        {/* Contenido hero */}
        <div className="relative z-10 px-7 pt-9 pb-8">
          {/* Overline */}
          <div className="flex items-center gap-2 mb-5 animate-fade-in-up">
            <div
              className="flex items-center gap-2 h-6 px-3 rounded-full overline-label font-extrabold"
              style={{
                background: `${accent}18`,
                border: `1px solid ${accent}35`,
                color: accent,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
              T{taller.numero} · {taller.nombreCorto}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
            {/* Left */}
            <div>
              <h1
                className="text-display font-extrabold text-white leading-tight mb-3 animate-fade-in-up stagger-1"
                style={{ letterSpacing: '-0.02em' }}
              >
                {taller.nombre}
              </h1>
              <p
                className="text-sm leading-loose max-w-lg mb-5 animate-fade-in-up stagger-2"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {taller.descripcion}
              </p>

              {/* Chips de stats */}
              <div className="flex flex-wrap gap-3 animate-fade-in-up stagger-3">
                {[
                  { icon: Layers, label: '7 Módulos', sub: 'de formación' },
                  { icon: Clock,  label: '150 Horas', sub: 'híbrida' },
                  { icon: BookOpen, label: 'Certificación', sub: 'Inroprin' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <stat.icon size={14} style={{ color: accent }} />
                    <div>
                      <p className="text-xs font-bold text-white leading-none">{stat.label}</p>
                      <p className="text-[10px] mt-0.5 leading-none" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: progress ring flotante */}
            {slug !== 'taller-general-ept' && (
              <div
                className="hidden lg:flex flex-col items-center gap-3 p-5 rounded-2xl animate-fade-in-up stagger-4"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  minWidth: 160,
                }}
              >
                <p className="overline-label font-bold text-white/50">Tu progreso</p>
                <ProgressRing
                  percentage={progresoTaller.porcentaje}
                  size={80}
                  label={`${progresoTaller.completados}/${progresoTaller.total}`}
                  sublabel="actividades"
                  dark
                />
                <p className="text-[10px] text-white/40 text-center">
                  {progresoTaller.porcentaje}% completado
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ CONTENIDO ════════════════════════════════════════════════════════ */}
      <div className="p-5 grid lg:grid-cols-3 gap-5">

        {/* ── Col principal (2/3) ────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Ruta de Aprendizaje */}
          {slug !== 'taller-general-ept' && <section
            className="rounded-2xl overflow-hidden animate-fade-in-up stagger-1"
            style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
          >
            {/* Header sección */}
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
                  className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${accent}18` }}
                >
                  <Layers size={15} style={{ color: accent }} />
                </div>
                <div>
                  <h2 className="text-h3 font-extrabold" style={{ color: 'var(--grama-oscuro)' }}>
                    Tu Ruta de Aprendizaje
                  </h2>
                  <p className="text-[10px]" style={{ color: 'rgba(4,57,65,0.45)' }}>
                    {modulosLXP.length} módulos · Certificación Inroprin
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/taller/${slug}/ruta`)}
                className="flex items-center gap-1 text-xs font-bold transition-all"
                style={{ color: accent }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.gap = '6px')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.gap = '4px')}
              >
                Ver ruta completa <ChevronRight size={13} />
              </button>
            </div>

            {/* Módulos */}
            <div className="divide-y" style={{ borderColor: 'rgba(4,57,65,0.05)' }}>
              {modulosPreview.map((modulo, idx) => {
                const estado = getEstadoModuloLXP(modulo.id)
                const conf = ESTADO_CONFIG[estado as keyof typeof ESTADO_CONFIG]
                const StatusIcon = conf.icon
                const isHovered = hoveredModulo === modulo.id
                const isEnCurso = estado === 'en_curso'

                return (
                  <button
                    key={modulo.id}
                    onClick={() => estado !== 'bloqueado' && navigate(`/taller/${slug}/ruta/modulo/${modulo.numero}`)}
                    onMouseEnter={() => setHoveredModulo(modulo.id)}
                    onMouseLeave={() => setHoveredModulo(null)}
                    disabled={estado === 'bloqueado'}
                    className="w-full text-left flex items-center gap-4 px-5 py-4 transition-all"
                    style={{
                      background: isEnCurso
                        ? `${accent}08`
                        : isHovered && estado !== 'bloqueado'
                          ? 'rgba(4,57,65,0.03)'
                          : 'transparent',
                      opacity: estado === 'bloqueado' ? 0.5 : 1,
                      cursor: estado === 'bloqueado' ? 'not-allowed' : 'pointer',
                      animationDelay: `${0.05 * idx}s`,
                    }}
                  >
                    {/* Número */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0"
                      style={{
                        background: isEnCurso ? `${accent}20` : conf.bg,
                        color: isEnCurso ? accent : conf.color,
                        border: `1.5px solid ${isEnCurso ? `${accent}40` : conf.border}`,
                      }}
                    >
                      {String(modulo.numero).padStart(2, '0')}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm" style={{ color: 'var(--grama-oscuro)' }}>
                        {modulo.nombre}
                      </p>
                      <p className="text-[11px] mt-0.5" style={{ color: 'rgba(4,57,65,0.45)' }}>
                        {modulo.horasTotal}h · {modulo.subSecciones.length} secciones
                      </p>
                    </div>

                    {/* Estado */}
                    <div
                      className="flex items-center justify-center gap-1.5 py-1 rounded-full text-[10px] font-bold shrink-0"
                      style={{ background: conf.bg, color: conf.color, width: '102px' }}
                    >
                      <StatusIcon size={11} />
                      {conf.label}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
              <button
                onClick={() => navigate(`/taller/${slug}/ruta`)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
                style={{
                  color: 'var(--grama-oscuro)',
                  border: `1px solid rgba(4,57,65,0.1)`,
                  background: 'rgba(4,57,65,0.03)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#043941'
                  el.style.color = '#02d47e'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(4,57,65,0.03)'
                  el.style.color = '#043941'
                }}
              >
                Ver todos los módulos ({modulosLXP.length})
                <ArrowRight size={13} />
              </button>
            </div>
          </section>}

          {/* Sesiones en Vivo */}
          {slug !== 'taller-general-ept' && (
          <section
            className="rounded-2xl overflow-hidden animate-fade-in-up stagger-2"
            style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: 'rgba(4,57,65,0.08)', background: 'rgba(4,57,65,0.05)' }}
            >
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(2,212,126,0.12)' }}>
                  <BookOpen size={15} style={{ color: '#02d47e' }} />
                </div>
                <div>
                  <h2 className="text-h3 font-extrabold" style={{ color: '#043941' }}>
                    Sesiones en Vivo
                  </h2>
                  <p className="text-[10px]" style={{ color: 'rgba(4,57,65,0.45)' }}>
                    Agenda de capacitación sincrónica
                  </p>
                </div>
              </div>
              {getProximaSesion(slug ?? '') && (
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                  style={{ background: 'rgba(2,212,126,0.12)', color: '#043941' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#02d47e' }} />
                  Próxima en {
                    Math.max(0, Math.ceil(
                      (new Date(getProximaSesion(slug ?? '')!.fecha).getTime() - Date.now()) / 86400000
                    ))
                  } días
                </span>
              )}
            </div>
            <div className="p-5">
              <CalendarioSesiones sesiones={getSesionesPorTaller(slug ?? '')} />
            </div>
          </section>
          )}

          {/* Repositorio de Recursos */}
          <section
            className="rounded-2xl overflow-hidden animate-fade-in-up stagger-2"
            style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{
                borderColor: 'rgba(4,57,65,0.08)',
                background: 'rgba(4,57,65,0.05)',
                boxShadow: 'var(--sh-brand-sm)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(2,212,126,0.12)' }}>
                  <Package size={15} style={{ color: 'var(--grama-menta)' }} />
                </div>
                <div>
                  <h2 className="text-h3 font-extrabold" style={{ color: 'var(--grama-oscuro)' }}>
                    Repositorio de Recursos
                  </h2>
                  <p className="text-[10px]" style={{ color: 'rgba(4,57,65,0.45)' }}>
                    Fichas, manuales, videos y más
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/taller/${slug}/repositorio`)}
                className="flex items-center gap-1 text-xs font-bold"
                style={{ color: 'var(--grama-menta)' }}
              >
                Ver repositorio <ChevronRight size={13} />
              </button>
            </div>

            <div className="p-5">
              {/* Stats grandes */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                {[
                  { value: totalBienes, label: 'Bienes totales', color: '#043941', bg: 'rgba(4,57,65,0.05)' },
                  { value: bienes.filter((b: {tipo: string}) => b.tipo === 'PEDAGOGICO').length, label: 'Mat. pedagógico', color: '#7c3aed', bg: 'rgba(124,58,237,0.07)' },
                  { value: bienes.filter((b: {tipo: string}) => b.tipo === 'EQUIPOS').length, label: 'Equipos', color: '#0891b2', bg: 'rgba(8,145,178,0.08)' },
                ].map(s => (
                  <div
                    key={s.label}
                    className="text-center p-3 rounded-xl"
                    style={{ background: s.bg }}
                  >
                    <p className="text-2xl font-extrabold leading-none" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[10px] mt-1.5 font-medium" style={{ color: 'rgba(4,57,65,0.5)' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Chips de zonas */}
              <div className="flex flex-wrap gap-2 mb-5">
                {['Investigación', 'Innovación', 'Producción', 'Almacén'].map(zona => (
                  <span
                    key={zona}
                    className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: '#e3f8fb', color: '#045f6c', border: '1px solid rgba(4,57,65,0.08)' }}
                  >
                    Zona {zona}
                  </span>
                ))}
              </div>

              <button
                onClick={() => navigate(`/taller/${slug}/repositorio`)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
                style={{ background: 'linear-gradient(90deg, #043941 0%, #045f6c 100%)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.9')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              >
                <Package size={15} />
                Explorar repositorio
                <ArrowRight size={13} />
              </button>
            </div>
          </section>
        </div>

        {/* ── Sidebar derecho (1/3) ────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Progress ring — móvil visible, desktop duplica el del hero */}
          {slug !== 'taller-general-ept' && (
            <div
              className="lg:hidden p-5 rounded-2xl border text-center animate-fade-in-up stagger-1"
              style={{ borderColor: 'rgba(4,57,65,0.08)', background: '#ffffff' }}
            >
              <h3 className="text-xs font-extrabold mb-4" style={{ color: 'var(--grama-oscuro)' }}>Tu progreso</h3>
              <div className="flex justify-center mb-2">
                <ProgressRing
                  percentage={progresoTaller.porcentaje}
                  size={88}
                  label={`${progresoTaller.completados}/${progresoTaller.total}`}
                  sublabel="actividades"
                  dark={false}
                />
              </div>
              <p className="text-xs" style={{ color: '#045f6c' }}>
                {progresoTaller.porcentaje}% completado
              </p>
            </div>
          )}

          {/* Próxima sesión — sidebar compact */}
          {slug !== 'taller-general-ept' && (() => {
            const proxima = getProximaSesion(slug ?? '')
            if (!proxima) return null
            return (
              <div className="animate-fade-in-up stagger-2">
                <LiveSessionCard
                  titulo={proxima.titulo}
                  moduloNombre={proxima.moduloNombre}
                  fecha={proxima.fecha}
                  duracionMin={proxima.duracionMin}
                  formador={proxima.facilitador}
                  plataforma={proxima.modalidad === 'meet' ? 'Google Meet' : proxima.modalidad === 'zoom' ? 'Zoom' : 'Presencial'}
                  urlAcceso={proxima.link}
                  compact
                />
              </div>
            )
          })()}

          {/* Card inspiracional */}
          <div
            className="rounded-2xl p-5 relative overflow-hidden animate-fade-in-up stagger-3"
            style={{
              background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)',
              border: '1px solid rgba(2,212,126,0.2)',
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none animate-aurora-slow"
              style={{ background: `radial-gradient(circle, ${accent}20 0%, transparent 65%)`, top: -20, right: -20 }}
            />
            <div className="relative z-10">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}
              >
                <Sparkles size={16} style={{ color: accent }} />
              </div>
              <p className="text-sm font-extrabold text-white leading-snug mb-1.5">
                ¡Tus estudiantes te esperan!
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Cada sesión que preparas con GRAMA es una competencia más para su futuro técnico.
              </p>
            </div>
          </div>

          {/* Acceso rápido a secciones */}
          <div
            className="rounded-2xl overflow-hidden animate-fade-in-up stagger-4"
            style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(4,57,65,0.08)', background: 'rgba(4,57,65,0.05)', boxShadow: 'var(--sh-brand-sm)' }}>
              <p className="overline-label font-extrabold" style={{ color: 'rgba(4,57,65,0.4)' }}>
                Acceso rápido
              </p>
            </div>
            <div className="divide-y" style={{ borderColor: 'rgba(4,57,65,0.05)' }}>
              {[
                ...(slug !== 'taller-general-ept' ? [{ label: 'Ruta de Aprendizaje', sub: '7 módulos', icon: Layers, to: `/taller/${slug}/ruta`, color: accent }] : []),
                { label: 'Repositorio', sub: `${totalBienes} bienes`, icon: Package, to: `/taller/${slug}/repositorio`, color: '#02d47e' },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.to)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(4,57,65,0.03)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                >
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15` }}>
                    <item.icon size={14} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold" style={{ color: 'var(--grama-oscuro)' }}>{item.label}</p>
                    <p className="text-[10px]" style={{ color: 'rgba(4,57,65,0.4)' }}>{item.sub}</p>
                  </div>
                  <Zap size={11} style={{ color: 'rgba(4,57,65,0.2)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
