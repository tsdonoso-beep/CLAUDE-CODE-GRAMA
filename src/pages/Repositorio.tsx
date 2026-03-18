// src/pages/Repositorio.tsx
import { useState, useMemo } from 'react'
import { Search, X, SlidersHorizontal, Package, Wrench, Sofa, BookOpen, HardHat, Factory } from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { RepositorioCard } from '@/components/lxp/RepositorioCard'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Bien = Record<string, any>

const TIPO_ICONS: Record<string, React.ElementType> = {
  EQUIPOS: Package,
  HERRAMIENTAS: Wrench,
  MOBILIARIO: Sofa,
  PEDAGOGICO: BookOpen,
  'PRODUCCIÓN': Factory,
  SEGURIDAD: HardHat,
}

export default function Repositorio() {
  const { taller, bienes, totalBienes } = useTaller()
  const [busqueda, setBusqueda] = useState('')
  const [filtroZona, setFiltroZona] = useState('')
  const [filtroArea, setFiltroArea] = useState('')
  const [filtroSubarea, setFiltroSubarea] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [showFiltros, setShowFiltros] = useState(false)

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
        (!filtroTipo    || b.tipo    === filtroTipo)
      )
    })
  , [bienes, busqueda, filtroZona, filtroArea, filtroSubarea, filtroTipo])

  if (!taller) return null

  const hayFiltros = busqueda || filtroZona || filtroArea || filtroSubarea || filtroTipo
  const activeCount = [filtroZona, filtroArea, filtroSubarea, filtroTipo].filter(Boolean).length

  function resetFiltros() {
    setBusqueda(''); setFiltroZona(''); setFiltroArea(''); setFiltroSubarea(''); setFiltroTipo('')
  }

  // Stats por tipo para el hero
  const statsTipo = tipos.map(t => ({
    tipo: t,
    count: bienes.filter((b: Bien) => b.tipo === t).length,
    Icon: TIPO_ICONS[t] ?? Package,
  }))

  return (
    <div style={{ background: '#f0fdf8', minHeight: '100vh' }}>

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: '#043941' }}>
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #02d47e 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />
        </div>

        <div className="relative px-6 pt-10 pb-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#02d47e' }}>
            {taller.nombreCorto} · Repositorio
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 leading-tight">
            Recursos del Taller
          </h1>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {totalBienes} bienes catalogados · {zonas.length} zonas
          </p>

          {/* Search bar embebido en el hero */}
          <div className="relative max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#02d47e' }} />
            <input
              type="text"
              placeholder="Busca por nombre, marca, modelo o código…"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium outline-none"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                border: '1.5px solid rgba(2,212,126,0.3)',
              }}
              onFocus={e => (e.target.style.borderColor = '#02d47e')}
              onBlur={e => (e.target.style.borderColor = 'rgba(2,212,126,0.3)')}
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Stats mini chips */}
          <div className="flex flex-wrap gap-2 mt-5">
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
                <span className="font-bold" style={{ opacity: 0.7 }}>{count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ BARRA DE FILTROS ════════════════════════════════════════════ */}
      <div className="sticky top-0 z-20 px-4 py-3 border-b shadow-sm" style={{ background: '#ffffff', borderColor: '#d1fae5' }}>
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">

          {/* Toggle panel de filtros avanzados */}
          <button
            onClick={() => setShowFiltros(!showFiltros)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all"
            style={{
              background: showFiltros || activeCount > 0 ? '#043941' : '#f0fdf8',
              color: showFiltros || activeCount > 0 ? '#02d47e' : '#043941',
              border: '1.5px solid',
              borderColor: showFiltros || activeCount > 0 ? '#043941' : '#d1fae5',
            }}
          >
            <SlidersHorizontal size={12} />
            Filtros
            {activeCount > 0 && (
              <span className="ml-0.5 w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center"
                style={{ background: '#02d47e', color: '#043941' }}>
                {activeCount}
              </span>
            )}
          </button>

          <div className="w-px h-5 shrink-0" style={{ background: '#d1fae5' }} />

          {/* Zona pills - scroll horizontal */}
          {zonas.map(z => (
            <button
              key={z}
              onClick={() => { setFiltroZona(filtroZona === z ? '' : z); setFiltroArea(''); setFiltroSubarea('') }}
              className="shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
              style={{
                background: filtroZona === z ? '#043941' : '#f0fdf8',
                color: filtroZona === z ? '#02d47e' : '#045f6c',
                border: '1.5px solid',
                borderColor: filtroZona === z ? '#043941' : '#d1fae5',
              }}
            >
              {z.replace('ZONA DE ', '').replace('DEPÓSITO / ALMACÉN / SEGURIDAD', 'DEPÓSITO')}
            </button>
          ))}

          {/* Limpiar */}
          {hayFiltros && (
            <>
              <div className="w-px h-5 shrink-0" style={{ background: '#d1fae5' }} />
              <button
                onClick={resetFiltros}
                className="flex items-center gap-1 shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                style={{ color: '#ef4444', background: '#fff1f2', border: '1.5px solid #fecdd3' }}
              >
                <X size={11} />
                Limpiar
              </button>
            </>
          )}
        </div>

        {/* Panel expandible: area + subarea */}
        {showFiltros && (filtroZona) && (
          <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t" style={{ borderColor: '#d1fae5' }}>
            {areas.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-xs font-bold" style={{ color: '#94a3b8' }}>Área:</span>
                {areas.map(a => (
                  <button
                    key={a}
                    onClick={() => { setFiltroArea(filtroArea === a ? '' : a); setFiltroSubarea('') }}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: filtroArea === a ? '#e0f2fe' : '#f8fafc',
                      color: filtroArea === a ? '#0369a1' : '#64748b',
                      border: `1px solid ${filtroArea === a ? '#bae6fd' : '#e2e8f0'}`,
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}
            {filtroArea && subareas.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center w-full">
                <span className="text-xs font-bold" style={{ color: '#94a3b8' }}>Sub-área:</span>
                {subareas.map(s => (
                  <button
                    key={s}
                    onClick={() => setFiltroSubarea(filtroSubarea === s ? '' : s)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: filtroSubarea === s ? '#fef3c7' : '#f8fafc',
                      color: filtroSubarea === s ? '#92400e' : '#64748b',
                      border: `1px solid ${filtroSubarea === s ? '#fde68a' : '#e2e8f0'}`,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <p className="text-xs mt-2 font-semibold" style={{ color: '#64748b' }}>
          {bienesFiltered.length === totalBienes
            ? `${totalBienes} bienes`
            : `${bienesFiltered.length} de ${totalBienes} bienes`}
        </p>
      </div>

      {/* ══ GRID ════════════════════════════════════════════════════════ */}
      <div className="p-4 sm:p-6">
        {bienesFiltered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bienesFiltered.map((bien: Bien) => (
              <RepositorioCard key={bien.n} bien={bien} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: '#e0fef3' }}>
              <Search size={26} style={{ color: '#02d47e' }} />
            </div>
            <p className="text-base font-bold mb-1" style={{ color: '#043941' }}>Sin resultados</p>
            <p className="text-sm mb-5" style={{ color: '#94a3b8' }}>
              Prueba con otro término o cambia los filtros
            </p>
            <button
              onClick={resetFiltros}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: '#043941' }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
