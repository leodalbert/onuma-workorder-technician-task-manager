import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import ComponentSearchButtons from './ComponentSearchButtons';

import { componentSearchGridStyles } from '../../styles/DialogStyles';

// TODO handle no floor name

const ComponentSearchDialogResults = ({
  searchResults,
  handleOpenComponentDialog,
  handleSelectComponent,
}) => {
  const classes = componentSearchGridStyles();
  let spaces = [];

  searchResults.map(({ component }) => {
    return spaces.push(component.space[0].space);
  });

  function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  const uniqueSpaces = removeDuplicates(spaces, 'number');
  const uniqueFloors = removeDuplicates(
    uniqueSpaces
      .map((space) => {
        return { name: space.floor.name, number: space.floor.number };
      })
      .sort((a, b) => b.name.localeCompare(a.name)),
    'number'
  ).reverse();

  const spacesbyfloors = uniqueFloors.map((floor) => {
    return uniqueSpaces.reduce((result, element) => {
      if (element.floor.number === floor.number) {
        result.push(element);
      }
      return result;
    }, []);
  });

  return spacesbyfloors.map((floor, index) => {
    return (
      <Grid container item xs={12} key={index}>
        <div>
          <Typography variant='h5'>{uniqueFloors[index].name}</Typography>
        </div>
        {floor.map((space) => {
          return (
            <Grid className={classes.spaceGrid} item xs={12} key={space.number}>
              <Typography variant='subtitle1' key={space.number}>{`${
                space.number
              } ${space.name && ` - ${space.name}`}`}</Typography>
              <div className={classes.spaceGrid}>
                <ComponentSearchButtons
                  classes={classes}
                  components={searchResults}
                  spaceId={space.number}
                  handleOpenComponentDialog={handleOpenComponentDialog}
                  handleSelectComponent={handleSelectComponent}
                />
              </div>
            </Grid>
          );
        })}
      </Grid>
    );
  });
};

ComponentSearchDialogResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  handleOpenComponentDialog: PropTypes.func.isRequired,
  handleSelectComponent: PropTypes.func.isRequired,
};

export default ComponentSearchDialogResults;
