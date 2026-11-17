/**
 * Store global ligero basado en `useSyncExternalStore`.
 *
 * Evita dependencias externas para un estado pequeño y bien acotado. Mantiene la
 * estructura seleccionada y el estado de carga del modelo 3D.
 */
import { useSyncExternalStore } from 'react';
import type {
  AnatomyCatalog,
  AnatomicalStructure,
  CategoryInfo,
} from '../domain/anatomy/types';
import { PLACEHOLDER_CATALOG, PLACEHOLDER_LIST } from '../domain/anatomy/catalog';

/** Fases de carga del modelo 3D. */
export type ModelStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface AppState {
  /** Id de la estructura seleccionada, o `null`. */
  readonly selectedStructureId: string | null;
  /** Id de la estructura bajo el cursor (hover), o `null`. */
  readonly hoveredStructureId: string | null;
  /** Estado de carga del modelo. */
  readonly modelStatus: ModelStatus;
  /** Progreso de carga [0, 1] cuando `modelStatus === 'loading'`. */
  readonly loadProgress: number;
  /** Mensaje de error de carga, si lo hay. */
  readonly loadError: string | null;
  /** Indica si el modelo mostrado es un placeholder no verificado. */
  readonly usingPlaceholder: boolean;
  /** Catálogo activo (placeholder o real), indexado por id. */
  readonly catalog: AnatomyCatalog;
  /** Lista del catálogo activo en orden de declaración. */
  readonly structures: readonly AnatomicalStructure[];
  /** Categorías disponibles (vacío en modo placeholder). */
  readonly categories: readonly CategoryInfo[];
}

const initialState: AppState = {
  selectedStructureId: null,
  hoveredStructureId: null,
  modelStatus: 'idle',
  loadProgress: 0,
  loadError: null,
  usingPlaceholder: true,
  catalog: PLACEHOLDER_CATALOG,
  structures: PLACEHOLDER_LIST,
  categories: [],
};

let state: AppState = initialState;
const listeners = new Set<() => void>();

function setState(patch: Partial<AppState>): void {
  state = { ...state, ...patch };
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): AppState {
  return state;
}

/* ---- Acciones ---- */

export const actions = {
  selectStructure(id: string | null): void {
    setState({ selectedStructureId: id });
  },
  hoverStructure(id: string | null): void {
    if (id !== state.hoveredStructureId) setState({ hoveredStructureId: id });
  },
  setModelStatus(status: ModelStatus): void {
    setState({ modelStatus: status });
  },
  setLoadProgress(progress: number): void {
    setState({ loadProgress: Math.min(1, Math.max(0, progress)) });
  },
  setLoadError(message: string | null): void {
    setState({ loadError: message, modelStatus: message ? 'error' : state.modelStatus });
  },
  setUsingPlaceholder(value: boolean): void {
    setState({ usingPlaceholder: value });
  },
  /** Reemplaza el catálogo activo (al cargar el modelo real). */
  setCatalog(
    catalog: AnatomyCatalog,
    structures: readonly AnatomicalStructure[],
    categories: readonly CategoryInfo[],
  ): void {
    setState({ catalog, structures, categories });
  },
  /** Vuelve al catálogo placeholder (fallback). */
  useFallbackCatalog(): void {
    setState({
      catalog: PLACEHOLDER_CATALOG,
      structures: PLACEHOLDER_LIST,
      categories: [],
      usingPlaceholder: true,
    });
  },
} as const;

/** Devuelve el metadato de la estructura seleccionada desde el catálogo activo. */
export function getActiveStructure(id: string | null): AnatomicalStructure | undefined {
  return id ? state.catalog.get(id) : undefined;
}

/* ---- Hooks ---- */

/** Suscribe un componente al estado completo. */
export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/** Selector memoizado del estado. */
export function useAppSelector<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state),
  );
}
