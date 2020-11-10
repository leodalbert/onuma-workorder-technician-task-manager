import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import { layoutStyles } from '../../styles/styles';

const ComponentDetailDialogGrid = ({ fields }) => {
  const layoutClasses = layoutStyles();
  return (
    <Grid item container spacing={2}>
      {_.map(fields, ({ lable, detail }, index) => {
        return (
          <Fragment key={index}>
            <Grid className={layoutClasses.labelCtr} item xs={4}>
              <Typography className={layoutClasses.labelStyle}>
                {lable}
              </Typography>
            </Grid>
            <Grid className={layoutClasses.detailCtr} item xs={8}>
              <Typography
                style={{ whiteSpace: 'pre-line' }}
                className={layoutClasses.detailStyle}>
                {detail}
              </Typography>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

ComponentDetailDialogGrid.propTypes = {
  fields: PropTypes.array.isRequired,
};

export default ComponentDetailDialogGrid;
