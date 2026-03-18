// src/data/progresionGrados.ts
// Tabla de Progresión por Grado (1°–5°) × Taller — 9 talleres TSF/MINEDU

export interface ItemProgresion {
  grado: string         // "1°" … "5°"
  nivel: string         // "Iniciación" … "Proyecto"
  color: string         // accent hex
  descripcionGrado: string
  equiposFoco: string[]       // grupos de equipamiento principales
  habilidadesClave: string[]  // IDs de habilidades EPT (h1–h14)
  proyectoEjemplo: string
  producto: string            // entregable concreto
  complejidad: 1 | 2 | 3 | 4 | 5
}

const BASE_GRADOS = ["1°", "2°", "3°", "4°", "5°"]
const NIVELES = ["Iniciación", "Exploración", "Integración", "Profundización", "Proyecto Integrador"]
const COLORES_GRADO = ["#0891b2", "#00c16e", "#f59e0b", "#8b5cf6", "#02d47e"]

// ─────────────────────────────────────────────────────────────────────────
// EBANISTERÍA
// ─────────────────────────────────────────────────────────────────────────
export const progresionEbanisteria: ItemProgresion[] = [
  { grado: "1°", nivel: "Iniciación", color: COLORES_GRADO[0], complejidad: 1,
    descripcionGrado: "Exploración del taller y sus equipos. Uso supervisado de herramientas manuales y zona de investigación.",
    equiposFoco: ["Zona de Investigación y Diseño", "Herramientas Manuales", "Almacén y Gestión"],
    habilidadesClave: ["h1", "h5", "h6", "h8"],
    proyectoEjemplo: "Diagnóstico del entorno y diseño de una pieza simple en madera",
    producto: "Ficha de diagnóstico + porta objetos en madera lijada" },
  { grado: "2°", nivel: "Exploración", color: COLORES_GRADO[1], complejidad: 2,
    descripcionGrado: "Primeras operaciones con máquinas de corte bajo supervisión directa. Introducción al diseño en software.",
    equiposFoco: ["Software y Diseño Digital", "Máquinas de Corte y Habilitado", "Herramientas Manuales"],
    habilidadesClave: ["h2", "h3", "h6", "h10"],
    proyectoEjemplo: "Diseño y fabricación de un cajón o caja de herramientas",
    producto: "Caja de madera ensamblada con bisagras y acabado lija" },
  { grado: "3°", nivel: "Integración", color: COLORES_GRADO[2], complejidad: 3,
    descripcionGrado: "Combinación de máquinas de corte, formado y software CAD. Primeros proyectos de diseño propio.",
    equiposFoco: ["Software y Diseño Digital", "Máquinas de Corte y Habilitado", "Máquinas de Formado", "Zona de Acabados"],
    habilidadesClave: ["h2", "h3", "h9", "h11"],
    proyectoEjemplo: "Diseño en CAD y fabricación de un mueble auxiliar (mesa, silla o estante)",
    producto: "Mueble funcional con plano técnico y ficha de proceso" },
  { grado: "4°", nivel: "Profundización", color: COLORES_GRADO[3], complejidad: 4,
    descripcionGrado: "Uso autónomo de fabricación digital (láser/CNC) y aplicación de acabados profesionales.",
    equiposFoco: ["Fabricación Digital", "Zona de Acabados", "Máquinas de Formado"],
    habilidadesClave: ["h2", "h3", "h4", "h11", "h12"],
    proyectoEjemplo: "Producto con componentes de fabricación digital y acabado lacado",
    producto: "Producto con piezas CNC/láser ensambladas + ficha técnica de acabado" },
  { grado: "5°", nivel: "Proyecto Integrador", color: COLORES_GRADO[4], complejidad: 5,
    descripcionGrado: "Proyecto integrador de ciclo completo: diseño, fabricación, acabado y propuesta de emprendimiento.",
    equiposFoco: ["Software y Diseño Digital", "Fabricación Digital", "Máquinas de Corte y Habilitado", "Zona de Acabados"],
    habilidadesClave: ["h2", "h3", "h4", "h11", "h12", "h13"],
    proyectoEjemplo: "Línea de productos de madera con propuesta de emprendimiento y catálogo comercial",
    producto: "3 piezas de una línea + expediente técnico + propuesta de negocio" },
]

