import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
  readonly fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  readonly error: Error | null;
}

/**
 * Límite de error de React. Evita que un fallo de render (p. ej. del lienzo WebGL)
 * derribe toda la aplicación y ofrece una vía de recuperación.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[NEUROVERSE] Error capturado por ErrorBoundary:', error, info);
  }

  private reset = (): void => this.setState({ error: null });

  render(): ReactNode {
    const { error } = this.state;
    if (error) {
      if (this.props.fallback) return this.props.fallback(error, this.reset);
      return (
        <div className="nv-overlay error">
          <div className="nv-card">
            <h2 style={{ marginTop: 0 }}>Se produjo un error</h2>
            <p style={{ color: 'var(--nv-text-dim)' }}>{error.message}</p>
            <button
              onClick={this.reset}
              style={{
                marginTop: 12,
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid var(--nv-panel-border)',
                background: 'transparent',
                color: 'var(--nv-text)',
                cursor: 'pointer',
              }}
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
