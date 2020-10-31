import React, { Fragment } from 'react';
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
          <div className={classes.lable}>{lable}</div>
        </Grid>
        <Grid className={classes.detailGrid} item xs={12} sm={8} lg={7}>
          <div className={detailColor ? classes[detailColor] : classes.detail}>
            {detail}
          </div>
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
          <div className={classes.lable}>{lable}</div>
        </Grid>
        <Grid className={classes.detailGrid} item xs={12} sm={8} lg={7}>
          <div className={detailColor ? classes[detailColor] : classes.detail}>
            {detail}
          </div>
        </Grid>
      </Fragment>
    );
  });
};

RequestDetailGrid2.propTypes = {
  workOrder: PropTypes.object.isRequired,
};
