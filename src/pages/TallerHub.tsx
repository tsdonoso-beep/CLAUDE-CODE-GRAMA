// src/pages/TallerHub.tsx
import { useNavigate } from 'react-router-dom'
import { Package, ArrowRight, GraduationCap, FileText, Users, Car, Scissors, ChefHat, Hammer, Monitor, Cpu, UtensilsCrossed, Zap, Wrench, ChevronRight } from 'lucide-react'
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

  const zonas = getZonasUnicasByTaller(slug)

  return (
    <div style={{ background: 'var(--grama-bg)', fontFamily: 'Manrope, sans-serif' }}>

      {/* ══ TOP INFO BAR ══════════════════════════════════════════════════════ */}
      <div style={{ background: '#043941' }}>
        <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Izquierda: icono + nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
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
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: '3px 0 0', fontWeight: 600, letterSpacing: '.04em' }}>módulos</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>{totalHoras}h</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: '3px 0 0', fontWeight: 600, letterSpacing: '.04em' }}>totales</p>
                </div>
              </>
            )}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>{todosLos.length}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: '3px 0 0', fontWeight: 600, letterSpacing: '.04em' }}>bienes</p>
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

      {/* ══ SECUENCIA + SIDEBAR ═══════════════════════════════════════════════ */}
      <div className={`px-8 py-8 grid gap-6 items-start ${isGeneralEpt ? '' : 'lg:grid-cols-[1fr_300px]'}`}>

        {/* ── SECUENCIA DE MÓDULOS ── */}
        {!isGeneralEpt && (
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.07)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid rgba(4,57,65,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#043941', margin: '0 0 2px', letterSpacing: '-0.01em' }}>Secuencia de módulos</h2>
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

            <div>
              {modulosLXP.map((m, i) => {
                const estado = getEstadoModuloLXP(m.id)
                const prog   = getModuloProgreso(slug, m.numero)
                const pct    = prog.porcentaje
                const isCurrent = m.id === currentMod?.id
                const tieneQuizBloqueante = m.sesiones.some(s => s.contenidos.some(c => c.bloqueaSiguiente))
                const bloqueadorQuiz = i > 0
                  ? modulosLXP.slice(0, i).reverse().find(prev => prev.sesiones.some(s => s.contenidos.some(c => c.bloqueaSiguiente)))
                  : null

                const badge = {
                  completado: { label: '✓ Completado', bg: 'rgba(2,212,126,0.1)',  color: '#059669' },
                  en_curso:   { label: '• En curso',   bg: 'rgba(4,57,65,0.10)',   color: '#043941' },
                  disponible: { label: '◦ Disponible', bg: 'rgba(14,165,233,0.1)', color: '#0284c7' },
                  bloqueado:  { label: '🔒 Bloqueado', bg: 'rgba(4,57,65,0.07)',   color: 'rgba(4,57,65,0.35)' },
                }[estado]

                return (
                  <div
                    key={m.id}
                    onClick={() => estado !== 'bloqueado' && navigate(`/taller/${slug}/ruta/modulo/${m.numero}`)}
                    style={{ borderBottom: i < modulosLXP.length - 1 ? '1px solid rgba(4,57,65,0.07)' : 'none', padding: '11px 24px', background: isCurrent ? 'rgba(2,212,126,0.04)' : 'transparent', cursor: estado !== 'bloqueado' ? 'pointer' : 'default', transition: 'background .16s' }}
                    onMouseEnter={e => { if (estado !== 'bloqueado') (e.currentTarget as HTMLElement).style.background = 'rgba(4,57,65,0.03)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isCurrent ? 'rgba(2,212,126,0.04)' : 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, background: estado === 'completado' ? 'rgba(2,212,126,0.12)' : estado === 'en_curso' ? 'rgba(4,57,65,0.10)' : estado === 'disponible' ? 'rgba(14,165,233,0.1)' : 'rgba(4,57,65,0.04)', opacity: estado === 'bloqueado' ? 0.4 : 1 }}>
                        {m.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: estado === 'bloqueado' ? 'rgba(4,57,65,0.25)' : '#02d47e' }}>M{m.numero}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: estado === 'bloqueado' ? 'rgba(4,57,65,0.35)' : '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.nombre}</span>
                          {estado === 'en_curso' && tieneQuizBloqueante && (
                            <span style={{ fontSize: 9, fontWeight: 800, color: '#d97706', background: 'rgba(217,119,6,0.1)', padding: '2px 7px', borderRadius: 100, flexShrink: 0 }}>Quiz requerido</span>
                          )}
                        </div>
                        {estado !== 'bloqueado' && (
                          <div style={{ height: 3, background: 'rgba(4,57,65,0.07)', borderRadius: 2, marginBottom: 3 }}>
                            <div style={{ height: '100%', width: `${pct}%`, background: '#02d47e', borderRadius: 2, transition: 'width .4s ease' }} />
                          </div>
                        )}
                        {estado === 'bloqueado' && bloqueadorQuiz ? (
                          <p style={{ fontSize: 11, color: '#ef4444', margin: 0, fontStyle: 'italic' }}>
                            Requiere aprobar Quiz de {bloqueadorQuiz.nombre.split(' ').slice(0, 3).join(' ')} con 80%
                          </p>
                        ) : (
                          <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
                            {m.horasTotal}h · {prog.completados} de {prog.total} secciones{pct > 0 && pct < 100 ? ` · ${pct}%` : ''}
                          </p>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>{m.horasTotal}h</span>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 100, background: badge.bg, color: badge.color }}>{badge.label}</span>
                        {estado !== 'bloqueado' && <span style={{ fontSize: 12, color: 'rgba(4,57,65,0.25)' }}>›</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── SIDEBAR: REPOSITORIO ── */}
        {!isGeneralEpt && (
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.07)', overflow: 'hidden' }}>

            {/* Header — mismo estilo que "Secuencia de módulos" */}
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

            {/* Filas de zona — mismo patrón que las filas de módulo */}
            {zonas.map((zona, i) => {
              const nombre = zonaNombre(zona)
              const bienesZona = getBienesByZona(slug, zona)
              const colores = ZONA_COLORS[nombre] ?? { color: tallerColor, bg: `${tallerColor}10` }
              const ejemplos = bienesZona
                .filter(b => !b.nombre.toLowerCase().startsWith('manual') && !b.nombre.toLowerCase().includes('video'))
                .slice(0, 3)
                .map(b => b.nombre.split(' ').slice(0, 4).join(' '))

              return (
                <div
                  key={zona}
                  onClick={() => navigate(`/taller/${slug}/repositorio?zona=${encodeURIComponent(zona)}`)}
                  style={{ borderBottom: i < zonas.length - 1 ? '1px solid rgba(4,57,65,0.07)' : 'none', padding: '12px 24px', cursor: 'pointer', transition: 'background .16s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(4,57,65,0.03)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {/* Dot de color de zona */}
                    <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: colores.bg }}>
                      <span style={{ fontSize: 13, fontWeight: 900, color: colores.color }}>{nombre[0]}</span>
                    </div>

                    {/* Centro */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#043941' }}>{nombre}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: colores.color, padding: '1px 7px', borderRadius: 100, flexShrink: 0 }}>{bienesZona.length}</span>
                      </div>
                      <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ejemplos.join(' · ')}
                      </p>
                    </div>

                    <ChevronRight size={14} style={{ color: 'rgba(4,57,65,0.25)', flexShrink: 0 }} />
                  </div>
                </div>
              )
            })}

          </div>
        )}

      </div>
    </div>
  )
}

