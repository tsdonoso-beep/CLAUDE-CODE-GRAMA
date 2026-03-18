# MEGA PROMPT — GRAMA Proyectos Educativos: Plataforma de Capacitación Docente TSF
## Para Claude Code · React + TypeScript + Vite + Tailwind + shadcn/ui

---

## DECISIONES DE PRODUCTO CONFIRMADAS

| Decisión | Valor |
|---|---|
| Nombre de la plataforma | **GRAMA Proyectos Educativos** (sin nombre propio separado) |
| Acceso a la app | **Login UI** — pantalla de login antes de la bienvenida, sin auth real |
| Progreso del docente | **Solo UI** — estados visuales estáticos, sin persistencia |
| Repositorio | **Dentro de cada taller** |
| Módulos LXP | **Nueva estructura M0–M6 completa** |
| Quiz con bloqueo | **Solo UI** — muestra resultado pero no bloquea el avance real |

> **Nota para Claude Code:** Implementa exactamente lo indicado en la tabla. Los puntos de persistencia y auth real se agregarán en una fase posterior.

---

## CONTEXTO DEL PROYECTO

Estás construyendo la **plataforma de capacitación docente de GRAMA Proyectos Educativos**, una LXP (Learning Experience Platform) híbrida para los **9 talleres de Educación Para el Trabajo (EPT)** del programa **MSE-SFT / TSF de MINEDU Perú**.

La plataforma capacita a docentes que recibirán nuevos talleres equipados con 86–177 bienes técnicos (según el taller) y deben implementar el Programa Formativo oficial del MINEDU. La capacitación es de **150 horas en modalidad híbrida**: parte virtual asíncrona (LXP), parte virtual sincrónica (sesiones en vivo) y parte presencial supervisada.

Existe un repositorio anterior (`talleres-especializados-goclaude-main`) con estructura parcial. **No migres ese código directamente.** Úsalo solo como referencia de datos (JSON de bienes, talleresConfig.ts, modulosConfig.ts) y rediseña todo desde cero con arquitectura limpia.

---

## ARCHIVOS DE REFERENCIA QUE DEBES LEER PRIMERO

Antes de escribir una sola línea de código, lee estos archivos en el orden indicado:

```
1. src/data/talleres-bienes.json          → 9 talleres, 86–177 bienes cada uno
2. src/data/talleresConfig.ts             → IDs, slugs, nombres, colores, íconos de los 9 talleres
3. src/data/modulosConfig.ts             → Tipos Modulo, ContenidoItem, SubSeccion, LiveSession
4. GRAMA_Guia_de_marca_2024.pdf         → Design system oficial (CRÍTICO)
```

Los 9 talleres con sus slugs exactos son:
- `mecanica-automotriz` · `industria-vestido` · `cocina-reposteria` · `ebanisteria`
- `computacion-informatica` · `electronica` · `industria-alimentaria` · `electricidad`
- `construcciones-metalicas`

---

## DESIGN SYSTEM — REGLAS ABSOLUTAS (Manual de Marca GRAMA)

### Paleta de colores — Solo estos valores

```css
/* PRIMARIOS */
--grama-oscuro:    #043941;   /* Verde oscuro — fondos principales, sidebar */
--grama-verde:     #00c16e;   /* Verde claro — CTA, progreso, activos */
--grama-menta:     #02d47e;   /* Verde menta — acentos, hovers */
--grama-claro:     #d2ffe1;   /* Verde muy claro — fondos sutiles */

/* SECUNDARIOS */
--grama-cerceta:   #045f6c;   /* Verde cerceta — sidebar hover, accents */
--grama-claro2:    #e3f8fb;   /* Fondo de contenido claro */

/* ACOMPAÑAMIENTO */
--lila-claro:      #e3d8fe;
--lila:            #d4c4fc;
--amarillo:        #f8ee91;
--amarillo-claro:  #fdf8da;

/* NEUTROS */
--blanco:          #ffffff;
--negro:           #000000;
--texto-principal: #043941;   /* Verde oscuro para texto sobre fondos claros */
--texto-secundario:#045f6c;
```

### Tipografía
- **ÚNICA fuente**: `Manrope` (Google Fonts)
- Pesos: ExtraLight (200), Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800)
- Import: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');`
- **Nunca usar**: Inter, Roboto, system-ui como fuente principal

### Sistema gráfico
- Inspirado en el **Tangram**: formas geométricas básicas (triángulos, cuadrados, rombos, círculos)
- Bordes redondeados ligeros en elementos decorativos
- Líneas diagonales y patterns geométricos sutiles como fondos
- El hero de cada sección puede tener el patrón de líneas cruzadas diagonal de la guía
- **No**: gradientes degradados complejos, sombras pesadas, bordes neon

### Logo
- Siempre usar el isotipo o logotipo desde `src/assets/logo-grama.png` (isotipo) y `src/assets/logo-grama-full.png` (completo)
- Sobre fondo oscuro (`#043941`): versión clara del logo
- Área de resguardo mínima alrededor del logo
- Tamaño mínimo: 4cm / 120px de ancho

### Layout general
```
┌─────────────────────────────────────────────────────┐
│  SIDEBAR (240px) │  CONTENIDO PRINCIPAL (flex: 1)   │
│  bg: #043941     │  bg: #ffffff o #e3f8fb           │
│  texto: blanco   │  texto: #043941                  │
└─────────────────────────────────────────────────────┘
```

---

## ARQUITECTURA DE LA APLICACIÓN

### Stack técnico
- React 18 + TypeScript
- Vite como bundler
- Tailwind CSS (con colores GRAMA en tailwind.config)
- shadcn/ui para componentes base
- React Router v6 para navegación
- sessionStorage para flag de login simulado (solo en esta fase)

### Estructura de carpetas

