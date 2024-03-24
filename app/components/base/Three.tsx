"use client"

import { FC } from "react"
import { Canvas } from "@react-three/fiber"

import Box from "@/app/components/geometrys/Box"

const Three: FC = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}

export default Three