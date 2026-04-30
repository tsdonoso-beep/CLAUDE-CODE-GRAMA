// src/pages/Repositorio.tsx
import { useState, useMemo, useEffect } from 'react'
import {
  Search, X, SlidersHorizontal, Package, Wrench as WrenchLucide, Sofa, BookOpen,
  HardHat, FileText, Video, PlayCircle, ChevronRight, BookMarked,
  Wrench, GraduationCap, Car, Scissors, ChefHat, Hammer, Monitor, Cpu,
  UtensilsCrossed, Zap,
} from 'lucide-react'

const TALLER_ICON_MAP: Record<string, React.ElementType> = {
  Car, Scissors, ChefHat, Hammer, Monitor, Cpu, UtensilsCrossed, Zap, Wrench: WrenchLucide, Package,
}
import { useTaller } from '@/hooks/useTaller'
import { RepositorioCard } from '@/components/lxp/RepositorioCard'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { trackNavegacion } from '@/lib/tracker'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Bien = Record<string, any>
type Tab = 'bienes' | 'manuales' | 'videos'


const TIPO_ICONS: Record<string, React.ElementType> = {
  EQUIPOS: Package, HERRAMIENTAS: WrenchLucide, MOBILIARIO: Sofa,
  PEDAGOGICO: BookOpen, SEGURIDAD: HardHat,
}

// Excluir del catálogo: manuales, videos y USB con manuales (el repositorio web los reemplaza)
function esExcluidoDeCatalogo(nombre: string): boolean {
  const n = nombre.toLowerCase()
  return n.startsWith('manual') || n.startsWith('video') ||
    (n.includes('usb') && n.includes('manual'))
}

// ── Clasificadores por nombre ─────────────────────────────────────────────────
// Regla principal: el nombre DEBE empezar con "manual" (es un documento)
// "Remachadora manual", "Taladro manual" → NO son manuales (manual es adjetivo al final)
function esManual(nombre: string) {
  return nombre.toLowerCase().trimStart().startsWith('manual')
}
// Usa "de uso" / "de operación" para identificar el TIPO del manual,
// no el tema que describe ("equipo de mantenimiento" no lo convierte en manual de mantenimiento)
function esManualUso(nombre: string) {
  const n = nombre.toLowerCase()
  return n.trimStart().startsWith('manual') &&
    (n.includes('de uso') || n.includes('de operaci') || n.includes('de instalac'))
}
function esManualMantenimiento(nombre: string) {
  const n = nombre.toLowerCase()
  // Solo si "de mantenimiento" aparece en los primeros 35 caracteres (es el tipo del manual)
  return n.trimStart().startsWith('manual') &&
    (n.slice(0, 35).includes('de mantenimiento') || n.slice(0, 35).includes('de mantención'))
}
function esManualPedagogico(nombre: string) {
  const n = nombre.toLowerCase()
  return n.trimStart().startsWith('manual') &&
    (n.includes('pedagóg') || n.includes('pedagogic'))
}
function esVideo(nombre: string) {
  const n = nombre.toLowerCase()
  return n.includes('video') || n.includes('tutorial') || n.includes('audiovisual')
}

