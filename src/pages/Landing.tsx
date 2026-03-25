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

// ── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '9',    label: 'Talleres EPT' },
  { value: '36+',  label: 'Docentes capacitados' },
  { value: '200+', label: 'Fichas descargables' },
  { value: '150h', label: 'Formación híbrida' },
]

const FEATURES = [
  {
    icon: Layers,
    title: 'Ecosistema Educativo',
    desc: 'Acompañamos a instituciones educativas en la implementación y dominio de talleres técnicos completamente equipados.',
  },
  {
    icon: BookOpen,
    title: 'Capacitación Docente',
    desc: 'Programas formativos híbridos de 150 horas que preparan a los docentes EPT para dominar el uso pedagógico de cada taller.',
  },
  {
    icon: Package,
    title: 'Repositorio Digital',
    desc: 'Mega repositorio de documentación técnica: manuales, fichas IPRC, protocolos de seguridad y rutas estructuradas.',
  },
]

const PRODUCTS = [
  { icon: Video,    title: 'Formación Híbrida',     desc: 'Sesiones en vivo + videos + documentación asíncrona' },
  { icon: FileText, title: 'Mega Repositorio',       desc: 'Manuales, Fichas IPRC y protocolos descargables' },
  { icon: Award,    title: 'Certificación Oficial',  desc: 'Programa TSF de 150 horas · Inroprin' },
]

const COMMUNITY = [
  {
    icon: Users,
    color: '#02d47e',
    bg: 'rgba(2,212,126,0.08)',
    title: 'Docentes EPT',
    desc: 'Accede a toda la ruta de aprendizaje, domina el uso pedagógico de los equipos y mejora tus competencias técnicas con nuestro repositorio digital.',
    cta: 'Ingresar a la plataforma',
  },
  {
    icon: Building2,
    color: '#045f6c',
    bg: 'rgba(4,95,108,0.08)',
    title: 'Instituciones Educativas',
    desc: 'Implementamos talleres equipados con documentación técnica y formación docente integrada para tu programa formativo EPT.',
    cta: 'Conocer más',
  },
  {
    icon: Briefcase,
    color: '#043941',
    bg: 'rgba(4,57,65,0.08)',
    title: 'Coordinadores EPT',
    desc: 'Gestiona el avance formativo de tu equipo docente, monitorea el progreso y garantiza la implementación pedagógica del taller.',
    cta: 'Contactar',
  },
]

const NAV_LINKS = [
  { label: 'Nosotros',       href: '#nosotros' },
  { label: 'Talleres',       href: '#talleres' },
  { label: '¿Para quién es?', href: '#comunidad' },
  { label: 'Contacto',       href: '#contacto' },
]

