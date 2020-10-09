import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Routes from './components/routing/Routes';

import './App.css';

const App = () => {
  return (
    <Fragment>
      <Router>
        <Route component={Routes} />
      </Router>
    </Fragment>
  );
};

export default App;
