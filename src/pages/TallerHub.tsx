// src/pages/TallerHub.tsx
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { Package, ArrowRight } from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { useProgress } from '@/contexts/ProgressContext'
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

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
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
  const { getEstadoModuloLXP, getModuloProgreso } = useProgress()

  const compHeaderReveal = useReveal()
  const compGridReveal   = useReveal(0.08)
  const rutaReveal       = useReveal()
  const repoReveal       = useReveal()

  if (!taller || !slug) return null

  const todosLos     = getBienesByTaller(slug)
  const totalHoras   = modulosLXP.reduce((a, m) => a + m.horasTotal, 0)
  const isGeneralEpt = slug === 'taller-general-ept'
  const tallerColor  = `hsl(${taller.color})`
  const { head, tail } = splitNombre(taller.nombre)

  // Módulo activo: primero en_curso, sino primer disponible
  const currentMod =
    modulosLXP.find(m => getEstadoModuloLXP(m.id) === 'en_curso') ??
    modulosLXP.find(m => getEstadoModuloLXP(m.id) === 'disponible') ??
    modulosLXP[0]
  const currentModPct = getModuloProgreso(slug, currentMod.numero)

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

      {/* ══ TOP INFO BAR ══════════════════════════════════════════════════════ */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(4,57,65,0.08)' }}>
        <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Izquierda: icono + nombre + descripción */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: `${tallerColor}18`, border: `1.5px solid ${tallerColor}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
            }}>
              {taller.icon ?? '🔧'}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <h1 style={{ fontSize: 20, fontWeight: 900, color: '#043941', margin: 0, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                  {taller.nombre}
                </h1>
                <span style={{
                  background: tallerColor, color: '#fff',
                  fontSize: 10, fontWeight: 800, padding: '2px 8px',
                  borderRadius: 100, letterSpacing: '.05em', flexShrink: 0,
                }}>
                  T{String(taller.numero).padStart(2, '0')}
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 480 }}>
                {taller.competencias?.slice(0, 3).join(' · ')}
              </p>
            </div>
          </div>

          {/* Derecha: stats + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexShrink: 0 }}>
            {!isGeneralEpt && (
              <>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: '#043941', margin: 0, lineHeight: 1 }}>{modulosLXP.length}</p>
                  <p style={{ fontSize: 10, color: '#94a3b8', margin: '3px 0 0', fontWeight: 600, letterSpacing: '.04em' }}>módulos</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: '#043941', margin: 0, lineHeight: 1 }}>{totalHoras}h</p>
                  <p style={{ fontSize: 10, color: '#94a3b8', margin: '3px 0 0', fontWeight: 600, letterSpacing: '.04em' }}>totales</p>
                </div>
              </>
            )}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#043941', margin: 0, lineHeight: 1 }}>{todosLos.length}</p>
              <p style={{ fontSize: 10, color: '#94a3b8', margin: '3px 0 0', fontWeight: 600, letterSpacing: '.04em' }}>bienes</p>
            </div>
            {/* divider */}
            <div style={{ width: 1, height: 32, background: 'rgba(4,57,65,0.08)' }} />
            {!isGeneralEpt && (
              <button
                onClick={() => navigate(`/taller/${slug}/ruta`)}
                style={{
                  background: '#043941', color: '#02d47e', border: 'none',
                  borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 800,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
                  fontFamily: 'inherit', whiteSpace: 'nowrap',
                  transition: 'opacity .18s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Ver ruta completa <ArrowRight size={14} />
              </button>
            )}
            <button
              onClick={() => navigate(`/taller/${slug}/repositorio`)}
              style={{
                background: 'none', color: 'rgba(4,57,65,0.55)',
                border: '1.5px solid rgba(4,57,65,0.13)', borderRadius: 12,
                padding: '10px 16px', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all .18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(4,57,65,0.05)'; e.currentTarget.style.color = '#043941' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(4,57,65,0.55)' }}
            >
              <Package size={13} /> Repositorio
            </button>
          </div>
        </div>
      </div>

      {/* ══ BANNER "CONTINÚA DONDE LO DEJASTE" ════════════════════════════════ */}
      {!isGeneralEpt && currentMod && (
        <div style={{ background: 'linear-gradient(135deg, #032e34 0%, #043941 100%)', borderBottom: '1px solid rgba(2,212,126,0.1)' }}>
          <div style={{ padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

            {/* Izquierda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: `${tallerColor}20`, border: `1.5px solid ${tallerColor}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>
                {currentMod.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(2,212,126,0.6)', margin: '0 0 3px' }}>
                  Continúa donde lo dejaste
                </p>
                <p style={{ fontSize: 15, fontWeight: 900, color: '#fff', margin: '0 0 2px', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  M{currentMod.numero} — {currentMod.nombre}
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', margin: 0 }}>
                  {currentMod.horasTotal}h · {currentMod.fase} · {currentMod.sesiones.length} sesiones
                </p>
              </div>
            </div>

            {/* Derecha */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', margin: '0 0 1px', fontWeight: 600 }}>
                  Progreso M{currentMod.numero}
                </p>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#02d47e', margin: 0, lineHeight: 1 }}>
                  {currentModPct.porcentaje}%
                </p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', margin: '2px 0 0' }}>
                  {currentModPct.completados} de {currentModPct.total} actividades
                </p>
              </div>
              <button
                onClick={() => navigate(`/taller/${slug}/ruta/modulo/${currentMod.numero}`)}
                style={{
                  background: '#02d47e', color: '#043941', border: 'none',
                  borderRadius: 12, padding: '11px 22px', fontSize: 13, fontWeight: 800,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
                  fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'opacity .18s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Continuar <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ COMPETENCIAS ══════════════════════════════════════════════════════ */}
      {taller.competencias?.length > 0 && (
        <div style={{ background: '#ffffff', borderBottom: '1px solid rgba(4,57,65,0.06)' }}>
          <div className="px-8 pb-10 pt-2">

            <div
              ref={compHeaderReveal.ref}
              className="mb-8"
              style={{ opacity: compHeaderReveal.visible ? 1 : 0, transform: compHeaderReveal.visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.55s ease, transform 0.55s ease' }}
            >
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
            <div
              ref={compGridReveal.ref}
              className="grid sm:grid-cols-2 gap-3"
              style={{ opacity: compGridReveal.visible ? 1 : 0, transform: compGridReveal.visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s' }}
            >
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
          <div
            ref={rutaReveal.ref}
            style={{ opacity: rutaReveal.visible ? 1 : 0, transform: rutaReveal.visible ? 'none' : 'translateY(28px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
          <div className="bg-white overflow-hidden"
            style={{ borderRadius: 20, boxShadow: '0 4px 20px rgba(4,57,65,.08)' }}>
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
          </div>
        )}

        {/* ── EQUIPAMIENTO DEL TALLER ── */}
        <div
          ref={repoReveal.ref}
          style={{ opacity: repoReveal.visible ? 1 : 0, transform: repoReveal.visible ? 'none' : 'translateY(28px)', transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s' }}
        >
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
