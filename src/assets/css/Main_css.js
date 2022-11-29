import { makeStyles, createTheme, withStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
const theme = createTheme({
  overrides:{
    MuiTypography:{
      body1: {
        fontFamily:'STKaiti',
        fontSize:'1.2rem'
      }
    },
    MuiFormControlLabel:{
      root:{
        marginLeft:'20px',
        marginRight:'20px'
      }
    }
  },
    typography: {
      h5: {
        fontFamily:'STKaiti',
        fontSize:'1.3rem',
      },
      h4: {
        fontFamily:'STKaiti',
        fontWeight: 600,
        fontSize:'1.6rem',
      },
      h6: {
        fontFamily:'STKaiti',
        fontStyle:'italic',
        fontSize:'1.2rem',
      }
    },

  });

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 2,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 20,
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

const BootLineInput = withStyles((theme) => ({
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
  ccolor:{
      border: "1px solid rgba(226,240,217)",
      margin: theme.spacing(1),
  },
  image: {
    width: window.screen.width / 5.5,
    height: window.screen.height / 5,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
      margin: theme.spacing(1),
  },
  paper: {
      margin: theme.spacing(2,0,0,0),
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'center',
      border: "2px solid rgba(226,240,217)",
  },
  buju: {
      margin: '17px 40px 2px',
  },
  buju1: {
      margin: theme.spacing(1, 1),
  },
  radiocss:{
    display: 'flex',
  },
  oneRadio:{
    width:'100%',
    display: 'flex'
  },
  Radiobuju:{
    margin: theme.spacing(2, 2, 0),
  },
  exampleimgbox:{
    height: window.screen.height / 6,
    textAlign:'center'
  },
  exampleimg:{
    width: window.screen.width / 5.5,
    height: window.screen.height / 6,
    margin: '0 auto'
  }
}));

export{
    theme,
    useStyles,
    BootstrapInput,
    BootLineInput
};