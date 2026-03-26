import { cn } from '@/lib/cn'

type Status = 'online' | 'warning' | 'offline' | 'unknown'

interface StatusDotProps {
  status: Status
  pulse?: boolean
  className?: string
}

const statusColors: Record<Status, string> = {
  online: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  offline: 'bg-[var(--color-danger)]',
  unknown: 'bg-[#3B82F6]',
}

export function StatusDot({ status, pulse = true, className }: StatusDotProps) {
  return (
    <span className={cn('relative inline-flex h-2.5 w-2.5', className)}>
      {pulse && status === 'online' && (
        <span
          className={cn(
            'absolute inset-0 rounded-full opacity-75 animate-ping',
            statusColors[status],
          )}
        />
      )}
      <span
        className={cn('relative inline-flex h-2.5 w-2.5 rounded-full', statusColors[status])}
      />
    </span>
  )
}
