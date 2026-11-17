/**
 * Bus de eventos de simulación (pub/sub).
 *
 * Punto de integración desacoplado entre la futura simulación y el resto de la
 * aplicación. En Fase 1 no transporta datos científicos; solo demuestra el
 * mecanismo de suscripción que usarán las capas superiores.
 */
export type BusListener<T> = (payload: T) => void;

export class SimulationBus<T> {
  private readonly listeners = new Set<BusListener<T>>();

  /** Suscribe un oyente. Devuelve una función para cancelar la suscripción. */
  subscribe(listener: BusListener<T>): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** Publica un evento a todos los oyentes. */
  publish(payload: T): void {
    for (const listener of this.listeners) {
      listener(payload);
    }
  }

  /** Elimina todos los oyentes. */
  clear(): void {
    this.listeners.clear();
  }

  get size(): number {
    return this.listeners.size;
  }
}
