import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Hidden, Button, Typography, Toolbar, AppBar } from '@material-ui/core';
import { headerStyles } from '../../styles/HeaderStyles';

import logo from './onumalogo_noshad.jpg';

const Header = ({ email, name, studio}) => {
  const classes = headerStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar classes={{ root: classes.toolbar }}>
          <Typography
            style={{ textDecoration: 'inherit' }}
            component={Link}
            to={`${process.env.PUBLIC_URL}/${studio}/technicians/${email && email}`}
            variant='h6'
            className={classes.title}
          >
            Assignments {name && `- ${name}`}
          </Typography>

          <img src={logo} alt='logo' className={classes.logo} />
          <Hidden xsDown>
            <Button color='inherit' className={classes.btn}>
              Get in touch
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.tech.email,
  name: state.tech.name,
  studio: state.tech.studio
});

export default connect(mapStateToProps)(Header);
