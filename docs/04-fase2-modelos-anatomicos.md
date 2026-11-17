# NEUROVERSE 3D — Fase 2: Modelos anatómicos reales (Z-Anatomy)

## 1. Objetivo

Sustituir la geometría placeholder de la Fase 1 por un modelo cerebral derivado de
**Z-Anatomy**, con estructuras segmentadas, nombradas (Terminologia Anatomica TA2)
y seleccionables, manteniendo la integridad científica (procedencia y atribución).

## 2. Fuente y licencia

- **Proyecto:** Z-Anatomy — https://github.com/Z-Anatomy/Models-of-human-anatomy
- **Modelos derivados de:** BodyParts3D (Database Center for Life Science).
- **Licencia:** CC BY-SA 4.0. Obligaciones:
  1. **Atribución** a Z-Anatomy + BodyParts3D (y Brainder para sustancia blanca).
  2. **ShareAlike**: los assets derivados se publican bajo CC BY-SA 4.0.

### Exclusiones de licencia (IMPORTANTE)
Z-Anatomy incluye algunos modelos con licencias NO compatibles con nuestro uso
abierto. **No** se incorporarán:
- Oído interno — CC-BY-NC-SA 4.0 (no comercial).
- Riñón — CC-BY-NC 4.0 (no comercial).
Solo usamos las estructuras **cerebrales** derivadas de BodyParts3D/Brainder (CC-BY-SA).

## 3. Asset elegido (Opción B: GLB ya convertido)

En lugar de convertir el proyecto Blender de Z-Anatomy manualmente (que requiere
Blender), se usó un **GLB ya convertido y publicado bajo CC BY-SA 4.0** derivado de
Z-Anatomy/BodyParts3D:

- **Fuente:** `itayinbarr/brainproject` → `brain-atlas/models/brain.glb` + `manifest.json`.
- **Licencia de los assets 3D:** CC BY-SA 4.0 (compatible). El código del repo
  origen es Apache-2.0 y NO se usa.
- **Contenido:** 437 estructuras con nombre TA2, en 12 categorías. GLB de 4.65 MB,
  comprimido con **Draco** (`KHR_draco_mesh_compression`), generado con glTF-Transform.
- **Verificación:** los 437 nombres de nodo del GLB coinciden 1:1 con los `name` del
  manifest, lo que garantiza el mapeo de selección.

Se descartó `nqwrc/3d-anatomy` (mismo stack) por estar bajo CC BY-NC-SA (no comercial),
incompatible con la licencia del proyecto.

## 4. Assets en el repositorio

- `public/models/brain.glb` — modelo Draco-comprimido.
- `public/models/manifest.json` — metadatos por estructura (id, label, category,
  side, ta2, source).
- `public/draco/` — decodificador Draco (copiado de three.js) para `DRACOLoader`.

El catálogo de dominio se **genera desde el manifest** en tiempo de ejecución
(`buildCatalogFromManifest`), de modo que la capa de dominio refleja fielmente el
modelo real sin mantenimiento manual de 437 entradas.

## 5. Cambios en la aplicación

- `scene/BrainModel.tsx`: cargar `brain.glb` vía `loadGltfModel` (Suspense +
  progreso + error), con **fallback** al cerebro procedural si el asset no existe.
- `domain/anatomy/catalog.ts`: ampliar el catálogo y mapear `meshNames` a los
  nombres reales de objeto del GLB (tabla de correspondencia TA2 → id).
- `components/panels/AttributionPanel.tsx`: nueva UI de créditos y licencia
  (requisito legal CC BY-SA).
- `state/store.ts`: `usingPlaceholder` pasa a reflejar si se cargó el GLB real.
- Documentar en la UI qué estructuras están incluidas y cuáles no (y por qué).

## 6. Plan de tareas (Fase 2)

- [x] T1. Seleccionar y verificar asset GLB CC BY-SA (licencia + mapeo de nombres).
- [x] T2. Infraestructura de assets: `public/models/`, `public/draco/`, carga Draco.
- [x] T3. Hook/estado de carga del GLB con progreso y fallback a procedural.
- [x] T4. Catálogo de dominio generado desde el manifest (categorías, lateralidad, TA2).
- [x] T5. Conectar selección/resaltado a los meshes reales del GLB (clonado de material).
- [x] T6. Panel de atribución y licencia (CC BY-SA) + `ATTRIBUTION.md` + `LICENSE`.
- [x] T7. Encuadre automático del modelo (centrado + escala a la cámara).
- [x] T8. Verificación: build/typecheck/lint + validación de mapeo nombres.

## 7. Criterio de "hecho"

Con `public/models/brain.glb` presente, la app carga el modelo real, permite
seleccionar estructuras reales nombradas y muestra atribución. Sin el asset, cae
limpiamente al placeholder etiquetado. Build/typecheck/lint sin errores.

## 8. Resultado de verificación

- `npm run typecheck`: 0 errores.
- `npm run lint`: 0 warnings, 0 errores (se excluyen assets vendored de `public/`).
- `npm run build`: OK; GLB (4.65 MB), manifest y decodificador Draco copiados a `dist/`.
- Mapeo de nombres GLB ↔ manifest: 437/437 coincidencias.
- Limitación: no fue posible renderizar en navegador desde el sandbox (sin browser),
  ni decodificar Draco en Node (los loaders requieren entorno de navegador). La
  validación se apoya en el build, el typecheck, el lint y la verificación estructural
  del GLB. Conviene una comprobación visual final en navegador al desplegar.
