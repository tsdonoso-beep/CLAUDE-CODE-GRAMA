'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen, Package, ArrowRight, CheckCircle2, Lock, PlayCircle,
  Layers, Clock, ChevronRight, Sparkles, Zap,
} from 'lucide-react'
import { ProgressRing }    from '@/presentation/shared/ui/ProgressRing'
import { LiveSessionCard } from '@/presentation/features/taller/components/lxp/LiveSessionCard'
import { useProgress }     from '@/presentation/providers/ProgressProvider'
import { getProximaSesion } from '@/infrastructure/static/data/sesionesLXP'
import type { Taller }     from '@/domain/taller/entities/Taller'
import type { ModuloId }   from '@/domain/shared/types'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ModuloPreview {
  numero:            number
  id:                string
  nombre:            string
  horasTotal:        number
  subSeccionesCount: number
  contenidoIds:      string[]
}

interface TallerHubClientProps {
  taller:          Taller
  totalBienes:     number
  zonas:           string[]
  modulosPreview:  ModuloPreview[]
}

// ── Estado config ─────────────────────────────────────────────────────────────

const ESTADO_CONFIG = {
  completado: { icon: CheckCircle2, color: '#00c16e', bg: 'rgba(0,193,110,0.12)', label: 'Completado',  border: 'rgba(0,193,110,0.3)'  },
  en_curso:   { icon: PlayCircle,   color: '#02d47e', bg: 'rgba(2,212,126,0.1)',  label: 'En curso',    border: 'rgba(2,212,126,0.5)'  },
  disponible: { icon: PlayCircle,   color: '#045f6c', bg: 'rgba(4,95,108,0.08)', label: 'Disponible',  border: 'rgba(4,95,108,0.2)'   },
  bloqueado:  { icon: Lock,         color: '#475569', bg: 'rgba(71,85,105,0.06)', label: 'Bloqueado',   border: 'rgba(71,85,105,0.15)' },
}

// ── Component ─────────────────────────────────────────────────────────────────

