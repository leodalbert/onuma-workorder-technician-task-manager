import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

const WorkOrderStatus = ({ classes, workOrderStatus, setWorkOrderStatus }) => {
  return (
    <Fragment>
      <Grid className={classes.lableGrid} item xs={12} sm={3}>
        <div className={classes.lable}>Work Order Status:</div>
      </Grid>
      <Grid className={classes.detailGrid} item xs={12} sm={9}>
        <FormControl component='fieldset'>
          <RadioGroup
            aria-label='workorder-status'
            name='status'
            value={workOrderStatus}
            onChange={(e) => setWorkOrderStatus(e.target.value)}>
            {workOrderStatus === 'Assigned' ? (
              <FormControlLabel
                value='Assigned'
                control={<Radio color='default' />}
                label='Assigned'
              />
            ) : (
              <FormControlLabel
                value='Work In Progress'
                control={<Radio color='default' />}
                label='In Progress'
              />
            )}
            <FormControlLabel
              value='Completed'
              control={<Radio color='default' />}
              label='Completed'
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Fragment>
  );
};

WorkOrderStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  workOrderStatus: PropTypes.string.isRequired,
  setWorkOrderStatus: PropTypes.func.isRequired,
};

export default WorkOrderStatus;
