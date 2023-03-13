import { 
    GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_FAILED, 
    GET_INGREDIENTS_SUCCESS 
} from "../actions/ingredients"

const initialState = [
    {
        ingredients: [],
        ingredientsFailed: false,
        ingredientsRequest: false
    }
]

export const ingredientsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsFailed: false,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
        return {
            ...state,
            ingredientsRequest: false,
            ingredients: action.ingredients
        }
        }
        case GET_INGREDIENTS_FAILED: {
        return {
            ...state,
            ingredientsFailed: true,
            ingredientsRequest: false
        }
        }
        default: {
            return state;
        }
        }
    }
    