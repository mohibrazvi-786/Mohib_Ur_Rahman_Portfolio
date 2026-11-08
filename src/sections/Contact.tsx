import { Mail, ArrowUpRight } from 'lucide-react'
import { siteContent } from '../data/content'
import { SectionReveal } from '../components/SectionReveal'
import { Button } from '@/components/ui/button'

export function Contact() {
  const { meta, contact } = siteContent

  return (
    <section id="contact" className="contact-section">
      <div className="site-container">
        <div className="contact-grid">
          <SectionReveal>
            <div>
              <span className="eyebrow">{contact.tag}</span>
              <h2 className="contact-title">
                Let&apos;s build something <em>meaningful.</em>
              </h2>
              <p className="contact-body">{contact.body}</p>

              <div className="contact-actions">
                <Button asChild variant="pill" size="auto" className="max-[460px]:w-full">
                  <a href={`mailto:${meta.email}`}>
                    <Mail size={14} /> Start a conversation
                  </a>
                </Button>
                <Button asChild variant="pill-outline" size="auto" className="max-[460px]:w-full">
                  <a href={meta.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn <ArrowUpRight size={13} />
                  </a>
                </Button>
                <Button asChild variant="pill-outline" size="auto" className="max-[460px]:w-full">
                  <a href={meta.github} target="_blank" rel="noopener noreferrer">
                    GitHub <ArrowUpRight size={13} />
                  </a>
                </Button>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <div className="contact-panel">
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <a className="contact-value" href={`mailto:${meta.email}`}>
                  {meta.email}
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Base</span>
                <span className="contact-value">{meta.location}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Status</span>
                <span className="contact-value">{meta.status}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Focus</span>
                <span className="contact-value">
                  AI / ML · Product · DeepTech · Founder&apos;s office
                </span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
