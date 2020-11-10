import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { componentStyles } from '../../styles/styles';

const ComponentButtons = ({
  components,
  handleOpenComponentDialog,
  setOpenDeleteAlert,
  setDeleteComponent,
}) => {
  const componentClasses = componentStyles();
  return _.map(components, (component) => {
    return (
      <Grid key={component.instanceId}>
        <ButtonGroup
          fullWidth
          className={componentClasses.btnGroup}
          color='primary'
          variant='contained'
          aria-label='split button'>
          <Button
            style={{ justifyContent: 'left' }}
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
  handleOpenComponentDialog: PropTypes.func.isRequired,
};

export default ComponentButtons;
