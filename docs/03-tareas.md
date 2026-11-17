# NEUROVERSE 3D — Plan de Tareas (Fase 1)

Tareas pequeñas e incrementales. Solo infraestructura + visualizador.

- [x] T1. Scaffolding Vite + React + TS; dependencias (three, R3F, drei).
- [x] T2. Config base: tsconfig estricto, estructura de carpetas, estilos y tokens.
- [x] T3. Capa de dominio: tipos de anatomía + catálogo de estructuras placeholder.
- [x] T4. Interfaces de simulación + bus de eventos + worker esqueleto (sin lógica).
- [x] T5. Store global con useSyncExternalStore.
- [x] T6. Escena: Viewer (Canvas), Lighting, Controls.
- [x] T7. Carga de modelos: GLTFLoader wrapper + fallback procedural de cerebro.
- [x] T8. Selección por raycasting + resaltado del mesh.
- [x] T9. UI: cabecera, panel informativo lateral, overlays de carga/error.
- [x] T10. Error boundary + manejo de errores.
- [x] T11. Build y verificación (typecheck + build). Corregir errores.

## Criterio de "hecho" en Fase 1

`npm run build` y `npm run typecheck` pasan sin errores; la app arranca, muestra el
cerebro placeholder, permite rotar/zoom/pan, selección resalta y actualiza el panel.

## Resultado de verificación

- `npm run build`: OK (582 módulos, worker emitido como chunk propio, sin warnings).
- `npm run typecheck`: OK, 0 errores.
- `npm run lint` (oxlint): 0 warnings, 0 errors.
- `npm run dev`: el servidor Vite arranca en ~230 ms.
