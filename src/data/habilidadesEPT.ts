// src/data/habilidadesEPT.ts
// 14 Habilidades EPT × Equipamiento — 9 talleres TSF/MINEDU

export interface HabilidadEPT {
  id: string
  nombre: string
  descripcion: string
  color: string
  icono: string
}

export interface GrupoEquipamiento {
  id: string
  nombre: string
  zona: 'investigacion' | 'innovacion' | 'acabados' | 'almacen'
  equiposEjemplo: string[]
  habilidades: string[]   // IDs de HabilidadEPT
  descripcion?: string
}

// ── Las 14 habilidades ────────────────────────────────────────────────────
export const HABILIDADES_EPT: HabilidadEPT[] = [
  { id: "h1",  icono: "🔍", nombre: "Investigación e Indagación",
    descripcion: "Identificar necesidades, explorar el entorno y formular preguntas técnicas",
    color: "#0891b2" },
  { id: "h2",  icono: "✏️", nombre: "Diseño y Creatividad",
    descripcion: "Crear soluciones originales, prototipar ideas y desarrollar propuestas visuales",
    color: "#8b5cf6" },
  { id: "h3",  icono: "🔧", nombre: "Fabricación y Producción",
    descripcion: "Ejecutar procesos productivos con precisión técnica y calidad",
    color: "#00c16e" },
  { id: "h4",  icono: "💻", nombre: "Uso de Tecnología",
    descripcion: "Operar equipos digitales y software con destreza técnica",
    color: "#045f6c" },
  { id: "h5",  icono: "📝", nombre: "Documentación Técnica",
    descripcion: "Registrar procesos, elaborar fichas e informes técnicos",
    color: "#475569" },
  { id: "h6",  icono: "🛡️", nombre: "Seguridad Laboral",
    descripcion: "Prevenir riesgos, aplicar EPP y protocolos de seguridad",
    color: "#ef4444" },
  { id: "h7",  icono: "⚙️", nombre: "Mantenimiento de Equipos",
    descripcion: "Preservar y mantener el equipamiento en óptimas condiciones",
    color: "#f59e0b" },
  { id: "h8",  icono: "📦", nombre: "Gestión del Taller",
    descripcion: "Organizar el espacio, recursos y sistema de almacén",
    color: "#ca8a04" },
  { id: "h9",  icono: "🤝", nombre: "Trabajo en Equipo",
    descripcion: "Colaborar en proyectos, distribuir roles y construir colectivamente",
    color: "#6d28d9" },
  { id: "h10", icono: "🔩", nombre: "Resolución de Problemas",
    descripcion: "Diagnosticar fallas, analizar causas y aplicar soluciones técnicas",
    color: "#0369a1" },
  { id: "h11", icono: "✅", nombre: "Control de Calidad",
    descripcion: "Verificar estándares, inspeccionar resultados y garantizar la calidad",
    color: "#15803d" },
  { id: "h12", icono: "💡", nombre: "Emprendimiento",
    descripcion: "Generar valor, identificar oportunidades y desarrollar propuestas de negocio",
    color: "#d97706" },
  { id: "h13", icono: "📣", nombre: "Comunicación de Proyectos",
    descripcion: "Presentar, defender y comunicar resultados técnicos y creativos",
    color: "#db2777" },
  { id: "h14", icono: "🌱", nombre: "Sostenibilidad",
    descripcion: "Usar recursos de forma responsable y minimizar el impacto ambiental",
    color: "#16a34a" },
]

// ── Grupos por taller ─────────────────────────────────────────────────────

const COMUN_INVESTIGACION: GrupoEquipamiento = {
  id: "g-inv", nombre: "Zona de Investigación y Diseño",
  zona: "investigacion",
  equiposEjemplo: ["Cámara fotográfica", "Filmadora con trípode", "Tablet", "Equipo de grabación"],
  habilidades: ["h1", "h4", "h5", "h9", "h13"],
  descripcion: "Equipos comunes a todos los talleres para identificar necesidades y documentar"
}

