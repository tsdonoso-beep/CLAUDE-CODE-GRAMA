// src/data/sesionesLXP.ts
// Fuente de datos para sesiones en vivo del LXP GRAMA.
// Cuando se confirmen fechas reales, reemplazar los valores de `fecha` en cada entrada.
// El resto de la plataforma se actualiza automáticamente.

export type ModuloId = 'M0' | 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6' | 'B1'
export type EstadoSesion = 'programada' | 'en-vivo' | 'finalizada'
export type ModalidadSesion = 'zoom' | 'meet' | 'presencial'

export interface SesionLXP {
  id: string
  tallerSlug: string        // slug del taller al que pertenece
  titulo: string
  modulo: ModuloId
  moduloNombre: string
  fecha: string             // ISO 8601 — fecha y hora de inicio
  duracionMin: number       // duración en minutos
  facilitador: string
  modalidad: ModalidadSesion
  link?: string             // URL de acceso (Zoom/Meet) — vacío si no disponible aún
  estado: EstadoSesion
  descripcion?: string
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Devuelve el estado calculado dinámicamente según la fecha actual */
export function calcularEstado(sesion: SesionLXP): EstadoSesion {
  const ahora = Date.now()
  const inicio = new Date(sesion.fecha).getTime()
  const fin    = inicio + sesion.duracionMin * 60 * 1000
  if (ahora >= inicio && ahora <= fin) return 'en-vivo'
  if (ahora > fin)                     return 'finalizada'
  return 'programada'
}

/** Devuelve la próxima sesión programada para un taller */
export function getProximaSesion(tallerSlug: string): SesionLXP | null {
  const ahora = Date.now()
  return sesionesLXP
    .filter(s => s.tallerSlug === tallerSlug && new Date(s.fecha).getTime() > ahora)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())[0] ?? null
}

/** Devuelve todas las sesiones de un taller, ordenadas por fecha */
export function getSesionesPorTaller(tallerSlug: string): SesionLXP[] {
  return sesionesLXP
    .filter(s => s.tallerSlug === tallerSlug)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
}

/** Devuelve sesiones filtradas por módulo */
export function getSesionesPorModulo(tallerSlug: string, modulo: ModuloId): SesionLXP[] {
  return getSesionesPorTaller(tallerSlug).filter(s => s.modulo === modulo)
}

// ── Helpers de formato ───────────────────────────────────────────────────────

