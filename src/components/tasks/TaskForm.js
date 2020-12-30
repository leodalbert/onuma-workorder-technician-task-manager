import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { layoutStyles, spacingStyles } from '../../styles/styles';
import clsx from 'clsx';

const TaskForm = ({
  handleFormChange,
  techs,
  id,
  name,
  setTimeState,
  timeState,
  taskForm,
}) => {
  const layoutClasses = layoutStyles();
  const spacingClasses = spacingStyles();
  return (
    <Fragment>
      <Grid className={layoutClasses.labelCtr} item xs={12} sm={3}>
        <Typography
          variant='subtitle1'
          className={clsx(layoutClasses.labelStyle, spacingClasses.marginTopS)}>
          Completed by:
        </Typography>
      </Grid>
      <Grid className={layoutClasses.detailCtr} item xs={12} sm={9}>
        <FormControl className={layoutClasses.formControl}>
          <Select
            onChange={(e) => handleFormChange(e)}
            labelId='tech-select'
            id='tech-select'
            name='assigned_technician'
            value={taskForm.assigned_technician}>
            <MenuItem value={id}>{name} (myself)</MenuItem>
            {techs
              .filter((tech) => tech.id !== id)
              .map((tech) => {
                return (
                  <MenuItem key={tech.id} value={tech.id}>
                    {`${tech.first_name} ${tech.last_name} (${tech.email})`}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid>
      <Grid className={layoutClasses.labelCtr} item xs={12} sm={3}>
        <Typography
          variant='subtitle1'
          className={layoutClasses.lableStyleHourSelect}>
          Actual hours:
        </Typography>
      </Grid>
      <Grid className={layoutClasses.detailCtr} item xs={4} sm={3}>
        <FormControl fullWidth>
          <InputLabel id='hour-select'>Hours</InputLabel>
          <Select
            labelId='hour-select'
            id='hour-select'
            value={timeState.hrs}
            name='hrs'
            onChange={(e) =>
              setTimeState({ ...timeState, hrs: e.target.value })
            }>
            {_.range(0, 12 + 1).map((value) => (
              <MenuItem key={value} value={value}>
                {value} hrs
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid className={layoutClasses.detailCtr} item xs={4} sm={3}>
        <FormControl fullWidth>
          <InputLabel id='min-select'>Minutes</InputLabel>
          <Select
            labelId='min-select'
            id='min-select'
            value={timeState.mins}
            name='mins'
            onChange={(e) =>
              setTimeState({ ...timeState, mins: e.target.value })
            }>
            {[
              { v: 0, t: 0 },
              { v: 25, t: 15 },
              { v: 5, t: 30 },
              { v: 75, t: 45 },
            ].map((i) => (
              <MenuItem key={i.v} value={i.v}>
                {i.t} mins
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        style={{ textAlign: 'center' }}
        className={layoutClasses.detailCtr}
        item
        xs={4}
        sm={3}>
        <FormControlLabel
          control={
            <Switch
              value={taskForm.is_overtime}
              name='is_overtime'
              onChange={(e) => handleFormChange(e)}
            />
          }
          label='Overtime'
        />
      </Grid>
      <Grid className={layoutClasses.labelCtr} item xs={12} sm={3}>
        <Typography variant='subtitle1' className={layoutClasses.labelStyle}>
          Task description:
        </Typography>
      </Grid>
      <Grid className={layoutClasses.detailCtr} item xs={12} sm={9}>
        <TextField
          fullWidth
          rows={6}
          id='task-description'
          margin='dense'
          variant='outlined'
          multiline
          rowsMax={8}
          name='description'
          value={taskForm.description}
          onChange={(e) => handleFormChange(e)}
        />
      </Grid>
    </Fragment>
  );
};

TaskForm.propTypes = {
  handleFormChange: PropTypes.func.isRequired,
  techs: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  setTimeState: PropTypes.func.isRequired,
  timeState: PropTypes.object.isRequired,
  taskForm: PropTypes.object.isRequired,
};

export default TaskForm;
