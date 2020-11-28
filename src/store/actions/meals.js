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

export const getMeals = (category, query) => {
  return (dispatch) => {
    dispatch(getMealsStart());
    let apiQuery;

    if (query)
      apiQuery = `/przepisy/${category}.json?orderBy="$key"&startAt="${query}"`;
    else apiQuery = `/przepisy/${category}.json?shallow=true`;

    dietsApi //here add config to choose records from data for pagination
      .get(apiQuery)
      //startAt, limit, orderBy
      .then((response) => {
        const titles = Object.keys(response.data);
        dispatch(getMealsSuccess(titles));
      })
      .catch((err) => {
        if (err.response) dispatch(getMealsFail(err.response.data));
        else dispatch(getMealsFail('Coś poszło nie tak'));
      });
  };
};
