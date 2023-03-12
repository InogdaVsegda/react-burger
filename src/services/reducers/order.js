import { 
    GET_ORDER_REQUEST, 
    GET_ORDER_FAILED, 
    GET_ORDER_SUCCESS 
} from "../actions/order"

const initialState = [
    {
        order: null,
        orderFailed: false,
        orderRequest: false
    }
]

export const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderFailed: false,
                orderRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
        return {
            ...state,
            orderRequest: false,
            order: action.order
        }
        }
        case GET_ORDER_FAILED: {
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