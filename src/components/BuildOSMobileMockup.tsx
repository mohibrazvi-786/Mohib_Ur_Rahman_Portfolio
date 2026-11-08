import { ArrowUpRight } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type CSSProperties } from 'react'

type BuildOSMobileMockupProps = {
  src: string
  alt: string
  label: string
  caption?: string
  variant?: 'default' | 'featured'
  className?: string
  onClick?: () => void
}

/**
 * Canonical mobile device mockup for BuildOS screenshots.
 *
 * All BuildOS application screenshots MUST use this component to guarantee
 * identical device frames across the entire gallery.
 *
 * Desktop: 250px × 510px (aspect ratio ~0.49)
 * Tablet/Mobile: proportionally scaled, preserving aspect ratio.
 *
 * Never stretch screenshots — object-fit: contain with neutral background.
 */
export function BuildOSMobileMockup({
  src,
  alt,
  label,
  caption,
  variant = 'default',
  className,
  onClick,
}: BuildOSMobileMockupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const reduceMotion = useReducedMotion()

  const hoverVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.25, 0.46, 0.45, 0.94], duration: 0.5 },
    },
    hover: { y: -6, scale: 1.01 },
    tap: { y: -2, scale: 0.99 },
  }

  return (
    <motion.figure
      ref={ref}
      className={`bo-mockup-card bo-mockup-card--${variant} ${className ?? ''}`}
      style={{
        '--frame-width': '250px',
        '--frame-height': '510px',
        cursor: onClick ? 'pointer' : undefined,
      } as CSSProperties}
      initial={reduceMotion ? false : hoverVariants.hidden}
      animate={inView ? hoverVariants.show : hoverVariants.hidden}
      whileHover={!reduceMotion ? hoverVariants.hover : undefined}
      whileTap={!reduceMotion ? hoverVariants.tap : undefined}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      onClick={onClick}
    >
      {/* Device frame — identical for every screenshot */}
      <div className="bo-mockup-frame">
        {/* Screen viewport — consistent inset for every screenshot */}
        <div className="bo-mockup-screen">
          <motion.img
            src={src}
            alt={alt}
            className="bo-mockup-img"
            loading="lazy"
            decoding="async"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      </div>

      {/* Caption outside the device frame */}
      <motion.figcaption
        className="bo-mockup-caption"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.h4
          className="bo-mockup-title"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {label}
        </motion.h4>
        {caption && (
          <motion.p
            className="bo-mockup-desc"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            {caption}
          </motion.p>
        )}
      </motion.figcaption>

      {/* Optional external link overlay on desktop hover */}
      {onClick && (
        <motion.button
          className="bo-mockup-cta absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ opacity: 1, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault()
            onClick()
          }}
        >
          View <ArrowUpRight size={12} />
        </motion.button>
      )}
    </motion.figure>
  )
}
