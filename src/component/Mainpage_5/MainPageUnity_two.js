import React, { useState, useEffect }from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { ThemeProvider} from '@material-ui/core/styles';
import Accordingextend from '../Extends/Extend_Accordion';
import Table from '../Table/table';
import tabledata  from '../../../mock/data/exdata_5.json';
import A from '../../assets/another2/A.png';
import B from '../../assets/another2/B.png';
import C from '../../assets/another2/C.png';
import D from '../../assets/another2/D.png';
import Unity, { UnityContext } from "react-unity-webgl";
import util from '../../../utils/util';
import {
  theme,
  useStyles,
  BootstrapInput,
  BootLineInput
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

export default function MainPage_3(props) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [value, setValue] = React.useState('none');
  const [table_data,settabledata]=React.useState(tabledata[0]);
  const [inputv, setinputv] = useState("");
  const [age, setAge] = React.useState();
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(util.timetoformat() + "页" + curpage + "答案：" + event.target.value);
  };

  const Changeinputv = (e) =>{
    setinputv(e.target.value);
    console.log(util.timetoformat() + "页" + curpage + "答案：" + e.target.value);
  };
  const ChangeValue = (event) => {
    setValue(event.target.value);
    console.log(util.timetoformat() + "页" + curpage + "答案：" + event.target.value);
  };

  useEffect(() => {
    window.alert = console.log;
    // When the component is unmounted, we'll unregister the event listener.
    return function () {
      unityContext.removeAllEventListeners();
      unityContext.quitUnityInstance();
    };
  }, [props.show]);

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
        <Paper className={classes.ccolor}>
          <Accordingextend data={data.maincontent[0].subcontent}/>
            <div className={classes.title}>
                <ThemeProvider theme={theme}>
                    <Typography className={classes.buju1} variant="h5">
                    {( ()=>{
                          switch(data.maincontent[curpage - 2].type){
                              case 0:break;
                              case 1:break;
                              case 2:break;
                              case 3:return (
                                <>
                                {showhtml(data.maincontent[curpage - 2].subcontent)}
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
                                </>
                              );
                              case 4:return (
                                <>
                                {showhtml(data.maincontent[curpage - 2].subcontent)}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent} 
                                <FormControl className={classes.formControl}>
                                  <NativeSelect
                                    value={age}
                                    onChange={handleChange}
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
                                <FormControl>
                                  <BootLineInput
                                    id="standard-adornment-weight1"
                                    value={inputv}
                                    onChange={Changeinputv}
                                    name="1"
                                  />
                                </FormControl>
                                {data.maincontent[curpage - 2].subcontent3}
                                </>
                              );
                              default:return null;
                            }
                          }
                      )()
                    }
                    </Typography>
                </ThemeProvider>
                </div>
        </Paper>
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