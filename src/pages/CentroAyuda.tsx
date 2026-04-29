// src/pages/CentroAyuda.tsx
import { useState, useEffect } from 'react'
import { MessageCircle, Send, CheckCircle2, Clock, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { talleresConfig } from '@/data/talleresConfig'
import { modulosLXP } from '@/data/modulosLXP'
import {
  loadConsultas, guardarConsulta,
  type ConsultaDocente,
} from '@/data/consultasDocentes'

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

export default function CentroAyuda() {
  const { profile, user } = useAuth()

  const tallerSlugs: string[] =
    profile?.taller_slugs?.length
      ? profile.taller_slugs
      : profile?.taller_slug ? [profile.taller_slug] : []

  const [consultas, setConsultas] = useState<ConsultaDocente[]>([])
  const [tallerSel, setTallerSel] = useState(tallerSlugs[0] ?? '')
  const [moduloSel, setModuloSel] = useState('0')
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    if (user?.id) loadConsultas(user.id).then(setConsultas)
  }, [user?.id])

  const modIdx = parseInt(moduloSel)
  const modActual = modulosLXP[modIdx]

  async function handleEnviar() {
    if (!mensaje.trim() || !user?.id || !tallerSel) return
    setEnviando(true)
    const nueva = await guardarConsulta({
      userId:     user.id,
      nombre:     profile?.nombre_completo ?? undefined,
      tallerSlug: tallerSel,
      modulo:     `M${modIdx}` as any,
      mensaje:    mensaje.trim(),
    })
    setConsultas(prev => [nueva, ...prev])
    setMensaje('')
    setEnviando(false)
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: '#f8fafc', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#043941 0%,#055c6a 100%)', padding: '28px 32px 24px' }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(2,212,126,0.15)' }}>
            <MessageCircle size={16} style={{ color: '#02d47e' }} />
          </div>
          <h1 className="text-xl font-black" style={{ color: '#d2ffe1', letterSpacing: '-0.03em' }}>Centro de ayuda</h1>
        </div>
        <p className="text-sm" style={{ color: 'rgba(210,255,225,0.5)', marginLeft: 44 }}>
          Envía tu consulta y el equipo GRAMA te responde en menos de 24h
        </p>
      </div>

      <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        <style>{`@media(max-width:768px){.ayuda-grid{grid-template-columns:1fr!important}}`}</style>

        {/* ── Formulario nueva consulta ── */}
        <div className="ayuda-grid rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(4,57,65,0.08)', boxShadow: '0 2px 12px rgba(4,57,65,0.05)' }}>
          <div className="px-5 pt-4 pb-3 border-b" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
            <p className="text-sm font-black" style={{ color: '#043941' }}>Nueva consulta</p>
            <p className="text-[11px]" style={{ color: '#94a3b8' }}>Selecciona el taller y módulo al que refiere tu duda</p>
          </div>

          <div style={{ padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Selector de taller */}
            <div>
              <label className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: 'rgba(4,57,65,0.45)', display: 'block', marginBottom: 6 }}>
                Taller
              </label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {tallerSlugs.map(s => {
                  const t  = talleresConfig.find(x => x.slug === s)
                  const ta = TALLER_ACCENTS[s] ?? '#02d47e'
                  const active = tallerSel === s
                  return (
                    <button
                      key={s}
                      onClick={() => setTallerSel(s)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                      style={{
                        background: active ? `${ta}18` : 'rgba(4,57,65,0.04)',
                        border: `1.5px solid ${active ? ta : 'rgba(4,57,65,0.1)'}`,
                        color: active ? ta : 'rgba(4,57,65,0.45)',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: ta }} />
                      {t?.nombreCorto ?? s}
                    </button>
                  )
                })}
                {tallerSlugs.length === 0 && (
                  <p className="text-xs" style={{ color: '#94a3b8' }}>Sin talleres asignados.</p>
                )}
              </div>
            </div>

            {/* Selector de módulo */}
            <div>
              <label className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: 'rgba(4,57,65,0.45)', display: 'block', marginBottom: 6 }}>
                Módulo
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={moduloSel}
                  onChange={e => setModuloSel(e.target.value)}
                  style={{
                    width: '100%', appearance: 'none', background: 'rgba(4,57,65,0.03)',
                    border: '1.5px solid rgba(4,57,65,0.1)', borderRadius: 10,
                    padding: '10px 36px 10px 12px', fontSize: 13, fontWeight: 600,
                    color: '#043941', fontFamily: "'Manrope', sans-serif", cursor: 'pointer',
                  }}
                >
                  {modulosLXP.map((mod, i) => (
                    <option key={mod.id} value={String(i)}>M{i + 1} — {mod.nombre}</option>
                  ))}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(4,57,65,0.4)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: 'rgba(4,57,65,0.45)', display: 'block', marginBottom: 6 }}>
                Tu consulta
              </label>
              <textarea
                value={mensaje}
                onChange={e => setMensaje(e.target.value)}
                placeholder={`¿Qué duda tienes sobre ${modActual?.nombre ?? 'este módulo'}?`}
                rows={5}
                style={{
                  width: '100%', resize: 'vertical', background: 'rgba(4,57,65,0.03)',
                  border: '1.5px solid rgba(4,57,65,0.1)', borderRadius: 10,
                  padding: '10px 12px', fontSize: 13, fontFamily: "'Manrope', sans-serif",
                  color: '#043941', lineHeight: 1.6, boxSizing: 'border-box',
                  outline: 'none', transition: 'border-color .15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#02d47e')}
                onBlur={e => (e.target.style.borderColor = 'rgba(4,57,65,0.1)')}
              />
              <p className="text-[10px] mt-1" style={{ color: '#94a3b8' }}>{mensaje.length}/500 caracteres</p>
            </div>

            {/* Botón */}
            <button
              onClick={handleEnviar}
              disabled={!mensaje.trim() || !tallerSel || enviando}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '12px', borderRadius: 12, border: 'none', cursor: !mensaje.trim() || !tallerSel ? 'not-allowed' : 'pointer',
                background: enviado ? '#02d47e' : '#043941',
                color: '#fff', fontSize: 13, fontWeight: 800,
                opacity: !mensaje.trim() || !tallerSel ? 0.5 : 1,
                transition: 'all .2s',
              }}
            >
              {enviado
                ? <><CheckCircle2 size={15} /> Consulta enviada</>
                : enviando
                  ? 'Enviando…'
                  : <><Send size={14} /> Enviar consulta</>
              }
            </button>
          </div>
        </div>

        {/* ── Historial ── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(4,57,65,0.08)', boxShadow: '0 2px 12px rgba(4,57,65,0.05)' }}>
          <div className="px-5 pt-4 pb-3 border-b" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
            <p className="text-sm font-black" style={{ color: '#043941' }}>Mis consultas</p>
            <p className="text-[11px]" style={{ color: '#94a3b8' }}>{consultas.length === 0 ? 'Aún no has enviado ninguna' : `${consultas.length} consulta${consultas.length !== 1 ? 's' : ''}`}</p>
          </div>

          {consultas.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
              <MessageCircle size={32} style={{ color: 'rgba(4,57,65,0.12)', margin: '0 auto 12px' }} />
              <p className="text-sm" style={{ color: '#94a3b8' }}>Tus consultas aparecerán aquí.</p>
            </div>
          ) : (
            <div>
              {consultas.map((c, i) => {
                const ta   = TALLER_ACCENTS[c.tallerSlug ?? ''] ?? '#02d47e'
                const t    = talleresConfig.find(x => x.slug === c.tallerSlug)
                const respondida = c.estado === 'respondida'
                return (
                  <div key={c.id} className={i > 0 ? 'border-t' : ''} style={{ borderColor: 'rgba(4,57,65,0.05)', padding: '16px 20px' }}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0 mt-0.5" style={{ background: ta }} />
                        <span className="text-[11px] font-extrabold" style={{ color: ta }}>{t?.nombreCorto ?? c.tallerSlug} · {c.modulo.toUpperCase()}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          background: respondida ? 'rgba(2,212,126,0.10)' : 'rgba(245,158,11,0.10)',
                          color:      respondida ? '#02a05a'              : '#d97706',
                        }}
                      >
                        {respondida ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                        {respondida ? 'Respondida' : 'Pendiente'}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed mb-1" style={{ color: '#043941' }}>{c.mensaje}</p>
                    <p className="text-[10px]" style={{ color: '#94a3b8' }}>
                      {new Date(c.createdAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>

                    {c.respuesta && (
                      <div className="mt-3 rounded-xl p-3" style={{ background: 'rgba(2,212,126,0.06)', border: '1px solid rgba(2,212,126,0.15)' }}>
                        <p className="text-[10px] font-extrabold mb-1" style={{ color: '#02a05a' }}>Respuesta del equipo GRAMA</p>
                        <p className="text-xs leading-relaxed" style={{ color: '#043941' }}>{c.respuesta}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
