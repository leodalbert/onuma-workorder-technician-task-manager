import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { layoutStyles } from '../../styles/styles';
import CloseIcon from '@material-ui/icons/Close';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import { logout } from '../../actions/auth';

import HelpIcon from './HelpIcon';
import LogoutIcon from './LogoutIcon';
import logo from './BIM_GENIE_GREEN_100p.jpg';

const Header = ({
  email,
  name,
  studio,
  text,
  dialogHeader,
  handleClose,
  isMobile,
  token,
  isAuth,
  match,
  logout,
  history,
}) => {
  const location = useLocation();
  const layoutClasses = layoutStyles();
  const isWorkorder = !(
    useLocation().pathname.split('/').slice(-2)[0] === 'technicians'
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
            {isWorkorder && !dialogHeader && isAuth && (
              <IconButton
                color='inherit'
                component={Link}
                to={`${process.env.PUBLIC_URL}/${studio}/technicians/${
                  email && email
                }`}>
                <FormatListBulletedRoundedIcon style={{ fontSize: 40 }} />
              </IconButton>
            )}
            {!isWorkorder && isAuth && !dialogHeader && (
              <IconButton onClick={handleLogout} color='inherit'>
                <LogoutIcon />
              </IconButton>
            )}
            {isAuth && (
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
                {dialogHeader && text} {!dialogHeader && name && name}
              </Typography>
            )}
          </div>
          {dialogHeader &&
            (isMobile ? (
              <Button onClick={handleClose} color='inherit'>
                <CloseIcon />
              </Button>
            ) : (
              <Button onClick={handleClose} color='inherit'>
                Close <CloseIcon />
              </Button>
            ))}

          {!dialogHeader && (
            <IconButton
              onClick={() => {
                openInPopup();
              }}
              color='inherit'>
              <HelpIcon />
            </IconButton>
          )}
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
  token: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
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
  token: state.tech.token,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
