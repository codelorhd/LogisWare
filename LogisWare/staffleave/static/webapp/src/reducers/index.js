import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import leave_reducers from '../reducers/leave_reducers';
import general from '../reducers/general_reducer';
import department from '../reducers/department_reducer';
import staff from '../reducers/staff_reducer';

export default combineReducers({
  form: formReducer,
  leaveReducers: leave_reducers,
  generalReducers: general,
  departmentReducers: department,
  staffReducer: staff
});
