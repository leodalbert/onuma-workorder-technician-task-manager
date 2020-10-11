import {
  GET_TECHS_WORK_ORDERS,
  GET_WORK_ORDER,
  GET_TECHS,
  ERROR,
} from '../actions/types';

const initialState = {
  workOrders: [],
  current: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TECHS_WORK_ORDERS:
      return {
        ...state,
        workOrders: payload,
        loading: false,
      };
    default:
      return state;
  }
}
