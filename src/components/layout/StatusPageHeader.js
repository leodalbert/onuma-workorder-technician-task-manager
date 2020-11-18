import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Toolbar, AppBar, IconButton } from '@material-ui/core';
import { layoutStyles } from '../../styles/styles';

import logo from './BIM_GENIE_GREEN_100p.jpg';
import HelpIcon from './HelpIcon';

const StatusPageHeader = ({ text, email, studio }) => {
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
              style={{ textDecoration: 'inherit' }}
              component={Link}
              to={`${process.env.PUBLIC_URL}/${studio}/requester/${
                email && email
              }`}
              variant='h6'
              className={layoutClasses.navbarTitle}>
              {text}
              {email}
            </Typography>
          </div>

          <IconButton
            onClick={() => {
              openInPopup();
            }}
            color='inherit'>
            <HelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

StatusPageHeader.propTypes = {
  text: PropTypes.array.isRequired,
  studio: PropTypes.number,
  email: PropTypes.string,
};

StatusPageHeader.defaultProps = {
  text: ['Work order requests by '],
};

const mapStateToProps = (state) => ({
  studio: Number(state.statusPage.studio),
  email: state.statusPage.email,
});

export default connect(mapStateToProps)(StatusPageHeader);
