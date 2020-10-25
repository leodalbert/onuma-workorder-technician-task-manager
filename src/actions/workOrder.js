import axios from 'axios';
import {
  GET_TECHS_WORK_ORDERS,
  GET_WORK_ORDER,
  ERROR,
  SET_LOADING,
  CLEAR_CURRENT,
  CLEAR_COMPONENT_STATE,
} from './types';

// Get all work orders by tech email
export const getAllWorkOrders = (techEmail, studioId) => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  try {
    //   TODO - handle studio number
    const res = await axios.get(
      `/${studioId}/api/items/workorder?fields=id, request_number, request_date, request_description, request_number, building, assigned_priority, space, status&filter[assigned_technician.email]=${techEmail}`
    );
    dispatch({ type: GET_TECHS_WORK_ORDERS, payload: res.data.data });
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

// Get Work order by work order Id
export const getWorkOrder = (id, studioId) => async (dispatch) => {
  try {
    //   TODO - handle studio number
    const res = await axios.get(
      `/${studioId}/api/items/workorder/${id}?fields=*,*.*&fields=id,request_number,building.id, building.site, building.number, building.name, floor.name, floor.id, floor.number, space.id, space.number, space.name, submitted_by, request_email, assigned_priority, request_date, request_description, components.component, components.id, tasks.*, assigned_technician.id, assigned_technician.first_name, assigned_technician.last_name, assigned_technician.email, location_description, request_telephone, due_date, administrator_to_technician_comment, administrator_comment`
    );
    dispatch({ type: GET_WORK_ORDER, payload: res.data.data });
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

// Clear Current Workorder and components
export const clearCurrent = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
  dispatch({ type: CLEAR_COMPONENT_STATE });
};

// set loading to true
export const setLoading = () => (dispatch) => {
  dispatch({ type: SET_LOADING });
};
