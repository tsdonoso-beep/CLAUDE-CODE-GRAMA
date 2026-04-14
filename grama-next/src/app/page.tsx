// Landing page — Server Component (zero JS para el hero estático)
import Link from 'next/link'
import { GramaLogo } from '@/presentation/shared/ui/GramaLogo'
import { staticTallerRepository } from '@/infrastructure/static/StaticTallerRepository'

export default function LandingPage() {
  const talleres = staticTallerRepository.getAll()

  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)' }}
      >
        <GramaLogo size="md" />
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: 'var(--color-grama-oscuro)' }}>
          <a href="#nosotros" className="transition-opacity hover:opacity-70">Nosotros</a>
          <a href="#talleres" className="transition-opacity hover:opacity-70">Talleres</a>
          <a href="#para-quien" className="transition-opacity hover:opacity-70">¿Para quién es?</a>
        </div>
        <Link
          href="/login"
          className="btn-glow px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{ background: 'var(--color-grama-verde)', color: '#ffffff' }}
        >
          Ir a la plataforma →
        </Link>
      </nav>

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden hero-gradient grama-pattern"
        style={{ paddingTop: '80px' }}
      >
        {/* Aurora orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-aurora opacity-20"
          style={{ background: 'radial-gradient(circle, #02d47e, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-aurora-slow opacity-15"
          style={{ background: 'radial-gradient(circle, #045f6c, transparent)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <p className="overline-label animate-fade-in-up" style={{ color: 'var(--color-grama-mint)' }}>
              GRAMA · Plataforma LXP · 2025
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
                className="btn-glow flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: 'var(--color-grama-verde)', color: '#ffffff' }}
              >
                Ir a la plataforma →
              </Link>
              <a
                href="#talleres"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)' }}
              >
                Explorar talleres →
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up stagger-4">
            {[
              { n: '10', label: 'Talleres EPT' },
              { n: '36+', label: 'Docentes capacitados' },
              { n: '200+', label: 'Fichas descargables' },
              { n: '150h', label: 'Formación híbrida' },
            ].map(s => (
              <div
                key={s.label}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <p className="font-extrabold" style={{ fontSize: '2rem', color: 'var(--color-grama-mint)' }}>
                  {s.n}
                </p>
                <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee talleres */}
      <div
        className="py-4 overflow-hidden border-y"
        style={{ background: 'var(--color-grama-oscuro)', borderColor: 'var(--color-dk-border)' }}
      >
        <div className="flex animate-marquee whitespace-nowrap gap-8">
          {[...talleres, ...talleres].map((t, i) => (
            <span key={i} className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'rgba(210,255,225,0.7)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {t.nombre}
            </span>
          ))}
        </div>
      </div>

      {/* Talleres section */}
      <section id="talleres" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="overline-label" style={{ color: 'var(--color-grama-verde)' }}>CATÁLOGO</p>
          <h2 className="font-extrabold mt-3" style={{ fontSize: 'var(--text-h1)', color: 'var(--color-grama-oscuro)' }}>
            10 talleres EPT especializados
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            Cada taller incluye 7 módulos, sesiones en vivo, repositorio de bienes y certificación Inroprin.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {talleres.slice(0, 9).map((t, i) => (
            <Link
              key={t.slug}
              href="/login"
              className={`card-lift rounded-2xl p-5 border animate-fade-in-up stagger-${Math.min(i + 1, 9)}`}
              style={{ borderColor: 'var(--color-border)', background: '#ffffff' }}
            >
              <p className="overline-label" style={{ color: 'var(--color-grama-verde)' }}>T0{t.numero}</p>
              <h3 className="font-bold mt-2 text-sm leading-snug" style={{ color: 'var(--color-grama-oscuro)' }}>
                {t.nombre}
              </h3>
              <p className="text-xs mt-2 line-clamp-2" style={{ color: 'var(--color-muted-foreground)' }}>
                {t.descripcion}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
