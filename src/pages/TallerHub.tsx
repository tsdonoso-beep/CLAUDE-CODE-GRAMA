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

// ── Shapes geométricas por categoría — mismo lenguaje que Perfil hero ─────────
function TallerHeroShapes({ slug, color }: { slug: string; color: string }) {
  const p = { position: 'absolute' as const, pointerEvents: 'none' as const }
  const isIndustrial = ['mecanica-automotriz','electricidad','electronica','computacion-informatica'].includes(slug)
  const isArtesanal  = ['ebanisteria','construcciones-metalicas','industria-alimentaria'].includes(slug)
  // resto → servicios

  return (
    <>
      {/* Base compartido — triángulo grande derecha */}
      <div style={{ ...p, top:-220, right:'-4%', width:520, height:520, background: color, clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:.11, animation:'heroFa 16s ease-in-out infinite' }} />
      <div style={{ ...p, top:-90, right:'3%', width:240, height:240, background:'#0b4a56', clipPath:'polygon(50% 0%,100% 100%,0% 100%)', opacity:.2, animation:'heroFa 16s ease-in-out infinite .5s' }} />
      <div style={{ ...p, top:'20%', right:-140, width:360, height:300, background: color, clipPath:'polygon(100% 50%,0% 0%,0% 100%)', opacity:.08, animation:'heroFc 14s ease-in-out infinite .5s' }} />

      {isIndustrial && <>
        {/* Barra vertical + cruz giratoria */}
        <div style={{ ...p, top:-55, right:'28%', width:90, height:240, background: color, borderRadius:'0 0 45px 45px', opacity:.18, animation:'heroFb 12s ease-in-out infinite 1s' }} />
        <div style={{ ...p, bottom:'8%', right:'6%', width:52, height:52, background: color, borderRadius:8, opacity:.26, animation:'heroFf 9s ease-in-out infinite 1.2s' }} />
        <div style={{ ...p, bottom:'20%', right:'4%', width:44, height:44, background:'#02d47e',
          clipPath:'polygon(38% 0%,62% 0%,62% 38%,100% 38%,100% 62%,62% 62%,62% 100%,38% 100%,38% 62%,0% 62%,0% 38%,38% 38%)',
          animation:'heroSpin 20s linear infinite', opacity:.55 }} />
      </>}

      {isArtesanal && <>
        {/* Flecha lateral + diamante */}
        <div style={{ ...p, top:'38%', right:-80, width:190, height:270, background: color, clipPath:'polygon(0% 50%,100% 0%,100% 100%)', opacity:.12, animation:'heroFe 13s ease-in-out infinite 2s' }} />
        <div style={{ ...p, bottom:-70, right:'30%', width:150, height:150, background: color, transform:'rotate(45deg)', borderRadius:16, opacity:.18, animation:'heroFd 15s ease-in-out infinite 1s' }} />
        <div style={{ ...p, top:'10%', right:'15%', width:48, height:48, background:'#f8ee91', borderRadius:6, opacity:.28, animation:'heroFf 11s ease-in-out infinite 2s' }} />
      </>}

      {!isIndustrial && !isArtesanal && <>
        {/* Servicios: barras rítmicas + círculo */}
        <div style={{ ...p, top:-60, right:'27%', width:76, height:250, background: color, borderRadius:'0 0 38px 38px', opacity:.2, animation:'heroFb 11s ease-in-out infinite 1s' }} />
        <div style={{ ...p, top:-30, right:'20%', width:48, height:175, background:'#f8ee91', borderRadius:'0 0 24px 24px', opacity:.2, animation:'heroFb 14s ease-in-out infinite 2s' }} />
        <div style={{ ...p, top:'12%', right:'8%', width:40, height:40, background: color, borderRadius:'50%', opacity:.2, animation:'heroFd 10s ease-in-out infinite .5s' }} />
      </>}
    </>
  )
}

// ── Splitting de nombre: primera palabra + resto ───────────────────────────────
function splitNombre(nombre: string) {
  const idx = nombre.indexOf(' ')
  if (idx === -1) return { head: '', tail: nombre }
  return { head: nombre.slice(0, idx), tail: nombre.slice(idx + 1) }
}

