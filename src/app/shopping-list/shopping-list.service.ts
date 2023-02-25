import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from '../shared/ingredient.model';
import * as appState from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.action';
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
  constructor(private store: Store<appState.AppState>) { }
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredientsByIndex(ind: number) {
    return this.ingredients[ind];
  }
  editIngredients(index: number, ingredient: Ingredient) {
    // this.ingredients[index] = (ingredient);
    // this.ingredientChanged.next(this.ingredients.slice());
    this.store.dispatch(new ShoppingListActions.EditIngredient(ingredient))
  }
  addIngredients(ingredient: Ingredient) {
    // this.ingredients.push(ingredient);
    // this.ingredientChanged.next(this.ingredients.slice());
    this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient))
  }
  addBulkIngredients(ingredients: Ingredient[]) {
    // this.ingredients.push(...ingredients);
    // this.ingredientChanged.next(this.ingredients.slice());
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
  }
  deleteIngredient(index: number) {
    // this.ingredients.splice(index, 1);
    // this.ingredientChanged.next(this.ingredients.slice());

    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
  }
}
