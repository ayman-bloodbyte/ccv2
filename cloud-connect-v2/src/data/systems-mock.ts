export type SensorStatus = 'normal' | 'warning' | 'alarm'

export interface SensorReading {
  label: string
  unit: string
  value: number
  status: SensorStatus
}

export type SystemStatus = 'online' | 'offline' | 'unknown'

export interface MonitoringSystem {
  id: string
  name: string
  status: SystemStatus
  sensors: SensorReading[]
}

export interface MonitoringLocation {
  id: string
  name: string
  lat: number
  lng: number
  systems: MonitoringSystem[]
}

export const mockLocations: MonitoringLocation[] = [
  {
    id: 'loc-1',
    name: '18 Linksway',
    lat: 51.5842,
    lng: -0.1936,
    systems: [
      {
        id: 'sys-1a',
        name: 'Pool',
        status: 'online',
        sensors: [
          { label: 'Cl2', unit: 'mg/l', value: 0.82, status: 'normal' },
          { label: 'pH', unit: '', value: 7.24, status: 'normal' },
          { label: 'Temp', unit: '°C', value: 28.3, status: 'normal' },
          { label: 'Redox', unit: 'mV', value: 672, status: 'normal' },
        ],
      },
      {
        id: 'sys-1b',
        name: 'Spa',
        status: 'online',
        sensors: [
          { label: 'Cl2', unit: 'mg/l', value: 1.65, status: 'warning' },
          { label: 'pH', unit: '', value: 7.48, status: 'normal' },
          { label: 'Temp', unit: '°C', value: 38.1, status: 'normal' },
        ],
      },
    ],
  },
  {
    id: 'loc-2',
    name: '185 West Heath Rd',
    lat: 51.5671,
    lng: -0.1805,
    systems: [
      {
        id: 'sys-2a',
        name: 'Spa',
        status: 'offline',
        sensors: [
          { label: 'Cl2', unit: 'mg/l', value: 0.0, status: 'alarm' },
          { label: 'pH', unit: '', value: 0.0, status: 'alarm' },
        ],
      },
    ],
  },
  {
    id: 'loc-3',
    name: '27 Glengall Rd',
    lat: 51.4835,
    lng: -0.0598,
    systems: [
      {
        id: 'sys-3a',
        name: 'Pool',
        status: 'online',
        sensors: [
          { label: 'Cl2', unit: 'mg/l', value: 1.12, status: 'normal' },
          { label: 'pH', unit: '', value: 7.31, status: 'normal' },
          { label: 'Temp', unit: '°C', value: 27.6, status: 'normal' },
          { label: 'Redox', unit: 'mV', value: 698, status: 'normal' },
        ],
      },
    ],
  },
  {
    id: 'loc-4',
    name: 'Aberdeen',
    lat: 57.1497,
    lng: -2.0943,
    systems: [
      {
        id: 'sys-4a',
        name: 'Camphill R',
        status: 'online',
        sensors: [
          { label: 'Cl2', unit: 'mg/l', value: 0.45, status: 'warning' },
          { label: 'pH', unit: '', value: 8.12, status: 'alarm' },
          { label: 'Temp', unit: '°C', value: 24.9, status: 'normal' },
        ],
      },
    ],
  },
  {
    id: 'loc-5',
    name: 'Aberdeenshire',
    lat: 57.2868,
    lng: -2.3815,
    systems: [
      {
        id: 'sys-5a',
        name: 'JJ Hydro',
        status: 'unknown',
        sensors: [
          { label: 'Cl2', unit: 'mg/l', value: 0.91, status: 'normal' },
          { label: 'pH', unit: '', value: 7.38, status: 'normal' },
        ],
      },
      {
        id: 'sys-5b',
        name: 'JJ Pool',
        status: 'online',
        sensors: [
          { label: 'Cl2', unit: 'mg/l', value: 1.04, status: 'normal' },
          { label: 'pH', unit: '', value: 7.22, status: 'normal' },
          { label: 'Temp', unit: '°C', value: 29.1, status: 'normal' },
          { label: 'Redox', unit: 'mV', value: 715, status: 'warning' },
        ],
      },
    ],
  },
]
