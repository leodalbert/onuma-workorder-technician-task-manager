import React from 'react';
import Cookies from 'js-cookie';
import { Container, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';
import { login } from '../../actions/auth';

export const PrivateRoute = ({
  isAuthenticated,
  login,
  component: Component,
  ...rest
}) => {
  // TODO refractor auth logic to this file
  const email = useLocation().pathname.split('/').pop();
  if (!isAuthenticated) {
    const cookie = Cookies.get('tech');
    if (cookie && atob(cookie) === email) {
      login(atob(cookie));
    }
  }

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <div>
            <Component {...props} />
          </div>
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
});

export default connect(mapStateToProps, { login })(PrivateRoute);
