import type {
  AnatomicalCategory,
  AnatomicalStructure,
  AnatomyCatalog,
  CategoryInfo,
} from './types';
import type { BrainManifest } from './manifest';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from './manifest';
import { CURATED_DESCRIPTIONS } from './descriptions';
import { translateLabel, translateCategory } from './translations';

/* ------------------------------------------------------------------ *
 * Catálogo placeholder (respaldo de Fase 1)
 * ------------------------------------------------------------------ */

/**
 * AVISO DE INTEGRIDAD CIENTÍFICA
 * ------------------------------
 * Este catálogo describe el cerebro ESQUEMÁTICO de respaldo. Se usa solo cuando
 * el modelo real (`public/models/brain.glb`) no está disponible. Sus geometrías
 * son marcadores de posición (`isPlaceholderGeometry: true`).
 */
const PLACEHOLDER_STRUCTURES: readonly AnatomicalStructure[] = [
  {
    id: 'frontal-lobe',
    name: 'Lóbulo frontal',
    category: 'cortex',
    side: 'median',
    description:
      'Región anterior de la corteza cerebral. Participa en funciones ejecutivas, ' +
      'planificación, control motor voluntario y lenguaje.',
    functions: ['Funciones ejecutivas', 'Planificación', 'Control motor', 'Lenguaje (Broca)'],
    highlightColor: CATEGORY_COLORS.cortex,
    meshNames: ['frontal-lobe'],
    isPlaceholderGeometry: true,
  },
  {
    id: 'parietal-lobe',
    name: 'Lóbulo parietal',
    category: 'cortex',
    side: 'median',
    description: 'Procesa información somatosensorial e integración espacial.',
    functions: ['Somatosensorial', 'Orientación espacial'],
    highlightColor: CATEGORY_COLORS.cortex,
    meshNames: ['parietal-lobe'],
    isPlaceholderGeometry: true,
  },
  {
    id: 'temporal-lobe',
    name: 'Lóbulo temporal',
    category: 'cortex',
    side: 'median',
    description: 'Relacionado con la audición, el lenguaje (Wernicke) y la memoria.',
    functions: ['Audición', 'Comprensión del lenguaje', 'Memoria'],
    highlightColor: CATEGORY_COLORS.cortex,
    meshNames: ['temporal-lobe'],
    isPlaceholderGeometry: true,
  },
  {
    id: 'occipital-lobe',
    name: 'Lóbulo occipital',
    category: 'cortex',
    side: 'median',
    description: 'Alberga la corteza visual primaria; procesa la información visual.',
    functions: ['Procesamiento visual'],
    highlightColor: CATEGORY_COLORS.cortex,
    meshNames: ['occipital-lobe'],
    isPlaceholderGeometry: true,
  },
  {
    id: 'cerebellum',
    name: 'Cerebelo',
    category: 'cerebellum',
    side: 'median',
    description: 'Coordina el movimiento, el equilibrio y el tono muscular.',
    functions: ['Coordinación motora', 'Equilibrio'],
    highlightColor: CATEGORY_COLORS.cerebellum,
    meshNames: ['cerebellum'],
    isPlaceholderGeometry: true,
  },
  {
    id: 'brainstem',
    name: 'Tronco encefálico',
    category: 'brainstem',
    side: 'median',
    description:
      'Conecta el cerebro con la médula espinal. Regula funciones vitales como la ' +
      'respiración y el ritmo cardíaco.',
    functions: ['Respiración', 'Ritmo cardíaco', 'Alerta'],
    highlightColor: CATEGORY_COLORS.brainstem,
    meshNames: ['brainstem'],
    isPlaceholderGeometry: true,
  },
];

export const PLACEHOLDER_CATALOG: AnatomyCatalog = new Map(
  PLACEHOLDER_STRUCTURES.map((s) => [s.id, s]),
);
export const PLACEHOLDER_LIST: readonly AnatomicalStructure[] = PLACEHOLDER_STRUCTURES;

/* ------------------------------------------------------------------ *
 * Catálogo real (generado desde el manifest del modelo GLB)
 * ------------------------------------------------------------------ */

/** Sufijo de lateralidad legible. */
function sideSuffix(side: AnatomicalStructure['side']): string {
  if (side === 'left') return ' (izq.)';
  if (side === 'right') return ' (der.)';
  return '';
}

/**
 * Construye el catálogo de dominio a partir del manifest del modelo real.
 * Cada estructura es `isPlaceholderGeometry: false` porque deriva de datos reales
 * (Z-Anatomy / BodyParts3D). Las descripciones curadas se aplican por `label`.
 */
export function buildCatalogFromManifest(manifest: BrainManifest): {
  catalog: AnatomyCatalog;
  list: readonly AnatomicalStructure[];
  categories: readonly CategoryInfo[];
} {
  const list: AnatomicalStructure[] = manifest.nodes.map((node) => {
    const color = CATEGORY_COLORS[node.category] ?? DEFAULT_CATEGORY_COLOR;
    // Las descripciones curadas se indexan por la etiqueta inglesa del manifest.
    const curated = CURATED_DESCRIPTIONS[node.label];
    const nameEs = translateLabel(node.label);
    return {
      id: node.name, // el nombre del nodo es único y estable
      name: nameEs + sideSuffix(node.side),
      category: node.category,
      side: node.side,
      description: curated?.description ?? '',
      functions: curated?.functions ?? [],
      highlightColor: color,
      meshNames: [node.name],
      // Traduce cada término de la ruta TA2 cuando hay equivalente conocido.
      ta2Path: node.ta2.map((t) => translateLabel(t)),
      source: node.source ?? 'Z-Anatomy / BodyParts3D',
      isPlaceholderGeometry: false,
    };
  });

  const catalog: AnatomyCatalog = new Map(list.map((s) => [s.id, s]));

  const categories: CategoryInfo[] = Object.entries(manifest.categories).map(
    ([key, info]) => ({
      key: key as AnatomicalCategory,
      label: translateCategory(key, info.label),
      count: info.count,
      color: CATEGORY_COLORS[key as AnatomicalCategory] ?? DEFAULT_CATEGORY_COLOR,
    }),
  );

  return { catalog, list, categories };
}
