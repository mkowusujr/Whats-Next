import { cn } from '@/lib/utils/styles';

type BadgeProps = { label: string; className?: string };

export default function Badge({ label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'bg-secondary text-primary mx-2 my-auto inline-flex h-6 min-w-10 items-center justify-center rounded-full px-3 text-lg',
        className
      )}
    >
      {label}
    </span>
  );
}
