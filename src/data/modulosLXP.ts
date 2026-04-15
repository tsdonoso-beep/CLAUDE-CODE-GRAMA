// src/data/modulosLXP.ts
// Nueva malla curricular GRAMA/MINEDU — 7 módulos, 150h totales

export type FaseLXP = 'diagnostico' | 'orientacion' | 'apropiacion' | 'aplicacion' | 'acompanamiento' | 'proyecto'
export type ModalidadContenido = 'asincrono' | 'sincrono' | 'presencial'
export type TipoContenido = 'VIDEO' | 'PDF' | 'INTERACTIVO' | 'QUIZ' | 'EN_VIVO' | 'DESCARGABLE' | 'ACTIVIDAD_PRACTICA'

export interface PreguntaQuiz {
  id: string; enunciado: string; opciones: string[]; correcta: number; explicacion?: string
}

export interface MomentoSesion {
  horaInicio?: string; duracionMin: number; momento: string
  guion?: string; responsable?: string; materiales?: string
  isBreak?: boolean; isActividad?: boolean
}

export interface ContenidoSesion {
  id: string; tipo: TipoContenido; titulo: string; descripcion?: string
  duracionMin?: number; paginas?: number; preguntas?: number
  puntajeMinimo?: number; bloqueaSiguiente?: boolean; bancoPreguntas?: PreguntaQuiz[]
  urlVideo?: string; urlPDF?: string; urlInteractivo?: string
  urlVivo?: string; urlActividad?: string; descargableId?: string; manualId?: string
}

export interface SesionLXP {
  id: string; nombre: string; objetivo?: string; duracionHoras: number
  modalidad: ModalidadContenido; formato?: string; descripcion?: string
  esEvaluacion?: boolean; momentos?: MomentoSesion[]; contenidos: ContenidoSesion[]
}

export interface ModuloLXP {
  numero: number; id: string; nombre: string; descripcion: string; fase: FaseLXP
  horasTotal: number; horasAsincrono: number; horasSincrono: number; horasPresencial: number
  icon: string; colorFase: string; requiereAprobacion?: boolean; puntajeMinimoAcceso?: number
  sesiones: SesionLXP[]
}

const momentosM0S07: MomentoSesion[] = [
  { horaInicio: '12:00', duracionMin: 5,  momento: 'Espera', materiales: 'Meet, PPT' },
  { horaInicio: '12:05', duracionMin: 10, momento: 'Saludo y Bienvenida', materiales: 'PPT' },
  { horaInicio: '12:15', duracionMin: 15, momento: 'Actividad: Retomamos las tareas de S01', materiales: 'PPT', isActividad: true },
  { horaInicio: '12:30', duracionMin: 20, momento: 'Presentación de Secundaria con Formación Técnica', materiales: 'PPT + Programa Formativo' },
  { horaInicio: '12:50', duracionMin: 10, momento: 'Break', isBreak: true },
  { horaInicio: '13:00', duracionMin: 20, momento: 'Presentación de los talleres + Competencias a desarrollar', materiales: 'PPT' },
  { horaInicio: '13:20', duracionMin: 25, momento: 'Diseño de un taller SFT + Normativas + clasificación equip.', materiales: 'PPT' },
  { horaInicio: '13:45', duracionMin: 5,  momento: 'Presentación de la DES', materiales: 'PPT + DES' },
  { horaInicio: '13:50', duracionMin: 10, momento: 'Break', isBreak: true },
  { horaInicio: '14:00', duracionMin: 30, momento: 'Actividad: Explorando mi taller en la plataforma', materiales: 'Acceso a la plataforma', isActividad: true },
  { horaInicio: '14:30', duracionMin: 10, momento: 'Preguntas' },
  { horaInicio: '14:40', duracionMin: 5,  momento: 'Cierre y Despedida' },
]

