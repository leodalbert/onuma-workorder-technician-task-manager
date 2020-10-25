import { combineReducers } from 'redux';
import workOrderReducer from './workOrderReducer';
import techReducer from './techReducer';
import componentReducer from './componentReducer';
import taskReducer from './taskReducer';

export default combineReducers({
  workOrder: workOrderReducer,
  tech: techReducer,
  component: componentReducer,
  task: taskReducer,
});