const COMUN_SOFTWARE: GrupoEquipamiento = {
  id: "g-sw", nombre: "Software y Diseño Digital",
  zona: "investigacion",
  equiposEjemplo: ["Computadora", "Software CAD/diseño", "Pizarra táctil", "Impresora"],
  habilidades: ["h2", "h4", "h5", "h12", "h13"],
  descripcion: "Herramientas digitales para diseñar, planificar y comunicar proyectos"
}

// ─────────────────────────────────────────────────────────────────────────
// EBANISTERÍA
// ─────────────────────────────────────────────────────────────────────────
const gruposEbanisteria: GrupoEquipamiento[] = [
  COMUN_INVESTIGACION,
  COMUN_SOFTWARE,
  { id: "eb-corte", nombre: "Máquinas de Corte y Habilitado",
    zona: "innovacion",
    equiposEjemplo: ["Sierra circular", "Sierra radial", "Garlopa", "Regruesadora"],
    habilidades: ["h3", "h6", "h10", "h11"],
    descripcion: "Máquinas para dimensionar madera con precisión" },
  { id: "eb-digital", nombre: "Fabricación Digital",
    zona: "innovacion",
    equiposEjemplo: ["Cortadora láser", "Router CNC", "Impresora 3D"],
    habilidades: ["h2", "h3", "h4", "h11", "h12"],
    descripcion: "Equipos de fabricación por control numérico y digital" },
  { id: "eb-formado", nombre: "Máquinas de Formado",
    zona: "innovacion",
    equiposEjemplo: ["Torno de madera", "Sierra cinta", "Caladora", "Taladro de banco"],
    habilidades: ["h3", "h9", "h10", "h11"],
    descripcion: "Máquinas para dar formas complejas y perforaciones de precisión" },
  { id: "eb-manuales", nombre: "Herramientas Manuales",
    zona: "innovacion",
    equiposEjemplo: ["Formones", "Gubias", "Escofinas", "Cepillo manual"],
    habilidades: ["h3", "h9", "h11"],
    descripcion: "Herramientas de tallado y acabado manual con filo" },
  { id: "eb-acabados", nombre: "Zona de Acabados",
    zona: "acabados",
    equiposEjemplo: ["Cabina de pintura", "Lijadoras", "Compresor", "Enchapadora"],
    habilidades: ["h3", "h6", "h11", "h12"],
    descripcion: "Equipos para aplicar acabados superficiales de calidad" },
  { id: "eb-almacen", nombre: "Almacén y Gestión",
    zona: "almacen",
    equiposEjemplo: ["Estantes de madera/tableros", "Medidor de humedad", "Bitácora", "Señalización"],
    habilidades: ["h7", "h8", "h14"],
    descripcion: "Sistema de organización, control de stock y mantenimiento" },
]

