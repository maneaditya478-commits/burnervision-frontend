import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[BurnerVision] Uncaught error captured by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="glass-card max-w-lg w-full p-8 rounded-2xl border border-rose-500/40 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-lg font-bold text-slate-100">
              Inspection Report Rendering Issue
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              An unexpected error occurred while rendering the condition assessment report.
            </p>
            {this.state.error?.message && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-rose-300 text-left overflow-x-auto">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg inline-flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Return & Try Again</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
