import React, {useEffect, useRef} from 'react';
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
import Intro from '../../component/Mainpage_8/introduce';
import MainPage from '../../component/Mainpage_8/mainpage';
import MainPageUnity from '../../component/Mainpage_8/mainpage_1';
import MainPageUnitytwo from '../../component/Mainpage_8/mainpage_2';
import data from '../../../mock/data/eighth.json';
import router from 'umi/router';
import StorageHelper from '../../component/Storage';
import { UnityContext } from "react-unity-webgl";
import util from '../../../utils/util';
import {    
  GlobalCss,
  theme,
  useStyles } from '../../assets/css/Layout_css';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const unityContext = new UnityContext({
  loaderUrl: "/Eight/Eight_1/Build/Eight_1.loader.js", // public下目录
  dataUrl: "/Eight/Eight_1/Build/Eight_1.data",
  frameworkUrl: "/Eight/Eight_1/Build/Eight_1.framework.js",
  codeUrl: "/Eight/Eight_1/Build/Eight_1.wasm",
  streamingAssetsUrl: "/Eight/Eight_1/StreamingAssets",
 });


 const listener = e => {
  e.preventDefault();
  e.returnValue = '刷新或离开当前页后，需要登录页面重新开始答题' // 浏览器有可能不会提示这个信息，会按照固定信息提示
}

export default function Fquestion() {
  const classes = useStyles();
  const parentRef = useRef();
  const pretime = StorageHelper.get('UseTime');
  const [time, settime] = React.useState(Number(pretime));
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [isNext, setisNext] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleagree = () =>{
    setOpen(false);
    if(page === data[0].allpage){
      unityContext.removeAllEventListeners();
      unityContext.quitUnityInstance();
      console.log(util.timetoformat() + "离开第（" + (data[0].allpage - 2) + "）小题的问题解决页面");
      console.log("结束记录",true,StorageHelper.get('web_user') + "," + StorageHelper.get('web_user_file') + "," + StorageHelper.get('web_user_id') + "," + data[0].title);
      StorageHelper.clear('UseTime');
      StorageHelper.clear('web_user_id');
      StorageHelper.clear('web_user');
      StorageHelper.clear('x-auth-token');
      //保存log文件
      router.push('/');
    }else{
      if(page > 2){
        console.log(util.timetoformat() + "离开第（" + (page - 2) + "）小题的问题解决页面");
      }
      if(page === 2){
        console.log("开始记录");
        console.log(util.timetoformat() + "进入第（" + (page - 1) + "）小题的问题解决页面");
      }
      if(page > 2){
        console.log(util.timetoformat() + "进入第（" + (page - 1) + "）小题的问题解决页面");
      }
      if(page === 1){
        setTimeout(() => {
          setPage(page+1);
        }, 300);
      }else{
        setPage(page+1);
      }
      setTimeout(() => {
        setisNext(false);
      }, 500);
    }
  };

  const handleNext = (page) => {
    if(page === 1){
      console.log("不记录");
      setOpen(true);
      setisNext(true);
    }
    else if(page === 2){
      setOpen(true);
      setisNext(true);
    }else{
      setOpen(true);
      setisNext(parentRef.current.isAnswer);
    }
    StorageHelper.set('UseTime', time);
};

  const showunity = (page) =>{
    if(page === 1){
      return <Intro data = {data[0]}/>
    }else if(page === 2){
      return <MainPage data = {data[0]} page = {page}/>
    }else if(page === 3){
      return <MainPageUnity ref={parentRef} data = {data[0]} page = {page}/>
    }else if(page === 4){
      return <MainPageUnitytwo ref={parentRef} data = {data[0]} page = {page} unityContext={unityContext}/>
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
                    {
                      isNext === false ? 
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          请回答问题！回答问题后才能进入下一页。
                        </DialogContentText>
                      </DialogContent>
                      :
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {page === data[0].allpage ? 
                        "你确定要结束答题吗？(即将退出界面，重新答题需重新登录。)"
                        :
                        page === 1 ? 
                        "该页需熟悉各项操作，无需回答问题，熟练操作后，可点击“下一页”进入答题界面"
                        :
                        "进入下一页后将不可返回，是否要继续前往？"}
                        </DialogContentText>
                      </DialogContent>
                    }
                    {
                      isNext === false ? 
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                        返回任务
                        </Button>
                      </DialogActions>
                      :
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                        返回任务
                        </Button>
                        <Button onClick={handleagree} color="primary" autoFocus>
                        继续前往
                        </Button>
                      </DialogActions>
                    }
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