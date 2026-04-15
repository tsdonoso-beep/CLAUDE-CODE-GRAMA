// src/pages/TallerHub.tsx
import { useNavigate } from 'react-router-dom'
import { BookOpen, Package, ChevronRight, Clock, Award, Wrench } from 'lucide-react'
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
    <div>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ minHeight: 260 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${taller.imagen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.55) saturate(0.85)',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(4,57,65,0.5) 0%, rgba(3,14,18,0.92) 100%)' }} />
        <div className="absolute inset-0 grama-pattern opacity-30" />

        <div className="relative z-10 px-8 py-10 max-w-5xl mx-auto">
          <span
            className="inline-block text-xs font-extrabold px-3 py-1 rounded-full mb-4"
            style={{ background: `hsl(${taller.color})`, color: '#fff' }}
          >
            T{String(taller.numero).padStart(2, '0')} · Taller EPT
          </span>
          <h1 className="text-h1 font-extrabold text-white mb-3 leading-tight">
            {taller.nombre}
          </h1>
          <p className="text-sm max-w-xl leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {taller.descripcion}
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: BookOpen, value: '7 módulos',  sub: 'M0 → M6' },
              { icon: Clock,    value: `${totalHoras}h`, sub: 'A + S + Presencial' },
              { icon: Award,    value: 'Constancia',  sub: 'Inroprin' },
            ].map(s => (
              <div key={s.value} className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(2,212,126,0.14)' }}>
                  <s.icon size={15} color="#02d47e" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{s.value}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTAs ── */}
      <div className="px-8 py-4 flex flex-wrap gap-3" style={{ background: '#f4f8f9', borderBottom: '1px solid rgba(4,57,65,0.07)' }}>
        <button
          onClick={() => navigate(`/taller/${slug}/ruta`)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, #02d47e, #00c16e)', color: '#032e34' }}
        >
          <BookOpen size={14} />
          Iniciar Ruta de Aprendizaje
          <ChevronRight size={13} />
        </button>
        <button
          onClick={() => navigate(`/taller/${slug}/repositorio`)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
          style={{ background: '#ffffff', color: 'var(--grama-oscuro)', border: '1.5px solid rgba(4,57,65,0.14)', boxShadow: '0 2px 8px rgba(4,57,65,0.06)' }}
        >
          <Package size={14} />
          Ver Repositorio
          <ChevronRight size={13} />
        </button>
      </div>

      {/* ── Contenido ── */}
      <div className="p-6 max-w-5xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-8 items-start" style={{ background: '#f4f8f9' }}>

        {/* Columna izquierda */}
        <div className="space-y-6">

          {/* Competencias */}
          {taller.competencias?.length > 0 && (
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 12px rgba(4,57,65,0.06)' }}>
              <p className="overline-label font-extrabold mb-4 flex items-center gap-2" style={{ color: 'var(--grama-menta)' }}>
                <svg width={11} height={11} viewBox="0 0 11 11" fill="none">
                  <path d="M2 5.5L4.2 7.8L9 2.5" stroke="#02d47e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Competencias que desarrollarás
              </p>
              <div className="grid grid-cols-2 gap-2">
                {taller.competencias.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 px-3 py-2.5 rounded-xl" style={{ background: '#f0faf5' }}>
                    <span className="h-1.5 w-1.5 rounded-full shrink-0 mt-1.5" style={{ background: '#02d47e' }} />
                    <span className="text-xs leading-snug font-medium" style={{ color: 'var(--grama-oscuro)' }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ruta de aprendizaje */}
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 12px rgba(4,57,65,0.06)' }}>
            <p className="overline-label font-extrabold mb-4 flex items-center gap-2" style={{ color: 'var(--grama-menta)' }}>
              <BookOpen size={11} />
              Ruta de aprendizaje · 7 módulos · {totalHoras}h
            </p>
            <div className="space-y-2">
              {modulosLXP.map((m, i) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors"
                  style={{ background: '#f4fdf9', cursor: 'pointer' }}
                  onClick={() => navigate(`/taller/${slug}/ruta`)}
                >
                  <span
                    className="h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0"
                    style={{ background: 'var(--grama-oscuro)', color: '#02d47e' }}
                  >
                    {i}
                  </span>
                  <span className="text-xs font-semibold flex-1 leading-snug" style={{ color: 'var(--grama-oscuro)' }}>
                    {m.nombre}
                  </span>
                  <span className="text-[11px] font-medium shrink-0" style={{ color: '#94a3b8' }}>
                    {m.horasTotal}h
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate(`/taller/${slug}/ruta`)}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, #02d47e, #00c16e)', color: '#032e34' }}
            >
              Ir a la Ruta de Aprendizaje <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* Columna derecha: equipamiento */}
        {bienes.length > 0 && (
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 12px rgba(4,57,65,0.06)' }}>
            <p className="overline-label font-extrabold mb-4 flex items-center gap-2" style={{ color: 'var(--grama-menta)' }}>
              <Wrench size={11} />
              Equipamiento representativo
            </p>
            <div className="flex flex-wrap gap-2">
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
              className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.01]"
              style={{ background: '#ffffff', color: 'var(--grama-oscuro)', border: '1.5px solid rgba(4,57,65,0.14)' }}
            >
              <Package size={13} />
              Ver Repositorio completo <ChevronRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
