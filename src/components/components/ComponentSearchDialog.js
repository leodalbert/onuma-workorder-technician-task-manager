import React, { forwardRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  DialogContent,
  Dialog,
  Grid,
  Slide,
  TextField,
  Button,
  ButtonGroup,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Header from '../layout/Header';
import ComponentSearchDialogResults from './ComponentSearchDialogResults';
import ComponentDetailDialog from './ComponentDetailDialog';
import {
  searchComponents,
  clearComponentDialog,
  fillComponentDialog,
  addComponent,
  clearSearchState,
} from '../../actions/component';
import { componentSearchGridStyles } from '../../styles/DialogStyles';

// TODO handle no result search

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ComponentSearchDialog = ({
  open,
  handleClose,
  searchComponents,
  studioId,
  searchResults,
  loading,
  clearComponentDialog,
  fillComponentDialog,
  addComponent,
  clearSearchState,
  workOrder: { id: workOrderId, building, floor, space },
}) => {
  const classes = componentSearchGridStyles();

  const [searchField, setSearchField] = useState('');
  const [openDetailDailog, setOpenDetailDialog] = useState(false);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 750);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 750);
  };
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const handleSearch = () => {
    searchComponents(searchField, building.id, studioId);
  };

  const handleOpenComponentDialog = (component) => {
    fillComponentDialog(component.component);
    setOpenDetailDialog(true);
  };

  const handleCloseComponentDialog = () => {
    setOpenDetailDialog(false);
    clearComponentDialog();
  };

  const handleSelectComponent = (componentId) => {
    setOpenDetailDialog(false);
    clearComponentDialog();
    addComponent(componentId, workOrderId, studioId);
    setSearchField('');
    handleClose();
    clearSearchState();
  };

  const headerLocation = [
    `${building.number} ${(building.number || building.name) && '- '}${
      building.name
    }`,
    <br key='1' />,
    `${space && space.number && space.number} ${
      space && space.number && space.name && '- '
    }${space && space.name && space.name}`,
  ];

  return (
    <Dialog
      fullScreen
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}>
      <Header
        text={headerLocation}
        dialogHeader={true}
        handleClose={handleClose}
      />
      <DialogContent>
        <Grid container spacing={3}>
          <Grid className={classes.textFieldGrid} item xs={12}>
            <Typography className={classes.textFieldTitle}>
              Component Search:
            </Typography>

            <TextField
              className={classes.textField}
              id='component_serach_field'
              onChange={(e) => setSearchField(e.target.value)}
              value={searchField}
              label={
                isDesktop
                  ? 'Name / Barcode / Manufacturer / Model Number / etc...'
                  : 'Name / Manufacturer / etc...'
              }
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <ButtonGroup
                    variant='outlined'
                    size='large'
                    aria-label='large outlined primary button group'>
                    <Button onClick={handleSearch}>
                      <SearchIcon />
                      {isDesktop && ' Search'}
                    </Button>
                    <Button>
                      <i className='fas fa-qrcode'></i>
                    </Button>
                  </ButtonGroup>
                ),
              }}
            />
            {loading && (
              <LinearProgress
                style={{ marginTop: '5px' }}
                className={classes.textField}
                color='secondary'
              />
            )}
          </Grid>
          <Grid className={classes.textFieldGrid} container item xs={12}>
            <ComponentSearchDialogResults
              searchResults={searchResults}
              handleOpenComponentDialog={handleOpenComponentDialog}
              handleSelectComponent={handleSelectComponent}
            />
          </Grid>
        </Grid>
        <ComponentDetailDialog
          open={openDetailDailog}
          handleClose={handleCloseComponentDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

ComponentSearchDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  searchComponents: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  clearComponentDialog: PropTypes.func.isRequired,
  fillComponentDialog: PropTypes.func.isRequired,
  addComponent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workOrder: state.workOrder.current,
  searchResults: state.component.searchResults,
  loading: state.component.searchLoading,
  clearComponentDialog: PropTypes.func.isRequired,
  fillComponentDialog: PropTypes.func.isRequired,
  clearSearchState: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  searchComponents,
  clearComponentDialog,
  fillComponentDialog,
  addComponent,
  clearSearchState,
})(ComponentSearchDialog);
