// src/components/lxp/interactivos/ExploradorEquiposModal.tsx
import { useState, useMemo } from 'react'
import { X, Package, CheckCircle2, AlertCircle, ChevronRight, RotateCcw } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'

type Zona = 'investigacion' | 'innovacion' | 'almacen'

interface EquipoItem {
  id: string
  nombre: string
  zonaCorrecta: Zona
  pista: string
}

const EQUIPOS: EquipoItem[] = [
  { id: 'e1',  nombre: 'Computadora de escritorio (All-in-One)',      zonaCorrecta: 'investigacion', pista: 'Diseño, investigación y gestión de proyectos educativos' },
  { id: 'e2',  nombre: 'Tablet',                                       zonaCorrecta: 'investigacion', pista: 'Dispositivo portátil para documentación y trabajo colaborativo' },
  { id: 'e3',  nombre: 'Cámara fotográfica Canon EOS R100',            zonaCorrecta: 'investigacion', pista: 'Registro fotográfico de evidencias de aprendizaje' },
  { id: 'e4',  nombre: 'Impresora 3D',                                 zonaCorrecta: 'investigacion', pista: 'Prototipado de piezas para diseño de propuestas de valor' },
  { id: 'e5',  nombre: 'Pizarra táctil interactiva multi-touch',       zonaCorrecta: 'investigacion', pista: 'Presentaciones y clases interactivas con los estudiantes' },
  { id: 'e6',  nombre: 'Impresora Multifuncional Brother',             zonaCorrecta: 'investigacion', pista: 'Impresión de documentos técnicos y guías de trabajo' },
  { id: 'e7',  nombre: 'Elevador hidráulico de columnas',              zonaCorrecta: 'innovacion',    pista: 'Levanta vehículos para intervención mecánica en el taller' },
  { id: 'e8',  nombre: 'Compresora de aire (50L - 3HP)',               zonaCorrecta: 'innovacion',    pista: 'Alimenta herramientas neumáticas durante las prácticas' },
  { id: 'e9',  nombre: 'Módulo educativo de frenos ABS y TCS',         zonaCorrecta: 'innovacion',    pista: 'Simulación de sistemas de frenado electrónico en prácticas' },
  { id: 'e10', nombre: 'Prensa hidráulica',                            zonaCorrecta: 'innovacion',    pista: 'Desmontaje y montaje de rodamientos y bujes' },
  { id: 'e11', nombre: 'Módulo educativo de transmisión de potencia',   zonaCorrecta: 'innovacion',    pista: 'Simulación del sistema de transmisión del automóvil' },
  { id: 'e12', nombre: 'Taladro de columna',                           zonaCorrecta: 'innovacion',    pista: 'Perforación de piezas metálicas con precisión en prácticas' },
  { id: 'e13', nombre: 'Osciloscopio digital',                         zonaCorrecta: 'almacen',       pista: 'Diagnóstico de señales eléctricas y electrónicas del vehículo' },
  { id: 'e14', nombre: 'Escáner universal automotriz',                 zonaCorrecta: 'almacen',       pista: 'Lectura de códigos de falla OBD-II del vehículo' },
  { id: 'e15', nombre: 'Gato hidráulico tipo lagarto',                 zonaCorrecta: 'almacen',       pista: 'Levantamiento de vehículos en posición baja cerca al suelo' },
  { id: 'e16', nombre: 'Torquímetro',                                  zonaCorrecta: 'almacen',       pista: 'Control del par de apriete en pernos y tuercas críticos' },
  { id: 'e17', nombre: 'Multitester',                                  zonaCorrecta: 'almacen',       pista: 'Medición de voltaje, amperaje y resistencia eléctrica' },
  { id: 'e18', nombre: 'Analizador de gas de escape',                  zonaCorrecta: 'almacen',       pista: 'Diagnóstico de emisiones contaminantes del motor' },
]

const ZONAS: { id: Zona; label: string; short: string; color: string; bg: string; border: string }[] = [
  { id: 'investigacion', label: 'Investigación, Gestión y Diseño', short: 'Investigación', color: '#045f6c', bg: '#e3f8fb', border: 'rgba(4,95,108,0.2)' },
  { id: 'innovacion',    label: 'Zona de Innovación',              short: 'Innovación',    color: '#b45309', bg: '#fef3c7', border: 'rgba(180,83,9,0.2)'  },
  { id: 'almacen',       label: 'Depósito / Almacén',              short: 'Almacén',       color: '#043941', bg: '#f0faf5', border: 'rgba(4,57,65,0.15)'  },
]

interface Props {
  onClose: () => void
  onComplete: () => void
}

