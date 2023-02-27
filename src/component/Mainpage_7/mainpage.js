import React, { useEffect, useImperativeHandle, forwardRef}from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider} from '@material-ui/core/styles';
import Table from '../Table/table';
import tabledata  from '../../../mock/data/exdata_7.json';
import Unity, { UnityContext } from "react-unity-webgl";
import {
  theme,
  useStyles
} from '../../assets/css/Practice_css';

function showhtml(htmlString){
    var html = {__html:htmlString};
    return   <div dangerouslySetInnerHTML={html}></div> ;
}

const unityContext = new UnityContext({
  loaderUrl: "/Seven/Moni/Build/Buildfile.loader.js", // public下目录
  dataUrl: "/Seven/Moni/Build/Buildfile.data.unityweb",
  frameworkUrl: "/Seven/Moni/Build/Buildfile.framework.js.unityweb",
  codeUrl: "/Seven/Moni/Build/Buildfile.wasm.unityweb",
  streamingAssetsUrl: "/Seven/Moni/StreamingAssets",
 });

function MainPage(props,emuRef) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [table_data,settabledata]=React.useState(tabledata[0]);
  const [sfinal, setfinal] = React.useState(false);

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
      let arr_list=TempList.split(',');
      id++;
      let temp_dict={"id":id,"value":arr_list};
      templist.push(temp_dict);
      settabledata(table_data =>({
        ...table_data, 
        tabledata:templist
      }));
      });
  }, []);

  useEffect(function () {
    unityContext.on("ConfirmSignal", function (temp) { // 监听GameOver事件
      if(temp === "over"){
        setfinal(true);
      }
    })
  }, []);

  useImperativeHandle(emuRef, () => {
    // return返回的值就可以被父组件获取到
    return {
      sfinal
    }
  });

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
            <div className={classes.title}>
            <ThemeProvider theme={theme}>
                    <Typography className={classes.buju1} variant="h5">
                    {( ()=>{
                          switch(data.maincontent[curpage - 2].type){
                              case 0:return showhtml(data.maincontent[curpage - 2].subcontent);
                              case 1:return null;
                              case 2:break;
                              default:return null;
                            }
                          }
                      )()
                    }
                    </Typography>
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
export default forwardRef(MainPage);