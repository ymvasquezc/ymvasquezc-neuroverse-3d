import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from './Lighting';
import { Controls } from './Controls';
import { BrainModel } from './BrainModel';
import { SCENE_CONFIG } from './config';

/**
 * Monta el lienzo WebGL y orquesta la escena: cámara, luces, controles y modelo.
 * `Suspense` cubre la carga asíncrona de recursos (modelos/texturas futuros).
 */
export function Viewer() {
  return (
    <Canvas
      camera={{
        fov: SCENE_CONFIG.camera.fov,
        near: SCENE_CONFIG.camera.near,
        far: SCENE_CONFIG.camera.far,
        position: [...SCENE_CONFIG.camera.position],
      }}
      dpr={[...SCENE_CONFIG.dpr]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ scene }) => {
        scene.background = null;
      }}
    >
      <fog attach="fog" args={[SCENE_CONFIG.background, 8, 20]} />
      <Lighting />
      <Suspense fallback={null}>
        <BrainModel />
      </Suspense>
      <Controls />
    </Canvas>
  );
}
