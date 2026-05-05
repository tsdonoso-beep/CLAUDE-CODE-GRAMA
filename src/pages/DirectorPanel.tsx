// src/pages/DirectorPanel.tsx
import { useState, useEffect, useMemo } from 'react'
import {
  LayoutDashboard, Users, BookOpen, LogOut,
  XCircle, CheckCircle, Copy, AlertTriangle,
  RefreshCw, ChevronRight, TrendingUp,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { GramaLogo } from '@/components/GramaLogo'
import { supabase } from '@/lib/supabase'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { talleresConfig } from '@/data/talleresConfig'
import { modulosLXP } from '@/data/modulosLXP'

const DEV_MODE = !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co'

const MAX_DOCENTES_POR_TALLER = 4

interface DocenteRow {
  id: string
  email: string | null
  nombre_completo: string | null
  role: string | null
  ie_id: string | null
  taller_slug: string | null
  taller_slugs: string[] | null
  created_at: string
  last_seen_at: string | null
  completados: number
  total: number
  porcentaje: number
  moduloActual: string | null
}

function getTotalContenidos(): number {
  return modulosLXP.reduce((acc, m) =>
    acc + m.sesiones.reduce((a, s) => a + s.contenidos.length, 0), 0)
}

function generatePassword(): string {
  const lower = 'abcdefghjkmnpqrstuvwxyz'
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const digits = '23456789'
  const specials = '#@!'
  let pwd = ''
  for (let i = 0; i < 5; i++) pwd += lower[Math.floor(Math.random() * lower.length)]
  pwd += upper[Math.floor(Math.random() * upper.length)]
  pwd += digits[Math.floor(Math.random() * digits.length)]
  pwd += specials[Math.floor(Math.random() * specials.length)]
  return pwd.split('').sort(() => Math.random() - 0.5).join('')
}

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(iso))
}

function calcModuloActual(contenidoIds: string[]): string | null {
  let maxM = -1
  for (const id of contenidoIds) {
    const m = id.match(/^m(\d+)-/)
    if (m) { const n = parseInt(m[1]); if (n > maxM) maxM = n }
  }
  return maxM >= 0 ? `M${maxM}` : null
}

function buildMockDocentes(ieId: number): DocenteRow[] {
  const total = getTotalContenidos()
  const ie = INSTITUCIONES_EDUCATIVAS.find(i => i.id === ieId)
  const talleres = ie?.talleres ?? []
  return [
    { id: 'dir-mock-1', email: 'ana.torres@colegio.pe', nombre_completo: 'Ana Torres Ríos', role: 'docente', ie_id: String(ieId), taller_slug: talleres[0] ?? null, taller_slugs: talleres[0] ? [talleres[0]] : null, created_at: '2026-01-15T08:00:00Z', last_seen_at: '2026-04-28T14:30:00Z', completados: Math.round(total * 0.62), total, porcentaje: 62, moduloActual: 'M2' },
    { id: 'dir-mock-2', email: 'pedro.huanca@colegio.pe', nombre_completo: 'Pedro Huanca Mamani', role: 'docente', ie_id: String(ieId), taller_slug: talleres[0] ?? null, taller_slugs: talleres[0] ? [talleres[0]] : null, created_at: '2026-01-20T09:00:00Z', last_seen_at: '2026-03-10T10:00:00Z', completados: Math.round(total * 0.28), total, porcentaje: 28, moduloActual: 'M1' },
    { id: 'dir-mock-3', email: 'rosa.quispe@colegio.pe', nombre_completo: 'Rosa Quispe Condori', role: 'docente', ie_id: String(ieId), taller_slug: talleres[0] ?? null, taller_slugs: talleres[0] ? [talleres[0]] : null, created_at: '2026-02-01T08:00:00Z', last_seen_at: null, completados: 0, total, porcentaje: 0, moduloActual: null },
    { id: 'dir-mock-4', email: 'luis.ccopa@colegio.pe', nombre_completo: 'Luis Ccopa Vargas', role: 'docente', ie_id: String(ieId), taller_slug: talleres[1] ?? null, taller_slugs: talleres[1] ? [talleres[1]] : null, created_at: '2026-01-18T08:00:00Z', last_seen_at: '2026-04-30T09:00:00Z', completados: Math.round(total * 0.85), total, porcentaje: 85, moduloActual: 'M4' },
    { id: 'dir-mock-5', email: 'carmen.flores@colegio.pe', nombre_completo: 'Carmen Flores Díaz', role: 'docente', ie_id: String(ieId), taller_slug: talleres[1] ?? null, taller_slugs: talleres[1] ? [talleres[1]] : null, created_at: '2026-02-10T08:00:00Z', last_seen_at: '2026-04-20T16:00:00Z', completados: Math.round(total * 0.45), total, porcentaje: 45, moduloActual: 'M2' },
  ]
}

// ── Semáforo color ─────────────────────────────────────────────────────────
function semaforoColor(pct: number): string {
  if (pct >= 70) return '#02d47e'
  if (pct >= 40) return '#f59e0b'
  return '#ef4444'
}

