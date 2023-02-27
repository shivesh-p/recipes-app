import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import * as RecipeActions from '../recipes/store/actions';
import * as appState from '../store/app.reducer';
@Injectable({
  providedIn: 'root',
})
export class RecipeStorageService {
  baseUrl: string =
    'https://recipebook-7fa89-default-rtdb.firebaseio.com/recipes.json';
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private store: Store<appState.AppState>
  ) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipe) => {
        this.store.dispatch(new RecipeActions.SetRecipes(recipe));
        //this.recipeService.setRecipes(recipe);
      })
    );
  }

  addAllRecipe() {
    let recipes = this.recipeService.geRecipes(); 
    return this.http.put(this.baseUrl, recipes);
  }
}
