import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const ComponentButtons = ({
  components,
  classes,
  handleOpenComponentDialog,
}) => {
  return _.map(components, (component) => {
    return (
      <ButtonGroup
        className={classes.buttonGroup}
        key={component.id}
        color='primary'
        variant='contained'
        aria-label='split button'
      >
        <Button
          onClick={() => handleOpenComponentDialog(component)}
          style={{ minWidth: '200px', justifyContent: 'left' }}
        >
          {component.name}
        </Button>
        <Button size='small'>
          <ClearIcon fontSize='small' />
        </Button>
      </ButtonGroup>
    );
  });
};

ComponentButtons.propTypes = {
  components: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handleOpenComponentDialog: PropTypes.func.isRequired,
};

export default ComponentButtons;
