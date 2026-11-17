import { OrbitControls } from '@react-three/drei';
import { SCENE_CONFIG } from './config';

/**
 * Controles de cámara: rotación (arrastre), zoom (rueda) y desplazamiento (pan).
 * La amortiguación suaviza el movimiento. Límites de distancia desde la config.
 */
export function Controls() {
  return (
    <OrbitControls
      enableDamping
      dampingFactor={SCENE_CONFIG.controls.dampingFactor}
      minDistance={SCENE_CONFIG.controls.minDistance}
      maxDistance={SCENE_CONFIG.controls.maxDistance}
      enablePan
      makeDefault
    />
  );
}
