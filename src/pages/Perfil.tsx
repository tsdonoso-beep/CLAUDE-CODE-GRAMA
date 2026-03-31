// src/pages/Perfil.tsx
import { useNavigate } from 'react-router-dom'
import {
  Mail, MapPin, Building2, Package, Clock,
  ChevronRight, Shield, LogOut, ArrowRight, Layers,
  Play, Sparkles, Zap,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useProgress } from '@/contexts/ProgressContext'
import { talleresConfig } from '@/data/talleresConfig'
import { getTotalBienesByTaller } from '@/data/bienesData'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { GramaLogo } from '@/components/GramaLogo'
import { ProgressRing } from '@/components/lxp/ProgressRing'

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
        boxShadow: '0 2px 6px rgba(4,57,65,0.06)',
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
          <h2 className="text-sm font-extrabold" style={{ color: '#043941' }}>{title}</h2>
          {subtitle && (
            <p className="text-[10px]" style={{ color: 'rgba(4,57,65,0.45)' }}>{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
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

  const ie          = INSTITUCIONES_EDUCATIVAS.find(i => i.id === profile?.ie_id)
  const taller      = tallerSlug ? talleresConfig.find(t => t.slug === tallerSlug) : null
  const accent      = taller ? (TALLER_ACCENTS[taller.slug] ?? '#02d47e') : '#02d47e'
  const totalBienes = taller ? getTotalBienesByTaller(taller.slug) : 0

  const ieLabel  = ie ? ie.nombre : 'Sin IE asignada'
  const distrito = ie ? `${ie.distrito}, ${ie.provincia}` : '—'
  const region   = ie ? ie.region : '—'

  const progreso = taller ? getTallerProgreso(taller.slug) : { porcentaje: 0, completados: 0, total: 0 }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Manrope', sans-serif", background: '#f0faf5' }}>

      {/* ══ HERO CINÉMATICO ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 340 }}>

        {/* Fondo sólido — sin imagen de taller (el perfil es del docente, no del taller) */}
        <div className="absolute inset-0" style={{ background: '#043941' }} />

        {/* Overlay degradado */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(100deg, rgba(4,10,20,0.92) 0%, rgba(4,10,20,0.75) 50%, rgba(4,10,20,0.45) 100%)',
          }}
        />

        {/* Patrón GRAMA denso */}
        <div className="absolute inset-0 grama-pattern-dense opacity-60 pointer-events-none" />

        {/* Orb de acento animado */}
        <div
          className="absolute pointer-events-none animate-aurora-slow"
          style={{
            width: 420, height: 420,
            background: `radial-gradient(circle, ${accent}18 0%, transparent 65%)`,
            right: -60, top: -60,
          }}
        />

        {/* Orb ambiental izquierdo */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(2,212,126,0.07) 0%, transparent 65%)',
            left: -80, bottom: -80,
          }}
        />

        {/* Tangrams esquinas — estáticos */}
        <Tangram color="#02d47e" opacity={0.08}  rotate={15}  className="absolute w-72 h-72 -top-6 -right-6" />
        <Tangram color="#02d47e" opacity={0.05}  rotate={-20} className="absolute w-52 h-52 bottom-4 -left-8" />
        <Tangram color="#ffffff" opacity={0.025} rotate={45}  className="absolute w-40 h-40 top-1/2 left-1/3" />

        {/* Piezas individuales flotando */}
        <svg viewBox="0 0 80 80" className="absolute pointer-events-none float-a"
          style={{ width: 60, height: 60, top: '18%', left: '5%', animationDuration: '14s' }}>
          <polygon points="0,80 40,0 80,80" fill="#02d47e" fillOpacity={0.25} />
        </svg>
        <svg viewBox="0 0 60 60" className="absolute pointer-events-none float-b"
          style={{ width: 44, height: 44, top: '55%', left: '10%', animationDuration: '19s' }}>
          <polygon points="30,0 60,60 0,60" fill="#02d47e" fillOpacity={0.18} />
        </svg>
        <svg viewBox="0 0 50 50" className="absolute pointer-events-none float-d"
          style={{ width: 34, height: 34, top: '15%', right: '22%', animationDuration: '10s' }}>
          <polygon points="25,0 50,50 0,50" fill="#02d47e" fillOpacity={0.28} />
        </svg>
        <svg viewBox="0 0 80 40" className="absolute pointer-events-none float-c"
          style={{ width: 56, height: 28, top: '62%', right: '12%', animationDuration: '16s' }}>
          <polygon points="20,0 80,0 60,40 0,40" fill="#02d47e" fillOpacity={0.18} />
        </svg>
        <svg viewBox="0 0 40 40" className="absolute pointer-events-none float-a"
          style={{ width: 30, height: 30, bottom: '22%', left: '32%', animationDuration: '22s' }}>
          <polygon points="20,0 40,40 0,40" fill="#02d47e" fillOpacity={0.22} />
        </svg>

        {/* ── Navbar integrada en el hero ── */}
        <div className="relative z-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between" style={{ height: 52 }}>
            <GramaLogo variant="light" size="sm" />
            <div className="flex items-center gap-2">
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(2,212,126,0.14)', color: '#02d47e', border: '1px solid rgba(2,212,126,0.25)' }}
                >
                  <Shield size={12} />
                  Panel de Admin
                </button>
              )}
              {taller && !isAdmin && (
                <button
                  onClick={() => navigate(`/taller/${taller.slug}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  Ir a mi taller <ChevronRight size={12} />
                </button>
              )}
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-60 px-2 py-1.5"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                <LogOut size={12} />
                Salir
              </button>
            </div>
          </div>
        </div>

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
                    border: `1px solid ${accent}25`,
                    background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)`,
                    borderRadius: '50%',
                  }}
                />
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: -4, border: `1px solid ${accent}30`, borderRadius: '50%' }}
                />
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center text-lg font-black relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(2,212,126,0.22) 0%, rgba(4,95,108,0.38) 100%)',
                    border: `2px solid ${accent}40`,
                    color: '#02d47e',
                    boxShadow: `0 0 32px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.1)`,
                    letterSpacing: '-0.02em',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {getInitials(displayName)}
                </div>
                {isAdmin && (
                  <div
                    className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center z-20"
                    style={{ background: '#02d47e', border: '2px solid rgba(4,10,20,0.8)', boxShadow: '0 2px 8px rgba(2,212,126,0.45)' }}
                  >
                    <Shield size={11} style={{ color: '#043941' }} />
                  </div>
                )}
              </div>

              {/* Text block */}
              <div className="min-w-0">
                {/* Overline badge */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className="inline-flex items-center gap-1.5 text-[9px] font-black px-2.5 py-1 rounded-full tracking-[0.12em] uppercase"
                    style={{
                      background: `${accent}18`,
                      border: `1px solid ${accent}35`,
                      color: accent,
                    }}
                  >
                    <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: accent }} />
                    {isAdmin
                      ? 'ADMINISTRADOR · GRAMA'
                      : taller
                        ? `DOCENTE EPT · T${String(taller.numero).padStart(2, '0')}`
                        : 'DOCENTE EPT · PROGRAMA MSE-SFT'}
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => navigate('/admin')}
                      className="hidden sm:flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full transition-opacity hover:opacity-80"
                      style={{ background: 'rgba(2,212,126,0.14)', color: '#02d47e', border: '1px solid rgba(2,212,126,0.25)' }}
                    >
                      <Shield size={10} />
                      Panel de Admin
                    </button>
                  )}
                </div>

                <h1
                  className="font-black text-white leading-tight mb-2 animate-fade-in-up stagger-1"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em' }}
                >
                  Hola, {firstName}
                </h1>

                <p className="text-base mb-4 animate-fade-in-up stagger-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {displayName !== firstName ? displayName : ''}{displayName !== firstName && displayEmail ? ' · ' : ''}{displayEmail}
                </p>

                {/* Stat chips */}
                <div className="flex flex-wrap gap-2.5 animate-fade-in-up stagger-3">
                  {[
                    { icon: Layers,   label: `${TOTAL_MODULOS} Módulos`, sub: 'de formación' },
                    { icon: Clock,    label: `${TOTAL_HORAS}h`,          sub: 'híbrida' },
                    { icon: Package,  label: 'Certificación',            sub: 'Inroprin' },
                  ].map(stat => (
                    <div
                      key={stat.label}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <stat.icon size={13} style={{ color: accent }} />
                      <div>
                        <p className="text-xs font-bold text-white leading-none">{stat.label}</p>
                        <p className="text-[9px] mt-0.5 leading-none" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: ProgressRing frosted glass card (desktop only) */}
            {taller && (
              <div
                className="hidden lg:flex flex-col items-center gap-3 p-5 rounded-2xl animate-fade-in-up stagger-4"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  minWidth: 156,
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Tu progreso
                </p>
                <ProgressRing
                  percentage={progreso.porcentaje}
                  size={88}
                  label={`${progreso.completados}/${progreso.total}`}
                  sublabel="actividades"
                  dark
                />
                <p className="text-[10px] text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {progreso.porcentaje}% completado
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Fade al contenido claro */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #f0faf5)' }}
        />
      </section>

      {/* ══ CONTENIDO PRINCIPAL ════════════════════════════════════════════════ */}
      <div className="p-6 grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {/* ── Col principal (2/3) ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* PROGRESO MOBILE — visible solo mobile cuando hay taller */}
          {taller && (
            <div
              className="lg:hidden p-5 rounded-2xl border text-center animate-fade-in-up"
              style={{ borderColor: 'rgba(4,57,65,0.08)', background: '#ffffff' }}
            >
              <h3 className="text-xs font-extrabold mb-4" style={{ color: '#043941' }}>Tu progreso</h3>
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

          {/* ── "Continuar donde lo dejaste" — section card ── */}
          {taller ? (
            <section
              className="rounded-2xl overflow-hidden animate-fade-in-up stagger-1"
              style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
            >
              <SectionHeader
                icon={Play}
                title="Continuar donde lo dejaste"
                subtitle={taller.nombre}
                iconColor={accent}
                action={
                  <button
                    onClick={() => navigate(`/taller/${taller.slug}`)}
                    className="flex items-center gap-1 text-xs font-bold transition-all"
                    style={{ color: accent }}
                  >
                    Ir al taller <ChevronRight size={13} />
                  </button>
                }
              />

              <div className="p-5">
                {/* Taller mini-hero: imagen + descripción */}
                {taller.imagen && (
                  <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                    <img
                      src={taller.imagen}
                      alt={taller.nombre}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to right, rgba(4,10,20,0.75) 0%, rgba(4,10,20,0.2) 100%)' }}
                    />
                    <div className="absolute inset-0 flex items-center px-5 gap-3">
                      <span
                        className="text-[10px] font-black px-2.5 py-1 rounded-full shrink-0"
                        style={{ background: accent, color: '#fff', boxShadow: `0 2px 8px ${accent}50` }}
                      >
                        T{String(taller.numero).padStart(2, '0')}
                      </span>
                      <h2
                        className="text-base font-extrabold text-white leading-tight"
                        style={{ letterSpacing: '-0.015em' }}
                      >
                        {taller.nombre}
                      </h2>
                    </div>
                  </div>
                )}

                <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748b' }}>
                  {taller.descripcion}
                </p>

                {/* Stats row */}
                <div className="flex gap-2 mb-4">
                  {[
                    { label: `${TOTAL_MODULOS} Módulos`, color: accent },
                    { label: `${TOTAL_HORAS}h Formación`, color: '#045f6c' },
                    { label: `${totalBienes} Bienes`, color: '#02d47e' },
                  ].map(chip => (
                    <span
                      key={chip.label}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: `${chip.color}12`, color: chip.color, border: `1px solid ${chip.color}20` }}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex gap-2.5">
                  <button
                    onClick={() => navigate(`/taller/${taller.slug}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                    style={{ background: '#043941', color: '#02d47e' }}
                  >
                    <Play size={14} />
                    Continuar Ruta
                  </button>
                  <button
                    onClick={() => navigate(`/taller/${taller.slug}/repositorio`)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-opacity hover:opacity-80"
                    style={{ background: 'rgba(4,57,65,0.05)', color: '#043941', border: '1px solid rgba(4,57,65,0.1)' }}
                  >
                    <Package size={13} />
                    Repositorio
                  </button>
                </div>
              </div>
            </section>
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
                  <Layers size={24} style={{ color: '#02d47e' }} />
                </div>
                <p className="text-sm font-bold mb-1.5" style={{ color: '#043941' }}>
                  Aún no tienes taller asignado
                </p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
                  Comunícate con tu coordinador UGEL para habilitar tu acceso a un taller EPT.
                </p>
                <a
                  href="mailto:soporte@grama.pe"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-opacity hover:opacity-90"
                  style={{ background: '#02d47e', color: '#043941' }}
                >
                  Contactar soporte <ArrowRight size={12} />
                </a>
              </div>
            </section>
          )}

          {/* ── "Talleres EPT" section card ── */}
          <section
            className="rounded-2xl overflow-hidden animate-fade-in-up stagger-2"
            style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
          >
            <SectionHeader
              icon={Layers}
              title="Talleres EPT"
              subtitle={`${talleresConfig.length} talleres disponibles · Programa MSE-SFT`}
              iconColor="#045f6c"
              action={
                <span className="text-[10px] font-bold" style={{ color: '#02d47e' }}>
                  {talleresConfig.length} disponibles
                </span>
              }
            />

            <div className="grid grid-cols-2 divide-x divide-y" style={{ borderColor: 'rgba(4,57,65,0.05)' }}>
              {talleresConfig.map(t => {
                const esMio   = t.slug === tallerSlug
                const ta      = TALLER_ACCENTS[t.slug] ?? '#02d47e'
                const bienesT = getTotalBienesByTaller(t.slug)
                return (
                  <button
                    key={t.slug}
                    onClick={() =>
                      isAdmin || esMio
                        ? navigate(`/taller/${t.slug}`)
                        : navigate(`/taller/${t.slug}/preview`)
                    }
                    className="w-full text-left flex items-center gap-3 px-5 py-4 transition-all"
                    style={{ background: 'transparent' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(4,57,65,0.025)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                  >
                    {/* Borde izquierdo de acento — solo activo */}
                    <div
                      className="w-0.5 self-stretch rounded-full shrink-0"
                      style={{ background: esMio ? ta : 'transparent', minHeight: 36 }}
                    />

                    {/* Badge número */}
                    <span
                      className="text-[10px] font-black px-2.5 py-1 rounded-full shrink-0"
                      style={{
                        background: 'rgba(4,57,65,0.06)',
                        color: 'rgba(4,57,65,0.5)',
                      }}
                    >
                      T{String(t.numero).padStart(2, '0')}
                    </span>

                    {/* Nombre + stats */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold leading-snug truncate" style={{ color: '#043941' }}>
                        {t.nombre}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(4,57,65,0.38)' }}>
                        {bienesT} bienes · {TOTAL_MODULOS} módulos
                      </p>
                    </div>

                    {/* Estado */}
                    {esMio ? (
                      <span className="text-xs font-bold shrink-0" style={{ color: ta }}>✓ activo</span>
                    ) : (
                      <ChevronRight size={14} style={{ color: 'rgba(4,57,65,0.18)', flexShrink: 0 }} />
                    )}
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        {/* ── Sidebar (1/3) ───────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Mi información */}
          <section
            className="rounded-2xl overflow-hidden animate-fade-in-up stagger-1"
            style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.05)' }}
          >
            <SectionHeader
              icon={Mail}
              title="Mi información"
              iconColor="#045f6c"
            />
            <div className="divide-y" style={{ borderColor: 'rgba(4,57,65,0.05)' }}>
              {[
                { Icon: Mail,      label: 'Correo',      value: displayEmail, sub: null },
                { Icon: Building2, label: 'Institución', value: ieLabel,      sub: distrito },
                { Icon: MapPin,    label: 'Región',      value: region,       sub: null },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 px-5 py-3.5">
                  <div
                    className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(4,57,65,0.05)' }}
                  >
                    <item.Icon size={13} style={{ color: '#045f6c' }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: '#b0c4ca' }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-bold leading-snug break-words" style={{ color: '#043941' }}>
                      {item.value}
                    </p>
                    {item.sub && (
                      <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{item.sub}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Acceso rápido (solo si tiene taller) */}
          {taller && (
            <section
              className="rounded-2xl overflow-hidden animate-fade-in-up stagger-2"
              style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.05)' }}
            >
              <SectionHeader
                icon={Zap}
                title="Acceso rápido"
                iconColor={accent}
              />
              <div className="p-2">
                {[
                  {
                    label: 'Ruta de Aprendizaje',
                    sub: `${TOTAL_MODULOS} módulos · ${TOTAL_HORAS}h`,
                    to: `/taller/${taller.slug}/ruta`,
                    Icon: Layers,
                    color: accent,
                  },
                  {
                    label: 'Repositorio de Recursos',
                    sub: `${totalBienes} bienes`,
                    to: `/taller/${taller.slug}/repositorio`,
                    Icon: Package,
                    color: '#02d47e',
                  },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.to)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all"
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(4,57,65,0.03)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                  >
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}12`, border: `1px solid ${item.color}20` }}
                    >
                      <item.Icon size={15} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold leading-none mb-0.5" style={{ color: '#043941' }}>{item.label}</p>
                      <p className="text-xs" style={{ color: '#94a3b8' }}>{item.sub}</p>
                    </div>
                    <ChevronRight size={13} style={{ color: 'rgba(4,57,65,0.2)' }} />
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Card inspiracional (mismo estilo que TallerHub) */}
          <div
            className="rounded-2xl p-5 relative overflow-hidden animate-fade-in-up stagger-3"
            style={{
              background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)',
              border: '1px solid rgba(2,212,126,0.2)',
              boxShadow: '0 4px 20px rgba(4,57,65,0.15)',
            }}
          >
            <div
              className="absolute pointer-events-none animate-aurora-slow"
              style={{
                width: 160, height: 160,
                background: `radial-gradient(circle, ${accent}22 0%, transparent 65%)`,
                top: -30, right: -30,
                borderRadius: '50%',
              }}
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
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Cada sesión que preparas con GRAMA es una competencia más para el futuro técnico de tus alumnos.
              </p>
              {taller ? (
                <button
                  onClick={() => navigate(`/taller/${taller.slug}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-opacity hover:opacity-90"
                  style={{ background: '#02d47e', color: '#043941' }}
                >
                  Continuar aprendizaje <ArrowRight size={12} />
                </button>
              ) : (
                <a
                  href="mailto:soporte@grama.pe"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-opacity hover:opacity-90"
                  style={{ background: '#02d47e', color: '#043941' }}
                >
                  Contáctanos <ArrowRight size={12} />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="h-12" />
    </div>
  )
}
