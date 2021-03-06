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
import ConfirmDialog from './ConfirmDialog';

import { componentStyles, layoutStyles } from '../../styles/styles';
import { addNewTask } from '../../actions/task';
import {
  workOrderStatusChange,
  removeCollaborator,
  addCollaborator,
} from '../../actions/workOrder';

const initialCostState = {
  description: '',
  cost: '',
  date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};
const initialTaskState = {
  workorder: '',
  hours: 0,
  is_overtime: false,
  assigned_technician: '',
  description: '',
  date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

const initialTimeState = { hrs: '', mins: '' };

const TaskDetails = ({
  name,
  email,
  currentTechId,
  room,
  building,
  collaborators,
  techs,
  status,
  workOrderId,
  studioId,
  addNewTask,
  workOrderStatusChange,
  removeCollaborator,
  addCollaborator,
  workOrderTech,
  visCollaborators,
  workOrderTechName,
}) => {
  const layoutClasses = layoutStyles();
  const componentClasses = componentStyles();

  const [taskForm, setTaskForm] = useState(initialTaskState);
  const [costForm, setCostForm] = useState(initialCostState);
  const [timeState, setTimeState] = useState(initialTimeState);
  const [costTasks, setCostTasks] = useState([]);
  const [workOrderStatus, setWorkOrderStatus] = useState(status);
  const [openSaveAlert, setOpenSaveAlert] = useState(false);
  const [openCostAlert, setOpenCostAlert] = useState(false);
  useEffect(() => {
    currentTechId &&
      setTaskForm({
        ...taskForm,
        assigned_technician: currentTechId,
        workorder: workOrderId,
      });
    // eslint-disable-next-line
  }, [currentTechId, workOrderId]);

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
    setWorkOrderStatus('Work In Progress');
  }

  const handleFormChange = (e) => {
    if (e.target.name === 'is_overtime') {
      taskForm.is_overtime === false
        ? setTaskForm({ ...taskForm, is_overtime: true })
        : setTaskForm({ ...taskForm, is_overtime: false });
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

  const handleAddCollaborator = (techId) => {
    addCollaborator(workOrderId, techId, studioId);
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
      is_overtime: taskForm.is_overtime,
      assigned_technician: currentTechId,
      workorder: workOrderId,
    });
    setCostForm(initialCostState);
    setTimeState(initialTimeState);
    setCostTasks([]);
  };
  return (
    <div className={layoutClasses.root}>
      <Grid item container xs={12}>
        <Grid item container spacing={3}>
          <AssignedTo
            name={workOrderTech.first_name + ' ' + workOrderTech.last_name}
            email={workOrderTech.email}
            room={room}
            workOrderTechId={workOrderTech.id}
            building={building}
            techs={techs}
            collaborators={collaborators}
            removeCollaborator={removeCollaborator}
            handleAddCollaborator={handleAddCollaborator}
            studioId={studioId}
            currentTechId={currentTechId}
            workOrderId={workOrderId}
            visCollaborators={visCollaborators}
          />
          <TaskForm
            handleFormChange={handleFormChange}
            techs={techs}
            id={currentTechId}
            name={name}
            setTimeState={setTimeState}
            timeState={timeState}
            taskForm={taskForm}
          />
          <CostForm
            costTasks={costTasks}
            handleRemoveCost={handleRemoveCost}
            handleCostChange={handleCostChange}
            costForm={costForm}
            handleAddCost={handleAddCost}
          />
          <WorkOrderStatus
            workOrderStatus={workOrderStatus}
            setWorkOrderStatus={setWorkOrderStatus}
            workOrderTech={workOrderTech.id}
            currentTechId={currentTechId}
          />
        </Grid>
        <Grid className={componentClasses.saveTextBreak} item xs={12} lg={9}>
          <Typography style={{ marginBottom: '15px' }}>
            {workOrderTech.id === currentTechId
              ? `You can keep on adding new tasks until you set the work order status
            as "Completed".`
              : `You can keep on adding new tasks until the assigned technician, ${workOrderTechName}, sets the work order as "Completed".`}
          </Typography>
        </Grid>
        <Grid className={componentClasses.btnBreak} item xs={12} lg={3}>
          <Button
            disabled={
              !taskForm.hours &&
              !taskForm.description &&
              !(workOrderStatus === 'Completed')
            }
            onClick={() => handlePreSave()}
            variant='contained'
            color='secondary'
            className={componentClasses.btnWidth}>
            Save Task
          </Button>
        </Grid>
      </Grid>
      <ConfirmDialog
        openAlert={openSaveAlert}
        setOpenAlert={setOpenSaveAlert}
        handleSave={handleSave}
        title='Are you sure you want to submit the task?'
        content='This will not be editable after submission'
        confirmBtn='Submit'
        declineBtn='Cancel'
      />
      <ConfirmDialog
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
  currentTechId: PropTypes.number,
  room: PropTypes.string.isRequired,
  building: PropTypes.string.isRequired,
  collaborators: PropTypes.array.isRequired,
  techs: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  workOrderId: PropTypes.number,
  studioId: PropTypes.string.isRequired,
  addNewTask: PropTypes.func.isRequired,
  workOrderStatusChange: PropTypes.func.isRequired,
  removeCollaborator: PropTypes.func.isRequired,
  addCollaborator: PropTypes.func.isRequired,
  workOrderTech: PropTypes.object,
};

const mapStateToProps = (state) => ({
  email: state.tech.email,
  name: state.tech.name,
  currentTechId: state.tech.id,
  building: state.workOrder.current.building.name,
  room: state.workOrder.currentSpaceInfo.spaceName,
  status: state.workOrder.current.status,
  workOrderId: state.workOrder.current.id,
  workOrderTech: state.workOrder.current.assigned_technician,
  workOrderTechName:
    state.workOrder.current.assigned_technician.first_name +
    ' ' +
    state.workOrder.current.assigned_technician.last_name,
  collaborators: state.workOrder.current.collaborators,
  techs: state.tech.techs,
  visCollaborators: state.tech.techs.filter((tech) => {
    return state.workOrder.current.collaborators.some((collaborator) => {
      return collaborator.collaborator.id === tech.id;
    });
  }),
});

export default connect(mapStateToProps, {
  addNewTask,
  workOrderStatusChange,
  removeCollaborator,
  addCollaborator,
})(TaskDetails);
