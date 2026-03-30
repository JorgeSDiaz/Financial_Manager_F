import { useState, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

export function Select({ label, options, value, onChange, error, className = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false), isOpen);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';
  const borderClass = error ? 'border-danger' : 'border-[var(--color-card-border)]';

  return (
    <div className={`flex flex-col gap-1 ${className}`} ref={ref}>
      <label className="text-sm font-medium text-text-primary">{label}</label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full px-3 py-2 rounded-lg border bg-white dark:bg-[var(--color-card)] text-text-primary text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent flex items-center justify-between gap-2 ${borderClass}`}
        >
          <span>{selectedLabel}</span>
          <ChevronDown
            className={`w-4 h-4 text-text-secondary flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            strokeWidth={1.5}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white dark:bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-lg shadow-xl overflow-hidden animate-fade-in-up">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => { onChange(option.value); setIsOpen(false); }}
                  className={`w-full px-3 py-2.5 text-sm text-left flex items-center justify-between transition-colors duration-150 ${
                    isSelected
                      ? 'bg-primary/10 text-primary dark:text-primary-300'
                      : 'text-text-primary hover:bg-primary/5'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
