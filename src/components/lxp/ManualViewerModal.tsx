// src/components/lxp/ManualViewerModal.tsx
import { useState } from 'react'
import { X, ChevronRight, ChevronDown, AlertTriangle, Info, BookOpen, FileText } from 'lucide-react'
import type { ManualRuta, SeccionManual } from '@/data/manualesRuta'
import { useEscapeKey } from '@/hooks/useEscapeKey'

interface ManualViewerModalProps {
  manual: ManualRuta
  onClose: () => void
}

function AlertaBlock({ tipo, texto }: { tipo: 'info' | 'advertencia' | 'critico'; texto: string }) {
  const styles = {
    info:        { bg: '#e3f8fb', border: '#02d47e', color: '#045f6c', icon: Info },
    advertencia: { bg: '#fdf8da', border: '#ca8a04', color: '#92400e', icon: AlertTriangle },
    critico:     { bg: '#fee2e2', border: '#ef4444', color: '#991b1b', icon: AlertTriangle },
  }
  const s = styles[tipo]
  const Icon = s.icon
  return (
    <div className="flex gap-3 p-3 rounded-lg border-l-4 text-sm my-3"
      style={{ background: s.bg, borderColor: s.border, color: s.color }}>
      <Icon size={16} className="shrink-0 mt-0.5" />
      <span>{texto}</span>
    </div>
  )
}

function TablaBlock({ tabla }: { tabla: NonNullable<SeccionManual['tablas']>[0] }) {
  return (
    <div className="my-4 overflow-x-auto">
      {tabla.titulo && (
        <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#045f6c' }}>
          {tabla.titulo}
        </p>
      )}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: '#043941' }}>
            {tabla.encabezados.map((h, i) => (
              <th key={i} className="text-left px-3 py-2 text-white font-semibold text-xs">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabla.filas.map((fila, fi) => (
            <tr key={fi} style={{ background: fi % 2 === 0 ? '#f0faf5' : '#ffffff' }}>
              {fila.celdas.map((celda, ci) => (
                <td key={ci} className="px-3 py-2 text-xs border-b" style={{ borderColor: '#e3f8fb', color: '#043941' }}>
                  {celda}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {tabla.nota && (
        <p className="text-xs mt-1 italic" style={{ color: '#045f6c' }}>* {tabla.nota}</p>
      )}
    </div>
  )
}

function SeccionItem({ seccion, nivel = 0 }: { seccion: SeccionManual; nivel?: number }) {
  const [open, setOpen] = useState(nivel === 0)

  return (
    <div className={nivel === 0 ? 'border rounded-xl overflow-hidden mb-4' : 'ml-4 mt-3'}
      style={{ borderColor: nivel === 0 ? '#e3f8fb' : 'transparent' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left flex items-center gap-2 px-4 py-3"
        style={{ background: nivel === 0 ? (open ? '#f0faf5' : '#ffffff') : 'transparent' }}
      >
        {open
          ? <ChevronDown size={14} style={{ color: '#045f6c', flexShrink: 0 }} />
          : <ChevronRight size={14} style={{ color: '#045f6c', flexShrink: 0 }} />
        }
        <span className="text-xs font-bold mr-1" style={{ color: '#02d47e' }}>{seccion.numero}</span>
        <span className={`font-bold ${nivel === 0 ? 'text-sm' : 'text-xs'}`} style={{ color: '#043941' }}>
          {seccion.titulo}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-4" style={{ borderTop: nivel === 0 ? '1px solid #e3f8fb' : 'none' }}>
          {seccion.contenido && (
            <p className="text-sm leading-relaxed mt-3" style={{ color: '#374151' }}>
              {seccion.contenido}
            </p>
          )}

          {seccion.alertas?.map((a, i) => (
            <AlertaBlock key={i} tipo={a.tipo} texto={a.texto} />
          ))}

          {seccion.listaItems && seccion.listaItems.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {seccion.listaItems.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: '#374151' }}>
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: '#02d47e' }} />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {seccion.tablas?.map(tabla => (
            <TablaBlock key={tabla.id} tabla={tabla} />
          ))}

          {seccion.subsecciones?.map(sub => (
            <SeccionItem key={sub.id} seccion={sub} nivel={nivel + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ManualViewerModal({ manual, onClose }: ManualViewerModalProps) {
  useEscapeKey(onClose)
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,57,65,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#ffffff', boxShadow: '0 24px 64px rgba(4,57,65,0.25)' }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-start gap-4" style={{ background: '#043941' }}>
          <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#02d47e20' }}>
            <FileText size={20} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: '#02d47e' }}>
              Manual · {manual.paginas} páginas
            </p>
            <h2 className="text-base font-extrabold text-white leading-snug">{manual.titulo}</h2>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{manual.subtitulo}</p>
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

        {/* Descripción */}
        <div className="px-6 py-3 border-b" style={{ background: '#f0faf5', borderColor: '#e3f8fb' }}>
          <div className="flex items-center gap-2">
            <BookOpen size={13} style={{ color: '#045f6c' }} />
            <p className="text-xs" style={{ color: '#045f6c' }}>{manual.descripcion}</p>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {manual.secciones.map(seccion => (
            <SeccionItem key={seccion.id} seccion={seccion} nivel={0} />
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t flex items-center justify-between" style={{ borderColor: '#e3f8fb', background: '#f0faf5' }}>
          <span className="text-xs" style={{ color: '#94a3b8' }}>
            Versión {manual.version} · Para: {manual.destinatario}
          </span>
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
