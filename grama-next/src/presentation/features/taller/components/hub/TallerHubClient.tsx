'use client'

import Link from 'next/link'
import { BookOpen, Package, ArrowRight } from 'lucide-react'
import { ProgressRing } from '@/presentation/shared/ui/ProgressRing'
import { useProgress }  from '@/presentation/providers/ProgressProvider'
import type { Taller }  from '@/domain/taller/entities/Taller'

interface TallerHubClientProps {
  taller:      Taller
  totalBienes: number
  zonas:       string[]
}

export function TallerHubClient({ taller, totalBienes, zonas }: TallerHubClientProps) {
  const { getTallerProgreso } = useProgress()
  const progreso = getTallerProgreso([]) // IDs reales se integran en Fase 6 completa

  const base = `/taller/${taller.slug}`

  return (
    <div>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${taller.color} 0%, var(--color-grama-oscuro) 100%)`,
          minHeight: '260px',
        }}
      >
        <div className="absolute inset-0 grama-pattern opacity-30" />
        <div className="relative z-10 px-6 md:px-10 py-10 flex items-start justify-between">
          <div>
            <p className="overline-label animate-fade-in-up" style={{ color: 'rgba(255,255,255,0.6)' }}>
              T0{taller.numero} · EBANISTERÍA
            </p>
            <h1
              className="font-extrabold mt-3 animate-fade-in-up stagger-1"
              style={{ fontSize: 'var(--text-h1)', color: '#ffffff' }}
            >
              {taller.nombre}
            </h1>
            <p
              className="mt-3 max-w-lg text-sm leading-relaxed animate-fade-in-up stagger-2"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {taller.descripcion}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-5 animate-fade-in-up stagger-3">
              {[
                { label: '7 Módulos de formación' },
                { label: '150 Horas híbrida' },
                { label: 'Certificación Inroprin' },
              ].map(b => (
                <span
                  key={b.label}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Progreso ring */}
          <div className="hidden md:flex flex-col items-center gap-1 animate-fade-in-up stagger-4">
            <ProgressRing percentage={progreso.porcentaje} size={100} dark />
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Tu progreso</p>
          </div>
        </div>
      </div>

      {/* Quick access cards */}
      <div className="px-6 md:px-10 py-8 grid md:grid-cols-3 gap-4">
        {/* Ruta de aprendizaje */}
        <Link
          href={`${base}/ruta`}
          className="card-lift rounded-2xl p-6 flex flex-col gap-3 animate-fade-in-up stagger-1"
          style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--color-grama-claro)' }}
          >
            <BookOpen size={20} style={{ color: 'var(--color-grama-verde)' }} />
          </div>
          <div>
            <h3 className="font-bold text-sm" style={{ color: 'var(--color-grama-oscuro)' }}>
              Ruta de Aprendizaje
            </h3>
            <p className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
              7 módulos · M0 al M6
            </p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div className="h-1.5 flex-1 rounded-full mr-3" style={{ background: 'var(--color-border)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progreso.porcentaje}%`,
                  background: 'var(--color-grama-verde)',
                }}
              />
            </div>
            <span className="text-xs font-bold" style={{ color: 'var(--color-grama-verde)' }}>
              {progreso.porcentaje}%
            </span>
          </div>
        </Link>

        {/* Repositorio */}
        <Link
          href={`${base}/repositorio`}
          className="card-lift rounded-2xl p-6 flex flex-col gap-3 animate-fade-in-up stagger-2"
          style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: '#ede9fe' }}
          >
            <Package size={20} style={{ color: '#7c3aed' }} />
          </div>
          <div>
            <h3 className="font-bold text-sm" style={{ color: 'var(--color-grama-oscuro)' }}>
              Repositorio
            </h3>
            <p className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
              {totalBienes} bienes · {zonas.length} zonas
            </p>
          </div>
          <div className="flex items-center gap-1 mt-auto text-xs font-semibold" style={{ color: '#7c3aed' }}>
            Ver inventario <ArrowRight size={13} />
          </div>
        </Link>

        {/* Progreso detalle */}
        <div
          className="rounded-2xl p-6 animate-fade-in-up stagger-3"
          style={{ background: 'var(--color-grama-oscuro)', border: '1px solid var(--color-dk-border)' }}
        >
          <p className="overline-label" style={{ color: 'var(--color-grama-mint)', fontSize: '10px' }}>
            TU PROGRESO
          </p>
          <div className="mt-4 flex items-center gap-4">
            <ProgressRing percentage={progreso.porcentaje} size={72} dark />
            <div>
              <p className="font-bold text-sm" style={{ color: '#ffffff' }}>
                {progreso.completados} / {progreso.total}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-dk-muted)' }}>
                actividades completadas
              </p>
              <Link
                href={`${base}/ruta`}
                className="text-xs font-bold mt-2 inline-flex items-center gap-1"
                style={{ color: 'var(--color-grama-mint)' }}
              >
                Continuar <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
