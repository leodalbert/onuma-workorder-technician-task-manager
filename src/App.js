import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { inDev } from './utils/helpers';

//  Material Ui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import './App.css';

import Routes from './components/routing/Routes';

// // Sets Bearer token in header for all requests

// // Sets Bearer token in header for all requests only in dev
if (inDev()) {
  console.log('dev');
  axios.defaults.headers.common = {
    Authorization: 'Bearer ' + process.env.REACT_APP_BEARER_TOKEN,
  };
}

const App = ({ reqError }) => {
  // alert on backend error and cancel following requests
  useEffect(() => {
    reqError.msg && alert(reqError.msg + ' - status: ' + reqError.status);
  }, [reqError]);

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
});

export default connect(mapStateToProps)(App);
