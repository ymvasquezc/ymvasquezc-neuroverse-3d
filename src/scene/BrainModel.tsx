import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import { createProceduralBrain, disposeGroup } from './loaders/proceduralBrain';
import { getStructure } from '../domain/anatomy/catalog';
import { actions, useAppState } from '../state/store';

/**
 * Presenta el modelo cerebral y gestiona la selección por raycasting.
 *
 * En Fase 1 usa el cerebro procedural de respaldo (placeholder). La integración
 * de un GLB/GLTF verificado se hará enlazando `loadGltfModel` a este componente
 * en una fase posterior; la lógica de selección/resaltado ya es reutilizable
 * porque opera sobre `userData.structureId`.
 */
export function BrainModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { selectedStructureId, hoveredStructureId } = useAppState();

  // Construye el modelo una sola vez y libera memoria al desmontar.
  const brain = useMemo(() => createProceduralBrain(), []);
  useEffect(() => {
    actions.setModelStatus('ready');
    actions.setUsingPlaceholder(true);
    return () => disposeGroup(brain);
  }, [brain]);

  // Aplica el resaltado por emisión de material según selección/hover.
  useEffect(() => {
    brain.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (!material?.emissive) return;

      const id = mesh.userData.structureId as string | undefined;
      const isSelected = id != null && id === selectedStructureId;
      const isHovered = id != null && id === hoveredStructureId;

      if (isSelected) {
        const structure = getStructure(id);
        material.emissive.set(structure?.highlightColor ?? '#4fd1ff');
        material.emissiveIntensity = 0.9;
      } else if (isHovered) {
        material.emissive.set('#ffffff');
        material.emissiveIntensity = 0.25;
      } else {
        material.emissive.set('#000000');
        material.emissiveIntensity = 0;
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

  // Clic en vacío deselecciona.
  const handleMissed = () => actions.selectStructure(null);

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
