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

  // 2. CHECKLIST DE INSTALACIÓN DE EQUIPOS
  {
    id: 'desc-m1-meca-instalacion',
    modulo: 'm1',
    titulo: 'Checklist de Instalación de Equipos del Taller',
    subtitulo: 'Guía paso a paso para la instalación segura y certificada',
    descripcion: 'Plantilla de verificación para la instalación completa del taller automotriz: pre-instalación eléctrica, elevador tipo tijera, sistema neumático, software de diagnóstico y prueba funcional. Cada etapa requiere firma de conformidad.',
    tipo: 'PLANTILLA',
    formato: 'A4',
    paginas: 8,
    instrucciones: 'Completar en orden secuencial. No avanzar a la siguiente sección si hay ítems sin marcar. Firmar cada sección al completarla. El documento firmado es el acta de instalación oficial.',
    nota: 'Este checklist es requisito para activar la garantía de los equipos instalados. Conservar copia firmada en la carpeta del taller.',
    secciones: [
      {
        id: 'inst-s1',
        titulo: 'Pre-instalación: Verificación del Espacio',
        descripcion: 'Completar ANTES de desempacar cualquier equipo',
        campos: [
          { id: 'inst-pre-ie', etiqueta: 'Institución Educativa', tipo: 'texto', requerido: true },
          { id: 'inst-pre-fecha', etiqueta: 'Fecha de inicio de instalación', tipo: 'fecha', requerido: true },
          { id: 'inst-pre-tecnico', etiqueta: 'Técnico responsable de la instalación', tipo: 'texto', requerido: true },
          { id: 'inst-pre-e1', etiqueta: 'El piso del taller soporta la carga del elevador (mín. 3 ton/m²)', tipo: 'check' },
          { id: 'inst-pre-e2', etiqueta: 'Existe toma trifásica 220V cerca de la zona del elevador', tipo: 'check' },
          { id: 'inst-pre-e3', etiqueta: 'El circuito eléctrico tiene disyuntor diferencial instalado', tipo: 'check' },
          { id: 'inst-pre-e4', etiqueta: 'La altura del techo es suficiente (mín. 3.5m sobre el elevador)', tipo: 'check' },
          { id: 'inst-pre-e5', etiqueta: 'Existe ventilación adecuada (ventanas o extractor) en el foso/zona elevador', tipo: 'check' },
          { id: 'inst-pre-e6', etiqueta: 'La zona del compresor está a menos de 15m del punto de uso más lejano', tipo: 'check' },
          { id: 'inst-pre-obs', etiqueta: 'Observaciones de la pre-instalación', tipo: 'area' },
          { id: 'inst-pre-firma', etiqueta: 'Firma de conformidad — Pre-instalación', tipo: 'firma', requerido: true }
        ]
      },
      {
        id: 'inst-s2',
        titulo: 'Instalación del Elevador Tipo Tijera',
        descripcion: 'Seguir en estricto orden. Verificar cada paso antes de continuar.',
        campos: [
          { id: 'inst-elev-1', etiqueta: '1. Posicionar el elevador en la zona marcada del piso', tipo: 'check' },
          { id: 'inst-elev-2', etiqueta: '2. Anclar los pernos de fijación al piso (mín. 4 puntos)', tipo: 'check' },
          { id: 'inst-elev-3', etiqueta: '3. Conectar el sistema hidráulico (verificar nivel de aceite hidráulico)', tipo: 'check' },
          { id: 'inst-elev-4', etiqueta: '4. Conectar la alimentación eléctrica 220V trifásica', tipo: 'check' },
          { id: 'inst-elev-5', etiqueta: '5. Prueba de elevación SIN CARGA — verificar que sube y baja suavemente', tipo: 'check' },
          { id: 'inst-elev-6', etiqueta: '6. Verificar activación de todos los seguros mecánicos de retención', tipo: 'check' },
          { id: 'inst-elev-7', etiqueta: '7. Prueba CON CARGA mínima (vehículo ligero < 1,500 kg)', tipo: 'check' },
          { id: 'inst-elev-8', etiqueta: '8. Verificar que los seguros se activan automáticamente bajo carga', tipo: 'check' },
          { id: 'inst-elev-9', etiqueta: '9. Señalizar la zona de peligro alrededor del elevador (cinta + panel)', tipo: 'check' },
          { id: 'inst-elev-carga-max', etiqueta: 'Capacidad de carga máxima del elevador instalado (kg)', tipo: 'numero', requerido: true },
          { id: 'inst-elev-obs', etiqueta: 'Observaciones de la instalación del elevador', tipo: 'area' },
          { id: 'inst-elev-firma', etiqueta: 'Firma de conformidad — Instalación del elevador', tipo: 'firma', requerido: true }
        ]
      },
      {
        id: 'inst-s3',
        titulo: 'Sistema Neumático (Compresor y Red de Aire)',
        campos: [
          { id: 'inst-neum-1', etiqueta: '1. Compresor instalado sobre base antivibración', tipo: 'check' },
          { id: 'inst-neum-2', etiqueta: '2. Mangueras de alta presión fijadas a la pared (sin contacto con piso)', tipo: 'check' },
          { id: 'inst-neum-3', etiqueta: '3. Válvulas de cierre instaladas en cada punto de toma', tipo: 'check' },
          { id: 'inst-neum-4', etiqueta: '4. Presión de trabajo del compresor verificada (mín. 90 PSI — máx. 120 PSI)', tipo: 'check' },
          { id: 'inst-neum-5', etiqueta: '5. Manómetro de control instalado y legible desde el punto de uso', tipo: 'check' },
          { id: 'inst-neum-6', etiqueta: '6. Purga del depósito realizada antes de la primera prueba de carga', tipo: 'check' },
          { id: 'inst-neum-presion', etiqueta: 'Presión de trabajo calibrada (PSI)', tipo: 'numero' },
          { id: 'inst-neum-obs', etiqueta: 'Observaciones del sistema neumático', tipo: 'area' },
          { id: 'inst-neum-firma', etiqueta: 'Firma de conformidad — Sistema neumático', tipo: 'firma', requerido: true }
        ]
      },
      {
        id: 'inst-s4',
        titulo: 'Software de Diagnóstico Automotriz',
        campos: [
          { id: 'inst-sw-equipo', etiqueta: 'Equipo donde se instala el software', tipo: 'texto', requerido: true, placeholder: 'Ej: Tablet LAUNCH X431, PC de la zona de investigación' },
          { id: 'inst-sw-nombre', etiqueta: 'Nombre del software instalado', tipo: 'texto', requerido: true },
          { id: 'inst-sw-version', etiqueta: 'Versión del software', tipo: 'texto', requerido: true },
          { id: 'inst-sw-1', etiqueta: '1. Licencia activada correctamente con código de activación del fabricante', tipo: 'check' },
          { id: 'inst-sw-2', etiqueta: '2. Base de datos de vehículos actualizada a la versión más reciente', tipo: 'check' },
          { id: 'inst-sw-3', etiqueta: '3. Drivers del adaptador OBD instalados (verificar en Administrador de dispositivos)', tipo: 'check' },
          { id: 'inst-sw-4', etiqueta: '4. Primer scan de prueba realizado con vehículo disponible', tipo: 'check' },
          { id: 'inst-sw-5', etiqueta: '5. Lectura de códigos confirmada — el software detectó el VIN del vehículo de prueba', tipo: 'check' },
          { id: 'inst-sw-vehiculo-prueba', etiqueta: 'Vehículo usado en prueba (marca, modelo, año)', tipo: 'texto' },
          { id: 'inst-sw-obs', etiqueta: 'Observaciones de la instalación del software', tipo: 'area' },
          { id: 'inst-sw-firma', etiqueta: 'Firma de conformidad — Software de diagnóstico', tipo: 'firma', requerido: true }
        ]
      },
      {
        id: 'inst-s5',
        titulo: 'Prueba Integral y Firma de Entrega',
        descripcion: 'Completar solo cuando todas las secciones anteriores estén firmadas',
        campos: [
          { id: 'inst-final-1', etiqueta: 'Todos los equipos instalados funcionan correctamente en prueba simultánea', tipo: 'check' },
          { id: 'inst-final-2', etiqueta: 'Panel de seguridad instalado y visible desde todas las zonas del taller', tipo: 'check' },
          { id: 'inst-final-3', etiqueta: 'Extintor recargado y ubicado en zona accesible', tipo: 'check' },
          { id: 'inst-final-4', etiqueta: 'Botiquín de primeros auxilios disponible en el taller', tipo: 'check' },
          { id: 'inst-final-5', etiqueta: 'Fichas de metrado completadas para todos los equipos instalados', tipo: 'check' },
          { id: 'inst-final-obs', etiqueta: 'Observaciones finales y pendientes', tipo: 'area' },
          { id: 'inst-final-fecha', etiqueta: 'Fecha de finalización de la instalación', tipo: 'fecha', requerido: true },
          { id: 'inst-final-firma-docente', etiqueta: 'Firma del docente responsable del taller', tipo: 'firma', requerido: true },
          { id: 'inst-final-firma-director', etiqueta: 'Firma del director de la IE', tipo: 'firma', requerido: true },
          { id: 'inst-final-firma-tecnico', etiqueta: 'Firma del técnico instalador', tipo: 'firma', requerido: true }
        ]
      }
    ]
  },

]
