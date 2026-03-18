// src/pages/Repositorio.tsx
import { useState, useMemo } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { RepositorioCard } from '@/components/lxp/RepositorioCard'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Bien = Record<string, any>

export default function Repositorio() {
  const { taller, bienes, totalBienes } = useTaller()
  const [busqueda, setBusqueda] = useState('')
  const [filtroZona, setFiltroZona] = useState('')
  const [filtroArea, setFiltroArea] = useState('')
  const [filtroSubarea, setFiltroSubarea] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')

  // ── Valores únicos directamente del JSON ──
  const zonas = useMemo(() =>
    [...new Set(bienes.map((b: Bien) => b.zona).filter(Boolean))].sort() as string[]
  , [bienes])

  const areas = useMemo(() =>
    [...new Set(
      bienes
        .filter((b: Bien) => !filtroZona || b.zona === filtroZona)
        .map((b: Bien) => b.area)
        .filter(Boolean)
    )].sort() as string[]
  , [bienes, filtroZona])

  const subareas = useMemo(() =>
    [...new Set(
      bienes
        .filter((b: Bien) => (!filtroZona || b.zona === filtroZona) && (!filtroArea || b.area === filtroArea))
        .map((b: Bien) => b.subarea)
        .filter(Boolean)
    )].sort() as string[]
  , [bienes, filtroZona, filtroArea])

  const tipos = useMemo(() =>
    [...new Set(bienes.map((b: Bien) => b.tipo).filter(Boolean))].sort() as string[]
  , [bienes])

  const bienesFiltered = useMemo(() =>
    bienes.filter((b: Bien) => {
      const q = busqueda.toLowerCase()
      const matchQ = !q ||
        b.nombre?.toLowerCase().includes(q) ||
        b.marca?.toLowerCase().includes(q) ||
        b.modelo?.toLowerCase().includes(q) ||
        b.codigoEntidad?.toLowerCase().includes(q)
      return matchQ &&
        (!filtroZona    || b.zona    === filtroZona) &&
        (!filtroArea    || b.area    === filtroArea) &&
        (!filtroSubarea || b.subarea === filtroSubarea) &&
        (!filtroTipo    || b.tipo    === filtroTipo)
    })
  , [bienes, busqueda, filtroZona, filtroArea, filtroSubarea, filtroTipo])

  if (!taller) return null

  function resetFiltros() {
    setBusqueda(''); setFiltroZona(''); setFiltroArea(''); setFiltroSubarea(''); setFiltroTipo('')
  }

  const hayFiltros = busqueda || filtroZona || filtroArea || filtroSubarea || filtroTipo

  return (
    <div>
      {/* ── Hero ── */}
      <div className="px-8 py-10 grama-pattern" style={{ background: '#043941' }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#02d47e' }}>
          {taller.nombreCorto}
        </p>
        <h1 className="text-3xl font-extrabold text-white mb-2">Repositorio de Recursos</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
          {totalBienes} bienes · {zonas.length} zonas
        </p>
      </div>

      {/* ── Filtros ── */}
      <div className="px-6 py-4 border-b" style={{ background: '#ffffff', borderColor: '#e3f8fb' }}>
        <div className="flex flex-wrap gap-3">
          {/* Buscador */}
          <div className="relative flex-1 min-w-52">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#045f6c' }} />
            <input
              type="text"
              placeholder="Nombre, marca, modelo, código…"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 text-sm outline-none transition-all"
              style={{ borderColor: '#e3f8fb', color: '#043941', background: '#fafffe' }}
              onFocus={e => (e.target.style.borderColor = '#02d47e')}
              onBlur={e => (e.target.style.borderColor = '#e3f8fb')}
            />
          </div>

          {/* Zona */}
          <SelectFiltro
            value={filtroZona}
            placeholder="Zona"
            options={zonas}
            onChange={v => { setFiltroZona(v); setFiltroArea(''); setFiltroSubarea('') }}
          />

          {/* Area (solo si hay zona seleccionada y tiene areas) */}
          {filtroZona && areas.length > 0 && (
            <SelectFiltro
              value={filtroArea}
              placeholder="Área"
              options={areas}
              onChange={v => { setFiltroArea(v); setFiltroSubarea('') }}
            />
          )}

          {/* Subarea (solo si hay area y tiene subareas) */}
          {filtroArea && subareas.length > 0 && (
            <SelectFiltro
              value={filtroSubarea}
              placeholder="Sub-área"
              options={subareas}
              onChange={setFiltroSubarea}
            />
          )}

          {/* Tipo */}
          <SelectFiltro
            value={filtroTipo}
            placeholder="Tipo"
            options={tipos}
            onChange={setFiltroTipo}
          />

          {/* Limpiar */}
          {hayFiltros && (
            <button
              onClick={resetFiltros}
              className="px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all"
              style={{ borderColor: '#ef4444', color: '#ef4444', background: '#fff5f5' }}
            >
              Limpiar
            </button>
          )}
        </div>

        <p className="text-xs mt-3 font-medium" style={{ color: '#045f6c' }}>
          {bienesFiltered.length === totalBienes
            ? `${totalBienes} bienes`
            : `${bienesFiltered.length} de ${totalBienes} bienes`}
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="p-6">
        {bienesFiltered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bienesFiltered.map((bien: Bien) => (
              <RepositorioCard key={bien.n} bien={bien} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Search size={32} style={{ color: '#e3f8fb' }} />
            <p className="text-sm font-semibold mt-3" style={{ color: '#045f6c' }}>Sin resultados</p>
            <button onClick={resetFiltros} className="mt-4 text-xs font-semibold px-4 py-2 rounded-lg" style={{ background: '#e3f8fb', color: '#043941' }}>
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function SelectFiltro({ value, placeholder, options, onChange }: {
  value: string
  placeholder: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border-2 text-xs font-semibold outline-none cursor-pointer max-w-52 truncate"
        style={{
          borderColor: value ? '#02d47e' : '#e3f8fb',
          background: value ? '#d2ffe1' : '#ffffff',
          color: '#043941',
        }}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#045f6c' }} />
    </div>
  )
}
