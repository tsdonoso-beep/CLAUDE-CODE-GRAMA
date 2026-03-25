// src/pages/Landing.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Clock, Award, Users, Building2, Briefcase,
  Video, FileText, ChevronRight, ArrowRight,
  Layers, Package, CheckCircle, Mail, Menu, X,
} from 'lucide-react'
import { GramaLogo } from '@/components/GramaLogo'
import { talleresConfig } from '@/data/talleresConfig'

// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '9',    label: 'Talleres EPT' },
  { value: '36+',  label: 'Docentes capacitados' },
  { value: '200+', label: 'Fichas descargables' },
  { value: '130h', label: 'Formación híbrida' },
]

const FEATURES = [
  { icon: Layers,   title: 'Ecosistema Educativo',   desc: 'Acompañamos a instituciones educativas en la implementación y dominio de talleres técnicos completamente equipados.' },
  { icon: BookOpen, title: 'Capacitación Docente',   desc: 'Programas formativos híbridos de 130 horas que preparan a docentes EPT para el uso pedagógico de cada taller.' },
  { icon: Package,  title: 'Repositorio Digital',    desc: 'Mega repositorio de documentación técnica: manuales, fichas IPRC, protocolos de seguridad y rutas estructuradas.' },
]

const PRODUCTS = [
  { icon: Video,    title: 'Formación Híbrida',    desc: 'Sesiones en vivo + videos + documentación asíncrona' },
  { icon: FileText, title: 'Mega Repositorio',      desc: 'Manuales, Fichas IPRC y protocolos descargables' },
  { icon: Award,    title: 'Certificación Oficial', desc: 'Programa TSF de 130 horas · Inroprin' },
]

const COMMUNITY = [
  { icon: Users,     color: '#02d47e', bg: 'rgba(2,212,126,0.08)',   title: 'Docentes EPT',          desc: 'Accede a la ruta de aprendizaje, domina el uso pedagógico de los equipos y mejora tus competencias técnicas.', cta: 'Ingresar a la plataforma', action: 'app' },
  { icon: Building2, color: '#045f6c', bg: 'rgba(4,95,108,0.08)',    title: 'Instituciones Educativas', desc: 'Implementamos talleres equipados con documentación técnica y formación docente integrada para tu programa EPT.', cta: 'Conocer más',               action: 'contact' },
  { icon: Briefcase, color: '#043941', bg: 'rgba(4,57,65,0.08)',     title: 'Coordinadores EPT',     desc: 'Gestiona el avance formativo de tu equipo docente, monitorea el progreso y garantiza la implementación pedagógica.', cta: 'Contactar',               action: 'contact' },
]

const NAV_LINKS = [
  { label: 'Nosotros',        href: '#nosotros' },
  { label: 'Talleres',        href: '#talleres' },
  { label: '¿Para quién es?', href: '#comunidad' },
  { label: 'Contacto',        href: '#contacto' },
]

// ── Tangram decorativo ────────────────────────────────────────────────────────
// Las 7 piezas del tangram: 2 triángulos grandes, 1 medio, 2 pequeños, 1 cuadrado, 1 paralelogramo
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
      <polygon points="0,160 80,80 0,0"         fill={color} fillOpacity={opacity} />
      {/* Triángulo grande 2 */}
      <polygon points="160,0 80,80 160,160"     fill={color} fillOpacity={opacity * 0.7} />
      {/* Triángulo mediano */}
      <polygon points="0,160 80,160 80,80"      fill={color} fillOpacity={opacity * 1.2} />
      {/* Cuadrado (rotado 45°) */}
      <rect x="70" y="30" width="40" height="40" transform="rotate(45 90 50)" fill={color} fillOpacity={opacity * 0.9} />
      {/* Triángulo pequeño 1 */}
      <polygon points="80,80 120,80 120,120"    fill={color} fillOpacity={opacity * 0.8} />
      {/* Triángulo pequeño 2 */}
      <polygon points="80,80 80,120 120,120"    fill={color} fillOpacity={opacity * 0.6} />
      {/* Paralelogramo */}
      <polygon points="120,80 160,80 160,120 120,120" fill={color} fillOpacity={opacity * 0.5} />
    </svg>
  )
}

