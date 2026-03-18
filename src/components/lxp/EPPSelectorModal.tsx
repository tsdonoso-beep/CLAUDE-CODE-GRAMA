// src/components/lxp/EPPSelectorModal.tsx
import { useState, useMemo } from 'react'
import { X, Search, ShieldCheck, ShieldAlert, AlertTriangle, Filter } from 'lucide-react'
import { getEPPByTaller, type EPPRow } from '@/data/eppData'

interface EPPSelectorModalProps {
  tallerSlug: string
  tallerNombre: string
  onClose: () => void
}

const ZONA_COLORS: Record<string, { bg: string; text: string }> = {
  'Innovación':    { bg: '#d4f5e2', text: '#045f6c' },
  'Investigación': { bg: '#d0eef8', text: '#0369a1' },
  'Acabados':      { bg: '#e9dcfd', text: '#6d28d9' },
  'Almacén':       { bg: '#fef3c7', text: '#92400e' },
  'General':       { bg: '#f1f5f9', text: '#475569' },
}

function EPPBadge({ nombre, nivel }: { nombre: string; nivel: 'obligatorio' | 'recomendado' }) {
  const isObligatorio = nivel === 'obligatorio'
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
      style={
        isObligatorio
          ? { background: '#fddada', color: '#b91c1c' }
          : { background: '#e3f8fb', color: '#045f6c' }
      }
    >
      {isObligatorio
        ? <ShieldAlert size={10} className="shrink-0" />
        : <ShieldCheck size={10} className="shrink-0" />
      }
      {nombre}
    </span>
  )
}

