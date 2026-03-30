interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gray-200 dark:bg-primary/10 ${className}`}
    />
  );
}
