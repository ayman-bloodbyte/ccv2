import { Badge, Button, Card, StatusDot, SensorValue } from '@/components/ui'
import { Activity, Thermometer, Droplets, Wind, Wifi } from 'lucide-react'
import { format } from 'date-fns'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const sampleData = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  temperature: 22 + Math.sin(i / 3) * 4 + Math.random() * 2,
  humidity: 55 + Math.cos(i / 4) * 10 + Math.random() * 5,
}))

export function Dashboard() {
  const now = format(new Date(), 'PPpp')

  return (
    <div className="flex-1 p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">Dashboard</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{now}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Wifi className="h-4 w-4" /> Devices
          </Button>
          <Button size="sm">
            <Activity className="h-4 w-4" /> Live View
          </Button>
        </div>
      </header>

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[var(--color-text-muted)] flex items-center gap-2">
              <Thermometer className="h-4 w-4" /> Temperature
            </span>
            <Badge variant="success">Normal</Badge>
          </div>
          <SensorValue value={23.4} unit="°C" />
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--color-text-muted)]">
            <StatusDot status="online" /> Sensor active
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[var(--color-text-muted)] flex items-center gap-2">
              <Droplets className="h-4 w-4" /> Humidity
            </span>
            <Badge variant="warning">High</Badge>
          </div>
          <SensorValue value={78.2} unit="%" />
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--color-text-muted)]">
            <StatusDot status="warning" pulse={false} /> Alert threshold
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[var(--color-text-muted)] flex items-center gap-2">
              <Wind className="h-4 w-4" /> Airflow
            </span>
            <Badge variant="danger">Critical</Badge>
          </div>
          <SensorValue value={0.0} unit="m/s" />
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--color-text-muted)]">
            <StatusDot status="offline" pulse={false} /> Sensor offline
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[var(--color-text-muted)] flex items-center gap-2">
              <Activity className="h-4 w-4" /> Pressure
            </span>
            <Badge>Stable</Badge>
          </div>
          <SensorValue value={1013} unit="hPa" />
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--color-text-muted)]">
            <StatusDot status="online" /> Sensor active
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card padding="lg">
        <h2 className="text-lg font-medium text-[var(--color-text)] mb-4">
          24-Hour Sensor Readings
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                stroke="var(--color-text-muted)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis stroke="var(--color-text-muted)" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text)',
                  fontSize: 13,
                }}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
                name="Temp (°C)"
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="var(--color-warning)"
                strokeWidth={2}
                dot={false}
                name="Humidity (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* UI component showcase */}
      <Card padding="lg">
        <h2 className="text-lg font-medium text-[var(--color-text)] mb-4">
          Component Reference
        </h2>

        <div className="space-y-6">
          {/* Buttons */}
          <div>
            <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-3">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-3">Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Status dots */}
          <div>
            <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-3">Status Indicators</h3>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-sm">
                <StatusDot status="online" /> Online
              </span>
              <span className="flex items-center gap-2 text-sm">
                <StatusDot status="warning" pulse={false} /> Warning
              </span>
              <span className="flex items-center gap-2 text-sm">
                <StatusDot status="offline" pulse={false} /> Offline
              </span>
            </div>
          </div>

          {/* Sensor values */}
          <div>
            <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-3">Sensor Values</h3>
            <div className="flex gap-8">
              <SensorValue label="Temperature" value={23.4} unit="°C" />
              <SensorValue label="Humidity" value={78.2} unit="%" />
              <SensorValue label="Pressure" value={1013} unit="hPa" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
