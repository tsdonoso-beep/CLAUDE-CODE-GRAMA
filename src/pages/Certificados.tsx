// src/pages/Certificados.tsx
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useProgress } from '@/contexts/ProgressContext'
import { talleresConfig } from '@/data/talleresConfig'
import { Download, ArrowRight } from 'lucide-react'

const TOTAL_MODULOS = 7

/* ── SVG circular progress ─────────────────────────────────────────────────── */
function Ring({ pct, color, size = 84 }: { pct: number; color: string; size?: number }) {
  const stroke = 5.5
  const r      = (size - stroke) / 2
  const circ   = 2 * Math.PI * r
  const dash   = Math.min(pct / 100, 1) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="rgba(4,57,65,0.07)" strokeWidth={stroke}
      />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray .6s ease' }}
      />
    </svg>
  )
}

/* ── Certificate card (earned) ─────────────────────────────────────────────── */
function CertCard({ nombre, nombreDocente }: { nombre: string; nombreDocente: string }) {
  const year = new Date().getFullYear()
  return (
    <div style={{
      borderRadius: 20,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #032e34 0%, #043941 60%, #054f5e 100%)',
      border: '1px solid rgba(2,212,126,0.22)',
      boxShadow: '0 12px 40px rgba(4,57,65,0.22)',
      padding: '36px 32px 28px',
      textAlign: 'center',
      position: 'relative',
    }}>
      {/* decorative ring */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 160, height: 160, borderRadius: '50%',
        background: 'rgba(2,212,126,0.04)',
        border: '1px solid rgba(2,212,126,0.08)',
        pointerEvents: 'none',
      }} />

      <div style={{ fontSize: 44, marginBottom: 14, lineHeight: 1 }}>🎓</div>

      <p style={{
        fontSize: 9, fontWeight: 800, letterSpacing: '.18em',
        textTransform: 'uppercase', color: 'rgba(2,212,126,0.6)',
        margin: '0 0 10px',
      }}>
        Certificado de Capacitación
      </p>

      <h3 style={{
        fontSize: 20, fontWeight: 900, color: '#fff',
        margin: '0 0 6px', letterSpacing: '-0.02em',
      }}>
        {nombre}
      </h3>

      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: '0 0 6px' }}>
        {nombreDocente}
      </p>

      <p style={{ fontSize: 11, color: 'rgba(2,212,126,0.5)', margin: '0 0 28px', fontWeight: 700 }}>
        TSF-MINEDU · Año escolar {year}
      </p>

      {/* divider */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(2,212,126,0.25), transparent)',
        margin: '0 0 24px',
      }} />

      <button
        style={{
          background: 'rgba(2,212,126,1)',
          color: '#043941',
          border: 'none',
          borderRadius: 12,
          padding: '11px 28px',
          fontSize: 13,
          fontWeight: 800,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          fontFamily: 'inherit',
          transition: 'opacity .18s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        <Download size={14} /> Descargar certificado
      </button>
    </div>
  )
}