export default function Repositorio() {
  const { taller, bienes, totalBienes, slug } = useTaller()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()

  // Registrar visita al repositorio (captura accesos directos sin pasar por ruta de aprendizaje)
  useEffect(() => {
    if (!user?.id || !slug) return
    const referrer = document.referrer.includes('/ruta') ? 'ruta_aprendizaje'
      : document.referrer.includes('/perfil') ? 'perfil'
      : 'directo'
    trackNavegacion(user.id, 'repositorio', slug, referrer)
  }, [user?.id, slug])
  const [tab, setTab] = useState<Tab>('bienes')

  // ── Catálogo ──────────────────────────────────────────────────────────────
  const [busqueda, setBusqueda] = useState('')
  const [filtroZona, setFiltroZona] = useState(() => searchParams.get('zona') ?? '')
  const [filtroArea, setFiltroArea] = useState('')
  const [filtroSubarea, setFiltroSubarea] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [showFiltros, setShowFiltros] = useState(false)

  // ── Manuales ──────────────────────────────────────────────────────────────
  const [busquedaManual, setBusquedaManual] = useState('')
  const [filtroManual, setFiltroManual] = useState<'todos' | 'uso' | 'mantenimiento' | 'pedagogico'>('todos')

  // ── Videos ────────────────────────────────────────────────────────────────
  const [busquedaVideo, setBusquedaVideo] = useState('')

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
        (!filtroTipo    || b.tipo    === filtroTipo) &&
        !esExcluidoDeCatalogo(b.nombre ?? '')
      )
    })
  , [bienes, busqueda, filtroZona, filtroArea, filtroSubarea, filtroTipo])

  // ── Manuales: solo ítems cuyo nombre contiene 'manual' ──────────────────
  const bienesManual = useMemo(() => {
    const soloManuales = bienes.filter((b: Bien) => esManual(b.nombre ?? ''))
    const q = busquedaManual.toLowerCase()
    return soloManuales.filter((b: Bien) => {
      const matchQ = !q || b.nombre?.toLowerCase().includes(q) || b.zona?.toLowerCase().includes(q)
      if (!matchQ) return false
      if (filtroManual === 'uso')           return esManualUso(b.nombre ?? '')
      if (filtroManual === 'mantenimiento') return esManualMantenimiento(b.nombre ?? '')
      if (filtroManual === 'pedagogico')    return esManualPedagogico(b.nombre ?? '')
      return true // todos
    })
  }, [bienes, busquedaManual, filtroManual])

  // Conteos por categoría de manual
  const conteos = useMemo(() => {
    const soloManuales = bienes.filter((b: Bien) => esManual(b.nombre ?? ''))
    return {
      uso:           soloManuales.filter((b: Bien) => esManualUso(b.nombre ?? '')).length,
      mantenimiento: soloManuales.filter((b: Bien) => esManualMantenimiento(b.nombre ?? '')).length,
      pedagogico:    soloManuales.filter((b: Bien) => esManualPedagogico(b.nombre ?? '')).length,
      total:         soloManuales.length,
    }
  }, [bienes])

  // ── Videos: bienes con nombre de video ───────────────────────────────────
  const bienesVideo = useMemo(() => {
    const q = busquedaVideo.toLowerCase()
    return bienes.filter((b: Bien) =>
      esVideo(b.nombre ?? '') &&
      (!q || b.nombre?.toLowerCase().includes(q) || b.zona?.toLowerCase().includes(q))
    )
  }, [bienes, busquedaVideo])

  const statsTipo = useMemo(() => tipos.map(t => ({
    tipo: t, count: bienes.filter((b: Bien) => b.tipo === t).length, Icon: TIPO_ICONS[t] ?? Package,
  })), [tipos, bienes])

  if (!taller) return null

  const tallerColor = `hsl(${taller.color})`
  const hayFiltros = busqueda || filtroZona || filtroArea || filtroSubarea || filtroTipo
  const activeCount = [filtroZona, filtroArea, filtroSubarea, filtroTipo].filter(Boolean).length

  function resetFiltros() {
    setBusqueda(''); setFiltroZona(''); setFiltroArea(''); setFiltroSubarea(''); setFiltroTipo('')
  }

  // Función para obtener ícono y color de categoría de manual
  function getManualMeta(nombre: string) {
    if (esManualUso(nombre))
      return { icon: BookMarked, color: '#02d47e', bg: 'rgba(2,212,126,0.13)', label: 'Uso' }
    if (esManualMantenimiento(nombre))
      return { icon: Wrench, color: '#045f6c', bg: 'rgba(4,95,108,0.11)', label: 'Mantenimiento' }
    if (esManualPedagogico(nombre))
      return { icon: GraduationCap, color: '#043941', bg: 'rgba(4,57,65,0.10)', label: 'Pedagógico' }
    return { icon: FileText, color: '#64748b', bg: '#f1f5f9', label: 'Documento' }
  }

  return (
    <div style={{ background: 'var(--grama-bg)', minHeight: '100vh' }}>

      {/* ══ TOP BAR ══════════════════════════════════════════════════════════ */}
      <div style={{ background: '#043941' }}>
        <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          {/* Taller context */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'rgba(255,255,255,0.10)', border: '1.5px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {(() => { const I = TALLER_ICON_MAP[taller.icon] ?? Package; return <I size={20} style={{ color: '#02d47e' }} /> })()}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: '0 0 2px', fontWeight: 600 }}>{taller.nombre}</p>
              <h1 style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>Repositorio de Bienes</h1>
            </div>
          </div>
          {/* Stats + nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexShrink: 0 }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>{totalBienes}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: '3px 0 0', fontWeight: 600, letterSpacing: '.04em' }}>bienes</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>{zonas.length}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: '3px 0 0', fontWeight: 600, letterSpacing: '.04em' }}>zonas</p>
            </div>
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.15)' }} />
            <button
              onClick={() => navigate(`/taller/${slug}`)}
              style={{ background: 'none', color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 12, padding: '9px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all .18s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >
              ← Hub del taller
            </button>
          </div>
        </div>
      </div>

      {/* ══ TABS + BÚSQUEDA ═════════════════════════════════════════════════ */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(4,57,65,0.07)', padding: '14px 28px 0' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          {([
            { id: 'bienes',   label: 'Bienes',   icon: Package  },
            { id: 'manuales', label: 'Manuales', icon: FileText },
            { id: 'videos',   label: 'Videos',   icon: Video    },
          ] as { id: Tab; label: string; icon: React.ElementType }[]).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '8px 18px', borderRadius: 100,
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all .16s',
                background: tab === t.id ? '#043941' : 'transparent',
                color:      tab === t.id ? '#02d47e'  : '#64748b',
                border: tab === t.id ? 'none' : '1.5px solid rgba(4,57,65,0.1)',
              }}
            >
              <t.icon size={13} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Buscador */}
        {tab === 'bienes' && (
          <div style={{ position: 'relative', maxWidth: 560, marginBottom: 16 }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Busca por nombre, marca, modelo o código…"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{ width: '100%', paddingLeft: 40, paddingRight: busqueda ? 36 : 16, paddingTop: 10, paddingBottom: 10, borderRadius: 12, fontSize: 13, fontWeight: 500, outline: 'none', background: '#f8fafc', color: '#043941', border: '1.5px solid rgba(4,57,65,0.1)', fontFamily: 'inherit', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = tallerColor)}
              onBlur={e => (e.target.style.borderColor = 'rgba(4,57,65,0.1)')}
            />
            {busqueda && (
              <button onClick={() => setBusqueda('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: '#94a3b8' }}>
                <X size={14} />
              </button>
            )}
          </div>
        )}
        {tab === 'manuales' && (
          <div style={{ position: 'relative', maxWidth: 560, marginBottom: 16 }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Busca manuales por nombre o zona…"
              value={busquedaManual}
              onChange={e => setBusquedaManual(e.target.value)}
              style={{ width: '100%', paddingLeft: 40, paddingRight: busquedaManual ? 36 : 16, paddingTop: 10, paddingBottom: 10, borderRadius: 12, fontSize: 13, fontWeight: 500, outline: 'none', background: '#f8fafc', color: '#043941', border: '1.5px solid rgba(4,57,65,0.1)', fontFamily: 'inherit', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = tallerColor)}
              onBlur={e => (e.target.style.borderColor = 'rgba(4,57,65,0.1)')}
            />
            {busquedaManual && (
              <button onClick={() => setBusquedaManual('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: '#94a3b8' }}>
                <X size={14} />
              </button>
            )}
          </div>
        )}
        {tab === 'videos' && (
          <div style={{ position: 'relative', maxWidth: 560, marginBottom: 16 }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Busca videos por nombre o zona…"
              value={busquedaVideo}
              onChange={e => setBusquedaVideo(e.target.value)}
              style={{ width: '100%', paddingLeft: 40, paddingRight: busquedaVideo ? 36 : 16, paddingTop: 10, paddingBottom: 10, borderRadius: 12, fontSize: 13, fontWeight: 500, outline: 'none', background: '#f8fafc', color: '#043941', border: '1.5px solid rgba(4,57,65,0.1)', fontFamily: 'inherit', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = tallerColor)}
              onBlur={e => (e.target.style.borderColor = 'rgba(4,57,65,0.1)')}
            />
            {busquedaVideo && (
              <button onClick={() => setBusquedaVideo('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: '#94a3b8' }}>
                <X size={14} />
              </button>
            )}
          </div>
        )}

        {/* Filtros por tipo (tab bienes) */}
        {tab === 'bienes' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingBottom: 14 }}>
            <button
              onClick={() => setFiltroTipo('')}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', background: !filtroTipo ? '#043941' : 'transparent', color: !filtroTipo ? '#02d47e' : '#64748b', border: !filtroTipo ? 'none' : '1.5px solid rgba(4,57,65,0.1)' }}
            >
              Todos <span style={{ opacity: 0.7 }}>{statsTipo.reduce((acc, s) => acc + s.count, 0)}</span>
            </button>
            {statsTipo.map(({ tipo, count, Icon }) => (
              <button
                key={tipo}
                onClick={() => setFiltroTipo(filtroTipo === tipo ? '' : tipo)}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', background: filtroTipo === tipo ? '#043941' : 'transparent', color: filtroTipo === tipo ? '#02d47e' : '#64748b', border: filtroTipo === tipo ? 'none' : '1.5px solid rgba(4,57,65,0.1)' }}
              >
                <Icon size={11} />
                {tipo.charAt(0) + tipo.slice(1).toLowerCase()}
                <span style={{ opacity: 0.7 }}>{count}</span>
              </button>
            ))}
          </div>
        )}

        {/* Filtros manuales */}
        {tab === 'manuales' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingBottom: 14 }}>
            {([
              { id: 'todos',         label: 'Todos',         count: conteos.total         },
              { id: 'uso',           label: 'Uso',           count: conteos.uso           },
              { id: 'mantenimiento', label: 'Mantenimiento', count: conteos.mantenimiento },
              { id: 'pedagogico',    label: 'Pedagógico',    count: conteos.pedagogico    },
            ] as const).map(f => (
              <button
                key={f.id}
                onClick={() => setFiltroManual(f.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', background: filtroManual === f.id ? '#043941' : 'transparent', color: filtroManual === f.id ? '#02d47e' : '#64748b', border: filtroManual === f.id ? 'none' : '1.5px solid rgba(4,57,65,0.1)' }}
              >
                {f.label} <span style={{ opacity: 0.7 }}>{f.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ══ TAB: CATÁLOGO ═══════════════════════════════════════════════════ */}
      {tab === 'bienes' && (
        <>
          <div style={{ position: 'sticky', top: 0, zIndex: 20, padding: '12px 16px', borderBottom: '1px solid #d1fae5', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
              <button
                onClick={() => setShowFiltros(!showFiltros)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 12,
                  fontSize: 12, fontWeight: 700, flexShrink: 0,
                  transition: 'all .15s', fontFamily: 'inherit', cursor: 'pointer',
                  background: showFiltros || activeCount > 0 ? '#043941' : '#f0fdf8',
                  color: showFiltros || activeCount > 0 ? tallerColor : '#043941',
                  border: `1.5px solid ${showFiltros || activeCount > 0 ? '#043941' : '#d1fae5'}`,
                }}
              >
                <SlidersHorizontal size={12} />
                Filtros
                {activeCount > 0 && (
                  <span style={{
                    width: 16, height: 16, borderRadius: '50%', fontSize: 10, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: tallerColor, color: '#043941',
                  }}>
                    {activeCount}
                  </span>
                )}
              </button>

              <div style={{ width: 1, height: 20, flexShrink: 0, background: '#d1fae5' }} />

              {zonas.map(z => (
                <button key={z}
                  onClick={() => { setFiltroZona(filtroZona === z ? '' : z); setFiltroArea(''); setFiltroSubarea('') }}
                  style={{
                    flexShrink: 0, padding: '8px 12px', borderRadius: 12,
                    fontSize: 12, fontWeight: 600, transition: 'all .15s', whiteSpace: 'nowrap',
                    cursor: 'pointer', fontFamily: 'inherit',
                    background: filtroZona === z ? '#043941' : '#f0fdf8',
                    color: filtroZona === z ? tallerColor : '#045f6c',
                    border: `1.5px solid ${filtroZona === z ? '#043941' : '#d1fae5'}`,
                  }}
                >
                  {z.replace('ZONA DE ', '').replace('DEPÓSITO / ALMACÉN / SEGURIDAD', 'DEPÓSITO').replace('INVESTIGACIÓN, GESTIÓN Y DISEÑO', 'INV. Y DISEÑO')}
                </button>
              ))}

              {hayFiltros && (
                <>
                  <div style={{ width: 1, height: 20, flexShrink: 0, background: '#d1fae5' }} />
                  <button onClick={resetFiltros}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
                      padding: '8px 12px', borderRadius: 12,
                      fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                      color: '#ef4444', background: '#fff1f2', border: '1.5px solid #fecdd3',
                    }}>
                    <X size={11} /> Limpiar
                  </button>
                </>
              )}
            </div>

            {showFiltros && filtroZona && (
              <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 12, borderTop: '1px solid #d1fae5' }}>
                {areas.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>Área:</span>
                    {areas.map(a => (
                      <button key={a}
                        onClick={() => { setFiltroArea(filtroArea === a ? '' : a); setFiltroSubarea('') }}
                        style={{
                          padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                          transition: 'all .15s', cursor: 'pointer', fontFamily: 'inherit',
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', width: '100%' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>Sub-área:</span>
                    {subareas.map(s => (
                      <button key={s}
                        onClick={() => setFiltroSubarea(filtroSubarea === s ? '' : s)}
                        style={{
                          padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                          transition: 'all .15s', cursor: 'pointer', fontFamily: 'inherit',
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

            <p style={{ fontSize: 12, margin: '8px 0 0', fontWeight: 600, color: '#64748b' }}>
              {bienesFiltered.length === totalBienes ? `${totalBienes} bienes` : `${bienesFiltered.length} de ${totalBienes} bienes`}
            </p>
          </div>

          <div style={{ padding: 24 }}>
            {bienesFiltered.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {bienesFiltered.map((bien: Bien) => (
                  <RepositorioCard key={bien.n} bien={bien} />
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80, paddingBottom: 80 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: `${tallerColor}18` }}>
                  <Search size={26} style={{ color: tallerColor }} />
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: '#043941' }}>Sin resultados</p>
                <button onClick={resetFiltros} style={{ marginTop: 16, padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#fff', background: '#043941', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ══ TAB: MANUALES ═══════════════════════════════════════════════════ */}
      {tab === 'manuales' && (
        <div style={{ padding: 24 }}>

          {/* Resumen categórico — tarjetas de acceso rápido */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
            {([
              { id: 'uso',           label: 'Manual de Uso',        icon: BookMarked,    color: '#02d47e', bg: 'rgba(2,212,126,0.13)', count: conteos.uso,           desc: 'Operación y manejo seguro del equipo' },
              { id: 'mantenimiento', label: 'Mantenimiento',        icon: Wrench,        color: '#045f6c', bg: 'rgba(4,95,108,0.11)',  count: conteos.mantenimiento, desc: 'Limpieza, revisión y mantenimiento preventivo' },
              { id: 'pedagogico',    label: 'Material Pedagógico',  icon: GraduationCap, color: '#043941', bg: 'rgba(4,57,65,0.10)',   count: conteos.pedagogico,    desc: 'Guías y sesiones para el docente' },
            ] as const).map(cat => {
              const Icon = cat.icon
              const active = filtroManual === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setFiltroManual(active ? 'todos' : cat.id)}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: 8,
                    padding: 16, borderRadius: 16, textAlign: 'left',
                    transition: 'all .16s', cursor: 'pointer', fontFamily: 'inherit',
                    background: active ? cat.color : '#ffffff',
                    border: `2px solid ${active ? cat.color : '#e2e8f0'}`,
                    boxShadow: active ? `0 4px 16px ${cat.color}33` : 'none',
                    transform: active ? 'translateY(-2px)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active ? 'rgba(255,255,255,0.2)' : cat.bg }}>
                      <Icon size={16} style={{ color: active ? '#fff' : cat.color }} />
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 800, color: active ? '#fff' : cat.color }}>
                      {cat.count}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3, color: active ? '#fff' : '#0f172a', margin: '0 0 2px' }}>
                      {cat.label}
                    </p>
                    <p style={{ fontSize: 10, lineHeight: 1.4, color: active ? 'rgba(255,255,255,0.7)' : '#94a3b8', margin: 0 }}>
                      {cat.desc}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Resultado: lista de manuales */}
          <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', margin: 0 }}>
              {bienesManual.length} {bienesManual.length === 1 ? 'manual' : 'manuales'}
              {filtroManual !== 'todos' ? ` · filtro activo` : ''}
            </p>
            {(busquedaManual || filtroManual !== 'todos') && (
              <button
                onClick={() => { setBusquedaManual(''); setFiltroManual('todos'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 12, fontWeight: 700, padding: '6px 10px', borderRadius: 8,
                  cursor: 'pointer', fontFamily: 'inherit',
                  color: '#ef4444', background: '#fff1f2', border: '1px solid #fecdd3',
                }}
              >
                <X size={11} /> Limpiar
              </button>
            )}
          </div>

          {bienesManual.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 64, paddingBottom: 64, borderRadius: 16, background: '#f0faf5' }}>
              <FileText size={32} style={{ color: '#cbd5e1' }} />
              <p style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: '#94a3b8' }}>Sin manuales en esta categoría</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {bienesManual.map((b: Bien) => {
                const meta = getManualMeta(b.nombre ?? '')
                const MetaIcon = meta.icon
                return (
                  <button
                    key={b.n}
                    onClick={() => navigate(`/taller/${slug}/repositorio/bien/${b.n}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: 16, borderRadius: 16, textAlign: 'left',
                      transition: 'all .16s', cursor: 'pointer', fontFamily: 'inherit',
                      width: '100%', background: '#ffffff', border: '1.5px solid #e2e8f0',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = meta.color
                      el.style.boxShadow = `0 4px 12px ${meta.color}22`
                      const chevron = el.querySelector('[data-chevron]') as HTMLElement
                      if (chevron) chevron.style.opacity = '1'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = '#e2e8f0'
                      el.style.boxShadow = 'none'
                      const chevron = el.querySelector('[data-chevron]') as HTMLElement
                      if (chevron) chevron.style.opacity = '0'
                    }}
                  >
                    {/* Ícono categoría */}
                    <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: meta.bg }}>
                      <MetaIcon size={18} style={{ color: meta.color }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, color: '#0f172a', margin: '0 0 4px' }}>
                        {b.nombre}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: meta.bg, color: meta.color }}>
                          {meta.label}
                        </span>
                        {b.zona && (
                          <span style={{ fontSize: 10, fontWeight: 500, color: '#94a3b8' }}>
                            {b.zona.replace('ZONA DE ', '').replace('DEPÓSITO / ALMACÉN / SEGURIDAD', 'DEPÓSITO').replace('INVESTIGACIÓN, GESTIÓN Y DISEÑO', 'INV. Y DISEÑO')}
                          </span>
                        )}
                        {b.cantidad > 1 && (
                          <span style={{ fontSize: 10, fontWeight: 500, color: '#cbd5e1' }}>
                            ×{b.cantidad}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Descripción truncada */}
                    {b.descripcion && (
                      <p className="line-clamp-2" style={{ fontSize: 12, maxWidth: 280, lineHeight: 1.4, flexShrink: 0, color: '#94a3b8' }}>
                        {b.descripcion.slice(0, 120)}…
                      </p>
                    )}

                    <ChevronRight data-chevron="1" size={14} style={{ flexShrink: 0, color: meta.color, opacity: 0, transition: 'opacity .16s' }} />
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ══ TAB: VIDEOS ═════════════════════════════════════════════════════ */}
      {tab === 'videos' && (
        <div style={{ padding: 24 }}>

          <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', margin: 0 }}>
              {bienesVideo.length} {bienesVideo.length === 1 ? 'video' : 'videos'} disponibles
            </p>
            {busquedaVideo && (
              <button
                onClick={() => setBusquedaVideo('')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 12, fontWeight: 700, padding: '6px 10px', borderRadius: 8,
                  cursor: 'pointer', fontFamily: 'inherit',
                  color: '#ef4444', background: '#fff1f2', border: '1px solid #fecdd3',
                }}
              >
                <X size={11} /> Limpiar
              </button>
            )}
          </div>

          {bienesVideo.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80, paddingBottom: 80, borderRadius: 16, background: '#f0faf5' }}>
              <Video size={32} style={{ color: '#cbd5e1' }} />
              <p style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: '#94a3b8' }}>No hay videos que coincidan</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {bienesVideo.map((b: Bien) => (
                <VideoCard key={b.n} bien={b} slug={slug} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Video Card ────────────────────────────────────────────────────────────────
function VideoCard({ bien, slug, navigate }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bien: any; slug: string; navigate: (path: string) => void
}) {
  return (
    <button
      onClick={() => navigate(`/taller/${slug}/repositorio/bien/${bien.n}`)}
      style={{
        width: '100%', textAlign: 'left', borderRadius: 16, overflow: 'hidden',
        border: '2px solid #e2e8f0', background: '#ffffff', cursor: 'pointer',
        transition: 'all .18s', display: 'block',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = '#045f6c'
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 8px 20px rgba(4,95,108,0.15)'
        const playBtn = el.querySelector('[data-play]') as HTMLElement
        if (playBtn) playBtn.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = '#e2e8f0'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
        const playBtn = el.querySelector('[data-play]') as HTMLElement
        if (playBtn) playBtn.style.transform = 'scale(1)'
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #043941 0%, #045f6c 100%)' }}>
        <div data-play="1" style={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .18s', background: 'rgba(255,255,255,0.12)' }}>
          <PlayCircle size={24} style={{ color: 'rgba(255,255,255,0.7)' }} />
        </div>
        {bien.zona && (
          <span style={{ position: 'absolute', bottom: 8, left: 12, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 100, background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.7)' }}>
            {bien.zona.replace('ZONA DE ', '')}
          </span>
        )}
        <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: 'rgba(8,145,178,0.8)', color: '#fff' }}>
          VIDEO
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: 12 }}>
        <p className="line-clamp-2" style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.4, marginBottom: 6, color: '#0f172a' }}>
          {bien.nombre}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: 'rgba(4,95,108,0.1)', color: '#045f6c' }}>
            {bien.cantidad > 1 ? `${bien.cantidad} unidades` : 'Tutorial'}
          </span>
          <ChevronRight size={12} style={{ color: '#94a3b8' }} />
        </div>
      </div>
    </button>
  )
}
