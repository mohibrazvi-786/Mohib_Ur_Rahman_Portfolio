import { SectionReveal } from '../components/SectionReveal'
import { siteContent } from '../data/content'

export function About() {
  const { about, meta } = siteContent

  return (
    <section id="about" className="section section--tinted">
      <div className="site-container">
        <SectionReveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">07 — About</span>
              <h2 className="section-title">{about.title}</h2>
            </div>
            <p className="section-sub">
              A founder-led builder with a bias for working prototypes, real users and evidence
              over presentation decks.
            </p>
          </header>
        </SectionReveal>

        <div className="about-grid">
          <SectionReveal direction="left">
            <div className="about-portrait">
              <div className="about-frame">
                <img
                  src="assets/portrait/mohib-portrait-primary.jpg"
                  alt="Shaikh Mohibur Rahman"
                  loading="lazy"
                />
                <span className="about-frame-label">Aurangabad, Maharashtra · IN</span>
              </div>
              <div className="about-caption">
                <span>{meta.fullName}</span>
                <span>{meta.status}</span>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal direction="right" delay={0.1}>
            <div className="about-copy">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="about-flow">
                <div className="about-flow-label">Builder flow</div>
                <div className="about-flow-list">
                  {about.flow.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="about-flow-step">{step}</span>
                      {i < about.flow.length - 1 && (
                        <span className="about-flow-arrow" aria-hidden="true">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
