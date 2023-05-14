import React, { useState, useEffect, useImperativeHandle, forwardRef}from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider} from '@material-ui/core/styles';
import Table from '../Table/table';
import Accordingextend from '../Extends/Extend_Accordion';
import tabledata  from '../../../mock/data/exdata_8.json';
import Unity, { UnityContext } from "react-unity-webgl";
import util from '../../../utils/util';
import TextInput from '../Input/TextInput';
import {
  theme,
  useStyles,
  BootLineInput
} from '../../assets/css/Main_css';

function showhtml(htmlString){
  var html = {__html:htmlString};
  return   <div dangerouslySetInnerHTML={html}></div> ;
}

const unityContext = new UnityContext({
  loaderUrl: "/Eight/Eight_1/Build/Buildfile.loader.js", // public下目录
  dataUrl: "/Eight/Eight_1/Build/Buildfile.data.unityweb",
  frameworkUrl: "/Eight/Eight_1/Build/Buildfile.framework.js.unityweb",
  codeUrl: "/Eight/Eight_1/Build/Buildfile.wasm.unityweb",
  streamingAssetsUrl: "/Eight/Eight_1/StreamingAssets",
 });

 
 function MainPageUnity(props, parentRef) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [table_data,settabledata] = React.useState(tabledata[0]);
  const [isAnswer] = React.useState(false);
  const [inputv, setinputv] = useState("");
  const [textvalue, settextvalue] = React.useState('');
  const [inputv2, setinputv2] = useState("");

  const Changeinputv = (e) =>{
    setinputv(e.target.value);
    console.log(util.timetoformat() + "页" + curpage + "第一个填空：" + e.target.value);
  };

  const Changeinputv2 = (e) =>{
    setinputv2(e.target.value);
    console.log(util.timetoformat() + "页" + curpage + "第二个填空：" + e.target.value);
  };

  useImperativeHandle(parentRef, () => {
    // return返回的值就可以被父组件获取到
    return {
      isAnswer,inputv,inputv2,textvalue, table_data
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
      console.log(util.timetoformat() + "表格记录数据 “" + arr_list + "”");
      templist.push(temp_dict);
      settabledata(table_data =>({
        ...table_data, 
        tabledata:templist
      }));
      });
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
                              case 0:return null;
                              case 2:return null;
                              case 1:return (
                                <>
                                <Typography variant="h6">
                                  {showhtml(data.maincontent[curpage - 2].subcontent)}
                                </Typography>
                                <Typography variant="h5">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent} 
                                <FormControl>
                                <BootLineInput
                                  id="standard-adornment-weight"
                                  value={inputv ? inputv : ""}
                                  onChange={Changeinputv}
                                  autoComplete='off'
                                  name="input1"
                                />
                              </FormControl>
                              {data.maincontent[curpage - 2].subcontent2}
                              <FormControl>
                                <BootLineInput
                                  id="standard-adornment-weight"
                                  value={inputv2 ? inputv2 : ""}
                                  onChange={Changeinputv2}
                                  autoComplete='off'
                                  name="input2"
                                />
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