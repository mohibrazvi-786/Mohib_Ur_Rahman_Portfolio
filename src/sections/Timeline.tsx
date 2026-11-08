import { siteContent } from '../data/content'
import { SectionReveal } from '../components/SectionReveal'
import { Badge } from '@/components/ui/badge'

export function Timeline() {
  return (
    <section id="execution-log" className="section">
      <div className="site-container">
        <SectionReveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">04 — Execution log</span>
              <h2 className="section-title">Momentum, not a highlight reel.</h2>
            </div>
            <p className="section-sub">
              The work behind the claims: builds, field tests, filings, recognition, teaching and
              consulting — in the order it happened.
            </p>
          </header>
        </SectionReveal>

        <SectionReveal>
          <div className="log-list">
            {siteContent.timeline.map((item, i) => (
              <div className="log-row" key={`${item.title}-${item.tag}`}>
                <span className="log-index">{String(i + 1).padStart(2, '0')}</span>
                <Badge
                  variant="outline"
                  className="justify-self-start rounded-md px-2 py-1 text-[8px] tracking-[0.1em]"
                >
                  {item.tag}
                </Badge>
                <h3 className="log-title">{item.title}</h3>
                <p className="log-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
