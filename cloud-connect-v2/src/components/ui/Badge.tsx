import { cn } from '@/lib/cn'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'outline'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-[var(--color-primary-muted)] text-[var(--color-primary)]',
  success:
    'bg-[var(--color-success-muted)] text-[var(--color-success)]',
  warning:
    'bg-[var(--color-warning-muted)] text-[var(--color-warning)]',
  danger:
    'bg-[var(--color-danger-muted)] text-[var(--color-danger)]',
  outline:
    'border border-[var(--color-border)] text-[var(--color-text-muted)]',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
