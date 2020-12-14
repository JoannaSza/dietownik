import { combineReducers } from 'redux';
import authReducer from './auth';
import windowReducer from './window';
import mealsReducer from './meals';
import ingredientsReducer from './ingredients';

export default combineReducers({
  auth: authReducer,
  window: windowReducer,
  meals: mealsReducer,
  ingreds: ingredientsReducer,
});
