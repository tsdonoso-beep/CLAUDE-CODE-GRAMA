// src/pages/RutaAprendizaje.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Car, Scissors, ChefHat, Hammer, Monitor, Cpu, UtensilsCrossed, Zap, Wrench, Package } from 'lucide-react'

const TALLER_ICON_MAP: Record<string, React.ElementType> = {
  Car, Scissors, ChefHat, Hammer, Monitor, Cpu, UtensilsCrossed, Zap, Wrench, Package,
}
import { useTaller } from '@/hooks/useTaller'
import { modulosLXP } from '@/data/modulosLXP'
import { ModuloCard } from '@/components/lxp/ModuloCard'
import { useProgress } from '@/contexts/ProgressContext'
import { useAuth } from '@/contexts/AuthContext'
import { trackNavegacion } from '@/lib/tracker'
import { getProximaSesion, formatFechaSesion, formatHoraSesion, diasParaSesion } from '@/data/sesionesLXP'

export default function RutaAprendizaje() {
  const { taller, slug } = useTaller()
  const { getTallerProgreso, getEstadoModuloLXP, getModuloProgreso } = useProgress()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug === 'taller-general-ept') navigate(`/taller/${slug}/repositorio`, { replace: true })
  }, [slug, navigate])

  useEffect(() => {
    if (!user?.id || !slug) return
    trackNavegacion(user.id, 'ruta_aprendizaje', slug)
  }, [user?.id, slug])

  if (!taller || slug === 'taller-general-ept') return null

  const progresoTaller  = getTallerProgreso(slug ?? '')
  const totalHoras      = modulosLXP.reduce((a, m) => a + m.horasTotal, 0)
  const totalSesiones   = modulosLXP.reduce((a, m) => a + m.sesiones.length, 0)
  const horasCompletadas = Math.round(progresoTaller.porcentaje * totalHoras / 100)
  const modCompletados  = modulosLXP.filter(m => getEstadoModuloLXP(m.id) === 'completado').length

  const moduloActual = modulosLXP.find(m => getEstadoModuloLXP(m.id) === 'en_curso')
    ?? modulosLXP.find(m => getEstadoModuloLXP(m.id) === 'disponible')

  const proximaSesion = getProximaSesion(slug ?? '')

  // Quiz pendiente bloqueante (primer contenido con bloqueaSiguiente=true sin completar)
  let quizBloqueante: { nombre: string; moduloNum: number; contenidoId: string } | null = null
  outer: for (const mod of modulosLXP) {
    for (const ses of mod.sesiones) {
      for (const c of ses.contenidos) {
        if (c.bloqueaSiguiente && !quizBloqueante) {
          quizBloqueante = { nombre: c.titulo, moduloNum: mod.numero, contenidoId: c.id }
          break outer
        }
      }
    }
  }

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: '#f8fafc' }}>

      {/* ── TOP HEADER ─────────────────────────────────────────────────────── */}
      <div style={{ background: '#043941' }}>
        <div style={{ padding: '20px 32px 0' }}>

          {/* Fila: título + stats */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              {(() => {
                const I = TALLER_ICON_MAP[taller.icon] ?? Package
                return (
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'rgba(255,255,255,0.10)', border: '1.5px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <I size={20} style={{ color: '#02d47e' }} />
                  </div>
                )
              })()}
              <div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 600, margin: '0 0 3px' }}>
                  {taller.nombre}
                </p>
                <h1 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                  Ruta de Aprendizaje
                </h1>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexShrink: 0, paddingTop: 4 }}>
              {[
                { value: modulosLXP.length, label: 'MÓDULOS' },
                { value: `${totalHoras}h`,  label: 'TOTALES' },
                { value: totalSesiones,      label: 'SESIONES' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', color: 'rgba(255,255,255,0.45)', margin: '3px 0 0' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Barra de progreso */}
          <div style={{ marginBottom: 6 }}>
            <div style={{ height: 5, borderRadius: 6, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
              <div style={{ width: `${progresoTaller.porcentaje}%`, background: '#02d47e', transition: 'width .6s ease', borderRadius: 6, height: '100%' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#02d47e', margin: 0 }}>
              {progresoTaller.porcentaje}%
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              {modCompletados}/{modulosLXP.length} módulos · {horasCompletadas}h de {totalHoras}h
            </p>
          </div>
        </div>
      </div>

      {/* ── BANNER QUIZ PENDIENTE ──────────────────────────────────────────── */}
      {quizBloqueante && (
        <div style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <AlertTriangle size={15} style={{ color: '#d97706', flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: '#92400e', margin: 0, flex: 1 }}>
            <strong>Quiz pendiente en M{quizBloqueante.moduloNum}.</strong>{' '}
            Aprueba con 80% mínimo para desbloquear los módulos siguientes.
          </p>
          <button
            onClick={() => navigate(`/taller/${slug}/ruta/modulo/${quizBloqueante!.moduloNum}`)}
            style={{ background: '#d97706', color: '#fff', border: 'none', borderRadius: 9, padding: '7px 16px', fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Ir al quiz →
          </button>
        </div>
      )}

      {/* ── CONTENT ────────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, padding: '24px 32px', alignItems: 'start' }}>

        {/* ── SECUENCIA DE MÓDULOS ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: '#043941', margin: 0 }}>Secuencia de módulos</h2>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{modCompletados}/{modulosLXP.length} completados</p>
          </div>
          {modulosLXP.map((modulo, idx) => (
            <ModuloCard
              key={modulo.id}
              modulo={modulo}
              estado={getEstadoModuloLXP(modulo.id)}
              moduloProgreso={getModuloProgreso(slug ?? '', modulo.numero)}
              isLast={idx === modulosLXP.length - 1}
            />
          ))}
        </div>

        {/* ── SIDEBAR ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* ① Tu progreso */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.05)', padding: '18px 20px' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.38)', margin: '0 0 14px' }}>Tu progreso</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              {/* Ring */}
              <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
                <svg width={72} height={72} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
                  <circle cx={36} cy={36} r={29} fill="none" stroke="rgba(4,57,65,0.07)" strokeWidth={6} />
                  <circle cx={36} cy={36} r={29} fill="none" stroke="#02d47e" strokeWidth={6}
                    strokeDasharray={`${Math.min(progresoTaller.porcentaje / 100, 1) * 2 * Math.PI * 29} ${2 * Math.PI * 29}`}
                    strokeLinecap="round" style={{ transition: 'stroke-dasharray .6s ease' }} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: '#043941' }}>
                  {progresoTaller.porcentaje}%
                </div>
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 900, color: '#043941', margin: '0 0 2px' }}>
                  {modCompletados} de {modulosLXP.length} módulos
                </p>
                <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
                  {horasCompletadas}h completadas de {totalHoras}h
                </p>
              </div>
            </div>
            {/* Desglose horas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { dot: '#02d47e', label: 'Virtual asíncrono',   h: modulosLXP.reduce((a, m) => a + m.horasAsincrono, 0) },
                { dot: '#043941', label: 'Sincrónico (en vivo)', h: modulosLXP.reduce((a, m) => a + m.horasSincrono, 0) },
                { dot: '#059669', label: 'Presencial',           h: modulosLXP.reduce((a, m) => a + m.horasPresencial, 0) },
                { dot: '#1e293b', label: 'Total',                h: totalHoras },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: r.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{r.label}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#043941' }}>{r.h}h</span>
                </div>
              ))}
            </div>
          </div>

          {/* ② Próxima sesión */}
          {proximaSesion && (
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.05)', padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316', flexShrink: 0, boxShadow: '0 0 0 3px rgba(249,115,22,0.18)' }} />
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#f97316', margin: 0 }}>
                  Próxima sesión · en {diasParaSesion(proximaSesion.fecha)}d
                </p>
              </div>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#043941', margin: '0 0 3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {proximaSesion.titulo}
              </p>
              <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 12px' }}>
                {formatFechaSesion(proximaSesion.fecha)} · {formatHoraSesion(proximaSesion.fecha)} · {proximaSesion.duracionMin} min
              </p>
              {proximaSesion.link ? (
                <a href={proximaSesion.link} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', background: '#f97316', color: '#fff', borderRadius: 10, padding: '9px', fontSize: 13, fontWeight: 800, textDecoration: 'none', boxSizing: 'border-box' }}>
                  Unirse →
                </a>
              ) : (
                <p style={{ fontSize: 11, textAlign: 'center', color: '#94a3b8', margin: 0 }}>Enlace próximamente</p>
              )}
            </div>
          )}

          {/* ③ Comienza aquí */}
          {moduloActual && (
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.05)', padding: '16px 18px' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(4,57,65,0.38)', margin: '0 0 10px' }}>
                {getEstadoModuloLXP(moduloActual.id) === 'en_curso' ? 'Continúa aquí' : 'Comienza aquí'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(4,57,65,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {moduloActual.icon}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#043941', margin: '0 0 2px' }}>
                    M{moduloActual.numero} — {moduloActual.nombre.split(' ').slice(0, 2).join(' ')}
                  </p>
                  <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
                    {getEstadoModuloLXP(moduloActual.id) === 'en_curso' ? 'En curso' : 'Disponible'} · {getModuloProgreso(slug ?? '', moduloActual.numero).completados}/{getModuloProgreso(slug ?? '', moduloActual.numero).total} secciones
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/taller/${slug}/ruta/modulo/${moduloActual.numero}`)}
                style={{ width: '100%', background: '#02d47e', color: '#043941', border: 'none', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                Continuar →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
