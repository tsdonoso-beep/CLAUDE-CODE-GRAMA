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
  badgeBg: string
  badgeText: string
  icon: React.ElementType
  iconColor: string
}> = {
  completado: {
    bg: '#d2ffe1',
    border: '#00c16e',
    badge: '✅ Completado',
    badgeBg: '#00c16e',
    badgeText: '#ffffff',
    icon: CheckCircle2,
    iconColor: '#00c16e',
  },
  en_curso: {
    bg: '#ffffff',
    border: '#02d47e',
    badge: '⏳ En curso',
    badgeBg: '#e3f8fb',
    badgeText: '#045f6c',
    icon: PlayCircle,
    iconColor: '#02d47e',
  },
  disponible: {
    bg: '#ffffff',
    border: '#e3f8fb',
    badge: '▶ Disponible',
    badgeBg: '#e3f8fb',
    badgeText: '#045f6c',
    icon: PlayCircle,
    iconColor: '#045f6c',
  },
  bloqueado: {
    bg: '#f8fafc',
    border: '#e2e8f0',
    badge: '🔒 Bloqueado',
    badgeBg: '#f1f5f9',
    badgeText: '#94a3b8',
    icon: Lock,
    iconColor: '#94a3b8',
  },
}

export function ModuloCard({ modulo, estado, isLast = false }: ModuloCardProps) {
  const [expandido, setExpandido] = useState(estado === 'en_curso')
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const config = ESTADO_CONFIG[estado]
  const Icon = config.icon
  const bloqueado = estado === 'bloqueado'

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
        className="flex-1 mb-6 rounded-2xl border-2 overflow-hidden transition-all"
        style={{ borderColor: config.border, background: config.bg }}
      >
        {/* Header */}
        <button
          onClick={() => !bloqueado && setExpandido(!expandido)}
          disabled={bloqueado}
          className="w-full text-left px-6 py-4 flex items-center gap-4 transition-colors disabled:cursor-not-allowed"
          style={{ background: 'transparent' }}
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className="text-lg"
                aria-hidden
              >
                {modulo.icon}
              </span>
              <h3
                className="font-extrabold text-base leading-tight"
                style={{ color: bloqueado ? '#94a3b8' : '#043941' }}
              >
                M{modulo.numero} · {modulo.nombre}
              </h3>
              <span
                className="inline-flex items-center justify-center text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ background: config.badgeBg, color: config.badgeText, minWidth: '90px' }}
              >
                {config.badge}
              </span>
              {modulo.requiereAprobacion && !bloqueado && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: '#fef3c7', color: '#ca8a04' }}
                >
                  ⚠ Evaluación obligatoria
                </span>
              )}
            </div>

            {!bloqueado && (
              <p className="text-xs mt-1 line-clamp-2" style={{ color: '#045f6c' }}>
                {modulo.descripcion}
              </p>
            )}

            {bloqueado && (
              <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>
                Completa el módulo anterior para desbloquear
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Horas */}
            <div className="text-right hidden sm:block">
              <div className="flex items-center gap-1 justify-end" style={{ color: bloqueado ? '#94a3b8' : '#045f6c' }}>
                <Clock size={12} />
                <span className="text-xs font-semibold">{modulo.horasTotal}h</span>
              </div>
              <div className="flex gap-1 mt-0.5 flex-wrap justify-end">
                {modulo.horasAsincrono > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#e3f8fb', color: '#045f6c' }}>
                    {modulo.horasAsincrono}h A
                  </span>
                )}
                {modulo.horasSincrono > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#fdf8da', color: '#ca8a04' }}>
                    {modulo.horasSincrono}h S
                  </span>
                )}
                {modulo.horasPresencial > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#d2ffe1', color: '#00c16e' }}>
                    {modulo.horasPresencial}h P
                  </span>
                )}
              </div>
            </div>

            {/* Expand arrow */}
            {!bloqueado && (
              expandido
                ? <ChevronDown size={18} style={{ color: '#045f6c' }} />
                : <ChevronRight size={18} style={{ color: '#045f6c' }} />
            )}
            {bloqueado && <Lock size={16} style={{ color: '#94a3b8' }} />}
          </div>
        </button>

        {/* Expanded: sub-secciones */}
        {expandido && !bloqueado && (
          <div className="border-t px-6 py-4 space-y-4" style={{ borderColor: config.border, background: '#fafffe' }}>
            {modulo.subSecciones.map(sub => (
              <div key={sub.id} className="flex gap-3">
                <div className="mt-1">
                  <div
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ background: sub.colorAccent }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-bold" style={{ color: '#043941' }}>
                      {sub.numero}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: '#043941' }}>
                      {sub.titulo}
                    </span>
                    {sub.phaseBadge && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: '#043941', color: '#02d47e' }}
                      >
                        {sub.phaseBadge}
                      </span>
                    )}
                  </div>
                  {sub.descripcion && (
                    <p className="text-xs mb-2" style={{ color: '#045f6c' }}>
                      {sub.descripcion}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {sub.contenidos.map(c => (
                      <span key={c.id} className="flex items-center gap-1.5">
                        <ContenidoBadge tipo={c.tipo} size="sm" />
                        <span className="text-xs" style={{ color: '#043941' }}>
                          {c.titulo.length > 50 ? c.titulo.slice(0, 47) + '...' : c.titulo}
                        </span>
                        {c.duracionMin && (
                          <span className="text-xs" style={{ color: '#94a3b8' }}>
                            {c.duracionMin >= 60
                              ? `${Math.floor(c.duracionMin / 60)}h${c.duracionMin % 60 > 0 ? `${c.duracionMin % 60}m` : ''}`
                              : `${c.duracionMin}min`}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="pt-2">
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

        {/* M1 quiz de seguridad warning */}
        {modulo.numero === 3 && estado === 'bloqueado' && (
          <div
            className="px-6 py-3 border-t flex items-center gap-2"
            style={{ borderColor: '#fecaca', background: '#fee2e2' }}
          >
            <AlertCircle size={14} color="#ef4444" />
            <p className="text-xs font-semibold" style={{ color: '#ef4444' }}>
              Debes aprobar el Quiz de Seguridad (80%) para continuar
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
