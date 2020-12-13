import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import _ from 'lodash';
import {
  Paper,
  Grid,
  Divider,
  Typography,
  Hidden,
  Button,
} from '@material-ui/core';
import {
  layoutStyles,
  spacingStyles,
  componentStyles,
} from '../../styles/styles';

import ConfirmCompleted from './ConfirmCompleted';
import Location from './Location';
import RequestDescription from './RequestDescription';
import FloorplanDev from '../workOrderPage/FloorplanDev';
import OnumaFloorplan from '../workOrderPage/OnumaFloorplan';
import { inDev } from '../../utils/helpers';
import { logout } from '../../actions/auth';

import {
  getWorkOrderStatusInfo,
  setStudio,
  updateWorkorder,
  setRequesterLoading,
} from '../../actions/status';
import {
  StatusRequestDetailGrid1,
  StatusRequestDetailGrid2,
} from './StatusRequestDetailGrid';
import Spinner from '../layout/Spinner';

const WorkOrderStatusPage = ({
  match: { params },
  workOrder: {
    loading,
    current,
    current: {
      floor,
      building,
      space,
      location_description,
      status,
      request_email,
    },
  },
  currentSpaceInfo: { siteId, buildingId, floorId, spaceId },
  getWorkOrderStatusInfo,
  setStudio,
  allSpaces,
  updateWorkorder,
  requestCc,
  requestEmail,
  authUser,
  logout,
  setRequesterLoading,
}) => {
  const layoutClasses = layoutStyles();
  const spacingClasses = spacingStyles();
  const componentClasses = componentStyles();
  const initialLocationState = { floor, building, space, location_description };

  const [edit, setEdit] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [topLocationState, setTopLocationState] = useState({});
  useEffect(() => {
    setRequesterLoading();
  }, [setRequesterLoading]);
  useEffect(() => {
    setStudio(params.studioId, params.requesterEmail);
  }, [setStudio, params.studioId, params.requesterEmail]);
  useEffect(() => {
    getWorkOrderStatusInfo(params.id, params.studioId);
  }, [getWorkOrderStatusInfo, params.id, params.studioId]);

  useEffect(() => {
    if (
      !loading &&
      authUser !== params.requesterEmail &&
      !requestCc.includes(authUser) &&
      authUser !== requestEmail
    ) {
      logout();
    }
  }, [
    loading,
    authUser,
    requestCc,
    requestEmail,
    logout,
    params.requesterEmail,
  ]);

  const handleClick = () => {
    if (edit) {
      let updateObj = {};
      if (!_.isEqual(initialLocationState, topLocationState)) {
        updateObj.building = topLocationState.building.id;
        updateObj.floor =
          topLocationState.floor.id === '' ? null : topLocationState.floor.id;
        updateObj.space =
          topLocationState.space.id === '' ? null : topLocationState.space.id;
        updateObj.location_description = topLocationState.location_description;
      }
      if (newDescription) {
        updateObj.request_description = newDescription;
      }
      if (!_.isEmpty(updateObj)) {
        updateWorkorder(params.studioId, params.id, updateObj);
      }
      setNewDescription('');
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className={layoutClasses.statusCtrSpacing}>
      <Paper elevation={2} className={layoutClasses.root}>
        <Grid item xs={12} className={layoutClasses.statusHeader}>
          <Typography variant='h6'>
            Work order request by {request_email}
          </Typography>
        </Grid>
        <Divider />
        <Grid item className={spacingClasses.paddingM}>
          <Grid
            className={clsx(
              spacingClasses.paddingTopL,
              spacingClasses.paddingBottomL
            )}
            item
            container
            xs={12}>
            {status === 'Completed' && authUser === requestEmail && (
              <Grid item container direction='column' xs={12}>
                <ConfirmCompleted
                  studioId={Number(params.studioId)}
                  workorderId={Number(params.id)}
                />
                <Divider />
              </Grid>
            )}
            <Grid item container direction='column' xs={12} lg={7}>
              <Grid item container spacing={3}>
                <StatusRequestDetailGrid1 workOrder={current} />
                <Hidden mdDown>
                  <Location
                    workorder={current}
                    edit={edit}
                    allSpaces={allSpaces}
                    setTopLocationState={setTopLocationState}
                  />
                  <RequestDescription
                    workorder={current}
                    edit={edit}
                    newDescription={newDescription}
                    setNewDescription={setNewDescription}
                  />
                  <StatusRequestDetailGrid2 workOrder={current} />
                </Hidden>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction='column'
              justify='center'
              xs={12}
              lg={5}>
              {inDev() ? (
                <Grid
                  item
                  className={clsx(
                    spacingClasses.paddingTopL,
                    spacingClasses.paddingBottomL
                  )}>
                  <div className={layoutClasses.floorPlan}>
                    <FloorplanDev
                      studioId={params.studioId}
                      siteId={siteId}
                      buildingId={buildingId}
                      floorId={floorId}
                      spaceId={spaceId}
                    />
                  </div>
                </Grid>
              ) : (
                <Grid item>
                  <div className={layoutClasses.floorPlan}>
                    <OnumaFloorplan
                      studioId={params.studioId}
                      siteId={siteId}
                      buildingId={buildingId}
                      floorId={floorId}
                      spaceId={spaceId}
                    />
                  </div>
                </Grid>
              )}
            </Grid>
            <Hidden lgUp>
              <Grid item container direction='column' xs={12} lg={7}>
                <Grid item container spacing={3}>
                  <Location
                    workorder={current}
                    edit={edit}
                    allSpaces={allSpaces}
                    setTopLocationState={setTopLocationState}
                  />
                  <RequestDescription
                    workorder={current}
                    edit={edit}
                    newDescription={newDescription}
                    setNewDescription={setNewDescription}
                  />
                  <StatusRequestDetailGrid2 workOrder={current} />
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
          {status !== 'Completed' &&
            status !== 'Completion Confirmed' &&
            authUser === requestEmail && (
              <Grid item xs={12}>
                <div className={componentClasses.btnBreak}>
                  <Button
                    className={componentClasses.btnWidth}
                    style={
                      edit
                        ? { backgroundColor: '#fdd835' }
                        : { backgroundColor: '#d3e6df' }
                    }
                    disabled={
                      edit &&
                      !topLocationState.location_description &&
                      !topLocationState.space.id
                    }
                    variant='contained'
                    color={edit ? 'inherit' : 'secondary'}
                    onClick={handleClick}>
                    {edit ? 'Save Changes' : 'Edit Details'}
                  </Button>
                </div>
              </Grid>
            )}
        </Grid>
      </Paper>
    </div>
  );
};

WorkOrderStatusPage.propTypes = {
  workOrder: PropTypes.object.isRequired,
  match: PropTypes.object,
  getWorkOrderStatusInfo: PropTypes.func.isRequired,
  setStudio: PropTypes.func.isRequired,
  allSpaces: PropTypes.array,
  updateWorkorder: PropTypes.func.isRequired,
  requestEmail: PropTypes.string,
  requestCc: PropTypes.array,
  logout: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
  setRequesterLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workOrder: state.statusPage,
  currentSpaceInfo: state.statusPage.currentSpaceInfo,
  allSpaces: state.statusPage.allSpaces,
  requestEmail: state.statusPage.current.request_email,
  authUser: state.auth.user,
  requestCc: state.statusPage.current.request_email_cc
    ? state.statusPage.current.request_email_cc
        .split(',')
        .map((item) => item.trim())
    : [],
});

export default connect(mapStateToProps, {
  getWorkOrderStatusInfo,
  setStudio,
  updateWorkorder,
  logout,
  setRequesterLoading,
})(WorkOrderStatusPage);

// #fdd835
