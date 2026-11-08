import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { ParticleField } from './ParticleField'
import { FloatingGeo } from './FloatingGeo'

export function HeroScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  if (isMobile) {
    return (
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(255,184,0,0.08) 0%, transparent 60%), #121519',
        }}
      />
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 400], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <fog attach="fog" args={[0x121519, 0.001, 1800]} />
        <ambientLight intensity={0.15} color="#E9E6DF" />
        <directionalLight position={[50, 80, 100]} intensity={0.4} color="#E9E6DF" />
        <ParticleField />
        <FloatingGeo />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.9}
            luminanceSmoothing={0.9}
            intensity={0.3}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
