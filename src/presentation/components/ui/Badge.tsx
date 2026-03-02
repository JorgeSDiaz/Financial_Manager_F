interface BadgeProps {
  type: 'income' | 'expense';
  children: React.ReactNode;
}

export function Badge({ type, children }: BadgeProps) {
  const classes = type === 'income' 
    ? 'bg-success/10 text-success'
    : 'bg-danger/10 text-danger';

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${classes}`}>
      {children}
    </span>
  );
}
