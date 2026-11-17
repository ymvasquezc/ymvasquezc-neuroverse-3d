/**
 * Tipos del dominio anatómico.
 *
 * Esta capa es TypeScript puro: no debe importar React ni Three.js. Es la fuente
 * de verdad que consumen tanto la UI como la escena 3D.
 */

/**
 * Categorías del modelo real (derivadas del manifest de Z-Anatomy/BodyParts3D).
 * Agrupan las estructuras y determinan su color de resaltado.
 */
export type AnatomicalCategory =
  | 'cortex'
  | 'cerebellum'
  | 'brainstem'
  | 'diencephalon'
  | 'deep_grey'
  | 'tracts'
  | 'white_matter'
  | 'arteries'
  | 'veins_sinuses'
  | 'ventricles'
  | 'cranial_nerves'
  | 'meninges_dura';

/** Lateralidad anatómica. */
export type AnatomicalSide = 'left' | 'right' | 'median';

/**
 * Metadato de una estructura anatómica.
 *
 * `meshNames` enlaza el dato con uno o más meshes del modelo 3D. Para el modelo
 * real, cada `meshName` coincide exactamente con el `name` del nodo en el GLB.
 */
export interface AnatomicalStructure {
  /** Identificador estable. */
  readonly id: string;
  /** Nombre para mostrar. */
  readonly name: string;
  /** Categoría/división a la que pertenece. */
  readonly category: AnatomicalCategory;
  /** Lateralidad. */
  readonly side: AnatomicalSide;
  /** Descripción breve (educativa). Puede estar vacía si el modelo no la aporta. */
  readonly description: string;
  /** Funciones principales atribuidas (resumen educativo). */
  readonly functions: readonly string[];
  /** Color de resaltado en formato hex (#rrggbb). */
  readonly highlightColor: string;
  /** Nombres de mesh asociados en el modelo 3D (coinciden con `node.name`). */
  readonly meshNames: readonly string[];
  /** Ruta jerárquica TA2 (Terminologia Anatomica), si está disponible. */
  readonly ta2Path?: readonly string[];
  /** Procedencia del dato/geometría (p. ej. "Z-Anatomy / BodyParts3D"). */
  readonly source?: string;
  /**
   * `true` si la geometría es un marcador de posición esquemático y NO una
   * representación anatómica derivada de datos reales. Obligatorio para la
   * honestidad científica.
   */
  readonly isPlaceholderGeometry: boolean;
}

/** Catálogo indexado por id de estructura. */
export type AnatomyCatalog = ReadonlyMap<string, AnatomicalStructure>;

/** Metadato de una categoría (etiqueta legible + recuento). */
export interface CategoryInfo {
  readonly key: AnatomicalCategory;
  readonly label: string;
  readonly count: number;
  readonly color: string;
}
