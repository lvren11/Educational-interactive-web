import React from "react";
import { 
  useLoader,
  useFrame
 } from "react-three-fiber";
import { Html } from 'drei';
import * as THREE from 'three';
import { useBox } from 'use-cannon';

const styles = {
  text:{
    whiteSpace: 'nowrap',
    fontSize: '2rem',
    color: 'red',
    marginTop: '100px',
    userSelect: 'none'
  }
}

function Box(props) {
  const texture = useLoader(THREE.TextureLoader,props.image);
  const temperature = '温度'+ props.temp_number.toString()+'℃';
  const [ref, api] = useBox(() => ({mass:10,args:[1.5,1.5,1.5],...props}));
  // useFrame(({ clock }) => {
  //     console.log(clock)
  // })

  const handlePointerDown = e =>{
    // console.log(e)
    e.object.active = true;
    if(window.activeMesh){
      window.activeMesh.active = false
    }
    window.activeMesh = e.object
  }

  return (
      <mesh 
      ref={ref} 
      api={api}
      {...props} 
      castShadow
      onPointerDown={handlePointerDown}
      >
        <Html 
          style={{
            whiteSpace: 'nowrap',
            fontSize: '1.5rem',
            color: 'red',
            marginTop: '-80px',
            userSelect: 'none'
            }} 
          center distanceFactor={10}
        >
            {temperature}
        </Html>
        <boxBufferGeometry args={[1.5,1.5,1.5]}/>
        <meshBasicMaterial map={texture} />
      </mesh>
  )
}

export default Box;