import { useAppState } from '../../state/store';

/**
 * Overlay de estado de carga/error del modelo. Se superpone al lienzo sin
 * bloquear la interacción salvo en su tarjeta.
 */
export function StatusOverlay() {
  const { modelStatus, loadProgress, loadError } = useAppState();

  if (modelStatus === 'error') {
    return (
      <div className="nv-overlay error">
        <div className="nv-card">
          <h2 style={{ marginTop: 0 }}>No se pudo cargar el modelo</h2>
          <p style={{ color: 'var(--nv-text-dim)' }}>
            {loadError ?? 'Error desconocido durante la carga.'}
          </p>
        </div>
      </div>
    );
  }

  if (modelStatus === 'loading') {
    return (
      <div className="nv-overlay">
        <div className="nv-card">
          <div className="nv-spinner" />
          <div>Cargando modelo… {Math.round(loadProgress * 100)}%</div>
        </div>
      </div>
    );
  }

  return null;
}
