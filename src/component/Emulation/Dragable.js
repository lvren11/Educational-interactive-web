import {
    DragControls
} from 'three/examples/jsm/controls/DragControls';
import {useRef, useEffect, useState} from 'react';
import { useThree, extend } from 'react-three-fiber';

extend({ DragControls });
//react 二次刷新three鼠标失灵 (怎么解决)
const Dragable = (props) =>{
    const groupRef = useRef();
    const [children, setChildren] = useState([]);
    const controlsRef = useRef();
    const { camera, gl, scene } = useThree();

    useEffect(() =>{
        setChildren(groupRef.current.children)
    },[])
    useEffect(() =>{
         controlsRef.current.addEventListener(
            'hoveron',
            e => {
                // console.log(scene);
                scene.orbitControls.enabled = false
            }
         )
         controlsRef.current.addEventListener(
            'hoveroff',
            e => scene.orbitControls.enabled = true
         )
         controlsRef.current.addEventListener(
            'dragstart',
            e => e.object.api?.mass.set(0)
         )
         controlsRef.current.addEventListener(
            'dragend',
            e => e.object.api?.mass.set(10)
         )
         controlsRef.current.addEventListener(
            'drag',
            e => {
                if(e.object.api){
                    e.object.api.position.copy(e.object.position);
                    e.object.api.velocity.set(0,0,0)
                }
            }
         )
    },[children])
    return (
        <group ref = {groupRef}>
            <dragControls
                transformGroup={props.transformGroup}
                ref={controlsRef}
                args={[children, camera, gl.domElement]} 
            />
                {props.children}
        </group>
    )
}

export default Dragable;

