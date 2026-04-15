/**
 * Repositorio estático de talleres.
 * Lee de talleresConfig (datos hardcoded) — se ejecuta en servidor (RSC).
 * Zero JS al cliente.
 */
import type { ITallerRepository } from '@/domain/taller/repositories/ITallerRepository'
import type { Taller } from '@/domain/taller/entities/Taller'
import type { TallerSlug } from '@/domain/shared/types'

// Datos migrados de src/data/talleresConfig.ts
const TALLERES: Taller[] = [
  {
    id: 'mecanica-automotriz',
    slug: 'mecanica-automotriz',
    nombre: 'Mecánica Automotriz',
    nombreCorto: 'Automotriz',
    numero: 1,
    descripcion: 'Mantenimiento y reparación de vehículos motorizados. Diagnóstico, sistemas mecánicos, eléctricos y electrónicos del automóvil moderno.',
    competencias: ['Diagnóstico automotriz', 'Mantenimiento preventivo', 'Sistemas de frenos', 'Motor y transmisión'],
    color: '#3b82f6',
    icon: 'Car',
    imagen: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200',
    zonas: [
      { id: 'investigacion', nombre: 'Zona de Investigación', descripcion: 'Diagnóstico y análisis' },
      { id: 'innovacion', nombre: 'Zona de Innovación', descripcion: 'Taller de práctica' },
      { id: 'deposito', nombre: 'Depósito / Almacén', descripcion: 'Herramientas y EPP' },
    ],
  },
  {
    id: 'industria-vestido',
    slug: 'industria-vestido',
    nombre: 'Industria del Vestido',
    nombreCorto: 'Vestido',
    numero: 2,
    descripcion: 'Diseño, corte y confección textil. Moda, patronaje, costura industrial y técnicas de acabados en prendas de vestir.',
    competencias: ['Patronaje', 'Costura industrial', 'Diseño de moda', 'Control de calidad textil'],
    color: '#ec4899',
    icon: 'Shirt',
    imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    zonas: [
      { id: 'investigacion', nombre: 'Zona de Investigación', descripcion: 'Diseño y patronaje' },
      { id: 'innovacion', nombre: 'Zona de Innovación', descripcion: 'Taller de costura' },
      { id: 'deposito', nombre: 'Depósito / Almacén', descripcion: 'Insumos y EPP' },
    ],
  },
  {
    id: 'cocina-reposteria',
    slug: 'cocina-reposteria',
    nombre: 'Cocina y Repostería',
    nombreCorto: 'Cocina',
    numero: 3,
    descripcion: 'Arte culinario y pastelería. Técnicas de cocina profesional, repostería, panificación y gestión gastronómica.',
    competencias: ['Técnicas culinarias', 'Repostería y pastelería', 'Panificación', 'Gestión de cocina'],
    color: '#f97316',
    icon: 'ChefHat',
    imagen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
    zonas: [
      { id: 'investigacion', nombre: 'Zona de Investigación', descripcion: 'Nutrición y recetas' },
      { id: 'innovacion', nombre: 'Zona de Innovación', descripcion: 'Cocina práctica' },
      { id: 'deposito', nombre: 'Depósito / Almacén', descripcion: 'Insumos y equipos' },
    ],
  },
  {
    id: 'ebanisteria',
    slug: 'ebanisteria',
    nombre: 'Ebanistería',
    nombreCorto: 'Ebanistería',
    numero: 4,
    descripcion: 'Diseño y fabricación de muebles finos y estructuras en madera. Formación en técnicas de torno, ensamble, lacado y acabados de alta calidad.',
    competencias: ['Diseño de muebles', 'Máquinas de carpintería', 'Acabados y lacado', 'Ensamble y estructura'],
    color: '#b8975a',
    icon: 'Hammer',
    imagen: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1200',
    zonas: [
      { id: 'investigacion', nombre: 'Zona de Investigación', descripcion: 'Diseño y materiales' },
      { id: 'innovacion', nombre: 'Zona de Innovación', descripcion: 'Máquinas y fabricación' },
      { id: 'deposito', nombre: 'Depósito / Almacén', descripcion: 'Herramientas y EPP' },
    ],
  },
  {
    id: 'computacion-informatica',
    slug: 'computacion-informatica',
    nombre: 'Computación e Informática',
    nombreCorto: 'Computación',
    numero: 5,
    descripcion: 'Tecnologías de la información y comunicación. Programación, redes, mantenimiento de equipos y aplicaciones digitales.',
    competencias: ['Programación', 'Redes y conectividad', 'Mantenimiento de PC', 'Ofimática avanzada'],
    color: '#22d3ee',
    icon: 'Monitor',
    imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
    zonas: [
      { id: 'investigacion', nombre: 'Zona de Investigación', descripcion: 'Software y análisis' },
      { id: 'innovacion', nombre: 'Zona de Innovación', descripcion: 'Laboratorio de cómputo' },
      { id: 'deposito', nombre: 'Depósito / Almacén', descripcion: 'Equipos y periféricos' },
    ],
  },
  {
    id: 'electronica',
    slug: 'electronica',
    nombre: 'Electrónica',
    nombreCorto: 'Electrónica',
    numero: 6,
    descripcion: 'Circuitos electrónicos, microcontroladores y sistemas embebidos. Soldadura, diagnóstico y reparación de equipos electrónicos.',
    competencias: ['Circuitos electrónicos', 'Microcontroladores', 'Soldadura SMD', 'Diagnóstico de equipos'],
    color: '#a78bfa',
    icon: 'Cpu',
    imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
    zonas: [
      { id: 'investigacion', nombre: 'Zona de Investigación', descripcion: 'Análisis y simulación' },
      { id: 'innovacion', nombre: 'Zona de Innovación', descripcion: 'Laboratorio electrónico' },
      { id: 'deposito', nombre: 'Depósito / Almacén', descripcion: 'Componentes y EPP' },
    ],
  },
  {
    id: 'industria-alimentaria',
    slug: 'industria-alimentaria',
    nombre: 'Industria Alimentaria',
    nombreCorto: 'Alimentaria',
    numero: 7,
    descripcion: 'Procesamiento y conservación de alimentos. BPM, HACCP, tecnología de alimentos y gestión de inocuidad alimentaria.',
    competencias: ['Procesamiento de alimentos', 'BPM y HACCP', 'Control de calidad', 'Envasado y conservación'],
    color: '#22c55e',
    icon: 'Factory',
    imagen: 'https://images.unsplash.com/photo-1565787222888-e4a0b05c53a3?w=1200',
    zonas: [
      { id: 'investigacion', nombre: 'Zona de Investigación', descripcion: 'Análisis y calidad' },
      { id: 'innovacion', nombre: 'Zona de Innovación', descripcion: 'Planta de procesamiento' },
      { id: 'deposito', nombre: 'Depósito / Almacén', descripcion: 'Insumos y EPP' },
    ],
  },
  {
    id: 'electricidad',
    slug: 'electricidad',
    nombre: 'Electricidad',
    nombreCorto: 'Electricidad',
    numero: 8,
    descripcion: 'Instalaciones eléctricas residenciales e industriales. Automatización, tableros eléctricos y normativa NTP.',
    competencias: ['Instalaciones eléctricas', 'Automatización industrial', 'Tableros y control', 'Normativa NTP'],
    color: '#fbbf24',
    icon: 'Zap',
    imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    zonas: [
      { id: 'investigacion', nombre: 'Zona de Investigación', descripcion: 'Teoría y normativa' },
      { id: 'innovacion', nombre: 'Zona de Innovación', descripcion: 'Taller de instalaciones' },
      { id: 'deposito', nombre: 'Depósito / Almacén', descripcion: 'Materiales y EPP' },
    ],
  },
  {
    id: 'construcciones-metalicas',
    slug: 'construcciones-metalicas',
    nombre: 'Construcciones Metálicas',
    nombreCorto: 'Met. Mecánica',
    numero: 9,
    descripcion: 'Soldadura, estructuras metálicas y fabricación de piezas. Oxicorte, TIG, MIG/MAG y diseño de estructuras.',
    competencias: ['Soldadura TIG/MIG', 'Oxicorte', 'Estructuras metálicas', 'Lectura de planos'],
    color: '#94a3b8',
    icon: 'Wrench',
    imagen: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200',
    zonas: [
      { id: 'investigacion', nombre: 'Zona de Investigación', descripcion: 'Diseño y materiales' },
      { id: 'innovacion', nombre: 'Zona de Innovación', descripcion: 'Taller de soldadura' },
      { id: 'deposito', nombre: 'Depósito / Almacén', descripcion: 'Herramientas y EPP' },
    ],
  },
  {
    id: 'taller-general-ept',
    slug: 'taller-general-ept',
    nombre: 'Taller General EPT',
    nombreCorto: 'General EPT',
    numero: 10,
    descripcion: 'Espacio transversal de innovación, emprendimiento y tecnología. Impresión 3D, corte láser, electrónica maker y prototipado.',
    competencias: ['Prototipado 3D', 'Corte láser', 'Electrónica maker', 'Emprendimiento'],
    color: '#02d47e',
    icon: 'Lightbulb',
    imagen: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
    zonas: [
      { id: 'investigacion', nombre: 'Zona de Investigación', descripcion: 'Ideación y diseño' },
      { id: 'innovacion', nombre: 'Zona de Innovación', descripcion: 'Fabricación digital' },
      { id: 'deposito', nombre: 'Depósito / Almacén', descripcion: 'Materiales maker' },
    ],
  },
]

class StaticTallerRepositoryImpl implements ITallerRepository {
  getAll(): Taller[] {
    return TALLERES
  }

  getBySlug(slug: TallerSlug): Taller | null {
    return TALLERES.find(t => t.slug === slug) ?? null
  }
}

export const staticTallerRepository: ITallerRepository = new StaticTallerRepositoryImpl()