// ─────────────────────────────────────────────────────────────────────────
// MECÁNICA AUTOMOTRIZ
// ─────────────────────────────────────────────────────────────────────────
export const progresionMecanicaAutomotriz: ItemProgresion[] = [
  { grado: "1°", nivel: "Iniciación", color: COLORES_GRADO[0], complejidad: 1,
    descripcionGrado: "Reconocimiento del vehículo y sus sistemas. Uso de zona de investigación para documentar.",
    equiposFoco: ["Zona de Investigación y Diseño", "Diagnóstico y Electrónica"],
    habilidadesClave: ["h1", "h5", "h6", "h13"],
    proyectoEjemplo: "Diagnóstico visual y documental de un vehículo real del taller",
    producto: "Informe técnico de diagnóstico con fotografías" },
  { grado: "2°", nivel: "Exploración", color: COLORES_GRADO[1], complejidad: 2,
    descripcionGrado: "Mantenimiento básico supervisado: cambio de aceite, filtros, revisión de niveles.",
    equiposFoco: ["Equipos de Taller y Levantamiento", "Almacén y Fluidos"],
    habilidadesClave: ["h3", "h6", "h7", "h8"],
    proyectoEjemplo: "Mantenimiento preventivo básico de un vehículo",
    producto: "Checklist de mantenimiento completado + bitácora de servicio" },
  { grado: "3°", nivel: "Integración", color: COLORES_GRADO[2], complejidad: 3,
    descripcionGrado: "Revisión de sistemas mecánicos (frenos, suspensión, dirección) y uso de máquinas herramienta.",
    equiposFoco: ["Equipos de Taller y Levantamiento", "Máquinas Herramienta", "Sistemas del Vehículo"],
    habilidadesClave: ["h3", "h9", "h10", "h11"],
    proyectoEjemplo: "Revisión técnica completa de un sistema (frenos o suspensión)",
    producto: "Informe de revisión técnica + piezas reparadas o reemplazadas" },
  { grado: "4°", nivel: "Profundización", color: COLORES_GRADO[3], complejidad: 4,
    descripcionGrado: "Reparación integral incluyendo soldadura, maquinado y diagnóstico electrónico avanzado.",
    equiposFoco: ["Soldadura y Unión", "Máquinas Herramienta", "Diagnóstico y Electrónica"],
    habilidadesClave: ["h3", "h4", "h6", "h10", "h11"],
    proyectoEjemplo: "Reparación de un sistema complejo con reporte técnico detallado",
    producto: "Sistema reparado funcionando + hoja de trabajo técnico" },
  { grado: "5°", nivel: "Proyecto Integrador", color: COLORES_GRADO[4], complejidad: 5,
    descripcionGrado: "Proyecto integrador: diseño de un taller de servicio técnico escolar.",
    equiposFoco: ["Diagnóstico y Electrónica", "Soldadura y Unión", "Máquinas Herramienta", "Sistemas del Vehículo"],
    habilidadesClave: ["h3", "h4", "h8", "h12", "h13"],
    proyectoEjemplo: "Propuesta de taller mecánico escolar con servicios y tarifario",
    producto: "Manual de servicios + portafolio de trabajos + propuesta de negocio" },
]

