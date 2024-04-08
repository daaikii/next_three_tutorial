import { useControls } from "leva"

const Light = () => {
  const control = useControls("directionalLight", {
    visible: true,
    position: {
      x: 4,
      y: 30,
      z: 4,
    },
    castShadow: true,
  })
  return (
    <>
      <hemisphereLight castShadow />
      <directionalLight
        castShadow={control.castShadow}
        position={[control.position.x, control.position.y, control.position.z]}
        visible={control.visible}
        color={"0xffffff"}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-top={50}
      />
    </>
  )
}

export default Light