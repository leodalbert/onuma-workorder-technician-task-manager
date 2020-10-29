import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core';

import AssignedTo from './AssignedTo';
import TaskForm from './TaskForm';
import CostForm from './CostForm';
import WorkOrderStatus from './WorkOrderStatus';
import ConfirmSaveDialog from './ConfirmSaveDialog';

import { taskDetailsGridStyles } from '../../styles/GridStyles';
import { addNewTask } from '../../actions/task';
import { workOrderStatusChange } from '../../actions/workOrder';

const initialCostState = {
  description: '',
  cost: '',
  date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};
const initialTaskState = {
  workorder: '',
  hours: 0,
  is_overtime: 'F',
  assigned_technician: '',
  description: '',
  date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

const initialTimeState = { hrs: '', mins: '' };

const TaskDetails = ({
  name,
  email,
  id,
  room,
  building,
  collaborators,
  techs,
  status,
  workOrderId,
  studioId,
  addNewTask,
  workOrderStatusChange,
}) => {
  const classes = taskDetailsGridStyles();

  const [taskForm, setTaskForm] = useState(initialTaskState);
  const [costForm, setCostForm] = useState(initialCostState);
  const [timeState, setTimeState] = useState(initialTimeState);
  const [costTasks, setCostTasks] = useState([]);
  const [workOrderStatus, setWorkOrderStatus] = useState(status);
  const [openSaveAlert, setOpenSaveAlert] = useState(false);
  const [openCostAlert, setOpenCostAlert] = useState(false);

  useEffect(() => {
    id &&
      setTaskForm({
        ...taskForm,
        assigned_technician: id,
        workorder: workOrderId,
      });
    // eslint-disable-next-line
  }, [id, workOrderId]);

  useEffect(() => {
    if (!_.isEqual(timeState, initialTimeState)) {
      const time = `${timeState.hrs}.${timeState.mins}`;
      setTaskForm({ ...taskForm, hours: Number(time) });
    }
    // eslint-disable-next-line
  }, [timeState]);

  //   chage work order status if taks changes are made - will only save once task is submitted
  if (
    (!_.isEqual(timeState, initialTimeState) ||
      taskForm.description !== initialTaskState.description ||
      !costTasks.length < 1) &&
    workOrderStatus === 'Assigned'
  ) {
    setWorkOrderStatus('Work in Progress');
  }

  const handleFormChange = (e) => {
    if (e.target.name === 'is_overtime') {
      taskForm.is_overtime === 'F'
        ? setTaskForm({ ...taskForm, is_overtime: 'T' })
        : setTaskForm({ ...taskForm, is_overtime: 'F' });
    } else {
      setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
    }
  };
  const handleAddCost = () => {
    setCostTasks([...costTasks, costForm]);
    setCostForm(initialCostState);
    setOpenCostAlert(false);
  };

  const handleCostChange = (e) => {
    setCostForm({ ...costForm, [e.target.name]: e.target.value });
  };

  const handleRemoveCost = (index) => {
    setCostTasks(costTasks.filter((cost, i) => i !== index));
  };

  const handlePreSave = () => {
    if (!_.isMatch(costForm, initialCostState)) {
      setOpenCostAlert(true);
    } else {
      setOpenSaveAlert(true);
    }
  };

  const handleSave = () => {
    setOpenSaveAlert(false);
    setOpenCostAlert(false);
    if (workOrderStatus !== status) {
      workOrderStatusChange(workOrderId, workOrderStatus, studioId);
    }
    if (
      !_.isEqual(timeState, initialTimeState) ||
      taskForm.description !== initialTaskState.description
    ) {
      addNewTask(taskForm, costTasks, studioId);
    }
    setTaskForm({
      ...initialTaskState,
      assigned_technician: id,
      workorder: workOrderId,
    });
    setCostForm(initialCostState);
    setTimeState(initialTimeState);
    setCostTasks([]);
  };
  //   TODO generate link to workorder for email
  return (
    <div className={classes.root}>
      <Grid item container xs={12}>
        <Grid item container spacing={3}>
          <AssignedTo
            classes={classes}
            name={name}
            email={email}
            room={room}
            building={building}
            techs={techs}
            collaborators={collaborators}
          />
          <TaskForm
            classes={classes}
            handleFormChange={handleFormChange}
            techs={techs}
            id={id}
            name={name}
            setTimeState={setTimeState}
            timeState={timeState}
            taskForm={taskForm}
          />
          <CostForm
            classes={classes}
            costTasks={costTasks}
            handleRemoveCost={handleRemoveCost}
            handleCostChange={handleCostChange}
            costForm={costForm}
            handleAddCost={handleAddCost}
          />
          <WorkOrderStatus
            classes={classes}
            workOrderStatus={workOrderStatus}
            setWorkOrderStatus={setWorkOrderStatus}
          />
          <Grid style={{ textAlign: 'center' }} item xs={12}>
            <Typography style={{ marginBottom: '15px' }}>
              You can keep on adding new tasks until you set the Work Order
              Status as "Completed".
            </Typography>
            <Button
              disabled={
                !taskForm.hours &&
                !taskForm.description &&
                !(workOrderStatus === 'Completed')
              }
              onClick={() => handlePreSave()}
              variant='contained'
              className={classes.saveBtn}>
              Save Task
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmSaveDialog
        openAlert={openSaveAlert}
        setOpenAlert={setOpenSaveAlert}
        handleSave={handleSave}
        title='Are you sure you want to submit the task?'
        content='This will not be editable after subission'
        confirmBtn='Submit'
        declineBtn='Cancle'
      />
      <ConfirmSaveDialog
        openAlert={openCostAlert}
        setOpenAlert={setOpenCostAlert}
        handleSave={handleSave}
        title='You have unsaved material costs!'
        content='Would you like to discard any unsaved materials and save task?'
        confirmBtn='Save task without material cost'
        declineBtn='Go back'
      />
    </div>
  );
};

TaskDetails.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.number,
  room: PropTypes.string.isRequired,
  building: PropTypes.string.isRequired,
  collaborators: PropTypes.array.isRequired,
  techs: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  workOrderId: PropTypes.number.isRequired,
  studioId: PropTypes.string.isRequired,
  addNewTask: PropTypes.func.isRequired,
  workOrderStatusChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.tech.email,
  name: state.tech.name,
  id: state.tech.id,
  building: state.workOrder.current.building.name,
  room: state.workOrder.currentSpaceInfo.spaceName,
  status: state.workOrder.current.status,
  workOrderId: state.workOrder.current.id,
  collaborators: state.workOrder.current.collaborators,
  techs: state.tech.techs,
  workOrderStatusChange: PropTypes.func.isRequired,
  addNewTask: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { addNewTask, workOrderStatusChange })(
  TaskDetails
);