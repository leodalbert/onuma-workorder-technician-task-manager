import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentTech } from '../../actions/tech';
import { getWorkOrderTech } from '../../actions/workOrder';
import { login, logout } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const AuthPage = ({
  match: { params },
  getCurrentTech,
  getWorkOrderTech,
  techToken,
  workorderTech,
  collaboratorEmails,
  collaboratorTokens,
  login,
  logout,
  isAuthenticated,
  authLoading,
}) => {
  useEffect(() => {
    getCurrentTech(params.techEmail, params.studioId);
  }, [getCurrentTech, params.techEmail, params.studioId]);

  useEffect(() => {
    getWorkOrderTech(params.id, params.studioId);
  }, [getWorkOrderTech, params.id, params.studioId]);

  useEffect(() => {
    if (!isAuthenticated && techToken && workorderTech) {
      if (
        (workorderTech === params.techEmail ||
          collaboratorEmails.includes(params.techEmail)) &&
        (techToken === params.token ||
          collaboratorTokens.includes(params.token))
      ) {
        login(params.techEmail);
      } else {
        logout();
      }
    }
  }, [
    isAuthenticated,
    params,
    techToken,
    login,
    workorderTech,
    collaboratorTokens,
    collaboratorEmails,
    logout,
  ]);

  return !authLoading ? (
    <Redirect
      to={`${process.env.PUBLIC_URL}/${params.studioId}/technicians/workorder/${params.id}/${params.techEmail}`}
    />
  ) : (
    <Spinner />
  );
};

AuthPage.propTypes = {
  match: PropTypes.object.isRequired,
  getCurrentTech: PropTypes.func.isRequired,
  getWorkOrderTech: PropTypes.func.isRequired,
  techToken: PropTypes.string,
  workorderTech: PropTypes.string,
  collaboratorEmails: PropTypes.array.isRequired,
  collaboratorTokens: PropTypes.array.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  techToken: state.tech.token,
  workorderTech: state.workOrder.current.assigned_technician.email,
  collaboratorEmails: state.workOrder.current.collaborators.map(
    (collaborator) => collaborator.collaborator.email
  ),
  collaboratorTokens: state.workOrder.current.collaborators.map(
    (collaborator) => collaborator.collaborator.token
  ),
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.authLoading,
});

export default connect(mapStateToProps, {
  getCurrentTech,
  getWorkOrderTech,
  login,
  logout,
})(AuthPage);
