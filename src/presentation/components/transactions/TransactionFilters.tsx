import { DateRangePicker, Select } from '../ui';
import type { SelectOption } from '../ui';
import type { Account, Category } from '../../../domain/entities';

interface TransactionFiltersProps {
  dateStart: string;
  dateEnd: string;
  accountId: string;
  categoryId: string;
  typeFilter: '' | 'income' | 'expense';
  onDateStartChange: (date: string) => void;
  onDateEndChange: (date: string) => void;
  onAccountChange: (accountId: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onTypeFilterChange: (type: '' | 'income' | 'expense') => void;
  onClearFilters: () => void;
  accounts: Account[];
  categories: Category[];
  hasActiveFilters: boolean;
}

export function TransactionFilters({
  dateStart,
  dateEnd,
  accountId,
  categoryId,
  typeFilter,
  onDateStartChange,
  onDateEndChange,
  onAccountChange,
  onCategoryChange,
  onTypeFilterChange,
  onClearFilters,
  accounts,
  categories,
  hasActiveFilters,
}: TransactionFiltersProps) {
  const accountOptions: SelectOption[] = [
    { value: '', label: 'Todas las cuentas' },
    ...accounts.map((a) => ({ value: a.id, label: a.name })),
  ];

  const filteredCategories = typeFilter
    ? categories.filter((c) => c.type === typeFilter)
    : categories;

  const categoryOptions: SelectOption[] = [
    { value: '', label: 'Todas las categorías' },
    ...filteredCategories.map((c) => ({ value: c.id, label: c.name })),
  ];

  const typeToggleBase =
    'px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600';
  const typeActive = 'bg-primary text-white border-primary';
  const typeInactive =
    'border-[var(--color-card-border)] text-text-secondary hover:text-text-primary hover:bg-primary/5';

  return (
    <div className="rounded-xl border border-[var(--color-card-border)] bg-white dark:bg-[var(--color-card)] p-4 mb-4">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        {/* Date range */}
        <DateRangePicker
          startDate={dateStart}
          endDate={dateEnd}
          onStartDateChange={onDateStartChange}
          onEndDateChange={onDateEndChange}
        />

        {/* Account + Category selects */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1 min-w-0">
          <Select
            label="Cuenta"
            options={accountOptions}
            value={accountId}
            onChange={onAccountChange}
            className="min-w-[160px]"
          />
          <Select
            label="Categoría"
            options={categoryOptions}
            value={categoryId}
            onChange={onCategoryChange}
            className="min-w-[160px]"
          />
        </div>

        {/* Type toggle */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-text-primary">Tipo</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={`${typeToggleBase} ${typeFilter === '' ? typeActive : typeInactive}`}
              onClick={() => onTypeFilterChange('')}
            >
              Todos
            </button>
            <button
              type="button"
              className={`${typeToggleBase} ${typeFilter === 'income' ? 'bg-emerald-600 text-white border-emerald-600' : typeInactive}`}
              onClick={() => onTypeFilterChange('income')}
            >
              Ingresos
            </button>
            <button
              type="button"
              className={`${typeToggleBase} ${typeFilter === 'expense' ? 'bg-danger text-white border-danger' : typeInactive}`}
              onClick={() => onTypeFilterChange('expense')}
            >
              Gastos
            </button>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-[var(--color-card-border)]">
          <button
            type="button"
            onClick={onClearFilters}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
