import { useRef, useState, useEffect, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface SectionRevealProps {
  children: ReactNode
  direction?: 'up' | 'left' | 'right' | 'fade'
  delay?: number
  className?: string
  threshold?: number
  staggerChildren?: number
}

const OFFSETS = {
  up: { x: 0, y: 32 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
  fade: { x: 0, y: 0 },
}

export function SectionReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.1,
  staggerChildren,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  const reduceMotion = useReducedMotion()
  const offset = OFFSETS[direction]
  const [forceVisible, setForceVisible] = useState(false)

  // Grace-period fallback: if the IntersectionObserver never fires (e.g. Lenis
  // smooth-scroll does not deliver the expected scroll events), force the
  // content visible so a section is never left blank.
  useEffect(() => {
    if (inView || reduceMotion) return
    const timer = setTimeout(() => setForceVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [inView, reduceMotion])

  const visible = inView || forceVisible || reduceMotion

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x: offset.x, y: offset.y }}
      animate={
        visible
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {staggerChildren && visible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  )
}

/**
 * Staggered motion variant for child elements
 * Usage: <motion.div variants={staggerVariants} animate="show">...</motion.div>
 */
export const staggerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

/**
 * Individual item variant for staggered lists
 */
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

/**
 * Hover lift animation variant for cards
 */
export const hoverLift = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
  hover: { y: -6, scale: 1.01 },
  tap: { y: -2, scale: 0.99 },
}

/**
 * Fade-in scale animation for modals/dialogs
 */
export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { ease: [0.25, 0.46, 0.45, 0.94] as const, duration: 0.3 },
  },
  exit: { opacity: 0, scale: 0.95 },
}

/**
 * Scroll progress animation values
 */
export const scrollProgressVariants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { ease: 'easeOut' as const } },
}