// ─────────────────────────────────────────────────────────────────────────
// MECÁNICA AUTOMOTRIZ
// ─────────────────────────────────────────────────────────────────────────
const gruposMecanicaAutomotriz: GrupoEquipamiento[] = [
  COMUN_INVESTIGACION,
  COMUN_SOFTWARE,
  { id: "ma-diagnostico", nombre: "Diagnóstico y Electrónica",
    zona: "investigacion",
    equiposEjemplo: ["Scanner automotriz", "Multímetro", "Polígrafo", "Computadora de diagnóstico"],
    habilidades: ["h1", "h4", "h10", "h11"],
    descripcion: "Equipos para diagnóstico electrónico del vehículo" },
  { id: "ma-taller", nombre: "Equipos de Taller y Levantamiento",
    zona: "innovacion",
    equiposEjemplo: ["Elevador hidráulico", "Gato tipo lagarto", "Banco de trabajo", "Compresor"],
    habilidades: ["h3", "h6", "h8", "h10"],
    descripcion: "Equipos para levantamiento seguro y trabajo en taller" },
  { id: "ma-maquinas", nombre: "Máquinas Herramienta",
    zona: "innovacion",
    equiposEjemplo: ["Torno mecánico", "Esmeril de banco", "Taladro de banco", "Rectificadora"],
    habilidades: ["h3", "h6", "h10", "h11"],
    descripcion: "Maquinado y fabricación de piezas de precisión" },
  { id: "ma-soldadura", nombre: "Soldadura y Unión",
    zona: "innovacion",
    equiposEjemplo: ["Soldadora MIG", "Soldadora TIG", "Equipo oxiacetilénico", "Amoladora"],
    habilidades: ["h3", "h6", "h11", "h12"],
    descripcion: "Procesos de unión y corte de metales" },
  { id: "ma-sistemas", nombre: "Sistemas del Vehículo",
    zona: "innovacion",
    equiposEjemplo: ["Kit sistema de frenos", "Kit suspensión", "Kit motor didáctico", "Transmisión"],
    habilidades: ["h3", "h9", "h10", "h11"],
    descripcion: "Equipos para revisar y reparar sistemas del vehículo" },
  { id: "ma-almacen", nombre: "Almacén y Fluidos",
    zona: "almacen",
    equiposEjemplo: ["Estantes herramientas", "Almacén de fluidos", "Lavadero", "EPP"],
    habilidades: ["h7", "h8", "h14"],
    descripcion: "Gestión de herramientas, fluidos y residuos del taller" },
]

// ─────────────────────────────────────────────────────────────────────────
// COCINA Y REPOSTERÍA
// ─────────────────────────────────────────────────────────────────────────
const gruposCocinaReposteria: GrupoEquipamiento[] = [
  COMUN_INVESTIGACION,
  COMUN_SOFTWARE,
  { id: "cr-prep", nombre: "Preparación y Mise en Place",
    zona: "innovacion",
    equiposEjemplo: ["Tabla de corte", "Cuchillos profesionales", "Mandolina", "Balanzas"],
    habilidades: ["h3", "h6", "h11"],
    descripcion: "Equipos para preparación y medición de ingredientes" },
  { id: "cr-coccion", nombre: "Cocción y Horneado",
    zona: "innovacion",
    equiposEjemplo: ["Cocina industrial", "Horno combinado", "Freidora", "Plancha a gas"],
    habilidades: ["h3", "h6", "h11", "h12"],
    descripcion: "Equipos de cocción con calor seco y húmedo" },
  { id: "cr-procesado", nombre: "Procesamiento y Batido",
    zona: "innovacion",
    equiposEjemplo: ["Batidora industrial", "Amasadora", "Licuadora industrial", "Procesador"],
    habilidades: ["h3", "h4", "h10", "h11"],
    descripcion: "Equipos para transformación mecánica de ingredientes" },
  { id: "cr-conservacion", nombre: "Conservación y Refrigeración",
    zona: "almacen",
    equiposEjemplo: ["Cámara frigorífica", "Congelador", "Selladora al vacío", "Termómetro"],
    habilidades: ["h3", "h8", "h11", "h14"],
    descripcion: "Control de temperatura y conservación de alimentos" },
  { id: "cr-presentacion", nombre: "Presentación y Emprendimiento",
    zona: "acabados",
    equiposEjemplo: ["Moldes decorativos", "Airbrush", "Mangas pasteleras", "Display productos"],
    habilidades: ["h2", "h11", "h12", "h13"],
    descripcion: "Técnicas de presentación y comercialización de productos" },
]

