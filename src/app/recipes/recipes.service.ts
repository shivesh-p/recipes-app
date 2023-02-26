import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  id: number = 2;
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>;
  // private recipes: Recipe[] = [
  //   new Recipe(1,
  //     'Recipe 1',
  //     'Re Desc 1',
  //     'https://www.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg'
  //     , [
  //       new Ingredient('Apple', 10),
  //       new Ingredient('Oranges', 12)
  //     ]),
  //   new Recipe(2,
  //     'Recipe 2',
  //     'Re Desc 2',
  //     'https://www.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg'
  //     , [
  //       new Ingredient('Lemons', 13),
  //       new Ingredient('Red', 11)
  //     ]),
  // ];
  private recipes: Recipe[] = [];
  constructor(private shoppingService: ShoppingListService) { }
  geRecipes() {
    return this.recipes.slice();
  }
  setRecipes(recipes: Recipe[]) {
    // this.recipes = recipes;
    // this.recipesChanged.next(this.recipes.slice());
  }
  getRecipeById(id: number): Recipe {
    return this.recipes.filter((obj) => obj.id
      == id)[0];
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addBulkIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.id = this.id + 1;
    recipe.id = this.id;
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }
  updateRecipe(ind: number, recipe: Recipe) {
    let editRecipe = this.recipes.filter((v) => v.id == ind)[0];
    editRecipe.name = recipe.name;
    editRecipe.desc = recipe.desc;
    editRecipe.imagePath = recipe.imagePath;
    editRecipe.ingredients = recipe.ingredients;
    this.recipesChanged.next(this.recipes.slice());

  }
  deleteRecipeById(id: number) {
    debugger;
    this.recipes = this.recipes.filter((v) => v.id !== id);
    this.recipesChanged.next(this.recipes.slice());
  }
}
