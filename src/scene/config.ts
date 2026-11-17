/** Constantes de configuración de la escena 3D. */

export const SCENE_CONFIG = {
  /** Color de fondo de la escena (espacio profundo). */
  background: '#05070f',
  /** Rango de distancia permitido a la cámara (zoom). */
  camera: {
    fov: 45,
    near: 0.1,
    far: 100,
    position: [0, 1.5, 6] as const,
  },
  controls: {
    minDistance: 2.5,
    maxDistance: 14,
    dampingFactor: 0.08,
  },
  /** Limitación de densidad de píxeles para equilibrar nitidez y rendimiento. */
  dpr: [1, 2] as const,
} as const;