```
src/
├── assets/
│   ├── logo-grama.png          (isotipo)
│   └── logo-grama-full.png     (logo completo)
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx        (sidebar + content wrapper)
│   │   ├── Sidebar.tsx         (navegación lateral)
│   │   └── TopBar.tsx          (breadcrumb + perfil)
│   ├── ui/                     (shadcn/ui — no modificar)
│   ├── lxp/
│   │   ├── ModuloCard.tsx      (tarjeta de módulo en ruta de aprendizaje)
│   │   ├── ContenidoBadge.tsx  (badge de tipo: PDF, VIDEO, QUIZ, EN VIVO)
│   │   ├── ProgressRing.tsx    (anillo de progreso circular)
│   │   ├── QuizBlock.tsx       (componente de quiz con lógica de bloqueo)
│   │   ├── LiveSessionCard.tsx (sesión sincrónica programada)
│   │   └── RepositorioCard.tsx (tarjeta de bien en repositorio)
│   └── hub/
│       └── TallerCard.tsx      (tarjeta de taller en bienvenida)
├── contexts/
│   └── (vacío por ahora — en Fase 2 irá AuthContext + ProgressContext Supabase)
├── data/
│   ├── talleres-bienes.json    (EXISTENTE — no regenerar)
│   ├── talleresConfig.ts       (EXISTENTE — no modificar)
│   ├── modulosLXP.ts           (NUEVO — estructura completa de los 7 módulos LXP)
│   └── repositorioData.ts      (NUEVO — organización de bienes por módulo y habilidad)
├── hooks/
│   └── useTaller.ts            (helper para obtener datos del taller activo)
├── mock/
│   └── mockEstados.ts          (estados estáticos de módulos — se reemplaza en Fase 2)
├── pages/
│   ├── Login.tsx               (pantalla de login — solo UI, credenciales fijas)
│   ├── Bienvenida.tsx          (hub con los 9 talleres — requiere "login")
│   ├── TallerHub.tsx           (dashboard del taller seleccionado)
│   ├── RutaAprendizaje.tsx     (los 7 módulos LXP del taller)
│   ├── ModuloDetalle.tsx       (contenido de un módulo específico)
│   ├── Repositorio.tsx         (biblioteca de recursos del taller)
│   ├── BienDetalle.tsx         (ficha completa de un bien)
│   └── NotFound.tsx
├── styles/
│   └── globals.css             (variables CSS + import Manrope)
├── App.tsx
└── main.tsx
```

### Routing

```typescript
// App.tsx
// NOTA: Login es SOLO UI — no hay auth real.
// Credenciales simuladas hardcodeadas: usuario "docente" / contraseña "grama2024"
// Al hacer "login" exitoso: guarda flag en sessionStorage y redirige a "/"
// Al refrescar: si no hay flag, vuelve a /login

<Routes>
  {/* Pública — siempre accesible */}
  <Route path="/login" element={<Login />} />
  
  {/* Requiere "login" simulado */}
  <Route element={<RequireAuth />}>  {/* solo comprueba sessionStorage flag */}
    <Route path="/" element={<Bienvenida />} />
    
    {/* App con sidebar */}
    <Route element={<AppShell />}>
      <Route path="/taller/:slug" element={<TallerHub />} />
      <Route path="/taller/:slug/ruta" element={<RutaAprendizaje />} />
      <Route path="/taller/:slug/ruta/modulo/:num" element={<ModuloDetalle />} />
      <Route path="/taller/:slug/repositorio" element={<Repositorio />} />
      <Route path="/taller/:slug/repositorio/bien/:id" element={<BienDetalle />} />
    </Route>
  </Route>
  
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## PANTALLAS — ESPECIFICACIÓN DETALLADA

---

### PANTALLA 0: Login (`/login`)

**Propósito**: Puerta de entrada simulada. Solo UI — sin backend real.

**Layout**: Pantalla completa sin sidebar. Fondo `#043941`.

**Secciones**:

1. **Lado izquierdo (desktop)** — 50% del ancho:
   - Fondo `#052e35` con patrón geométrico diagonal GRAMA muy sutil
   - Logo GRAMA completo (versión clara) centrado verticalmente
   - Tagline: "Plataforma de Capacitación Docente"
   - Sub: "Talleres EPT · Programa MSE-SFT · MINEDU Perú"
   - Elemento decorativo: composición geométrica Tangram en verde menta `#02d47e`, opacidad 0.15

2. **Lado derecho (desktop)** — 50% del ancho:
   - Fondo blanco `#ffffff`
   - Centrado verticalmente
   - Título: "Iniciar sesión" (Manrope Bold, `#043941`, ~1.6rem)
   - Subtítulo: "Ingresa tus credenciales para acceder a la plataforma"
   - **Campo email**: label "Correo electrónico", placeholder "docente@grama.pe"
   - **Campo contraseña**: label "Contraseña", tipo password con toggle mostrar/ocultar
   - **Botón "Ingresar"**: fondo `#02d47e`, texto blanco, Manrope Bold, ancho completo
   - **Credenciales válidas hardcodeadas**:
     - Email: `docente@grama.pe` / Contraseña: `grama2024`
     - Al éxito: `sessionStorage.setItem('grama-auth', 'true')` + `navigate('/')`
   - **Estado de error**: si las credenciales no coinciden, mostrar alert rojo "Credenciales incorrectas. Verifica tu correo y contraseña."
   - **Link olvidé mi contraseña**: solo visual, no funciona
   - Texto al pie: "¿Problemas para acceder? Contacta a tu coordinador UGEL"

3. **Mobile**: solo el lado derecho (formulario) sobre fondo `#043941`
   - Logo arriba del formulario

**RequireAuth component**:
```typescript
// src/components/RequireAuth.tsx
import { Navigate, Outlet } from 'react-router-dom'

export function RequireAuth() {
  const isAuth = sessionStorage.getItem('grama-auth') === 'true'
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}
```

---

### PANTALLA 1: Bienvenida (`/`)

> **Requiere login simulado** — protegida por RequireAuth

**Propósito**: Punto de entrada público. El docente selecciona su taller.

**Layout**: Pantalla completa sin sidebar. Fondo `#043941`. Logo GRAMA centrado arriba.

**Secciones**:

1. **Header**
   - Logo GRAMA completo (versión clara) centrado o alineado a la izquierda
   - Subtítulo: "Plataforma de Capacitación Docente · TSF / MSE-SFT · MINEDU"
   - Tipografía: Manrope, color blanco sobre fondo oscuro

