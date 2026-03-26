import { cn } from '@/lib/cn'

interface SensorValueProps {
  value: number | string
  unit?: string
  label?: string
  className?: string
}

export function SensorValue({ value, unit, label, className }: SensorValueProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <span className="text-xs text-[var(--color-text-muted)] mb-0.5">{label}</span>
      )}
      <span className="font-mono text-lg font-medium text-[var(--color-text)] tabular-nums tracking-tight">
        {value}
        {unit && (
          <span className="ml-0.5 text-sm text-[var(--color-text-muted)]">{unit}</span>
        )}
      </span>
    </div>
  )
}
