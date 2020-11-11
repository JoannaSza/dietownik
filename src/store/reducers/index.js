import { combineReducers } from 'redux';
import authReducer from './auth';
import windowReducer from './window';

export default combineReducers({
  auth: authReducer,
  window: windowReducer,
});
