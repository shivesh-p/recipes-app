import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { RecipeStorageService } from './recipe-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverResolver implements Resolve<Recipe[]> {
  constructor(private recipeStorageService: RecipeStorageService, private recipeService: RecipesService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let recipes = this.recipeService.geRecipes();
    if (recipes.length === 0) {
      return this.recipeStorageService.getRecipes();
    }
    else {
      return recipes;
    }
  }
}
