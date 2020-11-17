import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Button,
  Collapse,
  FormControl,
  TextField,
} from '@material-ui/core';
import { spacingStyles, componentStyles } from '../../styles/styles';

import { setStatus } from '../../actions/status';

const ConfirmCompleted = ({ setStatus, studioId, workorderId }) => {
  const spacingClasses = spacingStyles();
  const componentClasses = componentStyles();

  const [declineText, setDeclineText] = useState('');
  const [showDeclineText, setShowDeclineText] = useState(false);

  const handleDecline = () => {
    if (showDeclineText) {
      setStatus(
        workorderId,
        { completion_description: declineText, status: 'Completion Declined' },
        studioId
      );
    }
    setShowDeclineText(!showDeclineText);
  };

  const handleConfirm = () => {
    setStatus(workorderId, { status: 'Completion Confirmed' }, studioId);
  };

  return (
    <Grid item container spacing={3} className={spacingClasses.paddingBottomL}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant='subtitle1' style={{ fontSize: '120%' }}>
          Please confirm if the work order has been completed
        </Typography>
        <Collapse in={showDeclineText}>
          <FormControl className={componentClasses.declineTextFormCtrl}>
            <TextField
              value={declineText}
              id='location-description'
              label='Why is the confirmation being declined?'
              name='location_description'
              multiline
              rows={4}
              variant='outlined'
              onChange={(e) => setDeclineText(e.target.value)}
            />
          </FormControl>
        </Collapse>
        <Grid item className={spacingClasses.paddings}>
          <Button
            disabled={showDeclineText && !declineText}
            onClick={handleDecline}
            className={componentClasses.btnCompletion}
            style={
              showDeclineText
                ? { backgroundColor: '#fdd835' }
                : { backgroundColor: '#d3e6df' }
            }
            variant='contained'>
            {!showDeclineText ? 'Decline' : 'Submit'}
          </Button>
          <Button
            // disabled={showDeclineText}
            onClick={handleConfirm}
            className={componentClasses.btnCompletion}
            color='secondary'
            variant='contained'>
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

ConfirmCompleted.propTypes = {
  setStatus: PropTypes.func.isRequired,
  studioId: PropTypes.number,
  workorderId: PropTypes.number,
};

export default connect(null, { setStatus })(ConfirmCompleted);
