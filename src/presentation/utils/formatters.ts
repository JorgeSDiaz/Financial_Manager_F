const currencyFormatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

const shortDateFormatter = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short' });

const longDateFormatter = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export function formatShortDate(dateStr: string): string {
  return shortDateFormatter.format(new Date(dateStr + 'T00:00:00'));
}

export function formatToday(): string {
  return longDateFormatter.format(new Date());
}
