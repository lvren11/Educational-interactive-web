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
import Intro from '../../component/Mainpage/introduce';
import MainPage from '../../component/Mainpage/mainpage';
import data from '../../../mock/data/first.json';
import useCountDown from 'react-countdown-hook';
import Typography from '@material-ui/core/Typography';

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

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleNext = (page) => {
    setPage(page+1);
  };

  const handleBefore = (page) => {
    setPage(page-1);
  };

  useEffect(()=>{
    console.log("开始");
    actions.start();
    return ()=>{
        console.log("结束");
        actions.reset();
      }
    },[])

  const divStyle = {
    animation: "change " + data[0].time.toString() +"s infinite linear"
  };
  const display = {
    display:"none"
  }
  const changecolor = {
    backgroundColor: '#C0C0C0'
  }
  const origincolor = {
    backgroundColor: '#76daff'
  }
  return (
    
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <Card>
            <CardHeader color='success'>
            <Grid container spacing={1}>
              <Grid item xs={1}>
              <div className="container1">
                  <div className="wave-change" style = {timeLeft == 0 ? display : divStyle}></div>
                  <div className="wave" style = {timeLeft == 0 ? changecolor : origincolor}></div>
              </div>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.timepaper}>{parseInt(timeLeft / 60000)} : {(timeLeft % 60000) / 1000}</Paper>
              </Grid>
              <Grid item xs={4}>
                <Pagination className={classes.pagination} count={data[0].allpage} color="primary" page={page} onChange={handleChange} variant="outlined" shape="rounded" />
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined" className={classes.button} color="primary" onClick={() => handleNext(page)} disabled = {page == data[0].allpage ? true:false}>下一页</Button>
                <Button variant="outlined" className={classes.button} color="primary" onClick={() => handleBefore(page)} disabled = {page == 1 ? true:false}>上一页</Button>
              </Grid>
            </Grid>
            </CardHeader>
            <CardBody>
              {
                page == 1 ? <Intro data = {data[0]}/> : <MainPage data = {data[0]} page = {page} />
              }
            </CardBody>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
}