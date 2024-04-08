import { FC } from "react"

const Floor: FC = () => {
  return (
    <mesh position={[0, -10, 0]} receiveShadow rotation-x={-Math.PI / 2} >
      <planeGeometry args={[50, 50]} />
      <shadowMaterial transparent />
    </mesh>
  )
}

export default Floor