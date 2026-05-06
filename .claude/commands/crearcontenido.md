# Contexto: Crear contenido LXP (quizzes, descargables, interactivos)

Estoy trabajando en **GRAMA LXP** — taller activo: **mecanica-automotriz**.

## Tipos de contenido y sus archivos

### Quiz bank
- Archivo: `src/data/quizBancosMeca.ts`
- Tipo: `Record<string, PreguntaQuiz[]>`
- Import: `import type { PreguntaQuiz } from '@/data/modulosLXP'`
- Estructura por pregunta:
```ts
{
  id: "m0-s03-1",
  enunciado: "¿...?",
  opciones: ["A", "B", "C", "D"],
  correcta: 0,  // índice 0-3
  explicacion: "Porque..."
}
```
- Wiring en ModuloDetalle.tsx: buscar `quizBancosMeca[contenido.id]` cuando `slug === 'mecanica-automotriz'`

### Descargable
- Archivo: `src/data/descargablesMeca.ts`
- Tipos: `DescargableLXP`, `SeccionFicha`, `CampoFicha` — importar desde `@/data/descargablesLXP`
- Tipo de campo: `'texto'|'check'|'fecha'|'numero'|'select'|'area'|'firma'`
- Luego agregar `descargableId` al contenido correspondiente en `modulosLXP.ts`
- Y agregar el objeto al array `descargablesLXP` en `descargablesLXP.ts`

### Interactivo (modal)
- Carpeta: `src/components/lxp/interactivos/`
- Patrón base: `EPPSelectorModal.tsx`
- Props: `{ onClose: () => void, onComplete: () => void }`
- Siempre: `useEscapeKey(onClose)`, header `#043941`, acento `#02d47e`
- Registrar en `ModuloDetalle.tsx`: agregar estado, import, handler en `handleOpenContent`, y render del modal

## IDs de contenido automotriz pendientes
Ver CLAUDE.md sección "Pendientes automotriz" para lista completa.

## Indica qué quieres crear y para qué ID de contenido.
