// src/pages/TallerPreview.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft, BookOpen, Clock, Mail, ChevronRight, Package, Layers, Award } from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'
import { getBienesByTaller, getTotalBienesByTaller } from '@/data/bienesData'
import { GramaLogo } from '@/components/GramaLogo'

// ── Datos de programa ────────────────────────────────────────────────────────
const MODULOS_RUTA = [
  { codigo: 'M0', titulo: 'Inicio y Diagnóstico',          descripcion: 'Conoce la plataforma, tu punto de partida y el contexto del programa TSF. Explora tu taller virtualmente.',             horas: 4,  fase: 'Diagnóstico' },
  { codigo: 'M1', titulo: 'Conocimiento del Taller',       descripcion: 'Marco del programa formativo, IA para docentes EPT, arquitectura del taller y seguridad operativa.',                     horas: 11, fase: 'Orientación'  },
  { codigo: 'M2', titulo: 'Zona de Investigación',         descripcion: 'Domina el equipamiento de la zona de investigación: computadoras, cámaras, tablets y pizarras táctiles.',               horas: 18, fase: 'Apropiación'  },
  { codigo: 'M3', titulo: 'Zona de Innovación: Máquinas',  descripcion: 'El módulo más denso. Domina máquinas de corte, fabricación digital y formado con prácticas presenciales.',              horas: 36, fase: 'Aplicación'   },
  { codigo: 'M4', titulo: 'Acabados y Almacén',            descripcion: 'Equipamiento de la zona de acabados, gestión del almacén y mantenimiento preventivo del taller.',                        horas: 14, fase: 'Aplicación'   },
  { codigo: 'M5', titulo: 'Programa Formativo',            descripcion: 'Planifica, implementa y evalúa competencias usando el equipamiento como ancla. Las 14 habilidades EPT.',                horas: 22, fase: 'Aplicación'   },
  { codigo: 'M6', titulo: 'Proyecto Integrador',           descripcion: 'Produce un producto real usando todos los equipos aprendidos. Sustentación colectiva y ceremonia de certificación.',    horas: 25, fase: 'Proyecto'     },
]

const ZONA_META: Record<string, { label: string; Icon: typeof Package }> = {
  'ZONA DE INVESTIGACIÓN, GESTIÓN Y DISEÑO': { label: 'Investigación',    Icon: Layers  },
  'ZONA DE INNOVACIÓN':                       { label: 'Innovación',       Icon: Package },
  'DEPÓSITO / ALMACÉN / SEGURIDAD':           { label: 'Almacén',          Icon: Award   },
}

