// src/pages/Admin.tsx
import { useState, useEffect, useMemo } from 'react'
import { Download, Users, RefreshCw, LogOut, Filter, BarChart2, BookOpen, Video, FileDown, Globe, LogIn } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { talleresConfig } from '@/data/talleresConfig'
import { modulosLXP } from '@/data/modulosLXP'
import { useAuth } from '@/contexts/AuthContext'
import { GramaLogo } from '@/components/GramaLogo'
import type { Profile } from '@/types/database'
import { useNavigate } from 'react-router-dom'

// ── Analytics types ────────────────────────────────────────────────────────────
interface ContenidoCount {
  bien_nombre: string
  tipo_contenido: string
  tipo_evento: string
  count: number
}
interface NavegacionCount {
  pagina: string
  referrer: string | null
  count: number
}
interface AnalyticsData {
  totalLogins: number
  navegacion: NavegacionCount[]
  contenidos: ContenidoCount[]
}

function buildMockAnalytics(): AnalyticsData {
  return {
    totalLogins: 47,
    navegacion: [
      { pagina: 'taller_hub',       referrer: null,              count: 38 },
      { pagina: 'ruta_aprendizaje', referrer: null,              count: 31 },
      { pagina: 'repositorio',      referrer: 'directo',         count: 14 },
      { pagina: 'repositorio',      referrer: 'ruta_aprendizaje',count: 22 },
      { pagina: 'perfil',           referrer: null,              count: 29 },
    ],
    contenidos: [
      { bien_nombre: 'Manual de uso — Torno',               tipo_contenido: 'manual',      tipo_evento: 'apertura_manual',    count: 18 },
      { bien_nombre: 'Manual de mantenimiento — Compresor', tipo_contenido: 'manual',      tipo_evento: 'apertura_manual',    count: 12 },
      { bien_nombre: 'Video: Introducción al taller',       tipo_contenido: 'video',       tipo_evento: 'reproduccion_video', count: 27 },
      { bien_nombre: 'Ficha técnica EPP',                   tipo_contenido: 'descargable', tipo_evento: 'descarga',           count: 9  },
    ],
  }
}

const DEV_MODE = !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co'

interface DocenteRow extends Profile {
  completados: number
  visualizados: number   // completado + en_progreso
  total: number
  porcentaje: number
  moduloActual: string | null  // "M0", "M1", etc.
  quizzesAprobados: number
  quizzesTotal: number
}

/**
 * Total de contenidos del LXP (único sistema de IDs usado en la plataforma).
 * Es el mismo para todos los talleres — los módulos son universales.
 */
function getTotalContenidosLXP(): number {
  return modulosLXP.reduce((acc, m) =>
    acc + m.subSecciones.reduce((a, s) => a + s.contenidos.length, 0), 0)
}

function getTotalQuizzesLXP(): number {
  return modulosLXP.reduce((acc, m) =>
    acc + m.subSecciones.reduce((a, s) =>
      a + s.contenidos.filter(c => c.tipo === 'QUIZ').length, 0), 0)
}

// ── Mock data para DEV_MODE ────────────────────────────────────────────────
function buildMockDocentes(): DocenteRow[] {
  const total = getTotalContenidosLXP()
  const completados = Math.round(total * 0.48)
  const visualizados = Math.round(total * 0.55)
  const quizzesTotal = getTotalQuizzesLXP()
  return [
    {
      id: 'mock-1',
      email: 'carlos.quispe@colegio.edu.pe',
      nombre_completo: 'Carlos Quispe Mamani',
      role: 'docente',
      ie_id: 5, // GUILLERMO E. BILLINGHURST
      taller_slug: 'mecanica-automotriz',
      created_at: '2026-02-10T08:00:00Z',
      last_seen_at: '2026-03-22T14:35:00Z',
      completados,
      visualizados,
      total,
      porcentaje: total > 0 ? Math.round((completados / total) * 100) : 0,
      moduloActual: 'M3',
      quizzesAprobados: 3,
      quizzesTotal,
    },
  ]
}

