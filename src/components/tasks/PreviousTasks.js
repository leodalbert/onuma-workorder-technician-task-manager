import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import PreviousTaskRow from './PreviousTaskRow';
import { getTaskCosts } from '../../actions/task';
import { previousTaskStyles } from '../../styles/TaskStyles';

const PreviousTasks = ({ tasks, techs, studioId, getTaskCosts, taskCosts }) => {
  useEffect(() => {
    getTaskCosts(studioId, tasks);
  }, [tasks, studioId, getTaskCosts]);
  const classes = previousTaskStyles();

  const techName = (task) => {
    const tech = techs.filter(
      (tech) => tech.id === task.assigned_technician
    )[0];
    if (tech) {
      return `${tech.first_name && tech.first_name} ${
        tech.last_name && tech.last_name
      }`;
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table size='small' className={classes.table} aria-label='task table'>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: '200px' }} width='30%'>
              Description
            </TableCell>
            <TableCell style={{ padding: 0 }} align='left'>
              Hours
            </TableCell>
            <TableCell padding='none'></TableCell>
            <TableCell align='left'>Material&nbsp;Costs</TableCell>
            <TableCell style={{ padding: 0 }} align='left'>
              Date
            </TableCell>
            <TableCell align='left'>By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <PreviousTaskRow
              task={task}
              key={task.id}
              techName={techName}
              taskCosts={taskCosts}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

PreviousTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  techs: PropTypes.array.isRequired,
  taskCosts: PropTypes.array.isRequired,
  getTaskCosts: PropTypes.func.isRequired,
  studioId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.workOrder.current.tasks,
  techs: state.tech.techs,
  taskCosts: state.task.taskCosts,
  // studioId: PropTypes.string.isRequired,
  // getTaskCosts: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getTaskCosts })(PreviousTasks);
