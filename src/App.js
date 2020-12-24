import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { inDev } from './utils/helpers';

//  Material Ui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import './App.css';

import Routes from './components/routing/Routes';

// // Sets Bearer token in header for all requests

// const setToken = (token) => {
//   axios.defaults.headers.common = {
//     Authorization:
//       'Bearer ' +
//       'token',
//   };
// };

// const CancelToken = axios.CancelToken;
// const cancelRequests = () => {
//   axios.interceptors.request.use((config) => {
//     return {
//       ...config,
//       cancelToken: new CancelToken((cancel) =>
//         cancel('Cancel repeated request')
//       ),
//     };
//   });
// };

const App = ({ reqError, token }) => {
  // alert on backend error and cancel following requests
  useEffect(() => {
    reqError.msg && alert(reqError.msg + ' - status: ' + reqError.status);
  }, [reqError]);
  // set bearer token to be used for API requests
  // useEffect(() => {
  //   setToken(token);
  // }, [token]);

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Router>
          <Route component={Routes} />
        </Router>
      </ThemeProvider>
    </Fragment>
  );
};

App.propTypes = {
  reqError: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  reqError: state.workOrder.error,
  token: state.auth.token,
});

export default connect(mapStateToProps)(App);
