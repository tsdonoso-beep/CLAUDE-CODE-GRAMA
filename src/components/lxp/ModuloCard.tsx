// src/components/lxp/ModuloCard.tsx
import { useState } from 'react'
import { ChevronDown, ChevronRight, Lock, Clock, CheckCircle2, AlertCircle, PlayCircle, Zap } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ModuloLXP } from '@/data/modulosLXP'
import type { EstadoModulo } from '@/mock/mockEstados'

interface ModuloCardProps {
  modulo: ModuloLXP
  estado: EstadoModulo
  isLast?: boolean
}

export function ModuloCard({ modulo, estado, isLast = false }: ModuloCardProps) {
  const [expandido, setExpandido] = useState(estado === 'en_curso' || estado === 'disponible')
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const bloqueado = estado === 'bloqueado'
  const activo    = estado === 'en_curso'
  const disponible = estado === 'disponible'
  const completado = estado === 'completado'

  const duracionLabel = (min: number) =>
    min >= 60
      ? `${Math.floor(min / 60)}h${min % 60 > 0 ? `${min % 60}m` : ''}`
      : `${min}min`

  /* ── Paleta visual por estado ── */
  const cardStyle: React.CSSProperties = activo ? {
    background: 'linear-gradient(145deg, #edfff6 0%, #ffffff 100%)',
    boxShadow: '0 0 0 2px #02d47e, 0 12px 32px rgba(2,212,126,0.14)',
    borderRadius: 18,
  } : disponible ? {
    background: '#ffffff',
    boxShadow: '0 4px 18px rgba(4,57,65,0.09)',
    borderRadius: 18,
  } : completado ? {
    background: '#f4fdf9',
    boxShadow: '0 2px 10px rgba(2,212,126,0.07)',
    borderRadius: 18,
  } : /* bloqueado */ {
    background: '#f8fafc',
    boxShadow: 'none',
    borderRadius: 18,
    opacity: 0.72,
  }

  const dotStyle: React.CSSProperties = activo ? {
    background: '#043941',
    border: '2.5px solid #02d47e',
    color: '#02d47e',
    boxShadow: '0 0 0 4px rgba(2,212,126,0.18)',
  } : completado ? {
    background: '#02d47e',
    border: '2.5px solid #02d47e',
    color: '#ffffff',
    boxShadow: '0 0 0 4px rgba(2,212,126,0.12)',
  } : disponible ? {
    background: '#043941',
    border: '2.5px solid rgba(4,57,65,0.3)',
    color: '#02d47e',
    boxShadow: '0 0 0 3px rgba(4,57,65,0.06)',
  } : {
    background: '#f1f5f9',
    border: '2px solid #e2e8f0',
    color: '#94a3b8',
  }

  const lineColor = activo || completado ? '#02d47e' : disponible ? 'rgba(4,57,65,0.12)' : '#e2e8f0'

  const badgeConfig = {
    completado: { label: 'Completado', color: '#02d47e', bg: 'rgba(2,212,126,0.1)' },
    en_curso:   { label: 'En curso',   color: '#02d47e', bg: 'rgba(2,212,126,0.1)' },
    disponible: { label: 'Disponible', color: '#045f6c', bg: 'rgba(4,95,108,0.08)' },
    bloqueado:  { label: 'Bloqueado',  color: '#94a3b8', bg: '#f1f5f9' },
  }[estado]

  const Icon = activo ? PlayCircle : completado ? CheckCircle2 : disponible ? Zap : Lock

  return (
    <div className="relative flex gap-4">
      {/* ── Eje timeline ── */}
      <div className="flex flex-col items-center shrink-0" style={{ paddingTop: 6 }}>
        <div
          className="h-8 w-8 rounded-full flex items-center justify-center text-[13px] font-extrabold shrink-0 z-10 transition-all"
          style={dotStyle}
        >
          {completado
            ? <CheckCircle2 size={14} />
            : modulo.numero
          }
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-1.5 transition-colors"
            style={{ background: lineColor, minHeight: '2rem' }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <div className="flex-1 mb-5 overflow-hidden transition-all" style={cardStyle}>

        {/* Left accent stripe */}
        {!bloqueado && (
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[18px]"
            style={{
              background: activo || completado
                ? 'linear-gradient(to bottom, #02d47e, #00c16e)'
                : disponible
                  ? 'linear-gradient(to bottom, #045f6c, #02d47e)'
                  : 'transparent',
            }}
          />
        )}

        {/* Header */}
        <button
          onClick={() => setExpandido(!expandido)}
          className="w-full text-left px-5 py-4 flex items-center gap-3 transition-colors hover:bg-black/[0.015]"
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-base leading-none" aria-hidden>{modulo.icon}</span>
              <h3
                className="font-bold text-sm leading-tight"
                style={{ color: bloqueado ? '#94a3b8' : '#043941' }}
              >
                M{modulo.numero} · {modulo.nombre}
              </h3>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: badgeConfig.bg, color: badgeConfig.color }}
              >
                {badgeConfig.label}
              </span>
              {activo && (
                <span className="w-1.5 h-1.5 rounded-full animate-pulse-soft shrink-0" style={{ background: '#02d47e' }} />
              )}
            </div>
            <p className="text-xs line-clamp-1" style={{ color: bloqueado ? '#cbd5e1' : '#64748b' }}>
              {modulo.descripcion}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1" style={{ color: bloqueado ? '#e2e8f0' : '#94a3b8' }}>
              <Clock size={11} />
              <span className="text-xs font-semibold">{modulo.horasTotal}h</span>
            </div>
            {expandido
              ? <ChevronDown size={15} style={{ color: bloqueado ? '#cbd5e1' : '#94a3b8' }} />
              : <ChevronRight size={15} style={{ color: bloqueado ? '#cbd5e1' : '#94a3b8' }} />
            }
          </div>
        </button>

        {/* Expanded */}
        {expandido && (
          <div
            className="border-t px-5 py-4 space-y-5"
            style={{ borderColor: activo ? 'rgba(2,212,126,0.15)' : '#f1f5f9', background: 'rgba(255,255,255,0.7)' }}
          >
            {modulo.sesiones.map(ses => {
              const modalidadColor =
                ses.modalidad === 'sincrono'   ? { bg: 'rgba(2,212,126,0.1)',  text: '#02d47e' } :
                ses.modalidad === 'presencial' ? { bg: 'rgba(245,158,11,0.1)', text: '#b45309' } :
                                                  { bg: 'rgba(4,57,65,0.07)',   text: '#045f6c' }
              return (
                <div key={ses.id}>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md tracking-wide"
                      style={{ background: modalidadColor.bg, color: modalidadColor.text }}>
                      {ses.id}
                    </span>
                    <span className="text-xs font-bold flex-1 min-w-0 truncate" style={{ color: '#043941' }}>{ses.nombre}</span>
                    <span className="text-[10px] font-medium tabular-nums shrink-0" style={{ color: '#94a3b8' }}>
                      {ses.duracionHoras}h
                    </span>
                  </div>
                </div>
              )
            })}

            <div className="pt-1">
              {bloqueado ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl w-fit" style={{ background: '#f1f5f9' }}>
                  <Lock size={12} style={{ color: '#cbd5e1' }} />
                  <span className="text-xs font-semibold" style={{ color: '#94a3b8' }}>
                    Completa el módulo anterior para acceder
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => navigate(`/taller/${slug}/ruta/modulo/${modulo.numero}`)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:opacity-90"
                  style={{ background: activo ? 'linear-gradient(90deg, #02d47e, #00c16e)' : '#043941' }}
                >
                  <Icon size={14} />
                  {activo ? 'Continuar módulo' : completado ? 'Repasar módulo' : 'Comenzar módulo'}
                  <ChevronRight size={13} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* M3 quiz warning */}
        {modulo.numero === 3 && estado === 'bloqueado' && (
          <div className="px-5 py-3 border-t flex items-center gap-2"
            style={{ borderColor: '#fecaca', background: '#fee2e2' }}>
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
