import { useMemo, useState } from 'react';
import { Tag, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Skeleton, EmptyState, Modal } from '../components/ui';
import { CategoryBadge, CategoryForm } from '../components/categories';
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '../../application/hooks/useCategories';
import type { Category, CreateCategoryPayload } from '../../domain/entities';

function sortWithOthersLast(list: Category[]): Category[] {
  return [...list].sort((a, b) => {
    if (a.name.toLowerCase() === 'otros') return 1;
    if (b.name.toLowerCase() === 'otros') return -1;
    return 0;
  });
}

function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[0, 1].map((col) => (
        <div key={col} className="flex flex-col gap-3">
          <Skeleton className="h-6 w-24 rounded-lg" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ))}
    </div>
  );
}

function CategoriesError({ onRetry, isRetrying }: { onRetry: () => void; isRetrying: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <AlertCircle className="w-10 h-10 text-danger" strokeWidth={1.5} />
      <div>
        <p className="text-base font-semibold text-text-primary">No se pudieron cargar las categorías</p>
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

interface CategoryColumnProps {
  title: string;
  categories: Category[];
  emptyMessage: string;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

function CategoryColumn({ title, categories, emptyMessage, onEdit, onDelete }: CategoryColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {title}
        </span>
        <span className="text-xs font-medium text-text-secondary bg-gray-100 dark:bg-primary/10 rounded-full px-2 py-0.5">
          {categories.length}
        </span>
      </div>
      {categories.length === 0 ? (
        <p className="text-sm text-text-secondary py-4 text-center">{emptyMessage}</p>
      ) : (
        categories.map((category, i) => (
          <CategoryBadge
            key={category.id}
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
            className={`animate-fade-in-up [animation-delay:${i * 50}ms]`}
          />
        ))
      )}
    </div>
  );
}

export function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const { data: categories, isLoading, isError, isFetching, refetch } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const { allCategories, incomeCategories, expenseCategories } = useMemo(() => {
    const all = categories ?? [];
    return {
      allCategories: all,
      incomeCategories: sortWithOthersLast(all.filter((c) => c.type === 'income')),
      expenseCategories: sortWithOthersLast(all.filter((c) => c.type === 'expense')),
    };
  }, [categories]);

  function openCreateModal() {
    setEditingCategory(null);
    createMutation.reset();
    updateMutation.reset();
    setIsModalOpen(true);
  }

  function openEditModal(category: Category) {
    setEditingCategory(category);
    createMutation.reset();
    updateMutation.reset();
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingCategory(null);
  }

  function handleSubmit(payload: CreateCategoryPayload) {
    if (editingCategory) {
      updateMutation.mutate(
        { id: editingCategory.id, payload },
        { onSuccess: closeModal }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: closeModal });
    }
  }

  function openDeleteConfirm(category: Category) {
    setDeletingCategory(category);
  }

  function cancelDelete() {
    setDeletingCategory(null);
    deleteMutation.reset();
  }

  function confirmDelete() {
    if (!deletingCategory) return;
    deleteMutation.mutate(deletingCategory.id, {
      onSuccess: () => setDeletingCategory(null),
    });
  }

  const activeMutation = editingCategory ? updateMutation : createMutation;
  const mutationErrorMessage = activeMutation.error
    ? 'Ocurrió un error al guardar. Intenta de nuevo.'
    : null;

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Categorías</h1>
            {!isLoading && !isError && allCategories.length > 0 && (
              <p className="text-sm text-text-secondary mt-0.5">
                {allCategories.length} {allCategories.length === 1 ? 'categoría' : 'categorías'}
              </p>
            )}
          </div>
          {!isLoading && !isError && allCategories.length > 0 && (
            <Button onClick={openCreateModal}>+ Nueva Categoría</Button>
          )}
        </div>

        {isLoading && <CategoriesSkeleton />}

        {isError && <CategoriesError onRetry={refetch} isRetrying={isFetching} />}

        {!isLoading && !isError && allCategories.length === 0 && (
          <div className="flex flex-col items-center gap-4">
            <EmptyState
              icon={Tag}
              title="No hay categorías"
              description="Crea tus categorías para clasificar ingresos y gastos"
            />
            <Button onClick={openCreateModal}>+ Nueva Categoría</Button>
          </div>
        )}

        {!isLoading && !isError && allCategories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategoryColumn
              title="Ingresos"
              categories={incomeCategories}
              emptyMessage="Sin categorías de ingreso"
              onEdit={openEditModal}
              onDelete={openDeleteConfirm}
            />
            <CategoryColumn
              title="Gastos"
              categories={expenseCategories}
              emptyMessage="Sin categorías de gasto"
              onEdit={openEditModal}
              onDelete={openDeleteConfirm}
            />
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
      >
        <CategoryForm
          category={editingCategory ?? undefined}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isSubmitting={activeMutation.isPending}
          mutationError={mutationErrorMessage}
        />
      </Modal>

      <Modal
        isOpen={!!deletingCategory}
        onClose={cancelDelete}
        title="Eliminar Categoría"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-secondary">
            ¿Estás seguro de que deseas eliminar{' '}
            <span className="font-semibold text-text-primary">"{deletingCategory?.name}"</span>?
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
