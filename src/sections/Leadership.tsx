import { siteContent } from '../data/content'
import { SectionReveal } from '../components/SectionReveal'

export function Leadership() {
  return (
    <section id="leadership" className="section section--tinted">
      <div className="site-container">
        <SectionReveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">05 — Leadership</span>
              <h2 className="section-title">Building people, not just products.</h2>
            </div>
            <p className="section-sub">
              Leading teams, running programs and teaching the basics — the parts of the work that
              compound beyond a single launch.
            </p>
          </header>
        </SectionReveal>

        <div className="lead-grid">
          {siteContent.leadership.map((item, i) => (
            <SectionReveal key={item.title} direction="up" delay={i * 0.08}>
              <article className="lead-card">
                <h3 className="lead-title">{item.title}</h3>
                <p className="lead-role">{item.role}</p>

                <div className="lead-stats">
                  {item.stats.map((stat) => (
                    <div className="lead-stat" key={stat.label}>
                      <div className="lead-value">{stat.value}</div>
                      <div className="lead-label">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {item.certificate && (
                  <div className="lead-cert">
                    <img
                      src={item.certificate.src}
                      alt={item.certificate.caption}
                      loading="lazy"
                    />
                    <p>{item.certificate.caption}</p>
                  </div>
                )}
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
