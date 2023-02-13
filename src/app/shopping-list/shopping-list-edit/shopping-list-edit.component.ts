import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  editMode: boolean = false;
  index: number = 0;
  @ViewChild('f') formEdit: NgForm;

  editedIngredient: Ingredient = new Ingredient('', 0);
  // @ViewChild('ingName') ingName!: ElementRef;
  // @ViewChild('ingAmount') ingAmount!: ElementRef;
  constructor(private shoppingService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.shoppingService.ingredientEditClick.subscribe((value) => {
      this.editMode = true;
      this.index = value;
      this.editedIngredient = this.shoppingService.getIngredientsByIndex(value);
      this.formEdit.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      })
    });
  }
  onIngredientAdd() {
    // const iName = this.ingName.nativeElement.value;
    // const iAmount = this.ingAmount.nativeElement.value
    // this.shoppingService.addIngredients(new Ingredient(iName, iAmount));
  }
  onSubmitForm(form: NgForm) {
    console.log(form.value);
    if (!this.editMode) {
      this.shoppingService.addIngredients(form.value);
    }
    else {
      this.shoppingService.editIngredients(this.index, form.value);
      this.editMode = false;

    }
    this.resetForm(form);
  }
  resetForm(form: NgForm) {
    if (this.editMode) {
      this.editMode = false;
      this.editedIngredient = new Ingredient('', 0);
      this.index = 0;
    }
    form.reset();
  }
  deleteIngredient() {
    this.editMode = false;
    this.formEdit.reset();
    this.shoppingService.deleteIngredient(this.index);
  }
}
