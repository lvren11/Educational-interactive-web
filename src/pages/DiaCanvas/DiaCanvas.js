import React, {Suspense, useRef, useState, useEffect} from "react";
import { 
  Canvas
 } from "react-three-fiber";
import { Physics } from 'use-cannon';
import Obtri from '../../component/Emulation/Obtri';
import Back from '../../component/Emulation/back';
import Box from '../../component/Emulation/Box';
import Floor from '../../component/Emulation/Floor';
import Dragable from '../../component/Emulation/Dragable';
import BoundingBox from "../../component/Emulation/BulidingBox";
import Model from '../../component/Emulation/Model';
import iron from '../../assets/canvasig/iron.jpg';
import lv from '../../assets/canvasig/lv.jpg';
import taoci from '../../assets/canvasig/taoci.jpg';
import backimag from '../../assets/canvasig/background.jpg';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import CreateIcon from '@material-ui/icons/Create';
import PauseIcon from '@material-ui/icons/Pause';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import pot_data from '../../../mock/data/pot_temp.json';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  bu:{
    // background:'rgb(249, 244, 205)',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  }
}));

export default function DiaCanvas(){
    const shareRef = useRef();
    const classes = useStyles();
    const [temp_number, setTemp] = useState([pot_data[0].begin,pot_data[1].begin,pot_data[2].begin]);
    // const [temp_number2, setTemp2] = useState(pot_data[1].begin); 
    // const [temp_number3, setTemp3] = useState(pot_data[2].begin); 
    const [count, setCount] = useState([0,0,0]);
    const [start,setstart] = useState(0);
    const [new_position,set_now] = useState({"1":null,"2":null,"3":null});
    const timer = useRef();
    const firepot = (number) => {
      // onCallback就是子组件暴露给父组件的方法
      const now_position = shareRef.current.handleFire(number);
      //console.log(now_position);
      set_now((prev) => ({
        ...prev,
        "1": now_position["1"],
        "2": now_position["2"],
        "3": now_position["3"]
      }));
      setstart(number);
    }
    useEffect(() => {
      timer.current = setInterval(() => {
        if(start != 0){
          // console.log(new_position);
          // console.log(count);
          // console.log(start);
          const pot_number = new_position[start.toString()];
          const xunhuan_list = [15,2,3]
          const offest_xunhuan = [2,1,2]
          // console.log(count[pot_number-1]);
          if(pot_number != null){
            if(pot_data[0].fire[count[pot_number-1]] != undefined){
              setTemp((prev) => {
                prev[pot_number-1] = pot_data[0].fire[count[pot_number-1]];
                const arrCopy = prev.slice();
                return arrCopy;
              });
            }
            else{
              setTemp((prev) => {
                prev[pot_number-1] = pot_data[0].xuhuan[(count[pot_number-1] - offest_xunhuan[pot_number-1])%xunhuan_list[pot_number-1]];
                const arrCopy = prev.slice();
                return arrCopy;
              });
            }
            setCount((prev) => {
              prev[pot_number-1] = prev[pot_number-1] + 1;
              const arrCopy = prev.slice();
              return arrCopy;
            });
          }
        }
      }, 1000);
      return () => clearInterval(timer.current);
    }, [count,start]);

    const onPause = () => {
      clearInterval(timer.current);
    }  
    return(
        <div style={{height:'85vh',width:'100vw'}}>
            <Canvas
              // shadowMap
              style={{background:'white'}}
              // camera={{position:[7, 7, 7]}}
              // shadows="true"
              // dpr={[1, 2]} 
              // gl={{ alpha: false }} 
              camera={{ position: [0, 3, 10] }} //, fov: 45
            >
              <ambientLight intensity={0.5}/>
              <Obtri />
              {/* <axesHelper args={[5]}/> */}
              {/* <Suspense fallback={null}>
                <Back image={backimag}/>
              </Suspense> */}
              <Physics>
                <Suspense fallback={null}>
                  <Dragable transformGroup>
                    <Box position={[-8, 1.2, 0]} image={iron} name="iron" temp_number={temp_number[0]}/>
                  </Dragable>
                </Suspense>
                <Suspense fallback={null}>
                  <Dragable transformGroup> 
                    <Box position={[-6, 1.2, 0]} image={lv} name="lv" temp_number={temp_number[1]}/>
                  </Dragable>
                </Suspense>
                <Suspense fallback={null}>
                  <Dragable transformGroup>
                    <Box position={[-4, 1.2, 0]} image={taoci} name="taoci" temp_number={temp_number[2]}/>
                  </Dragable>
                </Suspense>
                <Suspense fallback={null}>
                  <Floor args={[0,-0.5,0]} />
                </Suspense>
                <Suspense fallback={null}>
                    <BoundingBox 
                      // visible 
                      ref={shareRef}
                      position={[0,3,0]}
                      dims={[4,1.5,4.5]}
                      offset={[0,-0.2,-0.3]}
                    >
                      <Model 
                        path='/model/stove2/scene.gltf'
                        scale={new Array(3).fill(0.5)}
                      />
                    </BoundingBox>
                </Suspense>
                <Suspense fallback={null}>
                    <BoundingBox 
                      // visible 
                      position={[4,3,0]}
                      dims={[4,1.5,4.5]}
                      offset={[0,-0.2,-0.3]}
                    >
                      <Model 
                        path='/model/stove3/scene.gltf'
                        scale={new Array(3).fill(0.5)}
                      />
                    </BoundingBox>
                </Suspense>
                <Suspense fallback={null}>
                    <BoundingBox 
                      // visible 
                      position={[8,3,0]}
                      dims={[4,1.5,4.5]}
                      offset={[0,-0.2,-0.3]}
                    >
                      <Model 
                        path='/model/detailed_stove/scene.gltf'
                        scale={new Array(3).fill(0.5)}
                      />
                    </BoundingBox>
                </Suspense>
              </Physics>
            </Canvas>
            <div className={classes.bu}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<FireplaceIcon />}
                onClick={() => firepot(1)}
              >
                加热1号
              </Button>
              {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<FireplaceIcon />}
                onClick={() => firepot(2)}
              >
                加热2号
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<FireplaceIcon/>}
                onClick={() => firepot(3)}
              >
                加热3号
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<PauseIcon />}
                onClick={onPause}
              >
                暂停
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<RotateLeftIcon />}
                onClick={onPause}
              >
                恢复
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CreateIcon/>}
              >
                记录
              </Button>
            </div>
        </div>
    )
}