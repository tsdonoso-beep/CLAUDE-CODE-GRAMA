// Landing page — Server Component
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen, Clock, Award, Users, Building2, Briefcase,
  Video, FileText, Layers, Package, CheckCircle, Mail, ArrowRight,
} from 'lucide-react'
import { GramaLogo }   from '@/presentation/shared/ui/GramaLogo'
import { LandingNav }  from '@/presentation/features/landing/LandingNav'
import { staticTallerRepository } from '@/infrastructure/static/StaticTallerRepository'

export const metadata: Metadata = {
  title: 'GRAMA LXP — Plataforma de formación docente EPT',
  description: 'GRAMA acompaña a docentes EPT en la implementación pedagógica de talleres técnicos especializados.',
}

// ── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '10',   label: 'Talleres EPT' },
  { value: '36+',  label: 'Docentes capacitados' },
  { value: '200+', label: 'Fichas descargables' },
  { value: '150h', label: 'Formación híbrida' },
]

const FEATURES = [
  {
    icon: Package,
    overline: 'El problema',
    title: 'El conocimiento técnico se queda en las cajas',
    desc: 'Los equipos llegan al taller pero los docentes no reciben formación para usarlos. El conocimiento es presencial, único e irrecuperable: cuando el docente rota, todo se pierde.',
    dark: true,
  },
  {
    icon: Layers,
    overline: 'Nuestra solución',
    title: 'Una ruta de aprendizaje híbrida diseñada para ti',
    desc: 'Accede a 7 módulos formativos con contenido asíncrono, sesiones en vivo y práctica presencial. Aprende sobre cada equipo a tu ritmo, desde cualquier lugar y cuando puedas.',
    dark: false,
  },
  {
    icon: Award,
    overline: 'El resultado',
    title: 'Autonomía docente garantizada al finalizar',
    desc: 'Al completar la ruta dominas el uso pedagógico de cada equipo de tu taller y puedes replicar ese aprendizaje con tus estudiantes — con confianza y sin depender de nadie.',
    dark: false,
  },
]

const PRODUCTS = [
  { icon: Video,    title: 'Acceso asíncrono',      desc: 'Videos, lecturas y fichas disponibles 24/7 para que aprendas a tu propio ritmo.' },
  { icon: FileText, title: 'Repositorio completo',   desc: 'Manuales, fichas técnicas IPRC, protocolos de seguridad y materiales descargables.' },
  { icon: Clock,    title: 'Acompañamiento en vivo', desc: 'Sesiones sincrónicas con expertos especializados en cada taller EPT.' },
]

const COMMUNITY = [
  {
    icon: Users,
    color: '#02d47e',
    bg:    'rgba(2,212,126,0.07)',
    title: 'Docentes EPT',
    desc:  'Accede a la ruta de aprendizaje, domina el uso pedagógico de los equipos y mejora tus competencias técnicas con acompañamiento experto.',
    cta:   'Solicitar acceso',
    href:  '/registro',
  },
  {
    icon: Building2,
    color: '#045f6c',
    bg:    'rgba(4,95,108,0.07)',
    title: 'Instituciones Educativas',
    desc:  'Si tu IE ya cuenta con talleres EPT equipados, GRAMA capacita a tus docentes para aprovechar al máximo cada equipo especializado.',
    cta:   'Escribirnos',
    href:  'mailto:contacto@grama.pe',
  },
  {
    icon: Briefcase,
    color: '#043941',
    bg:    'rgba(4,57,65,0.06)',
    title: 'Coordinadores EPT',
    desc:  'Gestiona el avance formativo de tu equipo docente, monitorea el progreso y garantiza la implementación pedagógica efectiva.',
    cta:   'Contactar',
    href:  'mailto:contacto@grama.pe',
  },
]

