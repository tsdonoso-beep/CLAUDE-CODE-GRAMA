// src/components/ErrorBoundary.tsx
import { Component, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props { children: ReactNode }
interface State { hasError: boolean; message: string }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div
        className="flex flex-col items-center justify-center h-screen gap-5 px-6"
        style={{ background: '#043941' }}
      >
        <div
          className="h-16 w-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(239,68,68,0.15)' }}
        >
          <AlertTriangle size={28} style={{ color: '#ef4444' }} />
        </div>
        <div className="text-center">
          <p className="text-lg font-extrabold text-white mb-1">Algo salió mal</p>
          <p className="text-sm max-w-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Ocurrió un error inesperado. Por favor recarga la página para continuar.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-80"
          style={{ background: '#02d47e', color: '#043941' }}
        >
          Recargar página
        </button>
      </div>
    )
  }
}
