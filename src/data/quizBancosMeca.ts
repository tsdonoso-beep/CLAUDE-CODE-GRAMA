import type { PreguntaQuiz } from './modulosLXP'

export const quizBancosMeca: Record<string, PreguntaQuiz[]> = {

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

}
