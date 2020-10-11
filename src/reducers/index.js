import { combineReducers } from 'redux';
import workOrderReducer from './workOrderReducer';

export default combineReducers({
  workOrder: workOrderReducer,
});
