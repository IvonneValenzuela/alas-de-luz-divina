export interface FaqItem {
  id: string
  order: number
  question: string
  answer: string[] // paragraphs, rendered in order
  link?: {
    text: string
    url: string
  }
}

export const faqItems: FaqItem[] = [
  {
    id: 'que-es-angeloterapia',
    order: 1,
    question: '¿Qué es una angeloterapia?',
    answer: [
      'La angeloterapia es un espacio de acompañamiento espiritual y energético que busca brindar orientación, claridad y conexión durante diferentes momentos de la vida.',
      'A través de la sesión, se utilizan herramientas que pueden ayudarte a mirar hacia dentro, escuchar tu intuición y explorar aquello que estás viviendo desde una nueva perspectiva.',
    ],
  },
  {
    id: 'quienes-pueden-realizar',
    order: 2,
    question: '¿Quiénes pueden realizar las terapias?',
    answer: [
      'Las terapias están dirigidas a personas que sienten el deseo de conectar consigo mismas, explorar su mundo interior y contar con un espacio de acompañamiento en sus procesos personales.',
      'Cada proceso es diferente, por lo que si tienes dudas sobre si alguna de las terapias es adecuada para ti, puedes escribirme antes de agendar.',
    ],
  },
  {
    id: 'experiencia-previa',
    order: 3,
    question:
      '¿Necesito tener experiencia previa o creer en la angeloterapia para realizar una sesión?',
    answer: [
      'No necesitas tener experiencia previa para acercarte a este espacio. Si es tu primera vez y tienes curiosidad por conocer cómo funciona una sesión, puedes escribirme y con gusto te explicaré el proceso antes de agendar.',
    ],
  },
  {
    id: 'que-esperar-durante-sesion',
    order: 4,
    question: '¿Qué puedo esperar durante una sesión?',
    answer: [
      'Cada sesión es diferente y se adapta a la terapia que hayas elegido y al momento que estés viviendo.',
      'La sesión comienza creando un espacio de escucha y acompañamiento, en el que podrás compartir aquello que deseas explorar. A lo largo del encuentro utilizaremos las herramientas correspondientes a la terapia y tendremos un espacio para integrar lo vivido y cerrar la sesión.',
    ],
  },
  {
    id: 'preparacion-antes-sesion',
    order: 5,
    question: '¿Qué preparación debo tener antes de mi sesión?',
    answer: [
      'No necesitas hacer una preparación complicada. Lo más importante es disponer de un espacio tranquilo en el que puedas estar presente y sin interrupciones durante la sesión, te recomiendo también estar tu espacio 10 minutos antes de la sesión.',
      'Si la terapia que elegiste requiere alguna preparación específica, te la indicare previamente.',
    ],
  },
  {
    id: 'sustituye-tratamiento',
    order: 6,
    question: '¿Las terapias sustituyen un tratamiento médico o psicológico?',
    answer: [
      'No. Las terapias de Alas de Luz Divina son un espacio de acompañamiento energético y conexión, y no sustituyen tratamientos médicos, psicológicos o psiquiátricos cuando estos sean necesarios.',
      'Actualmente no puedo atender personas que se encuentren en tratamiento psiquiátrico.',
      'Si tienes alguna duda sobre si este espacio es adecuado para ti, puedes escribirme antes de agendar tu sesión.',
    ],
  },
  {
    id: 'presenciales-o-virtuales',
    order: 7,
    question: '¿Las sesiones son presenciales o virtuales?',
    answer: [
      'Las sesiones son 100% virtuales, por lo que puedes realizar tu proceso desde el lugar en el que te encuentres.',
      'También realizó talleres y actividades presenciales ocasionalmente. Si quieres enterarte de los próximos encuentros y actividades, puedes formar parte de mi comunidad.',
    ],
    link: {
      text: 'Unirme a la comunidad 🤍',
      url: 'TODO: replace with the real WhatsApp community group link',
    },
  },
  {
    id: 'duracion-sesion',
    order: 8,
    question: '¿Cuánto dura una sesión?',
    answer: [
      'La duración depende de la terapia que elijas. Puedes consultar el tiempo específico de cada sesión en la descripción de cada terapia.',
    ],
  },
  {
    id: 'no-puedo-asistir',
    order: 9,
    question: '¿Qué pasa si agendé una sesión y no puedo asistir?',
    answer: [
      'Si no puedes asistir a una sesión que ya has agendado, escríbeme lo antes posible para revisar las opciones disponibles.',
      'Las condiciones de cancelación o reprogramación dependen de la política de cada sesión.',
    ],
  },
  {
    id: 'politica-cancelacion',
    order: 10,
    question: '¿Cuál es la política de cancelación?',
    answer: [
      'La política de cancelación y reprogramación será comunicada al momento de agendar tu sesión.',
      'Si necesitas cancelar o cambiar tu cita, por favor comunícate conmigo con la mayor anticipación posible.',
    ],
  },
  {
    id: 'formas-de-pago',
    order: 11,
    question: '¿Cuáles son las formas de pago?',
    answer: [
      'Puedes realizar el pago directamente a través de cuenta bancaria, Nequi o Daviplata.',
      'Una vez que hayas elegido tu terapia, te compartiré los datos necesarios para realizar el pago.',
    ],
  },
  {
    id: 'despues-de-terapia',
    order: 12,
    question: '¿Qué puedo esperar después de tomar una terapia?',
    answer: [
      'Después de la sesión tendrás un espacio para integrar lo vivido y reflexionar sobre aquello que haya surgido durante el encuentro.',
      'Dependiendo de la terapia, puedo compartirte algunas recomendaciones o herramientas para continuar acompañando tu proceso después de nuestra sesión.',
    ],
  },
]
