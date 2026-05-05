// src/pages/TallerHub.tsx
import { useNavigate } from 'react-router-dom'
import { Package, ArrowRight, GraduationCap, FileText, Users, Car, Scissors, ChefHat, Hammer, Monitor, Cpu, UtensilsCrossed, Zap, Wrench, ChevronRight, CheckCircle2, PlayCircle } from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { useProgress } from '@/contexts/ProgressContext'
import { modulosLXP } from '@/data/modulosLXP'
import { getBienesByTaller, getBienesByZona, getZonasUnicasByTaller } from '@/data/bienesData'

const TALLER_ICON_MAP: Record<string, React.ElementType> = {
  Car, Scissors, ChefHat, Hammer, Monitor, Cpu, UtensilsCrossed, Zap, Wrench, Package,
}

// Acorta el nombre largo de zona para mostrar en UI
function zonaNombre(z: string) {
  if (z.includes('INVESTIGACIÓN')) return 'Investigación'
  if (z.includes('INNOVACIÓN'))    return 'Innovación'
  if (z.includes('DEPÓSITO'))      return 'Depósito'
  if (z.includes('SEGURIDAD'))     return 'Seguridad'
  return z.replace('ZONA DE ', '').split('/')[0].trim()
    .split(' ').map(w => w[0] + w.slice(1).toLowerCase()).join(' ')
}

const ZONA_COLORS: Record<string, { color: string; bg: string }> = {
  'Investigación': { color: '#0369a1', bg: 'rgba(3,105,161,0.07)' },
  'Innovación':    { color: '#059669', bg: 'rgba(5,150,105,0.07)' },
  'Depósito':      { color: '#b45309', bg: 'rgba(180,83,9,0.07)'  },
  'Seguridad':     { color: '#dc2626', bg: 'rgba(220,38,38,0.07)' },
}

export default function TallerHub() {
  const { taller, slug } = useTaller()
  const navigate = useNavigate()
  const { getEstadoModuloLXP, getModuloProgreso } = useProgress()

  if (!taller || !slug) return null

  const todosLos     = getBienesByTaller(slug)
  const totalHoras   = modulosLXP.reduce((a, m) => a + m.horasTotal, 0)
  const isGeneralEpt = slug === 'taller-general-ept'
  const tallerColor  = `hsl(${taller.color})`

  const currentMod =
    modulosLXP.find(m => getEstadoModuloLXP(m.id) === 'en_curso') ??
    modulosLXP.find(m => getEstadoModuloLXP(m.id) === 'disponible') ??
    modulosLXP[0]

  const allCompleted   = modulosLXP.every(m => getEstadoModuloLXP(m.id) === 'completado')
  const currentEstado  = currentMod ? getEstadoModuloLXP(currentMod.id) : null
  const currentProg    = currentMod ? getModuloProgreso(slug, currentMod.numero) : null

  // Primera sesión incompleta dentro del módulo actual
  const nextSes = (() => {
    if (!currentMod || !currentProg) return null
    let remaining = currentProg.completados
    for (const ses of currentMod.sesiones) {
      if (remaining < ses.contenidos.length) return ses
      remaining -= ses.contenidos.length
    }
    return null
  })()

  const zonas = getZonasUnicasByTaller(slug)

  const progresoGeneral = (() => {
    let total = 0, completados = 0
    for (const m of modulosLXP) {
      const p = getModuloProgreso(slug, m.numero)
      total += p.total
      completados += p.completados
    }
    return { total, completados, pct: total > 0 ? Math.round((completados / total) * 100) : 0 }
  })()

  return (
    <div style={{ background: 'var(--grama-bg)', fontFamily: 'Manrope, sans-serif' }}>

      {/* ── Mobile styles ── */}
      <style>{`
        @media (max-width: 767px) {
          .th-topbar-inner  { padding: 14px 16px !important; }
          .th-topbar-stats  { display: none !important; }
          .th-desc-wrap     { padding: 14px 16px 18px !important; }
          .th-value-grid    { grid-template-columns: 1fr 1fr !important; }
          .th-modulos-wrap  { padding: 14px 16px 18px !important; }
          .th-modulos-wrap .mod-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important; }
          .th-repo-wrap     { padding: 14px 14px !important; }
          .th-repo-header   { padding: 14px 16px 12px !important; flex-wrap: wrap !important; gap: 10px !important; }
        }
      `}</style>

      {/* ══ TOP INFO BAR ══════════════════════════════════════════════════════ */}
      <div style={{ background: '#043941' }}>
        <div className="th-topbar-inner" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Izquierda: icono + nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16, flexShrink: 0,
              background: 'rgba(255,255,255,0.10)', border: '1.5px solid rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {(() => { const I = TALLER_ICON_MAP[taller.icon] ?? Package; return <I size={24} style={{ color: '#02d47e' }} /> })()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <h1 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                  {taller.nombre}
                </h1>
                <span style={{
                  background: '#02d47e', color: '#043941',
                  fontSize: 10, fontWeight: 800, padding: '2px 8px',
                  borderRadius: 100, letterSpacing: '.05em', flexShrink: 0,
                }}>
                  T{String(taller.numero).padStart(2, '0')}
                </span>
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0, fontWeight: 500 }}>
                Educación para el Trabajo · EPT
              </p>
            </div>
          </div>

          {/* Derecha: stats + CTA */}
          <div className="th-topbar-stats" style={{ display: 'flex', alignItems: 'center', gap: 28, flexShrink: 0 }}>
            {!isGeneralEpt && (
              <>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>{modulosLXP.length}</p>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', color: 'rgba(255,255,255,0.45)', margin: '3px 0 0', textTransform: 'uppercase' }}>módulos</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>{totalHoras}h</p>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', color: 'rgba(255,255,255,0.45)', margin: '3px 0 0', textTransform: 'uppercase' }}>totales</p>
                </div>
              </>
            )}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>{todosLos.length}</p>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', color: 'rgba(255,255,255,0.45)', margin: '3px 0 0', textTransform: 'uppercase' }}>bienes</p>
            </div>
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.15)' }} />
            <button
              onClick={() => navigate(`/taller/${slug}/repositorio`)}
              style={{ background: 'none', color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 12, padding: '10px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >
              <Package size={13} /> Repositorio
            </button>
          </div>
        </div>
      </div>

      {/* ══ POR QUÉ VALE LA PENA ═════════════════════════════════════════════ */}
      <div className="th-desc-wrap" style={{ background: '#fff', borderBottom: '1px solid rgba(4,57,65,0.07)', padding: '20px 32px 22px' }}>

        {/* Encabezado */}
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: tallerColor, margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ display: 'inline-block', width: 16, height: 2, background: tallerColor, borderRadius: 2, flexShrink: 0 }} />
          Por qué vale la pena esta ruta
        </p>
        <p style={{ fontSize: 13, color: '#4a6568', lineHeight: 1.7, margin: '0 0 16px', maxWidth: 760, fontWeight: 500 }}>
          {taller.descripcion}
        </p>

        {/* Grid de valor: progress card (si aplica) + 3 benefit cards */}
        <div className="th-value-grid" style={{ display: 'grid', gridTemplateColumns: !isGeneralEpt ? '160px 1fr 1fr 1fr' : 'repeat(3, 1fr)', gap: 10 }}>

          {/* Card progreso general */}
          {!isGeneralEpt && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '16px 12px', borderRadius: 12, background: `${tallerColor}07`, border: `1.5px solid ${tallerColor}22`, textAlign: 'center' }}>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: tallerColor, margin: 0 }}>Tu avance</p>
              <svg width={52} height={52} style={{ display: 'block', transform: 'rotate(-90deg)', flexShrink: 0 }}>
                <circle cx={26} cy={26} r={21} fill="none" stroke="rgba(4,57,65,0.08)" strokeWidth={4.5} />
                <circle cx={26} cy={26} r={21} fill="none" stroke={tallerColor} strokeWidth={4.5}
                  strokeDasharray={`${(progresoGeneral.pct / 100) * 2 * Math.PI * 21} ${2 * Math.PI * 21}`}
                  strokeLinecap="round" style={{ transition: 'stroke-dasharray .6s ease' }} />
              </svg>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#043941', margin: 0, lineHeight: 1 }}>{progresoGeneral.pct}%</p>
              <p style={{ fontSize: 10, color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                {progresoGeneral.completados}/{progresoGeneral.total} contenidos
              </p>
            </div>
          )}

          {/* Cards de beneficio — orden: meta → práctica diaria → recurso permanente */}
          {[
            { Icon: GraduationCap, title: 'Certificación docente',  desc: 'Constancia oficial al completar el programa, válida para tu institución y expediente docente.' },
            { Icon: FileText,      title: 'Materiales listos para clase',  desc: 'Sesiones, guías y recursos descargables por módulo. Planifica y enseña sin empezar desde cero.' },
            { Icon: Package,       title: 'Repositorio del taller',        desc: `${todosLos.length} bienes con fichas técnicas y manuales de operación — acceso permanente, dentro y fuera de la ruta.` },
          ].map(({ Icon, title, desc }, i) => (
            <div key={i} style={{ padding: '16px', borderRadius: 12, background: '#f8fafc', border: '1px solid rgba(4,57,65,0.06)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${tallerColor}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Icon size={16} style={{ color: tallerColor }} />
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#043941', margin: '0 0 5px', lineHeight: 1.3 }}>{title}</p>
              <p style={{ fontSize: 11, color: '#64748b', margin: 0, lineHeight: 1.55 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ MÓDULOS + CTA (fusionados) ═══════════════════════════════════════ */}
      {!isGeneralEpt && currentMod && (
        <div className="th-modulos-wrap" style={{ padding: '22px 32px 26px', borderBottom: '1px solid rgba(4,57,65,0.07)', background: '#f8fafc' }}>
          {/* Header: contexto + botón de acción */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.35)', margin: 0 }}>
                Formación
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: allCompleted ? '#02d47e' : '#043941', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {allCompleted ? '¡Completado!' : currentEstado === 'en_curso'
                    ? `Continúa en M${currentMod.numero} — ${currentMod.nombre}`
                    : `Empieza en M${currentMod.numero} — ${currentMod.nombre}`}
                </p>
                {!allCompleted && currentProg && currentProg.porcentaje > 0 && (
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {currentProg.porcentaje}%
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => navigate(`/taller/${slug}/ruta/modulo/${currentMod.numero}`)}
              style={{ background: allCompleted ? '#02d47e' : '#043941', color: allCompleted ? '#043941' : '#ffffff', border: 'none', borderRadius: 10, padding: '9px 20px', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0, transition: 'opacity .18s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <PlayCircle size={13} />
              {allCompleted ? 'Revisar' : currentEstado === 'en_curso' ? 'Continuar' : 'Empezar'}
            </button>
          </div>
          <div className="mod-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(152px, 1fr))', gap: 8 }}>
            {modulosLXP.map(m => {
              const estado   = getEstadoModuloLXP(m.id)
              const prog     = getModuloProgreso(slug, m.numero)
              const isDone   = estado === 'completado'
              const isActive = estado === 'en_curso'
              const isLocked = estado === 'bloqueado'
              return (
                <button
                  key={m.id}
                  disabled={isLocked}
                  onClick={() => !isLocked && navigate(`/taller/${slug}/ruta/modulo/${m.numero}`)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
                    padding: '12px 14px', borderRadius: 12, textAlign: 'left',
                    border: isDone
                      ? `1.5px solid ${tallerColor}45`
                      : isActive
                        ? `1.5px solid ${tallerColor}`
                        : '1.5px solid rgba(4,57,65,0.09)',
                    background: isDone ? `${tallerColor}07` : isActive ? `${tallerColor}10` : '#fff',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    opacity: isLocked ? 0.38 : 1,
                    fontFamily: 'inherit',
                    transition: 'all .15s',
                    boxShadow: isActive ? `0 0 0 3px ${tallerColor}18` : 'none',
                  }}
                  onMouseEnter={e => { if (!isLocked) (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none' }}
                >
                  {/* Fila superior: icono + badge estado */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ fontSize: 20, lineHeight: 1 }}>{m.icon}</span>
                    {isDone && <CheckCircle2 size={14} style={{ color: tallerColor }} />}
                    {isActive && (
                      <span style={{ fontSize: 7.5, fontWeight: 900, color: '#fff', background: tallerColor, padding: '2px 6px', borderRadius: 100, letterSpacing: '.06em' }}>
                        EN CURSO
                      </span>
                    )}
                    {isLocked && (
                      <span style={{ fontSize: 8, color: 'rgba(4,57,65,0.25)', fontWeight: 700 }}>🔒</span>
                    )}
                  </div>

                  {/* Número + nombre */}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: isDone || isActive ? tallerColor : 'rgba(4,57,65,0.3)', letterSpacing: '.07em', display: 'block', marginBottom: 2 }}>
                      M{m.numero}
                    </span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: isLocked ? '#94a3b8' : '#043941', lineHeight: 1.3, display: 'block' }}>
                      {m.nombre}
                    </span>
                  </div>

                  {/* Horas */}
                  <span style={{ fontSize: 10, fontWeight: 600, color: isDone ? tallerColor : '#94a3b8', background: isDone ? `${tallerColor}12` : 'rgba(4,57,65,0.05)', borderRadius: 6, padding: '2px 7px' }}>
                    {m.horasTotal}h
                  </span>

                  {/* Barra progreso si activo */}
                  {isActive && (
                    <div style={{ width: '100%', height: 3, borderRadius: 2, background: 'rgba(4,57,65,0.08)', marginTop: 2 }}>
                      <div style={{ height: '100%', width: `${prog?.porcentaje ?? 0}%`, background: tallerColor, borderRadius: 2, transition: 'width .4s' }} />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}


      {/* ══ REPOSITORIO (full-width) ══════════════════════════════════════════ */}
      {!isGeneralEpt && (
        <div className="th-repo-wrap" style={{ padding: '24px 32px' }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.07)', overflow: 'hidden' }}>

            <div className="th-repo-header" style={{ padding: '18px 24px 14px', borderBottom: '1px solid rgba(4,57,65,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.35)', margin: '0 0 4px' }}>Repositorio</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#043941', margin: 0, lineHeight: 1.2 }}>{todosLos.length} bienes · {zonas.length} zonas</p>
              </div>
              <button
                onClick={() => navigate(`/taller/${slug}/repositorio`)}
                style={{ background: 'none', border: '1.5px solid rgba(4,57,65,0.12)', borderRadius: 10, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: '#043941', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5 }}
              >
                Ver todo <ArrowRight size={11} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${zonas.length}, 1fr)` }}>
              {zonas.map((zona, i) => {
                const nombre     = zonaNombre(zona)
                const bienesZona = getBienesByZona(slug, zona)
                const colores    = ZONA_COLORS[nombre] ?? { color: tallerColor, bg: `${tallerColor}10` }
                const ejemplos   = bienesZona
                  .filter(b => !b.nombre.toLowerCase().startsWith('manual') && !b.nombre.toLowerCase().includes('video'))
                  .slice(0, 3)
                  .map(b => b.nombre.split(' ').slice(0, 4).join(' '))

                return (
                  <div
                    key={zona}
                    onClick={() => navigate(`/taller/${slug}/repositorio?zona=${encodeURIComponent(zona)}`)}
                    style={{
                      padding: '16px 22px', cursor: 'pointer', transition: 'background .16s',
                      borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(4,57,65,0.07)' : 'none',
                      borderBottom: i < zonas.length - 3 ? '1px solid rgba(4,57,65,0.07)' : 'none',
                      minWidth: 0, overflow: 'hidden',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(4,57,65,0.02)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: colores.bg }}>
                        <span style={{ fontSize: 15, fontWeight: 900, color: colores.color }}>{nombre[0]}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#043941' }}>{nombre}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: colores.color, padding: '1px 7px', borderRadius: 100 }}>{bienesZona.length}</span>
                        </div>
                        <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {ejemplos.join(' · ')}
                        </p>
                      </div>
                      <ChevronRight size={14} style={{ color: 'rgba(4,57,65,0.2)', flexShrink: 0 }} />
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

