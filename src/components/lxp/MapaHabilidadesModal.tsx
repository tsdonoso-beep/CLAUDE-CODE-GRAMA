// src/components/lxp/MapaHabilidadesModal.tsx
import { useState, useMemo } from 'react'
import { X, Sparkles, ChevronRight } from 'lucide-react'
import { getGruposByTaller, HABILIDADES_EPT, type GrupoEquipamiento } from '@/data/habilidadesEPT'
import { useEscapeKey } from '@/hooks/useEscapeKey'

interface MapaHabilidadesModalProps {
  tallerSlug: string
  tallerNombre: string
  onClose: () => void
}

export function MapaHabilidadesModal({ tallerSlug, tallerNombre, onClose }: MapaHabilidadesModalProps) {
  useEscapeKey(onClose)
  const [habilidadActiva, setHabilidadActiva] = useState<string | null>(null)
  const [grupoActivo, setGrupoActivo] = useState<string | null>(null)

  const grupos = getGruposByTaller(tallerSlug)

  // IDs de habilidades que tienen al menos un grupo en este taller
  const habilidadesConGrupo = useMemo(() => {
    const ids = new Set<string>()
    grupos.forEach(g => g.habilidades.forEach(h => ids.add(h)))
    return ids
  }, [grupos])

  // Highlight logic
  const gruposResaltados = useMemo(() => {
    if (habilidadActiva) {
      return new Set(grupos.filter(g => g.habilidades.includes(habilidadActiva)).map(g => g.id))
    }
    if (grupoActivo) return new Set([grupoActivo])
    return new Set<string>()
  }, [habilidadActiva, grupoActivo, grupos])

  const habilidadesResaltadas = useMemo(() => {
    if (grupoActivo) {
      const grupo = grupos.find(g => g.id === grupoActivo)
      return new Set(grupo?.habilidades ?? [])
    }
    if (habilidadActiva) return new Set([habilidadActiva])
    return new Set<string>()
  }, [grupoActivo, habilidadActiva, grupos])

  function handleClickHabilidad(id: string) {
    setGrupoActivo(null)
    setHabilidadActiva(prev => prev === id ? null : id)
  }

  function handleClickGrupo(id: string) {
    setHabilidadActiva(null)
    setGrupoActivo(prev => prev === id ? null : id)
  }

  const habActiva = habilidadActiva ? HABILIDADES_EPT.find(h => h.id === habilidadActiva) : null
  const gruActivo = grupoActivo ? grupos.find(g => g.id === grupoActivo) : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,57,65,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#ffffff', boxShadow: '0 24px 64px rgba(4,57,65,0.25)' }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-start gap-4 shrink-0" style={{ background: '#043941' }}>
          <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: '#02d47e20' }}>
            <Sparkles size={20} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: '#02d47e' }}>
              Módulo 5 · Interactivo
            </p>
            <h2 className="text-base font-extrabold text-white leading-snug">
              14 Habilidades EPT × Equipamiento
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {tallerNombre} · Haz clic en una habilidad o grupo para ver la relación
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

        {/* Leyenda */}
        <div className="px-5 py-2 border-b flex flex-wrap items-center gap-4 shrink-0"
          style={{ background: '#f0faf5', borderColor: '#e3f8fb' }}>
          <span className="text-xs" style={{ color: '#64748b' }}>
            <span className="font-bold" style={{ color: '#043941' }}>← Habilidades EPT</span>
            {' '}desarrolladas al trabajar con los equipos del taller
          </span>
          <span className="text-xs" style={{ color: '#94a3b8' }}>
            Selección activa: {habilidadActiva
              ? `Habilidad "${HABILIDADES_EPT.find(h => h.id === habilidadActiva)?.nombre}"`
              : grupoActivo
                ? `Grupo "${grupos.find(g => g.id === grupoActivo)?.nombre}"`
                : 'Ninguna — haz clic para explorar'}
          </span>
        </div>

        {/* Body: dos columnas */}
        <div className="flex-1 overflow-hidden flex">
          {/* Panel izquierdo: 14 Habilidades */}
          <div className="w-[44%] border-r overflow-y-auto" style={{ borderColor: '#e3f8fb' }}>
            <div className="px-4 py-3 border-b sticky top-0 z-10"
              style={{ background: '#f0faf5', borderColor: '#e3f8fb' }}>
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#045f6c' }}>
                14 Habilidades EPT
              </p>
            </div>
            <div className="p-3 space-y-1.5">
              {HABILIDADES_EPT.map(h => {
                const tieneGrupo = habilidadesConGrupo.has(h.id)
                const resaltada = habilidadesResaltadas.has(h.id)
                const activa = habilidadActiva === h.id
                const opacada = (habilidadActiva || grupoActivo) && !resaltada

                return (
                  <button
                    key={h.id}
                    onClick={() => tieneGrupo && handleClickHabilidad(h.id)}
                    className="w-full text-left rounded-xl px-3 py-2.5 flex items-start gap-2.5 transition-all"
                    style={{
                      background: activa ? h.color + '30' : resaltada ? h.color + '18' : '#ffffff',
                      border: `2px solid ${activa ? h.color : resaltada ? h.color + '80' : '#e3f8fb'}`,
                      opacity: opacada ? 0.35 : 1,
                      cursor: tieneGrupo ? 'pointer' : 'default',
                    }}
                  >
                    <span className="text-base shrink-0 mt-0.5">{h.icono}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{ background: h.color + '25', color: h.color }}>
                          {h.id.toUpperCase()}
                        </span>
                        <span className="text-xs font-bold" style={{ color: '#043941' }}>
                          {h.nombre}
                        </span>
                      </div>
                      <p className="text-[10px] leading-snug" style={{ color: '#64748b' }}>
                        {h.descripcion}
                      </p>
                      {!tieneGrupo && (
                        <span className="text-[11px] italic" style={{ color: '#94a3b8' }}>
                          No aplicable en este taller
                        </span>
                      )}
                    </div>
                    {activa && (
                      <ChevronRight size={14} className="shrink-0 mt-1" style={{ color: h.color }} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Panel derecho: Grupos de equipamiento */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-3 border-b sticky top-0 z-10"
              style={{ background: '#f0faf5', borderColor: '#e3f8fb' }}>
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#045f6c' }}>
                Grupos de Equipamiento · {grupos.length} categorías
              </p>
            </div>
            {grupos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
                <span className="text-3xl">🔧</span>
                <p className="text-sm font-bold" style={{ color: '#043941' }}>Sin datos para este taller</p>
              </div>
            ) : (
              <div className="p-3 space-y-2">
                {grupos.map(g => {
                  const resaltado = gruposResaltados.has(g.id)
                  const activo = grupoActivo === g.id
                  const opacado = (habilidadActiva || grupoActivo) && !resaltado

                  // Colores de habilidades del grupo
                  const coloresHabs = g.habilidades.map(hid => {
                    const hab = HABILIDADES_EPT.find(h => h.id === hid)
                    return hab?.color ?? '#94a3b8'
                  })

                  return (
                    <button
                      key={g.id}
                      onClick={() => handleClickGrupo(g.id)}
                      className="w-full text-left rounded-xl border-2 overflow-hidden transition-all hover:shadow-sm"
                      style={{
                        borderColor: activo ? '#02d47e' : resaltado ? '#02d47e80' : '#e3f8fb',
                        opacity: opacado ? 0.3 : 1,
                      }}
                    >
                      {/* Grupo header */}
                      <div className="px-3 py-2 flex items-center gap-2.5"
                        style={{ background: activo ? '#f0faf5' : resaltado ? '#f8fffe' : '#ffffff' }}>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <span className="text-xs font-extrabold" style={{ color: '#043941' }}>
                              {g.nombre}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                              style={{ background: '#e3f8fb', color: '#045f6c' }}>
                              {g.zona}
                            </span>
                          </div>
                          {/* Equipos ejemplo */}
                          <p className="text-[10px]" style={{ color: '#64748b' }}>
                            {g.equiposEjemplo.join(' · ')}
                          </p>
                        </div>
                        {activo && <ChevronRight size={13} style={{ color: '#02d47e' }} />}
                      </div>

                      {/* Habilidades del grupo */}
                      <div className="px-3 pb-2 pt-1 flex flex-wrap gap-1"
                        style={{ background: '#fafffe', borderTop: `1px solid ${activo ? '#e3f8fb' : '#f1f5f9'}` }}>
                        {g.habilidades.map((hid, idx) => {
                          const hab = HABILIDADES_EPT.find(h => h.id === hid)
                          if (!hab) return null
                          const habResaltada = habilidadesResaltadas.has(hid)
                          return (
                            <span key={hid}
                              className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{
                                background: habResaltada ? hab.color + '25' : '#f1f5f9',
                                color: habResaltada ? hab.color : '#64748b',
                                border: habResaltada ? `1px solid ${hab.color}60` : '1px solid transparent',
                              }}>
                              {hab.icono} {hab.id.toUpperCase()}
                            </span>
                          )
                        })}
                      </div>

                      {/* Descripción extra si activo */}
                      {activo && g.descripcion && (
                        <div className="px-3 pb-2 text-[10px] italic" style={{ color: '#64748b', background: '#f8fffe' }}>
                          {g.descripcion}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Panel inferior: detalle de selección */}
        {(habActiva || gruActivo) && (
          <div className="px-5 py-3 border-t shrink-0"
            style={{ background: '#f0faf5', borderColor: '#e3f8fb' }}>
            {habActiva && (
              <div className="flex items-start gap-3">
                <span className="text-xl">{habActiva.icono}</span>
                <div className="flex-1">
                  <p className="text-xs font-bold" style={{ color: '#043941' }}>
                    {habActiva.nombre}
                    <span className="font-normal ml-2" style={{ color: '#64748b' }}>
                      se activa en {gruposResaltados.size} grupo{gruposResaltados.size !== 1 ? 's' : ''} de equipamiento
                    </span>
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#64748b' }}>{habActiva.descripcion}</p>
                </div>
              </div>
            )}
            {gruActivo && (
              <div className="flex items-start gap-3">
                <span className="text-xl">🔧</span>
                <div className="flex-1">
                  <p className="text-xs font-bold" style={{ color: '#043941' }}>
                    {gruActivo.nombre}
                    <span className="font-normal ml-2" style={{ color: '#64748b' }}>
                      activa {habilidadesResaltadas.size} habilidad{habilidadesResaltadas.size !== 1 ? 'es' : ''} EPT
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {gruActivo.habilidades.map(hid => {
                      const h = HABILIDADES_EPT.find(x => x.id === hid)
                      if (!h) return null
                      return (
                        <span key={hid} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: h.color + '20', color: h.color }}>
                          {h.icono} {h.nombre}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t flex items-center justify-between shrink-0"
          style={{ borderColor: '#e3f8fb', background: '#f0faf5' }}>
          <span className="text-xs" style={{ color: '#94a3b8' }}>
            Basado en Marco de Habilidades EPT · MINEDU 2021
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
