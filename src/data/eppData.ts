// src/data/eppData.ts
// Tabla completa de EPP por equipo y proceso — 9 talleres EPT TSF/MINEDU
// Fuente: Ley 29783, NTP 399.010, R.V.M. N°174-2021-MINEDU y manuales de fábrica

export type NivelEPP = 'obligatorio' | 'recomendado'

export interface EPPItem {
  nombre: string
  nivel: NivelEPP
}

export interface EPPRow {
  id: string
  equipo: string
  procesos: string[]
  zona: 'Innovación' | 'Investigación' | 'Acabados' | 'Almacén' | 'General'
  epp: EPPItem[]
  alertas?: string[]
  noGuantes?: boolean   // true = los guantes están PROHIBIDOS (máquinas rotativas)
}

// ─────────────────────────────────────────────────────────────────────────────
// EBANISTERÍA
// ─────────────────────────────────────────────────────────────────────────────
const eppEbanisteria: EPPRow[] = [
  {
    id: "eb-01", equipo: "Sierra Circular", zona: "Innovación",
    procesos: ["Corte longitudinal de madera", "Corte transversal", "Ranuras y canales"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Orejeras (>85 dB)", nivel: "obligatorio" },
      { nombre: "Mascarilla para polvo de madera", nivel: "obligatorio" },
    ],
    noGuantes: true,
    alertas: ["PROHIBIDO usar guantes: riesgo de arrastre por disco rotativo"]
  },
  {
    id: "eb-02", equipo: "Sierra Radial (Brazo)", zona: "Innovación",
    procesos: ["Corte transversal", "Cortes en ángulo (inglete)", "Ranurado"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Orejeras", nivel: "obligatorio" },
      { nombre: "Mascarilla para polvo", nivel: "obligatorio" },
    ],
    noGuantes: true,
    alertas: ["PROHIBIDO usar guantes en zona de corte"]
  },
  {
    id: "eb-03", equipo: "Garlopa (Cepilladora)", zona: "Innovación",
    procesos: ["Cepillado de superficies", "Escuadrado de piezas"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Orejeras (>90 dB)", nivel: "obligatorio" },
      { nombre: "Mascarilla para polvo de madera", nivel: "obligatorio" },
    ],
    noGuantes: true,
    alertas: ["PROHIBIDO usar guantes: cuchillas a gran velocidad"]
  },
  {
    id: "eb-04", equipo: "Regruesadora", zona: "Innovación",
    procesos: ["Calibrado de espesor", "Cepillado en espesor"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Orejeras", nivel: "obligatorio" },
      { nombre: "Mascarilla para polvo", nivel: "obligatorio" },
    ],
    noGuantes: true,
  },
  {
    id: "eb-05", equipo: "Torno de Madera", zona: "Innovación",
    procesos: ["Torneado de piezas cilíndricas", "Vaciado y tallado en torno"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Careta facial (complemento)", nivel: "recomendado" },
      { nombre: "Ropa ajustada al cuerpo", nivel: "obligatorio" },
    ],
    noGuantes: true,
    alertas: ["PROHIBIDO: joyas, relojes, ropa suelta, guantes. Pueden ser atrapados"]
  },
  {
    id: "eb-06", equipo: "Sierra Cinta", zona: "Innovación",
    procesos: ["Cortes curvos", "Redondeado de esquinas", "Cortes de formas libres"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Orejeras", nivel: "obligatorio" },
      { nombre: "Mascarilla para polvo", nivel: "recomendado" },
    ],
    noGuantes: true,
  },
  {
    id: "eb-07", equipo: "Taladro de Banco", zona: "Innovación",
    procesos: ["Perforaciones de precisión", "Barrenos pasantes y ciegos"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Ropa ajustada", nivel: "obligatorio" },
    ],
    noGuantes: true,
    alertas: ["PROHIBIDO usar guantes: la broca puede atrapar el tejido"]
  },
  {
    id: "eb-08", equipo: "Cortadora Láser", zona: "Innovación",
    procesos: ["Corte de MDF/madera fina", "Grabado láser", "Perforación de patrones"],
    epp: [
      { nombre: "Lentes protección láser (longitud de onda del equipo)", nivel: "obligatorio" },
      { nombre: "Mascarilla para gases/humos (N95 mínimo)", nivel: "obligatorio" },
    ],
    alertas: ["Extintor de CO₂ en radio de 2 m. NUNCA dejar sin supervisión durante operación"]
  },
  {
    id: "eb-09", equipo: "Router CNC", zona: "Innovación",
    procesos: ["Fresado de piezas", "Tallado por control numérico", "Perfiles y molduras"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Orejeras", nivel: "obligatorio" },
      { nombre: "Mascarilla para polvo", nivel: "obligatorio" },
    ],
    noGuantes: true,
  },
  {
    id: "eb-10", equipo: "Impresora 3D", zona: "Innovación",
    procesos: ["Impresión FDM (PLA, ABS, PETG)", "Prototipado rápido"],
    epp: [
      { nombre: "Ventilación del área", nivel: "obligatorio" },
      { nombre: "Mascarilla para vapores (si usa ABS o PETG)", nivel: "obligatorio" },
      { nombre: "Pinzas para retirar piezas calientes", nivel: "recomendado" },
    ],
    alertas: ["PLA: bajo riesgo. ABS y PETG: vapores tóxicos — ventilación forzada obligatoria"]
  },
  {
    id: "eb-11", equipo: "Formones y Escoplos", zona: "Innovación",
    procesos: ["Mortajado manual", "Tallado en madera", "Perfiles a mano"],
    epp: [
      { nombre: "Guantes de cuero resistentes al corte", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "recomendado" },
    ],
    alertas: ["A diferencia de máquinas, en herramientas de filo manual SÍ se usan guantes de cuero"]
  },
  {
    id: "eb-12", equipo: "Escofinas y Gubias", zona: "Innovación",
    procesos: ["Raspado y acabado manual", "Tallado artístico"],
    epp: [
      { nombre: "Guantes de cuero", nivel: "obligatorio" },
    ],
  },
  {
    id: "eb-13", equipo: "Enchapadora de Cantos", zona: "Acabados",
    procesos: ["Aplicación de chapa en cantos", "Enchapado con cola termofusible"],
    epp: [
      { nombre: "Guantes térmicos resistentes al calor", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "recomendado" },
    ],
    alertas: ["Cola termofusible a ~160°C. Contacto provoca quemaduras graves"]
  },
  {
    id: "eb-14", equipo: "Lijadora Orbital / de Banda", zona: "Acabados",
    procesos: ["Lijado de superficies", "Preparación para acabados"],
    epp: [
      { nombre: "Mascarilla para polvo de madera (P2/N95)", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Orejeras", nivel: "recomendado" },
    ],
  },
  {
    id: "eb-15", equipo: "Compresor de Aire / Pistola de Pintar", zona: "Acabados",
    procesos: ["Aplicación de pintura / barniz", "Sellado y fondo"],
    epp: [
      { nombre: "Mameluco de protección (desechable)", nivel: "obligatorio" },
      { nombre: "Lentes tipo antiparra", nivel: "obligatorio" },
      { nombre: "Respirador con filtro para vapores orgánicos", nivel: "obligatorio" },
      { nombre: "Guantes de nitrilo", nivel: "obligatorio" },
    ],
    alertas: ["Usar solo en cabina de pintura con extracción de aire. Solventes son inflamables y tóxicos"]
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// MECÁNICA AUTOMOTRIZ
// ─────────────────────────────────────────────────────────────────────────────
const eppMecanicaAutomotriz: EPPRow[] = [
  {
    id: "ma-01", equipo: "Elevador Hidráulico / Gato", zona: "Innovación",
    procesos: ["Levantamiento de vehículos", "Inspección de tren motriz y frenos"],
    epp: [
      { nombre: "Guantes de cuero o nitrilo", nivel: "obligatorio" },
      { nombre: "Botas con punta de acero", nivel: "obligatorio" },
      { nombre: "Casco o gorra de trabajo", nivel: "recomendado" },
    ],
    alertas: ["Verificar capacidad del gato. Usar caballetes de soporte SIEMPRE antes de trabajar bajo el vehículo"]
  },
  {
    id: "ma-02", equipo: "Soldadora MIG / TIG", zona: "Innovación",
    procesos: ["Soldadura de piezas de chapa", "Reparación de estructura metálica"],
    epp: [
      { nombre: "Careta de soldador (DIN 11 mínimo)", nivel: "obligatorio" },
      { nombre: "Guantes de cuero para soldador", nivel: "obligatorio" },
      { nombre: "Mameluco de algodón o cuero (ignífugo)", nivel: "obligatorio" },
      { nombre: "Botas de cuero con punta de acero", nivel: "obligatorio" },
      { nombre: "Polainas de cuero", nivel: "recomendado" },
    ],
    alertas: ["Revisar ventilación: humos de soldadura son tóxicos. Extintor CO₂ cercano"]
  },
  {
    id: "ma-03", equipo: "Esmeril / Amoladora Angular", zona: "Innovación",
    procesos: ["Desbaste de piezas metálicas", "Corte con disco", "Pulido"],
    epp: [
      { nombre: "Careta facial completa (NO solo lentes)", nivel: "obligatorio" },
      { nombre: "Guantes de cuero", nivel: "obligatorio" },
      { nombre: "Orejeras", nivel: "obligatorio" },
      { nombre: "Delantal de cuero", nivel: "recomendado" },
    ],
    alertas: ["Inspeccionar el disco antes de cada uso. Verificar RPM máx. del disco vs. RPM de la máquina"]
  },
  {
    id: "ma-04", equipo: "Compresor de Aire", zona: "Innovación",
    procesos: ["Limpieza de piezas con aire", "Inflado de neumáticos", "Pistola de pintura"],
    epp: [
      { nombre: "Orejeras", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
    ],
    alertas: ["NUNCA dirigir aire comprimido hacia el cuerpo o cara. Presión máx. de limpieza: 30 psi"]
  },
  {
    id: "ma-05", equipo: "Torno Mecánico", zona: "Innovación",
    procesos: ["Torneado de piezas metálicas", "Roscado", "Cilindrado y refrentado"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Ropa ajustada al cuerpo", nivel: "obligatorio" },
    ],
    noGuantes: true,
    alertas: ["PROHIBIDO: guantes, joyas, mangas sueltas. Viruta de metal: NO retirar con mano — usar gancho"]
  },
  {
    id: "ma-06", equipo: "Banco de Trabajo / Herramientas Manuales", zona: "Innovación",
    procesos: ["Desmontaje y montaje de componentes", "Ajuste de piezas"],
    epp: [
      { nombre: "Guantes de cuero o nitrilo", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "recomendado" },
    ],
  },
  {
    id: "ma-07", equipo: "Productos Químicos (desengrasantes, fluidos)", zona: "Almacén",
    procesos: ["Limpieza de piezas", "Cambio de fluidos (aceite, líquido de frenos)"],
    epp: [
      { nombre: "Guantes de nitrilo (resistencia química)", nivel: "obligatorio" },
      { nombre: "Lentes antiparra", nivel: "obligatorio" },
      { nombre: "Mascarilla para vapores orgánicos", nivel: "obligatorio" },
      { nombre: "Delantal o mameluco", nivel: "recomendado" },
    ],
    alertas: ["Líquido de frenos y desengrasantes: irritantes severos. Almacenar en zona ventilada con señalización"]
  },
  {
    id: "ma-08", equipo: "Diagnóstico Electrónico (Scanner)", zona: "Investigación",
    procesos: ["Lectura de códigos de falla", "Diagnóstico de sistemas"],
    epp: [],
    alertas: ["Sin EPP especial. Precaución con batería del vehículo: guantes dieléctricos si hay trabajo eléctrico"]
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// COCINA Y REPOSTERÍA
// ─────────────────────────────────────────────────────────────────────────────
const eppCocinaReposteria: EPPRow[] = [
  {
    id: "cr-01", equipo: "Cocina Industrial / Horno", zona: "Innovación",
    procesos: ["Cocción a fuego", "Horneado", "Fritura y salteado"],
    epp: [
      { nombre: "Delantal de cocina (algodón grueso)", nivel: "obligatorio" },
      { nombre: "Guantes térmicos para horno", nivel: "obligatorio" },
      { nombre: "Gorro o cofia", nivel: "obligatorio" },
      { nombre: "Zapatos cerrados antideslizantes", nivel: "obligatorio" },
    ],
    alertas: ["Nunca apagar fuego de aceite con agua. Extintor de CO₂ o manta ignífuga siempre cerca"]
  },
  {
    id: "cr-02", equipo: "Cuchillos y Mandolina", zona: "Innovación",
    procesos: ["Corte de vegetales y carnes", "Laminado en mandolina"],
    epp: [
      { nombre: "Guante de malla anticorte (mano pasiva)", nivel: "obligatorio" },
      { nombre: "Tabla de corte estable (base antideslizante)", nivel: "obligatorio" },
    ],
    alertas: ["En mandolina el guante anticorte es OBLIGATORIO: es la causa N°1 de cortes en cocina escolar"]
  },
  {
    id: "cr-03", equipo: "Batidora / Amasadora Industrial", zona: "Innovación",
    procesos: ["Batido de mezclas", "Amasado de masa", "Montado de cremas"],
    epp: [
      { nombre: "Gorro o cofia (pelo completamente cubierto)", nivel: "obligatorio" },
      { nombre: "Delantal", nivel: "obligatorio" },
      { nombre: "Ropa ajustada / sin accesorios colgantes", nivel: "obligatorio" },
    ],
    noGuantes: true,
    alertas: ["PROHIBIDO usar guantes con amasadora: riesgo de arrastre del gancho amasador"]
  },
  {
    id: "cr-04", equipo: "Freidora Industrial", zona: "Innovación",
    procesos: ["Fritura profunda", "Blanqueado"],
    epp: [
      { nombre: "Delantal impermeable largo", nivel: "obligatorio" },
      { nombre: "Guantes térmicos de manga larga", nivel: "obligatorio" },
      { nombre: "Lentes antiparra (salpicaduras de aceite)", nivel: "recomendado" },
    ],
    alertas: ["Aceite a 180°C. Secar los alimentos antes de introducir: el agua provoca explosión de aceite"]
  },
  {
    id: "cr-05", equipo: "Cámara Frigorífica", zona: "Almacén",
    procesos: ["Almacenamiento de alimentos perecederos", "Control de cadena de frío"],
    epp: [
      { nombre: "Ropa de abrigo (chaquetón de cocina)", nivel: "recomendado" },
      { nombre: "Calzado antideslizante", nivel: "obligatorio" },
    ],
    alertas: ["Verificar que la puerta tenga apertura desde dentro. Nunca entrar solo a cámaras grandes"]
  },
  {
    id: "cr-06", equipo: "Balanza / Equipos de Medición", zona: "Investigación",
    procesos: ["Pesado de ingredientes", "Control de porciones"],
    epp: [],
    alertas: ["Sin EPP especial. Cumplir BPM: manos limpias, sin joyas"]
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRIA DEL VESTIDO
// ─────────────────────────────────────────────────────────────────────────────
const eppIndustriaVestido: EPPRow[] = [
  {
    id: "iv-01", equipo: "Máquina de Coser Industrial", zona: "Innovación",
    procesos: ["Costura recta", "Pespunte", "Costuras de construcción"],
    epp: [
      { nombre: "Dedal o protector de dedos", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "recomendado" },
      { nombre: "Ropa ajustada / pelo recogido", nivel: "obligatorio" },
    ],
    alertas: ["Agujas industriales: 5 mm/s. El cabello suelto puede ser atrapado por el mecanismo"]
  },
  {
    id: "iv-02", equipo: "Remalladora / Overlock", zona: "Innovación",
    procesos: ["Acabado de bordes", "Costura de punto", "Unión de telas elásticas"],
    epp: [
      { nombre: "Protector de dedos (thimble o silicon)", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
    ],
    alertas: ["Las cuchillas de la overlock cortan continuamente. NUNCA retirar tela con mano cerca de la cuchilla"]
  },
  {
    id: "iv-03", equipo: "Cortadora Circular / Troqueladora", zona: "Innovación",
    procesos: ["Corte de telas en capas", "Corte de moldes"],
    epp: [
      { nombre: "Guante de malla anticorte (mano izquierda)", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
    ],
    alertas: ["Guante anticorte metálico OBLIGATORIO: la cortadora circular es el equipo más peligroso del taller de confección"]
  },
  {
    id: "iv-04", equipo: "Plancha Industrial / Vaporizador", zona: "Acabados",
    procesos: ["Planchado de prendas", "Fijado de costuras", "Fusionado de entretelas"],
    epp: [
      { nombre: "Guantes térmicos", nivel: "obligatorio" },
      { nombre: "Muñequeras o protectores de brazo", nivel: "recomendado" },
    ],
    alertas: ["Vapor a 120-160°C. Nunca apuntar la boca de vapor hacia personas"]
  },
  {
    id: "iv-05", equipo: "Termofijadora / Prensa Térmica", zona: "Acabados",
    procesos: ["Aplicación de entretelas", "Transfer de logos y bordados"],
    epp: [
      { nombre: "Guantes térmicos", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "recomendado" },
    ],
    alertas: ["Plato a 180°C. No dejar la máquina cerrada sin supervisión: daña materiales y puede generar humo"]
  },
  {
    id: "iv-06", equipo: "Bordadora Industrial", zona: "Innovación",
    procesos: ["Bordado computarizado", "Aplicación de diseños sobre tela"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "recomendado" },
      { nombre: "Pelo recogido", nivel: "obligatorio" },
    ],
    alertas: ["Agujas a alta velocidad: no introducir manos durante el ciclo de bordado"]
  },
  {
    id: "iv-07", equipo: "Mesa de Corte (herramientas manuales)", zona: "Innovación",
    procesos: ["Trazado de moldes", "Corte con tijeras de sastre", "Marcado con tiza"],
    epp: [
      { nombre: "Dedal de protección", nivel: "recomendado" },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// COMPUTACIÓN E INFORMÁTICA
// ─────────────────────────────────────────────────────────────────────────────
const eppComputacionInformatica: EPPRow[] = [
  {
    id: "ci-01", equipo: "Computadora / Laptop", zona: "Investigación",
    procesos: ["Programación", "Diseño web", "Ofimática"],
    epp: [],
    alertas: ["Sin EPP especial. Aplicar ergonomía: postura, distancia a pantalla y pausas activas"]
  },
  {
    id: "ci-02", equipo: "Soldadora de Estaño", zona: "Innovación",
    procesos: ["Soldadura de componentes en PCB", "Reparación de circuitos"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Mascarilla para humos de soldadura", nivel: "obligatorio" },
      { nombre: "Extractor de humos (si disponible)", nivel: "obligatorio" },
    ],
    alertas: ["Flux y estaño generan vapores irritantes. El cautín alcanza 350°C: usar soporte siempre"]
  },
  {
    id: "ci-03", equipo: "Multímetro / Tester", zona: "Innovación",
    procesos: ["Medición de voltaje y corriente", "Diagnóstico de circuitos"],
    epp: [
      { nombre: "Guantes dieléctricos (si hay líneas vivas)", nivel: "obligatorio" },
    ],
    alertas: ["En circuitos de baja tensión (<50V DC) el riesgo es bajo. Para 220V: guantes dieléctricos obligatorios"]
  },
  {
    id: "ci-04", equipo: "Muñequera Antiestática / Mat ESD", zona: "Innovación",
    procesos: ["Manipulación de componentes electrónicos", "Ensamble de hardware"],
    epp: [
      { nombre: "Muñequera antiestática conectada a tierra", nivel: "obligatorio" },
      { nombre: "Mat antiestático en mesa de trabajo", nivel: "recomendado" },
    ],
    alertas: ["La electrostática puede destruir componentes silenciosamente. Usar antes de tocar cualquier tarjeta"]
  },
  {
    id: "ci-05", equipo: "Pistola de Calor", zona: "Innovación",
    procesos: ["Encogido de termoretráctil", "Desoldar componentes"],
    epp: [
      { nombre: "Guantes térmicos", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
    ],
    alertas: ["Aire a 350-500°C. Nunca apuntar a personas. Dejar enfriar sobre soporte ignífugo"]
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRÓNICA
// ─────────────────────────────────────────────────────────────────────────────
const eppElectronica: EPPRow[] = [
  {
    id: "el-01", equipo: "Soldadora de Estaño (Electrónica)", zona: "Innovación",
    procesos: ["Soldadura SMD y through-hole", "Construcción de circuitos", "Reparación"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Mascarilla para humos de flux", nivel: "obligatorio" },
      { nombre: "Extractor de humos de soldadura", nivel: "obligatorio" },
    ],
    alertas: ["Flux con plomo: lavarse manos antes de comer. Cautín a 300-370°C: nunca dejar sin soporte"]
  },
  {
    id: "el-02", equipo: "Fuente de Alimentación Variable", zona: "Innovación",
    procesos: ["Alimentación de circuitos de prueba", "Calibración de prototipos"],
    epp: [
      { nombre: "Guantes dieléctricos (circuitos >50V)", nivel: "obligatorio" },
    ],
    alertas: ["Para tensiones >50V el riesgo de electrocución es significativo. Nunca tocar terminales en carga"]
  },
  {
    id: "el-03", equipo: "Dremel / Taladro para PCB", zona: "Innovación",
    procesos: ["Perforación de placas PCB", "Corte de substrato FR4"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Mascarilla P2/N95 (polvo de fibra de vidrio)", nivel: "obligatorio" },
    ],
    noGuantes: true,
    alertas: ["El polvo de FR4 (fibra de vidrio) es cancerígeno. Nunca perforar sin mascarilla. PROHIBIDO guantes con dremel"]
  },
  {
    id: "el-04", equipo: "Muñequera Antiestática", zona: "Innovación",
    procesos: ["Manipulación de CI y microcontroladores", "Ensamble de PCB"],
    epp: [
      { nombre: "Muñequera antiestática a tierra", nivel: "obligatorio" },
      { nombre: "Mat antiestático ESD", nivel: "recomendado" },
    ],
  },
  {
    id: "el-05", equipo: "Osciloscopio / Generador de Señal", zona: "Investigación",
    procesos: ["Medición de señales", "Análisis de forma de onda"],
    epp: [],
    alertas: ["Sin EPP especial para equipos de medición de baja tensión"]
  },
  {
    id: "el-06", equipo: "Pistola de Calor (Electrónica)", zona: "Innovación",
    procesos: ["Desoldar componentes SMD", "Termoretráctil"],
    epp: [
      { nombre: "Guantes térmicos", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Mascarilla para vapores", nivel: "recomendado" },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRIA ALIMENTARIA
// ─────────────────────────────────────────────────────────────────────────────
const eppIndustriaAlimentaria: EPPRow[] = [
  {
    id: "ia-01", equipo: "Marmita / Olla Industrial", zona: "Innovación",
    procesos: ["Cocción a vapor", "Pasteurización", "Cocción de jarabes y mermeladas"],
    epp: [
      { nombre: "Guantes térmicos de manga larga", nivel: "obligatorio" },
      { nombre: "Delantal impermeable", nivel: "obligatorio" },
      { nombre: "Gorro / cofia", nivel: "obligatorio" },
      { nombre: "Botas antideslizantes", nivel: "obligatorio" },
    ],
    alertas: ["Contenido a >100°C. Al abrir tapa: voltear hacia atrás para que el vapor suba lejos del cuerpo"]
  },
  {
    id: "ia-02", equipo: "Autoclave / Esterilizador", zona: "Innovación",
    procesos: ["Esterilización de envases", "Tratamiento térmico UHT"],
    epp: [
      { nombre: "Guantes térmicos", nivel: "obligatorio" },
      { nombre: "Lentes antiparra", nivel: "obligatorio" },
      { nombre: "Delantal impermeable", nivel: "obligatorio" },
    ],
    alertas: ["Presión interna: esperar indicación de presión 0 antes de abrir. NUNCA forzar apertura"]
  },
  {
    id: "ia-03", equipo: "Selladora al Vacío", zona: "Innovación",
    procesos: ["Envasado al vacío", "Conservación de alimentos procesados"],
    epp: [
      { nombre: "Guantes de nitrilo (manipulación de alimentos)", nivel: "obligatorio" },
    ],
  },
  {
    id: "ia-04", equipo: "Molino / Pulpeadora", zona: "Innovación",
    procesos: ["Molienda de granos", "Extracción de pulpa de frutas"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Mascarilla para polvo (N95)", nivel: "obligatorio" },
      { nombre: "Delantal", nivel: "obligatorio" },
    ],
    noGuantes: true,
    alertas: ["PROHIBIDO guantes en molino: pueden ser atrapados por el rodillo"]
  },
  {
    id: "ia-05", equipo: "Cámara Frigorífica", zona: "Almacén",
    procesos: ["Almacenamiento en frío", "Control de temperatura"],
    epp: [
      { nombre: "Ropa de abrigo", nivel: "recomendado" },
      { nombre: "Botas antideslizantes", nivel: "obligatorio" },
    ],
    alertas: ["Verificar apertura desde adentro. Registrar entradas/salidas para cadena de frío"]
  },
  {
    id: "ia-06", equipo: "Cuchillos Industriales", zona: "Innovación",
    procesos: ["Fileteado y trozado de carnes", "Corte de frutas y vegetales"],
    epp: [
      { nombre: "Guante de malla anticorte (mano pasiva)", nivel: "obligatorio" },
      { nombre: "Delantal de malla anticorte (para procesamiento de carne)", nivel: "recomendado" },
    ],
    alertas: ["En industria alimentaria el guante anticorte es el EPP con mayor impacto en reducción de accidentes"]
  },
  {
    id: "ia-07", equipo: "Balanza Industrial / Equipos de Medición", zona: "Investigación",
    procesos: ["Control de gramaje", "Análisis de pH y Brix"],
    epp: [
      { nombre: "Guantes de nitrilo (si maneja reactivos)", nivel: "recomendado" },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRICIDAD
// ─────────────────────────────────────────────────────────────────────────────
const eppElectricidad: EPPRow[] = [
  {
    id: "ele-01", equipo: "Tablero Eléctrico / Panel", zona: "Innovación",
    procesos: ["Instalación de circuitos", "Cableado de tableros", "Montaje de interruptores"],
    epp: [
      { nombre: "Guantes dieléctricos Clase 0 (1000V)", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Zapatos dieléctricos", nivel: "obligatorio" },
      { nombre: "Casco con careta facial (trabajos en tablero vivo)", nivel: "obligatorio" },
    ],
    alertas: ["En instalaciones vivas: protocolo LOTO antes de intervenir. Nunca trabajar en línea viva sin supervisor"]
  },
  {
    id: "ele-02", equipo: "Cables y Conductores (cableado)", zona: "Innovación",
    procesos: ["Pelado y preparación de conductores", "Conexión de terminales"],
    epp: [
      { nombre: "Guantes dieléctricos", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
    ],
    alertas: ["Siempre verificar ausencia de tensión con voltímetro antes de tocar"]
  },
  {
    id: "ele-03", equipo: "Taladro Eléctrico / Perforador", zona: "Innovación",
    procesos: ["Perforación de paredes y cajas", "Montaje de canaletas"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Mascarilla para polvo (perforación de mampostería)", nivel: "recomendado" },
      { nombre: "Ropa ajustada", nivel: "obligatorio" },
    ],
    noGuantes: true,
  },
  {
    id: "ele-04", equipo: "Amoladora Angular (Electricidad)", zona: "Innovación",
    procesos: ["Corte de ductos metálicos", "Desbaste de superficies"],
    epp: [
      { nombre: "Careta facial completa", nivel: "obligatorio" },
      { nombre: "Guantes de cuero", nivel: "obligatorio" },
      { nombre: "Orejeras", nivel: "obligatorio" },
      { nombre: "Ropa de mangas largas", nivel: "obligatorio" },
    ],
    alertas: ["Verificar disco antes de usar. Velocidad periférica: inspeccionar límite RPM del disco"]
  },
  {
    id: "ele-05", equipo: "Multímetro (Líneas Eléctricas)", zona: "Innovación",
    procesos: ["Medición de voltaje en instalaciones", "Verificación de continuidad"],
    epp: [
      { nombre: "Guantes dieléctricos", nivel: "obligatorio" },
      { nombre: "Zapatos dieléctricos", nivel: "recomendado" },
    ],
    alertas: ["Para medición en 220V o trifásico: guantes OBLIGATORIOS. Nunca usar multímetro dañado"]
  },
  {
    id: "ele-06", equipo: "Banco de Trabajo Eléctrico", zona: "Investigación",
    procesos: ["Prácticas con circuitos de baja tensión (<50V)", "Proyectos de automatización"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "recomendado" },
    ],
    alertas: ["Tensiones <50V DC son de bajo riesgo eléctrico pero hay riesgo de cortocircuito y quemadura"]
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CONSTRUCCIONES METÁLICAS
// ─────────────────────────────────────────────────────────────────────────────
const eppConstruccionesMetalicas: EPPRow[] = [
  {
    id: "cm-01", equipo: "Soldadora MIG / TIG / Arco", zona: "Innovación",
    procesos: ["Soldadura de estructuras metálicas", "Unión de perfiles", "Soldadura de chapas"],
    epp: [
      { nombre: "Careta de soldador auto-oscureciente (DIN 9-13)", nivel: "obligatorio" },
      { nombre: "Guantes de cuero para soldador (manga larga)", nivel: "obligatorio" },
      { nombre: "Mameluco / casaca de soldador (ignífugo)", nivel: "obligatorio" },
      { nombre: "Botas de cuero con punta de acero", nivel: "obligatorio" },
      { nombre: "Polainas de cuero", nivel: "obligatorio" },
    ],
    alertas: ["Ventilación activa OBLIGATORIA: humos de soldadura causan enfermedades pulmonares. Extintor CO₂ cercano"]
  },
  {
    id: "cm-02", equipo: "Oxicorte / Soldadura Oxiacetilénica", zona: "Innovación",
    procesos: ["Corte de metales por fusión", "Soldadura oxiacetilénica"],
    epp: [
      { nombre: "Careta de soldador (DIN 5 para corte, DIN 11 para soldar)", nivel: "obligatorio" },
      { nombre: "Guantes de cuero gruesos", nivel: "obligatorio" },
      { nombre: "Delantal de cuero o casaca", nivel: "obligatorio" },
      { nombre: "Botas con punta de acero", nivel: "obligatorio" },
    ],
    alertas: ["Cilindros de acetileno: almacenar verticales, alejados de calor y fuentes de ignición. Verificar válvulas antes de cada uso"]
  },
  {
    id: "cm-03", equipo: "Plasma / Cortadora de Plasma", zona: "Innovación",
    procesos: ["Corte de metales con plasma", "Perfilado de piezas"],
    epp: [
      { nombre: "Careta de soldador (DIN 9)", nivel: "obligatorio" },
      { nombre: "Guantes de cuero", nivel: "obligatorio" },
      { nombre: "Delantal de cuero", nivel: "obligatorio" },
      { nombre: "Orejeras", nivel: "recomendado" },
    ],
    alertas: ["Chispas proyectadas a más de 3 metros. Zona de trabajo libre de materiales combustibles"]
  },
  {
    id: "cm-04", equipo: "Amoladora Angular (Metalmecánica)", zona: "Innovación",
    procesos: ["Desbaste y corte de metales", "Pulido de soldaduras"],
    epp: [
      { nombre: "Careta facial completa (NO solo lentes)", nivel: "obligatorio" },
      { nombre: "Guantes de cuero", nivel: "obligatorio" },
      { nombre: "Orejeras", nivel: "obligatorio" },
      { nombre: "Casaca de mangas largas", nivel: "obligatorio" },
    ],
    alertas: ["Disco de desbaste ≠ disco de corte. Usar el correcto. Velocidad máx. del disco ≥ RPM de la máquina"]
  },
  {
    id: "cm-05", equipo: "Torno Metálico", zona: "Innovación",
    procesos: ["Torneado de piezas", "Roscado", "Cilindrado"],
    epp: [
      { nombre: "Lentes de policarbonato (o careta)", nivel: "obligatorio" },
      { nombre: "Ropa ajustada", nivel: "obligatorio" },
    ],
    noGuantes: true,
    alertas: ["PROHIBIDO: guantes, joyas, mangas sueltas. Viruta de metal: retirar solo con gancho, nunca a mano"]
  },
  {
    id: "cm-06", equipo: "Taladro de Columna (Metal)", zona: "Innovación",
    procesos: ["Perforaciones de precisión en metal", "Avellanado"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Ropa ajustada", nivel: "obligatorio" },
    ],
    noGuantes: true,
    alertas: ["Sujetar la pieza con prensa o mordaza. NUNCA sujetar con la mano. PROHIBIDO guantes"]
  },
  {
    id: "cm-07", equipo: "Dobladora / Punzonadora", zona: "Innovación",
    procesos: ["Doblado de láminas", "Punzonado de perforaciones"],
    epp: [
      { nombre: "Guantes de cuero", nivel: "obligatorio" },
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Botas con punta de acero", nivel: "recomendado" },
    ],
    alertas: ["Cantos de chapa cortantes. Siempre usar guantes al manipular láminas de metal"]
  },
  {
    id: "cm-08", equipo: "Sierra de Cinta / Tronzadora Metálica", zona: "Innovación",
    procesos: ["Corte de perfiles tubulares y barras", "Trozado de piezas"],
    epp: [
      { nombre: "Lentes de policarbonato", nivel: "obligatorio" },
      { nombre: "Guantes de cuero", nivel: "obligatorio" },
      { nombre: "Orejeras", nivel: "recomendado" },
    ],
    noGuantes: false,
    alertas: ["En tronzadora: mantener manos alejadas del plano de corte. Sujetar pieza firmemente"]
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// MAP PRINCIPAL: talleres → EPP rows
// ─────────────────────────────────────────────────────────────────────────────
export const eppPorTaller: Record<string, EPPRow[]> = {
  "ebanisteria":             eppEbanisteria,
  "mecanica-automotriz":     eppMecanicaAutomotriz,
  "cocina-reposteria":       eppCocinaReposteria,
  "industria-vestido":       eppIndustriaVestido,
  "computacion-informatica": eppComputacionInformatica,
  "electronica":             eppElectronica,
  "industria-alimentaria":   eppIndustriaAlimentaria,
  "electricidad":            eppElectricidad,
  "construcciones-metalicas":eppConstruccionesMetalicas,
}

export const getEPPByTaller = (slug: string): EPPRow[] =>
  eppPorTaller[slug] ?? []
