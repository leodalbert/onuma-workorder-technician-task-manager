import React, { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Dashboard from '../layout/Dashboard';
import WorkOrder from '../workOrderPage/WorkOrder';
import NotFound from '../layout/NotFound';
import Header from '../layout/Header';

const HeaderWithRouter = withRouter(Header);

const Routes = () => {
  return (
    <Fragment>
      <section>
        <HeaderWithRouter />
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/technicians/:techEmail`}
            component={Dashboard}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/technicians/workorder/:id/:techEmail`}
            component={WorkOrder}
          />
          <Route component={NotFound} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
