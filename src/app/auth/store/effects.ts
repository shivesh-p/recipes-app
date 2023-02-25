import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loginData } from 'src/app/shared/auth.service';
import * as AuthActions from './actions';
@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  baseApiKey = '  AIzaSyDWMURhm4lKmZKWAkF4KotsJEKqTvcoTQk';
  baseSignUpUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
    this.baseApiKey;
  baseSignInUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    this.baseApiKey;

  constructor(private actions$: Actions, private http: HttpClient) {}

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<loginData>(this.baseSignInUrl, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          })
          .pipe(
            map((respData: loginData) => {
              const expirationDate = new Date(
                new Date().getTime() + +respData.expiresIn * 1000
              );
              return new AuthActions.Login({
                email: respData.email,
                userId: respData.localId,
                token: respData.idToken,
                expirationDate: expirationDate,
              });
            }),
            catchError((error) =>
              of(
                new AuthActions.LoginError({ locationData: null, error: error })
              )
            )
          );
      })
    )
  );
}
