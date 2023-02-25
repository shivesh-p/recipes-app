import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] LOGIN START';
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const LOGIN_ERROR = '[Auth] LOGIN_ERROR';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}
export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}
export class LoginError implements Action {
  readonly type = LOGIN_ERROR;

  constructor(readonly payload: { locationData: null; error: string }) {}
}
export type AuthActions = Login | Logout | LoginError | LoginStart;
