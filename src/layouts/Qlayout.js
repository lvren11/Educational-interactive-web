import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import  Topbar  from '../component/NavBar/navbar';
import  Footer  from '../component/Footer/footer';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

function Qlayout(props) {
  const { children } = props;

  const classes = useStyles();

  const theme = useTheme();

  const [setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  return (
    <div
      className={clsx({
        [classes.root]: true,
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <main>
        <Divider />
        {children}
      </main>
      {/* <Footer/> */}
    </div>
  );
};

Qlayout.propTypes = {
  children: PropTypes.node,
};

export default Qlayout;