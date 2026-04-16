// src/components/lxp/AtencionDocente.tsx
import { useState, useEffect } from 'react'
import {
  MessageCircle, Send, Clock, CheckCircle2,
  ChevronDown, ChevronUp, Phone, HelpCircle,
} from 'lucide-react'
import {
  type ConsultaDocente, type ModuloConsulta,
  MODULOS_CONSULTA, getConsultas, saveConsulta, formatFechaConsulta,
} from '@/data/consultasDocentes'

const MAX_CHARS = 500

const ESTADO_STYLE = {
  pendiente:  { label: 'Pendiente',  bg: 'rgba(245,158,11,0.1)',  color: '#d97706',  border: 'rgba(245,158,11,0.25)' },
  respondida: { label: 'Respondida', bg: 'rgba(2,212,126,0.1)',   color: '#059669',  border: 'rgba(2,212,126,0.25)'  },
}

interface Props {
  userId: string
  tallerSlug: string | null
  displayName: string
  tallerNombre?: string
  accent?: string
}

export function AtencionDocente({ userId, tallerSlug, displayName, tallerNombre, accent = '#02d47e' }: Props) {
  const [tab, setTab]               = useState<'form' | 'historial'>('form')
  const [modulo, setModulo]         = useState<ModuloConsulta>('ruta')
  const [mensaje, setMensaje]       = useState('')
  const [enviado, setEnviado]       = useState(false)
  const [consultas, setConsultas]   = useState<ConsultaDocente[]>([])
  const [expandida, setExpandida]   = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setConsultas(getConsultas(userId))
  }, [userId])

  const pendientes = consultas.filter(c => c.estado === 'pendiente').length

  function handleEnviar() {
    if (mensaje.trim().length < 10) return
    setSubmitting(true)
    setTimeout(() => {
      const nueva = saveConsulta({ userId, tallerSlug, modulo, mensaje: mensaje.trim() })
      setConsultas(prev => [nueva, ...prev])
      setMensaje('')
      setModulo('ruta')
      setEnviado(true)
      setSubmitting(false)
      setTimeout(() => setEnviado(false), 4000)
    }, 600)
  }

  // WhatsApp pre-filled (placeholder — reemplazar número cuando esté disponible)
  const waText = encodeURIComponent(
    `Hola, soy ${displayName}${tallerNombre ? ` del taller de ${tallerNombre}` : ''}. Tengo una consulta sobre la plataforma GRAMA.`
  )
  const waUrl = `https://wa.me/51999999999?text=${waText}`

  return (
    <section
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#ffffff',
        border: `1.5px solid ${accent}40`,
        boxShadow: `0 0 0 4px ${accent}0c, 0 4px 16px rgba(4,57,65,0.06)`,
      }}
    >
      {/* ── Header ── */}
      <div
        className="px-5 py-4 border-b flex items-center justify-between"
        style={{ borderColor: 'rgba(4,57,65,0.08)', background: 'rgba(4,57,65,0.03)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(2,212,126,0.12)' }}>
            <HelpCircle size={15} style={{ color: '#02d47e' }} />
          </div>
          <div>
            <h2 className="text-sm font-extrabold" style={{ color: '#043941' }}>
              Centro de Atención
            </h2>
            <p className="text-[10px]" style={{ color: 'rgba(4,57,65,0.45)' }}>
              Dudas y consultas sobre tu capacitación
            </p>
          </div>
        </div>
        {/* Badge consultas pendientes */}
        {pendientes > 0 && (
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(245,158,11,0.12)', color: '#d97706', border: '1px solid rgba(245,158,11,0.2)' }}
          >
            {pendientes} pendiente{pendientes > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* ── Tabs ── */}
      <div className="flex border-b" style={{ borderColor: 'rgba(4,57,65,0.07)' }}>
        {([
          { id: 'form',      label: 'Nueva consulta',  icon: MessageCircle },
          { id: 'historial', label: `Mis consultas${consultas.length > 0 ? ` (${consultas.length})` : ''}`, icon: Clock },
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-all"
            style={{
              borderColor: tab === t.id ? '#02d47e'    : 'transparent',
              color:       tab === t.id ? '#043941'    : 'rgba(4,57,65,0.45)',
              background:  tab === t.id ? '#fafffe'    : 'transparent',
            }}
          >
            <t.icon size={12} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-5">

        {/* ══ TAB: NUEVA CONSULTA ══ */}
        {tab === 'form' && (
          <div className="space-y-4">

            {/* Estado enviado */}
            {enviado && (
              <div
                className="flex items-center gap-2.5 p-3.5 rounded-xl"
                style={{ background: 'rgba(2,212,126,0.08)', border: '1px solid rgba(2,212,126,0.2)' }}
              >
                <CheckCircle2 size={16} style={{ color: '#02d47e', flexShrink: 0 }} />
                <div>
                  <p className="text-xs font-bold" style={{ color: '#043941' }}>
                    ¡Consulta enviada correctamente!
                  </p>
                  <p className="text-[11px]" style={{ color: '#045f6c' }}>
                    Nos pondremos en contacto contigo pronto.
                  </p>
                </div>
              </div>
            )}

            {/* Selector módulo */}
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: '#043941' }}>
                ¿Sobre qué es tu consulta?
              </label>
              <select
                value={modulo}
                onChange={e => setModulo(e.target.value as ModuloConsulta)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-medium outline-none transition-all"
                style={{
                  border: '1.5px solid #e3f8fb',
                  background: '#fafffe',
                  color: '#043941',
                }}
                onFocus={e => (e.target.style.borderColor = '#02d47e')}
                onBlur={e  => (e.target.style.borderColor = '#e3f8fb')}
              >
                {MODULOS_CONSULTA.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>

            {/* Textarea */}
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: '#043941' }}>
                Tu consulta
              </label>
              <textarea
                value={mensaje}
                onChange={e => setMensaje(e.target.value.slice(0, MAX_CHARS))}
                placeholder="Escribe aquí tu duda o consulta con el mayor detalle posible..."
                rows={4}
                className="w-full px-3.5 py-3 rounded-xl text-xs outline-none resize-none transition-all"
                style={{
                  border: '1.5px solid #e3f8fb',
                  background: '#fafffe',
                  color: '#043941',
                  lineHeight: '1.6',
                }}
                onFocus={e => (e.target.style.borderColor = '#02d47e')}
                onBlur={e  => (e.target.style.borderColor = '#e3f8fb')}
              />
              {/* Contador */}
              <div className="flex justify-between mt-1 px-1">
                {mensaje.trim().length > 0 && mensaje.trim().length < 10 && (
                  <p className="text-[10px]" style={{ color: '#ef4444' }}>
                    Mínimo 10 caracteres
                  </p>
                )}
                <p className="text-[10px] ml-auto" style={{ color: mensaje.length > MAX_CHARS * 0.9 ? '#d97706' : 'rgba(4,57,65,0.3)' }}>
                  {mensaje.length}/{MAX_CHARS}
                </p>
              </div>
            </div>

            {/* Botón enviar */}
            <button
              onClick={handleEnviar}
              disabled={mensaje.trim().length < 10 || submitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                background: mensaje.trim().length >= 10 && !submitting ? '#043941' : 'rgba(4,57,65,0.08)',
                color:      mensaje.trim().length >= 10 && !submitting ? '#02d47e'  : 'rgba(4,57,65,0.3)',
                cursor:     mensaje.trim().length >= 10 && !submitting ? 'pointer'  : 'not-allowed',
              }}
            >
              {submitting ? (
                <>
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  <Send size={13} />
                  Enviar consulta
                </>
              )}
            </button>

            {/* Divisor */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px" style={{ background: 'rgba(4,57,65,0.07)' }} />
              <p className="text-[10px] font-semibold" style={{ color: 'rgba(4,57,65,0.35)' }}>
                O contáctanos directamente
              </p>
              <div className="flex-1 h-px" style={{ background: 'rgba(4,57,65,0.07)' }} />
            </div>

            {/* Contacto directo */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90"
              style={{ background: '#25D36615', color: '#128C7E', border: '1px solid #25D36625' }}
            >
              <Phone size={13} />
              WhatsApp
            </a>

            <p className="text-[10px] text-center" style={{ color: 'rgba(4,57,65,0.3)' }}>
              Tiempo de respuesta estimado: 24–48 horas hábiles
            </p>
          </div>
        )}

        {/* ══ TAB: HISTORIAL ══ */}
        {tab === 'historial' && (
          <div className="space-y-3">
            {consultas.length === 0 ? (
              <div className="py-10 flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center"
                  style={{ background: '#e3f8fb' }}>
                  <MessageCircle size={20} style={{ color: '#045f6c' }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: '#043941' }}>
                  Sin consultas aún
                </p>
                <p className="text-xs text-center" style={{ color: '#94a3b8' }}>
                  Tus consultas enviadas aparecerán aquí
                </p>
                <button
                  onClick={() => setTab('form')}
                  className="mt-1 px-4 py-2 rounded-lg text-xs font-bold"
                  style={{ background: '#043941', color: '#02d47e' }}
                >
                  Enviar primera consulta
                </button>
              </div>
            ) : (
              consultas.map(c => {
                const est = ESTADO_STYLE[c.estado]
                const abierta = expandida === c.id
                const moduloLabel = MODULOS_CONSULTA.find(m => m.value === c.modulo)?.label ?? c.modulo

                return (
                  <div
                    key={c.id}
                    className="rounded-xl overflow-hidden border transition-all"
                    style={{ borderColor: abierta ? '#e3f8fb' : 'rgba(4,57,65,0.07)' }}
                  >
                    {/* Header consulta */}
                    <button
                      onClick={() => setExpandida(abierta ? null : c.id)}
                      className="w-full text-left px-4 py-3 flex items-start gap-3"
                      style={{ background: abierta ? '#fafffe' : '#ffffff' }}
                    >
                      {/* Status dot */}
                      <div
                        className="h-2 w-2 rounded-full shrink-0 mt-1.5"
                        style={{ background: c.estado === 'respondida' ? '#02d47e' : '#d97706' }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                            style={{ background: 'rgba(4,57,65,0.07)', color: '#043941' }}
                          >
                            {c.modulo}
                          </span>
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ background: est.bg, color: est.color, border: `1px solid ${est.border}` }}
                          >
                            {est.label}
                          </span>
                        </div>
                        <p className="text-xs font-medium line-clamp-1" style={{ color: '#043941' }}>
                          {c.mensaje}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: 'rgba(4,57,65,0.4)' }}>
                          {formatFechaConsulta(c.createdAt)}
                        </p>
                      </div>
                      <div className="shrink-0" style={{ color: '#045f6c' }}>
                        {abierta ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </button>

                    {/* Detalle expandido */}
                    {abierta && (
                      <div className="border-t" style={{ borderColor: '#e3f8fb' }}>
                        {/* Mensaje completo */}
                        <div className="px-4 py-3" style={{ background: '#fafffe' }}>
                          <p className="text-[10px] font-bold mb-1.5" style={{ color: '#045f6c' }}>
                            Tu consulta — {moduloLabel}
                          </p>
                          <p className="text-xs leading-relaxed" style={{ color: '#043941' }}>
                            {c.mensaje}
                          </p>
                        </div>

                        {/* Respuesta (si existe) */}
                        {c.respuesta && (
                          <div
                            className="px-4 py-3 border-t"
                            style={{ borderColor: 'rgba(2,212,126,0.15)', background: 'rgba(2,212,126,0.04)' }}
                          >
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <CheckCircle2 size={12} style={{ color: '#02d47e' }} />
                              <p className="text-[10px] font-bold" style={{ color: '#02d47e' }}>
                                Respuesta del equipo GRAMA
                              </p>
                            </div>
                            <p className="text-xs leading-relaxed" style={{ color: '#043941' }}>
                              {c.respuesta}
                            </p>
                          </div>
                        )}

                        {/* Sin respuesta aún */}
                        {!c.respuesta && c.estado === 'pendiente' && (
                          <div className="px-4 py-3 border-t" style={{ borderColor: '#e3f8fb' }}>
                            <p className="text-[10px]" style={{ color: 'rgba(4,57,65,0.4)' }}>
                              Respuesta en camino — tiempo estimado 24–48 h hábiles
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    </section>
  )
}
