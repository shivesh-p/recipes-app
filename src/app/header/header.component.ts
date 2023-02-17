import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AUTHService } from '../shared/auth.service';
import { RecipeStorageService } from '../shared/recipe-storage.service';
import { RecipesService } from './../recipes/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userSubscription: Subscription;
  isAuthenticated: boolean = false
  constructor(private recipeStorage: RecipeStorageService,
    private recipeService: RecipesService,
    private authService: AUTHService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.userSubject.subscribe((user) => {
      debugger;
      this.isAuthenticated = !!user;
      console.log(user);
      console.log(!user);
      console.log(!!user);
    })
  }
  getAllRecipes() {
    this.recipeStorage.getRecipes().subscribe(t => {
      this.recipeService.setRecipes(t);
    });
  }
  saveAllRecipes() {
    this.recipeStorage.addAllRecipe().subscribe((v) => {
    });
  }
  onLogout() {
    this.authService.userSubject.next(null);
    localStorage.removeItem("user");
    this.router.navigate(['/auth']);
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
