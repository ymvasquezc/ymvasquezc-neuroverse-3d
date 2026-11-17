/**
 * Iluminación de la escena: ambiental + direccional clave + relleno + hemisférica.
 * Da volumen al modelo evitando zonas totalmente negras.
 */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <hemisphereLight args={['#aecbff', '#1a1030', 0.5]} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.6}
        color="#ffffff"
        castShadow={false}
      />
      <directionalLight position={[-5, 2, -4]} intensity={0.6} color="#6aa0ff" />
      <pointLight position={[0, -3, 2]} intensity={0.3} color="#ff7bd5" />
    </>
  );
}
