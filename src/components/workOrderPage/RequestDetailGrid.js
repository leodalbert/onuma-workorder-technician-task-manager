import React, { Fragment } from 'react';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { layoutStyles } from '../../styles/styles';
import { workOrderFieldGen1, workOrderFieldGen2 } from '../../utils/helpers';

export const RequestDetailGrid1 = ({ workOrder }) => {
  const layoutClasses = layoutStyles();

  const FIELDS = workOrderFieldGen1(workOrder);

  return _.map(FIELDS, ({ lable, detail, detailColor }) => {
    return (
      <Fragment key={lable}>
        <Grid className={layoutClasses.labelCtr} item xs={12} sm={4} lg={5}>
          <Typography variant='subtitle1' className={layoutClasses.labelStyle}>
            {lable}
          </Typography>
        </Grid>
        <Grid className={layoutClasses.detailCtr} item xs={12} sm={8} lg={7}>
          <Typography
            variant='body1'
            className={
              detailColor
                ? layoutClasses[detailColor]
                : layoutClasses.detailStyle
            }>
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
  const layoutClasses = layoutStyles();

  const FIELDS = workOrderFieldGen2(workOrder);

  return _.map(FIELDS, ({ lable, detail, detailColor }) => {
    return (
      <Fragment key={lable}>
        <Grid className={layoutClasses.labelCtr} item xs={12} sm={4} lg={5}>
          <Typography variant='subtitle1' className={layoutClasses.labelStyle}>
            {lable}
          </Typography>
        </Grid>
        <Grid className={layoutClasses.detailCtr} item xs={12} sm={8} lg={7}>
          <Typography
            variant='body1'
            className={
              detailColor
                ? layoutClasses[detailColor]
                : layoutClasses.detailStyle
            }>
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
