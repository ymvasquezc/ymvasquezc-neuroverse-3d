import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

/**
 * Resultado de una carga de modelo.
 */
export interface LoadedModel {
  readonly scene: THREE.Group;
  readonly source: 'gltf';
}

export interface LoadOptions {
  /** Notifica progreso [0, 1]. */
  onProgress?: (progress: number) => void;
  /** Ruta al decodificador DRACO (si el asset usa compresión DRACO). */
  dracoDecoderPath?: string;
}

/**
 * Carga un modelo GLB/GLTF de forma asíncrona con progreso y errores.
 *
 * Se mantiene como función independiente de React para poder reutilizarla en
 * cualquier contexto. En Fase 1 no se incluye ningún asset real: la aplicación
 * recurre al cerebro procedural si la carga falla o no hay URL.
 */
export async function loadGltfModel(
  url: string,
  options: LoadOptions = {},
): Promise<LoadedModel> {
  const loader = new GLTFLoader();

  if (options.dracoDecoderPath) {
    const draco = new DRACOLoader();
    draco.setDecoderPath(options.dracoDecoderPath);
    loader.setDRACOLoader(draco);
  }

  const gltf = await new Promise<import('three/examples/jsm/loaders/GLTFLoader.js').GLTF>(
    (resolve, reject) => {
      loader.load(
        url,
        (data) => resolve(data),
        (event) => {
          if (options.onProgress && event.total > 0) {
            options.onProgress(event.loaded / event.total);
          }
        },
        (error) => reject(error instanceof Error ? error : new Error(String(error))),
      );
    },
  );

  return { scene: gltf.scene, source: 'gltf' };
}
