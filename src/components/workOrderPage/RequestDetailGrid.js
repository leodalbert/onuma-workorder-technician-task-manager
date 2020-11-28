import React, { Fragment } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { layoutStyles } from '../../styles/styles';
import {
  workOrderRequestFieldGen,
  workOrderCommentFieldGen,
  workOrderLocationFieldGen,
} from '../../utils/helpers';

export const RequestNumberGrid = ({ workOrder }) => {
  const layoutClasses = layoutStyles();

  const FIELDS = workOrderRequestFieldGen(workOrder);

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

RequestNumberGrid.propTypes = {
  workOrder: PropTypes.object.isRequired,
};
export const RequestCommentGrid = ({ workOrder }) => {
  const layoutClasses = layoutStyles();

  const FIELDS = workOrderCommentFieldGen(workOrder);

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

RequestCommentGrid.propTypes = {
  workOrder: PropTypes.object.isRequired,
};

export const RequestLocationGrid = ({ workOrder }) => {
  const layoutClasses = layoutStyles();

  const FIELDS = workOrderLocationFieldGen(workOrder);

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

RequestLocationGrid.propTypes = {
  workOrder: PropTypes.object.isRequired,
};
export const RequestPmGrid = ({ workOrder, setOpenPmDialog }) => {
  const layoutClasses = layoutStyles();

  return (
    <Fragment>
      {workOrder.preventive_maintenance_description && (
        <Fragment>
          <Grid className={layoutClasses.labelCtr} item xs={12} sm={4} lg={5}>
            <Typography
              variant='subtitle1'
              className={layoutClasses.labelStyle}>
              PM description
            </Typography>
          </Grid>
          <Grid className={layoutClasses.detailCtr} item xs={12} sm={8} lg={7}>
            <Typography variant='body1' className={layoutClasses.detailStyle}>
              {workOrder.preventive_maintenance_description}
            </Typography>
          </Grid>
        </Fragment>
      )}
      {workOrder.maintenance_procedures.length > 0 && (
        <Fragment>
          <Grid className={layoutClasses.labelCtr} item xs={12} sm={4} lg={5}>
            <Typography
              variant='subtitle1'
              className={layoutClasses.labelStyle}>
              Maintenance procedure:
            </Typography>
          </Grid>
          <Grid className={layoutClasses.detailCtr} item xs={12} sm={8} lg={7}>
            <Button
              size='small'
              style={{
                justifyContent: 'left',
                textTransform: 'none',
              }}
              onClick={() => setOpenPmDialog(true)}
              fullWidth
              variant='contained'
              color='primary'>
              <Typography variant='body1'>
                {workOrder.maintenance_procedure_name ||
                  'Maintenance procedure'}
              </Typography>
            </Button>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

RequestPmGrid.propTypes = {
  workOrder: PropTypes.object.isRequired,
  setOpenPmDialog: PropTypes.func.isRequired,
};
