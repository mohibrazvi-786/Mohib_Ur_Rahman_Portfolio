import { siteContent } from '../data/content'
import { SectionReveal } from '../components/SectionReveal'

export function HowIWork() {
  return (
    <section id="how-i-work" className="section section--tinted">
      <div className="site-container">
        <SectionReveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">09 — Process</span>
              <h2 className="section-title">From ambiguity to evidence.</h2>
            </div>
            <p className="section-sub">
              A repeatable loop, not a rigid playbook. Every stage exists to reduce a specific
              kind of uncertainty.
            </p>
          </header>
        </SectionReveal>

        <div className="process-grid">
          {siteContent.howIWork.map((step, i) => (
            <SectionReveal key={step.step} direction="up" delay={i * 0.04}>
              <article className="process-card" data-index={String(i + 1).padStart(2, '0')}>
                <span className="process-num">STEP {String(i + 1).padStart(2, '0')}</span>
                <h3 className="process-step">{step.step}</h3>
                <p className="process-desc">{step.desc}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
