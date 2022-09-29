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
import {ThemeProvider} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Intro from '../../component/Mainpage_4/introduce';
import MainPage from '../../component/Mainpage_4/mainpage';
import MainPageUnity from '../../component/Mainpage_4/mainpageunity.js';
import MainPageUnitytwo from '../../component/Mainpage_4/MainPageUnity_two.js';
import data from '../../../mock/data/fourth.json';
import router from 'umi/router';
import StorageHelper from '../../component/Storage';
import {    
  GlobalCss,
  theme,
  useStyles } from '../../assets/css/Layout_css';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function Fquestion() {
  const classes = useStyles();
  const pretime = StorageHelper.get('UseTime');
  const [time, settime] = React.useState(Number(pretime));
  const [show,setshow] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleagree = () =>{
    setOpen(false);
    if(page === data[0].allpage){
      setshow(false);
      console.log("结束记录",true,"../log/question4.log");
      StorageHelper.set('UseTime', time);
      //保存log文件
      router.push('/fquestion_5/fquestion');
    }else{
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
      console.log("开始记录");
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
    }else if(page === 4 || page === 5){
      return <MainPageUnitytwo data = {data[0]} page = {page} show={show} />
    }
  }

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