import React, {useState} from 'react';
import { useForm } from 'react-hook-form';

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
import { makeStyles } from '@material-ui/core/styles';
import StorageHelper from '../../component/Storage';
import router from 'umi/router';
import userdata from '../../../mock/data/user.json';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const { handleSubmit } = useForm(); // initialise the hook

	const [formValues, setFormValues] = useState({
		school: "",
		snumber: "",
		password: "",
		marketing: false,
	});

	const handleLogin = () => {
    console.log(formValues);
    if(formValues.school === userdata.school){
      if(formValues.snumber === userdata.user){
        if(formValues.password === userdata.password){
          StorageHelper.set('web_user_id', userdata.response.uid);
          StorageHelper.set('web_user', userdata.response.data);
          StorageHelper.set('x-auth-token', userdata.response.token);
          router.push('/fquestion_1/fquestion');
        }
      }
    }
	};

  const handleChange = e => {
		let key = e.target.name;
		let value;
		if (key !== "marketing") {
			value = e.target.value;
		} 
		setFormValues({
			...formValues,
			[key]: value
		});
	};

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SchoolIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            学校登录
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(handleLogin)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="school"
              label="学校名称"
              name="school"
              autoComplete="school"
              autoFocus
              onChange={e => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="snumber"
              label="学号"
              name="snumber"
              autoComplete="snumber"
              autoFocus
              onChange={e => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => handleChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              登录
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"登录须知"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}