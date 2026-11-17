# NEUROVERSE 3D — Especificación de Requisitos

## 1. Visión

Plataforma web educativa y científica para la exploración tridimensional del
cerebro humano. El usuario puede rotar, acercar y desplazar un modelo cerebral,
seleccionar estructuras anatómicas y leer información contextual. La arquitectura
queda preparada para incorporar, en fases posteriores, simulaciones de actividad
neuronal.

## 2. Alcance de la Fase 1 (esta entrega)

Solo se implementa **infraestructura + visualizador 3D**. Explícitamente NO se
implementan simulaciones neuronales reales; únicamente se deja la arquitectura
preparada (interfaces, capa de dominio, puntos de extensión).

## 3. Requisitos funcionales

| ID | Requisito | Criterio de aceptación |
|----|-----------|------------------------|
| RF-1 | Escena 3D | Se renderiza un canvas WebGL con un modelo cerebral y fondo estético. |
| RF-2 | Controles de cámara | Rotación (arrastre), zoom (rueda) y desplazamiento (pan) funcionan y tienen amortiguación. |
| RF-3 | Iluminación | Luz ambiental + al menos una direccional + relleno; el modelo se ve con volumen. |
| RF-4 | Carga de modelos GLB/GLTF | Un `ModelLoader` carga assets GLB/GLTF con estado de carga, progreso y error. Si no hay asset externo, se usa un modelo procedural de respaldo claramente etiquetado como placeholder. |
| RF-5 | Selección de estructuras | Al hacer clic sobre una estructura se resalta y se emite un evento de selección. |
| RF-6 | Panel informativo lateral | Muestra datos de la estructura seleccionada desde la capa de datos anatómicos. |
| RF-7 | Arquitectura de simulación | Existen interfaces y un bus de eventos para conectar futuras simulaciones vía Web Worker, sin lógica científica implementada. |

## 4. Requisitos no funcionales

- **Modularidad**: separación estricta entre UI, anatomía (dominio) y simulación.
- **Rendimiento**: 60 FPS objetivo en hardware de gama media; render bajo demanda cuando sea posible.
- **Responsividad**: adaptable de móvil a escritorio.
- **Manejo de errores**: error boundaries en React y estados de error explícitos en la carga.
- **Documentación**: TSDoc en módulos públicos.
- **Integridad científica**:
  - No presentar modelos ficticios como anatómicamente correctos. Todo placeholder debe estar etiquetado como tal en la UI.
  - No simular funciones cerebrales reales sin documentar las simplificaciones.

## 5. Fases futuras (fuera de alcance ahora)

- F2: Catálogo anatómico real con modelos segmentados y metadatos citados.
- F3: Motor de simulación neuronal en Web Worker (modelos documentados).
- F4: Secciones/cortes, medidas, anotaciones, modo comparación.
- F5: Persistencia, cuentas de usuario, contenido educativo guiado.
