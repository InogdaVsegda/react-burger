import { SET_CURRENT_INGREDIENT } from "../actions/currentIngr";

const initialState = {
    currentIngr: {}
}

export const currentReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_INGREDIENT: {
            return {
                currentIngr: action.currentIngr
            }
        }
        default: {
            return state;
        }
    }
}