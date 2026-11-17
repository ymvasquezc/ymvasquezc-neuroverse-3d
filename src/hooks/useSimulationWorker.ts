import { useEffect } from 'react';
import type {
  SimulationWorkerRequest,
  SimulationWorkerResponse,
} from '../domain/simulation/types';

/**
 * Comprueba en arranque que el canal con el Web Worker de simulación funciona.
 *
 * FASE 1: diagnóstico únicamente. Instancia el worker, envía `ping`, registra el
 * `pong` y lo libera. Demuestra que los cálculos pesados futuros podrán vivir
 * fuera del hilo principal sin bloquear la interfaz. No ejecuta ninguna
 * simulación científica.
 */
export function useSimulationWorker(): void {
  useEffect(() => {
    let worker: Worker | null = null;
    try {
      worker = new Worker(
        new URL('../workers/simulation.worker.ts', import.meta.url),
        { type: 'module' },
      );
      worker.onmessage = (event: MessageEvent<SimulationWorkerResponse>) => {
        if (event.data.type === 'pong') {
          console.info('[NEUROVERSE] Canal con el worker de simulación operativo.');
        }
      };
      const ping: SimulationWorkerRequest = { type: 'ping' };
      worker.postMessage(ping);
    } catch (err) {
      console.warn('[NEUROVERSE] No se pudo inicializar el worker de simulación:', err);
    }
    return () => worker?.terminate();
  }, []);
}
