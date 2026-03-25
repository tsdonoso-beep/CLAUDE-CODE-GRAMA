// src/pages/TallerPreview.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, ChevronDown, Mail, ChevronRight, Package, Layers, Users, Award } from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'
import { getBienesByTaller, getTotalBienesByTaller } from '@/data/bienesData'
import { GramaLogo } from '@/components/GramaLogo'

const MODULOS_RUTA = [
  { codigo: 'M0', titulo: 'Inicio y Diagnóstico',                   descripcion: 'Conoce la plataforma, tu punto de partida y el contexto del programa TSF. Explora tu taller virtualmente.',           horas: 4,  fase: 'Diagnóstico',  faseColor: '#045f6c' },
  { codigo: 'M1', titulo: 'Conocimiento del Taller',                descripcion: 'Marco del programa formativo, IA para docentes EPT, arquitectura del taller y seguridad operativa.',                    horas: 11, fase: 'Orientación',  faseColor: '#0891b2' },
  { codigo: 'M2', titulo: 'Zona de Investigación',                  descripcion: 'Domina el equipamiento de la zona de investigación: computadoras, cámaras, tablets y pizarras táctiles.',              horas: 18, fase: 'Apropiación',  faseColor: '#0d9488' },
  { codigo: 'M3', titulo: 'Zona de Innovación: Máquinas',           descripcion: 'El módulo más denso. Domina las máquinas de corte, fabricación digital y formado con prácticas presenciales.',         horas: 36, fase: 'Aplicación',   faseColor: '#02d47e' },
  { codigo: 'M4', titulo: 'Acabados y Almacén',                     descripcion: 'Equipamiento de la zona de acabados, gestión del almacén y mantenimiento preventivo. Fichas de revisión diaria.',      horas: 14, fase: 'Aplicación',   faseColor: '#02d47e' },
  { codigo: 'M5', titulo: 'Programa Formativo',                     descripcion: 'Planifica, implementa y evalúa competencias usando el equipamiento como ancla. Las 14 habilidades EPT.',               horas: 22, fase: 'Aplicación',   faseColor: '#02d47e' },
  { codigo: 'M6', titulo: 'Proyecto Integrador',                    descripcion: 'Produce un producto real usando todos los equipos y procesos aprendidos. Sustentación y ceremonia de certificación.',   horas: 25, fase: 'Proyecto',     faseColor: '#7c3aed' },
]

const ZONA_LABEL: Record<string, { label: string; icon: typeof Package }> = {
  'ZONA DE INVESTIGACIÓN, GESTIÓN Y DISEÑO': { label: 'Investigación', icon: Layers },
  'ZONA DE INNOVACIÓN':                       { label: 'Innovación',    icon: Package },
  'DEPÓSITO / ALMACÉN / SEGURIDAD':           { label: 'Almacén',       icon: Award },
}

