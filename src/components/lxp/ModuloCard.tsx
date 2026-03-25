// src/components/lxp/ModuloCard.tsx
import { useState } from 'react'
import { ChevronDown, ChevronRight, Lock, Clock, CheckCircle2, AlertCircle, PlayCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ModuloLXP } from '@/data/modulosLXP'
import type { EstadoModulo } from '@/mock/mockEstados'
import { ContenidoBadge } from './ContenidoBadge'

interface ModuloCardProps {
  modulo: ModuloLXP
  estado: EstadoModulo
  isLast?: boolean
}

const ESTADO_CONFIG: Record<EstadoModulo, {
  bg: string
  border: string
  badge: string
  icon: React.ElementType
  dotColor: string
}> = {
  completado: {
    bg: '#f0fdf9',
    border: '#00c16e',
    badge: 'Completado',
    icon: CheckCircle2,
    dotColor: '#00c16e',
  },
  en_curso: {
    bg: '#ffffff',
    border: '#02d47e',
    badge: 'En curso',
    icon: PlayCircle,
    dotColor: '#02d47e',
  },
  disponible: {
    bg: '#ffffff',
    border: '#e3f8fb',
    badge: 'Disponible',
    icon: PlayCircle,
    dotColor: '#94a3b8',
  },
  bloqueado: {
    bg: '#f8fafc',
    border: '#e2e8f0',
    badge: 'Bloqueado',
    icon: Lock,
    dotColor: '#cbd5e1',
  },
}

export function ModuloCard({ modulo, estado, isLast = false }: ModuloCardProps) {
  const [expandido, setExpandido] = useState(estado === 'en_curso')
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const config = ESTADO_CONFIG[estado]
  const Icon = config.icon
  const bloqueado = estado === 'bloqueado'

  const duracionLabel = (min: number) =>
    min >= 60
      ? `${Math.floor(min / 60)}h${min % 60 > 0 ? `${min % 60}m` : ''}`
      : `${min}min`

  return (
    <div className="relative flex gap-5">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div
          className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 z-10 border-2"
          style={{
            background: bloqueado ? '#f1f5f9' : '#043941',
            borderColor: config.border,
            color: bloqueado ? '#94a3b8' : '#02d47e',
          }}
        >
          {modulo.numero}
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-1"
            style={{ background: config.border, minHeight: '2rem' }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-6 rounded-2xl border overflow-hidden transition-all"
        style={{ borderColor: config.border, background: config.bg }}
      >
        {/* Header */}
        <button
          onClick={() => !bloqueado && setExpandido(!expandido)}
          disabled={bloqueado}
          className="w-full text-left px-5 py-4 flex items-center gap-4 transition-colors disabled:cursor-not-allowed"
          style={{ background: 'transparent' }}
        >
          <div className="flex-1 min-w-0">
            {/* Título + estado */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-base" aria-hidden>{modulo.icon}</span>
              <h3
                className="font-extrabold text-base leading-tight"
                style={{ color: bloqueado ? '#94a3b8' : '#043941' }}
              >
                M{modulo.numero} · {modulo.nombre}
              </h3>
              {/* Estado: dot + texto, sin pill */}
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: config.dotColor }}
                />
                <span className="text-[11px] font-semibold" style={{ color: '#94a3b8' }}>
                  {config.badge}
                </span>
              </span>
            </div>

            {/* Descripción */}
            {!bloqueado && (
              <p className="text-xs line-clamp-1" style={{ color: '#64748b' }}>
                {modulo.descripcion}
              </p>
            )}
            {bloqueado && (
              <p className="text-xs" style={{ color: '#94a3b8' }}>
                Completa el módulo anterior para desbloquear
              </p>
            )}
          </div>

          {/* Horas + chevron */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1" style={{ color: bloqueado ? '#cbd5e1' : '#64748b' }}>
              <Clock size={12} />
              <span className="text-xs font-semibold">{modulo.horasTotal}h</span>
            </div>
            {!bloqueado && (
              expandido
                ? <ChevronDown size={16} style={{ color: '#64748b' }} />
                : <ChevronRight size={16} style={{ color: '#64748b' }} />
            )}
            {bloqueado && <Lock size={14} style={{ color: '#cbd5e1' }} />}
          </div>
        </button>

        {/* Expanded: sub-secciones */}
        {expandido && !bloqueado && (
          <div
            className="border-t px-5 py-4 space-y-5"
            style={{ borderColor: '#f1f5f9', background: '#fafffe' }}
          >
            {modulo.subSecciones.map(sub => (
              <div key={sub.id}>
                {/* Sección header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>
                    {sub.numero}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: '#043941' }}>
                    {sub.titulo}
                  </span>
                  {sub.phaseBadge && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#02d47e' }}>
                      · {sub.phaseBadge}
                    </span>
                  )}
                </div>

                {/* Contenidos */}
                <div className="flex flex-col gap-1">
                  {sub.contenidos.map(c => (
                    <div key={c.id} className="flex items-center gap-3 min-w-0 py-0.5">
                      <ContenidoBadge tipo={c.tipo} size="list" />
                      <span className="text-xs truncate flex-1" style={{ color: '#1e293b' }}>
                        {c.titulo}
                      </span>
                      {c.duracionMin && (
                        <span className="text-[11px] shrink-0 tabular-nums" style={{ color: '#94a3b8' }}>
                          {duracionLabel(c.duracionMin)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="pt-1">
              <button
                onClick={() => navigate(`/taller/${slug}/ruta/modulo/${modulo.numero}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: '#02d47e' }}
              >
                <Icon size={14} />
                Ir al módulo
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* M3 quiz warning */}
        {modulo.numero === 3 && estado === 'bloqueado' && (
          <div
            className="px-5 py-3 border-t flex items-center gap-2"
            style={{ borderColor: '#fecaca', background: '#fee2e2' }}
          >
            <AlertCircle size={13} color="#ef4444" />
            <p className="text-xs font-semibold" style={{ color: '#ef4444' }}>
              Debes aprobar el Quiz de Seguridad (80%) para continuar
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
