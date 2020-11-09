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
          fullWidth
          className={classes.buttonGroup}
          color='primary'
          variant='contained'
          aria-label='split button'>
          <Button
            className={classes.textBtn}
            onClick={() => handleOpenComponentDialog(component)}>
            {component.name}
            {component.instance_name && ` -  ${component.instance_name}`}
          </Button>
          <Button
            style={{ width: '36px' }}
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
