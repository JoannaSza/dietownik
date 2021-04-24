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
  EDIT_CARD_LOCK_START,
  EDIT_CARD_LOCK_SUCCESS,
  EDIT_CARD_LOCK_FAIL,
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

const editCardLockFail = (state, action) => ({
  ...state,
  isLoading: false,
  error: action.error,
});

const editCardLockStart = (state, action) => ({
  ...state,
  isLoading: true,
});

const editCardLockSuccess = (state, action) => {
  const newCard = { ...state.diet[action.day], isLocked: action.isLocked };
  const newDiet = { ...state.diet, [action.day]: newCard };
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

const addCardMealStart = (state, action) => ({
  ...state,
  isLoading: true,
});

const addCardMealSuccess = (state, action) => {
  const newDay =
    state.diet && state.diet[action.mealData.date]
      ? {
          ...state.diet[action.mealData.date],
          [action.mealData.category]: action.mealData.title,
        }
      : {};

  const newDiet = state.diet
    ? { ...state.diet, [action.mealData.date]: newDay }
    : { [action.mealData.date]: newDay };

  return {
    ...state,
    isLoading: false,
    diet: newDiet,
  };
};

const addCardMealFail = (state, action) => ({
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
    case ADD_CARD_MEAL_START:
      return addCardMealStart(state, action);
    case ADD_CARD_MEAL_SUCCESS:
      return addCardMealSuccess(state, action);
    case ADD_CARD_MEAL_FAIL:
      return addCardMealFail(state, action);
    case EDIT_CARD_LOCK_START:
      return editCardLockStart(state, action);
    case EDIT_CARD_LOCK_SUCCESS:
      return editCardLockSuccess(state, action);
    case EDIT_CARD_LOCK_FAIL:
      return editCardLockFail(state, action);
    default:
      return state;
  }
};

export default reducer;
