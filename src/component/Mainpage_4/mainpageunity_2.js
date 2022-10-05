import React, { useEffect }from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';
import { ThemeProvider} from '@material-ui/core/styles';
import Table from '../Table/table';
import Accordingextend from '../Extends/Extend_Accordion';
import tabledata  from '../../../mock/data/exdata_4.json';
import Unity, { UnityContext } from "react-unity-webgl";
import util from '../../../utils/util';
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
  loaderUrl: "/Fourth/Moni/Build/Buildfile.loader.js", // public下目录
  dataUrl: "/Fourth/Moni/Build/Buildfile.data.unityweb",
  frameworkUrl: "/Fourth/Moni/Build/Buildfile.framework.js.unityweb",
  codeUrl: "/Fourth/Moni/Build/Buildfile.wasm.unityweb",
  streamingAssetsUrl: "/Fourth/Moni/StreamingAssets",
 });
 
export default function MainPageUnity(props) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [table_data,settabledata] = React.useState(tabledata[0]);
  const [age, setAge] = React.useState({});

  let dicttoname = {"4":"第一个下拉","5":"第二个下拉"}
  const handleChange = (event) => {
    setAge({ ...age, [event.target.name]: event.target.value});
    console.log(util.timetoformat() + "页" + curpage + dicttoname[event.target.name] + "答案：" + event.target.value);
  };

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
                    <Typography className={classes.buju1} variant="h5">
                    {( ()=>{
                          switch(data.maincontent[curpage - 2].type){
                              case 0:break;
                              case 4:return (
                                <>
                                {showhtml(data.maincontent[curpage - 2].subcontent)}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent}
                                <FormControl className={classes.formControl}>
                                  <NativeSelect
                                    value={age[String(curpage)]}
                                    onChange={handleChange}
                                    name={String(curpage)}
                                    className={classes.selectEmpty}
                                    input={<BootstrapInput />}
                                  >
                                    <option value="">下拉选择</option>
                                    {
                                      data.maincontent[curpage - 2].value.map(function(name,index){
                                        return <option value={name} key={index}>{name}</option>
                                        })
                                    }
                                  </NativeSelect>
                                </FormControl>
                              {data.maincontent[curpage - 2].subcontent2}
                              {data.maincontent[curpage - 2].subcontent3}
                                <FormControl className={classes.formControl}>
                                  <NativeSelect
                                    value={age[String(curpage+1)]}
                                    onChange={handleChange}
                                    name={String(curpage+1)}
                                    className={classes.selectEmpty}
                                    input={<BootstrapInput />}
                                  >
                                    <option value="">下拉选择</option>
                                    {
                                      data.maincontent[curpage - 2].value.map(function(name,index){
                                        return <option value={name} key={index}>{name}</option>
                                        })
                                    }
                                  </NativeSelect>
                                </FormControl>
                              {data.maincontent[curpage - 2].subcontent2}
                                </>
                              );
                              case 2:break;
                              case 1:break;
                              case 3:break;
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