import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentTech } from '../../actions/tech';
import { getWorkOrder } from '../../actions/workOrder';
import { login, logout } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const RequesterAuthPage = ({
  match: { params },
  getWorkOrder,
  login,
  logout,
  isAuthenticated,
  authLoading,
  workorderToken,
  requestCc,
  requestEmail,
}) => {
  useEffect(() => {
    getWorkOrder(params.id, params.studioId);
  }, [getWorkOrder, params.id, params.studioId]);

  useEffect(() => {
    if (!isAuthenticated && workorderToken) {
      if (
        (requestEmail === params.requesterEmail ||
          requestCc.includes(params.requesterEmail)) &&
        workorderToken === params.token
      ) {
        login(params.requesterEmail);
      } else {
        logout();
      }
    }
  }, [
    isAuthenticated,
    params,
    workorderToken,
    login,
    requestEmail,
    requestCc,
    logout,
  ]);

  return !authLoading ? (
    <Redirect
      to={`${process.env.PUBLIC_URL}/${params.studioId}/requester/workorder/${params.id}/${params.requesterEmail}`}
    />
  ) : (
    <Spinner />
  );
};

RequesterAuthPage.propTypes = {
  match: PropTypes.object.isRequired,
  workorderToken: PropTypes.string,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authLoading: PropTypes.bool.isRequired,
  requestEmail: PropTypes.string,
  requestCc: PropTypes.array,
};

const mapStateToProps = (state) => ({
  workorderToken: state.workOrder.current.token,
  requestEmail: state.workOrder.current.request_email,
  requestCc: state.workOrder.current.request_email_cc
    .split(',')
    .map((item) => item.trim()),
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.authLoading,
});

export default connect(mapStateToProps, {
  getCurrentTech,
  getWorkOrder,
  login,
  logout,
})(RequesterAuthPage);

// thomasdalbert@gmail.com, thomas@dalbert.us
