import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const outerX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 })
  const outerY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    setIsTouchDevice(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true)
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
    }
  }, [isTouchDevice, mouseX, mouseY])

  if (isTouchDevice) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          width: 6,
          height: 6,
          background: '#E9E6DF',
          translateX: '-50%',
          translateY: '-50%',
        } as any}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: outerX,
          y: outerY,
          width: 24,
          height: 24,
          border: '1px solid rgba(233, 230, 223, 0.3)',
          translateX: '-50%',
          translateY: '-50%',
        } as any}
        animate={{
          borderColor: isHovering
            ? 'rgba(255, 184, 0, 0.6)'
            : 'rgba(233, 230, 223, 0.3)',
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  )
}
