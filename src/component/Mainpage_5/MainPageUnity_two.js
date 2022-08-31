import React, { useState, useEffect }from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createTheme, ThemeProvider, withStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Table from '../Table/table';
import tabledata  from '../../../mock/data/exdata_5.json';
import Radio from '@material-ui/core/Radio';
import A from '../../assets/another2/A.png';
import B from '../../assets/another2/B.png';
import C from '../../assets/another2/C.png';
import D from '../../assets/another2/D.png';
import Unity, { UnityContext } from "react-unity-webgl";
import util from '../../../utils/util';

const theme = createTheme({
  typography: {
    h5: {
      fontFamily:'STKaiti',
      fontSize:'1.3rem',
    },
    h4: {
      fontFamily:'STKaiti',
      fontWeight: 600,
      fontSize:'2rem',
    }
  },
});


const SelectInput = withStyles((theme) => ({
  input: {
    borderRadius: 2,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 20,
    padding: '1px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'STKaiti',
    textAlign: 'center',
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const BootstrapInput = withStyles((theme) => ({
  input: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    borderBottom: '2px solid #ced4da',
    fontSize: 20,
    padding: '1px',
    width:'100px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'STKaiti',
    textAlign: 'center',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '78vh',
  },
  ccolor:{
    height: '61vh',
    border: "1px solid rgba(226,240,217)",
    margin: theme.spacing(1),
  },
  formControl: {
    minWidth: 120,
    margin: theme.spacing(0, 1, 0),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    margin: theme.spacing(2, 2),
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: 210,
    height: 145,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  bcolor:{
    backgroundColor:'#F0FFF0',
    height: '15vh',
    border: "1px solid rgba(226,240,217)",
    margin: theme.spacing(1),
  },
  paper: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: "2px solid rgba(226,240,217)",
  },
  mainpaper: {
    margin: '2px 0px',
    height: '390px',
  },
  buju: {
    margin: '17px 40px 2px',
  },
  buju1: {
    margin: theme.spacing(1, 1),
  },
  mainintro:{
    margin: theme.spacing(3, 0, 0),
  },
  buju2: {
    margin: theme.spacing(1, 4, 1),
    whiteSpace: 'pre-wrap',
  },
  iconidnex:{
    position: 'absolute',
    top: '25%',
    left: '48%',
  },
  Radiobuju:{
    display:'flex',
    flexWrap:'wrap'
  }
}));

function showhtml(htmlString){
    var html = {__html:htmlString};
    return   <div dangerouslySetInnerHTML={html}></div> ;
}

const unityContext = new UnityContext({
  loaderUrl: "/Fifth/Page2/Build/Buildfile.loader.js", // public下目录
  dataUrl: "/Fifth/Page2/Build/Buildfile.data",
  frameworkUrl: "/Fifth/Page2/Build/Buildfile.framework.js",
  codeUrl: "/Fifth/Page2/Build/Buildfile.wasm",
  streamingAssetsUrl: "/Fifth/Page2/StreamingAssets",
 });

export default function MainPage_3(props) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [value, setValue] = React.useState('female');
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
    <Grid container spacing={1} className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={4} md={5} elevation={6} className={classes.root}>
      <div className={classes.bcolor}>
      <div className={classes.title}>
        <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h4">
                    {data.name}
            </Typography>
            <Typography className={classes.buju} variant="h5">
                {data.maincontent[curpage - 2].subtitle}
            </Typography>
        </ThemeProvider>
        </div>
        </div>
        <Paper className={classes.ccolor}>
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
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent} 
                                <div className={classes.Radiobuju}>
                                  <Radio
                                    checked={value === 'a'}
                                    onChange={ChangeValue}
                                    value="a"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                  <img src={A} className={classes.image} alt="A"/>
                                  <Radio
                                    checked={value === 'b'}
                                    onChange={ChangeValue}
                                    value="b"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'B' }}
                                  />
                                  <img src={B} className={classes.image} alt="B"/>
                                  <Radio
                                    checked={value === 'c'}
                                    onChange={ChangeValue}
                                    value="c"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'C' }}
                                  />
                                  <img src={C} className={classes.image} alt="C"/>
                                  <Radio
                                    checked={value === 'd'}
                                    onChange={ChangeValue}
                                    value="d"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'D' }}
                                  />
                                  <img src={D} className={classes.image} alt="D"/>
                                </div>
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
                                    input={<SelectInput />}
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
                                  <BootstrapInput
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
          <Paper className={classes.paper}>
          <div className={classes.mainpaper}>
          <ThemeProvider theme={theme}>
            <Typography variant="h5">
              <Unity style={{'width': '100%', 'height': '100%'}} unityContext={unityContext} />
            </Typography>
            </ThemeProvider>
        </div>
        <Table data = {table_data}/>
        </Paper>
        </Grid>
    </Grid>
  );
}