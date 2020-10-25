import { GET_TASK_COSTS } from '../actions/types';

const initialState = {
  taskCosts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TASK_COSTS:
      return {
        ...state,
        taskCosts: payload,
      };
    default:
      return state;
  }
}
