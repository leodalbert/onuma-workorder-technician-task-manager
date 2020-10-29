import React, { Fragment } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
} from '@material-ui/core';

const ConfirmSaveDialog = ({
  openAlert,
  setOpenAlert,
  handleSave,
  title,
  content,
  confirmBtn,
  declineBtn,
}) => {
  return (
    <Fragment>
      <Dialog
        open={openAlert}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle style={{ paddingBottom: 0 }} id='alert-dialog-title'>
          {title}
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <Typography>{content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => setOpenAlert(false)}
            color='primary'>
            {declineBtn}
          </Button>
          <Button
            variant='contained'
            onClick={() => handleSave()}
            color='secondary'
            autoFocus>
            {confirmBtn}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConfirmSaveDialog;
