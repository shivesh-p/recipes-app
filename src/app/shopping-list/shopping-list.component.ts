import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingSubscription: Subscription = new Subscription();
  constructor(private shoppingService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingSubscription = this.shoppingService.ingredientChanged.subscribe((v) =>
      this.ingredients = v);
  }
  editIngredient(index: number) {
    this.shoppingService.ingredientEditClick.next(index);
  }
  ngOnDestroy() {
    this.ingSubscription.unsubscribe();
  }

}
