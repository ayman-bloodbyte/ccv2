import { useMemo } from 'react'
import { Search, Filter, ChevronDown } from 'lucide-react'
import { mockLocations } from '@/data/systems-mock'
import { LocationGroup } from '@/components/systems/LocationGroup'

const GOOGLE_MAPS_DARK_STYLE =
  '&maptype=roadmap&style=element:geometry%7Ccolor:0x0a0e1a&style=element:labels.text.fill%7Ccolor:0x64748b&style=element:labels.text.stroke%7Ccolor:0x0a0e1a&style=feature:road%7Celement:geometry%7Ccolor:0x1e2a3a&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:water%7Celement:geometry%7Ccolor:0x0d1525&style=feature:poi%7Cvisibility:off&style=feature:transit%7Cvisibility:off'

export function Systems() {
  const stats = useMemo(() => {
    const allSystems = mockLocations.flatMap((loc) => loc.systems)
    return {
      total: allSystems.length,
      online: allSystems.filter((s) => s.status === 'online').length,
      offline: allSystems.filter((s) => s.status === 'offline').length,
      unknown: allSystems.filter((s) => s.status === 'unknown').length,
    }
  }, [])

  const center = useMemo(() => {
    const lats = mockLocations.map((l) => l.lat)
    const lngs = mockLocations.map((l) => l.lng)
    return {
      lat: (Math.min(...lats) + Math.max(...lats)) / 2,
      lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
    }
  }, [])

  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=&center=${center.lat},${center.lng}&zoom=6${GOOGLE_MAPS_DARK_STYLE}`

  return (
    <div className="flex flex-1 h-screen overflow-hidden">
      {/* ── Left panel: Map ── */}
      <div className="hidden lg:flex w-[40%] shrink-0 relative bg-[#070B14] border-r border-[var(--color-border)]">
        <div className="absolute inset-0">
          <iframe
            title="Systems Map"
            src={mapSrc}
            className="w-full h-full border-0 opacity-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ filter: 'saturate(0.4) brightness(0.7)' }}
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
          {/* Fallback when no API key or embed fails */}
          <div
            className="absolute inset-0 flex-col items-center justify-center gap-3"
            style={{ display: 'none' }}
          >
            <MapPlaceholder />
          </div>
          {/* Always-visible overlay so it looks polished even without API key */}
          <div className="absolute inset-0 pointer-events-none">
            <MapPlaceholder />
          </div>
        </div>
      </div>

      {/* ── Right panel: System list ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header bar */}
        <div className="shrink-0 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-semibold text-[var(--color-text)]">Systems</h1>
              <div className="flex items-center gap-3 mt-0.5">
                <Stat color="var(--color-success)" label="Online" value={stats.online} />
                <Stat color="var(--color-danger)" label="Offline" value={stats.offline} />
                <Stat color="#3B82F6" label="Unknown" value={stats.unknown} />
                <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                  {stats.total} total
                </span>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors duration-[var(--transition-fast)]">
              <Filter className="h-3.5 w-3.5" />
              Filter
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          {/* Search bar */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search systems or locations..."
                className="w-full pl-9 pr-3 py-2 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-[var(--transition-fast)]"
              />
            </div>
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto">
          {mockLocations.map((location) => (
            <LocationGroup key={location.id} location={location} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {value} {label}
    </span>
  )
}

function MapPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#070B14]">
      {/* Dark styled SVG map illustration */}
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Water */}
        <rect width="400" height="500" fill="#0D1525" />
        {/* Land masses */}
        <path
          d="M60 80 Q100 60 160 90 Q200 110 180 160 Q160 200 100 190 Q40 180 60 120Z"
          fill="#111827"
          stroke="#1E2A3A"
          strokeWidth="0.5"
        />
        <path
          d="M220 40 Q300 20 340 70 Q360 120 320 160 Q280 180 240 150 Q200 120 220 80Z"
          fill="#111827"
          stroke="#1E2A3A"
          strokeWidth="0.5"
        />
        <path
          d="M50 250 Q120 220 200 260 Q280 300 260 370 Q240 420 160 400 Q80 380 30 320Z"
          fill="#111827"
          stroke="#1E2A3A"
          strokeWidth="0.5"
        />
        <path
          d="M300 240 Q360 220 380 280 Q390 340 350 360 Q310 370 290 330 Q270 280 300 240Z"
          fill="#111827"
          stroke="#1E2A3A"
          strokeWidth="0.5"
        />
        {/* Grid lines */}
        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 50}
            x2="400"
            y2={i * 50}
            stroke="#1E2A3A"
            strokeWidth="0.3"
            opacity="0.4"
          />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="500"
            stroke="#1E2A3A"
            strokeWidth="0.3"
            opacity="0.4"
          />
        ))}
        {/* Location markers */}
        {mockLocations.map((loc, i) => {
          const x = 50 + (i * 70) % 300
          const y = 100 + (i * 80) % 300
          const isOnline = loc.systems.some((s) => s.status === 'online')
          return (
            <g key={loc.id}>
              <circle
                cx={x}
                cy={y}
                r="12"
                fill={isOnline ? 'rgba(0, 188, 212, 0.15)' : 'rgba(239, 68, 68, 0.15)'}
              />
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={isOnline ? '#00BCD4' : '#EF4444'}
              />
              <text
                x={x}
                y={y - 18}
                textAnchor="middle"
                fill="#64748B"
                fontSize="8"
                fontFamily="var(--font-body)"
              >
                {loc.name.length > 14 ? loc.name.slice(0, 14) + '…' : loc.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
