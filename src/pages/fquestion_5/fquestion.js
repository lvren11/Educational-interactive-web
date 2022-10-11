import React, {useEffect} from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from "../../component/Card/Card.js";
import Button from '@material-ui/core/Button';
import CardHeader from "../../component/Card/CardHeader.js";
import CardBody from "../../component/Card/CardBody.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Pagination from '@material-ui/lab/Pagination';
import {ThemeProvider} from '@material-ui/core/styles';
import Intro from '../../component/Mainpage_5/introduce';
import MainPage from '../../component/Mainpage_5/mainpage';
import MainPageUnity from '../../component/Mainpage_5/mainpageunity.js';
import MainPageUnity2 from '../../component/Mainpage_5/mainpageunity2.js';
import MainPageUnitytwo from '../../component/Mainpage_5/MainPageUnity_two.js';
import data from '../../../mock/data/fifth.json';
import router from 'umi/router';
import StorageHelper from '../../component/Storage';
import { UnityContext } from "react-unity-webgl";
import {    
  GlobalCss,
  theme,
  useStyles } from '../../assets/css/Layout_css';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const unityContext = new UnityContext({
  loaderUrl: "/Fifth/Page4/Build/Buildfile.loader.js", // public下目录
  dataUrl: "/Fifth/Page4/Build/Buildfile.data.unityweb",
  frameworkUrl: "/Fifth/Page4/Build/Buildfile.framework.js.unityweb",
  codeUrl: "/Fifth/Page4/Build/Buildfile.wasm.unityweb",
  streamingAssetsUrl: "/Fifth/Page4/StreamingAssets",
 });

const listener = e => {
  e.preventDefault();
  e.returnValue = '刷新或离开当前页后，需要登录页面重新开始答题' // 浏览器有可能不会提示这个信息，会按照固定信息提示
}

export default function Fquestion() {
  const classes = useStyles();
  const pretime = StorageHelper.get('UseTime');
  const [time, settime] = React.useState(Number(pretime));
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleagree = () =>{
    setOpen(false);
    if(page === data[0].allpage){
      unityContext.removeAllEventListeners();
      unityContext.quitUnityInstance();
      console.log("结束记录",true,StorageHelper.get('web_user')+","+StorageHelper.get('web_user_id')+","+data[0].title);
      StorageHelper.set('UseTime', time);
      //保存log文件
      router.push('/fquestion_6/fquestion');
    }else{
      if(page === 2){
        console.log("开始记录");
      }
      setPage(page+1);
    }
  };

  const handleNext = (page) => {
    if(page === 1){
      console.log("不记录");
      setPage(page+1);
    }
    else if(page === 2){
      setOpen(true);
    }else{
      setOpen(true);
    }
    StorageHelper.set('UseTime', time);
};


  const showunity = (page) =>{
    if(page === 1){
      return <Intro data = {data[0]}/>
    }else if(page === 2){
      return <MainPage data = {data[0]} page = {page}/>
    }else if(page === 3){
      return <MainPageUnity data = {data[0]} page = {page}/>
    }else if(page === 4){
      return <MainPageUnity2 data = {data[0]} page = {page}/>
    }else if(page === 5){
      return <MainPageUnitytwo data = {data[0]} page = {page} unityContext={unityContext} />
    }
  }

  useEffect(() =>{
    window.addEventListener('beforeunload', listener)
    return () =>{
      window.removeEventListener('beforeunload', listener)
    }
  });

  useEffect(() => {
    let flag = true;
    (async () => {
      while (flag) {
        await sleep(1000);
        settime(time => time + 1);
      }
    })();
    return () => { flag = false; }
  }, []);

  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <Card>
            <CardHeader color='success'>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Paper className={classes.timepaper}>{parseInt(time / 3600)} : {parseInt(time / 60)} : {(time % 60)}</Paper>
              </Grid>
              <Grid item xs={4}>
                <ThemeProvider theme={theme}>
                  <GlobalCss />
                  <Pagination className={classes.pagination} count={data[0].allpage} color="primary" page={page} variant="outlined" shape="rounded" size="large"/>
                </ThemeProvider>
              </Grid>
              <Grid item xs={4}>
                <ThemeProvider theme={theme}>
                  <Button variant="outlined" className={classes.button} color="primary" onClick={() => handleNext(page)}>{page === data[0].allpage ? "下一题":"下一页"}</Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"提示："}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                      {page === data[0].allpage ? "进入下一题后将不可返回，是否要继续前往？":"进入下一页后将不可返回，是否要继续前往？"}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                      返回任务
                      </Button>
                      <Button onClick={handleagree} color="primary" autoFocus>
                      继续前往
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ThemeProvider>
              </Grid>
            </Grid>
            </CardHeader>
            <CardBody>
              {
                showunity(page)
              }
            </CardBody>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
}