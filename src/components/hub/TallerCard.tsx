// src/components/hub/TallerCard.tsx
import { useNavigate } from 'react-router-dom'
import {
  Car, Scissors, ChefHat, Hammer, Monitor, Cpu,
  UtensilsCrossed, Zap, Wrench, Package, ArrowUpRight
} from 'lucide-react'
import { useState } from 'react'
import type { TallerConfig } from '@/data/talleresConfig'
import bienesData from '@/data/talleres-bienes.json'

const ICON_MAP: Record<string, React.ElementType> = {
  Car, Scissors, ChefHat, Hammer, Monitor, Cpu,
  UtensilsCrossed, Zap, Wrench
}

interface TallerCardProps {
  taller: TallerConfig
  index?: number
}

const TALLER_ACCENTS: Record<string, string> = {
  'mecanica-automotriz':  '#3b82f6',
  'industria-vestido':    '#ec4899',
  'cocina-reposteria':    '#f97316',
  'ebanisteria':          '#b8975a',
  'comunicaciones':       '#a78bfa',
  'computacion':          '#22d3ee',
  'agropecuaria':         '#86efac',
  'electricidad':         '#fde047',
  'construccion':         '#94a3b8',
}

export function TallerCard({ taller, index = 0 }: TallerCardProps) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const Icon = ICON_MAP[taller.icon] ?? Package
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tallerData = (bienesData as any)[taller.slug]
  const totalBienes: number = tallerData?.totalBienes ?? 0
  const accent = TALLER_ACCENTS[taller.slug] ?? '#02d47e'
  const delay = `${index * 0.06}s`

  return (
    <button
      onClick={() => navigate(`/taller/${taller.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group w-full text-left relative overflow-hidden rounded-2xl animate-fade-in-up"
      style={{
        minHeight: 290,
        border: `1.5px solid ${hovered ? `${accent}55` : 'rgba(255,255,255,0.07)'}`,
        transform: hovered ? 'translateY(-7px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 52px rgba(4,14,20,0.5), 0 0 0 1px ${accent}30`
          : '0 4px 16px rgba(4,14,20,0.3)',
        transition: 'transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s cubic-bezier(0.22,1,0.36,1), border-color 0.2s',
        animationDelay: delay,
      }}
    >
      {/* ── Foto de fondo ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${taller.imagen})`,
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/* ── Overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(4,10,18,0.96) 0%, rgba(4,10,18,0.80) 38%, rgba(4,10,18,0.28) 68%, rgba(4,10,18,0.06) 100%)',
        }}
      />

      {/* ── Glow de acento (hover) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 110%, ${accent}28 0%, transparent 58%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* ── Número watermark ── */}
      <div
        className="absolute top-1 right-3 font-extrabold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(4rem, 7vw, 6rem)',
          lineHeight: 1,
          color: 'rgba(255,255,255,0.055)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {String(taller.numero).padStart(2, '0')}
      </div>

      {/* ── Contenido ── */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">

        {/* Top */}
        <div className="flex items-start justify-between">
          <span
            className="text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-[0.1em]"
            style={{
              background: `${accent}1a`,
              color: accent,
              border: `1px solid ${accent}38`,
            }}
          >
            T{String(taller.numero).padStart(2, '0')}
          </span>
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.09)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.13)',
              transform: hovered ? 'scale(1.12) rotate(-5deg)' : 'scale(1) rotate(0deg)',
              transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Icon size={17} style={{ color: accent }} />
          </div>
        </div>

        {/* Bottom */}
        <div>
          {/* Línea acento */}
          <div
            className="h-0.5 rounded-full mb-3"
            style={{
              background: accent,
              width: hovered ? 52 : 24,
              transition: 'width 0.38s cubic-bezier(0.22,1,0.36,1)',
            }}
          />

          <h3
            className="font-extrabold text-white leading-tight mb-2"
            style={{ fontSize: 'clamp(0.88rem, 1.5vw, 1.05rem)' }}
          >
            {taller.nombre}
          </h3>

          <p
            className="text-xs leading-relaxed mb-3 line-clamp-2"
            style={{
              color: hovered ? 'rgba(255,255,255,0.62)' : 'rgba(255,255,255,0.42)',
              transition: 'color 0.2s',
            }}
          >
            {taller.descripcion}
          </p>

          <div className="flex items-center justify-between">
            {totalBienes > 0 && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(2,212,126,0.12)',
                  color: '#02d47e',
                  border: '1px solid rgba(2,212,126,0.18)',
                }}
              >
                {totalBienes} bienes
              </span>
            )}
            <div
              className="flex items-center gap-1 text-xs font-bold ml-auto"
              style={{
                color: accent,
                transform: hovered ? 'translateX(2px)' : 'translateX(0)',
                transition: 'transform 0.2s',
              }}
            >
              Entrar
              <ArrowUpRight size={12} />
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
