import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          color: 'var(--text, #ffffff)'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.8rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: 'var(--text-muted, #a3a3a3)', maxWidth: '480px', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            An unexpected error occurred while rendering this view. Your progress and saved notes remain safe.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '0.65rem 1.4rem',
              backgroundColor: 'var(--accent, #6366f1)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

