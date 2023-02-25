import { ActionReducerMap } from "@ngrx/store";
import { authReducer } from "../auth/store/reducer";
import * as authState from '../auth/store/state';
import * as shoppingListState from '../shopping-list/store/shopping-list-reducer';
import { shoppingListReducer } from '../shopping-list/store/shopping-list-reducer';

export interface AppState {
    shoppingList: shoppingListState.State,
    auth: authState.State
};


export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    auth: authReducer,
}