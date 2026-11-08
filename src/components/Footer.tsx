import { useStore } from '../store'
import { siteContent } from '../data/content'

const NAV_LINKS = [
  { id: 'builds', label: 'Work' },
  { id: 'buildos', label: 'BuildOS' },
  { id: 'ventures', label: 'Ventures' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export function Footer() {
  const isLoaded = useStore((s) => s.isLoaded)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <p className="footer-name">{siteContent.meta.name}</p>
            <p className="footer-role">{siteContent.meta.title}</p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <button key={link.id} className="footer-link" onClick={() => scrollTo(link.id)}>
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 {siteContent.meta.name}. All rights reserved.</p>
          <span className="footer-status" style={{ opacity: isLoaded ? 1 : 0 }}>
            <span className="status-dot" aria-hidden="true" />
            System online · Aurangabad, IN
          </span>
        </div>
      </div>
    </footer>
  )
}
