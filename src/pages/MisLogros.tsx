// src/pages/MisLogros.tsx
import { useAuth } from '@/contexts/AuthContext'
import { useProgress } from '@/contexts/ProgressContext'
import { talleresConfig } from '@/data/talleresConfig'
import { Trophy, Award, Zap, GraduationCap, Star, Users2 } from 'lucide-react'

const TALLER_ACCENTS: Record<string, string> = {
  'mecanica-automotriz':  '#3b82f6',
  'industria-vestido':    '#ec4899',
  'cocina-reposteria':    '#f97316',
  'ebanisteria':          '#b8975a',
  'comunicaciones':       '#a78bfa',
  'computacion':          '#22d3ee',
  'agropecuaria':         '#86efac',
  'electricidad':         '#fde047',
  'construccion':         '#94a3b8',
}

export default function MisLogros() {
  const { profile } = useAuth()
  const { getTallerProgreso } = useProgress()

  const tallerSlugs: string[] =
    profile?.taller_slugs?.length
      ? profile.taller_slugs
      : profile?.taller_slug ? [profile.taller_slug] : []

  const overallProgreso = tallerSlugs.length > 0
    ? Math.round(tallerSlugs.reduce((sum, s) => sum + getTallerProgreso(s).porcentaje, 0) / tallerSlugs.length)
    : 0
  const p0   = tallerSlugs[0] ? getTallerProgreso(tallerSlugs[0]).porcentaje : 0
  const tN0  = talleresConfig.find(x => x.slug === tallerSlugs[0])?.nombreCorto ?? ''
  const tN1  = talleresConfig.find(x => x.slug === tallerSlugs[1])?.nombreCorto ?? '2do taller'
  const ta1  = TALLER_ACCENTS[tallerSlugs[1]] ?? '#045f6c'

  const logros = [
    { titulo: 'Primer módulo',   subtitulo: 'Completado',         Icon: Trophy,        color: '#02d47e',                                      obtenido: overallProgreso > 0,
      desc: 'Completaste al menos un módulo en cualquier taller.' },
    { titulo: 'Artesano',        subtitulo: `50% en ${tN0}`,      Icon: Award,         color: TALLER_ACCENTS[tallerSlugs[0]] ?? '#02d47e',    obtenido: p0 >= 50,
      desc: `Alcanzaste el 50% de avance en ${tN0 || 'tu primer taller'}.` },
    { titulo: 'Primer chispazo', subtitulo: `Inicio en ${tN1}`,   Icon: Zap,           color: ta1,                                            obtenido: tallerSlugs.length >= 2,
      desc: 'Te inscribiste en un segundo taller.' },
    { titulo: 'Certificado',     subtitulo: `U1 ${tN0}`,          Icon: GraduationCap, color: '#0288a3',                                      obtenido: overallProgreso >= 15,
      desc: 'Completaste la primera unidad y obtuviste tu primer certificado.' },
    { titulo: 'Maestro',         subtitulo: '100% un taller',     Icon: Star,          color: '#f59e0b',                                      obtenido: false,
      desc: 'Completa el 100% de cualquier taller para desbloquear este logro.' },
    { titulo: 'Multitaller',     subtitulo: '2 talleres al 50%',  Icon: Users2,        color: '#8b5cf6',                                      obtenido: tallerSlugs.length >= 2 && tallerSlugs.every(s => getTallerProgreso(s).porcentaje >= 50),
      desc: 'Avanza al 50% en dos talleres distintos.' },
  ]

  const obtenidos = logros.filter(l => l.obtenido).length

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: '#f8fafc', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#043941 0%,#055c6a 100%)', padding: '28px 32px 24px' }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(2,212,126,0.15)' }}>
            <Trophy size={16} style={{ color: '#02d47e' }} />
          </div>
          <h1 className="text-xl font-black" style={{ color: '#d2ffe1', letterSpacing: '-0.03em' }}>Mis logros</h1>
        </div>
        <p className="text-sm" style={{ color: 'rgba(210,255,225,0.5)', marginLeft: 44 }}>
          {obtenidos} de {logros.length} obtenidos
        </p>
      </div>

      {/* Grid de logros */}
      <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {logros.map(logro => (
          <div
            key={logro.titulo}
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{
              background: logro.obtenido ? '#fff' : 'rgba(255,255,255,0.6)',
              border: `1px solid ${logro.obtenido ? logro.color + '40' : 'rgba(4,57,65,0.08)'}`,
              boxShadow: logro.obtenido ? `0 4px 20px ${logro.color}18` : 'none',
              opacity: logro.obtenido ? 1 : 0.6,
            }}
          >
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center"
              style={{ background: logro.obtenido ? `${logro.color}20` : 'rgba(4,57,65,0.06)' }}
            >
              <logro.Icon size={24} style={{ color: logro.obtenido ? logro.color : '#94a3b8' }} />
            </div>
            <div>
              <p className="text-sm font-black" style={{ color: logro.obtenido ? '#043941' : '#94a3b8' }}>{logro.titulo}</p>
              <p className="text-[11px] font-semibold mt-0.5" style={{ color: logro.obtenido ? logro.color : '#b0c4ca' }}>{logro.subtitulo}</p>
            </div>
            <p className="text-[11px] leading-relaxed" style={{ color: logro.obtenido ? 'rgba(4,57,65,0.55)' : '#b0c4ca' }}>
              {logro.desc}
            </p>
            {logro.obtenido && (
              <span className="text-[10px] font-extrabold self-start px-2.5 py-1 rounded-full"
                style={{ background: `${logro.color}18`, color: logro.color }}
              >
                Obtenido
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
