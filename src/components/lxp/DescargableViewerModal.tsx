// src/components/lxp/DescargableViewerModal.tsx
import { useState } from 'react'
import { X, Download, FileText, Info, AlertTriangle, CheckSquare, ChevronDown, ChevronRight } from 'lucide-react'
import type { DescargableLXP, SeccionFicha, CampoFicha } from '@/data/descargablesLXP'
import jsPDF from 'jspdf'
import { useEscapeKey } from '@/hooks/useEscapeKey'

interface DescargableViewerModalProps {
  descargable: DescargableLXP
  onClose: () => void
}

const TIPO_BADGE: Record<string, { label: string; color: string }> = {
  FICHA_PLASTIFICABLE: { label: 'Ficha Plastificable', color: '#8b5cf6' },
  RUBRICA:             { label: 'Rúbrica',              color: '#ef4444' },
  BITACORA:            { label: 'Bitácora',             color: '#f59e0b' },
  PLANTILLA:           { label: 'Plantilla',            color: '#3b82f6' },
  PACK:                { label: 'Pack',                 color: '#10b981' },
}

const TIPO_ICONO: Record<string, string> = {
  texto:   '— — — — — — — — — — — — — — — — — — — — — — — — — — — — —',
  area:    '— — — — — — — — — — — — — — — — — — — —\n— — — — — — — — — — — — — — — — — — — —\n— — — — — — — — — — — — — — — — — — — —',
  check:   '☐',
  fecha:   '— — / — — / — — — —',
  numero:  '— — — — — — — — — —',
  select:  '▽ — — — — — — — — — — — — — —',
  firma:   'Firma: — — — — — — — — — — — — — — — — — — — — — — —',
}

