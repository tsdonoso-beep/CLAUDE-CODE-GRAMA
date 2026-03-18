// src/components/hub/TallerCard.tsx
import { useNavigate } from 'react-router-dom'
import {
  Car, Scissors, ChefHat, Hammer, Monitor, Cpu,
  UtensilsCrossed, Zap, Wrench, Package
} from 'lucide-react'
import type { TallerConfig } from '@/data/talleresConfig'
import bienesData from '@/data/talleres-bienes.json'

const ICON_MAP: Record<string, React.ElementType> = {
  Car, Scissors, ChefHat, Hammer, Monitor, Cpu,
  UtensilsCrossed, Zap, Wrench
}

interface TallerCardProps {
  taller: TallerConfig
}

export function TallerCard({ taller }: TallerCardProps) {
  const navigate = useNavigate()
  const Icon = ICON_MAP[taller.icon] ?? Package
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tallerData = (bienesData as any)[taller.slug]
  const totalBienes: number = tallerData?.totalBienes ?? 0

  return (
    <button
      onClick={() => navigate(`/taller/${taller.slug}`)}
      className="group w-full text-left rounded-2xl p-5 border-2 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: '#052e35',
        borderColor: '#045f6c',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#02d47e'
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 0 2px rgba(2,212,126,0.2)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#045f6c'
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
      }}
    >
      {/* Top: badge número + ícono */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-xs font-extrabold px-2.5 py-1 rounded-full"
          style={{ background: '#043941', color: '#02d47e' }}
        >
          T{taller.numero}
        </span>
        <div
          className="h-11 w-11 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
          style={{ background: 'rgba(2,212,126,0.12)' }}
        >
          <Icon size={22} style={{ color: '#02d47e' }} />
        </div>
      </div>

      {/* Nombre */}
      <h3 className="font-bold text-base text-white leading-tight mb-1.5">
        {taller.nombre}
      </h3>

      {/* Descripción */}
      <p
        className="text-xs leading-relaxed mb-4 line-clamp-2"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        {taller.descripcion}
      </p>

      {/* Footer: bienes + flecha */}
      <div className="flex items-center justify-between">
        {totalBienes > 0 && (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(2,212,126,0.12)', color: '#02d47e' }}
          >
            {totalBienes} bienes
          </span>
        )}
        <span
          className="text-xs font-semibold ml-auto transition-all group-hover:translate-x-1"
          style={{ color: '#02d47e' }}
        >
          Acceder →
        </span>
      </div>
    </button>
  )
}