export function ExploradorEquiposModal({ onClose, onComplete }: Props) {
  useEscapeKey(onClose)
  const [verificado, setVerificado]     = useState(false)
  const [pistaId, setPistaId]           = useState<string | null>(null)
  const [asignaciones, setAsignaciones] = useState<Record<string, Zona | null>>(
    () => Object.fromEntries(EQUIPOS.map(e => [e.id, null]))
  )

  function asignar(equipoId: string, zona: Zona) {
    if (verificado) return
    setAsignaciones(prev => ({ ...prev, [equipoId]: zona }))
  }

  const pendientes = Object.values(asignaciones).filter(v => v === null).length

  const resultados = useMemo(() => {
    if (!verificado) return {} as Record<string, boolean>
    return Object.fromEntries(EQUIPOS.map(e => [e.id, asignaciones[e.id] === e.zonaCorrecta]))
  }, [verificado, asignaciones])

  const puntaje    = Object.values(resultados).filter(Boolean).length
  const porcentaje = Math.round((puntaje / EQUIPOS.length) * 100)

  function verificar() {
    setVerificado(true)
    onComplete()
  }

  function reiniciar() {
    setAsignaciones(Object.fromEntries(EQUIPOS.map(e => [e.id, null])))
    setVerificado(false)
    setPistaId(null)
  }

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
            <Package size={20} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#02d47e' }}>
              Explorador de Equipos · M1-S11
            </p>
            <h2 className="text-base font-extrabold text-white">
              Ubica cada equipo en su zona del taller automotriz
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

        {/* Leyenda de zonas */}
        <div className="px-5 py-2.5 border-b flex flex-wrap gap-2 items-center"
          style={{ background: '#f8fcfb', borderColor: 'rgba(4,57,65,0.07)' }}>
          {ZONAS.map(z => (
            <span key={z.id} className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: z.bg, color: z.color, border: `1px solid ${z.border}` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: z.color }} />
              {z.label}
            </span>
          ))}
          {!verificado && (
            <span className="ml-auto text-xs font-semibold" style={{ color: 'rgba(4,57,65,0.4)' }}>
              {EQUIPOS.length - pendientes} / {EQUIPOS.length} asignados
            </span>
          )}
        </div>

        {/* Lista de equipos */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2" style={{ background: '#f8fcfb' }}>
          {EQUIPOS.map(equipo => {
            const asignado     = asignaciones[equipo.id]
            const zonaAsignada = ZONAS.find(z => z.id === asignado)
            const resultado    = resultados[equipo.id]
            const zonaCorrecta = ZONAS.find(z => z.id === equipo.zonaCorrecta)!

            return (
              <div
                key={equipo.id}
                className="rounded-xl overflow-hidden"
                style={{
                  background: '#fff',
                  border: `1px solid ${
                    verificado
                      ? resultado ? 'rgba(2,212,126,0.4)' : 'rgba(239,68,68,0.3)'
                      : 'rgba(4,57,65,0.08)'
                  }`,
                }}
              >
                <div className="flex items-start gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {verificado && (
                        resultado
                          ? <CheckCircle2 size={14} style={{ color: '#02d47e', flexShrink: 0 }} />
                          : <AlertCircle  size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
                      )}
                      <span className="text-sm font-semibold" style={{ color: '#043941' }}>
                        {equipo.nombre}
                      </span>
                    </div>
                    {verificado && !resultado && (
                      <p className="text-[11px] mt-0.5" style={{ color: '#ef4444' }}>
                        Zona correcta: <strong>{zonaCorrecta.label}</strong>
                      </p>
                    )}
                  </div>
                  {!verificado && (
                    <button
                      onClick={() => setPistaId(prev => prev === equipo.id ? null : equipo.id)}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 transition-colors"
                      style={{ background: 'rgba(4,57,65,0.06)', color: '#045f6c' }}
                    >
                      {pistaId === equipo.id ? 'Ocultar' : '? Pista'}
                    </button>
                  )}
                </div>

                {pistaId === equipo.id && !verificado && (
                  <div className="px-4 pb-2.5">
                    <p className="text-xs px-3 py-2 rounded-lg italic"
                      style={{ background: '#f0faf5', color: '#045f6c', border: '1px solid rgba(2,212,126,0.15)' }}>
                      💡 {equipo.pista}
                    </p>
                  </div>
                )}

                {/* Botones de zona */}
                <div className="flex border-t" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
                  {ZONAS.map((zona, zi) => {
                    const isSelected = asignaciones[equipo.id] === zona.id
                    return (
                      <button
                        key={zona.id}
                        onClick={() => asignar(equipo.id, zona.id)}
                        className="flex-1 py-2 text-[11px] font-semibold transition-all"
                        style={{
                          background: isSelected ? zona.bg : 'transparent',
                          color: isSelected ? zona.color : 'rgba(4,57,65,0.35)',
                          borderRight: zi < ZONAS.length - 1 ? '1px solid rgba(4,57,65,0.05)' : 'none',
                        }}
                      >
                        {isSelected ? '✓ ' : ''}{zona.short}
                      </button>
                    )
                  })}
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
                {pendientes > 0 ? `Faltan ${pendientes} por asignar` : '¡Todos asignados! Puedes verificar.'}
              </span>
              <button
                onClick={verificar}
                disabled={pendientes > 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: pendientes === 0 ? '#043941' : 'rgba(4,57,65,0.1)',
                  color: pendientes === 0 ? '#02d47e' : '#94a3b8',
                }}
              >
                Verificar asignaciones <ChevronRight size={14} />
              </button>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm font-extrabold" style={{ color: '#043941' }}>
                  {puntaje} / {EQUIPOS.length} correctos — {porcentaje}%
                </p>
                <p className="text-xs" style={{ color: '#64748b' }}>
                  {porcentaje >= 80
                    ? '¡Excelente! Conoces bien la distribución del taller.'
                    : 'Revisa la distribución por zonas del taller.'}
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
