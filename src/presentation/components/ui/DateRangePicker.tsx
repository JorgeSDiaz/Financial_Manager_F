import { DateInput } from './DateInput';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = '',
}: DateRangePickerProps) {
  function toDateString(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  function setThisMonth() {
    const now = new Date();
    onStartDateChange(toDateString(new Date(now.getFullYear(), now.getMonth(), 1)));
    onEndDateChange(toDateString(new Date(now.getFullYear(), now.getMonth() + 1, 0)));
  }

  function setLastMonth() {
    const now = new Date();
    onStartDateChange(toDateString(new Date(now.getFullYear(), now.getMonth() - 1, 1)));
    onEndDateChange(toDateString(new Date(now.getFullYear(), now.getMonth(), 0)));
  }

  function setLast7Days() {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);
    onStartDateChange(toDateString(start));
    onEndDateChange(toDateString(end));
  }

  const presetButtonClass =
    'px-2 py-1 text-xs rounded-md border border-[var(--color-card-border)] text-text-secondary hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors';

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-col gap-2">
        <DateInput label="Desde" value={startDate} onChange={onStartDateChange} />
        <DateInput label="Hasta" value={endDate} onChange={onEndDateChange} />
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        <button type="button" className={presetButtonClass} onClick={setThisMonth}>
          Este mes
        </button>
        <button type="button" className={presetButtonClass} onClick={setLastMonth}>
          Mes anterior
        </button>
        <button type="button" className={presetButtonClass} onClick={setLast7Days}>
          Últimos 7 días
        </button>
      </div>
    </div>
  );
}
