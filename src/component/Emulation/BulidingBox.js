import {forwardRef, useImperativeHandle} from 'react';
import { useBox } from "use-cannon";
import { useThree } from 'react-three-fiber';
const BoundingBox = ({
    position = [0,0,0],
    offset = [0,0,0],
    dims = [1,1,1],
    visible = false,
    children
},ref) =>{
    useImperativeHandle(ref, () => ({
        handleFire
    }));
    const [gref, api] =useBox(() =>({mass:1000,args:dims,position:position}))
    const { camera, gl, scene } = useThree();
    const handleFire = (e) =>{
        const material = {"1":null,"2":null,"3":null}
        const area_x = [[-2,2],[2,6],[6,10]]
        const area_y = 1.5
        const area_z = [-2.5,2.5]
        for(let i=1; i<4;i++){
            let x = scene.children[i].children[0].position.x
            let y = scene.children[i].children[0].position.y
            let z = scene.children[i].children[0].position.z
            for(let j=0;j<3;j++){
                if(x > area_x[j][0] && x < area_x[j][1]){
                    if(y > area_y){
                        if(z > area_z[0] && z < area_z[1]){
                            material[(j+1).toString()] = i
                        }
                    }
                }
            }
        }
        //console.log(material) //0是iron 1 是lv 2是taoci
        return material
    }
    return(
        <group ref={gref} api={api}>
            <mesh scale={dims} visible={visible}>
                <boxBufferGeometry/>
                <meshPhysicalMaterial wireframe />
            </mesh>
            <group position={offset}>
                {children}
            </group>
        </group>
    )
}

export default forwardRef(BoundingBox);