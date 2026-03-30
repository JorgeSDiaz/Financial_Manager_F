import { useState, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

export interface CurrencyOption {
  code: string;
  label: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: 'COP', label: 'Peso colombiano' },
  { code: 'USD', label: 'Dólar estadounidense' },
  { code: 'MXN', label: 'Peso mexicano' },
  { code: 'EUR', label: 'Euro' },
  { code: 'BRL', label: 'Real brasileño' },
];

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

// Formats a raw numeric string with thousand separators: "374510.21" → "374,510.21"
function formatThousands(raw: string): string {
  if (!raw) return '';
  const [intPart, decPart] = raw.split('.');
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decPart !== undefined ? `${formatted}.${decPart}` : formatted;
}

// Strips formatting characters to get the raw value
function stripFormatting(formatted: string): string {
  return formatted.replace(/,/g, '');
}

// After reformatting, finds where the cursor should be based on
// how many real digits were before the cursor in the old formatted string
function getNewCursorPos(newFormatted: string, digitsBeforeCursor: number): number {
  let digits = 0;
  for (let i = 0; i < newFormatted.length; i++) {
    if (newFormatted[i] !== ',') digits++;
    if (digits === digitsBeforeCursor) return i + 1;
  }
  return newFormatted.length;
}

export function CurrencyInput({
  label,
  value,
  onChange,
  currency,
  onCurrencyChange,
  error,
  placeholder = '0.00',
  className = '',
}: CurrencyInputProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];
  const displayValue = formatThousands(value);

  useClickOutside(containerRef, () => setDropdownOpen(false), dropdownOpen);

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputEl = e.target;
    const cursorPos = inputEl.selectionStart ?? 0;
    const rawInput = inputEl.value;

    // Count real (non-separator) characters before cursor in current input
    const digitsBeforeCursor = rawInput.slice(0, cursorPos).replace(/,/g, '').length;

    // Strip separators and validate: only digits + one decimal point + max 2 decimal places
    const stripped = stripFormatting(rawInput);
    const parts = stripped.split('.');
    if (parts.length > 2) return; // more than one decimal point — ignore

    const intPart = parts[0];
    const decPart = parts[1];

    // Only allow digits
    if (!/^\d*$/.test(intPart)) return;
    if (decPart !== undefined && (!/^\d*$/.test(decPart) || decPart.length > 2)) return;

    const clean = decPart !== undefined ? `${intPart}.${decPart}` : intPart;
    onChange(clean);

    // Restore cursor after React re-renders with the new formatted value
    requestAnimationFrame(() => {
      if (!inputRef.current) return;
      const newFormatted = formatThousands(clean);
      const newPos = getNewCursorPos(newFormatted, digitsBeforeCursor);
      inputRef.current.setSelectionRange(newPos, newPos);
    });
  }

  const borderClass = error
    ? 'border-danger focus-within:ring-2 focus-within:ring-danger'
    : 'border-[var(--color-card-border)] focus-within:ring-2 focus-within:ring-primary-600';

  return (
    <div className={`flex flex-col gap-1 ${className}`} ref={containerRef}>
      <label className="text-sm font-medium text-text-primary">{label}</label>

      <div className="relative">
        <div
          className={`flex items-center rounded-lg border bg-white dark:bg-[var(--color-card)] transition-colors duration-200 focus-within:border-transparent ${borderClass}`}
        >
          {/* Currency selector trigger */}
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary border-r border-[var(--color-card-border)] hover:text-text-primary hover:bg-primary/5 rounded-l-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-600 select-none flex-shrink-0"
          >
            <span>{selected.code}</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              strokeWidth={2}
            />
          </button>

          {/* $ prefix + amount */}
          <div className="flex items-center flex-1 px-3 gap-1">
            <span className="text-sm font-medium text-text-secondary select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              inputMode="decimal"
              value={displayValue}
              onChange={handleAmountChange}
              placeholder={placeholder}
              className="flex-1 py-2 bg-transparent text-text-primary text-sm focus:outline-none tabular-nums"
            />
          </div>
        </div>

        {/* Currency dropdown */}
        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-1 z-20 bg-white dark:bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-lg shadow-xl overflow-hidden animate-fade-in-up min-w-[200px]">
            {CURRENCIES.map((c) => {
              const isSelected = c.code === currency;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onCurrencyChange(c.code);
                    setDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 text-sm text-left flex items-center gap-3 transition-colors duration-150 ${
                    isSelected
                      ? 'bg-primary/10 text-primary dark:text-primary-300'
                      : 'text-text-primary hover:bg-primary/5'
                  }`}
                >
                  <span className="font-medium w-8">{c.code}</span>
                  <span className="text-text-secondary flex-1">{c.label}</span>
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
