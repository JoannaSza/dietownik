import {
	AUTH_START,
	AUTH_FAIL,
	AUTH_SUCCESS,
	RESET_PSWD_FAIL,
	RESET_PSWD_SUCCESS,
} from "./actionTypes";
import { methods, authAPI } from "../apis/auth";

export const authStart = () => {
	return {
		type: AUTH_START,
	};
};

export const authSuccess = (authData) => {
	return {
		type: AUTH_SUCCESS,
		authData: authData,
	};
};

export const authFail = (error) => {
	return {
		type: AUTH_FAIL,
		error: error,
	};
};

export const auth = (user, password, method) => {
	return (dispatch) => {
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
				dispatch(authSuccess(response.data));
			})
			.catch((err) => {
				console.log(err.response.data.error.message);
				dispatch(authFail(err));
			});
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
		const resetPswdData = {
			requestType: "PASSWORD_RESET",
			email: email,
		};

		authAPI
			.post(methods.resetPassword, resetPswdData)
			.then((response) => {
				console.log(response);
				dispatch(resetPswdSuccess(response.data));
			})
			.catch((err) => {
				console.log(err.response.data.error.message);
				dispatch(resetPswdFail(err));
			});
	};
};