/* ── Main page ─────────────────────────────────────────────────────────────── */
export default function Certificados() {
  const navigate      = useNavigate()
  const { profile }   = useAuth()
  const { getTallerProgreso } = useProgress()

  const displayName = profile?.nombre_completo || profile?.email?.split('@')[0] || 'Docente'

  const tallerSlugs: string[] =
    profile?.taller_slugs?.length
      ? profile.taller_slugs
      : profile?.taller_slug ? [profile.taller_slug] : []

  const talleres = tallerSlugs
    .map(slug => {
      const t = talleresConfig.find(x => x.slug === slug)
      const p = getTallerProgreso(slug)
      return { slug, t, p }
    })
    .filter(x => x.t)

  const completados = talleres.filter(x => x.p.porcentaje >= 100)
  const enProgreso  = talleres.filter(x => x.p.porcentaje < 100)

  /* ── sin talleres ── */
  if (talleres.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={emptyCard}>
          <div style={{ fontSize: 52, marginBottom: 20 }}>🎓</div>
          <h2 style={emptyTitle}>Aún no tienes certificados</h2>
          <p style={emptySubtitle}>No tienes talleres inscritos. Contacta con tu coordinador UGEL.</p>
        </div>
      </div>
    )
  }

  /* ── todos en progreso (estado del screenshot) ── */
  if (completados.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={emptyCard}>
          <div style={{ fontSize: 52, marginBottom: 20 }}>🎓</div>
          <h2 style={emptyTitle}>Aún no tienes certificados</h2>
          <p style={emptySubtitle}>
            Completa los {TOTAL_MODULOS} módulos de un taller para obtener tu certificado
            <br />de capacitación TSF-MINEDU.
          </p>

          {/* Rings por taller */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 32, margin: '32px 0 40px' }}>
            {talleres.map(({ slug, t, p }) => {
              const color = `hsl(${t!.color})`
              return (
                <button
                  key={slug}
                  onClick={() => navigate(`/taller/${slug}`)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                    padding: '8px 12px', borderRadius: 14,
                    transition: 'background .18s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(4,57,65,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                >
                  <div style={{ position: 'relative', width: 84, height: 84 }}>
                    <Ring pct={p.porcentaje} color={color} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 900, color: 'var(--grama-oscuro)',
                    }}>
                      {p.porcentaje}%
                    </div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', maxWidth: 110, textAlign: 'center', lineHeight: 1.3 }}>
                    {t!.nombreCorto ?? t!.nombre}
                  </span>
                </button>
              )
            })}
          </div>

          <button
            onClick={() => navigate(`/taller/${talleres[0].slug}`)}
            style={{
              background: 'var(--grama-oscuro)',
              color: 'var(--grama-menta)',
              border: 'none',
              borderRadius: 14,
              padding: '14px 36px',
              fontSize: 14,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'inherit',
              transition: 'opacity .18s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Continuar capacitación <ArrowRight size={15} />
          </button>
        </div>
      </div>
    )
  }

  /* ── al menos un certificado obtenido ── */
  return (
    <div style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* Certificados obtenidos */}
      <p style={sectionLabel}>Certificados obtenidos</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
        marginBottom: enProgreso.length > 0 ? 36 : 0,
      }}>
        {completados.map(({ slug, t }) => (
          <CertCard key={slug} nombre={t!.nombre} nombreDocente={displayName} />
        ))}
      </div>

      {/* Talleres en progreso */}
      {enProgreso.length > 0 && (
        <>
          <p style={sectionLabel}>En progreso</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {enProgreso.map(({ slug, t, p }) => {
              const color = `hsl(${t!.color})`
              return (
                <div key={slug} style={{
                  background: '#fff',
                  borderRadius: 16,
                  border: '1px solid rgba(4,57,65,0.08)',
                  boxShadow: '0 2px 10px rgba(4,57,65,0.05)',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                }}>
                  <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                    <Ring pct={p.porcentaje} color={color} size={64} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 900, color: 'var(--grama-oscuro)',
                    }}>
                      {p.porcentaje}%
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--grama-oscuro)', margin: '0 0 3px' }}>
                      {t!.nombreCorto ?? t!.nombre}
                    </p>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 12px' }}>
                      {p.completados} de {p.total} actividades completadas
                    </p>
                    <button
                      onClick={() => navigate(`/taller/${slug}`)}
                      style={{
                        background: 'none',
                        border: `1.5px solid ${color}66`,
                        color,
                        borderRadius: 9,
                        padding: '5px 13px',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontFamily: 'inherit',
                        transition: 'background .16s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = `${color}14`)}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      Continuar <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

/* ── shared styles ─────────────────────────────────────────────────────────── */
const emptyCard: React.CSSProperties = {
  background: '#fff',
  borderRadius: 22,
  border: '1px solid rgba(4,57,65,0.07)',
  boxShadow: '0 4px 28px rgba(4,57,65,0.07)',
  padding: '52px 48px 44px',
  textAlign: 'center',
  maxWidth: 560,
  width: '100%',
  fontFamily: "'Manrope', sans-serif",
}

const emptyTitle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 900,
  color: 'var(--grama-oscuro)',
  margin: '0 0 10px',
  letterSpacing: '-0.02em',
}

const emptySubtitle: React.CSSProperties = {
  fontSize: 13,
  color: '#94a3b8',
  margin: 0,
  lineHeight: 1.65,
}

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: 'rgba(4,57,65,0.38)',
  margin: '0 0 14px',
}