2. **Hero text** (centrado)
   - H1: "Capacitación Docente" (Manrope ExtraBold, ~3rem, blanco)
   - H2: "Talleres EPT — Educación Para el Trabajo" (Manrope Light, ~1.2rem, `#02d47e`)
   - Párrafo breve: "Selecciona tu taller para iniciar la ruta de capacitación de 150 horas"

3. **Grid de 9 talleres** (3 columnas en desktop, 1 en mobile)
   
   Cada `TallerCard`:
   - Fondo: `#052e35` (un tono más claro que el background)
   - Borde izquierdo o superior: color único del taller (el `color` de talleresConfig)
   - Ícono del taller (Lucide) en color `#02d47e`
   - Número del taller: "T1", "T2"... en badge pequeño
   - Nombre del taller: Manrope Bold, blanco
   - Descripción breve: Manrope Regular, `rgba(255,255,255,0.6)`, 2 líneas max
   - Número de bienes: pequeño badge inferior `156 bienes`
   - Hover: borde que brilla en `#02d47e`, leve translateY(-2px)
   - Click: navega a `/taller/:slug`

4. **Footer mínimo**: "GRAMA Proyectos Educativos · Programa MSE-SFT MINEDU 2024"

**Elemento decorativo**: patrón geométrico diagonal del sistema gráfico GRAMA en el fondo, muy sutil (`opacity: 0.04`)

---

### PANTALLA 2: Dashboard del Taller (`/taller/:slug`)

**Propósito**: Centro de operaciones del docente para un taller específico.

**Layout**: AppShell con sidebar.

**Sidebar** (240px, fondo `#043941`):
- Logo GRAMA isotipo arriba
- Nombre del taller activo (Manrope SemiBold, `#02d47e`, uppercase pequeño)
- Separador
- Navegación:
  - 🏠 Inicio (TallerHub)
  - 📚 Ruta de Aprendizaje → `/taller/:slug/ruta`
  - 📦 Repositorio → `/taller/:slug/repositorio`
- Separador inferior
- Indicador de progreso global: "X de 7 módulos completados" con barra visual

**Contenido TallerHub**:

1. **Hero del taller**
   - Fondo `#043941` con patrón diagonal
   - Nombre completo del taller (H1, blanco)
   - Descripción del taller (texto de talleresConfig)
   - 3 stats en fila: `7 Módulos` · `150 Horas` · `🎓 Certificación`

2. **Sección "Tu Ruta de Aprendizaje"**
   - Título sección
   - Preview de los 7 módulos en cards horizontales compactas
   - Estado de cada módulo: 🔒 Bloqueado / ⏳ En curso / ✅ Completado
   - CTA: "Ver ruta completa →"

3. **Sección "Repositorio de Recursos"**
   - Estadísticas rápidas: N° de bienes, N° de manuales, N° de videos
   - CTA: "Explorar repositorio →"

4. **Próxima sesión en vivo** (si hay alguna programada)
   - Card con countdown, docente, tema y CTA "Unirse"

---

### PANTALLA 3: Ruta de Aprendizaje (`/taller/:slug/ruta`)

**Propósito**: Vista completa de los 7 módulos LXP con progreso y navegación.

**Esta es la pantalla más importante de la plataforma.**

**Los 7 módulos LXP** (estructura fija para todos los talleres):

```
M0 · Inicio y Diagnóstico               [3h] — Virtual asíncrono + 1h sincrónico
M1 · Seguridad y Arquitectura           [13h] — Virtual + presencial 2h
M2 · Zona de Investigación              [18h] — Virtual + presencial 8h
M3 · Zona de Innovación (Máquinas)      [36h] — Virtual + presencial 22h   ← más denso
M4 · Acabados y Almacén                 [14h] — Virtual + presencial 7h
M5 · Programa Formativo en el Taller    [22h] — Virtual + sincrónico 6h
M6 · Proyecto Integrador                [25h] — Presencial + sincrónico 3h
     Acompañamiento Año 1               [12h] — Sincrónico mensual
```

**Layout de la página**:

1. **Header-hero**: mismo estilo que TallerHub, con breadcrumb
   - Título: "Tu Ruta de Aprendizaje — [Nombre Taller]"
   - Stats: 7 módulos / 150 horas / X sesiones en vivo / 🎓 Certificación

2. **Timeline visual de módulos**
   - Línea vertical conectora entre módulos (estilo timeline)
   - Cada módulo es un `ModuloCard` expandible

   **ModuloCard estructura**:
   ```
   ┌─────────────────────────────────────────────────────┐
   │  [Número]  [Nombre del módulo]          [Horas] [Estado]
   │  [Fase badge]  [Modalidad badges: ASÍNCRONO / SINCRÓNICO / PRESENCIAL]
   │                                                      │
   │  ▼ (expandible)                                      │
   │  Sub-secciones con sus contenidos                    │
   │  Actividad práctica destacada en sidebar verde       │
   │  [Botón: "Ir al módulo →"]                          │
   └─────────────────────────────────────────────────────┘
   ```

   **Estados visuales del módulo**:
   - `locked`: fondo gris, candado, texto "Completa el módulo anterior"
   - `available`: fondo blanco, borde `#02d47e` sutil
   - `in_progress`: borde `#02d47e` activo, badge "En curso"
   - `completed`: fondo `#d2ffe1`, check verde, badge "✅ Completado"

   **Módulo 1 (Seguridad) tiene bloqueo especial**:
   - Quiz de seguridad con mínimo 80% para desbloquear M2 y M3
   - Si no aprueba: banner rojo "Debes aprobar el Quiz de Seguridad (80%) para continuar"

3. **Sidebar derecho (sticky, 280px)** — solo en desktop:
   - Resumen de progreso con ProgressRing
   - Próxima sesión en vivo
   - Módulo actual / siguiente

---

### PANTALLA 4: Detalle de Módulo (`/taller/:slug/ruta/modulo/:num`)

**Propósito**: Contenido completo de un módulo específico.

