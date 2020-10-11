import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Hidden } from '@material-ui/core';

import logo from './onumalogo_noshad.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    maxHeight: '70%',
    maxWidth: 65,
  },
  title: {
    textAlign: 'left',
  },
  btn: {
    marginLeft: '140px',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar classes={{ root: classes.toolbar }}>
          <Typography variant='h6' className={classes.title}>
            Work Order Manager
          </Typography>

          <img src={logo} alt='logo' className={classes.logo} />
          <Hidden xsDown>
            <Button color='inherit' className={classes.btn}>
              Bugs
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