function RowCard({ row }: { row: EPPRow }) {
  const zonaStyle = ZONA_COLORS[row.zona] ?? ZONA_COLORS['General']
  const obligatorios = row.epp.filter(e => e.nivel === 'obligatorio')
  const recomendados = row.epp.filter(e => e.nivel === 'recomendado')

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: '#e3f8fb' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#f0faf5' }}>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-extrabold" style={{ color: '#043941' }}>
              {row.equipo}
            </span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: zonaStyle.bg, color: zonaStyle.text }}
            >
              {row.zona}
            </span>
            {row.noGuantes && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: '#fee2e2', color: '#991b1b' }}>
                ⚠ PROHIBIDO guantes
              </span>
            )}
          </div>
          {row.procesos.length > 0 && (
            <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
              {row.procesos.join(' · ')}
            </p>
          )}
        </div>
      </div>

      {/* EPP */}
      <div className="px-4 py-3 space-y-2" style={{ background: '#ffffff' }}>
        {row.epp.length === 0 ? (
          <p className="text-xs italic" style={{ color: '#94a3b8' }}>
            Sin EPP especial requerido — aplicar prácticas básicas de higiene y ergonomía
          </p>
        ) : (
          <>
            {obligatorios.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: '#b91c1c' }}>
                  Obligatorio
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {obligatorios.map((e, i) => (
                    <EPPBadge key={i} nombre={e.nombre} nivel={e.nivel} />
                  ))}
                </div>
              </div>
            )}
            {recomendados.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: '#045f6c' }}>
                  Recomendado
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {recomendados.map((e, i) => (
                    <EPPBadge key={i} nombre={e.nombre} nivel={e.nivel} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Alertas */}
        {row.alertas && row.alertas.length > 0 && (
          <div className="mt-2 space-y-1">
            {row.alertas.map((alerta, i) => (
              <div
                key={i}
                className="flex gap-2 text-xs px-3 py-2 rounded-lg"
                style={{ background: '#fffbeb', color: '#92400e' }}
              >
                <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                <span>{alerta}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function EPPSelectorModal({ tallerSlug, tallerNombre, onClose }: EPPSelectorModalProps) {
  const [query, setQuery]       = useState('')
  const [zonaFiltro, setZonaFiltro] = useState<string>('Todas')

  const rows = getEPPByTaller(tallerSlug)

  const zonas = useMemo(() => {
    const set = new Set(rows.map(r => r.zona))
    return ['Todas', ...Array.from(set)]
  }, [rows])

  const filtered = useMemo(() => {
    return rows.filter(row => {
      const matchZona = zonaFiltro === 'Todas' || row.zona === zonaFiltro
      if (!matchZona) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        row.equipo.toLowerCase().includes(q) ||
        row.procesos.some(p => p.toLowerCase().includes(q)) ||
        row.epp.some(e => e.nombre.toLowerCase().includes(q))
      )
    })
  }, [rows, query, zonaFiltro])

  const totalObligatorioItems = filtered.reduce(
    (acc, r) => acc + r.epp.filter(e => e.nivel === 'obligatorio').length, 0
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,57,65,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#ffffff', boxShadow: '0 24px 64px rgba(4,57,65,0.25)' }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-start gap-4" style={{ background: '#043941' }}>
          <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: '#02d47e20' }}>
            <ShieldCheck size={20} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest mb-0.5"
              style={{ color: '#02d47e' }}>
              Selector de EPP · {rows.length} equipos
            </p>
            <h2 className="text-base font-extrabold text-white leading-snug">
              EPP por Equipo y Proceso
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {tallerNombre}
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Controles */}
        <div className="px-5 py-3 border-b flex flex-wrap items-center gap-3"
          style={{ background: '#f0faf5', borderColor: '#e3f8fb' }}>
          {/* Búsqueda */}
          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-2 rounded-lg border"
            style={{ borderColor: '#e3f8fb', background: '#ffffff' }}>
            <Search size={13} style={{ color: '#94a3b8' }} />
            <input
              className="flex-1 text-sm outline-none"
              placeholder="Buscar equipo, proceso o EPP..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ color: '#043941' }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ color: '#94a3b8' }}>
                <X size={12} />
              </button>
            )}
          </div>

          {/* Filtro zona */}
          <div className="flex items-center gap-1.5">
            <Filter size={13} style={{ color: '#045f6c' }} />
            <div className="flex flex-wrap gap-1">
              {zonas.map(z => (
                <button
                  key={z}
                  onClick={() => setZonaFiltro(z)}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all"
                  style={
                    zonaFiltro === z
                      ? { background: '#043941', color: '#02d47e' }
                      : { background: '#e3f8fb', color: '#045f6c' }
                  }
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Resultados */}
          <span className="text-xs" style={{ color: '#94a3b8' }}>
            {filtered.length} equipo{filtered.length !== 1 ? 's' : ''} · {totalObligatorioItems} EPP obligatorios
          </span>
        </div>

        {/* Leyenda */}
        <div className="px-5 py-2 border-b flex items-center gap-4"
          style={{ background: '#fffbf0', borderColor: '#e3f8fb' }}>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: '#b91c1c' }}>
            <ShieldAlert size={12} />
            <span className="font-semibold">Obligatorio</span>
            <span style={{ color: '#94a3b8' }}>— incumplimiento genera responsabilidad legal</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: '#045f6c' }}>
            <ShieldCheck size={12} />
            <span className="font-semibold">Recomendado</span>
            <span style={{ color: '#94a3b8' }}>— buena práctica</span>
          </div>
        </div>

        {/* Tabla */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <ShieldCheck size={40} style={{ color: '#e3f8fb' }} />
              <p className="text-sm" style={{ color: '#94a3b8' }}>
                No se encontraron resultados para "{query}"
              </p>
              <button
                onClick={() => { setQuery(''); setZonaFiltro('Todas') }}
                className="text-xs font-bold px-3 py-1.5 rounded-lg"
                style={{ background: '#f0faf5', color: '#045f6c' }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            filtered.map(row => <RowCard key={row.id} row={row} />)
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t flex items-center justify-between"
          style={{ borderColor: '#e3f8fb', background: '#f0faf5' }}>
          <span className="text-xs" style={{ color: '#94a3b8' }}>
            Basado en Ley 29783 · NTP 399.010 · R.V.M. N°174-2021-MINEDU
          </span>
          <button
            onClick={onClose}
            className="text-xs font-bold px-4 py-2 rounded-lg text-white"
            style={{ background: '#043941' }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
