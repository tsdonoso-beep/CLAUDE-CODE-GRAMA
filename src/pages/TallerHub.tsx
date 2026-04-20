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
  SvgIndustriaAlimentaria,
  SvgCocinaReposteria,
  SvgConstruccionesMetalicas,
  SvgEptGeneral,
  SvgIndustriaVestido,
  SvgComputacion,
} from '@/components/lxp/TallerCardDocente'

// ── Ilustración docente + alumnos ────────────────────────────────────────────
function SvgDocente() {
  return (
    <svg viewBox="0 0 440 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="svgDocBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#edfaf4"/>
          <stop offset="100%" stopColor="#daf2ea"/>
        </linearGradient>
      </defs>
      <rect width="440" height="280" rx="16" fill="url(#svgDocBg)"/>
      {/* Floor */}
      <rect x="0" y="212" width="440" height="68" fill="rgba(4,57,65,0.04)"/>
      <line x1="0" y1="212" x2="440" y2="212" stroke="rgba(4,57,65,0.07)" strokeWidth="1"/>

      {/* ─── PIZARRÓN ─── */}
      <rect x="22" y="26" width="154" height="108" rx="7" fill="#043941"/>
      <rect x="28" y="32" width="142" height="96" rx="4" fill="#054a55"/>
      {/* Engranaje */}
      <circle cx="76" cy="70" r="19" fill="none" stroke="#02d47e" strokeWidth="2" opacity="0.62"/>
      <circle cx="76" cy="70" r="8" fill="#02d47e" opacity="0.42"/>
      <rect x="71" y="48" width="10" height="7" rx="2" fill="#02d47e" opacity="0.42"/>
      <rect x="71" y="85" width="10" height="7" rx="2" fill="#02d47e" opacity="0.42"/>
      <rect x="53" y="65" width="7" height="9" rx="2" fill="#02d47e" opacity="0.42"/>
      <rect x="92" y="65" width="7" height="9" rx="2" fill="#02d47e" opacity="0.42"/>
      {/* Flecha */}
      <line x1="107" y1="70" x2="132" y2="70" stroke="#02d47e" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
      <path d="M126 64 L134 70 L126 76" stroke="#02d47e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.55"/>
      {/* Check */}
      <path d="M142 57 L149 66 L161 50" stroke="#02d47e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.55"/>
      {/* Líneas de texto */}
      <line x1="40" y1="100" x2="154" y2="100" stroke="#02d47e" strokeWidth="1.5" opacity="0.27"/>
      <line x1="40" y1="111" x2="138" y2="111" stroke="#02d47e" strokeWidth="1.5" opacity="0.18"/>
      {/* Patas del pizarrón */}
      <line x1="62" y1="134" x2="48" y2="212" stroke="#043941" strokeWidth="4" strokeLinecap="round" opacity="0.22"/>
      <line x1="138" y1="134" x2="152" y2="212" stroke="#043941" strokeWidth="4" strokeLinecap="round" opacity="0.22"/>

      {/* ─── DOCENTE ─── */}
      <rect x="180" y="106" width="34" height="64" rx="12" fill="#043941" opacity="0.88"/>
      <path d="M187 106 L197 122 L207 106" fill="#ddf5ee" opacity="0.72"/>
      <circle cx="197" cy="83" r="22" fill="#c8956a"/>
      <path d="M175 78 Q175 58 197 58 Q219 58 219 78" fill="#3d2616"/>
      <ellipse cx="175" cy="84" rx="5" ry="7" fill="#b8855a"/>
      <ellipse cx="219" cy="84" rx="5" ry="7" fill="#b8855a"/>
      {/* Brazo señalando la pizarra */}
      <path d="M180 124 Q157 117 146 107" stroke="#043941" strokeWidth="14" strokeLinecap="round" opacity="0.22"/>
      <path d="M180 124 Q157 117 146 107" stroke="#c8956a" strokeWidth="10" strokeLinecap="round"/>
      <circle cx="146" cy="107" r="6" fill="#c8956a"/>
      {/* Brazo derecho */}
      <path d="M214 118 Q222 138 220 155" stroke="#043941" strokeWidth="13" strokeLinecap="round" opacity="0.22"/>
      <path d="M214 118 Q222 138 220 155" stroke="#c8956a" strokeWidth="9" strokeLinecap="round"/>
      {/* Piernas */}
      <rect x="183" y="168" width="13" height="42" rx="6" fill="#1a3545"/>
      <rect x="200" y="168" width="13" height="42" rx="6" fill="#1a3545"/>
      <ellipse cx="189" cy="210" rx="14" ry="7" fill="#0c2030"/>
      <ellipse cx="206" cy="210" rx="14" ry="7" fill="#0c2030"/>

      {/* ─── ESCRITORIO ─── */}
      <rect x="252" y="170" width="130" height="13" rx="4" fill="#9cccc4"/>
      <rect x="261" y="183" width="8" height="29" rx="3" fill="#9cccc4"/>
      <rect x="366" y="183" width="8" height="29" rx="3" fill="#9cccc4"/>
      {/* Cuaderno sobre el escritorio */}
      <rect x="260" y="157" width="40" height="14" rx="2" fill="white" opacity="0.92"/>
      <line x1="280" y1="159" x2="280" y2="169" stroke="#02d47e" strokeWidth="1.5" opacity="0.5"/>
      <line x1="266" y1="163" x2="277" y2="163" stroke="#94a3b8" strokeWidth="0.8" opacity="0.45"/>
      <line x1="283" y1="163" x2="293" y2="163" stroke="#94a3b8" strokeWidth="0.8" opacity="0.45"/>

      {/* ─── ALUMNO 1 ─── */}
      <rect x="268" y="121" width="30" height="53" rx="11" fill="#02d47e" opacity="0.62"/>
      <circle cx="283" cy="107" r="18" fill="#d4a06a"/>
      <path d="M265 102 Q265 87 283 87 Q301 87 301 102" fill="#5c3a1e"/>
      <path d="M268 153 L256 168" stroke="#043941" strokeWidth="13" strokeLinecap="round" opacity="0.2"/>
      <path d="M268 153 L256 168" stroke="#d4a06a" strokeWidth="9" strokeLinecap="round"/>
      <rect x="272" y="172" width="11" height="22" rx="5" fill="#144a5a"/>
      <rect x="285" y="172" width="11" height="22" rx="5" fill="#144a5a"/>

      {/* ─── ALUMNO 2 ─── */}
      <rect x="318" y="127" width="28" height="47" rx="10" fill="#045f6c" opacity="0.62"/>
      <circle cx="332" cy="112" r="16" fill="#c89a5a"/>
      <path d="M316 108 Q316 96 332 96 Q348 96 348 108" fill="#2c1a0e"/>
      <path d="M318 157 L310 168" stroke="#043941" strokeWidth="12" strokeLinecap="round" opacity="0.2"/>
      <path d="M318 157 L310 168" stroke="#c89a5a" strokeWidth="8" strokeLinecap="round"/>
      <rect x="321" y="172" width="10" height="20" rx="4" fill="#144a5a"/>
      <rect x="333" y="172" width="10" height="20" rx="4" fill="#144a5a"/>

      {/* ─── MEDALLA (arriba derecha) ─── */}
      <circle cx="392" cy="60" r="44" fill="rgba(255,255,255,0.78)" stroke="#02d47e" strokeWidth="1.5"/>
      <circle cx="392" cy="60" r="35" fill="#f0faf5" stroke="#02d47e" strokeWidth="0.8" opacity="0.65"/>
      <path d="M373 96 L382 86 L392 96 L402 86 L411 96" stroke="#02d47e" strokeWidth="2.5" fill="none" opacity="0.5"/>
      <polygon points="392,34 398,50 415,50 402,60 407,77 392,67 377,77 382,60 369,50 386,50" fill="#fde047" opacity="0.9"/>
      <rect x="380" y="82" width="24" height="3" rx="1.5" fill="#02d47e" opacity="0.44"/>
      {/* Destellos */}
      <line x1="392" y1="9" x2="392" y2="3" stroke="#fde047" strokeWidth="2" opacity="0.38"/>
      <line x1="421" y1="27" x2="426" y2="21" stroke="#fde047" strokeWidth="2" opacity="0.32"/>
      <line x1="363" y1="27" x2="358" y2="21" stroke="#fde047" strokeWidth="2" opacity="0.32"/>

      {/* Puntos decorativos */}
      <circle cx="16" cy="238" r="4" fill="#02d47e" opacity="0.12"/>
      <circle cx="8" cy="224" r="3" fill="#02d47e" opacity="0.08"/>
      <circle cx="426" cy="232" r="4" fill="#02d47e" opacity="0.1"/>
      <circle cx="434" cy="248" r="3" fill="#02d47e" opacity="0.07"/>
    </svg>
  )
}

