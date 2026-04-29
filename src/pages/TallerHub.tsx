// src/pages/TallerHub.tsx
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { Package, ArrowRight, ExternalLink } from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { useProgress } from '@/contexts/ProgressContext'
import { modulosLXP } from '@/data/modulosLXP'
import { getBienesByTaller } from '@/data/bienesData'
import { getProximaSesion, formatFechaSesion, formatHoraSesion, diasParaSesion } from '@/data/sesionesLXP'

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}


export default function TallerHub() {
  const { taller, slug } = useTaller()
  const navigate = useNavigate()
  const { getEstadoModuloLXP, getModuloProgreso, getTallerProgreso, getContenidoEstado } = useProgress()

  const compHeaderReveal = useReveal()
  const compGridReveal   = useReveal(0.08)
  const rutaReveal       = useReveal()
  const repoReveal       = useReveal()

  if (!taller || !slug) return null

  const todosLos     = getBienesByTaller(slug)
  const totalHoras   = modulosLXP.reduce((a, m) => a + m.horasTotal, 0)
  const isGeneralEpt = slug === 'taller-general-ept'
  const tallerColor  = `hsl(${taller.color})`

  // Módulo activo: primero en_curso, sino primer disponible
  const currentMod =
    modulosLXP.find(m => getEstadoModuloLXP(m.id) === 'en_curso') ??
    modulosLXP.find(m => getEstadoModuloLXP(m.id) === 'disponible') ??
    modulosLXP[0]
  const currentModPct  = getModuloProgreso(slug, currentMod.numero)
  const tallerProgreso = getTallerProgreso(slug)
  const proximaSesion  = getProximaSesion(slug)

  // Últimos contenidos completados (últimos 3, orden inverso)
  const recentCompleted: { titulo: string; tipo: string }[] = []
  for (let mi = modulosLXP.length - 1; mi >= 0 && recentCompleted.length < 3; mi--) {
    const mod = modulosLXP[mi]
    for (let si = mod.sesiones.length - 1; si >= 0 && recentCompleted.length < 3; si--) {
      const ses = mod.sesiones[si]
      for (let ci = ses.contenidos.length - 1; ci >= 0 && recentCompleted.length < 3; ci--) {
        const c = ses.contenidos[ci]
        if (getContenidoEstado(c.id).completed) {
          recentCompleted.push({ titulo: c.titulo, tipo: c.tipo })
        }
      }
    }
  }

  return (
    <div style={{ background: '#f0faf5', fontFamily: 'Manrope, sans-serif' }}>

      {/* ══ TOP INFO BAR ══════════════════════════════════════════════════════ */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(4,57,65,0.08)' }}>
        <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Izquierda: icono + nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: `${tallerColor}18`, border: `1.5px solid ${tallerColor}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
            }}>
              {taller.icon ?? '🔧'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: 20, fontWeight: 900, color: '#043941', margin: 0, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                {taller.nombre}
              </h1>
              <span style={{
                background: tallerColor, color: '#fff',
                fontSize: 10, fontWeight: 800, padding: '2px 8px',
                borderRadius: 100, letterSpacing: '.05em', flexShrink: 0,
              }}>
                T{String(taller.numero).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Derecha: stats + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexShrink: 0 }}>
            {!isGeneralEpt && (
              <>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: '#043941', margin: 0, lineHeight: 1 }}>{modulosLXP.length}</p>
                  <p style={{ fontSize: 10, color: '#94a3b8', margin: '3px 0 0', fontWeight: 600, letterSpacing: '.04em' }}>módulos</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: '#043941', margin: 0, lineHeight: 1 }}>{totalHoras}h</p>
                  <p style={{ fontSize: 10, color: '#94a3b8', margin: '3px 0 0', fontWeight: 600, letterSpacing: '.04em' }}>totales</p>
                </div>
              </>
            )}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#043941', margin: 0, lineHeight: 1 }}>{todosLos.length}</p>
              <p style={{ fontSize: 10, color: '#94a3b8', margin: '3px 0 0', fontWeight: 600, letterSpacing: '.04em' }}>bienes</p>
            </div>
            {/* divider */}
            <div style={{ width: 1, height: 32, background: 'rgba(4,57,65,0.08)' }} />
            {!isGeneralEpt && (
              <button
                onClick={() => navigate(`/taller/${slug}/ruta`)}
                style={{
                  background: '#043941', color: '#02d47e', border: 'none',
                  borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 800,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
                  fontFamily: 'inherit', whiteSpace: 'nowrap',
                  transition: 'opacity .18s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Ver ruta completa <ArrowRight size={14} />
              </button>
            )}
            <button
              onClick={() => navigate(`/taller/${slug}/repositorio`)}
              style={{
                background: 'none', color: 'rgba(4,57,65,0.55)',
                border: '1.5px solid rgba(4,57,65,0.13)', borderRadius: 12,
                padding: '10px 16px', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all .18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(4,57,65,0.05)'; e.currentTarget.style.color = '#043941' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(4,57,65,0.55)' }}
            >
              <Package size={13} /> Repositorio
            </button>
          </div>
        </div>
      </div>

      {/* ══ BANNER "CONTINÚA DONDE LO DEJASTE" ════════════════════════════════ */}
      {!isGeneralEpt && currentMod && (
        <div style={{ background: 'linear-gradient(135deg, #032e34 0%, #043941 100%)', borderBottom: '1px solid rgba(2,212,126,0.1)' }}>
          <div style={{ padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

            {/* Izquierda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: `${tallerColor}20`, border: `1.5px solid ${tallerColor}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>
                {currentMod.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(2,212,126,0.6)', margin: '0 0 3px' }}>
                  Continúa donde lo dejaste
                </p>
                <p style={{ fontSize: 15, fontWeight: 900, color: '#fff', margin: '0 0 2px', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  M{currentMod.numero} — {currentMod.nombre}
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', margin: 0 }}>
                  {currentMod.horasTotal}h · {currentMod.fase} · {currentMod.sesiones.length} sesiones
                </p>
              </div>
            </div>

            {/* Derecha */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', margin: '0 0 1px', fontWeight: 600 }}>
                  Progreso M{currentMod.numero}
                </p>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#02d47e', margin: 0, lineHeight: 1 }}>
                  {currentModPct.porcentaje}%
                </p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', margin: '2px 0 0' }}>
                  {currentModPct.completados} de {currentModPct.total} actividades
                </p>
              </div>
              <button
                onClick={() => navigate(`/taller/${slug}/ruta/modulo/${currentMod.numero}`)}
                style={{
                  background: '#02d47e', color: '#043941', border: 'none',
                  borderRadius: 12, padding: '11px 22px', fontSize: 13, fontWeight: 800,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
                  fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'opacity .18s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Continuar <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ COMPETENCIAS ══════════════════════════════════════════════════════ */}
      {taller.competencias?.length > 0 && (
        <div style={{ background: '#ffffff', borderBottom: '1px solid rgba(4,57,65,0.06)' }}>
          <div style={{ padding: '28px 32px 32px', display: 'flex', gap: 48, alignItems: 'start', flexWrap: 'wrap' }}>

            {/* Texto principal */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:12 }}>
                <span style={{ display:'inline-block', height:1, width:24, background:'#02d47e' }} />
                Tu valor como docente
              </span>
              <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(4,57,65,0.75)', lineHeight: 1.8, margin: 0, maxWidth: 520 }}>
                A través de esta ruta aprenderás a <strong style={{ color: '#043941', fontWeight: 800 }}>conocer, instalar y operar</strong> el equipamiento de tu taller de {taller.nombreCorto.toLowerCase()}.
                {' '}Pasarás del dominio técnico al pedagógico — diseñando sesiones reales y evaluando las competencias de tus estudiantes con criterio.
              </p>
            </div>

            {/* Pilares pequeños */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              {[
                { n: '01', label: 'Dominio del equipamiento' },
                { n: '02', label: 'Diseño de sesiones técnicas' },
                { n: '03', label: 'Evaluación por competencias' },
                { n: '04', label: 'Certificación docente MINEDU' },
              ].map(p => (
                <div key={p.n} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 14px 8px 10px',
                  borderRadius: 10,
                  background: `${tallerColor}08`,
                  border: `1px solid ${tallerColor}20`,
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 800, color: '#fff',
                    background: tallerColor, borderRadius: 6,
                    width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, letterSpacing: '0.02em',
                  }}>{p.n}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#043941' }}>{p.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ══ SECUENCIA + SIDEBAR ═══════════════════════════════════════════════ */}
      <div className={`px-8 py-8 grid gap-6 items-start ${isGeneralEpt ? '' : 'lg:grid-cols-[1fr_320px]'}`}>

        {/* ── SECUENCIA DE MÓDULOS ── */}
        {!isGeneralEpt && (
          <div
            ref={rutaReveal.ref}
            style={{ opacity: rutaReveal.visible ? 1 : 0, transform: rutaReveal.visible ? 'none' : 'translateY(20px)', transition: 'opacity .5s ease, transform .5s ease' }}
          >
            <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 16px rgba(4,57,65,0.06)', overflow: 'hidden' }}>

              {/* Header */}
              <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid rgba(4,57,65,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: 15, fontWeight: 800, color: '#043941', margin: '0 0 2px', letterSpacing: '-0.01em' }}>Secuencia de módulos</h2>
                  <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
                    {modulosLXP.filter(m => getEstadoModuloLXP(m.id) === 'completado').length} completados
                    {' · '}
                    {modulosLXP.filter(m => getEstadoModuloLXP(m.id) !== 'completado').length} pendientes
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/taller/${slug}/ruta`)}
                  style={{ background: 'none', border: '1.5px solid rgba(4,57,65,0.12)', borderRadius: 10, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: '#043941', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  Ver todo <ArrowRight size={11} />
                </button>
              </div>

              {/* Filas de módulos */}
              <div>
                {modulosLXP.map((m, i) => {
                  const estado = getEstadoModuloLXP(m.id)
                  const pct    = getModuloProgreso(slug, m.numero).porcentaje
                  const isCurrent = m.id === currentMod?.id
                  const bloqueador = i > 0 ? modulosLXP[i - 1] : null

                  // badge config
                  const badge = {
                    completado: { label: '✓ Completado', bg: 'rgba(2,212,126,0.1)',  color: '#059669' },
                    en_curso:   { label: '• En curso',   bg: `${tallerColor}18`,      color: tallerColor },
                    disponible: { label: '◦ Disponible', bg: 'rgba(14,165,233,0.1)', color: '#0ea5e9' },
                    bloqueado:  { label: '🔒 Bloqueado', bg: 'rgba(4,57,65,0.05)',   color: 'rgba(4,57,65,0.35)' },
                  }[estado]

                  return (
                    <div
                      key={m.id}
                      onClick={() => estado !== 'bloqueado' && navigate(`/taller/${slug}/ruta/modulo/${m.numero}`)}
                      style={{
                        borderBottom: i < modulosLXP.length - 1 ? '1px solid rgba(4,57,65,0.05)' : 'none',
                        padding: '12px 24px',
                        background: isCurrent ? `${tallerColor}06` : 'transparent',
                        cursor: estado !== 'bloqueado' ? 'pointer' : 'default',
                        transition: 'background .16s',
                      }}
                      onMouseEnter={e => { if (estado !== 'bloqueado') (e.currentTarget as HTMLElement).style.background = `${tallerColor}0a` }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isCurrent ? `${tallerColor}06` : 'transparent' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        {/* Icono */}
                        <div style={{
                          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 18,
                          background: estado === 'completado' ? 'rgba(2,212,126,0.12)'
                            : estado === 'en_curso'  ? `${tallerColor}18`
                            : estado === 'disponible'? 'rgba(14,165,233,0.1)'
                            : 'rgba(4,57,65,0.05)',
                          opacity: estado === 'bloqueado' ? 0.45 : 1,
                        }}>
                          {m.icon}
                        </div>

                        {/* Nombre + meta */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: estado === 'bloqueado' ? 'rgba(4,57,65,0.3)' : '#02d47e', fontVariantNumeric: 'tabular-nums' }}>
                              M{m.numero}
                            </span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: estado === 'bloqueado' ? 'rgba(4,57,65,0.4)' : '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {m.nombre}
                            </span>
                            {isCurrent && (
                              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: tallerColor, flexShrink: 0 }}>
                                Quiz requerido
                              </span>
                            )}
                          </div>
                          {estado === 'bloqueado' && bloqueador ? (
                            <p style={{ fontSize: 11, color: '#ef4444', margin: 0 }}>
                              Requiere completar {bloqueador.nombre} al 100%
                            </p>
                          ) : (
                            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
                              {m.horasTotal}h · {m.sesiones.length} sesiones
                              {pct > 0 && pct < 100 ? ` · ${pct}%` : ''}
                            </p>
                          )}
                        </div>

                        {/* Badge + horas */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                          <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>{m.horasTotal}h</span>
                          <span style={{
                            fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 100,
                            background: badge.bg, color: badge.color,
                          }}>
                            {badge.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── SIDEBAR DERECHA ── */}
        {!isGeneralEpt && (
          <div
            ref={repoReveal.ref}
            style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: repoReveal.visible ? 1 : 0, transform: repoReveal.visible ? 'none' : 'translateY(20px)', transition: 'opacity .5s ease .1s, transform .5s ease .1s' }}
          >

            {/* ① Progreso global */}
            <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 16px rgba(4,57,65,0.06)', padding: '20px' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.38)', margin: '0 0 14px' }}>Tu progreso global</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                {/* Ring */}
                <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
                  <svg width={80} height={80} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
                    <circle cx={40} cy={40} r={33} fill="none" stroke="rgba(4,57,65,0.07)" strokeWidth={7} />
                    <circle cx={40} cy={40} r={33} fill="none" stroke={tallerColor} strokeWidth={7}
                      strokeDasharray={`${Math.min(tallerProgreso.porcentaje / 100, 1) * 2 * Math.PI * 33} ${2 * Math.PI * 33}`}
                      strokeLinecap="round" style={{ transition: 'stroke-dasharray .6s ease' }} />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#043941' }}>
                    {tallerProgreso.porcentaje}%
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 900, color: '#043941', margin: '0 0 2px' }}>
                    {modulosLXP.filter(m => getEstadoModuloLXP(m.id) === 'completado').length} de {modulosLXP.length} módulos
                  </p>
                  <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 8px' }}>
                    {Math.round(tallerProgreso.porcentaje * totalHoras / 100)}h de {totalHoras}h totales
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: tallerColor, margin: 0 }}>{taller.nombreCorto}</p>
                  {/* barra */}
                  <div style={{ height: 4, width: 120, background: 'rgba(4,57,65,0.07)', borderRadius: 4, marginTop: 4 }}>
                    <div style={{ height: '100%', width: `${tallerProgreso.porcentaje}%`, background: tallerColor, borderRadius: 4, transition: 'width .6s ease' }} />
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/taller/${slug}/ruta/modulo/${currentMod.numero}`)}
                style={{ width: '100%', background: '#043941', color: '#02d47e', border: 'none', borderRadius: 12, padding: '11px', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, transition: 'opacity .18s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Continuar M{currentMod.numero} — {currentMod.nombre.split(' ').slice(0, 2).join(' ')} <ArrowRight size={13} />
              </button>
            </div>

            {/* ② Próxima sesión */}
            {proximaSesion && (
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 16px rgba(4,57,65,0.06)', padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316', flexShrink: 0, boxShadow: '0 0 0 3px rgba(249,115,22,0.2)' }} />
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#f97316', margin: 0 }}>
                    Próxima sesión · en {diasParaSesion(proximaSesion.fecha)}d
                  </p>
                </div>
                <p style={{ fontSize: 14, fontWeight: 800, color: '#043941', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {proximaSesion.titulo}
                </p>
                <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 14px' }}>
                  {formatFechaSesion(proximaSesion.fecha)} · {formatHoraSesion(proximaSesion.fecha)} · {proximaSesion.duracionMin} min
                </p>
                {proximaSesion.link ? (
                  <a
                    href={proximaSesion.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', background: '#f97316', color: '#fff', border: 'none', borderRadius: 11, padding: '10px', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', transition: 'opacity .18s', boxSizing: 'border-box' }}
                  >
                    <ExternalLink size={13} /> Unirse a la sesión
                  </a>
                ) : (
                  <p style={{ fontSize: 11, textAlign: 'center', color: '#94a3b8', margin: 0 }}>Enlace disponible próximamente</p>
                )}
              </div>
            )}

            {/* ③ Actividad reciente */}
            {recentCompleted.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 16px rgba(4,57,65,0.06)', padding: '18px 20px' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.38)', margin: '0 0 12px' }}>Actividad reciente</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {recentCompleted.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: tallerColor, flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.titulo}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: item.tipo === 'QUIZ' ? '#059669' : '#0ea5e9', flexShrink: 0 }}>
                        {item.tipo === 'QUIZ' ? 'Aprobado' : 'Completado'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  )
}

// ── Competencia card con borde de acento y hover ───────────────────────────────
function CompetenciaCard({ index, text, color }: { index: number; text: string; color: string }) {
  return (
    <div
      className="flex items-start gap-4 p-4 transition-all duration-200 cursor-default"
      style={{
        borderRadius: 20,
        background: '#fafffe',
        border: '1px solid rgba(4,57,65,0.07)',
        borderLeft: `4px solid ${color}`,
        boxShadow: '0 4px 20px rgba(4,57,65,.08)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(4,57,65,0.13)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'none'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(4,57,65,.08)'
      }}
    >
      <span style={{
        fontSize: 26, fontWeight: 800, lineHeight: 1, flexShrink: 0, marginTop: 2,
        color: color,
        fontFamily: "'DM Mono', 'Courier New', monospace",
        opacity: 0.55,
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="text-sm font-semibold leading-snug" style={{ color: '#043941', lineHeight: 1.6 }}>
        {text}
      </span>
    </div>
  )
}
