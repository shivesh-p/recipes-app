import { Recipe } from '../recipe.model';

export interface State {
  recipes: Recipe[];
  error: string;
  id: number;
}

export const initialState: State = {
  recipes: [],
  error: null,
  id: 3,
};
