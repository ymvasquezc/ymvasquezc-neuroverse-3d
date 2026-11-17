import * as THREE from 'three';
import { ANATOMY_LIST } from '../../domain/anatomy/catalog';

/**
 * Genera un cerebro ESQUEMÁTICO de respaldo (placeholder).
 *
 * AVISO: esta geometría NO es anatómicamente correcta. Es un conjunto de volúmenes
 * aproximados cuyo único fin es validar la infraestructura (render, selección,
 * panel) cuando no hay un modelo GLB/GLTF verificado disponible. Cada mesh lleva
 * `userData.structureId` para enlazar con el catálogo del dominio.
 *
 * El llamador es responsable de liberar geometrías/materiales con `disposeGroup`.
 */
export function createProceduralBrain(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'procedural-brain';

  const baseColor = new THREE.Color('#c9b6d6');

  /** Crea un lóbulo como esferoide deformado y lo etiqueta. */
  const addLobe = (
    structureId: string,
    position: [number, number, number],
    scale: [number, number, number],
  ): void => {
    const geometry = new THREE.SphereGeometry(1, 48, 32);
    // Deformación suave para evitar una esfera perfecta.
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const wobble = 0.06 * Math.sin(x * 6) * Math.cos(y * 5) * Math.sin(z * 7);
      pos.setXYZ(i, x * (1 + wobble), y * (1 + wobble), z * (1 + wobble));
    }
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: 0.65,
      metalness: 0.05,
      flatShading: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = structureId;
    mesh.userData.structureId = structureId;
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    group.add(mesh);
  };

  // Posiciones esquemáticas aproximadas (NO verificadas anatómicamente).
  addLobe('frontal-lobe', [0, 0.35, 0.95], [0.95, 0.85, 0.85]);
  addLobe('parietal-lobe', [0, 0.75, -0.25], [0.95, 0.8, 0.85]);
  addLobe('temporal-lobe', [0.95, -0.25, 0.25], [0.7, 0.55, 0.9]);
  addLobe('occipital-lobe', [0, 0.2, -1.1], [0.8, 0.75, 0.7]);
  addLobe('cerebellum', [0, -0.75, -0.9], [0.75, 0.55, 0.6]);

  // Tronco encefálico como cilindro.
  {
    const geometry = new THREE.CylinderGeometry(0.22, 0.3, 1.1, 24);
    const material = new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: 0.6,
      metalness: 0.05,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'brainstem';
    mesh.userData.structureId = 'brainstem';
    mesh.position.set(0, -1.1, -0.55);
    mesh.rotation.x = Math.PI * 0.12;
    group.add(mesh);
  }

  // Espejo del lóbulo temporal al lado izquierdo (mismo id, ambos resaltan).
  const temporal = group.getObjectByName('temporal-lobe') as THREE.Mesh | undefined;
  if (temporal) {
    const left = temporal.clone();
    left.position.x = -temporal.position.x;
    left.name = 'temporal-lobe';
    left.userData.structureId = 'temporal-lobe';
    group.add(left);
  }

  // Validación de coherencia: cada id del catálogo debe tener al menos un mesh.
  const present = new Set<string>();
  group.traverse((o) => {
    const id = o.userData?.structureId as string | undefined;
    if (id) present.add(id);
  });
  for (const s of ANATOMY_LIST) {
    if (!present.has(s.id)) {
      console.warn(
        `[proceduralBrain] Estructura "${s.id}" del catálogo sin mesh asociado.`,
      );
    }
  }

  return group;
}

/** Libera memoria de geometrías y materiales de un grupo. */
export function disposeGroup(group: THREE.Group): void {
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.geometry?.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) material.forEach((m) => m.dispose());
      else material?.dispose();
    }
  });
}
