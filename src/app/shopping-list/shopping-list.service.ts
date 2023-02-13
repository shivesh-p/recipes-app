import { Ingredient } from '../shared/ingredient.model';
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  ingredientEditClick = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 4),
  ];
  constructor() { }
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredientsByIndex(ind: number) {
    return this.ingredients[ind];
  }
  editIngredients(index: number, ingredient: Ingredient) {
    this.ingredients[index] = (ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addBulkIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