**Estructura de contenidos por módulo** (data en `modulosLXP.ts`):

Cada módulo tiene `SubSecciones`, cada sub-sección tiene `ContenidoItems`:

```typescript
interface ContenidoItem {
  id: string
  tipo: 'PDF' | 'VIDEO' | 'INTERACTIVO' | 'QUIZ' | 'EN_VIVO' | 'DESCARGABLE'
  titulo: string
  descripcion: string
  duracion?: string          // "45:00" para videos
  paginas?: number           // para PDFs
  preguntas?: number         // para quizzes
  puntajeMinimo?: number     // para quizzes con bloqueo (0-100)
  bloqueaSiguiente?: boolean // si este quiz bloquea el siguiente módulo
  url?: string               // URL del recurso
  completado?: boolean       // FASE 2 — en esta fase no se usa; estado viene de mockEstados.ts
}
```

**ContenidoBadge** por tipo:
- `PDF`: badge azul oscuro `#043941`
- `VIDEO`: badge verde `#00c16e`
- `INTERACTIVO`: badge azul `#0891b2`
- `QUIZ`: badge ámbar `#ca8a04`
- `EN_VIVO`: badge rojo `#ef4444` con punto parpadeante si es live ahora
- `DESCARGABLE`: badge gris `#6b7280`

**Layout del detalle**:
1. Header con nombre del módulo, horas, fase, descripción
2. Lista de sub-secciones expandibles (accordion)
3. Cada ítem: ícono tipo + título + descripción + duración + botón de acción
4. Al hacer clic en un ítem: muestra estado visual ✅ en la sesión actual (no persiste — Fase 2)
5. Quiz con bloqueo real: si `bloqueaSiguiente: true` y `puntajeMinimo: 80`, implementar UI de quiz (4–8 preguntas de opción múltiple), al aprobar desbloquear módulo siguiente

---

### PANTALLA 5: Repositorio (`/taller/:slug/repositorio`)

**Propósito**: Biblioteca completa de recursos técnicos del taller.

**Estructura del repositorio** (basada en los bienes del JSON):

```
Repositorio
├── Manuales de uso (por equipo)
├── Manuales de mantenimiento (por equipo)
├── Manuales pedagógicos (por habilidad)
├── Videos de operatividad (por equipo)
├── Fichas de uso rápido (por proceso)
├── Fichas IPERC (por zona)
└── Material del proveedor
```

**Filtros disponibles**:
- Por zona (Investigación / Innovación / Acabados / Almacén)
- Por tipo de recurso (Manual / Video / Ficha)
- Por habilidad (H1 Diseñar / H2 Maquinar / H3 Dar forma / etc.)
- Buscador por nombre del bien o equipo

**RepositorioCard**:
- Nombre del bien
- Zona y área
- Tipo del bien (EQUIPOS / HERRAMIENTAS / MUEBLES / MATERIAL PEDAGÓGICO)
- Cantidad
- Badges de recursos disponibles: [Manual] [Video] [Ficha IPERC]
- Click → BienDetalle

---

### PANTALLA 6: Detalle de Bien (`/taller/:slug/repositorio/bien/:id`)

**Propósito**: Ficha completa de un bien específico.

**Secciones**:
1. **Header**: nombre, código entidad, código interno, marca, modelo
2. **Información técnica**: descripción completa del JSON
3. **Uso pedagógico**: del JSON
4. **Recursos disponibles** (tabs):
   - Manual de uso (placeholder: "Próximamente — PDF del proveedor")
   - Manual de mantenimiento (placeholder)
   - Manual pedagógico (placeholder)
   - Video de operatividad (placeholder: Vimeo embed vacío con thumbnail gris)
5. **Ficha de uso rápido**: extracto resumido de los procedimientos más frecuentes
6. **EPP requerido**: tabla de equipos de protección según el tipo de bien
7. **Bienes relacionados**: otros equipos de la misma zona

---

## DATA LAYER — `modulosLXP.ts`

Este es el archivo más importante que debes crear. Contiene la estructura completa de los 7 módulos LXP para todos los talleres.

```typescript
// src/data/modulosLXP.ts

export type FaseLXP = 
  | 'diagnostico'
  | 'orientacion' 
  | 'apropiacion'
  | 'aplicacion'
  | 'proyecto'
  | 'acompanamiento'

export type ModalidadContenido = 'asincrono' | 'sincrono' | 'presencial'

export type TipoContenido = 
  | 'VIDEO' 
  | 'PDF' 
  | 'INTERACTIVO' 
  | 'QUIZ' 
  | 'EN_VIVO' 
  | 'DESCARGABLE'
  | 'ACTIVIDAD_PRACTICA'

export interface ContenidoLXP {
  id: string
  tipo: TipoContenido
  modalidad: ModalidadContenido
  titulo: string
  descripcion: string
  duracionMin?: number
  paginas?: number
  preguntas?: number
  puntajeMinimo?: number      // Para QUIZ con bloqueo
  bloqueaSiguiente?: boolean  // true en Quiz de Seguridad del M1
  esActividad?: boolean       // true para actividades prácticas
  recursosRepositorio?: string[] // IDs de bienes relacionados en el repositorio
}

export interface SubSeccionLXP {
  id: string
  numero: string    // "1.1", "1.2", etc.
  titulo: string
  descripcion?: string
  colorAccent: string
  phaseBadge?: string
  contenidos: ContenidoLXP[]
}

export interface ModuloLXP {
  numero: number        // 0–6
  id: string           // "m0", "m1", ... "m6"
  nombre: string
  descripcion: string
  fase: FaseLXP
  horasTotal: number
  horasAsincrono: number
  horasSincrono: number
  horasPresencial: number
  icon: string         // emoji
  colorFase: string    // hex
  requiereAprobacion?: boolean   // Si tiene quiz de bloqueo
  puntajeMinimoAcceso?: number   // Para acceder a módulos siguientes
  subSecciones: SubSeccionLXP[]
}
```

**Implementa los 7 módulos con contenido REAL** basado en el análisis completo de la capacitación:

