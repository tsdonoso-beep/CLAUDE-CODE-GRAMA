// src/data/manualesRuta.ts
// Manuales genéricos de la Ruta de Aprendizaje LXP — GRAMA / TSF-MINEDU
// Aplicables a los 9 talleres EPT. Contenido estructurado para renderizado en plataforma.

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

export interface FilaTabla {
  celdas: string[]
}

export interface TablaManual {
  id: string
  titulo?: string
  encabezados: string[]
  filas: FilaTabla[]
  nota?: string
}

export interface SeccionManual {
  id: string
  numero: string
  titulo: string
  contenido: string        // Texto principal — puede incluir markdown básico
  subsecciones?: SeccionManual[]
  tablas?: TablaManual[]
  listaItems?: string[]
  alertas?: { tipo: 'info' | 'advertencia' | 'critico'; texto: string }[]
}

export interface ManualRuta {
  id: string
  modulo: string           // "m1", "m4", "m5", "m6"
  titulo: string
  subtitulo: string
  descripcion: string
  version: string
  paginas: number
  destinatario: string
  secciones: SeccionManual[]
}

// ─────────────────────────────────────────────────────────────────────────────
// MANUAL 1 · Marco Normativo de Seguridad Ocupacional en Talleres EPT
// Módulo M1 — 28 páginas · Orientación
// ─────────────────────────────────────────────────────────────────────────────
export const manualSeguridadM1: ManualRuta = {
  id: "manual-seguridad-m1",
  modulo: "m1",
  titulo: "Marco Normativo de Seguridad Ocupacional en Talleres EPT",
  subtitulo: "Guía de referencia para docentes de Educación Técnico Productiva — TSF MINEDU",
  descripcion: "Marco legal, protocolos operativos y estándares de seguridad aplicables a todos los talleres EPT del programa TSF. Documento de referencia obligatoria para el Módulo 1.",
  version: "2024-v1",
  paginas: 28,
  destinatario: "Docentes de talleres EPT — Todos los talleres del programa TSF",
  secciones: [
    {
      id: "s1",
      numero: "1",
      titulo: "Marco Legal y Normativo",
      contenido: "La seguridad en los talleres de Educación Técnico Productiva está regulada por un conjunto de normas nacionales e institucionales que el docente debe conocer y aplicar. Estas normas no son recomendaciones opcionales: son obligaciones legales cuyo incumplimiento genera responsabilidad administrativa y penal.",
      subsecciones: [
        {
          id: "s1-1",
          numero: "1.1",
          titulo: "Normativa Nacional Vigente",
          contenido: "Las siguientes normas constituyen el marco legal de la seguridad en talleres EPT:",
          listaItems: [
            "Ley N° 29783 — Ley de Seguridad y Salud en el Trabajo (aplicable a espacios educativos con riesgo)",
            "D.S. N° 005-2012-TR — Reglamento de la Ley de SST",
            "R.M. N° 451-2014-MINEDU — Normas de seguridad en instituciones educativas",
            "R.V.M. N° 174-2021-MINEDU — Lineamientos para el uso de talleres EPT",
            "NTP 399.010 — Señales de seguridad (colores y símbolos normalizados)",
            "NTP 350.062 — Requisitos para extintores portátiles en espacios educativos"
          ]
        },
        {
          id: "s1-2",
          numero: "1.2",
          titulo: "Responsabilidades del Docente de Taller",
          contenido: "El docente de taller EPT tiene responsabilidades específicas en materia de seguridad que van más allá del rol pedagógico:",
          listaItems: [
            "Verificar el estado operativo de cada equipo antes de cada sesión práctica",
            "Garantizar el uso correcto del Equipo de Protección Personal (EPP) por todos los participantes",
            "Mantener actualizados los registros de mantenimiento y verificación de equipos",
            "Conocer y practicar el Plan de Emergencia de la institución",
            "Reportar inmediatamente cualquier incidente o equipo en mal estado a la dirección",
            "Actualizar el Mapa de Riesgos del taller al menos una vez por semestre",
            "Capacitar a los estudiantes en protocolos de seguridad antes de iniciar cualquier práctica"
          ]
        }
      ]
    },
    {
      id: "s2",
      numero: "2",
      titulo: "Identificación y Evaluación de Riesgos",
      contenido: "La gestión del riesgo en el taller comienza por identificar qué puede salir mal, quién puede verse afectado y con qué probabilidad y severidad. Esta sección proporciona la metodología básica de evaluación de riesgos aplicable a todos los talleres EPT.",
      subsecciones: [
        {
          id: "s2-1",
          numero: "2.1",
          titulo: "Tipos de Riesgo en el Taller",
          contenido: "Los riesgos en talleres EPT se clasifican en cinco categorías principales:",
          listaItems: [
            "MECÁNICOS: Cortes, aplastamientos, proyecciones de partículas, atrapamientos por máquinas en movimiento",
            "FÍSICOS: Ruido superior a 85 dB, vibraciones, calor radiante, iluminación insuficiente",
            "QUÍMICOS: Vapores de solventes, polvos de madera o metal, humos de soldadura, gases de pintura",
            "ERGONÓMICOS: Posturas forzadas, movimientos repetitivos, manejo manual de cargas pesadas",
            "ELÉCTRICOS: Contacto con partes en tensión, cables en mal estado, falta de puesta a tierra"
          ]
        },
        {
          id: "s2-2",
          numero: "2.2",
          titulo: "Matriz de Riesgos por Zona",
          contenido: "Cada zona del taller concentra riesgos específicos que deben estar identificados y señalizados:",
          tablas: [
            {
              id: "t-riesgos-zona",
              titulo: "Nivel de riesgo por zona y tipo",
              encabezados: ["Zona", "Riesgo Principal", "Nivel", "Control Mínimo Requerido"],
              filas: [
                { celdas: ["Investigación y Diseño", "Eléctrico (equipos)", "BAJO", "Cables en buen estado, tomas con protección"] },
                { celdas: ["Innovación y Máquinas", "Mecánico (cortes, proyecciones)", "ALTO", "EPP completo, guardas, capacitación previa"] },
                { celdas: ["Acabados", "Químico (vapores, polvos)", "MEDIO-ALTO", "Ventilación, respirador, señalización"] },
                { celdas: ["Almacén", "Ergonómico (cargas)", "BAJO-MEDIO", "Protocolo de levantamiento, orden 5S"] }
              ],
              nota: "El nivel de riesgo puede variar según la especialidad. Actualizar esta matriz al inicio de cada año escolar."
            }
          ]
        }
      ]
    },
    {
      id: "s3",
      numero: "3",
      titulo: "Equipo de Protección Personal (EPP)",
      contenido: "El EPP es la última línea de defensa cuando los controles de ingeniería y administrativos no pueden eliminar el riesgo. Su uso es OBLIGATORIO en todas las operaciones que impliquen riesgo identificado. El docente debe usar EPP como modelo de comportamiento para los estudiantes.",
      subsecciones: [
        {
          id: "s3-1",
          numero: "3.1",
          titulo: "EPP por Proceso — Tabla de Referencia",
          contenido: "La siguiente tabla establece el EPP mínimo requerido para cada proceso de taller:",
          tablas: [
            {
              id: "t-epp",
              titulo: "EPP obligatorio por proceso",
              encabezados: ["Proceso / Máquina", "Lentes", "Orejeras", "Respirador", "Guantes", "Protección adicional"],
              filas: [
                { celdas: ["Sierra circular / radial", "✓ Policarbonato", "✓ (>85 dB)", "— (área abierta)", "✗ NO guantes", "Guardapolvo ajustado"] },
                { celdas: ["Torno de madera/metal", "✓ Policarbonato", "✓ (>85 dB)", "—", "✗ NO guantes", "Ropa sin partes sueltas"] },
                { celdas: ["Garlopa / Regruesadora", "✓ Policarbonato", "✓ (>90 dB)", "Mascarilla polvo", "✗ NO guantes", "Empujador de madera"] },
                { celdas: ["Soldadura MIG/MAG", "✓ Máscara soldar", "—", "✓ Humos metálicos", "✓ Cuero resistente", "Delantal de cuero"] },
                { celdas: ["Cabina de pintura", "✓ Antiparra sellada", "—", "✓ Vapores orgánicos", "✓ Nitrilo", "Mameluco completo"] },
                { celdas: ["Cortadora láser", "✓ Específicos láser", "—", "✓ Humos", "—", "Nunca mirar el haz"] },
                { celdas: ["Formones / escoplos", "✓ Policarbonato", "—", "—", "✓ Cuero resistente", "Material sujeto en prensa"] },
                { celdas: ["Lijado manual/eléctrico", "✓ Policarbonato", "Si máquina", "✓ Polvo de madera", "—", "Aspiración de polvo"] }
              ],
              nota: "✗ NO guantes = guantes están prohibidos por riesgo de arrastre. ✓ = obligatorio. — = no aplica o según evaluación."
            }
          ],
          alertas: [
            {
              tipo: 'critico',
              texto: "Los guantes de tejido o cuero NUNCA deben usarse en máquinas rotativas (sierra, torno, fresadora). El guante puede ser atrapado y jalar la mano hacia la zona de corte. Esta es la causa más frecuente de amputaciones en talleres."
            }
          ]
        },
        {
          id: "s3-2",
          numero: "3.2",
          titulo: "Verificación y Mantenimiento del EPP",
          contenido: "El EPP debe inspeccionarse antes de cada uso. Un EPP deteriorado es tan peligroso como no usarlo.",
          listaItems: [
            "Lentes: verificar que no tengan rayaduras profundas que distorsionen la visión",
            "Orejeras: verificar que las almohadillas sellen correctamente alrededor del oído",
            "Respiradores: reemplazar filtros según el indicador o cada 40 horas de uso",
            "Guantes: verificar que no tengan perforaciones ni costuras abiertas",
            "Máscaras de soldar: verificar que el cristal de sombra sea el correcto para el proceso (mínimo sombra 10 para MIG/MAG)"
          ]
        }
      ]
    },
    {
      id: "s4",
      numero: "4",
      titulo: "Protocolos Operativos de Seguridad",
      contenido: "Los protocolos operativos son procedimientos estandarizados que garantizan que cada operación se realice de forma segura y reproducible. Deben estar publicados en el taller junto a cada máquina y ser revisados al inicio de cada sesión.",
      subsecciones: [
        {
          id: "s4-1",
          numero: "4.1",
          titulo: "Protocolo Pre-Operativo (antes de encender cualquier máquina)",
          contenido: "Este protocolo es obligatorio antes de iniciar cualquier operación con maquinaria:",
          listaItems: [
            "1. Verificar que la guarda de seguridad esté instalada y en buen estado",
            "2. Colocarse el EPP completo requerido para la operación",
            "3. Verificar que la zona de trabajo esté despejada de materiales innecesarios",
            "4. Comprobar que el material a procesar esté correctamente sujeto o guiado",
            "5. Verificar que no haya estudiantes en la trayectoria de proyecciones",
            "6. Encender la máquina y dejar que alcance velocidad de régimen antes de iniciar el corte",
            "7. No abandonar la máquina con el motor en marcha"
          ]
        },
        {
          id: "s4-2",
          numero: "4.2",
          titulo: "Protocolo LOTO — Bloqueo y Etiquetado",
          contenido: "El protocolo LOTO (Lock Out / Tag Out) es obligatorio para cualquier intervención de mantenimiento, limpieza o ajuste en una máquina:",
          listaItems: [
            "1. INFORMAR: Comunicar al equipo que la máquina entra en mantenimiento",
            "2. APAGAR: Desconectar la máquina del interruptor principal",
            "3. BLOQUEAR: Colocar candado físico en el interruptor — solo quien lo puso puede retirarlo",
            "4. ETIQUETAR: Colocar tarjeta roja: 'MÁQUINA EN MANTENIMIENTO — NO ENCENDER'",
            "5. VERIFICAR: Intentar encender la máquina para confirmar que el bloqueo funciona",
            "6. INTERVENIR: Realizar el mantenimiento con la máquina bloqueada",
            "7. RESTAURAR: Retirar candado y etiqueta, restituir guardas, verificar antes de autorizar el uso"
          ],
          alertas: [
            {
              tipo: 'advertencia',
              texto: "Nunca realizar ajustes ni limpiezas en una máquina que solo está 'apagada' sin bloqueo físico. Un arranque accidental mientras alguien está interviniendo puede ser fatal."
            }
          ]
        },
        {
          id: "s4-3",
          numero: "4.3",
          titulo: "Protocolo de Respuesta ante Accidentes",
          contenido: "En caso de accidente en el taller, la secuencia de respuesta es:",
          listaItems: [
            "1. DETENER: Apagar inmediatamente la máquina involucrada",
            "2. ASEGURAR: No mover al accidentado a menos que haya riesgo inminente mayor",
            "3. LLAMAR: Activar el sistema de emergencias de la institución y llamar al servicio de salud",
            "4. PRIMEROS AUXILIOS: Solo si está capacitado — no realizar maniobras para las que no se tiene formación",
            "5. DOCUMENTAR: Registrar el incidente en el libro de accidentes del taller",
            "6. REPORTAR: Comunicar a la dirección y a la UGEL dentro de las 24 horas",
            "7. INVESTIGAR: Analizar la causa raíz para prevenir recurrencia"
          ]
        }
      ]
    },
    {
      id: "s5",
      numero: "5",
      titulo: "Señalización de Seguridad",
      contenido: "La señalización del taller debe cumplir con la NTP 399.010 y ser suficiente para que cualquier persona que ingrese al taller comprenda los riesgos y las medidas de protección requeridas, sin necesidad de explicación verbal.",
      subsecciones: [
        {
          id: "s5-1",
          numero: "5.1",
          titulo: "Tipos de Señales y Colores Normalizados",
          contenido: "Las señales de seguridad se clasifican por color según su función:",
          tablas: [
            {
              id: "t-senales",
              encabezados: ["Color", "Significado", "Ejemplos en el taller"],
              filas: [
                { celdas: ["ROJO", "Prohibición / Peligro / Equipo contra incendio", "No pasar, extintor, botón de emergencia"] },
                { celdas: ["AMARILLO", "Advertencia / Precaución", "Piso resbaladizo, voltaje peligroso, riesgo de corte"] },
                { celdas: ["VERDE", "Condición segura / Primeros auxilios", "Salida de emergencia, botiquín, zona segura"] },
                { celdas: ["AZUL", "Información / Obligación", "EPP obligatorio, procedimiento de uso, instrucciones"] }
              ]
            }
          ]
        },
        {
          id: "s5-2",
          numero: "5.2",
          titulo: "Señalización Mínima Requerida en el Taller",
          contenido: "El taller debe contar como mínimo con la siguiente señalización:",
          listaItems: [
            "Mapa de riesgos actualizado — ubicado a la entrada del taller",
            "Señal de EPP obligatorio en cada zona y junto a cada máquina",
            "Señal de PELIGRO junto a cada máquina de alto riesgo (sierra, torno, soldadora)",
            "Ubicación del extintor claramente señalizada y accesible",
            "Ruta de evacuación y punto de encuentro",
            "Botiquín de primeros auxilios señalizado y con contenido verificado",
            "Panel de interruptores claramente identificado con etiqueta de cada circuito"
          ]
        }
      ]
    },
    {
      id: "s6",
      numero: "6",
      titulo: "Plan de Emergencia del Taller",
      contenido: "El Plan de Emergencia es el documento que establece qué hacer ante situaciones de riesgo no habitual: incendio, accidente grave, sismo u otras emergencias. Debe ser conocido por el docente y practicado con los estudiantes al inicio de cada año.",
      subsecciones: [
        {
          id: "s6-1",
          numero: "6.1",
          titulo: "Tipos de Emergencia y Respuesta",
          contenido: "Para cada tipo de emergencia existe una respuesta específica:",
          listaItems: [
            "INCENDIO: Activar alarma → Apagar máquinas → Usar extintor si el fuego es pequeño y controlable → Evacuar por la ruta establecida → Reunirse en el punto de encuentro",
            "SISMO: Alejarse de máquinas y estantes → Protegerse bajo mesa robusta → Esperar a que cese → Evacuar verificando que no haya riesgo de derrumbe",
            "ACCIDENTE GRAVE: Ver Protocolo 4.3 — no mover al accidentado sin evaluación",
            "FUGA DE GAS / VAPORES: Apagar todas las fuentes de ignición → Ventilar abriendo puertas → Evacuar el área → No encender interruptores"
          ]
        },
        {
          id: "s6-2",
          numero: "6.2",
          titulo: "Simulacros y Capacitación",
          contenido: "El plan de emergencia solo es efectivo si ha sido practicado. Se recomienda:",
          listaItems: [
            "Realizar al menos un simulacro de evacuación por semestre con los estudiantes del taller",
            "Capacitar a al menos un docente en primeros auxilios básicos por taller",
            "Verificar mensualmente que el extintor tenga carga vigente (sello no roto, manómetro en verde)",
            "Actualizar el directorio de emergencias (SAMU 106, Bomberos 116, Policía 105) en la puerta del taller"
          ]
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// MANUAL 2 · Gestión del Almacén del Taller EPT
// Módulo M4 — 20 páginas · Aplicación
// ─────────────────────────────────────────────────────────────────────────────
export const manualAlmacenM4: ManualRuta = {
  id: "manual-almacen-m4",
  modulo: "m4",
  titulo: "Gestión del Almacén del Taller EPT",
  subtitulo: "Sistema de inventario, control de bienes y organización patrimonial — TSF MINEDU",
  descripcion: "Guía completa para la organización, registro y control del patrimonio del taller EPT. Incluye metodologías de gestión, fichas de control y procedimientos de inventario aplicables a todos los talleres del programa TSF.",
  version: "2024-v1",
  paginas: 20,
  destinatario: "Docentes responsables del taller EPT — Todos los talleres del programa TSF",
  secciones: [
    {
      id: "s1",
      numero: "1",
      titulo: "Fundamentos de la Gestión Patrimonial en EPT",
      contenido: "El almacén del taller EPT no es un depósito: es el corazón logístico que garantiza que cada equipo, herramienta y material esté disponible, en condiciones y rastreable cuando se necesite. Una gestión eficiente del almacén impacta directamente en la calidad de la enseñanza y en la conservación del patrimonio institucional.",
      subsecciones: [
        {
          id: "s1-1",
          numero: "1.1",
          titulo: "El Patrimonio del Taller como Recurso Pedagógico",
          contenido: "Los bienes del taller tienen doble carácter: son patrimonio del Estado (sujetos a control y rendición de cuentas) y son recursos pedagógicos (herramientas para el aprendizaje). El docente es el custodio responsable de ambas dimensiones.",
          listaItems: [
            "Todo bien recibido debe registrarse ANTES de ser instalado o usado",
            "El código de bien es el identificador único que vincula el objeto físico con su historia digital",
            "La pérdida o daño de un bien patrimonial debe reportarse inmediatamente a la dirección",
            "El inventario anual es obligatorio y auditado por la UGEL"
          ]
        },
        {
          id: "s1-2",
          numero: "1.2",
          titulo: "Categorías de Bienes del Taller",
          contenido: "Los bienes del taller se clasifican en cinco categorías con criterios de registro y control diferenciados:",
          tablas: [
            {
              id: "t-categorias",
              encabezados: ["Categoría", "Descripción", "Ejemplos", "Control requerido"],
              filas: [
                { celdas: ["EQUIPOS", "Máquinas con motor o componentes electrónicos", "Sierra circular, torno, impresora 3D", "Ficha técnica + mantenimiento preventivo + check list diario"] },
                { celdas: ["HERRAMIENTAS", "Instrumentos de uso manual sin motor", "Formones, cepillos, llaves, calibres", "Ficha de herramienta + control de préstamo"] },
                { celdas: ["MOBILIARIO", "Mesas, sillas, estantes, bancadas", "Mesa de trabajo, silla estudiante, vitrina", "Registro simple + control de estado anual"] },
                { celdas: ["MATERIAL PEDAGÓGICO", "Libros, manuales, USB, recursos didácticos", "Manual técnico, USB pedagógico, láminas", "Registro + control de préstamo a docentes"] },
                { celdas: ["MATERIAL DE CONSUMO", "Insumos que se agotan con el uso", "Lija, pintura, soldadura, tornillos", "Kardex de consumo + solicitud de reposición"] }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "s2",
      numero: "2",
      titulo: "Sistema de Codificación y Registro",
      contenido: "El sistema de codificación permite identificar cada bien de manera única e inequívoca. Un código bien diseñado facilita el inventario, el mantenimiento y la auditoría patrimonial.",
      subsecciones: [
        {
          id: "s2-1",
          numero: "2.1",
          titulo: "Estructura del Código de Bien",
          contenido: "El código interno del taller se construye con la siguiente estructura:",
          tablas: [
            {
              id: "t-codigo",
              encabezados: ["Posición", "Descripción", "Ejemplo"],
              filas: [
                { celdas: ["[TALLER]", "Iniciales del taller (2-3 letras)", "EBA (Ebanistería)"] },
                { celdas: ["[ZONA]", "Zona asignada: INV / INN / ACA / ALM", "INN (Innovación)"] },
                { celdas: ["[CATEGORIA]", "EQU / HER / MOB / PED / CON", "EQU (Equipo)"] },
                { celdas: ["[NÚMERO]", "Número correlativo de 3 dígitos", "001"] },
                { celdas: ["CÓDIGO COMPLETO", "Código único del bien en el taller", "EBA-INN-EQU-001"] }
              ],
              nota: "El código de entidad (MINEDU) se registra adicionalmente en la ficha técnica y es el código oficial para auditorías."
            }
          ]
        },
        {
          id: "s2-2",
          numero: "2.2",
          titulo: "Ficha Técnica del Bien — Campos Obligatorios",
          contenido: "Cada bien del taller debe tener una ficha técnica actualizada con los siguientes campos:",
          listaItems: [
            "Código interno del taller y código de entidad MINEDU",
            "Nombre del bien y descripción técnica completa",
            "Marca, modelo y número de serie (si aplica)",
            "Zona asignada y ubicación específica dentro de la zona",
            "Estado operativo: OPERATIVO / EN REPARACIÓN / DADO DE BAJA",
            "Uso pedagógico — descripción de cómo facilita el aprendizaje",
            "Especificaciones técnicas relevantes (potencia, dimensiones, capacidad)",
            "Fecha de recepción y origen del bien (donación, compra, MINEDU)",
            "Historial de mantenimiento — enlace o referencia a la bitácora"
          ]
        }
      ]
    },
    {
      id: "s3",
      numero: "3",
      titulo: "Organización Física del Almacén — Metodología 5S",
      contenido: "La metodología 5S es el sistema de organización más efectivo para talleres porque combina orden físico con hábitos de mantenimiento. Aplicada correctamente, reduce el tiempo de búsqueda de materiales en un 30-50% y minimiza los riesgos de accidente por desorden.",
      subsecciones: [
        {
          id: "s3-1",
          numero: "3.1",
          titulo: "Las 5 Etapas de la Metodología",
          contenido: "Las 5S se implementan en orden estricto — cada etapa es prerequisito de la siguiente:",
          listaItems: [
            "1. SEIRI (Clasificar): Separar lo necesario de lo innecesario. Retirar del almacén todo lo que no tiene uso activo. Criterio: si no se usó en los últimos 6 meses y no se usará en los próximos 6, debe reclasificarse o darse de baja.",
            "2. SEITON (Ordenar): Asignar un lugar específico a cada bien. La regla: un lugar para cada cosa, cada cosa en su lugar. Usar etiquetas, colores y delimitaciones para que el orden sea visible y autoexplicativo.",
            "3. SEISO (Limpiar): Establecer rutinas de limpieza. El almacén limpio es un almacén seguro. La limpieza también sirve como inspección: al limpiar se detectan problemas que de otra forma pasan desapercibidos.",
            "4. SEIKETSU (Estandarizar): Documentar el estado de orden alcanzado con fotos de referencia, procedimientos escritos y señalización. Cualquier persona nueva debe poder mantener el orden sin instrucciones verbales.",
            "5. SHITSUKE (Sostener): Crear hábitos y cultura de orden. Las auditorías internas periódicas (semanales o mensuales) mantienen el sistema vivo. El 5° pilar es el más difícil y el más importante."
          ]
        },
        {
          id: "s3-2",
          numero: "3.2",
          titulo: "Zonas de Almacenamiento por Tipo de Bien",
          contenido: "La distribución física del almacén debe respetar criterios de seguridad, frecuencia de uso y compatibilidad de materiales:",
          tablas: [
            {
              id: "t-zonas-almacen",
              encabezados: ["Área del Almacén", "Qué va aquí", "Criterio de ubicación"],
              filas: [
                { celdas: ["Zona activa (frente)", "Herramientas y materiales de uso diario", "Acceso inmediato sin mover otros bienes"] },
                { celdas: ["Zona semicactiva (centro)", "Equipos portátiles de uso semanal", "Acceso en 1-2 movimientos"] },
                { celdas: ["Zona pasiva (fondo)", "Repuestos, materiales de reserva", "Uso mensual o eventual"] },
                { celdas: ["Zona de cuarentena", "Bienes en reparación o con estado dudoso", "Separados, etiquetados, no disponibles"] },
                { celdas: ["Zona de materiales peligrosos", "Solventes, pinturas, combustibles", "Ventilada, alejada de fuentes de calor, con señalización"] }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "s4",
      numero: "4",
      titulo: "Control de Entradas y Salidas — Método PEPS",
      contenido: "El control de movimientos del almacén garantiza que siempre se sepa qué hay, cuánto hay y cuándo hay que reponer. El método PEPS (Primero Entra, Primero Sale) es el estándar para materiales de consumo en talleres EPT.",
      subsecciones: [
        {
          id: "s4-1",
          numero: "4.1",
          titulo: "Aplicación del Método PEPS",
          contenido: "PEPS garantiza la rotación correcta de materiales y previene el vencimiento o deterioro por stock inactivo:",
          listaItems: [
            "Al recibir material nuevo: colocarlo DETRÁS del stock existente de la misma referencia",
            "Al despachar material: siempre tomar del FRENTE (lo más antiguo primero)",
            "Etiquetar cada lote con la fecha de recepción para facilitar la identificación",
            "Aplicar especialmente en: pinturas (vida útil), adhesivos (vencimiento), solventes (degradación)"
          ]
        },
        {
          id: "s4-2",
          numero: "4.2",
          titulo: "Kardex de Control de Consumibles",
          contenido: "El kardex es el registro de movimientos de materiales de consumo. Cada referencia tiene su propio kardex:",
          tablas: [
            {
              id: "t-kardex",
              titulo: "Formato de Kardex de Consumibles",
              encabezados: ["Fecha", "Concepto", "Entrada", "Salida", "Saldo", "Responsable"],
              filas: [
                { celdas: ["01/03/2024", "Stock inicial", "50 hojas", "—", "50", "Docente"] },
                { celdas: ["05/03/2024", "Uso sesión M3", "—", "10 hojas", "40", "Docente"] },
                { celdas: ["12/03/2024", "Reposición MINEDU", "50 hojas", "—", "90", "Docente"] }
              ],
              nota: "Actualizar el kardex en el mismo momento de la entrada o salida — nunca retroactivamente."
            }
          ]
        }
      ]
    },
    {
      id: "s5",
      numero: "5",
      titulo: "Inventario Anual y Auditoría Patrimonial",
      contenido: "El inventario anual es obligatorio y auditado por la UGEL. Es el proceso de verificación sistemática del patrimonio del taller: cada bien debe ser contado, verificado en su estado y confrontado con el registro oficial.",
      subsecciones: [
        {
          id: "s5-1",
          numero: "5.1",
          titulo: "Proceso de Toma de Inventario",
          contenido: "La toma de inventario anual sigue un proceso estandarizado:",
          listaItems: [
            "PASO 1 — Preparación: Imprimir el listado oficial de bienes del taller con códigos y descripciones",
            "PASO 2 — Verificación física: Recorrer el taller sistemáticamente verificando la presencia de cada bien",
            "PASO 3 — Verificación de estado: Registrar el estado de cada bien (OPERATIVO / EN REPARACIÓN / DETERIORADO / DESAPARECIDO)",
            "PASO 4 — Verificación de ubicación: Confirmar que cada bien esté en la zona asignada y señalizada",
            "PASO 5 — Discrepancias: Documentar cualquier bien no encontrado o en estado diferente al registrado",
            "PASO 6 — Informe: Elaborar el informe de inventario con las discrepancias y presentarlo a la dirección",
            "PASO 7 — Regularización: Tramitar las bajas, transferencias o reposiciones según corresponda"
          ]
        },
        {
          id: "s5-2",
          numero: "5.2",
          titulo: "Procedimiento para Dar de Baja un Bien",
          contenido: "Un bien se da de baja cuando ya no tiene condiciones para cumplir su función pedagógica. Este proceso es formal y documentado:",
          listaItems: [
            "El docente emite un informe técnico describiendo el estado del bien y la razón de la baja",
            "La dirección verifica el informe y lo eleva a la UGEL con el expediente completo",
            "La UGEL designa una comisión de valorización y baja",
            "El bien dado de baja NO se puede usar, vender ni regralar — queda en custodia hasta resolución oficial",
            "Una vez aprobada la baja, se actualiza el inventario eliminando el bien del registro activo"
          ]
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// MANUAL 3 · Planificación Pedagógica en el Taller EPT
// Módulo M5 — 32 páginas · Aplicación
// ─────────────────────────────────────────────────────────────────────────────
export const manualPlanificacionM5: ManualRuta = {
  id: "manual-planificacion-m5",
  modulo: "m5",
  titulo: "Planificación Pedagógica en el Taller EPT",
  subtitulo: "Diseño de unidades didácticas y sesiones de aprendizaje por competencias — TSF MINEDU",
  descripcion: "Metodología completa para planificar el proceso formativo en el taller EPT con enfoque por competencias. Incluye el diseño de unidades didácticas, sesiones de aprendizaje y evaluación alineada con el CNOF-MINEDU.",
  version: "2024-v1",
  paginas: 32,
  destinatario: "Docentes de talleres EPT — Todos los talleres del programa TSF",
  secciones: [
    {
      id: "s1",
      numero: "1",
      titulo: "El Enfoque por Competencias en EPT",
      contenido: "La Educación Técnico Productiva en el Perú ha adoptado el enfoque por competencias como marco pedagógico central. Esto implica un cambio radical en la manera de planificar: el punto de partida no es el contenido sino la competencia que el estudiante debe demostrar al final del ciclo formativo.",
      subsecciones: [
        {
          id: "s1-1",
          numero: "1.1",
          titulo: "¿Qué es una Competencia en EPT?",
          contenido: "En el marco del CNOF-MINEDU, una competencia es la capacidad de actuar eficientemente ante situaciones y contextos complejos, movilizando de manera combinada recursos personales (conocimientos, habilidades, actitudes) y externos (herramientas, equipos, materiales) para resolver problemas reales del sector productivo.",
          listaItems: [
            "Una competencia NO es un tema ni un contenido — es un desempeño observable",
            "Una competencia se demuestra en situaciones reales o simuladas del trabajo",
            "Las competencias EPT están definidas en el CNOF por especialidad y ciclo",
            "Cada especialidad tiene entre 3 y 5 Unidades de Competencia y múltiples elementos de competencia"
          ]
        },
        {
          id: "s1-2",
          numero: "1.2",
          titulo: "Del CNOF a la Unidad Didáctica",
          contenido: "La planificación parte del Perfil de Egreso del CNOF y baja hacia la sesión de clase:",
          tablas: [
            {
              id: "t-niveles",
              encabezados: ["Nivel", "Qué define", "¿Quién lo define?"],
              filas: [
                { celdas: ["Perfil de Egreso", "Qué debe saber y hacer el egresado del ciclo", "MINEDU / CNOF"] },
                { celdas: ["Unidades de Competencia", "Agrupación de desempeños relacionados", "MINEDU / CNOF"] },
                { celdas: ["Elementos de Competencia", "Desempeños específicos con criterios de evaluación", "MINEDU / CNOF"] },
                { celdas: ["Módulos de Formación", "Organización de las unidades para el aprendizaje", "IE — Equipo docente"] },
                { celdas: ["Unidades Didácticas", "Secuencia de aprendizaje para lograr un elemento", "Docente del taller"] },
                { celdas: ["Sesiones de Aprendizaje", "Plan detallado de cada clase", "Docente del taller"] }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "s2",
      numero: "2",
      titulo: "Diseño de la Unidad Didáctica",
      contenido: "La Unidad Didáctica es la unidad de planificación intermedia: agrupa varias sesiones de aprendizaje orientadas al logro de un elemento de competencia. Cada unidad debe tener una situación significativa de inicio que conecte el aprendizaje con el mundo real.",
      subsecciones: [
        {
          id: "s2-1",
          numero: "2.1",
          titulo: "Estructura de la Unidad Didáctica",
          contenido: "Una unidad didáctica bien diseñada contiene los siguientes elementos:",
          listaItems: [
            "DATOS DE IDENTIFICACIÓN: Especialidad, ciclo, módulo, elemento de competencia, bimestre y horas totales",
            "SITUACIÓN SIGNIFICATIVA: Problema o reto del sector productivo que motiva el aprendizaje. Debe ser real, relevante y conectable con la experiencia del estudiante",
            "PROPÓSITO: Elemento de competencia a lograr, expresado en términos de desempeño observable",
            "CRITERIOS DE EVALUACIÓN: Indicadores específicos que permiten saber si el propósito se logró",
            "SECUENCIA DE APRENDIZAJE: Sesiones con su enfoque (inicio, proceso, cierre), actividades y recursos",
            "EVALUACIÓN: Instrumentos (rúbrica, lista de cotejo), momentos (formativa y sumativa) y evidencias esperadas",
            "RECURSOS Y MATERIALES: Equipos, materiales, bienes del taller necesarios"
          ]
        },
        {
          id: "s2-2",
          numero: "2.2",
          titulo: "La Situación Significativa — Cómo Diseñarla",
          contenido: "La situación significativa es el corazón de la unidad. No puede ser inventada de forma arbitraria — debe conectar con necesidades reales del sector productivo y del contexto del estudiante.",
          listaItems: [
            "CRITERIO 1 — Relevancia: ¿Por qué es importante aprender esto para el campo laboral?",
            "CRITERIO 2 — Contextualización: ¿Hay casos reales locales o regionales que ilustren el problema?",
            "CRITERIO 3 — Desafío: ¿El reto es suficientemente complejo para requerir el aprendizaje de múltiples capacidades?",
            "CRITERIO 4 — Producto: ¿El proceso de aprendizaje genera un producto, servicio o proceso evaluable?",
            "Ejemplo de situación significativa: 'La empresa local X necesita que sus técnicos puedan [competencia] para [propósito productivo]. ¿Cómo podemos desarrollar esa capacidad en el taller?'"
          ]
        }
      ]
    },
    {
      id: "s3",
      numero: "3",
      titulo: "Diseño de la Sesión de Aprendizaje",
      contenido: "La sesión de aprendizaje es la unidad de planificación más concreta. Define exactamente qué va a pasar en el taller en un período determinado: qué hará el docente, qué harán los estudiantes, con qué recursos y cómo se evaluará el logro parcial.",
      subsecciones: [
        {
          id: "s3-1",
          numero: "3.1",
          titulo: "Estructura de la Sesión — Las 3 Fases",
          contenido: "Toda sesión de aprendizaje tiene tres momentos con función pedagógica específica:",
          tablas: [
            {
              id: "t-sesion",
              encabezados: ["Fase", "Función pedagógica", "Tiempo sugerido", "Actividades típicas"],
              filas: [
                { celdas: ["INICIO", "Activar conocimientos previos, motivar, presentar el propósito", "15-20% del tiempo", "Pregunta generadora, demostración del docente, revisión de la sesión anterior, presentación de la situación significativa"] },
                { celdas: ["PROCESO", "Desarrollar la competencia mediante actividades graduadas", "60-70% del tiempo", "Práctica guiada, práctica autónoma, trabajo en equipos, uso de equipos del taller, retroalimentación formativa"] },
                { celdas: ["CIERRE", "Consolidar el aprendizaje, evaluar el logro parcial, conectar con la siguiente sesión", "15-20% del tiempo", "Autoevaluación, presentación del producto, reflexión metacognitiva, indicaciones para la siguiente sesión"] }
              ]
            }
          ]
        },
        {
          id: "s3-2",
          numero: "3.2",
          titulo: "La Práctica Progresiva — Clave del Taller EPT",
          contenido: "La práctica en el taller debe seguir un principio de gradualidad: del error controlado a la autonomía. Este principio se concreta en tres niveles de práctica:",
          listaItems: [
            "NIVEL 1 — PRÁCTICA GUIADA: El docente demuestra paso a paso mientras los estudiantes observan y replican con supervisión directa. Se usan los equipos más simples. El error es esperado y sirve de aprendizaje.",
            "NIVEL 2 — PRÁCTICA SEMI-AUTÓNOMA: Los estudiantes trabajan con instrucciones escritas (guía de práctica) y el docente circula para retroalimentar. Se introducen equipos de mayor complejidad.",
            "NIVEL 3 — PRÁCTICA AUTÓNOMA: Los estudiantes planifican, ejecutan y evalúan su propio trabajo. El docente actúa como asesor. Se trabajan proyectos completos con todos los equipos de la zona."
          ]
        }
      ]
    },
    {
      id: "s4",
      numero: "4",
      titulo: "Evaluación por Competencias",
      contenido: "La evaluación en EPT es formativa, continua y centrada en el desempeño. No basta con saber — hay que demostrar que se puede hacer. Esto requiere instrumentos de evaluación que capturen el desempeño real, no solo el conocimiento declarativo.",
      subsecciones: [
        {
          id: "s4-1",
          numero: "4.1",
          titulo: "Instrumentos de Evaluación en el Taller",
          contenido: "Los instrumentos más adecuados para la evaluación en el taller EPT son:",
          tablas: [
            {
              id: "t-instrumentos",
              encabezados: ["Instrumento", "¿Para qué?", "Mejor momento de uso"],
              filas: [
                { celdas: ["Rúbrica analítica", "Evaluar procesos complejos con múltiples criterios y niveles", "Proyectos, productos finales, prácticas integradoras"] },
                { celdas: ["Lista de cotejo", "Verificar presencia/ausencia de conductas o pasos del protocolo", "Prácticas operativas, protocolos de seguridad, procesos de fabricación"] },
                { celdas: ["Registro anecdótico", "Documentar observaciones específicas del desempeño en situación real", "Durante la práctica, en tiempo real"] },
                { celdas: ["Portafolio de evidencias", "Mostrar la progresión del aprendizaje a lo largo del tiempo", "Al final de la unidad o módulo"] },
                { celdas: ["Autoevaluación", "Desarrollar la metacognición y responsabilidad sobre el propio aprendizaje", "Al final de cada sesión o práctica"] }
              ]
            }
          ]
        },
        {
          id: "s4-2",
          numero: "4.2",
          titulo: "Retroalimentación Efectiva en el Taller",
          contenido: "La retroalimentación es el motor del aprendizaje por competencias. Una retroalimentación efectiva en el taller tiene características específicas:",
          listaItems: [
            "INMEDIATA: Se da en el momento del desempeño, no días después",
            "ESPECÍFICA: No 'bien hecho' sino 'el ángulo de corte está correcto porque mantuviste la guía paralela'",
            "CORRECTIVA: Indica qué mejorar y CÓMO mejorarlo ('en lugar de X, intenta Y porque...')",
            "ORIENTADA AL PROCESO: Más que al producto ('observé que antes de medir verificaste la escuadra — eso es lo correcto')",
            "GRADUAL: Se retira progresivamente a medida que el estudiante gana autonomía"
          ]
        }
      ]
    },
    {
      id: "s5",
      numero: "5",
      titulo: "El Taller como Espacio de Emprendimiento",
      contenido: "El taller EPT tiene un potencial que va más allá de la formación técnica: puede ser el laboratorio donde los estudiantes desarrollan competencias de emprendimiento, conectando sus habilidades técnicas con oportunidades reales del mercado.",
      subsecciones: [
        {
          id: "s5-1",
          numero: "5.1",
          titulo: "Integración del Emprendimiento en el Currículo",
          contenido: "El enfoque de emprendimiento no es una materia separada: se integra en el diseño mismo de los proyectos del taller:",
          listaItems: [
            "Los proyectos de los estudiantes deben responder a necesidades reales (de la institución, la comunidad o el mercado)",
            "El diseño del proyecto incluye una etapa de análisis de mercado básico (¿quién necesita esto? ¿cuánto pagaría?)",
            "El costo de producción se calcula como parte del proyecto técnico",
            "Se fomenta el pensamiento 'producto → servicio → negocio' en los proyectos más avanzados",
            "Las ferias o exposiciones escolares son espacios de emprendimiento simulado con valor formativo"
          ]
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// MANUAL 4 · Guía del Proyecto Integrador
// Módulo M6 — 8 páginas · Proyecto
// ─────────────────────────────────────────────────────────────────────────────
export const manualProyectoIntegradorM6: ManualRuta = {
  id: "manual-proyecto-integrador-m6",
  modulo: "m6",
  titulo: "Guía del Proyecto Integrador",
  subtitulo: "Diseño, ejecución, evaluación y certificación del Proyecto Final — TSF MINEDU",
  descripcion: "Marco de referencia completo para el Proyecto Integrador del programa TSF. Define el propósito, las fases de ejecución, los criterios de evaluación y la documentación requerida para la certificación.",
  version: "2024-v1",
  paginas: 8,
  destinatario: "Docentes de talleres EPT — Todos los talleres del programa TSF",
  secciones: [
    {
      id: "s1",
      numero: "1",
      titulo: "¿Qué es el Proyecto Integrador?",
      contenido: "El Proyecto Integrador es la evidencia final del programa TSF: un proyecto técnico-pedagógico que demuestra que el docente puede aplicar de manera integrada las competencias desarrolladas en los módulos anteriores. No es un proyecto técnico aislado — es un proyecto que simultáneamente produce un resultado técnico de calidad Y genera un proceso pedagógico documentado y replicable.",
      subsecciones: [
        {
          id: "s1-1",
          numero: "1.1",
          titulo: "Propósito del Proyecto Integrador",
          contenido: "El Proyecto Integrador tiene tres propósitos complementarios:",
          listaItems: [
            "TÉCNICO: Demostrar dominio en el uso de los equipos del taller para producir un resultado de calidad técnica certificable",
            "PEDAGÓGICO: Documentar el proceso de fabricación como modelo de sesión de aprendizaje replicable con estudiantes",
            "INSTITUCIONAL: Generar un recurso tangible que beneficie a la institución educativa (mobiliario, material didáctico, mejora del taller)"
          ]
        },
        {
          id: "s1-2",
          numero: "1.2",
          titulo: "Criterios para Elegir el Proyecto",
          contenido: "El proyecto debe cumplir los siguientes criterios para ser aprobado:",
          listaItems: [
            "RELEVANCIA: Responde a una necesidad real de la institución o del taller",
            "COMPLEJIDAD TÉCNICA: Requiere el uso de al menos 3 zonas del taller y equipos de todas las categorías",
            "VIABILIDAD: Puede ejecutarse en el tiempo y con los materiales disponibles",
            "DOCUMENTABILIDAD: El proceso puede ser fotografiado, descrito y replicado por otro docente",
            "VALOR PEDAGÓGICO: Puede convertirse en un proyecto de aprendizaje para los estudiantes"
          ]
        }
      ]
    },
    {
      id: "s2",
      numero: "2",
      titulo: "Fases del Proyecto Integrador",
      contenido: "El proyecto se desarrolla en 4 fases presenciales en el taller, precedidas por una fase de diseño y seguidas de la presentación final.",
      subsecciones: [
        {
          id: "s2-1",
          numero: "2.1",
          titulo: "Resumen de Fases",
          contenido: "Cada fase del proyecto tiene un entregable específico que valida el avance:",
          tablas: [
            {
              id: "t-fases",
              encabezados: ["Fase", "Nombre", "Horas", "Entregable"],
              filas: [
                { celdas: ["0", "Diseño y planificación (asincrónica)", "2h", "Brief de proyecto: diseño CAD, lista de materiales y plan de producción"] },
                { celdas: ["1", "Sesión presencial: Investigación y Diseño", "4h", "Diseño final aprobado + prototipo digital o físico básico"] },
                { celdas: ["2", "Sesión presencial: Maquinado y Habilitado", "4h", "Piezas cortadas, habilitadas y verificadas con dimensiones del plano"] },
                { celdas: ["3", "Sesión presencial: Armado y Ensamblaje", "4h", "Estructura ensamblada, uniones revisadas, verificación funcional"] },
                { celdas: ["4", "Sesión presencial: Acabados y Presentación", "4h", "Producto terminado + ficha técnico-pedagógica completa"] },
                { celdas: ["5", "Presentación y certificación (sincrónica)", "2h", "Presentación ante jurado + certificado TSF"] }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "s3",
      numero: "3",
      titulo: "La Ficha Técnico-Pedagógica del Proyecto",
      contenido: "La Ficha Técnico-Pedagógica es el documento más importante del Proyecto Integrador: convierte el proceso técnico en un recurso pedagógico reutilizable. Un docente que la lea debe poder replicar el proyecto como actividad de aprendizaje con sus propios estudiantes.",
      subsecciones: [
        {
          id: "s3-1",
          numero: "3.1",
          titulo: "Contenido de la Ficha",
          contenido: "La ficha técnico-pedagógica del proyecto integrador debe incluir:",
          listaItems: [
            "IDENTIFICACIÓN: Nombre del proyecto, especialidad, nivel y docente responsable",
            "PROPÓSITO PEDAGÓGICO: Competencia y capacidad que desarrolla el proyecto en los estudiantes",
            "SITUACIÓN SIGNIFICATIVA: Contexto del problema que resuelve el proyecto",
            "MATERIALES Y COSTOS: Lista de materiales con cantidades y costos estimados",
            "PROCESO DE FABRICACIÓN: Secuencia fotográfica paso a paso con descripciones técnicas",
            "EQUIPOS UTILIZADOS: Lista de equipos por zona con el uso específico en este proyecto",
            "PROTOCOLOS DE SEGURIDAD: EPP y medidas específicas para cada operación del proyecto",
            "CRITERIOS DE EVALUACIÓN: Rúbrica con indicadores técnicos y pedagógicos",
            "VARIACIONES POSIBLES: Cómo adaptar el proyecto para diferentes niveles o especialidades"
          ]
        }
      ]
    },
    {
      id: "s4",
      numero: "4",
      titulo: "Evaluación y Certificación",
      contenido: "La evaluación del Proyecto Integrador es realizada por un jurado que aplica la Rúbrica 360° diseñada para el programa TSF. La presentación es el momento donde el docente demuestra no solo el resultado técnico sino su comprensión pedagógica del proceso.",
      subsecciones: [
        {
          id: "s4-1",
          numero: "4.1",
          titulo: "Dimensiones de la Evaluación",
          contenido: "La Rúbrica 360° evalúa cuatro dimensiones del proyecto:",
          tablas: [
            {
              id: "t-rubrica-dimensiones",
              encabezados: ["Dimensión", "¿Qué evalúa?", "Peso (%)"],
              filas: [
                { celdas: ["Calidad Técnica", "Precisión dimensional, acabado, funcionalidad del producto", "40%"] },
                { celdas: ["Proceso de Fabricación", "Seguridad, uso correcto de equipos, orden y eficiencia", "25%"] },
                { celdas: ["Ficha Técnico-Pedagógica", "Completitud, claridad, replicabilidad del documento", "25%"] },
                { celdas: ["Presentación Oral", "Explicación del proceso, respuesta a preguntas técnicas", "10%"] }
              ],
              nota: "Se requiere un mínimo de 70% en Calidad Técnica y 70% en Proceso de Fabricación para aprobar, independientemente del puntaje total."
            }
          ]
        },
        {
          id: "s4-2",
          numero: "4.2",
          titulo: "Requisitos para la Certificación TSF",
          contenido: "Para recibir el certificado del programa TSF el participante debe:",
          listaItems: [
            "Haber completado los 7 módulos del LXP (asistencia mínima 80%)",
            "Haber aprobado el Quiz de Seguridad de M1 con mínimo 80%",
            "Haber completado las prácticas presenciales de M2, M3 y M4",
            "Haber presentado el Proyecto Integrador ante jurado con nota aprobatoria (≥70%)",
            "Haber entregado la Ficha Técnico-Pedagógica completa y aprobada"
          ]
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTACIÓN CONSOLIDADA
// ─────────────────────────────────────────────────────────────────────────────
export const manualesRuta: ManualRuta[] = [
  manualSeguridadM1,
  manualAlmacenM4,
  manualPlanificacionM5,
  manualProyectoIntegradorM6
]

export const getManualByModulo = (moduloId: string): ManualRuta | undefined =>
  manualesRuta.find(m => m.modulo === moduloId)

export const getManualById = (id: string): ManualRuta | undefined =>
  manualesRuta.find(m => m.id === id)
