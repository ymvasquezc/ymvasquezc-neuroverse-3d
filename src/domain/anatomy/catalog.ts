import type { AnatomicalStructure, AnatomyCatalog } from './types';

/**
 * Catálogo de estructuras de la Fase 1.
 *
 * AVISO DE INTEGRIDAD CIENTÍFICA
 * ------------------------------
 * Las geometrías asociadas en esta fase son MARCADORES DE POSICIÓN
 * (`isPlaceholderGeometry: true`). Su posición, forma y tamaño son aproximaciones
 * esquemáticas pensadas para probar la infraestructura de selección y el panel
 * informativo; NO son reconstrucciones anatómicas verificadas. Los textos
 * descriptivos son correctos a nivel educativo general, pero la representación
 * espacial se sustituirá por modelos segmentados y citados en fases posteriores.
 */
const STRUCTURES: readonly AnatomicalStructure[] = [
  {
    id: 'frontal-lobe',
    name: 'Lóbulo frontal',
    latinName: 'Lobus frontalis',
    system: 'cerebrum',
    description:
      'Región anterior de la corteza cerebral. Participa en funciones ejecutivas, ' +
      'planificación, control motor voluntario y aspectos del lenguaje y la personalidad.',
    functions: ['Funciones ejecutivas', 'Planificación', 'Control motor', 'Lenguaje (Broca)'],
    highlightColor: '#4fd1ff',
    meshNames: ['frontal-lobe'],
    isPlaceholderGeometry: true,
  },
  {
    id: 'parietal-lobe',
    name: 'Lóbulo parietal',
    latinName: 'Lobus parietalis',
    system: 'cerebrum',
    description:
      'Procesa información somatosensorial, integración espacial y coordinación ' +
      'sensoriomotora.',
    functions: ['Somatosensorial', 'Orientación espacial', 'Integración sensorial'],
    highlightColor: '#64ffda',
    meshNames: ['parietal-lobe'],
    isPlaceholderGeometry: true,
  },
  {
    id: 'temporal-lobe',
    name: 'Lóbulo temporal',
    latinName: 'Lobus temporalis',
    system: 'cerebrum',
    description:
      'Relacionado con la audición, el procesamiento del lenguaje (Wernicke) y la ' +
      'memoria a través de estructuras limbicas vecinas.',
    functions: ['Audición', 'Comprensión del lenguaje', 'Memoria'],
    highlightColor: '#b388ff',
    meshNames: ['temporal-lobe'],
    isPlaceholderGeometry: true,
  },
  {
    id: 'occipital-lobe',
    name: 'Lóbulo occipital',
    latinName: 'Lobus occipitalis',
    system: 'cerebrum',
    description:
      'Alberga la corteza visual primaria; procesa e interpreta la información visual.',
    functions: ['Procesamiento visual', 'Reconocimiento de formas y color'],
    highlightColor: '#ffd54f',
    meshNames: ['occipital-lobe'],
    isPlaceholderGeometry: true,
  },
  {
    id: 'cerebellum',
    name: 'Cerebelo',
    latinName: 'Cerebellum',
    system: 'cerebellum',
    description:
      'Coordina el movimiento, el equilibrio y el tono muscular; interviene en el ' +
      'aprendizaje motor.',
    functions: ['Coordinación motora', 'Equilibrio', 'Aprendizaje motor'],
    highlightColor: '#ff8a65',
    meshNames: ['cerebellum'],
    isPlaceholderGeometry: true,
  },
  {
    id: 'brainstem',
    name: 'Tronco encefálico',
    latinName: 'Truncus encephali',
    system: 'brainstem',
    description:
      'Conecta el cerebro con la médula espinal. Regula funciones vitales autónomas ' +
      'como la respiración, el ritmo cardíaco y el nivel de alerta.',
    functions: ['Respiración', 'Ritmo cardíaco', 'Reflejos', 'Alerta'],
    highlightColor: '#f06292',
    meshNames: ['brainstem'],
    isPlaceholderGeometry: true,
  },
];

/** Construye el catálogo indexado una sola vez. */
export const ANATOMY_CATALOG: AnatomyCatalog = new Map(
  STRUCTURES.map((s) => [s.id, s]),
);

/** Lista inmutable de estructuras en orden de declaración. */
export const ANATOMY_LIST: readonly AnatomicalStructure[] = STRUCTURES;

/** Devuelve el metadato de una estructura por id, o `undefined`. */
export function getStructure(id: string | null): AnatomicalStructure | undefined {
  return id ? ANATOMY_CATALOG.get(id) : undefined;
}
