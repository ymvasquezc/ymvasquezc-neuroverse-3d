import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { loadGltfModel } from './ModelLoader';
import { ASSET_PATHS } from './assets';
import { buildCatalogFromManifest } from '../../domain/anatomy/catalog';
import type { BrainManifest } from '../../domain/anatomy/manifest';
import { actions } from '../../state/store';

/** Modo del modelo resuelto por el hook. */
export type BrainSource = 'gltf' | 'placeholder';

export interface BrainModelResult {
  /** Grupo cargado del GLB real, o `null` si se usa el placeholder. */
  readonly object: THREE.Group | null;
  /** Fuente efectiva. */
  readonly source: BrainSource;
}

/**
 * Carga el modelo real (GLB + manifest) y puebla el catálogo del dominio.
 *
 * Estrategia de resiliencia: si el manifest o el GLB no están disponibles o
 * fallan, se recurre limpiamente al cerebro procedural de la Fase 1 (fallback),
 * y el estado refleja `usingPlaceholder = true`. Así la app nunca queda rota.
 */
export function useBrainModel(): BrainModelResult {
  const [result, setResult] = useState<BrainModelResult>({
    object: null,
    source: 'placeholder',
  });

  useEffect(() => {
    let cancelled = false;
    let loadedObject: THREE.Group | null = null;

    async function run(): Promise<void> {
      actions.setModelStatus('loading');
      actions.setLoadProgress(0);
      actions.setLoadError(null);

      try {
        // 1) Manifest (metadatos). Si falla, no hay modelo real que describir.
        const manifestRes = await fetch(ASSET_PATHS.manifest);
        if (!manifestRes.ok) {
          throw new Error(`Manifest no disponible (HTTP ${manifestRes.status}).`);
        }
        const manifest = (await manifestRes.json()) as BrainManifest;

        // 2) GLB (geometría), con progreso y decodificador Draco.
        const { scene } = await loadGltfModel(ASSET_PATHS.brainGlb, {
          dracoDecoderPath: ASSET_PATHS.dracoDecoder,
          onProgress: (p) => !cancelled && actions.setLoadProgress(p),
        });
        if (cancelled) {
          disposeObject(scene);
          return;
        }

        // 3) Enlaza cada mesh con su id de estructura (= node.name del GLB).
        annotateStructureIds(scene);
        normalizeModel(scene);

        // 4) Puebla el catálogo del dominio desde el manifest.
        const { catalog, list, categories } = buildCatalogFromManifest(manifest);
        actions.setCatalog(catalog, list, categories);
        actions.setUsingPlaceholder(false);
        actions.setModelStatus('ready');

        loadedObject = scene;
        setResult({ object: scene, source: 'gltf' });
      } catch (err) {
        if (cancelled) return;
        // Fallback transparente al placeholder.
        console.warn(
          '[NEUROVERSE] No se pudo cargar el modelo real; usando placeholder.',
          err,
        );
        actions.useFallbackCatalog();
        actions.setModelStatus('ready');
        setResult({ object: null, source: 'placeholder' });
      }
    }

    void run();

    return () => {
      cancelled = true;
      if (loadedObject) disposeObject(loadedObject);
    };
  }, []);

  return result;
}

/** Copia `node.name` a `userData.structureId` en todos los meshes. */
function annotateStructureIds(root: THREE.Object3D): void {
  root.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh && obj.name) {
      obj.userData.structureId = obj.name;
    }
  });
}

/** Centra y escala el modelo para encuadrarlo en la cámara por defecto. */
function normalizeModel(root: THREE.Object3D): void {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 3.2 / maxDim; // encaja con el rango de cámara de la escena
  root.position.sub(center);
  root.scale.setScalar(scale);
  // reposiciona tras escalar para centrar en el origen
  const box2 = new THREE.Box3().setFromObject(root);
  const center2 = new THREE.Vector3();
  box2.getCenter(center2);
  root.position.sub(center2);
}

/** Libera geometrías y materiales de un objeto. */
function disposeObject(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.geometry?.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) material.forEach((m) => m.dispose());
      else material?.dispose();
    }
  });
}
