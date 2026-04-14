'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, Video, ArrowLeft } from 'lucide-react'
import type { Taller } from '@/domain/taller/entities/Taller'
import type { Bien }   from '@/domain/taller/entities/Bien'

// Helpers de manualesPDF (migrados de src/data/manualesPDF.ts)
function getDriveId(url: string): string | null {
  return url.match(/\/file\/d\/([^/]+)/)?.[1] ?? null
}
function getDriveEmbedUrl(url: string): string {
  const id = getDriveId(url)
  return id ? `https://drive.google.com/file/d/${id}/preview` : ''
}
function getVimeoId(url: string): string | null {
  return url.match(/vimeo\.com\/(\d+)/)?.[1] ?? null
}
function isVimeoUrl(url: string): boolean {
  return url.includes('vimeo.com')
}
function getVideoEmbedUrl(url: string): string {
  if (isVimeoUrl(url)) {
    const id = getVimeoId(url)
    return id ? `https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0` : ''
  }
  return getDriveEmbedUrl(url)
}
function getVideoSourceLabel(url: string): string {
  return isVimeoUrl(url) ? 'Abrir en Vimeo' : 'Abrir en Google Drive'
}

// Importación dinámica de manuales (server-safe ya que Next.js no incluye esto en cliente)
// En producción esto se importaría como Server Action o Route Handler
// Por ahora, las URLs se pasan como prop desde el Server Component padre

type TabId = 'manual' | 'video'

interface BienDetalleClientProps {
  taller:      Taller
  bien:        Bien
  relacionados: Bien[]
  manualUrl?:  string
  videoUrl?:   string
}

const ZONA_SHORT: Record<string, string> = {
  'ZONA DE INNOVACIÓN':                      'INNOVACIÓN',
  'ZONA DE INVESTIGACIÓN, GESTIÓN Y DISEÑO': 'INVESTIGACIÓN',
  'DEPÓSITO / ALMACÉN / SEGURIDAD':          'DEPÓSITO',
}

