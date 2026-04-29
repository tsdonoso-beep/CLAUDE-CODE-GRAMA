// src/components/lxp/interactivos/ActividadExternaModal.tsx
import { useState } from 'react'
import { X, ExternalLink, CheckCircle2 } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'

export interface ActividadExternaConfig {
  contenidoId: string
  titulo: string
  objetivo: string
  pasos: string[]
  herramienta: string
  urlHerramienta: string
  colorHerramienta: string
  icono: string
  entregable: string
}

export const ACTIVIDADES_EXTERNAS: Record<string, ActividadExternaConfig> = {
  'm0-s03-c4': {
    contenidoId:      'm0-s03-c4',
    titulo:           'Crea tu plantilla de planificación semanal',
    objetivo:         'Diseñar una plantilla reutilizable en Google Docs que te permita planificar cada semana de taller de forma estructurada, vinculando módulo, actividad, materiales y criterio de evaluación.',
    pasos: [
      'Abre Google Docs con tu cuenta institucional',
      'Crea un documento nuevo y nómbralo: "Planificación Semanal — Taller [nombre] — [año]"',
      'Diseña una tabla con las columnas: Semana · Módulo · Sesión · Actividad · Materiales · Criterio',
      'Completa al menos 2 semanas de ejemplo con datos reales de tu taller',
      'Activa el modo "Cualquier usuario con el enlace puede ver" y copia el link',
    ],
    herramienta:      'Google Docs',
    urlHerramienta:   'https://docs.google.com/document/create',
    colorHerramienta: '#4285F4',
    icono:            '📄',
    entregable:       'Documento Google Docs con mínimo 2 semanas planificadas',
  },
  'm0-s05-c4': {
    contenidoId:      'm0-s05-c4',
    titulo:           'Diseña una lámina de tu taller con Gamma AI',
    objetivo:         'Crear una lámina visual atractiva sobre tu taller usando inteligencia artificial generativa, que puedas usar como material de presentación con tus estudiantes.',
    pasos: [
      'Ingresa a Gamma AI (gamma.app) y crea una cuenta gratuita si aún no tienes',
      'Haz clic en "New AI presentation" y escribe el prompt: "Presentación del Taller de [especialidad] para estudiantes de secundaria"',
      'Selecciona el estilo visual que más represente a tu taller',
      'Revisa y edita las láminas generadas — agrega fotos reales de tu taller si tienes',
      'Exporta o comparte el enlace público de tu presentación',
    ],
    herramienta:      'Gamma AI',
    urlHerramienta:   'https://gamma.app',
    colorHerramienta: '#7c3aed',
    icono:            '✨',
    entregable:       'Presentación Gamma AI con mínimo 5 láminas sobre tu taller',
  },
  'm0-s06-c4': {
    contenidoId:      'm0-s06-c4',
    titulo:           'Construye el mapa de espacios de tu taller en Miró',
    objetivo:         'Crear un mapa visual interactivo de la distribución de zonas y equipos de tu taller en Miró, que sirva como referencia pedagógica para tus estudiantes.',
    pasos: [
      'Ingresa a Miro (miro.com) y crea una cuenta gratuita',
      'Crea un tablero nuevo y nómbralo: "Mapa de mi Taller — [especialidad]"',
      'Dibuja el plano básico de tu taller usando formas rectangulares para cada zona',
      'Etiqueta cada zona: Investigación, Innovación, Almacén / Depósito',
      'Agrega stickers o notas con los equipos principales de cada zona',
      'Comparte el tablero como "Cualquiera con el enlace puede ver"',
    ],
    herramienta:      'Miró',
    urlHerramienta:   'https://miro.com/app/dashboard/',
    colorHerramienta: '#f9c33e',
    icono:            '🗺️',
    entregable:       'Tablero Miro con mapa de las 3 zonas del taller y sus equipos principales',
  },
}

interface Props {
  config: ActividadExternaConfig
  onClose: () => void
  onComplete: () => void
}

export function ActividadExternaModal({ config, onClose, onComplete }: Props) {
  useEscapeKey(onClose)
  const [lanzado, setLanzado]         = useState(false)
  const [confirmado, setConfirmado]   = useState(false)

  function abrir() {
    window.open(config.urlHerramienta, '_blank', 'noopener,noreferrer')
    setLanzado(true)
  }

  function confirmar() {
    setConfirmado(true)
    onComplete()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,57,65,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#ffffff', boxShadow: '0 24px 64px rgba(4,57,65,0.3)' }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-start gap-4" style={{ background: '#043941' }}>
          <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-xl"
            style={{ background: 'rgba(2,212,126,0.15)', border: '1px solid rgba(2,212,126,0.2)' }}>
            {config.icono}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#02d47e' }}>
              Actividad con herramienta externa
            </p>
            <h2 className="text-sm font-extrabold text-white leading-snug">
              {config.titulo}
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

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5" style={{ background: '#f8fcfb' }}>
          {/* Objetivo */}
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest mb-2" style={{ color: '#02d47e' }}>
              Objetivo
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#043941' }}>
              {config.objetivo}
            </p>
          </div>

          {/* Pasos */}
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest mb-3" style={{ color: '#045f6c' }}>
              Pasos a seguir
            </p>
            <div className="space-y-2">
              {config.pasos.map((paso, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="h-5 w-5 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 mt-0.5"
                    style={{ background: '#043941', color: '#02d47e' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-snug" style={{ color: '#043941' }}>{paso}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Entregable */}
          <div className="px-4 py-3 rounded-xl"
            style={{ background: 'rgba(2,212,126,0.06)', border: '1px solid rgba(2,212,126,0.18)' }}>
            <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: '#02d47e' }}>
              Entregable esperado
            </p>
            <p className="text-sm font-semibold" style={{ color: '#043941' }}>{config.entregable}</p>
          </div>

          {/* Herramienta */}
          <button
            onClick={abrir}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: config.colorHerramienta, color: '#ffffff' }}
          >
            <ExternalLink size={15} />
            Abrir {config.herramienta}
          </button>

          {/* Confirmar completado */}
          {lanzado && !confirmado && (
            <div className="text-center">
              <p className="text-xs mb-3" style={{ color: '#64748b' }}>
                ¿Terminaste la actividad en {config.herramienta}?
              </p>
              <button
                onClick={confirmar}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold mx-auto transition-opacity hover:opacity-90"
                style={{ background: '#043941', color: '#02d47e' }}
              >
                <CheckCircle2 size={14} /> Sí, completé la actividad
              </button>
            </div>
          )}

          {confirmado && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(2,212,126,0.08)', border: '1px solid rgba(2,212,126,0.25)' }}>
              <CheckCircle2 size={16} style={{ color: '#02d47e' }} />
              <p className="text-sm font-bold" style={{ color: '#043941' }}>
                ¡Actividad completada! Tu progreso ha sido guardado.
              </p>
            </div>
          )}
        </div>

        {confirmado && (
          <div className="px-6 py-4 border-t flex justify-end"
            style={{ borderColor: 'rgba(4,57,65,0.07)', background: '#ffffff' }}>
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: '#043941' }}>
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
