// src/pages/TallerPreview.tsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, BookOpen, Clock, Mail, ChevronRight, Package, Layers, Award,
  Search, Filter, FileText, Play, Wrench, Monitor, Shield, Grid3x3, ExternalLink
} from 'lucide-react'
import { talleresConfig } from '@/data/talleresConfig'
import { getBienesByTaller, getTotalBienesByTaller, type Bien } from '@/data/bienesData'
import { GramaLogo } from '@/components/GramaLogo'

// ── Módulos ruta (150h total) ────────────────────────────────────────────────
const MODULOS_RUTA = [
  { codigo: 'M0', titulo: 'Inicio y Diagnóstico',         descripcion: 'Conoce la plataforma, tu punto de partida y el contexto del programa TSF. Explora tu taller virtualmente.',          horas: 4,  fase: 'Diagnóstico' },
  { codigo: 'M1', titulo: 'Conocimiento del Taller',      descripcion: 'Marco del programa formativo, IA para docentes EPT, arquitectura del taller y seguridad operativa.',                  horas: 11, fase: 'Orientación'  },
  { codigo: 'M2', titulo: 'Zona de Investigación',        descripcion: 'Domina el equipamiento de la zona de investigación: computadoras, cámaras, tablets y pizarras táctiles.',            horas: 22, fase: 'Apropiación'  },
  { codigo: 'M3', titulo: 'Zona de Innovación: Máquinas', descripcion: 'El módulo más denso. Domina máquinas de corte, fabricación digital y formado con prácticas presenciales.',           horas: 42, fase: 'Aplicación'   },
  { codigo: 'M4', titulo: 'Acabados y Almacén',           descripcion: 'Equipamiento de la zona de acabados, gestión del almacén y mantenimiento preventivo del taller.',                     horas: 18, fase: 'Aplicación'   },
  { codigo: 'M5', titulo: 'Programa Formativo',           descripcion: 'Planifica, implementa y evalúa competencias usando el equipamiento como ancla. Las 14 habilidades EPT.',             horas: 26, fase: 'Aplicación'   },
  { codigo: 'M6', titulo: 'Proyecto Integrador',          descripcion: 'Produce un producto real usando todos los equipos aprendidos. Sustentación colectiva y ceremonia de certificación.', horas: 27, fase: 'Proyecto'     },
]

// ── Tipos de bienes ──────────────────────────────────────────────────────────
const TIPOS = [
  { key: 'EQUIPOS',      label: 'Equipos',      Icon: Monitor  },
  { key: 'HERRAMIENTAS', label: 'Herramientas', Icon: Wrench   },
  { key: 'MOBILIARIO',   label: 'Mobiliario',   Icon: Grid3x3  },
  { key: 'PEDAGOGICO',   label: 'Pedagógico',   Icon: BookOpen },
  { key: 'SEGURIDAD',    label: 'Seguridad',    Icon: Shield   },
]
const TIPO_LABEL: Record<string, string> = Object.fromEntries(TIPOS.map(t => [t.key, t.label]))
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TIPO_ICON: Record<string, any>     = Object.fromEntries(TIPOS.map(t => [t.key, t.Icon]))

// ── Zonas ────────────────────────────────────────────────────────────────────
const ZONA_SHORT: Record<string, string> = {
  'ZONA DE INVESTIGACIÓN, GESTIÓN Y DISEÑO': 'INV. Y DISEÑO',
  'ZONA DE INNOVACIÓN':                      'INNOVACIÓN',
  'DEPÓSITO / ALMACÉN / SEGURIDAD':          'DEPÓSITO',
}
const ZONA_META: Record<string, { label: string; Icon: typeof Package }> = {
  'ZONA DE INVESTIGACIÓN, GESTIÓN Y DISEÑO': { label: 'Investigación', Icon: Layers  },
  'ZONA DE INNOVACIÓN':                      { label: 'Innovación',    Icon: Package },
  'DEPÓSITO / ALMACÉN / SEGURIDAD':          { label: 'Almacén',       Icon: Award   },
}

// ── Tangram decoración ───────────────────────────────────────────────────────
function TangramDecor({ accent, className = '' }: { accent: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`pointer-events-none select-none ${className}`} xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,200 100,100 0,0"      fill={accent} fillOpacity="0.12" />
      <polygon points="200,0 100,100 200,200"  fill={accent} fillOpacity="0.07" />
      <rect x="75" y="75" width="50" height="50" transform="rotate(45 100 100)" fill={accent} fillOpacity="0.10" />
      <polygon points="100,0 150,50 50,50"     fill={accent} fillOpacity="0.08" />
      <polygon points="100,200 50,150 150,150" fill={accent} fillOpacity="0.08" />
    </svg>
  )
}

