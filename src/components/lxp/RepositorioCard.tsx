// src/components/lxp/RepositorioCard.tsx
import { useNavigate, useParams } from 'react-router-dom'
import { FileText, Video, Shield, Package, Wrench, Sofa, BookOpen, HardHat, Factory, ArrowUpRight } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Bien = Record<string, any>

interface RepositorioCardProps {
  bien: Bien
}

const TIPO_CONFIG: Record<string, {
  icon: React.ElementType
  color: string
  bg: string
  label: string
  accent: string
}> = {
  EQUIPOS:      { icon: Package,  color: '#02d47e', bg: 'rgba(2,212,126,0.12)',  label: 'Equipo',      accent: '#02d47e' },
  HERRAMIENTAS: { icon: Wrench,   color: '#045f6c', bg: 'rgba(4,95,108,0.12)',   label: 'Herramienta', accent: '#045f6c' },
  MOBILIARIO:   { icon: Sofa,     color: '#04768a', bg: 'rgba(4,118,138,0.12)',  label: 'Mobiliario',  accent: '#04768a' },
  PEDAGOGICO:   { icon: BookOpen, color: '#043941', bg: 'rgba(4,57,65,0.09)',    label: 'Pedagógico',  accent: '#043941' },
  'PRODUCCIÓN': { icon: Factory,  color: '#02a05a', bg: 'rgba(2,160,90,0.12)',   label: 'Producción',  accent: '#02a05a' },
  SEGURIDAD:    { icon: HardHat,  color: '#dc2626', bg: '#fee2e2',              label: 'Seguridad',   accent: '#dc2626' },
  '':           { icon: Package,  color: '#475569', bg: '#f1f5f9',              label: 'Bien',        accent: '#475569' },
}

function zonaAccent(zona: string): string {
  const z = zona?.toUpperCase() ?? ''
  if (z.includes('INVESTIGAC')) return '#04768a'
  if (z.includes('INNOVAC'))    return '#02d47e'
  if (z.includes('ALMAC') || z.includes('DEPÓSITO')) return '#045f6c'
  if (z.includes('SEGURIDAD'))  return '#dc2626'
  return '#475569'
}

const AREA_LABEL: Record<string, string> = {
  'DEPÓSITO / ALMACÉN': 'DEPÓSITO',
}

function zonaBreadcrumb(zona: string): string {
  if (!zona) return ''
  return zona
    .replace('ZONA DE ', '')
    .replace('DEPÓSITO / ALMACÉN / SEGURIDAD', 'DEPÓSITO')
    .split(',')[0]
    .trim()
}

function areaLabel(area: string): string {
  return AREA_LABEL[area] ?? area
}

export function RepositorioCard({ bien }: RepositorioCardProps) {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const tipoConf = TIPO_CONFIG[bien.tipo] ?? TIPO_CONFIG['']
  const TypeIcon = tipoConf.icon
  const accent = zonaAccent(bien.zona ?? '')

  const breadcrumb = [bien.zona, bien.area, bien.subarea].filter(Boolean)

  return (
    <button
      onClick={() => navigate(`/taller/${slug}/repositorio/bien/${bien.n}`)}
      className="w-full h-full text-left group relative overflow-hidden transition-all duration-200 flex flex-col"
      style={{
        background: '#ffffff',
        borderRadius: '1rem',
        border: '1.5px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.10), 0 0 0 2px ${accent}40`
        ;(e.currentTarget as HTMLElement).style.borderColor = accent + '60'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
        ;(e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Accent bar top */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${tipoConf.color})` }} />

      <div className="p-4 flex flex-col flex-1">
        {/* Row 1: icon + title + quantity */}
        <div className="flex items-start gap-3 mb-3">
          {/* Icon pill */}
          <div
            className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
            style={{ background: tipoConf.bg }}
          >
            <TypeIcon size={19} style={{ color: tipoConf.color }} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm leading-snug line-clamp-2 transition-colors"
              style={{ color: '#0f172a' }}>
              {bien.nombre}
            </h3>
            {(bien.marca || bien.modelo) && (
              <p className="text-xs mt-0.5 truncate" style={{ color: '#64748b' }}>
                {[bien.marca, bien.modelo].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>

          {/* Quantity badge */}
          <span
            className="shrink-0 text-xs font-extrabold px-2 py-1 rounded-lg min-w-[2rem] text-center"
            style={{ background: accent + '12', color: accent }}
          >
            ×{bien.cantidad}
          </span>
        </div>

        {/* Row 2: breadcrumb zona › area › subarea */}
        {breadcrumb.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mb-3">
            {breadcrumb.map((seg, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span className="text-[10px]" style={{ color: '#cbd5e1' }}>›</span>}
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                  style={
                    i === 0
                      ? { background: accent + '12', color: accent }
                      : { background: '#f1f5f9', color: '#64748b' }
                  }
                >
                  {i === 0 ? zonaBreadcrumb(seg) : areaLabel(seg)}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Spacer — empuja footer hacia abajo */}
        <div className="flex-1" />

        {/* Row 3: tipo badge */}
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg"
            style={{ background: tipoConf.bg, color: tipoConf.color }}
          >
            <TypeIcon size={10} />
            {tipoConf.label}
          </span>

          {/* Recurso icons */}
          <div className="flex gap-1">
            <ResourceDot icon={FileText} color="#475569" title="Manual" />
            <ResourceDot icon={Video}    color="#02d47e" title="Video" />
            <ResourceDot icon={Shield}   color="#dc2626" title="IPERC" />
          </div>
        </div>

        {/* Footer: código + arrow */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: '#f1f5f9' }}>
          <span className="text-[10px] font-mono font-medium" style={{ color: '#94a3b8' }}>
            {bien.codigoEntidad || bien.codigoInterno || `#${bien.n}`}
          </span>
          <ArrowUpRight
            size={14}
            className="transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: accent, opacity: 0 }}
            ref={(el) => {
              if (el) el.style.opacity = '0'
            }}
          />
        </div>
      </div>

      {/* Hover overlay arrow */}
      <div className="absolute bottom-3.5 right-3.5 transition-all duration-200 opacity-0 group-hover:opacity-100">
        <ArrowUpRight size={13} style={{ color: accent }} />
      </div>
    </button>
  )
}

function ResourceDot({ icon: Icon, color, title }: { icon: React.ElementType; color: string; title: string }) {
  return (
    <span
      title={title}
      className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
      style={{ background: color + '12', color }}
    >
      <Icon size={10} />
    </span>
  )
}
