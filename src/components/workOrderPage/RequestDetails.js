import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, TextField, Button, Divider, Hidden } from '@material-ui/core';

import { RequestDetailGrid1, RequestDetailGrid2 } from './RequestDetailGrid';
import Components from '../components/Components';
import { sendCommentToRequestor } from '../../actions/workOrder';
import { requestDetailsGridStyles } from '../../styles/GridStyles';
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
  const classes = requestDetailsGridStyles();
  const [comment, setComment] = useState(workOrder.administrator_comment);
  return (
    <div className={classes.root}>
      <Grid item container xs={12}>
        <Grid item container direction='column' xs={12} lg={7}>
          <Grid item container spacing={3}>
            <RequestDetailGrid1 workOrder={workOrder} />
            <Hidden mdDown>
              <RequestDetailGrid2 workOrder={workOrder} />
            </Hidden>
          </Grid>
        </Grid>
        <Grid item container direction='column' justify='center' xs={12} lg={5}>
          {inDev() ? (
            <Grid item>
              <div className={classes.floorPlan}>
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
              <div className={classes.floorPlan}>
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
              <RequestDetailGrid2 workOrder={workOrder} />
            </Grid>
          </Grid>
        </Hidden>

        <Grid className={classes.commentField} item xs={12}>
          <TextField
            className={classes.commentFieldStyle}
            id='commentField'
            label='Comments To Requester'
            multiline
            fullWidth
            rows={4}
            variant='outlined'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            FormHelperTextProps={{
              className: classes.helperText,
            }}
            helperText={
              comment !== workOrder.administrator_comment &&
              'Click "Save + Send" to email your comment to requester'
            }
          />
        </Grid>
        <Grid className={classes.commentButton} item xs={12}>
          <Button
            onClick={() =>
              sendCommentToRequestor(comment, studioId, workOrder.id)
            }
            disabled={comment === workOrder.administrator_comment}
            variant='contained'
            color='secondary'>
            Save + Send
          </Button>
        </Grid>
      </Grid>
      <Divider style={{ marginBottom: '15px' }} />
      <Grid item container direction='column' xs={12} lg={7}>
        <Grid item container spacing={3}>
          <Components components={components} studioId={studioId} />
        </Grid>
      </Grid>
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
