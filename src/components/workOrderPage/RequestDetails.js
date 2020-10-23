import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button, Divider } from '@material-ui/core';

import RequestDetailGrid from './RequestDetailGrid';
import Components from '../components/Components';
import { requestDetailsGridStyles } from '../../styles/GridStyles';
import Floorplan from './Floorplan';
import FloorplanDev from './FloorplanDev';
import { inDev } from '../../utils/helpers';

const RequestDetails = ({ workOrder, components, studioId }) => {
  const classes = requestDetailsGridStyles();
  const [comment, setComment] = useState(workOrder.administrator_comment);
  const {
    building: { id: buildingId, site: siteId },
    floor: { id: floorId },
    space: { id: spaceId },
  } = workOrder;
  return (
    <div className={classes.root}>
      <Grid item container xs={12}>
        <Grid item container direction='column' xs={12} lg={7}>
          <Grid item container spacing={3}>
            <RequestDetailGrid workOrder={workOrder} />
          </Grid>
        </Grid>
        <Grid item container direction='column' justify='center' xs={12} lg={5}>
          <Grid item>
            {inDev() ? (
              <FloorplanDev
                studioId={studioId}
                siteId={siteId}
                buildingId={buildingId}
                floorId={floorId}
                spaceId={spaceId}
              />
            ) : (
              <Floorplan
                studioId={studioId}
                siteId={siteId}
                buildingId={buildingId}
                floorId={floorId}
                spaceId={spaceId}
              />
            )}
          </Grid>
        </Grid>
        <Grid className={classes.commentField} item xs={12}>
          <TextField
            className={classes.commentFieldStyle}
            id='commentField'
            label='Comments To Requestor'
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
              "If you would like the requestor to receive an email with this comment, click 'Send' button."
            }
          />
        </Grid>
        <Grid className={classes.commentButton} item xs={12}>
          <Button
            disabled={comment === workOrder.administrator_comment}
            variant='contained'
            color='secondary'>
            Send
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
};

export default RequestDetails;