// ─────────────────────────────────────────────────────────────────────────
// COCINA Y REPOSTERÍA
// ─────────────────────────────────────────────────────────────────────────
export const progresionCocinaReposteria: ItemProgresion[] = [
  { grado: "1°", nivel: "Iniciación", color: COLORES_GRADO[0], complejidad: 1,
    descripcionGrado: "BPM, higiene y técnicas de preparación básica. Mise en place y trabajo seguro con cuchillos.",
    equiposFoco: ["Zona de Investigación y Diseño", "Preparación y Mise en Place"],
    habilidadesClave: ["h1", "h5", "h6", "h9"],
    proyectoEjemplo: "Ensalada o entrada fría con técnicas de corte",
    producto: "Plato terminado + receta técnica documentada" },
  { grado: "2°", nivel: "Exploración", color: COLORES_GRADO[1], complejidad: 2,
    descripcionGrado: "Técnicas de cocción básica: salteado, hervido, horneado. Uso de cocinas y hornos.",
    equiposFoco: ["Preparación y Mise en Place", "Cocción y Horneado"],
    habilidadesClave: ["h3", "h6", "h9", "h11"],
    proyectoEjemplo: "Menú de 2 tiempos (entrada + principal) con técnicas de calor húmedo y seco",
    producto: "Menú completo + hoja de receta estándar" },
  { grado: "3°", nivel: "Integración", color: COLORES_GRADO[2], complejidad: 3,
    descripcionGrado: "Repostería y panadería: masas, batidos y hornos combinados. Uso de amasadora y batidora.",
    equiposFoco: ["Procesamiento y Batido", "Cocción y Horneado", "Presentación y Emprendimiento"],
    habilidadesClave: ["h2", "h3", "h11", "h12"],
    proyectoEjemplo: "Torta decorada con técnicas de repostería y montaje profesional",
    producto: "Producto de repostería + ficha técnica + costeo básico" },
  { grado: "4°", nivel: "Profundización", color: COLORES_GRADO[3], complejidad: 4,
    descripcionGrado: "Cocina de vanguardia y conservación: sellado al vacío, pasteurización, cocina de autor.",
    equiposFoco: ["Cocción y Horneado", "Conservación y Refrigeración", "Presentación y Emprendimiento"],
    habilidadesClave: ["h2", "h3", "h11", "h14"],
    proyectoEjemplo: "Menú degustación de 4 tiempos con técnicas de vanguardia",
    producto: "Menú completo documentado + carta comercial de 6 platos" },
  { grado: "5°", nivel: "Proyecto Integrador", color: COLORES_GRADO[4], complejidad: 5,
    descripcionGrado: "Emprendimiento gastronómico: línea de productos, costeo, empaque y lanzamiento.",
    equiposFoco: ["Cocción y Horneado", "Procesamiento y Batido", "Conservación y Refrigeración", "Presentación y Emprendimiento"],
    habilidadesClave: ["h2", "h3", "h11", "h12", "h13"],
    proyectoEjemplo: "Línea de productos para venta con empaque, etiqueta y plan de negocio",
    producto: "5 productos sellados/etiquetados + plan de negocio gastronómico" },
]

// ─────────────────────────────────────────────────────────────────────────
// INDUSTRIA DEL VESTIDO
// ─────────────────────────────────────────────────────────────────────────
export const progresionIndustriaVestido: ItemProgresion[] = [
  { grado: "1°", nivel: "Iniciación", color: COLORES_GRADO[0], complejidad: 1,
    descripcionGrado: "Reconocimiento de materiales textiles, herramientas básicas y costura a mano.",
    equiposFoco: ["Zona de Investigación y Diseño", "Diseño y Patronaje"],
    habilidadesClave: ["h1", "h5", "h6", "h9"],
    proyectoEjemplo: "Análisis de fibras textiles y confección de accesorio a mano",
    producto: "Carpeta de muestras de telas + accesorio cosido a mano" },
  { grado: "2°", nivel: "Exploración", color: COLORES_GRADO[1], complejidad: 2,
    descripcionGrado: "Introducción a la máquina de coser, costuras básicas y aplicación de patrones simples.",
    equiposFoco: ["Corte de Telas", "Confección Industrial"],
    habilidadesClave: ["h3", "h6", "h9", "h11"],
    proyectoEjemplo: "Bolso o delantal con patrón básico y costura recta",
    producto: "Accesorio confeccionado + hoja de proceso de construcción" },
  { grado: "3°", nivel: "Integración", color: COLORES_GRADO[2], complejidad: 3,
    descripcionGrado: "Patronaje propio, uso de overlock y técnicas de construcción de prendas.",
    equiposFoco: ["Diseño y Patronaje", "Corte de Telas", "Confección Industrial"],
    habilidadesClave: ["h2", "h3", "h9", "h11"],
    proyectoEjemplo: "Prenda de vestimenta (falda, pantalón o blusa) con patrón propio",
    producto: "Prenda terminada + moldes + hoja de especificaciones técnicas" },
  { grado: "4°", nivel: "Profundización", color: COLORES_GRADO[3], complejidad: 4,
    descripcionGrado: "Confección de conjuntos completos con bordado, acabados profesionales y planchado.",
    equiposFoco: ["Confección Industrial", "Acabados y Presentación"],
    habilidadesClave: ["h2", "h3", "h11", "h12"],
    proyectoEjemplo: "Conjunto completo de 2 piezas con bordado y acabados de calidad",
    producto: "Conjunto terminado con etiqueta + ficha técnica de producción" },
  { grado: "5°", nivel: "Proyecto Integrador", color: COLORES_GRADO[4], complejidad: 5,
    descripcionGrado: "Colección mini de 3 prendas con propuesta de marca y presentación en pasarela.",
    equiposFoco: ["Diseño y Patronaje", "Corte de Telas", "Confección Industrial", "Acabados y Presentación"],
    habilidadesClave: ["h2", "h3", "h12", "h13"],
    proyectoEjemplo: "Mini colección de moda con concepto, proceso y presentación final",
    producto: "3 prendas de colección + book de diseño + presentación de marca" },
]

