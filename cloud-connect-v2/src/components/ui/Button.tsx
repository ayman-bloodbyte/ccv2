import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[var(--color-primary-hover)] shadow-sm',
  secondary:
    'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-primary)]',
  ghost:
    'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]',
  danger:
    'bg-[var(--color-danger-muted)] text-[var(--color-danger)] hover:bg-[var(--color-danger)] hover:text-white',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium',
        'transition-all duration-[var(--transition-fast)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
