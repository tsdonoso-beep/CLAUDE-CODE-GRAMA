'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, BookOpen, Video, FileText, Zap, Users,
  Download, CheckCircle2, Clock, ChevronDown, ChevronRight, Lock,
} from 'lucide-react'
import type { Taller } from '@/domain/taller/entities/Taller'
import type { Modulo, SubSeccion, Contenido } from '@/domain/modulo/entities/Modulo'
import type { ModuloId } from '@/domain/shared/types'
import { useProgress } from '@/presentation/shared/hooks/useProgress'
import { ContenidoBadge } from '@/presentation/shared/ui/ContenidoBadge'

// ── Icon map by content type ──────────────────────────────────────────────────
type IconComp = React.FC<{ size?: number; className?: string }>
const TIPO_ICON: Record<string, IconComp> = {
  VIDEO:             Video,
  PDF:               FileText,
  INTERACTIVO:       Zap,
  QUIZ:              CheckCircle2,
  EN_VIVO:           Users,
  DESCARGABLE:       Download,
  ACTIVIDAD_PRACTICA: BookOpen,
}

// ── Fase color map ────────────────────────────────────────────────────────────
const FASE_COLOR: Record<string, string> = {
  diagnostico:    '#a78bfa',
  orientacion:    '#60a5fa',
  apropiacion:    '#34d399',
  aplicacion:     '#fb923c',
  proyecto:       '#f472b6',
  acompanamiento: '#facc15',
}

// ── Helper: numeric index → ModuloId ─────────────────────────────────────────
function toModuloId(numero: number): ModuloId {
  return `M${numero}` as ModuloId
}

// ── Helper: flatten content IDs from a module ────────────────────────────────
function getContenidoIds(modulo: Modulo): string[] {
  return modulo.subSecciones.flatMap(ss => ss.contenidos.map(c => c.id))
}

// ── Contenido row ─────────────────────────────────────────────────────────────
function ContenidoRow({
  contenido,
  locked,
}: {
  contenido: Contenido
  locked: boolean
}) {
  const { getContenidoEstado, markCompleted, markInProgress } = useProgress()
  const estado = getContenidoEstado(contenido.id)
  const Icon = TIPO_ICON[contenido.tipo] ?? BookOpen

  function handleClick() {
    if (locked) return
    if (estado === 'no_iniciado') markInProgress(contenido.id)
  }

  function handleComplete(e: React.MouseEvent) {
    e.stopPropagation()
    if (locked) return
    markCompleted(contenido.id)
  }

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
        locked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
      }`}
    >
      {locked ? (
        <Lock size={14} className="flex-shrink-0 text-gray-400" />
      ) : (
        <button
          onClick={handleComplete}
          className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
          style={{
            borderColor: estado === 'completado' ? 'var(--color-grama-verde)' : 'var(--color-border)',
            background:  estado === 'completado' ? 'var(--color-grama-verde)' : 'transparent',
          }}
        >
          {estado === 'completado' && <CheckCircle2 size={12} className="text-white" />}
        </button>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <ContenidoBadge tipo={contenido.tipo} />
          {contenido.bloqueaSiguiente && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#fee2e2', color: '#dc2626' }}>
              REQUERIDO
            </span>
          )}
        </div>
        <p className="text-xs font-medium leading-snug" style={{ color: 'var(--color-grama-oscuro)' }}>
          {contenido.titulo}
        </p>
        {contenido.descripcion && (
          <p className="text-[11px] mt-0.5 line-clamp-1" style={{ color: 'var(--color-muted-foreground)' }}>
            {contenido.descripcion}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {(contenido.duracionMin ?? 0) > 0 && (
          <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--color-muted-foreground)' }}>
            <Clock size={10} />
            {contenido.duracionMin}min
          </span>
        )}
        <Icon size={13} className="opacity-40" />
      </div>
    </div>
  )
}

// ── SubSeccion accordion ──────────────────────────────────────────────────────
function SubSeccionCard({
  subseccion,
  defaultOpen,
}: {
  subseccion: SubSeccion
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const { getContenidoEstado } = useProgress()

  const totalC     = subseccion.contenidos.length
  const completedC = subseccion.contenidos.filter(c => getContenidoEstado(c.id) === 'completado').length

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-gray-50"
        style={{ background: open ? '#f8fffe' : '#ffffff' }}
      >
        <span
          className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: subseccion.colorAccent ?? 'var(--color-grama-claro)', color: 'var(--color-grama-oscuro)' }}
        >
          {subseccion.numero}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold" style={{ color: 'var(--color-grama-oscuro)' }}>
              {subseccion.titulo}
            </p>
            {subseccion.phaseBadge && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'var(--color-grama-claro)', color: 'var(--color-grama-verde)' }}>
                {subseccion.phaseBadge}
              </span>
            )}
          </div>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-muted-foreground)' }}>
            {completedC}/{totalC} completados
          </p>
        </div>

        {/* Mini progress bar */}
        <div className="w-16 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--color-border)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${totalC > 0 ? (completedC / totalC) * 100 : 0}%`, background: 'var(--color-grama-verde)' }}
          />
        </div>

        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>

      {open && (
        <div
          className="divide-y"
          style={{ borderTop: '1px solid var(--color-border)', borderColor: 'var(--color-border)' }}
        >
          {subseccion.contenidos.map(c => (
            <ContenidoRow key={c.id} contenido={c} locked={false} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Client Component ─────────────────────────────────────────────────────
interface ModuloDetalleClientProps {
  taller:     Taller
  modulo:     Modulo
  allModulos: Modulo[]
}

export function ModuloDetalleClient({ taller, modulo, allModulos }: ModuloDetalleClientProps) {
  const { getModuloProgreso } = useProgress()

  const moduloId      = toModuloId(modulo.numero)
  const contenidoIds  = getContenidoIds(modulo)
  const progresoObj   = getModuloProgreso(moduloId, contenidoIds)
  const progreso      = progresoObj.porcentaje
  const faseColor     = FASE_COLOR[modulo.fase] ?? 'var(--color-grama-verde)'
  const rutaBase      = `/taller/${taller.slug}/ruta`

  const prevModulo = allModulos.find(m => m.numero === modulo.numero - 1)
  const nextModulo = allModulos.find(m => m.numero === modulo.numero + 1)

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      {/* Breadcrumb */}
      <Link
        href={rutaBase}
        className="inline-flex items-center gap-1.5 text-sm mb-6 transition-opacity hover:opacity-70"
        style={{ color: 'var(--color-grama-oscuro)' }}
      >
        <ArrowLeft size={15} /> Ruta de Aprendizaje
      </Link>

      {/* Module Header */}
      <div className="rounded-2xl p-6 mb-6" style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}>
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase"
            style={{ background: faseColor + '20', color: faseColor }}
          >
            {modulo.fase.toUpperCase()}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: 'var(--color-grama-claro)', color: 'var(--color-grama-verde)' }}>
            M{modulo.numero}
          </span>
        </div>

        <h1 className="font-extrabold mb-2" style={{ fontSize: 'var(--text-h2)', color: 'var(--color-grama-oscuro)' }}>
          {modulo.nombre}
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
          {modulo.descripcion}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
          <Stat label="Horas totales" value={`${modulo.horasTotal}h`} />
          <Stat label="Asíncrono"     value={`${modulo.horasAsincrono}h`} />
          <Stat label="Presencial"    value={`${modulo.horasPresencial}h`} />
          <Stat label="Actividades"   value={String(contenidoIds.length)} />
          <Stat label="Progreso"      value={`${progreso}%`} accent />
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 rounded-full" style={{ background: 'var(--color-border)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progreso}%`, background: 'var(--color-grama-verde)' }}
          />
        </div>
        <p className="text-[11px] mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
          {progresoObj.completados} de {progresoObj.total} actividades completadas
        </p>
      </div>

      {/* SubSecciones */}
      <div className="space-y-3">
        {modulo.subSecciones.map((ss, i) => (
          <SubSeccionCard key={ss.id} subseccion={ss} defaultOpen={i === 0} />
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="flex gap-3 mt-8">
        {prevModulo && (
          <Link
            href={`${rutaBase}/modulo/${prevModulo.numero}`}
            className="flex-1 flex items-center gap-2 p-3 rounded-2xl text-xs font-semibold transition-colors hover:bg-gray-50"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-grama-oscuro)' }}
          >
            <ArrowLeft size={14} />
            <span>M{prevModulo.numero} — {prevModulo.nombre}</span>
          </Link>
        )}
        {nextModulo && (
          <Link
            href={`${rutaBase}/modulo/${nextModulo.numero}`}
            className="flex-1 flex items-center justify-end gap-2 p-3 rounded-2xl text-xs font-semibold transition-colors hover:bg-gray-50"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-grama-oscuro)' }}
          >
            <span>M{nextModulo.numero} — {nextModulo.nombre}</span>
            <ChevronRight size={14} />
          </Link>
        )}
      </div>
    </div>
  )
}

// ── Helper ─────────────────────────────────────────────────────────────────────
function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px]" style={{ color: 'var(--color-muted-foreground)' }}>{label}</p>
      <p
        className="text-sm font-bold"
        style={{ color: accent ? 'var(--color-grama-verde)' : 'var(--color-grama-oscuro)' }}
      >
        {value}
      </p>
    </div>
  )
}