export function BienDetalleClient({
  taller, bien, relacionados, manualUrl, videoUrl,
}: BienDetalleClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>('manual')

  const base = `/taller/${taller.slug}/repositorio`
  const zonaCorta = ZONA_SHORT[bien.zona] ?? bien.zona

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      {/* Breadcrumb */}
      <Link
        href={base}
        className="inline-flex items-center gap-1.5 text-sm mb-6 transition-opacity hover:opacity-70"
        style={{ color: 'var(--color-grama-oscuro)' }}
      >
        <ArrowLeft size={15} /> Repositorio
      </Link>

      <div className="grid lg:grid-cols-[1fr,340px] gap-6">
        {/* Panel principal */}
        <div>
          {/* Header */}
          <div className="rounded-2xl p-6 mb-4" style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ background: 'var(--color-grama-claro)', color: 'var(--color-grama-verde)' }}>
                {zonaCorta}
              </span>
              {bien.tipo && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ background: '#f3f4f6', color: '#374151' }}>
                  {bien.tipo}
                </span>
              )}
            </div>
            <h1 className="font-extrabold" style={{ fontSize: 'var(--text-h2)', color: 'var(--color-grama-oscuro)' }}>
              {bien.nombre}
            </h1>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-3 text-xs">
              {bien.codigoEntidad && (
                <>
                  <span style={{ color: 'var(--color-muted-foreground)' }}>Código entidad</span>
                  <span className="font-semibold" style={{ color: 'var(--color-grama-oscuro)' }}>{bien.codigoEntidad}</span>
                </>
              )}
              {bien.codigoInterno && (
                <>
                  <span style={{ color: 'var(--color-muted-foreground)' }}>Código interno</span>
                  <span className="font-semibold" style={{ color: 'var(--color-grama-oscuro)' }}>{bien.codigoInterno}</span>
                </>
              )}
              <span style={{ color: 'var(--color-muted-foreground)' }}>Zona</span>
              <span className="font-semibold" style={{ color: 'var(--color-grama-oscuro)' }}>{bien.zona}</span>
              {bien.tipo && (
                <>
                  <span style={{ color: 'var(--color-muted-foreground)' }}>Tipo</span>
                  <span className="font-semibold" style={{ color: 'var(--color-grama-oscuro)' }}>{bien.tipo}</span>
                </>
              )}
            </div>
          </div>

          {/* Tabs Manual / Video */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            <div className="flex border-b" style={{ borderColor: 'var(--color-border)', background: '#f8fffe' }}>
              {([
                { id: 'manual' as TabId, label: 'Manual de uso y mantenimiento', icon: FileText },
                { id: 'video'  as TabId, label: 'Video operatividad',            icon: Video   },
              ]).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-5 py-3.5 text-xs font-semibold border-b-2 transition-all"
                  style={{
                    borderBottomColor: activeTab === tab.id ? 'var(--color-grama-verde)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--color-grama-verde)' : 'var(--color-muted-foreground)',
                  }}
                >
                  <tab.icon size={14} /> {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6" style={{ background: '#ffffff' }}>
              {activeTab === 'manual' ? (
                manualUrl ? (
                  <div className="flex flex-col gap-3">
                    <div className="w-full aspect-video rounded-xl overflow-hidden" style={{ background: 'var(--color-grama-oscuro)' }}>
                      <iframe
                        src={getDriveEmbedUrl(manualUrl)}
                        className="w-full h-full"
                        allowFullScreen
                        title={`Manual — ${bien.nombre}`}
                      />
                    </div>
                    <a
                      href={manualUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold"
                      style={{ background: '#f0faf5', color: 'var(--color-grama-oscuro)' }}
                    >
                      <FileText size={13} /> Descargar PDF
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-10" style={{ color: 'var(--color-muted-foreground)' }}>
                    <FileText size={36} className="opacity-20 mb-3" />
                    <p className="text-sm">Manual en preparación</p>
                  </div>
                )
              ) : (
                videoUrl ? (
                  <div className="flex flex-col gap-3">
                    <div className="w-full aspect-video rounded-xl overflow-hidden" style={{ background: 'var(--color-grama-oscuro)' }}>
                      <iframe
                        src={getVideoEmbedUrl(videoUrl)}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={`Video operatividad — ${bien.nombre}`}
                      />
                    </div>
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold"
                      style={{ background: '#f0faf5', color: 'var(--color-grama-oscuro)' }}
                    >
                      <Video size={13} /> {getVideoSourceLabel(videoUrl)}
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-10" style={{ color: 'var(--color-muted-foreground)' }}>
                    <Video size={36} className="opacity-20 mb-3" />
                    <p className="text-sm">Video en preparación</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Uso pedagógico */}
          {bien.usoPedagogico && (
            <div className="mt-4 rounded-2xl p-6" style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}>
              <h2 className="font-bold text-sm mb-3" style={{ color: 'var(--color-grama-oscuro)' }}>
                Uso pedagógico
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-grama-oscuro)' }}>
                {bien.usoPedagogico}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar derecho */}
        <div className="space-y-4">
          {/* Descripción / Info técnica */}
          {bien.descripcion && (
            <div className="rounded-2xl p-5" style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}>
              <h3 className="font-bold text-xs mb-2" style={{ color: 'var(--color-grama-oscuro)' }}>
                Información técnica
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
                {bien.descripcion}
              </p>
            </div>
          )}

          {/* Bienes relacionados */}
          {relacionados.length > 0 && (
            <div className="rounded-2xl p-5" style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}>
              <h3 className="font-bold text-xs mb-3" style={{ color: 'var(--color-grama-oscuro)' }}>
                Bienes relacionados
              </h3>
              <div className="space-y-2">
                {relacionados.map(r => (
                  <Link
                    key={r.n}
                    href={`${base}/bien/${r.n}`}
                    className="flex items-center gap-2 p-2 rounded-xl transition-colors hover:bg-gray-50"
                  >
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                      style={{ background: 'var(--color-grama-claro)', color: 'var(--color-grama-verde)' }}
                    >
                      {r.tipo?.[0] ?? '#'}
                    </span>
                    <span className="text-xs font-medium leading-snug" style={{ color: 'var(--color-grama-oscuro)' }}>
                      {r.nombre}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
