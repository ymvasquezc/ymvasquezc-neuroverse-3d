/**
 * Store global ligero basado en `useSyncExternalStore`.
 *
 * Evita dependencias externas para un estado pequeño y bien acotado. Mantiene la
 * estructura seleccionada y el estado de carga del modelo 3D.
 */
import { useSyncExternalStore } from 'react';

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
}

const initialState: AppState = {
  selectedStructureId: null,
  hoveredStructureId: null,
  modelStatus: 'idle',
  loadProgress: 0,
  loadError: null,
  usingPlaceholder: true,
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
} as const;

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
