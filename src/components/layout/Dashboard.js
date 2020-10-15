import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllWorkOrders,
  clearCurrent,
  setLoading,
} from '../../actions/workOrder';
import { getCurrentTech } from '../../actions/tech';
import SummaryTable from '../tables/SummaryTable';
import Spinner from './Spinner';
import { Container } from '@material-ui/core';

const Dashboard = ({
  getAllWorkOrders,
  clearCurrent,
  setLoading,
  loading,
  workOrders,
  getCurrentTech,
  match,
}) => {
  useEffect(() => {
    clearCurrent();
    getAllWorkOrders(match.params.techEmail);
    getCurrentTech(match.params.techEmail);
  }, [clearCurrent, getAllWorkOrders, getCurrentTech, match.params.techEmail]);

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <SummaryTable
        workOrders={workOrders}
        setLoading={setLoading}
        techEmail={match.params.techEmail}
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
};

const mapStateToProps = (state) => ({
  loading: state.workOrder.loading,
  workOrders: state.workOrder.workOrders,
});

export default connect(mapStateToProps, {
  getAllWorkOrders,
  clearCurrent,
  setLoading,
  getCurrentTech,
})(Dashboard);
