import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Grid } from '@material-ui/core';

import { componentStyles } from '../../styles/styles';

const ComponentSearchButtons = ({
  components,
  spaceId,
  handleOpenComponentDialog,
  handleSelectComponent,
}) => {
  const componentClasses = componentStyles();
  return _.map(components, (component) => {
    if (component.component.space[0].space.number === spaceId) {
      return (
        <Grid key={component.id}>
          <ButtonGroup
            className={componentClasses.btnGroupComponentSearch}
            color='primary'
            variant='contained'
            aria-label='split button'>
            <Button
              onClick={() => handleSelectComponent(component.component.id)}
              style={{ minWidth: '200px', justifyContent: 'left' }}>
              {component.component.name}
              {component.component.instance_name &&
                ` -  ${component.component.instance_name}`}
            </Button>
            <Button
              onClick={() => handleOpenComponentDialog(component)}
              size='small'>
              Details
            </Button>
          </ButtonGroup>
        </Grid>
      );
    }
  });
};

ComponentSearchButtons.propTypes = {
  components: PropTypes.array.isRequired,
  handleOpenComponentDialog: PropTypes.func.isRequired,
  spaceId: PropTypes.string.isRequired,
  handleSelectComponent: PropTypes.func.isRequired,
};

export default ComponentSearchButtons;
