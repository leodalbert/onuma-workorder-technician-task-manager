import { combineReducers } from 'redux';
import workOrderReducer from './workOrderReducer';
import techReducer from './techReducer';

export default combineReducers({
  workOrder: workOrderReducer,
  tech: techReducer,
});
