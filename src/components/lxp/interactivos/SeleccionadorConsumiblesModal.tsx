// src/components/lxp/interactivos/SeleccionadorConsumiblesModal.tsx
import { useState, useMemo } from 'react'
import { X, Wrench, CheckCircle2, AlertCircle, ChevronRight, RotateCcw } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'

type ZonaCtx = 'investigacion' | 'almacen' | 'innovacion'

interface Par {
  consumible: string
  equipo: string
  descripcion?: string
}

const DATA: Record<ZonaCtx, { titulo: string; sesion: string; pares: Par[] }> = {
  investigacion: {
    titulo:  'Zona de Investigación, Gestión y Diseño',
    sesion:  'M2-S19',
    pares: [
      { consumible: 'Tóner / Cartucho de tinta',   equipo: 'Impresora Multifuncional Brother',     descripcion: 'Insumo de impresión. Cada tóner dura aprox. 3 000 páginas.' },
      { consumible: 'Filamento PLA / ABS (bobina)', equipo: 'Impresora 3D',                         descripcion: 'Plástico termofusible que se deposita capa a capa para crear piezas.' },
      { consumible: 'Papel bond A4 80g',            equipo: 'Computadora + Impresora',              descripcion: 'Soporte físico para documentación técnica y fichas de trabajo.' },
      { consumible: 'Tarjeta de memoria SD 64GB',   equipo: 'Cámara Filmadora con trípode',         descripcion: 'Almacena vídeo en alta resolución durante las sesiones de grabación.' },
      { consumible: 'Pila AA 1.5V (par)',            equipo: 'Cámara fotográfica Canon EOS R100',   descripcion: 'Fuente de energía del flash externo y control remoto de la cámara.' },
      { consumible: 'Cable HDMI 2.0 (2m)',           equipo: 'Pizarra táctil interactiva multi-touch', descripcion: 'Conecta la computadora del docente a la pizarra para la proyección.' },
    ],
  },
  almacen: {
    titulo:  'Depósito / Almacén',
    sesion:  'M3-S26',
    pares: [
      { consumible: 'Electrodo de soldadura E6011 (varilla)', equipo: 'Máquina de soldar multiproceso',  descripcion: 'Barra metálica recubierta que genera el arco eléctrico de soldadura.' },
      { consumible: 'Disco de corte 115mm (amoladora)',       equipo: 'Amoladora',                       descripcion: 'Disco abrasivo para cortar o desbastar piezas metálicas.' },
      { consumible: 'Aceite de motor SAE 10W-30 (1L)',        equipo: 'Recolector de aceite / Motor',    descripcion: 'Lubricante para el motor del vehículo. Se usa en el cambio de aceite.' },
      { consumible: 'Grasa multiusos MP3 (cartucho)',         equipo: 'Engrasadora',                     descripcion: 'Se aplica en juntas, rodamientos y cojinetes para reducir la fricción.' },
      { consumible: 'Broca HSS 8mm (juego)',                  equipo: 'Juego de brocas / Taladro',       descripcion: 'Herramienta de corte giratoria para perforar metales y plásticos.' },
      { consumible: 'Pilas 9V alcalinas (par)',               equipo: 'Multitester',                     descripcion: 'Energía del tester digital. Una batería dura aprox. 300 h de uso.' },
      { consumible: 'Lija de agua grano 400',                 equipo: 'Banco de trabajo',                descripcion: 'Abrasivo para acabado y preparación de superficies metálicas.' },
    ],
  },
  innovacion: {
    titulo:  'Zona de Innovación',
    sesion:  'M4-S34',
    pares: [
      { consumible: 'Aceite hidráulico ISO VG 46 (1L)',    equipo: 'Elevador hidráulico de columnas',             descripcion: 'Fluido que transmite la presión en el sistema hidráulico del elevador.' },
      { consumible: 'Filtro de aceite automotriz',          equipo: 'Módulo de motor de gasolina (entrenador)',   descripcion: 'Filtra impurezas del aceite que circula por el motor durante la práctica.' },
      { consumible: 'Bujía NGK estándar (juego x4)',        equipo: 'Módulo de motor de gasolina (entrenador)',   descripcion: 'Genera la chispa eléctrica que enciende la mezcla aire-combustible.' },
      { consumible: 'Líquido de frenos DOT 4 (250ml)',      equipo: 'Módulo educativo de frenos ABS y TCS',       descripcion: 'Fluido hidráulico que transmite la presión de frenado al sistema.' },
      { consumible: 'Filtro de aire panel universal',        equipo: 'Compresora de aire (50L - 3HP)',             descripcion: 'Filtra partículas antes de que el aire entre al compresor o motor.' },
      { consumible: 'Refrigerante 50/50 anticongelante (1L)', equipo: 'Módulo de simulación de motor diesel',     descripcion: 'Controla la temperatura del motor y previene la corrosión interna.' },
      { consumible: 'Disco de freno ventilado (par)',        equipo: 'Módulo educativo de suspensión y frenos',    descripcion: 'Componente rotativo sobre el que actúan las pastillas para frenar.' },
    ],
  },
}

