import { useMemo, useState } from 'react';
import { ArrowLeftRight, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Skeleton, EmptyState, Modal } from '../components/ui';
import { TransactionItem, TransactionForm, TransactionFilters } from '../components/transactions';
import {
  useTransactions,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from '../../application/hooks/useTransactions';
import { useAccounts } from '../../application/hooks/useAccounts';
import { useCategories } from '../../application/hooks/useCategories';
import type { Transaction, CreateTransactionPayload } from '../../domain/entities';

function TransactionsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-16 rounded-xl" />
      ))}
    </div>
  );
}

function TransactionsError({ onRetry, isRetrying }: { onRetry: () => void; isRetrying: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <AlertCircle className="w-10 h-10 text-danger" strokeWidth={1.5} />
      <div>
        <p className="text-base font-semibold text-text-primary">
          No se pudieron cargar las transacciones
        </p>
        <p className="text-sm text-text-secondary mt-1">Verifica tu conexión e intenta de nuevo</p>
      </div>
      <Button variant="secondary" onClick={onRetry} disabled={isRetrying}>
        {isRetrying ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Reintentando...
          </span>
        ) : (
          'Reintentar'
        )}
      </Button>
    </div>
  );
}

const VISIBLE_PAGE_SIZE = 20;

export function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);

  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [filterAccountId, setFilterAccountId] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState('');
  const [typeFilter, setTypeFilter] = useState<'' | 'income' | 'expense'>('');

  const [visibleCount, setVisibleCount] = useState(VISIBLE_PAGE_SIZE);

  const { data: transactions, isLoading, isError, isFetching, refetch } = useTransactions();
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();

  const { accountsList, categoriesList, accountMap, categoryMap } = useMemo(() => {
    const accountsList = accounts?.accounts ?? [];
    const categoriesList = categories ?? [];
    const accountMap = Object.fromEntries(accountsList.map((a) => [a.id, a]));
    const categoryMap = Object.fromEntries(categoriesList.map((c) => [c.id, c]));
    return { accountsList, categoriesList, accountMap, categoryMap };
  }, [accounts, categories]);

  const filteredTransactions = useMemo(() => {
    let list = transactions ?? [];

    if (typeFilter) {
      list = list.filter((t) => t.type === typeFilter);
    }
    if (filterAccountId) {
      list = list.filter((t) => t.accountId === filterAccountId);
    }
    if (filterCategoryId) {
      list = list.filter((t) => t.categoryId === filterCategoryId);
    }
    if (dateStart) {
      list = list.filter((t) => t.date >= dateStart);
    }
    if (dateEnd) {
      list = list.filter((t) => t.date <= dateEnd);
    }

    return [...list].sort((a, b) => {
      if (b.date !== a.date) return b.date.localeCompare(a.date);
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [transactions, typeFilter, filterAccountId, filterCategoryId, dateStart, dateEnd]);

  const visibleTransactions = filteredTransactions.slice(0, visibleCount);
  const hasMore = filteredTransactions.length > visibleCount;
  const hasActiveFilters = !!(dateStart || dateEnd || filterAccountId || filterCategoryId || typeFilter);
  const totalTransactions = (transactions ?? []).length;

  function openCreateModal() {
    setEditingTransaction(null);
    createMutation.reset();
    updateMutation.reset();
    setIsModalOpen(true);
  }

  function openEditModal(transaction: Transaction) {
    setEditingTransaction(transaction);
    createMutation.reset();
    updateMutation.reset();
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingTransaction(null);
  }

  function handleSubmit(payload: CreateTransactionPayload) {
    if (editingTransaction) {
      updateMutation.mutate(
        {
          id: editingTransaction.id,
          type: editingTransaction.type,
          payload: {
            account_id: payload.account_id,
            category_id: payload.category_id,
            amount: payload.amount,
            description: payload.description,
            date: payload.date,
          },
        },
        { onSuccess: closeModal }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: closeModal });
    }
  }

  function openDeleteConfirm(transaction: Transaction) {
    setDeletingTransaction(transaction);
    deleteMutation.reset();
  }

  function cancelDelete() {
    setDeletingTransaction(null);
    deleteMutation.reset();
  }

  function confirmDelete() {
    if (!deletingTransaction) return;
    deleteMutation.mutate(
      { id: deletingTransaction.id, type: deletingTransaction.type },
      { onSuccess: () => setDeletingTransaction(null) }
    );
  }

  function clearFilters() {
    setDateStart('');
    setDateEnd('');
    setFilterAccountId('');
    setFilterCategoryId('');
    setTypeFilter('');
    setVisibleCount(VISIBLE_PAGE_SIZE);
  }

  function handleFilterChange<T>(setter: (v: T) => void) {
    return (value: T) => {
      setter(value);
      setVisibleCount(VISIBLE_PAGE_SIZE);
    };
  }

  const activeMutation = editingTransaction ? updateMutation : createMutation;
  const mutationErrorMessage = activeMutation.error
    ? (activeMutation.error as any)?.response?.data?.error ||
      (activeMutation.error as any)?.response?.data?.message ||
      'Ocurrió un error al guardar. Intenta de nuevo.'
    : null;

  const showFilters = !isLoading && !isError && totalTransactions > 0;

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Transacciones</h1>
            {!isLoading && !isError && totalTransactions > 0 && (
              <p className="text-sm text-text-secondary mt-0.5">
                {totalTransactions}{' '}
                {totalTransactions === 1 ? 'transacción' : 'transacciones'}
              </p>
            )}
          </div>
          {!isLoading && !isError && totalTransactions > 0 && (
            <Button onClick={() => openCreateModal()}>+ Nueva Transacción</Button>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <TransactionFilters
            dateStart={dateStart}
            dateEnd={dateEnd}
            accountId={filterAccountId}
            categoryId={filterCategoryId}
            typeFilter={typeFilter}
            onDateStartChange={handleFilterChange(setDateStart)}
            onDateEndChange={handleFilterChange(setDateEnd)}
            onAccountChange={handleFilterChange(setFilterAccountId)}
            onCategoryChange={handleFilterChange(setFilterCategoryId)}
            onTypeFilterChange={handleFilterChange(setTypeFilter)}
            onClearFilters={clearFilters}
            accounts={accountsList}
            categories={categoriesList}
            hasActiveFilters={hasActiveFilters}
          />
        )}

        {/* Loading */}
        {isLoading && <TransactionsSkeleton />}

        {/* Error */}
        {isError && <TransactionsError onRetry={refetch} isRetrying={isFetching} />}

        {/* Empty — no transactions at all */}
        {!isLoading && !isError && totalTransactions === 0 && (
          <div className="flex flex-col items-center gap-4">
            <EmptyState
              icon={ArrowLeftRight}
              title="No hay transacciones"
              description="Registra tu primer ingreso o gasto"
            />
            <Button onClick={() => openCreateModal()}>+ Nueva Transacción</Button>
          </div>
        )}

        {/* Transaction list */}
        {!isLoading && !isError && totalTransactions > 0 && (
          <>
            {filteredTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <p className="text-base font-semibold text-text-primary">
                  No se encontraron transacciones
                </p>
                <p className="text-sm text-text-secondary">
                  Prueba ajustando o limpiando los filtros
                </p>
                <Button variant="secondary" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {visibleTransactions.map((tx, i) => {
                  const account = accountMap[tx.accountId];
                  const category = categoryMap[tx.categoryId];
                  return (
                    <TransactionItem
                      key={tx.id}
                      transaction={tx}
                      accountName={account?.name ?? 'Cuenta desconocida'}
                      categoryName={category?.name ?? 'Categoría desconocida'}
                      categoryColor={category?.color ?? '#888888'}
                      categoryIcon={category?.icon ?? 'Tag'}
                      onEdit={openEditModal}
                      onDelete={openDeleteConfirm}
                      className={`animate-fade-in-up [animation-delay:${i * 30}ms]`}
                    />
                  );
                })}

                {/* Load more */}
                {hasMore && (
                  <div className="flex flex-col items-center gap-2 pt-2">
                    <p className="text-xs text-text-secondary">
                      Mostrando {visibleCount} de {filteredTransactions.length}
                    </p>
                    <Button
                      variant="secondary"
                      onClick={() => setVisibleCount((prev) => prev + VISIBLE_PAGE_SIZE)}
                    >
                      Cargar más
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Create / Edit modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingTransaction ? 'Editar Transacción' : 'Nueva Transacción'}
      >
        <TransactionForm
          transaction={editingTransaction ?? undefined}
          defaultType="expense"
          accounts={accountsList}
          categories={categoriesList}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isSubmitting={activeMutation.isPending}
          mutationError={mutationErrorMessage}
        />
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deletingTransaction}
        onClose={cancelDelete}
        title="Eliminar Transacción"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-secondary">
            ¿Estás seguro de que deseas eliminar esta transacción? Esta acción no se puede deshacer.
          </p>
          {deleteMutation.isError && (
            <p className="text-xs text-danger bg-danger/10 rounded-lg px-3 py-2">
              Ocurrió un error al eliminar. Intenta de nuevo.
            </p>
          )}
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={cancelDelete} disabled={deleteMutation.isPending}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Eliminando...
                </span>
              ) : (
                'Eliminar'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
