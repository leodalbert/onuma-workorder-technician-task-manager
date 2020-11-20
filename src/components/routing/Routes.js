import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../layout/Header';
import StatusPageHeader from '../layout/StatusPageHeader';
import Spinner from '../layout/Spinner';
import PrivateRoute from './PrivateRoute';
// import NotFound from '../layout/NotFound';
const TechAuthPage = lazy(() => import('../auth/TechAuthPage'));
const RequesterAuthPage = lazy(() => import('../auth/RequesterAuthPage'));
const WorkOrder = lazy(() => import('../workOrderPage/WorkOrder'));
const Dashboard = lazy(() => import('../layout/Dashboard'));
const RequesterDashboard = lazy(() => import('../layout/RequesterDashboard'));
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
        <Suspense fallback={<Spinner />}>
          <Switch>
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/:studioId/technicians/:techEmail`}
              component={Dashboard}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/:studioId/technicians/workorder/:id/:techEmail`}
              component={WorkOrder}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/:studioId/technicians/workorder/:id/:techEmail/:token`}
              component={TechAuthPage}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/:studioId/requester/workorder/:id/:requesterEmail`}
              component={WorkOrderStatusPage}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/:studioId/requester/workorder/:id/:requesterEmail/:token`}
              component={RequesterAuthPage}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/:studioId/requester/:requesterEmail`}
              component={RequesterDashboard}
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </section>
    </Fragment>
  );
};

export default Routes;
