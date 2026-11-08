import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-accent text-bg hover:bg-accent-deep hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(255,184,0,0.2)]',
        outline:
          'border border-border-strong bg-transparent text-text hover:border-accent hover:text-accent',
        secondary:
          'border border-border bg-surface text-text hover:border-accent/40 hover:text-accent',
        ghost: 'text-text-secondary hover:bg-white/5 hover:text-text',
        link: 'text-accent underline-offset-4 hover:underline',
        pill: 'rounded-full bg-accent px-6 py-3.5 text-[13px] text-accent-ink hover:bg-accent-deep hover:-translate-y-px active:translate-y-0 active:scale-[0.99]',
        'pill-outline':
          'rounded-full border border-border-strong px-6 py-3.5 text-[13px] text-text hover:border-accent hover:text-accent hover:-translate-y-px',
        mono: 'rounded-none border-b border-current pb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-text-secondary hover:text-accent',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 rounded-md px-4 text-xs',
        lg: 'h-12 rounded-xl px-7',
        icon: 'size-10',
        auto: 'h-auto px-0 py-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
