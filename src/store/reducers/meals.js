import {
  GET_MEALS_START,
  GET_MEALS_SUCCESS,
  GET_MEALS_FAIL,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  meals: [],
  errorMessage: null,
};

const getMealsStart = (state, action) => ({
  ...state,
  isLoading: true,
  meals: [],
  errorMessage: null,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEALS_START:
      return getMealsStart(state, action);
    case GET_MEALS_SUCCESS:
      return getMealsSuccess(state, action);
    case GET_MEALS_FAIL:
      return getMealsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
