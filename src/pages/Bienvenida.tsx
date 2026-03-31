// src/pages/Bienvenida.tsx
import { useEffect, useRef, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { talleresConfig, getTallerBySlug } from '@/data/talleresConfig'
import { getTalleresDeIE, INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { TallerCard } from '@/components/hub/TallerCard'
import { GramaLogo } from '@/components/GramaLogo'
import { Layers, Clock, Award, Download, ChevronDown, CheckCircle, BookOpen, LayoutDashboard, ArrowRight } from 'lucide-react'

// ── Stat con conteo animado ────────────────────────────────────────────────
function AnimatedStat({
  target, suffix = '', label, valueColor = '#02d47e', labelColor = 'rgba(255,255,255,0.55)'
}: {
  target: number | string; suffix?: string; label: string
  valueColor?: string; labelColor?: string
}) {
  const [display, setDisplay] = useState(typeof target === 'number' ? 0 : target)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (typeof target !== 'number') return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1000
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(ease * (target as number)))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-center animate-fade-in-up">
      <p className="font-extrabold leading-none" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: valueColor }}>
        {typeof target === 'number' ? display : target}{suffix}
      </p>
      <p className="text-xs mt-1.5 font-semibold tracking-wide" style={{ color: labelColor }}>
        {label}
      </p>
    </div>
  )
}

// ── Módulos en el hero card ────────────────────────────────────────────────
const MODULOS_LABELS = ['M0 Inicio', 'M1 Seguridad', 'M2 Investigación', 'M3 Innovación', 'M4 Acabados', 'M5 Formativo', 'M6 Proyecto']

// ── Features ───────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Layers,
    color: '#02d47e',
    bg: 'rgba(2,212,126,0.08)',
    border: 'rgba(2,212,126,0.18)',
    title: 'Ruta de 7 módulos',
    desc: 'Recorrido pedagógico estructurado: desde diagnóstico hasta proyecto integrador. Modalidad híbrida con sesiones síncronas y presenciales en el taller.',
  },
  {
    icon: Download,
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.18)',
    title: 'Materiales descargables',
    desc: 'Fichas plastificables A5, rúbricas de evaluación 360°, bitácoras de mantenimiento preventivo y plantillas de sesión listas para el taller.',
  },
  {
    icon: Award,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.18)',
    title: 'Certificación Inroprin',
    desc: 'Proyecto Integrador evaluado por jurado certificador oficial. Acreditación reconocida para docentes técnicos de Educación Para el Trabajo.',
  },
]