export default function DirectorPanel() {
  const { profile, signOut } = useAuth()
  const [tab, setTab] = useState<'panel' | 'docentes' | 'talleres'>('panel')
  const [docentes, setDocentes] = useState<DocenteRow[]>([])
  const [loading, setLoading] = useState(true)
  const [docenteDetalle, setDocenteDetalle] = useState<DocenteRow | null>(null)

  // modal crear
  const [showCrear, setShowCrear] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoEmail, setNuevoEmail] = useState('')
  const [nuevoPassword, setNuevoPassword] = useState(generatePassword)
  const [nuevosTalleres, setNuevosTalleres] = useState<string[]>([])
  const [creando, setCreando] = useState(false)
  const [errCrear, setErrCrear] = useState('')
  const [creadoOk, setCreadoOk] = useState<{ email: string; password: string } | null>(null)
  const [copiado, setCopiado] = useState(false)

  // IE del director
  const ieId = profile?.ie_id ? Number(profile.ie_id) : 5 // fallback mock → Billinghurst
  const ie = INSTITUCIONES_EDUCATIVAS.find(i => i.id === ieId)
  const talleresIE = ie?.talleres ?? []

  const displayName = profile?.nombre_completo ?? profile?.email?.split('@')[0] ?? 'Director'
  const initials = displayName.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase() || 'D'

  useEffect(() => { fetchDocentes() }, [])

  async function fetchDocentes() {
    setLoading(true)
    if (DEV_MODE) {
      setDocentes(buildMockDocentes(ieId))
      setLoading(false)
      return
    }
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'docente')
      .eq('ie_id', String(ieId))
    if (!profiles) { setLoading(false); return }

    const userIds = profiles.map(p => p.id)
    const [{ data: progresos }] = await Promise.all([
      supabase.from('progreso_contenidos').select('user_id, contenido_id').in('user_id', userIds),
    ])
    const total = getTotalContenidos()
    const progMap: Record<string, string[]> = {}
    progresos?.forEach(p => {
      if (!progMap[p.user_id]) progMap[p.user_id] = []
      progMap[p.user_id].push(p.contenido_id)
    })
    setDocentes(profiles.map(p => {
      const ids = progMap[p.id] ?? []
      const completados = ids.length
      return {
        ...p,
        completados,
        total,
        porcentaje: total > 0 ? Math.round((completados / total) * 100) : 0,
        moduloActual: calcModuloActual(ids),
      }
    }))
    setLoading(false)
  }

  async function crearDocente() {
    if (!nuevoNombre.trim() || !nuevoEmail.trim()) { setErrCrear('Nombre y correo son obligatorios'); return }
    if (nuevosTalleres.length === 0) { setErrCrear('Selecciona al menos un taller'); return }
    setErrCrear('')
    setCreando(true)
    if (DEV_MODE) {
      const nuevo: DocenteRow = {
        id: `dir-mock-${Date.now()}`, email: nuevoEmail.trim().toLowerCase(),
        nombre_completo: nuevoNombre.trim(), role: 'docente', ie_id: String(ieId),
        taller_slug: nuevosTalleres[0], taller_slugs: nuevosTalleres,
        created_at: new Date().toISOString(), last_seen_at: null,
        completados: 0, total: getTotalContenidos(), porcentaje: 0, moduloActual: null,
      }
      setDocentes(prev => [...prev, nuevo])
      setCreadoOk({ email: nuevoEmail.trim().toLowerCase(), password: nuevoPassword })
      setCreando(false)
      return
    }
    try {
      const { error: authErr } = await supabase.auth.admin.createUser({
        email: nuevoEmail.trim().toLowerCase(),
        password: nuevoPassword,
        email_confirm: true,
      })
      if (authErr) throw authErr
      await supabase.from('profiles').upsert({
        email: nuevoEmail.trim().toLowerCase(),
        nombre_completo: nuevoNombre.trim(),
        role: 'docente',
        ie_id: String(ieId),
        taller_slug: nuevosTalleres[0],
        taller_slugs: nuevosTalleres,
      })
      setCreadoOk({ email: nuevoEmail.trim().toLowerCase(), password: nuevoPassword })
      fetchDocentes()
    } catch (e: unknown) {
      setErrCrear(e instanceof Error ? e.message : 'Error al crear usuario')
    }
    setCreando(false)
  }

  function resetModal() {
    setNuevoNombre(''); setNuevoEmail(''); setNuevoPassword(generatePassword())
    setNuevosTalleres([]); setErrCrear(''); setCreadoOk(null); setCreando(false)
  }

  // Conteo de docentes por taller (para límite de 6)
  const docentesPorTaller = useMemo(() => {
    const map: Record<string, number> = {}
    docentes.forEach(d => {
      const slugs = d.taller_slugs?.length ? d.taller_slugs : d.taller_slug ? [d.taller_slug] : []
      slugs.forEach(s => { map[s] = (map[s] ?? 0) + 1 })
    })
    return map
  }, [docentes])

  const statsGlobal = useMemo(() => {
    const total = docentes.length
    const avgPct = total > 0 ? Math.round(docentes.reduce((a, d) => a + d.porcentaje, 0) / total) : 0
    const ahora = Date.now()
    const inactivos = docentes.filter(d => !d.last_seen_at || ahora - new Date(d.last_seen_at).getTime() > 7 * 86400000).length
    const talleresActivos = new Set(docentes.flatMap(d => d.taller_slugs?.length ? d.taller_slugs : d.taller_slug ? [d.taller_slug] : [])).size
    return { total, avgPct, inactivos, talleresActivos }
  }, [docentes])

  const statsPorTaller = useMemo(() =>
    talleresIE.map(slug => {
      const cfg = talleresConfig.find(t => t.slug === slug)
      const docs = docentes.filter(d => d.taller_slugs?.includes(slug) || d.taller_slug === slug)
      const avg = docs.length > 0 ? Math.round(docs.reduce((a, d) => a + d.porcentaje, 0) / docs.length) : 0
      return { slug, cfg, docs, avg }
    }), [docentes, talleresIE])

  const necesitanAtencion = useMemo(() => {
    const ahora = Date.now()
    return docentes
      .filter(d => d.porcentaje === 0 || !d.last_seen_at || ahora - new Date(d.last_seen_at).getTime() > 14 * 86400000)
      .slice(0, 5)
  }, [docentes])

  const NAV = [
    { id: 'panel' as const,    label: 'Panel',    Icon: LayoutDashboard },
    { id: 'docentes' as const, label: 'Docentes', Icon: Users },
    { id: 'talleres' as const, label: 'Talleres', Icon: BookOpen },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Manrope', sans-serif" }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside style={{ width: 220, background: '#032d34', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40, display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)' }}>

        <div style={{ padding: '1.25rem 1.1rem .9rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <GramaLogo variant="light" size="sm" />
          <p style={{ fontSize: '.54rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '.4rem' }}>Panel Director</p>
          {ie && (
            <p style={{ fontSize: '.62rem', color: 'rgba(2,212,126,0.7)', fontWeight: 600, marginTop: '.3rem', lineHeight: 1.3 }}>{ie.nombre}</p>
          )}
        </div>

        <nav style={{ flex: 1, padding: '.75rem .6rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <button key={id} onClick={() => setTab(id)} style={{
                display: 'flex', alignItems: 'center', gap: '.6rem', width: '100%',
                padding: '.55rem .7rem', borderRadius: 10, border: 'none', textAlign: 'left',
                cursor: 'pointer', transition: 'all .15s',
                background: active ? 'rgba(2,212,126,0.14)' : 'transparent',
                color: active ? '#02d47e' : 'rgba(255,255,255,0.48)',
              }}>
                <Icon size={15} />
                <span style={{ fontSize: '.8rem', fontWeight: active ? 700 : 500 }}>{label}</span>
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '.85rem .9rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '.6rem' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#02d47e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.68rem', fontWeight: 800, color: '#043941', flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</p>
            <p style={{ fontSize: '.58rem', color: 'rgba(255,255,255,0.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile?.email}</p>
          </div>
          <button onClick={() => signOut()} title="Cerrar sesión" style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>
            <LogOut size={12} />
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main style={{ marginLeft: 220, flex: 1, background: '#f0faf5', minHeight: '100vh' }}>

        {/* Top bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid rgba(4,57,65,0.08)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
          <div>
            <h2 style={{ fontSize: '.95rem', fontWeight: 800, color: '#043941', margin: 0 }}>
              {{ panel: 'Panel', docentes: 'Docentes', talleres: 'Talleres' }[tab]}
            </h2>
            {ie && <p style={{ fontSize: '.68rem', color: 'rgba(4,57,65,0.5)', margin: '2px 0 0' }}>{ie.nombre} · {ie.distrito}</p>}
          </div>
          <button onClick={fetchDocentes} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.72rem', fontWeight: 600, padding: '.38rem .9rem', borderRadius: 8, background: 'rgba(4,57,65,0.06)', color: '#043941', border: '1px solid rgba(4,57,65,0.12)', cursor: 'pointer' }}>
            <RefreshCw size={12} /> Actualizar
          </button>
        </div>

        <div style={{ padding: '1.75rem 2rem' }}>

          {/* ══ TAB: PANEL ══════════════════════════════════════════════════════ */}
          {tab === 'panel' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* KPIs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                {[
                  { label: 'Docentes registrados', value: statsGlobal.total, color: '#02d47e', Icon: Users },
                  { label: 'Progreso promedio', value: `${statsGlobal.avgPct}%`, color: '#22d3ee', Icon: TrendingUp },
                  { label: 'Talleres con docentes', value: statsGlobal.talleresActivos, color: '#a78bfa', Icon: BookOpen },
                  { label: 'Inactivos +7 días', value: statsGlobal.inactivos, color: '#f59e0b', Icon: AlertTriangle },
                ].map(({ label, value, color, Icon }) => (
                  <div key={label} style={{ background: '#fff', borderRadius: 16, padding: '1.1rem 1.2rem', boxShadow: '0 2px 10px rgba(4,57,65,0.07)', border: '1px solid rgba(4,57,65,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '.5rem' }}>
                      <Icon size={14} style={{ color }} />
                      <p style={{ fontSize: '.65rem', color: 'rgba(4,57,65,0.55)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</p>
                    </div>
                    <p style={{ fontSize: '1.9rem', fontWeight: 900, color, lineHeight: 1 }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Semáforo por taller */}
              <div style={{ background: '#fff', borderRadius: 16, padding: '1.4rem', boxShadow: '0 2px 10px rgba(4,57,65,0.07)', border: '1px solid rgba(4,57,65,0.06)' }}>
                <h3 style={{ fontSize: '.88rem', fontWeight: 800, color: '#043941', marginBottom: '1rem' }}>Progreso por taller</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
                  {statsPorTaller.map(({ slug, cfg, docs, avg }) => {
                    const color = semaforoColor(avg)
                    const count = docentesPorTaller[slug] ?? 0
                    return (
                      <div key={slug}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.35rem' }}>
                          <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
                          <span style={{ fontSize: '.82rem', fontWeight: 700, color: '#043941', flex: 1 }}>{cfg?.nombre ?? slug}</span>
                          <span style={{ fontSize: '.68rem', fontWeight: 700, color: count >= MAX_DOCENTES_POR_TALLER ? '#ef4444' : 'rgba(4,57,65,0.5)', background: count >= MAX_DOCENTES_POR_TALLER ? 'rgba(239,68,68,0.1)' : 'rgba(4,57,65,0.06)', padding: '.15rem .5rem', borderRadius: 20 }}>
                            {count}/{MAX_DOCENTES_POR_TALLER} docentes
                          </span>
                          <span style={{ fontSize: '.82rem', fontWeight: 800, color, width: 38, textAlign: 'right' }}>{avg}%</span>
                        </div>
                        <div style={{ height: 7, background: 'rgba(4,57,65,0.07)', borderRadius: 8, overflow: 'hidden', marginLeft: 22 }}>
                          <div style={{ height: '100%', width: `${avg}%`, background: color, borderRadius: 8, transition: 'width .5s ease' }} />
                        </div>
                        {docs.length > 0 && (
                          <div style={{ marginLeft: 22, marginTop: '.45rem', display: 'flex', flexWrap: 'wrap', gap: '.3rem' }}>
                            {docs.map(d => (
                              <span key={d.id} style={{ fontSize: '.6rem', fontWeight: 600, color: 'rgba(4,57,65,0.6)', background: 'rgba(4,57,65,0.05)', padding: '.1rem .45rem', borderRadius: 20, border: '1px solid rgba(4,57,65,0.08)' }}>
                                {d.nombre_completo?.split(' ')[0] ?? d.email?.split('@')[0]} {d.porcentaje}%
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {talleresIE.length === 0 && (
                    <p style={{ fontSize: '.8rem', color: 'rgba(4,57,65,0.4)' }}>No hay talleres asignados a esta IE.</p>
                  )}
                </div>
              </div>

              {/* Docentes que necesitan atención */}
              {necesitanAtencion.length > 0 && (
                <div style={{ background: '#fff', borderRadius: 16, padding: '1.4rem', boxShadow: '0 2px 10px rgba(4,57,65,0.07)', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1rem' }}>
                    <AlertTriangle size={14} color="#f59e0b" />
                    <h3 style={{ fontSize: '.88rem', fontWeight: 800, color: '#043941' }}>Necesitan atención</h3>
                    <span style={{ fontSize: '.65rem', color: 'rgba(4,57,65,0.5)', marginLeft: '.1rem' }}>sin inicio o inactivos +14 días</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                    {necesitanAtencion.map(d => {
                      const slugs = d.taller_slugs?.length ? d.taller_slugs : d.taller_slug ? [d.taller_slug] : []
                      const ahora = Date.now()
                      const diasInactivo = d.last_seen_at ? Math.floor((ahora - new Date(d.last_seen_at).getTime()) / 86400000) : null
                      return (
                        <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '.65rem .9rem', borderRadius: 10, background: 'rgba(4,57,65,0.02)', border: '1px solid rgba(4,57,65,0.07)' }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(4,57,65,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', fontWeight: 800, color: '#043941', flexShrink: 0 }}>
                            {(d.nombre_completo ?? d.email ?? '?').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '.78rem', fontWeight: 700, color: '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.nombre_completo ?? d.email}</p>
                            <div style={{ display: 'flex', gap: '.5rem', marginTop: '.2rem', flexWrap: 'wrap' }}>
                              {slugs.map(s => (
                                <span key={s} style={{ fontSize: '.6rem', fontWeight: 700, background: 'rgba(2,212,126,0.1)', color: '#059669', padding: '.1rem .4rem', borderRadius: 20 }}>
                                  {talleresConfig.find(t => t.slug === s)?.nombreCorto ?? s}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            {d.porcentaje === 0
                              ? <span style={{ fontSize: '.65rem', fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '.15rem .45rem', borderRadius: 20 }}>Sin iniciar</span>
                              : <span style={{ fontSize: '.65rem', fontWeight: 700, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '.15rem .45rem', borderRadius: 20 }}>{diasInactivo}d inactivo</span>
                            }
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <button onClick={() => setTab('docentes')} style={{ marginTop: '.85rem', display: 'flex', alignItems: 'center', gap: 4, fontSize: '.72rem', fontWeight: 700, color: '#043941', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    Ver todos los docentes <ChevronRight size={13} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══ TAB: DOCENTES ═══════════════════════════════════════════════════ */}
          {tab === 'docentes' && (
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#043941', marginBottom: '.25rem' }}>Docentes de {ie?.nombre ?? '—'}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '.35rem' }}>
                    {[
                      { label: 'Total', value: docentes.length },
                      { label: 'Progreso promedio', value: `${statsGlobal.avgPct}%` },
                      { label: '> 50% avance', value: docentes.filter(d => d.porcentaje > 50).length },
                      { label: 'Sin iniciar', value: docentes.filter(d => d.porcentaje === 0).length },
                    ].map(s => (
                      <span key={s.label} style={{ fontSize: '.72rem', color: 'rgba(4,57,65,0.6)' }}>
                        <span style={{ fontWeight: 800, color: '#02d47e', marginRight: '.25rem' }}>{s.value}</span>{s.label}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={() => { resetModal(); setShowCrear(true) }} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.75rem', fontWeight: 700, padding: '.5rem 1.1rem', borderRadius: 10, background: '#02d47e', color: '#043941', border: 'none', cursor: 'pointer' }}>
                  <Users size={13} /> + Nuevo docente
                </button>
              </div>

              {/* Tabla */}
              <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(4,57,65,0.07)', border: '1px solid rgba(4,57,65,0.07)' }}>
                {loading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #02d47e', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
                  </div>
                ) : docentes.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(4,57,65,0.4)' }}>
                    <Users size={40} style={{ margin: '0 auto 1rem', opacity: .35 }} />
                    <p style={{ fontSize: '.9rem' }}>No hay docentes registrados aún</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.83rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(4,57,65,0.08)', background: 'rgba(4,57,65,0.03)' }}>
                          {['Docente', 'Taller', 'Módulo', 'Progreso', 'Último acceso'].map(h => (
                            <th key={h} style={{ padding: '.75rem 1.2rem', textAlign: 'left', fontSize: '.68rem', fontWeight: 700, color: 'rgba(4,57,65,0.5)', textTransform: 'uppercase', letterSpacing: '.07em' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {docentes.map((d, i) => {
                          const slugs = d.taller_slugs?.length ? d.taller_slugs : d.taller_slug ? [d.taller_slug] : []
                          return (
                            <tr key={d.id} onClick={() => setDocenteDetalle(d)} style={{ borderBottom: i < docentes.length - 1 ? '1px solid rgba(4,57,65,0.06)' : 'none', cursor: 'pointer', transition: 'background .15s' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(2,212,126,0.03)' }}
                              onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent' }}>
                              <td style={{ padding: '.85rem 1.2rem' }}>
                                <p style={{ fontWeight: 700, color: '#043941' }}>{d.nombre_completo}</p>
                                <p style={{ fontSize: '.7rem', color: 'rgba(4,57,65,0.5)', marginTop: '.15rem' }}>{d.email}</p>
                              </td>
                              <td style={{ padding: '.85rem 1.2rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                  {slugs.map(s => (
                                    <span key={s} style={{ fontSize: '.65rem', fontWeight: 700, background: 'rgba(2,212,126,0.12)', color: '#059669', padding: '.2rem .55rem', borderRadius: 20 }}>
                                      {talleresConfig.find(t => t.slug === s)?.nombreCorto ?? s}
                                    </span>
                                  ))}
                                  {slugs.length === 0 && <span style={{ fontSize: '.72rem', color: 'rgba(4,57,65,0.35)' }}>—</span>}
                                </div>
                              </td>
                              <td style={{ padding: '.85rem 1.2rem' }}>
                                {d.moduloActual
                                  ? <span style={{ fontSize: '.7rem', fontWeight: 800, background: 'rgba(34,211,238,0.12)', color: '#0891b2', padding: '.2rem .55rem', borderRadius: 20 }}>{d.moduloActual}</span>
                                  : <span style={{ fontSize: '.72rem', color: 'rgba(4,57,65,0.35)' }}>—</span>}
                              </td>
                              <td style={{ padding: '.85rem 1.2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <div style={{ flex: 1, height: 6, background: 'rgba(4,57,65,0.08)', borderRadius: 6, overflow: 'hidden', maxWidth: 80 }}>
                                    <div style={{ height: '100%', width: `${d.porcentaje}%`, background: semaforoColor(d.porcentaje), borderRadius: 6, transition: 'width .4s' }} />
                                  </div>
                                  <span style={{ fontSize: '.75rem', fontWeight: 700, color: semaforoColor(d.porcentaje) }}>{d.porcentaje}%</span>
                                </div>
                                <p style={{ fontSize: '.65rem', color: 'rgba(4,57,65,0.45)', marginTop: '.2rem' }}>{d.completados}/{d.total}</p>
                              </td>
                              <td style={{ padding: '.85rem 1.2rem', fontSize: '.72rem', color: 'rgba(4,57,65,0.55)' }}>
                                {formatDate(d.last_seen_at)}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <p style={{ fontSize: '.68rem', color: 'rgba(4,57,65,0.45)', marginTop: '.6rem', textAlign: 'right' }}>
                {docentes.length} docente{docentes.length !== 1 ? 's' : ''} · haz clic en un usuario para ver detalles
              </p>
            </div>
          )}

          {/* ══ TAB: TALLERES ═══════════════════════════════════════════════════ */}
          {tab === 'talleres' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {statsPorTaller.length === 0 && (
                <p style={{ color: 'rgba(4,57,65,0.5)', fontSize: '.85rem' }}>No hay talleres asignados a esta IE.</p>
              )}
              {statsPorTaller.map(({ slug, cfg, docs, avg }) => {
                const color = semaforoColor(avg)
                const count = docentesPorTaller[slug] ?? 0
                return (
                  <div key={slug} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(4,57,65,0.07)', border: '1px solid rgba(4,57,65,0.07)' }}>
                    {/* Taller header */}
                    <div style={{ padding: '1rem 1.4rem', borderBottom: '1px solid rgba(4,57,65,0.07)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '.6rem', fontWeight: 800, background: '#02d47e', color: '#043941', padding: '.2rem .5rem', borderRadius: 6 }}>
                        T{String(cfg?.numero ?? 0).padStart(2, '0')}
                      </span>
                      <h3 style={{ fontSize: '.95rem', fontWeight: 800, color: '#043941', flex: 1 }}>{cfg?.nombre ?? slug}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                        <span style={{ fontSize: '.8rem', fontWeight: 800, color }}>{avg}%</span>
                        <span style={{ fontSize: '.7rem', color: count >= MAX_DOCENTES_POR_TALLER ? '#ef4444' : 'rgba(4,57,65,0.45)', fontWeight: 600 }}>
                          {count}/{MAX_DOCENTES_POR_TALLER} docentes
                        </span>
                      </div>
                    </div>

                    {/* Progress bar taller */}
                    <div style={{ padding: '.6rem 1.4rem', background: 'rgba(4,57,65,0.02)' }}>
                      <div style={{ height: 6, background: 'rgba(4,57,65,0.07)', borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${avg}%`, background: color, borderRadius: 8, transition: 'width .5s' }} />
                      </div>
                    </div>

                    {/* Docentes list */}
                    {docs.length === 0 ? (
                      <div style={{ padding: '1.5rem', textAlign: 'center', color: 'rgba(4,57,65,0.35)', fontSize: '.8rem' }}>
                        Sin docentes asignados aún
                      </div>
                    ) : (
                      <div>
                        {docs.map((d, i) => (
                          <div key={d.id} style={{ padding: '.75rem 1.4rem', borderTop: i > 0 ? '1px solid rgba(4,57,65,0.06)' : 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(4,57,65,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.62rem', fontWeight: 800, color: '#043941', flexShrink: 0 }}>
                              {(d.nombre_completo ?? '?').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: '.8rem', fontWeight: 700, color: '#043941' }}>{d.nombre_completo}</p>
                              {d.moduloActual && <p style={{ fontSize: '.65rem', color: 'rgba(4,57,65,0.5)', marginTop: '.1rem' }}>En {d.moduloActual}</p>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                              <div style={{ width: 60, height: 5, background: 'rgba(4,57,65,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${d.porcentaje}%`, background: semaforoColor(d.porcentaje), borderRadius: 4 }} />
                              </div>
                              <span style={{ fontSize: '.72rem', fontWeight: 800, color: semaforoColor(d.porcentaje), width: 32, textAlign: 'right' }}>{d.porcentaje}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

        </div>
      </main>

      {/* ── Slide-in detalle docente ─────────────────────────────────────────── */}
      {docenteDetalle && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }} onClick={() => setDocenteDetalle(null)} />
          <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, zIndex: 50, width: 360, background: '#fff', boxShadow: '-4px 0 24px rgba(4,57,65,0.12)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem 1.2rem', borderBottom: '1px solid rgba(4,57,65,0.08)', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(2,212,126,0.12)', border: '1.5px solid rgba(2,212,126,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 800, color: '#059669', flexShrink: 0 }}>
                {(docenteDetalle.nombre_completo ?? '?').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '.88rem', fontWeight: 800, color: '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{docenteDetalle.nombre_completo}</p>
                <p style={{ fontSize: '.65rem', color: 'rgba(4,57,65,0.5)', marginTop: '.1rem' }}>{docenteDetalle.email}</p>
              </div>
              <button onClick={() => setDocenteDetalle(null)} style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(4,57,65,0.07)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#043941' }}>
                <XCircle size={14} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
              {[
                { label: 'Institución', value: ie?.nombre ?? '—' },
                { label: 'Registro', value: formatDate(docenteDetalle.created_at) },
                { label: 'Último acceso', value: formatDate(docenteDetalle.last_seen_at) },
                { label: 'Módulo actual', value: docenteDetalle.moduloActual ?? 'Sin iniciar' },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(4,57,65,0.45)', marginBottom: '.25rem' }}>{label}</p>
                  <p style={{ fontSize: '.82rem', fontWeight: 600, color: '#043941' }}>{value}</p>
                </div>
              ))}
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(4,57,65,0.45)', marginBottom: '.5rem' }}>Progreso</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 8, background: 'rgba(4,57,65,0.08)', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${docenteDetalle.porcentaje}%`, background: semaforoColor(docenteDetalle.porcentaje), borderRadius: 8 }} />
                  </div>
                  <span style={{ fontSize: '.85rem', fontWeight: 800, color: semaforoColor(docenteDetalle.porcentaje) }}>{docenteDetalle.porcentaje}%</span>
                </div>
                <p style={{ fontSize: '.68rem', color: 'rgba(4,57,65,0.5)', marginTop: '.35rem' }}>{docenteDetalle.completados} de {docenteDetalle.total} contenidos completados</p>
              </div>
              <div>
                <p style={{ fontSize: '.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(4,57,65,0.45)', marginBottom: '.4rem' }}>Talleres</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {(docenteDetalle.taller_slugs?.length ? docenteDetalle.taller_slugs : docenteDetalle.taller_slug ? [docenteDetalle.taller_slug] : []).map(s => (
                    <span key={s} style={{ fontSize: '.72rem', fontWeight: 700, background: 'rgba(2,212,126,0.12)', color: '#059669', padding: '.25rem .65rem', borderRadius: 20 }}>
                      {talleresConfig.find(t => t.slug === s)?.nombre ?? s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Modal crear docente ──────────────────────────────────────────────── */}
      {showCrear && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }} onClick={() => !creando && setShowCrear(false)} />
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ width: '100%', maxWidth: 480, background: '#fff', borderRadius: 20, boxShadow: '0 24px 64px rgba(4,57,65,0.18)', maxHeight: '92vh', overflowY: 'auto' }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem 1.4rem', borderBottom: '1px solid rgba(4,57,65,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Users size={16} style={{ color: '#02d47e' }} />
                  <p style={{ fontWeight: 800, color: '#043941', fontSize: '.9rem' }}>Crear nuevo docente</p>
                </div>
                {!creando && !creadoOk && (
                  <button onClick={() => setShowCrear(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(4,57,65,0.4)' }}>
                    <XCircle size={18} />
                  </button>
                )}
              </div>

              <div style={{ padding: '1.4rem' }}>
                {creadoOk ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.6rem', padding: '1rem 0' }}>
                      <CheckCircle size={40} style={{ color: '#02d47e' }} />
                      <p style={{ fontWeight: 800, color: '#043941', fontSize: '1.1rem' }}>¡Docente creado!</p>
                      <p style={{ fontSize: '.75rem', color: 'rgba(4,57,65,0.55)', textAlign: 'center' }}>Guarda estas credenciales antes de cerrar.</p>
                    </div>
                    <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                      {[{ label: 'Correo', value: creadoOk.email }, { label: 'Contraseña', value: creadoOk.password }].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '.72rem', color: 'rgba(4,57,65,0.5)' }}>{label}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <code style={{ fontSize: '.85rem', fontWeight: 700, color: label === 'Contraseña' ? '#d97706' : '#043941', letterSpacing: label === 'Contraseña' ? '.05em' : 0 }}>{value}</code>
                            <button onClick={() => { navigator.clipboard?.writeText(value); setCopiado(true); setTimeout(() => setCopiado(false), 1500) }}
                              style={{ fontSize: '.65rem', padding: '.15rem .45rem', borderRadius: 6, background: 'rgba(245,158,11,0.15)', color: '#d97706', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                              {copiado ? <CheckCircle size={10} /> : <Copy size={10} />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setShowCrear(false)} style={{ width: '100%', padding: '.75rem', borderRadius: 12, background: '#02d47e', color: '#043941', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '.88rem' }}>
                      Cerrar
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {errCrear && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.75rem 1rem', borderRadius: 10, background: 'rgba(239,68,68,0.08)', color: '#ef4444', fontSize: '.8rem' }}>
                        <AlertTriangle size={14} /> {errCrear}
                      </div>
                    )}

                    {/* IE (read-only) */}
                    <div>
                      <label style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, color: 'rgba(4,57,65,0.6)', marginBottom: '.35rem' }}>Institución educativa</label>
                      <div style={{ padding: '.6rem .9rem', borderRadius: 10, background: 'rgba(2,212,126,0.08)', border: '1px solid rgba(2,212,126,0.2)', fontSize: '.82rem', fontWeight: 700, color: '#043941' }}>
                        {ie?.nombre ?? '—'}
                      </div>
                    </div>

                    {/* Nombre */}
                    <div>
                      <label style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, color: 'rgba(4,57,65,0.6)', marginBottom: '.35rem' }}>Nombre completo *</label>
                      <input value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)}
                        placeholder="Prof. Ana García"
                        style={{ width: '100%', padding: '.65rem .9rem', borderRadius: 10, border: '1px solid rgba(4,57,65,0.15)', fontSize: '.85rem', color: '#043941', outline: 'none', boxSizing: 'border-box' }} />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, color: 'rgba(4,57,65,0.6)', marginBottom: '.35rem' }}>Correo electrónico *</label>
                      <input value={nuevoEmail} onChange={e => setNuevoEmail(e.target.value)}
                        type="email" placeholder="docente@colegio.pe"
                        style={{ width: '100%', padding: '.65rem .9rem', borderRadius: 10, border: '1px solid rgba(4,57,65,0.15)', fontSize: '.85rem', color: '#043941', outline: 'none', boxSizing: 'border-box' }} />
                    </div>

                    {/* Contraseña */}
                    <div>
                      <label style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, color: 'rgba(4,57,65,0.6)', marginBottom: '.35rem' }}>Contraseña</label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input value={nuevoPassword} onChange={e => setNuevoPassword(e.target.value)}
                          style={{ flex: 1, padding: '.65rem .9rem', borderRadius: 10, border: '1px solid rgba(245,158,11,0.3)', fontSize: '.85rem', color: '#d97706', fontFamily: 'monospace', letterSpacing: '.05em', outline: 'none', background: 'rgba(245,158,11,0.04)' }} />
                        <button onClick={() => setNuevoPassword(generatePassword())}
                          style={{ padding: '.65rem .9rem', borderRadius: 10, background: 'rgba(245,158,11,0.1)', color: '#d97706', border: '1px solid rgba(245,158,11,0.2)', fontSize: '.75rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          Regenerar
                        </button>
                      </div>
                    </div>

                    {/* Talleres (solo los de la IE, con límite de 6) */}
                    <div>
                      <label style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, color: 'rgba(4,57,65,0.6)', marginBottom: '.35rem' }}>
                        Talleres asignados <span style={{ fontWeight: 400, color: 'rgba(4,57,65,0.4)' }}>(máx. {MAX_DOCENTES_POR_TALLER} docentes por taller)</span>
                      </label>
                      <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(4,57,65,0.12)' }}>
                        {talleresIE.map((slug, i) => {
                          const cfg = talleresConfig.find(t => t.slug === slug)
                          const count = docentesPorTaller[slug] ?? 0
                          const atLimit = count >= MAX_DOCENTES_POR_TALLER
                          const checked = nuevosTalleres.includes(slug)
                          return (
                            <label key={slug} style={{
                              display: 'flex', alignItems: 'center', gap: 10, padding: '.65rem .9rem',
                              borderBottom: i < talleresIE.length - 1 ? '1px solid rgba(4,57,65,0.07)' : 'none',
                              cursor: atLimit ? 'not-allowed' : 'pointer',
                              background: atLimit ? 'rgba(239,68,68,0.03)' : checked ? 'rgba(2,212,126,0.04)' : 'transparent',
                            }}>
                              <input type="checkbox" checked={checked} disabled={atLimit}
                                onChange={e => setNuevosTalleres(prev =>
                                  e.target.checked ? [...prev, slug] : prev.filter(s => s !== slug)
                                )}
                                style={{ accentColor: '#02d47e', width: 15, height: 15 }} />
                              <span style={{ flex: 1, fontSize: '.82rem', fontWeight: 600, color: atLimit ? 'rgba(4,57,65,0.35)' : '#043941' }}>
                                {cfg?.nombre ?? slug}
                              </span>
                              <span style={{ fontSize: '.65rem', fontWeight: 700, color: atLimit ? '#ef4444' : 'rgba(4,57,65,0.45)', background: atLimit ? 'rgba(239,68,68,0.1)' : 'rgba(4,57,65,0.06)', padding: '.1rem .4rem', borderRadius: 20 }}>
                                {count}/{MAX_DOCENTES_POR_TALLER}
                                {atLimit && ' · LLENO'}
                              </span>
                            </label>
                          )
                        })}
                        {talleresIE.length === 0 && (
                          <p style={{ padding: '1rem', fontSize: '.8rem', color: 'rgba(4,57,65,0.4)', textAlign: 'center' }}>Sin talleres disponibles</p>
                        )}
                      </div>
                    </div>

                    <button onClick={crearDocente} disabled={creando} style={{ width: '100%', padding: '.8rem', borderRadius: 12, background: '#02d47e', color: '#043941', fontWeight: 800, border: 'none', cursor: creando ? 'not-allowed' : 'pointer', fontSize: '.9rem', opacity: creando ? .6 : 1, marginTop: '.25rem' }}>
                      {creando ? 'Creando docente…' : 'Crear docente'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