// ─────────────────────────────────────────────────────────────────────────
// INDUSTRIA DEL VESTIDO
// ─────────────────────────────────────────────────────────────────────────
const gruposIndustriaVestido: GrupoEquipamiento[] = [
  COMUN_INVESTIGACION,
  COMUN_SOFTWARE,
  { id: "iv-diseno", nombre: "Diseño y Patronaje",
    zona: "innovacion",
    equiposEjemplo: ["Mesa de diseño", "Reglas de patronaje", "Escuadras", "Software de patronaje"],
    habilidades: ["h1", "h2", "h4", "h5", "h12"],
    descripcion: "Herramientas para crear y digitalizar patrones" },
  { id: "iv-corte", nombre: "Corte de Telas",
    zona: "innovacion",
    equiposEjemplo: ["Cortadora circular", "Tijeras de sastre", "Mesa de corte", "Cinta de tiza"],
    habilidades: ["h3", "h6", "h11"],
    descripcion: "Equipos para cortar telas con precisión" },
  { id: "iv-confeccion", nombre: "Confección Industrial",
    zona: "innovacion",
    equiposEjemplo: ["Máq. de coser recta industrial", "Remalladora/overlock", "Bordadora"],
    habilidades: ["h3", "h4", "h9", "h11"],
    descripcion: "Máquinas de costura y confección a ritmo industrial" },
  { id: "iv-acabados", nombre: "Acabados y Presentación",
    zona: "acabados",
    equiposEjemplo: ["Plancha industrial", "Termofijadora", "Maniquíes", "Vaporizador"],
    habilidades: ["h3", "h6", "h11", "h12"],
    descripcion: "Equipos para acabados de calidad y presentación de prendas" },
]

// ─────────────────────────────────────────────────────────────────────────
// COMPUTACIÓN E INFORMÁTICA
// ─────────────────────────────────────────────────────────────────────────
const gruposComputacionInformatica: GrupoEquipamiento[] = [
  COMUN_INVESTIGACION,
  COMUN_SOFTWARE,
  { id: "ci-media", nombre: "Producción Audiovisual",
    zona: "innovacion",
    equiposEjemplo: ["Dron", "Green screen", "Micrófono estudio", "Cámara reflex"],
    habilidades: ["h2", "h4", "h13"],
    descripcion: "Equipos para crear contenido audiovisual de calidad" },
  { id: "ci-programacion", nombre: "Programación y Desarrollo Web",
    zona: "innovacion",
    equiposEjemplo: ["Laptop programación", "Servidor local", "Kit Arduino/Raspberry", "IDE"],
    habilidades: ["h2", "h4", "h10", "h12"],
    descripcion: "Herramientas de desarrollo de software y automatización" },
  { id: "ci-redes", nombre: "Redes y Hardware",
    zona: "innovacion",
    equiposEjemplo: ["Kit de conectividad", "Switch/Router", "Cables RJ45", "Herramientas de red"],
    habilidades: ["h3", "h4", "h8", "h10"],
    descripcion: "Instalación y mantenimiento de redes y equipos" },
  { id: "ci-impresion", nombre: "Impresión 3D y Fabricación Digital",
    zona: "innovacion",
    equiposEjemplo: ["Impresora 3D", "Scanner 3D", "Software de modelado", "Filamentos"],
    habilidades: ["h2", "h3", "h4", "h12"],
    descripcion: "Prototipado rápido y fabricación de objetos digitales" },
]

// ─────────────────────────────────────────────────────────────────────────
// ELECTRÓNICA
// ─────────────────────────────────────────────────────────────────────────
const gruposElectronica: GrupoEquipamiento[] = [
  COMUN_INVESTIGACION,
  COMUN_SOFTWARE,
  { id: "el-medicion", nombre: "Instrumentos de Medición",
    zona: "investigacion",
    equiposEjemplo: ["Osciloscopio digital", "Multímetro", "Generador de señales", "Analizador de espectro"],
    habilidades: ["h1", "h4", "h5", "h10"],
    descripcion: "Instrumentos para medir y analizar señales eléctricas" },
  { id: "el-disenio", nombre: "Diseño de Circuitos",
    zona: "investigacion",
    equiposEjemplo: ["Software EDA (KiCad/Proteus)", "Computadora", "Impresión de PCB"],
    habilidades: ["h2", "h4", "h5"],
    descripcion: "Herramientas para diseñar y simular circuitos" },
  { id: "el-fabricacion", nombre: "Fabricación de PCB y Montaje",
    zona: "innovacion",
    equiposEjemplo: ["Soldadora de estaño", "Taladro PCB", "Extractor humos", "Pinzas SMD"],
    habilidades: ["h3", "h6", "h11"],
    descripcion: "Montaje y soldadura de componentes electrónicos" },
  { id: "el-automatizacion", nombre: "Automatización y Microcontroladores",
    zona: "innovacion",
    equiposEjemplo: ["Arduino/ESP32", "Sensores y actuadores", "Motor stepper", "Módulos IoT"],
    habilidades: ["h2", "h3", "h4", "h10", "h12"],
    descripcion: "Diseño de sistemas automáticos y dispositivos IoT" },
  { id: "el-potencia", nombre: "Electrónica de Potencia y Fuentes",
    zona: "innovacion",
    equiposEjemplo: ["Fuente de alimentación variable", "Transformadores", "Reguladores"],
    habilidades: ["h4", "h6", "h10"],
    descripcion: "Manejo de fuentes y circuitos de potencia" },
]