**M0 — Inicio y Diagnóstico (3h asincrono + 1h sincrono)**
Sub-secciones:
- 0.1 Bienvenida y Pacto de Aprendizaje (VIDEO 10min + PDF descargable Kit del Participante)
- 0.2 Selección de Perfil de Grado (INTERACTIVO — dropdown 1°-5°)
- 0.3 Diagnóstico Situacional Técnico (QUIZ — 8 preguntas situacionales, sin bloqueo)
- 0.4 Diagnóstico Pedagógico (QUIZ — 6 preguntas, sin bloqueo)
- 0.5 Tour Virtual del Taller (VIDEO 360° — 45min)
- 0.6 Sesión Sincrónica de Apertura (EN_VIVO — 60min)

**M1 — Seguridad Integral y Arquitectura (9h asincrono + 2h sincrono + 2h presencial)**
Sub-secciones:
- 1.1 Marco Normativo de Seguridad (PDF 45min — Ley 29783, Manual SSO)
- 1.2 EPP por Proceso (INTERACTIVO — tabla filtrable por equipo/habilidad)
- 1.3 Protocolos de Seguridad Operativa (VIDEO 60min + DESCARGABLE fichas revisión diaria)
- 1.4 Mapa de Seguridad del Taller (INTERACTIVO — mapa editable)
- 1.5 Arquitectura y Zonas del Taller (VIDEO 60min + INTERACTIVO catálogo de bienes)
- 1.6 **Quiz de Seguridad** (QUIZ — 15 preguntas · `puntajeMinimo: 80` · `bloqueaSiguiente: true`)
- 1.7 Sesión Sincrónica Cierre M1 (EN_VIVO — 120min)
- 1.8 Visita de Reconocimiento Presencial (ACTIVIDAD_PRACTICA — 120min · entregable: plano del taller)

**M2 — Zona de Investigación (10h asincrono + 8h presencial)**
Sub-secciones:
- 2.1 Presentación Técnica del Equipamiento (VIDEO por cada equipo: computadora, impresora 3D, pizarra táctil, tablet, cámara fotográfica, filmadora, grabadora)
- 2.2 Software como Herramienta Pedagógica (VIDEO 90min — CAD, diseño gráfico, video)
- 2.3 Los Lienzos Metodológicos en el Aula (VIDEO 60min — Design Thinking, Lean Canvas)
- 2.4 Explorador de Bienes Zona Investigación (INTERACTIVO → vincula al Repositorio)
- 2.5 Quiz Zona Investigación (QUIZ — 10 preguntas · `puntajeMinimo: 75`)
- 2.6 Práctica Presencial S1 — Diseño y Prototipado (ACTIVIDAD_PRACTICA — 240min presencial)
- 2.7 Práctica Presencial S2 — Herramientas de Investigación (ACTIVIDAD_PRACTICA — 240min presencial)

**M3 — Zona de Innovación: Máquinas y Herramientas (14h asincrono + 22h presencial)**
Sub-secciones:
- 3.A Máquinas de Corte y Habilitado (VIDEO — sierra circular, radial, garlopa, regruesadora)
- 3.B Máquinas de Fabricación Digital (VIDEO — cortadora láser, router CNC, impresora 3D)
- 3.C Máquinas de Formado y Armado (VIDEO — sierra cinta, caladora, torno, taladro, enchapadora)
- 3.D Herramientas Manuales (VIDEO — formones, escofinas, tallado)
- 3.E **Quiz Zona Innovación** (QUIZ — 20 preguntas · `puntajeMinimo: 80` · incluye seguridad)
- 3.F Práctica Presencial — Nivel 1 Corte y Habilitado (ACTIVIDAD_PRACTICA — 480min · 2 sesiones)
- 3.G Práctica Presencial — Nivel 1 Digital y Formado (ACTIVIDAD_PRACTICA — 480min · 2 sesiones)
- 3.H Práctica Presencial — Nivel 2 Ensamble (ACTIVIDAD_PRACTICA — 360min)

**M4 — Acabados y Almacén (7h asincrono + 7h presencial)**
Sub-secciones:
- 4.1 Equipamiento de Acabados (VIDEO — lijadoras, compresor, pistola de pintar, cabina)
- 4.2 Fichas de Revisión Diaria (DESCARGABLE — A4 plastificable por equipo crítico)
- 4.3 Gestión del Almacén (VIDEO 90min + PDF manual de organización)
- 4.4 Mantenimiento Preventivo (VIDEO 90min + PDF bitácora del taller)
- 4.5 Quiz Acabados y Almacén (QUIZ — 12 preguntas · `puntajeMinimo: 75`)
- 4.6 Práctica Presencial — Acabado Completo (ACTIVIDAD_PRACTICA — 240min)
- 4.7 Práctica Presencial — Gestión del Taller (ACTIVIDAD_PRACTICA — 180min)

**M5 — Programa Formativo en el Taller (16h asincrono + 6h sincrono)**
Sub-secciones:
- 5.1 El Taller como Espacio de Competencias (VIDEO 60min — inicia con caso práctico)
- 5.2 Las 14 Habilidades desde el Taller (INTERACTIVO — mapa de habilidades + equipos)
- 5.3 El Itinerario y la Progresión del Equipamiento (VIDEO 90min + tabla interactiva)
- 5.4 Planificar con el Equipamiento como Ancla (PDF 120min + plantilla descargable)
- 5.5 Evaluar Competencias en el Taller (VIDEO 90min + instrumentos descargables)
- 5.6 El Módulo de Emprendimiento Integrado (VIDEO 90min)
- 5.7 Sesión Sincrónica 1 — Planificación Colaborativa (EN_VIVO — 120min)
- 5.8 Sesión Sincrónica 2 — Programa con Equipamiento Real (EN_VIVO — 120min)
- 5.9 Sesión Sincrónica 3 — Casos Difíciles de Planificación (EN_VIVO — 120min)
- 5.10 Producción de Planificación del Grado (ACTIVIDAD_PRACTICA — 180min · entregable)

