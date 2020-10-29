import { GET_TASK_COSTS, ADD_COST } from '../actions/types';

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
    case ADD_COST:
      return {
        ...state,
        taskCosts: [...state.taskCosts, payload],
      };
    default:
      return state;
  }
}
