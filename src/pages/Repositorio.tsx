// src/pages/Repositorio.tsx
import { useState, useMemo } from 'react'
import {
  Search, X, SlidersHorizontal, Package, Wrench, Sofa, BookOpen,
  HardHat, Factory, FileText, Video, Download, PlayCircle, ChevronRight,
} from 'lucide-react'
import { useTaller } from '@/hooks/useTaller'
import { RepositorioCard } from '@/components/lxp/RepositorioCard'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Bien = Record<string, any>
type Tab = 'catalogo' | 'manuales' | 'videos'

const TIPO_ICONS: Record<string, React.ElementType> = {
  EQUIPOS: Package, HERRAMIENTAS: Wrench, MOBILIARIO: Sofa,
  PEDAGOGICO: BookOpen, 'PRODUCCIÓN': Factory, SEGURIDAD: HardHat,
}

// Tipos que suelen tener manual/video relevante en taller
const TIPOS_CON_RECURSOS = ['EQUIPOS', 'HERRAMIENTAS', 'PRODUCCIÓN']

export default function Repositorio() {
  const { taller, bienes, totalBienes, slug } = useTaller()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('catalogo')
  const [busqueda, setBusqueda] = useState('')
  const [filtroZona, setFiltroZona] = useState('')
  const [filtroArea, setFiltroArea] = useState('')
  const [filtroSubarea, setFiltroSubarea] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [showFiltros, setShowFiltros] = useState(false)

  const zonas = useMemo(() =>
    [...new Set(bienes.map((b: Bien) => b.zona).filter(Boolean))].sort() as string[]
  , [bienes])

  const areas = useMemo(() =>
    [...new Set(
      bienes.filter((b: Bien) => !filtroZona || b.zona === filtroZona)
        .map((b: Bien) => b.area).filter(Boolean)
    )].sort() as string[]
  , [bienes, filtroZona])

  const subareas = useMemo(() =>
    [...new Set(
      bienes
        .filter((b: Bien) => (!filtroZona || b.zona === filtroZona) && (!filtroArea || b.area === filtroArea))
        .map((b: Bien) => b.subarea).filter(Boolean)
    )].sort() as string[]
  , [bienes, filtroZona, filtroArea])

  const tipos = useMemo(() =>
    [...new Set(bienes.map((b: Bien) => b.tipo).filter(Boolean))].sort() as string[]
  , [bienes])

  const bienesFiltered = useMemo(() =>
    bienes.filter((b: Bien) => {
      const q = busqueda.toLowerCase()
      return (
        (!q || b.nombre?.toLowerCase().includes(q) || b.marca?.toLowerCase().includes(q) ||
          b.modelo?.toLowerCase().includes(q) || b.codigoEntidad?.toLowerCase().includes(q)) &&
        (!filtroZona    || b.zona    === filtroZona) &&
        (!filtroArea    || b.area    === filtroArea) &&
        (!filtroSubarea || b.subarea === filtroSubarea) &&
        (!filtroTipo    || b.tipo    === filtroTipo)
      )
    })
  , [bienes, busqueda, filtroZona, filtroArea, filtroSubarea, filtroTipo])

  // Bienes con recursos relevantes (para manuales y videos)
  const bienesConRecursos = useMemo(() =>
    bienes.filter((b: Bien) => TIPOS_CON_RECURSOS.includes(b.tipo))
  , [bienes])

  if (!taller) return null

  const hayFiltros = busqueda || filtroZona || filtroArea || filtroSubarea || filtroTipo
  const activeCount = [filtroZona, filtroArea, filtroSubarea, filtroTipo].filter(Boolean).length
  const statsTipo = tipos.map(t => ({
    tipo: t, count: bienes.filter((b: Bien) => b.tipo === t).length, Icon: TIPO_ICONS[t] ?? Package,
  }))

  function resetFiltros() {
    setBusqueda(''); setFiltroZona(''); setFiltroArea(''); setFiltroSubarea(''); setFiltroTipo('')
  }

  return (
    <div style={{ background: '#f0fdf8', minHeight: '100vh' }}>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: '#043941' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #02d47e 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />
        </div>

        <div className="relative px-6 pt-10 pb-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#02d47e' }}>
            {taller.nombreCorto} · Repositorio
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 leading-tight">
            Recursos del Taller
          </h1>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {totalBienes} bienes catalogados · {zonas.length} zonas
          </p>

          {/* Search hero — solo visible en tab catálogo */}
          {tab === 'catalogo' && (
            <div className="relative max-w-xl mb-5">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#02d47e' }} />
              <input
                type="text"
                placeholder="Busca por nombre, marca, modelo o código…"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-sm font-medium outline-none"
                style={{
                  background: 'rgba(255,255,255,0.08)', color: '#ffffff',
                  border: '1.5px solid rgba(2,212,126,0.3)',
                }}
                onFocus={e => (e.target.style.borderColor = '#02d47e')}
                onBlur={e => (e.target.style.borderColor = 'rgba(2,212,126,0.3)')}
              />
              {busqueda && (
                <button onClick={() => setBusqueda('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* Chips de tipo — rápido filtro */}
          {tab === 'catalogo' && (
            <div className="flex flex-wrap gap-2">
              {statsTipo.map(({ tipo, count, Icon }) => (
                <button
                  key={tipo}
                  onClick={() => setFiltroTipo(filtroTipo === tipo ? '' : tipo)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: filtroTipo === tipo ? '#02d47e' : 'rgba(255,255,255,0.08)',
                    color: filtroTipo === tipo ? '#043941' : 'rgba(255,255,255,0.7)',
                    border: `1.5px solid ${filtroTipo === tipo ? '#02d47e' : 'rgba(255,255,255,0.12)'}`,
                  }}
                >
                  <Icon size={11} />
                  {tipo.charAt(0) + tipo.slice(1).toLowerCase()}
                  <span className="font-black opacity-70">{count}</span>
                </button>
              ))}
            </div>
          )}

          {/* Tabs principales */}
          <div className="flex gap-1 mt-6">
            {([
              { id: 'catalogo', label: 'Catálogo', icon: Package },
              { id: 'manuales', label: 'Manuales', icon: FileText },
              { id: 'videos',   label: 'Videos',   icon: Video },
            ] as { id: Tab; label: string; icon: React.ElementType }[]).map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition-all"
                style={{
                  background: tab === t.id ? '#f0fdf8' : 'rgba(255,255,255,0.07)',
                  color: tab === t.id ? '#043941' : 'rgba(255,255,255,0.55)',
                  borderBottom: tab === t.id ? '2px solid #02d47e' : '2px solid transparent',
                }}
              >
                <t.icon size={14} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ TAB: CATÁLOGO ═══════════════════════════════════════════════════ */}
      {tab === 'catalogo' && (
        <>
          {/* Barra filtros sticky */}
          <div className="sticky top-0 z-20 px-4 py-3 border-b shadow-sm" style={{ background: '#ffffff', borderColor: '#d1fae5' }}>
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              <button
                onClick={() => setShowFiltros(!showFiltros)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all"
                style={{
                  background: showFiltros || activeCount > 0 ? '#043941' : '#f0fdf8',
                  color: showFiltros || activeCount > 0 ? '#02d47e' : '#043941',
                  border: '1.5px solid', borderColor: showFiltros || activeCount > 0 ? '#043941' : '#d1fae5',
                }}
              >
                <SlidersHorizontal size={12} />
                Filtros
                {activeCount > 0 && (
                  <span className="w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center"
                    style={{ background: '#02d47e', color: '#043941' }}>
                    {activeCount}
                  </span>
                )}
              </button>

              <div className="w-px h-5 shrink-0" style={{ background: '#d1fae5' }} />

              {zonas.map(z => (
                <button key={z}
                  onClick={() => { setFiltroZona(filtroZona === z ? '' : z); setFiltroArea(''); setFiltroSubarea('') }}
                  className="shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
                  style={{
                    background: filtroZona === z ? '#043941' : '#f0fdf8',
                    color: filtroZona === z ? '#02d47e' : '#045f6c',
                    border: '1.5px solid', borderColor: filtroZona === z ? '#043941' : '#d1fae5',
                  }}
                >
                  {z.replace('ZONA DE ', '').replace('DEPÓSITO / ALMACÉN / SEGURIDAD', 'DEPÓSITO')}
                </button>
              ))}

              {hayFiltros && (
                <>
                  <div className="w-px h-5 shrink-0" style={{ background: '#d1fae5' }} />
                  <button onClick={resetFiltros}
                    className="flex items-center gap-1 shrink-0 px-3 py-2 rounded-xl text-xs font-bold"
                    style={{ color: '#ef4444', background: '#fff1f2', border: '1.5px solid #fecdd3' }}>
                    <X size={11} /> Limpiar
                  </button>
                </>
              )}
            </div>

            {showFiltros && filtroZona && (
              <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t" style={{ borderColor: '#d1fae5' }}>
                {areas.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-xs font-bold" style={{ color: '#94a3b8' }}>Área:</span>
                    {areas.map(a => (
                      <button key={a}
                        onClick={() => { setFiltroArea(filtroArea === a ? '' : a); setFiltroSubarea('') }}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          background: filtroArea === a ? '#e0f2fe' : '#f8fafc',
                          color: filtroArea === a ? '#0369a1' : '#64748b',
                          border: `1px solid ${filtroArea === a ? '#bae6fd' : '#e2e8f0'}`,
                        }}>
                        {a}
                      </button>
                    ))}
                  </div>
                )}
                {filtroArea && subareas.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 items-center w-full">
                    <span className="text-xs font-bold" style={{ color: '#94a3b8' }}>Sub-área:</span>
                    {subareas.map(s => (
                      <button key={s}
                        onClick={() => setFiltroSubarea(filtroSubarea === s ? '' : s)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          background: filtroSubarea === s ? '#fef3c7' : '#f8fafc',
                          color: filtroSubarea === s ? '#92400e' : '#64748b',
                          border: `1px solid ${filtroSubarea === s ? '#fde68a' : '#e2e8f0'}`,
                        }}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <p className="text-xs mt-2 font-semibold" style={{ color: '#64748b' }}>
              {bienesFiltered.length === totalBienes ? `${totalBienes} bienes` : `${bienesFiltered.length} de ${totalBienes} bienes`}
            </p>
          </div>

          <div className="p-4 sm:p-6">
            {bienesFiltered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {bienesFiltered.map((bien: Bien) => (
                  <RepositorioCard key={bien.n} bien={bien} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#e0fef3' }}>
                  <Search size={26} style={{ color: '#02d47e' }} />
                </div>
                <p className="text-base font-bold mb-1" style={{ color: '#043941' }}>Sin resultados</p>
                <button onClick={resetFiltros} className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#043941' }}>
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ══ TAB: MANUALES ═══════════════════════════════════════════════════ */}
      {tab === 'manuales' && (
        <div className="p-4 sm:p-6">
          {/* Intro */}
          <div className="mb-6 p-5 rounded-2xl border-2 flex items-start gap-4"
            style={{ background: '#ffffff', borderColor: '#d1fae5' }}>
            <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#d1fae5' }}>
              <FileText size={20} style={{ color: '#059669' }} />
            </div>
            <div>
              <h2 className="font-extrabold text-base mb-1" style={{ color: '#043941' }}>Manuales de uso y mantenimiento</h2>
              <p className="text-sm" style={{ color: '#045f6c' }}>
                Documentación técnica de los equipos y herramientas del taller.
                Haz clic en cualquier equipo para ver su ficha completa con el manual disponible.
              </p>
            </div>
          </div>

          {/* Dos columnas: Manual de uso + Manual de mantenimiento */}
          <div className="grid sm:grid-cols-2 gap-6">
            <RecursosColumna
              titulo="Manual de uso"
              subtitulo="Operatividad del equipo"
              icon={FileText}
              iconColor="#059669"
              iconBg="#d1fae5"
              bienes={bienesConRecursos}
              slug={slug}
              tipo="uso"
              navigate={navigate}
            />
            <RecursosColumna
              titulo="Manual de mantenimiento"
              subtitulo="Procedimientos de mantención"
              icon={Wrench}
              iconColor="#d97706"
              iconBg="#fef3c7"
              bienes={bienesConRecursos}
              slug={slug}
              tipo="mantenimiento"
              navigate={navigate}
            />
          </div>
        </div>
      )}

      {/* ══ TAB: VIDEOS ═════════════════════════════════════════════════════ */}
      {tab === 'videos' && (
        <div className="p-4 sm:p-6">
          {/* Intro */}
          <div className="mb-6 p-5 rounded-2xl border-2 flex items-start gap-4"
            style={{ background: '#ffffff', borderColor: '#d1fae5' }}>
            <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#cffafe' }}>
              <Video size={20} style={{ color: '#0891b2' }} />
            </div>
            <div>
              <h2 className="font-extrabold text-base mb-1" style={{ color: '#043941' }}>Videos de uso y mantenimiento</h2>
              <p className="text-sm" style={{ color: '#045f6c' }}>
                Videos demostrativos de operación segura y mantenimiento preventivo por equipo.
                Haz clic en un equipo para ver su video desde su ficha completa.
              </p>
            </div>
          </div>

          {/* Grid de video cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bienesConRecursos.map((b: Bien) => (
              <VideoCard key={b.n} bien={b} slug={slug} navigate={navigate} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Columna de recursos (manuales) ──────────────────────────────────────────
function RecursosColumna({ titulo, subtitulo, icon: Icon, iconColor, iconBg, bienes, slug, tipo, navigate }: {
  titulo: string; subtitulo: string; icon: React.ElementType
  iconColor: string; iconBg: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bienes: any[]; slug: string; tipo: string; navigate: (path: string) => void
}) {
  return (
    <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#e2e8f0', background: '#ffffff' }}>
      {/* Header */}
      <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: '#f1f5f9', background: '#f8fafc' }}>
        <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconBg }}>
          <Icon size={16} style={{ color: iconColor }} />
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: '#0f172a' }}>{titulo}</p>
          <p className="text-xs" style={{ color: '#64748b' }}>{subtitulo}</p>
        </div>
      </div>

      {/* Lista de bienes */}
      <div className="divide-y" style={{ borderColor: '#f1f5f9' }}>
        {bienes.slice(0, 12).map((b) => (
          <button
            key={b.n}
            onClick={() => navigate(`/taller/${slug}/repositorio/bien/${b.n}`)}
            className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors group"
            style={{ background: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: iconBg }}>
              <Download size={13} style={{ color: iconColor }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: '#0f172a' }}>{b.nombre}</p>
              {b.marca && <p className="text-[10px]" style={{ color: '#94a3b8' }}>{b.marca}</p>}
            </div>
            <ChevronRight size={13} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: iconColor }} />
          </button>
        ))}
      </div>

      {bienes.length > 12 && (
        <div className="px-5 py-3 border-t" style={{ borderColor: '#f1f5f9' }}>
          <p className="text-xs font-semibold text-center" style={{ color: '#94a3b8' }}>
            +{bienes.length - 12} equipos más · ver en Catálogo
          </p>
        </div>
      )}
    </div>
  )
}

// ── Video Card placeholder ───────────────────────────────────────────────────
function VideoCard({ bien, slug, navigate }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bien: any; slug: string; navigate: (path: string) => void
}) {
  return (
    <button
      onClick={() => navigate(`/taller/${slug}/repositorio/bien/${bien.n}`)}
      className="w-full text-left rounded-2xl overflow-hidden border-2 transition-all group"
      style={{ borderColor: '#e2e8f0', background: '#ffffff' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = '#0891b2'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(8,145,178,0.12)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      {/* Thumbnail placeholder */}
      <div className="aspect-video flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.1)' }}>
          <PlayCircle size={24} style={{ color: 'rgba(255,255,255,0.5)' }} />
        </div>
        <span className="text-[10px] mt-2 font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Próximamente
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-bold leading-snug line-clamp-2 mb-1" style={{ color: '#0f172a' }}>
          {bien.nombre}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
            style={{ background: '#cffafe', color: '#0891b2' }}>
            Video operatividad
          </span>
          <ChevronRight size={12} style={{ color: '#94a3b8' }} />
        </div>
      </div>
    </button>
  )
}

// ── dummy import fix ─────────────────────────────────────────────────────────
function Wrench(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  const { size = 24, ...rest } = props
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}
