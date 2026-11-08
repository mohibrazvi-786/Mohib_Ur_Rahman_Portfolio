import { useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export type LightboxItem = {
  src: string
  alt: string
  title: string
  caption?: string
  badge?: string
}

export function MediaLightbox({
  items,
  index,
  open,
  onOpenChange,
  onIndexChange,
}: {
  items: LightboxItem[]
  index: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onIndexChange: (index: number) => void
}) {
  const item = items[index]
  const hasMultiple = items.length > 1

  useEffect(() => {
    if (!open || !hasMultiple) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      const step = event.key === 'ArrowRight' ? 1 : -1
      onIndexChange((index + step + items.length) % items.length)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, hasMultiple, index, items.length, onIndexChange])

  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[min(1100px,95vw)] gap-0 overflow-hidden">
        <DialogTitle className="sr-only">{item.title}</DialogTitle>
        <DialogDescription className="sr-only">{item.alt}</DialogDescription>

        <div className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-lg bg-black/40">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[72vh] w-auto max-w-full object-contain"
          />
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
                className="absolute left-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-text transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => onIndexChange((index + 1) % items.length)}
                className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-text transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-2 px-2 pb-1 pt-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text">{item.title}</p>
            {item.caption && (
              <p className="mt-1 text-xs leading-relaxed text-text-muted">{item.caption}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {item.badge && (
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-accent">
                {item.badge}
              </span>
            )}
            {hasMultiple && (
              <span className="shrink-0 font-mono text-[10px] text-text-muted">
                {index + 1} / {items.length}
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
