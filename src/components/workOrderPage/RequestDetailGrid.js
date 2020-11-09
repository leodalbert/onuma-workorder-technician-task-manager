import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';

import { workOrderFieldGen1, workOrderFieldGen2 } from '../../utils/helpers';

import { requestDetailsGridStyles } from '../../styles/GridStyles';

export const RequestDetailGrid1 = ({ workOrder }) => {
  const classes = requestDetailsGridStyles();

  const FIELDS = workOrderFieldGen1(workOrder);

  return _.map(FIELDS, ({ lable, detail, detailColor }) => {
    return (
      <Fragment key={lable}>
        <Grid className={classes.lableGrid} item xs={12} sm={4} lg={5}>
          <Typography variant='subtitle1' className={classes.lable}>
            {lable}
          </Typography>
        </Grid>
        <Grid className={classes.detailGrid} item xs={12} sm={8} lg={7}>
          <Typography
            variant='body1'
            className={detailColor ? classes[detailColor] : classes.detail}>
            {detail}
          </Typography>
        </Grid>
      </Fragment>
    );
  });
};

RequestDetailGrid1.propTypes = {
  workOrder: PropTypes.object.isRequired,
};
export const RequestDetailGrid2 = ({ workOrder }) => {
  const classes = requestDetailsGridStyles();

  const FIELDS = workOrderFieldGen2(workOrder);

  return _.map(FIELDS, ({ lable, detail, detailColor }) => {
    return (
      <Fragment key={lable}>
        <Grid className={classes.lableGrid} item xs={12} sm={4} lg={5}>
          <Typography variant='subtitle1' className={classes.lable}>
            {lable}
          </Typography>
        </Grid>
        <Grid className={classes.detailGrid} item xs={12} sm={8} lg={7}>
          <Typography
            variant='body1'
            className={detailColor ? classes[detailColor] : classes.detail}>
            {detail}
          </Typography>
        </Grid>
      </Fragment>
    );
  });
};

RequestDetailGrid2.propTypes = {
  workOrder: PropTypes.object.isRequired,
};
