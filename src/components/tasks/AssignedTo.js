import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, List, ListItem, Typography, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import AddCollaboratorDialog from './AddCollaboratorDialog';
import { TechEmail } from '../../utils/helpers';

import {
  layoutStyles,
  componentStyles,
  spacingStyles,
} from '../../styles/styles';

const AssignedTo = ({
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
  const layoutClasses = layoutStyles();
  const componentClasses = componentStyles();
  const spacingClasses = spacingStyles();
  const [collaboratorDialog, setCollaboratorDialog] = useState(false);
  const handleAdd = (selectedTechId) => {
    setCollaboratorDialog(false);
    handleAddCollaborator(selectedTechId);
  };
  return (
    <Fragment>
      <Grid className={layoutClasses.labelCtr} item xs={12} sm={3}>
        <Typography variant='subtitle1' className={layoutClasses.labelStyle}>
          Assigned To:
        </Typography>
      </Grid>
      <Grid className={layoutClasses.detailCtr} item xs={12} sm={4}>
        <Typography variant='body1' className={layoutClasses.detailStyle}>
          {TechEmail(name, email, room, building, workOrderId)}
        </Typography>
        {collaborators.length > 0 && !_.isEmpty(techs) && (
          <div style={{ paddingLeft: '25px' }}>
            <Typography variant='subtitle1' style={{ fontWeight: 'bolder' }}>
              Other collaborators:
            </Typography>
            <List dense className={spacingClasses.noPadding}>
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
      <Grid className={componentClasses.commentBtnCtr} item xs={12} sm={5}>
        <Button
          onClick={() => setCollaboratorDialog(true)}
          className={componentClasses.btnWidth}
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
      />
    </Fragment>
  );
};

AssignedTo.propTypes = {
  workOrderTechId: PropTypes.number,
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