export default function TallerHub() {
  const { taller, slug } = useTaller()
  const navigate = useNavigate()

  if (!taller || !slug) return null

  const todosLos    = getBienesByTaller(slug)
  const totalHoras  = modulosLXP.reduce((a, m) => a + m.horasTotal, 0)
  const isGeneralEpt = slug === 'taller-general-ept'
  const tallerColor  = `hsl(${taller.color})`
  const { head, tail } = splitNombre(taller.nombre)

  const bienesporZona = taller.zonas.slice(0, 3).map(z => {
    const items = todosLos
      .filter(b => b.zona?.toLowerCase().includes(z.id.toLowerCase()) || b.zona?.toLowerCase().includes(z.nombre.toLowerCase().split(' ').pop()!.toLowerCase()))
      .filter(b => b.tipo === 'EQUIPOS' || b.tipo === 'HERRAMIENTAS')
      .slice(0, 4)
    return { zona: z.nombre, items }
  }).filter(z => z.items.length > 0)

  const bienesFallback = todosLos.filter(b => b.tipo === 'EQUIPOS').slice(0, 8)

  return (
    <div style={{ background: '#f0faf5', fontFamily: 'Manrope, sans-serif' }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ minHeight: 500 }}>

        {/* Fondo oscuro gradiente */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg,#043941 0%,#045f6c 60%,rgba(0,193,110,0.08) 100%)',
        }} />

        {/* Patrón GRAMA */}
        <div className="absolute inset-0 grama-pattern opacity-20" />

        {/* SVG ilustración — como watermark al fondo */}
        {TALLER_SVG[slug] && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden [&_svg]:w-full [&_svg]:h-full"
            style={{ opacity: 0.18 }}>
            {TALLER_SVG[slug]}
          </div>
        )}

        {/* Shapes geométricas por categoría */}
        <TallerHeroShapes slug={slug} color={tallerColor} />

        {/* Gradiente izquierdo para legibilidad */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(105deg, rgba(4,57,65,0.98) 0%, rgba(4,57,65,0.90) 40%, rgba(4,57,65,0.55) 70%, rgba(4,57,65,0.05) 100%)',
        }} />

        {/* Contenido */}
        <div className="relative z-10 px-8 pt-14 pb-24" style={{ maxWidth: 780 }}>

          {/* Badge taller */}
          <div className="inline-flex items-center gap-2 mb-8"
            style={{ background: 'rgba(2,212,126,0.12)', border: '1px solid rgba(2,212,126,0.28)', borderRadius: 100, padding: '6px 14px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#02d47e', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '.65rem', fontWeight: 800, letterSpacing: '.18em', color: '#02d47e', textTransform: 'uppercase' as const }}>
              T{String(taller.numero).padStart(2, '0')} · Taller EPT
            </span>
          </div>

          {/* Título dos líneas */}
          <h1 className="font-extrabold leading-tight mb-5" style={{ letterSpacing: '-0.02em' }}>
            {head && (
              <span className="block" style={{ fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', color: '#ffffff', marginBottom: 8 }}>
                {head}
              </span>
            )}
            <span className="inline-block" style={{
              fontSize: 'clamp(2.2rem,4.5vw,3.4rem)',
              color: '#032e34',
              background: '#02d47e',
              padding: '2px 22px 6px',
              borderRadius: 10,
              lineHeight: 1.25,
            }}>
              {tail || head}
            </span>
          </h1>

          {/* Descripción */}
          <p className="text-sm leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 480 }}>
            {taller.descripcion}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              !isGeneralEpt && { icon: BookOpen, value: `${modulosLXP.length} módulos`, sub: 'M0 → M6' },
              !isGeneralEpt && { icon: Clock,    value: `${totalHoras}h`,               sub: 'Virtual + Presencial' },
              { icon: Package, value: `${todosLos.length} bienes`,     sub: `${taller.zonas.length} zonas` },
              { icon: Award,   value: 'Constancia',                    sub: 'Inroprin' },
            ].filter(Boolean).map(s => (
              <div key={s.value} className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(2,212,126,0.1)', border: '1px solid rgba(2,212,126,0.18)' }}>
                  <s.icon size={15} color="#02d47e" />
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
            {!isGeneralEpt && (
              <button
                onClick={() => navigate(`/taller/${slug}/ruta`)}
                className="flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: '#02d47e', color: '#043941', borderRadius: 100, boxShadow: '0 6px 22px rgba(2,212,126,.4)' }}
              >
                <BookOpen size={14} />
                Iniciar Ruta de Aprendizaje
                <ChevronRight size={14} />
              </button>
            )}
            <button
              onClick={() => navigate(`/taller/${slug}/repositorio`)}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all active:scale-[0.98]"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 100 }}
            >
              <Package size={14} />
              Ver Repositorio
            </button>
          </div>
        </div>

        {/* Transición suave al blanco — hoja redondeada */}
        <div className="absolute bottom-0 left-0 right-0" style={{
          height: 48,
          background: '#ffffff',
          borderRadius: '32px 32px 0 0',
        }} />
      </div>

      {/* ══ COMPETENCIAS ══════════════════════════════════════════════════════ */}
      {taller.competencias?.length > 0 && (
        <div style={{ background: '#ffffff', borderBottom: '1px solid rgba(4,57,65,0.06)' }}>
          <div className="px-8 pb-10 pt-2">

            <div className="mb-8">
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:12 }}>
                <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
                Lo que lograrás
              </span>
              <h2 className="text-xl font-extrabold mb-2" style={{ color: '#043941' }}>
                Competencias que desarrollarás
              </h2>
              {taller.descripcion && (
                <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'rgba(4,57,65,0.5)', lineHeight: 1.75 }}>
                  {taller.descripcion}
                </p>
              )}
            </div>

            {/* Grid de competencias con borde de acento */}
            <div className="grid sm:grid-cols-2 gap-3">
              {taller.competencias.map((c, i) => (
                <CompetenciaCard key={i} index={i} text={c} color={tallerColor} />
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ══ RUTA + REPOSITORIO ════════════════════════════════════════════════ */}
      <div className={`px-8 py-10 grid gap-8 items-start ${isGeneralEpt ? '' : 'lg:grid-cols-[3fr_2fr]'}`}>

        {/* ── RUTA DE APRENDIZAJE ── */}
        {!isGeneralEpt && (
          <div className="bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 2px 16px rgba(4,57,65,0.07)' }}>
            <div
              className="px-6 pt-6 pb-3 flex items-center justify-between cursor-pointer group"
              onClick={() => navigate(`/taller/${slug}/ruta`)}
            >
              <div>
                <p style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:4 }}>
                  <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
                  Tu camino de aprendizaje
                </p>
                <h2 className="text-lg font-extrabold" style={{ color: '#043941' }}>
                  {modulosLXP.length} módulos · {totalHoras}h de formación
                </h2>
              </div>
              <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                style={{ background: '#02d47e' }}>
                <ChevronRight size={15} color="#043941" />
              </div>
            </div>

            <div className="px-4 pb-2">
              {modulosLXP.map((m, i) => (
                <div key={m.id} className="flex items-center gap-4 px-3 py-3 rounded-xl">
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

            {/* CTA footer ruta */}
            <div className="px-6 pb-5 pt-2">
              <button
                onClick={() => navigate(`/taller/${slug}/ruta`)}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: '#02d47e', color: '#043941', borderRadius: 100, boxShadow: '0 4px 14px rgba(2,212,126,.35)' }}
              >
                Ver ruta completa
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ── EQUIPAMIENTO DEL TALLER ── */}
        <div className="bg-white overflow-hidden"
          style={{ borderRadius: 20, boxShadow: '0 4px 20px rgba(4,57,65,.08)' }}>
          <div
            className="px-6 pt-6 pb-4 flex items-center justify-between cursor-pointer group"
            onClick={() => navigate(`/taller/${slug}/repositorio`)}
          >
            <div>
              <p style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'.72rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#02d47e', marginBottom:4 }}>
                <span style={{ display:'inline-block', height:1, width:32, background:'#02d47e' }} />
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
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: tallerColor }} />
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

          <div className="px-6 pb-5">
            <button
              onClick={() => navigate(`/taller/${slug}/repositorio`)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'rgba(4,57,65,0.05)', color: '#043941', border: '1.5px solid rgba(4,57,65,0.12)', borderRadius: 100 }}
            >
              Ver repositorio completo
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Competencia card con borde de acento y hover ───────────────────────────────
function CompetenciaCard({ index, text, color }: { index: number; text: string; color: string }) {
  return (
    <div
      className="flex items-start gap-4 p-4 transition-all duration-200 cursor-default"
      style={{
        borderRadius: 20,
        background: '#fafffe',
        border: '1px solid rgba(4,57,65,0.07)',
        borderLeft: `4px solid ${color}`,
        boxShadow: '0 4px 20px rgba(4,57,65,.08)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(4,57,65,0.13)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'none'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(4,57,65,.08)'
      }}
    >
      <span style={{
        fontSize: 26, fontWeight: 800, lineHeight: 1, flexShrink: 0, marginTop: 2,
        color: color,
        fontFamily: "'DM Mono', 'Courier New', monospace",
        opacity: 0.55,
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="text-sm font-semibold leading-snug" style={{ color: '#043941', lineHeight: 1.6 }}>
        {text}
      </span>
    </div>
  )
}
