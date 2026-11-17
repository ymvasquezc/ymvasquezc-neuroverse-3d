import { Header } from '../components/layout/Header';
import { InfoPanel } from '../components/panels/InfoPanel';
import { AttributionPanel } from '../components/panels/AttributionPanel';
import { StatusOverlay } from '../components/ui/StatusOverlay';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { Viewer } from '../scene/Viewer';
import { useSimulationWorker } from '../hooks/useSimulationWorker';

/**
 * Composición raíz de NEUROVERSE 3D.
 * Layout: cabecera superior + escenario 3D a pantalla completa con paneles flotantes.
 */
export function App() {
  // Verifica el canal con el worker de simulación (andamiaje de Fase 1).
  useSimulationWorker();

  return (
    <div className="nv-app">
      <Header />
      <main className="nv-stage">
        <div className="nv-canvas-host">
          <ErrorBoundary>
            <Viewer />
          </ErrorBoundary>
        </div>
        <StatusOverlay />
        <AttributionPanel />
        <InfoPanel />
        <div className="nv-hint">
          Arrastrar: rotar · Rueda: zoom · Clic derecho + arrastrar: desplazar
        </div>
      </main>
    </div>
  );
}
