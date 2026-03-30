// src/data/modulosLXP.ts
// Estructura completa de los 7 módulos LXP para todos los talleres EPT TSF/MINEDU

import {
  quizDiagnosticoTecnicoM0,
  quizDiagnosticoPedagogicoM0,
  quizZonaInvestigacionM2,
  quizZonaInnovacionM3,
  quizAcabadosAlmacenM4
} from './quizBanks'

export type FaseLXP =
  | 'diagnostico'
  | 'orientacion'
  | 'apropiacion'
  | 'aplicacion'
  | 'proyecto'
  | 'acompanamiento'

export type ModalidadContenido = 'asincrono' | 'sincrono' | 'presencial'

export type TipoContenido =
  | 'VIDEO'
  | 'PDF'
  | 'INTERACTIVO'
  | 'QUIZ'
  | 'EN_VIVO'
  | 'DESCARGABLE'
  | 'ACTIVIDAD_PRACTICA'

export interface PreguntaQuiz {
  id: string
  enunciado: string
  opciones: string[]
  correcta: number // índice 0-based
  explicacion?: string
}

export interface ContenidoLXP {
  id: string
  tipo: TipoContenido
  modalidad: ModalidadContenido
  titulo: string
  descripcion: string
  duracionMin?: number
  paginas?: number
  preguntas?: number
  puntajeMinimo?: number      // Para QUIZ con bloqueo
  bloqueaSiguiente?: boolean  // true en Quiz de Seguridad del M1
  esActividad?: boolean       // true para actividades prácticas
  recursosRepositorio?: string[] // IDs de bienes relacionados
  bancoPreguntas?: PreguntaQuiz[]
  manualId?: string        // ID del manual en manualesRuta.ts (para PDF interactivos)
  descargableId?: string   // ID del descargable en descargablesLXP.ts
  urlVideo?: string        // URL de Google Drive u otro servicio de video
  urlPDF?: string          // URL directa a un PDF externo (cuando no hay manualId)
  urlInteractivo?: string  // URL externa para contenido interactivo
  urlVivo?: string         // URL de sesión en vivo (Zoom, Meet, etc.)
  urlActividad?: string    // URL de actividad práctica externa
  fechaSesion?: string     // ISO string — fecha programada de sesión EN_VIVO
}

export interface SubSeccionLXP {
  id: string
  numero: string    // "1.1", "1.2", etc.
  titulo: string
  descripcion?: string
  colorAccent: string
  phaseBadge?: string
  contenidos: ContenidoLXP[]
}

export interface ModuloLXP {
  numero: number        // 0–6
  id: string           // "m0", "m1", ... "m6"
  nombre: string
  descripcion: string
  fase: FaseLXP
  horasTotal: number
  horasAsincrono: number
  horasSincrono: number
  horasPresencial: number
  icon: string         // emoji
  colorFase: string    // hex
  requiereAprobacion?: boolean
  puntajeMinimoAcceso?: number
  subSecciones: SubSeccionLXP[]
}

// ── BANCO DE PREGUNTAS: Quiz de Seguridad M1 ──────────────────────────────────
const quizSeguridadM1: PreguntaQuiz[] = [
  {
    id: "s1-1",
    enunciado: "Vas a usar la sierra circular para cortar listones de 25mm. Al encenderla notas que la hoja vibra más de lo normal. ¿Qué haces primero?",
    opciones: [
      "La apago y verifico si el disco está bien fijado al eje",
      "Bajo la velocidad y pruebo con una pieza pequeña",
      "Continúo — a veces vibra al inicio y se estabiliza",
      "Llamo al técnico de mantenimiento antes de tocarla"
    ],
    correcta: 0,
    explicacion: "Ante cualquier vibración anormal, la primera acción es apagar la máquina de inmediato. La vibración puede indicar que el disco no está correctamente fijado, lo que representa un riesgo grave de proyección."
  },
  {
    id: "s1-2",
    enunciado: "¿Por qué NO se deben usar guantes de cuero al operar la sierra circular o el torno?",
    opciones: [
      "Porque reducen la sensibilidad del tacto",
      "Porque el tejido puede ser atrapado por la máquina y arrastrar la mano",
      "Porque no están permitidos por el reglamento del taller",
      "Porque son incómodos para trabajos de precisión"
    ],
    correcta: 1,
    explicacion: "Los guantes de tejido o cuero representan un peligro de arrastre en máquinas rotativas. El material puede engancharse y jalar la mano hacia la zona de corte. Para estas máquinas, el EPP correcto son lentes y orejeras, NO guantes."
  },
  {
    id: "s1-3",
    enunciado: "Un estudiante está lijando sin orejeras porque dice que el ruido no le molesta. ¿Cuál es la respuesta correcta?",
    opciones: [
      "Está bien si lo tolera — el daño auditivo depende de la sensibilidad individual",
      "Le digo que use orejeras solo cuando el ruido sea muy alto",
      "Detengo la actividad hasta que use el EPP completo — el daño auditivo acumulativo no se siente hasta que es irreversible",
      "Le pongo orejeras voluntariamente como ejemplo"
    ],
    correcta: 2,
    explicacion: "El daño auditivo por exposición prolongada a ruido industrial es acumulativo e irreversible. El hecho de que 'no moleste' no significa que no dañe. Las orejeras son obligatorias en cualquier operación con maquinaria ruidosa."
  },
  {
    id: "s1-4",
    enunciado: "¿Cuál es el primer paso ANTES de encender cualquier máquina del taller?",
    opciones: [
      "Verificar que el material a cortar esté bien sujeto",
      "Verificar que la guarda de seguridad esté correctamente colocada y en buen estado",
      "Ponerse todos los EPP necesarios",
      "Revisar que no haya estudiantes cerca de la zona de corte"
    ],
    correcta: 1,
    explicacion: "La verificación de la guarda de seguridad es el primer protocolo antes de encender cualquier máquina. Sin guarda, una proyección de material o un contacto accidental puede ser fatal."
  },
  {
    id: "s1-5",
    enunciado: "¿Qué tipo de extintor se usa en la zona de maquinado (sierra circular, garlopa) ante un incendio de virutas de madera?",
    opciones: [
      "CO₂ (gas carbónico) — clase B y C",
      "PQS (polvo químico seco) — clase ABC",
      "Cualquiera — todos los extintores apagan fuego",
      "Agua — la madera responde bien al agua"
    ],
    correcta: 1,
    explicacion: "Las virutas de madera son un incendio de clase A (sólidos). El extintor PQS (ABC) cubre clase A, B y C, siendo el adecuado para la zona de maquinado."
  },
  {
    id: "s1-6",
    enunciado: "Al aplicar acabado en la cabina de pintura, ¿qué EPP es OBLIGATORIO además del guardapolvo?",
    opciones: [
      "Solo lentes de policarbonato",
      "Mameluco de protección + lentes tipo antiparra + respirador con filtro para vapores",
      "Guantes de cuero + guardapolvo",
      "Orejeras + lentes de policarbonato"
    ],
    correcta: 1,
    explicacion: "Los solventes y vapores de pintura son tóxicos por inhalación y pueden irritar severamente los ojos y la piel. El conjunto mínimo obligatorio es: mameluco, lentes antiparra y respirador con cartucho de vapores orgánicos."
  },
  {
    id: "s1-7",
    enunciado: "¿Qué significa el protocolo LOTO (Lock Out / Tag Out) en el contexto del mantenimiento de máquinas del taller?",
    opciones: [
      "Limpiar y ordenar el taller al terminar la jornada",
      "Bloquear y etiquetar una máquina para que nadie la encienda mientras se hace mantenimiento",
      "Registrar el uso de cada máquina en la bitácora del taller",
      "Cerrar el taller y colocar señal de prohibido el paso"
    ],
    correcta: 1,
    explicacion: "LOTO es el protocolo que protege de arranques accidentales durante el mantenimiento. Se coloca un candado físico en el interruptor y una etiqueta de advertencia. Es obligatorio antes de cualquier intervención en una máquina."
  },
  {
    id: "s1-8",
    enunciado: "Observas que un estudiante usa formones sin guantes. El argumento es que los guantes le quitan precisión. ¿Cuál es la respuesta técnicamente correcta?",
    opciones: [
      "Tiene razón — en trabajos de precisión con formones no se usan guantes",
      "Le exiges guantes de cuero gruesos para mayor protección",
      "Le indicas guantes de cuero resistentes al corte para esta operación específica (a diferencia de las máquinas rotativas)",
      "Es su decisión — cada trabajador gestiona su propio riesgo"
    ],
    correcta: 2,
    explicacion: "Distinción crítica: los guantes de cuero NO se usan en máquinas rotativas (riesgo de arrastre) PERO SÍ se usan en trabajo manual con herramientas de filo como formones, escoplos y cuchillas."
  }
]

