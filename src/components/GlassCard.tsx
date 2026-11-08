import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'glass'
  className?: string
  hover?: boolean
}

const VARIANT_STYLES = {
  default: {
    background: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },
  elevated: {
    background: '#F5F5F2',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
  },
  glass: {
    background: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  },
} as const

export function GlassCard({
  children,
  variant = 'default',
  className = '',
  hover = true,
}: GlassCardProps) {
  const baseStyles = VARIANT_STYLES[variant]

  return (
    <div
      className={`rounded-xl p-6 transition-all duration-300 ${className}`}
      style={{
        ...baseStyles,
        cursor: hover ? 'default' : undefined,
      }}
      onMouseEnter={(e) => {
        if (!hover) return
        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)'
        e.currentTarget.style.transform = 'scale(1.01)'
      }}
      onMouseLeave={(e) => {
        if (!hover) return
        e.currentTarget.style.borderColor = (baseStyles as { border?: string }).border || 'rgba(0, 0, 0, 0.06)'
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {children}
    </div>
  )
}