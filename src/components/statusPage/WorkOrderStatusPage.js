import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
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

import Location from './Location';
import FloorplanDev from '../workOrderPage/FloorplanDev';
import OnumaFloorplan from '../workOrderPage/OnumaFloorplan';
import { inDev } from '../../utils/helpers';

import { getWorkOrderStatusInfo, setStudio } from '../../actions/status';
import {
  StatusRequestDetailGrid1,
  StatusRequestDetailGrid2,
} from './StatusRequestDetailGrid';
import Spinner from '../layout/Spinner';

const WorkOrderStatusPage = ({
  match: { params },
  workOrder: { loading, current, currentSpaceInfo, status },
  currentSpaceInfo: { siteId, studioId, buildingId, floorId, spaceId },
  getWorkOrderStatusInfo,
  setStudio,
}) => {
  const layoutClasses = layoutStyles();
  const spacingClasses = spacingStyles();
  const componentClasses = componentStyles();

  useEffect(() => {
    setStudio(params.studioId, params.requesterEmail);
  }, [setStudio, params.studioId, params.requesterEmail]);
  useEffect(() => {
    getWorkOrderStatusInfo(params.id, params.studioId);
  }, [getWorkOrderStatusInfo, params.id, params.studioId]);

  const [edit, setEdit] = useState(false);

  return loading ? (
    <Spinner />
  ) : (
    <div className={layoutClasses.statusCtrSpacing}>
      <Paper elevation={2} className={layoutClasses.root}>
        <Grid item xs={12} className={layoutClasses.statusHeader}>
          <Typography variant='h6'>Work Order Request</Typography>
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
            <Grid item container direction='column' xs={12} lg={7}>
              <Grid item container spacing={3}>
                <StatusRequestDetailGrid1 workOrder={current} />
                <Hidden mdDown>
                  <Location workorder={current} edit={edit} />
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
                      studioId={studioId}
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
                      studioId={studioId}
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
                  <Location workorder={current} edit={edit} />
                  <StatusRequestDetailGrid2 workOrder={current} />
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
          <Grid item xs={12}>
            <div className={componentClasses.btnBreak}>
              <Button
                style={{ width: '190px' }}
                variant='contained'
                color={edit ? 'secondary' : 'primary'}
                onClick={() => setEdit(!edit)}>
                {edit ? 'Save Changes' : 'Edit Details'}
              </Button>
            </div>
          </Grid>
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
};

const mapStateToProps = (state) => ({
  workOrder: state.statusPage,
  currentSpaceInfo: state.statusPage.currentSpaceInfo,
});

export default connect(mapStateToProps, { getWorkOrderStatusInfo, setStudio })(
  WorkOrderStatusPage
);
