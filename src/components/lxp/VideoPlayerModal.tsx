// src/components/lxp/VideoPlayerModal.tsx
import { X, Video, Clock, ExternalLink } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'

interface VideoPlayerModalProps {
  titulo: string
  descripcion?: string
  duracionMin?: number
  urlVideo: string
  onClose: () => void
  onComplete?: () => void
}

function getDriveEmbedUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/]+)/)
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`
  return url
}

export function VideoPlayerModal({
  titulo,
  descripcion,
  duracionMin,
  urlVideo,
  onClose,
  onComplete,
}: VideoPlayerModalProps) {
  useEscapeKey(onClose)

  const embedUrl = getDriveEmbedUrl(urlVideo)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,57,65,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#0d1f24', boxShadow: '0 32px 80px rgba(2,212,126,0.15)' }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-start gap-3 shrink-0"
          style={{ background: '#043941', borderBottom: '1px solid rgba(2,212,126,0.2)' }}
        >
          <div
            className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: 'rgba(2,212,126,0.15)' }}
          >
            <Video size={17} style={{ color: '#02d47e' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#02d47e' }}>
              Video
            </p>
            <h2 className="text-sm font-extrabold text-white leading-snug">{titulo}</h2>
            {(descripcion || duracionMin) && (
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                {descripcion && (
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {descripcion}
                  </p>
                )}
                {duracionMin && (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: 'rgba(2,212,126,0.15)', color: '#02d47e' }}
                  >
                    <Clock size={10} />
                    {duracionMin} min
                  </span>
                )}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            <X size={15} />
          </button>
        </div>

        {/* Player */}
        <div className="w-full" style={{ aspectRatio: '16/9', background: '#000' }}>
          <iframe
            src={embedUrl}
            title={titulo}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3 flex items-center justify-between gap-3 shrink-0"
          style={{ background: '#043941', borderTop: '1px solid rgba(2,212,126,0.15)' }}
        >
          <a
            href={urlVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#02d47e')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
          >
            <ExternalLink size={12} />
            Abrir en Drive
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-xs px-4 py-2 rounded-lg font-semibold transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              Cerrar
            </button>
            {onComplete && (
              <button
                onClick={() => { onComplete(); onClose() }}
                className="text-xs px-4 py-2 rounded-lg font-bold text-white transition-colors"
                style={{ background: '#02d47e' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#00b86a')}
                onMouseLeave={e => (e.currentTarget.style.background = '#02d47e')}
              >
                ✓ Marcar completado
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
