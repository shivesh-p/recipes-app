import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('ingName') ingName!: ElementRef;
  @ViewChild('ingAmount') ingAmount!: ElementRef;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
  }
  onIngredientAdd() {
    const iName = this.ingName.nativeElement.value;
    const iAmount = this.ingAmount.nativeElement.value
    this.shoppingService.addIngredients(new Ingredient(iName, iAmount));
  }
}
