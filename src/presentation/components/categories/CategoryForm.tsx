import { useState } from 'react';
import { Loader2, Check } from 'lucide-react';
import { Input, Button, Select } from '../ui';
import { ICON_OPTIONS, CATEGORY_TYPE_OPTIONS, COLOR_OPTIONS, ICON_MAP, DEFAULT_COLOR } from './categoryConstants';
import type { Category, CreateCategoryPayload } from '../../../domain/entities';

interface CategoryFormProps {
  category?: Category;
  onSubmit: (payload: CreateCategoryPayload) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  mutationError?: string | null;
}

export function CategoryForm({
  category,
  onSubmit,
  onCancel,
  isSubmitting = false,
  mutationError,
}: CategoryFormProps) {
  const isEditing = !!category;

  const initialColor = category?.color ?? DEFAULT_COLOR;
  const initialIcon = (category?.icon && ICON_MAP[category.icon]) ? category.icon : 'Tag';

  const [name, setName] = useState(category?.name ?? '');
  const [type, setType] = useState<Category['type']>(category?.type ?? 'expense');
  const [color, setColor] = useState(initialColor);
  const [icon, setIcon] = useState(initialIcon);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!type) newErrors.type = 'Selecciona un tipo';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name: name.trim(), type, color, icon });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nombre"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
        }}
        placeholder="Ej. Supermercado"
        error={errors.name}
      />

      <Select
        label="Tipo"
        value={type}
        onChange={(val) => {
          setType(val as Category['type']);
          if (errors.type) setErrors((prev) => ({ ...prev, type: '' }));
        }}
        options={CATEGORY_TYPE_OPTIONS}
        error={errors.type}
      />

      {/* Color selector */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary">Color</span>
        <div className="flex gap-2 flex-wrap">
          {(COLOR_OPTIONS.includes(color) ? COLOR_OPTIONS : [color, ...COLOR_OPTIONS]).map((c) => {
            const isSelected = color === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-9 h-9 rounded-xl border-2 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 ${
                  isSelected ? 'border-white ring-2 ring-primary scale-110' : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
                title={c}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow" strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Icon selector */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary">Ícono</span>
        <div className="flex gap-2 flex-wrap">
          {ICON_OPTIONS.map(({ name: iconName, Icon }) => (
            <button
              key={iconName}
              type="button"
              onClick={() => setIcon(iconName)}
              className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 ${
                icon === iconName
                  ? 'border-primary bg-primary/10 text-primary dark:text-primary-300'
                  : 'border-[var(--color-card-border)] text-text-secondary hover:border-primary/50 hover:bg-primary/5'
              }`}
              title={iconName}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </div>

      {mutationError && (
        <p className="text-xs text-danger bg-danger/10 rounded-lg px-3 py-2">{mutationError}</p>
      )}

      <div className="flex gap-2 justify-end pt-1">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {isEditing ? 'Guardando...' : 'Creando...'}
            </span>
          ) : isEditing ? 'Guardar Cambios' : 'Crear Categoría'}
        </Button>
      </div>
    </form>
  );
}
