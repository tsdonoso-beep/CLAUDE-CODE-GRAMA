// src/pages/TallerHub.tsx
import { useNavigate } from 'react-router-dom'
import { BookOpen, Package, ChevronRight, Clock, Award, ArrowRight } from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { modulosLXP } from '@/data/modulosLXP'
import { getBienesByTaller } from '@/data/bienesData'
import {
  SvgAutomotriz,
  SvgEbanisteria,
  SvgElectricidad,
  SvgElectronica,
} from '@/components/lxp/TallerCardDocente'

// ── SVG universal para sección de competencias ────────────────────────────────
function SvgCompetencias() {
  return (
    <svg width="100%" height="120" viewBox="0 0 900 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="120" fill="#07131f"/>
      {/* Dot grid */}
      {Array.from({ length: 19 }, (_, col) =>
        Array.from({ length: 7 }, (_, row) => (
          <circle key={`${col}-${row}`} cx={col * 50 + 25} cy={row * 18 + 9} r="1" fill="#02d47e" opacity=".05"/>
        ))
      )}
      {/* Ground strip */}
      <rect x="0" y="100" width="900" height="20" fill="#040e18"/>
      <line x1="450" y1="100" x2="0"   y2="120" stroke="#0b2030" strokeWidth="1"/>
      <line x1="450" y1="100" x2="225" y2="120" stroke="#0b2030" strokeWidth="1"/>
      <line x1="450" y1="100" x2="450" y2="120" stroke="#0b2030" strokeWidth="1"/>
      <line x1="450" y1="100" x2="675" y2="120" stroke="#0b2030" strokeWidth="1"/>
      <line x1="450" y1="100" x2="900" y2="120" stroke="#0b2030" strokeWidth="1"/>
      {/* Learning path curve */}
      <path d="M60,60 C150,30 200,82 300,58 C400,34 450,78 550,56 C650,34 720,76 840,52"
        stroke="#02d47e" strokeWidth="1.5" fill="none" opacity=".18" strokeDasharray="5,5"/>
      {/* 5 skill nodes */}
      {([90, 225, 360, 495, 630, 765] as number[]).slice(0, 5).map((cx, i) => (
        <g key={i}>
          {i < 4 && (
            <line x1={cx + 28} y1="58" x2={[225, 360, 495, 630][i] - 28} y2="58"
              stroke="#02d47e" strokeWidth="0.8" opacity=".12"/>
          )}
          <circle cx={cx} cy="58" r="26" fill="#02d47e" opacity=".03"/>
          <circle cx={cx} cy="58" r="18" fill="none" stroke="#02d47e" strokeWidth="0.8" opacity=".18"/>
          <circle cx={cx} cy="58" r="11" fill="#0d2a1a" stroke="#02d47e" strokeWidth="1.2" opacity=".5"/>
          <text x={cx} y="62" textAnchor="middle" fontSize="8" fontWeight="700"
            fill="#02d47e" opacity=".65" fontFamily="DM Mono,monospace">
            {String(i + 1).padStart(2, '0')}
          </text>
        </g>
      ))}
      {/* Decorative hexagons */}
      {([[840,58],[858,46],[822,46]] as [number,number][]).map(([hx,hy],i) => (
        <polygon key={i}
          points={`${hx},${hy-10} ${hx+9},${hy-5} ${hx+9},${hy+5} ${hx},${hy+10} ${hx-9},${hy+5} ${hx-9},${hy-5}`}
          fill="none" stroke="#02d47e" strokeWidth="0.5" opacity={0.12 - i * 0.03}/>
      ))}
      {([50,56,62] as number[]).map((hy, i) => (
        <polygon key={i}
          points={`32,${hy-10} 41,${hy-5} 41,${hy+5} 32,${hy+10} 23,${hy+5} 23,${hy-5}`}
          fill="none" stroke="#045f6c" strokeWidth="0.5" opacity={0.14 - i * 0.04}/>
      ))}
      {/* Abstract book + gear silhouettes */}
      <rect x="768" y="32" width="18" height="24" rx="2" fill="#043941" opacity=".35" stroke="#045f6c" strokeWidth="0.5"/>
      <rect x="771" y="35" width="12" height="18" rx="1" fill="#02d47e" opacity=".05"/>
      <line x1="773" y1="40" x2="781" y2="40" stroke="#02d47e" strokeWidth="0.7" opacity=".18"/>
      <line x1="773" y1="44" x2="781" y2="44" stroke="#02d47e" strokeWidth="0.7" opacity=".12"/>
      <line x1="773" y1="48" x2="779" y2="48" stroke="#02d47e" strokeWidth="0.7" opacity=".1"/>
      <circle cx="800" cy="68" r="9" fill="none" stroke="#045f6c" strokeWidth="3" opacity=".18"/>
      <circle cx="800" cy="68" r="4" fill="#02d47e" opacity=".08"/>
      {/* Left: abstract certificate */}
      <rect x="18" y="34" width="26" height="34" rx="3" fill="#043941" opacity=".4" stroke="#045f6c" strokeWidth="0.5"/>
      <line x1="24" y1="43" x2="38" y2="43" stroke="#02d47e" strokeWidth="0.8" opacity=".2"/>
      <line x1="24" y1="48" x2="38" y2="48" stroke="#02d47e" strokeWidth="0.8" opacity=".15"/>
      <line x1="24" y1="53" x2="33" y2="53" stroke="#02d47e" strokeWidth="0.8" opacity=".12"/>
      <polygon points="31,59 33.5,65 40,65 35,68.5 37,75 31,71 25,75 27,68.5 22,65 28.5,65" fill="#fde047" opacity=".12"/>
      {/* Gradient fade left/right edges */}
      <defs>
        <linearGradient id="compEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#07131f" stopOpacity=".5"/>
          <stop offset="8%"   stopColor="#07131f" stopOpacity="0"/>
          <stop offset="92%"  stopColor="#07131f" stopOpacity="0"/>
          <stop offset="100%" stopColor="#07131f" stopOpacity=".4"/>
        </linearGradient>
      </defs>
      <rect width="900" height="120" fill="url(#compEdge)"/>
    </svg>
  )
}

