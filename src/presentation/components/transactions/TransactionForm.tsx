import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button, Input, Select, CurrencyInput, DateInput } from '../ui';
import type { SelectOption } from '../ui';
import type { Account, Category, Transaction, CreateTransactionPayload } from '../../../domain/entities';

interface TransactionFormProps {
  transaction?: Transaction;
  defaultType?: 'income' | 'expense';
  accounts: Account[];
  categories: Category[];
  onSubmit: (payload: CreateTransactionPayload) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  mutationError?: string | null;
}

export function TransactionForm({
  transaction,
  defaultType = 'expense',
  accounts,
  categories,
  onSubmit,
  onCancel,
  isSubmitting = false,
  mutationError,
}: TransactionFormProps) {
  const [type, setType] = useState<'income' | 'expense'>(
    transaction?.type ?? defaultType
  );
  const [accountId, setAccountId] = useState(transaction?.accountId ?? accounts[0]?.id ?? '');
  const [categoryId, setCategoryId] = useState(transaction?.categoryId ?? '');
  const [amount, setAmount] = useState(transaction ? String(transaction.amount) : '');
  const [currency, setCurrency] = useState(() => {
    const acc = accounts.find((a) => a.id === (transaction?.accountId ?? accounts[0]?.id));
    return acc?.currency ?? 'MXN';
  });
  const [description, setDescription] = useState(transaction?.description ?? '');
  const [date, setDate] = useState(
    transaction?.date ?? new Date().toISOString().slice(0, 10)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset category when type changes if it doesn't match
  useEffect(() => {
    if (categoryId) {
      const cat = categories.find((c) => c.id === categoryId);
      if (cat && cat.type !== type) {
        setCategoryId('');
      }
    }
  }, [type, categories, categoryId]);

  // Update currency when account changes
  function handleAccountChange(id: string) {
    setAccountId(id);
    const acc = accounts.find((a) => a.id === id);
    if (acc) setCurrency(acc.currency);
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!accountId) next.accountId = 'Selecciona una cuenta';
    if (!categoryId) next.categoryId = 'Selecciona una categoría';
    if (!amount || parseFloat(amount) <= 0) next.amount = 'El monto debe ser mayor a 0';
    if (!date) next.date = 'La fecha es obligatoria';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      type,
      account_id: accountId,
      category_id: categoryId,
      amount: parseFloat(amount),
      description,
      date,
    });
  }

  const filteredCategories = categories.filter((c) => c.type === type);
  const accountOptions: SelectOption[] = accounts.map((a) => ({ value: a.id, label: a.name }));
  const categoryOptions: SelectOption[] = filteredCategories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const typeToggleBase =
    'flex-1 py-2 text-sm font-medium rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Type selector */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary">Tipo</span>
        <div className="flex gap-2">
          <button
            type="button"
            className={`${typeToggleBase} ${
              type === 'income'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-[var(--color-card-border)] text-text-secondary hover:text-text-primary hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
            } ${transaction ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !transaction && setType('income')}
            disabled={!!transaction}
          >
            Ingreso
          </button>
          <button
            type="button"
            className={`${typeToggleBase} ${
              type === 'expense'
                ? 'bg-danger text-white border-danger'
                : 'border-[var(--color-card-border)] text-text-secondary hover:text-text-primary hover:bg-danger/5'
            } ${transaction ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !transaction && setType('expense')}
            disabled={!!transaction}
          >
            Gasto
          </button>
        </div>
        {transaction && (
          <p className="text-xs text-text-secondary">El tipo no se puede cambiar al editar</p>
        )}
      </div>

      {/* Account */}
      <Select
        label="Cuenta"
        options={accountOptions}
        value={accountId}
        onChange={handleAccountChange}
        error={errors.accountId}
      />

      {/* Category */}
      <Select
        label="Categoría"
        options={categoryOptions}
        value={categoryId}
        onChange={setCategoryId}
        error={errors.categoryId}
      />

      {/* Amount */}
      <CurrencyInput
        label="Monto"
        value={amount}
        onChange={setAmount}
        currency={currency}
        onCurrencyChange={setCurrency}
        error={errors.amount}
        placeholder="0.00"
      />

      {/* Date */}
      <DateInput
        label="Fecha"
        value={date}
        onChange={setDate}
        error={errors.date}
      />

      {/* Description (optional) */}
      <Input
        label="Descripción (opcional)"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Ej. Compra en supermercado"
      />

      {/* Mutation error */}
      {mutationError && (
        <p className="text-xs text-danger bg-danger/10 rounded-lg px-3 py-2">{mutationError}</p>
      )}

      {/* Footer */}
      <div className="flex gap-2 justify-end pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Guardando...
            </span>
          ) : transaction ? (
            'Guardar cambios'
          ) : (
            'Crear'
          )}
        </Button>
      </div>
    </form>
  );
}