// ─────────────────────────────────────────────────────────────────────────
// INDUSTRIA ALIMENTARIA
// ─────────────────────────────────────────────────────────────────────────
const gruposIndustriaAlimentaria: GrupoEquipamiento[] = [
  COMUN_INVESTIGACION,
  COMUN_SOFTWARE,
  { id: "ia-analisis", nombre: "Análisis y Control de Calidad",
    zona: "investigacion",
    equiposEjemplo: ["Balanza de precisión", "pHmetro", "Refractómetro (Brix)", "Termómetro"],
    habilidades: ["h1", "h4", "h5", "h11"],
    descripcion: "Instrumentos para análisis físico-químico de alimentos" },
  { id: "ia-procesado", nombre: "Procesamiento y Transformación",
    zona: "innovacion",
    equiposEjemplo: ["Cocina semi-industrial", "Marmita", "Molino/pulpeadora", "Licuadora industrial"],
    habilidades: ["h3", "h4", "h6", "h11"],
    descripcion: "Equipos para transformación y procesamiento de alimentos" },
  { id: "ia-conservacion", nombre: "Conservación y Esterilización",
    zona: "innovacion",
    equiposEjemplo: ["Autoclave", "Selladora al vacío", "Cámara frigorífica", "Pasteurizador"],
    habilidades: ["h3", "h8", "h11", "h14"],
    descripcion: "Procesos de conservación y aumento de vida útil" },
  { id: "ia-empaque", nombre: "Empaque y Presentación Comercial",
    zona: "acabados",
    equiposEjemplo: ["Selladora de bolsas", "Etiquetadora", "Empaque al vacío", "Balanza rotuladora"],
    habilidades: ["h2", "h11", "h12", "h13"],
    descripcion: "Empaque, etiquetado y presentación para la venta" },
]

// ─────────────────────────────────────────────────────────────────────────
// ELECTRICIDAD
// ─────────────────────────────────────────────────────────────────────────
const gruposElectricidad: GrupoEquipamiento[] = [
  COMUN_INVESTIGACION,
  COMUN_SOFTWARE,
  { id: "elec-medicion", nombre: "Medición e Instrumentación",
    zona: "investigacion",
    equiposEjemplo: ["Multímetro digital", "Pinza amperimétrica", "Medidor de energía", "Telurómetro"],
    habilidades: ["h1", "h4", "h5", "h10"],
    descripcion: "Instrumentos para medir parámetros eléctricos" },
  { id: "elec-renovable", nombre: "Energías Renovables",
    zona: "investigacion",
    equiposEjemplo: ["Kit solar fotovoltaico", "Kit eólico", "Inversor", "Banco de baterías"],
    habilidades: ["h1", "h4", "h12", "h14"],
    descripcion: "Sistemas de generación de energía limpia" },
  { id: "elec-instalaciones", nombre: "Instalaciones Eléctricas",
    zona: "innovacion",
    equiposEjemplo: ["Kit cableado", "Tablero de entrenamiento", "Canaletas y cajas", "Taladro"],
    habilidades: ["h3", "h6", "h10", "h11"],
    descripcion: "Montaje y conexión de circuitos e instalaciones" },
  { id: "elec-automatizacion", nombre: "Automatización y Control",
    zona: "innovacion",
    equiposEjemplo: ["PLC didáctico", "Sensores", "Actuadores", "Pantalla HMI"],
    habilidades: ["h2", "h4", "h10", "h12"],
    descripcion: "Sistemas de control automático aplicado" },
]

