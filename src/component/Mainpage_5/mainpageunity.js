import React, { useState, useEffect }from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createTheme, ThemeProvider, withStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Table from '../Table/table';
import tabledata  from '../../../mock/data/exdata_5.json';
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
    height: '80vh',
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
  title: {
    margin: theme.spacing(2, 2),
    display: 'flex',
    flexDirection: 'column',
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
  }
}));
  
function showhtml(htmlString){
    var html = {__html:htmlString};
    return   <div dangerouslySetInnerHTML={html}></div> ;
}
const unityContext = new UnityContext({
  loaderUrl: "/Fifth/Build/Buildfile.loader.js", // public下目录
  dataUrl: "/Fifth/Build/Buildfile.data",
  frameworkUrl: "/Fifth/Build/Buildfile.framework.js",
  codeUrl: "/Fifth/Build/Buildfile.wasm",
  streamingAssetsUrl: "/Fifth/StreamingAssets",
 });
 
export default function MainPageUnity(props) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [table_data,settabledata] = React.useState(tabledata[0]);
  const [inputv, setinputv] = useState("");

  const Changeinputv = (e) =>{
    setinputv(e.target.value);
    console.log(util.timetoformat() + "页" + curpage + "答案：" + e.target.value);
  };

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
        <div className={classes.ccolor}>
            <div className={classes.title}>
            <ThemeProvider theme={theme}>
                    <Typography className={classes.buju1} variant="h5">
                    {( ()=>{
                          switch(data.maincontent[curpage - 2].type){
                              case 0:break;
                              case 1:return(                                
                              <>
                                {showhtml(data.maincontent[curpage - 2].subcontent)}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent} 
                                <FormControl>
                                <BootstrapInput
                                  id="standard-adornment-weight1"
                                  value={inputv}
                                  onChange={Changeinputv}
                                  name="1"
                                />
                              </FormControl>
                              {data.maincontent[curpage - 2].subcontent2}
                              {
                                data.maincontent[curpage - 2].value.map((value,index)=>(
                                  <p className={classes.mainintro} index={index}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{value}
                                  </p>
                                ))
                              }
                                </>
                              );
                              case 2:break;
                              case 3:break;
                              case 4:break;
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
          <div className={classes.mainpaper}>
            <ThemeProvider theme={theme}>
            <Typography variant="h5">
              <Unity style={{'width': '100%', 'height': '100%'}} unityContext={unityContext} />
            </Typography>
            </ThemeProvider>
        </div>
        <Table data = {table_data}/>
        </div>
        </Grid>
    </Grid>
  );
}