import { 
    GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_FAILED, 
    GET_INGREDIENTS_SUCCESS 
} from "../actions/ingredients"

const initialState = [
    {
        order: '',
        orderFailed: false,
        orderRequest: false
    }
]

export const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                orderFailed: false,
                orderRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
        return {
            ...state,
            orderRequest: false,
            order: action.order
        }
        }
        case GET_INGREDIENTS_FAILED: {
        return {
            ...state,
            orderFailed: true,
            orderRequest: false
        }
        }
        default: {
            return state;
        }
        }
    }