import type { PreguntaQuiz } from './modulosLXP'

export const quizBancosMeca: Record<string, PreguntaQuiz[]> = {

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
