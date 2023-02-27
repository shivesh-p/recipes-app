import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as appState from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import * as recipeActions from './actions';
//import all requried services or any dependencies

@Injectable()
export class RecipeEffects {
  baseUrl: string =
    'https://recipebook-7fa89-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<appState.AppState>
  ) {}

  redirectRecipes = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(recipeActions.DELETE_RECIPE),
        tap(() => {
          this.router.navigate(['/recipes']);
        })
      );
    },
    { dispatch: false }
  );

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(this.baseUrl);
      }),
      map((recipes: Recipe[]) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipe: Recipe[]) => {
        return new recipeActions.SetRecipes(recipe);
      })
    )
  );

  saveRecipes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(recipeActions.SAVE_RECIPE),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
          return this.http.put(this.baseUrl, recipesState.recipes);
        })
      );
    },
    { dispatch: false }
  );
}
