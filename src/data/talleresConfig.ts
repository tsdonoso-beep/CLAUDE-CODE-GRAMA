// Configuración de los 9 talleres EPT — nombres del MD, orden de la referencia visual
export interface TallerConfig {
  id: string;
  slug: string;
  nombre: string;
  nombreCorto: string;
  numero: number;
  descripcion: string;
  competencias: string[];      // habilidades clave que desarrolla el docente
  color: string;
  icon: string;
  imagen: string;
  zonas: {
    id: string;
    nombre: string;
    descripcion: string;
  }[];
}

export const talleresConfig: TallerConfig[] = [
  {
    id: "mecanica-automotriz",
    slug: "mecanica-automotriz",
    nombre: "Mecánica Automotriz",
    nombreCorto: "Mecánica Automotriz",
    numero: 1,
    descripcion: "Aprende los fundamentos de la mecánica automotriz, diagnóstico y mantenimiento de vehículos. Formación técnica en sistemas de motor, transmisión, frenos y suspensión.",
    competencias: [
      "Diagnóstico de fallas con escáner automotriz",
      "Mantenimiento preventivo y correctivo de vehículos",
      "Soldadura automotriz MIG y oxiacetilénica",
      "Sistemas de suspensión, dirección y frenos ABS",
      "Gestión y seguridad del taller automotriz",
    ],
    color: "220 70% 50%",
    icon: "Car",
    imagen: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    zonas: [
      { id: "investigacion", nombre: "Zona Investigación", descripcion: "Equipos para identificar necesidades y problemas" },
      { id: "innovacion", nombre: "Zona Innovación", descripcion: "Equipos para diseñar y crear prototipos" },
      { id: "seguridad", nombre: "Seguridad", descripcion: "Equipamiento de protección personal" }
    ]
  },
  {
    id: "industria-vestido",
    slug: "industria-vestido",
    nombre: "Industria del Vestido",
    nombreCorto: "Ind. del Vestido",
    numero: 2,
    descripcion: "Diseño, patronaje, confección y acabados de prendas de vestir. Formación en técnicas de costura industrial, moldería, textiles y emprendimiento en moda.",
    competencias: [
      "Patronaje, moldería y escalado de tallas",
      "Costura industrial y acabados textiles",
      "Diseño de colecciones y tendencias de moda",
      "Control de calidad en confección",
      "Emprendimiento y gestión de negocio textil",
    ],
    color: "330 65% 50%",
    icon: "Scissors",
    imagen: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=800&q=80",
    zonas: [
      { id: "investigacion", nombre: "Zona Investigación", descripcion: "Equipos para identificar necesidades y problemas" },
      { id: "innovacion", nombre: "Zona Innovación", descripcion: "Equipos para diseñar y crear prototipos" },
      { id: "seguridad", nombre: "Seguridad", descripcion: "Equipamiento de protección personal" }
    ]
  },
  {
    id: "cocina-reposteria",
    slug: "cocina-reposteria",
    nombre: "Cocina y Repostería",
    nombreCorto: "Cocina y Repostería",
    numero: 3,
    descripcion: "Técnicas culinarias, preparación de alimentos y arte de la repostería. Desarrollo de competencias en cocina nacional e internacional, pastelería y gestión.",
    competencias: [
      "Técnicas culinarias de cocina nacional e internacional",
      "Pastelería, repostería y decoración de tortas",
      "Inocuidad alimentaria y BPM en cocina",
      "Gestión de costos y carta de menú",
      "Emprendimiento gastronómico y atención al cliente",
    ],
    color: "30 70% 50%",
    icon: "ChefHat",
    imagen: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    zonas: [
      { id: "investigacion", nombre: "Zona Investigación", descripcion: "Equipos para identificar necesidades y problemas" },
      { id: "innovacion", nombre: "Zona Innovación", descripcion: "Equipos para diseñar y crear prototipos" },
      { id: "seguridad", nombre: "Seguridad", descripcion: "Equipamiento de protección personal" }
    ]
  },
  {
    id: "ebanisteria",
    slug: "ebanisteria",
    nombre: "Ebanistería",
    nombreCorto: "Ebanistería",
    numero: 4,
    descripcion: "Diseño y fabricación de muebles finos y estructuras en madera. Formación en técnicas de torno, ensamble, lacado y acabados de alta calidad.",
    competencias: [
      "Diseño y lectura de planos de muebles",
      "Operación de torno, fresadora y sierra de cinta",
      "Técnicas de ensamble y unión de madera",
      "Acabados: lacado, barnizado y pintura",
      "Gestión del taller y control de calidad",
    ],
    color: "25 55% 42%",
    icon: "Hammer",
    imagen: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80",
    zonas: [
      { id: "investigacion", nombre: "Zona Investigación", descripcion: "Equipos para identificar necesidades y problemas" },
      { id: "innovacion", nombre: "Zona Innovación", descripcion: "Equipos para diseñar y crear prototipos" },
      { id: "seguridad", nombre: "Seguridad", descripcion: "Equipamiento de protección personal" }
    ]
  },
  {
    id: "computacion-informatica",
    slug: "computacion-informatica",
    nombre: "Comp. e Informática",
    nombreCorto: "Comp. e Informática",
    numero: 5,
    descripcion: "Programación, redes y soporte técnico de sistemas informáticos. Formación en ofimática, desarrollo web básico y mantenimiento de hardware y software.",
    competencias: [
      "Desarrollo web básico: HTML, CSS, JavaScript",
      "Mantenimiento y ensamble de hardware",
      "Redes LAN, Wi-Fi y seguridad informática",
      "Ofimática avanzada y herramientas digitales",
      "Soporte técnico y resolución de problemas",
    ],
    color: "180 65% 38%",
    icon: "Monitor",
    imagen: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    zonas: [
      { id: "investigacion", nombre: "Zona Investigación", descripcion: "Equipos para identificar necesidades y problemas" },
      { id: "innovacion", nombre: "Zona Innovación", descripcion: "Equipos para diseñar y crear prototipos" },
      { id: "seguridad", nombre: "Seguridad", descripcion: "Equipamiento de protección personal" }
    ]
  },
  {
    id: "electronica",
    slug: "electronica",
    nombre: "Electrónica",
    nombreCorto: "Electrónica",
    numero: 6,
    descripcion: "Diseño, montaje y reparación de circuitos y sistemas electrónicos. Formación en automatización, microcontroladores y electrónica de potencia.",
    competencias: [
      "Diseño y montaje de circuitos electrónicos",
      "Programación de microcontroladores Arduino y PLC",
      "Automatización industrial y control de procesos",
      "Soldadura electrónica y diagnóstico de equipos",
      "Electrónica de potencia y fuentes de energía",
    ],
    color: "200 70% 45%",
    icon: "Cpu",
    imagen: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80",
    zonas: [
      { id: "investigacion", nombre: "Zona Investigación", descripcion: "Equipos para identificar necesidades y problemas" },
      { id: "innovacion", nombre: "Zona Innovación", descripcion: "Equipos para diseñar y crear prototipos" },
      { id: "seguridad", nombre: "Seguridad", descripcion: "Equipamiento de protección personal" }
    ]
  },
  {
    id: "industria-alimentaria",
    slug: "industria-alimentaria",
    nombre: "Ind. Alimentaria",
    nombreCorto: "Ind. Alimentaria",
    numero: 7,
    descripcion: "Procesamiento, conservación y control de calidad de alimentos. Buenas prácticas de manufactura, inocuidad alimentaria y gestión de producción.",
    competencias: [
      "Procesamiento y transformación de alimentos",
      "Buenas Prácticas de Manufactura (BPM)",
      "Control de calidad e inocuidad alimentaria",
      "Conservación, envasado y etiquetado",
      "Emprendimiento en la industria alimentaria",
    ],
    color: "50 70% 42%",
    icon: "UtensilsCrossed",
    imagen: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80",
    zonas: [
      { id: "investigacion", nombre: "Zona Investigación", descripcion: "Equipos para identificar necesidades y problemas" },
      { id: "innovacion", nombre: "Zona Innovación", descripcion: "Equipos para diseñar y crear prototipos" },
      { id: "seguridad", nombre: "Seguridad", descripcion: "Equipamiento de protección personal" }
    ]
  },
  {
    id: "electricidad",
    slug: "electricidad",
    nombre: "Electricidad",
    nombreCorto: "Electricidad",
    numero: 8,
    descripcion: "Instalación y mantenimiento de sistemas eléctricos residenciales e industriales. Formación en tableros, redes y normativa de seguridad eléctrica.",
    competencias: [
      "Instalaciones eléctricas residenciales e industriales",
      "Diseño y montaje de tableros eléctricos",
      "Normativa NEC y seguridad en instalaciones",
      "Sistemas fotovoltaicos y energías renovables",
      "Mantenimiento eléctrico preventivo y correctivo",
    ],
    color: "45 80% 48%",
    icon: "Zap",
    imagen: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    zonas: [
      { id: "investigacion", nombre: "Zona Investigación", descripcion: "Equipos para identificar necesidades y problemas" },
      { id: "innovacion", nombre: "Zona Innovación", descripcion: "Equipos para diseñar y crear prototipos" },
      { id: "seguridad", nombre: "Seguridad", descripcion: "Equipamiento de protección personal" }
    ]
  },
  {
    id: "taller-general-ept",
    slug: "taller-general-ept",
    nombre: "Taller General EPT",
    nombreCorto: "Taller General EPT",
    numero: 10,
    descripcion: "Espacio transversal de aprendizaje EPT equipado con TICs, herramientas de diseño, fabricación digital y recursos pedagógicos para desarrollar competencias de emprendimiento e innovación.",
    competencias: [
      "Identificación de necesidades y problemas del usuario",
      "Diseño y prototipado de propuestas de valor",
      "Fabricación digital: impresión 3D, corte láser y sublimación",
      "Planificación y gestión de proyectos productivos",
      "Uso de TICs para documentar, comunicar y emprender",
    ],
    color: "158 60% 38%",
    icon: "Layers",
    imagen: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    zonas: [
      { id: "investigacion", nombre: "Zona Investigación", descripcion: "TICs y recursos pedagógicos para identificar necesidades" },
      { id: "innovacion", nombre: "Zona Innovación", descripcion: "Equipos de fabricación digital y prototipado" },
      { id: "seguridad", nombre: "Seguridad", descripcion: "Equipamiento de protección personal y emergencias" }
    ]
  },
  {
    id: "construcciones-metalicas",
    slug: "construcciones-metalicas",
    nombre: "Const. Metálicas",
    nombreCorto: "Const. Metálicas",
    numero: 9,
    descripcion: "Técnicas de soldadura, corte y ensamble de estructuras metálicas. Formación en lectura de planos, metalmecánica y fabricación industrial.",
    competencias: [
      "Soldadura MIG, TIG y SMAW (electrodo revestido)",
      "Corte con plasma, oxicorte y amolado",
      "Lectura de planos y trazado de estructuras",
      "Doblado, punzonado y conformado de metales",
      "Control de calidad en uniones soldadas",
    ],
    color: "15 55% 45%",
    icon: "Wrench",
    imagen: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    zonas: [
      { id: "investigacion", nombre: "Zona Investigación", descripcion: "Equipos para identificar necesidades y problemas" },
      { id: "innovacion", nombre: "Zona Innovación", descripcion: "Equipos para diseñar y crear prototipos" },
      { id: "seguridad", nombre: "Seguridad", descripcion: "Equipamiento de protección personal" }
    ]
  }
];


export const getTallerBySlug = (slug: string): TallerConfig | undefined => {
  return talleresConfig.find(t => t.slug === slug);
};

export const getZonasByTaller = (tallerSlug: string) => {
  const taller = getTallerBySlug(tallerSlug);
  return taller?.zonas || [];
};
