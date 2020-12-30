import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';

import { layoutStyles, spacingStyles } from '../../styles/styles';

const WorkOrderStatus = ({
  workOrderStatus,
  setWorkOrderStatus,
  currentTechId,
  workOrderTech,
}) => {
  const layoutClasses = layoutStyles();
  const spacingClasses = spacingStyles();
  return (
    <Fragment>
      <Grid className={layoutClasses.labelCtr} item xs={12} sm={3}>
        <Typography
          variant='subtitle1'
          className={clsx(
            layoutClasses.labelStyle,
            spacingClasses.paddingTopS
          )}>
          Work order status:
        </Typography>
      </Grid>
      <Grid className={layoutClasses.detailCtr} item xs={12} sm={9}>
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
            {workOrderTech === currentTechId && (
              <FormControlLabel
                value='Completed'
                control={<Radio color='default' />}
                label='Completed'
              />
            )}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Fragment>
  );
};

WorkOrderStatus.propTypes = {
  workOrderStatus: PropTypes.string.isRequired,
  setWorkOrderStatus: PropTypes.func.isRequired,
  workOrderTech: PropTypes.number,
  currentTechId: PropTypes.number,
};

export default WorkOrderStatus;
