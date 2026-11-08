import { siteContent } from '../data/content'
import { SectionReveal } from '../components/SectionReveal'
import { Badge } from '@/components/ui/badge'

const TONES = ['amber', 'mint', 'sky'] as const

export function TechStack() {
  const entries = Object.entries(siteContent.techStack)

  return (
    <section id="tech-stack" className="section">
      <div className="site-container">
        <SectionReveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">06 — Toolkit</span>
              <h2 className="section-title">Range with a point of view.</h2>
            </div>
            <p className="section-sub">
              Software, machine learning, embedded systems and commercial thinking — chosen for
              the problem, not for the logo wall.
            </p>
          </header>
        </SectionReveal>

        <div className="stack-grid">
          {entries.map(([category, skills], i) => {
            const tone = TONES[i % TONES.length]
            return (
              <SectionReveal key={category} direction="up" delay={i * 0.05}>
                <article className={`stack-card stack-card--${tone}`}>
                  <h3 className="stack-cat">{category}</h3>
                  <div className="stack-pills">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={tone === 'amber' ? 'default' : tone === 'mint' ? 'mint' : 'sky'}
                        className="rounded-md px-2 py-1 text-[9px] tracking-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </article>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
