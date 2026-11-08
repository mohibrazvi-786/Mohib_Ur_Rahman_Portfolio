import { useState, useEffect } from 'react'

export function ResponsiveTester() {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [device, setDevice] = useState('desktop')

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      setWidth(w)
      setHeight(h)
      
      if (w < 390) setDevice('mobile-small')
      else if (w < 768) setDevice('mobile')
      else if (w < 1024) setDevice('tablet')
      else if (w < 1440) setDevice('laptop')
      else if (w < 1920) setDevice('desktop')
      else setDevice('wide-desktop')
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#252A30] text-white px-4 py-2 rounded-lg text-xs font-mono">
      <div>Device: {device}</div>
      <div>Viewport: {width} × {height}</div>
      <div>Theme: Light</div>
    </div>
  )
}