// src/lib/pdfGenerator.ts
// Utilidad para generar PDFs desde datos de descargables

import jsPDF from 'jspdf'
import 'jspdf-autotable'

interface TextOptions {
  fontSize?: number
  fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic'
  color?: string
}

/**
 * Genera un PDF para un descargable
 */
export const generateDescargablePDF = (
  titulo: string,
  subtitulo: string,
  contenido: string,
  filename: string = 'documento.pdf'
) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15

  // Fondo de color
  doc.setFillColor(4, 57, 65) // #043941
  doc.rect(0, 0, pageWidth, 40, 'F')

  // Título
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text(titulo, margin, 20)

  // Subtítulo
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(2, 212, 126) // verde GRAMA
  doc.text(subtitulo, margin, 30)

  // Contenido
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')

  const lines = doc.splitTextToSize(contenido, pageWidth - margin * 2)
  doc.text(lines, margin, 50)

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.text(
    `Generado por GRAMA — ${new Date().toLocaleDateString('es-PE')}`,
    margin,
    pageHeight - 10
  )

  // Descargar
  doc.save(filename)
}

/**
 * Abre un PDF en una nueva pestaña o lo descarga
 */
export const openOrDownloadPDF = (
  dataUrl: string,
  filename: string = 'documento.pdf'
) => {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Genera y descarga un PDF simple
 */
export const downloadSimplePDF = (titulo: string, contenido: string, filename: string) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 15

  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(titulo, margin, 20)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  const lines = doc.splitTextToSize(contenido, pageWidth - margin * 2)
  doc.text(lines, margin, 35)

  doc.save(filename)
}