// ─────────────────────────────────────────────────────────────────────────
// COMPUTACIÓN E INFORMÁTICA
// ─────────────────────────────────────────────────────────────────────────
export const progresionComputacionInformatica: ItemProgresion[] = [
  { grado: "1°", nivel: "Iniciación", color: COLORES_GRADO[0], complejidad: 1,
    descripcionGrado: "Ofimática avanzada, organización de información y primeros pasos en diseño digital.",
    equiposFoco: ["Zona de Investigación y Diseño", "Software y Diseño Digital"],
    habilidadesClave: ["h1", "h4", "h5", "h13"],
    proyectoEjemplo: "Presentación multimedia sobre una necesidad del colegio",
    producto: "Presentación + infografía + video corto de 2 minutos" },
  { grado: "2°", nivel: "Exploración", color: COLORES_GRADO[1], complejidad: 2,
    descripcionGrado: "Diseño gráfico, edición de video y producción audiovisual básica.",
    equiposFoco: ["Software y Diseño Digital", "Producción Audiovisual"],
    habilidadesClave: ["h2", "h4", "h13"],
    proyectoEjemplo: "Video reportaje del taller o institución educativa",
    producto: "Video editado (3 min) + afiches de difusión" },
  { grado: "3°", nivel: "Integración", color: COLORES_GRADO[2], complejidad: 3,
    descripcionGrado: "Programación básica (Scratch/Python) e introducción al hardware con Arduino.",
    equiposFoco: ["Software y Diseño Digital", "Programación y Desarrollo Web", "Impresión 3D y Fabricación Digital"],
    habilidadesClave: ["h2", "h4", "h10", "h12"],
    proyectoEjemplo: "App o sitio web sencillo para la institución educativa",
    producto: "Sitio web funcional + documentación técnica del proyecto" },
  { grado: "4°", nivel: "Profundización", color: COLORES_GRADO[3], complejidad: 4,
    descripcionGrado: "Redes, mantenimiento de hardware y proyecto con microcontroladores y sensores.",
    equiposFoco: ["Redes y Hardware", "Programación y Desarrollo Web", "Impresión 3D y Fabricación Digital"],
    habilidadesClave: ["h3", "h4", "h10", "h11"],
    proyectoEjemplo: "Sistema de automatización simple con Arduino y sensores",
    producto: "Prototipo funcional + código documentado + video de demostración" },
  { grado: "5°", nivel: "Proyecto Integrador", color: COLORES_GRADO[4], complejidad: 5,
    descripcionGrado: "Solución tecnológica completa con app, prototipo físico y propuesta de emprendimiento digital.",
    equiposFoco: ["Software y Diseño Digital", "Programación y Desarrollo Web", "Producción Audiovisual", "Impresión 3D y Fabricación Digital"],
    habilidadesClave: ["h2", "h4", "h10", "h12", "h13"],
    proyectoEjemplo: "Startup tecnológica escolar con app + prototipo + pitch de inversión",
    producto: "App/sistema funcional + prototipo 3D + pitch deck + video presentación" },
]

