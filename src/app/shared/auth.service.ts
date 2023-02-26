import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/actions';
import * as appState from '../store/app.reducer';
export class PostData {
  public email: string;
  public password: string;
  public returnSecureToken: boolean = true;
}
export interface ResponseData {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}
export interface loginData {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}
@Injectable({
  providedIn: 'root',
})
export class AUTHService {
  private expirationTokenTimer: any;
  constructor(private store: Store<appState.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.expirationTokenTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.expirationTokenTimer) {
      clearTimeout(this.expirationTokenTimer);
      this.expirationTokenTimer = null;
    }
  }
}
