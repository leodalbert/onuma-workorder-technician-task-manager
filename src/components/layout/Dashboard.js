import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllWorkOrders,
  clearCurrent,
  setLoading,
} from '../../actions/workOrder';
import { getCurrentTech } from '../../actions/tech';
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
  useEffect(() => {
    clearCurrent();
  }, [clearCurrent]);
  useEffect(() => {
    getCurrentTech(params.techEmail, params.studioId);
  }, [getCurrentTech, params.techEmail, params.studioId]);
  useEffect(() => {
    getAllWorkOrders(techId, params.studioId);
  }, [techId, params.studioId, getAllWorkOrders]);

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <SummaryTable
        workOrders={workOrders}
        setLoading={setLoading}
        techEmail={params.techEmail}
        techId={techId}
      />
    </Container>
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
