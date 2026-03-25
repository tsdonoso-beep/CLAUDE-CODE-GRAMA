// src/pages/Admin.tsx
import { useState, useEffect, useMemo } from 'react'
import { Download, Users, RefreshCw, LogOut, Filter } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { talleresConfig } from '@/data/talleresConfig'
import { modulosLXP } from '@/data/modulosLXP'
import { useAuth } from '@/contexts/AuthContext'
import { GramaLogo } from '@/components/GramaLogo'
import type { Profile } from '@/types/database'
import { useNavigate } from 'react-router-dom'

const DEV_MODE = !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co'

interface DocenteRow extends Profile {
  completados: number
  visualizados: number   // completado + en_progreso
  total: number
  porcentaje: number
  moduloActual: string | null  // "M0", "M1", etc.
}

/**
 * Total de contenidos del LXP (único sistema de IDs usado en la plataforma).
 * Es el mismo para todos los talleres — los módulos son universales.
 */
function getTotalContenidosLXP(): number {
  return modulosLXP.reduce((acc, m) =>
    acc + m.subSecciones.reduce((a, s) => a + s.contenidos.length, 0), 0)
}

// ── Mock data para DEV_MODE ────────────────────────────────────────────────
function buildMockDocentes(): DocenteRow[] {
  const total = getTotalContenidosLXP()
  const completados = Math.round(total * 0.48)
  const visualizados = Math.round(total * 0.55)
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
  const headers = ['Nombre', 'Email', 'IE', 'Región', 'Taller', 'Completados', 'Visualizados', 'Total', 'Progreso %', 'Módulo actual', 'Último acceso', 'Fecha registro']
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
  const [docentes, setDocentes] = useState<DocenteRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroIE, setFiltroIE] = useState('')
  const [filtroTaller, setFiltroTaller] = useState('')

  useEffect(() => { fetchData() }, [])

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

    // 2. Todos los registros de progreso para esos docentes
    const docenteIds = profiles.map(p => p.id)
    const { data: progresos } = await supabase
      .from('progreso_contenidos')
      .select('usuario_id, contenido_id, estado')
      .in('usuario_id', docenteIds)

    // 3. Agrupar por usuario
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

    const totalLXP = getTotalContenidosLXP()
    const rows: DocenteRow[] = profiles.map(p => {
      const stats = statsPorUsuario[p.id] ?? { completados: 0, visualizados: 0, ids: [] }
      const total = totalLXP
      const porcentaje = total > 0 ? Math.round((stats.completados / total) * 100) : 0
      const moduloActual = calcModuloActual(stats.ids)
      return {
        ...(p as Profile),
        completados: stats.completados,
        visualizados: stats.visualizados,
        total,
        porcentaje,
        moduloActual,
      }
    })

    setDocentes(rows)
    setLoading(false)
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
          <button onClick={() => navigate('/')} className="text-xs px-3 py-1.5 rounded-lg font-semibold"
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
                    {['Docente', 'IE', 'Taller', 'Módulo', 'Progreso', 'Último acceso', 'Registro'].map(h => (
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
                            <span className="text-xs font-black px-2.5 py-1 rounded-lg"
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
      </main>
    </div>
  )
}
