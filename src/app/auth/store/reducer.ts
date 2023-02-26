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
        loading: false,
      };
    }
    case AuthStoreActions.LOGOUT: {
      return {
        // return new class state
        ...state,
        user: null,
        loading: false,
      };
    }
    case AuthStoreActions.LOGIN_START: {
      return {
        ...state,
        authError: null,
        loading: true,
      };
    }
    case AuthStoreActions.SIGNUP_START: {
      return {
        ...state,
        user: null,
        authError: null,
        loading: true,
      };
    }
    case AuthStoreActions.LOGIN_ERROR: {
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload.error,
      };
    }
    case AuthStoreActions.AUTO_LOGIN: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
}
