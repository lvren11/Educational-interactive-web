import React, { useState, useEffect, useImperativeHandle, forwardRef}from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
  BootLineInput
} from '../../assets/css/Main_css';
  
function showhtml(htmlString){
    var html = {__html:htmlString};
    return   <div dangerouslySetInnerHTML={html}></div> ;
}

const unityContext = new UnityContext({
  loaderUrl: "/Fourth/water_1/Build/Buildfile.loader.js", // public下目录
  dataUrl: "/Fourth/water_1/Build/Buildfile.data.unityweb",
  frameworkUrl: "/Fourth/water_1/Build/Buildfile.framework.js.unityweb",
  codeUrl: "/Fourth/water_1/Build/Buildfile.wasm.unityweb",
  streamingAssetsUrl: "/Fourth/water_1/StreamingAssets",
 });
 
function MainPageUnity(props, parentRef) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [table_data,settabledata] = React.useState(tabledata[0]);
  const [isAnswer, setisAnswer] = React.useState(false);
  const [inputv, setinputv] = useState();

  const Changeinputv = (e) =>{
    setinputv(e.target.value);
    console.log(util.timetoformat() + "页" + curpage + "答案：" + e.target.value);
    setisAnswer(true);
  };

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
          <Accordingextend data={data.maincontent[0].subcontent}/>
            <div className={classes.title}>
            <ThemeProvider theme={theme}>
              <div className={classes.buju1}>
                    {( ()=>{
                          switch(data.maincontent[curpage - 2].type){
                              case 0:break;
                              case 1:return (
                                <>
                                <Typography variant="h5">
                                  {showhtml(data.maincontent[curpage - 2].subcontent)}
                                </Typography>
                                <div className={classes.exampleimgbox}>
                                  <img src={example} className={classes.exampleimg} alt="example"/>
                                </div>
                                <Typography variant="h6">
                                  {showhtml(data.maincontent[curpage - 2].subcontent1)}
                                </Typography>
                                <Typography variant="h5">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent} 
                                <FormControl>
                                <BootLineInput
                                  id="standard-adornment-weight"
                                  value={inputv}
                                  onChange={Changeinputv}
                                  aria-describedby="standard-weight-helper-text"
                                  autoComplete='off'
                                  inputProps={{
                                    'aria-label': 'weight',
                                  }}
                                />
                              </FormControl>
                              {data.maincontent[curpage - 2].subcontent2}
                              </Typography>
                              <br />
                              <Typography variant="h6">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].finalcontent}
                              </Typography>
                                </>
                              );
                              case 2:break;
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