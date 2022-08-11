import React from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createTheme, ThemeProvider} from '@material-ui/core/styles';
import one from '../../assets/fquestion/8.png';

const theme = createTheme({
    typography: {
      h5: {
        fontFamily:'STKaiti',
        fontSize:'1.4rem',
      },
      h4: {
        fontFamily:'STKaiti',
        fontWeight: 600,
        fontSize:'2rem',
      }
    },
  });

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
  },
  image: {
    width: 300,
    height: 250,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainpaper: {
    margin: '36px 0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: "2px solid rgba(226,240,217)",
  },

  buju: {
    margin: '17px 40px 2px',
  },
  buju1: {
    margin: theme.spacing(4, 8, 1),
  },
  buju2: {
    margin: theme.spacing(1, 4, 1),
    whiteSpace: 'pre-wrap',
  },
  mainintro:{
    margin: theme.spacing(3, 0, 0),
  }
}));

function showhtml(htmlString){
  var html = {__html:htmlString};
  return   <div dangerouslySetInnerHTML={html}></div> ;
}

export default function Intro(props) {
  const classes = useStyles();
  const data = props.data;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} elevation={6} className={classes.bcolor}>
      <ThemeProvider theme={theme}>
        <div className={classes.title}>
            <Typography component="h1" variant="h4">
                    {data.name}
            </Typography>
            <Typography className={classes.buju} variant="h5">
                1.背景信息
            </Typography>
        </div>
        <Typography className={classes.buju1} variant="h5">
      首先阅读背景信息，然后点击“下一页”按钮。
        </Typography>
        </ThemeProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12} elevation={6} className={classes.mainintro} zeroMinWidth>
        <div className={classes.mainpaper}>
        <ThemeProvider theme={theme}>
          <Typography component="h1" variant="h4">
          {data.title}
          </Typography>
          <Typography className={classes.buju2} variant="h5">
              {showhtml(data.introduce)}
          </Typography>
          </ThemeProvider>
          <img src={one} className={classes.image} alt="ball"/>
        </div>
      </Grid>
    </Grid>
  );
}