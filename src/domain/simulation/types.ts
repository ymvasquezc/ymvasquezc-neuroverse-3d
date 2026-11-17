/**
 * Contratos para el subsistema de simulación.
 *
 * ESTADO EN FASE 1: SOLO ANDAMIAJE
 * --------------------------------
 * No existe ninguna simulación de actividad cerebral real. Estas interfaces
 * definen el punto de extensión para fases futuras. Cualquier modelo que se
 * implemente después DEBERÁ documentar sus simplificaciones y supuestos, y no
 * presentarse como una reproducción fiel de la fisiología real.
 */

/** Estado publicado por un motor de simulación en un instante dado. */
export interface SimulationState {
  /** Marca temporal lógica de la simulación (ms). */
  readonly time: number;
  /** Activación por estructura, normalizada [0, 1]. Clave = id de estructura. */
  readonly activation: ReadonlyMap<string, number>;
}

/** Parámetros de arranque de una simulación. */
export interface SimulationConfig {
  readonly stepMs: number;
  readonly seed?: number;
}

/**
 * Motor de simulación. Implementaciones futuras vivirán típicamente en un
 * Web Worker y se comunicarán por mensajes; esta interfaz describe la fachada
 * que consumirá la aplicación.
 */
export interface SimulationEngine {
  start(config: SimulationConfig): void;
  stop(): void;
  /** Suscribe a actualizaciones de estado. Devuelve una función para cancelar. */
  subscribe(listener: (state: SimulationState) => void): () => void;
  readonly isRunning: boolean;
}

/** Tipos de mensaje intercambiados con el worker de simulación. */
export type SimulationWorkerRequest =
  | { readonly type: 'ping' }
  | { readonly type: 'start'; readonly config: SimulationConfig }
  | { readonly type: 'stop' };

export type SimulationWorkerResponse =
  | { readonly type: 'pong' }
  | { readonly type: 'status'; readonly running: boolean };