// ── Tangram SVG decorativo ────────────────────────────────────────────────────
function Tangram({ color = '#02d47e', opacity = 0.12, rotate = 0, className = '' }: {
  color?: string; opacity?: number; rotate?: number; className?: string
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <polygon points="0,160 80,80 0,0"              fill={color} fillOpacity={opacity}         />
      <polygon points="160,0 80,80 160,160"           fill={color} fillOpacity={opacity * 0.7}   />
      <polygon points="0,160 80,160 80,80"            fill={color} fillOpacity={opacity * 1.2}   />
      <rect x="70" y="30" width="40" height="40" transform="rotate(45 90 50)" fill={color} fillOpacity={opacity * 0.9} />
      <polygon points="80,80 120,80 120,120"          fill={color} fillOpacity={opacity * 0.8}   />
      <polygon points="80,80 80,120 120,120"          fill={color} fillOpacity={opacity * 0.6}   />
      <polygon points="120,80 160,80 160,120 120,120" fill={color} fillOpacity={opacity * 0.5}   />
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const talleres = staticTallerRepository.getAll()

  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      <LandingNav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden hero-gradient grama-pattern"
        style={{ paddingTop: 80 }}
      >
        {/* Aurora orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-aurora opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #02d47e, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-aurora-slow opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #045f6c, transparent)' }}
        />

        {/* Tangram decorations */}
        <Tangram color="#02d47e" opacity={0.08} rotate={15}  className="absolute w-80 h-80 -top-8 -right-8" />
        <Tangram color="#ffffff" opacity={0.04} rotate={-20} className="absolute w-60 h-60 bottom-8 -left-8" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Copy */}
          <div>
            <p className="overline-label animate-fade-in-up" style={{ color: 'var(--color-grama-mint)' }}>
              GRAMA · PLATAFORMA LXP · MINEDU-TSF
            </p>
            <h1
              className="font-extrabold leading-[1.05] mt-4 animate-fade-in-up stagger-1"
              style={{ fontSize: 'var(--text-hero)', color: '#ffffff' }}
            >
              Potenciamos la{' '}
              <span className="text-gradient-green">educación técnica</span>{' '}
              del Perú
            </h1>
            <p
              className="mt-6 text-base leading-relaxed animate-fade-in-up stagger-2 max-w-lg"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              GRAMA acompaña a docentes EPT en la implementación y dominio pedagógico
              de talleres técnicos especializados — desde cualquier lugar, a tu ritmo.
            </p>

            <div className="flex flex-wrap gap-4 mt-8 animate-fade-in-up stagger-3">
              <Link
                href="/login"
                className="btn-glow flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm"
                style={{ background: 'var(--color-grama-verde)', color: '#ffffff' }}
              >
                Ir a la plataforma →
              </Link>
              <a
                href="#talleres"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm border transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)' }}
              >
                Explorar talleres
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-3 mt-8 animate-fade-in-up stagger-4">
              {[
                { label: 'MINEDU', sub: 'Alineado al currículo' },
                { label: 'Inroprin', sub: 'Certificación' },
                { label: 'TSF', sub: 'Programa MSE-SFT' },
              ].map(b => (
                <div
                  key={b.label}
                  className="px-3 py-2 rounded-xl text-center"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <p className="text-xs font-extrabold" style={{ color: 'rgba(255,255,255,0.9)' }}>{b.label}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{b.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up stagger-4">
            {STATS.map(s => (
              <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
                <p className="font-extrabold" style={{ fontSize: '2.4rem', color: 'var(--color-grama-mint)', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(4,57,65,0.4), transparent)' }}
        />
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <div
        className="py-3.5 overflow-hidden border-y"
        style={{ background: 'var(--color-grama-oscuro)', borderColor: 'var(--color-dk-border)' }}
      >
        <div className="flex animate-marquee whitespace-nowrap gap-10">
          {[...talleres, ...talleres].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
              style={{ color: 'rgba(210,255,225,0.65)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
              {t.nombre}
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES (El problema / Solución / Resultado) ─────────────────── */}
      <section id="nosotros" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="overline-label" style={{ color: 'var(--color-grama-verde)' }}>POR QUÉ GRAMA</p>
          <h2 className="font-extrabold mt-3" style={{ fontSize: 'var(--text-h1)', color: 'var(--color-grama-oscuro)' }}>
            Diseñado para resolver un problema real
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.overline}
              className="rounded-2xl p-7 relative overflow-hidden"
              style={{
                background:   f.dark ? 'var(--color-grama-oscuro)' : '#ffffff',
                border:       f.dark ? '1px solid var(--color-dk-border)' : '1px solid var(--color-border)',
              }}
            >
              {f.dark && <div className="absolute inset-0 grama-pattern opacity-40" />}
              <div className="relative z-10">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: f.dark ? 'rgba(2,212,126,0.12)' : 'var(--color-grama-claro)',
                  }}
                >
                  <f.icon size={18} style={{ color: f.dark ? '#02d47e' : 'var(--color-grama-verde)' }} />
                </div>
                <p
                  className="overline-label mb-2"
                  style={{ color: f.dark ? 'var(--color-grama-mint)' : 'var(--color-grama-verde)' }}
                >
                  {String(i + 1).padStart(2, '0')} · {f.overline}
                </p>
                <h3
                  className="font-extrabold text-base leading-snug mb-3"
                  style={{ color: f.dark ? '#ffffff' : 'var(--color-grama-oscuro)' }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: f.dark ? 'rgba(255,255,255,0.55)' : 'var(--color-muted-foreground)' }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TALLERES ─────────────────────────────────────────────────────── */}
      <section
        id="talleres"
        className="py-24 px-6 md:px-12"
        style={{ background: 'var(--color-background)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="overline-label" style={{ color: 'var(--color-grama-verde)' }}>CATÁLOGO</p>
            <h2 className="font-extrabold mt-3" style={{ fontSize: 'var(--text-h1)', color: 'var(--color-grama-oscuro)' }}>
              10 talleres EPT especializados
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
              Cada taller incluye 7 módulos, sesiones en vivo, repositorio de bienes y certificación Inroprin.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {talleres.map((t, i) => (
              <Link
                key={t.slug}
                href="/registro"
                className={`card-lift rounded-2xl overflow-hidden bg-white border flex flex-col animate-fade-in-up stagger-${Math.min(i + 1, 9)}`}
                style={{ borderColor: 'var(--color-border)' }}
              >
                {/* Color top bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${t.color}, ${t.color}60)` }} />

                <div className="p-5 flex flex-col flex-1">
                  <span
                    className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold mb-2 w-fit"
                    style={{ background: `${t.color}18`, color: t.color }}
                  >
                    T{String(t.numero).padStart(2, '0')}
                  </span>
                  <h3 className="font-bold text-sm leading-snug mb-2" style={{ color: 'var(--color-grama-oscuro)' }}>
                    {t.nombre}
                  </h3>
                  <p className="text-[11px] leading-relaxed line-clamp-3 mb-4 flex-1" style={{ color: 'var(--color-muted-foreground)' }}>
                    {t.descripcion}
                  </p>

                  {/* Competencias chips */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {t.competencias.slice(0, 2).map(c => (
                      <span
                        key={c}
                        className="text-[9px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--color-grama-claro2)', color: 'var(--color-grama-cerceta)' }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-semibold" style={{ color: t.color }}>
                    <BookOpen size={10} /> 7 módulos
                    <Clock size={10} /> 150h
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/registro"
              className="btn-glow inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold"
              style={{ background: 'var(--color-grama-verde)', color: '#ffffff' }}
            >
              Solicitar acceso a un taller <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="overline-label" style={{ color: 'var(--color-grama-verde)' }}>LA PLATAFORMA</p>
          <h2 className="font-extrabold mt-3" style={{ fontSize: 'var(--text-h1)', color: 'var(--color-grama-oscuro)' }}>
            Todo lo que necesitas en un solo lugar
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map(p => (
            <div
              key={p.title}
              className="rounded-2xl p-7 text-center"
              style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}
            >
              <div
                className="h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'var(--color-grama-claro)' }}
              >
                <p.icon size={24} style={{ color: 'var(--color-grama-verde)' }} />
              </div>
              <h3 className="font-extrabold text-sm mb-2" style={{ color: 'var(--color-grama-oscuro)' }}>
                {p.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Module path visual */}
        <div
          className="mt-10 rounded-2xl p-8 relative overflow-hidden"
          style={{ background: 'var(--color-grama-oscuro)', border: '1px solid var(--color-dk-border)' }}
        >
          <div className="absolute inset-0 grama-pattern opacity-40" />
          <div className="relative z-10">
            <p className="overline-label mb-4 text-center" style={{ color: 'var(--color-grama-mint)' }}>
              RUTA DE APRENDIZAJE · 7 MÓDULOS · 150H HÍBRIDA
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { num: 'M0', label: 'Diagnóstico' },
                { num: 'M1', label: 'Reconocimiento' },
                { num: 'M2', label: 'Investigación' },
                { num: 'M3', label: 'Innovación' },
                { num: 'M4', label: 'Producción' },
                { num: 'M5', label: 'Programa formativo' },
                { num: 'M6', label: 'Proyecto integrador' },
              ].map((m, i) => (
                <div key={m.num} className="flex items-center gap-3">
                  <div
                    className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', minWidth: 90 }}
                  >
                    <span className="text-xs font-extrabold" style={{ color: 'var(--color-grama-mint)' }}>{m.num}</span>
                    <span className="text-[10px] text-center font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{m.label}</span>
                  </div>
                  {i < 6 && (
                    <span className="hidden sm:block text-lg font-light" style={{ color: 'rgba(2,212,126,0.35)' }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN ES ────────────────────────────────────────────────── */}
      <section
        id="comunidad"
        className="py-24 px-6 md:px-12"
        style={{ background: 'var(--color-background)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="overline-label" style={{ color: 'var(--color-grama-verde)' }}>COMUNIDAD</p>
            <h2 className="font-extrabold mt-3" style={{ fontSize: 'var(--text-h1)', color: 'var(--color-grama-oscuro)' }}>
              ¿Para quién es GRAMA?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {COMMUNITY.map(c => (
              <div
                key={c.title}
                className="rounded-2xl p-7 flex flex-col"
                style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: c.bg, border: `1px solid ${c.color}25` }}
                >
                  <c.icon size={20} style={{ color: c.color }} />
                </div>
                <h3 className="font-extrabold text-base mb-2" style={{ color: 'var(--color-grama-oscuro)' }}>
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
                  {c.desc}
                </p>
                <a
                  href={c.href}
                  className="flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                  style={{ color: c.color }}
                >
                  {c.cta} <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO / CTA ───────────────────────────────────────────────── */}
      <section
        id="contacto"
        className="py-24 px-6 md:px-12 relative overflow-hidden hero-gradient grama-pattern"
      >
        {/* Tangram decorations */}
        <Tangram color="#02d47e" opacity={0.08} rotate={15}  className="absolute w-80 h-80 -top-8 -right-16 pointer-events-none" />
        <Tangram color="#ffffff" opacity={0.03} rotate={-20} className="absolute w-60 h-60 bottom-0 -left-12 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="overline-label animate-fade-in-up" style={{ color: 'var(--color-grama-mint)' }}>
            ACCESO A LA PLATAFORMA
          </p>
          <h2
            className="font-extrabold mt-4 animate-fade-in-up stagger-1"
            style={{ fontSize: 'var(--text-h1)', color: '#ffffff', lineHeight: 1.1 }}
          >
            ¿Listo para empezar tu formación técnica?
          </h2>
          <p
            className="mt-5 text-base leading-relaxed animate-fade-in-up stagger-2"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Solicita acceso a GRAMA LXP y comienza tu ruta de formación en el taller EPT asignado.
            Tu coordinador UGEL aprobará tu ingreso.
          </p>

          <div className="flex flex-wrap gap-4 mt-8 justify-center animate-fade-in-up stagger-3">
            <Link
              href="/registro"
              className="btn-glow flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm"
              style={{ background: 'var(--color-grama-verde)', color: '#ffffff' }}
            >
              Solicitar acceso →
            </Link>
            <a
              href="mailto:contacto@grama.pe"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm border transition-all hover:bg-white/5"
              style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)' }}
            >
              <Mail size={15} /> Contactar
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 animate-fade-in-up stagger-4">
            {[
              { icon: CheckCircle, label: 'Sin costo para docentes EPT' },
              { icon: CheckCircle, label: 'Acceso desde cualquier dispositivo' },
              { icon: CheckCircle, label: 'Certificación al completar' },
            ].map(b => (
              <span key={b.label} className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <b.icon size={13} style={{ color: 'var(--color-grama-mint)' }} /> {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        className="px-6 md:px-12 py-10"
        style={{ background: '#030e12', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <GramaLogo size="md" variant="light" />
          <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
            GRAMA LXP · Plataforma de formación docente EPT · MINEDU-TSF · {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-6 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <Link href="/login" className="transition-opacity hover:opacity-80">Ingresar</Link>
            <Link href="/registro" className="transition-opacity hover:opacity-80">Registro</Link>
            <a href="mailto:contacto@grama.pe" className="transition-opacity hover:opacity-80">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
