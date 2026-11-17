/** Rutas de los assets del modelo real (servidos desde `public/`). */
export const ASSET_PATHS = {
  /** Modelo GLB del cerebro (Draco-comprimido). */
  brainGlb: `${import.meta.env.BASE_URL}models/brain.glb`,
  /** Manifest con metadatos por estructura. */
  manifest: `${import.meta.env.BASE_URL}models/manifest.json`,
  /** Carpeta del decodificador Draco. */
  dracoDecoder: `${import.meta.env.BASE_URL}draco/`,
} as const;
