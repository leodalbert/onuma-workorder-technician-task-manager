import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, List, ListItem, Typography, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import AddCollaboratorDialog from './AddCollaboratorDialog';
import { TechEmail } from '../../utils/helpers';

const AssignedTo = ({
  classes,
  name,
  email,
  room,
  building,
  techs,
  collaborators,
  removeCollaborator,
  handleAddCollaborator,
  studioId,
  currentTechId,
  workOrderId,
  workOrderTechId,
}) => {
  const [collaboratorDialog, setCollaboratorDialog] = useState(false);
  const handleAdd = (selectedTechId) => {
    setCollaboratorDialog(false);
    handleAddCollaborator(selectedTechId);
  };
  return (
    <Fragment>
      <Grid className={classes.lableGrid} item xs={12} sm={3}>
        <Typography variant='subtitle1' className={classes.lable}>
          Assigned To:
        </Typography>
      </Grid>
      <Grid className={classes.detailGrid} item xs={12} sm={4}>
        <Typography variant='body1' className={classes.detail}>
          {TechEmail(name, email, room, building, workOrderId)}
        </Typography>
        {collaborators.length > 0 && !_.isEmpty(techs) && (
          <div style={{ paddingLeft: '25px' }}>
            <Typography variant='subtitle2'>Other collaborators:</Typography>
            <List dense style={{ paddingTop: 0 }}>
              {collaborators.map((collaborator) => {
                let tech = techs.filter(
                  (tech) => tech.id === collaborator.collaborator
                );
                return (
                  <ListItem key={tech[0].id}>
                    {TechEmail(
                      `${tech[0].first_name} ${tech[0].last_name}`,
                      tech[0].email,
                      room,
                      building,
                      workOrderId
                    )}
                    {workOrderTechId === currentTechId && (
                      <Button
                        onClick={() =>
                          removeCollaborator(collaborator.id, studioId)
                        }
                        variant='text'
                        size='small'>
                        <ClearIcon fontSize='small' />
                      </Button>
                    )}
                  </ListItem>
                );
              })}
            </List>
          </div>
        )}
      </Grid>
      <Grid className={classes.buttonDetailGrid} item xs={12} sm={5}>
        <Button
          onClick={() => setCollaboratorDialog(true)}
          className={classes.commentButton}
          style={{ width: '190px' }}
          color='secondary'
          variant='contained'>
          Add collaborator
        </Button>
      </Grid>
      <AddCollaboratorDialog
        techs={techs}
        collaborators={collaborators}
        currentTechId={currentTechId}
        open={collaboratorDialog}
        setCollaboratorDialog={setCollaboratorDialog}
        handleAdd={handleAdd}
        classes={classes}
      />
    </Fragment>
  );
};

AssignedTo.propTypes = {
  workOrderTechId: PropTypes.number,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  room: PropTypes.string,
  building: PropTypes.string,
  techs: PropTypes.array.isRequired,
  collaborators: PropTypes.array,
  removeCollaborator: PropTypes.func.isRequired,
  handleAddCollaborator: PropTypes.func.isRequired,
  currentTechId: PropTypes.number,
};

export default AssignedTo;