// ── Marquee de talleres ───────────────────────────────────────────────────────
function TalleresMarquee() {
  const items = [...talleresConfig, ...talleresConfig]
  return (
    <div className="overflow-hidden py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 shrink-0 text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span className="h-1 w-1 rounded-full" style={{ background: '#02d47e' }} />
            {t.nombre}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const goToApp = () => navigate('/hub')

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: '#ffffff' }}>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(4,57,65,0.08)' }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <GramaLogo variant="dark" size="sm" />
          </button>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="text-xs font-semibold transition-opacity hover:opacity-60" style={{ color: '#043941' }}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-opacity hover:opacity-90"
              style={{ background: '#02d47e', color: '#043941' }}
            >
              Iniciar sesión <ChevronRight size={13} />
            </button>
            <button className="md:hidden p-1.5 rounded-lg" onClick={() => setMobileMenuOpen(o => !o)} style={{ color: '#043941' }}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t px-6 py-4 space-y-3" style={{ borderColor: 'rgba(4,57,65,0.08)', background: '#ffffff' }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="block text-sm font-semibold" style={{ color: '#043941' }} onClick={() => setMobileMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <button onClick={() => navigate('/login')} className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-bold" style={{ background: '#02d47e', color: '#043941' }}>
              Iniciar sesión <ChevronRight size={14} />
            </button>
          </div>
        )}
      </header>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-14" style={{ background: '#043941', minHeight: '94vh' }}>
        {/* Patrón GRAMA */}
        <div className="absolute inset-0 grama-pattern opacity-30" />

        {/* Orbs de ambiente */}
        <div className="absolute pointer-events-none" style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(2,212,126,0.1) 0%, transparent 60%)', right: -150, top: -200 }} />
        <div className="absolute pointer-events-none" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(4,95,108,0.25) 0%, transparent 60%)', left: -100, bottom: -100 }} />

        {/* Tangram decorativo — esquinas */}
        <Tangram color="#02d47e" opacity={0.10} rotate={15}  className="absolute w-80 h-80 -top-8 -right-8" />
        <Tangram color="#02d47e" opacity={0.06} rotate={-20} className="absolute w-64 h-64 bottom-16 -left-8" />
        <Tangram color="#ffffff" opacity={0.03} rotate={45}  className="absolute w-48 h-48 top-1/2 left-1/3" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-10">
          {/* Grid hero: texto izq, visual der */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

            {/* Columna texto */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8" style={{ background: 'rgba(2,212,126,0.12)', border: '1px solid rgba(2,212,126,0.25)' }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#02d47e' }} />
                <span className="text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: '#02d47e' }}>
                  Plataforma Nacional · Talleres EPT · MINEDU Perú
                </span>
              </div>

              <h1 className="font-black text-white leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)', letterSpacing: '-0.03em' }}>
                Potenciamos la{' '}
                <span className="relative inline-block">
                  <span style={{ color: '#02d47e' }}>educación</span>
                </span>
                <br />técnica del Perú
              </h1>

              <p className="text-sm leading-loose mb-10 max-w-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
                GRAMA acompaña a instituciones educativas y docentes EPT en la implementación y dominio de talleres técnicos completamente equipados.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={goToApp}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                  style={{ background: '#02d47e', color: '#043941' }}
                >
                  Ingresar a la plataforma
                  <ArrowRight size={15} />
                </button>
                <a
                  href="#talleres"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.14)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.13)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                >
                  Explorar talleres
                  <ChevronRight size={15} />
                </a>
              </div>
            </div>

            {/* Columna visual: tangram + stats cards */}
            <div className="hidden lg:block relative">
              {/* Tangram grande central */}
              <div className="relative flex items-center justify-center h-72">
                <Tangram color="#02d47e" opacity={0.18} rotate={0} className="absolute inset-0 w-full h-full" />

                {/* Cards flotantes sobre el tangram */}
                <div className="absolute top-0 right-4 rounded-2xl px-5 py-4 shadow-xl" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <p className="text-2xl font-black" style={{ color: '#02d47e' }}>9</p>
                  <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Talleres EPT</p>
                </div>
                <div className="absolute bottom-8 left-4 rounded-2xl px-5 py-4 shadow-xl" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <p className="text-2xl font-black" style={{ color: '#02d47e' }}>130h</p>
                  <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>de formación</p>
                </div>
                <div className="absolute bottom-24 right-0 rounded-2xl px-5 py-4 shadow-xl" style={{ background: 'rgba(2,212,126,0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(2,212,126,0.3)' }}>
                  <p className="text-2xl font-black text-white">200+</p>
                  <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>recursos digitales</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats band */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {STATS.map(s => (
              <div key={s.value} className="flex flex-col items-center py-5 px-4" style={{ background: 'rgba(4,57,65,0.5)' }}>
                <span className="font-black leading-none mb-1" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#02d47e' }}>{s.value}</span>
                <span className="text-[10px] font-medium text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee tickers */}
        <TalleresMarquee />

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0 56V28C360 0 720 56 1440 18V56H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════════════════ */}
      <section id="nosotros" className="py-28 px-6 relative overflow-hidden">
        {/* Tangram fondo sutil */}
        <Tangram color="#02d47e" opacity={0.035} rotate={30} className="absolute w-96 h-96 -right-20 top-0 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-16">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: '#02d47e' }}>
              <span className="h-px w-8 inline-block" style={{ background: '#02d47e' }} />
              Ecosistema GRAMA
            </span>
            <h2 className="font-extrabold leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#043941' }}>
              El ecosistema completo para tu taller técnico
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
              Desde el equipamiento del taller hasta la formación docente y el repositorio de recursos pedagógicos.
            </p>
          </div>

          {/* Features — layout asimétrico */}
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group relative p-7 rounded-3xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                style={{ borderColor: i === 0 ? 'rgba(2,212,126,0.3)' : '#e3f8fb', background: i === 0 ? 'linear-gradient(135deg, #f0fdf9 0%, #dcfce7 100%)' : '#fafffe' }}
              >
                {/* Tangram mini decorativo en card */}
                <Tangram
                  color="#02d47e"
                  opacity={i === 0 ? 0.12 : 0.05}
                  rotate={i * 30}
                  className="absolute -bottom-4 -right-4 w-24 h-24"
                />
                <div className="relative z-10">
                  <div className="h-11 w-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: i === 0 ? 'rgba(2,212,126,0.2)' : 'rgba(2,212,126,0.10)' }}>
                    <f.icon size={19} style={{ color: '#02d47e' }} />
                  </div>
                  <h3 className="text-sm font-extrabold mb-2" style={{ color: '#043941' }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Product strip */}
          <div className="rounded-3xl overflow-hidden grid md:grid-cols-3 gap-px" style={{ background: 'rgba(2,212,126,0.2)' }}>
            {PRODUCTS.map(p => (
              <div key={p.title} className="flex items-center gap-4 px-6 py-5" style={{ background: '#043941' }}>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(2,212,126,0.15)' }}>
                  <p.icon size={17} style={{ color: '#02d47e' }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{p.title}</p>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TALLERES ════════════════════════════════════════════════════════ */}
      <section id="talleres" className="py-28 px-6 relative overflow-hidden" style={{ background: '#f0faf5' }}>
        <Tangram color="#043941" opacity={0.025} rotate={-15} className="absolute w-80 h-80 -left-10 bottom-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: '#02d47e' }}>
              <span className="h-px w-8 inline-block" style={{ background: '#02d47e' }} />
              Especialidades disponibles
            </span>
            <h2 className="font-extrabold leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#043941' }}>
              {talleresConfig.length} especialidades técnicas
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
              Talleres completamente equipados con ruta de aprendizaje y repositorio pedagógico propio.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {talleresConfig.map(t => (
              <div
                key={t.slug}
                className="group rounded-3xl overflow-hidden bg-white cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1px solid #e3f8fb' }}
                onClick={() => navigate(`/taller/${t.slug}/preview`)}
              >
                {/* Imagen */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={t.imagen}
                    alt={t.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'brightness(0.8) saturate(0.85)' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 35%, rgba(4,57,65,0.75) 100%)' }} />
                  {/* Badge número */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-black px-2.5 py-1 rounded-full" style={{ background: `hsl(${t.color} / 0.85)`, color: '#ffffff' }}>
                      T{String(t.numero).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Tangram mini sobre imagen */}
                  <Tangram color={`hsl(${t.color})`} opacity={0.25} rotate={0} className="absolute -bottom-4 -right-4 w-20 h-20" />
                </div>

                {/* Contenido */}
                <div className="p-5">
                  <h3 className="text-sm font-extrabold mb-1.5" style={{ color: '#043941' }}>{t.nombre}</h3>
                  <p className="text-[11px] leading-relaxed line-clamp-2 mb-4" style={{ color: '#64748b' }}>{t.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3" style={{ color: '#94a3b8' }}>
                      <span className="flex items-center gap-1 text-[10px] font-semibold">
                        <BookOpen size={10} /> 7 módulos
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-semibold">
                        <Clock size={10} /> 130h
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-bold transition-opacity group-hover:opacity-70" style={{ color: '#02d47e' }}>
                      Ver taller <ChevronRight size={11} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={goToApp}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)' }}
            >
              Acceder a la plataforma completa
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ══ COMUNIDAD ═══════════════════════════════════════════════════════ */}
      <section id="comunidad" className="py-28 px-6 relative overflow-hidden">
        <Tangram color="#02d47e" opacity={0.04} rotate={60} className="absolute w-72 h-72 -right-8 top-8 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: '#02d47e' }}>
              <span className="h-px w-8 inline-block" style={{ background: '#02d47e' }} />
              Para toda la comunidad
            </span>
            <h2 className="font-extrabold leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#043941' }}>
              Diseñado para toda la comunidad EPT
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
              Un ecosistema pensado para cada actor del programa formativo técnico.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {COMMUNITY.map(c => (
              <div
                key={c.title}
                className="group relative p-7 rounded-3xl border flex flex-col overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: '#e3f8fb', background: '#ffffff' }}
              >
                <div className="h-11 w-11 rounded-2xl flex items-center justify-center mb-5" style={{ background: c.bg }}>
                  <c.icon size={19} style={{ color: c.color }} />
                </div>
                <h3 className="text-sm font-extrabold mb-2" style={{ color: '#043941' }}>{c.title}</h3>
                <p className="text-xs leading-relaxed flex-1 mb-5" style={{ color: '#64748b' }}>{c.desc}</p>
                <button
                  onClick={c.action === 'app' ? goToApp : undefined}
                  className="flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-60 self-start"
                  style={{ color: c.color }}
                >
                  {c.cta} <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ═══════════════════════════════════════════════════════ */}
      <section id="contacto" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)' }}
          >
            {/* Tangram decorativo en el CTA */}
            <Tangram color="#02d47e" opacity={0.12} rotate={20}  className="absolute -top-10 -right-10 w-64 h-64 pointer-events-none" />
            <Tangram color="#ffffff" opacity={0.04} rotate={-30} className="absolute -bottom-8 -left-8 w-48 h-48 pointer-events-none" />
            <div className="absolute pointer-events-none" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(2,212,126,0.12) 0%, transparent 65%)', right: -80, top: -80 }} />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left max-w-lg">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl mb-6" style={{ background: 'rgba(2,212,126,0.15)', border: '1px solid rgba(2,212,126,0.25)' }}>
                  <CheckCircle size={22} style={{ color: '#02d47e' }} />
                </div>
                <h2 className="font-extrabold text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                  ¿Listo para potenciar tu taller?
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Contáctanos para conocer más sobre GRAMA o inicia sesión directamente con tus credenciales institucionales.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <button
                  onClick={goToApp}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                  style={{ background: '#02d47e', color: '#043941' }}
                >
                  Ingresar a la plataforma <ArrowRight size={15} />
                </button>
                <a
                  href="mailto:contacto@grama.pe"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                >
                  <Mail size={14} /> contacto@grama.pe
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer style={{ background: '#043941' }} className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <GramaLogo variant="light" size="sm" />
              <p className="text-[11px] mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Programa MSE-SFT · MINEDU Perú
              </p>
            </div>
            <nav className="flex flex-wrap gap-6">
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href} className="text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              © {new Date().getFullYear()} GRAMA Proyectos Educativos · Todos los derechos reservados
            </p>
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Plataforma TSF · Programa MIE-EPT
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
