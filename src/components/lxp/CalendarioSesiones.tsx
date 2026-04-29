// src/components/lxp/CalendarioSesiones.tsx
import { useState } from 'react'
import { Calendar, Clock, User, Video, MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import {
  type SesionLXP, type ModuloId,
  calcularEstado, formatFechaSesion, formatHoraSesion, diasParaSesion,
} from '@/data/sesionesLXP'

const MODULOS: { id: ModuloId | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todas' },
  { id: 'M0',   label: 'M0 · Inicio' },
  { id: 'M1',   label: 'M1 · Reconocimiento' },
  { id: 'M2',   label: 'M2 · Investigación' },
  { id: 'M3',   label: 'M3 · Almacén' },
  { id: 'M4',   label: 'M4 · Innovación' },
  { id: 'M5',   label: 'M5 · Formativo' },
  { id: 'M6',   label: 'M6 · Proyecto Final' },
  { id: 'B1',   label: 'B1 · Mantenimiento' },
]

const MODALIDAD_CONFIG: Record<string, { label: string; color: string; icon: typeof Video }> = {
  zoom:       { label: 'Zoom',        color: '#2D8CFF', icon: Video },
  meet:       { label: 'Google Meet', color: '#00AC47', icon: Video },
  presencial: { label: 'Presencial',  color: '#f97316', icon: MapPin },
}

const ESTADO_STYLES: Record<string, { bg: string; color: string; border: string; label: string }> = {
  programada: { bg: 'rgba(4,57,65,0.06)',    color: '#045f6c',  border: 'rgba(4,95,108,0.2)', label: 'Programada'  },
  'en-vivo':  { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444',  border: 'rgba(239,68,68,0.3)', label: 'En vivo'    },
  finalizada: { bg: 'rgba(100,116,139,0.08)', color: '#64748b', border: 'rgba(100,116,139,0.2)', label: 'Finalizada' },
}

function agruparPorMes(sesiones: SesionLXP[]): Record<string, SesionLXP[]> {
  return sesiones.reduce<Record<string, SesionLXP[]>>((acc, s) => {
    const key = new Date(s.fecha).toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })
    if (!acc[key]) acc[key] = []
    acc[key].push(s)
    return acc
  }, {})
}

interface Props {
  sesiones: SesionLXP[]
}