// ─────────────────────────────────────────────────────────────────────────
// ELECTRÓNICA
// ─────────────────────────────────────────────────────────────────────────
export const progresionElectronica: ItemProgresion[] = [
  { grado: "1°", nivel: "Iniciación", color: COLORES_GRADO[0], complejidad: 1,
    descripcionGrado: "Fundamentos de electricidad, uso seguro de multímetro y circuitos básicos en protoboard.",
    equiposFoco: ["Zona de Investigación y Diseño", "Instrumentos de Medición"],
    habilidadesClave: ["h1", "h4", "h5", "h6"],
    proyectoEjemplo: "Circuito de LED con interruptor y medición de voltaje/corriente",
    producto: "Circuito armado + tabla de mediciones + informe técnico" },
  { grado: "2°", nivel: "Exploración", color: COLORES_GRADO[1], complejidad: 2,
    descripcionGrado: "Diseño de circuitos en software y soldadura de componentes en PCB.",
    equiposFoco: ["Diseño de Circuitos", "Fabricación de PCB y Montaje"],
    habilidadesClave: ["h2", "h3", "h6", "h10"],
    proyectoEjemplo: "Fuente de poder regulada diseñada y soldada en PCB",
    producto: "PCB funcional + esquemático en software + pruebas documentadas" },
  { grado: "3°", nivel: "Integración", color: COLORES_GRADO[2], complejidad: 3,
    descripcionGrado: "Microcontroladores básicos (Arduino) con sensores y actuadores.",
    equiposFoco: ["Automatización y Microcontroladores", "Fabricación de PCB y Montaje"],
    habilidadesClave: ["h2", "h4", "h9", "h10"],
    proyectoEjemplo: "Estación meteorológica con Arduino y pantalla LCD",
    producto: "Sistema funcionando + código comentado + reporte de datos" },
  { grado: "4°", nivel: "Profundización", color: COLORES_GRADO[3], complejidad: 4,
    descripcionGrado: "Proyectos de IoT, comunicación inalámbrica y diseño de PCB con componentes SMD.",
    equiposFoco: ["Automatización y Microcontroladores", "Diseño de Circuitos", "Electrónica de Potencia y Fuentes"],
    habilidadesClave: ["h2", "h4", "h11", "h12"],
    proyectoEjemplo: "Sistema IoT de monitoreo con datos en nube y dashboard",
    producto: "Dispositivo IoT funcional + plataforma de datos + manual de usuario" },
  { grado: "5°", nivel: "Proyecto Integrador", color: COLORES_GRADO[4], complejidad: 5,
    descripcionGrado: "Producto electrónico completo con PCB profesional, carcasa 3D y propuesta comercial.",
    equiposFoco: ["Diseño de Circuitos", "Fabricación de PCB y Montaje", "Automatización y Microcontroladores"],
    habilidadesClave: ["h2", "h3", "h4", "h12", "h13"],
    proyectoEjemplo: "Producto electrónico sellable: PCB + carcasa impresa + app de control",
    producto: "Producto terminado en caja + ficha técnica + propuesta de comercialización" },
]