// ── Componente principal ────────────────────────────────────────────────────
export default function Bienvenida() {
  const { signOut, profile, isAdmin, allUnlocked } = useAuth()
  const navigate = useNavigate()

  const talleresDisponibles = useMemo(() => {
    if (allUnlocked || !profile?.ie_id) return talleresConfig;
    const slugs = getTalleresDeIE(profile.ie_id);
    return slugs.length > 0
      ? talleresConfig.filter(t => slugs.includes(t.slug))
      : talleresConfig;
  }, [profile?.ie_id, allUnlocked]);

  const ie = profile?.ie_id
    ? INSTITUCIONES_EDUCATIVAS.find(ie => ie.id === profile.ie_id)
    : null;

  const tallerAsignado = profile?.taller_slug
    ? getTallerBySlug(profile.taller_slug)
    : null;

  const nTalleres = talleresDisponibles.length;

  // ── Redirect automático para docentes con un solo taller ──────────────────
  useEffect(() => {
    if (!profile || isAdmin || allUnlocked) return

    // Tiene taller asignado directamente → ir directo
    if (profile.taller_slug) {
      navigate(`/taller/${profile.taller_slug}`, { replace: true })
      return
    }

    // Su IE tiene exactamente 1 taller → ir directo
    if (profile.ie_id) {
      const slugs = getTalleresDeIE(profile.ie_id)
      if (slugs.length === 1) {
        navigate(`/taller/${slugs[0]}`, { replace: true })
      }
    }
  }, [profile, isAdmin, allUnlocked, navigate])

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen" style={{ background: '#f0faf5', fontFamily: "'Manrope', sans-serif" }}>

      {/* ── HERO OSCURO (header + contenido unificados) ──────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#043941' }}
      >
        {/* Patrón sutil igual al TallerHub */}
        <div className="absolute inset-0 grama-pattern opacity-40 pointer-events-none" />

        {/* Orb verde izquierda */}
        <div
          className="absolute pointer-events-none animate-aurora-slow"
          style={{
            width: 560, height: 560,
            background: 'radial-gradient(circle, rgba(2,212,126,0.12) 0%, transparent 65%)',
            left: '-120px', top: '-120px',
          }}
        />

        {/* Orb cian derecha */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)',
            right: '-60px', bottom: '-60px',
          }}
        />

        {/* ── HEADER dentro del hero ── */}
        <header className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
            <GramaLogo variant="light" size="md" />

            <div className="hidden sm:flex items-center gap-2">
              <div
                className="h-7 px-3 rounded-full flex items-center gap-1.5 text-[10px] font-bold tracking-wider"
                style={{
                  background: 'rgba(2,212,126,0.12)',
                  border: '1px solid rgba(2,212,126,0.25)',
                  color: '#02d47e',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#02d47e' }} />
                Inroprin · MSE-SFT · 2026
              </div>
            </div>

            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="text-xs font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
                style={{ color: '#02d47e', border: '1px solid rgba(2,212,126,0.3)', background: 'rgba(2,212,126,0.08)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(2,212,126,0.18)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(2,212,126,0.5)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(2,212,126,0.08)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(2,212,126,0.3)'
                }}
              >
                <LayoutDashboard size={13} />
                Panel admin
              </button>
            )}

            <button
              onClick={handleLogout}
              className="text-xs font-semibold px-3.5 py-2 rounded-xl transition-all"
              style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid transparent' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'transparent'
                ;(e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* ── CONTENIDO HERO ── */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-10 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Col izquierda */}
          <div>
            {/* Overline */}
            <div className="flex items-center gap-2.5 mb-6 animate-fade-in-up stagger-1">
              <div className="h-px w-10" style={{ background: '#02d47e' }} />
              <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase" style={{ color: '#02d47e' }}>
                Plataforma de Capacitación Docente
              </span>
            </div>

            {/* Headline */}
            <div className="mb-6">
              <h1
                className="font-extrabold leading-[0.88] tracking-tight text-white animate-fade-in-up stagger-2"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
              >
                Capacitación
              </h1>
              <h1
                className="font-extrabold leading-[0.88] tracking-tight mt-1 animate-fade-in-up stagger-3"
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                  background: 'linear-gradient(100deg, #02d47e 0%, #00c16e 45%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Docente EPT
              </h1>
            </div>

            {/* Descripción */}
            <p
              className="text-sm leading-loose max-w-sm mb-8 animate-fade-in-up stagger-4"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Talleres de Educación Para el Trabajo · Recorre los{' '}
              <strong style={{ color: 'rgba(255,255,255,0.9)' }}>7 módulos</strong> del programa y obtén tu certificación
              en <strong style={{ color: 'rgba(255,255,255,0.9)' }}>150 horas</strong> de formación híbrida.
            </p>

            {/* Checks rápidos */}
            <div className="space-y-2.5 mb-10 animate-fade-in-up stagger-5">
              {[
                'Contenido asíncrono, sincrónico y presencial',
                'Materiales descargables para el taller',
                'Certificación oficial Inroprin',
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle size={14} style={{ color: '#02d47e', flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Taller asignado (docentes con taller ya configurado) */}
            {tallerAsignado && profile?.role === 'docente' && (
              <button
                onClick={() => navigate(`/taller/${tallerAsignado.slug}`)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all mb-6 animate-fade-in-up stagger-6"
                style={{
                  background: 'rgba(2,212,126,0.1)',
                  border: '1px solid rgba(2,212,126,0.3)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(2,212,126,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(2,212,126,0.1)')}
              >
                <span className="text-xl">{tallerAsignado.icon ?? '🛠'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#02d47e' }}>
                    Tu taller asignado
                  </p>
                  <p className="text-sm font-extrabold text-white truncate">{tallerAsignado.nombre}</p>
                  {ie && (
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {ie.nombre}
                    </p>
                  )}
                </div>
                <ArrowRight size={15} style={{ color: '#02d47e', flexShrink: 0 }} />
              </button>
            )}

            {/* CTA scroll */}
            <a
              href="#talleres"
              className="inline-flex items-center gap-2 text-sm font-bold animate-fade-in-up stagger-6 transition-all"
              style={{ color: '#02d47e' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.gap = '10px')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.gap = '8px')}
            >
              {tallerAsignado ? 'Ver todos los talleres' : 'Elige tu especialidad'}
              <ChevronDown size={15} />
            </a>
          </div>

          {/* Col derecha: tarjeta programa */}
          <div
            className="rounded-2xl p-7 animate-fade-in-up stagger-3 lg:ml-4"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 56px rgba(0,0,0,0.3)',
            }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase mb-5"
              style={{ background: 'rgba(2,212,126,0.12)', color: '#02d47e', border: '1px solid rgba(2,212,126,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#02d47e] animate-pulse" />
              Inroprin · 2026
            </div>

            <h3 className="text-white font-extrabold text-lg mb-1">Tu programa formativo</h3>
            <p className="text-xs mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {nTalleres} {ie && !allUnlocked ? `talleres en ${ie.nombre}` : 'talleres EPT'} · modalidad híbrida
            </p>

            {/* 4 stat chips */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { value: String(nTalleres), label: ie && !allUnlocked ? 'Talleres en tu IE' : 'Talleres EPT', icon: BookOpen },
                { value: '7', label: 'Módulos', icon: Layers },
                { value: '150h', label: 'Formación', icon: Clock },
                { value: '🎓', label: 'Certificación', icon: null },
              ].map(s => (
                <div
                  key={s.label}
                  className="rounded-xl px-4 py-3 flex items-center gap-3"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div>
                    <p className="font-extrabold text-lg leading-none" style={{ color: '#02d47e' }}>{s.value}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ruta de módulos */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Ruta de módulos
              </p>
              <div className="space-y-1.5">
                {MODULOS_LABELS.map((label, i) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div
                      className="h-5 w-5 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0"
                      style={{
                        background: i === 0 ? '#02d47e' : 'rgba(2,212,126,0.15)',
                        color: i === 0 ? '#043941' : 'rgba(2,212,126,0.7)',
                      }}
                    >
                      {i}
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{ color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.38)' }}
                    >
                      {label}
                    </span>
                    {i === 0 && (
                      <span
                        className="text-[11px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: 'rgba(2,212,126,0.15)', color: '#02d47e' }}
                      >
                        Inicio
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Divisor suave hacia la sección siguiente */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(2,212,126,0.2), transparent)' }}
        />
      </section>

      {/* ── STATS STRIP (continuación natural del hero) ───────────────────── */}
      <div style={{ background: '#032c32' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <AnimatedStat target={nTalleres} label={ie && !allUnlocked ? 'Talleres en tu IE' : 'Talleres EPT'} />
          <AnimatedStat target={150} suffix="h" label="Modalidad híbrida" />
          <AnimatedStat target={7}   label="Módulos de formación" />
          <AnimatedStat target="🎓"  label="Certificación Inroprin" />
        </div>
      </div>

      {/* ── FEATURES ────────────────────────────────────────────────────── */}
      <section style={{ background: '#f0faf5', borderBottom: '1px solid rgba(4,57,65,0.07)' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
          <div className="mb-10">
            <p className="overline-label mb-2" style={{ color: '#02d47e' }}>¿Qué incluye?</p>
            <h2 className="text-2xl font-extrabold" style={{ color: '#043941' }}>
              Todo lo que necesitas para el taller
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 card-lift animate-fade-in-up"
                style={{
                  background: '#ffffff',
                  border: `1.5px solid ${f.border}`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: f.bg }}
                >
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <h3 className="text-sm font-extrabold mb-2" style={{ color: '#043941' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(4,57,65,0.55)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID DE TALLERES ────────────────────────────────────────────── */}
      <section id="talleres" style={{ background: '#f0faf5' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
          <div className="flex items-end justify-between gap-4 mb-8 animate-fade-in-up">
            <div>
              <p className="overline-label mb-1" style={{ color: '#02d47e' }}>Elige tu taller</p>
              <h2 className="text-xl font-extrabold" style={{ color: '#043941' }}>
                {nTalleres} especialidad{nTalleres !== 1 ? 'es' : ''}{ie && !allUnlocked ? ' disponibles en tu IE' : ' técnicas'}
              </h2>
            </div>
            <div className="hidden sm:block h-px flex-1" style={{ background: 'rgba(4,57,65,0.08)', maxWidth: 300 }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {talleresDisponibles.map((taller, i) => (
              <TallerCard key={taller.id} taller={taller} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={{ background: '#032c32', borderTop: '1px solid rgba(2,212,126,0.12)' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
          <GramaLogo variant="light" size="sm" />
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            GRAMA Proyectos Educativos · Programa MSE-SFT · 2026
          </p>
        </div>
      </footer>

    </div>
  )
}