**M6 — Proyecto Integrador (2h asincrono + 3h sincrono + 20h presencial)**
Sub-secciones:
- 6.1 Briefing del Proyecto (PDF 60min + rúbrica descargable)
- 6.2 Sesión Sincrónica Briefing Colectivo (EN_VIVO — 60min)
- 6.3 Sesión Presencial 1 — Diseño y Prototipado (ACTIVIDAD_PRACTICA — 240min)
- 6.4 Sesión Presencial 2 — Habilitado y Maquinado (ACTIVIDAD_PRACTICA — 240min)
- 6.5 Sesión Presencial 3 — Ensamble (ACTIVIDAD_PRACTICA — 240min)
- 6.6 Sesión Presencial 4 — Acabado y Documentación (ACTIVIDAD_PRACTICA — 240min)
- 6.7 Elaboración del Expediente Pedagógico (ACTIVIDAD_PRACTICA — 240min)
- 6.8 Sustentación y Ceremonia de Cierre (EN_VIVO — 120min)

---

## ESTADO DE UI — Sin persistencia (fase 1)

**Decisión confirmada**: No implementar progreso real todavía. Solo UI.

```typescript
// NO crear ProgressContext con localStorage.
// El estado de módulos es visual y estático:

// Cada ModuloCard muestra un estado fijo de ejemplo para que se vea el diseño:
type EstadoModulo = 'disponible' | 'en_curso' | 'completado' | 'bloqueado'

// Estado inicial que debe hardcodearse para que la ruta de aprendizaje se vea bien:
// M0 → 'completado'     (ya pasó el diagnóstico)
// M1 → 'en_curso'       (actualmente en seguridad)
// M2 → 'disponible'     (disponible pero no iniciado)
// M3 → 'bloqueado'      (muestra candado — esperando aprobación de M1)
// M4 → 'bloqueado'
// M5 → 'bloqueado'
// M6 → 'bloqueado'

// ProgressRing muestra "2 de 7 módulos" hardcodeado como ejemplo visual.

// El QuizBlock del M1 Quiz de Seguridad:
// - Muestra las preguntas e interacción
// - Calcula y muestra el resultado (correcto/incorrecto por pregunta)
// - Muestra mensaje de "Aprobado ✅" o "No aprobado ❌"
// - NO modifica el estado de ningún módulo (solo UI)
// - El botón "Continuar al siguiente módulo" siempre está activo

// NOTA PARA FASE 2: cuando se implemente Supabase, reemplazar este estado estático
// con el hook useProgress() que leerá de la base de datos.
```

### RequireAuth — Login simulado

```typescript
// src/components/RequireAuth.tsx
// Solo comprueba: sessionStorage.getItem('grama-auth') === 'true'
// Si no existe → redirect a /login
// Si existe → renderiza <Outlet />

// src/pages/Login.tsx
// Credenciales fijas: usuario "docente@grama.pe" / contraseña "grama2024"
// Al éxito: sessionStorage.setItem('grama-auth', 'true') + navigate('/')
// Al fallar: muestra error "Credenciales incorrectas"
// UI: fondo #043941, logo GRAMA, formulario centrado, botón verde #02d47e
```

---

## COMPONENTES CLAVE — ESPECIFICACIÓN

### `QuizBlock.tsx`
```typescript
// Props
interface QuizBlockProps {
  contenidoId: string
  titulo: string
  preguntas: PreguntaQuiz[]
  puntajeMinimo: number           // ej: 80
  bloqueaSiguiente: boolean
  onAprobado?: () => void
  onReprobado?: () => void
}

interface PreguntaQuiz {
  id: string
  enunciado: string
  opciones: string[]
  correcta: number  // índice 0-based
  explicacion?: string
}
```

**Comportamiento**:
1. Muestra preguntas de a una o todas juntas (preferir todas juntas)
2. Al enviar: calcula puntaje, muestra resultado con feedback por pregunta
3. Si aprueba (>= puntajeMinimo): muestra banner verde "✅ Aprobado" con el puntaje (solo visual, no desbloquea real)
4. Si reprueba: rojo, muestra qué falló, botón "Refuerzo" que lleva al contenido fallado, luego intento 2
5. Tercer intento fallido: badge "Requiere sesión de apoyo con el formador"

### `ProgressRing.tsx`
```typescript
// SVG circular, radio configurable
// Colores GRAMA: track #d2ffe1, fill #02d47e
// Texto central: porcentaje + "completado"
```

### `ModuloCard.tsx`
```typescript
// Expandible accordion
// Estado visual con colores GRAMA
// Muestra sub-secciones con sus contenidos
// Indicador de tiempo total y desglose (A/S/P)
// CTA "Ir al módulo" visible solo si estado !== 'locked'
```

---

## TAILWIND CONFIG — `tailwind.config.ts`

```typescript
// Añadir a theme.extend.colors:
colors: {
  grama: {
    oscuro:   '#043941',
    verde:    '#00c16e',
    menta:    '#02d47e',
    claro:    '#d2ffe1',
    cerceta:  '#045f6c',
    claro2:   '#e3f8fb',
  },
  lila: {
    DEFAULT: '#d4c4fc',
    claro:   '#e3d8fe',
  },
  amarillo: {
    DEFAULT: '#f8ee91',
    claro:   '#fdf8da',
  }
}

// Fuente:
fontFamily: {
  sans: ['Manrope', 'system-ui', 'sans-serif'],
}
```

---

## GLOBALS.CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');

:root {
  --grama-oscuro:   #043941;
  --grama-verde:    #00c16e;
  --grama-menta:    #02d47e;
  --grama-claro:    #d2ffe1;
  --grama-cerceta:  #045f6c;
  --grama-claro2:   #e3f8fb;
}

* { box-sizing: border-box; }

