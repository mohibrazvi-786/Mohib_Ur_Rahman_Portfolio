import { useState } from 'react'
import { siteContent } from '../data/content'
import { SectionReveal } from '../components/SectionReveal'
import { MediaLightbox, type LightboxItem } from '@/components/MediaLightbox'
import { Badge } from '@/components/ui/badge'

function CertificateCard({
  src,
  title,
  badge,
  caption,
  onClick,
}: {
  src: string
  title?: string
  badge?: string
  caption?: string
  onClick: () => void
}) {
  return (
    <button className="rec-card" onClick={onClick} aria-label={`Open ${title || caption}`}>
      <div className="rec-media">
        <img src={src} alt={title || caption} loading="lazy" />
        {badge && (
          <Badge className="absolute right-2 top-2 border-accent/30 bg-black/70 backdrop-blur-sm">
            {badge}
          </Badge>
        )}
      </div>
      <h4 className="rec-title">{title || caption}</h4>
      {caption && title && <p className="rec-caption">{caption}</p>}
    </button>
  )
}

export function Recognition() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const allItems: LightboxItem[] = [
    ...siteContent.recognition.featured.map((cert) => ({
      src: cert.src,
      alt: cert.title,
      title: cert.title,
      badge: cert.badge,
    })),
    ...siteContent.recognition.additional.map((cert) => ({
      src: cert.src,
      alt: cert.caption,
      title: cert.caption,
    })),
  ]

  return (
    <section id="recognition" className="section">
      <div className="site-container">
        <SectionReveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">08 — Recognition</span>
              <h2 className="section-title">Receipts, not adjectives.</h2>
            </div>
            <p className="section-sub">
              Awards, competition results and program credentials earned while building and
              validating the work.
            </p>
          </header>
        </SectionReveal>

        <div className="rec-grid">
          {siteContent.recognition.featured.map((cert, i) => (
            <SectionReveal key={cert.src} direction="up" delay={i * 0.04}>
              <CertificateCard
                src={cert.src}
                title={cert.title}
                badge={cert.badge}
                onClick={() => setLightboxIndex(i)}
              />
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <h3 className="rec-subhead">Additional certificates</h3>
        </SectionReveal>

        <div className="rec-additional">
          {siteContent.recognition.additional.map((cert, i) => (
            <CertificateCard
              key={cert.src}
              src={cert.src}
              caption={cert.caption}
              onClick={() =>
                setLightboxIndex(siteContent.recognition.featured.length + i)
              }
            />
          ))}
        </div>
      </div>

      <MediaLightbox
        items={allItems}
        index={lightboxIndex ?? 0}
        open={lightboxIndex !== null}
        onOpenChange={(open) => {
          if (!open) setLightboxIndex(null)
        }}
        onIndexChange={setLightboxIndex}
      />
    </section>
  )
}
