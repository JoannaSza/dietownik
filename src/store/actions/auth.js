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
} from './actionTypes';
import { methods, authAPI } from '../../apis/auth';

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, userId, refreshToken) => {
  return {
    type: AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    refreshToken: refreshToken,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const logoutEnd = () => {
  return { type: AUTH_LOGOUT_END };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (user, password, method) => {
  return (dispatch) => {
    dispatch(authStart());
    let authData = {};
    switch (method) {
      case 'login':
      case 'signup':
        authData = {
          email: user,
          password: password,
          returnSecureToken: true,
        };
        break;
      case 'google':
        authData = {
          postBody: `id_token=${user}&providerId=google.com`,
          requestUri: 'http://localhost:3000',
          returnIdpCredential: true,
          returnSecureToken: true,
        };
        break;
      default:
        break;
    }

    authAPI
      .post(methods[method], authData)
      .then((response) => {
        console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(
          authSuccess(
            response.data.idToken,
            response.data.localId,
            response.data.refreshToken
          )
        );
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
        dispatch(authFail(err.response.data.error.message));
      });
  };
};

export const resetPswdStart = () => {
  return {
    type: RESET_PSWD_START,
  };
};

export const resetPswdSuccess = (resetPswdData) => {
  return {
    type: RESET_PSWD_SUCCESS,
    resetPswdData: resetPswdData,
  };
};

export const resetPswdFail = (error) => {
  return {
    type: RESET_PSWD_FAIL,
    error: error,
  };
};

export const resetPswd = (email) => {
  return (dispatch) => {
    dispatch(resetPswdStart());
    const resetPswdData = {
      requestType: 'PASSWORD_RESET',
      email: email,
    };

    authAPI
      .post(methods.resetPassword, resetPswdData)
      .then((response) => {
        dispatch(resetPswdSuccess(response.data));
      })
      .catch((err) => {
        dispatch(resetPswdFail(err.response.data.error.message));
      });
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
