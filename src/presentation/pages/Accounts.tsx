import { useState } from 'react';
import { Landmark, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Skeleton, EmptyState, Modal } from '../components/ui';
import { AccountCard, AccountForm } from '../components/accounts';
import {
  useAccounts,
  useCreateAccount,
  useUpdateAccount,
  useDeleteAccount,
} from '../../application/hooks/useAccounts';
import type { Account, CreateAccountPayload } from '../../domain/entities';

function AccountsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-44 rounded-2xl" />
      ))}
    </div>
  );
}

function AccountsError({ onRetry, isRetrying }: { onRetry: () => void; isRetrying: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <AlertCircle className="w-10 h-10 text-danger" strokeWidth={1.5} />
      <div>
        <p className="text-base font-semibold text-text-primary">No se pudieron cargar las cuentas</p>
        <p className="text-sm text-text-secondary mt-1">Verifica tu conexión e intenta de nuevo</p>
      </div>
      <Button variant="secondary" onClick={onRetry} disabled={isRetrying}>
        {isRetrying ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Reintentando...
          </span>
        ) : 'Reintentar'}
      </Button>
    </div>
  );
}

export function Accounts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [deletingAccount, setDeletingAccount] = useState<Account | null>(null);

  const { data, isLoading, isError, isFetching, refetch } = useAccounts();
  const createMutation = useCreateAccount();
  const updateMutation = useUpdateAccount();
  const deleteMutation = useDeleteAccount();

  const accounts = data?.accounts ?? [];

  function openCreateModal() {
    setEditingAccount(null);
    createMutation.reset();
    updateMutation.reset();
    setIsModalOpen(true);
  }

  function openEditModal(account: Account) {
    setEditingAccount(account);
    createMutation.reset();
    updateMutation.reset();
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingAccount(null);
  }

  function handleSubmit(payload: CreateAccountPayload) {
    if (editingAccount) {
      const { initial_balance: _initial_balance, ...updatePayload } = payload;
      updateMutation.mutate(
        { id: editingAccount.id, payload: updatePayload },
        { onSuccess: closeModal }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: closeModal });
    }
  }

  function openDeleteConfirm(account: Account) {
    setDeletingAccount(account);
  }

  function cancelDelete() {
    setDeletingAccount(null);
    deleteMutation.reset();
  }

  function confirmDelete() {
    if (!deletingAccount) return;
    deleteMutation.mutate(deletingAccount.id, {
      onSuccess: () => setDeletingAccount(null),
    });
  }

  const activeMutation = editingAccount ? updateMutation : createMutation;
  const mutationErrorMessage = activeMutation.error
    ? 'Ocurrió un error al guardar. Intenta de nuevo.'
    : null;

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Cuentas</h1>
            {!isLoading && !isError && accounts.length > 0 && (
              <p className="text-sm text-text-secondary mt-0.5">
                {accounts.length} {accounts.length === 1 ? 'cuenta' : 'cuentas'}
              </p>
            )}
          </div>
          {(!isLoading && !isError && accounts.length > 0) && (
            <Button onClick={openCreateModal}>+ Nueva Cuenta</Button>
          )}
        </div>

        {/* Loading */}
        {isLoading && <AccountsSkeleton />}

        {/* Error */}
        {isError && <AccountsError onRetry={refetch} isRetrying={isFetching} />}

        {/* Empty */}
        {!isLoading && !isError && accounts.length === 0 && (
          <div className="flex flex-col items-center gap-4">
            <EmptyState
              icon={Landmark}
              title="No hay cuentas"
              description="Crea tu primera cuenta para empezar a registrar tus finanzas"
            />
            <Button onClick={openCreateModal}>+ Nueva Cuenta</Button>
          </div>
        )}

        {/* Accounts grid */}
        {!isLoading && !isError && accounts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {accounts.map((account, i) => (
              <AccountCard
                key={account.id}
                account={account}
                onEdit={openEditModal}
                onDelete={openDeleteConfirm}
                className={`animate-fade-in-up [animation-delay:${i * 75}ms]`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingAccount ? 'Editar Cuenta' : 'Nueva Cuenta'}
      >
        <AccountForm
          account={editingAccount ?? undefined}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isSubmitting={activeMutation.isPending}
          mutationError={mutationErrorMessage}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingAccount}
        onClose={cancelDelete}
        title="Eliminar Cuenta"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-secondary">
            ¿Estás seguro de que deseas eliminar{' '}
            <span className="font-semibold text-text-primary">"{deletingAccount?.name}"</span>?
            Esta acción no se puede deshacer.
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
              ) : 'Eliminar'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
