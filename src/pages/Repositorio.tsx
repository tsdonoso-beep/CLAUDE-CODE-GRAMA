// src/pages/Repositorio.tsx
import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { RepositorioCard } from '@/components/lxp/RepositorioCard'

type FiltroZona = 'TODAS' | 'investigacion' | 'innovacion' | 'acabados' | 'almacen'
type FiltroTipo = 'TODOS' | 'EQUIPOS' | 'HERRAMIENTAS' | 'MOBILIARIO' | 'PEDAGOGICO' | 'PRODUCCIÓN' | 'SEGURIDAD'

function getZonaKey(zona: string): string {
  const z = zona.toLowerCase()
  if (z.includes('investigac')) return 'investigacion'
  if (z.includes('innovac')) return 'innovacion'
  if (z.includes('acabado')) return 'acabados'
  if (z.includes('almac')) return 'almacen'
  return 'otros'
}

export default function Repositorio() {
  const { taller, bienes, totalBienes } = useTaller()
  const [busqueda, setBusqueda] = useState('')
  const [filtroZona, setFiltroZona] = useState<FiltroZona>('TODAS')
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('TODOS')

  const bienesFiltered = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return bienes.filter((b: any) => {
      const matchBusqueda = !busqueda ||
        b.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        (b.marca && b.marca.toLowerCase().includes(busqueda.toLowerCase())) ||
        (b.modelo && b.modelo.toLowerCase().includes(busqueda.toLowerCase()))
      const matchZona = filtroZona === 'TODAS' || getZonaKey(b.zona) === filtroZona
      const matchTipo = filtroTipo === 'TODOS' || b.tipo === filtroTipo
      return matchBusqueda && matchZona && matchTipo
    })
  }, [bienes, busqueda, filtroZona, filtroTipo])

  if (!taller) return null

  const zonas: { value: FiltroZona; label: string; count: number }[] = [
    { value: 'TODAS', label: 'Todas las zonas', count: totalBienes },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { value: 'investigacion', label: 'Investigación', count: bienes.filter((b: any) => getZonaKey(b.zona) === 'investigacion').length },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { value: 'innovacion', label: 'Innovación', count: bienes.filter((b: any) => getZonaKey(b.zona) === 'innovacion').length },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { value: 'acabados', label: 'Acabados', count: bienes.filter((b: any) => getZonaKey(b.zona) === 'acabados').length },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { value: 'almacen', label: 'Almacén', count: bienes.filter((b: any) => getZonaKey(b.zona) === 'almacen').length },
  ]

  const tipos: { value: FiltroTipo; label: string }[] = [
    { value: 'TODOS',      label: 'Todos los tipos' },
    { value: 'EQUIPOS',    label: 'Equipos' },
    { value: 'HERRAMIENTAS', label: 'Herramientas' },
    { value: 'MOBILIARIO', label: 'Mobiliario' },
    { value: 'PEDAGOGICO', label: 'Material Pedagógico' },
    { value: 'PRODUCCIÓN', label: 'Producción' },
    { value: 'SEGURIDAD',  label: 'Seguridad' },
  ]

  return (
    <div>
      {/* ── Hero ── */}
      <div className="px-8 py-10 grama-pattern" style={{ background: '#043941' }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#02d47e' }}>
          {taller.nombreCorto}
        </p>
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Repositorio de Recursos
        </h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Biblioteca completa del equipamiento · {totalBienes} bienes en total
        </p>
      </div>

      {/* ── Filtros ── */}
      <div className="px-6 py-4 border-b" style={{ background: '#ffffff', borderColor: '#e3f8fb' }}>
        <div className="flex flex-wrap gap-3 items-start">
          {/* Buscador */}
          <div className="relative flex-1 min-w-56">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#045f6c' }} />
            <input
              type="text"
              placeholder="Buscar equipo, marca, modelo..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 text-sm outline-none transition-all"
              style={{ borderColor: '#e3f8fb', color: '#043941', background: '#fafffe' }}
              onFocus={e => (e.target.style.borderColor = '#02d47e')}
              onBlur={e => (e.target.style.borderColor = '#e3f8fb')}
            />
          </div>

          {/* Filtro zona */}
          <div className="flex flex-wrap gap-1.5">
            {zonas.map(z => (
              <button
                key={z.value}
                onClick={() => setFiltroZona(z.value)}
                className="px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all"
                style={{
                  borderColor: filtroZona === z.value ? '#02d47e' : '#e3f8fb',
                  background: filtroZona === z.value ? '#d2ffe1' : '#ffffff',
                  color: filtroZona === z.value ? '#043941' : '#045f6c',
                }}
              >
                {z.label}
                {z.count > 0 && (
                  <span className="ml-1.5 text-xs font-bold opacity-60">{z.count}</span>
                )}
              </button>
            ))}
          </div>

          {/* Filtro tipo */}
          <div className="flex items-center gap-1.5">
            <Filter size={14} style={{ color: '#045f6c' }} />
            <select
              value={filtroTipo}
              onChange={e => setFiltroTipo(e.target.value as FiltroTipo)}
              className="px-3 py-2 rounded-xl border-2 text-xs font-semibold outline-none"
              style={{ borderColor: '#e3f8fb', color: '#043941', background: '#ffffff' }}
            >
              {tipos.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultados */}
        <p className="text-xs mt-3 font-medium" style={{ color: '#045f6c' }}>
          {bienesFiltered.length === totalBienes
            ? `Mostrando todos los ${totalBienes} bienes`
            : `${bienesFiltered.length} de ${totalBienes} bienes`}
        </p>
      </div>

      {/* ── Grid de bienes ── */}
      <div className="p-6">
        {bienesFiltered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {bienesFiltered.map((bien: any) => (
              <RepositorioCard key={bien.n} bien={bien} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Search size={32} style={{ color: '#e3f8fb' }} />
            <p className="text-sm font-semibold mt-3" style={{ color: '#045f6c' }}>
              No se encontraron bienes
            </p>
            <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>
              Prueba con otro término de búsqueda o cambia los filtros
            </p>
            <button
              onClick={() => { setBusqueda(''); setFiltroZona('TODAS'); setFiltroTipo('TODOS') }}
              className="mt-4 text-xs font-semibold px-4 py-2 rounded-lg"
              style={{ background: '#e3f8fb', color: '#043941' }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
