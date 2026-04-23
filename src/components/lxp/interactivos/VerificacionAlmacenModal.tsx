import { useState } from 'react'
import { X, ChevronRight, RotateCcw, ClipboardCheck, CheckCircle2, AlertTriangle, XCircle, Eye } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'

type EstadoPaso = 'ok' | 'alerta' | 'falla' | null

interface Paso {
  instruccion: string
  pregunta: string
  opciones: { texto: string; estado: EstadoPaso }[]
}

interface Herramienta {
  id: string
  nombre: string
  icono: string
  descripcion: string
  pasos: Paso[]
}

const HERRAMIENTAS: Herramienta[] = [
  {
    id: 'torque',
    nombre: 'Llave de Torque',
    icono: '🔧',
    descripcion: 'Inspección visual de escala, mecanismo de trinquete y condición de almacenamiento',
    pasos: [
      {
        instruccion: 'Retira la llave de torque de su estuche. Sostenla bajo buena iluminación y revisa la escala graduada a lo largo del cuerpo.',
        pregunta: '¿La escala graduada es completamente legible?',
        opciones: [
          { texto: 'Sí — escala legible, sin rayones ni borraduras', estado: 'ok' },
          { texto: 'Parcialmente legible — algunos valores desgastados', estado: 'alerta' },
          { texto: 'Ilegible o con escala doblada', estado: 'falla' },
        ]
      },
      {
        instruccion: 'Mueve el trinquete hacia adelante y hacia atrás con la mano. No apliques fuerza excesiva — solo evalúa la respuesta del mecanismo.',
        pregunta: '¿El mecanismo de trinquete responde correctamente?',
        opciones: [
          { texto: 'Gira libre en un sentido y traba en el otro — sin juego', estado: 'ok' },
          { texto: 'Funciona pero presenta algo de juego o clic irregular', estado: 'alerta' },
          { texto: 'No trab o traba en ambos sentidos', estado: 'falla' },
        ]
      },
      {
        instruccion: 'Revisa el valor en el que está configurada la llave. Para almacenamiento, debe estar devuelta al mínimo (o al menos debajo del 20% de su rango máximo) para no tensionar el resorte.',
        pregunta: '¿La llave está correctamente devuelta para almacenamiento?',
        opciones: [
          { texto: 'Sí — en el valor mínimo del rango', estado: 'ok' },
          { texto: 'No — el selector no está al mínimo', estado: 'alerta' },
        ]
      },
      {
        instruccion: 'Inspecciona el cuerpo metálico completo: búsca oxidación, golpes, dobleces o deformaciones que afecten la integridad de la herramienta.',
        pregunta: '¿El cuerpo de la llave está en buen estado?',
        opciones: [
          { texto: 'Sin daños visibles — superficie limpia', estado: 'ok' },
          { texto: 'Oxidación superficial leve o golpes menores sin deformación', estado: 'alerta' },
          { texto: 'Oxidación profunda, golpes con deformación o doblado', estado: 'falla' },
        ]
      },
    ]
  },
  {
    id: 'vernier',
    nombre: 'Vernier / Calibrador',
    icono: '📏',
    descripcion: 'Verificación de mordazas, deslizamiento, lectura de cero y freno de fijación',
    pasos: [
      {
        instruccion: 'Cierra las mordazas externas lentamente hasta que se toquen. Observa si los bordes de ambas mordazas coinciden en toda su longitud de contacto.',
        pregunta: '¿Las mordazas cierran y alinean correctamente?',
        opciones: [
          { texto: 'Cierran perfectamente — sin holgura ni desalineamiento visible', estado: 'ok' },
          { texto: 'Pequeño desalineamiento lateral (menos de 0.2 mm a la vista)', estado: 'alerta' },
          { texto: 'Mordazas no cierran, hay luz entre ellas o desalineamiento severo', estado: 'falla' },
        ]
      },
      {
        instruccion: 'Desliza el cursor a lo largo de toda la guía, de un extremo al otro. Evalúa si el movimiento es uniforme.',
        pregunta: '¿El cursor se desliza de manera uniforme?',
        opciones: [
          { texto: 'Deslizamiento suave y uniforme en todo el recorrido', estado: 'ok' },
          { texto: 'Deslizamiento irregular — puntos de mayor resistencia', estado: 'alerta' },
          { texto: 'Cursor atascado, muy flojo o con juego lateral excesivo', estado: 'falla' },
        ]
      },
      {
        instruccion: 'Cierra las mordazas hasta el tope (sin forzar). Lee la escala principal y la nonius en la posición cerrada.',
        pregunta: '¿La lectura en posición cerrada marca 0,00 mm?',
        opciones: [
          { texto: 'Marca exactamente 0,00 mm', estado: 'ok' },
          { texto: 'Marca hasta ±0,05 mm de error (dentro de tolerancia de uso)', estado: 'alerta' },
          { texto: 'Más de ±0,05 mm de error — requiere ajuste o retiro', estado: 'falla' },
        ]
      },
      {
        instruccion: 'Mueve el cursor a la mitad del recorrido y aprieta el tornillo de fijación. Intenta mover el cursor con la mano.',
        pregunta: '¿El freno de fijación inmoviliza correctamente el cursor?',
        opciones: [
          { texto: 'Sí — el cursor queda completamente fijo al apretar el tornillo', estado: 'ok' },
          { texto: 'Frena parcialmente pero cede con algo de presión', estado: 'alerta' },
          { texto: 'El tornillo no frena o está roto', estado: 'falla' },
        ]
      },
    ]
  },
  {
    id: 'alicates',
    nombre: 'Alicates Universales',
    icono: '🦾',
    descripcion: 'Inspección de mordazas, pivote, filo de corte y estado del aislamiento',
    pasos: [
      {
        instruccion: 'Cierra los alicates completamente y observa la zona de contacto de las mordazas desde el frente y el costado.',
        pregunta: '¿Las mordazas alinean correctamente al cerrar?',
        opciones: [
          { texto: 'Alinean perfectamente — contacto uniforme en toda la superficie', estado: 'ok' },
          { texto: 'Ligero desalineamiento lateral sin afectar el agarre', estado: 'alerta' },
          { texto: 'Mordazas torcidas, no alinean o hay luz visible entre ellas', estado: 'falla' },
        ]
      },
      {
        instruccion: 'Abre y cierra los alicates varias veces. Presta atención al pivote central — ¿se siente firme o tiene movimiento lateral?',
        pregunta: '¿El pivote central está en buen estado?',
        opciones: [
          { texto: 'Firme — sin juego lateral perceptible', estado: 'ok' },
          { texto: 'Juego leve — movimiento lateral menor a 1 mm', estado: 'alerta' },
          { texto: 'Juego excesivo — pivote flojo o desgastado', estado: 'falla' },
        ]
      },
      {
        instruccion: 'Observa el filo de corte lateral (en alicates que lo tengan). Busca mellas, deformaciones o zonas sin filo.',
        pregunta: '¿El filo de corte lateral está en buen estado?',
        opciones: [
          { texto: 'Filo completo — sin mellas ni deformaciones', estado: 'ok' },
          { texto: 'Mellas pequeñas que no afectan el corte de cables finos', estado: 'alerta' },
          { texto: 'Filo deteriorado, mellado significativo o aplastado', estado: 'falla' },
        ]
      },
      {
        instruccion: 'Inspecciona los mangos aislados a lo largo de toda su extensión. Busca cortes, grietas, zonas peladas o deformaciones térmicas.',
        pregunta: '¿El aislamiento de los mangos está íntegro?',
        opciones: [
          { texto: 'Aislamiento completo — sin cortes, grietas ni deformaciones', estado: 'ok' },
          { texto: 'Pequeñas grietas superficiales sin exposición del metal', estado: 'alerta' },
          { texto: 'Aislamiento cortado, pelado o con metal expuesto', estado: 'falla' },
        ]
      },
    ]
  },
]

