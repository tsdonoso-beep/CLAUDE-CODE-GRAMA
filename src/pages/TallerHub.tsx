// src/pages/TallerHub.tsx
import { useNavigate } from 'react-router-dom'
import { Package, ArrowRight, GraduationCap, FileText, Users, Car, Scissors, ChefHat, Hammer, Monitor, Cpu, UtensilsCrossed, Zap, Wrench, ChevronRight } from 'lucide-react'

const TALLER_ICON_MAP: Record<string, React.ElementType> = {
  Car, Scissors, ChefHat, Hammer, Monitor, Cpu, UtensilsCrossed, Zap, Wrench, Package,
}
import { useTaller } from '@/hooks/useTaller'
import { useProgress } from '@/contexts/ProgressContext'
import { modulosLXP } from '@/data/modulosLXP'
import { getBienesByTaller, getBienesByZona, getZonasUnicasByTaller } from '@/data/bienesData'

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
    <div style={{ background: '#f0faf5', fontFamily: 'Manrope, sans-serif' }}>

      {/* ══ TOP INFO BAR ══════════════════════════════════════════════════════ */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(4,57,65,0.08)' }}>
        <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Izquierda: icono + nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: `${tallerColor}18`, border: `1.5px solid ${tallerColor}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {(() => { const I = TALLER_ICON_MAP[taller.icon] ?? Package; return <I size={24} style={{ color: tallerColor }} /> })()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
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
              <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {taller.competencias.slice(0, 3).map(c => c.split(' ').slice(0, 3).join(' ')).join(' · ')}
              </p>
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
            <div style={{ width: 1, height: 32, background: 'rgba(4,57,65,0.08)' }} />
            {!isGeneralEpt && (
              <button
                onClick={() => navigate(`/taller/${slug}/ruta`)}
                style={{ background: '#043941', color: '#02d47e', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'opacity .18s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Ver ruta completa <ArrowRight size={14} />
              </button>
            )}
            <button
              onClick={() => navigate(`/taller/${slug}/repositorio`)}
              style={{ background: 'none', color: 'rgba(4,57,65,0.55)', border: '1.5px solid rgba(4,57,65,0.13)', borderRadius: 12, padding: '10px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all .18s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(4,57,65,0.05)'; e.currentTarget.style.color = '#043941' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(4,57,65,0.55)' }}
            >
              <Package size={13} /> Repositorio
            </button>
          </div>
        </div>
      </div>

      {/* ══ COMPETENCIAS ══════════════════════════════════════════════════════ */}
      {taller.competencias?.length > 0 && (
        <div style={{ background: '#ffffff', borderBottom: '1px solid rgba(4,57,65,0.06)' }}>
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
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(4,57,65,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 16px rgba(4,57,65,0.06)', overflow: 'hidden' }}>
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
                  en_curso:   { label: '• En curso',   bg: 'rgba(4,57,65,0.08)',   color: '#043941' },
                  disponible: { label: '◦ Disponible', bg: 'rgba(14,165,233,0.1)', color: '#0284c7' },
                  bloqueado:  { label: '🔒 Bloqueado', bg: 'rgba(4,57,65,0.05)',   color: 'rgba(4,57,65,0.35)' },
                }[estado]

                return (
                  <div
                    key={m.id}
                    onClick={() => estado !== 'bloqueado' && navigate(`/taller/${slug}/ruta/modulo/${m.numero}`)}
                    style={{ borderBottom: i < modulosLXP.length - 1 ? '1px solid rgba(4,57,65,0.05)' : 'none', padding: '11px 24px', background: isCurrent ? 'rgba(2,212,126,0.04)' : 'transparent', cursor: estado !== 'bloqueado' ? 'pointer' : 'default', transition: 'background .16s' }}
                    onMouseEnter={e => { if (estado !== 'bloqueado') (e.currentTarget as HTMLElement).style.background = 'rgba(4,57,65,0.03)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isCurrent ? 'rgba(2,212,126,0.04)' : 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, background: estado === 'completado' ? 'rgba(2,212,126,0.12)' : estado === 'en_curso' ? 'rgba(4,57,65,0.08)' : estado === 'disponible' ? 'rgba(14,165,233,0.1)' : 'rgba(4,57,65,0.04)', opacity: estado === 'bloqueado' ? 0.4 : 1 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Header card */}
            <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.05)', padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.38)', margin: 0 }}>Repositorio del taller</p>
                <button
                  onClick={() => navigate(`/taller/${slug}/repositorio`)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, color: tallerColor, display: 'flex', alignItems: 'center', gap: 3, padding: 0, fontFamily: 'inherit' }}
                >
                  Ver todo <ChevronRight size={12} />
                </button>
              </div>
              <p style={{ fontSize: 28, fontWeight: 900, color: '#043941', margin: '0 0 1px', lineHeight: 1, letterSpacing: '-0.03em' }}>{todosLos.length}</p>
              <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>bienes catalogados · {zonas.length} zonas</p>
            </div>

            {/* Zona cards */}
            {zonas.map(zona => {
              const nombre = zonaNombre(zona)
              const bienesZona = getBienesByZona(slug, zona)
              const colores = ZONA_COLORS[nombre] ?? { color: tallerColor, bg: `${tallerColor}10` }
              const ejemplos = bienesZona
                .filter(b => !b.nombre.toLowerCase().startsWith('manual') && !b.nombre.toLowerCase().includes('video'))
                .slice(0, 3)
                .map(b => b.nombre.split(' ').slice(0, 4).join(' '))

              return (
                <button
                  key={zona}
                  onClick={() => navigate(`/taller/${slug}/repositorio?zona=${encodeURIComponent(zona)}`)}
                  style={{ background: '#fff', borderRadius: 16, border: `1.5px solid ${colores.color}20`, boxShadow: '0 2px 10px rgba(4,57,65,0.04)', padding: '14px 16px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .16s', width: '100%' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = colores.color; el.style.background = colores.bg }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${colores.color}20`; el.style.background = '#fff' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: colores.color }}>{nombre}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: colores.color, padding: '1px 7px', borderRadius: 100 }}>{bienesZona.length}</span>
                    </div>
                    <ChevronRight size={13} style={{ color: colores.color, opacity: 0.5 }} />
                  </div>
                  <p style={{ fontSize: 11, color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    {ejemplos.join(' · ')}
                  </p>
                </button>
              )
            })}

          </div>
        )}

      </div>
    </div>
  )
}

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
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {(() => { const I = TALLER_ICON_MAP[taller.icon] ?? Package; return <I size={24} style={{ color: tallerColor }} /> })()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
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
              <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {taller.competencias.slice(0, 3).map(c => c.split(' ').slice(0, 3).join(' ')).join(' · ')}
              </p>
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

      {/* ══ COMPETENCIAS ══════════════════════════════════════════════════════ */}
      {taller.competencias?.length > 0 && (
        <div style={{ background: '#ffffff', borderBottom: '1px solid rgba(4,57,65,0.06)' }}>
          <div style={{ padding: '24px 32px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>

            {/* Izquierda: valor del programa con iconos */}
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
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(4,57,65,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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

            {/* Derecha: logros del taller (competencias técnicas) */}
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

      {/* ══ BANNER "CONTINÚA DONDE LO DEJASTE" ════════════════════════════════ */}
      {!isGeneralEpt && currentMod && (
        <div style={{ background: 'rgba(2,212,126,0.05)', borderBottom: '1px solid rgba(2,212,126,0.14)', borderLeft: '3px solid #02d47e' }}>
          <div style={{ padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

            {/* Izquierda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: 'rgba(2,212,126,0.12)', border: '1.5px solid rgba(2,212,126,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>
                {currentMod.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: '#02d47e', margin: '0 0 3px' }}>
                  Continúa donde lo dejaste
                </p>
                <p style={{ fontSize: 15, fontWeight: 900, color: '#043941', margin: '0 0 2px', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  M{currentMod.numero} — {currentMod.nombre}
                </p>
                <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
                  {currentMod.horasTotal}h · {currentMod.fase} · {currentMod.sesiones.length} secciones en curso
                </p>
              </div>
            </div>

            {/* Derecha */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
              <div style={{ textAlign: 'right', minWidth: 140 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#64748b', margin: 0 }}>Progreso M{currentMod.numero}</p>
                  <p style={{ fontSize: 14, fontWeight: 900, color: '#043941', margin: 0 }}>{currentModPct.porcentaje}%</p>
                </div>
                <div style={{ height: 5, background: 'rgba(4,57,65,0.08)', borderRadius: 4 }}>
                  <div style={{ height: '100%', width: `${currentModPct.porcentaje}%`, background: '#02d47e', borderRadius: 4, transition: 'width .5s ease' }} />
                </div>
                <p style={{ fontSize: 10, color: '#94a3b8', margin: '4px 0 0', textAlign: 'right' }}>
                  {currentModPct.completados} de {currentModPct.total} secciones
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
                  const prog   = getModuloProgreso(slug, m.numero)
                  const pct    = prog.porcentaje
                  const isCurrent = m.id === currentMod?.id
                  const tieneQuizBloqueante = m.sesiones.some(s => s.contenidos.some(c => c.bloqueaSiguiente))

                  // bloqueador: primer módulo anterior que tenga quiz bloqueante
                  const bloqueadorQuiz = i > 0
                    ? modulosLXP.slice(0, i).reverse().find(prev => prev.sesiones.some(s => s.contenidos.some(c => c.bloqueaSiguiente)))
                    : null

                  const badge = {
                    completado: { label: '✓ Completado', bg: 'rgba(2,212,126,0.1)',  color: '#059669' },
                    en_curso:   { label: '• En curso',   bg: 'rgba(4,57,65,0.08)',   color: '#043941' },
                    disponible: { label: '◦ Disponible', bg: 'rgba(14,165,233,0.1)', color: '#0284c7' },
                    bloqueado:  { label: '🔒 Bloqueado', bg: 'rgba(4,57,65,0.05)',   color: 'rgba(4,57,65,0.35)' },
                  }[estado]

                  return (
                    <div
                      key={m.id}
                      onClick={() => estado !== 'bloqueado' && navigate(`/taller/${slug}/ruta/modulo/${m.numero}`)}
                      style={{
                        borderBottom: i < modulosLXP.length - 1 ? '1px solid rgba(4,57,65,0.05)' : 'none',
                        padding: '11px 24px',
                        background: isCurrent ? 'rgba(2,212,126,0.04)' : 'transparent',
                        cursor: estado !== 'bloqueado' ? 'pointer' : 'default',
                        transition: 'background .16s',
                      }}
                      onMouseEnter={e => { if (estado !== 'bloqueado') (e.currentTarget as HTMLElement).style.background = 'rgba(4,57,65,0.03)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isCurrent ? 'rgba(2,212,126,0.04)' : 'transparent' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* Icono */}
                        <div style={{
                          width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
                          background: estado === 'completado' ? 'rgba(2,212,126,0.12)'
                            : estado === 'en_curso'   ? 'rgba(4,57,65,0.08)'
                            : estado === 'disponible' ? 'rgba(14,165,233,0.1)'
                            : 'rgba(4,57,65,0.04)',
                          opacity: estado === 'bloqueado' ? 0.4 : 1,
                        }}>
                          {m.icon}
                        </div>

                        {/* Centro: nombre + barra + meta */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: estado === 'bloqueado' ? 'rgba(4,57,65,0.25)' : '#02d47e' }}>
                              M{m.numero}
                            </span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: estado === 'bloqueado' ? 'rgba(4,57,65,0.35)' : '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {m.nombre}
                            </span>
                            {estado === 'en_curso' && tieneQuizBloqueante && (
                              <span style={{ fontSize: 9, fontWeight: 800, color: '#d97706', background: 'rgba(217,119,6,0.1)', padding: '2px 7px', borderRadius: 100, flexShrink: 0 }}>
                                Quiz requerido
                              </span>
                            )}
                          </div>
                          {/* Barra de progreso inline */}
                          {estado !== 'bloqueado' ? (
                            <div style={{ height: 3, background: 'rgba(4,57,65,0.07)', borderRadius: 2, marginBottom: 3 }}>
                              <div style={{ height: '100%', width: `${pct}%`, background: estado === 'completado' ? '#02d47e' : '#02d47e', borderRadius: 2, transition: 'width .4s ease' }} />
                            </div>
                          ) : null}
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

                        {/* Badge + horas + chevron */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                          <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>{m.horasTotal}h</span>
                          <span style={{
                            fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 100,
                            background: badge.bg, color: badge.color,
                          }}>
                            {badge.label}
                          </span>
                          {estado !== 'bloqueado' && (
                            <span style={{ fontSize: 12, color: 'rgba(4,57,65,0.25)' }}>›</span>
                          )}
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
              <div style={{ background: '#fffbeb', borderRadius: 18, border: '1px solid #fde68a', boxShadow: '0 2px 12px rgba(251,191,36,0.1)', padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', flexShrink: 0, boxShadow: '0 0 0 3px rgba(245,158,11,0.25)' }} />
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#b45309', margin: 0 }}>
                    Próxima sesión · en {diasParaSesion(proximaSesion.fecha)}d
                  </p>
                </div>
                <p style={{ fontSize: 14, fontWeight: 800, color: '#78350f', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {proximaSesion.titulo}
                </p>
                <p style={{ fontSize: 11, color: '#92400e', opacity: 0.7, margin: '0 0 14px' }}>
                  {formatFechaSesion(proximaSesion.fecha)} · {formatHoraSesion(proximaSesion.fecha)} · {proximaSesion.duracionMin} min
                </p>
                {proximaSesion.link ? (
                  <a
                    href={proximaSesion.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', background: '#043941', color: '#02d47e', border: 'none', borderRadius: 11, padding: '10px', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', transition: 'opacity .18s', boxSizing: 'border-box' }}
                  >
                    <ExternalLink size={13} /> Unirse a la sesión →
                  </a>
                ) : (
                  <p style={{ fontSize: 11, textAlign: 'center', color: '#92400e', opacity: 0.5, margin: 0 }}>Enlace disponible próximamente</p>
                )}
              </div>
            )}

            {/* ③ Actividad reciente */}
            <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 16px rgba(4,57,65,0.06)', padding: '18px 20px' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.38)', margin: '0 0 12px' }}>Actividad reciente</p>
              {recentCompleted.length > 0 ? (
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
              ) : (
                <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, textAlign: 'center', padding: '8px 0' }}>
                  Sin actividad aún
                </p>
              )}
            </div>

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
