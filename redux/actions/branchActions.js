import {
  getMainLine,
} from '../../api/line';


export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const END_LIST_BRANCH = 'END_LIST_BRANCH';
export const END_LIST_ALL_CLEAR = 'END_LIST_ALL_Clear';
export const END_LIST_ALL_MORE = 'END_LIST_ALL_MORE';

/* branch */

export const startLoading = () => ({
  type: START_LOADING
})

export const endLoading = () => ({
  type: END_LOADING
})

export const endListMainBranch = (mainLine) => ({
  type: END_LIST_BRANCH,
  mainLine
})

export const endListAllLineClear = () => ({
  type: END_LIST_ALL_CLEAR,
})

export const endListAllLineMore = (allLine, owner, mother) => ({
  type: END_LIST_ALL_MORE,
  allLine, 
  owner,
  mother
})

export function listMainBranch (userId) {
  return (dispatch) => {
    dispatch(startLoading());
    return getMainLine(userId).then(branch => {
        dispatch(endListMainBranch(branch));
    }).catch(err => {
        console.error('Error listing branches', err);
    }).then(() => {
        dispatch(endLoading())
    });
  };
}

export function listAllLine_more (allLine, owner, mother) {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(endListAllLineMore(allLine, owner, mother));
    dispatch(endLoading());
  };
}