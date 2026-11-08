import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import { BuildOSHero } from './sections/BuildOSHero'
import { Capabilities } from './sections/Capabilities'
import { AiNative } from './sections/AiNative'
import { Builds } from './sections/Builds'
import { BuildOS } from './sections/BuildOS'
import { Ventures } from './sections/Ventures'
import { Timeline } from './sections/Timeline'
import { Leadership } from './sections/Leadership'
import { TechStack } from './sections/TechStack'
import { About } from './sections/About'
import { Recognition } from './sections/Recognition'
import { HowIWork } from './sections/HowIWork'
import { Contact } from './sections/Contact'
import { Footer } from './components/Footer'
import { useStore } from './store'

export default function App() {
  const { setLoaded, setScrollProgress, setActiveSection } = useStore()

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis: Lenis | null = null
    let onScroll: (() => void) | null = null

    if (reduceMotion) {
      onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrollProgress(max > 0 ? window.scrollY / max : 0)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
    } else {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })

      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => lenis?.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
      lenis.on('scroll', () => setScrollProgress(lenis?.progress ?? 0))
    }

    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))

    const loadTimer = window.setTimeout(() => setLoaded(true), 1200)

    // Deferred so deep links into long sections resolve after the first paint.
    const hash = window.location.hash.slice(1)
    const hashTarget = hash ? document.getElementById(hash) : null
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '64', 10)
    const hashOffset = navHeight + 12
    let fontsTimer: number | null = null
    let cancelled = false

    const scrollToHash = () => {
      if (!hashTarget || cancelled) return
      if (lenis) lenis.scrollTo(hashTarget, { offset: -hashOffset })
      else hashTarget.scrollIntoView()
    }

    const hashTimer = hashTarget ? window.setTimeout(scrollToHash, 300) : null

    // Web fonts change line metrics; re-align once they settle so hash links land correctly.
    if (hashTarget) {
      document.fonts?.ready.then(() => {
        if (!cancelled) fontsTimer = window.setTimeout(scrollToHash, 80)
      })
    }

    return () => {
      cancelled = true
      window.clearTimeout(loadTimer)
      if (hashTimer) window.clearTimeout(hashTimer)
      if (fontsTimer) window.clearTimeout(fontsTimer)
      if (lenis) lenis.destroy()
      if (onScroll) window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [setActiveSection, setLoaded, setScrollProgress])

  return (
    <>
      {/* Film grain overlay */}
      <div className="grain" aria-hidden="true" />

      <Loader />
      <Navbar />

      <main id="main-content">
        <Hero />
        <BuildOSHero />
        <Capabilities />
        <AiNative />
        <Builds />
        <BuildOS />
        <Ventures />
        <Timeline />
        <Leadership />
        <TechStack />
        <About />
        <Recognition />
        <HowIWork />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
