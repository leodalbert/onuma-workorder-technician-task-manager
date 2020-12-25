import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Container, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  logout,
  sessionLogin,
  sessionLoginRequester,
  sessionResume,
} from '../../actions/auth';
import useInterval from '../../hooks/useInterval';
import Spinner from '../layout/Spinner';
import { inDev } from '../../utils/helpers';

let cookie;

export const PrivateRoute = ({
  location: { pathname },
  computedMatch: { params },
  isAuthenticated,
  authLoading,
  sessionLogin,
  sessionResume,
  login,
  logout,
  redirect,
  sessionLoginRequester,
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    if (params.requesterEmail) {
      if (Cookies.get('onumaLocal')) {
        cookie = JSON.parse(atob(Cookies.get('onumaLocal')));
      }
      if (!isAuthenticated) {
        if (params.token) {
          sessionLoginRequester(
            params.studioId,
            params.requesterEmail,
            params.token
          );
        } else if (cookie.requesterEmail === params.requesterEmail) {
          sessionLoginRequester(
            params.studioId,
            params.requesterEmail,
            cookie.token
          );
        } else {
          logout();
        }
      }
    } else {
      if (Cookies.get('onumaLocal')) {
        cookie = JSON.parse(atob(Cookies.get('onumaLocal')));
      }
      if (!isAuthenticated) {
        if (params.token) {
          sessionLogin(
            params.studioId,
            params.techEmail,
            params.token,
            pathname
          );
        } else if (cookie.techEmail === params.techEmail) {
          sessionLogin(
            params.studioId,
            params.techEmail,
            cookie.token,
            pathname
          );
        } else {
          logout();
        }
      }
    }
  }, [
    isAuthenticated,
    params.studioId,
    params.techEmail,
    params.token,
    params.requesterEmail,
    sessionLoginRequester,
    sessionLogin,
    pathname,
    logout,
  ]);

  // refresh token every 30 min
  useInterval(() => {
    cookie = JSON.parse(atob(Cookies.get('onumaLocal')));
    console.log('test');
    sessionResume(params.studioId, params.techEmail, cookie.token);
  }, 1800000);

  // redirect to login page if tech requires login when not in development
  if (!isAuthenticated && redirect && !inDev()) {
    return (
      <Route
        render={() => {
          window.location.href = `https://system.onuma.com/user/login?_next=${redirect}`;
          return null;
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <div>
            <Component {...props} />
          </div>
        ) : authLoading ? (
          <Spinner />
        ) : (
          <Container style={{ marginTop: '20px', textAlign: 'center' }}>
            <Typography variant='subtitle1'>
              <i className='fas fa-exclamation'></i>
              {'  '}
              Sorry, you do not have permission to view this page, please use
              the link in your email to navigate to work orders
            </Typography>
          </Container>
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.authLoading,
  redirect: state.auth.redirect,
});

export default connect(mapStateToProps, {
  logout,
  sessionLogin,
  sessionResume,
  sessionLoginRequester,
})(PrivateRoute);
