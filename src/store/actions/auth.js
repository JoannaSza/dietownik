import {
  AUTH_INIT,
  SET_NOTLOGOUT,
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  RESET_PSWD_START,
  RESET_PSWD_FAIL,
  RESET_PSWD_SUCCESS,
  CLEAR_ERROR,
} from './actionTypes';
import { methods, authAPI } from '../../apis/auth';
import {
  browserStorageGet,
  browserStorageRemove,
  browserStorageSave,
} from './authStorageHelper';

export const authInitStart = () => {
  return (dispatch) => {
    const storageData = browserStorageGet(['notLogout'], 'local');
    const browserStorageArea = storageData.notLogout ? 'local' : 'session';
    const authData = browserStorageGet(
      ['token', 'expirationDate', 'userId'],
      browserStorageArea
    );
    authData['notLogout'] = storageData.notLogout === 'true';
    let gAuth;
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: `${process.env.REACT_APP_GAPI}`,
          scope: 'email',
        })
        .then(() => {
          gAuth = window.gapi.auth2.getAuthInstance();
          dispatch(authInit(gAuth, authData));
        });
    });
  };
};

export const authInit = (gAuth, authData) => {
  return {
    type: AUTH_INIT,
    gAuth,
    authData,
  };
};

export const setNotLogout = (value) => {
  browserStorageSave({ notLogout: value }, 'local');
  return {
    type: SET_NOTLOGOUT,
    value,
  };
};

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
  return (dispatch, getState) => {
    browserStorageRemove(['token', 'expirationDate'], 'local');
    browserStorageRemove(['token', 'expirationDate'], 'session');
    const state = getState('auth');
    state.auth.gAuth.signOut();
    dispatch(logoutCont());
  };
};

export const logoutCont = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (user, password, method) => {
  return (dispatch, getState) => {
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
        // later - add email verification : https://firebase.google.com/docs/reference/rest/auth?hl=en#section-send-email-verification
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
        const state = getState('auth');
        const browserStorageArea = state.auth.notLogout ? 'local' : 'session';
        browserStorageSave(
          {
            token: response.data.idToken,
            expirationDate: expirationDate,
            userId: response.data.localId,
          },
          browserStorageArea
        );
        dispatch(
          authSuccess(
            response.data.idToken,
            response.data.localId,
            response.data.refreshToken
          )
        );
      })
      .catch((err) => {
        if (err) console.log(err);
        if (err.response) {
          console.log(err.response.data.error.message);
          dispatch(authFail(err.response.data.error.message));
        } else dispatch(authFail('Login failed'));
      });
  };
};

const gAuthGetToken = (auth) => {
  const user = auth.currentUser.get();
  return user.getAuthResponse().id_token;
};

export const gauth = () => {
  return (dispatch, getState) => {
    dispatch(authStart());
    // 1. check if signedIn
    const state = getState('auth');
    const isSignedIn = state.auth.gAuth.isSignedIn.get();
    if (!isSignedIn) {
      state.auth.gAuth
        .signIn()
        .then(() =>
          dispatch(auth(gAuthGetToken(state.auth.gAuth), '', 'google'))
        )
        .catch((err) => dispatch(authFail(err)));
    } else dispatch(auth(gAuthGetToken(state.auth.gAuth), '', 'google'));
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
