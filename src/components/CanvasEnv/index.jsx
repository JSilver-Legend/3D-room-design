import React from 'react'
import { OrbitControls } from '@react-three/drei'

const CanvasEnv = () => {
  return (
    <>
      <OrbitControls
        target={[0, 0, 0]}
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
      />
      <directionalLight intensity={3} position={[100, 100, -50]} />
      <directionalLight intensity={1.5} position={[-100, 100, 50]} />
    </>
  )
}

export default CanvasEnv