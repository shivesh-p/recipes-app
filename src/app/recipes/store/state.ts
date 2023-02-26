import { Recipe } from '../recipe.model';

export interface State {
  recipes: Recipe[];
}

export const initialState: State = {
  recipes: [],
};
