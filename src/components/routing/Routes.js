import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../layout/Header';
import StatusPageHeader from '../layout/StatusPageHeader';
import Spinner from '../layout/Spinner';
const WorkOrder = lazy(() => import('../workOrderPage/WorkOrder'));
const Dashboard = lazy(() => import('../layout/Dashboard'));
const WorkOrderStatusPage = lazy(() =>
  import('../statusPage/WorkOrderStatusPage')
);
const NotFound = lazy(() => import('../layout/NotFound'));

// TODO - handle wrong link

const Routes = () => {
  return (
    <Fragment>
      <section>
        <Switch>
          <Route
            path={`${process.env.PUBLIC_URL}/:studioId/technicians`}
            component={Header}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/:studioId/requester`}
            component={StatusPageHeader}
          />
        </Switch>
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/:studioId/technicians/:techEmail`}
              component={Dashboard}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/:studioId/technicians/workorder/:id/:techEmail`}
              component={WorkOrder}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/:studioId/requester/workorder/:id/:requesterEmail`}
              component={WorkOrderStatusPage}
            />
          </Suspense>
          <Route component={NotFound} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
