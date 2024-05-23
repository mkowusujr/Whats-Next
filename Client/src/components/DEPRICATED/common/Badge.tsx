import { cn } from '@/lib/utils/styles';

type BadgeProps = { label: string; className?: string };

export default function Badge({ label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'mx-2 my-auto inline-flex h-6 min-w-10 items-center justify-center rounded-full bg-secondary px-3 text-lg text-primary',
        className
      )}
    >
      {label}
    </span>
  );
}
