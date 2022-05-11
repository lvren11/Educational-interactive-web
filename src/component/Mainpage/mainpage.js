import React, { useState }from 'react';
// import { useForm } from 'react-hook-form';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createTheme, ThemeProvider, withStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Table from '../Table/table';
import tabledata  from '../../../mock/data/exdata.json';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DiaCanvas from '../../pages/DiaCanvas/DiaCanvas';
import Carcanvas from '../../pages/DiaCanvas/Carcanvas';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const BootstrapInput = withStyles((theme) => ({
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 23,
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
const useStyles = makeStyles((theme) => ({
  root: {
    height: '78vh',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
    borderRadius:'5px',
  },
  ccolor:{
    borderRadius:'5px',
    height: '61vh',
  },
  paper: {
    backgroundColor:'#F0FFF0',
    margin: theme.spacing(2, 0 , 0 ,2),
    padding:theme.spacing(2, 2, 2, 2),
    borderRadius:'5px',
    height: '74vh',
    position:'relative'
  },
  mainpaper: {
    backgroundColor:'#FFFFE0',
    marginBottom:'16px',
    borderRadius:'5px',
    height: '40vh',
  },
  buju: {
    margin: theme.spacing(1, 5, 1),
  },
  buju1: {
    margin: theme.spacing(10, 2, 10),
  },
  buju2: {
    margin: theme.spacing(1, 4, 1),
    whiteSpace: 'pre-wrap',
  },
  mainintro:{
    margin: theme.spacing(3, 0, 0),
  },
  formControl: {
    minWidth: 120,
    margin: theme.spacing(0, 1, 0),
  },
  iconidnex:{
    position: 'absolute',
    top: '25%',
    left: '48%',
  }
}));

function showhtml(htmlString){
    var html = {__html:htmlString};
    return   <div dangerouslySetInnerHTML={html}></div> ;
}

export default function MainPage(props) {
  const classes = useStyles();
  const data = props.data;
  const curpage = props.page;
  const [age, setAge] = React.useState('');
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClickOpen = () => {
    // router.push('/DiaCanvas/Emulation');
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container spacing={1} className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={4} md={7} elevation={6} className={classes.root}>
      <Paper className={classes.bcolor}>
      <div className={classes.title}>
        <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h4">
                    （一）煮食器皿
            </Typography>
            <Typography className={classes.buju} variant="h5">
                {data.maincontent[curpage - 2].subtitle}
            </Typography>
        </ThemeProvider>
        </div>
        </Paper>
        <Paper className={classes.ccolor}>
            <div className={classes.title}>
                <ThemeProvider theme={theme}>
                    <Typography className={classes.buju1} variant="h5">
                    {data.maincontent[curpage - 2].subcontent2 == "" ? showhtml(data.maincontent[curpage - 2].subcontent) :
                    <>
                    {showhtml(data.maincontent[curpage - 2].subcontent)}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.maincontent[curpage - 2].nextsubcontent} 
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        value={age}
                        onChange={handleChange}
                        name="age"
                        className={classes.selectEmpty}
                        input={<BootstrapInput />}
                      >
                        <option value="">下拉选择</option>
                        {
                          data.maincontent[curpage - 2].value.map(function(name){
                            return <option value={name}>{name}</option>
                            })
                        }
                      </NativeSelect>
                    </FormControl>
                      {data.maincontent[curpage - 2].subcontent2}
                      </>}
                    </Typography>
                </ThemeProvider>
                </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={5} elevation={6}> 
          <Paper className={classes.paper}>
          <div className={classes.mainpaper}>
            <ThemeProvider theme={theme}>
            <Typography className={classes.buju2} variant="h5">
                {/* <PlayCircleFilledWhiteIcon className = {classes.iconidnex} color="primary" fontSize="large"/> */}
                <IconButton className = {classes.iconidnex} color="primary" aria-label="click open" component="span" onClick={handleClickOpen}>
                  <PlayCircleFilledWhiteIcon color="primary" fontSize="large"/>
                </IconButton>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h5" className={classes.title}>
                        煮酒器皿
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  {/* <DiaCanvas /> */}
                  <Carcanvas />
                </Dialog>
            </Typography>
            </ThemeProvider>
        </div>
        <Table data = {tabledata[0]}/>
        </Paper>
        </Grid>
    </Grid>
  );
}