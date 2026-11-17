/** Cabecera de la aplicación con identidad de marca y estado de fase. */
export function Header() {
  return (
    <header className="nv-header">
      <div className="nv-brand">
        <h1>NEUROVERSE&nbsp;3D</h1>
        <span className="nv-sub">Exploración tridimensional del cerebro humano</span>
      </div>
      <span className="nv-badge">Fase 2 · Modelo anatómico</span>
    </header>
  );
}
