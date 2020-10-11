import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllWorkOrders } from '../../actions/workOrder';
import SummaryTable from '../tables/SummaryTable';
import Spinner from './Spinner';
import { Container } from '@material-ui/core';

const Dashboard = ({ getAllWorkOrders, loading, workOrders }) => {
  useEffect(() => {
    getAllWorkOrders(19);
  }, [getAllWorkOrders]);

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <SummaryTable workOrders={workOrders} />
    </Container>
  );
};

Dashboard.propTypes = {
  getAllWorkOrders: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  workOrders: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.workOrder.loading,
  workOrders: state.workOrder.workOrders,
});

export default connect(mapStateToProps, { getAllWorkOrders })(Dashboard);
