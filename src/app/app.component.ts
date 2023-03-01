import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/actions';
import * as appState from './store/app.reducer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private store: Store<appState.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.authService.autoLogin();
    /*
      since localStorage is a browser only API so , to access localStorage in
       auto login it will fail if server side rendering is used , we use it only 
       when browser only angular runs.
     */
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
  }
}
