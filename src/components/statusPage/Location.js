import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  TextField,
} from '@material-ui/core';

import { layoutStyles } from '../../styles/styles';
import { locationFieldGen } from '../../utils/helpers';

const Location = ({
  workorder: {
    floor = '',
    building = '',
    space = '',
    location_description = '',
  },
  workorder,
  edit,
  allSpaces,
  setTopLocationState,
}) => {
  let initialLocationState = { floor, building, space, location_description };

  if (initialLocationState.location_description === null) {
    initialLocationState.location_description = '';
  }
  if (initialLocationState.space === null) {
    initialLocationState.space = '';
  }
  if (initialLocationState.floor === null) {
    initialLocationState.floor = '';
  }
  const layoutClasses = layoutStyles();
  const spaceDetails = locationFieldGen(workorder);
  const [locationState, setLocationState] = useState(initialLocationState);

  useEffect(() => {
    setTopLocationState(locationState);
  }, [locationState, setTopLocationState]);

  const handleChange = (e) => {
    if (e.target.name === 'building') {
      setLocationState({
        building: { id: e.target.value },
        space: { id: '' },
        floor: { id: '' },
        location_description: '',
      });
    } else if (e.target.name === 'floor') {
      setLocationState({
        ...locationState,
        space: { id: '' },
        location_description: '',
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'space') {
      setLocationState({
        ...locationState,
        location_description: '',
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'location_description') {
      setLocationState({
        ...locationState,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Fragment>
      <Grid className={layoutClasses.labelCtr} item xs={12} sm={4} lg={5}>
        <Typography
          variant='subtitle1'
          className={
            edit ? layoutClasses.labelSelectStyle : layoutClasses.labelStyle
          }>
          Location:
        </Typography>
      </Grid>
      <Grid className={layoutClasses.detailCtr} item xs={12} sm={8} lg={7}>
        {edit ? (
          <Fragment>
            <FormControl className={layoutClasses.formControlLocation}>
              <Select
                labelId='building-select'
                id='building-select'
                value={locationState.building.id}
                name='building'
                onChange={handleChange}>
                {allSpaces.map((buildings) => {
                  return (
                    <MenuItem key={buildings.id} value={buildings.id}>
                      {`${buildings.number && buildings.number} - 
                    ${buildings.name}`}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={layoutClasses.formControlLocation}>
              <Select
                labelId='floor-select'
                id='floor-select'
                value={locationState.floor ? locationState.floor.id : ''}
                name='floor'
                onChange={handleChange}>
                <MenuItem value=''>Not specified</MenuItem>
                {allSpaces
                  .filter(
                    (buildings) => buildings.id === locationState.building.id
                  )[0]
                  .floors.map((floors) => {
                    return (
                      <MenuItem key={floors.id} value={floors.id}>
                        {floors.name
                          ? floors.name
                          : `Floor ${
                              floors.number >= 0
                                ? floors.number + 1
                                : floors.number
                            }`}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl className={layoutClasses.formControlLocation}>
              <Select
                labelId='space-select'
                id='space-select'
                value={locationState.space ? locationState.space.id : ''}
                name='space'
                onChange={handleChange}>
                <MenuItem value=''>Not specified</MenuItem>
                {locationState.floor &&
                  locationState.floor.id &&
                  allSpaces
                    .filter(
                      (buildings) => buildings.id === locationState.building.id
                    )[0]
                    .floors.filter(
                      (floors) => floors.id === locationState.floor.id
                    )[0]
                    .spaces.map((spaces) => {
                      return (
                        <MenuItem key={spaces.id} value={spaces.id}>
                          {`${spaces.number && spaces.number} - 
                  ${spaces.name ? spaces.name : 'Unnamed floor'}`}
                        </MenuItem>
                      );
                    })}
              </Select>
            </FormControl>
            <FormControl className={layoutClasses.formControlLocation}>
              <TextField
                error={
                  !locationState.space.id && !locationState.location_description
                }
                value={locationState.location_description}
                id='location-description'
                helperText={
                  !locationState.space.id &&
                  !locationState.location_description &&
                  'if no space is selected, please enter a description'
                }
                placeholder='location description'
                name='location_description'
                multiline
                rowsMax={4}
                variant='standard'
                onChange={handleChange}
              />
            </FormControl>
          </Fragment>
        ) : (
          <Typography variant='body1' className={layoutClasses.detailStyle}>
            {spaceDetails}
          </Typography>
        )}
      </Grid>
    </Fragment>
  );
};

Location.propTypes = {
  edit: PropTypes.bool.isRequired,
  workorder: PropTypes.object,
  allSpaces: PropTypes.array,
};

export default Location;