body {
  font-family: 'Manrope', system-ui, sans-serif;
  background: #ffffff;
  color: #043941;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar personalizado */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #e3f8fb; }
::-webkit-scrollbar-thumb { background: #045f6c; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #02d47e; }

/* Patrón geométrico decorativo (Tangram GRAMA) */
.grama-pattern {
  background-image: 
    repeating-linear-gradient(60deg, rgba(2,212,126,0.04) 0, rgba(2,212,126,0.04) 1px, transparent 1px, transparent 55px),
    repeating-linear-gradient(-60deg, rgba(2,212,126,0.04) 0, rgba(2,212,126,0.04) 1px, transparent 1px, transparent 55px);
}
```

---

## PREGUNTAS DE QUIZ — BANCO PARA M1 (SEGURIDAD)

Implementa estas preguntas reales en `modulosLXP.ts` para el Quiz de Seguridad del Módulo 1:

```typescript
const quizSeguridadM1: PreguntaQuiz[] = [
  {
    id: "s1-1",
    enunciado: "Vas a usar la sierra circular para cortar listones de 25mm. Al encenderla notas que la hoja vibra más de lo normal. ¿Qué haces primero?",
    opciones: [
      "La apago y verifico si el disco está bien fijado al eje",
      "Bajo la velocidad y pruebo con una pieza pequeña",
      "Continúo — a veces vibra al inicio y se estabiliza",
      "Llamo al técnico de mantenimiento antes de tocarla"
    ],
    correcta: 0,
    explicacion: "Ante cualquier vibración anormal, la primera acción es apagar la máquina de inmediato. La vibración puede indicar que el disco no está correctamente fijado, lo que representa un riesgo grave de proyección."
  },
  {
    id: "s1-2",
    enunciado: "¿Por qué NO se deben usar guantes de cuero al operar la sierra circular o el torno?",
    opciones: [
      "Porque reducen la sensibilidad del tacto",
      "Porque el tejido puede ser atrapado por la máquina y arrastrar la mano",
      "Porque no están permitidos por el reglamento del taller",
      "Porque son incómodos para trabajos de precisión"
    ],
    correcta: 1,
    explicacion: "Los guantes de tejido o cuero representan un peligro de arrastre en máquinas rotativas. El material puede engancharse y jalar la mano hacia la zona de corte. Para estas máquinas, el EPP correcto son lentes y orejeras, NO guantes."
  },
  {
    id: "s1-3",
    enunciado: "Un estudiante está lijando sin orejeras porque dice que el ruido no le molesta. ¿Cuál es la respuesta correcta?",
    opciones: [
      "Está bien si lo tolera — el daño auditivo depende de la sensibilidad individual",
      "Le digo que use orejeras solo cuando el ruido sea muy alto",
      "Detengo la actividad hasta que use el EPP completo — el daño auditivo acumulativo no se siente hasta que es irreversible",
      "Le pongo orejeras voluntariamente como ejemplo"
    ],
    correcta: 2,
    explicacion: "El daño auditivo por exposición prolongada a ruido industrial es acumulativo e irreversible. El hecho de que 'no moleste' no significa que no dañe. Las orejeras son obligatorias en cualquier operación con maquinaria ruidosa."
  },
  {
    id: "s1-4",
    enunciado: "¿Cuál es el primer paso ANTES de encender cualquier máquina del taller?",
    opciones: [
      "Verificar que el material a cortar esté bien sujeto",
      "Verificar que la guarda de seguridad esté correctamente colocada y en buen estado",
      "Ponerse todos los EPP necesarios",
      "Revisar que no haya estudiantes cerca de la zona de corte"
    ],
    correcta: 1,
    explicacion: "La verificación de la guarda de seguridad es el primer protocolo antes de encender cualquier máquina. Sin guarda, una proyección de material o un contacto accidental puede ser fatal. Los demás pasos también son importantes pero vienen después."
  },
  {
    id: "s1-5",
    enunciado: "¿Qué tipo de extintor se usa en la zona de maquinado (sierra circular, garlopa) ante un incendio de virutas de madera?",
    opciones: [
      "CO₂ (gas carbónico) — clase B y C",
      "PQS (polvo químico seco) — clase ABC",
      "Cualquiera — todos los extintores apagan fuego",
      "Agua — la madera responde bien al agua"
    ],
    correcta: 1,
    explicacion: "Las virutas de madera son un incendio de clase A (sólidos). El extintor PQS (ABC) cubre clase A, B y C, siendo el adecuado para la zona de maquinado. El CO₂ es para clase B y C (líquidos y gases), no para sólidos combustibles."
  },
  {
    id: "s1-6",
    enunciado: "Al aplicar acabado en la cabina de pintura, ¿qué EPP es OBLIGATORIO además del guardapolvo?",
    opciones: [
      "Solo lentes de policarbonato",
      "Mameluco de protección + lentes tipo antiparra + respirador con filtro para vapores",
      "Guantes de cuero + guardapolvo",
      "Orejeras + lentes de policarbonato"
    ],
    correcta: 1,
    explicacion: "Los solventes y vapores de pintura son tóxicos por inhalación y pueden irritar severamente los ojos y la piel. El conjunto mínimo obligatorio es: mameluco de tela microporosa, lentes tipo antiparra (no solo lentes), y respirador con cartucho de vapores orgánicos."
  },
  {
    id: "s1-7",
    enunciado: "¿Qué significa el protocolo LOTO (Lock Out / Tag Out) en el contexto del mantenimiento de máquinas del taller?",
    opciones: [
      "Limpiar y ordenar el taller al terminar la jornada",
      "Bloquear y etiquetar una máquina para que nadie la encienda mientras se hace mantenimiento",
      "Registrar el uso de cada máquina en la bitácora del taller",
      "Cerrar el taller y colocar señal de prohibido el paso"
    ],
    correcta: 1,
    explicacion: "LOTO es el protocolo que protege de arranques accidentales durante el mantenimiento. Se coloca un candado físico en el interruptor y una etiqueta de advertencia. Es obligatorio antes de cualquier intervención en una máquina."
  },
  {
    id: "s1-8",
    enunciado: "Observas que un estudiante usa formones sin guantes. El argumento es que los guantes le quitan precisión. ¿Cuál es la respuesta técnicamente correcta?",
    opciones: [
      "Tiene razón — en trabajos de precisión con formones no se usan guantes",
      "Le exiges guantes de cuero gruesos para mayor protección",
      "Le indicas guantes de cuero resistentes al corte para esta operación específica (a diferencia de las máquinas rotativas)",
      "Es su decisión — cada trabajador gestiona su propio riesgo"
    ],
    correcta: 2,
    explicacion: "Aquí hay una distinción crítica: los guantes de cuero NO se usan en máquinas rotativas (riesgo de arrastre) PERO SÍ se usan en trabajo manual con herramientas de filo como formones, escoplos y cuchillas. Esta distinción debe quedar clara para el docente."
  }
]
```

---

## CONSIDERACIONES DE IMPLEMENTACIÓN

### Lo que Claude Code DEBE hacer

1. **Leer el JSON completo** de bienes antes de construir el Repositorio — los datos están en `talleres-bienes.json`
2. **Usar el color del taller** (`talleresConfig.color` en HSL) como acento visual en todo el dashboard de ese taller
3. **Aplicar Manrope** en absolutamente todos los textos — verificar que el import esté en el HTML y en globals.css
4. **Fondo sidebar siempre `#043941`** — nunca gris, nunca negro puro
5. **Contenido siempre sobre blanco o `#e3f8fb`** — nunca sobre fondo oscuro en el área de contenido
6. **mockEstados.ts** debe exportar el estado inicial hardcodeado de módulos (M0 completado, M1 en curso, M2–M6 bloqueados)
7. **Datos mock** para contenidos multimedia: si no hay URL real, usar placeholder con thumbnail gris y texto "Próximamente"
8. **Responsive**: sidebar colapsa en mobile, grid de talleres va a 1 columna

### Lo que Claude Code NO debe hacer

1. **No usar colores fuera de la paleta GRAMA** — sin azules de shadcn, sin grises genéricos
2. **No usar Inter, Roboto o system fonts** como fuente visible
3. **No crear datos de bienes** — están todos en el JSON, solo léelos y úsalos
4. **No simplificar los 7 módulos** — implementarlos completos con todas las sub-secciones
5. **No implementar auth real ni localStorage** — solo UI simulada en esta fase
6. **No crear un ProgressContext** — el estado de progreso es estático hardcodeado en esta fase
7. **No deshabilitar visualmente el QuizBlock** — debe ser interactivo aunque no guarde estado
8. **No usar el AuthContext de Supabase** — el "login" es solo sessionStorage flag

### Orden de construcción recomendado

```
1.  tailwind.config.ts + globals.css (tokens GRAMA + Manrope)
2.  modulosLXP.ts (data completa de los 7 módulos con estado estático)
3.  Componentes base: ContenidoBadge, ProgressRing, ModuloCard, QuizBlock
4.  AppShell + Sidebar
5.  RequireAuth (guard de sessionStorage)
6.  Login (/login) — solo UI, credenciales fijas
7.  Bienvenida (/) — grid 9 talleres
8.  TallerHub (/taller/:slug)
9.  RutaAprendizaje (/taller/:slug/ruta) con estados estáticos de ejemplo
10. ModuloDetalle (/taller/:slug/ruta/modulo/:num) con QuizBlock UI
11. Repositorio (/taller/:slug/repositorio) usando datos del JSON
12. BienDetalle (/taller/:slug/repositorio/bien/:id)
13. Revisión de consistencia visual GRAMA en todas las páginas
```

---

## NOTAS FINALES PARA CLAUDE CODE

Este proyecto tiene análisis pedagógico profundo detrás. Los 7 módulos no son arbitrarios — son el resultado de un análisis completo del Programa Formativo TSF de MINEDU, el catálogo de 156 equipos del taller de Ebanistería, y observaciones reales de docentes. Mantén la integridad de esa estructura.

El JSON `talleres-bienes.json` tiene datos reales validados de los 9 talleres con entre 86 y 177 bienes cada uno. Úsalos como fuente de verdad para el Repositorio — no inventes nombres de equipos.

La guía de marca GRAMA es el Design System. Cada decisión visual debe poder justificarse con ella. Si hay duda entre dos opciones de color, siempre gana `#043941` para fondos oscuros y `#02d47e` para acentos activos.

La plataforma será usada por docentes peruanos en instituciones educativas públicas con conexiones de internet variables. Prioriza performance: lazy loading en todas las páginas, imágenes con fallbacks, y que la navegación básica funcione aunque fallen los recursos multimedia.


---

## HOJA DE RUTA — FASES FUTURAS (no implementar ahora)

Esta sección documenta lo que viene en fases posteriores para que Claude Code diseñe la arquitectura pensando en esas extensiones, sin implementarlas.

### Fase 2 — Persistencia real (Supabase)
- Reemplazar sessionStorage por Supabase Auth (email/password)
- Crear tabla `progreso_docente` con: user_id, taller_slug, contenido_id, completado, puntaje_quiz, timestamp
- Reemplazar estados estáticos de ModuloCard con datos reales de la tabla
- El ProgressRing mostrará porcentaje real calculado desde Supabase
- **Cambio de código mínimo**: solo reemplazar el guard RequireAuth y crear hook useProgress()

### Fase 3 — Videos y contenido real
- Integración con Vimeo: reemplazar placeholders con VimeoPlayer component
- PDFs: visor integrado con react-pdf
- Interactivos: tour 3D del taller (ya existe `tour-3d_automotriz.html` en el repo anterior)
- El repositorio mostrará recursos reales vinculados a cada bien

### Fase 4 — Acompañamiento post-capacitación
- Foro por grado (comentarios en cada módulo)
- Sección "Aportes de docentes" con sistema de validación
- Sesiones sincrónicas integradas con Zoom/Meet via embed
- Notificaciones de próximas sesiones en vivo

### Notas de arquitectura para el dev
- Mantener `modulosLXP.ts` como única fuente de verdad de la estructura de módulos
- Todos los IDs de contenido deben ser estables y únicos — serán las PKs en Supabase
- Los estados estáticos hardcodeados deben vivir en un archivo separado `mockEstados.ts` para fácil remoción en Fase 2
- El componente QuizBlock ya debe tener la firma correcta para recibir onAprobado/onReprobado callbacks — en Fase 2 esos callbacks escribirán a Supabase
