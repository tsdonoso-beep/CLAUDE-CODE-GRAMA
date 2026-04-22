import type { DescargableLXP } from './descargablesLXP'

// ─────────────────────────────────────────────────────────────────────────────
// Descargables específicos — Taller Mecánica Automotriz
// ─────────────────────────────────────────────────────────────────────────────

export const descargablesMeca: DescargableLXP[] = [

  // 1. FICHA DE METRADO DE EQUIPOS
  {
    id: 'desc-m1-meca-metrado',
    modulo: 'm1',
    titulo: 'Ficha de Metrado de Equipos Automotrices',
    subtitulo: 'Registro oficial por zona pedagógica — Taller TSF-MINEDU',
    descripcion: 'Ficha técnica para el inventario y clasificación de todos los bienes del taller automotriz por zona pedagógica (Investigación, Innovación, Almacén). Incluye campos específicos automotrices: voltaje requerido, protocolos OBD compatibles, calibración periódica y código de bien MINEDU.',
    tipo: 'FICHA_PLASTIFICABLE',
    formato: 'A4',
    paginas: 6,
    instrucciones: 'Completar al momento de recepción de los equipos, antes de instalación. Un formulario por equipo. Firmar la hoja de entrega UGEL al finalizar.',
    nota: 'Archivo oficial patrimonial. Conservar original firmado en carpeta del taller. Enviar copia a la UGEL al completar el metrado.',
    secciones: [
      {
        id: 'metrado-s1',
        titulo: 'Datos del Taller',
        campos: [
          { id: 'met-ie', etiqueta: 'Institución Educativa', tipo: 'texto', requerido: true },
          { id: 'met-ugel', etiqueta: 'UGEL', tipo: 'texto', requerido: true },
          { id: 'met-region', etiqueta: 'Región', tipo: 'texto', requerido: true },
          { id: 'met-docente', etiqueta: 'Docente responsable del taller', tipo: 'texto', requerido: true },
          { id: 'met-fecha', etiqueta: 'Fecha de recepción del equipo', tipo: 'fecha', requerido: true },
          { id: 'met-acta', etiqueta: 'N° de Acta de Entrega MINEDU', tipo: 'texto', requerido: true }
        ]
      },
      {
        id: 'metrado-s2',
        titulo: 'Identificación del Equipo',
        campos: [
          { id: 'met-nombre', etiqueta: 'Nombre del equipo / herramienta', tipo: 'texto', requerido: true },
          { id: 'met-marca', etiqueta: 'Marca', tipo: 'texto', requerido: true },
          { id: 'met-modelo', etiqueta: 'Modelo', tipo: 'texto', requerido: true },
          { id: 'met-serie', etiqueta: 'N° de serie', tipo: 'texto', requerido: true },
          { id: 'met-codigo-minedu', etiqueta: 'Código de bien MINEDU', tipo: 'texto', requerido: true },
          { id: 'met-cantidad', etiqueta: 'Cantidad recibida', tipo: 'numero', requerido: true },
          { id: 'met-estado-recepcion', etiqueta: 'Estado en recepción', tipo: 'select', opciones: ['Nuevo — sin uso', 'Operativo', 'Con observaciones (detallar)', 'Dañado en despacho'], requerido: true }
        ]
      },
      {
        id: 'metrado-s3',
        titulo: 'Zona Pedagógica Asignada',
        descripcion: 'Clasificar según la función pedagógica del equipo, no por tamaño ni peso',
        campos: [
          { id: 'met-zona', etiqueta: 'Zona pedagógica', tipo: 'select', opciones: ['Zona de Investigación (diagnóstico)', 'Zona de Innovación (trabajo activo)', 'Zona de Almacén (herramientas y consumibles)'], requerido: true },
          { id: 'met-zona-justif', etiqueta: 'Justificación de la zona asignada', tipo: 'area' },
          { id: 'met-ubicacion-fisica', etiqueta: 'Ubicación física en el taller (ej: Panel norte, Banco 2)', tipo: 'texto' }
        ]
      },
      {
        id: 'metrado-s4',
        titulo: 'Especificaciones Técnicas Automotrices',
        campos: [
          { id: 'met-voltaje', etiqueta: 'Voltaje requerido', tipo: 'select', opciones: ['110V monofásico', '220V monofásico', '220V trifásico', 'Batería 12V', 'Batería 9V / pilas', 'Sin alimentación eléctrica'] },
          { id: 'met-obd', etiqueta: 'Protocolos OBD compatibles (si aplica)', tipo: 'texto', placeholder: 'Ej: OBD-II, CAN, K-Line, J1850' },
          { id: 'met-calibracion', etiqueta: 'Requiere calibración periódica', tipo: 'check' },
          { id: 'met-calibracion-freq', etiqueta: 'Frecuencia de calibración (si aplica)', tipo: 'texto', placeholder: 'Ej: Anual, cada 6 meses' },
          { id: 'met-accesorios', etiqueta: 'Accesorios incluidos en el despacho', tipo: 'area', placeholder: 'Listar cables, adaptadores, manuales, software, etc.' },
          { id: 'met-software', etiqueta: 'Requiere instalación de software', tipo: 'check' },
          { id: 'met-software-nombre', etiqueta: 'Nombre del software (si aplica)', tipo: 'texto' }
        ]
      },
      {
        id: 'metrado-s5',
        titulo: 'Garantía y Soporte',
        campos: [
          { id: 'met-garantia-meses', etiqueta: 'Meses de garantía', tipo: 'numero', requerido: true },
          { id: 'met-garantia-vence', etiqueta: 'Fecha de vencimiento de garantía', tipo: 'fecha', requerido: true },
          { id: 'met-empresa-garantia', etiqueta: 'Empresa prestadora de garantía', tipo: 'texto', requerido: true },
          { id: 'met-contacto-garantia', etiqueta: 'Teléfono / email de soporte técnico', tipo: 'texto' },
          { id: 'met-manual-disponible', etiqueta: 'Manual de usuario disponible', tipo: 'check' },
          { id: 'met-manual-idioma', etiqueta: 'Idioma del manual', tipo: 'select', opciones: ['Español', 'Inglés', 'Bilingüe', 'Sin manual'] }
        ]
      },
      {
        id: 'metrado-s6',
        titulo: 'Firma y Entrega UGEL',
        campos: [
          { id: 'met-obs-generales', etiqueta: 'Observaciones generales del metrado', tipo: 'area' },
          { id: 'met-firma-docente', etiqueta: 'Firma del docente responsable', tipo: 'firma', requerido: true },
          { id: 'met-firma-director', etiqueta: 'Firma del director de la IE', tipo: 'firma', requerido: true },
          { id: 'met-firma-ugel', etiqueta: 'Firma del representante UGEL (opcional)', tipo: 'firma' }
        ]
      }
    ]
  },

]
