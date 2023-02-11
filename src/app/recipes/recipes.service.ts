import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  id: number = 2;
  private recipes: Recipe[] = [
    new Recipe(1,
      'R1',
      'Re Dsec',
      'https://www.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg'
      , [
        new Ingredient('Apple', 10),
        new Ingredient('Oranges', 10)

      ]),
    new Recipe(2,
      'R11',
      'Re1 Dsec',
      'https://www.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg'
      , [
        new Ingredient('Lemons', 3),
        new Ingredient('Red', 1)
      ]),
  ];
  public recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  constructor(private shoppingService: ShoppingListService) { }
  geRecipes() {
    return this.recipes.slice();
  }
  getRecipeById({ id }: { id: number; }): Recipe {
    return this.recipes.filter((obj) => obj.id
      == id)[0];
  }
  onRecipeSelected(recipe: Recipe): void {
    debugger;

    this.recipeSelected.emit(recipe);
  }
  onAddToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addBulkIngredients(ingredients);
  }
}
