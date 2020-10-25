import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  RESET_PSWD_START,
  RESET_PSWD_FAIL,
  RESET_PSWD_SUCCESS,
  CLEAR_ERROR,
} from '../actions/actionTypes';

const initialState = {
  token: null,
  refreshToken: null,
  userId: null,
  error: null,
  loading: false,
  actionSuccess: false,
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
    case RESET_PSWD_START:
      return { ...state, error: null, loading: true, actionSuccess: false };
    case RESET_PSWD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        actionSuccess: true,
      };
    case RESET_PSWD_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        actionSuccess: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: '',
        loading: false,
        actionSuccess: false,
      };
    default:
      return state;
  }
};

export default reducer;
