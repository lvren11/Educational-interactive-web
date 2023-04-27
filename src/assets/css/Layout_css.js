import { makeStyles, createTheme, withStyles } from '@material-ui/core/styles';
const GlobalCss = withStyles({
    // @global 由 jss-plugin-global 处理。
    '@global': {
      // 如果想嵌套主题，您应该针对 [class * =“MuiButton-root”]。
      '.MuiPaginationItem-outlinedPrimary.Mui-selected': {
        border: "1px solid rgba(226,240,217)",
        backgroundColor:'#F0FFF0'
      },
      '.MuiAccordionSummary-content':{
        margin:0
      },
      '.MuiAccordionSummary-content.Mui-expanded':{
        margin:0
      },
      '.MuiRadio-colorPrimary.Mui-checked':{
        color:'rgba(84,130,53)'
      },
      '.MuiInputBase-input':{
        fontFamily:'STKaiti',
        fontSize:'1.2rem'
      },
      '.MuiOutlinedInput-root':{
        borderRadius:'0px'
      }
    },
  })(() => null);
  
  const theme = createTheme({
    overrides:{
      MuiTypography:{
        body1: {
          fontFamily:'STKaiti',
          fontSize:'1.2rem'
        },
        colorTextSecondary:{
          color:'black'
        },
        h5: {
            fontFamily:'STKaiti',
            fontSize:'1.3rem',
          },
        h4: {
            fontFamily:'STKaiti',
            fontWeight: 600,
            fontSize:'1.6rem',
          },
        h3: {
          fontFamily:'STKaiti',
          fontWeight: 600,
          fontSize:'2rem',
        },
        h6: {
          fontFamily:'STKaiti',
          fontSize:'1.2rem',
        }
      },
      MuiButton: {
        root:{
          backgroundColor:'#F0FFF0'
        },
        // 规则的名字
        label: {
          // 一些 CSS
          fontFamily:'STKaiti',
          fontSize:'1.2rem',
        },
        textPrimary:{
          color:'black'
        },
        outlinedPrimary:{
          border: "2px solid rgba(226,240,217)",
          color:'black',
          '&:hover':{
            border: "2px solid rgba(226,240,217)",
            backgroundColor:'#F0FFF0'
          }
        },
      },
      MuiPaginationItem:{
        outlined:{
          border: "1px solid rgba(226,240,217)",
        }
      }
    }
  });
  
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4,8,0,8),
    padding: theme.spacing(0,8,0,8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
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
    fontSize:25,
    width:'100px'
  },
}));

export {
    GlobalCss,
    theme,
    useStyles
};