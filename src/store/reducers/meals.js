import {
  GET_MEALS_START,
  GET_MEALS_SUCCESS,
  GET_MEALS_FAIL,
  GET_MEAL_START,
  GET_MEAL_SUCCESS,
  GET_MEAL_FAIL,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  meals: [],
  errorMessage: null,
  meal: null,
};

const getMealsStart = (state, action) => ({
  ...state,
  isLoading: true,
  meals: [],
  errorMessage: '',
});

const getMealsSuccess = (state, action) => ({
  ...state,
  isLoading: false,
  meals: action.mealsData,
});

const getMealsFail = (state, action) => ({
  ...state,
  isLoading: false,
  errorMessage: action.error,
});
const getMealStart = (state, action) => ({
  ...state,
  isLoading: true,
  meal: null,
  errorMessage: null,
});

const getMealSuccess = (state, action) => ({
  ...state,
  isLoading: false,
  meal: action.mealData,
});

const getMealFail = (state, action) => ({
  ...state,
  isLoading: false,
  errorMessage: action.error,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEALS_START:
      return getMealsStart(state, action);
    case GET_MEALS_SUCCESS:
      return getMealsSuccess(state, action);
    case GET_MEALS_FAIL:
      return getMealsFail(state, action);
    case GET_MEAL_START:
      return getMealStart(state, action);
    case GET_MEAL_SUCCESS:
      return getMealSuccess(state, action);
    case GET_MEAL_FAIL:
      return getMealFail(state, action);
    default:
      return state;
  }
};

export default reducer;
