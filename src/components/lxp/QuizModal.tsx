import { X } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { QuizBlock } from './QuizBlock'
import type { PreguntaQuiz } from '@/data/modulosLXP'

interface QuizModalProps {
  contenidoId: string
  titulo: string
  preguntas: PreguntaQuiz[]
  puntajeMinimo: number
  bloqueaSiguiente?: boolean
  onClose: () => void
  onAprobado?: () => void
  onReprobado?: () => void
}

export function QuizModal({
  contenidoId,
  titulo,
  preguntas,
  puntajeMinimo,
  bloqueaSiguiente,
  onClose,
  onAprobado,
  onReprobado,
}: QuizModalProps) {
  useEscapeKey(onClose)

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(4,57,65,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-2xl my-8 rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#ffffff' }}
      >
        {/* Barra superior con botón cerrar */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ background: '#043941' }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#02d47e' }}>
            {bloqueaSiguiente ? '⚠ Evaluación requerida' : 'Evaluación de práctica'}
          </span>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-all hover:bg-white/10"
            aria-label="Cerrar quiz"
          >
            <X size={18} color="white" />
          </button>
        </div>

        {/* QuizBlock reutilizado */}
        <QuizBlock
          contenidoId={contenidoId}
          titulo={titulo}
          preguntas={preguntas}
          puntajeMinimo={puntajeMinimo}
          bloqueaSiguiente={bloqueaSiguiente}
          onAprobado={() => { onAprobado?.(); onClose() }}
          onReprobado={onReprobado}
        />
      </div>
    </div>
  )
}
