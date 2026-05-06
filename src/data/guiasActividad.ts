// src/data/guiasActividad.ts
// Guías de actividades prácticas presenciales — GRAMA / TSF-MINEDU
// Guías genéricas para las sesiones prácticas de M1 a M6 (aplicables a los 9 talleres EPT)

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

export interface CriterioEvaluacion {
  indicador: string
  puntaje: number
  descripcionLogro: string
}

export interface PasoActividad {
  numero: number
  titulo: string
  descripcion: string
  duracionMin: number
  recursos?: string[]
  alertaSeg?: string
}

export interface GuiaActividad {
  id: string
  modulo: string
  sesion: string        // "M1-P1", "M2-P1", etc.
  titulo: string
  subtitulo: string
  descripcion: string
  objetivo: string
  duracionTotalMin: number
  modalidad: 'presencial' | 'sincrono' | 'asincrónico'
  nivel: 'guiada' | 'semi-autonoma' | 'autonoma'
  grupoTrabajo: string  // "individual", "parejas", "grupos de 3-4"
  prerequisitos: string[]
  materialesDocente: string[]
  materialesEstudiante: string[]
  eppRequerido: string[]
  pasos: PasoActividad[]
  entregable: {
    nombre: string
    descripcion: string
    formatoEntrega: string
  }
  criteriosEvaluacion: CriterioEvaluacion[]
  notaDocente?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// M1 · PRÁCTICA PRESENCIAL — Visita de Reconocimiento y Plano de Seguridad
// ─────────────────────────────────────────────────────────────────────────────
export const guiaM1VisitaPresencial: GuiaActividad = {
  id: "guia-m1-visita",
  modulo: "m1",
  sesion: "M1-P1",
  titulo: "Visita de Reconocimiento Presencial — Plano de Seguridad del Taller",
  subtitulo: "Sesión presencial · 2 horas · Nivel: Guiada",
  descripcion: "Primera sesión presencial del programa. Los participantes recorren físicamente el taller, identifican los riesgos de cada zona, verifican la señalización existente y elaboran el Mapa de Seguridad de su taller como entregable.",
  objetivo: "Elaborar el Mapa de Seguridad del taller identificando las 4 zonas, los riesgos principales de cada zona, la ubicación de los elementos de emergencia (extintor, botiquín, salidas) y las medidas de control existentes y pendientes.",
  duracionTotalMin: 120,
  modalidad: "presencial",
  nivel: "guiada",
  grupoTrabajo: "individual o parejas del mismo taller",
  prerequisitos: [
    "Haber completado el módulo M1 en el LXP (secciones 1.1 a 1.5)",
    "Haber aprobado el Quiz de Seguridad con mínimo 80%",
    "Tener acceso al taller asignado con los equipos instalados"
  ],
  materialesDocente: [
    "Lista de verificación de seguridad del taller (check list de 40 ítems)",
    "Modelo de Mapa de Seguridad en papel A3 para referencia",
    "Cámara o teléfono para documentar hallazgos",
    "Fichas de identificación de riesgos (descargable del LXP M1)"
  ],
  materialesEstudiante: [
    "Hoja A3 en blanco o plantilla del Mapa de Seguridad (descargada del LXP)",
    "Plumones de colores: rojo (peligro), amarillo (advertencia), verde (seguro), azul (información)",
    "Lápiz y borrador para boceto preliminar",
    "Teléfono o cámara para fotografiar hallazgos"
  ],
  eppRequerido: [
    "Calzado cerrado de punta reforzada (obligatorio para recorrer el taller)",
    "Lentes de seguridad al ingresar a zonas de máquinas",
    "Guardapolvo o ropa de trabajo"
  ],
  pasos: [
    {
      numero: 1,
      titulo: "Introducción y explicación de la actividad",
      descripcion: "El docente/facilitador explica el propósito de la visita: no es solo 'conocer el taller' sino diagnosticar el estado real de la seguridad y construir el mapa que guiará el trabajo durante todo el programa. Presenta el modelo de Mapa de Seguridad y explica los símbolos a usar.",
      duracionMin: 15,
      recursos: ["Proyector o impresión del modelo de mapa", "Ejemplo de mapa completado de otro taller como referencia"]
    },
    {
      numero: 2,
      titulo: "Recorrido de reconocimiento — Zona de Investigación y Diseño",
      descripcion: "Recorrer la Zona de Investigación identificando: equipos presentes, riesgos eléctricos, condición de cables y tomas, señalización existente y faltante, EPP disponible. Fotografiar y anotar hallazgos en la ficha de identificación de riesgos.",
      duracionMin: 20,
      recursos: ["Ficha de identificación de riesgos de la Zona de Investigación"],
      alertaSeg: "Verificar que ningún equipo esté encendido durante el recorrido. No tocar equipos durante la visita de reconocimiento."
    },
    {
      numero: 3,
      titulo: "Recorrido de reconocimiento — Zona de Innovación y Máquinas",
      descripcion: "Recorrer la Zona de Innovación identificando: máquinas presentes, estado de guardas de seguridad, señalización junto a cada máquina, distancias de seguridad, estado de los pisos y pasillos, ubicación del extintor más cercano. Esta es la zona de mayor riesgo — dedicar más tiempo al diagnóstico.",
      duracionMin: 25,
      recursos: ["Ficha de identificación de riesgos de la Zona de Innovación"],
      alertaSeg: "Las máquinas deben estar APAGADAS durante el recorrido. Aplicar LOTO si alguna máquina está encendida al iniciar la visita. No encender ningún equipo."
    },
    {
      numero: 4,
      titulo: "Recorrido de reconocimiento — Zona de Acabados y Almacén",
      descripcion: "Recorrer la Zona de Acabados e identificar: cabina de pintura y ventilación, almacenamiento de productos químicos, señalización de riesgos químicos, extintor CO₂. En el Almacén: organización, acceso controlado, etiquetado de bienes.",
      duracionMin: 15,
      recursos: ["Ficha de identificación de riesgos de Acabados y Almacén"],
      alertaSeg: "En la zona de acabados verificar que no haya envases abiertos sin tapa. Los solventes deben estar en armario ventilado y cerrado."
    },
    {
      numero: 5,
      titulo: "Elaboración del Mapa de Seguridad",
      descripcion: "Con los datos recogidos en el recorrido, elaborar el Mapa de Seguridad del taller. El mapa debe incluir: distribución de las 4 zonas a escala aproximada, riesgos identificados en cada zona (con simbología de colores), ubicación de elementos de emergencia, señalización existente (verde) y faltante (rojo punteado), ruta de evacuación y punto de encuentro.",
      duracionMin: 30,
      recursos: ["Hoja A3 o plantilla", "Plumones de colores", "Modelo de referencia"]
    },
    {
      numero: 6,
      titulo: "Presentación del mapa y acuerdos de mejora",
      descripcion: "Cada participante/pareja presenta su mapa brevemente (2 minutos). El grupo identifica los 3 problemas de seguridad más urgentes a resolver y acuerda acciones concretas. El docente facilita la discusión y registra los acuerdos.",
      duracionMin: 15,
      recursos: ["Pizarrón o papelote para registrar acuerdos colectivos"]
    }
  ],
  entregable: {
    nombre: "Mapa de Seguridad del Taller",
    descripcion: "Mapa en A3 con la distribución del taller, riesgos identificados por zona, elementos de emergencia señalizados y lista de mejoras pendientes. Firmado por el participante y el coordinador del programa.",
    formatoEntrega: "Original en papel A3 + fotografía digital enviada al LXP"
  },
  criteriosEvaluacion: [
    { indicador: "Identificación de zonas", puntaje: 20, descripcionLogro: "Las 4 zonas del taller están claramente delimitadas y nombradas en el mapa" },
    { indicador: "Riesgos por zona", puntaje: 30, descripcionLogro: "Se identifican al menos 3 riesgos reales en cada zona con la simbología de colores correcta" },
    { indicador: "Elementos de emergencia", puntaje: 25, descripcionLogro: "Extintor, botiquín, salidas y punto de encuentro están ubicados correctamente" },
    { indicador: "Mejoras propuestas", puntaje: 25, descripcionLogro: "Se listan al menos 5 mejoras concretas con responsable y plazo propuesto" }
  ],
  notaDocente: "Si el taller está recién instalado y la señalización está completa, enfocar la actividad en verificar que la señalización corresponde a los riesgos reales (no es solo decorativa). Muchos talleres tienen señalización estándar que no coincide con sus riesgos específicos."
}

// ─────────────────────────────────────────────────────────────────────────────
// M2 · PRÁCTICA PRESENCIAL 1 — Diseño y Prototipado Digital
// ─────────────────────────────────────────────────────────────────────────────
export const guiaM2Practica1: GuiaActividad = {
  id: "guia-m2-p1",
  modulo: "m2",
  sesion: "M2-P1",
  titulo: "Práctica Presencial 1 — Diseño y Prototipado en la Zona de Investigación",
  subtitulo: "Sesión presencial · 4 horas · Nivel: Semi-autónoma",
  descripcion: "Primera práctica en el taller. Los participantes trabajan con los equipos de la Zona de Investigación para desarrollar el diseño digital inicial de un proyecto estudiantil. El proceso combina diseño en software, fotografía y documentación.",
  objetivo: "Utilizar los equipos de la Zona de Investigación (computadora, software CAD/diseño, cámara, impresora) para diseñar digitalmente un proyecto técnico y elaborar el brief de proyecto que guiará la fabricación en módulos posteriores.",
  duracionTotalMin: 240,
  modalidad: "presencial",
  nivel: "semi-autonoma",
  grupoTrabajo: "individual o parejas",
  prerequisitos: [
    "Haber completado las secciones 2.1 a 2.5 del módulo M2 en el LXP",
    "Haber aprobado el Quiz de la Zona de Investigación (mínimo 75%)",
    "Tener una idea preliminar del proyecto que quiere desarrollar"
  ],
  materialesDocente: [
    "Computadoras con software de diseño instalado (CAD 2D/3D o software de diseño gráfico)",
    "Impresora 3D calibrada y con filamento cargado",
    "Proyector para mostrar demostraciones de software",
    "Ejemplos de briefs de proyecto completados"
  ],
  materialesEstudiante: [
    "Plantilla digital o impresa del Brief de Proyecto (descarga del LXP M2)",
    "USB personal para guardar archivos de diseño",
    "Cuaderno de bocetos o papel para el diseño inicial a mano"
  ],
  eppRequerido: [
    "No requiere EPP específico para la Zona de Investigación (equipos electrónicos)",
    "Calzado cerrado como mínimo al transitar por el taller"
  ],
  pasos: [
    {
      numero: 1,
      titulo: "Presentación del reto y exploración inicial",
      descripcion: "El docente presenta el reto de la sesión: diseñar un proyecto técnico usando los equipos de investigación. Los participantes identifican una necesidad real de su taller o institución que el proyecto podría resolver (silla deteriorada, módulo didáctico faltante, herramienta pedagógica). Sketch rápido en papel de la idea inicial.",
      duracionMin: 30,
      recursos: ["Papel y lápiz para boceto inicial", "Fotografías de necesidades reales del taller"]
    },
    {
      numero: 2,
      titulo: "Diseño en software CAD o de diseño",
      descripcion: "Con la idea bocetada, los participantes pasan al diseño digital usando el software disponible en el taller (software CAD 2D, Tinkercad, SketchUp Free, Inkscape u otro). El docente demuestra las funciones básicas del software en el proyector antes de que los participantes trabajen de forma semi-autónoma.",
      duracionMin: 75,
      recursos: ["Computadoras con software instalado", "Tutorial básico del software (PDF descargable del LXP)"]
    },
    {
      numero: 3,
      titulo: "Documentación fotográfica del proceso",
      descripcion: "Usando la cámara o tablet del taller, los participantes fotografían: el boceto inicial en papel, las etapas del diseño digital en pantalla, el espacio del taller donde se ubicará o usará el producto. Estas fotos son parte del entregable (brief de proyecto).",
      duracionMin: 20,
      recursos: ["Cámara digital o tablet del taller", "USB para transferir fotos"],
      alertaSeg: "Verificar que los equipos fotográficos del taller tengan carga suficiente o estén conectados."
    },
    {
      numero: 4,
      titulo: "Prototipo rápido (si aplica impresora 3D)",
      descripcion: "Si el diseño incluye piezas que pueden prototipado en 3D (fichas, conectores, soportes pequeños), preparar el archivo y ejecutar la impresión. Para diseños que no aplican impresión 3D (proyectos de madera completos, metálicos), esta etapa se dedica a elaborar el plano técnico con cotas.",
      duracionMin: 45,
      recursos: ["Impresora 3D calibrada", "Software de laminado (Cura u similar)", "Filamento PLA cargado"],
      alertaSeg: "La impresora 3D alcanza temperaturas de 200°C en el extrusor. No tocar el hotend durante la impresión. Asegurar ventilación del área."
    },
    {
      numero: 5,
      titulo: "Elaboración del Brief de Proyecto",
      descripcion: "Completar la plantilla del Brief de Proyecto con: nombre del proyecto y propósito, problema o necesidad que resuelve, boceto digital con cotas básicas, lista de materiales estimada, zonas del taller donde se fabricará, tiempo estimado de fabricación. Este documento es el entregable de la sesión.",
      duracionMin: 50,
      recursos: ["Plantilla de Brief de Proyecto (digital o impresa)", "Diseño digital completado en el paso 2"]
    },
    {
      numero: 6,
      titulo: "Presentación rápida y retroalimentación entre pares",
      descripcion: "Cada participante presenta su brief en 3 minutos: qué va a fabricar, para qué, en qué zona del taller y cuál es el primer paso. Los compañeros dan retroalimentación con el protocolo 'elogio + sugerencia + pregunta'.",
      duracionMin: 20,
      recursos: ["Proyector para mostrar el brief digital durante la presentación"]
    }
  ],
  entregable: {
    nombre: "Brief de Proyecto Técnico",
    descripcion: "Documento digital (PDF o Word) con: nombre y propósito del proyecto, problema que resuelve, boceto digital con dimensiones básicas, lista de materiales estimada, zonas de trabajo y tiempo estimado. Incluye mínimo 3 fotografías del proceso de diseño.",
    formatoEntrega: "PDF enviado al LXP en la sección M2-P1 o entregado digitalmente al coordinador"
  },
  criteriosEvaluacion: [
    { indicador: "Pertinencia del proyecto", puntaje: 25, descripcionLogro: "El proyecto responde a una necesidad real del taller o la institución, claramente identificada" },
    { indicador: "Calidad del diseño digital", puntaje: 30, descripcionLogro: "El diseño digital tiene cotas básicas, es comprensible y refleja la idea del boceto inicial" },
    { indicador: "Completitud del brief", puntaje: 25, descripcionLogro: "El brief contiene todos los campos requeridos con información suficiente para iniciar la fabricación" },
    { indicador: "Documentación fotográfica", puntaje: 20, descripcionLogro: "Incluye al menos 3 fotografías del proceso de diseño que documentan la evolución de la idea" }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// M2 · PRÁCTICA PRESENCIAL 2 — Investigación con Herramientas Digitales
// ─────────────────────────────────────────────────────────────────────────────
export const guiaM2Practica2: GuiaActividad = {
  id: "guia-m2-p2",
  modulo: "m2",
  sesion: "M2-P2",
  titulo: "Práctica Presencial 2 — Sesión de Investigación con Estudiantes",
  subtitulo: "Sesión presencial · 4 horas · Nivel: Autónoma",
  descripcion: "El participante diseña y conduce una sesión de aprendizaje real con sus estudiantes usando los equipos de la Zona de Investigación. El docente TSF actúa como el docente, sus estudiantes como el grupo. Se documenta el proceso con la filmadora del taller.",
  objetivo: "Conducir una sesión de aprendizaje completa usando equipos de la Zona de Investigación y documentar el proceso como evidencia pedagógica. El participante debe demostrar que puede integrar los equipos de investigación en una sesión real con sus estudiantes.",
  duracionTotalMin: 240,
  modalidad: "presencial",
  nivel: "autonoma",
  grupoTrabajo: "individual (el docente conduce la sesión con sus propios estudiantes)",
  prerequisitos: [
    "Haber completado la Práctica Presencial 1 (M2-P1)",
    "Tener el Brief de Proyecto aprobado",
    "Haber planificado la sesión con al menos 3 días de anticipación"
  ],
  materialesDocente: [
    "Sesión de aprendizaje planificada (plantilla de sesión completada)",
    "Materiales preparados para la actividad de investigación",
    "Lista de asistencia de sus estudiantes"
  ],
  materialesEstudiante: [
    "Los materiales definidos en la planificación de la sesión del docente"
  ],
  eppRequerido: [
    "EPP según las actividades que se realizarán en la sesión planificada",
    "Si incluye zona de máquinas: EPP completo para todos los participantes"
  ],
  pasos: [
    {
      numero: 1,
      titulo: "Revisión pre-sesión y verificación de equipos",
      descripcion: "30 minutos antes de que lleguen los estudiantes: verificar el estado de todos los equipos a usar, completar el check list de revisión diaria, preparar los materiales y asignar las estaciones de trabajo.",
      duracionMin: 30,
      recursos: ["Check list de revisión diaria de equipos (descargable M1)"]
    },
    {
      numero: 2,
      titulo: "Ejecución de la sesión de aprendizaje",
      descripcion: "El docente conduce la sesión planificada con sus estudiantes siguiendo la estructura: inicio (motivación y recuperación de saberes), proceso (actividades con equipos de investigación), cierre (consolidación y reflexión). El coordinador TSF o un par observa y toma notas en la ficha de observación.",
      duracionMin: 150,
      recursos: ["Sesión planificada como guía", "Filmadora o cámara del taller para documentar"]
    },
    {
      numero: 3,
      titulo: "Documentación post-sesión",
      descripcion: "Inmediatamente después de que los estudiantes se retiran: revisar el material filmado, seleccionar las imágenes más representativas del proceso, completar el registro anecdótico de observaciones, limpiar y organizar los equipos usados.",
      duracionMin: 30,
      recursos: ["Registro anecdótico de la sesión", "USB para guardar material fotográfico"]
    },
    {
      numero: 4,
      titulo: "Reflexión pedagógica individual",
      descripcion: "El docente completa la sección de reflexión post-sesión de su plantilla de sesión: ¿Qué funcionó bien? ¿Qué cambiaría? ¿Qué evidencias de aprendizaje recogió? Esta reflexión es parte del entregable.",
      duracionMin: 30
    }
  ],
  entregable: {
    nombre: "Documentación de la Sesión con Estudiantes",
    descripcion: "Paquete de evidencias: (1) Plantilla de sesión completada con reflexión post-sesión, (2) Mínimo 5 fotografías o fragmento de video del proceso, (3) Registro anecdótico de observaciones durante la sesión, (4) Lista de asistencia de los estudiantes.",
    formatoEntrega: "Carpeta digital enviada al LXP o al coordinador del programa"
  },
  criteriosEvaluacion: [
    { indicador: "Planificación de la sesión", puntaje: 25, descripcionLogro: "La sesión planificada tiene propósito claro, actividades secuenciadas y evaluación definida" },
    { indicador: "Uso pedagógico de los equipos", puntaje: 30, descripcionLogro: "Los equipos de investigación se usan como medios de aprendizaje, no como fin en sí mismos" },
    { indicador: "Gestión del espacio y la seguridad", puntaje: 25, descripcionLogro: "Los estudiantes trabajan en condiciones seguras, con EPP y protocolos cumplidos" },
    { indicador: "Reflexión pedagógica", puntaje: 20, descripcionLogro: "La reflexión post-sesión identifica logros concretos y aspectos de mejora específicos" }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// M3 · PRÁCTICA NIVEL 1A — Máquinas de Corte y Habilitado
// ─────────────────────────────────────────────────────────────────────────────
export const guiaM3NivelACorte: GuiaActividad = {
  id: "guia-m3-n1a",
  modulo: "m3",
  sesion: "M3-N1A",
  titulo: "Práctica Nivel 1A — Operación de Máquinas de Corte y Habilitado",
  subtitulo: "Sesión presencial · 8 horas (2 jornadas de 4h) · Nivel: Guiada → Semi-autónoma",
  descripcion: "Práctica de iniciación en las máquinas de corte de la Zona de Innovación: sierra circular, sierra radial (de brazo), garlopa y regruesadora. Progresión en dos jornadas: primera jornada guiada con el docente, segunda jornada semi-autónoma.",
  objetivo: "Operar correctamente las 4 máquinas de corte y habilitado aplicando todos los protocolos de seguridad, obtener piezas con dimensiones dentro de tolerancia (±2mm) y documentar el proceso de habilitado completo.",
  duracionTotalMin: 480,
  modalidad: "presencial",
  nivel: "guiada",
  grupoTrabajo: "grupos de 3-4 participantes por máquina con rotación",
  prerequisitos: [
    "Haber completado M3 secciones 3.A y 3.D en el LXP",
    "Haber aprobado el Quiz de Innovación con mínimo 80%",
    "Haber completado la Práctica M1 (Mapa de Seguridad)"
  ],
  materialesDocente: [
    "Guía de demostración de cada máquina con fotografías de pasos",
    "Fichas de revisión diaria de sierra circular, garlopa y regruesadora",
    "Cinta métrica y escuadra para verificar piezas",
    "Empujadores de madera para operaciones con garlopa y regruesadora"
  ],
  materialesEstudiante: [
    "Tablones de madera de práctica (pino o eucalipto, 50x100mm)",
    "Cinta métrica personal",
    "Lápiz de marcado para madera",
    "Escuadra de 90°",
    "Ficha de registro de dimensiones (para anotar medidas antes y después de cada operación)"
  ],
  eppRequerido: [
    "Lentes de seguridad de policarbonato — OBLIGATORIO desde que se ingresa a la Zona de Innovación",
    "Orejeras de protección auditiva — OBLIGATORIO durante operación de cualquier máquina",
    "Mascarilla N95 para polvo de madera",
    "Guardapolvo ajustado o ropa de trabajo sin partes sueltas",
    "Calzado cerrado con puntera reforzada",
    "SIN guantes — PROHIBIDO en operación de máquinas rotativas"
  ],
  pasos: [
    {
      numero: 1,
      titulo: "Protocolo de seguridad y revisión de equipos (Jornada 1)",
      descripcion: "Antes de tocar cualquier máquina: el docente demuestra el protocolo de revisión pre-operativa de la sierra circular, garlopa y regruesadora. Cada participante completa su check list de revisión con el equipo apagado y desconectado. Se verifica EPP completo de todos los participantes.",
      duracionMin: 30,
      alertaSeg: "NINGÚN equipo debe encenderse hasta que el docente verifique que todos tienen EPP completo y han revisado su check list."
    },
    {
      numero: 2,
      titulo: "Demostración: Sierra circular — Corte de tablones",
      descripcion: "El docente demuestra: ajuste de la guía paralela, posición corporal correcta (nunca detrás de la línea de corte), uso del empujador para piezas cortas, extracción limpia de la pieza cortada. Los participantes observan sin tocar la máquina. Después cada participante hace 3 cortes guiados por el docente.",
      duracionMin: 60,
      alertaSeg: "El docente debe estar junto al participante en cada corte durante la primera jornada. Verificar posición de los pies (nunca detrás de la trayectoria de proyección)."
    },
    {
      numero: 3,
      titulo: "Demostración: Garlopa — Cepillado de cara y canto",
      descripcion: "El docente demuestra: ajuste de profundidad de cepillado, dirección de avance según la fibra de la madera, uso de empujadores para piezas cortas, posición de las manos alejadas del cabezal. Práctica guiada: cada participante procesa una cara de un tablón hasta obtener la cara plana de referencia.",
      duracionMin: 60,
      alertaSeg: "Las manos nunca pasan directamente sobre el cabezal portacuchillas — siempre con empujador. No cepillar piezas menores de 30cm de longitud."
    },
    {
      numero: 4,
      titulo: "Demostración: Regruesadora — Obtención de espesor paralelo",
      descripcion: "Con la cara plana obtenida en la garlopa como referencia, el docente demuestra cómo usar la regruesadora para obtener un espesor paralelo preciso. Regla de 1-2mm por pasada. Los participantes llevan sus tablones al espesor objetivo en múltiples pasadas.",
      duracionMin: 60
    },
    {
      numero: 5,
      titulo: "Cierre Jornada 1 — Revisión de piezas y limpieza",
      descripcion: "Medir las piezas obtenidas con cinta métrica y escuadra. Registrar dimensiones en la ficha de control. Limpiar todas las máquinas, barrer el área, verificar que todos los equipos queden apagados y en condiciones. Discusión de errores comunes observados.",
      duracionMin: 30
    },
    {
      numero: 6,
      titulo: "Jornada 2 — Práctica semi-autónoma: proceso completo de habilitado",
      descripcion: "Con una pieza nueva, cada participante ejecuta el proceso completo de habilitado de manera semi-autónoma: revisar equipos (check list), marcar el tablón con las dimensiones objetivo, cortar a largo en sierra circular, cepillar cara en garlopa, regresar a espesor en regruesadora, cortar a ancho. El docente circula observando y retroalimentando sin intervenir salvo en riesgos de seguridad.",
      duracionMin: 180,
      alertaSeg: "El docente debe mantener la vista en la zona de máquinas en todo momento durante la práctica semi-autónoma. Intervenir de inmediato ante cualquier incumplimiento del protocolo."
    },
    {
      numero: 7,
      titulo: "Verificación de piezas y registro final",
      descripcion: "Medir las piezas finales con cinta métrica y escuadra. Completar la ficha de registro de dimensiones. Calcular el error dimensional promedio. Limpiar equipos y zona. Discusión grupal: ¿qué errores se repitieron? ¿cuál es la causa raíz? ¿cómo se corrige?",
      duracionMin: 60
    }
  ],
  entregable: {
    nombre: "Piezas de Madera Habilitadas + Ficha de Registro",
    descripcion: "Conjunto de piezas de madera habilitadas con las dimensiones especificadas (tolerancia ±2mm) y la ficha de registro de dimensiones completa con medidas antes y después de cada operación. Adjuntar fotografías del proceso.",
    formatoEntrega: "Piezas físicas verificadas por el docente + ficha de registro firmada"
  },
  criteriosEvaluacion: [
    { indicador: "Seguridad en la operación", puntaje: 30, descripcionLogro: "EPP completo en todo momento, protocolos cumplidos, uso de empujadores correctamente" },
    { indicador: "Precisión dimensional", puntaje: 30, descripcionLogro: "Las piezas finales tienen medidas dentro de ±2mm del objetivo en todas las dimensiones" },
    { indicador: "Secuencia operativa correcta", puntaje: 20, descripcionLogro: "El proceso sigue la secuencia: sierra circular → garlopa → regruesadora sin saltar pasos" },
    { indicador: "Registro y documentación", puntaje: 20, descripcionLogro: "La ficha de registro tiene todas las mediciones completas y la fotografía del proceso" }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// M3 · PRÁCTICA NIVEL 1B — Fabricación Digital y Formado
// ─────────────────────────────────────────────────────────────────────────────
export const guiaM3NivelBDigital: GuiaActividad = {
  id: "guia-m3-n1b",
  modulo: "m3",
  sesion: "M3-N1B",
  titulo: "Práctica Nivel 1B — Fabricación Digital y Máquinas de Formado",
  subtitulo: "Sesión presencial · 8 horas (2 jornadas de 4h) · Nivel: Guiada → Semi-autónoma",
  descripcion: "Práctica en máquinas de fabricación digital (cortadora láser, fresadora CNC) y máquinas de formado (torno, dobladora). Progresión guiada de menor a mayor complejidad.",
  objetivo: "Operar las máquinas de fabricación digital y formado de la Zona de Innovación para producir un componente del proyecto integrador usando al menos 2 máquinas de diferente categoría.",
  duracionTotalMin: 480,
  modalidad: "presencial",
  nivel: "guiada",
  grupoTrabajo: "parejas con rotación por estación",
  prerequisitos: [
    "Haber completado M3 secciones 3.B y 3.C en el LXP",
    "Haber completado la Práctica M3-N1A",
    "Tener el Brief de Proyecto que define qué piezas se fabricarán"
  ],
  materialesDocente: [
    "Archivos de prueba para cortadora láser y fresadora CNC",
    "Fichas de check list de la cortadora láser y el torno",
    "Material de práctica: MDF 3mm para láser, acrílico para doblado"
  ],
  materialesEstudiante: [
    "Diseño digital del componente a fabricar (del Brief de Proyecto M2)",
    "USB con archivos vectoriales para la cortadora láser",
    "Material asignado según el proyecto"
  ],
  eppRequerido: [
    "Lentes de seguridad — OBLIGATORIO en toda la zona",
    "Orejeras durante operación de torno y fresadora",
    "Para cortadora láser: NO mirar directamente el haz, ventilación activa",
    "Para torno: PROHIBIDO guantes — ropa ajustada",
    "Para soldadura (si aplica): máscara de soldador + guantes de cuero + delantal"
  ],
  pasos: [
    {
      numero: 1,
      titulo: "Demostración: Cortadora Láser — Del archivo al corte",
      descripcion: "El docente demuestra el flujo completo: abrir archivo vectorial → configurar potencia y velocidad según el material → enfocar el láser → ejecutar corte de prueba en material de descarte → evaluar resultado y ajustar parámetros → corte final. Los participantes replican el proceso con un diseño simple.",
      duracionMin: 90,
      alertaSeg: "Tapa siempre cerrada durante el corte. Ventilación encendida obligatoriamente. Extintor de CO₂ a mano. Verificar que el material NO sea PVC antes de cortar."
    },
    {
      numero: 2,
      titulo: "Práctica en torno de madera (si aplica especialidad)",
      descripcion: "Demostración del docente: montaje de la pieza entre puntos, ajuste del toolrest, operación básica de desbaste cilíndrico, control de calidad con calibre. Práctica guiada individual: cada participante tornea una pieza simple (cilindro de 50mm de diámetro).",
      duracionMin: 90,
      alertaSeg: "Velocidad adecuada al diámetro: piezas grandes = baja velocidad. Ropa absolutamente ajustada. CERO guantes. Verificar centrado antes de encender."
    },
    {
      numero: 3,
      titulo: "Fabricación de componente del proyecto propio",
      descripcion: "Cada participante fabrica un componente real de su Brief de Proyecto usando las máquinas de esta sesión. El docente asesora en la selección de la máquina más adecuada para cada componente y en la configuración de parámetros.",
      duracionMin: 240,
      alertaSeg: "El docente debe revisar el setup de cada máquina antes de que el participante comience. Nunca dejar la zona sin supervisión durante la práctica autónoma."
    },
    {
      numero: 4,
      titulo: "Verificación y documentación",
      descripcion: "Medir y verificar el componente fabricado. Fotografiar el proceso y el resultado. Limpiar y ordenar la zona. Completar el registro de fabricación.",
      duracionMin: 60
    }
  ],
  entregable: {
    nombre: "Componente Fabricado del Proyecto + Registro de Fabricación",
    descripcion: "Componente físico fabricado con al menos 2 técnicas de la sesión, verificado dimensionalmente. Registro fotográfico del proceso (mínimo 4 fotos). Ficha de parámetros usados (potencia, velocidad, profundidad de corte).",
    formatoEntrega: "Pieza física + ficha de registro digital enviada al LXP"
  },
  criteriosEvaluacion: [
    { indicador: "Seguridad", puntaje: 30, descripcionLogro: "Todos los protocolos cumplidos sin intervención del docente" },
    { indicador: "Calidad de la pieza", puntaje: 35, descripcionLogro: "La pieza cumple las dimensiones del diseño con tolerancia aceptable" },
    { indicador: "Elección y configuración de la máquina", puntaje: 20, descripcionLogro: "La máquina elegida es la más adecuada para la pieza y los parámetros son correctos" },
    { indicador: "Documentación", puntaje: 15, descripcionLogro: "Registro completo con fotos y parámetros usados" }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// M3 · PRÁCTICA NIVEL 2 — Armado y Ensamblaje
// ─────────────────────────────────────────────────────────────────────────────
export const guiaM3Nivel2Armado: GuiaActividad = {
  id: "guia-m3-n2",
  modulo: "m3",
  sesion: "M3-N2",
  titulo: "Práctica Nivel 2 — Armado, Ensamblaje e Integración de Piezas",
  subtitulo: "Sesión presencial · 6 horas · Nivel: Autónoma",
  descripcion: "Los participantes integran las piezas fabricadas en N1A y N1B para ensamblar la estructura completa de su proyecto. Sesión de mayor autonomía: cada participante gestiona su propio proceso con asesoría del docente.",
  objetivo: "Ensamblar la estructura principal del proyecto integrador integrando las piezas de las prácticas anteriores, aplicando técnicas de unión (cola, tornillos, espigas, soldadura según especialidad) y verificando la funcionalidad estructural del ensamble.",
  duracionTotalMin: 360,
  modalidad: "presencial",
  nivel: "autonoma",
  grupoTrabajo: "individual",
  prerequisitos: [
    "Haber completado N1A y N1B con sus entregables aprobados",
    "Tener todas las piezas necesarias habilitadas y verificadas",
    "Tener el plano de ensamblaje del proyecto"
  ],
  materialesDocente: [
    "Lista de técnicas de unión aplicables a cada tipo de material",
    "Escuadras, niveles y prensas adicionales para el armado"
  ],
  materialesEstudiante: [
    "Todas las piezas fabricadas en N1A y N1B",
    "Plano de ensamblaje del proyecto",
    "Materiales de unión según especialidad (cola PVA, tornillos, espigas, soldadura)"
  ],
  eppRequerido: [
    "EPP completo según las operaciones a realizar durante el ensamblaje",
    "Guantes para aplicación de adhesivos o soldadura",
    "Lentes y orejeras si se usan taladros o amoladoras para ajustes"
  ],
  pasos: [
    {
      numero: 1,
      titulo: "Revisión del plano de ensamblaje y verificación de piezas",
      descripcion: "Verificar que todas las piezas estén disponibles y con las dimensiones correctas. Identificar en el plano el orden de ensamblaje. Preparar todos los materiales de unión y herramientas necesarias antes de comenzar.",
      duracionMin: 30
    },
    {
      numero: 2,
      titulo: "Ensamblaje por etapas — Estructura principal",
      descripcion: "Ensamblar siguiendo el orden del plano: primero las uniones más críticas (las que definen la geometría base), verificar escuadra y nivel antes de que los adhesivos fragüen o antes de apriete final de tornillos. Usar prensas para mantener la posición durante el fraguado.",
      duracionMin: 180,
      alertaSeg: "Si el ensamblaje requiere taladro: verificar sujeción de piezas con prensa antes de taladrar. Si requiere soldadura: EPP de soldador completo."
    },
    {
      numero: 3,
      titulo: "Verificación estructural del ensamble",
      descripcion: "Antes de que el adhesivo fragüe completamente: verificar cuadrado (diagonal igual en ambas diagonales), nivel, planeidad. Corregir si es necesario. Documentar con fotografía el ensamble verificado.",
      duracionMin: 60
    },
    {
      numero: 4,
      titulo: "Ajustes y correcciones menores",
      descripcion: "Con la estructura ensamblada, identificar y corregir imperfecciones menores: cantos vivos, exceso de cola, pequeñas desalineaciones. Lijar los cantos y superficies para preparar para el acabado.",
      duracionMin: 60
    },
    {
      numero: 5,
      titulo: "Documentación y cierre",
      descripcion: "Fotografiar la estructura ensamblada desde múltiples ángulos. Completar el registro de ensamblaje. Limpiar la zona de trabajo. Preparar el cronograma de la sesión de acabados.",
      duracionMin: 30
    }
  ],
  entregable: {
    nombre: "Estructura Ensamblada del Proyecto",
    descripcion: "Estructura física ensamblada, verificada en escuadra y nivel. Registro fotográfico del proceso de armado (mínimo 6 fotos en diferentes etapas). Ficha de verificación de escuadra y planeidad completada.",
    formatoEntrega: "Pieza física + documentación digital enviada al LXP"
  },
  criteriosEvaluacion: [
    { indicador: "Precisión del ensamblaje", puntaje: 40, descripcionLogro: "Estructura escuadrada y nivelada, dentro de la tolerancia del diseño" },
    { indicador: "Calidad de las uniones", puntaje: 30, descripcionLogro: "Uniones sólidas, limpias, sin exceso de material y alineadas correctamente" },
    { indicador: "Autonomía en el proceso", puntaje: 20, descripcionLogro: "El participante gestiona su propio proceso sin asistencia constante del docente" },
    { indicador: "Documentación", puntaje: 10, descripcionLogro: "Registro fotográfico completo del proceso de armado" }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// M4 · PRÁCTICA — Acabados y Sistema de Gestión del Taller
// ─────────────────────────────────────────────────────────────────────────────
export const guiaM4AcabadosGestion: GuiaActividad = {
  id: "guia-m4-acabados",
  modulo: "m4",
  sesion: "M4-P1",
  titulo: "Práctica M4 — Acabados y Primer Sistema de Gestión del Taller",
  subtitulo: "Sesión presencial · 7 horas · Nivel: Semi-autónoma → Autónoma",
  descripcion: "Sesión dual: primera mitad dedicada a aplicar acabados al proyecto integrador en la Zona de Acabados; segunda mitad para implementar el primer sistema de gestión del almacén aplicando la metodología 5S en el almacén real del taller.",
  objetivo: "Aplicar correctamente los acabados superficiales al proyecto en proceso Y diseñar e implementar el sistema de organización 5S en el almacén del taller propio, con la documentación de inventario correspondiente.",
  duracionTotalMin: 420,
  modalidad: "presencial",
  nivel: "semi-autonoma",
  grupoTrabajo: "individual",
  prerequisitos: [
    "Haber completado M4 secciones 4.1 a 4.5 en el LXP",
    "Haber aprobado el Quiz de Acabados y Almacén (mínimo 75%)",
    "Tener la estructura del proyecto ensamblada y lista para acabados"
  ],
  materialesDocente: [
    "Muestras de acabados: sellador, barniz, laca — diferentes tipos",
    "Fichas de seguridad de cada producto de acabado a usar",
    "Modelo de kardex de inventario completado para referencia"
  ],
  materialesEstudiante: [
    "Estructura del proyecto (de la práctica M3-N2)",
    "Kit de acabados según el material del proyecto",
    "Lija: grano 120, 180 y 220",
    "Cámara o teléfono para documentar el proceso de 5S"
  ],
  eppRequerido: [
    "En zona de acabados: respirador con filtro para vapores orgánicos + lentes antiparra + mameluco + guantes nitrilo",
    "Verificar ventilación activa en la cabina de pintura antes de ingresar"
  ],
  pasos: [
    {
      numero: 1,
      titulo: "Preparación de superficies para el acabado",
      descripcion: "Lijar la estructura completa en secuencia: grano 120 para eliminar imperfecciones, grano 180 para suavizar, grano 220 para preparar la superficie final. Limpiar el polvo con trapo ligeramente húmedo y dejar secar.",
      duracionMin: 60,
      recursos: ["Lijadora orbital + lija a mano para zonas interiores", "Mascarilla para polvo de madera"]
    },
    {
      numero: 2,
      titulo: "Aplicación del sellador / fondo (primera mano)",
      descripcion: "En la cabina de pintura o zona ventilada: con EPP completo colocado, aplicar la primera mano de sellador en la dirección de la fibra, con movimientos uniformes. Dejar secar el tiempo especificado por el fabricante.",
      duracionMin: 45,
      alertaSeg: "Verificar que la ventilación de la cabina esté encendida ANTES de abrir el envase de sellador. El respirador debe estar puesto antes de abrir el envase."
    },
    {
      numero: 3,
      titulo: "Lijado entre manos y segunda mano de acabado",
      descripcion: "Lijar suavemente con grano 220 la primera mano de sellador (la lijada entre manos mejora la adhesión). Aplicar la segunda mano del producto de acabado final (barniz, laca o pintura según el proyecto).",
      duracionMin: 45
    },
    {
      numero: 4,
      titulo: "Limpieza de equipos de acabado",
      descripcion: "Limpiar inmediatamente la pistola o brocha con el solvente correspondiente. Un equipo de acabado no limpiado queda inutilizable. Cerrar todos los envases, verificar que no haya trapos con solvente expuestos al aire (riesgo de combustión espontánea).",
      duracionMin: 30,
      alertaSeg: "Los trapos con solvente o pintura no se tiran en la papelera normal — pueden causar incendio por combustión espontánea. Remojarlos en agua antes de desechar."
    },
    {
      numero: 5,
      titulo: "PARTE 2: Diagnóstico 5S del almacén propio",
      descripcion: "Usar el resto de la sesión en el almacén del propio taller del participante (o en el taller de práctica). Aplicar la primera S: Clasificar — separar lo necesario de lo innecesario. Fotografiar el estado ANTES del proceso. Hacer una lista de bienes a relocalizar o dar de baja.",
      duracionMin: 90
    },
    {
      numero: 6,
      titulo: "Implementación de Seiton (Ordenar) y documentación",
      descripcion: "Asignar un lugar a cada bien. Etiquetar espacios. Registrar la nueva organización con fotografías 'después'. Elaborar la ficha de inventario rápido de los bienes del almacén con código, nombre, estado y ubicación.",
      duracionMin: 120
    },
    {
      numero: 7,
      titulo: "Registro y presentación del sistema implementado",
      descripcion: "Documentar el sistema implementado: fotos antes/después, mapa del almacén con la nueva organización, lista de bienes inventariados. Presentar brevemente al coordinador.",
      duracionMin: 30
    }
  ],
  entregable: {
    nombre: "Proyecto con Acabado + Sistema 5S Implementado",
    descripcion: "1) Proyecto con al menos 2 manos de acabado aplicadas correctamente. 2) Álbum fotográfico del proceso 5S (antes/después). 3) Mapa del almacén con nueva organización. 4) Lista de inventario con mínimo 20 bienes registrados.",
    formatoEntrega: "Proyecto físico verificado + carpeta digital de documentación 5S enviada al LXP"
  },
  criteriosEvaluacion: [
    { indicador: "Calidad del acabado", puntaje: 30, descripcionLogro: "Acabado uniforme, sin burbujas ni goteos, con 2 manos correctamente aplicadas" },
    { indicador: "Seguridad en zona de acabados", puntaje: 25, descripcionLogro: "EPP completo, ventilación activa, limpieza correcta de equipos al finalizar" },
    { indicador: "Implementación 5S", puntaje: 30, descripcionLogro: "Almacén organizado con criterios 5S visibles, etiquetado y fotografías antes/después" },
    { indicador: "Inventario documentado", puntaje: 15, descripcionLogro: "Lista de inventario con mínimo 20 bienes con código, nombre y estado" }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// M5 · ENTREGABLE — Unidad Didáctica Completa
// ─────────────────────────────────────────────────────────────────────────────
export const guiaM5UnidadDidactica: GuiaActividad = {
  id: "guia-m5-ud",
  modulo: "m5",
  sesion: "M5-E1",
  titulo: "Entregable M5 — Diseño de Unidad Didáctica Completa por Competencias",
  subtitulo: "Actividad asincrónica · 3 horas · Nivel: Autónoma",
  descripcion: "Entregable final del Módulo 5: el participante diseña una Unidad Didáctica completa para su especialidad, con enfoque por competencias, integración del taller como espacio pedagógico y sistema de evaluación. Este documento demuestra la apropiación del enfoque pedagógico del programa.",
  objetivo: "Diseñar una Unidad Didáctica completa y funcional para su especialidad que integre: situación significativa del sector productivo, competencias del CNOF, secuencia de sesiones de aprendizaje con uso del taller, y sistema de evaluación por desempeño.",
  duracionTotalMin: 180,
  modalidad: "presencial",
  nivel: "autonoma",
  grupoTrabajo: "individual",
  prerequisitos: [
    "Haber completado todo el Módulo M5 (secciones 5.1 a 5.9)",
    "Haber participado en las 3 sesiones sincrónicas de M5",
    "Conocer el CNOF de su especialidad y las competencias de su ciclo"
  ],
  materialesDocente: [
    "Ejemplo de Unidad Didáctica completada de otra especialidad (para referencia)",
    "CNOF digital de cada especialidad",
    "Retroalimentación individual de las sesiones sincrónicas M5.7, M5.8 y M5.9"
  ],
  materialesEstudiante: [
    "Plantilla de Unidad Didáctica (descargable del LXP M5)",
    "CNOF de su especialidad (PDF descargable del LXP)",
    "Notas y aprendizajes de las sesiones sincrónicas del módulo 5"
  ],
  eppRequerido: [],
  pasos: [
    {
      numero: 1,
      titulo: "Selección del elemento de competencia y la situación significativa",
      descripcion: "Revisar el CNOF de tu especialidad. Seleccionar UN elemento de competencia que puedas desarrollar con los equipos de tu taller. Diseñar la situación significativa: un problema real del sector productivo que motive el aprendizaje de ese elemento. Escribir la situación en 3-5 líneas siguiendo los criterios del Manual de Planificación (M5).",
      duracionMin: 30,
      recursos: ["CNOF de la especialidad", "Manual de Planificación Pedagógica (descargable M5)"]
    },
    {
      numero: 2,
      titulo: "Definición del propósito y los criterios de evaluación",
      descripcion: "Redactar el propósito de la unidad: qué competencia y capacidad específica desarrollarán los estudiantes. Definir los criterios de evaluación: indicadores observables que permiten saber si el propósito se logró. Diseñar el instrumento de evaluación (rúbrica o lista de cotejo).",
      duracionMin: 30
    },
    {
      numero: 3,
      titulo: "Diseño de la secuencia de aprendizaje (4-6 sesiones)",
      descripcion: "Planificar la secuencia de sesiones: primera sesión de introducción y motivación, sesiones intermedias de práctica progresiva (guiada → semi-autónoma → autónoma), sesión de evaluación y cierre. Para cada sesión: propósito parcial, actividades principales, recursos del taller a usar, tiempo estimado.",
      duracionMin: 60
    },
    {
      numero: 4,
      titulo: "Integración del taller como espacio pedagógico",
      descripcion: "Revisar la secuencia diseñada y verificar: ¿los equipos del taller se usan como medios de aprendizaje (no solo como herramientas de producción)? ¿Hay una progresión de complejidad en el uso del equipamiento? ¿La seguridad está integrada como protocolo antes de cada práctica?",
      duracionMin: 30
    },
    {
      numero: 5,
      titulo: "Revisión final y auto-verificación",
      descripcion: "Leer la unidad completa con los ojos de otro docente: ¿podría planificar sus sesiones usando este documento? Verificar el alineamiento: situación significativa → competencia → actividades → evaluación. Completar cualquier sección faltante.",
      duracionMin: 30
    }
  ],
  entregable: {
    nombre: "Unidad Didáctica Completa — Especialidad EPT",
    descripcion: "Documento completo con: datos de identificación, situación significativa, propósito, criterios de evaluación, secuencia de 4-6 sesiones con actividades y recursos del taller, instrumento de evaluación (rúbrica o lista de cotejo) y reflexión sobre la integración del taller como espacio pedagógico.",
    formatoEntrega: "PDF enviado al LXP en la sección M5-E1 o enviado al coordinador del programa"
  },
  criteriosEvaluacion: [
    { indicador: "Alineamiento curricular", puntaje: 25, descripcionLogro: "La unidad está claramente alineada con un elemento de competencia del CNOF de la especialidad" },
    { indicador: "Situación significativa", puntaje: 20, descripcionLogro: "La situación conecta con el sector productivo real y es motivadora para los estudiantes" },
    { indicador: "Secuencia pedagógica", puntaje: 25, descripcionLogro: "La progresión de sesiones sigue la lógica guiada → semi-autónoma → autónoma con uso del taller" },
    { indicador: "Evaluación por competencias", puntaje: 20, descripcionLogro: "Los criterios de evaluación son observables y el instrumento diseñado es aplicable" },
    { indicador: "Integración del taller", puntaje: 10, descripcionLogro: "Los equipos del taller aparecen como recursos pedagógicos en al menos 3 sesiones de la unidad" }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTACIÓN CONSOLIDADA
// ─────────────────────────────────────────────────────────────────────────────
export const guiasActividad: GuiaActividad[] = [
  guiaM1VisitaPresencial,
  guiaM2Practica1,
  guiaM2Practica2,
  guiaM3NivelACorte,
  guiaM3NivelBDigital,
  guiaM3Nivel2Armado,
  guiaM4AcabadosGestion,
  guiaM5UnidadDidactica
]

export const getGuiasByModulo = (moduloId: string): GuiaActividad[] =>
  guiasActividad.filter(g => g.modulo === moduloId)

export const getGuiaById = (id: string): GuiaActividad | undefined =>
  guiasActividad.find(g => g.id === id)

export const getGuiaBySesion = (sesionId: string): GuiaActividad | undefined =>
  guiasActividad.find(g => g.sesion === sesionId)
