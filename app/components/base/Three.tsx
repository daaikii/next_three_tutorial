"use client"
import { OrbitControls, Stats } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { FC } from "react"

import Light from "../light/Light";
import Floor from "../geometrys/Floor";
import SubSphereCylinder from "../geometrys/SubSphereCylinder";

const Three: FC = () => {
  return (
    <Canvas camera={{ position: [0, 20, 10] }} shadows className="!fixed top-0 left-0 z-[-1]">
      <Light />
      <SubSphereCylinder />
      <Floor />
      <OrbitControls />
      <Stats />
      <axesHelper args={[10]} />
    </Canvas>
  )
}

export default Three