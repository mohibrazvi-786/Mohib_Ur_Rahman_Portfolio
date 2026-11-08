import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { siteContent } from '../data/content'
import { SectionReveal } from '../components/SectionReveal'

const { aiNative } = siteContent

export function AiNative() {
  const pipelineRef = useRef<HTMLDivElement>(null)
  const pipelineInView = useInView(pipelineRef, { once: true, margin: '-80px' })

  return (
    <section id="ai-native" className="section">
      <div className="site-container">
        <SectionReveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">02 — Operating principle</span>
              <h2 className="section-title">I build at AI speed.</h2>
            </div>
            <p className="section-sub">
              AI is leverage, not a shortcut. The thinking stays human; the distance between an
              idea and a tested product gets shorter.
            </p>
          </header>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="ai-panel">
            <div className="ai-copy">
              <h3>{aiNative.title}</h3>
              <p>{aiNative.body}</p>
              <p className="ai-principle">{aiNative.principle}</p>
            </div>

            <div className="ai-pipeline" ref={pipelineRef} aria-label="Product delivery pipeline">
              {aiNative.pipeline.map((step, i) => (
                <motion.div
                  className="ai-step"
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={pipelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
                >
                  <span className="ai-step-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ai-step-name">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
