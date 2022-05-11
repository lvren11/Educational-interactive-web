import React, { useRef, useEffect } from 'react';
import Car from '../../component/Emulation/Car';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  canvas_1:{
    background:'#ffffff',
    marginLeft:'500px',
    marginTop:'15px',
    boxShadow:'4px 4px 8px rgb(0 0 0 / 50%)',
  },
  controls: {
    marginTop:'15px',
	  marginLeft:'505px',
    border:'1px solid #888',
    boxShadow: '5px 5px 2px #888',
    backgroundColor: '#eee',
    padding: '3px', 
    marginBottom: '5px',
    align:'left',
    width:'655px',
    height:'250px'
  },
  root: {
    width: 420,
    // display:'none'
    display: 'none',
  },
  rootac:{
    width: 420,
    display: 'block',
  },
  input: {
    width: 60,
  },
}));

export default function CarCanvas() {
  const classes = useStyles();
  const [value, setValue] = React.useState({'velocidad':70,'distancia':70,'tiempo':0.9,'rozamiento':0.5,'masa':2000});
  const [state, setState] = React.useState({
    checkedA: false,
    checkedD: false,
  });
  const [selectedValue, setSelectedValue] = React.useState('s');
  const canvasRef = useRef();
  const start = () => {
    // changeVal就是子组件暴露给父组件的方法
    canvasRef.current.start(state,value,selectedValue);
  };
  const inicio =() =>{
    //valores por defecto
    var ctrl={'velocidad':70,'distancia':70,'tiempo':0.9,'rozamiento':0.5,'masa':2000};
    var orstate={checkedA: false,checkedD: false};
    var orselectedValue='s';
    setValue({...ctrl});
    setState({...orstate});
    setSelectedValue(orselectedValue);
    canvasRef.current.init();
  };
  const handleChangeR = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleSliderChange = (event, newValue) => {
    const { id } = event.target;
    setValue((prevState) => ({ ...prevState, [id]: newValue }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue((prevState) => ({ ...prevState, [name]: value === '' ? '' : Number(value) }));
  };

  const handleBlur = (min,max) => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };
  return (
    <div>
    <Car ref={canvasRef} className={classes.canvas_1} width='665' height='400' state={state} value={value} selectedvalue={selectedValue}/>
    <div id='controls' className={classes.controls}>
      <div id="item3" className={state.checkedA ? classes.rootac:classes.root}>		
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Typography id="input-slider" gutterBottom>
                初始车速（km/h）
                </Typography>
            </Grid>
            <Grid item xs>
            <Slider
                value={typeof value.velocidad === 'number' ? value.velocidad: 40}
                onChange={handleSliderChange}
                id="velocidad"
                step={1}
                min={40}
                max={140}
            />
            </Grid>
            <Grid item>
            <Input
                className={classes.input}
                value={value.velocidad}
                margin="dense"
                name="velocidad"
                onChange={handleInputChange}
                onBlur={handleBlur(40,140)}
                inputProps={{
                step: 10,
                min: 40,
                max: 140,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
            />
            </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Typography id="input-slider" gutterBottom>
                初始距离（m）
                </Typography>
            </Grid>
            <Grid item xs>
            <Slider
                value={typeof value.distancia === 'number' ? value.distancia: 0}
                onChange={handleSliderChange}
                id="distancia"
            />
            </Grid>
            <Grid item>
            <Input
                className={classes.input}
                value={value.distancia}
                margin="dense"
                name="distancia"
                onChange={handleInputChange}
                onBlur={handleBlur(0,100)}
                inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
            />
            </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Typography id="input-slider" gutterBottom>
                反应时间（s）
                </Typography>
            </Grid>
            <Grid item xs>
            <Slider
                value={typeof value.tiempo === 'number' ? value.tiempo: 0.4}
                onChange={handleSliderChange}
                id="tiempo"
                step={0.1}
                marks
                min={0.4}
                max={1.5}
            />
            </Grid>
            <Grid item>
            <Input
                className={classes.input}
                value={value.tiempo}
                margin="dense"
                name="tiempo"
                onChange={handleInputChange}
                onBlur={handleBlur(0.4,1.5)}
                inputProps={{
                step: 0.1,
                min: 0.4,
                max: 1.5,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
            />
            </Grid>
        </Grid>
        <hr/>
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Typography id="input-slider" gutterBottom>
                动摩擦系数
                </Typography>
            </Grid>
            <Grid item xs>
            <Slider
                value={typeof value.rozamiento === 'number' ? value.rozamiento: 0.1}
                onChange={handleSliderChange}
                id="rozamiento"
                step={0.1}
                marks
                min={0.1}
                max={1.0}
            />
            </Grid>
            <Grid item>
            <Input
                className={classes.input}
                value={value.rozamiento}
                margin="dense"
                name="rozamiento"
                onChange={handleInputChange}
                onBlur={handleBlur(0.1,1.0)}
                inputProps={{
                step: 0.1,
                min: 0.1,
                max: 1.0,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
            />
            </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Typography id="input-slider" gutterBottom>
               重量（kg）
                </Typography>
            </Grid>
            <Grid item xs>
            <Slider
                value={typeof value.masa === 'number' ? value.masa: 1000}
                onChange={handleSliderChange}
                id="masa"
                step={200}
                min={1000}
                max={3000}
            />
            </Grid>
            <Grid item>
            <Input
                className={classes.input}
                value={value.masa}
                margin="dense"
                name="masa"
                onChange={handleInputChange}
                onBlur={handleBlur(1000,3000)}
                inputProps={{
                step: 200,
                min: 1000,
                max: 3000,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
            />
            </Grid>
        </Grid>
      </div>
      
      <FormGroup row>
        <FormControlLabel
            control={
            <Checkbox
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                color="primary"
            />
            }
            label="控制"
        />
        <FormControlLabel
        control={
            <Radio
            checked={selectedValue === 'a'}
            onChange={handleChangeR}
            value="a"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'A' }}
          />
        }
        label="v(x)图"
        />
        <FormControlLabel
        control={
            <Radio
            checked={selectedValue === 'b'}
            onChange={handleChangeR}
            value="b"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'B' }}
          />
        }
        label="a(x)图"
        />
        <FormControlLabel
        control={
            <Radio
            checked={selectedValue === 's'}
            onChange={handleChangeR}
            value="s"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'S' }}
          />
        }
        label="无图"
        />
        <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedD}
            onChange={handleChange}
            name="checkedD"
            color="primary"
          />
        }
        label="聚焦"
        />
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={start}>试验</Button>
            <Button onClick={inicio}>恢复</Button>
            <Button>记录</Button>
        </ButtonGroup>
      </FormGroup>
    </div>
  </div>
  )
}