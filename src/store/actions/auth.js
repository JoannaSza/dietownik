import {
	AUTH_INIT,
	AUTH_START,
	AUTH_FAIL,
	AUTH_SUCCESS,
	AUTH_LOGOUT,
	AUTH_LOGOUT_END,
	RESET_PSWD_START,
	RESET_PSWD_FAIL,
	RESET_PSWD_SUCCESS,
	CLEAR_ERROR,
} from "./actionTypes";
import { methods, authAPI } from "../../apis/auth";

export const authInitStart = () => {
	return (dispatch) => {
		let gAuth;
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId: `${process.env.REACT_APP_GAPI}`,
					scope: "email",
				})
				.then(() => {
					gAuth = window.gapi.auth2.getAuthInstance();
					dispatch(authInit(gAuth));
				});
		});
	};
};

export const authInit = (gAuth) => {
	return {
		type: AUTH_INIT,
		gAuth,
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
		const state = getState("auth");
		state.auth.gAuth.signOut();
		dispatch(logoutCont());
	};
};

export const logoutCont = () => {
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
			case "login":
			case "signup":
				authData = {
					email: user,
					password: password,
					returnSecureToken: true,
				};
				break;
			case "google":
				authData = {
					postBody: `id_token=${user}&providerId=google.com`,
					requestUri: "http://localhost:3000",
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
				localStorage.setItem("token", response.data.idToken);
				localStorage.setItem("expirationDate", expirationDate);

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

const gAuthGetToken = (auth) => {
	const user = auth.currentUser.get();
	return user.getAuthResponse().id_token;
};

export const gauth = () => {
	return (dispatch, getState) => {
		dispatch(authStart());
		// 1. check if signedIn
		const state = getState("auth");
		const isSignedIn = state.auth.gAuth.isSignedIn.get();
		console.log(isSignedIn);
		if (!isSignedIn) {
			state.auth.gAuth
				.signIn()
				.then(() =>
					dispatch(auth(gAuthGetToken(state.auth.gAuth), "", "google"))
				)
				.catch((err) => dispatch(authFail(err)));
		} else dispatch(auth(gAuthGetToken(state.auth.gAuth), "", "google"));
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
			requestType: "PASSWORD_RESET",
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
