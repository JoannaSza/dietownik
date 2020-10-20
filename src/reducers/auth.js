import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  RESET_PSWD_FAIL,
  RESET_PSWD_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  token: null,
  refreshToken: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, error: null, loading: true };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        refreshToken: action.refreshToken,
        error: null,
        loading: false,
      };
    case AUTH_FAIL:
      return { ...state, error: action.error, loading: false };

    default:
      return state;
  }
};

export default reducer;
