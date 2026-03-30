import { AlertCircle, Loader2 } from 'lucide-react';

interface DashboardErrorProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

export function DashboardError({ onRetry, isRetrying = false }: DashboardErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <AlertCircle className="w-10 h-10 text-danger" strokeWidth={1.5} />
      <div>
        <p className="text-base font-semibold text-text-primary">No se pudo conectar al servidor</p>
        <p className="text-sm text-text-secondary mt-1">Verifica que el backend esté corriendo</p>
      </div>
      <button
        onClick={onRetry}
        disabled={isRetrying}
        className="mt-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 flex items-center gap-2"
      >
        {isRetrying && <Loader2 className="w-4 h-4 animate-spin" />}
        {isRetrying ? 'Reintentando…' : 'Reintentar'}
      </button>
    </div>
  );
}