export const modulosLXP: ModuloLXP[] = [
  // ── M0 — Inicio y Diagnóstico (14h) ─────────────────────────────────────
  {
    numero: 0, id: 'm0', nombre: 'Inicio y Diagnóstico',
    descripcion: 'Introducción a la plataforma, herramientas digitales e IA para el aprendizaje.',
    fase: 'diagnostico', horasTotal: 14, horasAsincrono: 8, horasSincrono: 6, horasPresencial: 0,
    icon: '🔍', colorFase: '#6366f1',
    sesiones: [
      { id: 'M0-S01-S', nombre: 'Introducción a Ruta de Aprendizaje y Plataforma',
        duracionHoras: 3, modalidad: 'sincrono', formato: 'Presentación', momentos: [],
        contenidos: [{ id: 'm0-s01-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Introducción a Ruta de Aprendizaje y Plataforma', duracionMin: 180 }] },
      { id: 'M0-S02-A', nombre: 'Introducción a las Herramientas Digitales',
        descripcion: 'Conoce las herramientas digitales que se usarán a lo largo de la capacitación.',
        duracionHoras: 0.5, modalidad: 'asincrono', formato: 'Presentación + Videos',
        contenidos: [
          { id: 'm0-s02-c1', tipo: 'INTERACTIVO', titulo: 'Presentación: Herramientas digitales para docentes', duracionMin: 15 },
          { id: 'm0-s02-c2', tipo: 'VIDEO',       titulo: 'Video: Herramientas digitales en el aula EPT',       duracionMin: 15 }] },
      { id: 'M0-S03-A', nombre: 'Google Workspace (Calendar, Docs, Sheets, Slides, Tasks)',
        descripcion: 'Introducción y conocimientos básicos sobre el uso de Google Workspace.',
        duracionHoras: 2, modalidad: 'asincrono', formato: 'Presentación + Videos',
        contenidos: [
          { id: 'm0-s03-c1', tipo: 'INTERACTIVO', titulo: 'Presentación: Google Workspace para docentes', duracionMin: 30 },
          { id: 'm0-s03-c2', tipo: 'VIDEO',       titulo: 'Video: Calendar, Docs y Sheets en el aula',    duracionMin: 45 },
          { id: 'm0-s03-c3', tipo: 'VIDEO',       titulo: 'Video: Slides y Tasks para planificación',     duracionMin: 35 },
          { id: 'm0-s03-c4', tipo: 'QUIZ',        titulo: 'Quiz: Google Workspace', preguntas: 8,          duracionMin: 20 }] },
      { id: 'M0-S04-A', nombre: 'IA para el Aprendizaje (Diseño de Prompt, GPT, Claude, Gemini, NotebookLm)',
        descripcion: 'Introducción y conocimientos básicos sobre el uso de Inteligencia Artificial.',
        duracionHoras: 1.5, modalidad: 'asincrono', formato: 'Presentación + Videos',
        contenidos: [
          { id: 'm0-s04-c1', tipo: 'INTERACTIVO', titulo: 'Presentación: IA generativa para docentes',         duracionMin: 20 },
          { id: 'm0-s04-c2', tipo: 'VIDEO',       titulo: 'Video: Diseño de prompts — GPT, Claude y Gemini',   duracionMin: 40 },
          { id: 'm0-s04-c3', tipo: 'QUIZ',        titulo: 'Quiz: IA para el Aprendizaje', preguntas: 6,        duracionMin: 20 }] },
      { id: 'M0-S05-A', nombre: 'IA para el Aprendizaje (Gamma, Teachy, Polypad, Meshy)',
        descripcion: 'Herramientas de IA para el proceso de enseñanza.',
        duracionHoras: 1.5, modalidad: 'asincrono', formato: 'Presentación + Videos',
        contenidos: [
          { id: 'm0-s05-c1', tipo: 'INTERACTIVO', titulo: 'Presentación: IA creativa para la enseñanza', duracionMin: 20 },
          { id: 'm0-s05-c2', tipo: 'VIDEO',       titulo: 'Video: Gamma y Teachy para crear materiales', duracionMin: 30 },
          { id: 'm0-s05-c3', tipo: 'VIDEO',       titulo: 'Video: Polypad y Meshy en el taller técnico', duracionMin: 30 },
          { id: 'm0-s05-c4', tipo: 'QUIZ',        titulo: 'Quiz: Herramientas IA creativas', preguntas: 6, duracionMin: 10 }] },
      { id: 'M0-S06-A', nombre: 'Herramienta de ideación (Miró, Mural, Figma)',
        descripcion: 'Herramientas digitales para el trabajo en equipo.',
        duracionHoras: 1.5, modalidad: 'asincrono', formato: 'Presentación + Videos',
        contenidos: [
          { id: 'm0-s06-c1', tipo: 'INTERACTIVO', titulo: 'Presentación: Herramientas de ideación colaborativa', duracionMin: 20 },
          { id: 'm0-s06-c2', tipo: 'VIDEO',       titulo: 'Video: Miró y Mural para trabajo en equipo',          duracionMin: 30 },
          { id: 'm0-s06-c3', tipo: 'VIDEO',       titulo: 'Video: Figma para diseño colaborativo',               duracionMin: 30 },
          { id: 'm0-s06-c4', tipo: 'QUIZ',        titulo: 'Quiz: Herramientas de ideación', preguntas: 6,        duracionMin: 10 }] },
      { id: 'M0-S07-S', nombre: 'Introducción a los Talleres Especializados',
        descripcion: 'Introducción de los talleres especializados y la Educación con Formación Técnica.',
        duracionHoras: 3, modalidad: 'sincrono', formato: 'Presentación', momentos: momentosM0S07,
        contenidos: [{ id: 'm0-s07-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Introducción a los Talleres Especializados', duracionMin: 180 }] },
      { id: 'M0-RA-1', nombre: 'Examen de cierre de Módulo',
        duracionHoras: 1, modalidad: 'asincrono', esEvaluacion: true,
        contenidos: [{ id: 'm0-ra1-c1', tipo: 'QUIZ', titulo: 'Evaluación M0: Inicio y Diagnóstico', preguntas: 15, duracionMin: 60 }] },
    ],
  },
  // ── M1 — Reconocimiento del Taller (22h) ────────────────────────────────
  {
    numero: 1, id: 'm1', nombre: 'Reconocimiento del Taller',
    descripcion: 'Exploración de arquitectura, distribución eléctrica, metrado de equipos, instalación, seguridad y garantías del taller.',
    fase: 'orientacion', horasTotal: 22, horasAsincrono: 16, horasSincrono: 6, horasPresencial: 0,
    icon: '🏭', colorFase: '#3b82f6', requiereAprobacion: true, puntajeMinimoAcceso: 80,
    sesiones: [
      { id: 'M1-S08-S', nombre: 'Reconocimiento de mi taller',
        descripcion: 'Presentación del M01, introducción a los elementos del taller.',
        duracionHoras: 3, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm1-s08-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Reconocimiento de mi taller', duracionMin: 180 }] },
      { id: 'M1-S09-A', nombre: 'Exploro la Arqui de mi taller',
        descripcion: 'Normativa de diseño, isométricos, criterios de circulación y seguridad, zonificación.',
        duracionHoras: 1, modalidad: 'asincrono', formato: 'Video',
        contenidos: [{ id: 'm1-s09-c1', tipo: 'VIDEO', titulo: 'Video: Arquitectura y zonificación del taller', duracionMin: 60 }] },
      { id: 'M1-S10-A', nombre: 'Exploro la distribución eléctrica e instalaciones de mi taller',
        descripcion: 'Normativa, tipos de voltajes, componentes de tablero, cargas y distribuciones eléctricas.',
        duracionHoras: 2, modalidad: 'asincrono', formato: 'Video',
        contenidos: [
          { id: 'm1-s10-c1', tipo: 'VIDEO', titulo: 'Video: Instalaciones eléctricas del taller — Parte 1', duracionMin: 60 },
          { id: 'm1-s10-c2', tipo: 'VIDEO', titulo: 'Video: Normativa y seguridad eléctrica',              duracionMin: 60 }] },
      { id: 'M1-S11-A', nombre: 'Exploro el metrado general de equipos',
        descripcion: 'Metrado por tipo de equipos + softwares.',
        duracionHoras: 4, modalidad: 'asincrono', formato: 'Video + Quiz + DES',
        contenidos: [
          { id: 'm1-s11-c1', tipo: 'VIDEO',       titulo: 'Video: Metrado general de equipos del taller', duracionMin: 150 },
          { id: 'm1-s11-c2', tipo: 'QUIZ',        titulo: 'Quiz: Metrado de equipos', preguntas: 10,       duracionMin: 30 },
          { id: 'm1-s11-c3', tipo: 'DESCARGABLE', titulo: 'Ficha de metrado de equipos',                  duracionMin: 30 }] },
      { id: 'M1-S12-A', nombre: 'Instalación (Teórico + softwares)',
        descripcion: 'Teoría sobre instalación de equipos TICS (+CHATBOT IA), softwares.',
        duracionHoras: 5, modalidad: 'asincrono', formato: 'Video + Quiz + DES',
        contenidos: [
          { id: 'm1-s12-c1', tipo: 'VIDEO',       titulo: 'Video: Instalación de equipos TICS',           duracionMin: 180 },
          { id: 'm1-s12-c2', tipo: 'QUIZ',        titulo: 'Quiz: Instalación y softwares', preguntas: 10,  duracionMin: 45 },
          { id: 'm1-s12-c3', tipo: 'DESCARGABLE', titulo: 'Guía de instalación de equipos',               duracionMin: 45 }] },
      { id: 'M1-S13-A', nombre: 'Medidas de seguridad',
        descripcion: 'EPP y seguridad en el taller.',
        duracionHoras: 1, modalidad: 'asincrono', formato: 'Video + Quiz + DES',
        contenidos: [
          { id: 'm1-s13-c1', tipo: 'VIDEO',       titulo: 'Video: EPP y seguridad en el taller',                                               duracionMin: 20 },
          { id: 'm1-s13-c2', tipo: 'QUIZ',        titulo: 'Quiz: Medidas de seguridad', preguntas: 8, bloqueaSiguiente: true, puntajeMinimo: 80, duracionMin: 20 },
          { id: 'm1-s13-c3', tipo: 'DESCARGABLE', titulo: 'Protocolo de seguridad del taller',                                                  duracionMin: 20 }] },
      { id: 'M1-S14-A', nombre: 'Garantía',
        descripcion: "Información sobre Garantía / do's and don'ts.",
        duracionHoras: 1, modalidad: 'asincrono', formato: 'Video + Quiz + DES',
        contenidos: [
          { id: 'm1-s14-c1', tipo: 'VIDEO',       titulo: 'Video: Garantías de los equipos del taller',      duracionMin: 20 },
          { id: 'm1-s14-c2', tipo: 'QUIZ',        titulo: "Quiz: Garantías y do's and don'ts", preguntas: 8,  duracionMin: 20 },
          { id: 'm1-s14-c3', tipo: 'DESCARGABLE', titulo: 'Guía de garantías y cuidados',                    duracionMin: 20 }] },
      { id: 'M1-S15-S', nombre: 'Actividad: Les presento el taller a mis alumnos',
        duracionHoras: 3, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm1-s15-c1', tipo: 'EN_VIVO', titulo: 'Actividad: Les presento el taller a mis alumnos', duracionMin: 180 }] },
      { id: 'M1-RA-2', nombre: 'Examen de cierre de Módulo',
        duracionHoras: 2, modalidad: 'asincrono', esEvaluacion: true,
        contenidos: [{ id: 'm1-ra2-c1', tipo: 'QUIZ', titulo: 'Evaluación M1: Reconocimiento del Taller', preguntas: 20, puntajeMinimo: 80, duracionMin: 120 }] },
    ],
  },
  // ── M2 — Zona de Investigación (20h) ────────────────────────────────────
  {
    numero: 2, id: 'm2', nombre: 'Zona de Investigación',
    descripcion: 'Instalación, uso y mantenimiento de los bienes de la Zona de Investigación.',
    fase: 'apropiacion', horasTotal: 20, horasAsincrono: 12, horasSincrono: 8, horasPresencial: 0,
    icon: '🔬', colorFase: '#06b6d4',
    sesiones: [
      { id: 'M2-S16-S', nombre: 'Presentación de Zona y Bienes',
        descripcion: 'Presentación del M02, introducción a la zona de investigación.',
        duracionHoras: 3, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm2-s16-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Presentación Zona de Investigación', duracionMin: 180 }] },
      { id: 'M2-S17-A', nombre: 'Instalación de los bienes y accesorios',
        duracionHoras: 3, modalidad: 'asincrono', formato: 'Video',
        contenidos: [
          { id: 'm2-s17-c1', tipo: 'VIDEO', titulo: 'Video: Instalación de bienes — Zona Investigación', duracionMin: 90 },
          { id: 'm2-s17-c2', tipo: 'VIDEO', titulo: 'Video: Instalación de accesorios',                  duracionMin: 90 }] },
      { id: 'M2-S18-A', nombre: 'Programación para el uso (Software)',
        duracionHoras: 2, modalidad: 'asincrono', formato: 'Video',
        contenidos: [{ id: 'm2-s18-c1', tipo: 'VIDEO', titulo: 'Video: Configuración y software — Zona Investigación', duracionMin: 120 }] },
      { id: 'M2-S19-A', nombre: 'Consumibles',
        descripcion: 'Relación de consumibles adecuados para los equipos.',
        duracionHoras: 1.5, modalidad: 'asincrono', formato: 'Presentación + Video + Actividad',
        contenidos: [
          { id: 'm2-s19-c1', tipo: 'INTERACTIVO',      titulo: 'Presentación: Consumibles de la Zona Investigación', duracionMin: 20 },
          { id: 'm2-s19-c2', tipo: 'VIDEO',            titulo: 'Video: Tipos y uso de consumibles',                   duracionMin: 25 },
          { id: 'm2-s19-c3', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Inventario de consumibles',             duracionMin: 45 }] },
      { id: 'M2-S20-A', nombre: 'Funcionamiento General de los Bienes',
        descripcion: 'Revisión del funcionamiento de los bienes.',
        duracionHoras: 1.5, modalidad: 'asincrono', formato: 'Videos O&M + Actividad',
        contenidos: [
          { id: 'm2-s20-c1', tipo: 'VIDEO',            titulo: 'Video O&M: Funcionamiento de bienes — Parte 1', duracionMin: 25 },
          { id: 'm2-s20-c2', tipo: 'VIDEO',            titulo: 'Video O&M: Funcionamiento de bienes — Parte 2', duracionMin: 25 },
          { id: 'm2-s20-c3', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Verificación de funcionamiento',   duracionMin: 40 }] },
      { id: 'M2-S21-S', nombre: 'Uso y funcionamiento de los bienes',
        descripcion: 'Seguridad, calibración, funcionamiento y guardado.',
        duracionHoras: 3, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm2-s21-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Uso y funcionamiento — Zona Investigación', duracionMin: 180 }] },
      { id: 'M2-S22-A', nombre: 'Mantenimiento preventivo',
        duracionHoras: 2, modalidad: 'asincrono', formato: 'Presentación + Manuales + Actividad',
        contenidos: [
          { id: 'm2-s22-c1', tipo: 'INTERACTIVO',      titulo: 'Presentación: Mantenimiento preventivo', duracionMin: 25 },
          { id: 'm2-s22-c2', tipo: 'PDF',              titulo: 'Manual de mantenimiento preventivo',      duracionMin: 30 },
          { id: 'm2-s22-c3', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Plan de mantenimiento',     duracionMin: 65 }] },
      { id: 'M2-S22B-S', nombre: 'Aplicación en el entorno de aprendizaje',
        descripcion: 'Análisis de necesidades y diseño de propuesta de valor.',
        duracionHoras: 2, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm2-s22b-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Aplicación en el entorno de aprendizaje', duracionMin: 120 }] },
      { id: 'M2-RA-2', nombre: 'Evaluación de Aprendizaje',
        duracionHoras: 2, modalidad: 'asincrono', esEvaluacion: true,
        contenidos: [{ id: 'm2-ra2-c1', tipo: 'QUIZ', titulo: 'Evaluación M2: Zona de Investigación', preguntas: 20, duracionMin: 120 }] },
    ],
  },
  // ── M3 — Zona de Almacén (20h) ──────────────────────────────────────────
  {
    numero: 3, id: 'm3', nombre: 'Zona de Almacén',
    descripcion: 'Instalación, uso y mantenimiento de los bienes de la Zona de Almacén y Herramientas.',
    fase: 'apropiacion', horasTotal: 20, horasAsincrono: 12, horasSincrono: 8, horasPresencial: 0,
    icon: '📦', colorFase: '#10b981',
    sesiones: [
      { id: 'M3-S23-S', nombre: 'Presentación de Zona y Bienes',
        descripcion: 'Presentación del M03, introducción a la zona de almacén y herramientas.',
        duracionHoras: 3, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm3-s23-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Presentación Zona de Almacén', duracionMin: 180 }] },
      { id: 'M3-S24-A', nombre: 'Instalación de los bienes y accesorios',
        duracionHoras: 3, modalidad: 'asincrono', formato: 'Video',
        contenidos: [
          { id: 'm3-s24-c1', tipo: 'VIDEO', titulo: 'Video: Instalación de bienes — Zona Almacén', duracionMin: 90 },
          { id: 'm3-s24-c2', tipo: 'VIDEO', titulo: 'Video: Instalación de herramientas y accesorios', duracionMin: 90 }] },
      { id: 'M3-S25-A', nombre: 'Programación para el uso (Software)',
        duracionHoras: 2, modalidad: 'asincrono', formato: 'Video',
        contenidos: [{ id: 'm3-s25-c1', tipo: 'VIDEO', titulo: 'Video: Configuración y software — Zona Almacén', duracionMin: 120 }] },
      { id: 'M3-S26-A', nombre: 'Consumibles',
        duracionHoras: 1.5, modalidad: 'asincrono', formato: 'Presentación + Video + Actividad',
        contenidos: [
          { id: 'm3-s26-c1', tipo: 'INTERACTIVO',      titulo: 'Presentación: Consumibles — Zona Almacén', duracionMin: 20 },
          { id: 'm3-s26-c2', tipo: 'VIDEO',            titulo: 'Video: Tipos y uso de consumibles',         duracionMin: 25 },
          { id: 'm3-s26-c3', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Inventario de consumibles',   duracionMin: 45 }] },
      { id: 'M3-S27-A', nombre: 'Funcionamiento General de los Bienes',
        duracionHoras: 1.5, modalidad: 'asincrono', formato: 'Videos O&M + Actividad',
        contenidos: [
          { id: 'm3-s27-c1', tipo: 'VIDEO',            titulo: 'Video O&M: Funcionamiento de bienes — Parte 1', duracionMin: 25 },
          { id: 'm3-s27-c2', tipo: 'VIDEO',            titulo: 'Video O&M: Funcionamiento de bienes — Parte 2', duracionMin: 25 },
          { id: 'm3-s27-c3', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Verificación de funcionamiento',  duracionMin: 40 }] },
      { id: 'M3-S28-S', nombre: 'Uso y funcionamiento de los bienes',
        descripcion: 'Seguridad, calibración, funcionamiento y guardado.',
        duracionHoras: 3, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm3-s28-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Uso y funcionamiento — Zona Almacén', duracionMin: 180 }] },
      { id: 'M3-S29-A', nombre: 'Mantenimiento preventivo',
        duracionHoras: 2, modalidad: 'asincrono', formato: 'Presentación + Manuales + Actividad',
        contenidos: [
          { id: 'm3-s29-c1', tipo: 'INTERACTIVO',      titulo: 'Presentación: Mantenimiento preventivo', duracionMin: 25 },
          { id: 'm3-s29-c2', tipo: 'PDF',              titulo: 'Manual de mantenimiento preventivo',      duracionMin: 30 },
          { id: 'm3-s29-c3', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Plan de mantenimiento',     duracionMin: 65 }] },
      { id: 'M3-S30-S', nombre: 'Aplicación en el entorno de aprendizaje',
        duracionHoras: 2, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm3-s30-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Aplicación en el entorno de aprendizaje', duracionMin: 120 }] },
      { id: 'M3-RA-3', nombre: 'Evaluación de Aprendizaje',
        duracionHoras: 2, modalidad: 'asincrono', esEvaluacion: true,
        contenidos: [{ id: 'm3-ra3-c1', tipo: 'QUIZ', titulo: 'Evaluación M3: Zona de Almacén', preguntas: 20, duracionMin: 120 }] },
    ],
  },
  // ── M4 — Zona de Innovación (40h, Presencial) ───────────────────────────
  {
    numero: 4, id: 'm4', nombre: 'Zona de Innovación',
    descripcion: 'Capacitación intensiva presencial en la Zona de Innovación: instalación, uso, mantenimiento y actividades prácticas.',
    fase: 'aplicacion', horasTotal: 40, horasAsincrono: 9, horasSincrono: 7, horasPresencial: 24,
    icon: '💡', colorFase: '#f59e0b',
    sesiones: [
      { id: 'M4-S31-S', nombre: 'Presentación de Zona y Bienes',
        descripcion: 'Presentación del M04, introducción a la Zona de Innovación.',
        duracionHoras: 1, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm4-s31-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Presentación Zona de Innovación', duracionMin: 60 }] },
      { id: 'M4-S32-S', nombre: 'Recorrido del taller',
        duracionHoras: 2, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm4-s32-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Recorrido virtual del taller', duracionMin: 120 }] },
      { id: 'M4-S33-A', nombre: 'Programación para el uso (Software)',
        duracionHoras: 4, modalidad: 'asincrono', formato: 'Video',
        contenidos: [
          { id: 'm4-s33-c1', tipo: 'VIDEO', titulo: 'Video: Software especializado — Zona Innovación — Parte 1', duracionMin: 120 },
          { id: 'm4-s33-c2', tipo: 'VIDEO', titulo: 'Video: Software especializado — Zona Innovación — Parte 2', duracionMin: 120 }] },
      { id: 'M4-S34-A', nombre: 'Consumibles',
        duracionHoras: 1, modalidad: 'asincrono', formato: 'Presentación + Video + Actividad',
        contenidos: [
          { id: 'm4-s34-c1', tipo: 'INTERACTIVO',      titulo: 'Presentación: Consumibles — Zona Innovación', duracionMin: 15 },
          { id: 'm4-s34-c2', tipo: 'VIDEO',            titulo: 'Video: Consumibles y materiales',              duracionMin: 20 },
          { id: 'm4-s34-c3', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Lista de consumibles',           duracionMin: 25 }] },
      { id: 'M4-S35-P', nombre: 'Instalación de los bienes y accesorios',
        duracionHoras: 1, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s35-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Práctica: Instalación de bienes — Grupo 1', duracionMin: 60 }] },
      { id: 'M4-S36-P', nombre: 'Uso y funcionamiento de los bienes — Grupo 1',
        duracionHoras: 5, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s36-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Práctica: Uso y funcionamiento — Grupo 1', duracionMin: 300 }] },
      { id: 'M4-S37-P', nombre: 'Mantenimiento preventivo',
        duracionHoras: 1, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s37-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Práctica: Mantenimiento preventivo — Grupo 1', duracionMin: 60 }] },
      { id: 'M4-S38-P', nombre: 'Actividad 1',
        duracionHoras: 1, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s38-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad presencial 1', duracionMin: 60 }] },
      { id: 'M4-S39-P', nombre: 'Instalación de los bienes y accesorios',
        duracionHoras: 1, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s39-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Práctica: Instalación de bienes — Grupo 2', duracionMin: 60 }] },
      { id: 'M4-S40-P', nombre: 'Uso y funcionamiento de los bienes — Grupo 2',
        duracionHoras: 5, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s40-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Práctica: Uso y funcionamiento — Grupo 2', duracionMin: 300 }] },
      { id: 'M4-S41-P', nombre: 'Mantenimiento preventivo',
        duracionHoras: 1, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s41-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Práctica: Mantenimiento preventivo — Grupo 2', duracionMin: 60 }] },
      { id: 'M4-S42-P', nombre: 'Actividad 2',
        duracionHoras: 1, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s42-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad presencial 2', duracionMin: 60 }] },
      { id: 'M4-S43-P', nombre: 'Instalación de los bienes y accesorios',
        duracionHoras: 1, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s43-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Práctica: Instalación de bienes — Grupo 3', duracionMin: 60 }] },
      { id: 'M4-S44-P', nombre: 'Uso y funcionamiento de los bienes — Grupo 3',
        duracionHoras: 5, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s44-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Práctica: Uso y funcionamiento — Grupo 3', duracionMin: 300 }] },
      { id: 'M4-S45-P', nombre: 'Mantenimiento preventivo',
        duracionHoras: 1, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s45-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Práctica: Mantenimiento preventivo — Grupo 3', duracionMin: 60 }] },
      { id: 'M4-S46-P', nombre: 'Actividad 3',
        duracionHoras: 1, modalidad: 'presencial',
        contenidos: [{ id: 'm4-s46-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad presencial 3', duracionMin: 60 }] },
      { id: 'M4-S47-S', nombre: 'Presentación y Actividad 4',
        duracionHoras: 1, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm4-s47-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Presentación y Actividad 4', duracionMin: 60 }] },
      { id: 'M4-S48-A', nombre: 'Aplicación en el entorno de aprendizaje',
        duracionHoras: 5, modalidad: 'asincrono',
        contenidos: [
          { id: 'm4-s48-c1', tipo: 'VIDEO',            titulo: 'Video: Integración pedagógica de los bienes', duracionMin: 60 },
          { id: 'm4-s48-c2', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Diseño de sesión de aprendizaje', duracionMin: 240 }] },
      { id: 'M4-RA-4', nombre: 'Evaluación de Aprendizaje',
        duracionHoras: 2, modalidad: 'sincrono', esEvaluacion: true, momentos: [],
        contenidos: [{ id: 'm4-ra4-c1', tipo: 'EN_VIVO', titulo: 'Evaluación M4: Zona de Innovación (Sincrónico)', duracionMin: 120 }] },
    ],
  },
  // ── M5 — Programa Formativo (15h) ────────────────────────────────────────
  {
    numero: 5, id: 'm5', nombre: 'Programa Formativo',
    descripcion: 'Desarrollo de competencias pedagógicas para la implementación del Programa Formativo EPT.',
    fase: 'acompanamiento', horasTotal: 15, horasAsincrono: 12, horasSincrono: 3, horasPresencial: 0,
    icon: '📚', colorFase: '#8b5cf6',
    sesiones: [
      { id: 'M5-S50-S', nombre: 'Introducción al Programa Formativo',
        duracionHoras: 3, modalidad: 'sincrono', momentos: [],
        contenidos: [{ id: 'm5-s50-c1', tipo: 'EN_VIVO', titulo: 'Sesión: Introducción al Programa Formativo EPT', duracionMin: 180 }] },
      { id: 'M5-S51-A', nombre: 'Competencia 1',
        duracionHoras: 2, modalidad: 'asincrono', formato: 'Presentación + Videos',
        contenidos: [
          { id: 'm5-s51-c1', tipo: 'INTERACTIVO', titulo: 'Presentación: Competencia 1 del Programa Formativo', duracionMin: 30 },
          { id: 'm5-s51-c2', tipo: 'VIDEO',       titulo: 'Video: Competencia 1 en la práctica docente',        duracionMin: 60 },
          { id: 'm5-s51-c3', tipo: 'QUIZ',        titulo: 'Quiz: Competencia 1', preguntas: 8,                   duracionMin: 30 }] },
      { id: 'M5-S52-A', nombre: 'Actividad 1',
        duracionHoras: 1, modalidad: 'asincrono',
        contenidos: [{ id: 'm5-s52-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Competencia 1 aplicada', duracionMin: 60 }] },
      { id: 'M5-S53-A', nombre: 'Competencia 2',
        duracionHoras: 2, modalidad: 'asincrono', formato: 'Presentación + Videos',
        contenidos: [
          { id: 'm5-s53-c1', tipo: 'INTERACTIVO', titulo: 'Presentación: Competencia 2 del Programa Formativo', duracionMin: 30 },
          { id: 'm5-s53-c2', tipo: 'VIDEO',       titulo: 'Video: Competencia 2 en la práctica docente',        duracionMin: 60 },
          { id: 'm5-s53-c3', tipo: 'QUIZ',        titulo: 'Quiz: Competencia 2', preguntas: 8,                   duracionMin: 30 }] },
      { id: 'M5-S54-A', nombre: 'Actividad 2',
        duracionHoras: 1, modalidad: 'asincrono',
        contenidos: [{ id: 'm5-s54-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Competencia 2 aplicada', duracionMin: 60 }] },
      { id: 'M5-S55-A', nombre: 'Competencia 3',
        duracionHoras: 2, modalidad: 'asincrono', formato: 'Presentación + Videos',
        contenidos: [
          { id: 'm5-s55-c1', tipo: 'INTERACTIVO', titulo: 'Presentación: Competencia 3 del Programa Formativo', duracionMin: 30 },
          { id: 'm5-s55-c2', tipo: 'VIDEO',       titulo: 'Video: Competencia 3 en la práctica docente',        duracionMin: 60 },
          { id: 'm5-s55-c3', tipo: 'QUIZ',        titulo: 'Quiz: Competencia 3', preguntas: 8,                   duracionMin: 30 }] },
      { id: 'M5-S56-A', nombre: 'Actividad 3',
        duracionHoras: 1, modalidad: 'asincrono',
        contenidos: [{ id: 'm5-s56-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Competencia 3 aplicada', duracionMin: 60 }] },
      { id: 'M5-S57-A', nombre: 'Competencia 4',
        duracionHoras: 2, modalidad: 'asincrono', formato: 'Presentación + Videos',
        contenidos: [
          { id: 'm5-s57-c1', tipo: 'INTERACTIVO', titulo: 'Presentación: Competencia 4 del Programa Formativo', duracionMin: 30 },
          { id: 'm5-s57-c2', tipo: 'VIDEO',       titulo: 'Video: Competencia 4 en la práctica docente',        duracionMin: 60 },
          { id: 'm5-s57-c3', tipo: 'QUIZ',        titulo: 'Quiz: Competencia 4', preguntas: 8,                   duracionMin: 30 }] },
      { id: 'M5-S58-A', nombre: 'Actividad 4',
        duracionHoras: 1, modalidad: 'asincrono',
        contenidos: [{ id: 'm5-s58-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Actividad: Competencia 4 aplicada', duracionMin: 60 }] },
      { id: 'M5-RA-5', nombre: 'Cierre de Programa Formativo',
        duracionHoras: 0, modalidad: 'sincrono', esEvaluacion: true, momentos: [],
        contenidos: [{ id: 'm5-ra5-c1', tipo: 'EN_VIVO', titulo: 'Sesión de cierre: Programa Formativo EPT', duracionMin: 180 }] },
    ],
  },
  // ── M6 — Proyecto Final (19h) ─────────────────────────────────────────────
  {
    numero: 6, id: 'm6', nombre: 'Proyecto Final',
    descripcion: 'Presentación de proyectos finales y reforzamiento presencial de mantenimiento.',
    fase: 'proyecto', horasTotal: 19, horasAsincrono: 0, horasSincrono: 3, horasPresencial: 16,
    icon: '🎓', colorFase: '#ec4899',
    sesiones: [
      { id: 'M6-RA-6', nombre: 'Presentación de Proyectos Finales',
        duracionHoras: 3, modalidad: 'sincrono', esEvaluacion: true, momentos: [],
        contenidos: [{ id: 'm6-ra6-c1', tipo: 'EN_VIVO', titulo: 'Sesión final: Presentación de Proyectos', duracionMin: 180 }] },
      { id: 'M6-OM1', nombre: 'Mantenimiento — Reforzamiento 1',
        descripcion: 'Reforzamiento presencial de mantenimiento de equipos.',
        duracionHoras: 8, modalidad: 'presencial', formato: 'Reforzamiento',
        contenidos: [{ id: 'm6-om1-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Práctica presencial: Mantenimiento — Reforzamiento 1', duracionMin: 480 }] },
      { id: 'M6-OM2', nombre: 'Mantenimiento — Reforzamiento 2',
        descripcion: 'Reforzamiento presencial de mantenimiento de equipos.',
        duracionHoras: 8, modalidad: 'presencial', formato: 'Reforzamiento',
        contenidos: [{ id: 'm6-om2-c1', tipo: 'ACTIVIDAD_PRACTICA', titulo: 'Práctica presencial: Mantenimiento — Reforzamiento 2', duracionMin: 480 }] },
    ],
  },
]
