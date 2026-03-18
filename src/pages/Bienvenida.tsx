// src/pages/Bienvenida.tsx
import { useEffect, useRef, useState } from 'react'
import { talleresConfig } from '@/data/talleresConfig'
import { TallerCard } from '@/components/hub/TallerCard'
import logoGramaFull from '@/assets/logo-grama-full.png'

// Componente de stat con conteo animado
function AnimatedStat({ target, suffix = '', label }: { target: number | string; suffix?: string; label: string }) {
  const [display, setDisplay] = useState(typeof target === 'number' ? 0 : target)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (typeof target !== 'number') return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1200
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
      <p className="font-black leading-none" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#02d47e' }}>
        {typeof target === 'number' ? display : target}{suffix}
      </p>
      <p className="text-xs mt-1.5 font-medium" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
        {label}
      </p>
    </div>
  )
}

export default function Bienvenida() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  // Parallax suave del hero con el mouse
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{ background: '#030e12', fontFamily: "'Manrope', sans-serif" }}
    >
      {/* ── ORBS DE AMBIENTE ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute rounded-full animate-aurora"
          style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(2,212,126,0.07) 0%, transparent 70%)',
            top: '-100px', left: `${mousePos.x * 0.3}%`,
            transition: 'left 3s ease-out',
          }}
        />
        <div
          className="absolute rounded-full animate-aurora-slow"
          style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(4,95,108,0.1) 0%, transparent 70%)',
            bottom: '0px', right: `${100 - mousePos.x * 0.2}%`,
            transition: 'right 4s ease-out',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
            top: '40%', left: '60%',
          }}
        />
      </div>

      {/* ── HEADER ── */}
      <header
        className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5 border-b animate-fade-in"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <img src={logoGramaFull} alt="GRAMA" className="h-9 object-contain" />

        <div className="hidden sm:flex items-center gap-3">
          <div
            className="h-7 px-3 rounded-full flex items-center gap-1.5 text-[10px] font-bold tracking-wider"
            style={{
              background: 'rgba(2,212,126,0.08)',
              border: '1px solid rgba(2,212,126,0.15)',
              color: '#02d47e',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#02d47e] animate-pulse" />
            MINEDU · MSE-SFT · 2026
          </div>
        </div>

        <button
          onClick={() => {
            sessionStorage.removeItem('grama-auth')
            window.location.href = '/login'
          }}
          className="text-xs font-semibold px-3.5 py-2 rounded-xl transition-all"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = '#fff'
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'
            ;(e.currentTarget as HTMLElement).style.background = 'transparent'
          }}
        >
          Cerrar sesión
        </button>
      </header>

      {/* ── HERO ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-16 pb-14">
        {/* Overline */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in-up stagger-1">
          <div
            className="h-px flex-1"
            style={{ background: 'linear-gradient(to right, transparent, rgba(2,212,126,0.4), transparent)', maxWidth: 80 }}
          />
          <span
            className="text-[10px] font-black tracking-[0.2em] uppercase"
            style={{ color: 'rgba(2,212,126,0.7)' }}
          >
            Plataforma de Capacitación Docente
          </span>
          <div
            className="h-px"
            style={{ background: 'rgba(2,212,126,0.2)', width: 40 }}
          />
        </div>

        {/* Headline principal */}
        <div className="mb-6">
          <h1
            className="font-black leading-[0.9] tracking-tight mb-2 animate-fade-in-up stagger-2"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: '#ffffff' }}
          >
            Capacitación
          </h1>
          <h1
            className="font-black leading-[0.9] tracking-tight mb-2 animate-fade-in-up stagger-3"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              background: 'linear-gradient(100deg, #02d47e 0%, #00c16e 40%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Docente
          </h1>
          <p
            className="text-sm max-w-sm mt-5 leading-loose animate-fade-in-up stagger-4"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Talleres de Educación Para el Trabajo · Selecciona tu taller
            para iniciar la ruta de certificación de <strong style={{ color: 'rgba(255,255,255,0.7)' }}>150 horas</strong>.
          </p>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-10 py-8 border-t border-b animate-fade-in-up stagger-5"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <AnimatedStat target={9}   label="Talleres EPT" />
          <AnimatedStat target={150} suffix="h" label="Modalidad híbrida" />
          <AnimatedStat target={7}   label="Módulos LXP" />
          <AnimatedStat target="🎓" label="Certificación MINEDU" />
        </div>
      </section>

      {/* ── GRID DE TALLERES ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pb-20">
        {/* Sección header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
          <div>
            <p className="overline-label" style={{ color: 'rgba(2,212,126,0.6)' }}>
              Elige tu taller
            </p>
            <h2 className="text-xl font-extrabold text-white mt-0.5">
              9 especialidades técnicas
            </h2>
          </div>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {talleresConfig.map((taller, i) => (
            <TallerCard key={taller.id} taller={taller} index={i} />
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="relative z-10 text-center py-8 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}
      >
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          GRAMA Proyectos Educativos · Programa MSE-SFT MINEDU 2026
        </p>
      </footer>
    </div>
  )
}
