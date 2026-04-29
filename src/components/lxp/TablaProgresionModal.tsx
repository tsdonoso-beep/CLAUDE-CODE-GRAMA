// src/components/lxp/TablaProgresionModal.tsx
import { useState } from 'react'
import { X, TrendingUp, BookOpen, Wrench, Target, Package } from 'lucide-react'
import { getProgresionByTaller, type ItemProgresion } from '@/data/progresionGrados'
import { HABILIDADES_EPT } from '@/data/habilidadesEPT'
import { useEscapeKey } from '@/hooks/useEscapeKey'

interface TablaProgresionModalProps {
  tallerSlug: string
  tallerNombre: string
  onClose: () => void
}

const GRADO_NUM = ['1°', '2°', '3°', '4°', '5°']

function ComplejidadBar({ valor }: { valor: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className="h-2 w-5 rounded-sm"
          style={{ background: i <= valor ? '#02d47e' : '#e3f8fb' }}
        />
      ))}
    </div>
  )
}

function GradoCard({ item }: { item: ItemProgresion }) {
  const habilidades = item.habilidadesClave.map(hid => HABILIDADES_EPT.find(h => h.id === hid)).filter(Boolean)

  return (
    <div className="space-y-4">
      {/* Nivel y complejidad */}
      <div className="flex items-center justify-between">
        <div>
          <span
            className="text-sm font-extrabold px-3 py-1 rounded-full"
            style={{ background: item.color + '20', color: item.color }}
          >
            {item.nivel}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] uppercase tracking-wide font-bold" style={{ color: '#94a3b8' }}>
            Complejidad
          </span>
          <ComplejidadBar valor={item.complejidad} />
        </div>
      </div>

      {/* Descripción del grado */}
      <div
        className="rounded-xl p-4 border-l-4"
        style={{ background: item.color + '08', borderColor: item.color }}
      >
        <p className="text-sm" style={{ color: '#043941' }}>{item.descripcionGrado}</p>
      </div>

      {/* Equipos en foco */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Wrench size={13} style={{ color: '#045f6c' }} />
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#045f6c' }}>
            Equipos en foco
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.equiposFoco.map((eq, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: '#e3f8fb', color: '#043941' }}
            >
              {eq}
            </span>
          ))}
        </div>
      </div>

      {/* Habilidades clave */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <TrendingUp size={13} style={{ color: '#045f6c' }} />
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#045f6c' }}>
            Habilidades EPT clave
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {habilidades.map(h => h && (
            <span
              key={h.id}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: h.color + '18', color: h.color, border: `1px solid ${h.color}40` }}
            >
              {h.icono} {h.nombre}
            </span>
          ))}
        </div>
      </div>

      {/* Proyecto ejemplo */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <BookOpen size={13} style={{ color: '#045f6c' }} />
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#045f6c' }}>
            Proyecto de Aprendizaje Ejemplo
          </p>
        </div>
        <div
          className="rounded-xl border p-4"
          style={{ background: '#f8fffe', borderColor: '#e3f8fb' }}
        >
          <p className="text-sm font-bold mb-1" style={{ color: '#043941' }}>
            {item.proyectoEjemplo}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Package size={11} style={{ color: '#02d47e' }} />
            <p className="text-xs" style={{ color: '#64748b' }}>
              <span className="font-semibold" style={{ color: '#043941' }}>Producto: </span>
              {item.producto}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TablaProgresionModal({ tallerSlug, tallerNombre, onClose }: TablaProgresionModalProps) {
  useEscapeKey(onClose)
  const [gradoActivo, setGradoActivo] = useState(0) // 0=1°, 1=2°, …, 4=5°

  const progresion = getProgresionByTaller(tallerSlug)
  const itemActivo = progresion[gradoActivo]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,57,65,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#ffffff', boxShadow: '0 24px 64px rgba(4,57,65,0.25)' }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-start gap-4 shrink-0" style={{ background: '#043941' }}>
          <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: '#02d47e20' }}>
            <TrendingUp size={20} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: '#02d47e' }}>
              Módulo 5 · Interactivo
            </p>
            <h2 className="text-base font-extrabold text-white leading-snug">
              Progresión por Grado — Interactiva
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {tallerNombre} · Secuencia didáctica 1° a 5° de secundaria
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)')}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs de grado */}
        <div className="px-5 py-3 border-b shrink-0" style={{ background: '#f0faf5', borderColor: '#e3f8fb' }}>
          {/* Línea de progresión visual */}
          <div className="flex items-center gap-0 mb-3">
            {progresion.map((item, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <button
                  onClick={() => setGradoActivo(idx)}
                  className="flex flex-col items-center gap-1 flex-1 transition-all"
                >
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all"
                    style={{
                      background: gradoActivo === idx ? item.color : gradoActivo > idx ? item.color + '40' : '#e3f8fb',
                      color: gradoActivo === idx ? '#ffffff' : gradoActivo > idx ? item.color : '#94a3b8',
                      boxShadow: gradoActivo === idx ? `0 0 0 3px ${item.color}40` : 'none',
                    }}
                  >
                    {GRADO_NUM[idx]}
                  </div>
                  <span
                    className="text-[11px] font-bold text-center leading-tight hidden sm:block"
                    style={{ color: gradoActivo === idx ? item.color : '#94a3b8' }}
                  >
                    {item.nivel.split(' ').slice(0, 1).join(' ')}
                  </span>
                </button>
                {idx < 4 && (
                  <div
                    className="h-0.5 flex-1 mx-0"
                    style={{ background: gradoActivo > idx ? '#02d47e' : '#e3f8fb' }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Tab pills */}
          <div className="flex gap-1.5 flex-wrap">
            {progresion.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setGradoActivo(idx)}
                className="text-xs font-bold px-3 py-1.5 rounded-full transition-all"
                style={
                  gradoActivo === idx
                    ? { background: item.color, color: '#ffffff' }
                    : { background: '#e3f8fb', color: '#045f6c' }
                }
              >
                {GRADO_NUM[idx]} {item.nivel}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido del grado activo */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {itemActivo ? (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: itemActivo.color + '15' }}
                >
                  {GRADO_NUM[gradoActivo]}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold" style={{ color: '#043941' }}>
                    {gradoActivo + 1}° grado · {itemActivo.nivel}
                  </h3>
                  <p className="text-xs" style={{ color: '#64748b' }}>
                    Secuencia sugerida para este nivel educativo
                  </p>
                </div>
              </div>
              <GradoCard item={itemActivo} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Target size={40} style={{ color: '#e3f8fb' }} />
              <p className="text-sm" style={{ color: '#94a3b8' }}>Sin datos para este grado</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t flex items-center justify-between shrink-0"
          style={{ borderColor: '#e3f8fb', background: '#f0faf5' }}>
          <div className="flex items-center gap-3">
            {gradoActivo > 0 && (
              <button
                onClick={() => setGradoActivo(prev => prev - 1)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg border"
                style={{ borderColor: '#e3f8fb', color: '#043941', background: '#ffffff' }}
              >
                ← {GRADO_NUM[gradoActivo - 1]} {progresion[gradoActivo - 1]?.nivel}
              </button>
            )}
            {gradoActivo < 4 && (
              <button
                onClick={() => setGradoActivo(prev => prev + 1)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg"
                style={{ background: progresion[gradoActivo + 1]?.color ?? '#02d47e', color: '#ffffff' }}
              >
                {GRADO_NUM[gradoActivo + 1]} {progresion[gradoActivo + 1]?.nivel} →
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-xs font-bold px-4 py-2 rounded-lg text-white"
            style={{ background: '#043941' }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
