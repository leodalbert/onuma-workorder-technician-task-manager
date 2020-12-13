import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Collapse,
  FormControl,
  TextField,
} from '@material-ui/core';

import { layoutStyles, spacingStyles } from '../../styles/styles';
import { insertBreak } from '../../utils/helpers';

const RequestDescription = ({
  workorder: { request_description },
  edit,
  newDescription,
  setNewDescription,
}) => {
  const layoutClasses = layoutStyles();
  const spacingClasses = spacingStyles();
  return (
    <Fragment>
      <Grid className={layoutClasses.labelCtr} item xs={12} sm={4} lg={5}>
        <Typography variant='subtitle1' className={layoutClasses.labelStyle}>
          Request description:
        </Typography>
      </Grid>
      <Grid className={layoutClasses.detailCtr} item xs={12} sm={8} lg={7}>
        <Typography variant='body1' className={layoutClasses.detailStyle}>
          {request_description &&
            insertBreak(request_description.split('\r\n'))}
        </Typography>
        <Collapse in={edit}>
          <FormControl fullWidth className={spacingClasses.paddingTopS}>
            <TextField
              value={newDescription}
              id='location-description'
              label='Add description'
              name='location_description'
              multiline
              rows={4}
              variant='outlined'
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </FormControl>
        </Collapse>
      </Grid>
    </Fragment>
  );
};

RequestDescription.propTypes = {
  edit: PropTypes.bool.isRequired,
  workorder: PropTypes.object,
  newDescription: PropTypes.string.isRequired,
  setNewDescription: PropTypes.func.isRequired,
};

export default RequestDescription;
