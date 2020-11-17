import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllWorkOrders,
  clearCurrent,
  setLoading,
} from '../../actions/workOrder';
import { getCurrentTech } from '../../actions/tech';
import { getVisibleWorkorders } from '../../utils/helpers';
import WorkorderFilterSelect from './WorkorderFilterSelect';
import SummaryTable from '../dashboardTable/SummaryTable';
import Spinner from './Spinner';
import { Container } from '@material-ui/core';

const Dashboard = ({
  getAllWorkOrders,
  clearCurrent,
  setLoading,
  loading,
  workOrders,
  getCurrentTech,
  techId,
  match: { params },
}) => {
  const [filter, setFilter] = useState('active');
  const [filteredWorkorders, setFilteredWorkorders] = useState([]);

  useEffect(() => {
    clearCurrent();
  }, [clearCurrent]);
  useEffect(() => {
    getCurrentTech(params.techEmail, params.studioId);
  }, [getCurrentTech, params.techEmail, params.studioId]);
  useEffect(() => {
    getAllWorkOrders(techId, params.studioId);
  }, [techId, params.studioId, getAllWorkOrders]);
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
          setLoading={setLoading}
          techEmail={params.techEmail}
          techId={techId}
        />
      </Container>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getAllWorkOrders: PropTypes.func.isRequired,
  getCurrentTech: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  workOrders: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  id: PropTypes.number,
};

const mapStateToProps = (state) => ({
  loading: state.workOrder.loading,
  workOrders: state.workOrder.workOrders,
  techId: state.tech.id,
});

export default connect(mapStateToProps, {
  getAllWorkOrders,
  clearCurrent,
  setLoading,
  getCurrentTech,
})(Dashboard);
