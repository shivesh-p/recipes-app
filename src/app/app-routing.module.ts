import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { NorecipeComponent } from './norecipe/norecipe.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesResolverResolver } from './shared/recipes-resolver.resolver';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/recipes' },
  {
    path: 'recipes', component: RecipesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: NorecipeComponent },
      { path: 'create', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolverResolver] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverResolver] },
    ]
  },
  {
    path: 'shopping-list',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ShoppingListComponent,
    children: [
      { path: ':id', component: ShoppingListEditComponent },
    ]
  },
  {
    path: 'auth', component: AuthComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
