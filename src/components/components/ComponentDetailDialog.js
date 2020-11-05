import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  DialogTitle,
  DialogContent,
  Dialog,
  Grid,
  IconButton,
  Chip,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import ComponentDetailDialogGrid from './ComponentDetailDialogGrid';
import { componentDialogFieldGen } from '../../utils/helpers';
import { componentDetailGridStyles } from '../../styles/DialogStyles';

const ComponentDetailDialog = ({ open, handleClose, component }) => {
  const { name, instance_name, attachments } = component;

  //   helper function to generate dialog fields
  const fields = componentDialogFieldGen(component);

  const classes = componentDetailGridStyles();
  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      onClose={handleClose}
      aria-labelledby='component-dialog-title'
      open={open}>
      <DialogTitle id='component-dialog-title'>
        {name} - {instance_name}
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers classes={{ dividers: classes.dialogContent }}>
        <Grid item container direction='column' xs={12}>
          <ComponentDetailDialogGrid fields={fields} />
        </Grid>
        {attachments.map((a) => {
          return a.type === 'img' ? (
            <Grid
              style={{ textAlign: 'center' }}
              key={a.url}
              item
              container
              direction='column'
              xs={12}>
              <a
                style={{ paddingTop: '12px' }}
                href={a.url}
                target='_blank'
                rel='noopener noreferrer'>
                <img src={a.thumbnail} alt='thumbnail' />
              </a>
            </Grid>
          ) : (
            <Grid key={a.url} item container direction='column' xs={12}>
              <Grid item container spacing={2}>
                <Grid className={classes.lableGrid} item xs={4}>
                  <div style={{ paddingTop: '10px' }} className={classes.lable}>
                    File
                  </div>
                </Grid>
                <Grid className={classes.detailGrid} item xs={8}>
                  <div
                    style={{ whiteSpace: 'pre-line' }}
                    className={classes.detail}>
                    <Chip
                      label={a.text}
                      component='a'
                      href={a.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      clickable
                      // variant='outlined'
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
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

// <a
//   href='https://system.onuma.com/26/documents/download.load/1522'
//   target='_blank'
//   rel='noopener noreferrer'>
//   <img
//     src='https://system.onuma.com/26/documents/thumbnail.load/1522'
//     alt='thumbnail'
//   />
// </a>;
