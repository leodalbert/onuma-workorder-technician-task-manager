import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, List, ListItem, Typography, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import { TechEmail } from '../../utils/helpers';

const AssignedTo = ({
  classes,
  name,
  email,
  room,
  building,
  techs,
  collaborators,
}) => {
  return (
    <Fragment>
      <Grid className={classes.lableGrid} item xs={12} sm={3}>
        <div className={classes.lable}>Assigned To:</div>
      </Grid>
      <Grid className={classes.detailGrid} item xs={12} sm={6}>
        <div className={classes.detail}>
          {TechEmail(name, email, room, building)}
        </div>
        {collaborators.length > 0 && !_.isEmpty(techs) && (
          <div style={{ paddingLeft: '25px' }}>
            <Typography variant='subtitle2'>Other collaborators:</Typography>
            <List dense style={{ paddingTop: 0 }}>
              {collaborators.map((collaborator) => {
                let tech = techs.filter((tech) => tech.id === collaborator.id);
                return (
                  <ListItem key={tech[0].id}>
                    {TechEmail(
                      `${tech[0].first_name} ${tech[0].last_name}`,
                      tech[0].email,
                      room,
                      building
                    )}
                    <Button variant='text' size='small'>
                      <ClearIcon fontSize='small' />
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          </div>
        )}
      </Grid>
      <Grid className={classes.detailGrid} item xs={12} sm={3}>
        <Button className={classes.forwardBtn} variant='outlined'>
          Add collaborator
        </Button>
      </Grid>
    </Fragment>
  );
};

AssignedTo.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  room: PropTypes.string,
  building: PropTypes.string,
  techs: PropTypes.array.isRequired,
  collaborators: PropTypes.array,
};

export default AssignedTo;
