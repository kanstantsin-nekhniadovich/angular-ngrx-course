import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';

export interface IUserState {
  maskUserName: boolean;
  currentUser: User;
}

export const initialState = {
  maskUserName: false,
  currentUser: null
}

export function reducer(state = initialState, action): IUserState {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return {
        ...state,
        maskUserName: action.payload
      }
    default:
      return state;
  }
}

const getFeatureUserSelector = createFeatureSelector<IUserState>('users');

export const getMaskUserName = createSelector(
  getFeatureUserSelector,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getFeatureUserSelector,
  state => state.currentUser
);
