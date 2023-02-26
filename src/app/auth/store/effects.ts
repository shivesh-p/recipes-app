import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {
  AUTHService,
  ResponseData,
  loginData,
} from 'src/app/shared/auth.service';
import { User } from '../user.mode';
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

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AUTHService
  ) {}

  handleAuthentication = (respData: ResponseData) => {
    const expirationDate = new Date(
      new Date().getTime() + +respData.expiresIn * 1000
    );
    const userData = new User(
      respData.email,
      respData.localId,
      respData.idToken,
      expirationDate
    );

    localStorage.setItem('user', JSON.stringify(userData));
    this.authService.setLogoutTimer(+respData.expiresIn * 1000);
    return new AuthActions.Login({
      email: respData.email,
      userId: respData.localId,
      token: respData.idToken,
      expirationDate: expirationDate,
      redirect: true,
    });
  };
  handleError = (errorResponse: HttpErrorResponse) => {
    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return of(new AuthActions.LoginError({ error: errorMessage }));
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Uh huh! Please check your password.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
      default:
        errorMessage = errorResponse.error.error.message;
    }

    return of(new AuthActions.LoginError({ error: errorMessage }));
  };
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
              return this.handleAuthentication(respData);
            }),
            catchError((errorResponse) => {
              return this.handleError(errorResponse);
            })
          );
      })
    )
  );
  authLogout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        /** An EMPTY observable only emits completion. Replace with your own observable stream */
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('user');
          this.router.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );
  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap((authData: AuthActions.Login) => {
          if (authData.payload.redirect) this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((authData: AuthActions.SignUpStart) => {
        return this.http
          .post<ResponseData>(this.baseSignUpUrl, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          })
          .pipe(
            map((respData: loginData) => {
              return this.handleAuthentication(respData);
            }),
            catchError((errorResponse) => {
              return this.handleError(errorResponse);
            })
          );
      })
    )
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      /** An EMPTY observable only emits completion. Replace with your own observable stream */
      map(() => {
        const user: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          return { type: 'default' };
        }

        const loggedInUser = new User(
          user.email,
          user.id,
          user._token,
          new Date(user._tokenExpirationDate)
        );
        if (loggedInUser.token) {
          //this.userSubject.next(loggedInUser);
          const expirationDuration =
            new Date(loggedInUser._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return new AuthActions.Login({
            email: loggedInUser.email,
            userId: loggedInUser.id,
            token: loggedInUser.token,
            expirationDate: new Date(user._tokenExpirationDate),
            redirect: false,
          });
        }
        return { type: 'default' };
      })
    );
  });
}
