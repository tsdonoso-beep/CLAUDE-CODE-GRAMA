// src/pages/Repositorio.tsx
import { useState, useMemo } from 'react'
import {
  Search, X, SlidersHorizontal, Package, Wrench as WrenchLucide, Sofa, BookOpen,
  HardHat, FileText, Video, PlayCircle, ChevronRight, BookMarked,
  Wrench, GraduationCap, Usb,
} from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { RepositorioCard } from '@/components/lxp/RepositorioCard'
import { useNavigate, useSearchParams } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Bien = Record<string, any>
type Tab = 'bienes' | 'manuales' | 'videos'

const TIPO_ICONS: Record<string, React.ElementType> = {
  EQUIPOS: Package, HERRAMIENTAS: WrenchLucide, MOBILIARIO: Sofa,
  PEDAGOGICO: BookOpen, SEGURIDAD: HardHat,
}

// Excluir del catálogo: manuales, videos, USB y capacitación (tienen sus propias pestañas)
function esExcluidoDeCatalogo(nombre: string): boolean {
  const n = nombre.toLowerCase()
  // Manuales y videos van a sus propias pestañas; los USB son bienes físicos y sí aparecen aquí
  return n.startsWith('manual') || n.startsWith('video')
}

// ── Clasificadores por nombre ─────────────────────────────────────────────────
// Regla principal: el nombre DEBE contener 'manual' para pertenecer a la sección Manuales
function esManual(nombre: string) {
  return nombre.toLowerCase().includes('manual')
}
function esManualUso(nombre: string) {
  const n = nombre.toLowerCase()
  return n.includes('manual') && (n.includes('uso') || n.includes('operaci') || n.includes('instalac'))
    && !n.includes('mantenimiento') && !n.includes('pedagóg') && !n.includes('pedagogic')
}
function esManualMantenimiento(nombre: string) {
  const n = nombre.toLowerCase()
  return n.includes('manual') && (n.includes('mantenimiento') || n.includes('mantención'))
}
function esManualPedagogico(nombre: string) {
  const n = nombre.toLowerCase()
  return n.includes('manual') && (n.includes('pedagóg') || n.includes('pedagogic'))
}
function esVideo(nombre: string) {
  const n = nombre.toLowerCase()
  return n.includes('video') || n.includes('tutorial') || n.includes('audiovisual')
}

