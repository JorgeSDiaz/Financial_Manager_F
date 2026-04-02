import { useState } from 'react';
import { FileSpreadsheet, FileJson, FileText, Loader2, Download } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { exportCsv, exportJson, exportPdf } from '../../infrastructure/api/exportService';

function triggerDownload(content: string | Blob, filename: string, mimeType: string) {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

interface ExportCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonLabel: string;
  loadingLabel: string;
  onExport: () => Promise<void>;
  className?: string;
}

function ExportCard({
  icon: Icon,
  title,
  description,
  buttonLabel,
  loadingLabel,
  onExport,
  className = '',
}: ExportCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setIsLoading(true);
    setError(null);
    try {
      await onExport();
    } catch {
      setError('Ocurrió un error al generar el archivo. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
          <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <p className="text-sm text-text-secondary mt-0.5">{description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <Button onClick={handleClick} disabled={isLoading} className="w-full justify-center">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {loadingLabel}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              {buttonLabel}
            </span>
          )}
        </Button>
        {error && (
          <p className="text-xs text-danger bg-danger/10 rounded-lg px-3 py-2">{error}</p>
        )}
      </div>
    </Card>
  );
}

export function Export() {
  async function handleCsv() {
    const content = await exportCsv();
    triggerDownload(content, 'transacciones.csv', 'text/csv');
  }

  async function handleJson() {
    const content = await exportJson();
    triggerDownload(content, 'backup.json', 'application/json');
  }

  async function handlePdf() {
    const blob = await exportPdf();
    triggerDownload(blob, 'reporte.pdf', 'application/pdf');
  }

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Exportar datos</h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Descarga tus datos financieros en el formato que prefieras
          </p>
        </div>

        {/* Export cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ExportCard
            icon={FileSpreadsheet}
            title="CSV"
            description="Todas las transacciones en formato de hoja de cálculo, compatible con Excel y Google Sheets."
            buttonLabel="Descargar CSV"
            loadingLabel="Generando..."
            onExport={handleCsv}
            className="animate-fade-in-up [animation-delay:0ms]"
          />
          <ExportCard
            icon={FileJson}
            title="JSON"
            description="Backup completo de la aplicación con cuentas, categorías y transacciones en formato JSON."
            buttonLabel="Descargar JSON"
            loadingLabel="Generando..."
            onExport={handleJson}
            className="animate-fade-in-up [animation-delay:75ms]"
          />
          <ExportCard
            icon={FileText}
            title="PDF"
            description="Reporte mensual con resumen de ingresos, gastos y balance general."
            buttonLabel="Generar PDF"
            loadingLabel="Generando..."
            onExport={handlePdf}
            className="animate-fade-in-up [animation-delay:150ms] sm:col-span-2"
          />
        </div>
      </div>
    </div>
  );
}
