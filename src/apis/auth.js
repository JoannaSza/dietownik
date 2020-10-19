import axios from 'axios';

const key = 'AIzaSyCA0tBaYVU8gSXMQEw0Mh3w_s-a2eP1obs';

export const authAPI = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/`,
  params: {
    key: key,
  },
});

export const methods = {
  login: 'accounts:signInWithPassword',
  signup: 'accounts:signUp',
  resetPassword: 'accounts:sendOobCode',
  google: 'accounts:signInWithIdp',
};