const TALLER_SVG: Record<string, React.ReactNode> = {
  'mecanica-automotriz': <SvgAutomotriz />,
  'ebanisteria':         <SvgEbanisteria />,
  'electricidad':        <SvgElectricidad />,
  'electronica':         <SvgElectronica />,
}

function Tangram({
  color = '#02d47e', opacity = 0.12, className = '', rotate = 0,
  style = {} as React.CSSProperties,
}: {
  color?: string; opacity?: number; className?: string; rotate?: number; style?: React.CSSProperties
}) {
  return (
    <svg viewBox="0 0 160 160" className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }} xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,160 80,80 0,0"              fill={color} fillOpacity={opacity}/>
      <polygon points="160,0 80,80 160,160"           fill={color} fillOpacity={opacity * 0.7}/>
      <polygon points="0,160 80,160 80,80"            fill={color} fillOpacity={opacity * 1.2}/>
      <rect x="70" y="30" width="40" height="40" transform="rotate(45 90 50)" fill={color} fillOpacity={opacity * 0.9}/>
      <polygon points="80,80 120,80 120,120"          fill={color} fillOpacity={opacity * 0.8}/>
      <polygon points="80,80 80,120 120,120"          fill={color} fillOpacity={opacity * 0.6}/>
      <polygon points="120,80 160,80 160,120 120,120" fill={color} fillOpacity={opacity * 0.5}/>
    </svg>
  )
}

