// src/components/lxp/interactivos/ChecklistMantenimientoModal.tsx
import { useState, useMemo } from 'react'
import { X, CheckSquare, Square, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'

type ZonaCtx = 'investigacion' | 'almacen'

interface Paso {
  id: string
  texto: string
}

interface EquipoChecklist {
  nombre: string
  icono: string
  pasos: Paso[]
}

const DATA: Record<ZonaCtx, { titulo: string; sesion: string; equipos: EquipoChecklist[] }> = {
  investigacion: {
    titulo: 'Zona de Investigación, Gestión y Diseño',
    sesion: 'M2-S22',
    equipos: [
      {
        nombre: 'Computadora de escritorio All-in-One',
        icono: '🖥️',
        pasos: [
          { id: 'pc-1', texto: 'Limpiar pantalla con paño de microfibra antiestático (sin líquidos directos)' },
          { id: 'pc-2', texto: 'Verificar que cables de alimentación y periféricos estén bien conectados' },
          { id: 'pc-3', texto: 'Comprobar que el teclado y mouse responden correctamente' },
          { id: 'pc-4', texto: 'Revisar espacio en disco disponible (mínimo 20% libre)' },
          { id: 'pc-5', texto: 'Limpiar ranuras de ventilación con aire comprimido' },
        ],
      },
      {
        nombre: 'Tablet',
        icono: '📱',
        pasos: [
          { id: 'tab-1', texto: 'Limpiar pantalla con paño suave — verificar que el táctil responde en toda la superficie' },
          { id: 'tab-2', texto: 'Revisar nivel de batería — cargar si está por debajo del 30%' },
          { id: 'tab-3', texto: 'Inspeccionar carcasa protectora: sin grietas ni bordes sueltos' },
          { id: 'tab-4', texto: 'Verificar conexión WiFi a la red del taller' },
          { id: 'tab-5', texto: 'Guardar en cargador o anaquel correspondiente' },
        ],
      },
      {
        nombre: 'Cámara fotográfica Canon EOS R100',
        icono: '📷',
        pasos: [
          { id: 'cam-1', texto: 'Limpiar lente con paño de microfibra — nunca tocar el sensor directamente' },
          { id: 'cam-2', texto: 'Verificar nivel de batería y carga si es necesario' },
          { id: 'cam-3', texto: 'Formatear tarjeta SD si tiene imágenes antiguas ya respaldadas' },
          { id: 'cam-4', texto: 'Limpiar cuerpo exterior con paño seco' },
          { id: 'cam-5', texto: 'Guardar con tapa de lente puesta en estuche o anaquel' },
        ],
      },
      {
        nombre: 'Cámara Filmadora con trípode',
        icono: '🎥',
        pasos: [
          { id: 'fil-1', texto: 'Limpiar lente y pantalla abatible con paño de microfibra' },
          { id: 'fil-2', texto: 'Verificar batería y carga si está por debajo del 30%' },
          { id: 'fil-3', texto: 'Revisar estado de las patas del trípode — apretar tornillos si están sueltos' },
          { id: 'fil-4', texto: 'Verificar tarjeta SD disponible y en buen estado' },
          { id: 'fil-5', texto: 'Plegar trípode y guardar junto a la filmadora en su funda' },
        ],
      },
      {
        nombre: 'Impresora Multifuncional Brother',
        icono: '🖨️',
        pasos: [
          { id: 'imp-1', texto: 'Verificar nivel de tóner — avisar si está por debajo del 20%' },
          { id: 'imp-2', texto: 'Revisar bandeja de papel: sin hojas atascadas y con papel suficiente' },
          { id: 'imp-3', texto: 'Realizar impresión de prueba en blanco y negro' },
          { id: 'imp-4', texto: 'Limpiar bandeja y exterior con paño seco' },
          { id: 'imp-5', texto: 'Verificar conexión de red o USB según configuración del taller' },
        ],
      },
      {
        nombre: 'Impresora 3D',
        icono: '🔷',
        pasos: [
          { id: '3d-1', texto: 'Limpiar plataforma de impresión con espátula — retirar residuos de filamento' },
          { id: '3d-2', texto: 'Verificar nivel de filamento en bobina (mínimo 20% restante)' },
          { id: '3d-3', texto: 'Calibrar cama de impresión con papel A4 de referencia' },
          { id: '3d-4', texto: 'Limpiar boquilla (nozzle) a temperatura de extrusión con limpiador frío' },
          { id: '3d-5', texto: 'Verificar movimiento de ejes X, Y, Z — sin ruidos ni bloqueos' },
        ],
      },
    ],
  },
  almacen: {
    titulo: 'Depósito / Almacén',
    sesion: 'M3-S29',
    equipos: [
      {
        nombre: 'Herramientas manuales (llaves, alicates, destornilladores)',
        icono: '🔧',
        pasos: [
          { id: 'man-1', texto: 'Limpiar cada herramienta con trapo seco — retirar aceite, grasa o suciedad' },
          { id: 'man-2', texto: 'Verificar que no haya herramientas oxidadas — aplicar aceite anti-óxido si es necesario' },
          { id: 'man-3', texto: 'Inspeccionar filos y bocas: sin deformaciones ni desgaste excesivo' },
          { id: 'man-4', texto: 'Ordenar en carro porta herramientas en su posición correcta' },
          { id: 'man-5', texto: 'Verificar que el inventario completo esté presente' },
        ],
      },
      {
        nombre: 'Gato hidráulico tipo lagarto',
        icono: '⚙️',
        pasos: [
          { id: 'gat-1', texto: 'Verificar nivel de aceite hidráulico — rellenar con aceite ISO VG 46 si es bajo' },
          { id: 'gat-2', texto: 'Inspeccionar sellos y mangueras: sin fugas de aceite en el suelo o cuerpo' },
          { id: 'gat-3', texto: 'Probar el ciclo completo: subir, mantener 30 seg, bajar lentamente' },
          { id: 'gat-4', texto: 'Limpiar cuerpo exterior y ruedas con trapo húmedo' },
          { id: 'gat-5', texto: 'Guardar en posición baja (cerrado) en ubicación designada' },
        ],
      },
      {
        nombre: 'Multitester y Osciloscopio digital',
        icono: '🔌',
        pasos: [
          { id: 'med-1', texto: 'Verificar estado de cables de prueba: sin cortes ni empalmes en el aislante' },
          { id: 'med-2', texto: 'Comprobar batería o nivel de carga del equipo' },
          { id: 'med-3', texto: 'Limpiar pantalla y cuerpo con paño antiestático' },
          { id: 'med-4', texto: 'Verificar que las puntas de prueba respondan correctamente en modo voltímetro' },
          { id: 'med-5', texto: 'Guardar en estuche protector o colgado en panel de herramientas' },
        ],
      },
      {
        nombre: 'Escáner universal automotriz',
        icono: '📡',
        pasos: [
          { id: 'esc-1', texto: 'Verificar que el cable OBD-II esté intacto: sin dobleces ni contactos expuestos' },
          { id: 'esc-2', texto: 'Comprobar nivel de batería o carga' },
          { id: 'esc-3', texto: 'Limpiar pantalla con paño de microfibra' },
          { id: 'esc-4', texto: 'Verificar que el software/firmware está actualizado' },
          { id: 'esc-5', texto: 'Guardar en estuche rígido en anaquel designado' },
        ],
      },
      {
        nombre: 'Máquina de soldar multiproceso',
        icono: '⚡',
        pasos: [
          { id: 'sol-1', texto: 'Verificar estado del cable de masa y porta-electrodo: sin quemaduras ni empalmes' },
          { id: 'sol-2', texto: 'Comprobar que la máquina no tenga polvo metálico en las rejillas de ventilación' },
          { id: 'sol-3', texto: 'Revisar conexión eléctrica y enchufe industrial: sin signos de recalentamiento' },
          { id: 'sol-4', texto: 'Limpiar cuerpo exterior con trapo seco' },
          { id: 'sol-5', texto: 'Verificar stock de electrodos y guardar en contenedor hermético' },
        ],
      },
      {
        nombre: 'EPP — Equipos de Protección Personal',
        icono: '🦺',
        pasos: [
          { id: 'epp-1', texto: 'Inspeccionar lentes de protección: sin rayones profundos que dificulten la visión' },
          { id: 'epp-2', texto: 'Revisar guantes de mecánico y de soldar: sin cortes, agujeros ni costuras rotas' },
          { id: 'epp-3', texto: 'Verificar estado de mandil de serraje: sin quemaduras ni rasgaduras' },
          { id: 'epp-4', texto: 'Comprobar que la máscara electrónica de soldar oscurece correctamente al activarse' },
          { id: 'epp-5', texto: 'Ordenar y colgar cada EPP en su gancho o estante correspondiente' },
        ],
      },
    ],
  },
}

interface Props {
  zona: ZonaCtx
  onClose: () => void
  onComplete: () => void
}

export function ChecklistMantenimientoModal({ zona, onClose, onComplete }: Props) {
  useEscapeKey(onClose)
  const { titulo, sesion, equipos } = DATA[zona]

  const allPasoIds = useMemo(() => equipos.flatMap(e => e.pasos.map(p => p.id)), [equipos])

  const [checked, setChecked]           = useState<Set<string>>(new Set())
  const [expanded, setExpanded]         = useState<Set<string>>(new Set([equipos[0].nombre]))
  const [completado, setCompletado]     = useState(false)

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleEquipo(nombre: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(nombre) ? next.delete(nombre) : next.add(nombre)
      return next
    })
  }

  function checkAll(nombre: string) {
    const equipo = equipos.find(e => e.nombre === nombre)!
    setChecked(prev => {
      const next = new Set(prev)
      equipo.pasos.forEach(p => next.add(p.id))
      return next
    })
  }

  const totalPasos    = allPasoIds.length
  const totalChecked  = checked.size
  const porcentaje    = Math.round((totalChecked / totalPasos) * 100)

  function finalizar() {
    setCompletado(true)
    onComplete()
  }

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
            <CheckSquare size={20} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#02d47e' }}>
              Checklist de Mantenimiento · {sesion}
            </p>
            <h2 className="text-base font-extrabold text-white leading-snug">
              Rutina de mantenimiento preventivo
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

        {/* Barra de progreso global */}
        <div className="px-5 py-3 border-b" style={{ background: '#f8fcfb', borderColor: 'rgba(4,57,65,0.07)' }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold" style={{ color: '#043941' }}>
              Progreso general — {totalChecked}/{totalPasos} pasos
            </span>
            <span className="text-xs font-extrabold" style={{ color: '#02d47e' }}>{porcentaje}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(4,57,65,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${porcentaje}%`, background: 'linear-gradient(90deg,#02d47e,#00c16e)' }}
            />
          </div>
        </div>

        {/* Lista de equipos accordion */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2" style={{ background: '#f8fcfb' }}>
          {completado && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-2"
              style={{ background: 'rgba(2,212,126,0.08)', border: '1px solid rgba(2,212,126,0.25)' }}>
              <CheckCircle2 size={16} style={{ color: '#02d47e' }} />
              <p className="text-sm font-bold" style={{ color: '#043941' }}>
                ¡Mantenimiento registrado! Tu rutina quedó guardada.
              </p>
            </div>
          )}

          {equipos.map(equipo => {
            const isOpen      = expanded.has(equipo.nombre)
            const equipoIds   = equipo.pasos.map(p => p.id)
            const doneCount   = equipoIds.filter(id => checked.has(id)).length
            const allDone     = doneCount === equipoIds.length

            return (
              <div
                key={equipo.nombre}
                className="rounded-xl overflow-hidden"
                style={{
                  background: '#fff',
                  border: `1px solid ${allDone ? 'rgba(2,212,126,0.35)' : 'rgba(4,57,65,0.08)'}`,
                }}
              >
                {/* Header del equipo */}
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  onClick={() => toggleEquipo(equipo.nombre)}
                  style={{ background: allDone ? 'rgba(2,212,126,0.04)' : 'transparent' }}
                >
                  <span className="text-xl shrink-0">{equipo.icono}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: '#043941' }}>{equipo.nombre}</p>
                    <p className="text-[11px]" style={{ color: doneCount === equipoIds.length ? '#02d47e' : '#94a3b8' }}>
                      {doneCount}/{equipoIds.length} pasos completados
                    </p>
                  </div>
                  {allDone
                    ? <CheckCircle2 size={16} style={{ color: '#02d47e', flexShrink: 0 }} />
                    : isOpen
                      ? <ChevronDown size={16} style={{ color: '#94a3b8', flexShrink: 0 }} />
                      : <ChevronRight size={16} style={{ color: '#94a3b8', flexShrink: 0 }} />
                  }
                </button>

                {/* Pasos */}
                {isOpen && (
                  <div className="border-t px-4 py-3 space-y-2" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
                    {equipo.pasos.map(paso => {
                      const isChecked = checked.has(paso.id)
                      return (
                        <button
                          key={paso.id}
                          onClick={() => toggle(paso.id)}
                          className="w-full flex items-start gap-3 text-left px-3 py-2.5 rounded-xl transition-all"
                          style={{
                            background: isChecked ? 'rgba(2,212,126,0.06)' : 'rgba(4,57,65,0.02)',
                            border: `1px solid ${isChecked ? 'rgba(2,212,126,0.2)' : 'rgba(4,57,65,0.06)'}`,
                          }}
                        >
                          {isChecked
                            ? <CheckSquare size={16} className="shrink-0 mt-0.5" style={{ color: '#02d47e' }} />
                            : <Square      size={16} className="shrink-0 mt-0.5" style={{ color: '#94a3b8' }} />
                          }
                          <span className="text-sm leading-snug"
                            style={{ color: isChecked ? '#045f6c' : '#043941', textDecoration: isChecked ? 'line-through' : 'none' }}>
                            {paso.texto}
                          </span>
                        </button>
                      )
                    })}
                    {!allDone && (
                      <button
                        onClick={() => checkAll(equipo.nombre)}
                        className="w-full text-xs font-semibold py-1.5 rounded-lg transition-colors"
                        style={{ color: '#045f6c', background: 'rgba(4,95,108,0.06)' }}
                      >
                        Marcar todos como completados
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex items-center justify-between"
          style={{ borderColor: 'rgba(4,57,65,0.07)', background: '#ffffff' }}>
          <span className="text-xs" style={{ color: 'rgba(4,57,65,0.4)' }}>
            {porcentaje < 100
              ? `${totalPasos - totalChecked} paso${totalPasos - totalChecked !== 1 ? 's' : ''} pendientes`
              : '¡Todos los pasos completados!'}
          </span>
          {!completado ? (
            <button
              onClick={finalizar}
              disabled={porcentaje < 50}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: porcentaje >= 50 ? '#043941' : 'rgba(4,57,65,0.1)',
                color:      porcentaje >= 50 ? '#02d47e'  : '#94a3b8',
              }}
            >
              <CheckSquare size={14} />
              Registrar mantenimiento
            </button>
          ) : (
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: '#043941' }}>
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
