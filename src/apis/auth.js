import axios from 'axios';

export const authAPI = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/`,
  params: {
    key: process.env.REACT_APP_API,
  },
});

export const methods = {
  login: 'accounts:signInWithPassword',
  signup: 'accounts:signUp',
  resetPassword: 'accounts:sendOobCode',
  google: 'accounts:signInWithIdp',
  token: 'token',
};
