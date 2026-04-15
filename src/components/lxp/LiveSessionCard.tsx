// src/components/lxp/LiveSessionCard.tsx
import { Calendar, Clock, User, Video, ArrowRight } from 'lucide-react'

interface LiveSessionCardProps {
  titulo: string
  moduloNombre: string
  fecha: string            // ISO string
  duracionMin: number
  formador: string
  plataforma: string
  urlAcceso?: string
  compact?: boolean
}

function formatFecha(isoString: string): string {
  const d = new Date(isoString)
  return d.toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatHora(isoString: string): string {
  const d = new Date(isoString)
  return d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
}

function diasRestantes(isoString: string): number {
  const ahora = new Date()
  const fecha = new Date(isoString)
  return Math.max(0, Math.ceil((fecha.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24)))
}

export function LiveSessionCard({
  titulo,
  moduloNombre,
  fecha,
  duracionMin,
  formador,
  plataforma,
  urlAcceso,
  compact = false,
}: LiveSessionCardProps) {
  const dias = diasRestantes(fecha)

  if (compact) {
    return (
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #032e34 0%, #043941 100%)',
          boxShadow: '0 4px 20px rgba(4,57,65,0.18)',
        }}
      >
        {/* Top bar con live indicator */}
        <div className="px-4 pt-4 pb-3 flex items-center gap-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full animate-blink shrink-0" style={{ background: '#ef4444' }} />
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'rgba(239,68,68,0.85)' }}>
              En vivo próximamente
            </span>
          </span>
          <span
            className="ml-auto text-[11px] font-extrabold px-2.5 py-0.5 rounded-full"
            style={{ background: 'rgba(2,212,126,0.15)', color: '#02d47e' }}
          >
            {dias === 0 ? 'Hoy' : `${dias}d`}
          </span>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-start gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(2,212,126,0.15)', border: '1px solid rgba(2,212,126,0.2)' }}
            >
              <Video size={17} color="#02d47e" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold mb-0.5" style={{ color: 'rgba(2,212,126,0.75)' }}>
                {moduloNombre}
              </p>
              <p className="text-sm font-bold text-white leading-snug">
                {titulo}
              </p>
              <p className="text-[11px] mt-1.5 flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <Clock size={10} />
                {formatHora(fecha)} · {duracionMin} min
              </p>
            </div>
          </div>

          {urlAcceso && (
            <a
              href={urlAcceso}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 hover:scale-[1.01]"
              style={{ background: 'linear-gradient(90deg, #02d47e, #00c16e)' }}
            >
              Unirse a la sesión
              <ArrowRight size={12} />
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: '#e3f8fb' }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 grama-pattern"
        style={{ background: '#043941' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-blink" />
            Próxima sesión en vivo
          </span>
        </div>
        <p className="text-xs font-medium mb-1" style={{ color: '#02d47e' }}>
          {moduloNombre}
        </p>
        <h3 className="text-lg font-bold text-white leading-tight">{titulo}</h3>
      </div>

      {/* Details */}
      <div className="p-5 space-y-3" style={{ background: '#ffffff' }}>
        <div className="flex items-center gap-2 text-sm" style={{ color: '#043941' }}>
          <Calendar size={15} style={{ color: '#045f6c' }} />
          <span className="capitalize">{formatFecha(fecha)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: '#043941' }}>
          <Clock size={15} style={{ color: '#045f6c' }} />
          <span>{formatHora(fecha)} · {duracionMin} minutos</span>
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: '#043941' }}>
          <User size={15} style={{ color: '#045f6c' }} />
          <span>{formador}</span>
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: '#043941' }}>
          <Video size={15} style={{ color: '#045f6c' }} />
          <span>{plataforma}</span>
        </div>

        {/* Countdown */}
        <div
          className="rounded-lg px-4 py-3 text-center"
          style={{ background: '#e3f8fb' }}
        >
          <p className="text-2xl font-extrabold" style={{ color: '#043941' }}>
            {dias}
          </p>
          <p className="text-xs font-medium" style={{ color: '#045f6c' }}>
            {dias === 1 ? 'día restante' : 'días restantes'}
          </p>
        </div>

        {urlAcceso && (
          <a
            href={urlAcceso}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#02d47e' }}
          >
            Unirse a la sesión
            <ArrowRight size={15} />
          </a>
        )}
      </div>
    </div>
  )
}
