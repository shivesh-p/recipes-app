import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingRoutingModule } from './shopping-routing.module';


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ShoppingRoutingModule
  ]
})
export class ShoppingModule { }
