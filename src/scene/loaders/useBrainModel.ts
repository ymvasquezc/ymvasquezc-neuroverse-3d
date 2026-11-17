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

        // 5) Colorea cada estructura por su categoría (atlas por sistemas).
        applyCategoryColors(scene, catalog);
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

/**
 * Asigna `userData.structureId` a cada mesh con el NOMBRE ORIGINAL del nodo.
 *
 * GLTFLoader "sanea" `object.name` (quita puntos y reemplaza espacios por `_`),
 * por lo que NO coincide con los ids del manifest (p. ej. "Abducens nerve (VI).l").
 * El loader conserva el nombre original en `object.userData.name`; lo usamos como
 * id para que el enlace con el catálogo sea exacto.
 */
function annotateStructureIds(root: THREE.Object3D): void {
  root.traverse((obj) => {
    if (!(obj as THREE.Mesh).isMesh) return;
    const original = obj.userData.name as string | undefined;
    const id = original ?? obj.name;
    if (id) obj.userData.structureId = id;
  });
}

/**
 * Tiñe el material base de cada mesh con el color de su categoría, para que el
 * modelo se lea como un atlas por sistemas (el GLB original trae tonos marrones
 * poco distinguibles sobre fondo oscuro). Clona el material por mesh para no
 * afectar a otros que compartan el mismo material.
 */
function applyCategoryColors(
  root: THREE.Object3D,
  catalog: ReadonlyMap<string, { highlightColor: string }>,
): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || Array.isArray(mesh.material)) return;
    const id = mesh.userData.structureId as string | undefined;
    const entry = id ? catalog.get(id) : undefined;
    if (!entry) return;

    // Sustituye el material físico del GLB (specular/IOR, que lo vuelve blanco
    // y lustroso) por un Standard mate teñido con el color de la categoría.
    const src = mesh.material as THREE.MeshStandardMaterial;
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(entry.highlightColor),
      metalness: 0.05,
      roughness: 0.75,
      transparent: src.transparent,
      opacity: src.opacity,
      side: src.side,
    });
    mat.userData.cloned = true;
    mat.userData.baseEmissive = new THREE.Color('#000000');
    mat.userData.baseEmissiveIntensity = 0;
    src.dispose();
    mesh.material = mat;
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
