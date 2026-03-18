// src/data/descargablesLXP.ts
// Contenido de los materiales descargables del LXP — GRAMA / TSF-MINEDU
// Fichas plastificables, rúbricas, bitácoras y plantillas genericas para los 9 talleres EPT

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

export interface CampoFicha {
  id: string
  etiqueta: string
  tipo: 'texto' | 'check' | 'fecha' | 'numero' | 'select' | 'area' | 'firma'
  opciones?: string[]   // Para tipo 'select'
  requerido?: boolean
  placeholder?: string
}

export interface SeccionFicha {
  id: string
  titulo: string
  descripcion?: string
  campos: CampoFicha[]
}

export interface DescargableLXP {
  id: string
  modulo: string
  titulo: string
  subtitulo: string
  descripcion: string
  tipo: 'FICHA_PLASTIFICABLE' | 'RUBRICA' | 'BITACORA' | 'PLANTILLA' | 'PACK'
  formato: 'A4' | 'A5' | 'A3' | 'CARTA'
  paginas: number
  secciones: SeccionFicha[]
  instrucciones?: string
  nota?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. KIT DEL PARTICIPANTE — M0
// Descargable de bienvenida al programa TSF
// ─────────────────────────────────────────────────────────────────────────────
export const kitParticipanteM0: DescargableLXP = {
  id: "desc-m0-kit",
  modulo: "m0",
  titulo: "Kit del Participante — Programa TSF 2024",
  subtitulo: "Tu guía de inicio para la Ruta de Aprendizaje LXP",
  descripcion: "Documento de bienvenida con la estructura del programa, el compromiso de aprendizaje y la guía de uso de la plataforma. Imprime y conserva durante todo el programa.",
  tipo: "PLANTILLA",
  formato: "A4",
  paginas: 12,
  instrucciones: "Imprime este documento al inicio del programa. Completarlo en la sesión sincrónica de apertura.",
  secciones: [
    {
      id: "kit-s1",
      titulo: "Mis Datos de Participante",
      campos: [
        { id: "nombre", etiqueta: "Nombres y Apellidos", tipo: "texto", requerido: true },
        { id: "especialidad", etiqueta: "Especialidad / Taller", tipo: "texto", requerido: true },
        { id: "ie", etiqueta: "Institución Educativa", tipo: "texto", requerido: true },
        { id: "ugel", etiqueta: "UGEL", tipo: "texto", requerido: true },
        { id: "region", etiqueta: "Región", tipo: "texto", requerido: true },
        { id: "grados", etiqueta: "Grados que enseño", tipo: "texto", placeholder: "Ej: 3°, 4° y 5° secundaria" }
      ]
    },
    {
      id: "kit-s2",
      titulo: "Mis Expectativas del Programa",
      descripcion: "Escribe con honestidad — estas expectativas guiarán tu proceso de aprendizaje",
      campos: [
        { id: "expectativa1", etiqueta: "¿Qué espero aprender en este programa?", tipo: "area" },
        { id: "expectativa2", etiqueta: "¿Cuál es mi mayor desafío hoy como docente de taller?", tipo: "area" },
        { id: "expectativa3", etiqueta: "¿Qué cambio concreto quiero lograr en mi taller al terminar?", tipo: "area" }
      ]
    },
    {
      id: "kit-s3",
      titulo: "Pacto de Aprendizaje",
      descripcion: "Este es mi compromiso personal con el programa TSF-MINEDU",
      campos: [
        { id: "pac1", etiqueta: "Me comprometo a completar los 7 módulos del programa", tipo: "check" },
        { id: "pac2", etiqueta: "Asistiré a las sesiones presenciales en el taller", tipo: "check" },
        { id: "pac3", etiqueta: "Participaré activamente en las sesiones sincrónicas", tipo: "check" },
        { id: "pac4", etiqueta: "Aplicaré lo aprendido con mis estudiantes durante el programa", tipo: "check" },
        { id: "pac5", etiqueta: "Entregaré el Proyecto Integrador al final del módulo 6", tipo: "check" },
        { id: "firma-pac", etiqueta: "Firma del participante y fecha", tipo: "firma" }
      ]
    },
    {
      id: "kit-s4",
      titulo: "Mi Ruta de Aprendizaje — Seguimiento Personal",
      descripcion: "Marca tu progreso en cada módulo. Llevar este registro te ayuda a mantener el ritmo.",
      campos: [
        { id: "m0", etiqueta: "M0 — Inicio y Diagnóstico (4h)", tipo: "check" },
        { id: "m1", etiqueta: "M1 — Seguridad y Arquitectura del Taller (13h)", tipo: "check" },
        { id: "m2", etiqueta: "M2 — Zona de Investigación (18h)", tipo: "check" },
        { id: "m3", etiqueta: "M3 — Zona de Innovación: Máquinas y Herramientas (36h)", tipo: "check" },
        { id: "m4", etiqueta: "M4 — Acabados y Almacén (14h)", tipo: "check" },
        { id: "m5", etiqueta: "M5 — Programa Formativo en el Taller (22h)", tipo: "check" },
        { id: "m6", etiqueta: "M6 — Proyecto Integrador (25h)", tipo: "check" }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. FICHAS DE REVISIÓN DIARIA PLASTIFICABLES — M1
// Check list operativo plastificable A5 para uso diario en el taller
// ─────────────────────────────────────────────────────────────────────────────
export const fichasRevisionDiariaM1: DescargableLXP = {
  id: "desc-m1-fichas-revision",
  modulo: "m1",
  titulo: "Fichas de Revisión Diaria — Plastificables A5",
  subtitulo: "Check list operativo de seguridad por equipo — Para marcar con marcador borrable",
  descripcion: "Fichas de verificación pre-operativa para los principales equipos del taller. Diseñadas para plastificar y usar con marcador borrable. Incluye 6 fichas: sierra circular, torno, garlopa, cortadora láser, cabina de pintura y check general de zona.",
  tipo: "FICHA_PLASTIFICABLE",
  formato: "A5",
  paginas: 16,
  instrucciones: "Imprimir en cartulina 200g, plastificar y colgar junto a cada equipo. Usar marcador borrable para el registro diario. Borrar al final de la jornada.",
  nota: "Cada ficha incluye espacio para firma del responsable y observaciones. Fotografiar la ficha al final del día si se detecta alguna anomalía.",
  secciones: [
    {
      id: "ficha-sierra",
      titulo: "Ficha A: Sierra Circular — Revisión Pre-Operativa",
      campos: [
        { id: "f-sc-fecha", etiqueta: "Fecha y sesión", tipo: "fecha" },
        { id: "f-sc-resp", etiqueta: "Responsable de la verificación", tipo: "texto" },
        { id: "f-sc-1", etiqueta: "Guarda protectora instalada y sin daños visibles", tipo: "check" },
        { id: "f-sc-2", etiqueta: "Disco de sierra sin fisuras, bien centrado y apretado", tipo: "check" },
        { id: "f-sc-3", etiqueta: "Guía paralela ajustada y bloqueada correctamente", tipo: "check" },
        { id: "f-sc-4", etiqueta: "Cable de alimentación sin daños, enchufado con clavija entera", tipo: "check" },
        { id: "f-sc-5", etiqueta: "Mesa libre de virutas y materiales que puedan interferir", tipo: "check" },
        { id: "f-sc-6", etiqueta: "EPP disponible: lentes de seguridad + orejeras", tipo: "check" },
        { id: "f-sc-7", etiqueta: "Zona alrededor de la máquina despejada (mínimo 1m a cada lado)", tipo: "check" },
        { id: "f-sc-obs", etiqueta: "Observaciones / anomalías detectadas", tipo: "area" },
        { id: "f-sc-estado", etiqueta: "Estado del equipo", tipo: "select", opciones: ["OPERATIVO", "OPERATIVO CON OBSERVACIÓN", "EN REPARACIÓN — NO USAR"] },
        { id: "f-sc-firma", etiqueta: "Firma del responsable", tipo: "firma" }
      ]
    },
    {
      id: "ficha-torno",
      titulo: "Ficha B: Torno de Madera — Revisión Pre-Operativa",
      campos: [
        { id: "f-to-fecha", etiqueta: "Fecha y sesión", tipo: "fecha" },
        { id: "f-to-resp", etiqueta: "Responsable de la verificación", tipo: "texto" },
        { id: "f-to-1", etiqueta: "Cabezal fijo y móvil alineados — verificar con pieza de prueba", tipo: "check" },
        { id: "f-to-2", etiqueta: "Gouge y herramientas de torneado con filos en buen estado", tipo: "check" },
        { id: "f-to-3", etiqueta: "Soporte de herramienta (toolrest) firme y a la distancia correcta", tipo: "check" },
        { id: "f-to-4", etiqueta: "Velocidad de trabajo ajustada al diámetro de la pieza", tipo: "check" },
        { id: "f-to-5", etiqueta: "Pieza bien centrada y fija antes de encender", tipo: "check" },
        { id: "f-to-6", etiqueta: "EPP: lentes de seguridad, ropa ajustada, sin joyas ni ropa suelta", tipo: "check" },
        { id: "f-to-7", etiqueta: "Cable y toma en buen estado", tipo: "check" },
        { id: "f-to-obs", etiqueta: "Observaciones / anomalías detectadas", tipo: "area" },
        { id: "f-to-estado", etiqueta: "Estado del equipo", tipo: "select", opciones: ["OPERATIVO", "OPERATIVO CON OBSERVACIÓN", "EN REPARACIÓN — NO USAR"] },
        { id: "f-to-firma", etiqueta: "Firma del responsable", tipo: "firma" }
      ]
    },
    {
      id: "ficha-garlopa",
      titulo: "Ficha C: Garlopa / Regruesadora — Revisión Pre-Operativa",
      campos: [
        { id: "f-ga-fecha", etiqueta: "Fecha y sesión", tipo: "fecha" },
        { id: "f-ga-resp", etiqueta: "Responsable de la verificación", tipo: "texto" },
        { id: "f-ga-1", etiqueta: "Cuchillas con filo adecuado — sin astillas ni melladuras visibles", tipo: "check" },
        { id: "f-ga-2", etiqueta: "Mesa de alimentación nivelada y paralela a la mesa de salida", tipo: "check" },
        { id: "f-ga-3", etiqueta: "Guarda del cabezal portacuchillas instalada y ajustada", tipo: "check" },
        { id: "f-ga-4", etiqueta: "Empujadores de madera disponibles para piezas cortas (< 30cm)", tipo: "check" },
        { id: "f-ga-5", etiqueta: "Sistema de aspiración de virutas conectado y funcionando", tipo: "check" },
        { id: "f-ga-6", etiqueta: "EPP: lentes + orejeras (>90 dB) + mascarilla para polvo de madera", tipo: "check" },
        { id: "f-ga-obs", etiqueta: "Observaciones / anomalías detectadas", tipo: "area" },
        { id: "f-ga-estado", etiqueta: "Estado del equipo", tipo: "select", opciones: ["OPERATIVO", "OPERATIVO CON OBSERVACIÓN", "EN REPARACIÓN — NO USAR"] },
        { id: "f-ga-firma", etiqueta: "Firma del responsable", tipo: "firma" }
      ]
    },
    {
      id: "ficha-laser",
      titulo: "Ficha D: Cortadora Láser — Revisión Pre-Operativa",
      campos: [
        { id: "f-la-fecha", etiqueta: "Fecha y sesión", tipo: "fecha" },
        { id: "f-la-resp", etiqueta: "Responsable de la verificación", tipo: "texto" },
        { id: "f-la-1", etiqueta: "Sistema de ventilación / extracción de humos encendido y funcionando", tipo: "check" },
        { id: "f-la-2", etiqueta: "Lente de enfoque limpio — sin residuos de cortes anteriores", tipo: "check" },
        { id: "f-la-3", etiqueta: "Cama de la cortadora limpia — sin residuos de materiales anteriores", tipo: "check" },
        { id: "f-la-4", etiqueta: "Material a cortar verificado — NO es PVC, vinilo clorado ni espuma de poliuretano", tipo: "check" },
        { id: "f-la-5", etiqueta: "Tapa de protección cerrada durante el corte — NUNCA mirar el haz directamente", tipo: "check" },
        { id: "f-la-6", etiqueta: "Extintor de CO₂ accesible dentro del radio de 2 metros de la máquina", tipo: "check" },
        { id: "f-la-7", etiqueta: "Archivo vectorial verificado antes de ejecutar (simulación previa)", tipo: "check" },
        { id: "f-la-obs", etiqueta: "Observaciones / anomalías detectadas", tipo: "area" },
        { id: "f-la-estado", etiqueta: "Estado del equipo", tipo: "select", opciones: ["OPERATIVO", "OPERATIVO CON OBSERVACIÓN", "EN REPARACIÓN — NO USAR"] },
        { id: "f-la-firma", etiqueta: "Firma del responsable", tipo: "firma" }
      ]
    },
    {
      id: "ficha-cabina",
      titulo: "Ficha E: Cabina de Pintura — Revisión Pre-Operativa",
      campos: [
        { id: "f-ca-fecha", etiqueta: "Fecha y sesión", tipo: "fecha" },
        { id: "f-ca-resp", etiqueta: "Responsable de la verificación", tipo: "texto" },
        { id: "f-ca-1", etiqueta: "Sistema de ventilación forzada encendido y funcionando (mínimo 10 min antes)", tipo: "check" },
        { id: "f-ca-2", etiqueta: "Filtros de la cabina limpios o reemplazados según programa", tipo: "check" },
        { id: "f-ca-3", etiqueta: "EPP completo listo: mameluco + lentes antiparra + respirador con filtro orgánico + guantes nitrilo", tipo: "check" },
        { id: "f-ca-4", etiqueta: "Pistola de pintura limpia y sin residuos del uso anterior", tipo: "check" },
        { id: "f-ca-5", etiqueta: "Presión del compresor calibrada según el tipo de producto a aplicar", tipo: "check" },
        { id: "f-ca-6", etiqueta: "Zona sin fuentes de ignición (no encendedores, no teléfonos dentro de la cabina)", tipo: "check" },
        { id: "f-ca-7", etiqueta: "Producto a usar identificado: tipo de diluyente compatible verificado", tipo: "check" },
        { id: "f-ca-obs", etiqueta: "Observaciones / anomalías detectadas", tipo: "area" },
        { id: "f-ca-estado", etiqueta: "Estado del equipo", tipo: "select", opciones: ["OPERATIVO", "OPERATIVO CON OBSERVACIÓN", "EN REPARACIÓN — NO USAR"] },
        { id: "f-ca-firma", etiqueta: "Firma del responsable", tipo: "firma" }
      ]
    },
    {
      id: "ficha-zona-general",
      titulo: "Ficha F: Check General de Zona — Inicio de Jornada",
      campos: [
        { id: "f-zo-fecha", etiqueta: "Fecha y jornada", tipo: "fecha" },
        { id: "f-zo-resp", etiqueta: "Docente responsable de la jornada", tipo: "texto" },
        { id: "f-zo-1", etiqueta: "Panel de luces del taller operativo — todas las luminarias funcionando", tipo: "check" },
        { id: "f-zo-2", etiqueta: "Extintor con carga vigente (sello intacto, manómetro en zona verde)", tipo: "check" },
        { id: "f-zo-3", etiqueta: "Botiquín de primeros auxilios completo y accesible", tipo: "check" },
        { id: "f-zo-4", etiqueta: "Pasillos y rutas de evacuación despejados", tipo: "check" },
        { id: "f-zo-5", etiqueta: "Almacén cerrado con llave — acceso controlado", tipo: "check" },
        { id: "f-zo-6", etiqueta: "EPP de los estudiantes disponible y en buen estado", tipo: "check" },
        { id: "f-zo-7", etiqueta: "Señalización de seguridad visible y en buen estado", tipo: "check" },
        { id: "f-zo-8", etiqueta: "Zona de trabajo ordenada desde la sesión anterior", tipo: "check" },
        { id: "f-zo-inc", etiqueta: "Incidentes de la jornada anterior a reportar", tipo: "area" },
        { id: "f-zo-firma", etiqueta: "Firma del responsable", tipo: "firma" }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BITÁCORA DE MANTENIMIENTO PREVENTIVO — M4
// Registro histórico de intervenciones técnicas en equipos del taller
// ─────────────────────────────────────────────────────────────────────────────
export const bitacoraMantenimientoM4: DescargableLXP = {
  id: "desc-m4-bitacora",
  modulo: "m4",
  titulo: "Bitácora de Mantenimiento Preventivo",
  subtitulo: "Registro de intervenciones técnicas — Taller EPT",
  descripcion: "Bitácora para registrar todas las intervenciones de mantenimiento preventivo y correctivo de los equipos del taller. Incluye registro individual por equipo y resumen mensual. 8 páginas A4.",
  tipo: "BITACORA",
  formato: "A4",
  paginas: 8,
  instrucciones: "Completar inmediatamente después de cada intervención de mantenimiento. No dejar para después. La bitácora es un documento oficial que puede ser requerido en auditorías.",
  secciones: [
    {
      id: "bm-s1",
      titulo: "Datos del Equipo",
      campos: [
        { id: "bm-equipo", etiqueta: "Nombre del equipo", tipo: "texto", requerido: true },
        { id: "bm-codigo", etiqueta: "Código interno del taller", tipo: "texto", requerido: true },
        { id: "bm-codigo-entidad", etiqueta: "Código de entidad MINEDU", tipo: "texto" },
        { id: "bm-marca", etiqueta: "Marca y modelo", tipo: "texto" },
        { id: "bm-zona", etiqueta: "Zona del taller", tipo: "select", opciones: ["Investigación y Diseño", "Innovación y Máquinas", "Acabados", "Almacén"] },
        { id: "bm-fecha-instalacion", etiqueta: "Fecha de instalación en el taller", tipo: "fecha" }
      ]
    },
    {
      id: "bm-s2",
      titulo: "Programa de Mantenimiento Establecido",
      campos: [
        { id: "bm-pm-diario", etiqueta: "Mantenimiento diario: descripción de acciones", tipo: "area", placeholder: "Ej: Limpiar virutas de la mesa y guarda, verificar fijación del disco" },
        { id: "bm-pm-semanal", etiqueta: "Mantenimiento semanal: descripción de acciones", tipo: "area", placeholder: "Ej: Lubricar guía paralela, verificar tensión de correa" },
        { id: "bm-pm-mensual", etiqueta: "Mantenimiento mensual: descripción de acciones", tipo: "area", placeholder: "Ej: Verificar alineación de mesa, limpiar interior del motor con aire comprimido" },
        { id: "bm-pm-semestral", etiqueta: "Mantenimiento semestral: descripción de acciones", tipo: "area", placeholder: "Ej: Cambio de cuchillas, revisión de rodamientos, verificación eléctrica" }
      ]
    },
    {
      id: "bm-s3",
      titulo: "Registro de Intervenciones",
      descripcion: "Completar una fila por cada intervención realizada. Usar filas adicionales si es necesario.",
      campos: [
        { id: "bm-reg-fecha", etiqueta: "Fecha de intervención", tipo: "fecha" },
        { id: "bm-reg-tipo", etiqueta: "Tipo de mantenimiento", tipo: "select", opciones: ["Preventivo programado", "Preventivo no programado", "Correctivo — falla menor", "Correctivo — falla mayor", "Revisión técnica externa"] },
        { id: "bm-reg-descripcion", etiqueta: "Descripción de la intervención realizada", tipo: "area" },
        { id: "bm-reg-piezas", etiqueta: "Piezas o insumos utilizados (con cantidad y costo si aplica)", tipo: "area" },
        { id: "bm-reg-resultado", etiqueta: "Resultado de la intervención", tipo: "select", opciones: ["Equipo operativo", "Equipo operativo con restricción", "Equipo en espera de repuestos", "Equipo dado de baja"] },
        { id: "bm-reg-proximo", etiqueta: "Próxima intervención programada", tipo: "fecha" },
        { id: "bm-reg-responsable", etiqueta: "Responsable de la intervención", tipo: "texto" },
        { id: "bm-reg-firma", etiqueta: "Firma del responsable", tipo: "firma" }
      ]
    },
    {
      id: "bm-s4",
      titulo: "Resumen de Estado Mensual",
      campos: [
        { id: "bm-mes", etiqueta: "Mes y año del resumen", tipo: "texto" },
        { id: "bm-intervenciones", etiqueta: "Total de intervenciones realizadas en el mes", tipo: "numero" },
        { id: "bm-horas-paro", etiqueta: "Total de horas de paro no planificado por fallas", tipo: "numero" },
        { id: "bm-equipos-operativos", etiqueta: "Equipos en estado operativo al cierre del mes", tipo: "numero" },
        { id: "bm-equipos-reparacion", etiqueta: "Equipos en reparación al cierre del mes", tipo: "numero" },
        { id: "bm-costo-mantenimiento", etiqueta: "Costo total de mantenimiento del mes (S/.)", tipo: "numero" },
        { id: "bm-observaciones-mes", etiqueta: "Observaciones del mes y acciones pendientes", tipo: "area" },
        { id: "bm-firma-docente", etiqueta: "Firma del docente responsable", tipo: "firma" }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. PLANTILLA DE SESIÓN DE APRENDIZAJE — M5
// Formato oficial de planificación de sesión de taller EPT
// ─────────────────────────────────────────────────────────────────────────────
export const plantillaSesionAprendizajeM5: DescargableLXP = {
  id: "desc-m5-plantilla-sesion",
  modulo: "m5",
  titulo: "Plantilla de Sesión de Aprendizaje — Taller EPT",
  subtitulo: "Formato de planificación por competencias alineado con el CNOF-MINEDU",
  descripcion: "Plantilla oficial de sesión de aprendizaje para talleres EPT con enfoque por competencias. Compatible con el Currículo Nacional y el CNOF. Incluye las tres fases pedagógicas (inicio, proceso, cierre) y los campos de evaluación.",
  tipo: "PLANTILLA",
  formato: "A4",
  paginas: 4,
  instrucciones: "Completar antes de cada sesión de aprendizaje. Esta plantilla es el documento de planificación y a la vez el registro de lo ejecutado. Guardar una copia firmada en el portafolio del docente.",
  secciones: [
    {
      id: "psa-s1",
      titulo: "Datos de Identificación",
      campos: [
        { id: "psa-ie", etiqueta: "Institución Educativa", tipo: "texto", requerido: true },
        { id: "psa-docente", etiqueta: "Docente", tipo: "texto", requerido: true },
        { id: "psa-especialidad", etiqueta: "Especialidad / Taller", tipo: "texto", requerido: true },
        { id: "psa-ciclo", etiqueta: "Ciclo y grado", tipo: "texto", placeholder: "Ej: Auxiliar Técnico — 3° Secundaria" },
        { id: "psa-modulo-form", etiqueta: "Módulo de formación", tipo: "texto" },
        { id: "psa-unidad", etiqueta: "Unidad didáctica", tipo: "texto" },
        { id: "psa-sesion-n", etiqueta: "N° de sesión", tipo: "numero" },
        { id: "psa-fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
        { id: "psa-duracion", etiqueta: "Duración (horas pedagógicas)", tipo: "numero" },
        { id: "psa-n-estudiantes", etiqueta: "N° de estudiantes", tipo: "numero" }
      ]
    },
    {
      id: "psa-s2",
      titulo: "Propósito de la Sesión",
      campos: [
        { id: "psa-competencia", etiqueta: "Competencia a desarrollar (del CNOF)", tipo: "area", requerido: true },
        { id: "psa-capacidad", etiqueta: "Capacidad específica de esta sesión", tipo: "area", requerido: true },
        { id: "psa-desempeno", etiqueta: "Desempeño esperado al finalizar la sesión", tipo: "area", requerido: true, placeholder: "¿Qué podrá hacer el estudiante que antes no podía? Ej: 'Opera la sierra circular siguiendo el protocolo de seguridad y obtiene cortes con ±1mm de tolerancia'" },
        { id: "psa-evidencia", etiqueta: "Evidencia de aprendizaje (producto o desempeño observable)", tipo: "texto" }
      ]
    },
    {
      id: "psa-s3",
      titulo: "Secuencia Pedagógica",
      descripcion: "Describe las actividades de cada fase con el tiempo asignado",
      campos: [
        { id: "psa-inicio-act", etiqueta: "INICIO — Actividades de motivación y recuperación de saberes previos", tipo: "area", requerido: true, placeholder: "¿Cómo captarás la atención? ¿Qué pregunta generadora usarás? ¿Qué demostrarás para motivar?" },
        { id: "psa-inicio-tiempo", etiqueta: "Tiempo de inicio (minutos)", tipo: "numero" },
        { id: "psa-proceso-act", etiqueta: "PROCESO — Actividades de desarrollo de la competencia", tipo: "area", requerido: true, placeholder: "Describe la secuencia de actividades: demostración → práctica guiada → práctica semi-autónoma → práctica autónoma" },
        { id: "psa-proceso-tiempo", etiqueta: "Tiempo de proceso (minutos)", tipo: "numero" },
        { id: "psa-cierre-act", etiqueta: "CIERRE — Actividades de consolidación y metacognición", tipo: "area", requerido: true, placeholder: "¿Cómo cerrarás el aprendizaje? ¿Qué retroalimentación darás? ¿Qué conexión harás con la siguiente sesión?" },
        { id: "psa-cierre-tiempo", etiqueta: "Tiempo de cierre (minutos)", tipo: "numero" }
      ]
    },
    {
      id: "psa-s4",
      titulo: "Recursos y Evaluación",
      campos: [
        { id: "psa-equipos", etiqueta: "Equipos y herramientas a utilizar (zona + equipo)", tipo: "area" },
        { id: "psa-materiales", etiqueta: "Materiales de consumo necesarios", tipo: "area" },
        { id: "psa-epp", etiqueta: "EPP requerido para la sesión", tipo: "area" },
        { id: "psa-instrumento-eval", etiqueta: "Instrumento de evaluación utilizado", tipo: "select", opciones: ["Rúbrica analítica", "Lista de cotejo", "Registro anecdótico", "Autoevaluación", "Portafolio de evidencias", "Otro"] },
        { id: "psa-criterios-eval", etiqueta: "Criterios de evaluación de esta sesión", tipo: "area" },
        { id: "psa-reflexion", etiqueta: "Reflexión del docente post-sesión (completar después de la clase)", tipo: "area", placeholder: "¿Qué funcionó bien? ¿Qué cambiaría? ¿Qué estudiantes necesitan atención adicional?" },
        { id: "psa-firma", etiqueta: "Firma del docente", tipo: "firma" }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. PACK DE EVALUACIÓN POR COMPETENCIAS — M5
// Conjunto de instrumentos de evaluación para el taller EPT
// ─────────────────────────────────────────────────────────────────────────────
export const packEvaluacionM5: DescargableLXP = {
  id: "desc-m5-pack-evaluacion",
  modulo: "m5",
  titulo: "Pack de Evaluación por Competencias — Taller EPT",
  subtitulo: "Rúbricas, listas de cotejo y registros para la evaluación formativa y sumativa",
  descripcion: "Colección de 6 instrumentos de evaluación listos para usar en el taller EPT: rúbrica de proceso técnico, lista de cotejo de seguridad, registro anecdótico, ficha de autoevaluación del estudiante, portafolio de evidencias y ficha de coevaluación. 18 páginas A4.",
  tipo: "PACK",
  formato: "A4",
  paginas: 18,
  instrucciones: "Seleccionar el instrumento adecuado según el tipo de evaluación (formativa o sumativa) y el desempeño a observar. Los instrumentos son genéricos y adaptables a cualquier especialidad.",
  secciones: [
    {
      id: "pe-s1",
      titulo: "Instrumento 1: Rúbrica Analítica de Proceso Técnico",
      descripcion: "Para evaluar la calidad del proceso de fabricación en prácticas presenciales",
      campos: [
        { id: "pe-r-estudiante", etiqueta: "Estudiante evaluado", tipo: "texto" },
        { id: "pe-r-sesion", etiqueta: "Sesión y fecha", tipo: "texto" },
        { id: "pe-r-crit1", etiqueta: "CRITERIO 1: Seguridad — Uso correcto del EPP y cumplimiento de protocolos", tipo: "select", opciones: ["4 — Excelente: EPP completo, protocolos aplicados sin recordatorio", "3 — Logrado: EPP completo con recordatorio menor", "2 — En proceso: EPP incompleto, requirió corrección", "1 — Inicio: No usó EPP, operó de forma insegura"] },
        { id: "pe-r-crit2", etiqueta: "CRITERIO 2: Técnica — Aplicación correcta del procedimiento de uso del equipo", tipo: "select", opciones: ["4 — Excelente: Técnica correcta en todos los pasos, sin asistencia", "3 — Logrado: Técnica correcta con asistencia puntual del docente", "2 — En proceso: Técnica parcialmente correcta, varios errores menores", "1 — Inicio: Técnica incorrecta, requirió intervención constante"] },
        { id: "pe-r-crit3", etiqueta: "CRITERIO 3: Calidad del resultado — Tolerancias, acabado y funcionalidad del producto", tipo: "select", opciones: ["4 — Excelente: Resultado dentro de tolerancia, acabado de calidad", "3 — Logrado: Resultado aceptable con errores menores subsanables", "2 — En proceso: Resultado con errores que afectan la funcionalidad", "1 — Inicio: Resultado inutilizable o muy alejado del objetivo"] },
        { id: "pe-r-crit4", etiqueta: "CRITERIO 4: Orden y cuidado — Manejo del espacio de trabajo y los equipos", tipo: "select", opciones: ["4 — Excelente: Limpia su zona, cuida los equipos, ordena al terminar", "3 — Logrado: Ordena con recordatorio", "2 — En proceso: Deja su zona desordenada habitualmente", "1 — Inicio: No tiene hábito de orden, deja equipos sin limpiar"] },
        { id: "pe-r-retro", etiqueta: "Retroalimentación específica para el estudiante", tipo: "area" },
        { id: "pe-r-firma", etiqueta: "Firma del docente evaluador", tipo: "firma" }
      ]
    },
    {
      id: "pe-s2",
      titulo: "Instrumento 2: Lista de Cotejo de Seguridad",
      descripcion: "Para verificar el cumplimiento del protocolo de seguridad antes y durante la práctica",
      campos: [
        { id: "pe-lc-nombre", etiqueta: "Nombre del estudiante", tipo: "texto" },
        { id: "pe-lc-fecha", etiqueta: "Fecha y sesión", tipo: "fecha" },
        { id: "pe-lc-1", etiqueta: "Usa lentes de seguridad correctamente colocados", tipo: "select", opciones: ["Sí", "No", "No aplica"] },
        { id: "pe-lc-2", etiqueta: "Usa orejeras en operaciones con ruido >85 dB", tipo: "select", opciones: ["Sí", "No", "No aplica"] },
        { id: "pe-lc-3", etiqueta: "Usa ropa ajustada sin partes sueltas ni joyas", tipo: "select", opciones: ["Sí", "No", "No aplica"] },
        { id: "pe-lc-4", etiqueta: "Verifica la guarda de seguridad antes de encender la máquina", tipo: "select", opciones: ["Sí", "No", "No aplica"] },
        { id: "pe-lc-5", etiqueta: "Mantiene la distancia segura y la posición corporal correcta al operar", tipo: "select", opciones: ["Sí", "No", "No aplica"] },
        { id: "pe-lc-6", etiqueta: "No deja la máquina funcionando sin supervisión", tipo: "select", opciones: ["Sí", "No", "No aplica"] },
        { id: "pe-lc-7", etiqueta: "Limpia su zona de trabajo al terminar la operación", tipo: "select", opciones: ["Sí", "No", "No aplica"] },
        { id: "pe-lc-obs", etiqueta: "Observaciones", tipo: "area" }
      ]
    },
    {
      id: "pe-s3",
      titulo: "Instrumento 3: Ficha de Autoevaluación del Estudiante",
      descripcion: "Para que el estudiante evalúe su propio desempeño al final de la sesión",
      campos: [
        { id: "pe-ae-nombre", etiqueta: "Mi nombre", tipo: "texto" },
        { id: "pe-ae-fecha", etiqueta: "Fecha", tipo: "fecha" },
        { id: "pe-ae-1", etiqueta: "¿Logré el propósito de la sesión? Explica con evidencia concreta", tipo: "area" },
        { id: "pe-ae-2", etiqueta: "¿Qué parte del proceso técnico hice correctamente? Describe", tipo: "area" },
        { id: "pe-ae-3", etiqueta: "¿Qué parte debo mejorar? ¿Cómo lo haré la próxima vez?", tipo: "area" },
        { id: "pe-ae-4", etiqueta: "¿Cumplí con todos los protocolos de seguridad? ¿En qué momento me costó más?", tipo: "area" },
        { id: "pe-ae-5", etiqueta: "Mi autocalificación de esta sesión (1 al 4): ¿Por qué?", tipo: "texto" },
        { id: "pe-ae-firma", etiqueta: "Mi firma", tipo: "firma" }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. RÚBRICA 360° DEL PROYECTO INTEGRADOR — M6
// Instrumento de evaluación final del Proyecto Integrador
// ─────────────────────────────────────────────────────────────────────────────
export const rubricaProyectoIntegradorM6: DescargableLXP = {
  id: "desc-m6-rubrica-proyecto",
  modulo: "m6",
  titulo: "Rúbrica 360° — Evaluación del Proyecto Integrador",
  subtitulo: "Instrumento de evaluación para la certificación TSF MINEDU",
  descripcion: "Rúbrica analítica de 4 dimensiones para la evaluación del Proyecto Integrador por el jurado de certificación TSF. Incluye criterios técnicos, pedagógicos, documentales y de presentación. Puntuación total sobre 100 puntos.",
  tipo: "RUBRICA",
  formato: "A4",
  paginas: 6,
  instrucciones: "Este instrumento lo completan los evaluadores del jurado. Se requieren mínimo 2 evaluadores por participante. El puntaje final es el promedio de todos los evaluadores.",
  nota: "Puntaje mínimo de aprobación: 70 puntos totales. Requisito adicional: mínimo 28/40 en Calidad Técnica y mínimo 18/25 en Proceso de Fabricación.",
  secciones: [
    {
      id: "rub-s0",
      titulo: "Datos del Participante y el Proyecto",
      campos: [
        { id: "rub-participante", etiqueta: "Nombre del participante", tipo: "texto", requerido: true },
        { id: "rub-especialidad", etiqueta: "Especialidad / Taller", tipo: "texto", requerido: true },
        { id: "rub-ie", etiqueta: "Institución Educativa", tipo: "texto", requerido: true },
        { id: "rub-nombre-proyecto", etiqueta: "Nombre del proyecto", tipo: "texto", requerido: true },
        { id: "rub-descripcion-proyecto", etiqueta: "Descripción breve del proyecto (problema que resuelve)", tipo: "area" },
        { id: "rub-fecha-eval", etiqueta: "Fecha de evaluación", tipo: "fecha", requerido: true },
        { id: "rub-evaluador", etiqueta: "Nombre del evaluador", tipo: "texto", requerido: true }
      ]
    },
    {
      id: "rub-s1",
      titulo: "DIMENSIÓN 1: Calidad Técnica del Producto (40 puntos)",
      descripcion: "Evalúa el resultado técnico: precisión, acabado, funcionalidad y calidad constructiva",
      campos: [
        { id: "rub-d1-1", etiqueta: "1.1 Precisión dimensional — Las medidas del producto cumplen con las especificaciones del diseño (tolerancia ±2mm)", tipo: "select", opciones: ["10 pts — Todas las medidas dentro de tolerancia", "8 pts — 90% de medidas dentro de tolerancia, error menor subsanable", "6 pts — 70% de medidas dentro de tolerancia", "4 pts — Menos del 70% de medidas dentro de tolerancia"] },
        { id: "rub-d1-2", etiqueta: "1.2 Calidad del acabado superficial — Uniformidad, adhesión, ausencia de defectos visibles", tipo: "select", opciones: ["10 pts — Acabado uniforme, sin defectos, profesional", "8 pts — Acabado bueno con defectos menores no estructurales", "6 pts — Acabado irregular en zonas no críticas", "4 pts — Acabado deficiente, con defectos evidentes"] },
        { id: "rub-d1-3", etiqueta: "1.3 Funcionalidad — El producto cumple la función para la que fue diseñado", tipo: "select", opciones: ["10 pts — Funciona correctamente en todas sus partes", "8 pts — Funciona con ajuste menor necesario", "6 pts — Funciona parcialmente", "4 pts — No cumple su función principal"] },
        { id: "rub-d1-4", etiqueta: "1.4 Calidad de las uniones — Ensamblajes, juntas y conexiones son sólidas y correctas", tipo: "select", opciones: ["10 pts — Todas las uniones correctas, sólidas y limpias", "8 pts — Uniones correctas con acabado mejorable", "6 pts — Algunas uniones débiles o con exceso de material", "4 pts — Uniones deficientes que comprometen la estructura"] },
        { id: "rub-d1-subtotal", etiqueta: "Subtotal Dimensión 1 (máx. 40 pts)", tipo: "numero" }
      ]
    },
    {
      id: "rub-s2",
      titulo: "DIMENSIÓN 2: Proceso de Fabricación (25 puntos)",
      descripcion: "Evalúa cómo se desarrolló el proceso: seguridad, uso de equipos y organización",
      campos: [
        { id: "rub-d2-1", etiqueta: "2.1 Seguridad durante el proceso — EPP correcto, protocolos cumplidos en todas las operaciones", tipo: "select", opciones: ["10 pts — EPP completo en todo momento, todos los protocolos cumplidos", "8 pts — EPP completo con uno o dos recordatorios menores", "6 pts — Algunos incumplimientos de protocolo sin riesgo grave", "4 pts — Incumplimientos de seguridad que requirieron intervención"] },
        { id: "rub-d2-2", etiqueta: "2.2 Uso correcto de equipos — Operación técnicamente correcta de los equipos de todas las zonas", tipo: "select", opciones: ["10 pts — Operación correcta y segura de todos los equipos usados", "8 pts — Operación correcta con asistencia puntual en una máquina", "6 pts — Operación correcta en la mayoría, dificultad en máquinas complejas", "4 pts — Operación incorrecta que requirió intervención frecuente"] },
        { id: "rub-d2-3", etiqueta: "2.3 Organización y eficiencia — Planificación del proceso, orden de operaciones y gestión del tiempo", tipo: "select", opciones: ["5 pts — Proceso bien planificado, tiempo gestionado eficientemente", "4 pts — Proceso organizado con algún retraso menor", "3 pts — Proceso medianamente organizado con retrasos notables", "2 pts — Proceso desorganizado, requirió rehacer varias operaciones"] },
        { id: "rub-d2-subtotal", etiqueta: "Subtotal Dimensión 2 (máx. 25 pts)", tipo: "numero" }
      ]
    },
    {
      id: "rub-s3",
      titulo: "DIMENSIÓN 3: Ficha Técnico-Pedagógica (25 puntos)",
      descripcion: "Evalúa la calidad del documento que convierte el proyecto técnico en recurso pedagógico",
      campos: [
        { id: "rub-d3-1", etiqueta: "3.1 Completitud — Contiene todos los campos requeridos: propósito pedagógico, proceso fotográfico, materiales, criterios de evaluación", tipo: "select", opciones: ["10 pts — Todos los campos completos y con información de calidad", "8 pts — La mayoría de campos completos, uno o dos con información insuficiente", "6 pts — Varios campos incompletos pero la estructura general está", "4 pts — Ficha incompleta, faltan secciones importantes"] },
        { id: "rub-d3-2", etiqueta: "3.2 Replicabilidad — Otro docente puede reproducir el proyecto como actividad de aprendizaje usando esta ficha", tipo: "select", opciones: ["10 pts — Completamente replicable sin información adicional", "8 pts — Replicable con consultas menores al autor", "6 pts — Replicable con dificultad por información incompleta", "4 pts — No es posible replicar el proyecto con la información provista"] },
        { id: "rub-d3-3", etiqueta: "3.3 Calidad pedagógica — La ficha conecta el proceso técnico con competencias y criterios de evaluación claros", tipo: "select", opciones: ["5 pts — Conexión técnico-pedagógica excelente, criterios precisos", "4 pts — Buena conexión con uno o dos criterios poco específicos", "3 pts — Conexión parcial, criterios genéricos", "2 pts — Poca o nula conexión pedagógica"] },
        { id: "rub-d3-subtotal", etiqueta: "Subtotal Dimensión 3 (máx. 25 pts)", tipo: "numero" }
      ]
    },
    {
      id: "rub-s4",
      titulo: "DIMENSIÓN 4: Presentación Oral (10 puntos)",
      descripcion: "Evalúa la capacidad de comunicar el proceso y el aprendizaje ante el jurado",
      campos: [
        { id: "rub-d4-1", etiqueta: "4.1 Claridad en la exposición del proceso técnico y pedagógico", tipo: "select", opciones: ["5 pts — Exposición clara, ordenada y completa", "4 pts — Exposición clara con algunos saltos o repeticiones", "3 pts — Exposición medianamente clara, con apoyo del jurado", "2 pts — Exposición confusa o incompleta"] },
        { id: "rub-d4-2", etiqueta: "4.2 Respuesta a preguntas técnicas del jurado", tipo: "select", opciones: ["5 pts — Respuestas precisas y fundamentadas a todas las preguntas", "4 pts — Respuestas correctas con alguna duda menor", "3 pts — Respuestas parciales, duda en preguntas complejas", "2 pts — Dificultad para responder preguntas técnicas básicas"] },
        { id: "rub-d4-subtotal", etiqueta: "Subtotal Dimensión 4 (máx. 10 pts)", tipo: "numero" }
      ]
    },
    {
      id: "rub-s5",
      titulo: "Consolidación y Resultado Final",
      campos: [
        { id: "rub-total", etiqueta: "PUNTAJE TOTAL (suma de 4 dimensiones — máx. 100 pts)", tipo: "numero" },
        { id: "rub-resultado", etiqueta: "Resultado", tipo: "select", opciones: ["APROBADO — Cumple mínimo general (70 pts) y mínimos por dimensión", "OBSERVADO — Cumple mínimo total pero no cumple mínimo en alguna dimensión", "DESAPROBADO — No cumple puntaje mínimo total"] },
        { id: "rub-fortalezas", etiqueta: "Fortalezas del participante (para incluir en el feedback)", tipo: "area" },
        { id: "rub-mejoras", etiqueta: "Aspectos de mejora (para incluir en el feedback)", tipo: "area" },
        { id: "rub-recomendacion", etiqueta: "Recomendación del evaluador", tipo: "area" },
        { id: "rub-firma-eval", etiqueta: "Firma del evaluador", tipo: "firma" }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTACIÓN CONSOLIDADA
// ─────────────────────────────────────────────────────────────────────────────
export const descargablesLXP: DescargableLXP[] = [
  kitParticipanteM0,
  fichasRevisionDiariaM1,
  bitacoraMantenimientoM4,
  plantillaSesionAprendizajeM5,
  packEvaluacionM5,
  rubricaProyectoIntegradorM6
]

export const getDescargablesByModulo = (moduloId: string): DescargableLXP[] =>
  descargablesLXP.filter(d => d.modulo === moduloId)

export const getDescargableById = (id: string): DescargableLXP | undefined =>
  descargablesLXP.find(d => d.id === id)
