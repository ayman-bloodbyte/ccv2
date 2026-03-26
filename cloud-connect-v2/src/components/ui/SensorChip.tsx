import { cn } from '@/lib/cn'
import type { SensorStatus } from '@/data/systems-mock'

interface SensorChipProps {
  label: string
  value: number
  unit?: string
  status?: SensorStatus
  className?: string
}

const statusStyles: Record<SensorStatus, string> = {
  normal: 'bg-[var(--color-primary-muted)] text-[var(--color-primary)]',
  warning: 'bg-[var(--color-warning-muted)] text-[var(--color-warning)]',
  alarm: 'bg-[var(--color-danger-muted)] text-[var(--color-danger)]',
}

export function SensorChip({
  label,
  value,
  unit,
  status = 'normal',
  className,
}: SensorChipProps) {
  const displayValue = Number.isInteger(value)
    ? value.toString()
    : value.toFixed(2)

  return (
    <span
      className={cn(
        'inline-flex flex-col items-center rounded-full px-2.5 py-1 min-w-[52px]',
        statusStyles[status],
        className,
      )}
    >
      <span className="text-[9px] font-medium uppercase leading-tight opacity-70">
        {label}
        {unit ? ` ${unit}` : ''}
      </span>
      <span className="font-mono text-xs font-medium leading-tight tabular-nums">
        {displayValue}
      </span>
    </span>
  )
}
