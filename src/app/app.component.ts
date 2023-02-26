import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/actions';
import * as appState from './store/app.reducer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store: Store<appState.AppState>) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.authService.autoLogin();

    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
