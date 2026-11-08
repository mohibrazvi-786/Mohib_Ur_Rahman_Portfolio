import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Lenis from 'lenis'
import { useStore } from '../store'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { id: 'builds', label: 'Work' },
  { id: 'buildos', label: 'BuildOS' },
  { id: 'ventures', label: 'Ventures' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

let lenisInstance: Lenis | null = null

function getLenis() {
  if (!lenisInstance) {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })
  }
  return lenisInstance
}

function goTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const l = getLenis()
  l.scrollTo(el, { offset: -88 })
}

export function Navbar() {
  const activeSection = useStore((s) => s.activeSection)
  const scrollProgress = useStore((s) => s.scrollProgress)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navigate = (id: string) => {
    setMobileOpen(false)
    goTo(id)
  }

  return (
    <>
      <motion.nav
        className="site-nav"
        aria-label="Primary"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
      >
        <div className="nav-bar" data-scrolled={scrolled}>
          <button className="nav-logo" onClick={() => navigate('hero')} aria-label="Back to top">
            <span className="nav-logo-mark" aria-hidden="true">
              SMR
            </span>
            <span className="nav-logo-text">
              Shaikh Mohibur Rahman
              <small>Founder-led product builder</small>
            </span>
          </button>

          <ul className="nav-links">
            {NAV_LINKS.map((link, index) => (
              <li key={link.id}>
                <button
                  className="nav-link"
                  data-active={activeSection === link.id}
                  aria-current={activeSection === link.id ? 'location' : undefined}
                  onClick={() => navigate(link.id)}
                >
                  <span className="nav-link-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <span className="nav-availability">
              <span className="status-dot" aria-hidden="true" />
              Open to relocation
            </span>
            <Button asChild size="sm" className="nav-cta">
              <a href="#contact">Start a conversation</a>
            </Button>
            <button
              className="nav-menu-btn"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <span
            className="nav-progress"
            style={{ transform: `scaleX(${Math.min(1, Math.max(0, scrollProgress))})` }}
            aria-hidden="true"
          />
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <ul className="mobile-menu-links">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.28 }}
                >
                  <button
                    className="mobile-menu-link"
                    data-active={activeSection === link.id}
                    aria-current={activeSection === link.id ? 'location' : undefined}
                    onClick={() => navigate(link.id)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mobile-menu-foot">
              <span>shaikhmohibsm@gmail.com</span>
              <span>Aurangabad, IN</span>
              <span>Open to global relocation</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
