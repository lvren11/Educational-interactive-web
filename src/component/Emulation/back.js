import { 
    useLoader,
    useThree 
} from "react-three-fiber";
import * as THREE from 'three';
import { useMemo } from 'react';

const Back = (props) =>{
    const texture = useLoader(
        THREE.TextureLoader,
        props.image
    );
    
    const { gl } = useThree();
    const formatted = useMemo(() => 
        new THREE.WebGLCubeRenderTarget(
            texture.image.height
        ).fromEquirectangularTexture(gl, texture)
    ,[])

    return (
        <primitive 
            attach = 'background'
            object={formatted}
        />
    )
}

export default Back;