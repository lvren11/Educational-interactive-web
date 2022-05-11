import React from "react";
import { 
  useLoader
 } from "react-three-fiber";
import { usePlane } from "use-cannon";
import * as THREE from 'three';
import floorimg from '../../assets/canvasig/floor.jpg';

export default function Ground(props) {
  const texture = useLoader(THREE.TextureLoader, floorimg);
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <planeGeometry attach="geometry" args={[30, 10]} />
      <meshStandardMaterial color={"#dddddd"} map={texture} side={THREE.DoubleSide}/>
    </mesh>
  );
}