// ── Card de bien ─────────────────────────────────────────────────────────────
function BienCard({ bien, accent }: {
  bien: Bien
  accent: string
}) {
  const Icon      = TIPO_ICON[bien.tipo] ?? Package
  const zonaShort = ZONA_SHORT[bien.zona] ?? bien.zona
  const tipoLabel = TIPO_LABEL[bien.tipo] ?? bien.tipo

  return (
    <div
      className="bg-white rounded-xl flex flex-col transition-all hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
      style={{ border: '1px solid #e2eef2', borderLeftColor: accent, borderLeftWidth: 4 }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between px-3 pt-3 pb-1">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'rgba(2,212,126,0.12)' }}>
          <Icon size={14} style={{ color: '#02d47e' }} />
        </div>
        {bien.cantidad >= 1 && (
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md"
            style={{ background: 'rgba(2,212,126,0.15)', color: '#02b36a' }}>
            ×{bien.cantidad}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-3 pb-1 flex-1">
        <p className="text-xs font-bold leading-tight line-clamp-2 mb-1" style={{ color: '#043941' }}>
          {bien.nombre}
        </p>
        {(bien.marca || bien.modelo) && (
          <p className="text-[10px] truncate" style={{ color: '#94a3b8' }}>
            {[bien.marca, bien.modelo].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>

      {/* Zona label */}
      <div className="px-3 pt-1">
        <p className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
          {zonaShort}
        </p>
      </div>

      {/* Footer */}
      <div className="px-3 pb-3 pt-2 flex items-center justify-between border-t mt-2"
        style={{ borderColor: '#f0f8fa' }}>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-full border"
          style={{ borderColor: 'rgba(2,212,126,0.4)', color: '#02916a', background: 'rgba(2,212,126,0.07)' }}>
          <Icon size={8} />
          {tipoLabel}
        </span>
        <div className="flex items-center gap-1">
          <span className="h-5 w-5 rounded-md flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
            style={{ background: '#f1f5f9' }}>
            <FileText size={9} style={{ color: '#94a3b8' }} />
          </span>
          <span className="h-5 w-5 rounded-md flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
            style={{ background: '#f1f5f9' }}>
            <Play size={9} style={{ color: '#94a3b8' }} />
          </span>
          <span className="h-5 w-5 rounded-md flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
            style={{ background: '#fff1f0' }}>
            <ExternalLink size={8} style={{ color: '#f87171' }} />
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function TallerPreview() {
  const { slug }   = useParams<{ slug: string }>()
  const navigate   = useNavigate()
  const taller     = talleresConfig.find(t => t.slug === slug)

  const [activeTab,   setActiveTab]   = useState<'bienes' | 'manuales' | 'videos'>('bienes')
  const [search,      setSearch]      = useState('')
  const [tipoFilter,  setTipoFilter]  = useState('ALL')
  const [zonaFilters, setZonaFilters] = useState<string[]>([])

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

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

  const accent      = `hsl(${taller.color})`
  const accentAlpha = (a: number) => `hsl(${taller.color} / ${a})`
  const totalHoras  = MODULOS_RUTA.reduce((s, m) => s + m.horas, 0)

  const bienes      = getBienesByTaller(taller.slug)
  const totalBienes = getTotalBienesByTaller(taller.slug)

  // Zonas únicas
  const zonaMap = new Map<string, number>()
  bienes.forEach(b => zonaMap.set(b.zona, (zonaMap.get(b.zona) ?? 0) + 1))
  const zonas = Array.from(zonaMap.entries()).map(([nombre, count]) => ({
    nombre, count,
    label: ZONA_META[nombre]?.label ?? nombre,
    Icon:  ZONA_META[nombre]?.Icon  ?? Package,
  }))
  const ZONA_KEYS = Array.from(zonaMap.keys())

  // Conteo por tipo
  const tipoCounts = bienes.reduce((acc, b) => {
    if (b.tipo) acc[b.tipo] = (acc[b.tipo] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Bienes filtrados
  const filteredBienes = bienes
    .filter(b => tipoFilter === 'ALL' || b.tipo === tipoFilter)
    .filter(b => zonaFilters.length === 0 || zonaFilters.includes(b.zona))
    .filter(b => {
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return (
        b.nombre.toLowerCase().includes(q) ||
        b.marca.toLowerCase().includes(q)  ||
        b.modelo.toLowerCase().includes(q) ||
        b.codigoEntidad.toLowerCase().includes(q)
      )
    })

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Manrope', sans-serif", background: '#ffffff' }}>

      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(4,57,65,0.08)' }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-semibold transition-opacity hover:opacity-60"
            style={{ color: '#045f6c' }}>
            <ArrowLeft size={14} />
            Todas las especialidades
          </button>
          <GramaLogo variant="dark" size="sm" />
          <button onClick={() => navigate('/login')}
            className="px-4 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-90"
            style={{ background: '#02d47e', color: '#043941' }}>
            Acceder
          </button>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-14" style={{ background: '#043941', minHeight: '88vh' }}>
        <div className="absolute inset-0 grama-pattern opacity-30" />
        <div className="absolute pointer-events-none" style={{
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(2,212,126,0.14) 0%, transparent 65%)',
          right: -80, top: -80,
        }} />
        <TangramDecor accent="#02d47e" className="absolute bottom-0 left-0 h-72 w-72 opacity-50" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
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

            <div className="flex flex-wrap gap-5">
              {[
                { icon: BookOpen, v: '7 módulos',         sub: 'de formación'     },
                { icon: Clock,    v: `${totalHoras}h`,    sub: 'duración total'   },
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

          <div className="relative hidden md:block">
            <TangramDecor accent={accent} className="absolute -top-8 -right-8 h-48 w-48 z-10" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: `2px solid ${accentAlpha(0.35)}` }}>
              <img src={taller.imagen} alt={taller.nombre} className="w-full h-72 object-cover"
                style={{ filter: 'saturate(0.9)' }} />
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(160deg, transparent 40%, ${accentAlpha(0.4)} 100%)` }} />
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

      {/* ── Ruta de Aprendizaje ──────────────────────────────────────────────── */}
      <section style={{ background: '#f0faf5' }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-2" style={{ color: '#02d47e' }}>
                Programa de formación
              </p>
              <h2 className="text-xl font-extrabold" style={{ color: '#043941' }}>Ruta de Aprendizaje</h2>
              <p className="text-xs mt-1" style={{ color: '#64748b' }}>
                Estructura estándar MSE-SFT · {totalHoras}h en 7 módulos
              </p>
            </div>
            <TangramDecor accent={accent} className="h-16 w-16 opacity-60 shrink-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODULOS_RUTA.map((m, i) => (
              <div key={m.codigo}
                className={`bg-white rounded-2xl p-5 flex gap-4 border transition-shadow hover:shadow-md${i === 6 ? ' md:col-span-2' : ''}`}
                style={{ borderColor: '#e3f8fb' }}>
                <div className="shrink-0 pt-0.5">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center text-[10px] font-black"
                    style={{ background: i === 6 ? '#043941' : '#f0faf5', color: i === 6 ? '#02d47e' : '#94a3b8' }}>
                    {m.codigo}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-bold" style={{ color: '#043941' }}>{m.titulo}</p>
                    <span className="text-[10px] font-bold shrink-0 tabular-nums" style={{ color: '#94a3b8' }}>{m.horas}h</span>
                  </div>
                  <p className="text-[11px] leading-relaxed mb-2.5" style={{ color: '#64748b' }}>{m.descripcion}</p>
                  <span className="inline-block text-[9px] font-black uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                    style={{ background: '#e3f8fb', color: '#045f6c' }}>
                    {m.fase}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Repositorio del Taller ───────────────────────────────────────────── */}
      {bienes.length > 0 && (
        <section>
          {/* ── Header oscuro ── */}
          <div style={{ background: '#043941' }}>
            <div className="max-w-5xl mx-auto px-6 pt-10 pb-0">

              {/* Breadcrumb */}
              <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-2"
                style={{ color: '#02d47e' }}>
                {taller.nombre} · Repositorio
              </p>

              {/* Título + subtítulo */}
              <h2 className="font-extrabold text-white mb-1"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
                Recursos del Taller
              </h2>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {totalBienes} bienes catalogados · {zonas.length} zonas
              </p>

              {/* Tabs */}
              <div className="flex gap-1 mb-5">
                {([
                  { id: 'bienes',   label: 'Bienes',   Icon: Package  },
                  { id: 'manuales', label: 'Manuales', Icon: FileText },
                  { id: 'videos',   label: 'Videos',   Icon: Play     },
                ] as const).map(tab => (
                  <button key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2 px-5 py-2 rounded-t-lg text-sm font-semibold transition-all"
                    style={activeTab === tab.id
                      ? { background: '#ffffff', color: '#043941' }
                      : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <tab.Icon size={13} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search + tipo pills — solo en tab Bienes */}
              {activeTab === 'bienes' && (
                <div className="pb-5">
                  <div className="relative mb-4">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: 'rgba(255,255,255,0.35)' }} />
                    <input
                      type="text"
                      placeholder="Busca por nombre, marca, modelo o código..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full max-w-xl pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#ffffff',
                      }}
                    />
                  </div>

                  {/* Tipo pills */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setTipoFilter('ALL')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                      style={tipoFilter === 'ALL'
                        ? { background: '#02d47e', color: '#043941' }
                        : { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                      Todos {bienes.length}
                    </button>
                    {TIPOS.filter(t => tipoCounts[t.key]).map(t => (
                      <button key={t.key}
                        onClick={() => setTipoFilter(t.key)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                        style={tipoFilter === t.key
                          ? { background: 'rgba(255,255,255,0.95)', color: '#043941' }
                          : { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                        <t.Icon size={10} />
                        {t.label} {tipoCounts[t.key]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Body blanco ── */}
          <div style={{ background: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-6 py-6">

              {/* ── Tab Bienes ── */}
              {activeTab === 'bienes' && (
                <>
                  {/* Zona chips */}
                  <div className="flex flex-wrap items-center gap-2 mb-3 pb-4 border-b" style={{ borderColor: '#f0f4f6' }}>
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
                      style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
                      <Filter size={10} /> Filtros
                    </span>
                    {ZONA_KEYS.map(zk => (
                      <button key={zk}
                        onClick={() => setZonaFilters(prev =>
                          prev.includes(zk) ? prev.filter(z => z !== zk) : [...prev, zk]
                        )}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                        style={zonaFilters.includes(zk)
                          ? { background: accentAlpha(0.1), borderColor: accent, color: '#043941' }
                          : { background: 'white', borderColor: '#e2e8f0', color: '#64748b' }}>
                        {ZONA_SHORT[zk] ?? zk}
                      </button>
                    ))}
                  </div>

                  {/* Count */}
                  <p className="text-xs font-semibold mb-4" style={{ color: '#94a3b8' }}>
                    {filteredBienes.length} de {bienes.length} bienes
                  </p>

                  {/* Grid */}
                  {filteredBienes.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {filteredBienes.map((bien, i) => (
                        <BienCard key={i} bien={bien} accent={accent} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-sm font-semibold mb-1" style={{ color: '#043941' }}>Sin resultados</p>
                      <p className="text-xs" style={{ color: '#94a3b8' }}>Prueba con otro término o quita filtros</p>
                    </div>
                  )}
                </>
              )}

              {/* ── Tab Manuales ── */}
              {activeTab === 'manuales' && (
                <div className="text-center py-20">
                  <div className="h-16 w-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: '#f1f5f9' }}>
                    <FileText size={24} style={{ color: '#94a3b8' }} />
                  </div>
                  <p className="font-bold text-sm mb-1" style={{ color: '#043941' }}>Próximamente</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    Manuales técnicos y guías de uso del equipamiento
                  </p>
                </div>
              )}

              {/* ── Tab Videos ── */}
              {activeTab === 'videos' && (
                <div className="text-center py-20">
                  <div className="h-16 w-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: '#f1f5f9' }}>
                    <Play size={24} style={{ color: '#94a3b8' }} />
                  </div>
                  <p className="font-bold text-sm mb-1" style={{ color: '#043941' }}>Próximamente</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    Videos de demostración y tutoriales por equipo
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Final ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#043941' }}>
        <div className="absolute inset-0 grama-pattern opacity-25" />
        <div className="absolute pointer-events-none" style={{
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(2,212,126,0.15) 0%, transparent 65%)',
          right: -60, bottom: -60,
        }} />
        <TangramDecor accent="#02d47e" className="absolute top-0 left-0 h-64 w-64 opacity-30" />

        <div className="relative z-10 max-w-xl mx-auto px-6 py-20 text-center">
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
            <a href="mailto:soporte@grama.pe"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: '#02d47e', color: '#043941' }}>
              <Mail size={15} />
              Comunícate con nosotros
            </a>
            <button onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.12)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.13)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}>
              Ya tengo cuenta <ChevronRight size={15} />
            </button>
          </div>
        </div>

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
