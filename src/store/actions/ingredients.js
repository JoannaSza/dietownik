import {
  GET_INGRED_START,
  GET_INGRED_SUCCESS,
  GET_INGRED_FAIL,
} from './actionTypes';
import data from '../../database/produkty.json';
import Fuse from 'fuse.js';

export const getIngredStart = (title) => {
  return {
    type: GET_INGRED_START,
    payload: { title },
  };
};

export const getIngredFail = (error, title) => {
  return { type: GET_INGRED_FAIL, payload: { error, title } };
};

export const getIngredSuccess = (data, title, foundTitle) => {
  return {
    type: GET_INGRED_SUCCESS,
    payload: {
      data,
      title,
      foundTitle,
    },
  };
};

export const getIngredBody = (title) => {
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    minMatchCharLength: 3,
    // location: 0,
    threshold: 0.4,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: [],
  };

  const fuse = new Fuse(Object.keys(data), options);

  const hits = fuse.search(title);
  //console.log(hits);
  if (hits.length > 0 && hits[0].score < 0.008 && hits[0].score > 0)
    return [data[hits[0].item], title, hits[0].item];
  //data, title, foundTitle
  else if (hits.length > 0 && hits[0].score === 0)
    //perfect match
    return [data[hits[0].item], title, hits[0].item];
  else return null;
};

export const getIngred = (title) => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.ingreds[title]) {
      dispatch(getIngredStart(title));
      ///version for products storage in local file
      const ingredientData = getIngredBody(title);
      if (ingredientData) dispatch(getIngredSuccess(...ingredientData));
      else dispatch(getIngredFail('Brak danych o składniku', title));

      ////// version for products storage in database
      // dietsApi
      //   .get(`/produkty/${title}.json?`)
      //   .then((response) => {
      //     response.data
      //       ? dispatch(getIngredSuccess(response.data, title))
      //       : dispatch(getIngredFail('Brak danych o składniku', title));
      //   })
      //   .catch((err) => {
      //     if (err.response) dispatch(getIngredFail(err.response.data, title));
      //     else dispatch(getIngredFail('Coś poszło nie tak', title));
      //   });
    }
  };
};
