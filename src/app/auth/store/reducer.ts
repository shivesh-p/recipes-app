import { User } from '../user.mode';
import { AuthStoreActions } from './index';
import { State, initialState } from './state';

export function authReducer(
  state = initialState,
  action: AuthStoreActions.AuthActions
): State {
  switch (action.type) {
    case AuthStoreActions.LOGIN: {
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        // return new class state
        ...state,
        user,
      };
    }
    case AuthStoreActions.LOGOUT: {
      return {
        // return new class state
        ...state,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
}
