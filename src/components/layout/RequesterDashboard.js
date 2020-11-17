import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllWorkOrderRequestsByRequester,
  clearRequesterState,
  setRequesterLoading,
  setStudio,
} from '../../actions/status';
import { getVisibleWorkorders } from '../../utils/helpers';
import WorkorderFilterSelect from './WorkorderFilterSelect';
import SummaryTable from '../dashboardTable/SummaryTable';
import Spinner from './Spinner';
import { Container } from '@material-ui/core';

const RequesterDashboard = ({
  loading,
  workOrders,
  match: { params },
  getAllWorkOrderRequestsByRequester,
  clearRequesterState,
  setRequesterLoading,
  setStudio,
}) => {
  const [filter, setFilter] = useState('all');
  const [filteredWorkorders, setFilteredWorkorders] = useState([]);

  useEffect(() => {
    clearRequesterState();
  }, [clearRequesterState]);

  useEffect(() => {
    setStudio(params.studioId, params.requesterEmail);
  }, [setStudio, params.studioId, params.requesterEmail]);

  useEffect(() => {
    getAllWorkOrderRequestsByRequester(params.requesterEmail, params.studioId);
  }, [
    params.studioId,
    params.requesterEmail,
    getAllWorkOrderRequestsByRequester,
  ]);

  useEffect(() => {
    setFilteredWorkorders(getVisibleWorkorders(workOrders, filter));
  }, [setFilteredWorkorders, filter, workOrders]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <WorkorderFilterSelect filter={filter} setFilter={setFilter} />
      <Container>
        <SummaryTable
          workOrders={filteredWorkorders}
          setLoading={setRequesterLoading}
          requesterPage={true}
          techEmail={params.requesterEmail}
          //   techId={techId}
        />
      </Container>
    </Fragment>
  );
};

RequesterDashboard.propTypes = {
  getAllWorkOrderRequestsByRequester: PropTypes.func.isRequired,
  clearRequesterState: PropTypes.func.isRequired,
  setRequesterLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  workOrders: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  setStudio: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.statusPage.loading,
  workOrders: state.statusPage.workOrders,
});

export default connect(mapStateToProps, {
  getAllWorkOrderRequestsByRequester,
  clearRequesterState,
  setRequesterLoading,
  setStudio,
})(RequesterDashboard);
