import {HYDRATE} from 'next-redux-wrapper';
import {REHYDRATE} from 'redux-persist';
import {
  START_LOADING,
  END_LOADING,
  END_LIST_BRANCH,
  END_LIST_ALL_CLEAR,
  END_LIST_ALL_MORE,
} from '../actions/branchActions'

const initialMainBranchState = {
  mainLine: null,
  branchLoading: false,
  allLine: [{_id: '0'}],
}

const branchReducer = (state = initialMainBranchState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {...state};
    case REHYDRATE:
      return {...state};
    case START_LOADING:
      return {...state, branchLoading: true};
    case END_LOADING:
      return {...state, branchLoading: false};
    case END_LIST_BRANCH:
      return {...state, mainLine: action.mainLine};
    case END_LIST_ALL_CLEAR:
      return {...state, allLine: [{_id: '0'}]};
    case END_LIST_ALL_MORE:
      return {...state, allLine: [...state.allLine, {Line:action.allLine, owner:action.owner, mother:action.mother}]};
    default:
      return {...state};
  }
};

export default branchReducer;