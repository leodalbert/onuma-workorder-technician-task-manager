import axios from 'axios';

import { GET_TASK_COSTS, ERROR } from './types';

// Get all task costs for workorder

export const getCosts = (studioId, tasks) => async (dispatch) => {
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
