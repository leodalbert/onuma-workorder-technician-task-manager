import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Hidden, Button, Typography, Toolbar, AppBar } from '@material-ui/core';
import { layoutStyles } from '../../styles/styles';
import CloseIcon from '@material-ui/icons/Close';

import logo from './BIM_GENIE_GREEN_100p.jpg';

const Header = ({
  email,
  name,
  studio,
  text,
  dialogHeader,
  handleClose,
  isMobile,
}) => {
  const layoutClasses = layoutStyles();
  const openInPopup = () => {
    const newWindow = window.open(
      `https://system.onuma.com/${studio}/bugs?url=${encodeURIComponent(
        window.location.href
      )}`,
      'window',
      'toolbar=no, menubar=no, resizable=no, width=400,height=500, top=300, left=300'
    );
    if (newWindow) newWindow.opener = null;
  };
  return (
    <div>
      <AppBar position='static'>
        <Toolbar classes={{ root: layoutClasses.navbarContainer }}>
          <div className={layoutClasses.navbarTitleContainer}>
            <img src={logo} alt='logo' className={layoutClasses.navbarLogo} />
            <Typography
              style={
                dialogHeader
                  ? { fontSize: '16px' }
                  : { textDecoration: 'inherit' }
              }
              component={dialogHeader ? 'h6' : Link}
              to={`${process.env.PUBLIC_URL}/${studio}/technicians/${
                email && email
              }`}
              variant='h6'
              className={layoutClasses.navbarTitle}>
              {text} {!dialogHeader && name && `- ${name}`}
            </Typography>
          </div>
          {isMobile && (
            <Button onClick={handleClose} color='inherit'>
              <CloseIcon />
            </Button>
          )}

          <Hidden xsDown>
            {dialogHeader ? (
              <Button onClick={handleClose} color='inherit'>
                Close <CloseIcon />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  openInPopup();
                }}
                color='inherit'>
                Get in touch
              </Button>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.array.isRequired,
  dialogHeader: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};

Header.defaultProps = {
  text: ['Assignments'],
  dialogHeader: false,
  isMobile: false,
};

const mapStateToProps = (state) => ({
  email: state.tech.email,
  name: state.tech.name,
  studio: state.tech.studio,
});

export default connect(mapStateToProps)(Header);
