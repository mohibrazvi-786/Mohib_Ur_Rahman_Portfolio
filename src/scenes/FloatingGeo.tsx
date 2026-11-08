import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FloatingGeo() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y += 0.002
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.08
    groupRef.current.position.y = Math.sin(t * 0.4) * 6
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh>
        <torusKnotGeometry args={[40, 8, 128, 16, 2, 3]} />
        <meshBasicMaterial
          color={0xFFB800}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[20, 1]} />
        <meshBasicMaterial
          color={0xE9E6DF}
          transparent
          opacity={0.03}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[70, 72, 64]} />
        <meshBasicMaterial
          color={0xFFB800}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
