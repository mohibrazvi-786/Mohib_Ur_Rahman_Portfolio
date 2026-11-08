import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../store'

export function Loader() {
  const isLoaded = useStore((s) => s.isLoaded)

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="h-px rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: 72 }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <motion.div
            className="flex items-baseline gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <span className="font-display text-base font-semibold tracking-[-0.02em] text-text">SMR</span>
            <span className="font-mono text-[8px] tracking-[0.22em] text-text-muted uppercase">
              Systems online
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
