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

  return (
    <div style={{ background: 'var(--grama-bg)', fontFamily: 'Manrope, sans-serif' }}>

      {/* ══ TOP INFO BAR ══════════════════════════════════════════════════════ */}
      <div style={{ background: '#043941' }}>
        <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

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
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: 0, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {taller.competencias.slice(0, 3).map(c => c.split(' ').slice(0, 3).join(' ')).join(' · ')}
              </p>
            </div>
          </div>

          {/* Derecha: stats + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexShrink: 0 }}>
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
            {!isGeneralEpt && (
              <button
                onClick={() => navigate(`/taller/${slug}/ruta`)}
                style={{ background: '#02d47e', color: '#043941', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'opacity .18s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Ver ruta completa <ArrowRight size={14} />
              </button>
            )}
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

      {/* ══ CTA CONTINÚA ════════════════════════════════════════════════════ */}
      {!isGeneralEpt && currentMod && (
        <div style={{
          background: allCompleted ? 'rgba(2,212,126,0.06)' : 'rgba(4,57,65,0.03)',
          borderBottom: `1px solid ${allCompleted ? 'rgba(2,212,126,0.18)' : 'rgba(4,57,65,0.08)'}`,
          padding: '18px 32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

            {/* Izquierda: ícono + contexto + progreso */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, background: allCompleted ? 'rgba(2,212,126,0.15)' : `${tallerColor}18` }}>
                {allCompleted ? <CheckCircle2 size={22} style={{ color: '#02d47e' }} /> : currentMod.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: allCompleted ? '#02d47e' : tallerColor, margin: '0 0 3px' }}>
                  {allCompleted
                    ? '¡Formación completada!'
                    : currentEstado === 'en_curso'
                      ? 'Continúa donde lo dejaste'
                      : 'Comienza tu formación'}
                </p>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#043941', margin: '0 0 6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {allCompleted
                    ? 'Has completado todos los módulos del taller'
                    : `M${currentMod.numero} — ${currentMod.nombre}`}
                </p>
                {!allCompleted && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 180, height: 4, borderRadius: 2, background: 'rgba(4,57,65,0.10)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${currentProg?.porcentaje ?? 0}%`, background: tallerColor, borderRadius: 2, transition: 'width .4s ease' }} />
                    </div>
                    <span style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {currentProg?.porcentaje ?? 0}%
                      {nextSes ? ` · Próximo: ${nextSes.nombre}` : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Derecha: botón CTA */}
            <button
              onClick={() => navigate(
                allCompleted
                  ? `/taller/${slug}/ruta`
                  : `/taller/${slug}/ruta/modulo/${currentMod.numero}`
              )}
              style={{ background: allCompleted ? '#02d47e' : tallerColor, color: allCompleted ? '#043941' : '#fff', border: 'none', borderRadius: 12, padding: '11px 24px', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0, transition: 'opacity .18s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <PlayCircle size={15} />
              {allCompleted
                ? 'Ver ruta completa'
                : currentEstado === 'en_curso' ? 'Continuar' : 'Empezar'}
            </button>
          </div>
        </div>
      )}

      {/* ══ COMPETENCIAS ══════════════════════════════════════════════════════ */}
      {taller.competencias?.length > 0 && (
        <div style={{ background: '#ffffff', borderBottom: '1px solid rgba(4,57,65,0.07)' }}>
          <div style={{ padding: '24px 32px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>

            <div>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: '#02d47e', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'inline-block', height: 1, width: 20, background: '#02d47e' }} />
                Tu valor como docente
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { Icon: GraduationCap, title: 'Certificación docente MINEDU', sub: 'Constancia emitida por Inopin al completar el taller' },
                  { Icon: FileText,      title: 'Sesiones y materiales listos para clase', sub: 'Fichas, guías y recursos descargables por módulo' },
                  { Icon: Package,       title: 'Repositorio completo del taller', sub: `${todosLos.length} bienes con fichas técnicas y manuales de uso` },
                  { Icon: Users,         title: 'Comunidad de docentes EPT', sub: 'Red de pares, soporte especializado y sesiones en vivo' },
                ].map(({ Icon, title, sub }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(4,57,65,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} style={{ color: '#043941' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#043941', margin: '0 0 2px', lineHeight: 1.3 }}>{title}</p>
                      <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: '#02d47e', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'inline-block', height: 1, width: 20, background: '#02d47e' }} />
                Lo que lograrás
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {taller.competencias.map((comp, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: tallerColor, flexShrink: 0, marginTop: 2 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#043941', lineHeight: 1.5 }}>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ══ REPOSITORIO (full-width) ══════════════════════════════════════════ */}
      {!isGeneralEpt && (
        <div style={{ padding: '24px 32px' }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.07)', overflow: 'hidden' }}>

            <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid rgba(4,57,65,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#043941', margin: '0 0 2px', letterSpacing: '-0.01em' }}>Repositorio del taller</h2>
                <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{todosLos.length} bienes · {zonas.length} zonas</p>
              </div>
              <button
                onClick={() => navigate(`/taller/${slug}/repositorio`)}
                style={{ background: 'none', border: '1.5px solid rgba(4,57,65,0.12)', borderRadius: 10, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: '#043941', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5 }}
              >
                Ver todo <ArrowRight size={11} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
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
                      padding: '16px 24px', cursor: 'pointer', transition: 'background .16s',
                      borderRight: (i + 1) % 2 !== 0 ? '1px solid rgba(4,57,65,0.07)' : 'none',
                      borderBottom: i < zonas.length - 2 ? '1px solid rgba(4,57,65,0.07)' : 'none',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(4,57,65,0.02)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: colores.bg }}>
                        <span style={{ fontSize: 14, fontWeight: 900, color: colores.color }}>{nombre[0]}</span>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#043941' }}>{nombre}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: colores.color, padding: '1px 7px', borderRadius: 100 }}>{bienesZona.length}</span>
                        </div>
                        <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 0', lineHeight: 1.4 }}>
                          {ejemplos.join(' · ')}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <ChevronRight size={13} style={{ color: 'rgba(4,57,65,0.2)' }} />
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

