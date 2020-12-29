import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Typography, Toolbar, AppBar, IconButton } from '@material-ui/core';
import { layoutStyles } from '../../styles/styles';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import { logout } from '../../actions/auth';

import logo from './BIM_GENIE_GREEN_100p.jpg';
import HelpIcon from './HelpIcon';
import LogoutIcon from './LogoutIcon';

const StatusPageHeader = ({
  email,
  studio,
  token,
  isAuth,
  match,
  history,
  logout,
}) => {
  const location = useLocation();
  const layoutClasses = layoutStyles();
  const isWorkorder = !(
    useLocation().pathname.split('/').slice(-2)[0] === 'requester'
  );
  const openInPopup = () => {
    const newWindow = window.open(
      `https://system.onuma.com/${
        match.params.studioId
      }/get-in-touch?url=${encodeURIComponent(
        'https://system.onuma.com' + location.pathname
      )}/${token ? token : ''}`,
      'window',
      'toolbar=no, menubar=no, resizable=no, width=400,height=500, top=300, left=300'
    );
    if (newWindow) newWindow.opener = null;
  };
  const handleLogout = () => {
    logout();
    history.push(`${process.env.PUBLIC_URL}/${match.params.studioId}/logout`);
  };
  return (
    <div>
      <AppBar position='static'>
        <Toolbar classes={{ root: layoutClasses.navbarContainer }}>
          <div className={layoutClasses.navbarTitleContainer}>
            <img src={logo} alt='logo' className={layoutClasses.navbarLogo} />
            {isWorkorder && isAuth && (
              <IconButton
                color='inherit'
                component={Link}
                to={`${process.env.PUBLIC_URL}/${studio}/requester/${
                  email && email
                }`}>
                <FormatListBulletedRoundedIcon style={{ fontSize: 40 }} />
              </IconButton>
            )}
            {!isWorkorder && isAuth && (
              <IconButton onClick={handleLogout} color='inherit'>
                <LogoutIcon />
              </IconButton>
            )}
            {isAuth && (
              <Typography
                style={{ textDecoration: 'inherit' }}
                component={Link}
                to={`${process.env.PUBLIC_URL}/${studio}/requester/${
                  email && email
                }`}
                variant='h6'
                className={layoutClasses.navbarTitle}>
                {email}
              </Typography>
            )}
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
  token: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

StatusPageHeader.defaultProps = {
  text: ['Work order requests by '],
};

const mapStateToProps = (state) => ({
  studio: Number(state.statusPage.studio),
  email: state.statusPage.email,
  token: state.statusPage.current.token,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(StatusPageHeader);