function CampoPreview({ campo }: { campo: CampoFicha }) {
  if (campo.tipo === 'check') {
    return (
      <div className="flex items-start gap-2 py-1.5 border-b" style={{ borderColor: '#f1f5f9' }}>
        <div className="h-4 w-4 rounded border-2 shrink-0 mt-0.5" style={{ borderColor: '#cbd5e1' }} />
        <span className="text-xs" style={{ color: '#374151' }}>{campo.etiqueta}</span>
      </div>
    )
  }
  if (campo.tipo === 'firma') {
    return (
      <div className="py-2 border-b" style={{ borderColor: '#f1f5f9' }}>
        <p className="text-xs font-semibold mb-1" style={{ color: '#374151' }}>{campo.etiqueta}</p>
        <div className="h-8 border-b-2 mt-2" style={{ borderColor: '#cbd5e1' }} />
      </div>
    )
  }
  if (campo.tipo === 'area') {
    return (
      <div className="py-2 border-b" style={{ borderColor: '#f1f5f9' }}>
        <p className="text-xs font-semibold mb-1" style={{ color: '#374151' }}>
          {campo.etiqueta}
          {campo.requerido && <span style={{ color: '#ef4444' }}> *</span>}
        </p>
        {campo.placeholder && (
          <p className="text-[10px] italic mb-1" style={{ color: '#94a3b8' }}>{campo.placeholder}</p>
        )}
        <div className="rounded border h-14" style={{ borderColor: '#e2e8f0', background: '#f8fafc' }} />
      </div>
    )
  }
  if (campo.tipo === 'select') {
    return (
      <div className="py-2 border-b" style={{ borderColor: '#f1f5f9' }}>
        <p className="text-xs font-semibold mb-1" style={{ color: '#374151' }}>{campo.etiqueta}</p>
        <div className="space-y-0.5">
          {campo.opciones?.map((op, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full border shrink-0" style={{ borderColor: '#cbd5e1' }} />
              <span className="text-[10px]" style={{ color: '#64748b' }}>{op}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  // texto, fecha, numero
  return (
    <div className="py-1.5 border-b" style={{ borderColor: '#f1f5f9' }}>
      <div className="flex items-center gap-3">
        <span className="text-xs shrink-0" style={{ color: '#374151', minWidth: '30%' }}>
          {campo.etiqueta}{campo.requerido && <span style={{ color: '#ef4444' }}> *</span>}:
        </span>
        <div className="flex-1 h-px" style={{ background: '#cbd5e1' }} />
      </div>
    </div>
  )
}

function SeccionBlock({ seccion, index }: { seccion: SeccionFicha; index: number }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: '#e3f8fb' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left px-4 py-3 flex items-center gap-3"
        style={{ background: open ? '#f0faf5' : '#ffffff' }}
      >
        <div className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0"
          style={{ background: '#043941', color: '#02d47e' }}>
          {String.fromCharCode(65 + index)}
        </div>
        <span className="flex-1 text-sm font-bold" style={{ color: '#043941' }}>{seccion.titulo}</span>
        <span className="text-xs" style={{ color: '#94a3b8' }}>{seccion.campos.length} campos</span>
        {open
          ? <ChevronDown size={14} style={{ color: '#045f6c' }} />
          : <ChevronRight size={14} style={{ color: '#045f6c' }} />}
      </button>
      {open && (
        <div className="px-4 pb-3 pt-1" style={{ background: '#fafffe' }}>
          {seccion.descripcion && (
            <p className="text-xs italic mb-2" style={{ color: '#64748b' }}>{seccion.descripcion}</p>
          )}
          {seccion.campos.map(campo => (
            <CampoPreview key={campo.id} campo={campo} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── PDF Generator ─────────────────────────────────────────────────────────────
function generarPDF(d: DescargableLXP) {
  const isA5 = d.formato === 'A5'
  const doc = new jsPDF({ format: d.formato === 'A3' ? 'a3' : isA5 ? 'a5' : 'a4', orientation: 'portrait' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 12
  let y = 0

  const addPage = () => {
    doc.addPage()
    y = 15
  }

  const checkY = (needed: number) => {
    if (y + needed > pageHeight - 15) addPage()
  }

  // ── Portada ──
  doc.setFillColor(4, 57, 65)
  doc.rect(0, 0, pageWidth, isA5 ? 30 : 38, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(isA5 ? 12 : 16)
  doc.setFont('helvetica', 'bold')
  const titleLines = doc.splitTextToSize(d.titulo, pageWidth - margin * 2)
  doc.text(titleLines, margin, isA5 ? 10 : 14)

  doc.setFontSize(isA5 ? 7 : 9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(2, 212, 126)
  const subLines = doc.splitTextToSize(d.subtitulo, pageWidth - margin * 2)
  doc.text(subLines, margin, isA5 ? 20 : 28)

  y = (isA5 ? 30 : 38) + 6

  // Descripción
  doc.setTextColor(50, 50, 50)
  doc.setFontSize(isA5 ? 7 : 9)
  doc.setFont('helvetica', 'italic')
  const descLines = doc.splitTextToSize(d.descripcion, pageWidth - margin * 2)
  doc.text(descLines, margin, y)
  y += descLines.length * (isA5 ? 4 : 5) + 4

  // Instrucciones
  if (d.instrucciones) {
    checkY(14)
    doc.setFillColor(230, 248, 255)
    const iLines = doc.splitTextToSize('Instrucciones: ' + d.instrucciones, pageWidth - margin * 2 - 4)
    const iH = iLines.length * (isA5 ? 3.5 : 4.5) + 6
    doc.roundedRect(margin, y, pageWidth - margin * 2, iH, 2, 2, 'F')
    doc.setTextColor(4, 57, 65)
    doc.setFontSize(isA5 ? 6.5 : 8)
    doc.setFont('helvetica', 'bold')
    doc.text(iLines, margin + 2, y + 4)
    y += iH + 4
  }

  // Nota
  if (d.nota) {
    checkY(12)
    doc.setFillColor(255, 243, 200)
    const nLines = doc.splitTextToSize('(!) ' + d.nota, pageWidth - margin * 2 - 4)
    const nH = nLines.length * (isA5 ? 3.5 : 4.5) + 6
    doc.roundedRect(margin, y, pageWidth - margin * 2, nH, 2, 2, 'F')
    doc.setTextColor(146, 64, 14)
    doc.setFontSize(isA5 ? 6.5 : 8)
    doc.setFont('helvetica', 'bold')
    doc.text(nLines, margin + 2, y + 4)
    y += nH + 5
  }

  // ── Secciones ──
  for (let s = 0; s < d.secciones.length; s++) {
    const seccion = d.secciones[s]
    checkY(20)

    // Cabecera de sección
    doc.setFillColor(4, 57, 65)
    const secLabel = `${String.fromCharCode(65 + s)}. ${seccion.titulo}`
    const secLines = doc.splitTextToSize(secLabel, pageWidth - margin * 2 - 10)
    const secH = secLines.length * (isA5 ? 4 : 5) + 6
    doc.roundedRect(margin, y, pageWidth - margin * 2, secH, 2, 2, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(isA5 ? 8 : 10)
    doc.setFont('helvetica', 'bold')
    doc.text(secLines, margin + 4, y + 4)
    y += secH + 2

    if (seccion.descripcion) {
      checkY(8)
      doc.setTextColor(80, 80, 80)
      doc.setFontSize(isA5 ? 6 : 7.5)
      doc.setFont('helvetica', 'italic')
      const dLines = doc.splitTextToSize(seccion.descripcion, pageWidth - margin * 2)
      doc.text(dLines, margin, y)
      y += dLines.length * (isA5 ? 3.5 : 4) + 2
    }

    // Campos
    for (const campo of seccion.campos) {
      const lineH = isA5 ? 4 : 5
      checkY(12)

      if (campo.tipo === 'check') {
        doc.setTextColor(30, 30, 30)
        doc.setFontSize(isA5 ? 7 : 9)
        doc.setFont('helvetica', 'normal')
        const chkLines = doc.splitTextToSize('[ ]  ' + campo.etiqueta, pageWidth - margin * 2 - 4)
        checkY(chkLines.length * lineH + 2)
        doc.text(chkLines, margin + 2, y)
        y += chkLines.length * lineH + 1
        // línea divisora tenue
        doc.setDrawColor(230, 230, 230)
        doc.line(margin, y, pageWidth - margin, y)
        y += 1
      } else if (campo.tipo === 'firma') {
        y += 2
        checkY(lineH + 8)
        doc.setTextColor(30, 30, 30)
        doc.setFontSize(isA5 ? 7 : 9)
        doc.setFont('helvetica', 'normal')
        doc.text(campo.etiqueta + ':', margin + 2, y)
        y += lineH + 1
        doc.setDrawColor(180, 180, 180)
        doc.line(margin + 2, y, pageWidth - margin - 2, y)
        y += lineH + 2
      } else if (campo.tipo === 'area') {
        doc.setTextColor(30, 30, 30)
        doc.setFontSize(isA5 ? 7 : 9)
        doc.setFont('helvetica', 'bold')
        const lbLines = doc.splitTextToSize(campo.etiqueta + (campo.requerido ? ' *' : ''), pageWidth - margin * 2)
        doc.text(lbLines, margin + 2, y)
        y += lbLines.length * lineH + 1
        if (campo.placeholder) {
          doc.setFontSize(isA5 ? 6 : 7.5)
          doc.setFont('helvetica', 'italic')
          doc.setTextColor(120, 120, 120)
          const phLines = doc.splitTextToSize(campo.placeholder, pageWidth - margin * 2 - 4)
          doc.text(phLines, margin + 3, y)
          y += phLines.length * (isA5 ? 3 : 4) + 1
        }
        doc.setDrawColor(200, 200, 200)
        const boxH = isA5 ? 12 : 18
        doc.roundedRect(margin, y, pageWidth - margin * 2, boxH, 1, 1)
        y += boxH + 3
      } else if (campo.tipo === 'select') {
        doc.setTextColor(30, 30, 30)
        doc.setFontSize(isA5 ? 7 : 9)
        doc.setFont('helvetica', 'bold')
        const lblLines = doc.splitTextToSize(campo.etiqueta + ':', pageWidth - margin * 2 - 4)
        checkY(lblLines.length * lineH + 2)
        doc.text(lblLines, margin + 2, y)
        y += lblLines.length * lineH + 1
        doc.setFont('helvetica', 'normal')
        for (const op of campo.opciones ?? []) {
          const opLines = doc.splitTextToSize('( ) ' + op, pageWidth - margin * 2 - 8)
          checkY(opLines.length * (isA5 ? 3.5 : 4.5) + 1)
          doc.text(opLines, margin + 6, y)
          y += opLines.length * (isA5 ? 3.5 : 4.5) + 0.5
        }
        y += 2
      } else {
        // texto, fecha, numero
        doc.setTextColor(30, 30, 30)
        doc.setFontSize(isA5 ? 7 : 9)
        doc.setFont('helvetica', 'normal')
        const label = campo.etiqueta + (campo.requerido ? ' *' : '') + ':'
        doc.text(label, margin + 2, y)
        const labelWidth = doc.getTextWidth(label) + 4
        doc.setDrawColor(180, 180, 180)
        doc.line(margin + labelWidth + 2, y, pageWidth - margin - 4, y)
        y += lineH + 1.5
      }
    }
    y += 4
  }

  // Footer
  const totalPages = (doc as any).internal.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    doc.setFontSize(isA5 ? 6 : 7)
    doc.setTextColor(150, 150, 150)
    doc.setFont('helvetica', 'normal')
    doc.text(
      `GRAMA · ${d.titulo} · Pag ${p}/${totalPages}`,
      margin,
      pageHeight - 6
    )
    doc.text(
      `Generado: ${new Date().toLocaleDateString('es-PE')}`,
      pageWidth - margin,
      pageHeight - 6,
      { align: 'right' }
    )
  }

  doc.save(`${d.titulo.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_')}.pdf`)
}

// ── Componente principal ───────────────────────────────────────────────────────
export function DescargableViewerModal({ descargable: d, onClose }: DescargableViewerModalProps) {
  useEscapeKey(onClose)
  const badge = TIPO_BADGE[d.tipo]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,57,65,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#ffffff', boxShadow: '0 24px 64px rgba(4,57,65,0.25)' }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-start gap-4 shrink-0" style={{ background: '#043941' }}>
          <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: '#02d47e20' }}>
            <FileText size={20} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: badge.color + '30', color: badge.color }}>
                  {badge.label}
                </span>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                {d.formato} · {d.paginas} páginas
              </span>
            </div>
            <h2 className="text-base font-extrabold text-white leading-snug">{d.titulo}</h2>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{d.subtitulo}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Subheader: descripción, instrucciones, nota */}
        <div className="px-5 py-3 border-b shrink-0 space-y-2" style={{ background: '#f8fffe', borderColor: '#e3f8fb' }}>
          <p className="text-xs" style={{ color: '#374151' }}>{d.descripcion}</p>
          {d.instrucciones && (
            <div className="flex items-start gap-2 rounded-lg p-2.5" style={{ background: '#e3f8fb' }}>
              <Info size={13} className="shrink-0 mt-0.5" style={{ color: '#045f6c' }} />
              <p className="text-xs" style={{ color: '#043941' }}>{d.instrucciones}</p>
            </div>
          )}
          {d.nota && (
            <div className="flex items-start gap-2 rounded-lg p-2.5" style={{ background: '#fef9c3' }}>
              <AlertTriangle size={13} className="shrink-0 mt-0.5" style={{ color: '#854d0e' }} />
              <p className="text-xs" style={{ color: '#854d0e' }}>{d.nota}</p>
            </div>
          )}
        </div>

        {/* Secciones preview */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckSquare size={13} style={{ color: '#045f6c' }} />
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#045f6c' }}>
              Vista previa del documento — {d.secciones.length} secciones
            </span>
          </div>
          {d.secciones.map((sec, idx) => (
            <SeccionBlock key={sec.id} seccion={sec} index={idx} />
          ))}
        </div>

        {/* Footer con botón descargar */}
        <div className="px-6 py-4 border-t flex items-center justify-between shrink-0"
          style={{ borderColor: '#e3f8fb', background: '#f0faf5' }}>
          <span className="text-xs" style={{ color: '#94a3b8' }}>
            El PDF se genera en tu dispositivo
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="text-xs font-bold px-4 py-2 rounded-lg border"
              style={{ borderColor: '#e3f8fb', color: '#043941', background: '#ffffff' }}
            >
              Cerrar
            </button>
            <button
              onClick={() => generarPDF(d)}
              className="flex items-center gap-2 text-xs font-bold px-5 py-2 rounded-lg text-white"
              style={{ background: '#02d47e' }}
            >
              <Download size={13} />
              Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
