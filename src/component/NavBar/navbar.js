import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  List,
  ListItem,
  Avatar
  // Button,
} from '@material-ui/core';
import logo from '../../assets/logo/logo.svg'
import Avatar_img from '../../assets/avatar_01.png';
import  Image  from '../Image';
// import StorageHelper from '../Storage';
// import router from 'umi/router';

const useStyles = makeStyles(theme => ({
  root: {
    width:'100%',
  },
  flexGrow: {
    flexGrow: 1,
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    backgroundColor:'white',
  },
  listItem: {
    cursor: 'pointer',
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemText: {
    flex: '0 0 auto',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  },
  listItemButton: {
    whiteSpace: 'nowrap',
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  iconButton: {
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
  logoContainer: {
    width: 100,
    height: 28,
    [theme.breakpoints.up('md')]: {
      width: 120,
      height: 32,
    },
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
}));

const Topbar = props => {
  const { onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  // const handleClose = () => {
  //   StorageHelper.clear('web_user_id');
  //   StorageHelper.clear('web_user');
  //   StorageHelper.clear('x-auth-token');
  //   router.push('/');
  // };

  return (
    <Toolbar disableGutters className={classes.toolbar} {...rest}>
      <div className={classes.logoContainer}>
        <a href="/" title="thefront">
          <Image
            className={classes.logoImage}
            src={logo}
            alt="thefront"
            lazy={false}
          />
        </a>
      </div>
      <div className={classes.flexGrow} />
        <List className={classes.navigationContainer}>
          <ListItem className={classes.listItem}>
          <Avatar className={classes.large} alt="Remy Sharp" src={Avatar_img} />
          </ListItem>
          <ListItem className={classes.listItem}>
          {/* <Button
              size="large"
              // variant="outlined"
              color="secondary"
              component="a"
              target="blank"
              onClick={() => handleClose()}
              className={classes.listItemButton}
            >
              退出登录
            </Button> */}
          </ListItem>
        </List>
    </Toolbar>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default Topbar;