// src/components/lxp/interactivos/SimuladorEPPMecaModal.tsx
import { useState } from 'react'
import { X, ShieldCheck, AlertCircle, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'

interface Escenario {
  id: string
  actividad: string
  descripcion: string
  equipo: string
  eppCorrecto: string[]
  eppDisponible: string[]
}

const ESCENARIOS: Escenario[] = [
  {
    id: 'e1',
    actividad: 'Levantamiento de vehículo',
    descripcion: 'Vas a usar el elevador hidráulico de columnas para levantar un automóvil y revisar el sistema de suspensión inferior.',
    equipo: 'Elevador hidráulico',
    eppCorrecto: ['Botas de seguridad', 'Guantes de mecánico', 'Lentes de protección'],
    eppDisponible: ['Botas de seguridad', 'Guantes de mecánico', 'Lentes de protección', 'Máscara electrónica de soldar', 'Mandil de serraje', 'Tapones auditivos'],
  },
  {
    id: 'e2',
    actividad: 'Trabajos de soldadura',
    descripcion: 'Utilizarás la máquina de soldar multiproceso para unir piezas metálicas en el banco de trabajo.',
    equipo: 'Máquina de soldar multiproceso',
    eppCorrecto: ['Máscara electrónica de soldar', 'Guantes para soldar', 'Mandil de serraje', 'Manga para soldar', 'Escarpines'],
    eppDisponible: ['Máscara electrónica de soldar', 'Guantes para soldar', 'Mandil de serraje', 'Manga para soldar', 'Escarpines', 'Lentes de protección', 'Tapones auditivos'],
  },
  {
    id: 'e3',
    actividad: 'Operación de compresora',
    descripcion: 'Operarás la compresora de aire (50L - 3HP) para limpiar piezas con pistola neumática y presurizar neumáticos.',
    equipo: 'Compresora de aire',
    eppCorrecto: ['Lentes de protección', 'Tapones auditivos', 'Guantes de mecánico'],
    eppDisponible: ['Lentes de protección', 'Tapones auditivos', 'Guantes de mecánico', 'Máscara electrónica de soldar', 'Botas de seguridad', 'Mandil de serraje'],
  },
  {
    id: 'e4',
    actividad: 'Cambio de aceite de motor',
    descripcion: 'Realizarás el cambio de aceite de motor usando el gato hidráulico tipo lagarto y la bandeja recolectora de aceite.',
    equipo: 'Gato hidráulico + Bandeja',
    eppCorrecto: ['Guantes de mecánico', 'Lentes de protección', 'Mandil de serraje'],
    eppDisponible: ['Guantes de mecánico', 'Lentes de protección', 'Mandil de serraje', 'Máscara electrónica de soldar', 'Tapones auditivos', 'Escarpines'],
  },
  {
    id: 'e5',
    actividad: 'Diagnóstico del sistema eléctrico',
    descripcion: 'Usarás el osciloscopio digital y el escáner automotriz para leer señales del sistema eléctrico del vehículo.',
    equipo: 'Osciloscopio y Escáner automotriz',
    eppCorrecto: ['Lentes de protección', 'Guantes de mecánico'],
    eppDisponible: ['Lentes de protección', 'Guantes de mecánico', 'Máscara electrónica de soldar', 'Tapones auditivos', 'Botas de seguridad', 'Mandil de serraje'],
  },
]

interface Props {
  onClose: () => void
  onComplete: () => void
}

export function SimuladorEPPMecaModal({ onClose, onComplete }: Props) {
  useEscapeKey(onClose)
  const [step, setStep]           = useState<'intro' | 'quiz' | 'resultado'>('intro')
  const [escenarioIdx, setIdx]    = useState(0)
  const [seleccionados, setSel]   = useState<string[]>([])
  const [verificado, setVer]      = useState(false)
  const [puntaje, setPuntaje]     = useState(0)
  const [respuestas, setResp]     = useState<boolean[]>([])

  const escenario = ESCENARIOS[escenarioIdx]
  const total     = ESCENARIOS.length

  function toggleEPP(epp: string) {
    if (verificado) return
    setSel(prev => prev.includes(epp) ? prev.filter(e => e !== epp) : [...prev, epp])
  }

  function verificar() {
    const correcto  = escenario.eppCorrecto
    const acierto   = correcto.every(e => seleccionados.includes(e)) && seleccionados.every(e => correcto.includes(e))
    setVer(true)
    setResp(prev => [...prev, acierto])
    if (acierto) setPuntaje(p => p + 1)
  }

  function siguiente() {
    if (escenarioIdx + 1 >= total) {
      setStep('resultado')
      onComplete()
    } else {
      setIdx(i => i + 1)
      setSel([])
      setVer(false)
    }
  }

  function reiniciar() {
    setStep('intro')
    setIdx(0)
    setSel([])
    setVer(false)
    setPuntaje(0)
    setResp([])
  }

  const porcentaje = Math.round((puntaje / total) * 100)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,57,65,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#ffffff', boxShadow: '0 24px 64px rgba(4,57,65,0.3)' }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-start gap-4" style={{ background: '#043941' }}>
          <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(2,212,126,0.15)', border: '1px solid rgba(2,212,126,0.2)' }}>
            <ShieldCheck size={20} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#02d47e' }}>
              Simulador de EPP · M1-S13
            </p>
            <h2 className="text-base font-extrabold text-white">
              ¿Qué EPP necesito para cada actividad del taller?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)')}
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto" style={{ background: '#f8fcfb' }}>

          {/* ── Intro ── */}
          {step === 'intro' && (
            <div className="p-8 text-center">
              <div className="inline-flex h-16 w-16 rounded-2xl items-center justify-center mb-5"
                style={{ background: 'rgba(2,212,126,0.1)', border: '1px solid rgba(2,212,126,0.2)' }}>
                <ShieldCheck size={28} style={{ color: '#02d47e' }} />
              </div>
              <h3 className="text-lg font-extrabold mb-2" style={{ color: '#043941' }}>
                Simulador de Seguridad — Taller Automotriz
              </h3>
              <p className="text-sm leading-relaxed mb-6 mx-auto" style={{ color: '#64748b', maxWidth: 360 }}>
                Se presentará una actividad real del taller. Selecciona <strong>todos</strong> los EPP que debes usar para realizarla de forma segura.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-7 max-w-xs mx-auto">
                {[
                  { v: `${total}`, s: 'escenarios', c: '#045f6c', bg: '#e3f8fb' },
                  { v: 'EPP',      s: 'equipamiento real', c: '#02d47e', bg: '#f0faf5' },
                  { v: '100%',     s: 'seguridad laboral', c: '#b45309', bg: '#fef3c7' },
                ].map(x => (
                  <div key={x.v} className="p-3 rounded-xl text-center" style={{ background: x.bg }}>
                    <p className="font-extrabold text-lg leading-none mb-0.5" style={{ color: x.c }}>{x.v}</p>
                    <p className="text-[10px]" style={{ color: x.c }}>{x.s}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep('quiz')}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold mx-auto transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(90deg,#02d47e,#00c16e)', color: '#032e34' }}
              >
                Comenzar simulación <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* ── Quiz ── */}
          {step === 'quiz' && (
            <div className="p-6">
              {/* Progress */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold" style={{ color: '#045f6c' }}>{escenarioIdx + 1} / {total}</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(4,57,65,0.08)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${((escenarioIdx + 1) / total) * 100}%`, background: 'linear-gradient(90deg,#02d47e,#00c16e)' }}
                  />
                </div>
                <span className="text-xs font-bold" style={{ color: '#02d47e' }}>{puntaje} ✓</span>
              </div>

              {/* Scenario */}
              <div className="p-5 rounded-2xl mb-4" style={{ background: '#fff', border: '1px solid rgba(4,57,65,0.1)' }}>
                <span className="inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-full mb-2"
                  style={{ background: 'rgba(4,57,65,0.06)', color: '#043941' }}>
                  {escenario.equipo}
                </span>
                <h3 className="text-base font-extrabold mb-2" style={{ color: '#043941' }}>
                  {escenario.actividad}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                  {escenario.descripcion}
                </p>
              </div>

              <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#045f6c' }}>
                Selecciona todos los EPP necesarios:
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {escenario.eppDisponible.map(epp => {
                  const selected   = seleccionados.includes(epp)
                  const esCorrecto = escenario.eppCorrecto.includes(epp)
                  const style: React.CSSProperties = verificado
                    ? selected && esCorrecto   ? { background: 'rgba(2,212,126,0.12)', borderColor: '#02d47e',   color: '#043941' }
                    : selected && !esCorrecto  ? { background: 'rgba(239,68,68,0.08)', borderColor: '#ef4444',   color: '#ef4444' }
                    : !selected && esCorrecto  ? { background: 'rgba(245,158,11,0.08)',borderColor: '#f59e0b',   color: '#b45309' }
                    :                            { background: 'rgba(4,57,65,0.03)',   borderColor: 'rgba(4,57,65,0.1)', color: 'rgba(4,57,65,0.35)' }
                    : selected
                      ? { background: '#043941', borderColor: '#043941', color: '#02d47e' }
                      : { background: '#fff',    borderColor: 'rgba(4,57,65,0.15)', color: '#043941' }
                  return (
                    <button
                      key={epp}
                      onClick={() => toggleEPP(epp)}
                      className="px-3 py-2 rounded-xl text-sm font-semibold border-2 transition-all"
                      style={style}
                    >
                      {verificado && selected && esCorrecto  && '✓ '}
                      {verificado && selected && !esCorrecto && '✗ '}
                      {verificado && !selected && esCorrecto && '↑ '}
                      {epp}
                    </button>
                  )
                })}
              </div>

              {verificado && (
                <div
                  className="px-4 py-3 rounded-xl mb-4 flex items-start gap-2"
                  style={{
                    background: respuestas.at(-1) ? 'rgba(2,212,126,0.08)' : 'rgba(239,68,68,0.06)',
                    border: `1px solid ${respuestas.at(-1) ? 'rgba(2,212,126,0.25)' : 'rgba(239,68,68,0.2)'}`,
                  }}
                >
                  {respuestas.at(-1)
                    ? <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: '#02d47e' }} />
                    : <AlertCircle  size={15} className="shrink-0 mt-0.5" style={{ color: '#ef4444' }} />
                  }
                  <p className="text-sm font-semibold" style={{ color: respuestas.at(-1) ? '#043941' : '#ef4444' }}>
                    {respuestas.at(-1)
                      ? '¡Correcto! Elegiste el EPP adecuado para esta actividad.'
                      : `EPP correcto: ${escenario.eppCorrecto.join(', ')}.`
                    }
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                {!verificado ? (
                  <button
                    onClick={verificar}
                    disabled={seleccionados.length === 0}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold"
                    style={{
                      background: seleccionados.length > 0 ? '#043941' : 'rgba(4,57,65,0.1)',
                      color: seleccionados.length > 0 ? '#02d47e' : '#94a3b8',
                    }}
                  >
                    Verificar selección
                  </button>
                ) : (
                  <button
                    onClick={siguiente}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90"
                    style={{ background: 'linear-gradient(90deg,#02d47e,#00c16e)', color: '#032e34' }}
                  >
                    {escenarioIdx + 1 >= total ? 'Ver resultados' : 'Siguiente'} <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── Resultado ── */}
          {step === 'resultado' && (
            <div className="p-8 text-center">
              <div className="inline-flex h-16 w-16 rounded-2xl items-center justify-center mb-4"
                style={{
                  background: porcentaje >= 60 ? 'rgba(2,212,126,0.1)' : 'rgba(245,158,11,0.1)',
                  border: `1px solid ${porcentaje >= 60 ? 'rgba(2,212,126,0.25)' : 'rgba(245,158,11,0.25)'}`,
                }}>
                <ShieldCheck size={28} style={{ color: porcentaje >= 60 ? '#02d47e' : '#f59e0b' }} />
              </div>
              <p className="text-4xl font-extrabold mb-1" style={{ color: '#043941' }}>{porcentaje}%</p>
              <p className="text-sm mb-1" style={{ color: '#64748b' }}>{puntaje} de {total} escenarios correctos</p>
              <p className="text-sm font-bold mb-6"
                style={{ color: porcentaje >= 80 ? '#02d47e' : porcentaje >= 60 ? '#b45309' : '#ef4444' }}>
                {porcentaje >= 80 ? '¡Excelente dominio de EPP!' : porcentaje >= 60 ? 'Buen trabajo — sigue practicando' : 'Revisa el protocolo de seguridad del taller'}
              </p>

              <div className="text-left space-y-2 mb-6 max-w-sm mx-auto">
                {ESCENARIOS.map((es, i) => (
                  <div key={es.id} className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                    style={{
                      background: respuestas[i] ? 'rgba(2,212,126,0.06)' : 'rgba(239,68,68,0.05)',
                      border: `1px solid ${respuestas[i] ? 'rgba(2,212,126,0.15)' : 'rgba(239,68,68,0.12)'}`,
                    }}>
                    {respuestas[i]
                      ? <CheckCircle2 size={14} style={{ color: '#02d47e', flexShrink: 0 }} />
                      : <AlertCircle  size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
                    }
                    <span className="text-sm font-medium" style={{ color: '#043941' }}>{es.actividad}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-3">
                <button onClick={reiniciar} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold"
                  style={{ background: 'rgba(4,57,65,0.06)', color: '#043941' }}>
                  <RotateCcw size={13} /> Repetir
                </button>
                <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold"
                  style={{ background: '#043941', color: '#02d47e' }}>
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