export function formatFechaSesion(iso: string): string {
  return new Date(iso).toLocaleDateString('es-PE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export function formatHoraSesion(iso: string): string {
  return new Date(iso).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
}

export function diasParaSesion(iso: string): number {
  return Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
}

// ── Datos placeholder ────────────────────────────────────────────────────────
// Fechas de ejemplo — reemplazar con fechas reales cuando estén confirmadas.
// Patrón: sesiones quincenales por taller, distribuidas por módulo.

const HOY  = new Date()
const d = (diasOffset: number, hora = '09:00') => {
  const f = new Date(HOY)
  f.setDate(f.getDate() + diasOffset)
  const [h, m] = hora.split(':').map(Number)
  f.setHours(h, m, 0, 0)
  return f.toISOString()
}

export const sesionesLXP: SesionLXP[] = [

  // ── MECÁNICA AUTOMOTRIZ ─────────────────────────────────────────────────
  {
    id: 'meca-m1-01',
    tallerSlug: 'mecanica-automotriz',
    titulo: 'Reconocimiento del taller y protocolos de seguridad',
    modulo: 'M1', moduloNombre: 'Reconocimiento del Taller',
    fecha: d(5, '09:00'), duracionMin: 90,
    facilitador: 'Ing. Carlos Mendoza', modalidad: 'meet',
    link: '', estado: 'programada',
    descripcion: 'Recorrido virtual por las zonas del taller y revisión de los equipos de protección personal requeridos.',
  },
  {
    id: 'meca-m2-01',
    tallerSlug: 'mecanica-automotriz',
    titulo: 'Zona de Investigación — Diagnóstico vehicular',
    modulo: 'M2', moduloNombre: 'Zona de Investigación',
    fecha: d(19, '09:00'), duracionMin: 90,
    facilitador: 'Ing. Carlos Mendoza', modalidad: 'meet',
    link: '', estado: 'programada',
    descripcion: 'Uso del escáner OBD2 y lectura de códigos de falla en vehículos de práctica.',
  },
  {
    id: 'meca-m5-01',
    tallerSlug: 'mecanica-automotriz',
    titulo: 'Programa Formativo — Sesión de cierre M5',
    modulo: 'M5', moduloNombre: 'Programa Formativo',
    fecha: d(40, '15:00'), duracionMin: 120,
    facilitador: 'Ing. Carlos Mendoza', modalidad: 'meet',
    link: '', estado: 'programada',
  },

  // ── INDUSTRIA DEL VESTIDO ───────────────────────────────────────────────
  {
    id: 'vest-m1-01',
    tallerSlug: 'industria-vestido',
    titulo: 'Reconocimiento del taller y maquinaria industrial',
    modulo: 'M1', moduloNombre: 'Reconocimiento del Taller',
    fecha: d(6, '10:00'), duracionMin: 90,
    facilitador: 'Lic. Ana Torres', modalidad: 'zoom',
    link: '', estado: 'programada',
  },
  {
    id: 'vest-m2-01',
    tallerSlug: 'industria-vestido',
    titulo: 'Patronaje y corte — Técnicas avanzadas',
    modulo: 'M2', moduloNombre: 'Zona de Investigación',
    fecha: d(20, '10:00'), duracionMin: 90,
    facilitador: 'Lic. Ana Torres', modalidad: 'zoom',
    link: '', estado: 'programada',
  },

  // ── COCINA Y REPOSTERÍA ─────────────────────────────────────────────────
  {
    id: 'cocina-m1-01',
    tallerSlug: 'cocina-reposteria',
    titulo: 'Introducción al taller de cocina — Normas BPM',
    modulo: 'M1', moduloNombre: 'Reconocimiento del Taller',
    fecha: d(7, '09:00'), duracionMin: 90,
    facilitador: 'Chef Marco Quispe', modalidad: 'meet',
    link: '', estado: 'programada',
  },
  {
    id: 'cocina-m2-01',
    tallerSlug: 'cocina-reposteria',
    titulo: 'Técnicas de conservación y manipulación segura',
    modulo: 'M2', moduloNombre: 'Zona de Investigación',
    fecha: d(21, '09:00'), duracionMin: 90,
    facilitador: 'Chef Marco Quispe', modalidad: 'meet',
    link: '', estado: 'programada',
  },

  // ── EBANISTERÍA ─────────────────────────────────────────────────────────
  {
    id: 'eban-m1-01',
    tallerSlug: 'ebanisteria',
    titulo: 'Reconocimiento del taller y uso seguro de maquinaria',
    modulo: 'M1', moduloNombre: 'Reconocimiento del Taller',
    fecha: d(8, '09:00'), duracionMin: 90,
    facilitador: 'Tec. Pedro Huanca', modalidad: 'meet',
    link: '', estado: 'programada',
  },
  {
    id: 'eban-m2-01',
    tallerSlug: 'ebanisteria',
    titulo: 'Diseño y optimización de cortes en MDF',
    modulo: 'M2', moduloNombre: 'Zona de Investigación',
    fecha: d(22, '09:00'), duracionMin: 90,
    facilitador: 'Tec. Pedro Huanca', modalidad: 'meet',
    link: '', estado: 'programada',
  },

  // ── COMUNICACIONES ──────────────────────────────────────────────────────
  {
    id: 'com-m1-01',
    tallerSlug: 'comunicaciones',
    titulo: 'Taller de comunicaciones — Equipos y protocolos',
    modulo: 'M1', moduloNombre: 'Reconocimiento del Taller',
    fecha: d(9, '10:00'), duracionMin: 90,
    facilitador: 'Ing. Luis Ramos', modalidad: 'zoom',
    link: '', estado: 'programada',
  },

  // ── COMPUTACIÓN ─────────────────────────────────────────────────────────
  {
    id: 'comp-m1-01',
    tallerSlug: 'computacion',
    titulo: 'Infraestructura del taller de cómputo',
    modulo: 'M1', moduloNombre: 'Reconocimiento del Taller',
    fecha: d(10, '09:00'), duracionMin: 90,
    facilitador: 'Ing. Rosa Mamani', modalidad: 'meet',
    link: '', estado: 'programada',
  },
  {
    id: 'comp-m2-01',
    tallerSlug: 'computacion',
    titulo: 'Redes locales y conectividad en el aula',
    modulo: 'M2', moduloNombre: 'Zona de Investigación',
    fecha: d(24, '09:00'), duracionMin: 90,
    facilitador: 'Ing. Rosa Mamani', modalidad: 'meet',
    link: '', estado: 'programada',
  },

  // ── AGROPECUARIA ────────────────────────────────────────────────────────
  {
    id: 'agro-m1-01',
    tallerSlug: 'agropecuaria',
    titulo: 'Reconocimiento del módulo agropecuario',
    modulo: 'M1', moduloNombre: 'Reconocimiento del Taller',
    fecha: d(11, '09:00'), duracionMin: 90,
    facilitador: 'Ing. José Ccama', modalidad: 'meet',
    link: '', estado: 'programada',
  },

  // ── ELECTRICIDAD ────────────────────────────────────────────────────────
  {
    id: 'elec-m1-01',
    tallerSlug: 'electricidad',
    titulo: 'Normas de seguridad eléctrica en el taller',
    modulo: 'M1', moduloNombre: 'Reconocimiento del Taller',
    fecha: d(12, '09:00'), duracionMin: 90,
    facilitador: 'Ing. Mario Soto', modalidad: 'zoom',
    link: '', estado: 'programada',
  },
  {
    id: 'elec-m2-01',
    tallerSlug: 'electricidad',
    titulo: 'Instalaciones eléctricas residenciales — práctica guiada',
    modulo: 'M2', moduloNombre: 'Zona de Investigación',
    fecha: d(26, '09:00'), duracionMin: 90,
    facilitador: 'Ing. Mario Soto', modalidad: 'zoom',
    link: '', estado: 'programada',
  },

  // ── CONSTRUCCIONES METÁLICAS ────────────────────────────────────────────
  {
    id: 'metal-m1-01',
    tallerSlug: 'construcciones-metalicas',
    titulo: 'Seguridad en soldadura y corte de metales',
    modulo: 'M1', moduloNombre: 'Reconocimiento del Taller',
    fecha: d(13, '09:00'), duracionMin: 90,
    facilitador: 'Tec. Juan Flores', modalidad: 'meet',
    link: '', estado: 'programada',
  },
  {
    id: 'metal-m2-01',
    tallerSlug: 'construcciones-metalicas',
    titulo: 'Lectura de planos y tolerancias dimensionales',
    modulo: 'M2', moduloNombre: 'Zona de Investigación',
    fecha: d(27, '09:00'), duracionMin: 90,
    facilitador: 'Tec. Juan Flores', modalidad: 'meet',
    link: '', estado: 'programada',
  },
]
