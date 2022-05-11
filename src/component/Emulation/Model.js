import { useLoader,useUpdate } from "react-three-fiber";
import { 
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader';

const Model = props =>{
    const model = useLoader(
        GLTFLoader,
        props.path
    )

    return(
        <primitive 
            object={model.scene}
            scale={props.scale}
            rotation-y={Math.PI*3/2}
            // rotation-x={Math.PI/2}
        />
    )
}
export default Model;