import { MapPin } from 'lucide-react'
import type { MonitoringLocation } from '@/data/systems-mock'
import { SystemRow } from './SystemRow'

interface LocationGroupProps {
  location: MonitoringLocation
}

export function LocationGroup({ location }: LocationGroupProps) {
  const onlineCount = location.systems.filter((s) => s.status === 'online').length
  const total = location.systems.length

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between gap-2 px-4 py-2 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="h-3.5 w-3.5 text-[var(--color-text-muted)] shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] truncate">
            {location.name}
          </span>
        </div>
        <span className="text-[10px] text-[var(--color-text-muted)] tabular-nums font-mono shrink-0">
          {onlineCount}/{total} online
        </span>
      </div>

      {location.systems.map((system) => (
        <SystemRow key={system.id} system={system} />
      ))}
    </div>
  )
}
