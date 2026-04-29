// src/components/lxp/EPPSelectorModal.tsx
import { useState, useMemo } from 'react'
import { X, Search, ShieldCheck, ShieldAlert, AlertTriangle, Filter } from 'lucide-react'
import { getEPPByTaller, type EPPRow } from '@/data/eppData'
import { useEscapeKey } from '@/hooks/useEscapeKey'

interface EPPSelectorModalProps {
  tallerSlug: string
  tallerNombre: string
  onClose: () => void
}

function EPPBadge({ nombre, nivel }: { nombre: string; nivel: 'obligatorio' | 'recomendado' }) {
  const isObligatorio = nivel === 'obligatorio'
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
      style={
        isObligatorio
          ? { background: 'rgba(4,57,65,0.07)', color: '#043941', border: '1px solid rgba(4,57,65,0.12)' }
          : { background: '#f0faf5', color: '#045f6c', border: '1px solid #d1fae5' }
      }
    >
      {isObligatorio
        ? <ShieldAlert size={10} className="shrink-0" style={{ color: '#043941' }} />
        : <ShieldCheck size={10} className="shrink-0" style={{ color: '#02d47e' }} />
      }
      {nombre}
    </span>
  )
}

function RowCard({ row }: { row: EPPRow }) {
  const obligatorios = row.epp.filter(e => e.nivel === 'obligatorio')
  const recomendados = row.epp.filter(e => e.nivel === 'recomendado')

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.08)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#f8fcfb', borderBottom: '1px solid rgba(4,57,65,0.06)' }}>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-extrabold" style={{ color: '#043941' }}>
              {row.equipo}
            </span>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: '#e3f8fb', color: '#045f6c', border: '1px solid rgba(4,95,108,0.15)' }}
            >
              {row.zona}
            </span>
            {row.noGuantes && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(4,57,65,0.06)', color: '#043941', border: '1px solid rgba(4,57,65,0.12)' }}
              >
                <AlertTriangle size={9} /> Sin guantes
              </span>
            )}
          </div>
          {row.procesos.length > 0 && (
            <p className="text-[11px] mt-1" style={{ color: 'rgba(4,57,65,0.45)' }}>
              {row.procesos.join(' · ')}
            </p>
          )}
        </div>
      </div>

      {/* EPP */}
      <div className="px-4 py-3 space-y-3">
        {row.epp.length === 0 ? (
          <p className="text-xs italic" style={{ color: 'rgba(4,57,65,0.4)' }}>
            Sin EPP especial — aplicar prácticas básicas de higiene y ergonomía
          </p>
        ) : (
          <>
            {obligatorios.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <ShieldAlert size={11} style={{ color: '#043941' }} />
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: '#043941' }}>
                    Obligatorio
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {obligatorios.map((e, i) => (
                    <EPPBadge key={i} nombre={e.nombre} nivel={e.nivel} />
                  ))}
                </div>
              </div>
            )}
            {recomendados.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <ShieldCheck size={11} style={{ color: '#02d47e' }} />
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: '#045f6c' }}>
                    Recomendado
                  </p>
                </div>
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
          <div className="space-y-1 pt-1">
            {row.alertas.map((alerta, i) => (
              <div
                key={i}
                className="flex gap-2 text-xs px-3 py-2 rounded-lg"
                style={{ background: 'rgba(4,57,65,0.04)', color: 'rgba(4,57,65,0.7)', border: '1px solid rgba(4,57,65,0.07)' }}
              >
                <AlertTriangle size={12} className="shrink-0 mt-0.5" style={{ color: '#045f6c' }} />
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
  useEscapeKey(onClose)
  const [query, setQuery]           = useState('')
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
            style={{ background: 'rgba(2,212,126,0.15)', border: '1px solid rgba(2,212,126,0.2)' }}>
            <ShieldCheck size={20} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
              style={{ color: '#02d47e' }}>
              Selector de EPP · {rows.length} equipos
            </p>
            <h2 className="text-base font-extrabold text-white leading-snug">
              EPP por Equipo y Proceso
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {tallerNombre}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)')}
          >
            <X size={16} />
          </button>
        </div>

        {/* Controles */}
        <div className="px-5 py-3 border-b flex flex-wrap items-center gap-3"
          style={{ background: '#f8fcfb', borderColor: 'rgba(4,57,65,0.07)' }}>
          {/* Búsqueda */}
          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-2 rounded-lg border"
            style={{ borderColor: 'rgba(4,57,65,0.1)', background: '#ffffff' }}>
            <Search size={13} style={{ color: 'rgba(4,57,65,0.35)' }} />
            <input
              className="flex-1 text-sm outline-none"
              placeholder="Buscar equipo, proceso o EPP..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ color: '#043941' }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ color: 'rgba(4,57,65,0.35)' }}>
                <X size={12} />
              </button>
            )}
          </div>

          {/* Filtro zona */}
          <div className="flex items-center gap-1.5">
            <Filter size={13} style={{ color: 'rgba(4,57,65,0.4)' }} />
            <div className="flex flex-wrap gap-1">
              {zonas.map(z => (
                <button
                  key={z}
                  onClick={() => setZonaFiltro(z)}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all"
                  style={
                    zonaFiltro === z
                      ? { background: '#043941', color: '#02d47e' }
                      : { background: 'rgba(4,57,65,0.06)', color: '#045f6c' }
                  }
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Resultados */}
          <span className="text-xs" style={{ color: 'rgba(4,57,65,0.35)' }}>
            {filtered.length} equipo{filtered.length !== 1 ? 's' : ''} · {totalObligatorioItems} EPP obligatorios
          </span>
        </div>

        {/* Leyenda */}
        <div className="px-5 py-2 border-b flex items-center gap-5"
          style={{ background: '#ffffff', borderColor: 'rgba(4,57,65,0.06)' }}>
          <div className="flex items-center gap-1.5 text-xs">
            <ShieldAlert size={12} style={{ color: '#043941' }} />
            <span className="font-semibold" style={{ color: '#043941' }}>Obligatorio</span>
            <span style={{ color: 'rgba(4,57,65,0.4)' }}>— exigencia legal</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <ShieldCheck size={12} style={{ color: '#02d47e' }} />
            <span className="font-semibold" style={{ color: '#045f6c' }}>Recomendado</span>
            <span style={{ color: 'rgba(4,57,65,0.4)' }}>— buena práctica</span>
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ background: '#f8fcfb' }}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <ShieldCheck size={40} style={{ color: 'rgba(4,57,65,0.1)' }} />
              <p className="text-sm" style={{ color: 'rgba(4,57,65,0.4)' }}>
                No se encontraron resultados para "{query}"
              </p>
              <button
                onClick={() => { setQuery(''); setZonaFiltro('Todas') }}
                className="text-xs font-bold px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(4,57,65,0.06)', color: '#045f6c' }}
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
          style={{ borderColor: 'rgba(4,57,65,0.07)', background: '#ffffff' }}>
          <span className="text-xs" style={{ color: 'rgba(4,57,65,0.35)' }}>
            Ley 29783 · NTP 399.010 · R.V.M. N°174-2021-MINEDU
          </span>
          <button
            onClick={onClose}
            className="text-xs font-bold px-4 py-2 rounded-lg text-white transition-opacity"
            style={{ background: '#043941' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
