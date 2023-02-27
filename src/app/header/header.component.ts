import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthActions from '../auth/store/actions';
import * as recipeActions from '../recipes/store/actions';
import * as appState from '../store/app.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userSubscription: Subscription;
  isAuthenticated: boolean = false;
  constructor(
    private router: Router,
    private store: Store<appState.AppState>
  ) {}

  ngOnInit() {
    this.userSubscription = this.store.select('auth').subscribe((user) => {
      this.isAuthenticated = !!user.user;
    });
  }
  getAllRecipes() {
    // this.recipeStorage.getRecipes().subscribe((t) => {
    //   //this.recipeService.setRecipes(t);
    // });
    this.store.dispatch(new recipeActions.FetchRecipes());
  }
  saveAllRecipes() {
    //this.recipeStorage.addAllRecipe().subscribe((v) => {});
    this.store.dispatch(new recipeActions.SaveRecipes());
  }
  onLogout() {
    //this.authService.userSubject.next(null);
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
