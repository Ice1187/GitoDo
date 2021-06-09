import {LOGIN_SUCCESS} from '../actions/loginAction'
import {HYDRATE} from 'next-redux-wrapper';

const loginReducer = (state = {userId: -1}, action) => {
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action.userId};
    case LOGIN_SUCCESS:
      return {...state, userId: action.userId};
    default:
      return {...state};
  }
};

export default loginReducer;