import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import {
  DialogTitle,
  DialogContent,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { layoutStyles, componentStyles } from '../../styles/styles';

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const MaintenanceProcedureDialog = ({
  open,
  setOpenPmDialog,
  procedure,
  name,
}) => {
  const layoutClasses = layoutStyles();
  const componentClasses = componentStyles();
  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      aria-labelledby='component-dialog-title'
      open={open}>
      <DialogTitle id='component-dialog-title'>
        {name}
        <IconButton
          aria-label='close'
          className={componentClasses.btnClose}
          onClick={() => setOpenPmDialog(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        style={{ padding: 0 }}
        dividers
        classes={{ dividers: layoutClasses.dialogContentDivider }}>
        <TableContainer>
          <Table aria-label='PmTable'>
            <TableBody>
              {procedure.map((procedure, index) => (
                <StyledTableRow key={index}>
                  <TableCell
                    style={{ padding: '12px 10px' }}
                    component='th'
                    scope='row'>
                    {procedure.description}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

MaintenanceProcedureDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpenPmDialog: PropTypes.func.isRequired,
  procedure: PropTypes.array,
  name: PropTypes.string,
};

export default MaintenanceProcedureDialog;
