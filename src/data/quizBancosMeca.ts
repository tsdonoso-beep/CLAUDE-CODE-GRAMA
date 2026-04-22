import type { PreguntaQuiz } from './modulosLXP'

export const quizBancosMeca: Record<string, PreguntaQuiz[]> = {

  // M0-S05 — Gamma, Teachy, Polypad, Meshy (6 preguntas)
  'm0-s05-c5': [
    {
      id: 'm0-s05-c5-q1',
      enunciado: 'El docente quiere que sus estudiantes visualicen en 3D cómo funciona el sistema de transmisión antes de la práctica con el vehículo real. ¿Qué herramienta es la más adecuada?',
      opciones: [
        'Gamma — para crear una presentación con imágenes del sistema de transmisión',
        'Teachy — para generar una guía de estudio del tema',
        'Meshy — permite generar o explorar modelos 3D de componentes mecánicos que los estudiantes pueden rotar y analizar antes de la práctica',
        'Polypad — para visualizar las ecuaciones de la relación de transmisión'
      ],
      correcta: 2,
      explicacion: 'Meshy genera modelos 3D a partir de texto o imágenes. Para el taller automotriz, permite que los estudiantes "vean por dentro" piezas que en el vehículo real están ensambladas y son difíciles de observar, antes de manipularlas físicamente.'
    },
    {
      id: 'm0-s05-c5-q2',
      enunciado: 'El docente necesita preparar una presentación pedagógica del sistema de frenos ABS con diseño profesional en menos de 10 minutos. ¿Qué herramienta usa?',
      opciones: [
        'Google Slides — más confiable para presentaciones técnicas',
        'Gamma — genera presentaciones completas con diseño visual a partir de un prompt o esquema de contenido',
        'Meshy — para crear diagramas 3D del sistema ABS',
        'Teachy — genera presentaciones automáticamente con actividades incluidas'
      ],
      correcta: 1,
      explicacion: 'Gamma usa IA para generar presentaciones visualmente atractivas desde un prompt o esquema en segundos. El docente describe el tema ("sistema de frenos ABS para estudiantes de secundaria") y Gamma produce slides con estructura, imágenes y texto.'
    },
    {
      id: 'm0-s05-c5-q3',
      enunciado: 'El docente quiere crear un quiz de 10 preguntas sobre diagnóstico de fallas en el sistema eléctrico del vehículo en menos de 5 minutos. ¿Qué herramienta es la más directa?',
      opciones: [
        'Gamma — tiene generador de preguntas integrado en las presentaciones',
        'Meshy — puede generar ejercicios interactivos de diagnóstico',
        'Teachy — genera actividades, evaluaciones y organizadores visuales a partir del tema y grado indicados',
        'Polypad — tiene banco de ejercicios técnicos automotrices'
      ],
      correcta: 2,
      explicacion: 'Teachy está diseñado específicamente para crear recursos pedagógicos: quizzes, listas de cotejo, organizadores visuales, planes de sesión. Con indicar el tema, el grado y el tipo de instrumento, genera el recurso en segundos.'
    },
    {
      id: 'm0-s05-c5-q4',
      enunciado: 'Un docente quiere usar Polypad en su taller automotriz. ¿Cuál es el uso más apropiado?',
      opciones: [
        'Modelar en 3D el motor del vehículo para que los estudiantes lo exploren',
        'Generar una presentación visual del sistema de suspensión',
        'Visualizar conceptos matemáticos relacionados al taller: calcular relaciones de transmisión, ángulos de inclinación de ruedas (camber/caster) o proporciones de mezcla aire-combustible',
        'Crear actividades de evaluación sobre diagnóstico de fallas'
      ],
      correcta: 2,
      explicacion: 'Polypad es una pizarra matemática interactiva. En el taller automotriz su valor está en visualizar y calcular conceptos técnicos con base matemática: relaciones de engranajes, proporciones, ángulos de geometría de dirección, conversiones de unidades.'
    },
    {
      id: 'm0-s05-c5-q5',
      enunciado: '¿Cuál es la diferencia principal entre Gamma y Teachy para el trabajo docente del taller automotriz?',
      opciones: [
        'Gamma es de pago y Teachy es gratuito — la diferencia es solo económica',
        'Gamma crea presentaciones visuales para exponer contenido; Teachy crea actividades pedagógicas para que los estudiantes practiquen o sean evaluados',
        'Son herramientas idénticas — solo cambia la interfaz de usuario',
        'Gamma es para docentes de primaria y Teachy para secundaria técnica'
      ],
      correcta: 1,
      explicacion: 'Gamma resuelve el problema del docente expositor (preparar materiales visuales para presentar). Teachy resuelve el problema del docente evaluador (crear actividades, quizzes, organizadores para los estudiantes). Son complementarias, no equivalentes.'
    },
    {
      id: 'm0-s05-c5-q6',
      enunciado: 'El docente quiere que los estudiantes vean el motor de un Toyota Corolla en 3D antes de desarmarlo. No tiene modelo 3D previo. ¿Qué puede hacer con Meshy?',
      opciones: [
        'Nada — Meshy solo trabaja con modelos 3D ya existentes en su biblioteca',
        'Generar un modelo 3D del motor escribiendo una descripción textual o subiendo una foto de referencia, y luego compartirlo para que los estudiantes lo exploren desde sus dispositivos',
        'Descargar el plano técnico oficial de Toyota y convertirlo en 3D automáticamente',
        'Meshy solo genera objetos decorativos, no piezas técnicas mecánicas'
      ],
      correcta: 1,
      explicacion: 'Meshy genera modelos 3D a partir de texto (text-to-3D) o imágenes (image-to-3D). Un docente puede describir "motor de 4 cilindros en línea, vista explodida" y obtener un modelo navegable. No es un plano técnico certificado, pero es una herramienta de exploración visual muy potente antes de la práctica.'
    }
  ],

  // M0-S04 — IA generativa: GPT, Claude, Gemini (6 preguntas)
  'm0-s04-c4': [
    {
      id: 'm0-s04-c4-q1',
      enunciado: 'Un docente quiere generar una rúbrica para evaluar el "cambio de pastillas de freno". ¿Cuál prompt produce el resultado más útil?',
      opciones: [
        '"Hazme una rúbrica de mecánica"',
        '"Crea una rúbrica básica para evaluar estudiantes de taller"',
        '"Crea una rúbrica analítica con 4 criterios (seguridad EPP, procedimiento técnico, calidad del resultado, orden del área) y 4 niveles (inicio, proceso, logrado, destacado) para evaluar: cambio de pastillas de freno en vehículo real. Contexto: estudiantes de 4° secundaria, taller automotriz EPT-MINEDU."',
        '"Dame una rúbrica para mecánica automotriz con niveles"'
      ],
      correcta: 2,
      explicacion: 'Un prompt efectivo especifica el tipo de instrumento, los criterios exactos, los niveles de desempeño, la tarea concreta y el contexto del grupo. Cuanto más específico, más útil el resultado y menos revisión requiere.'
    },
    {
      id: 'm0-s04-c4-q2',
      enunciado: 'Un estudiante verifica en ChatGPT si el código OBD-II P0301 corresponde a "fallo de encendido en cilindro 1". La IA responde correctamente. ¿Qué precaución debe tomar el docente?',
      opciones: [
        'Ninguna — si la IA responde correctamente, la información es confiable para diagnóstico',
        'Verificar siempre en el manual técnico oficial del fabricante del vehículo, ya que la IA puede tener datos desactualizados o imprecisos para modelos específicos',
        'Prohibir el uso de IA para diagnóstico — solo el escáner físico es válido en el taller',
        'Pedir al estudiante que use Gemini en lugar de ChatGPT para tener una segunda opinión'
      ],
      correcta: 1,
      explicacion: 'La IA puede ser un punto de partida útil, pero no reemplaza la fuente técnica oficial. Los manuales de fabricante tienen información específica por año/modelo/motor que la IA puede no tener actualizada o puede generalizar incorrectamente.'
    },
    {
      id: 'm0-s04-c4-q3',
      enunciado: 'El docente tiene un manual técnico de 120 páginas en PDF del escáner nuevo del taller. ¿Qué herramienta de IA es más adecuada para extraer información específica de ese documento?',
      opciones: [
        'ChatGPT — tiene más conocimiento técnico automotriz en su entrenamiento',
        'Gemini — está integrado con Google Drive y puede leer el PDF directamente',
        'NotebookLM — permite subir el PDF y hacerle preguntas específicas basadas exclusivamente en el contenido del documento',
        'Claude — genera respuestas más largas y detalladas sobre documentos técnicos'
      ],
      correcta: 2,
      explicacion: 'NotebookLM está diseñado específicamente para analizar documentos que el usuario sube. Sus respuestas se basan en el contenido del documento, no en conocimiento general de entrenamiento, lo que lo hace ideal para manuales técnicos específicos.'
    },
    {
      id: 'm0-s04-c4-q4',
      enunciado: '¿Cuál es la limitación más importante a considerar al usar IA generativa para planificar sesiones de aprendizaje del taller automotriz?',
      opciones: [
        'La IA solo puede generar texto, no imágenes de procedimientos técnicos',
        'Las herramientas de IA son de pago y no están disponibles para docentes públicos',
        'La IA puede generar contenido plausible pero incorrecto técnicamente — todo lo generado debe ser revisado por el docente antes de usarlo con estudiantes',
        'La IA no conoce el currículo peruano y sus sugerencias siempre son de otros países'
      ],
      correcta: 2,
      explicacion: 'Las IAs generativas pueden "alucinar" — producir información técnica que suena correcta pero es errónea. En un taller automotriz, un procedimiento incorrecto puede causar accidentes. El docente es el filtro de calidad técnica indispensable.'
    },
    {
      id: 'm0-s04-c4-q5',
      enunciado: 'El docente quiere usar IA para adaptar una explicación del sistema ABS para estudiantes de 3° de secundaria que nunca han visto el interior de un freno. ¿Cuál prompt es más efectivo?',
      opciones: [
        '"Explícame el sistema ABS"',
        '"¿Cómo funciona el ABS en los autos modernos?"',
        '"Explica cómo funciona el sistema ABS usando una analogía simple, para estudiantes de 15 años sin conocimiento previo de frenos. Usa máximo 3 párrafos cortos y termina con una pregunta de reflexión para el aula."',
        '"Dame información técnica del sistema ABS para enseñar en el taller"'
      ],
      correcta: 2,
      explicacion: 'Un buen prompt pedagógico especifica el nivel del público, pide una estrategia didáctica concreta (analogía), limita la extensión y solicita un elemento de cierre (pregunta de reflexión). El resultado es directamente usable en el aula.'
    },
    {
      id: 'm0-s04-c4-q6',
      enunciado: '¿En qué se diferencia usar Claude de usar ChatGPT para preparar materiales del taller automotriz?',
      opciones: [
        'Claude solo funciona en inglés — para español es mejor ChatGPT',
        'ChatGPT es gratuito, Claude siempre es de pago',
        'Son herramientas similares en propósito; la diferencia principal está en el estilo de respuesta, los límites de contexto y las capacidades específicas de cada versión — lo más importante es aprender a escribir buenos prompts independientemente de la herramienta',
        'Claude no puede generar rúbricas ni listas de cotejo como ChatGPT'
      ],
      correcta: 2,
      explicacion: 'GPT, Claude y Gemini son todas IAs generativas de texto con capacidades similares para el trabajo docente. La habilidad clave es el diseño de prompts — un buen prompt produce buenos resultados en cualquiera de ellas. Ninguna reemplaza el juicio técnico del docente.'
    }
  ],

  // M0-S03 — Google Workspace para docentes (8 preguntas)
  'm0-s03-c5': [
    {
      id: 'm0-s03-c5-q1',
      enunciado: 'El docente necesita coordinar el horario de uso del foso de reparación entre 3 secciones distintas. ¿Qué herramienta de Google Workspace es la más adecuada?',
      opciones: [
        'Google Docs — para escribir el horario en un documento compartido',
        'Google Calendar — permite crear eventos por bloque horario, asignarlos a cada sección y enviar invitaciones automáticas',
        'Google Forms — para que cada sección solicite su turno',
        'Google Chat — para coordinar informalmente por mensajes'
      ],
      correcta: 1,
      explicacion: 'Google Calendar permite visualizar disponibilidad en tiempo real, crear eventos recurrentes por sección y enviar recordatorios automáticos. Es la herramienta ideal para gestionar recursos compartidos con restricción de horario.'
    },
    {
      id: 'm0-s03-c5-q2',
      enunciado: 'El docente quiere llevar el inventario de insumos del taller (aceites, filtros, bujías) con control de cantidades y alertas de stock mínimo. ¿Qué herramienta usa?',
      opciones: [
        'Google Docs — para listar los insumos en una tabla de texto',
        'Google Slides — para crear una presentación visual del inventario',
        'Google Sheets — permite tablas, fórmulas de cálculo y formato condicional para alertas de stock',
        'Google Keep — para anotar los insumos como lista de tareas'
      ],
      correcta: 2,
      explicacion: 'Google Sheets es la herramienta de datos de Google Workspace. Con fórmulas básicas y formato condicional se puede calcular stock disponible y resaltar automáticamente los insumos que deben reponerse.'
    },
    {
      id: 'm0-s03-c5-q3',
      enunciado: '¿Cuál es la principal ventaja pedagógica de usar Google Docs frente al papel para que los estudiantes redacten su informe de diagnóstico de fallas?',
      opciones: [
        'Google Docs tiene corrector ortográfico en terminología automotriz',
        'El docente puede agregar comentarios directamente en el texto del estudiante sin necesidad de reimprimir, en tiempo real',
        'El informe queda guardado automáticamente sin que el estudiante tenga que hacerlo',
        'Google Docs genera el informe con inteligencia artificial sin que el estudiante tenga que escribir'
      ],
      correcta: 1,
      explicacion: 'La retroalimentación en tiempo real con comentarios contextuales es el diferenciador clave. El docente señala exactamente qué parte del diagnóstico está incompleta o incorrecta, y el estudiante corrige sin reiniciar el documento.'
    },
    {
      id: 'm0-s03-c5-q4',
      enunciado: 'Google Tasks integrado con Google Calendar sirve principalmente para:',
      opciones: [
        'Chatear con otros docentes en tiempo real sobre el estado del taller',
        'Almacenar manuales técnicos de los fabricantes de equipos',
        'Registrar tareas pendientes con fechas límite y vincularlas al calendario de actividades del taller',
        'Crear formularios de diagnóstico de vehículos para los estudiantes'
      ],
      correcta: 2,
      explicacion: 'Tasks + Calendar es la combinación de productividad personal: Tasks captura la tarea (ej: "revisar extintor antes del lunes"), Calendar la ubica en el tiempo. Para el docente de mecánica: mantenimientos programados, entregas de fichas técnicas, revisiones de equipos.'
    },
    {
      id: 'm0-s03-c5-q5',
      enunciado: 'El docente quiere que sus estudiantes completen una ficha de evaluación de cada práctica y que los resultados se organicen automáticamente en una hoja de cálculo. ¿Qué flujo de trabajo usa?',
      opciones: [
        'Google Docs → copiar y pegar manualmente en Sheets',
        'Google Forms (para capturar respuestas) + Google Sheets (las respuestas se vuelcan automáticamente en una hoja vinculada)',
        'Google Slides con preguntas de opción múltiple y pantalla compartida',
        'Google Chat con una encuesta rápida al final de la sesión'
      ],
      correcta: 1,
      explicacion: 'Google Forms genera automáticamente una hoja de respuestas en Sheets. El docente diseña la ficha de evaluación una sola vez y todas las respuestas de los estudiantes se registran sin intervención manual.'
    },
    {
      id: 'm0-s03-c5-q6',
      enunciado: 'Un docente quiere compartir los manuales técnicos de los equipos del taller con todos sus estudiantes y que siempre tengan la versión más actualizada. ¿Qué hace?',
      opciones: [
        'Envía el PDF por WhatsApp cada vez que hay una actualización',
        'Sube los manuales a Google Drive en una carpeta compartida — cualquier actualización del archivo es inmediatamente visible para todos los que tienen el enlace',
        'Publica los manuales en Google Sites pero solo pueden verlos con cuenta Google',
        'Los guarda en Google Photos para que sean fáciles de buscar'
      ],
      correcta: 1,
      explicacion: 'Google Drive con carpeta compartida es el repositorio centralizado de Google Workspace. Un solo enlace, acceso controlado por el docente, y cualquier actualización del archivo (nueva versión del manual) es inmediatamente visible sin reenviar nada.'
    },
    {
      id: 'm0-s03-c5-q7',
      enunciado: 'Al final del ciclo, el docente necesita consolidar las notas de práctica de 28 estudiantes que cada uno ingresó en su propia hoja de Google Sheets. ¿Cuál es la forma más eficiente?',
      opciones: [
        'Copiar y pegar manualmente las notas de cada hoja en una hoja maestra',
        'Usar la función IMPORTRANGE de Google Sheets para traer los datos de cada hoja de estudiante a una hoja maestra de consolidación automáticamente',
        'Pedirle a cada estudiante que envíe su nota por correo',
        'No es posible consolidar hojas separadas en Google Workspace'
      ],
      correcta: 1,
      explicacion: 'IMPORTRANGE conecta hojas de Sheets entre sí. La hoja maestra del docente puede importar automáticamente los datos de cada estudiante, eliminando la consolidación manual y reduciendo errores de transcripción.'
    },
    {
      id: 'm0-s03-c5-q8',
      enunciado: 'Un colega docente no puede asistir a la reunión de coordinación. El docente quiere que pueda ver la presentación, hacer preguntas y revisarla después. ¿Qué herramienta de Google Workspace cubre las tres necesidades?',
      opciones: [
        'Google Slides (presentación) + Google Meet (reunión en vivo con grabación) + Google Drive (acceso posterior a la grabación y slides)',
        'Solo Google Meet — es suficiente para todo',
        'Google Docs para escribir los puntos de la reunión y enviárselos después',
        'WhatsApp para la reunión y Google Drive solo para guardar el archivo'
      ],
      correcta: 0,
      explicacion: 'La combinación Slides + Meet + Drive cubre los tres momentos: la presentación en vivo (Slides compartido en Meet), la participación remota (Meet con audio/video), y el acceso posterior (grabación de Meet y Slides guardados en Drive).'
    }
  ],

  // M1-S11 — Metrado de equipos automotriz (10 preguntas)
  'm1-s11-c3': [
    {
      id: 'm1-s11-c3-q1',
      enunciado: '¿Qué es el "metrado" de equipos en el contexto del taller TSF-MINEDU?',
      opciones: [
        'El peso total de los equipos instalados en el taller',
        'El registro sistemático de todos los bienes del taller con sus características, estado y zona asignada',
        'El presupuesto anual para mantenimiento de equipos',
        'El conteo rápido de cuántos equipos llegaron en el despacho'
      ],
      correcta: 1,
      explicacion: 'El metrado es el inventario técnico oficial: identifica cada bien, lo ubica en una zona pedagógica, registra su estado y asigna el código MINEDU. Sin metrado, el equipo no existe oficialmente para efectos de garantía y soporte.'
    },
    {
      id: 'm1-s11-c3-q2',
      enunciado: 'El escáner OBD-II/CAN del taller de mecánica pertenece a la Zona de Investigación porque:',
      opciones: [
        'Es el equipo más caro y debe estar protegido en la zona más segura',
        'Se usa solo al inicio del año escolar para diagnóstico general',
        'Permite diagnosticar fallas del vehículo antes de intervenir — es el punto de partida del proceso técnico',
        'Es demasiado delicado para usarlo en la Zona de Innovación'
      ],
      correcta: 2,
      explicacion: 'La Zona de Investigación alberga equipos que permiten diagnosticar e investigar el problema antes de actuar. El escáner es la herramienta de diagnóstico por excelencia: primero investigo, luego intervengo en Innovación.'
    },
    {
      id: 'm1-s11-c3-q3',
      enunciado: 'Revisas el metrado anterior y ves que el multímetro digital está registrado en "Zona de Almacén — herramienta de mano". ¿Es correcto?',
      opciones: [
        'Sí — es una herramienta de mano y el almacén es el lugar correcto',
        'No — el multímetro es un instrumento de diagnóstico y pertenece a la Zona de Investigación',
        'Sí — el almacén guarda todos los equipos cuando no se usan',
        'Depende — si se usa con frecuencia puede estar en cualquier zona'
      ],
      correcta: 1,
      explicacion: 'El multímetro automotriz diagnostica problemas eléctricos del vehículo — misma función pedagógica que el escáner. Su zona es Investigación, no Almacén. Clasificarlo por tamaño físico confunde función pedagógica con forma.'
    },
    {
      id: 'm1-s11-c3-q4',
      enunciado: 'El taller recibe: 1 elevador tipo tijera, 2 pistolas de impacto neumáticas y 1 escáner LAUNCH X431. ¿Cómo se distribuyen por zona?',
      opciones: [
        'Todos en Zona de Innovación — son equipos de trabajo activo',
        'Elevador e Innovación; escáner → Investigación; pistolas → Innovación',
        'Elevador → Almacén (es pesado); escáner → Investigación; pistolas → Innovación',
        'Escáner e Innovación comparten zona; elevador va donde haya espacio'
      ],
      correcta: 1,
      explicacion: 'El escáner diagnostica → Investigación. El elevador y las pistolas son herramientas de trabajo activo sobre el vehículo → Innovación. El peso del elevador no determina su zona: su función pedagógica sí.'
    },
    {
      id: 'm1-s11-c3-q5',
      enunciado: 'La ficha de metrado requiere registrar torquímetros: el taller tiene 3 de ½" y 2 de 3/8". ¿Cómo se registran correctamente?',
      opciones: [
        'Como un solo ítem "Torquímetro — 5 unidades"',
        'Como dos ítems separados: "Torquímetro ½\\" — 3 u." y "Torquímetro 3/8\\" — 2 u."',
        'Solo se registra el más grande — el pequeño es accesorio',
        'El torquímetro no se metrada — es herramienta de mano menor'
      ],
      correcta: 1,
      explicacion: 'Cada especificación técnica diferente es un ítem de metrado independiente. El torquímetro ½" y el 3/8" tienen rangos de torque distintos y se usan en operaciones diferentes. Agruparlos impide conocer la capacidad real del taller.'
    },
    {
      id: 'm1-s11-c3-q6',
      enunciado: '¿Qué campo de la ficha técnica determina si el equipo puede usarse en la sesión de hoy?',
      opciones: [
        'El nombre del fabricante y el país de origen',
        'La fecha de compra y el número de factura',
        'El estado operativo actual y la fecha de la última revisión de seguridad',
        'El código de bien asignado por el MINEDU'
      ],
      correcta: 2,
      explicacion: 'El estado operativo ("Operativo", "Operativo con restricción", "En reparación — NO USAR") es el campo que autoriza o bloquea el uso del equipo. Sin esa información actualizada, no se puede tomar la decisión correcta.'
    },
    {
      id: 'm1-s11-c3-q7',
      enunciado: 'Al registrar la prensa hidráulica del taller, un docente la ubica en "Zona de Almacén" porque "es grande y pesada". ¿Qué error cometió?',
      opciones: [
        'Ninguno — los equipos pesados siempre van en almacén por seguridad',
        'Confundió la función pedagógica del equipo con su tamaño físico. La prensa hidráulica es un equipo de trabajo activo → Zona de Innovación',
        'Debería ir en Investigación porque se usa para medir presiones',
        'El error es no haber consultado al director antes de ubicarla'
      ],
      correcta: 1,
      explicacion: 'La zona se asigna por función pedagógica, no por tamaño ni peso. La prensa hidráulica se usa para operaciones mecánicas activas (desmontar rodamientos, alinear piezas) → Innovación.'
    },
    {
      id: 'm1-s11-c3-q8',
      enunciado: '¿Por qué es obligatorio registrar el código de bien MINEDU en la ficha de metrado?',
      opciones: [
        'Para que el director pueda auditar el taller anualmente',
        'Porque sin ese código el equipo no existe oficialmente para efectos de garantía, soporte técnico y seguimiento patrimonial',
        'Es solo un requisito burocrático sin impacto real en el funcionamiento del taller',
        'Para poder vender el equipo al final de su vida útil'
      ],
      correcta: 1,
      explicacion: 'El código de bien MINEDU es el identificador oficial del activo. Sin él, el equipo no puede ser incluido en garantías, no puede reportarse como falla al sistema y no puede darse de baja formalmente.'
    },
    {
      id: 'm1-s11-c3-q9',
      enunciado: 'El taller recibe 3 equipos nuevos el mismo día: compresor, soldadora MIG y banco de trabajo. ¿En qué momento deben registrarse en el metrado?',
      opciones: [
        'Después de instalarlos y probarlos — así se registra el estado real',
        'Antes de ser instalados o usados — el registro previo es condición para que el bien exista oficialmente',
        'Al finalizar el trimestre en el informe de gestión',
        'Cuando llegue el técnico de la UGEL a verificarlos'
      ],
      correcta: 1,
      explicacion: 'El metrado se hace al momento de recepción, antes de instalación. Registrar después de usar implica operar bienes sin identidad oficial, lo que invalida la garantía desde el primer uso.'
    },
    {
      id: 'm1-s11-c3-q10',
      enunciado: 'Durante el metrado, ¿qué acción es correcta al encontrar un equipo sin placa de código de bien ni documentación?',
      opciones: [
        'Instalarlo de todas formas y buscar el código después',
        'Descartarlo — si no tiene código, no sirve',
        'Separarlo, registrarlo como "bien sin identificar", reportar a la UGEL para regularización antes de usarlo',
        'Asignarle un código interno del taller y continuar'
      ],
      correcta: 2,
      explicacion: 'Un bien sin código oficial no puede incorporarse al taller directamente. Debe separarse, registrarse como pendiente de regularización y reportarse a la UGEL. Usarlo sin código pone en riesgo la garantía y el control patrimonial.'
    }
  ],

  // M1-S12 — Instalación y softwares automotrices (10 preguntas)
  'm1-s12-c2': [
    {
      id: 'm1-s12-c2-q1',
      enunciado: 'Al instalar el software LAUNCH X431 en el equipo del taller, el sistema pide activación en línea pero no hay internet. ¿Cuál es la acción correcta?',
      opciones: [
        'Cancelar la instalación y esperar hasta tener internet para instalar desde cero',
        'Completar la instalación sin activar, guardar las credenciales en lugar seguro y activar cuando haya conexión disponible',
        'Instalar en modo demo indefinidamente — con demo es suficiente para el taller',
        'Pedir credenciales prestadas a otro docente para activar el equipo'
      ],
      correcta: 1,
      explicacion: 'La mayoría de softwares de diagnóstico permiten instalación sin activación inmediata con funciones básicas disponibles. Pedir credenciales ajenas viola los términos de licencia y puede invalidar la garantía del software.'
    },
    {
      id: 'm1-s12-c2-q2',
      enunciado: 'El taller tiene vehículos de distintas marcas: Toyota, Hyundai, Volkswagen y Ford. ¿Qué tipo de escáner es más adecuado para el trabajo pedagógico?',
      opciones: [
        'Un escáner OEM dedicado a Toyota, ya que es la marca más común en Perú',
        'Un escáner multimarca (LAUNCH, Autel, Snap-on) con actualización anual de protocolos',
        'Cuatro escáneres OEM diferentes, uno por marca',
        'El multímetro — es suficiente para diagnosticar cualquier vehículo'
      ],
      correcta: 1,
      explicacion: 'Un escáner multimarca cubre múltiples fabricantes con un solo equipo y presupuesto. Los escáneres OEM son más precisos pero inviables económicamente para un taller pedagógico con parque vehicular diverso.'
    },
    {
      id: 'm1-s12-c2-q3',
      enunciado: '¿Por qué es importante actualizar la base de datos del escáner antes de usarlo con vehículos nuevos del taller?',
      opciones: [
        'Para que el escáner funcione más rápido',
        'Porque sin actualización el escáner no enciende',
        'Porque los vehículos nuevos tienen protocolos y códigos que versiones antiguas del software no reconocen',
        'La actualización es opcional — los códigos OBD-II son estándar y no cambian'
      ],
      correcta: 2,
      explicacion: 'Cada año se lanzan nuevos modelos con variantes de protocolos. Un escáner desactualizado puede no reconocer el vehículo o entregar diagnósticos incompletos. La actualización anual es parte del mantenimiento preventivo del equipo.'
    },
    {
      id: 'm1-s12-c2-q4',
      enunciado: 'Al instalar el elevador hidráulico, ¿cuál es el primer paso ANTES de comenzar el montaje?',
      opciones: [
        'Conectar el sistema hidráulico y probar si sube y baja',
        'Verificar que el piso soporte la carga del elevador más el peso máximo del vehículo',
        'Anclar la base con pernos para asegurar estabilidad',
        'Leer el manual de instalación en caso de dudas durante el proceso'
      ],
      correcta: 1,
      explicacion: 'Un elevador de 3.5 ton más un vehículo puede superar las 5 toneladas en un punto. Si el piso no tiene la resistencia adecuada, el equipo puede hundirse o colapsar. La verificación estructural es siempre el primer paso.'
    },
    {
      id: 'm1-s12-c2-q5',
      enunciado: 'El driver del escáner no se instala en Windows 11. ¿Cuál es la acción correcta?',
      opciones: [
        'Bajar a Windows 7 donde el driver sí funciona',
        'Buscar en el sitio oficial del fabricante un driver actualizado compatible con Windows 11',
        'Usar el escáner sin driver — igual conecta por OBD',
        'Reportar el equipo como defectuoso a la UGEL'
      ],
      correcta: 1,
      explicacion: 'Los fabricantes publican actualizaciones de drivers para nuevos sistemas operativos. Antes de declarar incompatibilidad, siempre revisar el sitio oficial del fabricante. Bajar el sistema operativo solo como último recurso y con el área técnica de la IE.'
    },
    {
      id: 'm1-s12-c2-q6',
      enunciado: '¿Qué es el protocolo CAN (Controller Area Network) en el contexto del diagnóstico automotriz?',
      opciones: [
        'Una marca de escáner automotriz profesional',
        'El conector de 16 pines donde se conecta el escáner',
        'Una red de comunicación interna del vehículo que permite que los módulos electrónicos se comuniquen entre sí',
        'El software de actualización del escáner LAUNCH'
      ],
      correcta: 2,
      explicacion: 'CAN es el bus de comunicación estándar en vehículos modernos. Permite que el módulo del motor, ABS, airbags y otros se comuniquen. El escáner "escucha" esta red para leer parámetros y códigos de falla.'
    },
    {
      id: 'm1-s12-c2-q7',
      enunciado: 'El taller solo tiene tomacorrientes de 110V pero el elevador requiere 220V. ¿Qué hace el docente?',
      opciones: [
        'Conectar con un adaptador de voltaje para poder probar el equipo',
        'No conectar el elevador bajo ninguna circunstancia y gestionar la instalación eléctrica correcta con dirección antes del primer uso',
        'Conectarlo brevemente para ver si funciona sin problemas',
        'Usar el elevador de forma manual sin motor mientras se resuelve el tema eléctrico'
      ],
      correcta: 1,
      explicacion: 'Conectar un equipo de 220V a 110V puede dañar el motor irreparablemente y anular la garantía. La instalación eléctrica adecuada es prerequisito no negociable para la puesta en marcha del elevador.'
    },
    {
      id: 'm1-s12-c2-q8',
      enunciado: '¿Quién debe realizar la calibración inicial del elevador hidráulico después de la instalación?',
      opciones: [
        'El docente, siguiendo las instrucciones del manual paso a paso',
        'El técnico autorizado del fabricante o distribuidor, con el acta de calibración como documento de respaldo',
        'Un estudiante avanzado bajo supervisión del docente',
        'No requiere calibración — los elevadores vienen calibrados de fábrica'
      ],
      correcta: 1,
      explicacion: 'La calibración inicial debe realizarla el técnico autorizado. El acta de calibración es documento de respaldo para la garantía y certifica que el equipo opera dentro de los parámetros de seguridad del fabricante.'
    },
    {
      id: 'm1-s12-c2-q9',
      enunciado: 'Al completar la instalación, ¿qué prueba es obligatoria antes de autorizar el primer uso pedagógico del elevador?',
      opciones: [
        'Solo verificar visualmente que esté bien anclado',
        'Ciclo completo de subida y bajada sin carga, luego con carga nominal, verificando seguros mecánicos en ambas pruebas',
        'Levantar un vehículo directamente en la primera sesión con estudiantes presentes',
        'Encenderlo y apagarlo tres veces para asentar el sistema hidráulico'
      ],
      correcta: 1,
      explicacion: 'La prueba funcional debe ir de menos a más: primero sin carga para verificar el ciclo hidráulico y los seguros, luego con carga nominal para certificar que opera de forma segura. Sin esta prueba, no hay autorización de uso.'
    },
    {
      id: 'm1-s12-c2-q10',
      enunciado: 'El software de diagnóstico del taller requiere una suscripción anual para actualizar protocolos. Un docente propone no renovarla para ahorrar. ¿Cuál es el impacto pedagógico?',
      opciones: [
        'Ninguno — los códigos OBD básicos no cambian y cubren el 90% de los diagnósticos',
        'El escáner dejará de funcionar completamente sin suscripción activa',
        'Los vehículos de años recientes no serán reconocidos y los estudiantes no podrán practicar diagnóstico en equipos modernos',
        'Solo afecta la impresión de reportes, el diagnóstico en pantalla sigue funcionando'
      ],
      correcta: 2,
      explicacion: 'Sin actualización, el escáner trabaja con una base de datos antigua. Los vehículos de los últimos 2-3 años pueden no ser reconocidos o mostrar parámetros incompletos. En un taller pedagógico, esto limita directamente las competencias que se pueden desarrollar.'
    }
  ],

  // M1-S14 — Garantías y do's/don'ts (8 preguntas)
  'm1-s14-c2': [
    {
      id: 'm1-s14-c2-q1',
      enunciado: 'El escáner del taller falla a los 8 meses (garantía de 12). El técnico del taller ya lo abrió "para ver qué tiene". ¿Cuál es el problema?',
      opciones: [
        'Ninguno — el técnico tiene derecho a revisar el equipo del taller',
        'Abrir el equipo sin autorización del fabricante probablemente anuló la garantía. El paso correcto es reportar al proveedor sin intervenir',
        'El problema es que la garantía ya venció',
        'Debería haberlo abierto antes para hacer mantenimiento preventivo'
      ],
      correcta: 1,
      explicacion: 'Cualquier intervención no autorizada en el interior del equipo puede ser causal de anulación de garantía según el contrato. Ante cualquier falla en período de garantía: documentar y reportar al proveedor antes de tocar el equipo.'
    },
    {
      id: 'm1-s14-c2-q2',
      enunciado: '¿Por qué registrar el mantenimiento preventivo realizado es requisito para hacer valer la garantía?',
      opciones: [
        'Porque el MINEDU lo exige para auditorías anuales',
        'Porque demuestra que el equipo fue operado dentro de las condiciones del fabricante y no por mal uso',
        'Para calcular cuánto tiempo falta de garantía',
        'Para evitar que el técnico realice mantenimiento no autorizado'
      ],
      correcta: 1,
      explicacion: 'Sin registro, el fabricante puede argumentar que la falla se debe a mal uso o falta de mantenimiento, no a un defecto del equipo. El registro es la prueba de que se cumplieron las condiciones de la garantía.'
    },
    {
      id: 'm1-s14-c2-q3',
      enunciado: 'Un repuesto de la pistola de impacto neumática se desgastó. El docente compra un repuesto genérico de ferretería por ser más económico. ¿Qué riesgo asume?',
      opciones: [
        'Ninguno — los repuestos genéricos son iguales a los originales',
        'Anulación de la garantía del equipo por uso de repuestos no autorizados por el fabricante',
        'Solo pierde el descuento de cliente frecuente del proveedor',
        'El repuesto genérico podría no ajustar correctamente pero la garantía no se ve afectada'
      ],
      correcta: 1,
      explicacion: 'El uso de repuestos no originales o no aprobados es causal de anulación de garantía en la mayoría de contratos. Además, un repuesto de calidad inferior puede dañar otros componentes del equipo.'
    },
    {
      id: 'm1-s14-c2-q4',
      enunciado: 'El equipo falla claramente dentro del período de garantía. ¿Cuál es el orden correcto de acciones?',
      opciones: [
        'Intentar repararlo primero; si no se puede, llamar al proveedor',
        'Documentar la falla con fotos y descripción → reportar al proveedor/empresa prestadora → esperar respuesta antes de cualquier intervención',
        'Llamar a un técnico externo para tener un diagnóstico independiente primero',
        'Reportar a la UGEL directamente sin pasar por el proveedor'
      ],
      correcta: 1,
      explicacion: 'El protocolo correcto preserva los derechos de garantía: documentar, reportar al canal oficial y no intervenir. Actuar antes de reportar puede ser interpretado como aceptación de la falla y anular el derecho a garantía.'
    },
    {
      id: 'm1-s14-c2-q5',
      enunciado: 'La empresa prestadora del servicio no responde el reporte de falla después de 5 días hábiles. ¿Qué hace el docente?',
      opciones: [
        'Esperar indefinidamente — las empresas tienen sus propios tiempos',
        'Reparar el equipo por cuenta propia para no perder tiempo pedagógico',
        'Escalar el caso a la UGEL con copia del reporte inicial y el registro de los días transcurridos sin respuesta',
        'Comprar un equipo nuevo de emergencia con fondos del taller'
      ],
      correcta: 2,
      explicacion: 'Los contratos con proveedores MINEDU establecen tiempos máximos de respuesta. Si se incumplen, el canal de escalamiento es la UGEL, que tiene la relación contractual con el proveedor y puede exigir cumplimiento.'
    },
    {
      id: 'm1-s14-c2-q6',
      enunciado: '¿Cuál de estas acciones PRESERVA la garantía del elevador hidráulico?',
      opciones: [
        'Lubricar las guías con cualquier aceite disponible en el taller cuando se escucha ruido',
        'Realizar el mantenimiento preventivo según el calendario del fabricante y registrarlo en la bitácora',
        'Ajustar la presión hidráulica manualmente si el elevador sube muy lento',
        'Usar el elevador con vehículos que excedan ligeramente la capacidad nominal si es solo por un momento'
      ],
      correcta: 1,
      explicacion: 'El mantenimiento preventivo programado y registrado es la acción más importante para mantener la garantía vigente. Las otras opciones constituyen intervenciones no autorizadas o uso fuera de especificaciones.'
    },
    {
      id: 'm1-s14-c2-q7',
      enunciado: '¿Qué diferencia hay entre la garantía del fabricante y la garantía del proveedor/distribuidor MINEDU?',
      opciones: [
        'Son exactamente lo mismo — el proveedor solo revende lo que el fabricante garantiza',
        'La garantía del fabricante cubre defectos de fabricación; la del proveedor puede incluir servicio técnico, tiempos de respuesta y reposición — revisa el contrato específico',
        'La garantía MINEDU siempre es mayor que la del fabricante',
        'Solo aplica una de las dos — no pueden coexistir'
      ],
      correcta: 1,
      explicacion: 'Son garantías distintas que pueden complementarse. El fabricante cubre el equipo en sí; el proveedor puede añadir condiciones de servicio, tiempos de atención y procedimientos de reposición. El contrato específico con el proveedor MINEDU es el documento clave.'
    },
    {
      id: 'm1-s14-c2-q8',
      enunciado: '¿Por qué es importante conservar el manual técnico original y los accesorios en su empaque durante el período de garantía?',
      opciones: [
        'Para revenderlos si el equipo se da de baja antes de que venza la garantía',
        'Porque sin el manual y accesorios originales el técnico del proveedor puede negarse a atender la garantía o cobrar por materiales que deberían estar incluidos',
        'Es solo una buena práctica de orden, no tiene impacto real en la garantía',
        'Para poder verificar el precio original del equipo en caso de robo'
      ],
      correcta: 1,
      explicacion: 'El manual original acredita las condiciones de uso y el técnico del proveedor lo necesita para verificar si el equipo fue operado correctamente. Los accesorios originales evitan discusiones sobre si la falla se debe a uso de accesorios no autorizados.'
    }
  ],

  // M1-RA2 — Evaluación M1 global (20 preguntas — mín 80%)
  'm1-ra2-c1': [
    // Arquitectura y distribución del taller (4)
    {
      id: 'm1-ra2-c1-q1',
      enunciado: 'El flujo de trabajo pedagógico correcto en el taller automotriz es:',
      opciones: [
        'Innovación → Investigación → Almacén',
        'Almacén → Innovación → Investigación',
        'Investigación → Innovación → Almacén (cuando aplica)',
        'El orden no importa si el docente supervisa bien'
      ],
      correcta: 2,
      explicacion: 'Primero se investiga y diagnostica (Investigación), luego se interviene el vehículo (Innovación), y el Almacén provee herramientas y consumibles a ambas zonas. Este flujo simula el proceso real de un taller profesional.'
    },
    {
      id: 'm1-ra2-c1-q2',
      enunciado: '¿Por qué el taller automotriz debe tener circuitos eléctricos separados por zona?',
      opciones: [
        'Por estética — cada zona tiene su propio panel de colores',
        'Para aislar fallas eléctricas y manejar cargas diferenciadas sin afectar otras zonas',
        'Es un requisito burocrático sin impacto técnico real',
        'Solo si el taller tiene más de 3 equipos trifásicos'
      ],
      correcta: 1,
      explicacion: 'Un elevador trifásico (220V) y un escáner (110V) tienen demandas eléctricas muy distintas. Circuitos separados evitan que una falla o sobrecarga en una zona afecte el funcionamiento de otra, mejorando seguridad y disponibilidad.'
    },
    {
      id: 'm1-ra2-c1-q3',
      enunciado: 'El taller no tiene ventilación adecuada. ¿Cuál es el riesgo principal al encender un vehículo dentro?',
      opciones: [
        'El ruido del motor molestará a las aulas vecinas',
        'Intoxicación por monóxido de carbono — gas inodoro y mortal que se acumula en espacios cerrados',
        'El calor del motor puede dañar el escáner si está cerca',
        'La humedad del escape puede oxidar las herramientas del almacén'
      ],
      correcta: 1,
      explicacion: 'El monóxido de carbono (CO) es inodoro, incoloro y mortal en concentraciones bajas. En un taller cerrado sin extracción forzada, encender un motor puede ser fatal. La ventilación activa es condición de seguridad no negociable.'
    },
    {
      id: 'm1-ra2-c1-q4',
      enunciado: '¿Cuántas salidas de aire comprimido se recomienda como mínimo en la Zona de Innovación de un taller automotriz?',
      opciones: [
        'Una central — con manguera larga alcanza a todos los puntos',
        'Al menos una por cada puesto de trabajo activo para evitar mangueras cruzadas que generen riesgo de tropiezo',
        'No se necesitan salidas fijas — el compresor con manguera es suficiente',
        'Dos: una para neumáticos y otra para pistolas'
      ],
      correcta: 1,
      explicacion: 'Las mangueras largas cruzando el piso son riesgo de tropiezo y accidente. Una salida por puesto de trabajo es la configuración segura, aunque en la práctica se adapta al número real de equipos neumáticos del taller.'
    },
    // Metrado (4)
    {
      id: 'm1-ra2-c1-q5',
      enunciado: 'El osciloscopio automotriz del taller llegó sin código de bien MINEDU. ¿Qué hace el docente?',
      opciones: [
        'Instalarlo de inmediato y buscar el código después',
        'Asignarle un código interno y usarlo normalmente',
        'Separarlo, registrarlo como "bien sin identificar" y reportar a la UGEL antes de usarlo',
        'Devolverlo al proveedor — sin código no puede ingresar al taller'
      ],
      correcta: 2,
      explicacion: 'Un bien sin código oficial no puede incorporarse al inventario del taller ni usarse pedagógicamente. Debe regularizarse a través de la UGEL. Usarlo sin código pone en riesgo la garantía y el control patrimonial.'
    },
    {
      id: 'm1-ra2-c1-q6',
      enunciado: 'Un metrado incompleto (faltan equipos registrados) tiene como consecuencia principal:',
      opciones: [
        'Una observación menor en la auditoría anual',
        'Los equipos no registrados no existen oficialmente: sin garantía, sin soporte y sin posibilidad de reposición',
        'El taller pierde puntos en el ranking de talleres de la UGEL',
        'Solo afecta si hay una inspección sorpresa del MINEDU'
      ],
      correcta: 1,
      explicacion: 'El metrado es la existencia oficial del bien. Un equipo no registrado no puede reclamar garantía, no aparece en los sistemas de seguimiento del MINEDU y no puede reponerse formalmente si se daña o pierde.'
    },
    {
      id: 'm1-ra2-c1-q7',
      enunciado: 'En la ficha de metrado, el estado "Operativo con restricción" significa:',
      opciones: [
        'El equipo está dañado y no puede usarse',
        'El equipo funciona pero solo puede usarse con limitaciones específicas documentadas (ej: carga máxima reducida)',
        'El equipo está en garantía y no puede modificarse',
        'Solo puede usarlo el docente, no los estudiantes'
      ],
      correcta: 1,
      explicacion: '"Operativo con restricción" indica que el equipo funciona pero con condiciones de uso limitadas que deben estar documentadas. Sin documentar la restricción, el usuario no sabe qué puede y qué no puede hacer con él.'
    },
    {
      id: 'm1-ra2-c1-q8',
      enunciado: 'Un equipo se clasifica en una zona pedagógica según:',
      opciones: [
        'Su tamaño y peso — los pesados van en almacén',
        'Su precio — los más caros en zonas más seguras',
        'Su función pedagógica en el proceso de aprendizaje del taller',
        'La preferencia del docente titular'
      ],
      correcta: 2,
      explicacion: 'La zona refleja el rol del equipo en el proceso pedagógico: Investigación (diagnosticar), Innovación (intervenir/construir), Almacén (gestionar herramientas e insumos). El tamaño o precio no son criterios válidos.'
    },
    // Instalación (4)
    {
      id: 'm1-ra2-c1-q9',
      enunciado: '¿Cuál es el prerequisito obligatorio antes de instalar cualquier equipo en el taller?',
      opciones: [
        'Que el director haya firmado el acta de recepción',
        'Verificar que el espacio cumpla los requisitos del fabricante: eléctricos, estructurales, de ventilación y de acceso',
        'Tener a los estudiantes presentes para que aprendan el proceso de instalación',
        'Que el equipo haya sido activado en línea por el proveedor'
      ],
      correcta: 1,
      explicacion: 'Instalar sin verificar requisitos puede resultar en daño al equipo (voltaje incorrecto), accidentes (piso sin resistencia) o anulación de garantía (condiciones de instalación no cumplidas). La verificación previa es la base de una instalación segura.'
    },
    {
      id: 'm1-ra2-c1-q10',
      enunciado: 'El software de diagnóstico instalado en el equipo del taller tiene 2 años sin actualizar. ¿Cuál es el impacto pedagógico?',
      opciones: [
        'Ninguno — los vehículos que existen en el mercado peruano ya están en la base de datos',
        'Los vehículos de los últimos 2 años pueden no ser reconocidos, limitando las competencias que los estudiantes pueden desarrollar',
        'Solo afecta la velocidad de conexión con el vehículo',
        'El software desactualizado es más estable y confiable'
      ],
      correcta: 1,
      explicacion: 'Cada año se fabrican vehículos con nuevos protocolos y sistemas. Un software desactualizado deja a los estudiantes sin herramientas para trabajar con equipos modernos, que son exactamente los que encontrarán en el mercado laboral.'
    },
    {
      id: 'm1-ra2-c1-q11',
      enunciado: '¿Qué documento certifica que el elevador quedó correctamente instalado y listo para uso pedagógico?',
      opciones: [
        'La factura de compra del elevador',
        'El acta de instalación firmada por el técnico instalador y el docente responsable, con resultado de prueba funcional',
        'El manual del fabricante con fecha de llegada anotada',
        'Una fotografía del elevador instalado en el taller'
      ],
      correcta: 1,
      explicacion: 'El acta de instalación con prueba funcional aprobada es el documento que certifica que el equipo fue instalado correctamente, respalda la garantía y autoriza el primer uso pedagógico.'
    },
    {
      id: 'm1-ra2-c1-q12',
      enunciado: '¿Por qué activar la garantía del equipo en el momento de la instalación y no después?',
      opciones: [
        'Para empezar a contar el período de garantía desde el primer día de uso real',
        'Porque el proveedor puede negar la garantía si el equipo se activó tarde, argumentando daños durante el almacenamiento previo',
        'Es solo un trámite administrativo sin consecuencias reales',
        'Para que el MINEDU libere el siguiente desembolso al proveedor'
      ],
      correcta: 1,
      explicacion: 'Activar tardíamente la garantía puede dejar sin cobertura el período entre la recepción y la activación. Si el equipo sufrió algún daño en ese intervalo, el proveedor puede rechazar el reclamo argumentando que ocurrió antes de la activación.'
    },
    // Seguridad (4)
    {
      id: 'm1-ra2-c1-q13',
      enunciado: '¿Cuál es el EPP mínimo para ingresar a la Zona de Innovación del taller automotriz, incluso sin realizar trabajo directo?',
      opciones: [
        'Ninguno si solo se va a observar',
        'Lentes de seguridad, overol o ropa de trabajo y calzado cerrado como mínimo',
        'Solo calzado de seguridad',
        'El mismo EPP completo que para trabajo activo'
      ],
      correcta: 1,
      explicacion: 'En un espacio con equipos en operación, incluso los observadores están expuestos a proyecciones, derrames y riesgos de tropiezo. El EPP básico de ingreso protege ante lo imprevisible, no solo ante el trabajo propio.'
    },
    {
      id: 'm1-ra2-c1-q14',
      enunciado: 'El docente no revisa el estado de los extintores antes de iniciar una sesión práctica. ¿Qué riesgo asume?',
      opciones: [
        'Una observación administrativa en caso de inspección',
        'Responsabilidad legal y riesgo real de no poder controlar un conato de incendio durante la sesión',
        'Ninguno si los estudiantes ya conocen el protocolo de evacuación',
        'Solo un riesgo menor si la sesión no involucra trabajo con combustibles'
      ],
      correcta: 1,
      explicacion: 'Un extintor descargado o vencido es equivalente a no tener extintor. El docente tiene responsabilidad legal sobre la seguridad de la sesión. Verificar el extintor antes de cada sesión práctica es parte del checklist de apertura del taller.'
    },
    {
      id: 'm1-ra2-c1-q15',
      enunciado: 'Un estudiante va a conectar un cargador de batería sin verificar la ventilación del espacio. ¿Cuál es el riesgo específico?',
      opciones: [
        'La batería puede sobrecargarse y dañarse',
        'El cargador puede causar un cortocircuito si hay humedad',
        'La carga de una batería produce hidrógeno — gas inflamable que en espacios sin ventilación puede explotar ante una chispa',
        'No hay riesgo si el cargador es de marca reconocida'
      ],
      correcta: 2,
      explicacion: 'Durante la carga, las baterías de plomo-ácido liberan hidrógeno gaseoso. En un espacio cerrado, la concentración puede alcanzar niveles explosivos. La ventilación activa es obligatoria antes de iniciar la carga.'
    },
    {
      id: 'm1-ra2-c1-q16',
      enunciado: '¿Con qué frecuencia debe revisarse el protocolo de seguridad con los estudiantes del taller automotriz?',
      opciones: [
        'Una vez al año en la primera sesión del ciclo',
        'Al inicio de cada ciclo y cada vez que ingrese un estudiante nuevo al taller',
        'Solo cuando haya un accidente o incidente',
        'No es necesario si los estudiantes ya cursaron el módulo anterior'
      ],
      correcta: 1,
      explicacion: 'El protocolo se revisa al inicio de cada ciclo (porque el taller puede haber cambiado) y ante el ingreso de nuevos participantes (porque cada persona debe conocer las normas antes de su primera práctica). La seguridad no se presupone, se verifica.'
    },
    // Garantías (4)
    {
      id: 'm1-ra2-c1-q17',
      enunciado: 'Un equipo falla a los 10 meses con garantía de 12. El docente lo repara con un técnico externo por urgencia pedagógica. ¿Qué ocurre con la garantía?',
      opciones: [
        'La garantía sigue vigente — la urgencia justifica la intervención',
        'La garantía probablemente quedó anulada al intervenir el equipo sin autorización del proveedor',
        'La garantía se extiende por el tiempo que el equipo estuvo fuera de servicio',
        'Solo se anula si el técnico externo causó un daño adicional'
      ],
      correcta: 1,
      explicacion: 'La urgencia pedagógica no es causal de excepción en los contratos de garantía. Intervenir el equipo sin autorización del proveedor es la causal más común de anulación. La alternativa correcta era reportar la falla y gestionar un equipo sustituto mientras se esperaba la atención en garantía.'
    },
    {
      id: 'm1-ra2-c1-q18',
      enunciado: 'No existe registro del mantenimiento preventivo del compresor. Ahora el compresor falla. ¿Qué dificultad enfrenta el docente al reclamar la garantía?',
      opciones: [
        'Ninguna — si el equipo está en período de garantía, el proveedor debe atenderlo sin condiciones',
        'El proveedor puede argumentar que la falla se debe a falta de mantenimiento y rechazar el reclamo',
        'Debe pagar una multa administrativa por no haber registrado el mantenimiento',
        'La garantía se reduce proporcionalmente a los mantenimientos no registrados'
      ],
      correcta: 1,
      explicacion: 'Sin registro de mantenimiento, el docente no puede demostrar que cumplió con las condiciones de la garantía. El proveedor tiene base para rechazar el reclamo argumentando mal uso por omisión de mantenimiento preventivo.'
    },
    {
      id: 'm1-ra2-c1-q19',
      enunciado: 'La empresa prestadora no atiende la falla reportada en 7 días hábiles (el contrato establece 5 días máximo). ¿Cuál es el paso correcto?',
      opciones: [
        'Esperar — pueden tener una emergencia interna',
        'Escalar a la UGEL adjuntando el reporte inicial, fechas y el incumplimiento documentado del plazo contractual',
        'Reparar el equipo por cuenta propia y descontar el costo al proveedor',
        'Comprar un equipo nuevo y gestionar el reembolso después'
      ],
      correcta: 1,
      explicacion: 'El incumplimiento del plazo contractual debe documentarse y escalarse a la UGEL, que tiene la relación contractual formal con el proveedor. La documentación (reporte inicial + fechas) es la prueba del incumplimiento.'
    },
    {
      id: 'm1-ra2-c1-q20',
      enunciado: '¿Cuál de estas acciones forma parte de las buenas prácticas para mantener las garantías vigentes de todos los equipos del taller?',
      opciones: [
        'Revisar los contratos de garantía solo cuando hay una falla',
        'Llevar una bitácora unificada con fechas de garantía, contactos del proveedor, mantenimientos realizados y reportes de falla de todos los equipos',
        'Delegar el seguimiento de garantías al auxiliar del taller',
        'Guardar los contratos en un archivador y revisarlos anualmente'
      ],
      correcta: 1,
      explicacion: 'Una bitácora unificada y actualizada permite actuar a tiempo: saber cuándo vence cada garantía, quién atiende cada equipo y cuáles mantenimientos están pendientes. Es la herramienta de gestión que convierte el conocimiento en acción.'
    }
  ],

  // M1-S13 — Seguridad EPP (BLOQUEANTE — mín 80%)
  'm1-s13-c3': [
    {
      id: 'm1-s13-c3-q1',
      enunciado: 'Un estudiante va a trabajar bajo un vehículo levantado con elevador tipo tijera. ¿Cuál es el EPP mínimo OBLIGATORIO antes de entrar al espacio de trabajo?',
      opciones: [
        'Lentes de seguridad y guantes de trabajo',
        'Lentes, casco, overol y verificación de que el elevador esté bloqueado mecánicamente con los seguros de seguridad',
        'Overol y zapatos de seguridad — los lentes no son necesarios bajo el vehículo',
        'El docente supervisa — el estudiante decide su EPP'
      ],
      correcta: 1,
      explicacion: 'Trabajar bajo un vehículo elevado es el mayor riesgo del taller. EPP mínimo: lentes (caída de partículas desde arriba), casco, overol sin partes sueltas. CRÍTICO: verificar visualmente que todos los seguros mecánicos del elevador estén activados antes de entrar.'
    },
    {
      id: 'm1-s13-c3-q2',
      enunciado: '¿Por qué está PROHIBIDO usar guantes de tela al trabajar con equipos rotativos (taladro, esmeril angular)?',
      opciones: [
        'Porque los guantes de tela no son impermeables al aceite',
        'Porque el movimiento rotativo puede atrapar el tejido y jalar la mano hacia el elemento rotante, causando fractura o amputación',
        'Porque no tienen certificación ANSI para taller automotriz',
        'Porque se ensucian demasiado rápido con grasa'
      ],
      correcta: 1,
      explicacion: 'El tejido de un guante ordinario puede ser atrapado por el giro del equipo en milisegundos. Con equipos rotativos, usar guante de cuero corto o directamente mano desnuda con buena técnica. Nunca tela.'
    },
    {
      id: 'm1-s13-c3-q3',
      enunciado: 'Durante la sesión, el elevador hidráulico cede inesperadamente 5 cm con un estudiante trabajando cerca. ¿Cuál es la acción INMEDIATA correcta del docente?',
      opciones: [
        'Pedir al estudiante que sostenga el vehículo mientras llaman al técnico',
        'Bajar el vehículo rápidamente y continuar el trabajo',
        'Despejar el área inmediatamente, bajar el vehículo completamente a tierra, poner el elevador fuera de servicio y no usarlo hasta revisión técnica',
        'Colocar un gato de botella como soporte adicional y continuar'
      ],
      correcta: 2,
      explicacion: 'Un descenso inesperado del elevador indica falla del sistema. La prioridad es alejar a las personas del vehículo, bajarlo a tierra de forma controlada y retirar el equipo de servicio. Ninguna solución provisional es aceptable.'
    },
    {
      id: 'm1-s13-c3-q4',
      enunciado: 'Un estudiante empieza a desconectar la batería sin guantes diciendo "solo es el cable negativo, no hay riesgo". ¿Cuál es la respuesta correcta del docente?',
      opciones: [
        'Permitirlo — el cable negativo es tierra y no tiene corriente activa',
        'Detener la actividad inmediatamente, explicar el riesgo y no continuar hasta que el estudiante tenga los guantes puestos',
        'Supervisarlo de cerca para actuar si algo sale mal',
        'Pedirle que sea rápido para minimizar el tiempo de exposición'
      ],
      correcta: 1,
      explicacion: 'La batería puede generar corriente residual suficiente para quemaduras ante un cortocircuito accidental. El principio del taller automotriz: los protocolos de seguridad eléctrica no se relajan. El docente tiene responsabilidad legal y pedagógica de detener la actividad insegura.'
    },
    {
      id: 'm1-s13-c3-q5',
      enunciado: 'Un estudiante va a drenar el aceite del motor recién apagado. ¿Qué combinación de EPP es obligatoria?',
      opciones: [
        'Solo guantes de látex y gafas simples',
        'Guantes de nitrilo resistentes al calor, lentes tipo antiparra, overol o delantal resistente a hidrocarburos y calzado cerrado antideslizante',
        'Cualquier guante disponible — el aceite no quema lo suficiente como para ser peligroso',
        'Guantes de PVC y careta de soldador'
      ],
      correcta: 1,
      explicacion: 'El aceite de motor recién apagado puede superar los 80°C. Los guantes de látex no resisten calor ni hidrocarburos. Las lentes tipo antiparra (no montura abierta) protegen de salpicaduras. El calzado antideslizante evita caídas por derrames.'
    },
    {
      id: 'm1-s13-c3-q6',
      enunciado: 'Al revisar el extintor del taller antes de la sesión, el docente nota que el manómetro está en la zona roja. ¿Qué debe hacer?',
      opciones: [
        'Usarlo igual — el manómetro puede estar descalibrado',
        'Marcarlo con cinta y dejarlo como respaldo por si acaso',
        'Retirar el extintor del servicio, reportar a dirección y no iniciar la sesión hasta tener un extintor operativo disponible',
        'Agitarlo para ver si se normaliza la presión'
      ],
      correcta: 2,
      explicacion: 'Zona roja en el manómetro indica presión insuficiente — el extintor no funcionará en una emergencia. No es negociable: sin extintor operativo no hay sesión práctica en el taller automotriz.'
    },
    {
      id: 'm1-s13-c3-q7',
      enunciado: 'Los estudiantes van a trabajar cerca del sistema de combustible del vehículo. ¿Cuál es el riesgo principal y la medida preventiva más importante?',
      opciones: [
        'Riesgo de derrame — colocar trapos absorbentes debajo del vehículo',
        'Riesgo de incendio/explosión — zona libre de fuentes de ignición, no encender el motor, extintor CO2 a mano y ventilación activa',
        'Riesgo de intoxicación — abrir una ventana del taller',
        'Riesgo de corrosión — usar guantes de látex gruesos'
      ],
      correcta: 1,
      explicacion: 'Los vapores de gasolina son altamente inflamables y se acumulan a nivel del piso. Una chispa, encendedor o celular puede provocar explosión. Medidas: zona libre de ignición, extintor CO2 accesible (no polvo seco cerca del vehículo), ventilación forzada activa.'
    },
    {
      id: 'm1-s13-c3-q8',
      enunciado: 'Un estudiante dice: "Ya sé cómo hacer este procedimiento, no necesito ponerme el EPP para esta práctica". ¿Cuál es la respuesta pedagógica correcta del docente?',
      opciones: [
        'Permitirlo si el estudiante demuestra que conoce el procedimiento',
        'Pedirle que se lo ponga solo si el docente está mirando',
        'Explicar que el EPP no es opcional: protege de lo que NO se puede predecir, no solo de los errores. Quien no lo usa no inicia la práctica',
        'Negociarlo — si es un procedimiento simple, puede omitir algunos elementos del EPP'
      ],
      correcta: 2,
      explicacion: 'El EPP protege de fallas inesperadas del equipo, errores de otros, y condiciones imprevistas — no solo del propio descuido. "Saber el procedimiento" no elimina el riesgo mecánico. En el taller, el EPP es condición no negociable para participar en cualquier práctica.'
    }
  ],

  // M0-S06 — Miró, Mural, Figma: ideación colaborativa (6 preguntas)
  'm0-s06-c5': [
    {
      id: 'm0-s06-c5-q1',
      enunciado: 'Quieres que tus estudiantes de automotriz mapeen visualmente la secuencia de diagnóstico de un motor, trabajando en grupos desde sus tablets en tiempo real. ¿Qué herramienta usarías?',
      opciones: [
        'Miró — pizarra colaborativa infinita, ideal para diagramas de proceso en tiempo real',
        'Google Docs — permite edición simultánea y tiene plantillas de diagramas',
        'Gamma — genera presentaciones visuales rápidamente con IA',
        'Teachy — crea actividades pedagógicas estructuradas para el aula'
      ],
      correcta: 0,
      explicacion: 'Miró ofrece pizarra infinita con sticky notes, conectores y plantillas de mapas mentales. Es la opción más adecuada para mapeo de procesos colaborativo en tiempo real. Google Docs tiene edición simultánea pero no está diseñado para diagramas de flujo visual.'
    },
    {
      id: 'm0-s06-c5-q2',
      enunciado: 'Tu equipo de docentes necesita planificar juntos las 4 sesiones del módulo de instalación de equipos automotrices, distribuyendo responsabilidades y fechas. ¿Cuál herramienta facilita mejor esta coordinación visual?',
      opciones: [
        'Figma — permite diseñar wireframes de las sesiones con componentes reutilizables',
        'Mural — tablero colaborativo con sticky notes, votación y temporizador para talleres de planificación',
        'Miró — pizarra libre sin estructura de taller facilitada',
        'Polypad — especializado en visualizaciones matemáticas, no en planificación'
      ],
      correcta: 1,
      explicacion: 'Mural está diseñado específicamente para talleres de facilitación: incluye plantillas de planificación, votación anónima, temporizador y zonas estructuradas. Es la mejor opción cuando hay un facilitador guiando el proceso grupal.'
    },
    {
      id: 'm0-s06-c5-q3',
      enunciado: 'Quieres crear una guía visual del taller automotriz — plano de zonas, rutas de evacuación e identificación de equipos — que puedas entregar a estudiantes nuevos como material institucional. ¿Qué herramienta usarías?',
      opciones: [
        'Miró — porque tiene plantillas de planos y es fácil exportar como imagen',
        'Figma — diseño vectorial profesional con capas, componentes y exportación en múltiples formatos',
        'Mural — tablero colaborativo con mayor énfasis en facilitación que en diseño final',
        'Gamma — genera documentos con IA, pero no permite edición precisa de planos'
      ],
      correcta: 1,
      explicacion: 'Figma es software de diseño vectorial profesional. Para un material institucional (plano del taller, señalética) que necesita precisión, capas y exportación en alta calidad (PDF, PNG, SVG), Figma es la herramienta correcta. Miró y Mural son mejores para procesos colaborativos informales.'
    },
    {
      id: 'm0-s06-c5-q4',
      enunciado: 'Un colega diseñó en Figma el protocolo de seguridad del taller automotriz. Tú necesitas adaptarlo para tu institución cambiando logos y colores. ¿Qué implica trabajar en Figma para esta tarea?',
      opciones: [
        'No es posible — Figma solo permite ver diseños, no editarlos',
        'Necesitas acceso al archivo Figma; con permiso de edición puedes modificar textos, colores y componentes directamente',
        'Debes exportar a PDF y editar con Adobe Acrobat para cambiar contenido',
        'Figma convierte automáticamente el diseño a Word para que puedas editarlo'
      ],
      correcta: 1,
      explicacion: 'Figma es colaborativo: con el enlace y permiso de edición, puedes modificar cualquier elemento del diseño. Cambiar logos (reemplazar imagen), colores (paleta de estilos) y textos es directo en la interfaz. Es la ventaja clave sobre herramientas como PowerPoint o PDF.'
    },
    {
      id: 'm0-s06-c5-q5',
      enunciado: 'Estás facilitando una sesión de lluvia de ideas con 8 docentes para diseñar la zona de innovación del taller. La sesión dura 45 minutos. ¿Cuál característica de Mural es más valiosa en este contexto?',
      opciones: [
        'La capacidad de exportar el tablero a PowerPoint al terminar',
        'El temporizador integrado y la votación anónima para priorizar ideas sin sesgo de autoridad',
        'Los widgets de diseño profesional para crear entregables listos para imprimir',
        'La integración directa con Google Drive para guardar automáticamente'
      ],
      correcta: 1,
      explicacion: 'En sesiones de facilitación con jerarquía (hay jefes y docentes), el sesgo de autoridad puede inhibir ideas. El temporizador mantiene el ritmo, y la votación anónima permite que todos expresen preferencias sin presión social. Estas funciones son el diferenciador de Mural frente a una pizarra común.'
    },
    {
      id: 'm0-s06-c5-q6',
      enunciado: 'Comparando Miró y Mural para uso en el taller automotriz: ¿cuál es la distinción más relevante para decidir cuál usar?',
      opciones: [
        'Miró es de pago y Mural es gratuito, por lo que Mural siempre es mejor para instituciones educativas',
        'Miró es más flexible y libre (ideal para diagramas técnicos por docentes), Mural incluye más herramientas de facilitación estructurada (ideal para talleres con múltiples participantes)',
        'Son idénticos en funcionalidades; la elección depende solo de la preferencia personal',
        'Miró funciona solo en computadora; Mural funciona en tablets y móviles'
      ],
      correcta: 1,
      explicacion: 'Miró es excelente para trabajo individual o en equipo pequeño creando diagramas libres. Mural está más orientado a facilitación: tiene plantillas de Design Sprint, Retrospectiva, y herramientas de moderación. La decisión correcta depende de si hay un facilitador guiando o si el trabajo es más autónomo.'
    }
  ],

  // M0-RA1 — Evaluación M0 global (15 preguntas, puntajeMinimo: 70)
  'm0-ra1-c1': [
    {
      id: 'm0-ra1-c1-q1',
      enunciado: 'Necesitas registrar el estado de 12 equipos del taller automotriz con sus fechas de mantenimiento y compartirlo con todo el equipo docente. ¿Qué herramienta de Google Workspace usarías y por qué?',
      opciones: [
        'Google Docs — permite texto libre y tablas para cualquier registro',
        'Google Sheets — tabla estructurada, filtros, ordenamiento y edición simultánea ideal para inventarios',
        'Google Calendar — para registrar las fechas de mantenimiento directamente',
        'Google Tasks — para asignar a cada docente la revisión de un equipo'
      ],
      correcta: 1,
      explicacion: 'Google Sheets es la herramienta correcta para inventarios: columnas fijas, filtros por estado, fórmulas de conteo y edición simultánea. Docs es para texto narrativo; Calendar para eventos; Tasks para pendientes individuales — cada herramienta tiene su rol.'
    },
    {
      id: 'm0-ra1-c1-q2',
      enunciado: 'Quieres que la IA te ayude a redactar el protocolo de uso seguro del elevador tipo tijera. ¿Cuál es el prompt más efectivo?',
      opciones: [
        '"Escribe un protocolo de seguridad"',
        '"Redacta un protocolo de seguridad para elevador tipo tijera en taller automotriz escolar, incluyendo EPP obligatorio, pasos de verificación pre-uso y protocolo de emergencia por falla hidráulica. Extensión: 1 página A4."',
        '"Hazme un texto sobre elevadores"',
        '"¿Qué es un elevador tipo tijera?"'
      ],
      correcta: 1,
      explicacion: 'Un prompt efectivo tiene: contexto específico (elevador tipo tijera, taller escolar), tarea clara (protocolo de seguridad), estructura requerida (EPP, verificación, emergencia) y restricción de formato (1 página A4). Prompts vagos producen respuestas genéricas inutilizables.'
    },
    {
      id: 'm0-ra1-c1-q3',
      enunciado: 'Un docente usa Google Calendar para el taller. Crea el evento "Práctica motor" pero no agrega participantes ni sala. ¿Qué consecuencia real tiene este error?',
      opciones: [
        'El evento igual aparece en los calendarios de todos los docentes del taller',
        'Ninguna — Calendar es solo un recordatorio personal',
        'Los otros docentes no saben de la práctica y el espacio puede estar ocupado por otra sección ese día',
        'Calendar envía notificación automática a todos de todas formas'
      ],
      correcta: 2,
      explicacion: 'Sin invitados ni recurso de sala, el evento es invisible para los demás. Resultado: conflictos de horario, docentes sin aviso y estudiantes sin espacio. La coordinación efectiva del taller requiere invitar a colegas y reservar el espacio físico desde el mismo Calendar.'
    },
    {
      id: 'm0-ra1-c1-q4',
      enunciado: 'Quieres crear una presentación sobre el ciclo Otto para tus estudiantes de automotriz. Tienes 20 minutos. ¿Qué herramienta produce el resultado más rápido con calidad visual aceptable?',
      opciones: [
        'Google Slides — conocida y confiable, aunque requiere diseñar diapositiva por diapositiva',
        'Gamma — genera una presentación completa desde un prompt en menos de 2 minutos, con diseño automático',
        'Figma — diseño profesional pero requiere más tiempo de configuración',
        'Polypad — visualizaciones interactivas pero no genera presentaciones de diapositivas'
      ],
      correcta: 1,
      explicacion: 'Gamma genera presentaciones completas desde texto en segundos. Para 20 minutos, es la única opción que deja tiempo para revisar y ajustar. Google Slides es más control pero mucho más lento. Figma y Polypad no son herramientas de presentación de diapositivas.'
    },
    {
      id: 'm0-ra1-c1-q5',
      enunciado: 'Quieres que tus estudiantes practiquen identificar ángulos en los componentes de la dirección del vehículo. ¿Qué herramienta digital es más adecuada para esta actividad?',
      opciones: [
        'Gamma — genera una presentación visual de los componentes de dirección',
        'Polypad — permite construir visualizaciones geométricas interactivas con ángulos y medidas reales',
        'Miró — pizarra colaborativa donde los estudiantes pueden dibujar libremente',
        'Teachy — genera actividades de quiz sobre componentes de dirección'
      ],
      correcta: 1,
      explicacion: 'Polypad es una herramienta de matemáticas visuales: transportadores, geoplanos, geometría dinámica. Para trabajar ángulos de dirección (camber, caster, convergencia) con precisión visual e interactividad, Polypad es la opción correcta.'
    },
    {
      id: 'm0-ra1-c1-q6',
      enunciado: 'Tu equipo de 6 docentes necesita decidir colectivamente qué zona del taller remodelar primero. Tienes 30 minutos de reunión. ¿Qué herramienta y técnica usarías?',
      opciones: [
        'Google Sheets compartido — cada docente vota en su celda',
        'Mural con tablero de lluvia de ideas + votación anónima por puntos, facilitado con temporizador',
        'WhatsApp — encuesta rápida en el grupo del taller',
        'Figma — diseñar una propuesta visual de cada zona para votar'
      ],
      correcta: 1,
      explicacion: 'Mural combina generación de ideas (sticky notes), votación anónima (elimina sesgo de autoridad) y temporizador (respeta los 30 minutos). WhatsApp no es colaborativo ni anónimo. Google Sheets es técnicamente posible pero no tiene las herramientas de facilitación integradas.'
    },
    {
      id: 'm0-ra1-c1-q7',
      enunciado: 'Usas Claude (IA) para diseñar una rúbrica de evaluación de diagnóstico automotriz. El resultado tiene criterios muy genéricos. ¿Cuál es la causa más probable?',
      opciones: [
        'Claude no puede crear rúbricas de evaluación técnica',
        'El prompt no especificó el nivel educativo, la competencia específica ni los indicadores esperados del estudiante',
        'Las rúbricas de automotriz son demasiado técnicas para cualquier IA',
        'Hay que usar GPT en lugar de Claude para tareas pedagógicas'
      ],
      correcta: 1,
      explicacion: 'La calidad del output de IA es directamente proporcional a la especificidad del prompt. Una rúbrica genérica proviene de un prompt genérico. Para obtener criterios específicos de automotriz, el prompt debe incluir: nivel (secundaria técnica), competencia (diagnóstico de motor), indicadores observables y escala.'
    },
    {
      id: 'm0-ra1-c1-q8',
      enunciado: 'Tienes el manual de instalación del escáner LAUNCH en PDF (en inglés). ¿Cómo usarías IA para aprovechar este documento en tu planificación?',
      opciones: [
        'No es posible — la IA no puede procesar documentos técnicos en inglés',
        'Subir el PDF a Claude o ChatGPT y pedir: "Resume los pasos de instalación, tradúcelos al español y genera una lista de verificación imprimible"',
        'Traducir manualmente el PDF y luego pedirle a la IA que lo resuma',
        'Usar Google Translate en el PDF y guardar el resultado como está'
      ],
      correcta: 1,
      explicacion: 'Las IAs modernas (Claude, GPT-4) pueden procesar PDFs directamente. Un solo prompt puede: traducir, resumir y reformatear en lista de verificación. Hacerlo manualmente en pasos separados es ineficiente. Esta capacidad es uno de los usos más valiosos de IA para docentes técnicos.'
    },
    {
      id: 'm0-ra1-c1-q9',
      enunciado: 'Quieres visualizar en 3D el sistema de frenos ABS para mostrarlo en clase. ¿Cuál es la ruta más directa?',
      opciones: [
        'Buscar en YouTube un video del sistema ABS y proyectarlo',
        'Usar Meshy con el prompt "sistema de frenos ABS automotriz, vista explodida, componentes etiquetados" para generar un modelo 3D',
        'Dibujar el sistema en Figma con formas vectoriales',
        'Pedirle a Gamma que genere una presentación con imágenes del ABS'
      ],
      correcta: 1,
      explicacion: 'Meshy es una herramienta de generación de modelos 3D por texto (text-to-3D). Permite rotar, explorar y exportar. Para visualización técnica de sistemas mecánicos en clase, un modelo 3D interactivo es más didáctico que un video o imagen estática.'
    },
    {
      id: 'm0-ra1-c1-q10',
      enunciado: 'Google Tasks y Google Calendar: ¿cuándo usas cada uno en la gestión del taller automotriz?',
      opciones: [
        'Son la misma herramienta — Tasks es la versión móvil de Calendar',
        'Tasks para pendientes personales y listas de verificación (ej: "completar metrado"); Calendar para eventos con hora, lugar y participantes (ej: "Práctica elevador — Sección B — Sala 3")',
        'Calendar es solo para reuniones; Tasks para todo lo demás',
        'Tasks para el equipo docente; Calendar solo para uso personal'
      ],
      correcta: 1,
      explicacion: 'Tasks y Calendar tienen funciones complementarias distintas: Tasks es lista de pendientes sin fecha/hora fija, ideal para to-do lists personales. Calendar es para compromisos con tiempo definido, espacio y participantes. Usar ambos correctamente evita que los pendientes se mezclen con los eventos programados.'
    },
    {
      id: 'm0-ra1-c1-q11',
      enunciado: 'Un colega diseñó en Miró el mapa de procesos del taller. Tú necesitas convertirlo en un documento institucional para entregar a la UGEL. ¿Cuál es el flujo correcto?',
      opciones: [
        'Exportar el tablero Miró como imagen PNG e insertarlo en Google Docs con texto explicativo',
        'Recrear todo el mapa en Figma desde cero para mayor calidad',
        'Enviar el enlace de Miró directamente a la UGEL',
        'Imprimir una captura de pantalla del tablero'
      ],
      correcta: 0,
      explicacion: 'El flujo correcto es: Miró para ideación/mapeo → exportar como imagen de alta resolución → insertar en Google Docs → agregar contexto textual → entregar como documento formal. Cada herramienta tiene su etapa: Miró para pensar, Docs para documentar.'
    },
    {
      id: 'm0-ra1-c1-q12',
      enunciado: 'Teachy generó una actividad de "identificar herramientas del taller" para tus estudiantes. Al revisarla, ves que incluye herramientas de carpintería. ¿Cuál es la causa y solución?',
      opciones: [
        'Teachy no puede crear actividades específicas de automotriz — hay que hacerlo manualmente',
        'El prompt no especificó el contexto automotriz. Solución: regenerar indicando "taller de mecánica automotriz, herramientas de diagnóstico y reparación de vehículos"',
        'Hay un error en Teachy que mezcla talleres — reportar al soporte',
        'Aceptar la actividad y corregir manualmente cada herramienta incorrecta'
      ],
      correcta: 1,
      explicacion: 'Las IAs generativas no asumen contexto que no se les da. "Taller" sin calificativo genera contenido de cualquier taller. La solución siempre es mejorar el prompt, no corregir el output manualmente — eso es ineficiente. Buen prompt = buen output desde el inicio.'
    },
    {
      id: 'm0-ra1-c1-q13',
      enunciado: '¿Cuál es la diferencia clave entre usar GPT-4, Claude y Gemini para preparar materiales del taller automotriz?',
      opciones: [
        'Son idénticos — producen exactamente el mismo resultado con el mismo prompt',
        'GPT-4 tiene mejor razonamiento técnico; Claude es mejor para documentos largos y análisis; Gemini se integra nativamente con Google Workspace',
        'Solo GPT-4 puede trabajar con contenido técnico automotriz',
        'Claude no puede procesar imágenes; los otros dos sí'
      ],
      correcta: 1,
      explicacion: 'Cada modelo tiene fortalezas: GPT-4 destacó históricamente en razonamiento técnico y código; Claude en análisis de documentos largos y redacción matizada; Gemini en integración con Google Workspace (Docs, Sheets, Drive). Para un docente, conocer esto permite elegir la herramienta correcta según la tarea.'
    },
    {
      id: 'm0-ra1-c1-q14',
      enunciado: 'Quieres crear un diagrama del flujo de trabajo del taller (recepción del vehículo → diagnóstico → reparación → entrega) para mostrar en la sesión de inducción. ¿Qué herramienta usarías?',
      opciones: [
        'Google Sheets — con celdas formateadas como cajas del proceso',
        'Miró — pizarra con conectores de flechas y sticky notes para el flujo de proceso',
        'Teachy — genera diagramas de flujo automáticamente desde texto',
        'Google Calendar — para visualizar el tiempo de cada etapa'
      ],
      correcta: 1,
      explicacion: 'Miró tiene herramientas nativas para diagramas de flujo: figuras geométricas, conectores con flechas, etiquetas y colores por zona. Para un docente que necesita un diagrama visual rápido y editable, Miró es la opción más directa. Teachy no genera diagramas de flujo.'
    },
    {
      id: 'm0-ra1-c1-q15',
      enunciado: 'Tienes 3 semanas para dominar las herramientas digitales del módulo 0. ¿Cuál es la estrategia de aprendizaje más efectiva?',
      opciones: [
        'Ver todos los tutoriales de YouTube disponibles antes de usar cualquier herramienta',
        'Usar cada herramienta en una tarea real del taller: crear el metrado en Sheets, el protocolo en Docs, planificar la instalación en Calendar — aprender haciendo con propósito real',
        'Practicar primero con ejemplos genéricos hasta dominarlos, luego aplicar al taller',
        'Elegir solo 1 herramienta por semana y dominarla completamente antes de seguir'
      ],
      correcta: 1,
      explicacion: 'El aprendizaje más efectivo para docentes adultos es el aprendizaje situado: usar la herramienta para una tarea real e inmediata del taller. El propósito real genera motivación intrínseca y retención duradera. Los tutoriales sin aplicación inmediata se olvidan en días.'
    }
  ],

}
