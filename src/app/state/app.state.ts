import { IUserState } from '../user/state/user.reducer';

export interface IAppState {
  user: IUserState;
}