// src/pages/MisModulos.tsx
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, PlayCircle, Lock, BookOpen } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useProgress } from '@/contexts/ProgressContext'
import { talleresConfig } from '@/data/talleresConfig'
import { modulosLXP } from '@/data/modulosLXP'

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

export default function MisModulos() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const { getTallerProgreso } = useProgress()

  const tallerSlugs: string[] =
    profile?.taller_slugs?.length
      ? profile.taller_slugs
      : profile?.taller_slug ? [profile.taller_slug] : []

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: '#f8fafc', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#043941 0%,#055c6a 100%)', padding: '28px 32px 24px' }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(2,212,126,0.15)' }}>
            <BookOpen size={16} style={{ color: '#02d47e' }} />
          </div>
          <h1 className="text-xl font-black" style={{ color: '#d2ffe1', letterSpacing: '-0.03em' }}>Mis módulos</h1>
        </div>
        <p className="text-sm" style={{ color: 'rgba(210,255,225,0.5)', marginLeft: 44 }}>Continúa donde lo dejaste en cada taller</p>
      </div>

      {/* Contenido */}
      <div style={{ padding: '24px 24px' }}>
        {tallerSlugs.length === 0 ? (
          <div className="rounded-2xl p-12 text-center" style={{ background: '#fff', border: '1px solid rgba(4,57,65,0.07)' }}>
            <p className="text-sm" style={{ color: '#94a3b8' }}>Aún no tienes talleres asignados.</p>
          </div>
        ) : tallerSlugs.map((s, ti) => {
          const t   = talleresConfig.find(x => x.slug === s)
          const ta  = TALLER_ACCENTS[s] ?? '#02d47e'
          const p   = getTallerProgreso(s)

          return (
            <div key={s} className="rounded-2xl overflow-hidden mb-4" style={{ background: '#fff', border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 8px rgba(4,57,65,0.04)' }}>
              {/* Header taller */}
              <button
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors text-left border-b"
                style={{ borderColor: 'rgba(4,57,65,0.06)' }}
                onClick={() => navigate(`/taller/${s}/ruta`)}
              >
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ta }} />
                <span className="text-sm font-extrabold flex-1" style={{ color: '#043941' }}>{t?.nombreCorto ?? s}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${ta}18`, color: ta }}>{p.porcentaje}% completado</span>
                <ArrowRight size={14} style={{ color: ta }} />
              </button>

              {/* Todos los módulos */}
              <div>
                {modulosLXP.map((mod, mIdx) => {
                  const modStart   = (mIdx / modulosLXP.length) * 100
                  const modEnd     = ((mIdx + 1) / modulosLXP.length) * 100
                  const modDone    = p.porcentaje >= modEnd
                  const modActive  = p.porcentaje >= modStart && p.porcentaje < modEnd
                  const modLocked  = p.porcentaje < modStart

                  const fraccion   = modActive ? (p.porcentaje - modStart) / (modEnd - modStart) : 0
                  const sesActiva  = modActive ? Math.min(Math.floor(fraccion * mod.sesiones.length), mod.sesiones.length - 1) : -1

                  return (
                    <div key={mod.id} className={mIdx > 0 ? 'border-t' : ''} style={{ borderColor: 'rgba(4,57,65,0.05)' }}>
                      {/* Header módulo */}
                      <div className="flex items-center gap-2 px-5 py-2.5" style={{ background: modLocked ? 'transparent' : `${ta}06` }}>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                          style={{
                            background: modDone ? 'rgba(2,212,126,0.12)' : modActive ? `${ta}18` : 'rgba(4,57,65,0.06)',
                            color:      modDone ? '#02a05a'              : modActive ? ta        : 'rgba(4,57,65,0.3)',
                          }}
                        >
                          M{mIdx + 1}
                        </span>
                        <span className="text-xs font-bold flex-1" style={{ color: modLocked ? 'rgba(4,57,65,0.3)' : '#043941' }}>{mod.nombre}</span>
                        {modDone   && <span className="text-[9px] font-extrabold" style={{ color: '#02a05a' }}>Completado</span>}
                        {modActive && <span className="text-[9px] font-extrabold" style={{ color: ta }}>En curso</span>}
                        {modLocked && <Lock size={11} style={{ color: 'rgba(4,57,65,0.2)' }} />}
                      </div>

                      {/* Sesiones — solo si activo o completado */}
                      {!modLocked && (
                        <div className="pb-1">
                          {mod.sesiones.map((ses, i) => {
                            const ok  = modDone || i < sesActiva
                            const cur = modActive && i === sesActiva
                            return (
                              <div key={ses.id} className="flex items-center gap-3 px-5 py-2">
                                <div className="h-6 w-6 rounded-lg flex items-center justify-center shrink-0"
                                  style={{
                                    background: ok ? 'rgba(2,212,126,0.10)' : cur ? '#043941' : 'rgba(4,57,65,0.04)',
                                    border:     ok ? '1px solid rgba(2,212,126,0.22)' : cur ? 'none' : '1px solid rgba(4,57,65,0.08)',
                                  }}
                                >
                                  {ok  && <CheckCircle2 size={12} style={{ color: '#02d47e' }} />}
                                  {cur && <PlayCircle   size={12} style={{ color: '#02d47e' }} />}
                                  {!ok && !cur && <Lock size={10} style={{ color: 'rgba(4,57,65,0.2)' }} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-semibold truncate" style={{ color: '#043941' }}>{ses.nombre}</p>
                                  <p className="text-[10px]" style={{ color: '#94a3b8' }}>Sesión {i + 1}</p>
                                </div>
                                <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full shrink-0"
                                  style={{
                                    background: ok ? 'rgba(2,212,126,0.10)' : cur ? `${ta}18` : 'rgba(4,57,65,0.05)',
                                    color:      ok ? '#02a05a'              : cur ? ta        : 'rgba(4,57,65,0.30)',
                                  }}
                                >
                                  {ok ? 'Listo' : cur ? 'En curso' : 'Pendiente'}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
