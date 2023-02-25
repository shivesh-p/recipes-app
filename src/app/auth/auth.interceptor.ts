import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AUTHService } from '../shared/auth.service';
import * as appState from '../store/app.reducer';
import { User } from './user.mode';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user: User = null;
  constructor(
    private authService: AUTHService,
    private store: Store<appState.AppState>
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.store.select('auth').subscribe((user) => (this.user = user.user));
    if (!this.user) {
      return next.handle(request);
    }
    const modifiedReq = request.clone({
      params: new HttpParams().set('auth', this.user.token),
    });
    return next.handle(modifiedReq);
  }
}
