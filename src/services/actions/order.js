import { postOrder } from "../APIquery";

export const GET_ORDER_SUCCESS = {
    type: 'GET_ORDER_SUCCESS',
};
export const GET_ORDER_FAILED = {
    type: 'GET_ORDER_FAILED',
};
export const GET_ORDER_REQUEST = {
    type: 'GET_ORDER_REQUEST',
};

export function getOrderNumber(currentOrder) {
    return function(dispatch) {
      dispatch({
        type: GET_ORDER_REQUEST
      });
      postOrder(currentOrder).then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res.order
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED
          });
        }
      });
    };
  }