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
} from './actionTypes';

import dietsApi from '../../apis/diets';
import diets from '../../apis/diets';

const categoryNames = [
  'śniadanie',
  'II śniadanie',
  'obiad',
  'podwieczorek',
  'kolacja',
];

export const getDiet = () => {
  return (dispatch, getState) => {
    dispatch(getDietStart());
    const userId = getState().auth.userId;
    dietsApi
      .get(`usersData/${userId}/diet.json`)
      .then((response) => dispatch(getDietSuccess(response.data)))
      .catch((err) => {
        if (err.response) dispatch(getDietFail(err.response.data));
        else if (Object.keys(err).length === 0) dispatch(getDietSuccess({}));
        else dispatch(getDietFail('Coś poszło nie tak'));
      });
  };
};

const getDietStart = () => ({
  type: GET_DIET_START,
});

const getDietSuccess = (diet) => ({
  type: GET_DIET_SUCCESS,
  diet,
});

const getDietFail = (error) => ({
  type: GET_DIET_FAIL,
  error,
});

export const addCard = (dateString, newCard) => {
  return (dispatch, getState) => {
    console.log(dateString, newCard);
    dispatch(addCardStart());
    const state = getState();
    if (!dateString) {
      let date = new Date();
      dateString = date.toISOString().split('T')[0];
      while (state.diet.diet && state.diet.diet.hasOwnProperty(dateString)) {
        date.setDate(date.getDate() + 1);
        dateString = date.toISOString().split('T')[0];
      }
    }
    if (!newCard) {
      newCard = {};
      categoryNames.forEach((name) => {
        newCard = { ...newCard, [name]: 'Nie wybrano posiłku.' };
      });
    }
    dietsApi
      .patch(
        `usersData/${state.auth.userId}/diet.json?auth=${state.auth.token}`,
        { [dateString]: newCard }
      )
      .then((response) => {
        dispatch(addCardSuccess(response.data));
      })
      .catch((err) => {
        if (err.response) dispatch(addCardFail(err.response.data));
        else if (Object.keys(err).length === 0) dispatch(addCardSuccess({}));
        else dispatch(addCardFail('Coś poszło nie tak'));
      });
  };
};

const addCardStart = () => ({
  type: ADD_CARD_START,
});

const addCardSuccess = (newCard) => ({
  type: ADD_CARD_SUCCESS,
  newCard,
});

const addCardFail = (error) => ({
  type: ADD_CARD_FAIL,
  error,
});

export const deleteCard = (cardDate) => {
  return (dispatch, getState) => {
    dispatch(deleteCardStart());
    const state = getState();
    dietsApi
      .delete(
        `usersData/${state.auth.userId}/diet/${cardDate}.json?auth=${state.auth.token}`
      )
      .then((response) => {
        dispatch(deleteCardSuccess(cardDate));
      })
      .catch((err) => {
        if (err.response) dispatch(deleteCardFail(err.response.data));
        else if (Object.keys(err).length === 0) dispatch(deleteCardSuccess({}));
        else dispatch(deleteCardFail('Coś poszło nie tak'));
      });
  };
};

const deleteCardStart = () => ({
  type: DELETE_CARD_START,
});

const deleteCardSuccess = (cardDate) => ({
  type: DELETE_CARD_SUCCESS,
  cardDate,
});

const deleteCardFail = (error) => ({
  type: DELETE_CARD_FAIL,
  error,
});

export const editCard = (oldDate, newDate) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(addCard(newDate, state.diet.diet[oldDate]));
    dispatch(deleteCard(oldDate));
  };
};