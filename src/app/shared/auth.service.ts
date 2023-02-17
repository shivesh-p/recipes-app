import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../auth/user.mode';

export class PostData {
  public email: string;
  public password: string;
  public returnSecureToken?: boolean = true;
}
export interface ResponseData {
  localId: string
  email: string
  displayName: string
  idToken: string,
  registered: boolean
  refreshToken: string
  expiresIn: string
}
export interface loginData {
  kind: string;
  localId: string,
  email: string,
  displayName: string,
  idToken: string,
  registered: boolean,
  refreshToken: string
  expiresIn: string
}
@Injectable({
  providedIn: 'root',
})
export class AUTHService {
  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  baseApiKey = '  AIzaSyDWMURhm4lKmZKWAkF4KotsJEKqTvcoTQk';
  baseSignupUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
    this.baseApiKey;
  baseSigninUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    this.baseApiKey;

  constructor(private http: HttpClient) { }

  signUp(data: PostData) {
    return this.http.post<ResponseData>(this.baseSignupUrl, data).pipe(
      catchError(this.handleError),
      tap(respData => {
        this.handleAuthentication(respData.email, respData.localId, respData.expiresIn, respData.idToken,);

      }
      )
    )
  }

  signIn(data: PostData) {
    return this.http.post<loginData>(this.baseSigninUrl, data).pipe(
      catchError(this.handleError),
      tap(respData => {
        debugger;
        console.log(respData);
        this.handleAuthentication(respData.email, respData.localId, respData.expiresIn, respData.idToken,);
      }),
    );

  }
  handleError(errorResponse) {
    debugger;
    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => {
        const error: any = new Error(errorMessage);
        error.timestamp = Date.now();
        return error;
      });
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Uh huh! Please check your password.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.'
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.'
        break;
      default:
        errorMessage = errorResponse.error.error.message;
    }
    return throwError(() => {
      const error: any = new Error(errorMessage);
      error.timestamp = Date.now();
      return error;
    });
  }
  handleAuthentication(email: string, localId: string, expiresIn: string, idToken: string) {
    debugger;
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
    const userData = new User(email, localId, idToken, expirationDate);
    this.userSubject.next(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  autoLogin() {
    const user: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return;
    }
    else {
      const loggedInUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate))
      //if (loggedInUser.token)
      this.userSubject.next(loggedInUser);
    }
  }
}