// ── Component ─────────────────────────────────────────────────────────────────

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
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <GramaLogo variant="dark" size="sm" />
          </button>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs font-semibold transition-colors hover:opacity-70"
                style={{ color: '#043941' }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={goToApp}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: '#043941' }}
            >
              Ingresar a la plataforma
              <ChevronRight size={13} />
            </button>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-1.5 rounded-lg"
              onClick={() => setMobileMenuOpen(o => !o)}
              style={{ color: '#043941' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t px-6 py-4 space-y-3" style={{ borderColor: 'rgba(4,57,65,0.08)', background: '#ffffff' }}>
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="block text-sm font-semibold"
                style={{ color: '#043941' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={goToApp}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-bold text-white"
              style={{ background: '#043941' }}
            >
              Ingresar a la plataforma <ChevronRight size={14} />
            </button>
          </div>
        )}
      </header>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative overflow-hidden pt-14"
        style={{ background: '#043941', minHeight: '92vh' }}
      >
        {/* Fondo: patrón + orbs */}
        <div className="absolute inset-0 grama-pattern opacity-40" />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(2,212,126,0.12) 0%, transparent 65%)',
            right: -100, top: -100,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(4,95,108,0.3) 0%, transparent 65%)',
            left: -80, bottom: 0,
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-24 flex flex-col items-center text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ background: 'rgba(2,212,126,0.12)', border: '1px solid rgba(2,212,126,0.25)' }}
          >
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#02d47e' }} />
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#02d47e' }}>
              Plataforma Nacional · Talleres EPT · MINEDU Perú
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-black text-white leading-tight mb-5 max-w-3xl"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', letterSpacing: '-0.025em' }}
          >
            Potenciamos la{' '}
            <span style={{ color: '#02d47e' }}>educación técnica</span>
          </h1>

          <p
            className="text-sm leading-loose max-w-xl mb-10"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            GRAMA acompaña a instituciones educativas y docentes EPT en la implementación
            y dominio de talleres técnicos completamente equipados.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <button
              onClick={goToApp}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: '#02d47e' }}
            >
              Ingresar a la plataforma
              <ArrowRight size={15} />
            </button>
            <a
              href="#talleres"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-colors"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Explorar los talleres
              <ChevronRight size={15} />
            </a>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px w-full max-w-2xl rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {STATS.map(s => (
              <div key={s.value} className="flex flex-col items-center py-5 px-4" style={{ background: 'rgba(4,57,65,0.4)' }}>
                <span
                  className="font-black leading-none mb-1"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#02d47e' }}
                >
                  {s.value}
                </span>
                <span className="text-[11px] font-medium text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0 60V30C360 0 720 60 1440 20V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══ NOSOTROS — FEATURES ═════════════════════════════════════════════ */}
      <section id="nosotros" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#02d47e' }}>
              Ecosistema GRAMA
            </span>
            <h2
              className="font-extrabold leading-tight mt-2 mb-3"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#043941' }}
            >
              El ecosistema completo para tu taller técnico
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
              Desde el equipamiento del taller hasta la formación docente y el repositorio de recursos pedagógicos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {FEATURES.map(f => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border transition-shadow hover:shadow-md"
                style={{ borderColor: '#e3f8fb', background: '#fafffe' }}
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(2,212,126,0.12)' }}
                >
                  <f.icon size={18} style={{ color: '#02d47e' }} />
                </div>
                <h3 className="text-sm font-extrabold mb-2" style={{ color: '#043941' }}>
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Product strip — dark */}
          <div
            className="rounded-2xl overflow-hidden grid md:grid-cols-3 gap-px"
            style={{ background: 'rgba(2,212,126,0.15)' }}
          >
            {PRODUCTS.map(p => (
              <div
                key={p.title}
                className="flex items-center gap-4 px-6 py-5"
                style={{ background: '#043941' }}
              >
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(2,212,126,0.15)' }}
                >
                  <p.icon size={16} style={{ color: '#02d47e' }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{p.title}</p>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TALLERES ════════════════════════════════════════════════════════ */}
      <section id="talleres" style={{ background: '#f0faf5' }} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#02d47e' }}>
              Especialidades disponibles
            </span>
            <h2
              className="font-extrabold leading-tight mt-2 mb-3"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#043941' }}
            >
              {talleresConfig.length} especialidades técnicas disponibles
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
              Talleres completamente equipados con ruta de aprendizaje y repositorio pedagógico propio.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {talleresConfig.map(t => (
              <div
                key={t.slug}
                className="rounded-2xl overflow-hidden border bg-white transition-shadow hover:shadow-md"
                style={{ borderColor: '#e3f8fb' }}
              >
                {/* Imagen del taller */}
                <div
                  className="h-32 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${t.imagen})`, filter: 'brightness(0.75) saturate(0.9)' }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(4,57,65,0.7) 100%)' }}
                  />
                  <div className="absolute bottom-3 left-4">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(2,212,126,0.2)', color: '#02d47e', border: '1px solid rgba(2,212,126,0.3)' }}
                    >
                      T{String(t.numero).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-4">
                  <h3 className="text-sm font-bold mb-1" style={{ color: '#043941' }}>
                    {t.nombre}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: '#64748b' }}>
                    {t.descripcion}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px]" style={{ color: '#94a3b8' }}>
                      <span className="flex items-center gap-1">
                        <BookOpen size={10} />
                        7 módulos
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        150h
                      </span>
                    </div>
                    <button
                      onClick={goToApp}
                      className="flex items-center gap-1 text-[11px] font-bold transition-opacity hover:opacity-70"
                      style={{ color: '#02d47e' }}
                    >
                      Ver taller <ChevronRight size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={goToApp}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: '#043941' }}
            >
              Acceder a la plataforma completa
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ══ COMUNIDAD ═══════════════════════════════════════════════════════ */}
      <section id="comunidad" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#02d47e' }}>
              Para toda la comunidad
            </span>
            <h2
              className="font-extrabold leading-tight mt-2 mb-3"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#043941' }}
            >
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
                className="p-6 rounded-2xl border flex flex-col"
                style={{ borderColor: '#e3f8fb', background: '#ffffff' }}
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: c.bg }}
                >
                  <c.icon size={18} style={{ color: c.color }} />
                </div>
                <h3 className="text-sm font-extrabold mb-2" style={{ color: '#043941' }}>
                  {c.title}
                </h3>
                <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: '#64748b' }}>
                  {c.desc}
                </p>
                <button
                  onClick={c.title === 'Docentes EPT' ? goToApp : undefined}
                  className="flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
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
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)' }}
          >
            <div
              className="absolute pointer-events-none"
              style={{
                width: 400, height: 400,
                background: 'radial-gradient(circle, rgba(2,212,126,0.15) 0%, transparent 65%)',
                right: -100, top: -100,
              }}
            />
            <div className="relative z-10">
              <div
                className="inline-flex items-center justify-center h-12 w-12 rounded-2xl mb-5 mx-auto"
                style={{ background: 'rgba(2,212,126,0.15)', border: '1px solid rgba(2,212,126,0.25)' }}
              >
                <CheckCircle size={22} style={{ color: '#02d47e' }} />
              </div>
              <h2
                className="font-extrabold text-white mb-3"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
              >
                ¿Listo para potenciar tu taller?
              </h2>
              <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Contáctanos para conocer más sobre GRAMA o inicia sesión directamente con tus credenciales institucionales.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <button
                  onClick={goToApp}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: '#02d47e' }}
                >
                  Ingresar a la plataforma
                  <ArrowRight size={15} />
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a
                  href="mailto:contacto@grama.pe"
                  className="flex items-center gap-2 text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Mail size={13} />
                  contacto@grama.pe
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer style={{ background: '#043941' }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <GramaLogo variant="light" size="sm" />

            <nav className="flex flex-wrap gap-5">
              {NAV_LINKS.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div
            className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              © {new Date().getFullYear()} GRAMA Proyectos Educativos · Todos los derechos reservados
            </p>
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Plataforma TSF · Programa MIE-EPT · MINEDU Perú
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
