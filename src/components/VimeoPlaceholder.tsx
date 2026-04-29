import { Video } from 'lucide-react'

interface VimeoPlaceholderProps {
  className?: string
  label?: string
  /** Vimeo video ID. When provided, renders the real embed instead of the placeholder. */
  videoId?: string
  /** Hash for private Vimeo videos (the 'h' param) */
  vimeoHash?: string
}

export function VimeoPlaceholder({
  className = '',
  label = 'La transmisión en vivo se mostrará aquí',
  videoId,
  vimeoHash,
}: VimeoPlaceholderProps) {
  if (videoId) {
    const params = new URLSearchParams({
      title: '0',
      byline: '0',
      portrait: '0',
      badge: '0',
      autopause: '0',
      ...(vimeoHash ? { h: vimeoHash } : {}),
    })
    return (
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?${params}`}
        className={`aspect-video w-full border-0 rounded-xl ${className}`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={label}
      />
    )
  }

  return (
    <div
      className={`aspect-video w-full rounded-xl flex flex-col items-center justify-center gap-3 ${className}`}
      style={{ background: '#043941' }}
    >
      <div
        className="h-16 w-16 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(2,212,126,0.12)' }}
      >
        <Video className="h-8 w-8" style={{ color: '#02d47e' }} />
      </div>
      <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {label}
      </p>
    </div>
  )
}
