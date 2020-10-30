import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';

const AddCollaboratorDialog = ({
  techs,
  collaborators,
  currentTechId,
  open,
  setCollaboratorDialog,
  handleAdd,
}) => {
  const [selectedTechId, setSelectedTechId] = useState(null);

  return (
    <Dialog
      onClose={() => setCollaboratorDialog(false)}
      maxWidth='xs'
      aria-labelledby='collaborator-dialog-title'
      open={open}>
      <DialogTitle id='collaborator-dialog-title'>
        Add collaborator to workorder
      </DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          aria-label='selected-tech'
          name='tech'
          value={Number(selectedTechId)}
          onChange={(e) => setSelectedTechId(e.target.value)}>
          {techs
            .filter((tech) => {
              return !collaborators.some((collaborator) => {
                return (
                  tech.id === collaborator.collaborator ||
                  tech.id === currentTechId
                );
              });
            })
            .map((tech) => (
              <FormControlLabel
                value={Number(tech.id)}
                key={tech.id}
                control={<Radio color='default' />}
                label={`${tech.first_name} ${tech.last_name} (${tech.email})`}
              />
            ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={() => setCollaboratorDialog(false)}
          color='secondary'>
          Cancel
        </Button>
        <Button
          disabled={!selectedTechId}
          variant='contained'
          autoFocus
          onClick={() => handleAdd(selectedTechId)}
          color='secondary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddCollaboratorDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  techs: PropTypes.array.isRequired,
  collaborators: PropTypes.array.isRequired,
  currentTechId: PropTypes.number,
  setCollaboratorDialog: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

export default AddCollaboratorDialog;
