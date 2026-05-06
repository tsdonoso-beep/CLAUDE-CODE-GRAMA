# Contexto: Tarea de diseño visual / UI

Estoy trabajando en **GRAMA LXP** (React + TypeScript + Tailwind).

## Reglas de diseño del sistema
- Colores primarios: `#043941` (oscuro), `#02d47e` (menta/acento), `#045f6c` (texto secundario)
- Fondos de card: `#fafffe`, bordes `#e3f8fb`
- Bordes redondeados: `rounded-xl` (cards), `rounded-2xl` (modales)
- Tipografía: `font-bold` para títulos, `text-sm` para cuerpo, `text-xs` para metadata
- Modales: `fixed inset-0 z-50 flex items-center justify-center`, fondo `rgba(4,57,65,0.6)` con `backdropFilter: blur(4px)`
- Header de modal: background `#043941`, texto blanco
- Botón primario: background `#02d47e`, texto `#043941`, `font-bold`
- Botón secundario: borde `#e3f8fb`, texto `var(--grama-oscuro)`
- Estado completado: borde/texto `#02d47e`, fondo `rgba(2,212,126,0.12)`
- No usar clases de color de Tailwind para los colores de marca — usar inline style

## Archivos de referencia para patrones UI
- `src/components/lxp/EPPSelectorModal.tsx` — patrón de modal completo
- `src/components/lxp/ModuloCard.tsx` — patrón de card con progreso
- `src/pages/ModuloDetalle.tsx` — layout general de página LXP

## Indica qué quieres cambiar o crear visualmente.
