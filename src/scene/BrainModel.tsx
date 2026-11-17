import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import { createProceduralBrain, disposeGroup } from './loaders/proceduralBrain';
import { useBrainModel } from './loaders/useBrainModel';
import { getActiveStructure, actions, useAppState } from '../state/store';

/**
 * Presenta el modelo cerebral y gestiona la selección por raycasting.
 *
 * Carga el modelo real (Z-Anatomy/BodyParts3D, GLB) mediante `useBrainModel`. Si
 * no está disponible, recurre al cerebro procedural de respaldo (placeholder). La
 * lógica de selección/resaltado opera sobre `userData.structureId`, común a ambos.
 */
export function BrainModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { selectedStructureId, hoveredStructureId } = useAppState();
  const { object: realModel, source } = useBrainModel();

  // Cerebro procedural: solo se crea si no hay modelo real.
  const placeholder = useMemo(
    () => (source === 'placeholder' ? createProceduralBrain() : null),
    [source],
  );
  useEffect(() => {
    return () => {
      if (placeholder) disposeGroup(placeholder);
    };
  }, [placeholder]);

  const brain = realModel ?? placeholder;

  // Garantiza materiales únicos por mesh para poder resaltar individualmente
  // (el GLB real comparte materiales entre muchos meshes).
  useEffect(() => {
    if (!brain) return;
    brain.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      if (Array.isArray(mesh.material)) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat.userData.cloned) {
        const clone = mat.clone();
        clone.userData.cloned = true;
        // Guarda el color emisivo base para restaurarlo.
        clone.userData.baseEmissive = clone.emissive.clone();
        clone.userData.baseEmissiveIntensity = clone.emissiveIntensity;
        mesh.material = clone;
      }
    });
  }, [brain]);

  // Aplica el resaltado por emisión de material según selección/hover.
  useEffect(() => {
    if (!brain) return;
    brain.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (!material?.emissive) return;

      const id = mesh.userData.structureId as string | undefined;
      const isSelected = id != null && id === selectedStructureId;
      const isHovered = id != null && id === hoveredStructureId;

      if (isSelected) {
        const structure = getActiveStructure(id);
        material.emissive.set(structure?.highlightColor ?? '#4fd1ff');
        material.emissiveIntensity = 0.9;
      } else if (isHovered) {
        material.emissive.set('#ffffff');
        material.emissiveIntensity = 0.3;
      } else {
        const base = material.userData.baseEmissive as THREE.Color | undefined;
        material.emissive.copy(base ?? new THREE.Color('#000000'));
        material.emissiveIntensity =
          (material.userData.baseEmissiveIntensity as number | undefined) ?? 0;
      }
    });
  }, [brain, selectedStructureId, hoveredStructureId]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    const id = event.object.userData.structureId as string | undefined;
    actions.selectStructure(id ?? null);
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const id = event.object.userData.structureId as string | undefined;
    actions.hoverStructure(id ?? null);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    actions.hoverStructure(null);
    document.body.style.cursor = 'default';
  };

  const handleMissed = () => actions.selectStructure(null);

  if (!brain) return null;

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerMissed={handleMissed}
    >
      <primitive object={brain} />
    </group>
  );
}
