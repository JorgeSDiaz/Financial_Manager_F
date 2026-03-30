import {
  Tag,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Briefcase,
  Heart,
  GraduationCap,
  Plane,
  Gift,
  Music,
  Dumbbell,
  Smartphone,
  Zap,
  Coffee,
  Shirt,
  PiggyBank,
  TrendingUp,
  DollarSign,
  Wrench,
  Baby,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Category } from '../../../domain/entities';

export const CATEGORY_TYPE_LABELS: Record<Category['type'], string> = {
  income: 'Ingreso',
  expense: 'Gasto',
};

export const CATEGORY_TYPE_OPTIONS = (
  Object.entries(CATEGORY_TYPE_LABELS) as [Category['type'], string][]
).map(([value, label]) => ({ value, label }));

export const ICON_OPTIONS: { name: string; Icon: LucideIcon }[] = [
  { name: 'Tag', Icon: Tag },
  { name: 'ShoppingCart', Icon: ShoppingCart },
  { name: 'Home', Icon: Home },
  { name: 'Car', Icon: Car },
  { name: 'Utensils', Icon: Utensils },
  { name: 'Briefcase', Icon: Briefcase },
  { name: 'Heart', Icon: Heart },
  { name: 'GraduationCap', Icon: GraduationCap },
  { name: 'Plane', Icon: Plane },
  { name: 'Gift', Icon: Gift },
  { name: 'Music', Icon: Music },
  { name: 'Dumbbell', Icon: Dumbbell },
  { name: 'Smartphone', Icon: Smartphone },
  { name: 'Zap', Icon: Zap },
  { name: 'Coffee', Icon: Coffee },
  { name: 'Shirt', Icon: Shirt },
  { name: 'PiggyBank', Icon: PiggyBank },
  { name: 'TrendingUp', Icon: TrendingUp },
  { name: 'DollarSign', Icon: DollarSign },
  { name: 'Wrench', Icon: Wrench },
  { name: 'Baby', Icon: Baby },
];

export const ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  ICON_OPTIONS.map(({ name, Icon }) => [name, Icon])
);

export { COLOR_OPTIONS, DEFAULT_COLOR } from '../../utils/colorOptions';
