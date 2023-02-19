import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { NorecipeComponent } from 'src/app/norecipe/norecipe.component';
import { RecipesResolverResolver } from 'src/app/shared/recipes-resolver.resolver';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipesComponent } from '../recipes.component';

const routes: Routes = [
  {
    path: '', component: RecipesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: NorecipeComponent },
      { path: 'create', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolverResolver] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverResolver] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
