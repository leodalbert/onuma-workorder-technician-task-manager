import React, { forwardRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  DialogContent,
  Dialog,
  Grid,
  Container,
  Slide,
  TextField,
  Button,
  ButtonGroup,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Header from '../layout/Header';
import QrReader from './QrReader';
import ComponentSearchDialogResults from './ComponentSearchDialogResults';
import ComponentDetailDialog from './ComponentDetailDialog';
import {
  searchComponents,
  clearComponentDialog,
  fillComponentDialog,
  addComponent,
  clearSearchState,
} from '../../actions/component';
import { layoutStyles } from '../../styles/styles';

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
  setOpenQrReader,
  openQrReader,
  workOrder: { id: workOrderId, building, floor, space },
}) => {
  const layoutClasses = layoutStyles();

  const [searchField, setSearchField] = useState('');
  const [openDetailDailog, setOpenDetailDialog] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 750);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 750);
  };
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const handleSearch = () => {
    setHasSearched(true);
    searchComponents(searchField, building.id, studioId);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleOpenComponentDialog = (component) => {
    fillComponentDialog(component.component);
    setOpenDetailDialog(true);
  };

  const handleCloseComponentDialog = () => {
    setHasSearched(false);
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
  const handleScan = (data) => {
    if (!!data) {
      setHasSearched(true);
      setOpenQrReader(false);
      setSearchField(data);
      searchComponents(data, building.id, studioId);
    }
  };

  const headerLocation = [
    `${building.number} ${(building.number || building.name) && '- '}${
      building.name
    }`,
    <br key='1' />,
    space && space.number && space.number,
    ' ',
    space && space.number && space.name && '- ',
    space && space.name && space.name,
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
        isMobile={!isDesktop}
      />
      <DialogContent>
        <Grid container spacing={3}>
          <Grid className={layoutClasses.searchDialogTextFieldCtr} item xs={12}>
            <Typography className={layoutClasses.searchDialogTextFieldtitle}>
              Component Search:
            </Typography>

            <TextField
              className={layoutClasses.searchDialogTextField}
              id='component_serach_field'
              onChange={(e) => setSearchField(e.target.value)}
              value={searchField}
              onKeyDown={handleKeyDown}
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
                    <Button onClick={() => setOpenQrReader(!openQrReader)}>
                      <i className='fas fa-qrcode'></i>
                    </Button>
                  </ButtonGroup>
                ),
              }}
            />
            {loading && (
              <LinearProgress
                style={{ marginTop: '5px' }}
                className={layoutClasses.searchDialogTextField}
                color='secondary'
              />
            )}
          </Grid>
          {openQrReader && (
            <Grid item xs={12}>
              <Container disableGutters maxWidth='sm'>
                <QrReader handleScan={handleScan} />
              </Container>
            </Grid>
          )}

          <Grid
            className={layoutClasses.searchDialogTextFieldCtr}
            container
            item
            xs={12}>
            {!loading && hasSearched && searchResults.length < 1 ? (
              <Grid style={{ textAlign: 'center' }} item xs={12}>
                <Typography style={{ paddingTop: '20px' }}>
                  No search results found...
                </Typography>
              </Grid>
            ) : (
              <ComponentSearchDialogResults
                searchResults={searchResults}
                handleOpenComponentDialog={handleOpenComponentDialog}
                handleSelectComponent={handleSelectComponent}
              />
            )}
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
  setOpenQrReader: PropTypes.func.isRequired,
  openQrReader: PropTypes.bool.isRequired,
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
