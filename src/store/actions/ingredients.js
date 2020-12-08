import {
  GET_INGRED_START,
  GET_INGRED_SUCCESS,
  GET_INGRED_FAIL,
} from './actionTypes';

import dietsApi from '../../apis/diets';

export const getIngredStart = () => {
  return {
    type: GET_INGRED_START,
  };
};

export const getIngredFail = (error) => {
  return { type: GET_INGRED_FAIL, error };
};

export const getIngredSuccess = (data) => {
  return { type: GET_INGRED_SUCCESS, data };
};

export const getIngred = (title) => {
  return (dispatch) => {
    dispatch(getIngredStart());

    dietsApi //here add config to choose records from data for pagination
      .get(`/produkty/${title}.json?`)
      //startAt, limit, orderBy
      .then((response) => {
        dispatch(getIngredSuccess(response.data));
      })
      .catch((err) => {
        if (err.response) dispatch(getIngredFail(err.response.data));
        else dispatch(getIngredFail('Coś poszło nie tak'));
      });
  };
};
