import { useState } from 'react';
import { useAppState } from '../../state/store';

/**
 * Panel de créditos y licencia. Cumple la obligación de atribución de CC BY-SA
 * (Z-Anatomy + BodyParts3D) y documenta las limitaciones científicas del modelo.
 * Se muestra como un botón discreto que despliega los detalles.
 */
export function AttributionPanel() {
  const [open, setOpen] = useState(false);
  const { usingPlaceholder } = useAppState();

  return (
    <div className="nv-attribution">
      <button
        className="nv-attr-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        ⓘ Créditos y licencia
      </button>

      {open && (
        <div className="nv-attr-body" role="dialog" aria-label="Créditos y licencia">
          <strong>Modelo anatómico</strong>
          {usingPlaceholder ? (
            <p>
              Mostrando geometría <em>placeholder</em> esquemática (el GLB real no se
              cargó). No es anatómicamente verificada.
            </p>
          ) : (
            <>
              <p>
                Derivado de <strong>Z-Anatomy</strong> y <strong>BodyParts3D</strong>{' '}
                (DBCLS), bajo licencia{' '}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                  target="_blank"
                  rel="noreferrer"
                >
                  CC BY-SA 4.0
                </a>
                .
              </p>
              <p className="nv-source">
                "BodyParts3D — The Database Center for Life Science — CC-BY-SA 2.1
                Japan" · "Z-Anatomy — CC-BY-SA 4.0".
              </p>
              <p className="nv-notice" style={{ marginTop: 10 }}>
                ⚠ Modelo de nivel <strong>ilustrativo / anatomía macroscópica</strong>.
                Algunas estructuras profundas están registradas desde atlas de imagen
                y son <strong>aproximadas (~7 mm)</strong>. Uso educativo; no clínico.
              </p>
            </>
          )}
          <p style={{ marginTop: 10 }}>
            Este proyecto se publica bajo CC BY-SA 4.0 (ver <code>LICENSE</code> y{' '}
            <code>ATTRIBUTION.md</code>).
          </p>
        </div>
      )}
    </div>
  );
}