export function CalendarioSesiones({ sesiones }: Props) {
  const [filtroModulo, setFiltroModulo] = useState<ModuloId | 'todos'>('todos')
  const [expandidas, setExpandidas] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setExpandidas(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  const filtradas = sesiones
    .filter(s => filtroModulo === 'todos' || s.modulo === filtroModulo)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())

  const porMes = agruparPorMes(filtradas)

  if (sesiones.length === 0) {
    return (
      <div
        className="rounded-2xl border-2 p-10 flex flex-col items-center justify-center gap-3"
        style={{ borderColor: '#e3f8fb', borderStyle: 'dashed' }}
      >
        <div className="h-12 w-12 rounded-2xl flex items-center justify-center" style={{ background: '#e3f8fb' }}>
          <Calendar size={22} style={{ color: '#045f6c' }} />
        </div>
        <p className="text-sm font-semibold" style={{ color: '#043941' }}>
          Sesiones en vivo próximamente
        </p>
        <p className="text-xs text-center max-w-xs" style={{ color: '#94a3b8' }}>
          Las fechas se publicarán aquí en cuanto estén confirmadas
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">

      {/* ── Filtro por módulo ── */}
      <div className="flex gap-2 flex-wrap">
        {MODULOS.map(m => (
          <button
            key={m.id}
            onClick={() => setFiltroModulo(m.id)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={
              filtroModulo === m.id
                ? { background: '#043941', color: '#02d47e' }
                : { background: '#f0faf5', color: '#045f6c', border: '1px solid #e3f8fb' }
            }
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* ── Sin resultados para el filtro ── */}
      {filtradas.length === 0 && (
        <div
          className="rounded-xl p-6 text-center border"
          style={{ borderColor: '#e3f8fb', background: '#fafffe' }}
        >
          <p className="text-xs" style={{ color: '#94a3b8' }}>
            No hay sesiones programadas para este módulo
          </p>
        </div>
      )}

      {/* ── Grupos por mes ── */}
      {Object.entries(porMes).map(([mes, items]) => (
        <div key={mes}>
          {/* Mes header */}
          <div className="flex items-center gap-2 mb-2 px-1">
            <p
              className="text-xs font-extrabold uppercase tracking-widest capitalize"
              style={{ color: '#045f6c' }}
            >
              {mes}
            </p>
            <div className="flex-1 h-px" style={{ background: '#e3f8fb' }} />
          </div>

          {/* Sesiones del mes */}
          <div className="space-y-2">
            {items.map(sesion => {
              const estado = calcularEstado(sesion)
              const estadoStyle = ESTADO_STYLES[estado]
              const modalidad = MODALIDAD_CONFIG[sesion.modalidad]
              const dias = diasParaSesion(sesion.fecha)
              const expandida = expandidas.has(sesion.id)

              return (
                <div
                  key={sesion.id}
                  className="rounded-2xl border overflow-hidden transition-all"
                  style={{ borderColor: estado === 'en-vivo' ? 'rgba(239,68,68,0.3)' : '#e3f8fb' }}
                >
                  {/* Card principal */}
                  <div
                    className="p-4"
                    style={{ background: estado === 'en-vivo' ? 'rgba(239,68,68,0.04)' : '#ffffff' }}
                  >
                    <div className="flex items-start gap-3">

                      {/* Fecha badge */}
                      <div
                        className="shrink-0 rounded-xl flex flex-col items-center justify-center w-12 h-12 text-center"
                        style={{ background: estado === 'en-vivo' ? '#043941' : '#e3f8fb' }}
                      >
                        <p
                          className="text-[10px] font-bold uppercase"
                          style={{ color: estado === 'en-vivo' ? '#02d47e' : '#045f6c' }}
                        >
                          {new Date(sesion.fecha).toLocaleDateString('es-PE', { month: 'short' })}
                        </p>
                        <p
                          className="text-lg font-extrabold leading-none"
                          style={{ color: estado === 'en-vivo' ? '#ffffff' : '#043941' }}
                        >
                          {new Date(sesion.fecha).getDate()}
                        </p>
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          {/* Módulo badge */}
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(4,57,65,0.08)', color: '#043941' }}
                          >
                            {sesion.modulo}
                          </span>

                          {/* Estado badge */}
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                            style={{ background: estadoStyle.bg, color: estadoStyle.color, border: `1px solid ${estadoStyle.border}` }}
                          >
                            {estado === 'en-vivo' && (
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                            )}
                            {estadoStyle.label}
                          </span>

                          {/* Modalidad badge */}
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: `${modalidad.color}15`, color: modalidad.color }}
                          >
                            {modalidad.label}
                          </span>
                        </div>

                        <p className="text-sm font-bold leading-tight truncate" style={{ color: '#043941' }}>
                          {sesion.titulo}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1 text-xs" style={{ color: '#045f6c' }}>
                            <Clock size={11} />
                            {formatHoraSesion(sesion.fecha)} · {sesion.duracionMin} min
                          </span>
                          <span className="flex items-center gap-1 text-xs" style={{ color: '#045f6c' }}>
                            <User size={11} />
                            {sesion.facilitador}
                          </span>
                          {estado === 'programada' && dias > 0 && (
                            <span className="text-xs font-semibold" style={{ color: '#02d47e' }}>
                              En {dias} día{dias !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="shrink-0 flex flex-col items-end gap-2">
                        {/* Botón unirse — solo en-vivo con link */}
                        {estado === 'en-vivo' && sesion.link && (
                          <a
                            href={sesion.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                            style={{ background: '#ef4444' }}
                          >
                            Unirse <ExternalLink size={11} />
                          </a>
                        )}

                        {/* Botón expandir si hay descripción */}
                        {sesion.descripcion && (
                          <button
                            onClick={() => toggle(sesion.id)}
                            className="p-1 rounded-lg transition-colors"
                            style={{ color: '#045f6c', background: '#f0faf5' }}
                          >
                            {expandida
                              ? <ChevronUp size={14} />
                              : <ChevronDown size={14} />
                            }
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Descripción expandible */}
                  {expandida && sesion.descripcion && (
                    <div
                      className="px-5 py-3 border-t text-xs leading-relaxed"
                      style={{ borderColor: '#e3f8fb', background: '#fafffe', color: '#045f6c' }}
                    >
                      {sesion.descripcion}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
