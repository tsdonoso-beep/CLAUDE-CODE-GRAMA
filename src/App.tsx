// src/App.tsx
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { RequireAuth } from "@/components/RequireAuth"
import { RequireAdmin } from "@/components/RequireAdmin"
import { AuthProvider } from "@/contexts/AuthContext"
import { ProgressProvider } from "@/contexts/ProgressContext"
import { ErrorBoundary } from "@/components/ErrorBoundary"

// ── Pages (lazy loaded) ────────────────────────────────────────────────────
const Landing        = lazy(() => import("./pages/Landing"))
const TallerPreview   = lazy(() => import("./pages/TallerPreview"))
const Login           = lazy(() => import("./pages/Login"))
const Bienvenida      = lazy(() => import("./pages/Bienvenida"))
const TallerHub       = lazy(() => import("./pages/TallerHub"))
const RutaAprendizaje = lazy(() => import("./pages/RutaAprendizaje"))
const ModuloDetalle   = lazy(() => import("./pages/ModuloDetalle"))
const Repositorio     = lazy(() => import("./pages/Repositorio"))
const BienDetalle     = lazy(() => import("./pages/BienDetalle"))
const Admin           = lazy(() => import("./pages/Admin"))
const NotFound        = lazy(() => import("./pages/NotFound"))

const queryClient = new QueryClient()

function PageFallback() {
  return (
    <div
      className="flex-1 flex items-center justify-center h-screen"
      style={{ background: '#043941' }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-8 w-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#02d47e', borderTopColor: 'transparent' }}
        />
        <span className="text-xs font-semibold" style={{ color: '#02d47e' }}>
          Cargando…
        </span>
      </div>
    </div>
  )
}

function wrap(Page: React.LazyExoticComponent<() => JSX.Element>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Page />
    </Suspense>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProgressProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ErrorBoundary>
              <Routes>
                {/* ── Públicas ── */}
                <Route path="/" element={wrap(Landing)} />
                <Route path="/taller/:slug/preview" element={wrap(TallerPreview)} />
                <Route path="/login" element={wrap(Login)} />

                {/* ── Requiere autenticación ── */}
                <Route element={<RequireAuth />}>
                  {/* Hub: sin sidebar */}
                  <Route path="/hub" element={wrap(Bienvenida)} />

                  {/* App con sidebar */}
                  <Route element={<AppShell />}>
                    <Route path="/taller/:slug"                        element={wrap(TallerHub)} />
                    <Route path="/taller/:slug/ruta"                   element={wrap(RutaAprendizaje)} />
                    <Route path="/taller/:slug/ruta/modulo/:num"       element={wrap(ModuloDetalle)} />
                    <Route path="/taller/:slug/repositorio"            element={wrap(Repositorio)} />
                    <Route path="/taller/:slug/repositorio/bien/:id"   element={wrap(BienDetalle)} />
                  </Route>

                  {/* ── Solo admin ── */}
                  <Route element={<RequireAdmin />}>
                    <Route path="/admin" element={wrap(Admin)} />
                  </Route>
                </Route>

                {/* ── 404 ── */}
                <Route path="*" element={wrap(NotFound)} />
              </Routes>
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </ProgressProvider>
    </AuthProvider>
  </QueryClientProvider>
)

export default App
