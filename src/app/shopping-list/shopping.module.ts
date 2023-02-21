import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingRoutingModule } from './shopping-routing.module';


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    RouterModule,
    ShoppingRoutingModule,
    SharedModule
  ]
})
export class ShoppingModule { }
