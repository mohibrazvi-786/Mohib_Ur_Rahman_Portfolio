import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../store'

export function FloatingIco() {
  const groupRef = useRef<THREE.Group>(null!)
  const scrollProgress = useStore((s) => s.scrollProgress)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y += 0.003
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15
    groupRef.current.position.y = Math.sin(t * 0.6) * 8
    groupRef.current.rotation.z = scrollProgress * Math.PI * 0.5
  })

  return (
    <group ref={groupRef} position={[0, 20, 0]}>
      <lineSegments>
        <wireframeGeometry args={[new THREE.IcosahedronGeometry(60, 1)]} />
        <lineBasicMaterial color={0xFFB800} transparent opacity={0.35} />
      </lineSegments>
      <mesh>
        <icosahedronGeometry args={[28, 1]} />
        <meshBasicMaterial color={0xFFB800} transparent opacity={0.04} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[80, 85, 64]} />
        <meshBasicMaterial color={0xFFB800} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