// ─────────────────────────────────────────────────────────────────────────
// INDUSTRIA ALIMENTARIA
// ─────────────────────────────────────────────────────────────────────────
export const progresionIndustriaAlimentaria: ItemProgresion[] = [
  { grado: "1°", nivel: "Iniciación", color: COLORES_GRADO[0], complejidad: 1,
    descripcionGrado: "BPM, inocuidad y análisis básico de materias primas. Uso de instrumentos de medición.",
    equiposFoco: ["Zona de Investigación y Diseño", "Análisis y Control de Calidad"],
    habilidadesClave: ["h1", "h5", "h6", "h11"],
    proyectoEjemplo: "Análisis de calidad de materias primas del entorno local",
    producto: "Tabla de análisis fisicoquímico + informe de BPM" },
  { grado: "2°", nivel: "Exploración", color: COLORES_GRADO[1], complejidad: 2,
    descripcionGrado: "Procesamiento básico: néctar, mermelada, yogurt. Uso de cocinas y balanzas.",
    equiposFoco: ["Análisis y Control de Calidad", "Procesamiento y Transformación"],
    habilidadesClave: ["h3", "h6", "h11"],
    proyectoEjemplo: "Elaboración de néctar o mermelada con estándares BPM",
    producto: "Producto envasado + hoja de formulación + registro de proceso" },
  { grado: "3°", nivel: "Integración", color: COLORES_GRADO[2], complejidad: 3,
    descripcionGrado: "Conservación por calor (pasteurización, esterilización) y control de vida útil.",
    equiposFoco: ["Procesamiento y Transformación", "Conservación y Esterilización"],
    habilidadesClave: ["h3", "h11", "h14"],
    proyectoEjemplo: "Producto con tratamiento térmico y análisis de vida útil",
    producto: "Lote de producto + análisis sensorial + vida útil proyectada" },
  { grado: "4°", nivel: "Profundización", color: COLORES_GRADO[3], complejidad: 4,
    descripcionGrado: "Línea completa de proceso con empaque, etiquetado normativo y control de costos.",
    equiposFoco: ["Procesamiento y Transformación", "Conservación y Esterilización", "Empaque y Presentación Comercial"],
    habilidadesClave: ["h3", "h11", "h12", "h14"],
    proyectoEjemplo: "Línea de producto con empaque, etiqueta DIGESA-ready y costeo",
    producto: "12 unidades del producto + etiqueta técnica + hoja de costeo" },
  { grado: "5°", nivel: "Proyecto Integrador", color: COLORES_GRADO[4], complejidad: 5,
    descripcionGrado: "Micro-emprendimiento alimentario con registro sanitario, plan HACCP y estrategia comercial.",
    equiposFoco: ["Análisis y Control de Calidad", "Procesamiento y Transformación", "Conservación y Esterilización", "Empaque y Presentación Comercial"],
    habilidadesClave: ["h1", "h3", "h11", "h12", "h13"],
    proyectoEjemplo: "Micro-empresa alimentaria escolar con producto, marca y distribución local",
    producto: "Lote comercial + manual HACCP + plan de negocio + pitch de presentación" },
]

// ─────────────────────────────────────────────────────────────────────────
// ELECTRICIDAD
// ─────────────────────────────────────────────────────────────────────────
export const progresionElectricidad: ItemProgresion[] = [
  { grado: "1°", nivel: "Iniciación", color: COLORES_GRADO[0], complejidad: 1,
    descripcionGrado: "Fundamentos de electricidad, medición básica y normas de seguridad eléctrica.",
    equiposFoco: ["Zona de Investigación y Diseño", "Medición e Instrumentación"],
    habilidadesClave: ["h1", "h5", "h6", "h10"],
    proyectoEjemplo: "Circuito eléctrico básico con interruptores y medición",
    producto: "Tablero de práctica con circuito + tabla de mediciones documentada" },
  { grado: "2°", nivel: "Exploración", color: COLORES_GRADO[1], complejidad: 2,
    descripcionGrado: "Instalaciones domiciliarias básicas: cableado, cajas, tomacorrientes e interruptores.",
    equiposFoco: ["Instalaciones Eléctricas"],
    habilidadesClave: ["h3", "h6", "h10", "h11"],
    proyectoEjemplo: "Instalación de un circuito monofásico completo en maqueta",
    producto: "Maqueta de instalación domiciliaria + plano unifilar" },
  { grado: "3°", nivel: "Integración", color: COLORES_GRADO[2], complejidad: 3,
    descripcionGrado: "Tableros de distribución, protecciones y energías renovables básicas.",
    equiposFoco: ["Instalaciones Eléctricas", "Energías Renovables", "Medición e Instrumentación"],
    habilidadesClave: ["h3", "h6", "h9", "h14"],
    proyectoEjemplo: "Tablero de distribución con protecciones y sistema solar de iluminación",
    producto: "Tablero funcional + memoria de cálculo + ficha técnica del sistema solar" },
  { grado: "4°", nivel: "Profundización", color: COLORES_GRADO[3], complejidad: 4,
    descripcionGrado: "Automatización con PLC y programación de sistemas de control eléctrico.",
    equiposFoco: ["Automatización y Control", "Instalaciones Eléctricas"],
    habilidadesClave: ["h2", "h4", "h10", "h12"],
    proyectoEjemplo: "Sistema de automatización con PLC para control de iluminación o motores",
    producto: "Programa PLC funcionando + escalera de contactos + demostración grabada" },
  { grado: "5°", nivel: "Proyecto Integrador", color: COLORES_GRADO[4], complejidad: 5,
    descripcionGrado: "Propuesta de instalación eficiente con energías renovables y automatización.",
    equiposFoco: ["Medición e Instrumentación", "Energías Renovables", "Instalaciones Eléctricas", "Automatización y Control"],
    habilidadesClave: ["h3", "h4", "h12", "h13", "h14"],
    proyectoEjemplo: "Propuesta de electrificación sostenible para una vivienda o espacio escolar",
    producto: "Sistema de instalación + panel solar + automatización + propuesta de emprendimiento" },
]

