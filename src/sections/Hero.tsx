import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { siteContent } from '../data/content'
import { Button } from '@/components/ui/button'

type HeroMetric = {
  value: number
  suffix: string
  prefix?: string
  decimal?: number
  label: string
}

const HERO_METRICS = siteContent.hero.metrics as HeroMetric[]

/**
 * Original editorial graphic: three vertical bars of varying height
 * representing product, engineering, and execution layers.
 * Not decorative blobs — a structured visual of building systems.
 */
function ProductGraphic() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 200 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroGradientV3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffc400" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffc400" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Three structured bars representing product layers */}
      <rect x="30" y="120" width="28" height="200" fill="url(#heroGradientV3)" rx="4" />
      <rect x="86" y="80" width="28" height="240" fill="url(#heroGradientV3)" rx="4" />
      <rect x="142" y="160" width="28" height="160" fill="url(#heroGradientV3)" rx="4" />

      {/* Subtle grid behind */}
      <pattern id="heroGridV3" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 196, 0, 0.05)" stroke-width="1" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#heroGridV3)" />
    </svg>
  )
}

export function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="site-container hero-container">
        <motion.div
          className="hero-topline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <span>{siteContent.hero.tag}</span>
          <span>
            <span className="status-dot" aria-hidden="true" />
            {siteContent.meta.location} · {siteContent.meta.status}
          </span>
        </motion.div>

        <div className="hero-grid">
          <div>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              I build products that solve
              <em>real-world problems.</em>
            </motion.h1>

            <motion.p
              className="hero-lede"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              Founder-led product builder working across AI, DeepTech, IoT and product strategy.
              Building and validating products from 0 to 1 — AI software, machine-learning
              systems, IoT prototypes and early-stage ventures.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <Button asChild variant="default" size="lg" className="max-[460px]:w-full">
                <a href="#buildos">
                  See BuildOS case study <ArrowRight size={14} />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="max-[460px]:w-full">
                <a href="#contact">Start a conversation</a>
              </Button>
            </motion.div>

            <motion.div
              className="hero-identity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.78 }}
            >
              <strong>Shaikh Mohibur Rahman</strong>
              <span>Founder-led Product Builder · Aurangabad, IN · Open to global relocation</span>
            </motion.div>
          </div>

          <motion.div
            className="hero-art"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <ProductGraphic />
          </motion.div>
        </div>

        <motion.dl
          className="hero-metrics"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          {HERO_METRICS.map((metric) => (
            <motion.div
              key={metric.label}
              className="hero-metric"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.dt
                className="text-xs font-mono uppercase tracking-wider text-text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {metric.label}
              </motion.dt>
              <motion.dd
                className="text-3xl font-bold text-text-primary tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {metric.prefix ?? ''}
                {metric.decimal !== undefined ? metric.value.toFixed(metric.decimal) : metric.value}
                {metric.suffix}
              </motion.dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
