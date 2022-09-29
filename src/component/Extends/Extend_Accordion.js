import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ThemeProvider } from '@material-ui/core/styles';
import {
    theme,
    useStyles
  } from '../../assets/css/Main_css';

function showhtml(htmlString){
    var html = {__html:htmlString};
    return   <div dangerouslySetInnerHTML={html}></div> ;
}
export default function Accordingextend(props) {
    const classes = useStyles();
    return (
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <ThemeProvider theme={theme}>
              <Typography className={classes.buju1} variant="h5">
                操作指南
              </Typography>
            </ThemeProvider>
        </AccordionSummary>
        <AccordionDetails>
          <ThemeProvider theme={theme}>
              <Typography className={classes.buju1} variant="h5">
                {showhtml(props.data)}
              </Typography>
          </ThemeProvider>
        </AccordionDetails>
      </Accordion>
    )
}