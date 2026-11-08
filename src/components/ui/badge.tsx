import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider',
  {
    variants: {
      variant: {
        default: 'border-accent/30 bg-accent/10 text-accent',
        secondary: 'border-border bg-white/5 text-text-secondary',
        outline: 'border-border-strong text-text',
        mint: 'border-mint/25 bg-mint/10 text-mint',
        sky: 'border-sky/25 bg-sky/10 text-sky',
        success: 'border-success/25 bg-success/10 text-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge }
