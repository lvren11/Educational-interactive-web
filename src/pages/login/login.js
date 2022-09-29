import React, {useState} from 'react';
import { useForm } from 'react-hook-form';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import SchoolIcon from '@material-ui/icons/School';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
    // margin: theme.spacing(0,0,0,0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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
    grade:"",
    class:"",
    sex:"",
		name: "",
		marketing: false,
	});

	const handleLogin = () => {
    console.log(formValues);
    if(formValues.school === userdata.school){
      if(formValues.snumber === userdata.user){
        if(formValues.name === userdata.name){
          StorageHelper.set('web_user_id', userdata.response.uid);
          StorageHelper.set('web_user', userdata.response.data);
          StorageHelper.set('x-auth-token', userdata.response.token);
          router.push('/fquestion_2/fquestion');
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square> */}
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
              id="grade"
              label="年级"
              name="grade"
              autoComplete="grade"
              autoFocus
              onChange={e => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="class"
              label="班级"
              name="class"
              autoComplete="class"
              autoFocus
              onChange={e => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="sex"
              label="性别"
              name="sex"
              autoComplete="sex"
              autoFocus
              onChange={e => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="姓名"
              id="name"
              autoComplete="name"
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
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      {/* </Grid> */}
    </Container>
  );
}