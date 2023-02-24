import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as shoppingListState from '../store/shopping-list-reducer';
import * as ShoppingListAction from '../store/shopping-list.action';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  editMode: boolean = false;
  @ViewChild('f') formEdit: NgForm;

  // @ViewChild('ingName') ingName!: ElementRef;
  // @ViewChild('ingAmount') ingAmount!: ElementRef;
  constructor(private shoppingService: ShoppingListService,
    private store: Store<shoppingListState.AppState>) {
  }

  ngOnInit(): void {
    // this.shoppingService.ingredientEditClick.subscribe((value) => {
    //   this.editMode = true;
    //   this.index = value;
    //   this.editedIngredient = this.shoppingService.getIngredientsByIndex(value);
    //   this.formEdit.setValue({
    //     name: this.editedIngredient.name,
    //     amount: this.editedIngredient.amount
    //   })
    // });

    //store implementation
    this.store.select('shoppingList').subscribe({
      next: (state) => {
        if (state.editedIndex > -1) {
          this.editMode = true;
          this.formEdit.setValue({
            name: state.editedIngredient.name,
            amount: state.editedIngredient.amount
          })
        }
        else {
          this.editMode = false;
        }
      }
    })
  }
  onIngredientAdd() {
    // const iName = this.ingName.nativeElement.value;
    // const iAmount = this.ingAmount.nativeElement.value
    // this.shoppingService.addIngredients(new Ingredient(iName, iAmount));
  }
  onSubmitForm(form: NgForm) {
    console.log(form.value);
    if (!this.editMode) {
      //this.shoppingService.addIngredients(form.value);
      let addedIngredient: Ingredient = form.value;
      this.store.dispatch(new ShoppingListAction.AddIngredient(addedIngredient));
    }
    else {
      // this.shoppingService.editIngredients(this.index, form.value);
      let editedIngredient: Ingredient = form.value;
      this.store.dispatch(new ShoppingListAction.EditIngredient(editedIngredient));
      this.editMode = false;

    }
    this.resetForm(form);
  }
  resetForm(form: NgForm) {
    if (this.editMode) {
      this.editMode = false;
      this.store.dispatch(new ShoppingListAction.StopEdit())
    }
    form.reset();
  }
  deleteIngredient() {
    this.editMode = false;
    this.formEdit.reset();
    //this.shoppingService.deleteIngredient(this.index);
    this.store.dispatch(new ShoppingListAction.DeleteIngredient())
    this.store.dispatch(new ShoppingListAction.StopEdit())

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.store.dispatch(new ShoppingListAction.StopEdit())

  }
}
