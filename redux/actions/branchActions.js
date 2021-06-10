import {
  getMainLine,
} from '../../api/line';


export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const END_LIST_BRANCH = 'END_LIST_BRANCH';

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