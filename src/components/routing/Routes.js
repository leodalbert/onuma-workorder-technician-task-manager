import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../layout/Dashboard';
import WorkOrder from '../workOrderPage/WorkOrder';
import NotFound from '../layout/NotFound';
import Header from '../layout/Header';

const Routes = () => {
  return (
    <Fragment>
      <section>
        <Header />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/workorder' component={WorkOrder} />
          <Route component={NotFound} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
