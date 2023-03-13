import { ADD_INGR_CONSTRUCTOR, DELETE_INGR_CONSTRUCTOR, MOVE_INGR } from "../actions/ingrConstructor";

const initialState = {
    addedIngr: [],
    bunId: {},
}

export const constructorReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_INGR_CONSTRUCTOR: {
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    bunId: action.payload.id
                };
            }

            return {
                ...state,
                addedIngr: [
                    ...state.addedIngr,
                    { id: action.payload.id }
                ],
            }
        }
        case MOVE_INGR: {
            const { fromIndex, toIndex } = action.payload
            if (fromIndex === toIndex) {
                return state
            }
            const { addedIngr } = state;
            const actualIngredients = [...addedIngr];
            actualIngredients.splice(
                toIndex,
                0,
                actualIngredients.splice(fromIndex, 1)[0]
            );

            return {
                ...state,
                addedIngr: actualIngredients,
            }
        }
        case DELETE_INGR_CONSTRUCTOR: {
            return {
                ...state,
                addedIngr: [
                    ...state.addedIngr.slice(0, action.index), 
                    ...state.addedIngr.slice(action.index + 1, state.addedIngr.length)
                ]

            }
        }
        default: {
            return state;
        }
    }
}