// ─────────────────────────────────────────────────────────────────────────
// CONSTRUCCIONES METÁLICAS
// ─────────────────────────────────────────────────────────────────────────
const gruposConstruccionesMetalicas: GrupoEquipamiento[] = [
  COMUN_INVESTIGACION,
  COMUN_SOFTWARE,
  { id: "cm-corte", nombre: "Corte y Habilitado Metálico",
    zona: "innovacion",
    equiposEjemplo: ["Cortadora láser CO2", "Amoladora angular", "Sierra cinta metálica", "Plasma"],
    habilidades: ["h3", "h6", "h11", "h12"],
    descripcion: "Equipos para cortar y habilitar piezas metálicas" },
  { id: "cm-soldadura", nombre: "Soldadura y Unión",
    zona: "innovacion",
    equiposEjemplo: ["Soldadora MIG/TIG", "Equipo oxiacetilénico", "Soldadora arco eléctrico"],
    habilidades: ["h3", "h6", "h9", "h11"],
    descripcion: "Procesos de soldadura y unión de metales" },
  { id: "cm-conformado", nombre: "Conformado y Maquinado",
    zona: "innovacion",
    equiposEjemplo: ["Torno metálico", "Taladro de columna", "Dobladora", "Curvadora de tubos"],
    habilidades: ["h3", "h10", "h11"],
    descripcion: "Máquinas para dar forma a piezas metálicas con precisión" },
  { id: "cm-digital", nombre: "Fabricación Digital y CNC",
    zona: "innovacion",
    equiposEjemplo: ["Cortadora láser", "Router CNC", "Impresora 3D industrial"],
    habilidades: ["h2", "h3", "h4", "h12"],
    descripcion: "Fabricación asistida por computadora para metales y plásticos" },
  { id: "cm-acabados", nombre: "Acabados Metálicos",
    zona: "acabados",
    equiposEjemplo: ["Esmeril de banco", "Pulidora", "Pintura en spray", "Granalladora"],
    habilidades: ["h3", "h11", "h12"],
    descripcion: "Procesos de acabado superficial y protección de metales" },
]

// ── Mapa principal ────────────────────────────────────────────────────────

const gruposTallerGeneralEPT: GrupoEquipamiento[] = [
  { id: 'tge-inv', nombre: 'TICs y Recursos Pedagógicos', zona: 'investigacion', equiposEjemplo: ['Computadora', 'Tablet', 'Cámara fotográfica'], habilidades: ['h1','h2','h5','h8'] },
  { id: 'tge-inn', nombre: 'Fabricación Digital', zona: 'innovacion', equiposEjemplo: ['Impresora 3D', 'Cortadora Láser', 'Escáner 3D'], habilidades: ['h3','h6','h9','h11'] },
]

export const GRUPOS_POR_TALLER: Record<string, GrupoEquipamiento[]> = {
  "ebanisteria":             gruposEbanisteria,
  "mecanica-automotriz":     gruposMecanicaAutomotriz,
  "cocina-reposteria":       gruposCocinaReposteria,
  "industria-vestido":       gruposIndustriaVestido,
  "computacion-informatica": gruposComputacionInformatica,
  "electronica":             gruposElectronica,
  "industria-alimentaria":   gruposIndustriaAlimentaria,
  "electricidad":            gruposElectricidad,
  "construcciones-metalicas":gruposConstruccionesMetalicas,
}

export const getGruposByTaller = (slug: string): GrupoEquipamiento[] =>
  GRUPOS_POR_TALLER[slug] ?? []
