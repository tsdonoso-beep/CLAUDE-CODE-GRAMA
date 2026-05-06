import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary";

// ErrorBoundary externo: atrapa errores en AuthProvider / ProgressProvider
// que el ErrorBoundary interno (dentro de BrowserRouter) no puede capturar
createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
