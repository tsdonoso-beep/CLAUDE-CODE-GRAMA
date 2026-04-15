// src/pages/TallerHub.tsx
import { useNavigate } from 'react-router-dom'
import { BookOpen, Package, ChevronRight, Clock, Award, Wrench, CheckCircle2, ArrowRight } from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { modulosLXP } from '@/data/modulosLXP'
import { getBienesByTaller } from '@/data/bienesData'

export default function TallerHub() {
  const { taller, slug } = useTaller()
  const navigate = useNavigate()

  if (!taller || !slug) return null

  const todosLos     = getBienesByTaller(slug)
  const equiposInnov = todosLos.filter(b => b.tipo === 'EQUIPOS' && b.zona.includes('INNOVA'))
  const equiposResto = todosLos.filter(b => b.tipo === 'EQUIPOS' && !b.zona.includes('INNOVA'))
  const bienes       = [...equiposInnov, ...equiposResto].slice(0, 12)
  const totalHoras   = modulosLXP.reduce((a, m) => a + m.horasTotal, 0)

  return (
    <div style={{ background: '#f4f8f9' }}>

      {/* ── Hero full-bleed ── */}
      <div className="relative overflow-hidden" style={{ minHeight: 252 }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${taller.imagen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.45) saturate(0.75)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(110deg, rgba(3,14,18,0.97) 38%, rgba(4,57,65,0.72) 100%)',
        }} />
        <div className="absolute inset-0 grama-pattern opacity-20" />

        <div className="relative z-10 px-8 py-10 flex items-end justify-between gap-8 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-block text-xs font-extrabold px-3 py-1 rounded-full"
                style={{ background: `hsl(${taller.color})`, color: '#fff' }}>
                T{String(taller.numero).padStart(2, '0')} · Taller EPT
              </span>
              <span className="text-[11px] font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Programa Formativo MINEDU
              </span>
            </div>
            <h1 className="text-h1 font-extrabold text-white mb-2 leading-tight">
              {taller.nombre}
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 500 }}>
              {taller.descripcion}
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-5 shrink-0">
            {[
              { icon: BookOpen, value: '7 módulos',      sub: 'M0 → M6' },
              { icon: Clock,    value: `${totalHoras}h`, sub: 'Virtual + Presencial' },
              { icon: Award,    value: 'Constancia',     sub: 'Inroprin' },
            ].map(s => (
              <div key={s.value} className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(2,212,126,0.12)', border: '1px solid rgba(2,212,126,0.18)' }}>
                  <s.icon size={15} color="#02d47e" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{s.value}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: 32 }}>
            <path d="M0,16 C480,36 960,0 1440,20 L1440,32 L0,32 Z" fill="#f4f8f9" />
          </svg>
        </div>
      </div>

      {/* ── Contenido: main [2fr] + sidebar [1fr] ── */}
      <div className="p-6 grid lg:grid-cols-[2fr_1fr] gap-6 items-start">

        {/* ── Columna principal — historia ── */}
        <div className="space-y-5">

          {/* 1. Competencias — lo que lograrás */}
          {taller.competencias?.length > 0 && (
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 14px rgba(4,57,65,0.07)' }}>
              <p className="overline-label font-extrabold mb-1" style={{ color: 'var(--grama-menta)' }}>
                Lo que lograrás
              </p>
              <h2 className="text-h3 font-extrabold mb-5" style={{ color: 'var(--grama-oscuro)' }}>
                Competencias que desarrollarás
              </h2>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {taller.competencias.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl transition-all"
                    style={{ background: '#f0faf5', border: '1px solid rgba(2,212,126,0.1)' }}>
                    <div className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(2,212,126,0.15)' }}>
                      <CheckCircle2 size={13} color="#02d47e" />
                    </div>
                    <span className="text-xs leading-snug font-medium" style={{ color: 'var(--grama-oscuro)' }}>
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Ruta de aprendizaje — tu camino */}
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 14px rgba(4,57,65,0.07)' }}>
            <p className="overline-label font-extrabold mb-1" style={{ color: 'var(--grama-menta)' }}>
              Tu camino
            </p>
            <h2 className="text-h3 font-extrabold mb-5" style={{ color: 'var(--grama-oscuro)' }}>
              {modulosLXP.length} módulos · {totalHoras}h de formación
            </h2>

            <div className="relative">
              {/* Línea vertical conectora */}
              <div className="absolute top-5 bottom-5 w-px"
                style={{
                  left: 19,
                  background: 'linear-gradient(180deg, #02d47e 0%, rgba(2,212,126,0.08) 100%)',
                }} />

              <div className="space-y-1">
                {modulosLXP.map((m, i) => {
                  const isFirst = i === 0
                  return (
                    <div
                      key={m.id}
                      onClick={() => navigate(`/taller/${slug}/ruta`)}
                      className="relative flex items-center gap-4 py-2.5 pr-3 rounded-xl cursor-pointer transition-all hover:bg-[#f0fdf9] group"
                      style={{ paddingLeft: '6px' }}
                    >
                      {/* Nodo */}
                      <div
                        className="h-[38px] w-[38px] rounded-full flex items-center justify-center text-base shrink-0 z-10 transition-all group-hover:scale-105"
                        style={{
                          background: isFirst ? 'var(--grama-oscuro)' : 'rgba(4,57,65,0.07)',
                          border: isFirst ? 'none' : '1.5px solid rgba(4,57,65,0.12)',
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{m.icon}</span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold tabular-nums"
                            style={{ color: isFirst ? '#02d47e' : 'rgba(4,57,65,0.3)' }}>
                            M{m.numero}
                          </span>
                          <p className="text-xs font-bold leading-snug truncate" style={{ color: 'var(--grama-oscuro)' }}>
                            {m.nombre}
                          </p>
                        </div>
                        <p className="text-[11px] mt-0.5" style={{ color: '#94a3b8' }}>
                          {m.horasTotal}h
                          {m.horasAsincrono > 0 && ' · Virtual'}
                          {m.horasSincrono > 0 && ' · En vivo'}
                          {m.horasPresencial > 0 && ' · Presencial'}
                        </p>
                      </div>

                      <ArrowRight
                        size={13}
                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: '#02d47e' }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              onClick={() => navigate(`/taller/${slug}/ruta`)}
              className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all hover:opacity-90 active:scale-[0.99]"
              style={{ background: 'linear-gradient(90deg, #02d47e, #00c16e)', color: '#032e34' }}
            >
              <BookOpen size={13} />
              Ver ruta completa
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* ── Sidebar derecho — acción y recursos ── */}
        <div className="space-y-4">

          {/* CTA card — comienza aquí */}
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(4,57,65,0.11)' }}>
            <div className="px-5 pt-5 pb-4" style={{
              background: 'linear-gradient(145deg, #030e12 0%, #043941 100%)',
            }}>
              <p className="overline-label mb-1.5" style={{ color: 'rgba(2,212,126,0.55)' }}>
                Comienza ahora
              </p>
              <p className="text-sm font-extrabold text-white leading-snug mb-1">
                Tu formación te espera
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {modulosLXP.length} módulos · {totalHoras}h totales
              </p>
            </div>
            <div className="p-4 space-y-2.5 bg-white">
              <button
                onClick={() => navigate(`/taller/${slug}/ruta`)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.99]"
                style={{ background: 'linear-gradient(90deg, #02d47e, #00c16e)', color: '#032e34' }}
              >
                <BookOpen size={14} />
                Iniciar Ruta de Aprendizaje
                <ChevronRight size={13} />
              </button>
              <button
                onClick={() => navigate(`/taller/${slug}/repositorio`)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: '#f4f8f9', color: 'var(--grama-oscuro)', border: '1.5px solid rgba(4,57,65,0.12)' }}
              >
                <Package size={14} />
                Ver Repositorio
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Equipamiento */}
          {bienes.length > 0 && (
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 12px rgba(4,57,65,0.06)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Wrench size={11} color="var(--grama-menta)" />
                <p className="overline-label font-extrabold" style={{ color: 'var(--grama-menta)' }}>
                  Trabajarás con
                </p>
              </div>
              <p className="text-sm font-extrabold mb-4" style={{ color: 'var(--grama-oscuro)' }}>
                Equipamiento representativo
              </p>
              <div className="flex flex-wrap gap-1.5">
                {bienes.map(b => (
                  <span
                    key={b.n}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                    style={{ background: '#e3f8fb', color: '#045f6c' }}
                  >
                    {b.nombre}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate(`/taller/${slug}/repositorio`)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.01]"
                style={{ background: '#f4f8f9', color: 'var(--grama-oscuro)', border: '1.5px solid rgba(4,57,65,0.12)' }}
              >
                <Package size={13} />
                Ver Repositorio completo
                <ChevronRight size={13} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
