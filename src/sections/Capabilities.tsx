import { SectionReveal } from '../components/SectionReveal'
import { siteContent } from '../data/content'
import { Badge } from '@/components/ui/badge'

export function Capabilities() {
  return (
    <section id="capabilities" className="section section--tinted">
      <div className="site-container">
        <SectionReveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">01 — Capabilities</span>
              <h2 className="section-title">What I actually build.</h2>
            </div>
            <p className="section-sub">
              Four connected disciplines, applied from first conversation to working system:
              product judgment, AI-native execution, physical computing, and the commercial path.
            </p>
          </header>
        </SectionReveal>

        <div className="cap-grid">
          {siteContent.capabilities.map((cap, i) => (
            <SectionReveal key={cap.num} direction="up" delay={i * 0.06}>
              <article className="cap-card">
                <span className="cap-num" aria-hidden="true">
                  {cap.num}
                </span>
                <h3 className="cap-title">{cap.title}</h3>
                <div className="cap-tags">
                  {cap.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
