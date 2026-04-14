'use client'

import Link from 'next/link'
import { useProgress } from '@/presentation/shared/hooks/useProgress'
import { ProgressRing } from '@/presentation/shared/ui/ProgressRing'
import type { Taller } from '@/domain/taller/entities/Taller'
import type { Modulo } from '@/domain/modulo/entities/Modulo'
import type { ModuloId } from '@/domain/shared/types'

const FASE_COLOR: Record<string, string> = {
  diagnostico:    '#a78bfa',
  orientacion:    '#60a5fa',
  apropiacion:    '#34d399',
  aplicacion:     '#fb923c',
  proyecto:       '#f472b6',
  acompanamiento: '#facc15',
}

function toModuloId(numero: number): ModuloId {
  return `M${numero}` as ModuloId
}

function getContenidoIds(modulo: Modulo): string[] {
  return modulo.subSecciones.flatMap(ss => ss.contenidos.map(c => c.id))
}

interface RutaClientProps {
  taller:  Taller
  modulos: Modulo[]
}

export function RutaClient({ taller, modulos }: RutaClientProps) {
  const { getModuloProgreso, getEstadoModulo } = useProgress()

  // Aggregate progress across all modules
  const allIds = modulos.flatMap(getContenidoIds)
  const totalProgress = allIds.length > 0
    ? modulos.reduce((sum, m) => {
        const ids = getContenidoIds(m)
        return sum + getModuloProgreso(toModuloId(m.numero), ids).porcentaje
      }, 0) / modulos.length
    : 0

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      {/* Header */}
      <p className="overline-label" style={{ color: 'var(--color-grama-verde)' }}>RUTA DE APRENDIZAJE</p>
      <div className="flex items-start justify-between gap-4 mt-2 mb-8">
        <div>
          <h1 className="font-extrabold" style={{ fontSize: 'var(--text-h1)', color: 'var(--color-grama-oscuro)' }}>
            {taller.nombre}
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            {modulos.length} módulos · M0 al M{modulos.length - 1}
          </p>
        </div>
        <ProgressRing percentage={Math.round(totalProgress)} size={56} strokeWidth={5} />
      </div>

      {/* Module cards */}
      <div className="space-y-3">
        {modulos.map((modulo, i) => {
          const contenidoIds = getContenidoIds(modulo)
          const moduloId     = toModuloId(modulo.numero)
          const progresoObj  = getModuloProgreso(moduloId, contenidoIds)
          const progreso     = progresoObj.porcentaje
          const prevCompletado = i === 0
            ? true
            : getModuloProgreso(toModuloId(modulos[i - 1].numero), getContenidoIds(modulos[i - 1])).porcentaje === 100
          const estado       = getEstadoModulo(moduloId, contenidoIds, prevCompletado)
          const faseColor    = FASE_COLOR[modulo.fase] ?? 'var(--color-grama-verde)'
          const isLocked     = estado === 'bloqueado'
          const totalContenidos = contenidoIds.length

          return (
            <Link
              key={modulo.id}
              href={isLocked ? '#' : `/taller/${taller.slug}/ruta/modulo/${modulo.numero}`}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                isLocked ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:shadow-md'
              }`}
              style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}
              aria-disabled={isLocked}
            >
              {/* Number badge */}
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold flex-shrink-0"
                style={{
                  background: estado === 'completado' ? 'var(--color-grama-verde)' : faseColor + '20',
                  color:      estado === 'completado' ? '#ffffff' : faseColor,
                }}
              >
                M{modulo.numero}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold" style={{ color: 'var(--color-grama-oscuro)' }}>
                    {modulo.nombre}
                  </p>
                  <span
                    className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase"
                    style={{ background: faseColor + '20', color: faseColor }}
                  >
                    {modulo.fase}
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                  {modulo.horasTotal}h · {totalContenidos} actividades
                </p>

                {/* Progress bar */}
                <div className="mt-2 h-1 rounded-full" style={{ background: 'var(--color-border)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${progreso}%`, background: 'var(--color-grama-verde)' }}
                  />
                </div>
              </div>

              {/* % */}
              <span
                className="text-sm font-bold flex-shrink-0"
                style={{ color: progreso > 0 ? 'var(--color-grama-verde)' : 'var(--color-muted-foreground)' }}
              >
                {progreso}%
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
