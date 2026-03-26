import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Settings, BarChart3, Trash2, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/cn'
import { StatusDot, SensorChip } from '@/components/ui'
import type { MonitoringSystem } from '@/data/systems-mock'

interface SystemRowProps {
  system: MonitoringSystem
}

export function SystemRow({ system }: SystemRowProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  const statusMap = {
    online: 'online' as const,
    offline: 'offline' as const,
    unknown: 'unknown' as const,
  }

  return (
    <div
      className={cn(
        'group relative flex items-center gap-3 px-4 py-2.5',
        'border-b border-[var(--color-border)]',
        'transition-colors duration-[var(--transition-fast)]',
        'hover:bg-white/[0.03]',
      )}
    >
      <StatusDot
        status={statusMap[system.status]}
        pulse={system.status === 'online'}
        className="shrink-0"
      />

      <span className="text-sm font-medium text-[var(--color-text)] min-w-[100px] shrink-0">
        {system.name}
      </span>

      <div className="flex items-center gap-1.5 flex-wrap flex-1 min-w-0">
        {system.sensors.map((sensor) => (
          <SensorChip
            key={sensor.label}
            label={sensor.label}
            value={sensor.value}
            unit={sensor.unit}
            status={sensor.status}
          />
        ))}
      </div>

      <div className="relative shrink-0" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className={cn(
            'p-1 rounded-md text-[var(--color-text-muted)]',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--transition-fast)]',
            'hover:text-[var(--color-text)] hover:bg-white/[0.06]',
            menuOpen && 'opacity-100 text-[var(--color-text)] bg-white/[0.06]',
          )}
          aria-label="System actions"
        >
          <MoreVertical className="h-4 w-4" />
        </button>

        {menuOpen && (
          <div
            className={cn(
              'absolute right-0 top-full mt-1 z-50 w-44',
              'rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]',
              'shadow-[var(--shadow-lg)] py-1',
            )}
          >
            {[
              { icon: BarChart3, label: 'View Data' },
              { icon: Settings, label: 'Configure' },
              { icon: ExternalLink, label: 'Open Detail' },
              { icon: Trash2, label: 'Remove', danger: true },
            ].map(({ icon: Icon, label, danger }) => (
              <button
                key={label}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-1.5 text-xs',
                  'transition-colors duration-[var(--transition-fast)]',
                  danger
                    ? 'text-[var(--color-danger)] hover:bg-[var(--color-danger-muted)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/[0.05]',
                )}
                onClick={() => setMenuOpen(false)}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
