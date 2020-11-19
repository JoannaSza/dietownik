import { combineReducers } from 'redux';
import authReducer from './auth';
import windowReducer from './window';
import mealsReducer from './meals';

export default combineReducers({
  auth: authReducer,
  window: windowReducer,
  meals: mealsReducer,
});