export default function TallerHub() {
  const { taller, slug } = useTaller()
  const navigate = useNavigate()

  if (!taller || !slug) return null

  const todosLos   = getBienesByTaller(slug)
  const totalHoras = modulosLXP.reduce((a, m) => a + m.horasTotal, 0)

  // Top bienes por zona (máx 4 por zona, máx 3 zonas)
  const bienesporZona = taller.zonas.slice(0, 3).map(z => {
    const items = todosLos
      .filter(b => b.zona?.toLowerCase().includes(z.id.toLowerCase()) || b.zona?.toLowerCase().includes(z.nombre.toLowerCase().split(' ').pop()!.toLowerCase()))
      .filter(b => b.tipo === 'EQUIPOS' || b.tipo === 'HERRAMIENTAS')
      .slice(0, 4)
    return { zona: z.nombre, items }
  }).filter(z => z.items.length > 0)

  // Fallback si no hay match por zona: mostrar los primeros equipos
  const bienesFallback = todosLos.filter(b => b.tipo === 'EQUIPOS').slice(0, 8)

  return (
    <div style={{ background: '#f0faf5', fontFamily: 'Manrope, sans-serif' }}>

      {/* ══ HERO — oscuro unificado con Perfil ════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ minHeight: 280 }}>

        {/* Gradiente oscuro */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg,#043941 0%,#045f6c 55%,rgba(0,193,110,0.1) 100%)',
        }}/>

        {/* Patrón GRAMA */}
        <div className="absolute inset-0 grama-pattern opacity-20"/>

        {/* Blob accent del taller */}
        <div className="absolute pointer-events-none" style={{
          width: 480, height: 480,
          background: `radial-gradient(circle, hsl(${taller.color} / 0.16) 0%, transparent 65%)`,
          right: -80, top: -120,
        }}/>

        {/* SVG ilustración — full bleed con CSS override */}
        {TALLER_SVG[slug] && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden [&_svg]:w-full [&_svg]:h-full"
            style={{ opacity: 0.32 }}>
            {TALLER_SVG[slug]}
          </div>
        )}

        {/* Gradient izquierdo para legibilidad del texto */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(100deg, rgba(4,57,65,0.97) 0%, rgba(4,57,65,0.88) 38%, rgba(4,57,65,0.55) 62%, rgba(4,57,65,0.1) 100%)',
        }}/>

        {/* Contenido */}
        <div className="relative z-10 px-8 pt-10 pb-12" style={{ maxWidth: 860 }}>

          {/* Badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold px-3 py-1 rounded-full"
              style={{
                background: `hsl(${taller.color} / 0.18)`,
                border: `1px solid hsl(${taller.color} / 0.35)`,
                color: `hsl(${taller.color})`,
              }}>
              <span className="w-1 h-1 rounded-full" style={{ background: `hsl(${taller.color})` }}/>
              T{String(taller.numero).padStart(2, '0')} · TALLER EPT
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.28)' }}>
              Programa Formativo MINEDU
            </span>
          </div>

          {/* Título + descripción */}
          <h1 className="font-extrabold leading-tight mb-3"
            style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '-0.025em', color: '#d2ffe1' }}>
            {taller.nombre}
          </h1>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(210,255,225,0.5)', maxWidth: 480 }}>
            {taller.descripcion}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-5 mb-8">
            {[
              { icon: BookOpen, value: `${modulosLXP.length} módulos`, sub: 'M0 → M6' },
              { icon: Clock,    value: `${totalHoras}h`,               sub: 'Virtual + Presencial' },
              { icon: Package,  value: `${todosLos.length} bienes`,    sub: `${taller.zonas.length} zonas` },
              { icon: Award,    value: 'Constancia',                   sub: 'Inroprin' },
            ].map(s => (
              <div key={s.value} className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(2,212,126,0.1)', border: '1px solid rgba(2,212,126,0.15)' }}>
                  <s.icon size={15} color="#02d47e"/>
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#d2ffe1' }}>{s.value}</p>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate(`/taller/${slug}/ruta`)}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(90deg,#02d47e,#00c16e)', color: '#032e34', borderRadius: 12 }}
            >
              <BookOpen size={14}/>
              Iniciar Ruta de Aprendizaje
              <ChevronRight size={14}/>
            </button>
            <button
              onClick={() => navigate(`/taller/${slug}/repositorio`)}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all active:scale-[0.98]"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 12 }}
            >
              <Package size={14}/>
              Ver Repositorio
            </button>
          </div>
        </div>
      </div>

      {/* ══ COMPETENCIAS ══════════════════════════════════════════════════════ */}
      {taller.competencias?.length > 0 && (
        <div style={{ background: '#fff', borderBottom: '1px solid rgba(4,57,65,0.06)' }}>
          <div className="px-8 py-8">
            <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1"
              style={{ color: '#02d47e' }}>
              Lo que lograrás
            </p>
            <h2 className="text-xl font-extrabold mb-5" style={{ color: '#043941' }}>
              Competencias que desarrollarás
            </h2>

            <div className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(4,57,65,0.07)', boxShadow: '0 2px 12px rgba(4,57,65,0.04)' }}>

              {/* Banner universal — mismo para todos los talleres */}
              <div style={{ height: 120, overflow: 'hidden' }}>
                <SvgCompetencias />
              </div>

              {/* Items horizontales */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(taller.competencias.length, 5)}, 1fr)`,
              }}>
                {taller.competencias.map((c, i) => (
                  <div key={i} style={{
                    padding: '16px 18px',
                    borderRight: i < taller.competencias.length - 1
                      ? '1px solid rgba(4,57,65,0.06)' : 'none',
                  }}>
                    <span style={{
                      display: 'block', fontSize: 22, fontWeight: 800,
                      color: 'rgba(4,57,65,0.09)', lineHeight: 1, marginBottom: 7,
                      fontFamily: "'DM Mono', monospace",
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#043941', lineHeight: 1.5 }}>
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ RUTA + REPOSITORIO ════════════════════════════════════════════════ */}
      <div className="px-8 py-10 grid lg:grid-cols-[3fr_2fr] gap-8 items-start">

        {/* ── RUTA DE APRENDIZAJE ── */}
        <div className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 2px 16px rgba(4,57,65,0.07)' }}>
          <div
            className="px-6 pt-6 pb-3 flex items-center justify-between cursor-pointer group"
            onClick={() => navigate(`/taller/${slug}/ruta`)}
          >
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1"
                style={{ color: '#02d47e' }}>
                Tu camino de aprendizaje
              </p>
              <h2 className="text-lg font-extrabold" style={{ color: '#043941' }}>
                {modulosLXP.length} módulos · {totalHoras}h de formación
              </h2>
            </div>
            <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
              style={{ background: 'linear-gradient(90deg,#02d47e,#00c16e)' }}>
              <ChevronRight size={15} color="#032e34" />
            </div>
          </div>

          {/* Módulos como cards horizontales */}
          <div className="px-4 pb-2">
            {modulosLXP.map((m, i) => (
              <div
                key={m.id}
                onClick={() => navigate(`/taller/${slug}/ruta`)}
                className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer transition-all hover:bg-[#f0fdf9] group"
              >
                {/* Indicador de línea + nodo */}
                <div className="flex flex-col items-center shrink-0" style={{ width: 32 }}>
                  {i > 0 && <div className="w-px h-2 mb-1" style={{ background: 'rgba(2,212,126,0.2)' }} />}
                  <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm"
                    style={{
                      background: i === 0 ? '#043941' : 'rgba(4,57,65,0.06)',
                      border: i === 0 ? 'none' : '1.5px solid rgba(4,57,65,0.1)',
                    }}>
                    {m.icon}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold"
                      style={{ color: i === 0 ? '#02d47e' : 'rgba(4,57,65,0.28)' }}>
                      M{m.numero}
                    </span>
                    <span className="text-sm font-bold truncate" style={{ color: '#043941' }}>
                      {m.nombre}
                    </span>
                  </div>
                  <p className="text-[11px] mt-0.5" style={{ color: '#94a3b8' }}>
                    {m.horasTotal}h
                    {m.horasAsincrono > 0 && ' · Virtual'}
                    {m.horasSincrono > 0 && ' · En vivo'}
                    {m.horasPresencial > 0 && ' · Presencial'}
                  </p>
                </div>

                <span className="text-[11px] font-bold shrink-0 px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(4,57,65,0.05)', color: 'rgba(4,57,65,0.35)' }}>
                  {m.sesiones.length} sesiones
                </span>

                <ArrowRight size={12} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: '#02d47e' }} />
              </div>
            ))}
          </div>

        </div>

        {/* ── EQUIPAMIENTO DEL TALLER ── */}
        <div className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 2px 16px rgba(4,57,65,0.07)' }}>
          <div
            className="px-6 pt-6 pb-4 flex items-center justify-between cursor-pointer group"
            onClick={() => navigate(`/taller/${slug}/repositorio`)}
          >
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1"
                style={{ color: '#02d47e' }}>
                Con qué trabajarás
              </p>
              <h2 className="text-lg font-extrabold" style={{ color: '#043941' }}>
                Equipamiento del taller
              </h2>
            </div>
            <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
              style={{ background: '#f0faf5', border: '1.5px solid rgba(4,57,65,0.1)' }}>
              <ChevronRight size={15} color="#043941" />
            </div>
          </div>

          <div className="px-6 pb-4 space-y-5">
            {(bienesporZona.length > 0 ? bienesporZona : [{ zona: 'Equipos representativos', items: bienesFallback }]).map(grupo => (
              <div key={grupo.zona}>
                <p className="text-[10px] font-extrabold uppercase tracking-widest mb-2"
                  style={{ color: 'rgba(4,57,65,0.35)' }}>
                  {grupo.zona.replace(/seguridad/i, 'Almacén')}
                </p>
                <div className="space-y-1.5">
                  {grupo.items.map((b, bi) => (
                    <div key={bi} className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl"
                      style={{ background: '#f4f9f9' }}>
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: '#02d47e' }} />
                      <span className="text-xs font-medium leading-snug" style={{ color: '#043941' }}>
                        {b.nombre}
                      </span>
                      {b.cantidad > 1 && (
                        <span className="ml-auto text-[10px] font-bold shrink-0"
                          style={{ color: 'rgba(4,57,65,0.35)' }}>
                          ×{b.cantidad}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pb-4" />
        </div>

      </div>
    </div>
  )
}