// ── MÓDULOS LXP ───────────────────────────────────────────────────────────────

export const modulosLXP: ModuloLXP[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // M0 · Inicio y Diagnóstico (2h asincrono + 2h sincrono)
  // ─────────────────────────────────────────────────────────────────────────
  {
    numero: 0,
    id: "m0",
    nombre: "Inicio y Diagnóstico",
    descripcion: "Conoce la plataforma, tu punto de partida y el contexto del programa TSF. Explora tu taller virtualmente y comparte tus expectativas.",
    fase: "diagnostico",
    horasTotal: 4,
    horasAsincrono: 2,
    horasSincrono: 2,
    horasPresencial: 0,
    icon: "🔍",
    colorFase: "#045f6c",
    subSecciones: [
      {
        id: "m0-s1",
        numero: "0.1",
        titulo: "Bienvenida y Pacto de Aprendizaje",
        descripcion: "Presentación del programa, objetivos y compromiso del participante",
        colorAccent: "#045f6c",
        phaseBadge: "EN VIVO",
        contenidos: [
          {
            id: "m0-s1-c1",
            tipo: "EN_VIVO",
            modalidad: "sincrono",
            titulo: "Bienvenidos al Programa TSF — MINEDU 2024",
            descripcion: "Presentación oficial del programa, los 9 talleres y la hoja de ruta de 150 horas. Onboarding a la plataforma",
            duracionMin: 50
          },
          {
            id: "m0-s1-c2",
            tipo: "DESCARGABLE",
            modalidad: "asincrono",
            titulo: "Kit del Participante — Descarga e imprime",
            descripcion: "Guía completa del participante: cronograma, materiales y pacto de aprendizaje para firmar",
            paginas: 12,
            descargableId: "desc-m0-kit"
          },
          {
            id: "m0-s1-c3",
            tipo: "QUIZ",
            modalidad: "asincrono",
            titulo: "Queremos conocerte",
            descripcion: "Indica tus datos sociodemográficos (profesión, ubicación, fecha de nacimiento, etc.) para conocerte mejor",
            duracionMin: 5
          },
          {
            id: "m0-s1-c4",
            tipo: "QUIZ",
            modalidad: "asincrono",
            titulo: "Diagnóstico Técnico — Línea de base",
            descripcion: "8 preguntas situacionales para medir tu conocimiento previo del equipamiento. Sin nota mínima — solo para calibrar la capacitación",
            preguntas: 8,
            duracionMin: 15,
            bancoPreguntas: quizDiagnosticoTecnicoM0
          },
          {
            id: "m0-s1-c5",
            tipo: "QUIZ",
            modalidad: "asincrono",
            titulo: "Diagnóstico Pedagógico — Situaciones de Aula",
            descripcion: "6 preguntas sobre prácticas pedagógicas actuales. Sirve para calibrar el programa, no para evaluar",
            preguntas: 6,
            duracionMin: 12,
            bancoPreguntas: quizDiagnosticoPedagogicoM0
          }
        ]
      },
      {
        id: "m0-s2",
        numero: "0.2",
        titulo: "Tour Virtual del Taller",
        descripcion: "Recorre el taller completo en 360° antes de conocerlo físicamente",
        colorAccent: "#02d47e",
        contenidos: [
          {
            id: "m0-s2-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Tour Virtual 360° — Tu Taller Equipado",
            descripcion: "Recorrido visual de las 4 zonas: Investigación, Innovación, Acabados y Almacén. Con narración técnica de cada equipo",
            duracionMin: 45
          },
          {
            id: "m0-s2-c2",
            tipo: "INTERACTIVO",
            modalidad: "asincrono",
            titulo: "Juego interactivo",
            descripcion: "Interactúa con el mapa de zonas y equipos del taller",
            duracionMin: 15
          }
        ]
      },
      {
        id: "m0-s3",
        numero: "0.3",
        titulo: "Sesión Sincrónica de Apertura",
        descripcion: "Primer encuentro con tu grupo del taller y el formador GRAMA",
        colorAccent: "#d4c4fc",
        phaseBadge: "EN VIVO",
        contenidos: [
          {
            id: "m0-s3-c1",
            tipo: "EN_VIVO",
            modalidad: "sincrono",
            titulo: "Sesión de Apertura — Presentación y expectativas",
            descripcion: "Conoce a tu grupo, comparte expectativas y recibe orientaciones del formador para el desarrollo del programa",
            duracionMin: 60
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // M1 · Conocimiento del Taller (7h asincrono + 2h sincrono + 2h presencial)
  // ─────────────────────────────────────────────────────────────────────────
  {
    numero: 1,
    id: "m1",
    nombre: "Conocimiento del Taller",
    descripcion: "Marco del programa formativo, IA para docentes EPT, arquitectura del taller y seguridad operativa. Quiz obligatorio con 80% para continuar.",
    fase: "orientacion",
    horasTotal: 11,
    horasAsincrono: 7,
    horasSincrono: 2,
    horasPresencial: 2,
    icon: "🛡️",
    colorFase: "#ef4444",
    requiereAprobacion: true,
    puntajeMinimoAcceso: 80,
    subSecciones: [
      {
        id: "m1-s1",
        numero: "1.1",
        titulo: "Introducción al Programa Formativo DES/SFT",
        descripcion: "¿Conoces el programa formativo que propone el CNEB MINEDU? Marco curricular de la Secundaria con Formación Técnica",
        colorAccent: "#ef4444",
        contenidos: [
          {
            id: "m1-s1-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Programa Formativo TSF — Competencias, Habilidades y Marco Transversal",
            descripcion: "Introducción a las competencias, habilidades de las 14 UC y el marco transversal del programa formativo TSF — RM N° 165 2022 MINEDU",
            duracionMin: 60
          },
          {
            id: "m1-s1-c2",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Inteligencia Artificial para Docentes EPT — Primeros Pasos",
            descripcion: "Introducción práctica a herramientas de IA generativa (ChatGPT, Copilot, Gemini): cómo usarlas para planificar sesiones, generar recursos y gestionar el taller",
            duracionMin: 60,
            urlVideo: "https://drive.google.com/file/d/19PeIosyz9jqLup--LlRT4VBH_AvEF-sZ/view?usp=sharing"
          }
        ]
      },
      {
        id: "m1-s2",
        numero: "1.2",
        titulo: "Arquitectura y Zonas del Taller",
        descripcion: "Distribución de las 4 zonas y catálogo completo de bienes",
        colorAccent: "#043941",
        contenidos: [
          {
            id: "m1-s2-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Las 4 Zonas del Taller — Lógica y Diseño",
            descripcion: "Explicación pedagógica de por qué el taller está organizado en 4 zonas y su vinculación con el currículo EPT",
            duracionMin: 60
          },
          {
            id: "m1-s2-c2",
            tipo: "INTERACTIVO",
            modalidad: "asincrono",
            titulo: "Catálogo Interactivo de Bienes del Taller",
            descripcion: "Explorador de todos los bienes por zona con descripción, uso pedagógico y normas de seguridad",
            duracionMin: 30
          }
        ]
      },
      {
        id: "m1-s3",
        numero: "1.3",
        titulo: "Seguridad del Taller",
        descripcion: "Marco normativo, EPP por proceso, protocolos operativos y mapa de seguridad",
        colorAccent: "#ef4444",
        contenidos: [
          {
            id: "m1-s3-c1",
            tipo: "PDF",
            modalidad: "asincrono",
            titulo: "Marco Normativo de Seguridad Ocupacional en Talleres EPT",
            descripcion: "Ley 29783, Manual SSO MINEDU y obligaciones del docente como responsable del taller",
            paginas: 28,
            duracionMin: 45,
            manualId: "manual-seguridad-m1"
          },
          {
            id: "m1-s3-c2",
            tipo: "INTERACTIVO",
            modalidad: "asincrono",
            titulo: "Selector de EPP por Equipo y Proceso",
            descripcion: "Tabla filtrable interactiva: selecciona el equipo o proceso y obtén el EPP exacto requerido",
            duracionMin: 30
          },
          {
            id: "m1-s3-c3",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Protocolos de Seguridad — Máquinas y Herramientas",
            descripcion: "Demostración en video de protocolos: encendido, operación y apagado. Incluye errores comunes y prevención",
            duracionMin: 60
          },
          {
            id: "m1-s3-c4",
            tipo: "DESCARGABLE",
            modalidad: "asincrono",
            titulo: "Fichas de Revisión Diaria — Plastificables A5",
            descripcion: "Fichas para cada equipo crítico: lista de verificación antes del uso. Para imprimir y plastificar",
            paginas: 16,
            descargableId: "desc-m1-fichas-revision"
          },
          {
            id: "m1-s3-c5",
            tipo: "INTERACTIVO",
            modalidad: "asincrono",
            titulo: "Constructor de Mapa de Seguridad",
            descripcion: "Herramienta para crear el mapa de seguridad del taller: señalización, extintores, salidas y zonas de riesgo",
            duracionMin: 40
          }
        ]
      },
      {
        id: "m1-s4",
        numero: "1.4",
        titulo: "Quiz de Seguridad — OBLIGATORIO",
        descripcion: "Debes obtener 80% para desbloquear M2 y M3",
        colorAccent: "#ca8a04",
        phaseBadge: "BLOQUEANTE",
        contenidos: [
          {
            id: "m1-s4-c1",
            tipo: "QUIZ",
            modalidad: "asincrono",
            titulo: "Quiz de Seguridad — 8 preguntas · Mínimo 80%",
            descripcion: "Evaluación de competencias de seguridad con situaciones reales del taller. Debes obtener al menos 80% para continuar",
            preguntas: 8,
            puntajeMinimo: 80,
            bloqueaSiguiente: true,
            duracionMin: 25,
            bancoPreguntas: quizSeguridadM1
          }
        ]
      },
      {
        id: "m1-s5",
        numero: "1.5",
        titulo: "Sesión Sincrónica de Cierre M1",
        descripcion: "Revisión de casos reales y resolución de dudas sobre seguridad",
        colorAccent: "#d4c4fc",
        phaseBadge: "EN VIVO",
        contenidos: [
          {
            id: "m1-s5-c1",
            tipo: "EN_VIVO",
            modalidad: "sincrono",
            titulo: "Sesión Cierre M1 — Casos de Seguridad en el Taller",
            descripcion: "Análisis de incidentes reales en talleres EPT, protocolo ante emergencias y preguntas del grupo",
            duracionMin: 120
          }
        ]
      },
      {
        id: "m1-s6",
        numero: "1.6",
        titulo: "Visita de Reconocimiento Presencial",
        descripcion: "Primera visita al taller físico — levantamiento del plano de seguridad",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m1-s6-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Visita Presencial 1 — Reconocimiento y Plano de Seguridad",
            descripcion: "Recorre físicamente el taller, verifica instalación de equipos, identifica riesgos y elabora el plano de seguridad (entregable: plano A3)",
            duracionMin: 120,
            esActividad: true
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // M2 · Zona de Investigación (10h asincrono + 8h presencial)
  // ─────────────────────────────────────────────────────────────────────────
  {
    numero: 2,
    id: "m2",
    nombre: "Zona de Investigación",
    descripcion: "Domina el equipamiento de la zona de investigación: computadoras, cámaras, tablets, pizarras táctiles. Metodologías de indagación con tecnología.",
    fase: "apropiacion",
    horasTotal: 22,
    horasAsincrono: 12,
    horasSincrono: 0,
    horasPresencial: 10,
    icon: "🔬",
    colorFase: "#0891b2",
    subSecciones: [
      {
        id: "m2-s1",
        numero: "2.1",
        titulo: "Presentación Técnica del Equipamiento",
        descripcion: "Computadora, impresora 3D, pizarra táctil, tablet, cámara fotográfica, filmadora, grabadora",
        colorAccent: "#0891b2",
        contenidos: [
          {
            id: "m2-s1-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Equipos de Investigación — Uso Pedagógico y Técnico",
            descripcion: "Video por cada equipo de la zona: ficha técnica, normas de operación, uso en proyectos estudiantiles y vinculación con habilidades del currículo EPT",
            duracionMin: 90
          }
        ]
      },
      {
        id: "m2-s2",
        numero: "2.2",
        titulo: "Software como Herramienta Pedagógica",
        descripcion: "CAD, diseño gráfico, edición de video — herramientas para el aula",
        colorAccent: "#0891b2",
        contenidos: [
          {
            id: "m2-s2-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Software Creativo en el Taller — CAD, Diseño, Video",
            descripcion: "Cómo usar el software incluido (Tinkercad, Canva, CapCut) para que los estudiantes documenten, diseñen y comuniquen sus proyectos",
            duracionMin: 90
          }
        ]
      },
      {
        id: "m2-s3",
        numero: "2.3",
        titulo: "Los Lienzos Metodológicos en el Aula",
        descripcion: "Design Thinking y Lean Canvas adaptados a la EPT",
        colorAccent: "#0891b2",
        contenidos: [
          {
            id: "m2-s3-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Design Thinking y Lean Canvas — Metodologías para el Taller",
            descripcion: "Aplicación práctica de metodologías de innovación en proyectos técnicos escolares. Casos reales de estudiantes peruanos",
            duracionMin: 60
          }
        ]
      },
      {
        id: "m2-s4",
        numero: "2.4",
        titulo: "Explorador de Bienes — Zona Investigación",
        descripcion: "Todos los equipos de la zona con fichas detalladas",
        colorAccent: "#02d47e",
        contenidos: [
          {
            id: "m2-s4-c1",
            tipo: "INTERACTIVO",
            modalidad: "asincrono",
            titulo: "Explorador Interactivo — Zona de Investigación",
            descripcion: "Navega por todos los bienes de la zona de investigación. Vinculado directamente al Repositorio de recursos del taller",
            duracionMin: 25
          }
        ]
      },
      {
        id: "m2-s5",
        numero: "2.5",
        titulo: "Quiz Zona Investigación",
        colorAccent: "#ca8a04",
        contenidos: [
          {
            id: "m2-s5-c1",
            tipo: "QUIZ",
            modalidad: "asincrono",
            titulo: "Quiz — Zona de Investigación · 10 preguntas",
            descripcion: "Verifica tu comprensión del uso pedagógico de los equipos de investigación. Mínimo 75% para aprobar",
            preguntas: 10,
            puntajeMinimo: 75,
            duracionMin: 20,
            bancoPreguntas: quizZonaInvestigacionM2
          }
        ]
      },
      {
        id: "m2-s6",
        numero: "2.6",
        titulo: "Práctica Presencial 1 — Diseño y Prototipado",
        descripcion: "Sesión en el taller: proyecto de diseño con equipos de investigación",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m2-s6-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Práctica Presencial S1 — Diseño y Prototipado Digital",
            descripcion: "Trabaja con los equipos de investigación para desarrollar un prototipo digital de proyecto estudiantil. Usa cámara, tablet y software de diseño. Entregable: brief de proyecto",
            duracionMin: 240,
            esActividad: true
          }
        ]
      },
      {
        id: "m2-s7",
        numero: "2.7",
        titulo: "Práctica Presencial 2 — Herramientas de Investigación",
        descripcion: "Aplicación de metodologías de indagación con equipos digitales",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m2-s7-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Práctica Presencial S2 — Investigación con Herramientas Digitales",
            descripcion: "Implementa una sesión completa de investigación con tus estudiantes usando los equipos de la zona. Documenta evidencias con filmadora y cámara",
            duracionMin: 240,
            esActividad: true
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // M3 · Zona de Innovación: Máquinas y Herramientas (14h asincrono + 22h presencial)
  // ─────────────────────────────────────────────────────────────────────────
  {
    numero: 3,
    id: "m3",
    nombre: "Zona de Innovación: Máquinas y Herramientas",
    descripcion: "El módulo más denso. Domina las máquinas de corte, fabricación digital y formado. Prácticas presenciales en niveles de complejidad creciente.",
    fase: "aplicacion",
    horasTotal: 42,
    horasAsincrono: 16,
    horasSincrono: 0,
    horasPresencial: 26,
    icon: "⚙️",
    colorFase: "#00c16e",
    subSecciones: [
      {
        id: "m3-sA",
        numero: "3.A",
        titulo: "Máquinas de Corte y Habilitado",
        descripcion: "Sierra circular, sierra radial, garlopa, regruesadora",
        colorAccent: "#00c16e",
        contenidos: [
          {
            id: "m3-sA-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Máquinas de Corte — Operación Segura y Pedagógica",
            descripcion: "Sierra circular, sierra radial (brazo), garlopa y regruesadora: técnica correcta, ajustes, errores frecuentes y aplicaciones en proyectos estudiantiles",
            duracionMin: 120
          }
        ]
      },
      {
        id: "m3-sB",
        numero: "3.B",
        titulo: "Máquinas de Fabricación Digital",
        descripcion: "Cortadora láser, Router CNC, Impresora 3D — el corazón del taller moderno",
        colorAccent: "#00c16e",
        contenidos: [
          {
            id: "m3-sB-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Fabricación Digital — Láser, CNC e Impresión 3D",
            descripcion: "Flujo completo de trabajo: desde el diseño en software hasta la pieza terminada. Configuración, materiales compatibles, parámetros y resolución de problemas",
            duracionMin: 120
          }
        ]
      },
      {
        id: "m3-sC",
        numero: "3.C",
        titulo: "Máquinas de Formado y Armado",
        descripcion: "Sierra cinta, caladora, torno, taladro de banco, enchapadora",
        colorAccent: "#00c16e",
        contenidos: [
          {
            id: "m3-sC-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Máquinas de Formado y Armado — Técnicas y Proyectos",
            descripcion: "Sierra cinta y caladora para cortes curvos, torno para piezas cilíndricas, taladro de banco para perforaciones precisas, enchapadora para acabados laminados",
            duracionMin: 90
          }
        ]
      },
      {
        id: "m3-sD",
        numero: "3.D",
        titulo: "Herramientas Manuales",
        descripcion: "Formones, escofinas, gubias — tallado y acabado manual",
        colorAccent: "#00c16e",
        contenidos: [
          {
            id: "m3-sD-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Herramientas Manuales — Dominio Técnico y Pedagógico",
            descripcion: "Uso correcto de formones, escofinas, gubias y herramientas de mano. Afilado, mantenimiento y aplicaciones en proyectos de acabado",
            duracionMin: 60
          }
        ]
      },
      {
        id: "m3-sE",
        numero: "3.E",
        titulo: "Quiz Zona Innovación — 20 preguntas",
        descripcion: "Incluye preguntas de seguridad específicas por máquina. Mínimo 80%",
        colorAccent: "#ca8a04",
        phaseBadge: "EVALUACIÓN",
        contenidos: [
          {
            id: "m3-sE-c1",
            tipo: "QUIZ",
            modalidad: "asincrono",
            titulo: "Quiz Zona Innovación — 20 preguntas · Mínimo 80%",
            descripcion: "Evaluación de conocimiento técnico y de seguridad de máquinas. Combina preguntas conceptuales con situaciones reales de operación",
            preguntas: 20,
            puntajeMinimo: 80,
            duracionMin: 35,
            bancoPreguntas: quizZonaInnovacionM3
          }
        ]
      },
      {
        id: "m3-sF",
        numero: "3.F",
        titulo: "Práctica Presencial — Nivel 1 Corte y Habilitado",
        descripcion: "2 sesiones presenciales con sierra circular, radial y garlopa",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m3-sF-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Práctica Nivel 1 — Corte y Habilitado (2 sesiones · 480min)",
            descripcion: "Domina las máquinas de corte aplicando protocolos de seguridad. Produce piezas de madera habilitadas con precisión. Entregable: set de piezas cortadas y ficha de proceso",
            duracionMin: 480,
            esActividad: true
          }
        ]
      },
      {
        id: "m3-sG",
        numero: "3.G",
        titulo: "Práctica Presencial — Nivel 1 Digital y Formado",
        descripcion: "2 sesiones con CNC, cortadora láser e impresora 3D",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m3-sG-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Práctica Nivel 1 — Fabricación Digital y Formado (2 sesiones · 480min)",
            descripcion: "Produce una pieza con cortadora láser o router CNC y una impresa en 3D. Configura parámetros, ejecuta el proceso y documenta resultados",
            duracionMin: 480,
            esActividad: true
          }
        ]
      },
      {
        id: "m3-sH",
        numero: "3.H",
        titulo: "Práctica Presencial — Nivel 2 Ensamble",
        descripcion: "Integración de procesos: de la pieza al producto terminado",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m3-sH-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Práctica Nivel 2 — Ensamble Integrado (1 sesión · 360min)",
            descripcion: "Integra piezas cortadas, maquinadas y formadas en un producto final. Aplica técnicas de ensamble, fijación y ajuste. Entregable: producto ensamblado con documentación técnica",
            duracionMin: 360,
            esActividad: true
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // M4 · Acabados y Almacén (7h asincrono + 7h presencial)
  // ─────────────────────────────────────────────────────────────────────────
  {
    numero: 4,
    id: "m4",
    nombre: "Acabados y Almacén",
    descripcion: "Equipamiento de la zona de acabados, gestión del almacén y mantenimiento preventivo del taller. Fichas de revisión diaria.",
    fase: "aplicacion",
    horasTotal: 18,
    horasAsincrono: 9,
    horasSincrono: 0,
    horasPresencial: 9,
    icon: "🎨",
    colorFase: "#8b5cf6",
    subSecciones: [
      {
        id: "m4-s1",
        numero: "4.1",
        titulo: "Equipamiento de Acabados",
        descripcion: "Lijadoras, compresor, pistola de pintar, cabina de pintura",
        colorAccent: "#8b5cf6",
        contenidos: [
          {
            id: "m4-s1-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Zona de Acabados — Equipos y Técnicas de Aplicación",
            descripcion: "Lijadoras orbitales y de banda, compresor, pistola de pintar y cabina: uso correcto, mezcla de pinturas, EPP obligatorio y mantenimiento",
            duracionMin: 75
          }
        ]
      },
      {
        id: "m4-s2",
        numero: "4.2",
        titulo: "Fichas de Revisión Diaria",
        descripcion: "Instrumentos de control preventivo por equipo crítico",
        colorAccent: "#8b5cf6",
        contenidos: [
          {
            id: "m4-s2-c1",
            tipo: "DESCARGABLE",
            modalidad: "asincrono",
            titulo: "Pack de Fichas de Revisión Diaria — A4 Plastificable",
            descripcion: "Una ficha por equipo crítico del taller. Para imprimir en A4, plastificar y colgar en cada máquina. Incluye instrucciones de uso del sistema de control",
            paginas: 24,
            descargableId: "desc-m1-fichas-revision"
          }
        ]
      },
      {
        id: "m4-s3",
        numero: "4.3",
        titulo: "Gestión del Almacén",
        descripcion: "Organización, control de stock y registro de herramientas",
        colorAccent: "#8b5cf6",
        contenidos: [
          {
            id: "m4-s3-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Gestión del Almacén del Taller — Sistema de Control",
            descripcion: "Cómo organizar el almacén por categorías, sistema de préstamo y devolución de herramientas, control de stock de materiales consumibles y registro de inventario",
            duracionMin: 90
          },
          {
            id: "m4-s3-c2",
            tipo: "PDF",
            modalidad: "asincrono",
            titulo: "Manual de Organización del Almacén EPT",
            descripcion: "Guía completa para el sistema de almacén: distribución física, etiquetado, registro digital y reportes de estado para la UGEL",
            paginas: 20,
            manualId: "manual-almacen-m4"
          }
        ]
      },
      {
        id: "m4-s4",
        numero: "4.4",
        titulo: "Mantenimiento Preventivo",
        descripcion: "Plan de mantenimiento mensual, trimestral y anual del taller",
        colorAccent: "#8b5cf6",
        contenidos: [
          {
            id: "m4-s4-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Mantenimiento Preventivo — Antes de que Falle",
            descripcion: "Plan de mantenimiento preventivo por tipo de equipo: lubricación, calibración, limpieza profunda y revisión de componentes de seguridad",
            duracionMin: 90
          },
          {
            id: "m4-s4-c2",
            tipo: "DESCARGABLE",
            modalidad: "asincrono",
            titulo: "Bitácora del Taller — Registro de Mantenimiento",
            descripcion: "Plantilla de bitácora anual para registrar mantenimientos, incidentes, préstamos y estado del equipamiento. Formato oficial aceptado por UGEL",
            paginas: 8,
            descargableId: "desc-m4-bitacora"
          }
        ]
      },
      {
        id: "m4-s5",
        numero: "4.5",
        titulo: "Quiz Acabados y Almacén",
        colorAccent: "#ca8a04",
        contenidos: [
          {
            id: "m4-s5-c1",
            tipo: "QUIZ",
            modalidad: "asincrono",
            titulo: "Quiz — Acabados y Almacén · 12 preguntas",
            descripcion: "Verifica tu comprensión del sistema de acabados, gestión del almacén y mantenimiento preventivo. Mínimo 75% para aprobar",
            preguntas: 12,
            puntajeMinimo: 75,
            duracionMin: 20,
            bancoPreguntas: quizAcabadosAlmacenM4
          }
        ]
      },
      {
        id: "m4-s6",
        numero: "4.6",
        titulo: "Práctica Presencial — Acabado Completo",
        descripcion: "Aplica acabados profesionales a las piezas ensambladas en M3",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m4-s6-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Práctica Presencial — Acabado Completo (240min)",
            descripcion: "Aplica lijado, sellado y pintura/barniz al producto del M3. Usa la cabina de pintura con EPP completo. Entregable: producto terminado con acabado profesional documentado",
            duracionMin: 240,
            esActividad: true
          }
        ]
      },
      {
        id: "m4-s7",
        numero: "4.7",
        titulo: "Práctica Presencial — Gestión del Taller",
        descripcion: "Implementa el sistema de almacén y fichas de control en tu taller",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m4-s7-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Práctica Presencial — Sistema de Gestión del Taller (180min)",
            descripcion: "Organiza el almacén, coloca fichas de revisión en máquinas, inicia la bitácora y presenta el sistema al supervisor. Entregable: taller con sistema de gestión implementado",
            duracionMin: 180,
            esActividad: true
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // M5 · Programa Formativo en el Taller (16h asincrono + 6h sincrono)
  // ─────────────────────────────────────────────────────────────────────────
  {
    numero: 5,
    id: "m5",
    nombre: "Programa Formativo en el Taller",
    descripcion: "Cómo planificar, implementar y evaluar competencias usando el equipamiento como ancla. Las 14 habilidades EPT desde el taller equipado.",
    fase: "aplicacion",
    horasTotal: 26,
    horasAsincrono: 18,
    horasSincrono: 8,
    horasPresencial: 0,
    icon: "📋",
    colorFase: "#f59e0b",
    subSecciones: [
      {
        id: "m5-s1",
        numero: "5.1",
        titulo: "El Taller como Espacio de Competencias",
        descripcion: "Cómo el nuevo equipamiento transforma la enseñanza EPT",
        colorAccent: "#f59e0b",
        contenidos: [
          {
            id: "m5-s1-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "El Taller Equipado como Espacio de Aprendizaje",
            descripcion: "Inicia con un caso práctico real: docente con el nuevo equipamiento, su primera sesión y los cambios en el aprendizaje estudiantil",
            duracionMin: 60
          }
        ]
      },
      {
        id: "m5-s2",
        numero: "5.2",
        titulo: "Las 14 Habilidades desde el Taller",
        descripcion: "Mapa completo de habilidades EPT vinculadas al equipamiento",
        colorAccent: "#f59e0b",
        contenidos: [
          {
            id: "m5-s2-c1",
            tipo: "INTERACTIVO",
            modalidad: "asincrono",
            titulo: "Mapa de 14 Habilidades EPT × Equipamiento",
            descripcion: "Herramienta interactiva: selecciona una habilidad y ve qué equipos la desarrollan. Selecciona un equipo y ve qué habilidades activa",
            duracionMin: 30
          }
        ]
      },
      {
        id: "m5-s3",
        numero: "5.3",
        titulo: "El Itinerario y la Progresión del Equipamiento",
        descripcion: "Cómo los equipos se secuencian a lo largo de 5 grados",
        colorAccent: "#f59e0b",
        contenidos: [
          {
            id: "m5-s3-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Itinerario Formativo — Cómo Progresa el Uso del Equipamiento",
            descripcion: "La lógica de progresión: qué equipos se usan en 1°, qué se agrega en 2°, y así hasta 5°. Con ejemplos de proyectos por grado",
            duracionMin: 90
          },
          {
            id: "m5-s3-c2",
            tipo: "INTERACTIVO",
            modalidad: "asincrono",
            titulo: "Tabla de Progresión por Grado — Interactiva",
            descripcion: "Visualiza qué equipos y habilidades corresponden a cada grado y cómo se encadenan los proyectos a lo largo del itinerario",
            duracionMin: 20
          }
        ]
      },
      {
        id: "m5-s4",
        numero: "5.4",
        titulo: "Planificar con el Equipamiento como Ancla",
        descripcion: "Método de planificación desde el equipo hacia el currículo",
        colorAccent: "#f59e0b",
        contenidos: [
          {
            id: "m5-s4-c1",
            tipo: "PDF",
            modalidad: "asincrono",
            titulo: "Guía de Planificación con Equipamiento — Método GRAMA",
            descripcion: "Metodología paso a paso para diseñar unidades de aprendizaje a partir del equipamiento: identificar el bien ancla, seleccionar competencias, diseñar actividades",
            paginas: 32,
            duracionMin: 120,
            manualId: "manual-planificacion-m5"
          },
          {
            id: "m5-s4-c2",
            tipo: "DESCARGABLE",
            modalidad: "asincrono",
            titulo: "Plantilla de Unidad de Aprendizaje EPT — Descargable",
            descripcion: "Plantilla Word/Google Docs del formato oficial de unidad de aprendizaje adaptado al taller equipado. Con ejemplo completo de llenado",
            paginas: 4,
            descargableId: "desc-m5-plantilla-sesion"
          }
        ]
      },
      {
        id: "m5-s5",
        numero: "5.5",
        titulo: "Evaluar Competencias en el Taller",
        descripcion: "Instrumentos de evaluación técnica y procedimental",
        colorAccent: "#f59e0b",
        contenidos: [
          {
            id: "m5-s5-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Evaluación de Competencias Técnicas — Rúbricas y Listas",
            descripcion: "Cómo evaluar el desempeño práctico en el taller: rúbricas por equipo, listas de cotejo de procesos y portafolio digital del estudiante",
            duracionMin: 90
          },
          {
            id: "m5-s5-c2",
            tipo: "DESCARGABLE",
            modalidad: "asincrono",
            titulo: "Pack de Instrumentos de Evaluación — EPT Talleres",
            descripcion: "Rúbricas, listas de cotejo y fichas de observación para evaluar competencias técnicas. Adaptables a cualquier taller y grado",
            paginas: 18,
            descargableId: "desc-m5-pack-evaluacion"
          }
        ]
      },
      {
        id: "m5-s6",
        numero: "5.6",
        titulo: "El Módulo de Emprendimiento Integrado",
        descripcion: "Cómo articular el taller con el módulo de emprendimiento",
        colorAccent: "#f59e0b",
        contenidos: [
          {
            id: "m5-s6-c1",
            tipo: "VIDEO",
            modalidad: "asincrono",
            titulo: "Emprendimiento desde el Taller — Proyectos con Valor",
            descripcion: "Integración del módulo de emprendimiento con los proyectos del taller. Cómo los estudiantes pasan de aprender a hacer a crear productos con valor de mercado",
            duracionMin: 90
          }
        ]
      },
      {
        id: "m5-s7",
        numero: "5.7",
        titulo: "Sesión Sincrónica 1 — Planificación Colaborativa",
        colorAccent: "#d4c4fc",
        phaseBadge: "EN VIVO",
        contenidos: [
          {
            id: "m5-s7-c1",
            tipo: "EN_VIVO",
            modalidad: "sincrono",
            titulo: "Sesión 1 — Planificación Colaborativa con el Equipamiento",
            descripcion: "En grupos, diseña una unidad de aprendizaje usando el equipamiento del taller. El formador retroalimenta en tiempo real",
            duracionMin: 120
          }
        ]
      },
      {
        id: "m5-s8",
        numero: "5.8",
        titulo: "Sesión Sincrónica 2 — Programa con Equipamiento Real",
        colorAccent: "#d4c4fc",
        phaseBadge: "EN VIVO",
        contenidos: [
          {
            id: "m5-s8-c1",
            tipo: "EN_VIVO",
            modalidad: "sincrono",
            titulo: "Sesión 2 — Programa con el Equipamiento Real del Taller",
            descripcion: "Ajusta la planificación a los equipos reales disponibles en tu taller. Intercambio de experiencias con docentes de otras instituciones",
            duracionMin: 120
          }
        ]
      },
      {
        id: "m5-s9",
        numero: "5.9",
        titulo: "Sesión Sincrónica 3 — Casos Difíciles",
        colorAccent: "#d4c4fc",
        phaseBadge: "EN VIVO",
        contenidos: [
          {
            id: "m5-s9-c1",
            tipo: "EN_VIVO",
            modalidad: "sincrono",
            titulo: "Sesión 3 — Casos Difíciles de Planificación",
            descripcion: "¿Qué haces cuando el equipo falla? ¿Cómo adaptas la sesión? Análisis de situaciones complejas y estrategias de contingencia pedagógica",
            duracionMin: 120
          }
        ]
      },
      {
        id: "m5-s10",
        numero: "5.10",
        titulo: "Producción de Planificación del Grado",
        descripcion: "Entregable: unidad de aprendizaje completa para tu grado",
        colorAccent: "#02d47e",
        phaseBadge: "ENTREGABLE",
        contenidos: [
          {
            id: "m5-s10-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "asincrono",
            titulo: "Entregable M5 — Planificación Completa del Grado",
            descripcion: "Produce una unidad de aprendizaje completa para tu grado usando el equipamiento del taller. Incluye: situación significativa, actividades secuenciadas, instrumentos de evaluación",
            duracionMin: 180,
            esActividad: true
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // M6 · Proyecto Integrador (2h asincrono + 3h sincrono + 20h presencial)
  // ─────────────────────────────────────────────────────────────────────────
  {
    numero: 6,
    id: "m6",
    nombre: "Proyecto Integrador",
    descripcion: "Produce un producto real en el taller usando todos los equipos y procesos aprendidos. Sustentación colectiva y ceremonia de certificación.",
    fase: "proyecto",
    horasTotal: 27,
    horasAsincrono: 2,
    horasSincrono: 3,
    horasPresencial: 22,
    icon: "🏆",
    colorFase: "#02d47e",
    subSecciones: [
      {
        id: "m6-s1",
        numero: "6.1",
        titulo: "Briefing del Proyecto Integrador",
        descripcion: "Rúbrica, criterios de evaluación y selección del proyecto",
        colorAccent: "#02d47e",
        contenidos: [
          {
            id: "m6-s1-c1",
            tipo: "PDF",
            modalidad: "asincrono",
            titulo: "Briefing del Proyecto Integrador — Rúbrica y Criterios",
            descripcion: "Especificaciones completas del proyecto: qué debe producir, cómo se evaluará, qué procesos debe integrar y qué documentación debe presentar",
            paginas: 8,
            duracionMin: 60,
            manualId: "manual-proyecto-integrador-m6"
          },
          {
            id: "m6-s1-c2",
            tipo: "DESCARGABLE",
            modalidad: "asincrono",
            titulo: "Rúbrica de Evaluación — Proyecto Integrador",
            descripcion: "Rúbrica oficial de evaluación del proyecto con criterios técnicos, pedagógicos y de proceso. Descarga en Excel y PDF",
            paginas: 2,
            descargableId: "desc-m6-rubrica-proyecto"
          }
        ]
      },
      {
        id: "m6-s2",
        numero: "6.2",
        titulo: "Sesión Sincrónica — Briefing Colectivo",
        colorAccent: "#d4c4fc",
        phaseBadge: "EN VIVO",
        contenidos: [
          {
            id: "m6-s2-c1",
            tipo: "EN_VIVO",
            modalidad: "sincrono",
            titulo: "Sesión Briefing — Presentación de Proyectos",
            descripcion: "Cada participante presenta su propuesta de proyecto. El grupo y el formador dan retroalimentación y aprueba el proyecto a desarrollar",
            duracionMin: 60
          }
        ]
      },
      {
        id: "m6-s3",
        numero: "6.3",
        titulo: "Sesión Presencial 1 — Diseño y Prototipado",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m6-s3-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Sesión 1 del Proyecto — Diseño y Prototipado (240min)",
            descripcion: "Diseña el producto final en software CAD/gráfico, produce un prototipo digital y elabora el plan de producción. Entregable: diseño aprobado y plan de producción",
            duracionMin: 240,
            esActividad: true
          }
        ]
      },
      {
        id: "m6-s4",
        numero: "6.4",
        titulo: "Sesión Presencial 2 — Habilitado y Maquinado",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m6-s4-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Sesión 2 del Proyecto — Habilitado y Maquinado (240min)",
            descripcion: "Ejecuta los cortes, perforaciones y operaciones de maquinado del proyecto. Aplica todos los protocolos de seguridad",
            duracionMin: 240,
            esActividad: true
          }
        ]
      },
      {
        id: "m6-s5",
        numero: "6.5",
        titulo: "Sesión Presencial 3 — Ensamble",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m6-s5-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Sesión 3 del Proyecto — Ensamble (240min)",
            descripcion: "Ensambla todas las piezas del proyecto. Verifica dimensiones, ajustes y funcionamiento. Documenta el proceso con fotos/video",
            duracionMin: 240,
            esActividad: true
          }
        ]
      },
      {
        id: "m6-s6",
        numero: "6.6",
        titulo: "Sesión Presencial 4 — Acabado y Documentación",
        colorAccent: "#f8ee91",
        phaseBadge: "PRESENCIAL",
        contenidos: [
          {
            id: "m6-s6-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Sesión 4 del Proyecto — Acabado Final y Documentación (240min)",
            descripcion: "Aplica acabados finales al proyecto. Fotografía el producto terminado. Inicia la elaboración del expediente pedagógico",
            duracionMin: 240,
            esActividad: true
          }
        ]
      },
      {
        id: "m6-s7",
        numero: "6.7",
        titulo: "Elaboración del Expediente Pedagógico",
        descripcion: "Documento técnico-pedagógico del proyecto completo",
        colorAccent: "#02d47e",
        phaseBadge: "ENTREGABLE",
        contenidos: [
          {
            id: "m6-s7-c1",
            tipo: "ACTIVIDAD_PRACTICA",
            modalidad: "presencial",
            titulo: "Expediente Pedagógico — Documentación del Proyecto (240min)",
            descripcion: "Elabora el expediente completo: ficha técnica del producto, proceso documentado, instrumentos de evaluación usados, evidencias fotográficas y propuesta de aplicación pedagógica",
            duracionMin: 240,
            esActividad: true
          }
        ]
      },
      {
        id: "m6-s8",
        numero: "6.8",
        titulo: "Sustentación y Ceremonia de Cierre",
        descripcion: "Presentación final, evaluación y certificación",
        colorAccent: "#d4c4fc",
        phaseBadge: "EN VIVO",
        contenidos: [
          {
            id: "m6-s8-c1",
            tipo: "EN_VIVO",
            modalidad: "sincrono",
            titulo: "Sustentación y Ceremonia de Certificación",
            descripcion: "Presenta tu proyecto integrador, defiende tus decisiones técnicas y pedagógicas, recibe retroalimentación del jurado y celebra con tu grupo el cierre del programa",
            duracionMin: 120
          }
        ]
      }
    ]
  }
]

export default modulosLXP