export default function Repositorio() {
  const { taller, bienes, totalBienes, slug } = useTaller()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState<Tab>('bienes')

  // ── Catálogo ──────────────────────────────────────────────────────────────
  const [busqueda, setBusqueda] = useState('')
  const [filtroZona, setFiltroZona] = useState(() => searchParams.get('zona') ?? '')
  const [filtroArea, setFiltroArea] = useState('')
  const [filtroSubarea, setFiltroSubarea] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [showFiltros, setShowFiltros] = useState(false)

  // ── Manuales ──────────────────────────────────────────────────────────────
  const [busquedaManual, setBusquedaManual] = useState('')
  const [filtroManual, setFiltroManual] = useState<'todos' | 'uso' | 'mantenimiento' | 'pedagogico'>('todos')

  // ── Videos ────────────────────────────────────────────────────────────────
  const [busquedaVideo, setBusquedaVideo] = useState('')

  const zonas = useMemo(() =>
    [...new Set(bienes.map((b: Bien) => b.zona).filter(Boolean))].sort() as string[]
  , [bienes])

  const areas = useMemo(() =>
    [...new Set(
      bienes.filter((b: Bien) => !filtroZona || b.zona === filtroZona)
        .map((b: Bien) => b.area).filter(Boolean)
    )].sort() as string[]
  , [bienes, filtroZona])

  const subareas = useMemo(() =>
    [...new Set(
      bienes
        .filter((b: Bien) => (!filtroZona || b.zona === filtroZona) && (!filtroArea || b.area === filtroArea))
        .map((b: Bien) => b.subarea).filter(Boolean)
    )].sort() as string[]
  , [bienes, filtroZona, filtroArea])

  const tipos = useMemo(() =>
    [...new Set(bienes.map((b: Bien) => b.tipo).filter(Boolean))].sort() as string[]
  , [bienes])

  const bienesFiltered = useMemo(() =>
    bienes.filter((b: Bien) => {
      const q = busqueda.toLowerCase()
      return (
        (!q || b.nombre?.toLowerCase().includes(q) || b.marca?.toLowerCase().includes(q) ||
          b.modelo?.toLowerCase().includes(q) || b.codigoEntidad?.toLowerCase().includes(q)) &&
        (!filtroZona    || b.zona    === filtroZona) &&
        (!filtroArea    || b.area    === filtroArea) &&
        (!filtroSubarea || b.subarea === filtroSubarea) &&
        (!filtroTipo    || b.tipo    === filtroTipo) &&
        !esExcluidoDeCatalogo(b.nombre ?? '')
      )
    })
  , [bienes, busqueda, filtroZona, filtroArea, filtroSubarea, filtroTipo])

  // ── Manuales: solo ítems cuyo nombre contiene 'manual' ──────────────────
  const bienesManual = useMemo(() => {
    const soloManuales = bienes.filter((b: Bien) => esManual(b.nombre ?? ''))
    const q = busquedaManual.toLowerCase()
    return soloManuales.filter((b: Bien) => {
      const matchQ = !q || b.nombre?.toLowerCase().includes(q) || b.zona?.toLowerCase().includes(q)
      if (!matchQ) return false
      if (filtroManual === 'uso')           return esManualUso(b.nombre ?? '')
      if (filtroManual === 'mantenimiento') return esManualMantenimiento(b.nombre ?? '')
      if (filtroManual === 'pedagogico')    return esManualPedagogico(b.nombre ?? '')
      return true // todos
    })
  }, [bienes, busquedaManual, filtroManual])

  // Conteos por categoría de manual
  const conteos = useMemo(() => {
    const soloManuales = bienes.filter((b: Bien) => esManual(b.nombre ?? ''))
    return {
      uso:           soloManuales.filter((b: Bien) => esManualUso(b.nombre ?? '')).length,
      mantenimiento: soloManuales.filter((b: Bien) => esManualMantenimiento(b.nombre ?? '')).length,
      pedagogico:    soloManuales.filter((b: Bien) => esManualPedagogico(b.nombre ?? '')).length,
      total:         soloManuales.length,
    }
  }, [bienes])

  // ── Videos: bienes con nombre de video ───────────────────────────────────
  const bienesVideo = useMemo(() => {
    const q = busquedaVideo.toLowerCase()
    return bienes.filter((b: Bien) =>
      esVideo(b.nombre ?? '') &&
      (!q || b.nombre?.toLowerCase().includes(q) || b.zona?.toLowerCase().includes(q))
    )
  }, [bienes, busquedaVideo])

  if (!taller) return null

  const hayFiltros = busqueda || filtroZona || filtroArea || filtroSubarea || filtroTipo
  const activeCount = [filtroZona, filtroArea, filtroSubarea, filtroTipo].filter(Boolean).length
  const statsTipo = tipos.map(t => ({
    tipo: t, count: bienes.filter((b: Bien) => b.tipo === t).length, Icon: TIPO_ICONS[t] ?? Package,
  }))

  function resetFiltros() {
    setBusqueda(''); setFiltroZona(''); setFiltroArea(''); setFiltroSubarea(''); setFiltroTipo('')
  }

  // Función para obtener ícono y color de categoría de manual
  function getManualMeta(nombre: string) {
    if (esManualUso(nombre))
      return { icon: BookMarked, color: '#059669', bg: '#d1fae5', label: 'Uso' }
    if (esManualMantenimiento(nombre))
      return { icon: Wrench, color: '#d97706', bg: '#fef3c7', label: 'Mantenimiento' }
    if (esManualPedagogico(nombre))
      return { icon: GraduationCap, color: '#7c3aed', bg: '#ede9fe', label: 'Pedagógico' }
    if (esUsb(nombre))
      return { icon: Usb, color: '#0891b2', bg: '#cffafe', label: 'Digital/USB' }
    return { icon: FileText, color: '#64748b', bg: '#f1f5f9', label: 'Documento' }
  }

  return (
    <div style={{ background: '#f0fdf8', minHeight: '100vh' }}>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: '#043941' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #02d47e 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />
        </div>

        <div className="relative px-6 pt-10 pb-0">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#02d47e' }}>
            {taller.nombreCorto} · Repositorio
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 leading-tight">
            Recursos del Taller
          </h1>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {totalBienes} bienes catalogados · {zonas.length} zonas
          </p>

          {/* 1. TABS — primero */}
          <div className="flex gap-2 mb-5">
            {([
              { id: 'bienes',   label: 'Bienes',   icon: Package  },
              { id: 'manuales', label: 'Manuales', icon: FileText },
              { id: 'videos',   label: 'Videos',   icon: Video    },
            ] as { id: Tab; label: string; icon: React.ElementType }[]).map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all"
                style={{
                  background: tab === t.id ? '#ffffff' : 'rgba(255,255,255,0.1)',
                  color:      tab === t.id ? '#043941' : 'rgba(255,255,255,0.6)',
                  border: tab === t.id ? 'none' : '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <t.icon size={13} />
                {t.label}
              </button>
            ))}
          </div>

          {/* 2. BUSCADOR — segundo */}
          {tab === 'bienes' && (
            <div className="relative max-w-xl mb-4">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#02d47e' }} />
              <input
                type="text"
                placeholder="Busca por nombre, marca, modelo o código…"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-sm font-medium outline-none"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1.5px solid rgba(2,212,126,0.3)' }}
                onFocus={e => (e.target.style.borderColor = '#02d47e')}
                onBlur={e => (e.target.style.borderColor = 'rgba(2,212,126,0.3)')}
              />
              {busqueda && (
                <button onClick={() => setBusqueda('')} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {tab === 'manuales' && (
            <div className="relative max-w-xl mb-4">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#02d47e' }} />
              <input
                type="text"
                placeholder="Busca manuales por nombre o zona…"
                value={busquedaManual}
                onChange={e => setBusquedaManual(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-sm font-medium outline-none"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1.5px solid rgba(2,212,126,0.3)' }}
                onFocus={e => (e.target.style.borderColor = '#02d47e')}
                onBlur={e => (e.target.style.borderColor = 'rgba(2,212,126,0.3)')}
              />
              {busquedaManual && (
                <button onClick={() => setBusquedaManual('')} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {tab === 'videos' && (
            <div className="relative max-w-xl mb-4">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#02d47e' }} />
              <input
                type="text"
                placeholder="Busca videos por nombre o zona…"
                value={busquedaVideo}
                onChange={e => setBusquedaVideo(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-sm font-medium outline-none"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1.5px solid rgba(2,212,126,0.3)' }}
                onFocus={e => (e.target.style.borderColor = '#02d47e')}
                onBlur={e => (e.target.style.borderColor = 'rgba(2,212,126,0.3)')}
              />
              {busquedaVideo && (
                <button onClick={() => setBusquedaVideo('')} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* 3. SUB-FILTROS — tercero */}
          {tab === 'bienes' && (
            <div className="flex flex-wrap gap-2 pb-5">
              <button
                onClick={() => setFiltroTipo('')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: !filtroTipo ? '#02d47e' : 'rgba(255,255,255,0.08)',
                  color: !filtroTipo ? '#043941' : 'rgba(255,255,255,0.7)',
                  border: `1.5px solid ${!filtroTipo ? '#02d47e' : 'rgba(255,255,255,0.12)'}`,
                }}
              >
                Todos
                <span className="font-black opacity-70">{statsTipo.reduce((acc, s) => acc + s.count, 0)}</span>
              </button>
              {statsTipo.map(({ tipo, count, Icon }) => (
                <button
                  key={tipo}
                  onClick={() => setFiltroTipo(filtroTipo === tipo ? '' : tipo)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: filtroTipo === tipo ? '#02d47e' : 'rgba(255,255,255,0.08)',
                    color: filtroTipo === tipo ? '#043941' : 'rgba(255,255,255,0.7)',
                    border: `1.5px solid ${filtroTipo === tipo ? '#02d47e' : 'rgba(255,255,255,0.12)'}`,
                  }}
                >
                  <Icon size={11} />
                  {tipo.charAt(0) + tipo.slice(1).toLowerCase()}
                  <span className="font-black opacity-70">{count}</span>
                </button>
              ))}
            </div>
          )}

          {tab === 'manuales' && (
            <div className="flex flex-wrap gap-2 pb-5">
              {([
                { id: 'todos',         label: 'Todos',         count: conteos.total,         color: '#02d47e' },
                { id: 'uso',           label: 'Uso',           count: conteos.uso,           color: '#059669' },
                { id: 'mantenimiento', label: 'Mantenimiento', count: conteos.mantenimiento, color: '#d97706' },
                { id: 'pedagogico',    label: 'Pedagógico',    count: conteos.pedagogico,    color: '#7c3aed' },
              ] as const).map(f => (
                <button
                  key={f.id}
                  onClick={() => setFiltroManual(f.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: filtroManual === f.id ? f.color : 'rgba(255,255,255,0.08)',
                    color: filtroManual === f.id ? '#fff' : 'rgba(255,255,255,0.65)',
                    border: `1.5px solid ${filtroManual === f.id ? f.color : 'rgba(255,255,255,0.12)'}`,
                  }}
                >
                  {f.label}
                  <span className="font-black opacity-80">{f.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══ TAB: CATÁLOGO ═══════════════════════════════════════════════════ */}
      {tab === 'bienes' && (
        <>
          <div className="sticky top-0 z-20 px-4 py-3 border-b shadow-sm" style={{ background: '#ffffff', borderColor: '#d1fae5' }}>
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              <button
                onClick={() => setShowFiltros(!showFiltros)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all"
                style={{
                  background: showFiltros || activeCount > 0 ? '#043941' : '#f0fdf8',
                  color: showFiltros || activeCount > 0 ? '#02d47e' : '#043941',
                  border: '1.5px solid', borderColor: showFiltros || activeCount > 0 ? '#043941' : '#d1fae5',
                }}
              >
                <SlidersHorizontal size={12} />
                Filtros
                {activeCount > 0 && (
                  <span className="w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center"
                    style={{ background: '#02d47e', color: '#043941' }}>
                    {activeCount}
                  </span>
                )}
              </button>

              <div className="w-px h-5 shrink-0" style={{ background: '#d1fae5' }} />

              {zonas.map(z => (
                <button key={z}
                  onClick={() => { setFiltroZona(filtroZona === z ? '' : z); setFiltroArea(''); setFiltroSubarea('') }}
                  className="shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
                  style={{
                    background: filtroZona === z ? '#043941' : '#f0fdf8',
                    color: filtroZona === z ? '#02d47e' : '#045f6c',
                    border: '1.5px solid', borderColor: filtroZona === z ? '#043941' : '#d1fae5',
                  }}
                >
                  {z.replace('ZONA DE ', '').replace('DEPÓSITO / ALMACÉN / SEGURIDAD', 'DEPÓSITO').replace('INVESTIGACIÓN, GESTIÓN Y DISEÑO', 'INV. Y DISEÑO')}
                </button>
              ))}

              {hayFiltros && (
                <>
                  <div className="w-px h-5 shrink-0" style={{ background: '#d1fae5' }} />
                  <button onClick={resetFiltros}
                    className="flex items-center gap-1 shrink-0 px-3 py-2 rounded-xl text-xs font-bold"
                    style={{ color: '#ef4444', background: '#fff1f2', border: '1.5px solid #fecdd3' }}>
                    <X size={11} /> Limpiar
                  </button>
                </>
              )}
            </div>

            {showFiltros && filtroZona && (
              <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t" style={{ borderColor: '#d1fae5' }}>
                {areas.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-xs font-bold" style={{ color: '#94a3b8' }}>Área:</span>
                    {areas.map(a => (
                      <button key={a}
                        onClick={() => { setFiltroArea(filtroArea === a ? '' : a); setFiltroSubarea('') }}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          background: filtroArea === a ? '#e0f2fe' : '#f8fafc',
                          color: filtroArea === a ? '#0369a1' : '#64748b',
                          border: `1px solid ${filtroArea === a ? '#bae6fd' : '#e2e8f0'}`,
                        }}>
                        {a}
                      </button>
                    ))}
                  </div>
                )}
                {filtroArea && subareas.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 items-center w-full">
                    <span className="text-xs font-bold" style={{ color: '#94a3b8' }}>Sub-área:</span>
                    {subareas.map(s => (
                      <button key={s}
                        onClick={() => setFiltroSubarea(filtroSubarea === s ? '' : s)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          background: filtroSubarea === s ? '#fef3c7' : '#f8fafc',
                          color: filtroSubarea === s ? '#92400e' : '#64748b',
                          border: `1px solid ${filtroSubarea === s ? '#fde68a' : '#e2e8f0'}`,
                        }}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <p className="text-xs mt-2 font-semibold" style={{ color: '#64748b' }}>
              {bienesFiltered.length === totalBienes ? `${totalBienes} bienes` : `${bienesFiltered.length} de ${totalBienes} bienes`}
            </p>
          </div>

          <div className="p-4 sm:p-6">
            {bienesFiltered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {bienesFiltered.map((bien: Bien) => (
                  <RepositorioCard key={bien.n} bien={bien} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#e0fef3' }}>
                  <Search size={26} style={{ color: '#02d47e' }} />
                </div>
                <p className="text-base font-bold mb-1" style={{ color: '#043941' }}>Sin resultados</p>
                <button onClick={resetFiltros} className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#043941' }}>
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ══ TAB: MANUALES ═══════════════════════════════════════════════════ */}
      {tab === 'manuales' && (
        <div className="p-4 sm:p-6">

          {/* Resumen categórico — tarjetas de acceso rápido */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {([
              { id: 'uso',           label: 'Manual de Uso',        icon: BookMarked,    color: '#059669', bg: '#d1fae5', count: conteos.uso,           desc: 'Operación y manejo seguro del equipo' },
              { id: 'mantenimiento', label: 'Mantenimiento',        icon: Wrench,        color: '#d97706', bg: '#fef3c7', count: conteos.mantenimiento, desc: 'Limpieza, revisión y mantenimiento preventivo' },
              { id: 'pedagogico',    label: 'Material Pedagógico',  icon: GraduationCap, color: '#7c3aed', bg: '#ede9fe', count: conteos.pedagogico,    desc: 'Guías y sesiones para el docente' },
            ] as const).map(cat => {
              const Icon = cat.icon
              const active = filtroManual === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setFiltroManual(active ? 'todos' : cat.id)}
                  className="flex flex-col gap-2 p-4 rounded-2xl text-left transition-all"
                  style={{
                    background: active ? cat.color : '#ffffff',
                    border: `2px solid ${active ? cat.color : '#e2e8f0'}`,
                    boxShadow: active ? `0 4px 16px ${cat.color}33` : 'none',
                    transform: active ? 'translateY(-2px)' : 'none',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center"
                      style={{ background: active ? 'rgba(255,255,255,0.2)' : cat.bg }}>
                      <Icon size={16} style={{ color: active ? '#fff' : cat.color }} />
                    </div>
                    <span className="text-xl font-black" style={{ color: active ? '#fff' : cat.color }}>
                      {cat.count}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight" style={{ color: active ? '#fff' : '#0f172a' }}>
                      {cat.label}
                    </p>
                    <p className="text-[10px] mt-0.5 leading-snug" style={{ color: active ? 'rgba(255,255,255,0.7)' : '#94a3b8' }}>
                      {cat.desc}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Resultado: lista de manuales */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold" style={{ color: '#64748b' }}>
              {bienesManual.length} {bienesManual.length === 1 ? 'manual' : 'manuales'}
              {filtroManual !== 'todos' ? ` · filtro activo` : ''}
            </p>
            {(busquedaManual || filtroManual !== 'todos') && (
              <button
                onClick={() => { setBusquedaManual(''); setFiltroManual('todos'); }}
                className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg"
                style={{ color: '#ef4444', background: '#fff1f2', border: '1px solid #fecdd3' }}
              >
                <X size={11} /> Limpiar
              </button>
            )}
          </div>

          {bienesManual.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 rounded-2xl" style={{ background: '#f8fafc' }}>
              <FileText size={32} style={{ color: '#cbd5e1' }} />
              <p className="mt-3 text-sm font-bold" style={{ color: '#94a3b8' }}>Sin manuales en esta categoría</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {bienesManual.map((b: Bien) => {
                const meta = getManualMeta(b.nombre ?? '')
                const MetaIcon = meta.icon
                return (
                  <button
                    key={b.n}
                    onClick={() => navigate(`/taller/${slug}/repositorio/bien/${b.n}`)}
                    className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all group"
                    style={{ background: '#ffffff', border: '1.5px solid #e2e8f0' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = meta.color
                      el.style.boxShadow = `0 4px 12px ${meta.color}22`
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = '#e2e8f0'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    {/* Ícono categoría */}
                    <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: meta.bg }}>
                      <MetaIcon size={18} style={{ color: meta.color }} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold leading-snug" style={{ color: '#0f172a' }}>
                        {b.nombre}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                          style={{ background: meta.bg, color: meta.color }}>
                          {meta.label}
                        </span>
                        {b.zona && (
                          <span className="text-[10px] font-medium" style={{ color: '#94a3b8' }}>
                            {b.zona.replace('ZONA DE ', '').replace('DEPÓSITO / ALMACÉN / SEGURIDAD', 'DEPÓSITO').replace('INVESTIGACIÓN, GESTIÓN Y DISEÑO', 'INV. Y DISEÑO')}
                          </span>
                        )}
                        {b.cantidad > 1 && (
                          <span className="text-[10px] font-medium" style={{ color: '#cbd5e1' }}>
                            ×{b.cantidad}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Descripción truncada */}
                    {b.descripcion && (
                      <p className="hidden lg:block text-xs max-w-xs leading-snug line-clamp-2 shrink-0"
                        style={{ color: '#94a3b8', maxWidth: 280 }}>
                        {b.descripcion.slice(0, 120)}…
                      </p>
                    )}

                    <ChevronRight size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: meta.color }} />
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ══ TAB: VIDEOS ═════════════════════════════════════════════════════ */}
      {tab === 'videos' && (
        <div className="p-4 sm:p-6">

          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold" style={{ color: '#64748b' }}>
              {bienesVideo.length} {bienesVideo.length === 1 ? 'video' : 'videos'} disponibles
            </p>
            {busquedaVideo && (
              <button
                onClick={() => setBusquedaVideo('')}
                className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg"
                style={{ color: '#ef4444', background: '#fff1f2', border: '1px solid #fecdd3' }}
              >
                <X size={11} /> Limpiar
              </button>
            )}
          </div>

          {bienesVideo.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl" style={{ background: '#f8fafc' }}>
              <Video size={32} style={{ color: '#cbd5e1' }} />
              <p className="mt-3 text-sm font-bold" style={{ color: '#94a3b8' }}>No hay videos que coincidan</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {bienesVideo.map((b: Bien) => (
                <VideoCard key={b.n} bien={b} slug={slug} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Video Card ────────────────────────────────────────────────────────────────
function VideoCard({ bien, slug, navigate }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bien: any; slug: string; navigate: (path: string) => void
}) {
  return (
    <button
      onClick={() => navigate(`/taller/${slug}/repositorio/bien/${bien.n}`)}
      className="w-full text-left rounded-2xl overflow-hidden border-2 transition-all group"
      style={{ borderColor: '#e2e8f0', background: '#ffffff' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = '#0891b2'
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 8px 20px rgba(8,145,178,0.12)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = '#e2e8f0'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Thumbnail */}
      <div className="aspect-video flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.12)' }}>
          <PlayCircle size={24} style={{ color: 'rgba(255,255,255,0.7)' }} />
        </div>
        {bien.zona && (
          <span className="absolute bottom-2 left-3 text-[9px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.7)' }}>
            {bien.zona.replace('ZONA DE ', '')}
          </span>
        )}
        <span className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(8,145,178,0.8)', color: '#fff' }}>
          VIDEO
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-bold leading-snug line-clamp-2 mb-1.5" style={{ color: '#0f172a' }}>
          {bien.nombre}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
            style={{ background: '#cffafe', color: '#0891b2' }}>
            {bien.cantidad > 1 ? `${bien.cantidad} unidades` : 'Tutorial'}
          </span>
          <ChevronRight size={12} style={{ color: '#94a3b8' }} />
        </div>
      </div>
    </button>
  )
}
