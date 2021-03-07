import { bindActionCreators } from 'redux';
import {
  GET_DIET_START,
  GET_DIET_SUCCESS,
  GET_DIET_FAIL,
  ADD_CARD_START,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  DELETE_CARD_START,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAIL,
  ADD_CARD_MEAL_START,
  ADD_CARD_MEAL_SUCCESS,
  ADD_CARD_MEAL_FAIL,
} from '../actions/actionTypes';
import { omit } from '../../shared/utility';

const initialState = {
  isLoading: false,
  error: null,
  diet: null,
};

const getDietStart = (state, action) => ({
  ...state,
  isLoading: true,
  error: null,
  diet: null,
});

const getDietSuccess = (state, action) => ({
  ...state,
  isLoading: false,
  diet: action.diet,
});

const getDietFail = (state, action) => ({
  ...state,
  isLoading: false,
  error: action.error,
});

const addCardStart = (state, action) => ({
  ...state,
  isLoading: true,
});

const addCardSuccess = (state, action) => {
  const newDiet = state.diet
    ? { ...state.diet, ...action.newCard }
    : { ...action.newCard };
  return {
    ...state,
    isLoading: false,
    diet: newDiet,
  };
};

const addCardFail = (state, action) => ({
  ...state,
  isLoading: false,
  error: action.error,
});

const deleteCardStart = (state, action) => ({
  ...state,
  isLoading: true,
});

const deleteCardSuccess = (state, action) => {
  const newDiet = omit(state.diet, action.cardDate);
  return {
    ...state,
    isLoading: false,
    diet: newDiet,
  };
};

const deleteCardFail = (state, action) => ({
  ...state,
  isLoading: false,
  error: action.error,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIET_START:
      return getDietStart(state, action);
    case GET_DIET_SUCCESS:
      return getDietSuccess(state, action);
    case GET_DIET_FAIL:
      return getDietFail(state, action);
    case ADD_CARD_START:
      return addCardStart(state, action);
    case ADD_CARD_SUCCESS:
      return addCardSuccess(state, action);
    case ADD_CARD_FAIL:
      return addCardFail(state, action);
    case DELETE_CARD_START:
      return deleteCardStart(state, action);
    case DELETE_CARD_SUCCESS:
      return deleteCardSuccess(state, action);
    case DELETE_CARD_FAIL:
      return deleteCardFail(state, action);
    default:
      return state;
  }
};

export default reducer;