interface Props {
  zona: ZonaCtx
  onClose: () => void
  onComplete: () => void
}

export function SeleccionadorConsumiblesModal({ zona, onClose, onComplete }: Props) {
  useEscapeKey(onClose)
  const { titulo, sesion, pares } = DATA[zona]

  // All unique equipment options (distractor pool = all equipos in the zone)
  const equiposPool = useMemo(() => [...new Set(pares.map(p => p.equipo))], [pares])

  const [selecciones, setSelecciones] = useState<Record<number, string | null>>(
    () => Object.fromEntries(pares.map((_, i) => [i, null]))
  )
  const [verificado, setVerificado]   = useState(false)
  const [detalleIdx, setDetalleIdx]   = useState<number | null>(null)

  function seleccionar(parIdx: number, equipo: string) {
    if (verificado) return
    setSelecciones(prev => ({ ...prev, [parIdx]: prev[parIdx] === equipo ? null : equipo }))
  }

  const pendientes = Object.values(selecciones).filter(v => v === null).length

  const resultados = useMemo(() => {
    if (!verificado) return {} as Record<number, boolean>
    return Object.fromEntries(pares.map((p, i) => [i, selecciones[i] === p.equipo]))
  }, [verificado, selecciones, pares])

  const puntaje    = Object.values(resultados).filter(Boolean).length
  const porcentaje = Math.round((puntaje / pares.length) * 100)

  function verificar() {
    setVerificado(true)
    onComplete()
  }

  function reiniciar() {
    setSelecciones(Object.fromEntries(pares.map((_, i) => [i, null])))
    setVerificado(false)
    setDetalleIdx(null)
  }

  const ZONA_COLOR: Record<ZonaCtx, string> = {
    investigacion: '#045f6c',
    almacen:       '#043941',
    innovacion:    '#b45309',
  }
  const accentColor = ZONA_COLOR[zona]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,57,65,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#ffffff', boxShadow: '0 24px 64px rgba(4,57,65,0.3)' }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-start gap-4" style={{ background: '#043941' }}>
          <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(2,212,126,0.15)', border: '1px solid rgba(2,212,126,0.2)' }}>
            <Wrench size={20} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#02d47e' }}>
              Seleccionador de Consumibles · {sesion}
            </p>
            <h2 className="text-base font-extrabold text-white leading-snug">
              ¿A qué equipo pertenece cada consumible?
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{titulo}</p>
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

        {/* Instrucción */}
        <div className="px-5 py-2.5 border-b flex items-center justify-between"
          style={{ background: '#f8fcfb', borderColor: 'rgba(4,57,65,0.07)' }}>
          <p className="text-xs" style={{ color: 'rgba(4,57,65,0.5)' }}>
            Para cada consumible, selecciona el equipo al que corresponde.
          </p>
          {!verificado && (
            <span className="text-xs font-semibold" style={{ color: 'rgba(4,57,65,0.4)' }}>
              {pares.length - pendientes} / {pares.length}
            </span>
          )}
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ background: '#f8fcfb' }}>
          {pares.map((par, i) => {
            const sel       = selecciones[i]
            const resultado = resultados[i]

            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: '#fff',
                  border: `1px solid ${
                    verificado
                      ? resultado ? 'rgba(2,212,126,0.35)' : 'rgba(239,68,68,0.3)'
                      : 'rgba(4,57,65,0.08)'
                  }`,
                }}
              >
                {/* Consumible header */}
                <div className="flex items-center gap-3 px-4 py-3"
                  style={{ background: verificado ? (resultado ? 'rgba(2,212,126,0.04)' : 'rgba(239,68,68,0.03)') : '#fafffe' }}>
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}20` }}>
                    <Wrench size={14} style={{ color: accentColor }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-wide mb-0.5"
                      style={{ color: accentColor }}>
                      Consumible
                    </p>
                    <p className="text-sm font-bold" style={{ color: '#043941' }}>{par.consumible}</p>
                  </div>
                  {verificado && (
                    resultado
                      ? <CheckCircle2 size={16} style={{ color: '#02d47e', flexShrink: 0 }} />
                      : <AlertCircle  size={16} style={{ color: '#ef4444', flexShrink: 0 }} />
                  )}
                </div>

                {/* Opciones de equipo */}
                <div className="px-4 pb-3 pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: 'rgba(4,57,65,0.4)' }}>
                    ¿Para qué equipo?
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {equiposPool.map(equipo => {
                      const isSelected = sel === equipo
                      const esCorrecto = par.equipo === equipo
                      const style: React.CSSProperties = verificado
                        ? isSelected && esCorrecto   ? { background: 'rgba(2,212,126,0.1)',  border: '1.5px solid rgba(2,212,126,0.4)', color: '#043941' }
                        : isSelected && !esCorrecto  ? { background: 'rgba(239,68,68,0.07)', border: '1.5px solid rgba(239,68,68,0.3)', color: '#ef4444' }
                        : !isSelected && esCorrecto  ? { background: 'rgba(245,158,11,0.07)',border: '1.5px solid rgba(245,158,11,0.35)',color: '#b45309' }
                        :                              { background: 'rgba(4,57,65,0.02)', border: '1px solid rgba(4,57,65,0.06)', color: 'rgba(4,57,65,0.3)' }
                        : isSelected
                          ? { background: '#043941', border: '1.5px solid #043941', color: '#02d47e' }
                          : { background: 'rgba(4,57,65,0.03)', border: '1px solid rgba(4,57,65,0.08)', color: '#043941' }

                      return (
                        <button
                          key={equipo}
                          onClick={() => seleccionar(i, equipo)}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                          style={style}
                        >
                          {verificado && isSelected && esCorrecto  && '✓ '}
                          {verificado && isSelected && !esCorrecto && '✗ '}
                          {verificado && !isSelected && esCorrecto && '↑ Correcto: '}
                          {equipo}
                        </button>
                      )
                    })}
                  </div>

                  {/* Descripción del par (visible después de verificar o al expandir) */}
                  {(verificado || detalleIdx === i) && par.descripcion && (
                    <p className="text-xs mt-2.5 px-3 py-2 rounded-lg italic"
                      style={{ background: '#f0faf5', color: '#045f6c', border: '1px solid rgba(2,212,126,0.15)' }}>
                      💡 {par.descripcion}
                    </p>
                  )}
                  {!verificado && detalleIdx !== i && (
                    <button
                      onClick={() => setDetalleIdx(prev => prev === i ? null : i)}
                      className="mt-2 text-[10px] font-semibold"
                      style={{ color: 'rgba(4,57,65,0.35)' }}
                    >
                      {detalleIdx === i ? 'Ocultar pista' : '? Ver pista'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex items-center justify-between"
          style={{ borderColor: 'rgba(4,57,65,0.07)', background: '#ffffff' }}>
          {!verificado ? (
            <>
              <span className="text-xs" style={{ color: 'rgba(4,57,65,0.4)' }}>
                {pendientes > 0 ? `Faltan ${pendientes} por seleccionar` : '¡Todo seleccionado! Puedes verificar.'}
              </span>
              <button
                onClick={verificar}
                disabled={pendientes > 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                style={{
                  background: pendientes === 0 ? '#043941' : 'rgba(4,57,65,0.1)',
                  color: pendientes === 0 ? '#02d47e' : '#94a3b8',
                }}
              >
                Verificar <ChevronRight size={14} />
              </button>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm font-extrabold" style={{ color: '#043941' }}>
                  {puntaje} / {pares.length} correctos — {porcentaje}%
                </p>
                <p className="text-xs" style={{ color: '#64748b' }}>
                  {porcentaje >= 80
                    ? '¡Excelente! Conoces bien los consumibles del taller.'
                    : 'Revisa los consumibles de cada equipo.'}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={reiniciar} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold"
                  style={{ background: 'rgba(4,57,65,0.06)', color: '#043941' }}>
                  <RotateCcw size={13} /> Repetir
                </button>
                <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-bold text-white"
                  style={{ background: '#043941' }}>
                  Cerrar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
