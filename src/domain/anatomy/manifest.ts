import type { AnatomicalCategory, AnatomicalSide } from './types';

/**
 * Forma del `manifest.json` que acompaña al modelo real (Z-Anatomy/BodyParts3D).
 * Describe cada nodo del GLB y las categorías disponibles.
 */
export interface ManifestNode {
  readonly id: number;
  /** Nombre EXACTO del nodo en el GLB (clave de selección). */
  readonly name: string;
  /** Etiqueta legible sin sufijo de lateralidad. */
  readonly label: string;
  readonly category: AnatomicalCategory;
  readonly side: AnatomicalSide;
  readonly region: string;
  /** Marca las estructuras "principales" del encéfalo. */
  readonly core: boolean;
  /** Ruta jerárquica TA2. */
  readonly ta2: readonly string[];
  readonly source?: string;
}

export interface ManifestCategory {
  readonly label: string;
  readonly count: number;
}

export interface BrainManifest {
  readonly nodes: readonly ManifestNode[];
  readonly categories: Readonly<Record<string, ManifestCategory>>;
}

/** Paleta de resaltado por categoría (estética científica). */
export const CATEGORY_COLORS: Readonly<Record<AnatomicalCategory, string>> = {
  cortex: '#4fd1ff',
  cerebellum: '#ff8a65',
  brainstem: '#f06292',
  diencephalon: '#b388ff',
  deep_grey: '#64ffda',
  tracts: '#ffd54f',
  white_matter: '#fff59d',
  arteries: '#ff5252',
  veins_sinuses: '#448aff',
  ventricles: '#80deea',
  cranial_nerves: '#aed581',
  meninges_dura: '#bcaaa4',
};

/** Color por defecto si apareciera una categoría no mapeada. */
export const DEFAULT_CATEGORY_COLOR = '#9fb0d0';
