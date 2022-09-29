import { makeStyles, createTheme, withStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
const theme = createTheme({
  overrides:{
    MuiAccordionSummary:{
      content:{
        margin:0,
      }
    },
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
const useStyles = makeStyles((theme) => ({
  ccolor:{
    border: "1px solid rgba(226,240,217)",
    margin: theme.spacing(1),
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
  }
}));

export {
    theme,
    BootstrapInput,
    useStyles
};