import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Server, Settings } from 'lucide-react'
import { cn } from '@/lib/cn'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/systems', icon: Server, label: 'Systems' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function AppShell() {
  return (
    <div className="flex flex-1 min-h-0">
      <nav className="hidden md:flex flex-col w-14 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] items-center py-4 gap-1">
        <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-bg)] text-xs font-bold mb-6">
          CC
        </div>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)]',
                'transition-colors duration-[var(--transition-fast)]',
                isActive
                  ? 'bg-[var(--color-primary-muted)] text-[var(--color-primary)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/[0.04]',
              )
            }
            title={label}
          >
            <Icon className="h-5 w-5" />
          </NavLink>
        ))}
      </nav>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
