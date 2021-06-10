import {HYDRATE} from 'next-redux-wrapper';
import {REHYDRATE} from 'redux-persist';
import {
  START_LOADING,
  END_LOADING,
  END_LIST_BRANCH
} from '../actions/branchActions'

const initialMainBranchState = {
  mainLine: [],
  branchLoading: false
}

const branchReducer = (state = initialMainBranchState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action.mainLine};
    case REHYDRATE:
      return {...state, ...action.mainLine};
    case START_LOADING:
      return {...state, branchLoading: true};
    case END_LOADING:
      return {...state, branchLoading: false};
    case END_LIST_BRANCH:
      return {...state, mainLine: [action.mainLine]};
    default:
      return {...state};
  }
};

export default branchReducer;