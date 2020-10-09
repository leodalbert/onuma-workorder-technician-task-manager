import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../layout/Dashboard';
import WorkOrder from '../workOrderPage/WorkOrder';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/workorder' component={WorkOrder} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
