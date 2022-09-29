import React from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {ThemeProvider} from '@material-ui/core/styles';
import one from '../../assets/fquestion/5.png';
import {
  theme,
  useStyles
} from '../../assets/css/Introduce_css';

function showhtml(htmlString){
  var html = {__html:htmlString};
  return   <div dangerouslySetInnerHTML={html}></div> ;
}

export default function Intro(props) {
  const classes = useStyles();
  const data = props.data;
  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} elevation={6} className={classes.bcolor}>
      <ThemeProvider theme={theme}>
        <div className={classes.title}>
            <Typography component="h4" variant="h4">
                    {data.name}
            </Typography>
            <Typography className={classes.buju} variant="h5">
                1.背景信息
            </Typography>
        </div>
        </ThemeProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12} elevation={6}>
      <ThemeProvider theme={theme}>
        <Typography className={classes.buju1} variant="h5">
        首先阅读背景信息，然后点击“下一页”按钮。
        </Typography>
        </ThemeProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12} elevation={6} zeroMinWidth>
        <div className={classes.mainpaper}>
        <ThemeProvider theme={theme}>
          <Typography component="h4" variant="h4">
          {data.title}
          </Typography>
          <Typography className={classes.buju2} variant="h5">
              {showhtml(data.introduce)}
          </Typography>
          </ThemeProvider>
          <img src={one} className={classes.image_car} alt="stove"/>
        </div>
      </Grid>
    </Grid>
  );
}