// ── Decoración tangram: polígonos SVG inspirados en el puzzle de 7 piezas ──
function TangramDecor({ accent, className = '' }: { accent: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`pointer-events-none select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Triángulo grande izquierda */}
      <polygon points="0,200 100,100 0,0"     fill={accent} fillOpacity="0.12" />
      {/* Triángulo grande derecha */}
      <polygon points="200,0 100,100 200,200" fill={accent} fillOpacity="0.07" />
      {/* Cuadrado central rotado 45° */}
      <rect x="75" y="75" width="50" height="50" transform="rotate(45 100 100)" fill={accent} fillOpacity="0.10" />
      {/* Triángulo pequeño sup */}
      <polygon points="100,0 150,50 50,50"    fill={accent} fillOpacity="0.08" />
      {/* Triángulo pequeño inf */}
      <polygon points="100,200 50,150 150,150" fill={accent} fillOpacity="0.08" />
    </svg>
  )
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function TallerPreview() {
  const { slug }  = useParams<{ slug: string }>()
  const navigate  = useNavigate()
  const taller    = talleresConfig.find(t => t.slug === slug)

  if (!taller) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f0faf5' }}>
        <div className="text-center">
          <p className="text-sm font-semibold mb-4" style={{ color: '#043941' }}>Taller no encontrado</p>
          <button onClick={() => navigate('/')} className="text-sm font-bold" style={{ color: '#02d47e' }}>
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  // Scroll to top on every taller navigation
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  const accent       = `hsl(${taller.color})`
  const accentAlpha  = (a: number) => `hsl(${taller.color} / ${a})`
  const totalHoras   = MODULOS_RUTA.reduce((s, m) => s + m.horas, 0)

  const bienes           = getBienesByTaller(taller.slug)
  const totalBienes      = getTotalBienesByTaller(taller.slug)
  const zonaMap          = new Map<string, number>()
  bienes.forEach(b => zonaMap.set(b.zona, (zonaMap.get(b.zona) ?? 0) + 1))
  const zonas            = Array.from(zonaMap.entries()).map(([nombre, count]) => ({
    nombre, count,
    label: ZONA_META[nombre]?.label ?? nombre,
    Icon:  ZONA_META[nombre]?.Icon  ?? Package,
  }))
  const equiposInnov     = bienes.filter(b => b.zona.includes('INNOVACI') && b.tipo === 'EQUIPOS')
  const equiposTop       = equiposInnov.slice(0, 8)
  const equiposExtra     = equiposInnov.length - 8

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Manrope', sans-serif", background: '#ffffff' }}>

      {/* ── Navbar blanco (igual que Landing) ──────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(4,57,65,0.08)' }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-semibold transition-opacity hover:opacity-60"
            style={{ color: '#045f6c' }}
          >
            <ArrowLeft size={14} />
            Todas las especialidades
          </button>
          <GramaLogo variant="dark" size="sm" />
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: '#02d47e', color: '#043941' }}
          >
            Acceder
          </button>
        </div>
      </header>

      {/* ── Hero: oscuro GRAMA + imagen a la derecha ────────────────────────── */}
      <section
        className="relative overflow-hidden pt-14"
        style={{ background: '#043941', minHeight: '88vh' }}
      >
        {/* Patrón de fondo */}
        <div className="absolute inset-0 grama-pattern opacity-30" />

        {/* Orb radial verde */}
        <div className="absolute pointer-events-none" style={{
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(2,212,126,0.14) 0%, transparent 65%)',
          right: -80, top: -80,
        }} />

        {/* Decoración tangram — esquina inferior izquierda */}
        <TangramDecor accent="#02d47e" className="absolute bottom-0 left-0 h-72 w-72 opacity-50" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <div>
            {/* Badge taller */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(2,212,126,0.12)', border: '1px solid rgba(2,212,126,0.25)' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#02d47e' }} />
              <span className="text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: '#02d47e' }}>
                T{String(taller.numero).padStart(2, '0')} · Taller EPT · MINEDU Perú
              </span>
            </div>

            <h1 className="font-extrabold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '-0.02em' }}>
              {taller.nombre}
            </h1>

            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 420 }}>
              {taller.descripcion}
            </p>

            {/* Stats en fila */}
            <div className="flex flex-wrap gap-5">
              {[
                { icon: BookOpen, v: '7 módulos',       sub: 'de formación' },
                { icon: Clock,    v: `${totalHoras}h`,  sub: 'duración total' },
                { icon: Package,  v: String(totalBienes), sub: 'bienes asignados' },
              ].map(s => (
                <div key={s.sub} className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(2,212,126,0.14)' }}>
                    <s.icon size={15} style={{ color: '#02d47e' }} />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-white leading-none">{s.v}</p>
                    <p className="text-[10px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-10">
              <a href="mailto:soporte@grama.pe"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: '#02d47e', color: '#043941' }}>
                <Mail size={14} />
                Comunícate con nosotros
              </a>
              <button onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.14)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}>
                Ya tengo cuenta <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Imagen del taller */}
          <div className="relative hidden md:block">
            {/* Decoración tangram superpuesta a la imagen */}
            <TangramDecor accent={accent} className="absolute -top-8 -right-8 h-48 w-48 z-10" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: `2px solid ${accentAlpha(0.35)}` }}>
              <img
                src={taller.imagen}
                alt={taller.nombre}
                className="w-full h-72 object-cover"
                style={{ filter: 'saturate(0.9)' }}
              />
              {/* Overlay con color acento del taller */}
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(160deg, transparent 40%, ${accentAlpha(0.4)} 100%)` }} />
              {/* Badge número */}
              <div className="absolute top-4 left-4">
                <span className="text-xs font-black px-3 py-1.5 rounded-full"
                  style={{ background: accentAlpha(0.85), color: '#ffffff' }}>
                  T{String(taller.numero).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ruta de Aprendizaje ─────────────────────────────────────────────── */}
      <section style={{ background: '#f0faf5' }}>
        <div className="max-w-5xl mx-auto px-6 py-16">

          {/* Header sección */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-2" style={{ color: '#02d47e' }}>
                Programa de formación
              </p>
              <h2 className="text-xl font-extrabold" style={{ color: '#043941' }}>
                Ruta de Aprendizaje
              </h2>
              <p className="text-xs mt-1" style={{ color: '#64748b' }}>
                Estructura estándar MSE-SFT · {totalHoras}h en 7 módulos
              </p>
            </div>
            {/* Mini tangram decorativo */}
            <TangramDecor accent={accent} className="h-16 w-16 opacity-60 shrink-0" />
          </div>

          {/* Grid de módulos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODULOS_RUTA.map((m, i) => (
              <div
                key={m.codigo}
                className={`bg-white rounded-2xl p-5 flex gap-4 border transition-shadow hover:shadow-md${i === 6 ? ' md:col-span-2' : ''}`}
                style={{ borderColor: '#e3f8fb' }}
              >
                {/* Código */}
                <div className="shrink-0 pt-0.5">
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center text-[10px] font-black"
                    style={{
                      background: i === 6 ? '#043941' : '#f0faf5',
                      color:      i === 6 ? '#02d47e' : '#94a3b8',
                    }}
                  >
                    {m.codigo}
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-bold" style={{ color: '#043941' }}>{m.titulo}</p>
                    <span className="text-[10px] font-bold shrink-0 tabular-nums" style={{ color: '#94a3b8' }}>
                      {m.horas}h
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed mb-2.5" style={{ color: '#64748b' }}>
                    {m.descripcion}
                  </p>
                  <span
                    className="inline-block text-[9px] font-black uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                    style={{ background: '#e3f8fb', color: '#045f6c' }}
                  >
                    {m.fase}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Repositorio del Taller ──────────────────────────────────────────── */}
      {bienes.length > 0 && (
        <section style={{ background: '#ffffff' }}>
          <div className="max-w-5xl mx-auto px-6 py-16">

            {/* Header sección */}
            <div className="flex items-start justify-between mb-10 gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-2" style={{ color: '#02d47e' }}>
                  Repositorio del Taller
                </p>
                <h2 className="text-xl font-extrabold mb-1" style={{ color: '#043941' }}>
                  Equipamiento asignado
                </h2>
                <p className="text-xs" style={{ color: '#64748b' }}>
                  {totalBienes} bienes · {zonas.length} zonas de trabajo · dotación oficial MINEDU
                </p>
              </div>
              <TangramDecor accent={accent} className="h-16 w-16 opacity-50 shrink-0" />
            </div>

            {/* Zonas */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {zonas.map(z => (
                <div
                  key={z.nombre}
                  className="rounded-2xl p-5 border"
                  style={{ background: accentAlpha(0.06), borderColor: accentAlpha(0.18) }}
                >
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: accentAlpha(0.14) }}>
                    <z.Icon size={18} style={{ color: accent }} />
                  </div>
                  <p className="text-2xl font-extrabold leading-none mb-1" style={{ color: '#043941' }}>{z.count}</p>
                  <p className="text-[11px] font-semibold" style={{ color: '#64748b' }}>{z.label}</p>
                </div>
              ))}
            </div>

            {/* Equipos destacados */}
            {equiposTop.length > 0 && (
              <div className="rounded-2xl p-6 border" style={{ borderColor: '#e3f8fb', background: '#f8fffe' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-6 rounded-full" style={{ background: '#02d47e' }} />
                  <p className="text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: '#043941' }}>
                    Equipos principales · Zona Innovación
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {equiposTop.map((e, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                      style={{ background: accentAlpha(0.1), color: '#043941', border: `1px solid ${accentAlpha(0.2)}` }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
                      {e.nombre}
                    </span>
                  ))}
                  {equiposExtra > 0 && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold"
                      style={{ background: '#f1f5f9', color: '#94a3b8' }}>
                      +{equiposExtra} más
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── CTA Final ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#043941' }}>
        <div className="absolute inset-0 grama-pattern opacity-25" />
        <div className="absolute pointer-events-none" style={{
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(2,212,126,0.15) 0%, transparent 65%)',
          right: -60, bottom: -60,
        }} />
        <TangramDecor accent="#02d47e" className="absolute top-0 left-0 h-64 w-64 opacity-30" />

        <div className="relative z-10 max-w-xl mx-auto px-6 py-20 text-center">
          {/* Pregunta inicial */}
          <p className="text-[11px] font-black uppercase tracking-[0.18em] mb-4" style={{ color: '#02d47e' }}>
            ¿Quieres saber más?
          </p>
          <h2 className="text-2xl font-extrabold text-white mb-3 leading-tight">
            Implementa el taller de<br />{taller.nombre} en tu IE
          </h2>
          <p className="text-sm mb-10 max-w-sm mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Registra tu institución en el programa y da a tus docentes acceso
            completo a la plataforma de capacitación GRAMA.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:soporte@grama.pe"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: '#02d47e', color: '#043941' }}
            >
              <Mail size={15} />
              Comunícate con nosotros
            </a>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.12)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.13)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}>
              Ya tengo cuenta <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex items-center justify-between max-w-5xl mx-auto"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <GramaLogo variant="light" size="sm" />
          <span className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Programa MSE-SFT · MINEDU Perú
          </span>
          <button onClick={() => navigate('/')}
            className="text-[10px] font-semibold hover:opacity-70 transition-opacity"
            style={{ color: 'rgba(255,255,255,0.35)' }}>
            Ver todos los talleres
          </button>
        </div>
      </section>
    </div>
  )
}
