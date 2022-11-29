import React, { useEffect, useImperativeHandle, forwardRef}from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import Accordingextend from '../Extends/Extend_Accordion';
import Table from '../Table/table';
import tabledata  from '../../../mock/data/exdata_6_2.json';
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

function MainPage(props, parentRef) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [age, setAge] = React.useState({});
  const [table_data,settabledata]=React.useState(tabledata[0]);
  const [isAnswer, setisAnswer] = React.useState(false);
  let dicttoname = {"4":"第一个下拉","5":"第二个下拉","6":"第三个下拉","7":"第四个下拉"}
  const handleChange = (event) => {
    setAge({ ...age, [event.target.name]: event.target.value});
    console.log(util.timetoformat() + "页" + curpage + dicttoname[event.target.name] + "答案：" + event.target.value);
  };

  useEffect(() => {
    let arr = Object.keys(age); 
    if(arr.length === 4){
      setisAnswer(true);
    }
  },[age]);

  useImperativeHandle(parentRef, () => {
    // return返回的值就可以被父组件获取到
    return {
      isAnswer
    }
  });

  useEffect(function () {
    let id = 0;
    let templist = [];
    props.unityContext.on("GameWrite", function (TempList) { // 监听GameOver事件
      console.log(TempList);
      let arr_list=TempList.split(',');
      id++;
      let temp_dict={"id":id,"value":arr_list};
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
        <Paper className={classes.ccolor}>
          <Accordingextend data={data.maincontent[0].subcontent}/>
            <div className={classes.title}>
                <ThemeProvider theme={theme}>
                  <div className={classes.buju1}>
                    {( ()=>{
                          switch(data.maincontent[curpage - 2].type){
                              case 0:break;
                              case 1:break;
                              case 2:break;
                              case 3:break;
                              case 4:return (
                                <>
                                <Typography variant="h6">
                                  {showhtml(data.maincontent[curpage - 2].subcontent)}
                                </Typography>
                                <Typography variant="h5">
                                {showhtml(data.maincontent[curpage - 2].addcontent)}
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
                                <FormControl className={classes.formControl}>
                                  <NativeSelect
                                    value={String(age[curpage+1])}
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
                                {data.maincontent[curpage - 2].subcontent3}
                                <FormControl className={classes.formControl}>
                                  <NativeSelect
                                    value={String(age[curpage+2])}
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
                                {data.maincontent[curpage - 2].subcontent4}
                                <FormControl className={classes.formControl}>
                                  <NativeSelect
                                    value={String(age[curpage+3])}
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
                                {data.maincontent[curpage - 2].subcontent5}
                                </Typography>
                                <br />
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
        </Paper>
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
export default forwardRef(MainPage);