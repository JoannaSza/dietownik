import {
  GET_INGRED_START,
  GET_INGRED_SUCCESS,
  GET_INGRED_FAIL,
} from './actionTypes';

import dietsApi from '../../apis/diets';

export const getIngredStart = (title) => {
  return {
    type: GET_INGRED_START,
    payload: { title },
  };
};

export const getIngredFail = (error, title) => {
  return { type: GET_INGRED_FAIL, payload: { error, title } };
};

export const getIngredSuccess = (data, title) => {
  return {
    type: GET_INGRED_SUCCESS,
    payload: {
      data,
      title,
    },
  };
};

export const getIngred = (title) => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.ingreds[title]) {
      dispatch(getIngredStart(title));

      dietsApi
        .get(`/produkty/${title}.json?`)
        .then((response) => {
          response.data
            ? dispatch(getIngredSuccess(response.data, title))
            : dispatch(getIngredFail('Brak danych o składniku', title));
        })
        .catch((err) => {
          if (err.response) dispatch(getIngredFail(err.response.data, title));
          else dispatch(getIngredFail('Coś poszło nie tak', title));
        });
    }
  };
};
