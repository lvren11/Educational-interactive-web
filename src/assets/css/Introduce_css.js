import { makeStyles, createTheme} from '@material-ui/core/styles';
const theme = createTheme({
    typography: {
      h5: {
        fontFamily:'STKaiti',
        fontSize:'1.3rem',
      },
      h3: {
        fontFamily:'STKaiti',
        fontWeight: 600,
        fontSize:'2rem',
      }
    },
  });

const useStyles = makeStyles((theme) => ({
  image: {
    width: 300,
    height: 300,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  image_car: {
    width: 300,
    height: 250,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  image_water: {
    width: 366,
    height: 180,
    // border:"10px solid rgba(255, 255, 255, .5)"
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
    image_plant: {
    width: 366,
    height: 230,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  image_soil: {
    width: 277,
    height: 177,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  image_sky: {
    width: 300,
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
  },
  bcolor:{
    backgroundColor:'#F0FFF0',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainpaper: {
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
}));

export {
    theme,
    useStyles
};