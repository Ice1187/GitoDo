export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// should add now login status and login failed

export const loginSuccess = (userId) => ({
  type: LOGIN_SUCCESS,
  userId
});