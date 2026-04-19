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

        {/* SVG ilustración del taller */}
        {TALLER_SVG[slug] && (
          <div className="absolute inset-y-0 right-0 pointer-events-none overflow-hidden"
            style={{ width: '55%', opacity: 0.38 }}>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', height: '100%' }}>
              {TALLER_SVG[slug]}
            </div>
          </div>
        )}

        {/* Tangram decorativo */}
        <Tangram color="#02d47e" opacity={0.09} rotate={15}
          className="absolute float-a"
          style={{ width: 220, height: 220, top: -20, right: 320 }}
        />

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

              {/* Banner ilustrado */}
              {TALLER_SVG[slug] ? (
                <div style={{ height: 140, overflow: 'hidden' }}>
                  {TALLER_SVG[slug]}
                </div>
              ) : (
                <div style={{ height: 10, background: `hsl(${taller.color})` }} />
              )}

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
