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

## 3. Restricción del entorno

- El asset (`Z-Anatomy.zip`, ~87 MB) es un proyecto **Blender**; su conversión a
  GLB requiere Blender, que no está disponible en el sandbox.
- **Reparto de trabajo:** la descarga y conversión pesada se hace en local (script
  provisto). La integración en la app, el mapeo de estructuras, la UI de atribución
  y la optimización de carga se implementan en el repositorio.

## 4. Pipeline de conversión (local, documentado)

1. Descargar `Z-Anatomy.zip` del repositorio oficial.
2. Abrir en Blender (como *Application Template*, según su README).
3. Aislar la colección del sistema nervioso central (encéfalo) y eliminar capas no
   usadas y los modelos con licencia NC.
4. Verificar que **cada estructura es un objeto independiente con nombre TA2**.
5. Exportar a **GLB** (glTF 2.0 binario) con:
   - Nombres de objeto preservados (se usarán como `userData.structureId`).
   - Draco activado (compresión de malla) para reducir tamaño.
   - Sin cámaras/luces; transformadas aplicadas.
6. Optimizar con `gltf-transform` (dedup, prune, cuantización) → `brain.glb`.
7. Colocar en `public/models/brain.glb` + decodificador Draco en `public/draco/`.

Se provee `scripts/convert-brain.sh` (orquestación) y `scripts/blender_export.py`
(script de Blender) para reproducir el proceso.

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

- [ ] T1. Documentar pipeline + scripts de conversión (Blender + gltf-transform).
- [ ] T2. Infraestructura de assets: `public/models/`, `public/draco/`, carga Draco.
- [ ] T3. Hook/estado de carga del GLB con progreso y fallback a procedural.
- [ ] T4. Tabla de mapeo TA2 → catálogo de dominio; ampliar estructuras.
- [ ] T5. Conectar selección/resaltado a los meshes reales del GLB.
- [ ] T6. Panel de atribución y licencia (CC BY-SA) + archivo ATTRIBUTION.md.
- [ ] T7. Optimización de carga (Draco, LOD opcional, encuadre de cámara).
- [ ] T8. Verificación: build/typecheck/lint + prueba con y sin asset presente.

## 7. Criterio de "hecho"

Con `public/models/brain.glb` presente, la app carga el modelo real, permite
seleccionar estructuras reales nombradas y muestra atribución. Sin el asset, cae
limpiamente al placeholder etiquetado. Build/typecheck/lint sin errores.
