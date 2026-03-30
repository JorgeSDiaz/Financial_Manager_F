import { Wallet, Building2, CreditCard, PiggyBank, Banknote, Landmark, Coins } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Account } from '../../../domain/entities';

export const ACCOUNT_TYPE_LABELS: Record<Account['type'], string> = {
  cash: 'Efectivo',
  bank: 'Banco',
  card: 'Tarjeta',
  savings: 'Ahorros',
};

export const ACCOUNT_TYPE_OPTIONS = (Object.entries(ACCOUNT_TYPE_LABELS) as [Account['type'], string][]).map(
  ([value, label]) => ({ value, label })
);

export const ACCOUNT_TYPE_ICONS: Record<Account['type'], LucideIcon> = {
  cash: Wallet,
  bank: Building2,
  card: CreditCard,
  savings: PiggyBank,
};

export const ICON_OPTIONS: { name: string; Icon: LucideIcon }[] = [
  { name: 'Wallet', Icon: Wallet },
  { name: 'Building2', Icon: Building2 },
  { name: 'CreditCard', Icon: CreditCard },
  { name: 'PiggyBank', Icon: PiggyBank },
  { name: 'Banknote', Icon: Banknote },
  { name: 'Landmark', Icon: Landmark },
  { name: 'Coins', Icon: Coins },
];

export const ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  ICON_OPTIONS.map(({ name, Icon }) => [name, Icon])
);
