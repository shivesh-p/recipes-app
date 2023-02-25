import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { AUTHService } from '../shared/auth.service';
import * as appState from '../store/app.reducer';
import * as AuthActions from './store/actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(
    private authService: AUTHService,
    private router: Router,
    private store: Store<appState.AppState>
  ) {}
  isLogin: boolean = true;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string;
  alertSubscription: Subscription;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  onSwitch() {
    this.isLogin = !this.isLogin;
  }
  submitForm(form: NgForm) {
    this.isLoading = true;
    this.errorMessage = '';
    this.isError = false;

    //console.log(form.value);
    if (this.isLogin) {
      // this.authService.signIn(form.value).subscribe({
      //   next: (v) => {
      //     console.log(v);
      //     this.isLoading = false;
      //     this.router.navigate(['/recipes']);
      //   },
      //   error: (err) => {
      //     this.isLoading = false;
      //     this.isError = true;
      //     this.errorMessage = err.message;
      //     this.showAlert(this.errorMessage);
      //   },
      // });
      this.store.dispatch(new AuthActions.LoginStart(form.value));
    } else {
      this.authService.signUp(form.value).subscribe({
        next: (v) => {
          this.router.navigate(['/recipes']);
          console.log(v);
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.isError = true;
          console.log(err.message);
          this.errorMessage = err.message;
          this.showAlert(this.errorMessage);
        },
      });
      form.reset();
    }
  }
  dismissError() {
    this.isError = false;
    this.errorMessage = '';
  }

  private showAlert(message: string) {
    this.container.clear();
    const alertRef = this.container.createComponent(AlertComponent);
    alertRef.setInput('message', message);
    this.alertSubscription = alertRef.instance.closed.subscribe((v) => {
      this.alertSubscription.unsubscribe();
      alertRef.destroy();
    });
  }
}