const TALLER_SVG: Record<string, React.ReactNode> = {
  'mecanica-automotriz':      <SvgAutomotriz />,
  'ebanisteria':              <SvgEbanisteria />,
  'electricidad':             <SvgElectricidad />,
  'electronica':              <SvgElectronica />,
  'industria-alimentaria':    <SvgIndustriaAlimentaria />,
  'cocina-reposteria':        <SvgCocinaReposteria />,
  'construcciones-metalicas': <SvgConstruccionesMetalicas />,
  'taller-general-ept':       <SvgEptGeneral />,
  'industria-vestido':        <SvgIndustriaVestido />,
  'computacion-informatica':  <SvgComputacion />,
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

        {/* Blob accent */}
        <div className="absolute pointer-events-none" style={{
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(2,212,126,0.14) 0%, transparent 65%)',
          right: -60, top: -80,
        }}/>

        {/* SVG ilustración — full bleed con CSS override */}
        {TALLER_SVG[slug] && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden [&_svg]:w-full [&_svg]:h-full"
            style={{ opacity: 0.30 }}>
            {TALLER_SVG[slug]}
          </div>
        )}

        {/* Gradient izquierdo para legibilidad del texto */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(100deg, rgba(4,57,65,0.97) 0%, rgba(4,57,65,0.88) 38%, rgba(4,57,65,0.55) 62%, rgba(4,57,65,0.1) 100%)',
        }}/>

        {/* Contenido */}
        <div className="relative z-10 px-8 pt-10 pb-12" style={{ maxWidth: 860 }}>

          {/* Overline badge */}
          <div className="inline-flex items-center gap-2 mb-3" style={{
            background: 'rgba(2,212,126,0.12)', border: '1px solid rgba(2,212,126,0.22)',
            borderRadius: 100, padding: '4px 12px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#02d47e', display: 'inline-block', flexShrink: 0 }}/>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em' }}>
              T{String(taller.numero).padStart(2,'0')} · TALLER EPT
            </span>
          </div>

          {/* Título + descripción */}
          <h1 className="font-extrabold leading-tight mb-3"
            style={{ fontSize: 'clamp(1.5rem,2.8vw,2.2rem)', letterSpacing: '-0.02em', color: '#ffffff' }}>
            {taller.nombre}
          </h1>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 480 }}>
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
                  style={{ background: 'rgba(2,212,126,0.1)', border: '1px solid rgba(2,212,126,0.18)' }}>
                  <s.icon size={15} color="#02d47e"/>
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#ffffff' }}>{s.value}</p>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.sub}</p>
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
          <div className="px-8 py-10">

            {/* Header con descripción */}
            <div className="mb-8">
              <p className="text-[11px] font-extrabold uppercase tracking-widest mb-2"
                style={{ color: '#02d47e' }}>
                Lo que lograrás
              </p>
              <h2 className="text-xl font-extrabold mb-3" style={{ color: '#043941' }}>
                Competencias que desarrollarás
              </h2>
              {taller.descripcion && (
                <p className="text-sm leading-relaxed max-w-2xl"
                  style={{ color: 'rgba(4,57,65,0.52)', lineHeight: 1.75 }}>
                  {taller.descripcion}
                </p>
              )}
            </div>

            {/* Layout: competencias + ilustración */}
            <div className="grid lg:grid-cols-[3fr_2fr] gap-10 items-center">

              {/* Competencias como tarjetas numeradas */}
              <div className="grid sm:grid-cols-2 gap-3">
                {taller.competencias.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: '#f4faf8', border: '1px solid rgba(4,57,65,0.06)' }}>
                    <span className="leading-none shrink-0 mt-0.5"
                      style={{
                        fontSize: 22, fontWeight: 800, lineHeight: 1,
                        color: 'rgba(2,212,126,0.28)',
                        fontFamily: "'DM Mono', monospace",
                      }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold leading-snug"
                      style={{ color: '#043941', lineHeight: 1.55 }}>
                      {c}
                    </span>
                  </div>
                ))}
              </div>

              {/* Ilustración docente */}
              <div className="hidden lg:block">
                <SvgDocente />
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

          {/* Módulos como cards horizontales — solo informativos */}
          <div className="px-4 pb-2">
            {modulosLXP.map((m, i) => (
              <div
                key={m.id}
                className="flex items-center gap-4 px-3 py-3 rounded-xl"
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