export default function TallerPreview() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const taller = talleresConfig.find(t => t.slug === slug)

  if (!taller) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f0faf5' }}>
        <div className="text-center">
          <p className="text-sm font-semibold mb-4" style={{ color: '#043941' }}>Taller no encontrado</p>
          <button onClick={() => navigate('/')} className="text-sm font-bold" style={{ color: '#02d47e' }}>Volver al inicio</button>
        </div>
      </div>
    )
  }

  const accent      = `hsl(${taller.color})`
  const accentLight = `hsl(${taller.color} / 0.12)`
  const accentMid   = `hsl(${taller.color} / 0.25)`
  const totalHoras  = MODULOS_RUTA.reduce((sum, m) => sum + m.horas, 0)

  const bienes           = getBienesByTaller(taller.slug)
  const totalBienes      = getTotalBienesByTaller(taller.slug)
  const zonaMap          = new Map<string, number>()
  bienes.forEach(b => zonaMap.set(b.zona, (zonaMap.get(b.zona) ?? 0) + 1))
  const zonas = Array.from(zonaMap.entries()).map(([nombre, count]) => ({
    nombre, count,
    label: ZONA_LABEL[nombre]?.label ?? nombre,
    Icon:  ZONA_LABEL[nombre]?.icon  ?? Package,
  }))
  const equiposInnovacion = bienes.filter(b => b.zona.includes('INNOVACI') && b.tipo === 'EQUIPOS')
  const equiposTop        = equiposInnovacion.slice(0, 9)
  const equiposExtra      = equiposInnovacion.length - 9

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: 'rgba(3,14,18,0.75)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-semibold transition-opacity hover:opacity-70"
          style={{ color: 'rgba(255,255,255,0.7)' }}>
          <ArrowLeft size={14} /> Especialidades
        </button>
        <GramaLogo variant="light" size="sm" />
        <button onClick={() => navigate('/login')}
          className="px-4 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-90"
          style={{ background: '#02d47e', color: '#030e12' }}>
          Acceder
        </button>
      </nav>

      {/* ── Hero full-screen ─────────────────────────────────────────────────── */}
      <div className="relative min-h-screen flex flex-col justify-end">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <img src={taller.imagen} alt={taller.nombre} className="w-full h-full object-cover" />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(160deg, rgba(3,14,18,0.45) 0%, rgba(3,14,18,0.92) 65%, #030e12 100%)` }} />
          {/* Acento lateral */}
          <div className="absolute top-0 right-0 w-1 h-full" style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }} />
        </div>

        {/* Contenido del hero */}
        <div className="relative z-10 px-6 md:px-16 pb-20 pt-32 max-w-4xl">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-black px-3 py-1.5 rounded-full tracking-[0.14em]"
              style={{ background: accentMid, color: accent, border: `1px solid ${accent}` }}>
              T{String(taller.numero).padStart(2, '0')} · TALLER EPT
            </span>
            <span className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Programa MSE-SFT · MINEDU Perú
            </span>
          </div>

          {/* Título grande */}
          <h1 className="font-extrabold text-white leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            {taller.nombre}
          </h1>

          {/* Descripción */}
          <p className="text-sm leading-relaxed mb-10 max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {taller.descripcion}
          </p>

          {/* Stats en fila */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: BookOpen, value: '7', label: 'módulos' },
              { icon: Clock,    value: `${totalHoras}h`, label: 'de formación' },
              { icon: Layers,   value: String(totalBienes), label: 'bienes asignados' },
              { icon: Users,    value: 'Híbrida', label: 'modalidad' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: accentMid }}>
                  <s.icon size={13} style={{ color: accent }} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white leading-none">{s.value}</p>
                  <p className="text-[10px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
          <ChevronDown size={18} style={{ color: 'rgba(255,255,255,0.3)' }} />
        </div>
      </div>

      {/* ── Ruta de Aprendizaje ──────────────────────────────────────────────── */}
      <div style={{ background: '#030e12' }}>
        <div className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
          {/* Header de sección */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-2" style={{ color: accent }}>
                Programa de formación
              </p>
              <h2 className="text-xl font-extrabold text-white">Ruta de Aprendizaje</h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full hidden sm:block"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
              7 módulos · {totalHoras}h
            </span>
          </div>

          {/* Cards de módulos en grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MODULOS_RUTA.map((m, i) => (
              <div key={m.codigo}
                className={`relative rounded-2xl p-5 flex gap-4 transition-all${i === 6 ? ' md:col-span-2' : ''}`}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {/* Número */}
                <div className="shrink-0 flex flex-col items-center gap-1 pt-0.5">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center font-black text-[11px]"
                    style={{ background: i === 0 ? accentMid : 'rgba(255,255,255,0.06)', color: i === 0 ? accent : 'rgba(255,255,255,0.3)' }}>
                    {m.codigo}
                  </div>
                </div>
                {/* Texto */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-white leading-snug">{m.titulo}</p>
                    <span className="text-[10px] font-bold shrink-0 tabular-nums"
                      style={{ color: 'rgba(255,255,255,0.25)' }}>{m.horas}h</span>
                  </div>
                  <p className="text-[11px] leading-relaxed mb-2.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {m.descripcion}
                  </p>
                  <span className="inline-block text-[9px] font-black uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                    style={{ background: `${m.faseColor}20`, color: m.faseColor }}>
                    {m.fase}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Repositorio del Taller ────────────────────────────────────────────── */}
      {bienes.length > 0 && (
        <div style={{ background: '#f8fffe' }}>
          <div className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-2" style={{ color: accent }}>
                Repositorio del Taller
              </p>
              <h2 className="text-xl font-extrabold mb-1" style={{ color: '#043941' }}>
                Equipamiento asignado
              </h2>
              <p className="text-xs" style={{ color: '#64748b' }}>
                {totalBienes} bienes distribuidos en {zonas.length} zonas · dotación oficial MINEDU
              </p>
            </div>

            {/* Zonas — cards grandes */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {zonas.map(z => (
                <div key={z.nombre} className="rounded-2xl p-5 flex flex-col gap-3"
                  style={{ background: '#ffffff', border: '1px solid #e3f8fb', boxShadow: '0 1px 8px rgba(4,57,65,0.05)' }}>
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center"
                    style={{ background: accentLight }}>
                    <z.Icon size={18} style={{ color: accent }} />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold leading-none" style={{ color: '#043941' }}>{z.count}</p>
                    <p className="text-[11px] font-semibold mt-1" style={{ color: '#64748b' }}>{z.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Equipos Zona Innovación */}
            {equiposTop.length > 0 && (
              <div className="rounded-2xl p-6" style={{ background: '#ffffff', border: '1px solid #e3f8fb' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-5 rounded-full" style={{ background: accent }} />
                  <p className="text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: '#043941' }}>
                    Equipos principales · Zona Innovación
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {equiposTop.map((e, i) => (
                    <span key={i}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
                      style={{ background: accentLight, color: '#043941', border: `1px solid ${accentMid}` }}>
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
                      {e.nombre}
                    </span>
                  ))}
                  {equiposExtra > 0 && (
                    <span className="inline-flex items-center px-3 py-2 rounded-xl text-xs font-semibold"
                      style={{ background: '#f1f5f9', color: '#94a3b8' }}>
                      +{equiposExtra} equipos más
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: '#030e12' }}>
        {/* Decoración */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-10"
            style={{ background: accent, filter: 'blur(80px)' }} />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-5"
            style={{ background: '#02d47e', filter: 'blur(60px)' }} />
        </div>

        <div className="relative z-10 px-6 md:px-16 py-20 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-6 mx-auto"
            style={{ background: accentMid, border: `1px solid ${accent}40` }}>
            <Mail size={22} style={{ color: accent }} />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3 leading-tight">
            ¿Tu IE tiene el taller<br />de {taller.nombre}?
          </h2>
          <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Contáctanos para registrar tu institución en el programa y que tus docentes
            accedan a toda la plataforma de capacitación.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:soporte@grama.pe"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: '#02d47e', color: '#030e12' }}>
              <Mail size={15} />
              Comunícate con nosotros
            </a>
            <button onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.11)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}>
              Ya tengo cuenta
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 md:px-16 py-4 flex items-center justify-between"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <GramaLogo variant="light" size="sm" />
          <span className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Programa MSE-SFT · MINEDU Perú
          </span>
          <button onClick={() => navigate('/')}
            className="text-[10px] font-semibold transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255,255,255,0.3)' }}>
            Ver todos los talleres
          </button>
        </div>
      </div>
    </div>
  )
}
