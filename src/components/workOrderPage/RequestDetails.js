import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  Button,
  Divider,
  Tooltip,
  Hidden,
  Typography,
} from '@material-ui/core';
import {
  layoutStyles,
  componentStyles,
  spacingStyles,
} from '../../styles/styles';

import {
  RequestNumberGrid,
  RequestCommentGrid,
  RequestLocationGrid,
  RequestPmGrid,
} from './RequestDetailGrid';
import Components from '../components/Components';
import MaintenanceProcedureDialog from './MaintenanceProcedureDialog';
import { sendCommentToRequestor } from '../../actions/workOrder';
import FloorplanDev from './FloorplanDev';
import OnumaFloorplan from './OnumaFloorplan';
import { inDev } from '../../utils/helpers';

const RequestDetails = ({
  workOrder,
  components,
  studioId,
  sendCommentToRequestor,
  spaceInfo: { siteId, buildingId, floorId, spaceId },
}) => {
  useEffect(() => {}, [floorId]);
  const layoutClasses = layoutStyles();
  const componentClasses = componentStyles();
  const spacingClasses = spacingStyles();
  const [comment, setComment] = useState(workOrder.administrator_comment);
  const [openSearchDailog, setOpenSearchDialog] = useState(false);
  const [openPmDialog, setOpenPmDialog] = useState(false);

  const handleOpenSearchDialog = () => {
    setOpenSearchDialog(true);
  };

  return (
    <div className={layoutClasses.root}>
      <Grid item container xs={12}>
        <Grid item container direction='column' xs={12} lg={7}>
          <Grid item container spacing={3}>
            <RequestNumberGrid workOrder={workOrder} />
            <Hidden mdDown>
              <RequestLocationGrid workOrder={workOrder} />
              <RequestPmGrid
                workOrder={workOrder}
                setOpenPmDialog={setOpenPmDialog}
              />
              <RequestCommentGrid workOrder={workOrder} />
            </Hidden>
          </Grid>
        </Grid>
        <Grid item container direction='column' justify='center' xs={12} lg={5}>
          {inDev() ? (
            <Grid item>
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
              <RequestLocationGrid workOrder={workOrder} />
              <RequestPmGrid
                workOrder={workOrder}
                setOpenPmDialog={setOpenPmDialog}
              />
              <RequestCommentGrid workOrder={workOrder} />
            </Grid>
          </Grid>
        </Hidden>

        <Grid item container direction='column' xs={12} lg={9}>
          <Grid item container spacing={3} justify='flex-end'>
            <Grid item xs={12} sm={8} style={{ margin: '12px 0px' }}>
              <TextField
                className={layoutClasses.commentField}
                id='commentField'
                label='Comments To Requester'
                multiline
                fullWidth
                rows={4}
                variant='outlined'
                value={comment ? comment : ''}
                onChange={(e) => setComment(e.target.value)}
                FormHelperTextProps={{
                  className: layoutClasses.commentFieldHelperText,
                }}
                helperText={
                  comment !== workOrder.administrator_comment &&
                  'Click "Save + Send" to email your comment to requester'
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid className={componentClasses.commentBtnCtr} item xs={12} lg={3}>
          <Button
            onClick={() =>
              sendCommentToRequestor(comment, studioId, workOrder.id)
            }
            disabled={comment === workOrder.administrator_comment}
            variant='contained'
            className={componentClasses.btnWidth}
            color='secondary'>
            Save + Send
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid className={spacingClasses.marginTopL} item container xs={12}>
        <Grid item container direction='column' xs={12} lg={7}>
          <Grid item container spacing={3}>
            <Components
              components={components}
              studioId={studioId}
              openSearchDailog={openSearchDailog}
              setOpenSearchDialog={setOpenSearchDialog}
            />
          </Grid>
        </Grid>
        <Grid item container direction='column' xs={12} lg={5}>
          <Grid item container spacing={3}>
            <Grid item xs={12} className={componentClasses.commentBtnCtr}>
              <Tooltip
                title='Search for components if the work order is related to components in another location'
                placement='bottom'>
                <Button
                  className={componentClasses.btnWidth}
                  onClick={handleOpenSearchDialog}
                  variant='contained'
                  color='secondary'>
                  Search components
                </Button>
              </Tooltip>
              <Hidden smUp>
                <Typography
                  className={spacingClasses.paddingTopS}
                  variant='subtitle2'
                  align='center'
                  color='textPrimary'>
                  Search for components if the work order is related to
                  components in another location
                </Typography>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MaintenanceProcedureDialog
        open={openPmDialog}
        name={workOrder.maintenance_procedure_name || 'Maintenance procedure'}
        setOpenPmDialog={setOpenPmDialog}
        procedure={workOrder.maintenance_procedures}
      />
    </div>
  );
};

RequestDetails.propTypes = {
  workOrder: PropTypes.object.isRequired,
  components: PropTypes.array.isRequired,
  sendCommentToRequestor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  spaceInfo: state.workOrder.currentSpaceInfo,
});

export default connect(mapStateToProps, { sendCommentToRequestor })(
  RequestDetails
);
