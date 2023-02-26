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

    default: {
      return state;
    }
  }
}
