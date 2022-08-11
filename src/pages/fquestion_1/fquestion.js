import React, {useEffect} from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from "../../component/Card/Card.js";
import Button from '@material-ui/core/Button';
import CardHeader from "../../component/Card/CardHeader.js";
import CardBody from "../../component/Card/CardBody.js";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Intro from '../../component/Mainpage_1/introduce';
import MainPage from '../../component/Mainpage_1/mainpage';
import MainPageUnity from '../../component/Mainpage_1/mainpageunity.js';
import data from '../../../mock/data/first.json';
import useCountDown from 'react-countdown-hook';
import router from 'umi/router';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(4,8,0,8),
    padding: theme.spacing(0,8,0,8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(2),
    float:'right'
  },
  pagination:{
    margin: theme.spacing(2,0,0,0)
  },
  timepaper: {
    margin: theme.spacing(2,8,0,8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'#F0FFF0',
    fontFamily:'STKaiti',
    fontSize:20,
    width:'80px'
  },
}));


export default function Fquestion() {
  const classes = useStyles();
  const [timeLeft, actions] = useCountDown(data[0].time*1000, 1000);
  const [show,setshow] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    if(value !== 1){
      setPage(value);
    }
    if(value === 3 || value === 4){
      console.log("开始记录");
    }
    if(value === 2){
      console.log("不记录");
    }
  };

  const handleNext = (page) => {
    if(page === data[0].allpage){
      setshow(false);
      console.log("结束记录",true,"../log/question1.log");
      //保存log文件
      router.push('/fquestion_2/fquestion');
    }else{
      if(page === 1){
        console.log("不记录");
      }
      if(page === 2 || page === 3){
        console.log("开始记录");
      }
      setPage(page+1);
    }
  };

  const handleBefore = (page) => {
    setPage(page-1);
  };

  const showunity = (page) =>{
    if(page === 1){
      return <Intro data = {data[0]}/>
    }else if(page === 2){
      return <MainPage data = {data[0]} page = {page}/>
    }else{
      return <MainPageUnity data = {data[0]} page = {page} show={show}/>
    }
  }

  useEffect(()=>{
    console.log("开始");
    actions.start();
    return ()=>{
        console.log("结束");
        actions.reset();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <Card>
            <CardHeader color='success'>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Paper className={classes.timepaper}>{parseInt(timeLeft / 60000)} : {(timeLeft % 60000) / 1000}</Paper>
              </Grid>
              <Grid item xs={4}>
                <Pagination className={classes.pagination} count={data[0].allpage} color="primary" page={page} onChange={handleChange} variant="outlined" shape="rounded" />
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined" className={classes.button} color="primary" onClick={() => handleNext(page)}>{page === data[0].allpage ? "下一题":"下一页"}</Button>
                <Button variant="outlined" className={classes.button} color="primary" onClick={() => handleBefore(page)} disabled={page <=2 ? true:false}>上一页</Button>
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