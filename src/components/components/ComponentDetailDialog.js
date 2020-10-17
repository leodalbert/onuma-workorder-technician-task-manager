import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import ComponentDetailDialogGrid from './ComponentDetailDialogGrid';
import { componentDialogFieldGen } from '../../utils/helpers';
import { componentDetailGridStyles } from '../../styles/DialogStyles';

const ComponentDetailDialog = ({ open, handleClose, component }) => {
  const { id, name, instance_name } = component;

  //   helper function to generate dialog fields
  const fields = componentDialogFieldGen(component);

  const classes = componentDetailGridStyles();
  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      onClose={handleClose}
      aria-labelledby='component-dialog-title'
      open={open}
    >
      <DialogTitle id='component-dialog-title'>
        {name} - {instance_name}
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers classes={{ dividers: classes.dialogContent }}>
        <Grid item container direction='column' xs={12}>
          <ComponentDetailDialogGrid fields={fields} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

ComponentDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  component: PropTypes.object,
};

const mapStateToProps = (state) => ({
  component: state.component.dialogComponent,
});

export default connect(mapStateToProps)(ComponentDetailDialog);
