import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid, MenuItem, Select, FormControl, Button } from '@material-ui/core';
import ComponentDetailDialog from './ComponentDetailDialog';
import ComponentButtons from './ComponentButtons';
import {
  getWorkOrderComponentDetails,
  clearComponentDialog,
  fillComponentDialog,
  addComponent,
  removeComponent,
} from '../../actions/component';
import { filterComponents } from '../../utils/helpers';
import { requestDetailsGridStyles } from '../../styles/GridStyles';

const Components = ({
  components,
  workOrderComponentIds,
  getWorkOrderComponentDetails,
  workOrderComponents,
  fillComponentDialog,
  clearComponentDialog,
  addComponent,
  removeComponent,
  workOrderId,
}) => {
  const classes = requestDetailsGridStyles();

  useEffect(() => {
    workOrderComponentIds.map((component) =>
      getWorkOrderComponentDetails(component.component, component.id)
    );
  }, []);
  useEffect(() => {
    setFilteredComponents(filterComponents(components, workOrderComponentIds));
  }, [components, workOrderComponentIds]);

  const [openDetailDailog, setOpenDetailDialog] = useState(false);
  const [filteredComponents, setFilteredComponents] = useState([]);

  const handleOpenComponentDialog = (component) => {
    fillComponentDialog(component);
    setOpenDetailDialog(true);
  };

  const handleCloseComponentDialog = () => {
    setOpenDetailDialog(false);
    clearComponentDialog();
  };
  const handleChange = (componentId, workOrderId) => {
    addComponent(componentId, workOrderId);
  };

  return (
    <Fragment>
      <Grid
        className={clsx(classes.lableGrid, classes.marginTop)}
        item
        xs={12}
        sm={4}
        lg={5}
      >
        <div justify='center' className={classes.lable}>
          Components:
        </div>
      </Grid>
      <Grid
        className={clsx(classes.detailGrid, classes.marginTop)}
        item
        xs={12}
        sm={8}
        lg={7}
      >
        <Grid>
          {workOrderComponents && (
            <ComponentButtons
              handleOpenComponentDialog={handleOpenComponentDialog}
              components={workOrderComponents}
              removeComponent={removeComponent}
              classes={classes}
            />
          )}
        </Grid>
        <div className={classes.detail}>
          <FormControl className={classes.formControl}>
            <Select
              value={''}
              variant='outlined'
              onChange={(e) => {
                handleChange(e.target.value, workOrderId);
              }}
              displayEmpty
              className={classes.selectLable}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value='' disabled>
                Add component from current space
              </MenuItem>
              {_.map(
                filteredComponents,
                ({ component: { id, name, instance_name } }) => {
                  return (
                    <MenuItem key={id} value={id}>
                      {name}
                      {instance_name && ` - ${instance_name}`}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>
        </div>
      </Grid>
      <ComponentDetailDialog
        open={openDetailDailog}
        handleClose={handleCloseComponentDialog}
      />
    </Fragment>
  );
};

Components.propTypes = {};

const mapStateToProps = (state) => ({
  workOrderId: state.workOrder.current.id,
  workOrderComponentIds: state.workOrder.current.components,
  workOrderComponents: state.component.workOrderComponents,
});

export default connect(mapStateToProps, {
  getWorkOrderComponentDetails,
  clearComponentDialog,
  fillComponentDialog,
  addComponent,
  removeComponent,
})(Components);
