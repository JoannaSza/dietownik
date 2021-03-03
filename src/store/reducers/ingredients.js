import {
  GET_INGRED_START,
  GET_INGRED_FAIL,
  GET_INGRED_SUCCESS,
} from '../actions/actionTypes';

const initialState = {};

const getIngredStart = (state, action) => {
  return {
    ...state,
    [action.payload.title]: {
      ...state[action.payload.title],
      isLoading: true,
      errorMessage: '',
    },
  };
};
const getIngredFail = (state, action) => ({
  ...state,
  [action.payload.title]: {
    ...state[action.payload.title],
    isLoading: false,
    errorMessage: action.payload.error,
  },
});

const getIngredSuccess = (state, action) => ({
  ...state,
  [action.payload.title]: {
    ...state[action.payload.title],
    isLoading: false,
    foundTitle: action.payload.foundTitle,
    data: action.payload.data,
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGRED_START:
      return getIngredStart(state, action);
    case GET_INGRED_FAIL:
      return getIngredFail(state, action);
    case GET_INGRED_SUCCESS:
      return getIngredSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
