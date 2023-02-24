import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListAction from './shopping-list.action';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIndex: number
}
export interface AppState {
    shoppingList: State
}
const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 10),
        new Ingredient('Tomatoes', 4),
    ],
    editedIngredient: null,
    editedIndex: -1
};

export function shoppingListReducer(state = initialState,
    action: ShoppingListAction.ShoppingListActions) {
    debugger;
    switch (action.type) {
        case ShoppingListAction.ADD_INGREDIENT: {
            return {
                // return new class state
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        }
        case ShoppingListAction.ADD_INGREDIENTS: {
            return {
                // return new class state
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        }
        case ShoppingListAction.EDIT_INGREDIENT: {
            const oldIngredient = state.ingredients[state.editedIndex]
            const newIngredient = {
                ...oldIngredient,
                ...action.payload
            }
            const updatedIngredientsRef = [...state.ingredients];
            updatedIngredientsRef[state.editedIndex] = newIngredient;
            return {
                // return new class state
                ...state,
                ingredients: updatedIngredientsRef
            };
        }
        case ShoppingListAction.DELETE_INGREDIENT: {
            let changedIng = [...state.ingredients];
            changedIng.splice(state.editedIndex, 1);
            return {
                // return new class state
                ...state,
                ingredients: [...changedIng],
                editedIndex: -1,
                editedIngredient: null
            };
        }
        case ShoppingListAction.START_EDIT: {
            return {
                // return new class state
                ...state,
                editedIngredient: { ...state.ingredients[action.payload] },
                editedIndex: action.payload
            };
        }
        case ShoppingListAction.STOP_EDIT: {

            return {
                // return new class state
                ...state,
                editedIngredient: null,
                editedIndex: -1
            };
        }

        default: {
            return state;
        }
    }
}