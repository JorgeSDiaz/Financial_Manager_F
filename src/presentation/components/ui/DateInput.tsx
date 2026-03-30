import { useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const YEAR_OPTIONS = (() => {
  const current = new Date().getFullYear();
  return Array.from({ length: 12 }, (_, i) => current + 1 - i).map((y) => ({
    value: y,
    label: String(y),
  }));
})();

function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

interface DropdownSelectProps {
  value: number; // 0 = unset
  placeholder: string;
  options: { value: number; label: string }[];
  onChange: (value: number) => void;
  className?: string;
}

function DropdownSelect({ value, placeholder, options, onChange, className = '' }: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false), isOpen);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-3 py-2 rounded-lg border border-[var(--color-card-border)] bg-white dark:bg-[var(--color-card)] text-text-primary text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent flex items-center justify-between gap-1"
      >
        <span className={value ? 'text-text-primary' : 'text-text-secondary'}>
          {value ? selectedLabel : placeholder}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-text-secondary flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white dark:bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-lg shadow-xl overflow-y-auto max-h-48 animate-fade-in-up">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => { onChange(option.value); setIsOpen(false); }}
                className={`w-full px-3 py-2 text-sm text-left flex items-center justify-between transition-colors duration-150 ${
                  isSelected
                    ? 'bg-primary/10 text-primary dark:text-primary-300'
                    : 'text-text-primary hover:bg-primary/5'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-3 h-3 flex-shrink-0" strokeWidth={2} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface DateInputProps {
  label?: string;
  value: string; // YYYY-MM-DD or ''
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

export function DateInput({ label, value, onChange, error, className = '' }: DateInputProps) {
  const parts = value ? value.split('-') : [];
  const year = parts[0] ? parseInt(parts[0], 10) : 0;
  const month = parts[1] ? parseInt(parts[1], 10) : 0; // 1-12
  const day = parts[2] ? parseInt(parts[2], 10) : 0;

  const maxDay = year && month ? daysInMonth(month, year) : 31;

  const dayOptions = Array.from({ length: maxDay }, (_, i) => ({
    value: i + 1,
    label: String(i + 1).padStart(2, '0'),
  }));

  const monthOptions = MONTHS.map((name, i) => ({ value: i + 1, label: name }));

  function emit(d: number, m: number, y: number) {
    if (d && m && y) {
      onChange(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
    } else {
      onChange('');
    }
  }

  function handleDay(d: number) {
    emit(d, month, year);
  }

  function handleMonth(m: number) {
    const newMax = year ? daysInMonth(m, year) : 31;
    const clampedDay = day > newMax ? newMax : day;
    emit(clampedDay, m, year);
  }

  function handleYear(y: number) {
    emit(day, month, y);
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
      <div className="flex items-center gap-1.5">
        <DropdownSelect
          value={day}
          placeholder="Día"
          options={dayOptions}
          onChange={handleDay}
          className="w-20"
        />
        <DropdownSelect
          value={month}
          placeholder="Mes"
          options={monthOptions}
          onChange={handleMonth}
          className="flex-1"
        />
        <DropdownSelect
          value={year}
          placeholder="Año"
          options={YEAR_OPTIONS}
          onChange={handleYear}
          className="w-24"
        />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
