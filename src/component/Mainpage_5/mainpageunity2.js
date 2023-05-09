import React, { useEffect, useRef, useImperativeHandle, forwardRef}from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Table from '../Table/table';
import Accordingextend from '../Extends/Extend_Accordion';
import tabledata  from '../../../mock/data/exdata_5.json';
import Unity, { UnityContext } from "react-unity-webgl";
import util from '../../../utils/util';
import TextInput from '../Input/TextInput';
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
  loaderUrl: "/Fifth/Page2/Build/Buildfile.loader.js", // public下目录
  dataUrl: "/Fifth/Page2/Build/Buildfile.data.unityweb",
  frameworkUrl: "/Fifth/Page2/Build/Buildfile.framework.js.unityweb",
  codeUrl: "/Fifth/Page2/Build/Buildfile.wasm.unityweb",
  streamingAssetsUrl: "/Fifth/Page2/StreamingAssets",
 });
 
function MainPageUnity(props, parentRef) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [table_data,settabledata] = React.useState(tabledata[0]);
  const [age, setAge] = React.useState('');
  const [age2, setAge2] = React.useState('');
  const domRef = useRef();
  const [downselect, setdown] = React.useState(false);
  const domRef1 = useRef();
  const [downselect1, setdown1] = React.useState(false);
  const [textvalue, settextvalue] = React.useState('');
  const [isAnswer, setisAnswer] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(util.timetoformat() + "页" + curpage + "第一个下拉答案：" + event.target.value);
  };

  const handleChange2 = (event) => {
    setAge2(event.target.value);
    console.log(util.timetoformat() + "页" + curpage + "第二个下拉答案：" + event.target.value);
  };

  useEffect(() => {
    if(age !== '' && age2 !== ''){
      setisAnswer(true);
    }
  },[age,age2]);

  useImperativeHandle(parentRef, () => {
    // return返回的值就可以被父组件获取到
    return {
      isAnswer, textvalue
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
      let arr_all = TempList.split(';');
      let lena = arr_all.length;
      for(let i = 0; i < lena - 1; i++){
        let arr_list = arr_all[i].split(',');
        id++;
        let temp_dict = {"id":id, "value":arr_list};
        templist.push(temp_dict);
      }
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
                              case 2:break;
                              case 3:
                                return (
                                  <>
                                  <Typography variant="h6">
                                    {showhtml(data.maincontent[curpage - 2].subcontent)}
                                  </Typography>
                                  <Typography variant="h5">
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent} 
                                  <FormControl className={classes.formControl}>
                                    <NativeSelect
                                      value={age}
                                      onChange={handleChange}
                                      name='first'
                                      className={classes.selectEmpty}
                                      input={<BootstrapInput />}
                                      ref={domRef}
                                    >
                                      <option value="" disabled >{downselect ? "" : "下拉选择"}</option>
                                      {
                                        data.maincontent[curpage - 2].value1.map(function(name,index){
                                          return <option value={name} key={index}>{name}</option>
                                          })
                                      }
                                    </NativeSelect>
                                  </FormControl>
                                  {data.maincontent[curpage - 2].subcontent2}
                                  <FormControl className={classes.formControl}>
                                    <NativeSelect
                                      value={age2}
                                      onChange={handleChange2}
                                      name='second'
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
                                  {data.maincontent[curpage - 2].subcontent3}
                                  </Typography>
                                  <br />
                                  <TextInput textvalue = {textvalue} settextvalue={settextvalue}/>
                                  <Typography variant="h6">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].finalcontent}
                                  </Typography>
                                  </>
                                );
                              case 4:break;
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