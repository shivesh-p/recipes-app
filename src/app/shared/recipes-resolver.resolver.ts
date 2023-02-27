import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, of, take } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import * as recipeActions from '../recipes/store/actions';
import * as appState from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverResolver implements Resolve<Recipe[]> {
  constructor(
    private store: Store<appState.AppState>,
    private action$: Actions
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      map((recipeState) => {
        return recipeState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(new recipeActions.FetchRecipes());
          return this.action$.pipe(
            ofType(recipeActions.SET_RECIPES),

            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
