// src/data/quizBanks.ts
// Bancos de preguntas para todos los módulos LXP — GRAMA / TSF-MINEDU
// Cada banco es genérico para los 9 talleres EPT salvo indicación contraria

import type { PreguntaQuiz } from './modulosLXP'

// ─────────────────────────────────────────────────────────────────────────────
// M0 · DIAGNÓSTICO TÉCNICO — 8 preguntas, sin puntaje mínimo
// Mide línea de base de conocimiento sobre equipamiento y organización del taller
// ─────────────────────────────────────────────────────────────────────────────
export const quizDiagnosticoTecnicoM0: PreguntaQuiz[] = [
  {
    id: "m0-dt-1",
    enunciado: "¿Con qué frecuencia revisas el estado de los equipos del taller ANTES de iniciar una sesión de clase?",
    opciones: [
      "Antes de cada sesión — es parte de mi rutina",
      "Una vez a la semana, en la primera clase",
      "Cuando noto que algo no funciona bien",
      "Al inicio del año escolar y ya"
    ],
    correcta: 0,
    explicacion: "La revisión pre-operativa antes de cada sesión es el estándar mínimo de seguridad en talleres EPT. Garantiza que ningún equipo con falla llegue a manos de los estudiantes."
  },
  {
    id: "m0-dt-2",
    enunciado: "¿Cuál es el propósito principal de la Zona de Almacén en un taller EPT?",
    opciones: [
      "Guardar las cosas que ya no se usan",
      "Organizar, proteger y registrar los bienes del taller para su trazabilidad",
      "Almacenar los materiales de trabajo de los estudiantes",
      "Depositar equipos en desuso hasta que se dé de baja"
    ],
    correcta: 1,
    explicacion: "El almacén es el centro logístico del taller. Su función va más allá de 'guardar': garantiza la trazabilidad de cada bien, protege la inversión pública y facilita el acceso ordenado a los recursos."
  },
  {
    id: "m0-dt-3",
    enunciado: "¿Qué significa la sigla CNOF en el contexto de la Educación Técnico Productiva (EPT)?",
    opciones: [
      "Catálogo Nacional de Operaciones Formativas",
      "Catálogo Nacional de Oferta Formativa",
      "Centro Nacional de Orientación y Formación",
      "Currículo Nacional de Operaciones Formativas"
    ],
    correcta: 1,
    explicacion: "El CNOF (Catálogo Nacional de Oferta Formativa) del MINEDU define los programas, especialidades y perfiles de egreso de los ciclos formativos. Es la referencia curricular oficial para todos los talleres TSF."
  },
  {
    id: "m0-dt-4",
    enunciado: "Al recibir un nuevo equipo en el taller, ¿cuál es el primer paso obligatorio?",
    opciones: [
      "Instalarlo inmediatamente en su zona de trabajo",
      "Probarlo con los estudiantes para verificar funcionamiento",
      "Registrarlo en el inventario con su código de bien y completar su ficha técnica",
      "Avisarle a la dirección del colegio"
    ],
    correcta: 2,
    explicacion: "Todo bien patrimonial recibido debe ser registrado antes de su uso. El código de bien, la ficha técnica y la ubicación asignada son los tres datos mínimos que deben registrarse al ingreso para garantizar la trazabilidad."
  },
  {
    id: "m0-dt-5",
    enunciado: "¿Qué información contiene la ficha técnica de un equipo del taller?",
    opciones: [
      "Solo la guía de uso del fabricante",
      "Especificaciones técnicas, uso pedagógico, estado operativo, código interno y ubicación en el taller",
      "El certificado de garantía y la fecha de compra",
      "El manual de mantenimiento anual del técnico"
    ],
    correcta: 1,
    explicacion: "La ficha técnica es el documento central de cada bien. Combina las especificaciones del fabricante con la perspectiva pedagógica y el estado operativo. Es la fuente de verdad para el inventario y el mantenimiento."
  },
  {
    id: "m0-dt-6",
    enunciado: "¿Cuántas zonas principales tiene un taller EPT según el modelo TSF-MINEDU?",
    opciones: [
      "2 zonas: trabajo y almacén",
      "3 zonas: investigación, innovación y seguridad",
      "4 zonas: investigación, innovación, acabados y almacén",
      "5 zonas, dependiendo del área de la especialidad"
    ],
    correcta: 2,
    explicacion: "El modelo TSF-MINEDU organiza el taller en 4 zonas: Zona de Investigación y Diseño, Zona de Innovación y Máquinas, Zona de Acabados, y Almacén. Esta distribución responde a la lógica del proceso productivo y pedagógico."
  },
  {
    id: "m0-dt-7",
    enunciado: "La impresora 3D del taller pertenece, por función pedagógica, a la zona de:",
    opciones: [
      "Innovación y Máquinas — es una máquina de fabricación",
      "Investigación y Diseño — apoya el prototipado de ideas",
      "Acabados — se usa para dar forma final a los productos",
      "Almacén — se guarda cuando no se usa"
    ],
    correcta: 1,
    explicacion: "La impresora 3D pertenece a la Zona de Investigación y Diseño porque su uso pedagógico principal es el prototipado rápido de ideas: los estudiantes diseñan digitalmente y materializan su propuesta en etapa exploratoria, antes de la fabricación final."
  },
  {
    id: "m0-dt-8",
    enunciado: "¿Qué describe el 'Uso Pedagógico' de un bien en el inventario del taller?",
    opciones: [
      "La guía de uso técnico del fabricante",
      "Cómo el equipo facilita el desarrollo de competencias específicas en los estudiantes",
      "El protocolo de mantenimiento preventivo del equipo",
      "La lista de estudiantes autorizados a operarlo"
    ],
    correcta: 1,
    explicacion: "El 'Uso Pedagógico' va más allá de las especificaciones técnicas: describe qué competencias desarrolla, en qué fase del aprendizaje se usa y cómo se integra a la sesión de clase. Es el puente entre el equipo y el currículo."
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// M0 · DIAGNÓSTICO PEDAGÓGICO — 6 preguntas, sin puntaje mínimo
// Mide línea de base de prácticas pedagógicas actuales del docente en EPT
// ─────────────────────────────────────────────────────────────────────────────
export const quizDiagnosticoPedagogicoM0: PreguntaQuiz[] = [
  {
    id: "m0-dp-1",
    enunciado: "Cuando planificas una sesión práctica en el taller, ¿qué defines primero?",
    opciones: [
      "Los materiales y herramientas disponibles para la clase",
      "La competencia y capacidad que quiero que mis estudiantes desarrollen",
      "El tiempo disponible y el número de estudiantes",
      "El producto que van a fabricar al final"
    ],
    correcta: 1,
    explicacion: "El enfoque por competencias parte del 'para qué aprender' (competencia y capacidades) antes de definir el 'con qué' (recursos) o el 'qué hacer' (actividad). Esto garantiza que la práctica tenga propósito pedagógico claro."
  },
  {
    id: "m0-dp-2",
    enunciado: "¿Cómo evalúas actualmente el logro de aprendizaje de tus estudiantes en el taller?",
    opciones: [
      "Por la calidad del producto final que entregan",
      "Por criterios de desempeño que defino antes de iniciar la sesión",
      "Por la participación y actitud durante la clase",
      "Por la presentación del cuaderno o portafolio"
    ],
    correcta: 1,
    explicacion: "La evaluación por competencias requiere criterios de desempeño definidos previamente (rúbricas, listas de cotejo). Evaluar solo el producto final ignora el proceso, que es donde se desarrolla la competencia."
  },
  {
    id: "m0-dp-3",
    enunciado: "¿Con qué frecuencia integras la Zona de Investigación del taller en tus sesiones?",
    opciones: [
      "Siempre — está integrada como fase de mis unidades didácticas",
      "Frecuentemente — la uso 2 o 3 veces por mes",
      "Ocasionalmente — cuando queda tiempo o hay un tema especial",
      "Casi nunca — no sé bien cómo integrarla a mi especialidad"
    ],
    correcta: 0,
    explicacion: "Este ítem es de diagnóstico. No hay respuesta incorrecta — queremos conocer tu punto de partida. La Zona de Investigación está diseñada para ser parte regular del proceso de diseño y documentación, no una herramienta ocasional."
  },
  {
    id: "m0-dp-4",
    enunciado: "Cuando un estudiante no logra la competencia esperada en la sesión, ¿cuál es tu primera acción?",
    opciones: [
      "Le coloco la nota que obtuvo y continúo con el programa",
      "Diseño una actividad diferenciada de recuperación o retroalimentación específica",
      "Lo siento junto a un compañero más avanzado para que aprenda",
      "Repaso el tema completo con toda la clase en la siguiente sesión"
    ],
    correcta: 1,
    explicacion: "La retroalimentación específica y las actividades diferenciadas son la respuesta pedagógica apropiada. El enfoque por competencias permite que los estudiantes tengan múltiples oportunidades de demostrar el logro."
  },
  {
    id: "m0-dp-5",
    enunciado: "¿Conoces el Perfil de Egreso de tu especialidad según el CNOF-MINEDU?",
    opciones: [
      "Sí — lo tengo presente al momento de planificar mis unidades",
      "Lo conozco en términos generales pero no lo uso activamente",
      "Lo he leído pero no lo recuerdo con detalle",
      "No lo conozco — no lo he revisado formalmente"
    ],
    correcta: 0,
    explicacion: "Este ítem es de diagnóstico — sin respuesta incorrecta. El Perfil de Egreso define a qué nivel de competencia debe llegar el estudiante al terminar el ciclo. Es la brújula que orienta toda la planificación curricular."
  },
  {
    id: "m0-dp-6",
    enunciado: "¿Cómo integras la seguridad ocupacional en tus sesiones de taller?",
    opciones: [
      "Es el primer bloque de cada sesión práctica — nadie toca equipos sin revisar el protocolo",
      "Lo menciono cuando recuerdo o cuando veo un riesgo inminente",
      "Hay carteles de seguridad en el taller — con eso los estudiantes ya saben",
      "Los estudiantes más avanzados ya conocen las normas básicas"
    ],
    correcta: 0,
    explicacion: "La seguridad no es un tema opcional ni un recordatorio esporádico — es el primer protocolo de cada sesión práctica. El docente EPT es responsable de que ningún estudiante opere máquinas o herramientas sin verificar el cumplimiento del EPP y los protocolos."
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// M2 · QUIZ ZONA DE INVESTIGACIÓN — 10 preguntas, mínimo 75%
// Verifica comprensión del uso pedagógico de equipos de investigación
// y metodologías de indagación y diseño
// ─────────────────────────────────────────────────────────────────────────────
export const quizZonaInvestigacionM2: PreguntaQuiz[] = [
  {
    id: "m2-q-1",
    enunciado: "¿Cuál es el propósito pedagógico principal de la Zona de Investigación en el taller EPT?",
    opciones: [
      "Almacenar los equipos tecnológicos modernos cuando no se usan",
      "Facilitar procesos de indagación, diseño digital y prototipado que los estudiantes desarrollan como punto de partida de sus proyectos",
      "Reemplazar la sala de cómputo de la institución educativa",
      "Ser un espacio de uso exclusivo del docente para preparar materiales"
    ],
    correcta: 1,
    explicacion: "La Zona de Investigación no es un depósito de tecnología: es el espacio donde los estudiantes indagan, diseñan y documentan. Su propósito es activar el pensamiento creativo antes de pasar a la fabricación."
  },
  {
    id: "m2-q-2",
    enunciado: "La impresora 3D del taller tiene como uso pedagógico principal:",
    opciones: [
      "Imprimir fichas de trabajo y materiales para el docente",
      "Prototipar objetos diseñados digitalmente como cierre de la fase de investigación",
      "Reparar piezas rotas de otros equipos del taller",
      "Crear maquetas decorativas para ferias escolares"
    ],
    correcta: 1,
    explicacion: "La impresora 3D materializa ideas digitales. Su valor pedagógico está en el ciclo diseño → prototipo → evaluación → mejora. No es una máquina de producción en serie: es una herramienta de aprendizaje iterativo."
  },
  {
    id: "m2-q-3",
    enunciado: "¿Qué metodología usa el 'Lienzo Canvas' en el contexto del taller EPT?",
    opciones: [
      "Gestión de proyectos mediante diagramas de Gantt",
      "Design Thinking y Lean Canvas para que los estudiantes modelen propuestas de valor antes de fabricar",
      "Planificación curricular basada en competencias del CNOF",
      "Evaluación formativa mediante rúbricas de desempeño"
    ],
    correcta: 1,
    explicacion: "El Lean Canvas y el Design Thinking son metodologías de innovación que el taller adopta para que los estudiantes piensen en el 'para qué' de lo que van a fabricar. Conectan el proyecto técnico con necesidades reales."
  },
  {
    id: "m2-q-4",
    enunciado: "Al usar la cámara fotográfica/filmadora con estudiantes, ¿cuál es el uso pedagógico más valioso?",
    opciones: [
      "Documentar el proceso de fabricación como evidencia de aprendizaje y análisis posterior",
      "Fotografiar los productos terminados para el portafolio personal del docente",
      "Tomar fotos del taller para publicar en las redes sociales de la institución",
      "Registrar la asistencia de los estudiantes visualmente"
    ],
    correcta: 0,
    explicacion: "La documentación del proceso (no solo del producto) es el uso pedagógico más poderoso. Las imágenes y videos del proceso permiten autoevaluación, retroalimentación y análisis del aprendizaje por parte de estudiantes y docentes."
  },
  {
    id: "m2-q-5",
    enunciado: "¿Qué fase del Design Thinking implica 'generar muchas ideas sin juzgar ni filtrar'?",
    opciones: [
      "Empatizar — comprender al usuario",
      "Definir — enunciar el problema",
      "Idear — lluvia de ideas sin censura",
      "Prototipar — construir soluciones tangibles"
    ],
    correcta: 2,
    explicacion: "La fase de Idear (Ideate) tiene como regla fundamental diferir el juicio: la cantidad de ideas importa más que la calidad en ese momento. El filtrado viene después. Esta fase libera la creatividad de los estudiantes antes de convergir en una solución."
  },
  {
    id: "m2-q-6",
    enunciado: "El software CAD (Diseño Asistido por Computadora) en la Zona de Investigación se usa para:",
    opciones: [
      "Gestionar el inventario de bienes del taller",
      "Diseñar piezas en 2D y 3D antes de fabricarlas en la Zona de Innovación",
      "Editar videos de las prácticas para presentaciones",
      "Crear presentaciones de diapositivas para el docente"
    ],
    correcta: 1,
    explicacion: "El CAD es la herramienta puente entre el diseño y la fabricación. Los estudiantes diseñan virtualmente antes de fabricar físicamente, lo que reduce errores, optimiza el uso de materiales y desarrolla pensamiento espacial."
  },
  {
    id: "m2-q-7",
    enunciado: "¿Cuál es el entregable esperado de la Práctica Presencial 1 de la Zona de Investigación?",
    opciones: [
      "Un producto terminado de madera o del material de la especialidad",
      "Un brief de proyecto con diseño digital que incluye propuesta, materiales y boceto",
      "Una rúbrica de evaluación diseñada por el estudiante",
      "Un informe de mantenimiento de los equipos de investigación"
    ],
    correcta: 1,
    explicacion: "La Práctica 1 de M2 cierra con un brief de proyecto: el documento inicial que define qué se va a fabricar, para qué, con qué materiales y cuál es el diseño preliminar. Es el punto de partida del proyecto técnico de los módulos siguientes."
  },
  {
    id: "m2-q-8",
    enunciado: "La filmadora del taller puede usarse pedagógicamente para:",
    opciones: [
      "Filmar eventos institucionales como asambleas o graduaciones",
      "Documentar procesos de fabricación y sesiones de clase para análisis pedagógico y portafolio de evidencias",
      "Transmitir clases en vivo por plataformas de internet en tiempo real",
      "Uso exclusivo de proyectos de los estudiantes de último grado"
    ],
    correcta: 1,
    explicacion: "La filmadora es una herramienta de documentación pedagógica. Grabar el proceso (no solo el resultado) permite que los estudiantes analicen su propio desempeño, identifiquen errores y mejoren su técnica."
  },
  {
    id: "m2-q-9",
    enunciado: "¿En qué secuencia se aplica correctamente el Design Thinking?",
    opciones: [
      "Prototipar → Empatizar → Definir → Idear → Testear",
      "Empatizar → Definir → Idear → Prototipar → Testear",
      "Definir → Idear → Empatizar → Testear → Prototipar",
      "Idear → Definir → Empatizar → Prototipar → Testear"
    ],
    correcta: 1,
    explicacion: "El Design Thinking sigue: Empatizar (entender al usuario) → Definir (formular el problema) → Idear (generar soluciones) → Prototipar (construir) → Testear (validar con usuarios). Esta secuencia garantiza que la solución responda a una necesidad real."
  },
  {
    id: "m2-q-10",
    enunciado: "Un estudiante quiere diseñar un soporte de madera para su proyecto. ¿Cuál es el proceso correcto usando los equipos de investigación?",
    opciones: [
      "Dibujar el plano en papel → enviarlo directamente a la zona de máquinas → fabricar",
      "Diseñar en software CAD → revisar proporciones en pantalla → imprimir prototipo 3D si aplica → ajustar → pasar a fabricación",
      "Buscar el diseño en internet → descargarlo → mandarlo a imprimir sin modificar",
      "Consultar al técnico de la UGEL para obtener autorización antes de diseñar"
    ],
    correcta: 1,
    explicacion: "El proceso correcto integra la Zona de Investigación como paso previo a la fabricación: diseño digital → prototipo → validación → fabricación. Esto reduce desperdicios de material y mejora la calidad del producto final."
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// M3 · QUIZ ZONA DE INNOVACIÓN — 20 preguntas, mínimo 80%
// Verifica conocimiento técnico y pedagógico de máquinas de corte,
// fabricación digital, formado, herramientas manuales y protocolos de seguridad
// ─────────────────────────────────────────────────────────────────────────────
export const quizZonaInnovacionM3: PreguntaQuiz[] = [
  {
    id: "m3-q-1",
    enunciado: "Antes de encender la sierra circular, ¿cuál es la verificación OBLIGATORIA e irremplazable?",
    opciones: [
      "Verificar que el material sea de madera maciza y no tablero",
      "Verificar que la guarda protectora esté correctamente colocada y en buen estado",
      "Verificar que no haya ruido extraño al encenderla a vacío",
      "Verificar que el interruptor general esté en posición ON"
    ],
    correcta: 1,
    explicacion: "La guarda protectora es la primera línea de defensa ante proyecciones del disco y contacto accidental. Sin guarda correctamente colocada, la máquina NO debe encenderse bajo ninguna circunstancia. Esta es la verificación de mayor criticidad."
  },
  {
    id: "m3-q-2",
    enunciado: "La garlopa (cepilladora de superficie) se usa principalmente para:",
    opciones: [
      "Cortar madera en ángulos de 45° con precisión",
      "Cepillar superficies para obtener caras planas y escuadradas antes de la regruesadora",
      "Hacer ranuras y canales en tablones y perfiles",
      "Cortar perfiles metálicos y plásticos"
    ],
    correcta: 1,
    explicacion: "La garlopa trabaja la superficie de referencia de la madera. El proceso correcto es: garlopa (cara plana) → regruesadora (espesor paralelo) → sierra circular (ancho). Saltarse este orden produce piezas fuera de escuadra."
  },
  {
    id: "m3-q-3",
    enunciado: "¿Cuál es la diferencia técnica principal entre sierra circular y sierra radial de brazo?",
    opciones: [
      "La sierra circular corta en recto; la radial no tiene esa capacidad",
      "La sierra radial tiene brazo articulado que permite cortes en ángulo y transversal con mayor precisión; la circular es de avance libre o guiada",
      "La sierra radial es más peligrosa por su tamaño",
      "Son equipos equivalentes con diferente nombre comercial"
    ],
    correcta: 1,
    explicacion: "La sierra radial (de brazo) está fija y el corte se hace jalando hacia el operario, permitiendo ángulos precisos. La sierra circular puede ser fija (mesa) o portátil. Cada una tiene su campo de aplicación pedagógica."
  },
  {
    id: "m3-q-4",
    enunciado: "Al operar la regruesadora, ¿cuánto se debe reducir el espesor de la madera por pasada?",
    opciones: [
      "10 a 15 mm por pasada para mayor eficiencia",
      "1 a 2 mm por pasada máximo para proteger los cuchillos y evitar rebotes",
      "5 a 6 mm por pasada — el estándar industrial",
      "El que el operario decida según la dureza de la madera"
    ],
    correcta: 1,
    explicacion: "Pasadas de 1-2 mm protegen los cuchillos de la regruesadora, evitan el rebote del material (kickback) y producen superficies más limpias. Pasadas excesivas son la causa más común de accidentes y deterioro prematuro de la máquina."
  },
  {
    id: "m3-q-5",
    enunciado: "¿Qué EPP es INCORRECTO usar al operar el torno de madera?",
    opciones: [
      "Lentes de seguridad de policarbonato",
      "Guantes de cualquier tipo — representan riesgo de arrastre en el torno",
      "Orejeras de protección auditiva",
      "Guardapolvo bien ajustado sin partes sueltas"
    ],
    correcta: 1,
    explicacion: "En el torno de madera, los guantes están PROHIBIDOS. El movimiento rotacional puede atrapar cualquier material flexible (guante, manga suelta, joyería) y jalar la mano hacia la pieza. El EPP correcto son lentes, orejeras y ropa ajustada."
  },
  {
    id: "m3-q-6",
    enunciado: "La cortadora láser requiere como insumo principal para operar:",
    opciones: [
      "Archivos físicos impresos que se escanean al inicio del corte",
      "Archivos vectoriales (SVG, DXF, AI) que codifican el recorrido del láser por coordenadas",
      "Fotografías en formato JPG de alta resolución",
      "Diseños dibujados a mano que la máquina reconoce por visión artificial"
    ],
    correcta: 1,
    explicacion: "La cortadora láser es una máquina CNC: trabaja con coordenadas vectoriales. Los archivos JPG o PNG (bitmap) no contienen la información de trayectoria que necesita. Los formatos vectoriales (SVG, DXF) definen exactamente dónde y cómo se mueve el láser."
  },
  {
    id: "m3-q-7",
    enunciado: "¿Qué material NO se debe cortar con cortadora láser por razones de seguridad y salud?",
    opciones: [
      "MDF (tablero de fibra de densidad media)",
      "PVC (cloruro de polivinilo) — emite gases de cloro altamente tóxicos al quemarse",
      "Acrílico transparente o de color",
      "Madera balsa de 3 mm"
    ],
    correcta: 1,
    explicacion: "El PVC al ser cortado con láser produce gases de ácido clorhídrico (HCl) que son corrosivos para los pulmones y para la máquina misma. Además de ser peligroso para la salud, puede dañar irreversiblemente la óptica del láser."
  },
  {
    id: "m3-q-8",
    enunciado: "Para operar la fresadora CNC, el primer paso del proceso digital es:",
    opciones: [
      "Colocar el material en la mesa y encender la máquina",
      "Diseñar el recorrido en software CAM y generar el código G (G-code) con los parámetros de corte",
      "Instalar la fresa manualmente y comenzar a mover el husillo",
      "Solicitar autorización a la UGEL para usar la máquina CNC"
    ],
    correcta: 1,
    explicacion: "La fresadora CNC sigue el proceso: diseño CAD → configuración CAM (velocidades, profundidades, recorridos) → generación de código G → simulación → carga en la máquina → ejecución. Saltarse el CAM es la causa más común de piezas arruinadas."
  },
  {
    id: "m3-q-9",
    enunciado: "¿Qué técnica y equipo se usa para doblar lámina metálica en frío con precisión?",
    opciones: [
      "Soldadora de punto para fusionar dos piezas en ángulo",
      "Dobladora de lámina con tope graduable que define el ángulo y la posición del doblez",
      "Torno de banco para curvar el metal progresivamente",
      "Sierra de cinta con guía angular ajustable"
    ],
    correcta: 1,
    explicacion: "La dobladora de lámina (plegadora) permite obtener ángulos precisos en frío mediante presión mecánica. El tope graduable garantiza que todos los dobleces de una serie sean idénticos. Es la máquina básica de conformado en frío."
  },
  {
    id: "m3-q-10",
    enunciado: "¿Cuál es el propósito pedagógico del torno de madera más allá de tornear piezas cilíndricas?",
    opciones: [
      "Enseñar solo la técnica de torneado para fabricar patas de muebles",
      "Desarrollar precisión, control de herramienta de corte, comprensión del movimiento rotacional y gestión del riesgo en tiempo real",
      "Fabricar juguetes y souvenirs para la tienda escolar",
      "Exclusivamente para proyectos de los estudiantes de quinto año de secundaria"
    ],
    correcta: 1,
    explicacion: "El torno desarrolla múltiples competencias simultáneas: precisión manual, lectura de herramienta, control del avance y la presión, y gestión del riesgo en una máquina dinámica. Es una de las máquinas de mayor densidad pedagógica del taller."
  },
  {
    id: "m3-q-11",
    enunciado: "¿Cómo se debe sostener correctamente un formón al esculpir o hacer entalles?",
    opciones: [
      "Con una sola mano sujetando el mango, la otra sujeta el material",
      "Con las dos manos: una dirige la hoja y controla la profundidad, la otra en el mango o la maza",
      "La mano no dominante sujeta el material, la dominante empuja el formón",
      "Con una prensa de banco — nunca se deben usar las manos cerca del filo"
    ],
    correcta: 1,
    explicacion: "El formón requiere dos manos para el control: una guía la hoja (y sirve como tope de profundidad), la otra aplica la fuerza desde el mango o con maza. Usar solo una mano es la causa más frecuente de cortes accidentales con herramientas de filo."
  },
  {
    id: "m3-q-12",
    enunciado: "¿Cuál es la diferencia principal entre una prensa de banco y una prensa de tornillo portátil?",
    opciones: [
      "La prensa de banco es portátil y fácil de trasladar entre mesas",
      "La prensa de banco está integrada o fija a la mesa de trabajo y soporta piezas grandes; la portátil de tornillo es versátil para piezas pequeñas y posiciones variables",
      "No hay diferencia pedagógica relevante — son intercambiables",
      "La prensa de tornillo solo funciona con metal, no con madera"
    ],
    correcta: 1,
    explicacion: "Cada tipo de prensa tiene su campo: la de banco para operaciones estacionarias con piezas grandes (cepillado, taladrado), la portátil para sujeción en posiciones donde la prensa de banco no llega. Conocer cuándo usar cada una es competencia del operario."
  },
  {
    id: "m3-q-13",
    enunciado: "Cuando la fresadora CNC termina el trabajo, ¿qué se hace PRIMERO?",
    opciones: [
      "Retirar inmediatamente el material para inspeccionar el resultado",
      "Esperar que el husillo (fresa) se detenga completamente antes de tocar el material o la máquina",
      "Apagar el panel de control numérico desde el botón de emergencia",
      "Llamar al técnico para revisar el resultado antes de tocarlo"
    ],
    correcta: 1,
    explicacion: "El husillo de la fresadora mantiene inercia después de cortar y puede continuar girando varios segundos. Tocar el material o la fresa antes de que se detenga completamente puede causar cortes graves o dañar la pieza trabajada."
  },
  {
    id: "m3-q-14",
    enunciado: "¿A qué nivel de práctica de M3 corresponde el corte y habilitado de piezas básicas con sierra circular y garlopa?",
    opciones: [
      "Nivel 2 — Ensamblaje e integración de piezas",
      "Nivel 1A — Máquinas de corte y habilitado",
      "Nivel 1B — Fabricación digital y formado",
      "Nivel 3 — Acabado superficial y presentación final"
    ],
    correcta: 1,
    explicacion: "El Nivel 1A de M3 trabaja las máquinas de corte (sierra circular, radial, garlopa, regruesadora). El dominio de estas máquinas es prerequisito para los niveles siguientes de fabricación digital y ensamblaje."
  },
  {
    id: "m3-q-15",
    enunciado: "Al doblar acrílico con pistola de calor, ¿cuál es el error más grave que debe evitarse?",
    opciones: [
      "Calentar uniformemente toda la línea de doblez de extremo a extremo",
      "Concentrar el calor demasiado tiempo en un solo punto — puede quemar o deformar irreversiblemente el acrílico",
      "Doblar la pieza sobre una plantilla o ángulo guía",
      "Dejar enfriar sobre la plantilla antes de retirarla"
    ],
    correcta: 1,
    explicacion: "El acrílico es sensible a la temperatura: el calor debe distribuirse uniformemente a lo largo de la línea de doblez, moviéndola constantemente. Concentrarlo genera puntos de sobrecalentamiento que producen burbujas, quemaduras o fracturas irreversibles."
  },
  {
    id: "m3-q-16",
    enunciado: "La soldadora MIG/MAG usa una protección gaseosa que cumple la función de:",
    opciones: [
      "Proteger el cordón de soldadura de la oxidación atmosférica durante la fusión",
      "Enfriar el material base para evitar distorsión térmica",
      "Limpiar las impurezas de la superficie metálica antes de soldar",
      "La soldadora MIG/MAG no requiere protección adicional"
    ],
    correcta: 0,
    explicacion: "El gas protector (argón puro para MIG, mezcla argón/CO₂ para MAG) desplaza el oxígeno y nitrógeno del aire en la zona de fusión. Sin este blindaje gaseoso, el cordón queda poroso, frágil y sin resistencia mecánica."
  },
  {
    id: "m3-q-17",
    enunciado: "Para llevar una pieza de 40 mm a 25 mm con la regruesadora, ¿cuántas pasadas se requieren aproximadamente?",
    opciones: [
      "Una pasada directa de 15 mm si la máquina tiene potencia suficiente",
      "Al menos 8 a 15 pasadas de 1-2 mm cada una para proteger el equipo y obtener superficie limpia",
      "Dos pasadas de 7.5 mm — división matemática del espesor a rebajar",
      "Depende exclusivamente de la especie de madera y su dureza"
    ],
    correcta: 1,
    explicacion: "La regla de 1-2 mm por pasada no es solo una recomendación de eficiencia: protege los cuchillos de la regruesadora del desgaste acelerado, evita el kickback por sobrecarga y produce superficies más limpias que pasadas agresivas."
  },
  {
    id: "m3-q-18",
    enunciado: "¿Cuál es el orden correcto del flujo de trabajo en fabricación digital?",
    opciones: [
      "Fabricar → Diseñar → Verificar → Repetir si hay errores",
      "Diseñar en CAD → Configurar en CAM → Ejecutar en máquina → Verificar y ajustar",
      "Cargar en máquina → Configurar CAM → Diseñar en CAD → Fabricar",
      "Prototipar manualmente → Digitalizar → Fabricar → Diseñar el plano"
    ],
    correcta: 1,
    explicacion: "El flujo digital sigue: CAD (forma/geometría) → CAM (estrategia de mecanizado, velocidades, profundidades) → Máquina (ejecución) → Verificación (medir, comparar con diseño). Este orden garantiza que la máquina reciba instrucciones precisas antes de operar."
  },
  {
    id: "m3-q-19",
    enunciado: "¿Qué protección ocular es obligatoria para TODOS los procesos de la Zona de Innovación?",
    opciones: [
      "Lentes oscuros de sol con protección UV",
      "Lentes de seguridad de policarbonato certificados, resistentes a impactos y proyecciones",
      "Lentes de aumento o lectura para trabajos de precisión",
      "La protección ocular no es obligatoria si el docente está supervisando"
    ],
    correcta: 1,
    explicacion: "Los lentes de seguridad de policarbonato son el EPP mínimo en toda la Zona de Innovación. El policarbonato resiste impactos que fracturarían lentes convencionales. Los lentes de sol no son protección de seguridad: no están certificados para proyecciones de partículas."
  },
  {
    id: "m3-q-20",
    enunciado: "Un estudiante quiere hacer un letrero de MDF con la cortadora láser. ¿Cuál es la secuencia técnica correcta?",
    opciones: [
      "Tomar el MDF → colocar en la cama de la máquina → encender y cortar directamente",
      "Diseñar el arte en software vectorial → preparar el archivo → configurar potencia/velocidad → verificar foco → ejecutar corte → retirar con ventilación activa",
      "Dibujar a mano → escanear como JPG → enviarlo a la cortadora",
      "Pedirle el diseño a otro estudiante que ya lo hizo antes y cortarlo sin modificar"
    ],
    correcta: 1,
    explicacion: "El proceso completo de la cortadora láser incluye: diseño vectorial → configuración de parámetros (potencia y velocidad según el material) → verificación del foco → ejecución → ventilación activa durante y después del corte. Cada paso es crítico para la seguridad y la calidad del resultado."
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// M4 · QUIZ ACABADOS Y ALMACÉN — 12 preguntas, mínimo 75%
// Verifica conocimiento de equipos de acabado, gestión del almacén,
// mantenimiento preventivo y organización del taller
// ─────────────────────────────────────────────────────────────────────────────
export const quizAcabadosAlmacenM4: PreguntaQuiz[] = [
  {
    id: "m4-q-1",
    enunciado: "¿Para qué proceso se usa principalmente la lijadora de banda en la Zona de Acabados?",
    opciones: [
      "Para cortar piezas en curvas y formas orgánicas",
      "Para lijar superficies planas grandes de manera rápida y uniforme antes del acabado fino",
      "Para perforar agujeros en madera gruesa",
      "Para dar forma geométrica a las piezas antes del torneado"
    ],
    correcta: 1,
    explicacion: "La lijadora de banda elimina material rápidamente en superficies planas. Es el primer paso del proceso de acabado: quita marcas de máquina, defectos superficiales e irregularidades antes de pasar a la lijadora orbital y el acabado manual."
  },
  {
    id: "m4-q-2",
    enunciado: "¿Cuál es la secuencia correcta de granos de lija para acabar una pieza de madera?",
    opciones: [
      "Grano 220 → 120 → 80 → 40 (de fino a grueso, progresivo)",
      "Grano 40 → 80 → 120 → 220 (de grueso a fino, progresivo)",
      "Solo grano 120 — es el estándar universal para todos los acabados",
      "Grano 80 → 40 → 220 saltando el grano 120"
    ],
    correcta: 1,
    explicacion: "La secuencia de grueso a fino es fundamental: cada grano elimina las rayaduras del anterior. Saltarse granos deja marcas visibles bajo el acabado. La secuencia 40→80→120→180→220 es la estándar para madera natural antes de aplicar sellador."
  },
  {
    id: "m4-q-3",
    enunciado: "En la cabina de pintura, ¿cuál es el PRIMER paso obligatorio antes de aplicar cualquier producto?",
    opciones: [
      "Mezclar la pintura con el solvente en la proporción correcta",
      "Verificar la ventilación activa y colocarse todos los EPP: respirador con cartucho para vapores, lentes tipo antiparra y mameluco",
      "Calentar ligeramente la cabina para mejorar la adherencia del acabado",
      "Colocar la pieza en posición y comenzar con una mano de prueba"
    ],
    correcta: 1,
    explicacion: "El EPP completo y la ventilación son prerequisitos innegociables antes de abrir cualquier envase en la cabina de pintura. Los vapores de solventes son inflamables y tóxicos — sin ventilación adecuada y respirador con cartucho orgánico, el riesgo es inmediato."
  },
  {
    id: "m4-q-4",
    enunciado: "¿Qué significa el método PEPS en la gestión del almacén del taller?",
    opciones: [
      "Primera Exportación, Primero Sale — para gestión de proveedores",
      "Primero Entra, Primero Sale (FIFO) — el material que ingresó primero es el primero en usarse",
      "Primero Evaluado, Primero Seleccionado — para control de calidad de materiales",
      "PEPS no es una metodología real de almacén"
    ],
    correcta: 1,
    explicacion: "PEPS (FIFO en inglés) garantiza la rotación correcta de materiales: los primeros en entrar son los primeros en salir. Esto evita que materiales antiguos queden olvidados al fondo del almacén, especialmente crítico para materiales con fecha de vencimiento o susceptibles a degradación."
  },
  {
    id: "m4-q-5",
    enunciado: "¿Qué ficha se utiliza para registrar el estado operativo de los equipos al inicio de cada jornada?",
    opciones: [
      "Ficha de inventario anual de bienes patrimoniales",
      "Ficha de verificación diaria (check list operativo) de cada equipo",
      "Registro de asistencia de estudiantes con equipos asignados",
      "Bitácora técnica de intervenciones y mantenimiento correctivo"
    ],
    correcta: 1,
    explicacion: "La ficha de verificación diaria (check list) es la herramienta de control preventivo más importante del taller. Documenta el estado del equipo antes de cada uso, identifica problemas incipientes y genera el historial que alimenta el programa de mantenimiento preventivo."
  },
  {
    id: "m4-q-6",
    enunciado: "¿Con qué periodicidad mínima debe ejecutarse el mantenimiento preventivo de equipos como la lijadora orbital?",
    opciones: [
      "Cada 5 años — cuando lo establece el contrato de garantía del fabricante",
      "Según el programa de mantenimiento establecido: limpieza mensual y revisión técnica semestral como mínimo",
      "Solo cuando falla o presenta síntomas de mal funcionamiento",
      "El fabricante envía técnicos — el docente no interviene"
    ],
    correcta: 1,
    explicacion: "El mantenimiento preventivo tiene intervalos definidos: limpieza y lubricación mensual (según uso), revisión de piezas de desgaste semestral. Esperar a que falle (mantenimiento correctivo) es más costoso y genera tiempos muertos en el taller."
  },
  {
    id: "m4-q-7",
    enunciado: "En la metodología 5S para organización del almacén, ¿cuál es el primer paso?",
    opciones: [
      "Limpiar todo el espacio antes de reorganizar",
      "Clasificar (Seiri) — separar lo necesario de lo innecesario y eliminar lo que no sirve",
      "Estandarizar el proceso mediante procedimientos escritos",
      "Capacitar al equipo docente en la metodología 5S"
    ],
    correcta: 1,
    explicacion: "Las 5S siguen un orden: Seiri (Clasificar) → Seiton (Ordenar) → Seiso (Limpiar) → Seiketsu (Estandarizar) → Shitsuke (Sostener). Empezar por la limpieza sin haber clasificado primero solo organiza el desorden en lugar de eliminarlo."
  },
  {
    id: "m4-q-8",
    enunciado: "¿Qué síntomas indican que la pistola de pintura necesita limpieza inmediata?",
    opciones: [
      "El color del acabado cambia respecto al tono esperado",
      "La pintura sale en gotas, el patrón de pulverización es irregular o la presión es inconsistente",
      "El compresor emite ruido diferente al normal durante la operación",
      "La pintura se seca demasiado rápido sobre la pieza"
    ],
    correcta: 1,
    explicacion: "Una pistola sucia produce patrón irregular, goteo y presión inconsistente. La limpieza debe realizarse inmediatamente después de cada uso — el solvente residual que queda en los conductos endurece la pintura y puede inutilizar la pistola permanentemente."
  },
  {
    id: "m4-q-9",
    enunciado: "¿Cuál es la función del código de bien en el sistema de inventario del taller?",
    opciones: [
      "Indicar que el bien es nuevo y está en garantía del proveedor",
      "Identificar unívocamente cada equipo y vincularlo a su ficha técnica, ubicación, historial de mantenimiento y estado operativo",
      "Clasificar los bienes por su valor económico para el seguro institucional",
      "Registrar a los estudiantes autorizados a operar cada equipo"
    ],
    correcta: 1,
    explicacion: "El código de bien es el identificador único que conecta el objeto físico con toda su información digital: ficha técnica, ubicación, historial de mantenimiento y estado. Sin este código, la trazabilidad del patrimonio institucional es imposible."
  },
  {
    id: "m4-q-10",
    enunciado: "¿Qué producto se aplica PRIMERO en el proceso de acabado de una pieza de madera?",
    opciones: [
      "La laca de terminación para fijar el acabado",
      "El sellador o fondo (primer) para cerrar los poros de la madera antes del acabado final",
      "La cera de acabado natural para resaltar la veta",
      "El barniz brillante final como primera capa base"
    ],
    correcta: 1,
    explicacion: "El sellador (primer) es el primer producto aplicado: cierra los poros de la madera, crea una superficie uniforme de absorción y mejora la adherencia del acabado final. Sin sellador, el barniz o laca final absorbe de forma irregular y produce manchas o diferencias de brillo."
  },
  {
    id: "m4-q-11",
    enunciado: "¿En qué se diferencia la bitácora de mantenimiento del check list de verificación diaria?",
    opciones: [
      "Son documentos equivalentes con diferente nombre según la institución",
      "La bitácora registra intervenciones técnicas específicas (fecha, falla detectada, acción realizada, responsable); el check list verifica el estado operativo diario antes del uso",
      "La bitácora es obligatoria para la UGEL; el check list es de uso interno opcional",
      "La bitácora la lleva el técnico externo; el check list el docente"
    ],
    correcta: 1,
    explicacion: "Son complementarios pero distintos: el check list es preventivo y diario (¿el equipo funciona hoy?), la bitácora es correctiva e histórica (¿qué intervenciones se han realizado y por qué?). Juntos construyen el historial completo del equipo."
  },
  {
    id: "m4-q-12",
    enunciado: "En la toma de inventario anual del taller, ¿qué debe verificarse de cada bien?",
    opciones: [
      "Solo que esté físicamente presente en el espacio del taller",
      "Presencia física, estado operativo real, código interno visible, ubicación asignada correcta y actualización de la ficha técnica",
      "Solo el código interno y el nombre del bien en el listado",
      "El precio de reposición actual en el mercado para el seguro"
    ],
    correcta: 1,
    explicacion: "La toma de inventario no es solo un conteo: verifica que cada bien esté en el lugar correcto, funcione, tenga su código visible y su ficha técnica actualizada. Es el momento para identificar bienes dados de baja, en reparación o con cambios de estado."
  }
]