export function TallerHubClient({ taller, totalBienes, zonas, modulosPreview }: TallerHubClientProps) {
  const { getModuloProgreso, getEstadoModulo, getTallerProgreso } = useProgress()
  const [hoveredModulo, setHoveredModulo] = useState<string | null>(null)

  const accent   = taller.color ?? '#02d47e'
  const base     = `/taller/${taller.slug}`
  const isGeneral = taller.slug === 'taller-general-ept'

  // Taller-wide progress (all module content ids)
  const allContenidoIds = modulosPreview.flatMap(m => m.contenidoIds)
  const progresoTaller  = getTallerProgreso(allContenidoIds)

  // Next live session (date-filtered at runtime)
  const proximaSesion = getProximaSesion(taller.slug)

  // Compute estado for each module (chain: prev must be complete)
  const modulosConEstado = modulosPreview.map((mod, idx) => {
    const prevCompletado = idx === 0
      ? true
      : getModuloProgreso(
          `M${modulosPreview[idx - 1].numero}` as ModuloId,
          modulosPreview[idx - 1].contenidoIds
        ).porcentaje === 100
    const estado   = getEstadoModulo(`M${mod.numero}` as ModuloId, mod.contenidoIds, prevCompletado)
    const progreso = getModuloProgreso(`M${mod.numero}` as ModuloId, mod.contenidoIds)
    return { ...mod, estado, progreso }
  })

  const modulosPreview4 = modulosConEstado.slice(0, 4)

  // Platform label for live session
  const plataforma = proximaSesion?.modalidad === 'meet' ? 'Google Meet'
    : proximaSesion?.modalidad === 'zoom' ? 'Zoom'
    : 'Presencial'

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ minHeight: 320 }}>

        {/* Full-bleed image background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${taller.imagen})`,
            filter: 'brightness(0.3) saturate(0.7)',
          }}
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(100deg, rgba(4,10,20,0.92) 0%, rgba(4,10,20,0.72) 55%, rgba(4,10,20,0.45) 100%)',
          }}
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grama-pattern opacity-50" />

        {/* Accent orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 420, height: 420,
            background: `radial-gradient(circle, ${accent}18 0%, transparent 65%)`,
            right: -80, top: -80,
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 px-6 md:px-10 pt-8 pb-8">

          {/* Overline pill */}
          <div className="flex items-center gap-2 mb-5 animate-fade-in-up">
            <div
              className="flex items-center gap-2 h-6 px-3 rounded-full text-[10px] font-extrabold tracking-widest uppercase"
              style={{
                background: `${accent}18`,
                border:     `1px solid ${accent}35`,
                color:       accent,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
              T{String(taller.numero).padStart(2, '0')} · {taller.nombreCorto}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
            {/* Left */}
            <div>
              <h1
                className="font-extrabold text-white animate-fade-in-up stagger-1"
                style={{ fontSize: 'var(--text-h1)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                {taller.nombre}
              </h1>
              <p
                className="mt-3 max-w-lg text-sm leading-relaxed animate-fade-in-up stagger-2"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {taller.descripcion}
              </p>

              {/* Stat chips */}
              <div className="flex flex-wrap gap-3 mt-5 animate-fade-in-up stagger-3">
                {[
                  { icon: Layers,   label: '7 Módulos',     sub: 'de formación' },
                  { icon: Clock,    label: '150 Horas',      sub: 'híbrida' },
                  { icon: BookOpen, label: 'Certificación',  sub: 'Inroprin' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
                    style={{
                      background:     'rgba(255,255,255,0.07)',
                      border:         '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <stat.icon size={14} style={{ color: accent }} />
                    <div>
                      <p className="text-xs font-bold text-white leading-none">{stat.label}</p>
                      <p className="text-[10px] mt-0.5 leading-none" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: floating progress ring */}
            {!isGeneral && (
              <div
                className="hidden lg:flex flex-col items-center gap-3 p-5 rounded-2xl animate-fade-in-up stagger-4"
                style={{
                  background:     'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(16px)',
                  border:         '1px solid rgba(255,255,255,0.1)',
                  minWidth:       160,
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Tu progreso
                </p>
                <ProgressRing
                  percentage={progresoTaller.porcentaje}
                  size={80}
                  dark
                />
                <p className="text-[10px] text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {progresoTaller.porcentaje}% completado
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <div className="p-5 md:p-6 grid lg:grid-cols-3 gap-5">

        {/* ── Main column (2/3) ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Ruta de Aprendizaje */}
          {!isGeneral && (
            <section
              className="rounded-2xl overflow-hidden animate-fade-in-up stagger-1"
              style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
            >
              {/* Section header */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: 'rgba(4,57,65,0.08)', background: 'rgba(4,57,65,0.03)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${accent}18` }}
                  >
                    <Layers size={15} style={{ color: accent }} />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-sm" style={{ color: 'var(--color-grama-oscuro)' }}>
                      Tu Ruta de Aprendizaje
                    </h2>
                    <p className="text-[10px]" style={{ color: 'rgba(4,57,65,0.45)' }}>
                      7 módulos · Certificación Inroprin
                    </p>
                  </div>
                </div>
                <Link
                  href={`${base}/ruta`}
                  className="flex items-center gap-1 text-xs font-bold"
                  style={{ color: accent }}
                >
                  Ver ruta completa <ChevronRight size={13} />
                </Link>
              </div>

              {/* Module rows */}
              <div className="divide-y" style={{ borderColor: 'rgba(4,57,65,0.05)' }}>
                {modulosPreview4.map((mod, idx) => {
                  const conf      = ESTADO_CONFIG[mod.estado as keyof typeof ESTADO_CONFIG]
                  const StatusIcon = conf.icon
                  const isEnCurso = mod.estado === 'en_curso'
                  const isHovered = hoveredModulo === mod.id
                  const isBloqueado = mod.estado === 'bloqueado'

                  return (
                    <Link
                      key={mod.id}
                      href={isBloqueado ? '#' : `${base}/ruta/modulo/${mod.numero}`}
                      onMouseEnter={() => setHoveredModulo(mod.id)}
                      onMouseLeave={() => setHoveredModulo(null)}
                      onClick={e => { if (isBloqueado) e.preventDefault() }}
                      className="flex items-center gap-4 px-5 py-4 transition-all"
                      style={{
                        background: isEnCurso
                          ? `${accent}08`
                          : isHovered && !isBloqueado ? 'rgba(4,57,65,0.03)' : 'transparent',
                        opacity: isBloqueado ? 0.5 : 1,
                        cursor:  isBloqueado ? 'not-allowed' : 'pointer',
                        animationDelay: `${0.05 * idx}s`,
                        display: 'flex',
                      }}
                    >
                      {/* Module number badge */}
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0"
                        style={{
                          background: isEnCurso ? `${accent}20` : conf.bg,
                          color:      isEnCurso ? accent : conf.color,
                          border:     `1.5px solid ${isEnCurso ? `${accent}40` : conf.border}`,
                        }}
                      >
                        {String(mod.numero).padStart(2, '0')}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm" style={{ color: 'var(--color-grama-oscuro)' }}>
                          {mod.nombre}
                        </p>
                        <p className="text-[11px] mt-0.5" style={{ color: 'rgba(4,57,65,0.45)' }}>
                          {mod.horasTotal}h · {mod.subSeccionesCount} secciones
                        </p>
                      </div>

                      {/* Estado badge */}
                      <div
                        className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold shrink-0"
                        style={{ background: conf.bg, color: conf.color, minWidth: 96 }}
                      >
                        <StatusIcon size={11} />
                        {conf.label}
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Footer button */}
              <div className="px-5 py-3 border-t" style={{ borderColor: 'rgba(4,57,65,0.06)' }}>
                <Link
                  href={`${base}/ruta`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
                  style={{
                    color:      'var(--color-grama-oscuro)',
                    border:     '1px solid rgba(4,57,65,0.1)',
                    background: 'rgba(4,57,65,0.03)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = '#043941'
                    el.style.color = '#02d47e'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(4,57,65,0.03)'
                    el.style.color = '#043941'
                  }}
                >
                  Ver todos los módulos (7) <ArrowRight size={13} />
                </Link>
              </div>
            </section>
          )}

          {/* Repositorio de Recursos */}
          <section
            className="rounded-2xl overflow-hidden animate-fade-in-up stagger-2"
            style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: 'rgba(4,57,65,0.08)', background: 'rgba(4,57,65,0.03)' }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(2,212,126,0.12)' }}
                >
                  <Package size={15} style={{ color: '#02d47e' }} />
                </div>
                <div>
                  <h2 className="font-extrabold text-sm" style={{ color: 'var(--color-grama-oscuro)' }}>
                    Repositorio de Recursos
                  </h2>
                  <p className="text-[10px]" style={{ color: 'rgba(4,57,65,0.45)' }}>
                    Fichas, manuales, videos y equipos
                  </p>
                </div>
              </div>
              <Link
                href={`${base}/repositorio`}
                className="flex items-center gap-1 text-xs font-bold"
                style={{ color: '#02d47e' }}
              >
                Ver repositorio <ChevronRight size={13} />
              </Link>
            </div>

            <div className="p-5">
              {/* Stat chips */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { value: totalBienes, label: 'Bienes totales',   color: '#043941', bg: 'rgba(4,57,65,0.05)' },
                  { value: zonas.length, label: 'Zonas',           color: '#7c3aed', bg: 'rgba(124,58,237,0.07)' },
                  { value: 3,           label: 'Tipos de recurso', color: '#0891b2', bg: 'rgba(8,145,178,0.08)' },
                ].map(s => (
                  <div
                    key={s.label}
                    className="text-center p-3 rounded-xl"
                    style={{ background: s.bg }}
                  >
                    <p className="text-xl font-extrabold leading-none" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[10px] mt-1.5 font-medium" style={{ color: 'rgba(4,57,65,0.5)' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Zone chips */}
              {zonas.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {zonas.map(zona => (
                    <span
                      key={zona}
                      className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: '#e3f8fb', color: '#045f6c', border: '1px solid rgba(4,57,65,0.08)' }}
                    >
                      {zona}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={`${base}/repositorio`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(90deg, #043941 0%, #045f6c 100%)' }}
              >
                <Package size={15} />
                Explorar repositorio
                <ArrowRight size={13} />
              </Link>
            </div>
          </section>
        </div>

        {/* ── Sidebar (1/3) ─────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Mobile progress ring */}
          {!isGeneral && (
            <div
              className="lg:hidden p-5 rounded-2xl text-center animate-fade-in-up stagger-1"
              style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.08)' }}
            >
              <p className="text-xs font-extrabold mb-4" style={{ color: 'var(--color-grama-oscuro)' }}>
                Tu progreso
              </p>
              <div className="flex justify-center mb-2">
                <ProgressRing percentage={progresoTaller.porcentaje} size={80} />
              </div>
              <p className="text-xs" style={{ color: '#045f6c' }}>
                {progresoTaller.porcentaje}% completado
              </p>
            </div>
          )}

          {/* Proxima sesión */}
          {proximaSesion && (
            <div className="animate-fade-in-up stagger-2">
              <LiveSessionCard
                titulo={proximaSesion.titulo}
                moduloNombre={proximaSesion.moduloNombre}
                fecha={proximaSesion.fecha}
                duracionMin={proximaSesion.duracionMin}
                formador={proximaSesion.facilitador}
                plataforma={plataforma}
                urlAcceso={proximaSesion.link || undefined}
                compact
              />
            </div>
          )}

          {/* Inspirational card */}
          <div
            className="rounded-2xl p-5 relative overflow-hidden animate-fade-in-up stagger-3"
            style={{
              background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)',
              border: '1px solid rgba(2,212,126,0.2)',
            }}
          >
            <div
              className="absolute pointer-events-none"
              style={{
                width: 180, height: 180,
                background: `radial-gradient(circle, ${accent}20 0%, transparent 65%)`,
                top: -40, right: -40,
              }}
            />
            <div className="relative z-10">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}
              >
                <Sparkles size={16} style={{ color: accent }} />
              </div>
              <p className="text-sm font-extrabold text-white leading-snug mb-1.5">
                ¡Tus estudiantes te esperan!
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Cada sesión preparada con GRAMA suma una competencia técnica al futuro de tus alumnos.
              </p>
            </div>
          </div>

          {/* Quick access */}
          <div
            className="rounded-2xl overflow-hidden animate-fade-in-up stagger-4"
            style={{ background: '#ffffff', border: '1px solid rgba(4,57,65,0.07)' }}
          >
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: 'rgba(4,57,65,0.08)', background: 'rgba(4,57,65,0.03)' }}
            >
              <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: 'rgba(4,57,65,0.4)' }}>
                Acceso rápido
              </p>
            </div>
            <div className="divide-y" style={{ borderColor: 'rgba(4,57,65,0.05)' }}>
              {[
                ...(!isGeneral ? [{ label: 'Ruta de Aprendizaje', sub: '7 módulos', icon: Layers, to: `${base}/ruta`, color: accent }] : []),
                { label: 'Repositorio', sub: `${totalBienes} bienes`, icon: Package, to: `${base}/repositorio`, color: '#02d47e' },
              ].map(item => (
                <Link
                  key={item.label}
                  href={item.to}
                  className="flex items-center gap-3 px-4 py-3 transition-all hover:bg-black/[0.02]"
                >
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    <item.icon size={14} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold" style={{ color: 'var(--color-grama-oscuro)' }}>{item.label}</p>
                    <p className="text-[10px]" style={{ color: 'rgba(4,57,65,0.4)' }}>{item.sub}</p>
                  </div>
                  <Zap size={11} style={{ color: 'rgba(4,57,65,0.2)' }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