/**
 * Extrae el módulo más alto en el que el docente tiene actividad.
 * Soporta el formato LXP: "m0-s1-c1", "m3-s2-c1", etc.
 */
function calcModuloActual(contenidoIds: string[]): string | null {
  let maxM = -1
  for (const id of contenidoIds) {
    // IDs LXP: m0-s1-c1 / m3-s2-c4 → captura el número tras la "m" inicial
    const m = id.match(/^m(\d+)-/)
    if (m) {
      const n = parseInt(m[1])
      if (n > maxM) maxM = n
    }
  }
  return maxM >= 0 ? `M${maxM}` : null
}

function formatDate(iso: string) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
}

function downloadCSV(rows: DocenteRow[]) {
  const headers = ['Nombre', 'Email', 'IE', 'Región', 'Taller', 'Completados', 'Visualizados', 'Total', 'Progreso %', 'Módulo actual', 'Quizzes aprobados', 'Total quizzes', 'Último acceso', 'Fecha registro']
  const data = rows.map(d => {
    const ie = INSTITUCIONES_EDUCATIVAS.find(ie => ie.id === d.ie_id)
    const taller = talleresConfig.find(t => t.slug === d.taller_slug)
    return [
      d.nombre_completo,
      d.email,
      ie?.nombre ?? '—',
      ie?.region ?? '—',
      taller?.nombre ?? d.taller_slug ?? '—',
      d.completados,
      d.visualizados,
      d.total,
      d.porcentaje,
      d.moduloActual ?? '—',
      d.quizzesAprobados,
      d.quizzesTotal,
      formatDate(d.last_seen_at),
      formatDate(d.created_at),
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
  })
  const csv = '\uFEFF' + [headers.join(','), ...data].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `grama-docentes-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function Admin() {
  const { signOut, profile } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'docentes' | 'analytics'>('docentes')
  const [docentes, setDocentes] = useState<DocenteRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroIE, setFiltroIE] = useState('')
  const [filtroTaller, setFiltroTaller] = useState('')
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loadingAnalytics, setLoadingAnalytics] = useState(false)

  useEffect(() => { fetchData() }, [])
  useEffect(() => { if (tab === 'analytics' && !analytics) fetchAnalytics() }, [tab])

  async function fetchData() {
    setLoading(true)

    // En DEV_MODE sin Supabase real, usar datos mock
    if (DEV_MODE) {
      setDocentes(buildMockDocentes())
      setLoading(false)
      return
    }

    // 1. Todos los perfiles docentes
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'docente')
      .order('created_at', { ascending: false })

    if (!profiles || profiles.length === 0) { setLoading(false); return }

    // 2. Todos los registros de progreso y quiz para esos docentes (en paralelo)
    const docenteIds = profiles.map(p => p.id)
    const [{ data: progresos }, { data: quizResults }] = await Promise.all([
      supabase
        .from('progreso_contenidos')
        .select('usuario_id, contenido_id, estado')
        .in('usuario_id', docenteIds),
      supabase
        .from('quiz_resultados')
        .select('usuario_id, contenido_id, aprobado')
        .in('usuario_id', docenteIds),
    ])

    // 3. Agrupar progreso por usuario
    type UserStats = { completados: number; visualizados: number; ids: string[] }
    const statsPorUsuario: Record<string, UserStats> = {}

    progresos?.forEach(p => {
      if (!statsPorUsuario[p.usuario_id]) {
        statsPorUsuario[p.usuario_id] = { completados: 0, visualizados: 0, ids: [] }
      }
      statsPorUsuario[p.usuario_id].visualizados++
      statsPorUsuario[p.usuario_id].ids.push(p.contenido_id)
      if (p.estado === 'completado') {
        statsPorUsuario[p.usuario_id].completados++
      }
    })

    // 4. Agrupar quiz aprobados por usuario (1 por contenido_id aunque haya reintentos)
    const quizzesAprobadasPorUsuario: Record<string, Set<string>> = {}
    quizResults?.forEach(q => {
      if (!q.aprobado) return
      if (!quizzesAprobadasPorUsuario[q.usuario_id]) {
        quizzesAprobadasPorUsuario[q.usuario_id] = new Set()
      }
      quizzesAprobadasPorUsuario[q.usuario_id].add(q.contenido_id)
    })

    const totalLXP = getTotalContenidosLXP()
    const totalQuizzes = getTotalQuizzesLXP()
    const rows: DocenteRow[] = profiles.map(p => {
      const stats = statsPorUsuario[p.id] ?? { completados: 0, visualizados: 0, ids: [] }
      const total = totalLXP
      const porcentaje = total > 0 ? Math.round((stats.completados / total) * 100) : 0
      const moduloActual = calcModuloActual(stats.ids)
      const quizzesAprobados = quizzesAprobadasPorUsuario[p.id]?.size ?? 0
      return {
        ...(p as Profile),
        completados: stats.completados,
        visualizados: stats.visualizados,
        total,
        porcentaje,
        moduloActual,
        quizzesAprobados,
        quizzesTotal: totalQuizzes,
      }
    })

    setDocentes(rows)
    setLoading(false)
  }

  async function fetchAnalytics() {
    setLoadingAnalytics(true)
    if (DEV_MODE) {
      setAnalytics(buildMockAnalytics())
      setLoadingAnalytics(false)
      return
    }
    const [{ count: totalLogins }, { data: navRows }, { data: contRows }] = await Promise.all([
      supabase.from('eventos_sesion').select('*', { count: 'exact', head: true }),
      supabase.from('eventos_navegacion').select('pagina, referrer'),
      supabase.from('eventos_contenido').select('bien_nombre, tipo_contenido, tipo_evento'),
    ])
    // Aggregate navegacion
    const navMap: Record<string, number> = {}
    navRows?.forEach(r => {
      const key = `${r.pagina}||${r.referrer ?? ''}`
      navMap[key] = (navMap[key] ?? 0) + 1
    })
    const navegacion: NavegacionCount[] = Object.entries(navMap).map(([key, count]) => {
      const [pagina, referrer] = key.split('||')
      return { pagina, referrer: referrer || null, count }
    }).sort((a, b) => b.count - a.count)
    // Aggregate contenidos
    const contMap: Record<string, ContenidoCount> = {}
    contRows?.forEach(r => {
      const key = `${r.bien_nombre}||${r.tipo_contenido}||${r.tipo_evento}`
      if (!contMap[key]) contMap[key] = { bien_nombre: r.bien_nombre, tipo_contenido: r.tipo_contenido, tipo_evento: r.tipo_evento, count: 0 }
      contMap[key].count++
    })
    const contenidos = Object.values(contMap).sort((a, b) => b.count - a.count)
    setAnalytics({ totalLogins: totalLogins ?? 0, navegacion, contenidos })
    setLoadingAnalytics(false)
  }

  const docentesFiltrados = useMemo(() => {
    return docentes.filter(d => {
      const matchIE = !filtroIE || String(d.ie_id) === filtroIE
      const matchTaller = !filtroTaller || d.taller_slug === filtroTaller
      return matchIE && matchTaller
    })
  }, [docentes, filtroIE, filtroTaller])

  const talleresEnUso = useMemo(() =>
    [...new Set(docentes.map(d => d.taller_slug).filter(Boolean))], [docentes])

  const selectStyle = {
    className: 'px-3 py-2 rounded-xl border-2 text-sm outline-none',
    style: { borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#ffffff' },
  }

  return (
    <div className="min-h-screen" style={{ background: '#043941', fontFamily: "'Manrope', sans-serif" }}>
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-4">
          <GramaLogo variant="light" size="sm" />
          <div className="h-5 w-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <span className="text-sm font-bold text-white">Panel Seguimiento</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{profile?.email}</span>
          <button onClick={() => navigate('/perfil')} className="text-xs px-3 py-1.5 rounded-lg font-semibold"
            style={{ background: 'rgba(2,212,126,0.12)', color: '#02d47e' }}>
            Ver plataforma
          </button>
          <button onClick={signOut} className="p-2 rounded-lg" style={{ color: 'rgba(255,255,255,0.4)' }}
            title="Cerrar sesión">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Tab switcher */}
        <div className="flex gap-2 mb-8">
          {([['docentes', Users, 'Docentes'], ['analytics', BarChart2, 'Analytics']] as const).map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={tab === key
                ? { background: '#02d47e', color: '#043941' }
                : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)' }}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {tab === 'analytics' && (
          <div>
            {loadingAnalytics || !analytics ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-7 w-7 rounded-full border-2 animate-spin"
                  style={{ borderColor: '#02d47e', borderTopColor: 'transparent' }} />
              </div>
            ) : (
              <div className="space-y-8">
                {/* KPIs principales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Inicios de sesión', value: analytics.totalLogins, Icon: LogIn, color: '#02d47e' },
                    { label: 'Visitas al repositorio', value: analytics.navegacion.filter(n => n.pagina === 'repositorio').reduce((a, n) => a + n.count, 0), Icon: Globe, color: '#22d3ee' },
                    { label: 'Manuales abiertos', value: analytics.contenidos.filter(c => c.tipo_evento === 'apertura_manual').reduce((a, c) => a + c.count, 0), Icon: BookOpen, color: '#a78bfa' },
                    { label: 'Videos reproducidos', value: analytics.contenidos.filter(c => c.tipo_evento === 'reproduccion_video').reduce((a, c) => a + c.count, 0), Icon: Video, color: '#f59e0b' },
                  ].map(({ label, value, Icon, color }) => (
                    <div key={label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={14} style={{ color }} />
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</p>
                      </div>
                      <p className="text-2xl font-extrabold" style={{ color }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Visitas por página */}
                <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Globe size={15} style={{ color: '#02d47e' }} /> Visitas por sección</h3>
                  <div className="space-y-3">
                    {analytics.navegacion.map((n, i) => {
                      const maxCount = Math.max(...analytics.navegacion.map(x => x.count))
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-36 text-xs text-right" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            {n.pagina.replace('_', ' ')}
                            {n.referrer && <span className="block text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>desde: {n.referrer}</span>}
                          </div>
                          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                            <div className="h-full rounded-full transition-all" style={{ width: `${Math.round((n.count / maxCount) * 100)}%`, background: '#02d47e' }} />
                          </div>
                          <span className="text-xs font-bold w-8 text-right" style={{ color: 'rgba(255,255,255,0.6)' }}>{n.count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Top contenidos abiertos/reproducidos */}
                <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="px-6 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <FileDown size={15} style={{ color: '#02d47e' }} />
                    <h3 className="text-sm font-bold text-white">Contenidos más accedidos</h3>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['Contenido', 'Tipo', 'Evento', 'Accesos'].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.contenidos.slice(0, 20).map((c, i) => {
                        const eventoColor: Record<string, string> = {
                          apertura_manual: '#a78bfa',
                          reproduccion_video: '#f59e0b',
                          descarga: '#22d3ee',
                          apertura_ficha: '#02d47e',
                        }
                        const color = eventoColor[c.tipo_evento] ?? '#ffffff'
                        return (
                          <tr key={i} style={{ borderBottom: i < Math.min(analytics.contenidos.length, 20) - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                            <td className="px-5 py-3 text-white text-xs">{c.bien_nombre}</td>
                            <td className="px-5 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{c.tipo_contenido}</td>
                            <td className="px-5 py-3">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-lg" style={{ background: `${color}20`, color }}>
                                {c.tipo_evento.replace(/_/g, ' ')}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-xs font-bold" style={{ color }}>{c.count}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'docentes' && <>
        {/* Stats resumen */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Docentes registrados', value: docentes.length, icon: Users },
            { label: 'IEs activas', value: new Set(docentes.map(d => d.ie_id)).size, icon: Filter },
            { label: 'Progreso promedio', value: `${docentes.length > 0 ? Math.round(docentes.reduce((a, d) => a + d.porcentaje, 0) / docentes.length) : 0}%`, icon: RefreshCw },
            { label: 'Completaron > 50%', value: docentes.filter(d => d.porcentaje > 50).length, icon: Download },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</p>
              <p className="text-2xl font-extrabold" style={{ color: '#02d47e' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Controles */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex gap-3 flex-wrap">
            <select value={filtroIE} onChange={e => setFiltroIE(e.target.value)} {...selectStyle}>
              <option value="">Todas las IEs</option>
              {INSTITUCIONES_EDUCATIVAS.map(ie => (
                <option key={ie.id} value={String(ie.id)}>{ie.nombre}</option>
              ))}
            </select>
            <select value={filtroTaller} onChange={e => setFiltroTaller(e.target.value)} {...selectStyle}>
              <option value="">Todos los talleres</option>
              {talleresEnUso.map(slug => {
                const t = talleresConfig.find(t => t.slug === slug)
                return <option key={slug} value={slug!}>{t?.nombre ?? slug}</option>
              })}
            </select>
          </div>
          <button onClick={() => downloadCSV(docentesFiltrados)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: '#02d47e', color: '#043941' }}>
            <Download size={15} /> Descargar CSV
          </button>
        </div>

        {/* Tabla */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="h-7 w-7 rounded-full border-2 animate-spin"
                  style={{ borderColor: '#02d47e', borderTopColor: 'transparent' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Cargando datos…</span>
              </div>
            </div>
          ) : docentesFiltrados.length === 0 ? (
            <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <Users size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No hay docentes registrados aún</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['Docente', 'IE', 'Taller', 'Módulo', 'Progreso', 'Quizzes', 'Último acceso', 'Registro'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-bold"
                        style={{ color: 'rgba(255,255,255,0.35)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {docentesFiltrados.map((d, i) => {
                    const ie = INSTITUCIONES_EDUCATIVAS.find(ie => ie.id === d.ie_id)
                    const taller = talleresConfig.find(t => t.slug === d.taller_slug)
                    return (
                      <tr key={d.id}
                        style={{ borderBottom: i < docentesFiltrados.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                        className="transition-colors hover:bg-white/5">
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-white">{d.nombre_completo}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{d.email}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-white text-xs font-medium">{ie?.nombre ?? '—'}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{ie?.distrito}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-bold px-2 py-1 rounded-lg"
                            style={{ background: 'rgba(2,212,126,0.12)', color: '#02d47e' }}>
                            {taller?.nombreCorto ?? d.taller_slug ?? '—'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          {d.moduloActual ? (
                            <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg"
                              style={{ background: 'rgba(34,211,238,0.12)', color: '#22d3ee' }}>
                              {d.moduloActual}
                            </span>
                          ) : (
                            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full max-w-[80px]" style={{ background: 'rgba(255,255,255,0.1)' }}>
                              <div className="h-full rounded-full transition-all"
                                style={{ width: `${d.porcentaje}%`, background: d.porcentaje >= 80 ? '#02d47e' : d.porcentaje >= 40 ? '#f59e0b' : '#ef4444' }} />
                            </div>
                            <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                              {d.porcentaje}%
                            </span>
                          </div>
                          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            {d.completados}/{d.total} completados
                          </p>
                          {d.visualizados > d.completados && (
                            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                              {d.visualizados} visualizados
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          {d.quizzesAprobados > 0 ? (
                            <span
                              className="text-xs font-bold px-2 py-1 rounded-lg"
                              style={{
                                background: d.quizzesAprobados === d.quizzesTotal
                                  ? 'rgba(2,212,126,0.15)'
                                  : 'rgba(245,158,11,0.12)',
                                color: d.quizzesAprobados === d.quizzesTotal ? '#02d47e' : '#f59e0b',
                              }}
                            >
                              {d.quizzesAprobados}/{d.quizzesTotal}
                            </span>
                          ) : (
                            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>0/{d.quizzesTotal}</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {formatDate(d.last_seen_at)}
                        </td>
                        <td className="px-5 py-3.5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          {formatDate(d.created_at)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs mt-4 text-right" style={{ color: 'rgba(255,255,255,0.2)' }}>
          {docentesFiltrados.length} de {docentes.length} docentes
        </p>
        </>}
      </main>
    </div>
  )
}
