'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Package2 } from 'lucide-react'
import type { Taller } from '@/domain/taller/entities/Taller'
import type { Bien }   from '@/domain/taller/entities/Bien'

interface RepositorioClientProps {
  taller: Taller
  bienes: Bien[]
  zonas:  string[]
}

const ZONA_SHORT: Record<string, string> = {
  'ZONA DE INNOVACIÓN':                      'Innovación',
  'ZONA DE INVESTIGACIÓN, GESTIÓN Y DISEÑO': 'Investigación',
  'DEPÓSITO / ALMACÉN / SEGURIDAD':          'Depósito',
}

const TIPO_COLORS: Record<string, { bg: string; color: string }> = {
  EQUIPOS:             { bg: '#ede9fe', color: '#7c3aed' },
  HERRAMIENTAS:        { bg: '#fef3c7', color: '#92400e' },
  MOBILIARIO:          { bg: '#e0f2fe', color: '#0369a1' },
  'MATERIAL PEDAGÓGICO': { bg: '#dcfce7', color: '#15803d' },
  EPP:                 { bg: '#fee2e2', color: '#dc2626' },
}

export function RepositorioClient({ taller, bienes, zonas }: RepositorioClientProps) {
  const [busqueda, setBusqueda] = useState('')
  const [zonaFiltro, setZonaFiltro] = useState<string>('todos')
  const [tipoFiltro, setTipoFiltro] = useState<string>('todos')

  const tipos = useMemo(() => {
    const set = new Set(bienes.map(b => b.tipo ?? 'OTROS').filter(Boolean))
    return [...set]
  }, [bienes])

  const bienesFiltered = useMemo(() => {
    const q = busqueda.toLowerCase()
    return bienes.filter(b => {
      const matchBusq = !q || b.nombre.toLowerCase().includes(q) || (b.codigoInterno ?? '').toLowerCase().includes(q)
      const matchZona = zonaFiltro === 'todos' || b.zona === zonaFiltro
      const matchTipo = tipoFiltro === 'todos' || (b.tipo ?? 'OTROS') === tipoFiltro
      return matchBusq && matchZona && matchTipo
    })
  }, [bienes, busqueda, zonaFiltro, tipoFiltro])

  const base = `/taller/${taller.slug}/repositorio`

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <p className="overline-label" style={{ color: 'var(--color-grama-verde)' }}>
          REPOSITORIO
        </p>
        <h1 className="font-extrabold mt-1" style={{ fontSize: 'var(--text-h1)', color: 'var(--color-grama-oscuro)' }}>
          {taller.nombre}
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
          {bienes.length} bienes · {zonas.length} zonas
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Búsqueda */}
        <div className="relative flex-1 min-w-56">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted-foreground)' }} />
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar bien o código..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{
              border:     '1.5px solid var(--color-border)',
              background: '#ffffff',
              color:      'var(--color-grama-oscuro)',
            }}
          />
        </div>

        {/* Zona filter */}
        <select
          value={zonaFiltro}
          onChange={e => setZonaFiltro(e.target.value)}
          className="px-3 py-2.5 rounded-xl text-sm outline-none"
          style={{ border: '1.5px solid var(--color-border)', background: '#ffffff', color: 'var(--color-grama-oscuro)' }}
        >
          <option value="todos">Todas las zonas</option>
          {zonas.map(z => (
            <option key={z} value={z}>{ZONA_SHORT[z] ?? z}</option>
          ))}
        </select>

        {/* Tipo filter */}
        <select
          value={tipoFiltro}
          onChange={e => setTipoFiltro(e.target.value)}
          className="px-3 py-2.5 rounded-xl text-sm outline-none"
          style={{ border: '1.5px solid var(--color-border)', background: '#ffffff', color: 'var(--color-grama-oscuro)' }}
        >
          <option value="todos">Todos los tipos</option>
          {tipos.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Resultados count */}
      <p className="text-xs mb-4" style={{ color: 'var(--color-muted-foreground)' }}>
        {bienesFiltered.length} resultados
      </p>

      {/* Grid de bienes */}
      {bienesFiltered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20" style={{ color: 'var(--color-muted-foreground)' }}>
          <Package2 size={40} className="opacity-30 mb-3" />
          <p className="text-sm">No se encontraron bienes con ese criterio.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {bienesFiltered.map(bien => {
            const tipoStyle = TIPO_COLORS[bien.tipo ?? ''] ?? { bg: '#f3f4f6', color: '#374151' }
            const zonaCorta = ZONA_SHORT[bien.zona] ?? bien.zona
            return (
              <Link
                key={`${bien.n}-${bien.codigoInterno}`}
                href={`${base}/bien/${bien.n}`}
                className="card-lift rounded-xl p-4 border flex flex-col gap-2"
                style={{ background: '#ffffff', borderColor: 'var(--color-border)' }}
              >
                {/* Tipo badge */}
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                    style={{ background: tipoStyle.bg, color: tipoStyle.color }}
                  >
                    {bien.tipo ?? 'OTRO'}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--color-muted-foreground)' }}>
                    #{bien.n}
                  </span>
                </div>

                {/* Nombre */}
                <h3 className="font-semibold text-sm leading-snug" style={{ color: 'var(--color-grama-oscuro)' }}>
                  {bien.nombre}
                </h3>

                {/* Zona + cantidad */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <span className="text-[10px]" style={{ color: 'var(--color-muted-foreground)' }}>
                    {zonaCorta}
                  </span>
                  <span className="text-[10px] font-semibold" style={{ color: 'var(--color-grama-verde)' }}>
                    ×{bien.cantidad}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
