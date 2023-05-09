import React, { useEffect, useImperativeHandle, forwardRef }from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Table from '../Table/table';
import Accordingextend from '../Extends/Extend_Accordion';
import tabledata  from '../../../mock/data/exdata_5.json';
import Unity, { UnityContext } from "react-unity-webgl";
import util from '../../../utils/util';
import TextInput from '../Input/TextInput';
import A from '../../assets/another2/A.png';
import B from '../../assets/another2/B.png';
import C from '../../assets/another2/C.png';
import D from '../../assets/another2/D.png';
import {
  theme,
  useStyles
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
  streamingAssetsUrl: "/Fifth/Page2/StreamingAssets"
 });
 
function MainPageUnity(props, parentRef) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [table_data,settabledata] = React.useState(tabledata[0]);
  const [value, setValue] = React.useState('none');
  const [textvalue, settextvalue] = React.useState('');
  const [isAnswer, setisAnswer] = React.useState(false);

  const ChangeValue = (event) => {
    setValue(event.target.value);
    console.log(util.timetoformat() + "页" + curpage + "答案：" + event.target.value);
    setisAnswer(true);
  };

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
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent}<br />
                                  <FormControl component="fieldset" className={classes.radiocss}>
                                    <RadioGroup row aria-label="agree" name="agree" value={value} onChange={ChangeValue}>
                                      <div className={classes.oneRadio}>
                                        <FormControlLabel value="A" control={<Radio color="primary" />} label="A" />
                                        <img src={A} className={classes.image} alt="A"/>
                                      </div>
                                      <div className={classes.oneRadio}>
                                        <FormControlLabel value="B" control={<Radio color="primary" />} label="B" />
                                        <img src={B} className={classes.image} alt="B"/>
                                      </div>
                                      <div className={classes.oneRadio}>
                                        <FormControlLabel value="C" control={<Radio color="primary" />} label="C" />
                                        <img src={C} className={classes.image} alt="C"/>
                                      </div>
                                      <div className={classes.oneRadio}>
                                        <FormControlLabel value="D" control={<Radio color="primary" />} label="D" />
                                        <img src={D} className={classes.image} alt="D"/>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
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