// ─────────────────────────────────────────────────────────────────────────
// CONSTRUCCIONES METÁLICAS
// ─────────────────────────────────────────────────────────────────────────
export const progresionConstruccionesMetalicas: ItemProgresion[] = [
  { grado: "1°", nivel: "Iniciación", color: COLORES_GRADO[0], complejidad: 1,
    descripcionGrado: "Identificación de metales, herramientas básicas y seguridad en soldadura.",
    equiposFoco: ["Zona de Investigación y Diseño", "Software y Diseño Digital"],
    habilidadesClave: ["h1", "h5", "h6", "h13"],
    proyectoEjemplo: "Diagnóstico de materiales metálicos del entorno y lectura de planos básicos",
    producto: "Catálogo de materiales + plano de una pieza simple" },
  { grado: "2°", nivel: "Exploración", color: COLORES_GRADO[1], complejidad: 2,
    descripcionGrado: "Corte y habilitado básico: amoladora, taladro y marcado de piezas.",
    equiposFoco: ["Corte y Habilitado Metálico", "Conformado y Maquinado"],
    habilidadesClave: ["h3", "h6", "h10", "h11"],
    proyectoEjemplo: "Pieza metálica simple (soporte, ángulo, placa) con cotas precisas",
    producto: "Pieza terminada + croquis técnico con cotas" },
  { grado: "3°", nivel: "Integración", color: COLORES_GRADO[2], complejidad: 3,
    descripcionGrado: "Soldadura MIG básica y construcción de estructuras simples.",
    equiposFoco: ["Corte y Habilitado Metálico", "Soldadura y Unión"],
    habilidadesClave: ["h3", "h6", "h9", "h11"],
    proyectoEjemplo: "Estructura metálica soldada (mesa, silla o estante de acero)",
    producto: "Estructura funcional + plano técnico + ficha de proceso de soldadura" },
  { grado: "4°", nivel: "Profundización", color: COLORES_GRADO[3], complejidad: 4,
    descripcionGrado: "Fabricación digital (láser/CNC), torno metálico y acabados de superficie.",
    equiposFoco: ["Fabricación Digital y CNC", "Conformado y Maquinado", "Acabados Metálicos"],
    habilidadesClave: ["h2", "h3", "h4", "h11"],
    proyectoEjemplo: "Producto metálico con piezas de fabricación digital y torno",
    producto: "Producto con piezas CNC + piezas torneadas + acabado pintado" },
  { grado: "5°", nivel: "Proyecto Integrador", color: COLORES_GRADO[4], complejidad: 5,
    descripcionGrado: "Proyecto de metalmecánica completo con diseño CAD, fabricación y propuesta comercial.",
    equiposFoco: ["Software y Diseño Digital", "Corte y Habilitado Metálico", "Soldadura y Unión", "Fabricación Digital y CNC", "Acabados Metálicos"],
    habilidadesClave: ["h2", "h3", "h4", "h12", "h13"],
    proyectoEjemplo: "Producto metálico de emprendimiento: diseño CAD → fabricación → venta",
    producto: "Producto terminado + planos CAD + propuesta de taller productivo" },
]

// ── Mapa principal ────────────────────────────────────────────────────────
export const PROGRESION_POR_TALLER: Record<string, ItemProgresion[]> = {
  "ebanisteria":             progresionEbanisteria,
  "mecanica-automotriz":     progresionMecanicaAutomotriz,
  "cocina-reposteria":       progresionCocinaReposteria,
  "industria-vestido":       progresionIndustriaVestido,
  "computacion-informatica": progresionComputacionInformatica,
  "electronica":             progresionElectronica,
  "industria-alimentaria":   progresionIndustriaAlimentaria,
  "electricidad":            progresionElectricidad,
  "construcciones-metalicas":progresionConstruccionesMetalicas,
}

export const getProgresionByTaller = (slug: string): ItemProgresion[] =>
  PROGRESION_POR_TALLER[slug] ?? []
