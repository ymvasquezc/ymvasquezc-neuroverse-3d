# NEUROVERSE 3D — Diseño de Arquitectura

## 1. Principios

- **Separación por capas**: UI (React) · Anatomía/Dominio · Render 3D · Simulación.
- **Dependencias hacia el dominio**: la UI y el render dependen del dominio, nunca al revés.
- **Puntos de extensión explícitos**: la simulación se integra por interfaces y un
  bus de eventos, no por acoplamiento directo.

## 2. Estructura de carpetas

```
src/
├── app/                 # Composición de la aplicación, layout raíz
├── components/          # Componentes React de UI (presentación)
│   ├── layout/
│   ├── panels/
│   └── ui/
├── scene/               # Todo lo relacionado con Three.js / R3F
│   ├── Viewer.tsx       # <Canvas> y orquestación de la escena
│   ├── BrainModel.tsx   # Carga y presentación del modelo
│   ├── Lighting.tsx     # Iluminación
│   ├── Controls.tsx     # OrbitControls configurados
│   └── loaders/         # Carga de GLB/GLTF + fallback procedural
├── domain/              # Lógica de dominio pura (sin React, sin Three)
│   ├── anatomy/         # Tipos y datos de estructuras anatómicas
│   └── simulation/      # Interfaces/contratos para fases futuras (sin lógica)
├── state/               # Estado global (store ligero)
├── workers/             # Web Workers (andamiaje para simulación)
├── hooks/               # Hooks reutilizables
├── styles/              # CSS global y tokens de diseño
└── types/               # Tipos compartidos
```

## 3. Capas

### 3.1 Dominio (`domain/`)
TypeScript puro. Define `AnatomicalStructure`, el catálogo de estructuras y las
interfaces de simulación (`SimulationEngine`, `SimulationState`). No importa React
ni Three.js. Es la fuente de verdad para la UI y la escena.

### 3.2 Render 3D (`scene/`)
React Three Fiber sobre Three.js. `Viewer` monta el `<Canvas>`, luces, controles y
el modelo. La selección por *raycasting* la gestiona R3F (eventos `onClick` sobre
meshes) y publica el id de estructura al estado.

### 3.3 UI (`components/`)
Cabecera, panel informativo lateral, overlays de carga/error. Consume el estado y
el dominio; no conoce detalles de Three.js.

### 3.4 Estado (`state/`)
Store ligero basado en `useSyncExternalStore` (sin dependencias extra). Mantiene:
estructura seleccionada, estado de carga del modelo, flags de simulación.

### 3.5 Simulación (`domain/simulation/` + `workers/`)
Solo andamiaje en Fase 1: interfaces, un `SimulationBus` (pub/sub) y un worker
esqueleto que responde a `ping`. Documenta que ninguna función cerebral real está
implementada.

## 4. Flujo de selección

1. Usuario hace clic en un mesh del modelo.
2. R3F dispara `onClick` con el `userData.structureId` del mesh.
3. Se actualiza el store (`selectStructure`).
4. El panel lateral reacciona y busca el metadato en el catálogo del dominio.
5. `BrainModel` resalta el mesh seleccionado (emisión de material).

## 5. Rendimiento

- `frameloop="demand"` cuando no hay animación activa.
- Amortiguación en controles; `dpr` limitado a `[1, 2]`.
- Suspense para la carga de modelos; cálculos pesados futuros irán a Web Workers.

## 6. Decisiones (ADR resumidos)

- **R3F en lugar de Three.js imperativo**: integra el ciclo de vida con React,
  simplifica eventos y selección, y reduce código repetitivo. Para render crudo de
  bajo nivel seguimos pudiendo bajar a Three.js dentro de componentes R3F.
- **Store propio con `useSyncExternalStore`**: evita añadir dependencias; el estado
  es pequeño y bien acotado.
- **Fallback procedural**: garantiza que el visualizador funcione sin depender de un
  asset externo, manteniendo la honestidad científica (etiquetado como placeholder).
