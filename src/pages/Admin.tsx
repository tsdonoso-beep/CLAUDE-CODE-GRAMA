// src/pages/Admin.tsx
import { useState, useEffect, useMemo } from 'react'
import { Download, Users, RefreshCw, LogOut, Filter, BarChart2, BookOpen, Video, FileDown, Globe, LogIn, AlertTriangle, Inbox, Copy, CheckCircle, XCircle, MessageCircle, Send, LayoutDashboard, TrendingUp, ChevronRight } from 'lucide-react'
import { type ConsultaDB, getAllConsultasAdmin, responderConsultaDB, buildMockConsultas, MODULOS_CONSULTA, formatFechaConsulta } from '@/data/consultasDocentes'
import { supabase } from '@/lib/supabase'
import { INSTITUCIONES_EDUCATIVAS } from '@/data/ieData'
import { talleresConfig } from '@/data/talleresConfig'
import { modulosLXP } from '@/data/modulosLXP'
import { useAuth } from '@/contexts/AuthContext'
import { GramaLogo } from '@/components/GramaLogo'
import type { Profile } from '@/types/database'
import { useNavigate } from 'react-router-dom'

// ── Solicitudes types ──────────────────────────────────────────────────────────
interface SolicitudAcceso {
  id: string
  nombre: string
  email: string
  institucion: string
  ie_id: number | null
  taller_slug: string | null
  mensaje: string | null
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  created_at: string
}

function buildMockSolicitudes(): SolicitudAcceso[] {
  return [
    { id: 'sol-1', nombre: 'María López Vargas', email: 'mlopez@colegio.pe', institucion: 'I.E. 7059 MELITÓN CARBAJAL - LINCE', ie_id: 3, taller_slug: 'mecanica-automotriz', mensaje: 'Soy docente EPT con especialidad en producción automotriz.', estado: 'pendiente', created_at: '2026-04-18T10:30:00Z' },
    { id: 'sol-2', nombre: 'Juan Pérez Torres', email: 'jperez@edu.pe', institucion: 'I.E. 6049 RICARDO PALMA - SURQUILLO', ie_id: 5, taller_slug: 'ebanisteria', mensaje: null, estado: 'pendiente', created_at: '2026-04-19T14:00:00Z' },
    { id: 'sol-3', nombre: 'Ana García Ríos', email: 'agarcia@ept.pe', institucion: 'I.E. 6006 - SAN JUAN DE MIRAFLORES', ie_id: 8, taller_slug: 'electricidad', mensaje: 'Tengo 5 años de experiencia en talleres EPT.', estado: 'aprobado', created_at: '2026-04-15T09:00:00Z' },
    { id: 'sol-4', nombre: 'Luis Ramos Condori', email: 'lramos@colegio.edu.pe', institucion: 'I.E. 1278 - LA MOLINA', ie_id: 11, taller_slug: 'construcciones-metalicas', mensaje: null, estado: 'rechazado', created_at: '2026-04-14T08:00:00Z' },
  ]
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

// ── Quiz performance types ─────────────────────────────────────────────────────
interface QuizStat {
  contenidoId: string
  titulo: string
  modulo: string          // 'M0', 'M1', …
  preguntas: number
  puntajeMinimo?: number
  bloqueante: boolean
  intentos: number        // total rows in quiz_resultados
  docentesUnicos: number  // distinct usuario_ids
  aprobados: number       // distinct usuario_ids con al menos un aprobado=true
  tasaAprobacion: number  // 0-100
}

function buildMockQuizStats(): QuizStat[] {
  // Extraer todos los QUIZ del currículo con stats simuladas realistas
  const data: { id: string; titulo: string; modulo: string; preguntas: number; puntajeMinimo?: number; bloqueante?: boolean; intentos: number; docentesUnicos: number; aprobados: number }[] = [
    { id: 'm0-s03-c5', titulo: 'Quiz: Google Workspace',         modulo: 'M0', preguntas: 8,  intentos: 42, docentesUnicos: 38, aprobados: 34 },
    { id: 'm0-s04-c4', titulo: 'Quiz: IA para el Aprendizaje',  modulo: 'M0', preguntas: 6,  intentos: 39, docentesUnicos: 36, aprobados: 30 },
    { id: 'm0-s05-c5', titulo: 'Quiz: IA creativa',              modulo: 'M0', preguntas: 6,  intentos: 37, docentesUnicos: 35, aprobados: 29 },
    { id: 'm0-s06-c5', titulo: 'Quiz: Herramientas de ideación', modulo: 'M0', preguntas: 6,  intentos: 35, docentesUnicos: 33, aprobados: 27 },
    { id: 'm0-ra1-c1', titulo: 'Evaluación M0',                  modulo: 'M0', preguntas: 15, intentos: 48, docentesUnicos: 32, aprobados: 22 },
    { id: 'm1-s11-c3', titulo: 'Quiz: Metrado de equipos',       modulo: 'M1', preguntas: 10, intentos: 28, docentesUnicos: 22, aprobados: 18 },
    { id: 'm1-s12-c2', titulo: 'Quiz: Instalación y softwares',  modulo: 'M1', preguntas: 10, intentos: 25, docentesUnicos: 21, aprobados: 15 },
    { id: 'm1-s13-c3', titulo: 'Quiz: Seguridad EPP',            modulo: 'M1', preguntas: 8,  intentos: 34, docentesUnicos: 20, aprobados: 14, puntajeMinimo: 80, bloqueante: true },
    { id: 'm1-s14-c2', titulo: "Quiz: Garantías y do's/don'ts",  modulo: 'M1', preguntas: 8,  intentos: 19, docentesUnicos: 17, aprobados: 14 },
    { id: 'm1-ra2-c1', titulo: 'Evaluación M1',                  modulo: 'M1', preguntas: 20, intentos: 26, docentesUnicos: 15, aprobados: 10, puntajeMinimo: 80 },
    { id: 'm2-ra2-c1', titulo: 'Evaluación M2',                  modulo: 'M2', preguntas: 20, intentos: 14, docentesUnicos: 11, aprobados: 8  },
    { id: 'm3-ra3-c1', titulo: 'Evaluación M3',                  modulo: 'M3', preguntas: 20, intentos: 9,  docentesUnicos: 7,  aprobados: 5  },
    { id: 'm5-s51-c4', titulo: 'Quiz: Competencia 1',            modulo: 'M5', preguntas: 8,  intentos: 6,  docentesUnicos: 5,  aprobados: 4  },
    { id: 'm5-s53-c4', titulo: 'Quiz: Competencia 2',            modulo: 'M5', preguntas: 8,  intentos: 5,  docentesUnicos: 5,  aprobados: 3  },
    { id: 'm5-s55-c4', titulo: 'Quiz: Competencia 3',            modulo: 'M5', preguntas: 8,  intentos: 5,  docentesUnicos: 4,  aprobados: 3  },
    { id: 'm5-s57-c4', titulo: 'Quiz: Competencia 4',            modulo: 'M5', preguntas: 8,  intentos: 4,  docentesUnicos: 4,  aprobados: 3  },
  ]
  return data.map(d => ({
    contenidoId: d.id,
    titulo: d.titulo,
    modulo: d.modulo,
    preguntas: d.preguntas,
    puntajeMinimo: d.puntajeMinimo,
    bloqueante: d.bloqueante ?? false,
    intentos: d.intentos,
    docentesUnicos: d.docentesUnicos,
    aprobados: d.aprobados,
    tasaAprobacion: d.docentesUnicos > 0 ? Math.round((d.aprobados / d.docentesUnicos) * 100) : 0,
  }))
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
    acc + m.sesiones.reduce((a, s) => a + s.contenidos.length, 0), 0)
}

