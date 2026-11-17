/**
 * Web Worker esqueleto para simulaciones futuras.
 *
 * FASE 1: NO CONTIENE LÓGICA CIENTÍFICA. Solo demuestra el canal de mensajes
 * worker <-> hilo principal, de modo que los cálculos pesados futuros no bloqueen
 * la interfaz. Responde a `ping` con `pong` y confirma `start`/`stop`.
 */
/// <reference lib="webworker" />
import type {
  SimulationWorkerRequest,
  SimulationWorkerResponse,
} from '../domain/simulation/types';

const ctx = self as unknown as DedicatedWorkerGlobalScope;

let running = false;

function send(message: SimulationWorkerResponse): void {
  ctx.postMessage(message);
}

ctx.addEventListener('message', (event: MessageEvent<SimulationWorkerRequest>) => {
  const request = event.data;
  switch (request.type) {
    case 'ping':
      send({ type: 'pong' });
      break;
    case 'start':
      // TODO (Fase 3): iniciar el bucle de integración documentado aquí.
      running = true;
      send({ type: 'status', running });
      break;
    case 'stop':
      running = false;
      send({ type: 'status', running });
      break;
  }
});
