import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const ComponentButtons = ({
  components,
  classes,
  handleOpenComponentDialog,
  setOpenDeleteAlert,
  setDeleteComponent,
}) => {
  return _.map(components, (component) => {
    return (
      <Grid key={component.instanceId}>
        <ButtonGroup
          className={classes.buttonGroup}
          color='primary'
          variant='contained'
          aria-label='split button'>
          <Button
            onClick={() => handleOpenComponentDialog(component)}
            style={{ minWidth: '200px', justifyContent: 'left' }}>
            {component.name}
            {component.instance_name && ` -  ${component.instance_name}`}
          </Button>
          <Button
            onClick={() => {
              setDeleteComponent(component.instanceId);
              setOpenDeleteAlert(true);
            }}
            size='small'>
            <ClearIcon fontSize='small' />
          </Button>
        </ButtonGroup>
      </Grid>
    );
  });
};

ComponentButtons.propTypes = {
  components: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handleOpenComponentDialog: PropTypes.func.isRequired,
};

export default ComponentButtons;