function getTotalQuizzesLXP(): number {
  return modulosLXP.reduce((acc, m) =>
    acc + m.sesiones.reduce((a, s) =>
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
  const [tab, setTab] = useState<'panel' | 'talleres' | 'solicitudes' | 'usuarios' | 'consultas' | 'analytics' | 'progreso'>('panel')
  const [solicitudes, setSolicitudes] = useState<SolicitudAcceso[]>([])
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(true)
  const [filtroEstado, setFiltroEstado] = useState<'pendiente' | 'aprobado' | 'rechazado' | 'todas'>('pendiente')
  const [passwordsGeneradas, setPasswordsGeneradas] = useState<Record<string, string>>({})
  const [aprobando, setAprobando] = useState<string | null>(null)
  const [copiadoId, setCopiadoId] = useState<string | null>(null)
  const [docentes, setDocentes] = useState<DocenteRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroIE, setFiltroIE] = useState('')
  const [filtroTaller, setFiltroTaller] = useState('')
  const [busquedaUsuario, setBusquedaUsuario] = useState('')
  const [docenteDetalle, setDocenteDetalle] = useState<DocenteRow | null>(null)
  const [talleresEditando, setTalleresEditando] = useState<string[]>([])
  const [guardandoTalleres, setGuardandoTalleres] = useState(false)
  const [passwordsReset, setPasswordsReset] = useState<Record<string, string>>({})
  const [reseteandoId, setReseteandoId] = useState<string | null>(null)
  const [copiadoBienvenida, setCopiadoBienvenida] = useState<string | null>(null)
  // Consultas
  const [consultasAdmin, setConsultasAdmin] = useState<ConsultaDB[]>([])
  const [loadingConsultas, setLoadingConsultas] = useState(true)
  const [filtroConsultas, setFiltroConsultas] = useState<'pendiente' | 'respondida' | 'todas'>('pendiente')
  const [respuestaTexto, setRespuestaTexto] = useState<Record<string, string>>({})
  const [respondiendoId, setRespondiendoId] = useState<string | null>(null)
  // Modal crear usuario
  const [showCrearModal, setShowCrearModal] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoEmail, setNuevoEmail] = useState('')
  const [nuevoPassword, setNuevoPassword] = useState('')
  const [nuevoRole, setNuevoRole] = useState<'docente' | 'admin'>('docente')
  const [nuevoIeId, setNuevoIeId] = useState<number | ''>('')
  const [nuevosTalleres, setNuevosTalleres] = useState<string[]>([])
  const [creandoUsuario, setCreandoUsuario] = useState(false)
  const [errCrear, setErrCrear] = useState('')
  const [usuarioCreadoOk, setUsuarioCreadoOk] = useState<{ email: string; password: string } | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loadingAnalytics, setLoadingAnalytics] = useState(false)
  const [filtroAnalyticsDocente, setFiltroAnalyticsDocente] = useState('')
  const [busquedaDocente, setBusquedaDocente] = useState('')
  const [quizStats, setQuizStats] = useState<QuizStat[]>([])
  const [filtroInactividad, setFiltroInactividad] = useState<7 | 14 | 30>(30)
  const [copiadoEmailsRetención, setCopiadoEmailsRetención] = useState(false)

  useEffect(() => { fetchData(); fetchSolicitudes(); fetchConsultasAdmin() }, [])
  useEffect(() => { if (tab === 'analytics') fetchAnalytics(filtroAnalyticsDocente || undefined) }, [tab, filtroAnalyticsDocente])
  useEffect(() => {
    if (!docenteDetalle) return
    const current = docenteDetalle.taller_slugs?.length
      ? docenteDetalle.taller_slugs
      : docenteDetalle.taller_slug ? [docenteDetalle.taller_slug] : []
    setTalleresEditando(current)
  }, [docenteDetalle?.id])

  async function fetchData() {
    setLoading(true)

    // En DEV_MODE sin Supabase real, usar datos mock
    if (DEV_MODE) {
      setDocentes(buildMockDocentes())
      setQuizStats(buildMockQuizStats())
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

    // 5. Quiz stats por contenido
    type QBucket = { intentos: number; docentes: Set<string>; aprobados: Set<string> }
    const qBuckets: Record<string, QBucket> = {}
    quizResults?.forEach(q => {
      if (!qBuckets[q.contenido_id]) qBuckets[q.contenido_id] = { intentos: 0, docentes: new Set(), aprobados: new Set() }
      qBuckets[q.contenido_id].intentos++
      qBuckets[q.contenido_id].docentes.add(q.usuario_id)
      if (q.aprobado) qBuckets[q.contenido_id].aprobados.add(q.usuario_id)
    })
    const computedQuizStats: QuizStat[] = modulosLXP.flatMap(m =>
      m.sesiones.flatMap(s =>
        s.contenidos
          .filter(c => c.tipo === 'QUIZ')
          .map(c => {
            const b = qBuckets[c.id] ?? { intentos: 0, docentes: new Set(), aprobados: new Set() }
            const docentesUnicos = b.docentes.size
            const aprobados = b.aprobados.size
            return {
              contenidoId: c.id,
              titulo: c.titulo,
              modulo: `M${m.numero}`,
              preguntas: c.preguntas ?? 0,
              puntajeMinimo: (c as { puntajeMinimo?: number }).puntajeMinimo,
              bloqueante: (c as { bloqueaSiguiente?: boolean }).bloqueaSiguiente ?? false,
              intentos: b.intentos,
              docentesUnicos,
              aprobados,
              tasaAprobacion: docentesUnicos > 0 ? Math.round((aprobados / docentesUnicos) * 100) : 0,
            }
          })
      )
    )
    setQuizStats(computedQuizStats)
    setLoading(false)
  }

  async function fetchConsultasAdmin() {
    setLoadingConsultas(true)
    if (DEV_MODE) {
      setConsultasAdmin(buildMockConsultas())
      setLoadingConsultas(false)
      return
    }
    const data = await getAllConsultasAdmin()
    setConsultasAdmin(data)
    setLoadingConsultas(false)
  }

  async function responderConsulta(id: string) {
    const texto = respuestaTexto[id]?.trim()
    if (!texto) return
    setRespondiendoId(id)
    if (!DEV_MODE) {
      await responderConsultaDB(id, texto, profile?.email ?? '')
    }
    setConsultasAdmin(prev => prev.map(c =>
      c.id === id ? { ...c, estado: 'respondida', respuesta: texto, responded_at: new Date().toISOString(), responded_by: profile?.email ?? '' } : c
    ))
    setRespuestaTexto(prev => { const n = { ...prev }; delete n[id]; return n })
    setRespondiendoId(null)
  }

  function generarMensajeBienvenida(nombre: string, email: string, password: string): string {
    const url = `${window.location.origin}/login`
    return `¡Hola ${nombre}!

Tu acceso a la Plataforma GRAMA de Capacitación Docente ha sido activado.

🔗 Plataforma: ${url}
📧 Correo: ${email}
🔑 Contraseña: ${password}

Ingresa con esas credenciales y explora tu taller. Ante cualquier duda, responde este mensaje.

Saludos,
Equipo GRAMA · Programa TSF-MINEDU`
  }

  function copiarAlPortapapeles(texto: string) {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(texto).catch(() => copiarFallback(texto))
    } else {
      copiarFallback(texto)
    }
  }

  function copiarFallback(texto: string) {
    const el = document.createElement('textarea')
    el.value = texto
    el.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  function copiarBienvenida(nombre: string, email: string, password: string, id: string) {
    copiarAlPortapapeles(generarMensajeBienvenida(nombre, email, password))
    setCopiadoBienvenida(id)
    setTimeout(() => setCopiadoBienvenida(null), 2000)
  }

  async function resetearPassword(docente: DocenteRow) {
    setReseteandoId(docente.id)
    const newPwd = generatePassword()
    if (!DEV_MODE) {
      // Requiere service role key en el cliente — falla silenciosamente.
      // Alternativa: ejecutar en Supabase Dashboard → Authentication → Users → editar.
      const { error } = await (supabase.auth as any).admin?.updateUserById?.(docente.id, { password: newPwd }) ?? {}
      if (error) console.warn('[reset] admin API no disponible en cliente:', error.message)
    }
    setPasswordsReset(prev => ({ ...prev, [docente.id]: newPwd }))
    setReseteandoId(null)
  }

  function abrirModalCrear() {
    setNuevoNombre(''); setNuevoEmail(''); setNuevoPassword(generatePassword())
    setNuevoRole('docente'); setNuevoIeId(''); setNuevosTalleres([])
    setErrCrear(''); setUsuarioCreadoOk(null)
    setShowCrearModal(true)
  }

  async function crearUsuario() {
    if (!nuevoNombre.trim() || !nuevoEmail.trim()) {
      setErrCrear('Nombre y correo son obligatorios.')
      return
    }
    setCreandoUsuario(true); setErrCrear('')
    if (DEV_MODE) {
      const total = getTotalContenidosLXP()
      const mock: DocenteRow = {
        id: `mock-${Date.now()}`, email: nuevoEmail.trim().toLowerCase(),
        nombre_completo: nuevoNombre.trim(), display_name: nuevoNombre.trim(),
        role: nuevoRole, ie_id: nuevoIeId ? String(nuevoIeId) : null,
        taller_slug: nuevosTalleres[0] ?? null,
        taller_slugs: nuevosTalleres.length ? nuevosTalleres : null,
        created_at: new Date().toISOString(), last_seen_at: new Date().toISOString(), updated_at: new Date().toISOString(),
        completados: 0, visualizados: 0, total, porcentaje: 0,
        moduloActual: null, quizzesAprobados: 0, quizzesTotal: getTotalQuizzesLXP(),
      } as DocenteRow
      setDocentes(prev => [mock, ...prev])
      setUsuarioCreadoOk({ email: nuevoEmail.trim().toLowerCase(), password: nuevoPassword })
      setCreandoUsuario(false)
      return
    }
    const { data: userData, error } = await supabase.auth.signUp({
      email: nuevoEmail.trim().toLowerCase(),
      password: nuevoPassword,
      options: { data: { nombre_completo: nuevoNombre.trim() } },
    })
    if (error) { setErrCrear(error.message); setCreandoUsuario(false); return }
    if (userData?.user) {
      await supabase.from('profiles').update({
        nombre_completo: nuevoNombre.trim(),
        role: nuevoRole,
        ie_id: nuevoIeId || null,
        taller_slug: nuevosTalleres[0] ?? null,
        taller_slugs: nuevosTalleres.length ? nuevosTalleres : null,
      }).eq('id', userData.user.id)
    }
    setUsuarioCreadoOk({ email: nuevoEmail.trim().toLowerCase(), password: nuevoPassword })
    fetchData()
    setCreandoUsuario(false)
  }

  async function actualizarTalleresDocente(docente: DocenteRow, talleres: string[]) {
    setGuardandoTalleres(true)
    const updated = { ...docente, taller_slug: talleres[0] ?? null, taller_slugs: talleres.length ? talleres : null }
    if (!DEV_MODE) {
      await supabase.from('profiles').update({
        taller_slug: talleres[0] ?? null,
        taller_slugs: talleres.length ? talleres : null,
      }).eq('id', docente.id)
    }
    setDocentes(prev => prev.map(d => d.id === docente.id ? updated as DocenteRow : d))
    setDocenteDetalle(updated as DocenteRow)
    setTalleresEditando(talleres)
    setGuardandoTalleres(false)
  }

  async function fetchSolicitudes() {
    setLoadingSolicitudes(true)
    if (DEV_MODE) {
      setSolicitudes(buildMockSolicitudes())
      setLoadingSolicitudes(false)
      return
    }
    const { data } = await supabase
      .from('solicitudes_acceso')
      .select('*')
      .order('created_at', { ascending: false })
    setSolicitudes((data as SolicitudAcceso[]) ?? [])
    setLoadingSolicitudes(false)
  }

  async function aprobarSolicitud(sol: SolicitudAcceso) {
    setAprobando(sol.id)
    const password = generatePassword()
    if (DEV_MODE) {
      setSolicitudes(prev => prev.map(s => s.id === sol.id ? { ...s, estado: 'aprobado' } : s))
      setPasswordsGeneradas(prev => ({ ...prev, [sol.id]: password }))
      setFiltroEstado('aprobado')
      setAprobando(null)
      return
    }
    // Crear usuario en Supabase Auth
    const { data: userData } = await supabase.auth.signUp({
      email: sol.email,
      password,
      options: { data: { nombre_completo: sol.nombre } },
    })
    if (userData?.user) {
      await supabase.from('profiles').upsert({
        id: userData.user.id,
        email: sol.email,
        nombre_completo: sol.nombre,
        role: 'docente',
        ie_id: sol.ie_id,
        taller_slug: sol.taller_slug,
      })
    }
    await supabase.from('solicitudes_acceso').update({
      estado: 'aprobado',
      reviewed_at: new Date().toISOString(),
      reviewed_by: profile?.email ?? '',
    }).eq('id', sol.id)
    setSolicitudes(prev => prev.map(s => s.id === sol.id ? { ...s, estado: 'aprobado' } : s))
    setPasswordsGeneradas(prev => ({ ...prev, [sol.id]: password }))
    setFiltroEstado('aprobado')
    setAprobando(null)
  }

  async function rechazarSolicitud(sol: SolicitudAcceso) {
    if (DEV_MODE) {
      setSolicitudes(prev => prev.map(s => s.id === sol.id ? { ...s, estado: 'rechazado' } : s))
      return
    }
    await supabase.from('solicitudes_acceso').update({
      estado: 'rechazado',
      reviewed_at: new Date().toISOString(),
      reviewed_by: profile?.email ?? '',
    }).eq('id', sol.id)
    setSolicitudes(prev => prev.map(s => s.id === sol.id ? { ...s, estado: 'rechazado' } : s))
  }

  async function fetchAnalytics(usuarioId?: string) {
    setLoadingAnalytics(true)
    if (DEV_MODE) {
      setAnalytics(buildMockAnalytics())
      setLoadingAnalytics(false)
      return
    }
    let sesionQuery = supabase.from('eventos_sesion').select('*', { count: 'exact', head: true })
    let navQuery    = supabase.from('eventos_navegacion').select('pagina, referrer')
    let contQuery   = supabase.from('eventos_contenido').select('bien_nombre, tipo_contenido, tipo_evento')
    if (usuarioId) {
      sesionQuery = sesionQuery.eq('usuario_id', usuarioId)
      navQuery    = navQuery.eq('usuario_id', usuarioId)
      contQuery   = contQuery.eq('usuario_id', usuarioId)
    }
    const [{ count: totalLogins }, { data: navRows }, { data: contRows }] = await Promise.all([
      sesionQuery, navQuery, contQuery,
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
    const q = busquedaUsuario.toLowerCase().trim()
    return docentes.filter(d => {
      const matchIE = !filtroIE || String(d.ie_id) === filtroIE
      const matchTaller = !filtroTaller || d.taller_slug === filtroTaller || (d.taller_slugs?.includes(filtroTaller) ?? false)
      const matchBusqueda = !q ||
        d.nombre_completo?.toLowerCase().includes(q) ||
        d.email?.toLowerCase().includes(q)
      return matchIE && matchTaller && matchBusqueda
    })
  }, [docentes, filtroIE, filtroTaller, busquedaUsuario])

  const solicitudesFiltradas = useMemo(() => {
    if (filtroEstado === 'todas') return solicitudes
    return solicitudes.filter(s => s.estado === filtroEstado)
  }, [solicitudes, filtroEstado])

  const talleresEnUso = useMemo(() =>
    [...new Set(docentes.flatMap(d => [d.taller_slug, ...(d.taller_slugs ?? [])]).filter((s): s is string => !!s))], [docentes])

  const selectStyle = {
    className: 'px-3 py-2 rounded-xl border-2 text-sm outline-none',
    style: { borderColor: 'rgba(255,255,255,0.15)', background: '#ffffff', color: '#ffffff' },
  }

  // ── helpers de sidebar ──────────────────────────────────────────────────────
  const PAGE_TITLES: Record<string, string> = {
    panel: 'Panel', talleres: 'Talleres', solicitudes: 'Solicitudes de acceso',
    usuarios: 'Docentes', consultas: 'Consultas', analytics: 'Reportes', progreso: 'Progreso',
  }
  const solicitudesPendientes = solicitudes.filter(s => s.estado === 'pendiente').length
  const consultasPendientes   = consultasAdmin.filter(c => c.estado === 'pendiente').length

  type NavId = typeof tab
  const NAV_GROUPS: { label: string; items: { id: NavId; label: string; icon: React.ElementType; badge?: number }[] }[] = [
    { label: 'Principal', items: [
      { id: 'panel',    label: 'Panel',    icon: LayoutDashboard },
      { id: 'talleres', label: 'Talleres', icon: BookOpen },
    ]},
    { label: 'Usuarios', items: [
      { id: 'usuarios',    label: 'Docentes',    icon: Users },
      { id: 'solicitudes', label: 'Solicitudes', icon: Inbox,          badge: solicitudesPendientes },
      { id: 'consultas',   label: 'Consultas',   icon: MessageCircle,  badge: consultasPendientes },
    ]},
    { label: 'Analítica', items: [
      { id: 'analytics', label: 'Reportes', icon: BarChart2  },
      { id: 'progreso',  label: 'Progreso', icon: TrendingUp },
    ]},
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Manrope', sans-serif" }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside style={{ width: 240, background: '#032d34', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40, display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)' }}>

        {/* Logo */}
        <div style={{ padding: '1.25rem 1.1rem .9rem', borderBottom: '1px solid rgba(4,57,65,0.12)' }}>
          <GramaLogo variant="light" size="sm" />
          <p style={{ fontSize: '.56rem', color: 'rgba(4,57,65,0.6)', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '.45rem' }}>Panel de administración</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '.6rem .55rem' }}>
          {NAV_GROUPS.map(group => (
            <div key={group.label} style={{ marginBottom: '1.1rem' }}>
              <p style={{ fontSize: '.56rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.52)', padding: '.3rem .6rem .4rem' }}>{group.label}</p>
              {group.items.map(item => {
                const active = tab === item.id
                return (
                  <button key={item.id} onClick={() => setTab(item.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '.6rem', width: '100%', padding: '.55rem .7rem', borderRadius: 10, marginBottom: 2, cursor: 'pointer', border: 'none', textAlign: 'left', transition: 'all .15s',
                      background: active ? 'rgba(2,212,126,0.13)' : 'transparent',
                      borderLeft: active ? '2.5px solid #02d47e' : '2.5px solid transparent',
                      color: active ? '#ffffff' : 'rgba(255,255,255,0.48)',
                    }}>
                    <item.icon size={15} />
                    <span style={{ fontSize: '.8rem', fontWeight: active ? 700 : 500, flex: 1 }}>{item.label}</span>
                    {(item.badge ?? 0) > 0 && (
                      <span style={{ fontSize: '.62rem', fontWeight: 800, background: 'rgba(239,68,68,0.22)', color: '#ef4444', padding: '.15rem .45rem', borderRadius: 20, lineHeight: 1.4 }}>{item.badge}</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div style={{ padding: '.8rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#02d47e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', fontWeight: 800, color: '#043941', flexShrink: 0 }}>
              {profile?.email?.[0]?.toUpperCase() ?? 'A'}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '.72rem', fontWeight: 700, color: '#043941' }}>Admin</p>
              <p style={{ fontSize: '.6rem', color: '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>{profile?.email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.4rem' }}>
            <button onClick={() => navigate('/')} style={{ flex: 1, fontSize: '.68rem', fontWeight: 600, padding: '.38rem .5rem', borderRadius: 8, background: 'rgba(2,212,126,0.12)', color: '#02d47e', border: '1px solid rgba(2,212,126,0.15)', cursor: 'pointer' }}>
              Ver plataforma
            </button>
            <button onClick={signOut} title="Cerrar sesión" style={{ width: 30, height: 30, borderRadius: 8, background: '#ffffff', color: '#043941', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f7f6' }}>

        {/* Top header */}
        <header style={{ height: 56, borderBottom: '1px solid rgba(4,57,65,0.12)', padding: '0 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', position: 'sticky', top: 0, zIndex: 30 }}>
          <h2 style={{ fontSize: '.88rem', fontWeight: 700, color: '#043941' }}>{PAGE_TITLES[tab]}</h2>
          <button onClick={fetchData} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.72rem', fontWeight: 600, padding: '.35rem .85rem', borderRadius: 8, background: 'rgba(4,57,65,0.05)', color: '#043941', border: '1px solid rgba(4,57,65,0.15)', cursor: 'pointer' }}>
            <RefreshCw size={12} /> Actualizar
          </button>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '1.75rem 2rem' }}>

        {/* ── PANEL DASHBOARD ───────────────────────────────────────────────── */}
        {tab === 'panel' && (
          <div>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#043941', marginBottom: '1.5rem' }}>
              Hola, <span style={{ color: '#02d47e' }}>Admin</span>
            </p>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {([
                { label: 'Docentes activos',      value: docentes.length,           icon: Users,         color: '#02d47e' },
                { label: 'Talleres',              value: talleresConfig.length,      icon: BookOpen,      color: '#60a5fa' },
                { label: 'Solicitudes pendientes',value: solicitudesPendientes,      icon: Inbox,         color: '#f59e0b' },
                { label: 'Consultas pendientes',  value: consultasPendientes,        icon: MessageCircle, color: '#c084fc' },
              ] as { label: string; value: number; icon: React.ElementType; color: string }[]).map(s => (
                <div key={s.label} style={{ background: '#ffffff', borderRadius: 16, padding: '1.2rem', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: '.6rem', color: 'rgba(4,57,65,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.5rem' }}>{s.label}</p>
                      <p style={{ fontSize: '2rem', fontWeight: 900, color: '#043941', lineHeight: 1 }}>{s.value}</p>
                    </div>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: `${s.color}1f`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <s.icon size={15} color={s.color} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <p style={{ fontSize: '.6rem', color: '#043941', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.9rem' }}>Acciones rápidas</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {([
                { label: 'Revisar solicitudes', desc: 'Aprobar o rechazar nuevos accesos', id: 'solicitudes', icon: Inbox },
                { label: 'Gestionar docentes',  desc: 'Ver progreso y resetear contraseñas', id: 'usuarios',   icon: Users },
                { label: 'Ver reportes',        desc: 'Accesos, navegación y contenidos',    id: 'analytics',  icon: BarChart2 },
              ] as { label: string; desc: string; id: NavId; icon: React.ElementType }[]).map(a => (
                <button key={a.id} onClick={() => setTab(a.id)}
                  style={{ textAlign: 'left', background: '#ffffff', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.1rem 1.1rem 1rem', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(2,212,126,0.3)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(2,212,126,0.05)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)' }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(2,212,126,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.75rem' }}>
                    <a.icon size={15} color="#02d47e" />
                  </div>
                  <p style={{ fontSize: '.82rem', fontWeight: 700, color: '#043941', marginBottom: '.25rem' }}>{a.label}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '.7rem', color: 'rgba(4,57,65,0.6)', lineHeight: 1.4 }}>{a.desc}</p>
                    <ChevronRight size={13} color="rgba(4,57,65,0.45)" />
                  </div>
                </button>
              ))}
            </div>

            {/* Talleres overview */}
            <p style={{ fontSize: '.6rem', color: '#043941', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.9rem' }}>Talleres activos</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '.75rem' }}>
              {talleresConfig.map(t => {
                const count = docentes.filter(d => d.taller_slug === t.slug || d.taller_slugs?.includes(t.slug)).length
                return (
                  <button key={t.slug}
                    onClick={() => navigate(`/taller/${t.slug}`)}
                    style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '1rem', cursor: 'pointer', textAlign: 'left', transition: 'border-color .15s, background .15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(2,212,126,0.3)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(2,212,126,0.06)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.5rem' }}>
                      <span style={{ fontSize: '.6rem', fontWeight: 800, background: '#02d47e', color: '#043941', padding: '.18rem .45rem', borderRadius: 6 }}>T{String(t.numero).padStart(2, '0')}</span>
                      <span style={{ fontSize: '.68rem', color: '#043941' }}>{count} docente{count !== 1 ? 's' : ''}</span>
                    </div>
                    <p style={{ fontSize: '.82rem', fontWeight: 700, color: '#043941' }}>{t.nombre}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── TALLERES ──────────────────────────────────────────────────────── */}
        {tab === 'talleres' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {talleresConfig.map(t => {
              const count = docentes.filter(d => d.taller_slug === t.slug || d.taller_slugs?.includes(t.slug)).length
              return (
                <div key={t.slug} style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.85rem' }}>
                    <span style={{ fontSize: '.65rem', fontWeight: 800, background: '#02d47e', color: '#043941', padding: '.22rem .55rem', borderRadius: 7 }}>T{String(t.numero).padStart(2, '0')}</span>
                    <span style={{ fontSize: '.72rem', color: '#043941' }}>{count} docente{count !== 1 ? 's' : ''} asignado{count !== 1 ? 's' : ''}</span>
                  </div>
                  <p style={{ fontSize: '.92rem', fontWeight: 700, color: '#043941', marginBottom: '.35rem' }}>{t.nombre}</p>
                  <p style={{ fontSize: '.72rem', color: '#043941', lineHeight: 1.5, flex: 1, marginBottom: '1rem' }}>{t.descripcion?.slice(0, 90)}…</p>
                  <button
                    onClick={() => navigate(`/taller/${t.slug}`)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem', width: '100%', padding: '.5rem', borderRadius: 10, background: 'rgba(2,212,126,0.12)', color: '#02d47e', border: '1px solid rgba(2,212,126,0.2)', fontSize: '.75rem', fontWeight: 700, cursor: 'pointer' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(2,212,126,0.18)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(2,212,126,0.1)' }}
                  >
                    Ver taller <ChevronRight size={13} />
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* ── PROGRESO ──────────────────────────────────────────────────────── */}
        {tab === 'progreso' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {docentes.slice().sort((a, b) => (b.completados ?? 0) - (a.completados ?? 0)).map(d => {
                const pct = Math.round(((d.completados ?? 0) / Math.max(getTotalContenidosLXP(), 1)) * 100)
                return (
                  <div key={d.id} style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '1.1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', marginBottom: '.75rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(2,212,126,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 800, color: '#02d47e', flexShrink: 0 }}>
                        {d.nombre?.[0]?.toUpperCase() ?? '?'}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '.78rem', fontWeight: 700, color: '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.nombre}</p>
                        <p style={{ fontSize: '.65rem', color: '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {(d.taller_slugs?.length ? d.taller_slugs : d.taller_slug ? [d.taller_slug] : []).map(s => talleresConfig.find(t => t.slug === s)?.nombreCorto ?? s).join(' · ') || 'Sin taller'}
                        </p>
                      </div>
                      <span style={{ marginLeft: 'auto', fontSize: '.8rem', fontWeight: 800, color: pct >= 70 ? '#02d47e' : pct >= 30 ? '#f59e0b' : 'rgba(255,255,255,0.4)', flexShrink: 0 }}>{pct}%</span>
                    </div>
                    <div style={{ height: 4, background: '#ffffff', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: pct >= 70 ? '#02d47e' : pct >= 30 ? '#f59e0b' : 'rgba(4,57,65,0.3)', borderRadius: 4, transition: 'width .4s ease' }} />
                    </div>
                    <p style={{ fontSize: '.62rem', color: '#043941', marginTop: '.4rem' }}>{d.completados ?? 0} / {getTotalContenidosLXP()} contenidos</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {tab === 'solicitudes' && (
          <div>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#043941', marginBottom: '.25rem' }}>Solicitudes de acceso</h3>
                <p style={{ fontSize: '.72rem', color: 'rgba(4,57,65,0.6)' }}>
                  {solicitudesPendientes > 0 ? <span style={{ color: '#f59e0b', fontWeight: 700 }}>{solicitudesPendientes} pendientes</span> : 'Sin pendientes'} · {solicitudes.length} en total
                </p>
              </div>
              <button onClick={fetchSolicitudes} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.72rem', fontWeight: 600, padding: '.4rem .9rem', borderRadius: 9, background: '#ffffff', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
                <RefreshCw size={12} /> Recargar
              </button>
            </div>
            {/* Filtros */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '1.25rem' }}>
              {([
                ['pendiente', 'Pendientes'],
                ['aprobado', 'Aprobadas'],
                ['rechazado', 'Rechazadas'],
                ['todas', 'Todas'],
              ] as const).map(([estado, label]) => {
                const count = estado === 'todas' ? solicitudes.length : solicitudes.filter(s => s.estado === estado).length
                const active = filtroEstado === estado
                return (
                  <button key={estado} onClick={() => setFiltroEstado(estado)}
                    style={{ padding: '.38rem .9rem', borderRadius: 20, fontSize: '.75rem', fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'all .15s',
                      background: active ? '#f59e0b' : 'rgba(255,255,255,0.07)',
                      color:      active ? '#043941' : 'rgba(255,255,255,0.5)' }}>
                    {label} <span style={{ opacity: .7 }}>({count})</span>
                  </button>
                )
              })}
            </div>

            {/* Aviso contraseñas sensibles */}
            <div className="flex items-start gap-3 px-5 py-4 rounded-2xl mb-6"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <AlertTriangle size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 1 }} />
              <div>
                <p className="text-sm font-bold" style={{ color: '#f59e0b' }}>Información sensible</p>
                <p className="text-xs mt-0.5" style={{ color: '#043941' }}>
                  Las contraseñas se muestran para que puedas hacer respaldo. Mantenlas en privado.
                </p>
              </div>
            </div>

            {/* Lista de solicitudes */}
            {loadingSolicitudes ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-7 w-7 rounded-full border-2 animate-spin"
                  style={{ borderColor: '#02d47e', borderTopColor: 'transparent' }} />
              </div>
            ) : solicitudesFiltradas.length === 0 ? (
              <div className="text-center py-20 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Inbox size={36} className="mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.42)' }} />
                <p className="text-sm" style={{ color: '#043941' }}>
                  No hay solicitudes en esta categoría.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {solicitudesFiltradas.map(sol => {
                  const taller = talleresConfig.find(t => t.slug === sol.taller_slug)
                  const password = passwordsGeneradas[sol.id]
                  const borderColor = sol.estado === 'aprobado'
                    ? 'rgba(2,212,126,0.25)'
                    : sol.estado === 'rechazado'
                    ? 'rgba(239,68,68,0.2)'
                    : 'rgba(255,255,255,0.08)'
                  return (
                    <div key={sol.id} className="rounded-2xl p-5"
                      style={{ background: '#ffffff', border: `1px solid ${borderColor}` }}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <p className="font-bold text-white">{sol.nombre}</p>
                            <span className="text-xs px-2 py-0.5 rounded-lg font-bold"
                              style={sol.estado === 'pendiente'
                                ? { background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }
                                : sol.estado === 'aprobado'
                                ? { background: 'rgba(2,212,126,0.15)', color: '#02d47e' }
                                : { background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>
                              {sol.estado === 'pendiente' ? 'Pendiente' : sol.estado === 'aprobado' ? 'Aprobada' : 'Rechazada'}
                            </span>
                          </div>
                          <p className="text-xs mb-2" style={{ color: '#043941' }}>{sol.email}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mb-1" style={{ color: '#043941' }}>
                            {sol.institucion && <span>{sol.institucion}</span>}
                            {taller && <span>Taller: <span style={{ color: '#02d47e' }}>{taller.nombreCorto ?? taller.nombre}</span></span>}
                            <span>{formatDate(sol.created_at)}</span>
                          </div>
                          {sol.mensaje && (
                            <p className="mt-2 text-xs px-3 py-2 rounded-lg italic"
                              style={{ background: '#ffffff', color: '#043941', border: '1px solid rgba(255,255,255,0.06)' }}>
                              "{sol.mensaje}"
                            </p>
                          )}
                          {password && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
                                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                                <span className="text-xs" style={{ color: '#043941' }}>Contraseña:</span>
                                <code className="flex-1 text-sm font-bold" style={{ color: '#f59e0b', letterSpacing: '0.05em' }}>{password}</code>
                                <button
                                  onClick={() => {
                                    copiarAlPortapapeles(password)
                                    setCopiadoId(sol.id)
                                    setTimeout(() => setCopiadoId(null), 1500)
                                  }}
                                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded font-semibold transition-all"
                                  style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>
                                  {copiadoId === sol.id ? <><CheckCircle size={11} /> Copiado</> : <><Copy size={11} /> Copiar</>}
                                </button>
                              </div>
                              <button
                                onClick={() => copiarBienvenida(sol.nombre, sol.email, password, `sol-${sol.id}`)}
                                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all"
                                style={copiadoBienvenida === `sol-${sol.id}`
                                  ? { background: 'rgba(2,212,126,0.12)', color: '#02d47e', border: '1px solid rgba(2,212,126,0.25)' }
                                  : { background: '#ffffff', color: '#043941', border: '1px solid rgba(255,255,255,0.08)' }}>
                                {copiadoBienvenida === `sol-${sol.id}`
                                  ? <><CheckCircle size={12} /> ¡Mensaje copiado!</>
                                  : <><Copy size={12} /> Copiar mensaje de bienvenida</>}
                              </button>
                            </div>
                          )}
                        </div>
                        {sol.estado === 'pendiente' && (
                          <div className="flex flex-col gap-2 shrink-0">
                            <button
                              onClick={() => aprobarSolicitud(sol)}
                              disabled={aprobando === sol.id}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                              style={{ background: 'rgba(2,212,126,0.12)', color: '#02d47e', border: '1px solid rgba(2,212,126,0.3)' }}>
                              <CheckCircle size={13} />
                              {aprobando === sol.id ? 'Procesando…' : 'Aprobar'}
                            </button>
                            <button
                              onClick={() => rechazarSolicitud(sol)}
                              disabled={!!aprobando}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                              style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                              <XCircle size={13} /> Rechazar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'consultas' && (() => {
          const consultasFiltradas = filtroConsultas === 'todas'
            ? consultasAdmin
            : consultasAdmin.filter(c => c.estado === filtroConsultas)
          return (
            <div>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#043941', marginBottom: '.25rem' }}>Consultas de docentes</h3>
                  <p style={{ fontSize: '.72rem', color: 'rgba(4,57,65,0.6)' }}>
                    {consultasPendientes > 0 ? <span style={{ color: '#f59e0b', fontWeight: 700 }}>{consultasPendientes} sin responder</span> : 'Todas respondidas'} · {consultasAdmin.length} en total
                  </p>
                </div>
                <button onClick={fetchConsultasAdmin} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.72rem', fontWeight: 600, padding: '.4rem .9rem', borderRadius: 9, background: '#ffffff', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
                  <RefreshCw size={12} /> Recargar
                </button>
              </div>
              {/* Filtros */}
              <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.25rem' }}>
                {([
                  ['pendiente', 'Pendientes'],
                  ['respondida', 'Respondidas'],
                  ['todas', 'Todas'],
                ] as const).map(([estado, label]) => {
                  const count = estado === 'todas' ? consultasAdmin.length : consultasAdmin.filter(c => c.estado === estado).length
                  const active = filtroConsultas === estado
                  return (
                    <button key={estado} onClick={() => setFiltroConsultas(estado)}
                      style={{ padding: '.38rem .9rem', borderRadius: 20, fontSize: '.75rem', fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'all .15s',
                        background: active ? '#02d47e' : 'rgba(255,255,255,0.07)',
                        color:      active ? '#043941' : 'rgba(255,255,255,0.5)' }}>
                      {label} <span style={{ opacity: .7 }}>({count})</span>
                    </button>
                  )
                })}
              </div>

              {loadingConsultas ? (
                <div className="flex items-center justify-center py-20">
                  <div className="h-7 w-7 rounded-full border-2 animate-spin"
                    style={{ borderColor: '#02d47e', borderTopColor: 'transparent' }} />
                </div>
              ) : consultasFiltradas.length === 0 ? (
                <div className="text-center py-20 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <MessageCircle size={36} className="mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.42)' }} />
                  <p className="text-sm" style={{ color: '#043941' }}>No hay consultas en esta categoría.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {consultasFiltradas.map(c => {
                    const taller = talleresConfig.find(t => t.slug === c.taller_slug)
                    const moduloLabel = MODULOS_CONSULTA.find(m => m.value === c.modulo)?.label ?? c.modulo
                    const respondida = c.estado === 'respondida'
                    return (
                      <div key={c.id} className="rounded-2xl overflow-hidden"
                        style={{ background: '#ffffff', border: `1px solid ${respondida ? 'rgba(2,212,126,0.2)' : 'rgba(255,255,255,0.08)'}` }}>
                        {/* Header */}
                        <div className="px-5 py-4 flex flex-wrap items-start justify-between gap-3"
                          style={{ borderBottom: '1px solid rgba(4,57,65,0.12)' }}>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <p className="font-bold text-white text-sm">{c.nombre ?? 'Docente'}</p>
                              <span className="text-xs px-2 py-0.5 rounded-lg font-bold"
                                style={respondida
                                  ? { background: 'rgba(2,212,126,0.15)', color: '#02d47e' }
                                  : { background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
                                {respondida ? 'Respondida' : 'Pendiente'}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs" style={{ color: '#043941' }}>
                              {taller && <span style={{ color: '#02d47e' }}>{taller.nombreCorto ?? taller.nombre}</span>}
                              <span>{moduloLabel}</span>
                              <span>{formatFechaConsulta(c.created_at)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Mensaje del docente */}
                        <div className="px-5 py-4">
                          <p className="text-xs font-bold mb-2" style={{ color: '#043941' }}>Consulta</p>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{c.mensaje}</p>
                        </div>

                        {/* Respuesta existente */}
                        {c.respuesta && (
                          <div className="px-5 py-4 border-t"
                            style={{ borderColor: 'rgba(2,212,126,0.15)', background: 'rgba(2,212,126,0.04)' }}>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle size={13} style={{ color: '#02d47e' }} />
                              <p className="text-xs font-bold" style={{ color: '#02d47e' }}>Tu respuesta</p>
                              {c.responded_at && (
                                <span className="text-xs ml-auto" style={{ color: '#043941' }}>
                                  {formatFechaConsulta(c.responded_at)}
                                </span>
                              )}
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{c.respuesta}</p>
                          </div>
                        )}

                        {/* Formulario de respuesta (solo pendientes) */}
                        {!respondida && (
                          <div className="px-5 py-4 border-t space-y-3"
                            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                            <p className="text-xs font-bold" style={{ color: '#043941' }}>Tu respuesta</p>
                            <textarea
                              value={respuestaTexto[c.id] ?? ''}
                              onChange={e => setRespuestaTexto(prev => ({ ...prev, [c.id]: e.target.value }))}
                              placeholder="Escribe tu respuesta al docente…"
                              rows={3}
                              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                              style={{ background: '#ffffff', color: '#043941', border: '1px solid rgba(255,255,255,0.12)', lineHeight: 1.6 }}
                            />
                            <button
                              onClick={() => responderConsulta(c.id)}
                              disabled={!respuestaTexto[c.id]?.trim() || respondiendoId === c.id}
                              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
                              style={{ background: '#02d47e', color: '#043941' }}>
                              <Send size={13} />
                              {respondiendoId === c.id ? 'Enviando…' : 'Enviar respuesta'}
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })()}

        {tab === 'analytics' && (
          <div>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#043941', marginBottom: '.25rem' }}>Reportes de uso</h3>
                <p style={{ fontSize: '.72rem', color: 'rgba(4,57,65,0.6)' }}>Actividad de la plataforma · {docentes.length} docentes</p>
              </div>
            </div>
            {/* Filtro por docente */}
            <div className="mb-6 flex flex-wrap items-end gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: '#043941' }}>
                  Filtrar por docente
                </label>
                <div className="flex gap-2">
                  <select
                    value={filtroAnalyticsDocente}
                    onChange={e => { setFiltroAnalyticsDocente(e.target.value); setBusquedaDocente('') }}
                    className="px-3 py-2 rounded-xl border-2 text-sm outline-none min-w-[260px]"
                    style={{ borderColor: filtroAnalyticsDocente ? '#02d47e' : 'rgba(255,255,255,0.15)', background: '#ffffff', color: '#ffffff' }}>
                    <option value="" style={{ background: '#0d2b31', color: '#ffffff' }}>Todos los docentes (global)</option>
                    {docentes.map(d => (
                      <option key={d.id} value={d.id} style={{ background: '#0d2b31', color: '#ffffff' }}>{d.nombre_completo} — {d.email}</option>
                    ))}
                  </select>
                  {filtroAnalyticsDocente && (
                    <button
                      onClick={() => setFiltroAnalyticsDocente('')}
                      className="px-3 py-2 rounded-xl text-sm font-bold"
                      style={{ background: '#ffffff', color: '#043941' }}>
                      ✕ Ver global
                    </button>
                  )}
                </div>
              </div>
              {filtroAnalyticsDocente && (() => {
                const d = docentes.find(x => x.id === filtroAnalyticsDocente)
                const ie = INSTITUCIONES_EDUCATIVAS.find(i => i.id === d?.ie_id)
                return d ? (
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl"
                    style={{ background: 'rgba(2,212,126,0.08)', border: '1px solid rgba(2,212,126,0.2)' }}>
                    <div>
                      <p className="text-sm font-bold text-white">{d.nombre_completo}</p>
                      <p className="text-xs" style={{ color: '#043941' }}>{ie?.nombre ?? '—'} · {(d.taller_slugs?.length ? d.taller_slugs : d.taller_slug ? [d.taller_slug] : []).map(s => talleresConfig.find(t => t.slug === s)?.nombreCorto ?? s).join(' · ') || '—'}</p>
                    </div>
                  </div>
                ) : null
              })()}
            </div>

            {/* ── Embudo de progresión por módulo ──────────────────────────── */}
            {(() => {
              const total = docentes.length
              // filas: "Registrados" como techo, luego cada módulo
              const funnelRows = [
                { label: 'Registrados', badge: null, count: total },
                ...modulosLXP.map(m => {
                  const count = docentes.filter(d => {
                    if (!d.moduloActual) return false
                    return parseInt(d.moduloActual.replace('M', '')) >= m.numero
                  }).length
                  return { label: m.nombre, badge: `M${m.numero}`, count }
                }),
              ]
              return (
                <div style={{ borderRadius: 16, padding: '1.5rem', marginBottom: '2rem', background: '#ffffff', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1.25rem' }}>
                    <TrendingUp size={14} color="#02d47e" />
                    <h3 style={{ fontSize: '.88rem', fontWeight: 800, color: '#043941' }}>Embudo de progresión</h3>
                    <span style={{ fontSize: '.65rem', color: '#043941', marginLeft: '.15rem' }}>{total} docente{total !== 1 ? 's' : ''}</span>
                  </div>
                  {total === 0 ? (
                    <p style={{ fontSize: '.8rem', color: '#043941' }}>Sin datos de docentes</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
                      {funnelRows.map((row, i) => {
                        const pct = total > 0 ? Math.round((row.count / total) * 100) : 0
                        const prevCount = i > 0 ? funnelRows[i - 1].count : null
                        const drop = prevCount != null && prevCount > 0
                          ? Math.round(((prevCount - row.count) / prevCount) * 100)
                          : 0
                        const barColor = pct >= 70 ? '#02d47e' : pct >= 40 ? '#22d3ee' : pct >= 20 ? '#f59e0b' : '#ef4444'
                        const isBase = i === 0
                        return (
                          <div key={row.label}>
                            {/* drop indicator between rows */}
                            {!isBase && drop > 0 && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '.4rem', paddingLeft: 192 }}>
                                <div style={{ width: 1, height: 10, background: drop >= 30 ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.1)', marginLeft: 4 }} />
                                <span style={{ fontSize: '.6rem', fontWeight: 700, color: drop >= 30 ? '#ef4444' : 'rgba(4,57,65,0.5)' }}>
                                  ↓ {drop}% abandonaron aquí
                                </span>
                              </div>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              {/* label */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem', width: 192, flexShrink: 0 }}>
                                {row.badge ? (
                                  <span style={{ fontSize: '.58rem', fontWeight: 800, background: isBase ? 'rgba(255,255,255,0.12)' : '#02d47e', color: isBase ? 'rgba(255,255,255,0.5)' : '#043941', padding: '.15rem .4rem', borderRadius: 5, flexShrink: 0 }}>
                                    {row.badge}
                                  </span>
                                ) : (
                                  <span style={{ fontSize: '.58rem', fontWeight: 800, background: '#ffffff', color: 'rgba(255,255,255,0.45)', padding: '.15rem .45rem', borderRadius: 5, flexShrink: 0 }}>ALL</span>
                                )}
                                <span style={{ fontSize: '.72rem', color: isBase ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {row.label}
                                </span>
                              </div>
                              {/* bar */}
                              <div style={{ flex: 1, height: isBase ? 6 : 8, background: '#ffffff', borderRadius: 8, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${pct}%`, background: isBase ? 'rgba(255,255,255,0.18)' : barColor, borderRadius: 8, transition: 'width .5s ease' }} />
                              </div>
                              {/* count + pct */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flexShrink: 0 }}>
                                <span style={{ fontSize: '.78rem', fontWeight: 800, color: isBase ? 'rgba(255,255,255,0.5)' : '#fff', width: 28, textAlign: 'right' }}>{row.count}</span>
                                <span style={{ fontSize: '.72rem', fontWeight: 700, color: isBase ? 'rgba(255,255,255,0.3)' : barColor, width: 38, textAlign: 'right' }}>{pct}%</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })()}

            {/* ── Rendimiento por quiz ──────────────────────────────────── */}
            {quizStats.length > 0 && (() => {
              const grupos = modulosLXP
                .map(m => ({ modulo: `M${m.numero}`, nombre: m.nombre, items: quizStats.filter(q => q.modulo === `M${m.numero}`) }))
                .filter(g => g.items.length > 0)
              return (
                <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {/* header */}
                  <div style={{ padding: '1.1rem 1.5rem', background: '#ffffff', borderBottom: '1px solid rgba(4,57,65,0.12)', display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                    <BarChart2 size={14} color="#02d47e" />
                    <h3 style={{ fontSize: '.88rem', fontWeight: 800, color: '#043941' }}>Rendimiento por quiz</h3>
                    <span style={{ fontSize: '.65rem', color: '#043941', marginLeft: '.1rem' }}>{quizStats.length} quizzes · tasa = docentes que aprueban / docentes únicos que intentaron</span>
                  </div>
                  {/* column headers */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 130px 70px', gap: 0, padding: '.55rem 1.5rem', background: 'rgba(255,255,255,0.02)',  borderBottom: '1px solid rgba(4,57,65,0.08)' }}>
                    {['Quiz', 'Intentos', 'Docentes', 'Tasa de aprobación', 'Tags'].map(h => (
                      <span key={h} style={{ fontSize: '.6rem', fontWeight: 700, color: '#043941', textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</span>
                    ))}
                  </div>
                  {grupos.map((g, gi) => (
                    <div key={g.modulo}>
                      {/* group header */}
                      <div style={{ padding: '.45rem 1.5rem', background: 'rgba(255,255,255,0.03)',  borderBottom: '1px solid rgba(4,57,65,0.07)', borderTop: gi > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        <span style={{ fontSize: '.6rem', fontWeight: 800, background: '#02d47e', color: '#043941', padding: '.12rem .38rem', borderRadius: 4 }}>{g.modulo}</span>
                        <span style={{ fontSize: '.7rem', color: '#043941', fontWeight: 600 }}>{g.nombre}</span>
                      </div>
                      {g.items.map((q, qi) => {
                        const tColor = q.tasaAprobacion >= 80 ? '#02d47e' : q.tasaAprobacion >= 60 ? '#22d3ee' : q.tasaAprobacion >= 40 ? '#f59e0b' : '#ef4444'
                        const isLast = qi === g.items.length - 1
                        return (
                          <div key={q.contenidoId} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 130px 70px', gap: 0, padding: '.75rem 1.5rem', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
                            {/* title */}
                            <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500, paddingRight: '1rem' }}>{q.titulo}</p>
                            {/* intentos */}
                            <p style={{ fontSize: '.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>{q.intentos}</p>
                            {/* docentes */}
                            <p style={{ fontSize: '.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>{q.docentesUnicos}</p>
                            {/* tasa bar */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                              <div style={{ flex: 1, height: 6, background: '#ffffff', borderRadius: 6, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${q.tasaAprobacion}%`, background: tColor, borderRadius: 6, transition: 'width .4s ease' }} />
                              </div>
                              <span style={{ fontSize: '.75rem', fontWeight: 800, color: tColor, width: 32, textAlign: 'right', flexShrink: 0 }}>{q.tasaAprobacion}%</span>
                            </div>
                            {/* tags */}
                            <div style={{ display: 'flex', gap: '.25rem', flexWrap: 'wrap' }}>
                              {q.bloqueante && <span style={{ fontSize: '.55rem', fontWeight: 800, background: 'rgba(239,68,68,0.15)', color: '#ef4444', padding: '.1rem .3rem', borderRadius: 4, letterSpacing: '.04em' }}>BLOQUEA</span>}
                              {q.puntajeMinimo && <span style={{ fontSize: '.55rem', fontWeight: 800, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', padding: '.1rem .3rem', borderRadius: 4 }}>MÍN {q.puntajeMinimo}%</span>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )
            })()}

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
                    <div key={label} className="rounded-2xl p-4" style={{ background: '#ffffff' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={14} style={{ color }} />
                        <p className="text-xs" style={{ color: '#043941' }}>{label}</p>
                      </div>
                      <p className="text-2xl font-extrabold" style={{ color }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Visitas por página */}
                <div className="rounded-2xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Globe size={15} style={{ color: '#02d47e' }} /> Visitas por sección</h3>
                  <div className="space-y-3">
                    {analytics.navegacion.map((n, i) => {
                      const maxCount = Math.max(...analytics.navegacion.map(x => x.count))
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-36 text-xs text-right" style={{ color: '#043941' }}>
                            {n.pagina.replace('_', ' ')}
                            {n.referrer && <span className="block text-[11px]" style={{ color: '#043941' }}>desde: {n.referrer}</span>}
                          </div>
                          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#ffffff' }}>
                            <div className="h-full rounded-full transition-all" style={{ width: `${Math.round((n.count / maxCount) * 100)}%`, background: '#02d47e' }} />
                          </div>
                          <span className="text-xs font-bold w-8 text-right" style={{ color: 'rgba(255,255,255,0.6)' }}>{n.count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Top contenidos abiertos/reproducidos */}
                <div className="rounded-2xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="px-6 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(4,57,65,0.12)' }}>
                    <FileDown size={15} style={{ color: '#02d47e' }} />
                    <h3 className="text-sm font-bold text-white">Contenidos más accedidos</h3>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(4,57,65,0.12)' }}>
                        {['Contenido', 'Tipo', 'Evento', 'Accesos'].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-bold" style={{ color: '#043941' }}>{h}</th>
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
                            <td className="px-5 py-3 text-xs" style={{ color: '#043941' }}>{c.tipo_contenido}</td>
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

            {/* ── Retención: docentes inactivos ─────────────────────────── */}
            {(() => {
              const ahora = Date.now()
              const diasMs = filtroInactividad * 24 * 60 * 60 * 1000
              const inactivos = docentes
                .filter(d => {
                  if (!d.last_seen_at) return true
                  return ahora - new Date(d.last_seen_at).getTime() > diasMs
                })
                .map(d => ({
                  ...d,
                  diasSinAcceso: d.last_seen_at
                    ? Math.floor((ahora - new Date(d.last_seen_at).getTime()) / 86400000)
                    : null,
                }))
                .sort((a, b) => (b.diasSinAcceso ?? 9999) - (a.diasSinAcceso ?? 9999))

              const emailsTodos = inactivos.map(d => d.email).filter(Boolean).join(', ')

              return (
                <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {/* Header */}
                  <div style={{ padding: '1.1rem 1.5rem', background: '#ffffff', borderBottom: '1px solid rgba(4,57,65,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                      <AlertTriangle size={14} color="#f59e0b" />
                      <h3 style={{ fontSize: '.88rem', fontWeight: 800, color: '#043941' }}>Retención</h3>
                      <span style={{ fontSize: '.65rem', color: '#043941' }}>
                        docentes sin actividad reciente
                      </span>
                    </div>
                    {/* filtro días */}
                    <div style={{ display: 'flex', gap: '.35rem' }}>
                      {([7, 14, 30] as const).map(d => (
                        <button key={d} onClick={() => setFiltroInactividad(d)}
                          style={{ fontSize: '.68rem', fontWeight: 700, padding: '.28rem .7rem', borderRadius: 20, cursor: 'pointer', border: 'none', transition: 'all .15s',
                            background: filtroInactividad === d ? '#02d47e' : 'rgba(255,255,255,0.07)',
                            color: filtroInactividad === d ? '#043941' : 'rgba(255,255,255,0.45)',
                          }}>
                          +{d}d
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary banner */}
                  <div style={{ padding: '.7rem 1.5rem', background: inactivos.length > 0 ? 'rgba(245,158,11,0.06)' : 'rgba(2,212,126,0.05)',  borderBottom: '1px solid rgba(4,57,65,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <p style={{ fontSize: '.78rem', color: inactivos.length > 0 ? '#f59e0b' : '#02d47e', fontWeight: 700 }}>
                      {inactivos.length === 0
                        ? `✓ Todos los docentes activos en los últimos ${filtroInactividad} días`
                        : `${inactivos.length} docente${inactivos.length !== 1 ? 's' : ''} sin actividad en los últimos ${filtroInactividad} días`}
                    </p>
                    {inactivos.length > 0 && emailsTodos && (
                      <button
                        onClick={() => { navigator.clipboard.writeText(emailsTodos); setCopiadoEmailsRetención(true); setTimeout(() => setCopiadoEmailsRetención(false), 2000) }}
                        style={{ display: 'flex', alignItems: 'center', gap: '.35rem', fontSize: '.68rem', fontWeight: 700, padding: '.3rem .8rem', borderRadius: 8, cursor: 'pointer', border: '1px solid rgba(245,158,11,0.3)', background: copiadoEmailsRetención ? 'rgba(2,212,126,0.12)' : 'rgba(245,158,11,0.1)', color: copiadoEmailsRetención ? '#02d47e' : '#f59e0b', flexShrink: 0, transition: 'all .2s' }}>
                        {copiadoEmailsRetención ? <><CheckCircle size={11} /> Copiados</> : <><Copy size={11} /> Copiar todos los emails</>}
                      </button>
                    )}
                  </div>

                  {/* List */}
                  {inactivos.length > 0 && (
                    <div>
                      {inactivos.map((d, i) => {
                        const dias = d.diasSinAcceso
                        const diasColor = dias === null || dias > 60 ? '#ef4444' : dias > 30 ? '#f59e0b' : dias > 14 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.35)'
                        const slugs = d.taller_slugs?.length ? d.taller_slugs : d.taller_slug ? [d.taller_slug] : []
                        const initials = (d.nombre_completo ?? d.email ?? '?').split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
                        return (
                          <div key={d.id}
                            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '.85rem 1.5rem', borderBottom: i < inactivos.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', cursor: 'pointer', transition: 'background .15s' }}
                            className="hover:bg-white/[0.03]"
                            onClick={() => setDocenteDetalle(d)}>
                            {/* avatar */}
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', fontWeight: 800, color: '#f59e0b', flexShrink: 0 }}>
                              {initials}
                            </div>
                            {/* name + email */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: '.78rem', fontWeight: 700, color: '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.nombre_completo}</p>
                              <p style={{ fontSize: '.65rem', color: '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.email}</p>
                            </div>
                            {/* talleres */}
                            <div style={{ display: 'flex', gap: '.25rem', flexShrink: 0, flexWrap: 'wrap', maxWidth: 160 }}>
                              {slugs.length > 0
                                ? slugs.map(s => <span key={s} style={{ fontSize: '.6rem', fontWeight: 700, background: 'rgba(2,212,126,0.12)', color: '#02d47e', padding: '.12rem .35rem', borderRadius: 5 }}>{talleresConfig.find(t => t.slug === s)?.nombreCorto ?? s}</span>)
                                : <span style={{ fontSize: '.6rem', color: 'rgba(4,57,65,0.6)' }}>Sin taller</span>}
                            </div>
                            {/* progreso */}
                            <div style={{ width: 80, flexShrink: 0 }}>
                              <div style={{ height: 4, background: '#ffffff', borderRadius: 4, overflow: 'hidden', marginBottom: '.2rem' }}>
                                <div style={{ height: '100%', width: `${d.porcentaje}%`, background: d.porcentaje >= 50 ? '#02d47e' : 'rgba(4,57,65,0.3)', borderRadius: 4 }} />
                              </div>
                              <p style={{ fontSize: '.6rem', color: '#043941', textAlign: 'right' }}>{d.porcentaje}%</p>
                            </div>
                            {/* días badge */}
                            <div style={{ width: 56, flexShrink: 0, textAlign: 'right' }}>
                              <span style={{ fontSize: '.7rem', fontWeight: 800, color: diasColor }}>
                                {dias === null ? 'Nunca' : `${dias}d`}
                              </span>
                            </div>
                            {/* copy email */}
                            <button
                              onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(d.email ?? '') }}
                              title="Copiar email"
                              style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 7, background: '#ffffff', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#043941' }}
                              className="hover:text-white hover:bg-white/10">
                              <Copy size={11} />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )}

        {tab === 'usuarios' && <>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#043941', marginBottom: '.25rem' }}>Docentes registrados</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginTop: '.4rem' }}>
              {[
                { label: 'Total', value: docentes.length },
                { label: 'IEs activas', value: new Set(docentes.map(d => d.ie_id)).size },
                { label: 'Progreso promedio', value: `${docentes.length > 0 ? Math.round(docentes.reduce((a, d) => a + d.porcentaje, 0) / docentes.length) : 0}%` },
                { label: '> 50% avance', value: docentes.filter(d => d.porcentaje > 50).length },
              ].map(s => (
                <span key={s.label} style={{ fontSize: '.72rem', color: 'rgba(4,57,65,0.6)' }}>
                  <span style={{ fontWeight: 800, color: '#02d47e', marginRight: '.25rem' }}>{s.value}</span>{s.label}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0 }}>
            <button onClick={abrirModalCrear} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.75rem', fontWeight: 700, padding: '.45rem 1rem', borderRadius: 9, background: 'rgba(2,212,126,0.12)', color: '#02d47e', border: '1px solid rgba(2,212,126,0.25)', cursor: 'pointer' }}>
              <Users size={13} /> + Nuevo docente
            </button>
            <button onClick={() => downloadCSV(docentesFiltrados)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.75rem', fontWeight: 700, padding: '.45rem 1rem', borderRadius: 9, background: '#02d47e', color: '#043941', border: 'none', cursor: 'pointer' }}>
              <Download size={13} /> CSV
            </button>
          </div>
        </div>

        {/* Controles */}
        <div className="flex flex-col gap-3 mb-5">
          {/* Buscador */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              value={busquedaUsuario}
              onChange={e => setBusquedaUsuario(e.target.value)}
              placeholder="Buscar por nombre o correo…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 text-sm outline-none"
              style={{ borderColor: busquedaUsuario ? '#02d47e' : 'rgba(255,255,255,0.12)', background: '#ffffff', color: '#ffffff' }}
            />
            {busquedaUsuario && (
              <button onClick={() => setBusquedaUsuario('')} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 text-white text-sm">✕</button>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-3 flex-wrap">
              <select value={filtroIE} onChange={e => setFiltroIE(e.target.value)} {...selectStyle}>
                <option value="" style={{ background: '#0d2b31', color: '#ffffff' }}>Todas las IEs</option>
                {INSTITUCIONES_EDUCATIVAS.map(ie => (
                  <option key={ie.id} value={String(ie.id)} style={{ background: '#0d2b31', color: '#ffffff' }}>{ie.nombre}</option>
                ))}
              </select>
              <select value={filtroTaller} onChange={e => setFiltroTaller(e.target.value)} {...selectStyle}>
                <option value="" style={{ background: '#0d2b31', color: '#ffffff' }}>Todos los talleres</option>
                {talleresEnUso.map(slug => {
                  const t = talleresConfig.find(t => t.slug === slug)
                  return <option key={slug} value={slug!} style={{ background: '#0d2b31', color: '#ffffff' }}>{t?.nombre ?? slug}</option>
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.08)' }}>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="h-7 w-7 rounded-full border-2 animate-spin"
                  style={{ borderColor: '#02d47e', borderTopColor: 'transparent' }} />
                <span className="text-xs" style={{ color: '#043941' }}>Cargando datos…</span>
              </div>
            </div>
          ) : docentesFiltrados.length === 0 ? (
            <div className="text-center py-20" style={{ color: '#043941' }}>
              <Users size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No hay docentes registrados aún</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(4,57,65,0.13)' }}>
                    {['Docente', 'IE', 'Taller', 'Módulo', 'Progreso', 'Quizzes', 'Último acceso', 'Registro'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-bold"
                        style={{ color: '#043941' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {docentesFiltrados.map((d, i) => {
                    const ie = INSTITUCIONES_EDUCATIVAS.find(ie => ie.id === d.ie_id)
                    const taller = talleresConfig.find(t => t.slug === d.taller_slug)
                    return (
                      <tr key={d.id}
                        onClick={() => setDocenteDetalle(d)}
                        style={{ borderBottom: i < docentesFiltrados.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', cursor: 'pointer' }}
                        className="transition-colors hover:bg-white/5">
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-white">{d.nombre_completo}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#043941' }}>{d.email}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-white text-xs font-medium">{ie?.nombre ?? '—'}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#043941' }}>{ie?.distrito}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex flex-wrap gap-1">
                            {(d.taller_slugs?.length ? d.taller_slugs : d.taller_slug ? [d.taller_slug] : []).map(slug => (
                              <span key={slug} className="text-xs font-bold px-2 py-1 rounded-lg"
                                style={{ background: 'rgba(2,212,126,0.12)', color: '#02d47e' }}>
                                {talleresConfig.find(t => t.slug === slug)?.nombreCorto ?? slug}
                              </span>
                            ))}
                            {!d.taller_slug && !d.taller_slugs?.length && <span className="text-xs" style={{ color: 'rgba(4,57,65,0.6)' }}>—</span>}
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          {d.moduloActual ? (
                            <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg"
                              style={{ background: 'rgba(34,211,238,0.12)', color: '#22d3ee' }}>
                              {d.moduloActual}
                            </span>
                          ) : (
                            <span className="text-xs" style={{ color: 'rgba(4,57,65,0.6)' }}>—</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full max-w-[80px]" style={{ background: '#ffffff' }}>
                              <div className="h-full rounded-full transition-all"
                                style={{ width: `${d.porcentaje}%`, background: d.porcentaje >= 80 ? '#02d47e' : d.porcentaje >= 40 ? '#f59e0b' : '#ef4444' }} />
                            </div>
                            <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                              {d.porcentaje}%
                            </span>
                          </div>
                          <p className="text-xs mt-1" style={{ color: '#043941' }}>
                            {d.completados}/{d.total} completados
                          </p>
                          {d.visualizados > d.completados && (
                            <p className="text-xs mt-0.5" style={{ color: 'rgba(4,57,65,0.6)' }}>
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
                            <span className="text-xs" style={{ color: 'rgba(4,57,65,0.6)' }}>0/{d.quizzesTotal}</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-xs" style={{ color: '#043941' }}>
                          {formatDate(d.last_seen_at)}
                        </td>
                        <td className="px-5 py-3.5 text-xs" style={{ color: '#043941' }}>
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

        <p className="text-xs mt-4 text-right" style={{ color: 'rgba(4,57,65,0.6)' }}>
          {docentesFiltrados.length} de {docentes.length} docentes · haz clic en un usuario para ver detalles
        </p>
        </>}
      </main>

      {/* ── Modal: Crear nuevo usuario ──────────────────────────────────────── */}
      {showCrearModal && (
        <>
          <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)' }}
            onClick={() => !creandoUsuario && setShowCrearModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: '#052e35', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid rgba(4,57,65,0.13)' }}>
                <div className="flex items-center gap-2">
                  <Users size={16} style={{ color: '#02d47e' }} />
                  <p className="font-bold text-white text-sm">Crear nuevo usuario</p>
                </div>
                {!creandoUsuario && !usuarioCreadoOk && (
                  <button onClick={() => setShowCrearModal(false)} style={{ color: '#043941' }}>
                    <XCircle size={18} />
                  </button>
                )}
              </div>

              <div className="px-6 py-6">
                {/* Estado: éxito */}
                {usuarioCreadoOk ? (
                  <div className="space-y-5">
                    <div className="flex flex-col items-center gap-3 py-4">
                      <CheckCircle size={40} style={{ color: '#02d47e' }} />
                      <p className="font-extrabold text-white text-lg">¡Usuario creado!</p>
                      <p className="text-xs text-center" style={{ color: '#043941' }}>
                        Guarda estas credenciales antes de cerrar.
                      </p>
                    </div>
                    <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: '#043941' }}>Correo</span>
                        <code className="text-sm font-bold text-white">{usuarioCreadoOk.email}</code>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: '#043941' }}>Contraseña</span>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-bold" style={{ color: '#f59e0b', letterSpacing: '0.05em' }}>{usuarioCreadoOk.password}</code>
                          <button
                            onClick={() => copiarAlPortapapeles(usuarioCreadoOk.password)}
                            className="text-xs px-2 py-0.5 rounded font-semibold"
                            style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>
                            <Copy size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowCrearModal(false)}
                      className="w-full py-2.5 rounded-xl font-bold text-sm"
                      style={{ background: '#02d47e', color: '#043941' }}>
                      Cerrar
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {errCrear && (
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                        style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                        <AlertTriangle size={14} className="shrink-0" /> {errCrear}
                      </div>
                    )}

                    {/* Nombre */}
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#043941' }}>Nombre completo *</label>
                      <input value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)}
                        placeholder="Prof. Ana García"
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{ background: '#ffffff', color: '#043941', border: '1px solid rgba(255,255,255,0.12)' }} />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#043941' }}>Correo electrónico *</label>
                      <input value={nuevoEmail} onChange={e => setNuevoEmail(e.target.value)}
                        type="email" placeholder="docente@colegio.pe"
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{ background: '#ffffff', color: '#043941', border: '1px solid rgba(255,255,255,0.12)' }} />
                    </div>

                    {/* Contraseña */}
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#043941' }}>Contraseña</label>
                      <div className="flex gap-2">
                        <input value={nuevoPassword} onChange={e => setNuevoPassword(e.target.value)}
                          className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none font-mono"
                          style={{ background: '#ffffff', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)', letterSpacing: '0.05em' }} />
                        <button onClick={() => setNuevoPassword(generatePassword())}
                          className="px-3 py-2 rounded-xl text-xs font-semibold shrink-0"
                          style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}>
                          Regenerar
                        </button>
                      </div>
                    </div>

                    {/* Rol */}
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#043941' }}>Rol</label>
                      <div className="flex gap-2">
                        {(['docente', 'admin'] as const).map(r => (
                          <button key={r} onClick={() => setNuevoRole(r)}
                            className="flex-1 py-2 rounded-xl text-sm font-bold capitalize transition-all"
                            style={nuevoRole === r
                              ? { background: '#02d47e', color: '#043941' }
                              : { background: '#ffffff', color: '#043941' }}>
                            {r === 'docente' ? 'Docente' : 'Administrador'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* IE */}
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#043941' }}>Institución Educativa</label>
                      <select value={nuevoIeId} onChange={e => setNuevoIeId(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{ background: '#ffffff', color: '#043941', border: '1px solid rgba(255,255,255,0.12)' }}>
                        <option value="" style={{ background: '#052e35' }}>Sin asignar</option>
                        {INSTITUCIONES_EDUCATIVAS.map(ie => (
                          <option key={ie.id} value={ie.id} style={{ background: '#052e35' }}>{ie.nombre} · {ie.distrito}</option>
                        ))}
                      </select>
                    </div>

                    {/* Talleres */}
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#043941' }}>Talleres asignados</label>
                      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)', maxHeight: 180, overflowY: 'auto' }}>
                        {talleresConfig.map((t, i) => (
                          <label key={t.slug}
                            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors hover:bg-white/5"
                            style={{ borderBottom: i < talleresConfig.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                            <input type="checkbox" checked={nuevosTalleres.includes(t.slug)}
                              onChange={e => setNuevosTalleres(prev =>
                                e.target.checked ? [...prev, t.slug] : prev.filter(s => s !== t.slug)
                              )}
                              className="rounded" />
                            <span className="text-sm text-white">{t.nombre}</span>
                          </label>
                        ))}
                      </div>
                      {nuevosTalleres.length > 0 && (
                        <p className="text-xs mt-1.5" style={{ color: '#02d47e' }}>
                          {nuevosTalleres.length} taller{nuevosTalleres.length > 1 ? 'es' : ''} seleccionado{nuevosTalleres.length > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>

                    {/* Botón crear */}
                    <button onClick={crearUsuario} disabled={creandoUsuario}
                      className="w-full py-3 rounded-xl font-extrabold text-sm mt-2 transition-all disabled:opacity-60"
                      style={{ background: '#02d47e', color: '#043941' }}>
                      {creandoUsuario ? 'Creando usuario…' : 'Crear usuario'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Panel de detalle de usuario ─────────────────────────────────────── */}
      {docenteDetalle && (() => {
        const d = docenteDetalle
        const ie = INSTITUCIONES_EDUCATIVAS.find(i => i.id === d.ie_id)
        const taller = talleresConfig.find(t => t.slug === d.taller_slug)
        const initials = (d.nombre_completo ?? d.email ?? '?')
          .split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
        const horasCertificadas = Math.round((d.completados / Math.max(d.total, 1)) * 150)
        return (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
              onClick={() => setDocenteDetalle(null)}
            />
            {/* Panel */}
            <div className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full max-w-md shadow-2xl"
              style={{ background: '#052e35', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>

              {/* ── Header sticky con identidad del docente ── */}
              <div className="shrink-0" style={{ borderBottom: '1px solid rgba(4,57,65,0.12)', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '.85rem' }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(2,212,126,0.14)', color: '#02d47e', border: '1.5px solid rgba(2,212,126,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 800, flexShrink: 0 }}>
                  {initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '.88rem', fontWeight: 800, color: '#043941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.nombre_completo ?? d.email}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginTop: '.18rem' }}>
                    <span style={{ fontSize: '.58rem', fontWeight: 700, padding: '.12rem .45rem', borderRadius: 20,
                      background: d.role === 'admin' ? 'rgba(168,85,247,0.15)' : 'rgba(2,212,126,0.12)',
                      color:      d.role === 'admin' ? '#c084fc' : '#02d47e' }}>
                      {d.role === 'admin' ? 'Admin' : 'Docente'}
                    </span>
                    {taller && <span style={{ fontSize: '.62rem', color: 'rgba(255,255,255,0.62)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{taller.nombreCorto ?? taller.nombre}</span>}
                  </div>
                </div>
                <button onClick={() => setDocenteDetalle(null)} style={{ width: 28, height: 28, borderRadius: 8, background: '#ffffff', border: '1px solid rgba(255,255,255,0.08)', color: '#043941', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                  <XCircle size={13} />
                </button>
              </div>

              {/* ── Cuerpo scrollable ── */}
              <div className="flex-1 overflow-y-auto" style={{ padding: '1.25rem' }}>

                {/* Email */}
                <p style={{ fontSize: '.72rem', color: '#043941', marginBottom: '1.1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.email}</p>

                {/* IE */}
                {ie && (
                  <div style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '.75rem 1rem', marginBottom: '1.1rem' }}>
                    <p style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#043941', marginBottom: '.3rem' }}>Institución</p>
                    <p style={{ fontSize: '.82rem', fontWeight: 600, color: '#043941' }}>{ie.nombre}</p>
                    <p style={{ fontSize: '.68rem', color: 'rgba(255,255,255,0.62)', marginTop: '.18rem' }}>{ie.distrito} · {ie.region}</p>
                  </div>
                )}

                {/* Divider */}
                <div style={{ height: 1, background: '#ffffff', margin: '1rem 0' }} />

                {/* Stats + barra de progreso */}
                <p style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#043941', marginBottom: '.75rem' }}>Progreso</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.6rem', marginBottom: '1rem' }}>
                  {[
                    { label: 'Completados', value: `${d.completados}/${d.total}`, color: '#02d47e' },
                    { label: 'Avance',      value: `${d.porcentaje}%`,             color: d.porcentaje >= 80 ? '#02d47e' : d.porcentaje >= 40 ? '#f59e0b' : '#ef4444' },
                    { label: 'Horas est.',  value: `${horasCertificadas}h`,        color: '#22d3ee' },
                  ].map(s => (
                    <div key={s.label} style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 11, padding: '.65rem .5rem', textAlign: 'center' }}>
                      <p style={{ fontSize: '1.2rem', fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</p>
                      <p style={{ fontSize: '.58rem', color: 'rgba(255,255,255,0.62)', marginTop: '.3rem' }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '.35rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '.68rem', color: '#043941' }}>Progreso general</p>
                  {d.moduloActual && (
                    <span style={{ fontSize: '.6rem', fontWeight: 700, background: 'rgba(34,211,238,0.1)', color: '#22d3ee', padding: '.12rem .5rem', borderRadius: 20 }}>
                      {d.moduloActual}
                    </span>
                  )}
                </div>
                <div style={{ height: 6, background: '#ffffff', borderRadius: 6, overflow: 'hidden', marginBottom: d.visualizados > d.completados ? '.35rem' : '1rem' }}>
                  <div style={{ height: '100%', borderRadius: 6, transition: 'width .4s ease',
                    width: `${d.porcentaje}%`,
                    background: d.porcentaje >= 80 ? '#02d47e' : d.porcentaje >= 40 ? '#f59e0b' : '#ef4444' }} />
                </div>
                {d.visualizados > d.completados && (
                  <p style={{ fontSize: '.62rem', color: 'rgba(255,255,255,0.52)', marginBottom: '1rem' }}>
                    {d.visualizados} visualizados · {d.completados} completados
                  </p>
                )}

                {/* Quizzes */}
                <div style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
                  <p style={{ fontSize: '.82rem', fontWeight: 600, color: '#043941' }}>Quizzes aprobados</p>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: d.quizzesAprobados === d.quizzesTotal && d.quizzesTotal > 0 ? '#02d47e' : '#f59e0b' }}>
                    {d.quizzesAprobados}/{d.quizzesTotal}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: '#ffffff', margin: '1rem 0' }} />

                {/* Talleres asignados — edición con borrador local */}
                <p style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#043941', marginBottom: '.75rem' }}>Talleres asignados</p>
                {(() => {
                  const talleresOriginales: string[] = (d.taller_slugs?.length ? d.taller_slugs : d.taller_slug ? [d.taller_slug] : [])
                  const hayPendientes = JSON.stringify([...talleresEditando].sort()) !== JSON.stringify([...talleresOriginales].sort())
                  const talleresDisponibles = talleresConfig.filter(t => !talleresEditando.includes(t.slug))
                  return (
                    <div className="rounded-xl p-4 space-y-3"
                      style={{
                        background: '#ffffff',
                        border: `1px solid ${hayPendientes ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.07)'}`,
                        transition: 'border-color 0.2s',
                      }}>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold" style={{ color: '#043941' }}>
                          Talleres asignados
                          {hayPendientes && (
                            <span className="ml-2 text-[10px] font-extrabold" style={{ color: '#f59e0b' }}>
                              · cambios sin guardar
                            </span>
                          )}
                        </p>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
                          style={{ background: 'rgba(2,212,126,0.12)', color: '#02d47e' }}>
                          {talleresEditando.length} taller{talleresEditando.length !== 1 ? 'es' : ''}
                        </span>
                      </div>

                      {/* Chips de talleres activos */}
                      <div className="flex flex-wrap gap-2 min-h-[28px]">
                        {talleresEditando.length === 0 && (
                          <span className="text-xs" style={{ color: 'rgba(4,57,65,0.6)' }}>Sin taller asignado</span>
                        )}
                        {talleresEditando.map(slug => {
                          const t = talleresConfig.find(x => x.slug === slug)
                          const esNuevo = !talleresOriginales.includes(slug)
                          return (
                            <span key={slug}
                              className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg"
                              style={{
                                background: esNuevo ? 'rgba(245,158,11,0.15)' : 'rgba(2,212,126,0.12)',
                                color: esNuevo ? '#f59e0b' : '#02d47e',
                                border: `1px solid ${esNuevo ? 'rgba(245,158,11,0.3)' : 'rgba(2,212,126,0.2)'}`,
                              }}>
                              {esNuevo && <span className="text-[9px] font-extrabold mr-0.5">NUEVO</span>}
                              {t?.nombreCorto ?? slug}
                              <button
                                onClick={() => setTalleresEditando(prev => prev.filter(s => s !== slug))}
                                className="opacity-50 hover:opacity-100 transition-opacity ml-0.5">
                                ✕
                              </button>
                            </span>
                          )
                        })}
                      </div>

                      {/* Añadir taller */}
                      {talleresDisponibles.length > 0 && (
                        <select
                          value=""
                          onChange={e => { if (e.target.value) setTalleresEditando(prev => [...prev, e.target.value]) }}
                          className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                          style={{ background: '#ffffff', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <option value="">+ Añadir taller…</option>
                          {talleresDisponibles.map(t => (
                            <option key={t.slug} value={t.slug} style={{ background: '#052e35' }}>{t.nombre}</option>
                          ))}
                        </select>
                      )}

                      {/* Botón guardar — solo visible cuando hay cambios */}
                      {hayPendientes && (
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() => actualizarTalleresDocente(d, talleresEditando)}
                            disabled={guardandoTalleres}
                            className="flex-1 py-2 rounded-xl text-xs font-extrabold transition-all disabled:opacity-60"
                            style={{ background: '#02d47e', color: '#043941' }}>
                            {guardandoTalleres ? 'Guardando…' : `Guardar (${talleresEditando.length} taller${talleresEditando.length !== 1 ? 'es' : ''})`}
                          </button>
                          <button
                            onClick={() => setTalleresEditando(talleresOriginales)}
                            disabled={guardandoTalleres}
                            className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                            style={{ background: '#ffffff', color: '#043941' }}>
                            Descartar
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })()}

                {/* Fechas */}
                <div style={{ height: 1, background: '#ffffff', margin: '1rem 0' }} />
                <p style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#043941', marginBottom: '.6rem' }}>Actividad</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', marginBottom: '1.1rem' }}>
                  {[
                    { label: 'Último acceso',      value: formatDate(d.last_seen_at) },
                    { label: 'Fecha de registro',  value: formatDate(d.created_at) },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,0.62)' }}>{row.label}</p>
                      <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{row.value}</p>
                    </div>
                  ))}
                </div>

                {/* Credenciales */}
                <div style={{ height: 1, background: '#ffffff', margin: '1rem 0' }} />
                <p style={{ fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(239,68,68,0.5)', marginBottom: '.75rem' }}>Credenciales</p>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(239,68,68,0.18)' }}>
                  <div className="p-4 space-y-3">
                    {passwordsReset[d.id] ? (
                      <>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
                          style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                          <span className="text-xs" style={{ color: '#043941' }}>Nueva contraseña:</span>
                          <code className="flex-1 text-sm font-bold" style={{ color: '#f59e0b', letterSpacing: '0.05em' }}>
                            {passwordsReset[d.id]}
                          </code>
                          <button
                            onClick={() => copiarAlPortapapeles(passwordsReset[d.id])}
                            className="shrink-0 p-1 rounded opacity-60 hover:opacity-100"
                            style={{ color: '#f59e0b' }}>
                            <Copy size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => copiarBienvenida(d.nombre_completo ?? d.email, d.email, passwordsReset[d.id], d.id)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
                          style={copiadoBienvenida === d.id
                            ? { background: 'rgba(2,212,126,0.15)', color: '#02d47e', border: '1px solid rgba(2,212,126,0.3)' }
                            : { background: '#ffffff', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          {copiadoBienvenida === d.id
                            ? <><CheckCircle size={13} /> ¡Mensaje copiado!</>
                            : <><Copy size={13} /> Copiar mensaje de bienvenida</>}
                        </button>
                        <button
                          onClick={() => setPasswordsReset(prev => { const n = { ...prev }; delete n[d.id]; return n })}
                          className="w-full py-2 rounded-xl text-xs font-semibold"
                          style={{ color: '#043941' }}>
                          Generar otra contraseña
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => resetearPassword(d)}
                        disabled={reseteandoId === d.id}
                        className="w-full py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                        style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                        {reseteandoId === d.id ? 'Generando…' : 'Resetear contraseña'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      })()}

      </div>
    </div>
  )
}
