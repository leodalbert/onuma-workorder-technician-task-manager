import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import { componentDetailGridStyles } from '../../styles/DialogStyles';

const ComponentDetailDialogGrid = ({ fields }) => {
  const classes = componentDetailGridStyles();
  return (
    <Grid item container spacing={2}>
      {_.map(fields, ({ lable, detail }) => {
        return (
          <Fragment key={lable}>
            <Grid className={classes.lableGrid} item xs={4}>
              <div className={classes.lable}>{lable}</div>
            </Grid>
            <Grid className={classes.detailGrid} item xs={8}>
              <div
                style={{ whiteSpace: 'pre-line' }}
                className={classes.detail}
              >
                {detail}
              </div>
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