const ESTADO_CONFIG = {
  ok:     { color: '#02d47e', bg: '#f0fdf8', icon: CheckCircle2,  label: 'En buen estado' },
  alerta: { color: '#f59e0b', bg: '#fefce8', icon: AlertTriangle, label: 'Revisar / Mantenimiento' },
  falla:  { color: '#f43f5e', bg: '#fff1f2', icon: XCircle,       label: 'Fuera de servicio' },
}

interface Props { onClose: () => void; onComplete: () => void }

export function VerificacionAlmacenModal({ onClose, onComplete }: Props) {
  const [herramientaId, setHerramientaId] = useState<string | null>(null)
  const [pasosCompletados, setPasosCompletados] = useState<Record<string, EstadoPaso[]>>({})
  const [pasoActual, setPasoActual] = useState(0)
  const [seleccion, setSeleccion] = useState<number | null>(null)
  const [mostrandoResultado, setMostrandoResultado] = useState(false)

  useEscapeKey(onClose)

  const herramienta = HERRAMIENTAS.find(h => h.id === herramientaId)
  const resultados = herramientaId ? (pasosCompletados[herramientaId] ?? []) : []
  const pasoInfo = herramienta?.pasos[pasoActual]
  const herramientasVerificadas = Object.keys(pasosCompletados).length

  function confirmar() {
    if (!herramienta || !pasoInfo || seleccion === null) return
    const estado = pasoInfo.opciones[seleccion].estado
    const nuevos = [...(pasosCompletados[herramienta.id] ?? []), estado]
    setPasosCompletados(prev => ({ ...prev, [herramienta.id]: nuevos }))
    setSeleccion(null)
    if (pasoActual + 1 < herramienta.pasos.length) {
      setPasoActual(pasoActual + 1)
    } else {
      setMostrandoResultado(true)
      if (herramientasVerificadas + 1 >= HERRAMIENTAS.length) onComplete()
    }
  }

  function volverAlMenu() {
    setHerramientaId(null)
    setPasoActual(0)
    setMostrandoResultado(false)
    setSeleccion(null)
  }

  function iniciar(id: string) {
    setHerramientaId(id)
    const completados = pasosCompletados[id]?.length ?? 0
    const total = HERRAMIENTAS.find(h => h.id === id)?.pasos.length ?? 0
    setPasoActual(completados)
    setMostrandoResultado(completados >= total)
    setSeleccion(null)
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
              Verificación visual — Zona Almacén
            </span>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-white/10">
            <X size={18} color="white" />
          </button>
        </div>

        <div className="px-6 py-5">

          {/* MENÚ DE HERRAMIENTAS */}
          {!herramientaId && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold" style={{ color: '#043941' }}>Selecciona la herramienta a inspeccionar</h2>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: '#64748b' }}>
                  Realiza la inspección visual y táctil de cada herramienta antes de la sesión. No necesitas encender ningún equipo.
                </p>
              </div>
              <div className="rounded-xl p-3 flex items-start gap-2 text-sm" style={{ background: '#fef9ec', border: '1px solid #fcd34d' }}>
                <Eye size={15} className="shrink-0 mt-0.5" style={{ color: '#ca8a04' }} />
                <p style={{ color: '#92400e' }}>
                  <strong>Verificación visual y táctil.</strong> Cada herramienta se inspecciona sin necesidad de medición instrumental. Usa buena iluminación y tus manos para cada paso.
                </p>
              </div>
              <div className="space-y-3">
                {HERRAMIENTAS.map(h => {
                  const resultadosH = pasosCompletados[h.id] ?? []
                  const completado = resultadosH.length >= h.pasos.length
                  const estado = completado ? estadoGlobal(resultadosH) : null
                  const cfg = estado ? ESTADO_CONFIG[estado] : null
                  return (
                    <button key={h.id} onClick={() => iniciar(h.id)}
                      className="w-full text-left rounded-xl p-4 border-2 transition-all hover:shadow-md"
                      style={{ borderColor: cfg ? cfg.color : '#e2e8f0', background: cfg ? cfg.bg : '#f8fafc' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{h.icono}</span>
                          <div>
                            <p className="font-bold text-sm" style={{ color: '#043941' }}>{h.nombre}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{h.pasos.length} verificaciones · inspección visual/táctil</p>
                          </div>
                        </div>
                        {cfg ? (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}` }}>
                            <cfg.icon size={11} /> {cfg.label}
                          </span>
                        ) : (
                          <ChevronRight size={16} style={{ color: '#94a3b8' }} />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
              {herramientasVerificadas > 0 && (
                <p className="text-xs text-center" style={{ color: '#64748b' }}>
                  {herramientasVerificadas} de {HERRAMIENTAS.length} herramientas inspeccionadas
                </p>
              )}
            </div>
          )}

          {/* INSPECCIÓN PASO A PASO */}
          {herramienta && !mostrandoResultado && pasoInfo && (
            <div className="space-y-4">
              {/* Breadcrumb */}
              <button onClick={volverAlMenu} className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#045f6c' }}>
                ← Todas las herramientas
              </button>

              {/* Progreso */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{herramienta.icono}</span>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#043941' }}>{herramienta.nombre}</p>
                    <p className="text-xs" style={{ color: '#64748b' }}>Verificación {pasoActual + 1} de {herramienta.pasos.length}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {herramienta.pasos.map((_, i) => {
                    const r = resultados[i]
                    const color = r === 'ok' ? '#02d47e' : r === 'alerta' ? '#f59e0b' : r === 'falla' ? '#f43f5e' : i === pasoActual ? '#043941' : '#e2e8f0'
                    return <div key={i} className="h-1.5 flex-1 rounded-full transition-all" style={{ background: color }} />
                  })}
                </div>
              </div>

              {/* Instrucción */}
              <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                <p className="font-semibold mb-1" style={{ color: '#0369a1' }}>Instrucción</p>
                <p style={{ color: '#0c4a6e' }}>{pasoInfo.instruccion}</p>
              </div>

              {/* Pregunta */}
              <div>
                <p className="text-sm font-bold mb-3" style={{ color: '#043941' }}>{pasoInfo.pregunta}</p>
                <div className="space-y-2">
                  {pasoInfo.opciones.map((opcion, i) => {
                    const selected = seleccion === i
                    const cfg = opcion.estado ? ESTADO_CONFIG[opcion.estado] : null
                    return (
                      <button key={i}
                        onClick={() => setSeleccion(i)}
                        className="w-full text-left rounded-xl px-4 py-3 text-sm border-2 transition-all"
                        style={{
                          borderColor: selected ? (cfg?.color ?? '#043941') : '#e2e8f0',
                          background: selected ? (cfg?.bg ?? '#f8fafc') : '#fafafa',
                        }}>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center"
                            style={{ borderColor: selected ? (cfg?.color ?? '#043941') : '#94a3b8', background: selected ? (cfg?.color ?? '#043941') : 'white' }}>
                            {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </div>
                          <span style={{ color: '#334155' }}>{opcion.texto}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                onClick={confirmar}
                disabled={seleccion === null}
                className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all"
                style={{ background: seleccion !== null ? '#043941' : '#94a3b8', cursor: seleccion !== null ? 'pointer' : 'not-allowed' }}>
                {pasoActual + 1 < herramienta.pasos.length ? 'Siguiente verificación' : 'Ver resultado de esta herramienta'}
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* RESULTADO DE HERRAMIENTA */}
          {herramienta && mostrandoResultado && (
            <div className="space-y-4">
              <button onClick={volverAlMenu} className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#045f6c' }}>
                ← Todas las herramientas
              </button>

              {(() => {
                const eg = estadoGlobal(resultados)
                const cfg = ESTADO_CONFIG[eg]
                return (
                  <div className="rounded-xl p-4 flex items-center gap-4" style={{ background: cfg.bg, border: `2px solid ${cfg.color}` }}>
                    <span className="text-3xl">{herramienta.icono}</span>
                    <div>
                      <p className="font-bold" style={{ color: '#043941' }}>{herramienta.nombre}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <cfg.icon size={14} style={{ color: cfg.color }} />
                        <span className="text-sm font-semibold" style={{ color: cfg.color }}>{cfg.label}</span>
                      </div>
                    </div>
                  </div>
                )
              })()}

              <div className="space-y-2">
                {herramienta.pasos.map((paso, i) => {
                  const r = resultados[i]
                  if (!r) return null
                  const cfg = ESTADO_CONFIG[r]
                  return (
                    <div key={i} className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm"
                      style={{ background: cfg.bg }}>
                      <cfg.icon size={14} className="shrink-0 mt-0.5" style={{ color: cfg.color }} />
                      <div>
                        <p className="font-semibold" style={{ color: '#043941' }}>Verificación {i + 1}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{paso.pregunta}</p>
                        <p className="text-xs font-medium mt-1" style={{ color: cfg.color }}>
                          {paso.opciones.find(o => o.estado === r)?.texto}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {resultados.some(r => r === 'alerta' || r === 'falla') && (
                <div className="rounded-xl p-3 flex items-start gap-2 text-sm" style={{ background: '#fff7ed', border: '1px solid #fb923c' }}>
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" style={{ color: '#ea580c' }} />
                  <p style={{ color: '#7c2d12' }}>
                    <strong>Acción requerida antes de la sesión:</strong> registra la herramienta en la bitácora de mantenimiento y coordina con el jefe de taller.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => { setPasosCompletados(p => ({ ...p, [herramienta.id]: [] })); setPasoActual(0); setMostrandoResultado(false); setSeleccion(null) }}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2"
                  style={{ borderColor: '#043941', color: '#043941' }}>
                  <RotateCcw size={14} /> Re-inspeccionar
                </button>
                <button onClick={volverAlMenu}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white"
                  style={{ background: '#043941' }}>
                  Siguiente herramienta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
