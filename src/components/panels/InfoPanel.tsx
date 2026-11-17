import { ANATOMY_LIST, getStructure } from '../../domain/anatomy/catalog';
import { actions, useAppState } from '../../state/store';

/**
 * Panel informativo lateral. Muestra los datos de la estructura seleccionada
 * tomados de la capa de dominio, y una lista navegable de estructuras.
 */
export function InfoPanel() {
  const { selectedStructureId, usingPlaceholder } = useAppState();
  const structure = getStructure(selectedStructureId);

  return (
    <aside className="nv-panel" aria-label="Panel informativo">
      {structure ? (
        <>
          <h2>
            <span
              className="nv-dot"
              style={{ background: structure.highlightColor }}
              aria-hidden
            />
            {structure.name}
          </h2>
          {structure.latinName && <div className="nv-latin">{structure.latinName}</div>}
          <p>{structure.description}</p>

          <div className="nv-section-label">Funciones</div>
          <div>
            {structure.functions.map((fn) => (
              <span className="nv-tag" key={fn}>
                {fn}
              </span>
            ))}
          </div>

          {structure.isPlaceholderGeometry && (
            <div className="nv-notice" role="note">
              ⚠ La geometría mostrada es un marcador de posición esquemático y no una
              reconstrucción anatómica verificada. Las descripciones son educativas
              generales; la forma y posición se sustituirán por modelos citados en
              fases posteriores.
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Explorador anatómico</h2>
          <p className="nv-empty">
            Haz clic en una estructura del modelo 3D para ver su información, o
            selecciónala en la lista. Arrastra para rotar, usa la rueda para acercar
            y arrastra con el botón derecho para desplazar.
          </p>
        </>
      )}

      <div className="nv-section-label">Estructuras</div>
      <ul className="nv-structure-list">
        {ANATOMY_LIST.map((s) => (
          <li key={s.id}>
            <button
              aria-current={s.id === selectedStructureId}
              onClick={() => actions.selectStructure(s.id)}
              onPointerEnter={() => actions.hoverStructure(s.id)}
              onPointerLeave={() => actions.hoverStructure(null)}
            >
              <span
                className="nv-dot"
                style={{ background: s.highlightColor }}
                aria-hidden
              />
              {s.name}
            </button>
          </li>
        ))}
      </ul>

      {usingPlaceholder && (
        <div className="nv-notice" role="note">
          Modelo en modo <strong>placeholder</strong>: geometría esquemática no
          verificada anatómicamente (Fase 1).
        </div>
      )}
    </aside>
  );
}
