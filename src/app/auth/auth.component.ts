import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AUTHService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private authService: AUTHService, private router: Router) { }
  isLogin: boolean = true;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string;
  onSwitch() {
    this.isLogin = !this.isLogin;
  }
  submitForm(form: NgForm) {
    this.isLoading = true;
    this.errorMessage = '';
    this.isError = false;

    console.log(form.value);
    if (this.isLogin) {
      this.authService.signIn(form.value).subscribe({
        next: (v) => {
          console.log(v);
          this.isLoading = false;
          this.router.navigate(['/recipes'])
        },
        error: (err) => {
          this.isLoading = false;
          this.isError = true;
          this.errorMessage = err.message;
        }
      })

    }
    else {
      this.authService.signUp(form.value).subscribe({
        next: (v) => {
          this.router.navigate(['/recipes'])
          console.log(v); this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.isError = true;
          console.log(err.message);
          this.errorMessage = err.message;
        }
      })
      form.reset();
    }
  }
  dismissError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
