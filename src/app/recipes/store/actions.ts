import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipe] SET_RECIPES';
export const FETCH_RECIPES = '[Recipe] FETCH_RECIPES';
export const RECIPE_ERROR = '[Recipe] RECIPE_ERROR';
export const CREATE_RECIPE = '[Recipe] CREATE_RECIPE';
export const EDIT_RECIPE = '[Recipe] EDIT_RECIPE';
export const DELETE_RECIPE = '[Recipe] DELETE_RECIPE';
export const SAVE_RECIPE = '[Recipe] SAVE_RECIPE';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}
export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}
export class CreateRecipe implements Action {
  readonly type = CREATE_RECIPE;
  constructor(public recipe: Recipe) {}
}
export class EditRecipe implements Action {
  readonly type = EDIT_RECIPE;
  constructor(public payload: { id: number; recipe: Recipe }) {}
}
export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(readonly id: number) {}
}
export class SaveRecipes implements Action {
  readonly type = SAVE_RECIPE;
}
export class RecipeError implements Action {
  readonly type = RECIPE_ERROR;
  constructor(readonly payload: string) {}
}
export type RecipeActions =
  | SetRecipes
  | FetchRecipes
  | DeleteRecipe
  | CreateRecipe
  | EditRecipe
  | RecipeError
  | SaveRecipes;
