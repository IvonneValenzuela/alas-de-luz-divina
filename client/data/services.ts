import { Service } from './types'

export const services: Service[] = [
  {
    id: '1',
    title: 'Consulta Angelical Express',
    description:
      'Te acompaño para que podamos revisar tu situación puntual, recibir claridad y guía angelical para tu momento actual.',
    modality: '100% Virtual, vía WhatsApp por audios',
    price: 35000,
  },
  {
    id: '2',
    title: 'Oráculos y Canalización Angelical',
    description:
      'Espacio sagrado donde los oráculos y tus guías te entregan mensajes claros para tu evolución y bienestar.',
    duration: '50 minutos',
    modality: '100% Virtual',
    price: 111000,
  },
  {
    id: '3',
    title: 'Equilibrio de Chakras (Péndulo)',
    description:
      'Radiestesia en tiempo real para armonizar tus centros energéticos a través de tu fotografía (aplica también para una mascota individual: perro o gato).',
    duration: '50 minutos',
    modality: '100% en vivo',
    checklist: [
      'Conexión mediante Imagen Sagrada',
      'Testeo y Lectura con Péndulo',
      'Entrega y Devolución en Vivo',
    ],
    price: 120000,
  },
  {
    id: '4',
    title: 'Biodescodificación',
    description:
      'Identificamos el conflicto biológico e inconsciente que sustenta tu síntoma físico para liberar tu salud desde la raíz emocional.',
    duration: '1 hora',
    modality: '100% Virtual',
    price: 90000,
  },
]
