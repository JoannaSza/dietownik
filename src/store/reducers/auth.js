import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_LOGOUT_END,
  RESET_PSWD_START,
  RESET_PSWD_FAIL,
  RESET_PSWD_SUCCESS,
  CLEAR_ERROR,
} from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  refreshToken: null,
  userId: null,
  error: null,
  loading: false,
  actionSuccess: false,
  logout: false,
};

const authStart = (state) =>
  updateObject(state, { error: null, loading: true, logout: false });

const authSuccess = (state, action) =>
  updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    refreshToken: action.refreshToken,
    error: null,
    loading: false,
  });

const authFail = (state, action) =>
  updateObject(state, { error: action.error, loading: false });

const authLogout = (state) =>
  updateObject(state, {
    token: null,
    refreshToken: null,
    userId: null,
    logout: true,
  });

const authLogoutEnd = (state) =>
  updateObject(state, {
    logout: false,
  });

const resetPswdStart = (state) =>
  updateObject(state, { error: null, loading: true, actionSuccess: false });

const resetPswdSuccess = (state) =>
  updateObject(state, { error: null, loading: false, actionSuccess: true });

const resetPswdFail = (state, action) =>
  updateObject(state, {
    error: action.error,
    loading: false,
    actionSuccess: false,
  });

const clearError = (state) =>
  updateObject(state, { error: '', loading: false, actionSuccess: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state);
    case AUTH_LOGOUT_END:
      return authLogoutEnd(state);
    case RESET_PSWD_START:
      return resetPswdStart(state);
    case RESET_PSWD_SUCCESS:
      return resetPswdSuccess(state);
    case RESET_PSWD_FAIL:
      return resetPswdFail(state, action);
    case CLEAR_ERROR:
      return clearError(state);
    default:
      return state;
  }
};

export default reducer;
