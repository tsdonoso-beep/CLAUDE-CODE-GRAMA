// src/components/lxp/ModuloCard.tsx
import { useState } from 'react'
import { ChevronRight, Lock } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ModuloLXP } from '@/data/modulosLXP'
import type { EstadoModulo } from '@/mock/mockEstados'

interface ModuloCardProps {
  modulo: ModuloLXP
  estado: EstadoModulo
  moduloProgreso?: { porcentaje: number; completados: number; total: number }
  isLast?: boolean
}


export function ModuloCard({ modulo, estado, moduloProgreso, isLast = false }: ModuloCardProps) {
  const [expandido, setExpandido] = useState(estado === 'en_curso' || estado === 'completado')
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const bloqueado  = estado === 'bloqueado'
  const activo     = estado === 'en_curso'
  const completado = estado === 'completado'

  const pct = moduloProgreso?.porcentaje ?? 0
  const completadosSes = moduloProgreso?.completados ?? 0
  const totalSes       = moduloProgreso?.total ?? modulo.sesiones.reduce((a, s) => a + s.contenidos.length, 0)

  /* ── borde izquierdo por estado ── */
  const borderColor = completado ? '#02d47e' : activo ? '#02d47e' : estado === 'disponible' ? '#0ea5e9' : 'transparent'

const ctaLabel = completado ? 'Repasar módulo' : activo ? 'Continuar módulo' : 'Comenzar módulo'

  return (
    <div style={{
      display: 'flex',
      marginBottom: isLast ? 0 : 8,
      position: 'relative',
    }}>
      {/* Línea vertical timeline */}
      {!isLast && (
        <div style={{
          position: 'absolute', left: 19, top: 48, bottom: -8,
          width: 2, background: completado ? '#02d47e' : 'rgba(4,57,65,0.08)',
          zIndex: 0,
        }} />
      )}

      {/* Dot */}
      <div style={{
        width: 40, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 14, zIndex: 1,
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800,
          background: completado ? '#02d47e' : activo ? '#043941' : bloqueado ? '#e2e8f0' : '#e2e8f0',
          border: activo ? '2.5px solid #02d47e' : 'none',
          color: completado ? '#fff' : activo ? '#02d47e' : '#94a3b8',
          boxShadow: activo ? '0 0 0 4px rgba(2,212,126,0.15)' : 'none',
        }}>
          {completado ? '✓' : bloqueado ? <Lock size={10} /> : modulo.numero}
        </div>
      </div>

      {/* Card */}
      <div style={{
        flex: 1,
        background: '#fff',
        borderRadius: 14,
        border: '1px solid rgba(4,57,65,0.07)',
        borderLeft: `3px solid ${borderColor}`,
        boxShadow: activo ? '0 2px 16px rgba(2,212,126,0.1)' : '0 1px 6px rgba(4,57,65,0.05)',
        overflow: 'hidden',
        opacity: bloqueado ? 0.6 : 1,
      }}>

        {/* Header */}
        <button
          onClick={() => !bloqueado && setExpandido(e => !e)}
          style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: bloqueado ? 'default' : 'pointer', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'inherit' }}
        >
          {/* Módulo icon */}
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: bloqueado ? 'rgba(4,57,65,0.05)' : completado ? 'rgba(2,212,126,0.12)' : activo ? 'rgba(4,57,65,0.1)' : 'rgba(14,165,233,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>
            {bloqueado ? '🔒' : modulo.icon}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: bloqueado ? '#94a3b8' : '#02d47e' }}>M{modulo.numero}</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: bloqueado ? '#94a3b8' : '#043941' }}>
                {modulo.nombre}
              </span>
              {activo && (
                <span style={{ fontSize: 10, fontWeight: 700, color: '#02d47e', background: 'rgba(2,212,126,0.1)', padding: '2px 7px', borderRadius: 100 }}>• En curso</span>
              )}
              {completado && (
                <span style={{ fontSize: 10, fontWeight: 700, color: '#059669', background: 'rgba(5,150,105,0.1)', padding: '2px 7px', borderRadius: 100 }}>✓ Completado</span>
              )}
              {/* Quiz requerido badge — si el módulo tiene un contenido bloqueante */}
              {(activo || completado) && modulo.sesiones.some(s => s.contenidos.some(c => c.bloqueaSiguiente)) && (
                <span style={{ fontSize: 10, fontWeight: 700, color: '#d97706', background: 'rgba(217,119,6,0.1)', padding: '2px 7px', borderRadius: 100 }}>Quiz requerido</span>
              )}
            </div>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
              {bloqueado
                ? `${modulo.horasTotal}h · ${modulo.fase} · ${modulo.sesiones.length} secciones`
                : `${completadosSes}/${totalSes} secciones`
              }
            </p>
          </div>

          {/* Horas + chevron */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>{modulo.horasTotal}h</span>
            <ChevronRight size={14} style={{ color: '#94a3b8', transform: expandido ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }} />
          </div>
        </button>

        {/* Barra de progreso del módulo */}
        {!bloqueado && (
          <div style={{ height: 3, background: 'rgba(4,57,65,0.06)', margin: '0 16px 0' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: '#02d47e', borderRadius: 3, transition: 'width .5s ease' }} />
          </div>
        )}

        {/* Mensaje bloqueado */}
        {bloqueado && (
          <div style={{ padding: '8px 16px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: '#ef4444' }}>⊘</span>
            <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Completa los módulos anteriores para desbloquear</span>
          </div>
        )}

        {/* Expanded: solo sesiones (sin detalle de contenidos) */}
        {expandido && !bloqueado && (
          <div style={{ padding: '0 16px 14px', borderTop: '1px solid rgba(4,57,65,0.06)' }}>
            {modulo.sesiones.map((ses, si) => (
              <div
                key={ses.id}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: si < modulo.sesiones.length - 1 ? '1px solid rgba(4,57,65,0.05)' : 'none', marginTop: si === 0 ? 8 : 0 }}
              >
                <span style={{ fontSize: 10, fontWeight: 800, color: '#02d47e', flexShrink: 0, minWidth: 20 }}>S{si + 1}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#043941', flex: 1 }}>{ses.nombre}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>{ses.contenidos.length} items</span>
                  {ses.duracionHoras > 0 && (
                    <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>{ses.duracionHoras}h</span>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={() => navigate(`/taller/${slug}/ruta/modulo/${modulo.numero}`)}
              style={{ marginTop: 10, background: activo ? '#043941' : completado ? 'rgba(4,57,65,0.07)' : '#043941', color: activo ? '#02d47e' : completado ? '#043941' : '#02d47e', border: 'none', borderRadius: 10, padding: '9px 18px', fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              {ctaLabel} →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
