import { combineReducers } from 'redux';
import workOrderReducer from './workOrderReducer';
import techReducer from './techReducer';
import componentReducer from './componentReducer';
import taskReducer from './taskReducer';
import statusPageReducer from './statusPageReducer';

export default combineReducers({
  workOrder: workOrderReducer,
  tech: techReducer,
  component: componentReducer,
  task: taskReducer,
  statusPage: statusPageReducer,
});
