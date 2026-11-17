import { useMemo, useState } from 'react';
import { actions, getActiveStructure, useAppState } from '../../state/store';
import type { AnatomicalCategory } from '../../domain/anatomy/types';

/**
 * Panel informativo lateral. Muestra los datos de la estructura seleccionada
 * (desde el catálogo activo) y un explorador con búsqueda y filtro por categoría.
 *
 * INTEGRIDAD CIENTÍFICA: si una estructura no tiene descripción curada, se indica
 * explícitamente en vez de inventar texto.
 */
export function InfoPanel() {
  const { selectedStructureId, usingPlaceholder, structures, categories } =
    useAppState();
  const structure = getActiveStructure(selectedStructureId);

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<AnatomicalCategory | 'all'>(
    'all',
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return structures
      .filter((s) => activeCategory === 'all' || s.category === activeCategory)
      .filter((s) => q === '' || s.name.toLowerCase().includes(q))
      .slice(0, 300); // límite defensivo para el DOM
  }, [structures, query, activeCategory]);

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

          {structure.description ? (
            <p>{structure.description}</p>
          ) : (
            <p className="nv-empty">
              Sin descripción curada para esta estructura. Se muestran únicamente
              los metadatos objetivos del modelo (no se genera texto inventado).
            </p>
          )}

          {structure.functions.length > 0 && (
            <>
              <div className="nv-section-label">Funciones</div>
              <div>
                {structure.functions.map((fn) => (
                  <span className="nv-tag" key={fn}>
                    {fn}
                  </span>
                ))}
              </div>
            </>
          )}

          {structure.ta2Path && structure.ta2Path.length > 0 && (
            <>
              <div className="nv-section-label">Clasificación (TA2)</div>
              <p className="nv-ta2">{structure.ta2Path.join(' › ')}</p>
            </>
          )}

          {structure.source && (
            <p className="nv-source">Fuente del modelo: {structure.source}</p>
          )}

          {structure.isPlaceholderGeometry && (
            <div className="nv-notice" role="note">
              ⚠ Geometría de marcador de posición esquemático, no verificada
              anatómicamente.
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Explorador anatómico</h2>
          <p className="nv-empty">
            Haz clic en una estructura del modelo 3D o búscala abajo. Arrastra para
            rotar, rueda para acercar, clic derecho + arrastrar para desplazar.
          </p>
        </>
      )}

      <div className="nv-section-label">
        Estructuras {structures.length > 0 && `(${structures.length})`}
      </div>

      <input
        className="nv-search"
        type="search"
        placeholder="Buscar estructura…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Buscar estructura"
      />

      {categories.length > 0 && (
        <div className="nv-chips">
          <button
            className="nv-chip"
            aria-pressed={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
          >
            Todas
          </button>
          {categories.map((c) => (
            <button
              key={c.key}
              className="nv-chip"
              aria-pressed={activeCategory === c.key}
              onClick={() => setActiveCategory(c.key)}
              title={`${c.label} (${c.count})`}
            >
              <span
                className="nv-dot"
                style={{ background: c.color }}
                aria-hidden
              />
              {c.label}
            </button>
          ))}
        </div>
      )}

      <ul className="nv-structure-list">
        {filtered.map((s) => (
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
        {filtered.length === 0 && (
          <li className="nv-empty" style={{ padding: '8px 10px' }}>
            Sin resultados.
          </li>
        )}
      </ul>

      {usingPlaceholder && (
        <div className="nv-notice" role="note">
          Modelo en modo <strong>placeholder</strong>: el GLB real no se cargó;
          geometría esquemática no verificada.
        </div>
      )}
    </aside>
  );
}
