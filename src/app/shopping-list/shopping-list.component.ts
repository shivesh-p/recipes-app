import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as appState from '../store/app.reducer';
import { ShoppingListService } from './shopping-list.service';
import * as ShoppingListActions from './store/shopping-list.action';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //ingredients: Ingredient[] = []; //incase of service use this
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingSubscription: Subscription = new Subscription();
  constructor(private shoppingService: ShoppingListService,
    private store: Store<appState.AppState>) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingService.getIngredients();
    // this.ingSubscription = this.shoppingService.ingredientChanged.subscribe((v) =>
    //   this.ingredients = v);
  }
  editIngredient(index: number) {
    debugger;
    //this.shoppingService.ingredientEditClick.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
  ngOnDestroy() {
    this.ingSubscription.unsubscribe();

  }

}
