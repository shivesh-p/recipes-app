import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NorecipeComponent } from 'src/app/norecipe/norecipe.component';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from '../recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipesComponent } from '../recipes.component';
import { RecipesRoutingModule } from './recipes-routing.module';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    NorecipeComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ],
})
export class RecipesModule { }
