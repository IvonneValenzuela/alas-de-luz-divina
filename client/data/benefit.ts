import type { Benefit } from './types'

export const benefits: Benefit[] = [
  {
    id: 'claridad',
    order: 1,
    title: 'Claridad',
    subtitle: 'Cuando necesitas comprender mejor aquello que estás viviendo.',
    body: [
      'A veces atravesamos situaciones en las que tenemos muchas preguntas y no sabemos hacia dónde mirar. Este espacio te invita a hacer una pausa, poner en palabras aquello que te inquieta y explorar nuevas perspectivas sobre tu situación.',
      'A través de diferentes herramientas, puedes recibir orientación y encontrar mayor claridad frente a decisiones, momentos importantes o situaciones que deseas comprender mejor.',
    ],
    quote: {
      text: 'Nuestro miedo más profundo no es que seamos inadecuados. Nuestro miedo más profundo es que somos poderosos sin límite. Es nuestra luz, no nuestra oscuridad lo que más nos asusta.',
      author: 'Marianne Williamson',
    },
    image: '/claridadbg.png',
  },
  {
    id: 'acompanamiento',
    order: 2,
    title: 'Acompañamiento',
    subtitle: 'No tienes que atravesar cada proceso a solas.',
    body: [
      'Este es un espacio para sentirte escuchado, comprendido y sostenido con amor mientras atraviesas esos momentos de la vida que muchas veces nos invitan a mirar hacia dentro.',
      'La intención es ofrecerte un lugar seguro, cercano y libre de juicios donde puedas reconocer lo que estás viviendo y permitirte avanzar a tu propio ritmo. Esto está muy alineado con la manera en que Paula describe su propio acompañamiento.',
    ],
    quote: {
      text: 'Lo que resistes persiste, lo que aceptas te transforma.',
      author: 'Carl Gustav Jung',
    },
    image: '/acompanamientobg.png',
  },
  {
    id: 'conexion',
    order: 3,
    title: 'Conexión',
    subtitle: 'Un espacio para volver a escucharte.',
    body: [
      'A veces necesitamos hacer una pausa para volver nuestra atención hacia dentro. Este espacio te invita a reconectar contigo, con tu intuición y con tu esencia.',
      'A través de las diferentes terapias puedes explorar tu mundo interior, reconocer aquello que estás sintiendo y abrirte a una conexión más consciente contigo misma y con tu energía.',
    ],
    quote: {
      text: 'La vida no es un problema que tiene que ser resuelto, sino una realidad que debe ser experimentada.',
      author: 'Søren Kierkegaard',
    },
    image: '/conexionbg.png',
  },
  {
    id: 'transformacion',
    order: 4,
    title: 'Transformación',
    subtitle:
      'Comprender tu historia también puede abrir nuevas posibilidades.',
    body: [
      'Algunas terapias invitan a explorar patrones, emociones, experiencias y dinámicas que pueden estar presentes en diferentes áreas de nuestra vida.',
      'Desde una mirada de autoconocimiento y reflexión, este espacio busca ayudarte a comprender aquello que hoy deseas transformar y abrirte a nuevas formas de relacionarte contigo, con tu historia y con tu presente.',
    ],
    quote: {
      text: 'Quien mira hacia afuera, sueña; quien mira hacia adentro, despierta.',
      author: 'Carl Gustav Jung',
    },
    image: '/transformacionbg.png',
  },
]
