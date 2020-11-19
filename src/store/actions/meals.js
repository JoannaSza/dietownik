import {
  GET_MEALS_START,
  GET_MEALS_SUCCESS,
  GET_MEALS_FAIL,
} from './actionTypes';
import dietsApi from '../../apis/diets';

export const getMealsStart = () => {
  return {
    type: GET_MEALS_START,
  };
};

export const getMealsFail = (error) => {
  return { type: GET_MEALS_FAIL, error };
};

export const getMealsSuccess = (mealsData) => {
  return { type: GET_MEALS_SUCCESS, mealsData };
};

export const getMeals = (category) => {
  return (dispatch) => {
    dispatch(getMealsStart());
    dietsApi //here add config to choose records from data for pagination
      .get(`/przepisy/${category}.json?shallow=true&print=pretty`)
      //startAt, limit, orderBy
      .then((response) => {
        const titles = Object.keys(response.data);
        dispatch(getMealsSuccess(titles));
      })
      .catch((error) => {
        dispatch(getMealsFail(error.response.data));
      });
  };
};
