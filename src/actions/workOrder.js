import axios from 'axios';
import {
  GET_TECHS_WORK_ORDERS,
  GET_WORK_ORDER,
  GET_TECHS,
  ERROR,
} from './types';

// Get all work orders by tech Id
export const getAllWorkOrders = (tech) => async (dispatch) => {
  try {
    //   TODO - handle studio number
    const res = await axios.get(
      `/26/items/workorder?fields=id, request_number, request_date, request_description, request_number, building, space, status&filter[assigned_technician]=${tech}`
    );
    dispatch({ type: GET_TECHS_WORK_ORDERS, payload: res.data.data });
  } catch (err) {
    // dispatch({
    //   type: ERROR,
    //   payload: { msg: err.response.data.error.message, status: err.response.data.error.code },
    // });
  }
};
