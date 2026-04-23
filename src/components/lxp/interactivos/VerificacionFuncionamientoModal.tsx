import { useState } from 'react'
import { X, ChevronRight, RotateCcw, ClipboardCheck, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'

type EstadoPaso = 'ok' | 'alerta' | 'falla' | null

interface Paso {
  instruccion: string
  pregunta: string
  tipo: 'check' | 'valor' | 'seleccion'
  opciones?: string[]
  valorMin?: number
  valorMax?: number
  unidad?: string
  evaluarRespuesta: (r: string) => EstadoPaso
}

interface Equipo {
  id: string
  nombre: string
  icono: string
  descripcion: string
  pasos: Paso[]
}

const EQUIPOS: Equipo[] = [
  {
    id: 'scanner',
    nombre: 'Escáner OBD-II',
    icono: '🔌',
    descripcion: 'Verificación de encendido, comunicación y lectura de datos en tiempo real',
    pasos: [
      {
        instruccion: 'Conecta el adaptador OBD-II al puerto del vehículo de referencia. Enciende la llave en posición II (sin arrancar el motor).',
        pregunta: '¿El escáner enciende y muestra la pantalla de inicio correctamente?',
        tipo: 'seleccion',
        opciones: ['Sí, enciende y muestra pantalla', 'Enciende pero pantalla en blanco', 'No enciende'],
        evaluarRespuesta: (r) => r === 'Sí, enciende y muestra pantalla' ? 'ok' : r === 'Enciende pero pantalla en blanco' ? 'alerta' : 'falla'
      },
      {
        instruccion: 'Selecciona "Leer códigos" en el menú principal. Espera que el escáner establezca comunicación con el ECU del vehículo.',
        pregunta: '¿El escáner establece comunicación con el vehículo?',
        tipo: 'seleccion',
        opciones: ['Sí, detecta el protocolo y muestra el VIN', 'Se conecta pero no muestra VIN', 'Error de comunicación / No conecta'],
        evaluarRespuesta: (r) => r.startsWith('Sí') ? 'ok' : r.includes('pero') ? 'alerta' : 'falla'
      },
      {
        instruccion: 'Ve a "Datos en tiempo real". Observa la lectura de RPM con el motor en ralentí (aprox. 800 RPM).',
        pregunta: '¿Qué valor de RPM muestra el escáner en ralentí?',
        tipo: 'valor',
        valorMin: 600,
        valorMax: 1000,
        unidad: 'RPM',
        evaluarRespuesta: (r) => {
          const v = parseInt(r)
          if (isNaN(v)) return 'alerta'
          return v >= 600 && v <= 1000 ? 'ok' : v >= 400 && v <= 1200 ? 'alerta' : 'falla'
        }
      }
    ]
  },
  {
    id: 'multimetro',
    nombre: 'Multímetro Digital',
    icono: '⚡',
    descripcion: 'Verificación de continuidad, voltaje de batería y precisión de medición',
    pasos: [
      {
        instruccion: 'Enciende el multímetro. Coloca el selector en modo de continuidad (símbolo de bocina o diodo).',
        pregunta: '¿El multímetro enciende y la pantalla muestra "0.0" o "OL"?',
        tipo: 'seleccion',
        opciones: ['Sí, pantalla estable con "0.0" u "OL"', 'Pantalla parpadea o muestra caracteres extraños', 'No enciende'],
        evaluarRespuesta: (r) => r.startsWith('Sí') ? 'ok' : r.includes('parpadea') ? 'alerta' : 'falla'
      },
      {
        instruccion: 'Toca las puntas roja y negra entre sí. Debes escuchar el bip de continuidad.',
        pregunta: '¿El multímetro emite bip al tocar las puntas?',
        tipo: 'seleccion',
        opciones: ['Sí, bip claro e inmediato', 'Bip intermitente o débil', 'No emite bip'],
        evaluarRespuesta: (r) => r.startsWith('Sí') ? 'ok' : r.includes('intermitente') ? 'alerta' : 'falla'
      },
      {
        instruccion: 'Cambia a modo voltaje DC (VDC). Mide el voltaje de la batería del vehículo de referencia con motor apagado.',
        pregunta: '¿Qué voltaje indica el multímetro en la batería?',
        tipo: 'valor',
        valorMin: 12.0,
        valorMax: 12.8,
        unidad: 'V',
        evaluarRespuesta: (r) => {
          const v = parseFloat(r)
          if (isNaN(v)) return 'alerta'
          return v >= 12.4 && v <= 12.8 ? 'ok' : v >= 11.8 && v < 12.4 ? 'alerta' : 'falla'
        }
      }
    ]
  },
  {
    id: 'osciloscopio',
    nombre: 'Osciloscopio Automotriz',
    icono: '📈',
    descripcion: 'Verificación de encendido, calibración de canales y lectura de señal de referencia',
    pasos: [
      {
        instruccion: 'Enciende el osciloscopio. Espera que complete su secuencia de arranque (puede tomar hasta 30 segundos).',
        pregunta: '¿El osciloscopio completa el arranque y muestra la pantalla principal?',
        tipo: 'seleccion',
        opciones: ['Sí, muestra pantalla con cuadrícula activa', 'Enciende pero pantalla congelada', 'No enciende'],
        evaluarRespuesta: (r) => r.startsWith('Sí') ? 'ok' : r.includes('congelada') ? 'alerta' : 'falla'
      },
      {
        instruccion: 'Conecta la punta del canal 1 al terminal de referencia interno (GND). La línea debe aparecer estable en el centro de la pantalla.',
        pregunta: '¿La línea de referencia aparece estable en la posición cero?',
        tipo: 'seleccion',
        opciones: ['Sí, línea horizontal estable en cero', 'Línea oscila ligeramente (±1 división)', 'Línea muy inestable o no aparece'],
        evaluarRespuesta: (r) => r.startsWith('Sí') ? 'ok' : r.includes('ligeramente') ? 'alerta' : 'falla'
      },
      {
        instruccion: 'Usa la señal de calibración interna del osciloscopio (generalmente 1kHz, 1V). Conecta la punta al punto de calibración.',
        pregunta: '¿La forma de onda de calibración es una onda cuadrada limpia?',
        tipo: 'seleccion',
        opciones: ['Sí, onda cuadrada perfecta con bordes definidos', 'Onda cuadrada con bordes redondeados (compensación de punta)', 'Señal distorsionada o no reconocible'],
        evaluarRespuesta: (r) => r.startsWith('Sí') ? 'ok' : r.includes('redondeados') ? 'alerta' : 'falla'
      }
    ]
  }
]

const ESTADO_CONFIG = {
  ok:     { color: '#02d47e', bg: '#f0fdf8', icon: CheckCircle2,    label: 'Operativo' },
  alerta: { color: '#f59e0b', bg: '#fefce8', icon: AlertTriangle,   label: 'Revisar' },
  falla:  { color: '#f43f5e', bg: '#fff1f2', icon: XCircle,         label: 'Fuera de servicio' },
}

interface Props { onClose: () => void; onComplete: () => void }

export function VerificacionFuncionamientoModal({ onClose, onComplete }: Props) {
  const [equipoId, setEquipoId] = useState<string | null>(null)
  const [pasosCompletados, setPasosCompletados] = useState<Record<string, EstadoPaso[]>>({})
  const [pasoActual, setPasoActual] = useState(0)
  const [valorInput, setValorInput] = useState('')
  const [seleccion, setSeleccion] = useState<string | null>(null)
  const [mostrandoResultado, setMostrandoResultado] = useState(false)

  useEscapeKey(onClose)

  const equipo = EQUIPOS.find(e => e.id === equipoId)
  const resultadosEquipo = equipoId ? (pasosCompletados[equipoId] ?? []) : []
  const pasoInfo = equipo?.pasos[pasoActual]
  const equiposVerificados = Object.keys(pasosCompletados).length

  function responder() {
    if (!equipo || !pasoInfo) return
    const respuesta = pasoInfo.tipo === 'valor' ? valorInput : seleccion ?? ''
    if (!respuesta) return
    const estado = pasoInfo.evaluarRespuesta(respuesta)
    const nuevos = [...(pasosCompletados[equipo.id] ?? []), estado]
    setPasosCompletados(prev => ({ ...prev, [equipo.id]: nuevos }))
    setValorInput('')
    setSeleccion(null)
    if (pasoActual + 1 < equipo.pasos.length) {
      setPasoActual(pasoActual + 1)
    } else {
      setMostrandoResultado(true)
      if (equiposVerificados + 1 >= EQUIPOS.length) onComplete()
    }
  }

  function volverAlMenu() {
    setEquipoId(null)
    setPasoActual(0)
    setMostrandoResultado(false)
    setValorInput('')
    setSeleccion(null)
  }

  function iniciarEquipo(id: string) {
    setEquipoId(id)
    setPasoActual(pasosCompletados[id]?.length ?? 0)
    setMostrandoResultado((pasosCompletados[id]?.length ?? 0) >= (EQUIPOS.find(e => e.id === id)?.pasos.length ?? 0))
  }

  const estadoGlobal = (estados: EstadoPaso[]) => {
    if (estados.includes('falla')) return 'falla'
    if (estados.includes('alerta')) return 'alerta'
    return 'ok'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(4,57,65,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="relative w-full max-w-2xl my-8 rounded-2xl overflow-hidden shadow-2xl bg-white">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3" style={{ background: '#043941' }}>
          <div className="flex items-center gap-2">
            <ClipboardCheck size={16} color="#02d47e" />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#02d47e' }}>
              Verificación de funcionamiento — Zona Investigación
            </span>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-white/10">
            <X size={18} color="white" />
          </button>
        </div>

        <div className="px-6 py-5">

          {/* MENÚ DE EQUIPOS */}
          {!equipoId && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold" style={{ color: '#043941' }}>Selecciona el equipo a verificar</h2>
                <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                  Verifica cada equipo siguiendo el protocolo guiado. Necesitarás acceso físico al equipo durante la actividad.
                </p>
              </div>
              <div className="space-y-3">
                {EQUIPOS.map(eq => {
                  const resultados = pasosCompletados[eq.id] ?? []
                  const completado = resultados.length >= eq.pasos.length
                  const estado = completado ? estadoGlobal(resultados) : null
                  const cfg = estado ? ESTADO_CONFIG[estado] : null
                  return (
                    <button key={eq.id} onClick={() => iniciarEquipo(eq.id)}
                      className="w-full text-left rounded-xl p-4 border-2 transition-all hover:shadow-md"
                      style={{ borderColor: cfg ? cfg.color : '#e2e8f0', background: cfg ? cfg.bg : '#f8fafc' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{eq.icono}</span>
                          <div>
                            <p className="font-bold text-sm" style={{ color: '#043941' }}>{eq.nombre}</p>
                            <p className="text-xs" style={{ color: '#64748b' }}>{eq.descripcion}</p>
                          </div>
                        </div>
                        {cfg ? (
                          <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ color: cfg.color, background: `${cfg.color}20` }}>
                            {cfg.label}
                          </span>
                        ) : (
                          <span className="text-xs font-semibold" style={{ color: '#94a3b8' }}>
                            {resultados.length}/{eq.pasos.length} pasos
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
              {equiposVerificados > 0 && (
                <p className="text-xs text-center" style={{ color: '#94a3b8' }}>
                  {equiposVerificados}/{EQUIPOS.length} equipos verificados
                </p>
              )}
            </div>
          )}

          {/* VERIFICACIÓN PASO A PASO */}
          {equipoId && equipo && !mostrandoResultado && pasoInfo && (
            <div className="space-y-4">
              <button onClick={volverAlMenu} className="text-xs flex items-center gap-1" style={{ color: '#64748b' }}>
                ← Volver a equipos
              </button>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{equipo.icono}</span>
                <div>
                  <h2 className="font-bold" style={{ color: '#043941' }}>{equipo.nombre}</h2>
                  <p className="text-xs" style={{ color: '#64748b' }}>Paso {pasoActual + 1} de {equipo.pasos.length}</p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="flex gap-1">
                {equipo.pasos.map((_, i) => (
                  <div key={i} className="h-1 flex-1 rounded-full"
                    style={{ background: i < pasoActual ? '#02d47e' : i === pasoActual ? '#043941' : '#e2e8f0' }} />
                ))}
              </div>

              {/* Instrucción */}
              <div className="rounded-xl p-4 text-sm" style={{ background: '#f0fdf8', borderLeft: '4px solid #02d47e', color: '#043941' }}>
                <p className="font-semibold mb-1">📋 Instrucción</p>
                <p>{pasoInfo.instruccion}</p>
              </div>

              {/* Pregunta */}
              <p className="font-semibold text-sm" style={{ color: '#043941' }}>{pasoInfo.pregunta}</p>

              {pasoInfo.tipo === 'seleccion' && pasoInfo.opciones && (
                <div className="space-y-2">
                  {pasoInfo.opciones.map(op => (
                    <button key={op} onClick={() => setSeleccion(op)}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm border-2 transition-all"
                      style={{ borderColor: seleccion === op ? '#043941' : '#e2e8f0', background: seleccion === op ? '#f0fdf8' : '#f8fafc', color: '#1e293b' }}>
                      {op}
                    </button>
                  ))}
                </div>
              )}

              {pasoInfo.tipo === 'valor' && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={valorInput}
                    onChange={e => setValorInput(e.target.value)}
                    placeholder={`Ej: ${pasoInfo.valorMin}`}
                    className="flex-1 border-2 rounded-xl px-4 py-3 text-sm outline-none"
                    style={{ borderColor: '#e2e8f0' }}
                  />
                  <span className="text-sm font-semibold" style={{ color: '#64748b' }}>{pasoInfo.unidad}</span>
                </div>
              )}

              <button onClick={responder}
                disabled={pasoInfo.tipo === 'valor' ? !valorInput : !seleccion}
                className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-40"
                style={{ background: '#043941' }}>
                Registrar y continuar <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* RESULTADO DEL EQUIPO */}
          {mostrandoResultado && equipo && (
            <div className="space-y-4">
              <button onClick={volverAlMenu} className="text-xs flex items-center gap-1" style={{ color: '#64748b' }}>
                ← Volver a equipos
              </button>
              {(() => {
                const resultados = pasosCompletados[equipo.id] ?? []
                const estado = estadoGlobal(resultados)
                const cfg = ESTADO_CONFIG[estado]
                const Icon = cfg.icon
                return (
                  <>
                    <div className="rounded-xl p-5 text-center" style={{ background: cfg.bg, border: `2px solid ${cfg.color}` }}>
                      <Icon size={36} style={{ color: cfg.color, margin: '0 auto 8px' }} />
                      <h3 className="font-bold text-lg" style={{ color: '#043941' }}>{equipo.nombre}</h3>
                      <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ color: cfg.color, background: `${cfg.color}20` }}>
                        {cfg.label}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {equipo.pasos.map((paso, i) => {
                        const r = resultados[i]
                        const c = r ? ESTADO_CONFIG[r] : null
                        const Ic = c?.icon
                        return (
                          <div key={i} className="flex items-start gap-3 text-sm rounded-lg px-3 py-2"
                            style={{ background: c?.bg ?? '#f8fafc' }}>
                            {Ic && <Ic size={15} className="mt-0.5 shrink-0" style={{ color: c?.color }} />}
                            <span style={{ color: '#043941' }}>Paso {i + 1}: {paso.pregunta}</span>
                          </div>
                        )
                      })}
                    </div>
                    {estado !== 'ok' && (
                      <div className="rounded-xl p-3 text-sm" style={{ background: '#fefce8', borderLeft: '3px solid #f59e0b', color: '#854d0e' }}>
                        ⚠️ Reporta este equipo al responsable del taller antes de usarlo en sesión con estudiantes.
                      </div>
                    )}
                    <button onClick={volverAlMenu}
                      className="w-full py-3 rounded-xl font-bold text-white hover:opacity-90"
                      style={{ background: '#043941' }}>
                      Verificar otro equipo
                    </button>
                  </>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
