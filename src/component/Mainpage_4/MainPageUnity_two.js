import React, { useEffect, useRef, useImperativeHandle, forwardRef}from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { ThemeProvider} from '@material-ui/core/styles';
import Table from '../Table/table';
import Accordingextend from '../Extends/Extend_Accordion';
import tabledata  from '../../../mock/data/exdata_4.json';
import Unity, { UnityContext } from "react-unity-webgl";
import util from '../../../utils/util';
import example from '../../assets/another/fouth.png';
import {
  theme,
  useStyles,
  BootstrapInput
} from '../../assets/css/Main_css';
  
function showhtml(htmlString){
    var html = {__html:htmlString};
    return   <div dangerouslySetInnerHTML={html}></div> ;
}
const unityContext = new UnityContext({
  loaderUrl: "/Fourth/Page4/Build/Buildfile.loader.js", // public下目录
  dataUrl: "/Fourth/Page4/Build/Buildfile.data.unityweb",
  frameworkUrl: "/Fourth/Page4/Build/Buildfile.framework.js.unityweb",
  codeUrl: "/Fourth/Page4/Build/Buildfile.wasm.unityweb",
  streamingAssetsUrl: "/Fourth/Page4/StreamingAssets",
 });
function MainPageUnity(props, parentRef) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [table_data,settabledata] = React.useState(tabledata[0]);
  const [isAnswer, setisAnswer] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [age2, setAge2] = React.useState('');
  const [age3, setAge3] = React.useState('');
  const [age4, setAge4] = React.useState('');
  const domRef = useRef();
  const [downselect, setdown] = React.useState(false);
  const domRef1 = useRef();
  const [downselect1, setdown1] = React.useState(false);
  const domRef2 = useRef();
  const [downselect2, setdown2] = React.useState(false);
  const domRef3 = useRef();
  const [downselect3, setdown3] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(util.timetoformat() + "页" + curpage + "A答案：" + event.target.value);
  };

  const handleChange2 = (event) => {
    setAge2(event.target.value);
    console.log(util.timetoformat() + "页" + curpage + "B答案：" + event.target.value);
  };

  const handleChange3 = (event) => {
    setAge3(event.target.value);
    console.log(util.timetoformat() + "页" + curpage + "C答案：" + event.target.value);
  };

  const handleChange4 = (event) => {
    setAge4(event.target.value);
    console.log(util.timetoformat() + "页" + curpage + "D答案：" + event.target.value);
  };

  useEffect(() => {
    if(age !== '' && age2 !== '' && age3 !== '' && age4 !== ''){
      setisAnswer(true);
    }
  },[age,age2,age3,age4]);

  useImperativeHandle(parentRef, () => {
    // return返回的值就可以被父组件获取到
    return {
      isAnswer
    }
  });

  useEffect(() => {
    window.alert = console.log;
    // When the component is unmounted, we'll unregister the event listener.
    return function () {
      unityContext.removeAllEventListeners();
      unityContext.quitUnityInstance();
    };
  }, [props.page]);

  useEffect(function () {
    let id = 0;
    let templist = [];
    unityContext.on("GameWrite", function (TempList) { // 监听GameOver事件
      let arr_list = TempList.split(',');
      id++;
      let temp_dict = {"id":id, "value":arr_list};
      templist.push(temp_dict);
      settabledata(table_data =>({
        ...table_data, 
        tabledata:templist
      }));
      });
  }, []);

  useEffect(() => {
    const handleClickOutSide = (e) => {
        var _a;
        // 判断用户点击的对象是否在DOM节点内部
        if ((_a = domRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
            setdown(true);
            return;
        }
        if ((_a = domRef1.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
          setdown1(true);
          return;
        }
        if ((_a = domRef2.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
          setdown2(true);
          return;
        }
        if ((_a = domRef3.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
          setdown3(true);
          return;
        }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
        document.removeEventListener("mousedown", handleClickOutSide);
    };
}, []);





  return (
    <Grid container spacing={1}>
      <CssBaseline />
      <Grid item xs={12} sm={4} md={5} elevation={6}>
      <div className={classes.bcolor}>
      <div className={classes.title}>
        <ThemeProvider theme={theme}>
            <Typography component="h4" variant="h4">
                    {data.name}
            </Typography>
            <Typography className={classes.buju} variant="h5">
                {data.maincontent[curpage - 2].subtitle}
            </Typography>
        </ThemeProvider>
        </div>
        </div>
        <div className={classes.ccolor}>
          <Accordingextend data={data.maincontent[0].tips}/>
            <div className={classes.title}>
            <ThemeProvider theme={theme}>
              <div className={classes.buju1}>
                    {( ()=>{
                          switch(data.maincontent[curpage - 2].type){
                              case 0:break;
                              case 1:break;
                              case 2:return (
                                <>
                                <Typography variant="h5">
                                  {showhtml(data.maincontent[curpage - 2].addcontent)}
                                </Typography>
                                <div className={classes.exampleimgbox}>
                                  <img src={example} className={classes.exampleimg} alt="example"/>
                                </div>
                                <Typography variant="h6">
                                  {showhtml(data.maincontent[curpage - 2].subcontent)}
                                </Typography>
                                <Typography variant="h5">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent} 
                                <div className={classes.Radiobuju}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                      <div className={classes.paper2}>A:
                                        <FormControl className={classes.formControl}>
                                          <NativeSelect
                                            value={age}
                                            onChange={handleChange}
                                            name='A'
                                            className={classes.selectEmpty}
                                            input={<BootstrapInput />}
                                            ref={domRef}
                                          >
                                            <option value="" disabled >{downselect ? "" : "下拉选择"}</option>
                                            {
                                              data.maincontent[curpage - 2].value.map(function(name,index){
                                                return <option value={name} key={index}>{name}</option>
                                                })
                                            }
                                          </NativeSelect>
                                        </FormControl>
                                      </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <div className={classes.paper2}>B:
                                        <FormControl className={classes.formControl}>
                                          <NativeSelect
                                            value={age2}
                                            onChange={handleChange2}
                                            name='B'
                                            className={classes.selectEmpty}
                                            input={<BootstrapInput />}
                                            ref={domRef1}
                                          >
                                            <option value="" disabled >{downselect1 ? "" : "下拉选择"}</option>
                                            {
                                              data.maincontent[curpage - 2].value.map(function(name,index){
                                                return <option value={name} key={index}>{name}</option>
                                                })
                                            }
                                          </NativeSelect>
                                        </FormControl>
                                      </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <div className={classes.paper2}>C:
                                        <FormControl className={classes.formControl}>
                                          <NativeSelect
                                            value={age3}
                                            onChange={handleChange3}
                                            name='C'
                                            className={classes.selectEmpty}
                                            input={<BootstrapInput />}
                                            ref={domRef2}
                                          >
                                            <option value="" disabled >{downselect2 ? "" : "下拉选择"}</option>
                                            {
                                              data.maincontent[curpage - 2].value.map(function(name,index){
                                                return <option value={name} key={index}>{name}</option>
                                                })
                                            }
                                          </NativeSelect>
                                        </FormControl>
                                      </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <div className={classes.paper2}>D:
                                        <FormControl className={classes.formControl}>
                                          <NativeSelect
                                            value={age4}
                                            onChange={handleChange4}
                                            name='D'
                                            className={classes.selectEmpty}
                                            input={<BootstrapInput />}
                                            ref={domRef3}
                                          >
                                            <option value="" disabled >{downselect3 ? "" : "下拉选择"}</option>
                                            {
                                              data.maincontent[curpage - 2].value.map(function(name,index){
                                                return <option value={name} key={index}>{name}</option>
                                                })
                                            }
                                          </NativeSelect>
                                        </FormControl>
                                      </div>
                                    </Grid>
                                  </Grid>
                                </div>
                                </Typography>
                                <br />
                                <Typography variant="h6">
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].finalcontent}
                                </Typography>
                                </>
                              );
                              case 3:break;
                              default:return null;
                            }
                          }
                      )()
                    }
                  </div>
                </ThemeProvider>
                </div>
        </div>
        </Grid>
        <Grid item xs={12} sm={8} md={7} elevation={6}> 
          <div className={classes.paper}>
            <ThemeProvider theme={theme}>
            <Typography variant="h5">
              <Unity style={{'width': '100%', 'height': '100%'}} unityContext={unityContext} />
            </Typography>
            </ThemeProvider>
            <Table data = {table_data}/>
        </div>
        </Grid>
    </Grid>
  );
}

export default forwardRef(MainPageUnity);