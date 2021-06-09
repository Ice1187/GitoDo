export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = (userId) => ({
  type: LOGIN_SUCCESS,
  userId
});