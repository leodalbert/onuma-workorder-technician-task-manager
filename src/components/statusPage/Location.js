import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';

import { layoutStyles } from '../../styles/styles';
import { locationFieldGen } from '../../utils/helpers';

const Location = ({
  workorder: { floor, building, space, location_description },
  workorder,
  edit,
}) => {
  const layoutClasses = layoutStyles();
  const spaceDetails = locationFieldGen(workorder);
  const [locationState, setLocationState] = useState({
    floor,
    building,
    space,
    location_description,
  });
  console.log(locationState);
  return (
    <Fragment>
      <Grid className={layoutClasses.labelCtr} item xs={12} sm={4} lg={5}>
        <Typography variant='subtitle1' className={layoutClasses.labelStyle}>
          Location:
        </Typography>
      </Grid>
      <Grid className={layoutClasses.detailCtr} item xs={12} sm={8} lg={7}>
        <Typography variant='body1' className={layoutClasses.detailStyle}>
          {edit ? <p>test</p> : spaceDetails}
        </Typography>
      </Grid>
    </Fragment>
  );
};

Location.propTypes = {};

export default Location;
