import React, { useEffect }from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { ThemeProvider} from '@material-ui/core/styles';
import Table from '../Table/table';
import Accordingextend from '../Extends/Extend_Accordion';
import tabledata  from '../../../mock/data/exdata_4.json';
import Unity from "react-unity-webgl";
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

export default function MainPageUnity(props) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [table_data,settabledata] = React.useState(tabledata[0]);
  const [age, setAge] = React.useState({});
  const [value, setValue] = React.useState('none');

  const handleRadio = (event) => {
    setValue(event.target.value);
    console.log(util.timetoformat() + "页" + curpage + "答案：" + event.target.value);
  };

  let dicttoname = {"5":"A","6":"B","7":"C","8":"D"};
  const handleChange = (event) => {
    setAge({ ...age, [event.target.name]: event.target.value});
    console.log(util.timetoformat() + "页" + curpage + dicttoname[event.target.name] + "答案：" + event.target.value);
  };

  useEffect(function () {
    let id = 0;
    let templist = [];
    props.unityContext.on("GameWrite", function (TempList) { // 监听GameOver事件
      let arr_list = TempList.split(',');
      id++;
      let temp_dict = {"id":id, "value":arr_list};
      templist.push(temp_dict);
      settabledata(table_data =>({
        ...table_data, 
        tabledata:templist
      }));
      });
  }, [props.unityContext]);

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
                              case 1:break;
                              case 2:return (
                                <>
                                {showhtml(data.maincontent[curpage - 2].subcontent)}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent} 
                                <div className={classes.Radiobuju}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                      <div className={classes.paper2}>A:
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
                                      </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <div className={classes.paper2}>B:
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
                                      </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <div className={classes.paper2}>C:
                                        <FormControl className={classes.formControl}>
                                          <NativeSelect
                                            value={age[String(curpage+2)]}
                                            onChange={handleChange}
                                            name={String(curpage+2)}
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
                                      </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <div className={classes.paper2}>D:
                                        <FormControl className={classes.formControl}>
                                          <NativeSelect
                                            value={age[String(curpage+3)]}
                                            onChange={handleChange}
                                            name={String(curpage+3)}
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
                                      </div>
                                    </Grid>
                                  </Grid>
                                </div>
                                </>
                              );
                              case 3:return (
                                <>
                                {showhtml(data.maincontent[curpage - 2].subcontent)}
                                <FormControl component="fieldset" className={classes.radiocss}>
                                  <RadioGroup row aria-label="agree" name="agree" value={value} onChange={handleRadio}>
                                    <FormControlLabel value="A" control={<Radio color="primary" />} label="A 内部材质" />
                                    <FormControlLabel value="B" control={<Radio color="primary" />} label="B 外部材质" />
                                  </RadioGroup>
                                </FormControl>
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
        </div>
        </Grid>
        <Grid item xs={12} sm={8} md={7} elevation={6}> 
          <div className={classes.paper}>
            <ThemeProvider theme={theme}>
            <Typography variant="h5">
              <Unity style={{'width': '100%', 'height': '100%'}} unityContext={props.unityContext} />
            </Typography>
            </ThemeProvider>
            <Table data = {table_data}/>
        </div>
        </Grid>
    </Grid>
  );
}