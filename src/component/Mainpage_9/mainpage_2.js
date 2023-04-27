import React, { useEffect, useImperativeHandle, forwardRef }from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '../Table/table';
import Accordingextend from '../Extends/Extend_Accordion';
import tabledata  from '../../../mock/data/exdata_9.json';
import Unity from "react-unity-webgl";
import util from '../../../utils/util';
import TextInput from '../Input/TextInput';
import {
  theme,
  useStyles
} from '../../assets/css/Main_css';
  
function showhtml(htmlString){
    var html = {__html:htmlString};
    return   <div dangerouslySetInnerHTML={html}></div> ;
}
 
 function MainPageUnity(props, parentRef) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [table_data,settabledata] = React.useState(tabledata[0]);
  const [isAnswer, setisAnswer] = React.useState(false);
  const [textvalue, settextvalue] = React.useState('');
  const [value, setValue] = React.useState('none');

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(util.timetoformat() + "页" + curpage + "答案：" + event.target.value);
    setisAnswer(true);
  };

  useImperativeHandle(parentRef, () => {
    // return返回的值就可以被父组件获取到
    return {
      isAnswer,textvalue
    }
  });


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
                                <Typography variant="h6">
                                  {showhtml(data.maincontent[curpage - 2].subcontent)}
                                </Typography>
                                <Typography variant="h5">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent}
                                <FormControl component="fieldset" className={classes.radiocss}>
                                  <RadioGroup row aria-label="agree" name="agree" value={value} onChange={handleChange}>
                                    <div className={classes.oneRadio}>
                                      <FormControlLabel value="A" control={<Radio color="primary" />} label="A 能" />
                                    </div>
                                    <div className={classes.oneRadio}>
                                      <FormControlLabel value="B" control={<Radio color="primary" />} label="B 不能" />
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
              <Unity style={{'width': '100%', 'height': '100%'}} unityContext={props.unityContext} />
            </Typography>
            </ThemeProvider>
            <Table data = {table_data}/>
        </div>
        </Grid>
    </Grid>
  );
}

export default forwardRef(MainPageUnity);