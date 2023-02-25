import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthActions from '../auth/store/actions';
import { AUTHService } from '../shared/auth.service';
import { RecipeStorageService } from '../shared/recipe-storage.service';
import * as appState from '../store/app.reducer';
import { RecipesService } from './../recipes/recipes.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userSubscription: Subscription;
  isAuthenticated: boolean = false;
  constructor(
    private recipeStorage: RecipeStorageService,
    private recipeService: RecipesService,
    private authService: AUTHService,
    private router: Router,
    private store: Store<appState.AppState>
  ) {}

  ngOnInit() {
    this.userSubscription = this.store.select('auth').subscribe((user) => {
      this.isAuthenticated = !!user.user;
    });
  }
  getAllRecipes() {
    this.recipeStorage.getRecipes().subscribe((t) => {
      this.recipeService.setRecipes(t);
    });
  }
  saveAllRecipes() {
    this.recipeStorage.addAllRecipe().subscribe((v) => {});
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
