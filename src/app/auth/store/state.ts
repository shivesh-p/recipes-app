import { User } from '../user.mode';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null,
};
