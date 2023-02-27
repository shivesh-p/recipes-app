import * as RecipeAction from './actions';
import { State, initialState } from './state';

export function recipeReducer(
  state = initialState,
  action: RecipeAction.RecipeActions
): State {
  switch (action.type) {
    case RecipeAction.SET_RECIPES: {
      return {
        // return new class state
        ...state,
        recipes: [...action.payload],
      };
    }
    case RecipeAction.CREATE_RECIPE: {
      let id = state.id;
      ++id;
      var addedRecipe = {
        ...action.recipe,
        id: id,
      };
      const changedRecipes = [...state.recipes];

      changedRecipes.push(addedRecipe);
      return {
        ...state,
        id: id,
        recipes: changedRecipes,
      };
    }
    case RecipeAction.EDIT_RECIPE: {
      const updatedRecipe = {
        ...state.recipes.filter((recipe) => {
          return recipe.id === action.payload.id;
        })[0],
        ...action.payload.recipe,
      };
      let updatedRecipes = [...state.recipes];
      updatedRecipes = updatedRecipes.filter((r) => {
        return r.id !== action.payload.id;
      });
      updatedRecipes.push(updatedRecipe);
      return {
        ...state,
        recipes: updatedRecipes,
      };
    }
    case RecipeAction.DELETE_RECIPE: {
      const updatedRecipes = [...state.recipes].filter((recipe) => {
        return recipe.id !== action.id;
      });
      return {
        ...state,
        recipes: updatedRecipes,
      };
    }
    case RecipeAction.SAVE_RECIPE: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
