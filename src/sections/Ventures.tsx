import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '../data/content'
import { SectionReveal } from '../components/SectionReveal'
import { MediaLightbox, type LightboxItem } from '@/components/MediaLightbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const { ventures } = siteContent

const TABS = [
  { key: 'mesure', label: 'MeSure' },
  { key: 'bookflips', label: 'BookFlips' },
  { key: 'tohealth', label: 'ToHealth' },
  { key: 'nexmark', label: 'NexMark' },
] as const

type TabKey = (typeof TABS)[number]['key']

function EvidenceGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="evidence-grid">
      {items.map((item) => (
        <motion.div
          key={item.label}
          className="evidence-card"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="evidence-value">{item.value}</div>
          <div className="evidence-label">{item.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

function CertificateStrip({ items }: { items: { src: string; caption: string }[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const lightboxItems: LightboxItem[] = items.map((item) => ({
    src: item.src,
    alt: item.caption,
    title: item.caption,
  }))

  return (
    <>
      <div className="cert-strip">
        {items.map((item, i) => (
          <motion.button
            key={item.src}
            type="button"
            className="cert-item"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIndex(i)}
          >
            <div className="cert-media">
              <motion.img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            </div>
            <p className="cert-caption">{item.caption}</p>
          </motion.button>
        ))}
      </div>
      <MediaLightbox
        items={lightboxItems}
        index={index ?? 0}
        open={index !== null}
        onOpenChange={(open) => {
          if (!open) setIndex(null)
        }}
        onIndexChange={setIndex}
      />
    </>
  )
}

function Pipeline({ steps }: { steps: readonly string[] }) {
  return (
    <motion.div
      className="pipeline"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {steps.map((step, i) => (
        <motion.div
          key={step}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
        >
          <span className="pipeline-node">{step}</span>
          {i < steps.length - 1 && (
            <span className="pipeline-arrow" aria-hidden="true">
              →
            </span>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

function MesureCase() {
  const v = ventures.mesure

  return (
    <motion.div
      className="venture-case"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Badge>{v.tag}</Badge>
      </motion.div>
      <motion.h3
        className="venture-title"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {v.title}
      </motion.h3>
      <motion.p
        className="venture-subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {v.subtitle}
      </motion.p>
      <motion.p
        className="venture-tagline"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {v.tagline}
      </motion.p>

      <motion.div
        className="venture-video"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <video src={v.video} controls playsInline preload="metadata" />
      </motion.div>

      <motion.h4
        className="venture-label"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        Evidence
      </motion.h4>
      <EvidenceGrid items={v.evidence} />

      <motion.h4
        className="venture-label"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Build journey
      </motion.h4>
      <motion.div
        className="journey"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        {v.journey.map((step) => (
          <motion.div
            key={step.step}
            className="journey-step"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + v.journey.indexOf(step) * 0.05 }}
          >
            <div className="journey-title">{step.step}</div>
            <p className="journey-desc">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.h4
        className="venture-label"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Recognition
      </motion.h4>
      <CertificateStrip items={v.certificates} />
    </motion.div>
  )
}

function BookFlipsCase() {
  const v = ventures.bookflips

  return (
    <motion.div
      className="venture-case"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Badge>{v.tag}</Badge>
      </motion.div>
      <motion.h3
        className="venture-title"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {v.title}
      </motion.h3>
      <motion.p
        className="venture-subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {v.subtitle}
      </motion.p>

      <motion.div
        className="venture-metrics"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {v.metrics.map((metric) => (
          <motion.div
            key={metric.label}
            className="venture-metric"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + v.metrics.indexOf(metric) * 0.05 }}
          >
            <div className="venture-metric-value">{metric.value}</div>
            <div className="venture-metric-label">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="venture-story"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {v.story}
      </motion.p>

      <motion.h4
        className="venture-label"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        Pivot chain
      </motion.h4>
      <Pipeline steps={v.pivot} />
      <motion.p
        className="venture-note"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {v.pivotNote}
      </motion.p>
    </motion.div>
  )
}

function ToHealthCase() {
  const v = ventures.tohealth

  return (
    <motion.div
      className="venture-case"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Badge>{v.tag}</Badge>
      </motion.div>
      <motion.h3
        className="venture-title"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {v.title}
      </motion.h3>
      <motion.p
        className="venture-subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {v.subtitle}
      </motion.p>
      <motion.p
        className="venture-tagline"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {v.tagline}
      </motion.p>

      <motion.h4
        className="venture-label"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Evidence
      </motion.h4>
      <EvidenceGrid items={v.evidence} />

      <motion.h4
        className="venture-label"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        Pipeline
      </motion.h4>
      <Pipeline steps={v.pipeline} />
      <motion.p
        className="venture-note"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {v.disclaimer}
      </motion.p>
    </motion.div>
  )
}

function NexMarkCase() {
  const v = ventures.nexmark

  return (
    <motion.div
      className="venture-case"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Badge>{v.tag}</Badge>
      </motion.div>
      <motion.h3
        className="venture-title"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {v.title}
      </motion.h3>
      <motion.p
        className="venture-subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {v.subtitle}
      </motion.p>
      <motion.p
        className="venture-tagline"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {v.tagline}
      </motion.p>

      <motion.div
        className="venture-metrics"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {v.metrics.map((metric) => (
          <motion.div
            key={metric.label}
            className="venture-metric"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + v.metrics.indexOf(metric) * 0.05 }}
          >
            <div className="venture-metric-value">{metric.value}</div>
            <div className="venture-metric-label">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.h4
        className="venture-label"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        Pipeline
      </motion.h4>
      <Pipeline steps={v.pipeline} />

      <motion.h4
        className="venture-label"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Services
      </motion.h4>
      <motion.div
        className="service-list"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        {v.services.map((service, i) => (
          <motion.div
            key={service}
            className="service-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.05 }}
          >
            {service}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

const CASE_MAP: Record<TabKey, React.FC> = {
  mesure: MesureCase,
  bookflips: BookFlipsCase,
  tohealth: ToHealthCase,
  nexmark: NexMarkCase,
}

export function Ventures() {
  return (
    <section id="ventures" className="section section--tinted">
      <div className="site-container">
        <SectionReveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">Ventures</span>
              <h2 className="section-title">Built from real problems.</h2>
            </div>
            <p className="section-sub">
              Four ventures at different stages — from patent-filed DeepTech hardware to a
              community marketplace, healthcare research and a consulting practice.
            </p>
          </header>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <Tabs defaultValue="mesure" className="ventures-panel">
            <TabsList className="ventures-tabs">
              {TABS.map((tab) => (
                <TabsTrigger key={tab.key} value={tab.key} className="ventures-tab">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="ventures-content">
              <AnimatePresence mode="wait">
                {TABS.map((tab) => {
                  const ActiveCase = CASE_MAP[tab.key]
                  return (
                    <TabsContent
                      key={tab.key}
                      value={tab.key}
                      className="mt-0"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ActiveCase />
                      </motion.div>
                    </TabsContent>
                  )
                })}
              </AnimatePresence>
            </div>
          </Tabs>
        </SectionReveal>
      </div>
    </section>
  )
}
