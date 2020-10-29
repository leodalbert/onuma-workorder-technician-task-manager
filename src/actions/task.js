import axios from 'axios';

import { GET_TASK_COSTS, ERROR, ADD_TASK, ADD_COST } from './types';

// Get all task costs for workorder

export const getTaskCosts = (studioId, tasks) => async (dispatch) => {
  try {
    const taskIds = tasks.map((task) => task.id).join(',');
    const res = await axios.get(
      `/${studioId}/api/items/workorder_cost?filter[workorder_task.id][in]=${taskIds}`
    );
    dispatch({ type: GET_TASK_COSTS, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: {
        msg: err.response.data.error.message,
        status: err.response.data.error.code,
      },
    });
  }
};

// Post new task for workorder
export const addNewTask = (taskForm, costs, studioId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/${studioId}/api/items/workorder_task`,
      taskForm
    );
    if (costs.length > 0) {
      costs.map((cost) => {
        return dispatch(addNewCost(cost, res.data.data.id, studioId));
      });
    }
    dispatch({ type: ADD_TASK, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: {
        msg: err.response.data.error.message,
        status: err.response.data.error.code,
      },
    });
  }
};

export const addNewCost = (cost, taskId, studioId) => async (dispatch) => {
  try {
    cost.workorder_task = taskId;
    const res = await axios.post(`/${studioId}/api/items/workorder_cost`, cost);
    dispatch({ type: ADD_COST, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: {
        msg: err.response.data.error.message,
        status: err.response.data.error.code,
      },
    });
  }
};
