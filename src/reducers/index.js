import { combineReducers } from 'redux';
import workOrderReducer from './workOrderReducer';
import techReducer from './techReducer';
import componentReducer from './componentReducer';

export default combineReducers({
  workOrder: workOrderReducer,
  tech: techReducer,
  component: componentReducer,
});
