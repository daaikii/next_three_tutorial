"use client"

import { FC, useRef } from "react";
import * as THREE from "three"
import { useFrame } from "@react-three/fiber";

type Props = JSX.IntrinsicElements['mesh']

const Box: FC<Props> = (props) => {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => ref.current.rotation.x += 0.01)
  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

export default Box