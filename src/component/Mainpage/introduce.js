import React from 'react';
// import { useForm } from 'react-hook-form';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SchoolIcon from '@material-ui/icons/School';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createTheme, ThemeProvider} from '@material-ui/core/styles';
import one from '../../assets/fquestion/1.png';

const theme = createTheme({
    typography: {
      h5: {
        fontFamily:'STKaiti'
      },
      h4: {
        fontFamily:'STKaiti',
        fontWeight: 600,
      }
    },
  });

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
  },
  image: {
    width: 200,
    height: 200,
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
    borderRadius:'3px',
  },
  bcolor:{
    backgroundColor:'#F0FFF0',
    height: '15vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius:'3px',
  },
  mainpaper: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius:'3px',
  },

  buju: {
    margin: theme.spacing(1, 5, 1),
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

export default function Intro() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} className={classes.bcolor}>
      <ThemeProvider theme={theme}>
        <div className={classes.title}>
            <Typography component="h1" variant="h4">
                    （一）煮食器皿
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
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} className={classes.mainintro} zeroMinWidth>
        <div className={classes.mainpaper}>
        <ThemeProvider theme={theme}>
          <Typography component="h1" variant="h4">
          煮食器皿
          </Typography>
          <Typography className={classes.buju2} variant="h5">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;煮食用的器皿必须达到高温才能彻底煮熟食物。当一定量的热能转移到器皿时，器皿会升温，进而对食物进行加热。但是，煮食器皿的材质会影响加热效果。
          </Typography>
          <Typography className={classes.buju2} variant="h5">
          &nbsp;某工厂现有三种原材料可用于制造煮食器皿，分别为铁、铝和陶瓷，请你为该工厂挑选出最适合生产煮食器皿的原材料。
          </Typography>
          </ThemeProvider>
          <img src={one} className={classes.image}/>
        </div>
      </Grid>
    </Grid>
  );
}