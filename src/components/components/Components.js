import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Grid,
  MenuItem,
  Select,
  FormControl,
  Button,
  Tooltip,
  Hidden,
  Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ComponentDetailDialog from './ComponentDetailDialog';
import ComponentSearchDialog from './ComponentSearchDialog';
import ConfirmDialog from '../tasks/ConfirmDialog';
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
  loading,
  studioId,
}) => {
  const classes = requestDetailsGridStyles();
  // get details for every component in workorder
  useEffect(() => {
    workOrderComponentIds.map((component) =>
      getWorkOrderComponentDetails(component.component, component.id, studioId)
    );
    // eslint-disable-next-line
  }, [getWorkOrderComponentDetails, studioId]);
  // remove components in workorder from component select
  useEffect(() => {
    setFilteredComponents(filterComponents(components, workOrderComponentIds));
  }, [components, workOrderComponentIds]);

  const [openDetailDailog, setOpenDetailDialog] = useState(false);
  const [openSearchDailog, setOpenSearchDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [deleteComponent, setDeleteComponent] = useState('');
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [openQrReader, setOpenQrReader] = useState(false);

  const handleOpenComponentDialog = (component) => {
    fillComponentDialog(component);
    setOpenDetailDialog(true);
  };

  const handleCloseComponentDialog = () => {
    setOpenDetailDialog(false);
    clearComponentDialog();
  };
  const handleOpenSearchDialog = () => {
    // fillComponentDialog(component);
    setOpenSearchDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setOpenSearchDialog(false);
    setOpenQrReader(false);
  };

  const handleChange = (
    { id: componentId, name, instance_name },
    workOrderId
  ) => {
    addComponent(componentId, workOrderId, studioId);
    // addComponentButton()
  };

  return (
    <Fragment>
      <Grid
        className={clsx(classes.lableGrid, classes.marginTop)}
        item
        xs={12}
        sm={4}
        lg={5}>
        <div justify='center' className={classes.lable}>
          Components:
        </div>
      </Grid>
      <Grid
        className={clsx(classes.detailGrid, classes.marginTop)}
        item
        xs={12}
        sm={8}
        lg={7}>
        <Grid>
          {workOrderComponents && (
            <ComponentButtons
              handleOpenComponentDialog={handleOpenComponentDialog}
              components={workOrderComponents}
              classes={classes}
              setOpenDeleteAlert={setOpenDeleteAlert}
              setDeleteComponent={setDeleteComponent}
            />
          )}
          {loading && (
            <div className={classes.spinnerDiv}>
              <CircularProgress className={classes.spinner} />
            </div>
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
              inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value='' disabled>
                Add component from current space
              </MenuItem>
              {_.map(
                filteredComponents,
                ({ component: { id, name, instance_name } }) => {
                  return (
                    <MenuItem key={id} value={{ id, name, instance_name }}>
                      {name}
                      {instance_name && ` - ${instance_name}`}
                    </MenuItem>
                  );
                }
              )}
            </Select>
            <Tooltip
              title='Search for components if the work order is related to components in another location'
              placement='bottom'>
              <Button
                onClick={handleOpenSearchDialog}
                className={classes.searchButton}
                variant='outlined'>
                Search components
              </Button>
            </Tooltip>
            <Hidden smUp>
              <Typography
                style={{ paddingTop: '5px' }}
                variant='subtitle2'
                align='center'
                color='textPrimary'>
                Search for components if the work order is related to components
                in another location
              </Typography>
            </Hidden>
          </FormControl>
        </div>
      </Grid>
      <ComponentDetailDialog
        open={openDetailDailog}
        handleClose={handleCloseComponentDialog}
      />
      <ComponentSearchDialog
        open={openSearchDailog}
        handleClose={handleCloseSearchDialog}
        studioId={studioId}
        openQrReader={openQrReader}
        setOpenQrReader={setOpenQrReader}
      />
      <ConfirmDialog
        openAlert={openDeleteAlert}
        setOpenAlert={setOpenDeleteAlert}
        handleSave={() => {
          setOpenDeleteAlert(false);
          removeComponent(deleteComponent, studioId);
        }}
        title='Remove Component?'
        content='Are you sure you would like to remove component from work order?'
        confirmBtn='Remove'
        declineBtn='Cancel'
      />
    </Fragment>
  );
};

Components.propTypes = {
  workOrderId: PropTypes.number.isRequired,
  workOrderComponentIds: PropTypes.array.isRequired,
  workOrderComponents: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  getWorkOrderComponentDetails: PropTypes.func.isRequired,
  fillComponentDialog: PropTypes.func.isRequired,
  clearComponentDialog: PropTypes.func.isRequired,
  addComponent: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  studioId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  workOrderId: state.workOrder.current.id,
  workOrderComponentIds: state.workOrder.current.components,
  workOrderComponents: state.component.workOrderComponents,
  loading: state.component.componentLoading,
});

export default connect(mapStateToProps, {
  getWorkOrderComponentDetails,
  clearComponentDialog,
  fillComponentDialog,
  addComponent,
  removeComponent,
})(Components);
