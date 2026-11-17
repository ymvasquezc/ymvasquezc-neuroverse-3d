/**
 * Tipos del dominio anatómico.
 *
 * Esta capa es TypeScript puro: no debe importar React ni Three.js. Es la fuente
 * de verdad que consumen tanto la UI como la escena 3D.
 */

/** Grandes divisiones anatómicas usadas para agrupar y colorear estructuras. */
export type AnatomicalSystem =
  | 'cerebrum'
  | 'cerebellum'
  | 'brainstem'
  | 'diencephalon'
  | 'limbic';

/**
 * Metadato de una estructura anatómica.
 *
 * `meshNames` enlaza el dato con uno o más meshes del modelo 3D (por `name` o por
 * `userData.structureId`). Permite que un mismo registro informe varios meshes.
 */
export interface AnatomicalStructure {
  /** Identificador estable, en minúsculas y con guiones. */
  readonly id: string;
  /** Nombre para mostrar (español). */
  readonly name: string;
  /** Nombre latino/científico, cuando aplica. */
  readonly latinName?: string;
  /** Sistema o división a la que pertenece. */
  readonly system: AnatomicalSystem;
  /** Descripción breve y funcional. */
  readonly description: string;
  /** Funciones principales atribuidas (resumen educativo). */
  readonly functions: readonly string[];
  /** Color de resaltado en formato hex (#rrggbb). */
  readonly highlightColor: string;
  /** Nombres de mesh asociados en el modelo 3D. */
  readonly meshNames: readonly string[];
  /**
   * Indica si la representación 3D es un marcador de posición (placeholder) y no
   * un modelo anatómicamente verificado. Obligatorio para la honestidad científica.
   */
  readonly isPlaceholderGeometry: boolean;
}

/** Catálogo indexado por id de estructura. */
export type AnatomyCatalog = ReadonlyMap<string, AnatomicalStructure>;
