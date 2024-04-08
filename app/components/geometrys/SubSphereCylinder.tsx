import { FC, useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { Brush, Evaluator, SUBTRACTION } from "three-bvh-csg"

const SubSphereCylinder: FC = () => {
  const ref = useRef({} as THREE.Mesh)
  const { camera } = useThree()

  // IcosahedronGeometry
  const baseBrush = new Brush(
    new THREE.IcosahedronGeometry(2, 3),
  );
  baseBrush.updateMatrix();

  // args(topRad,bottomRad,height,radialSegments)
  const brush = new Brush(
    new THREE.CylinderGeometry(1, 1, 5, 30),
  );
  brush.updateMatrix()

  const evaluator = new Evaluator();



  //スクロール時のアニメーション--------------------------
  let inertial: number = 0
  let inertialScrollPercent: number = 0

  //線形補完
  function lerp(startPosition: number, endPosition: number, a: number) {
    return (1 - a) * startPosition + a * endPosition
  }

  // 設定した範囲での割合
  function scalePercent(start: number, end: number) {
    return (inertialScrollPercent - start) / (end - start)
  }

  let rotationX: number = 0

  let animationScripts = [
    {
      start: 0,
      end: 50,
      scrollFunc: () => {
        camera.position.y = lerp(20, 15, scalePercent(0, 50))
      }
    },
    {
      start: 50,
      end: 75,
      scrollFunc: () => {
        camera.position.z = lerp(10, 15, scalePercent(50, 75))
        rotationX = camera.rotation.x
      }
    },
    {
      start: 75,
      end: 100,
      scrollFunc: () => {
        camera.position.y = lerp(15, 10, scalePercent(75, 100))
        camera.position.z = lerp(15, 5, scalePercent(75, 100))
        camera.rotation.x = lerp(rotationX, -Math.PI / 12, scalePercent(75, 100))
      }
    },
  ]

  function setScrollPercent() {
    // 慣性の値の設定
    // inertial += ((document.documentElement.scrollTop || document.body.scrollTop) - inertial) * 0.08;

    //ページ全体のスクロールの位置(%)
    inertialScrollPercent = (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
      100;
  }

  function playScrollAnimations() {
    animationScripts.forEach((item) => {
      if (inertialScrollPercent >= item.start && inertialScrollPercent <= item.end) {
        item.scrollFunc();
      }
    });
  }
  //---------------------------------------------------------


  useFrame(() => {
    const t = window.performance.now() + 9000;
    baseBrush.rotation.x = t * 0.0001;
    baseBrush.rotation.y = t * 0.00025;
    baseBrush.rotation.z = t * 0.0005;
    baseBrush.updateMatrixWorld();

    brush.rotation.x = t * - 0.0002;
    brush.rotation.y = t * - 0.0005;
    brush.rotation.z = t * - 0.001;
    const s = 0.5 + 0.5 * (1 + Math.sin(t * 0.001));
    brush.scale.set(s, 1, s)
    brush.updateMatrixWorld()

    evaluator.useGroups = true
    const result = evaluator.evaluate(baseBrush, brush, SUBTRACTION)
    ref.current.geometry = result.geometry

    setScrollPercent()
    playScrollAnimations()
  });

  return (
    <mesh
      ref={ref}
      castShadow
      position={[0, 10, 0]}
    >
      <meshStandardMaterial flatShading />
    </mesh>
  )
}

export default SubSphereCylinder