import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NorecipeComponent } from 'src/app/norecipe/norecipe.component';
import { SharedModule } from '../../shared/shared.module';
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
    RouterModule,
    RecipesRoutingModule,
    SharedModule
  ],
})
export class RecipesModule { }
