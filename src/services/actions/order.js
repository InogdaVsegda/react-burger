import { postOrder } from "../APIquery";

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';

export function getOrderNumber(currentOrder) {
    return function(dispatch) {
      dispatch({
        type: 'GET_ORDER_REQUEST'
      });
      postOrder(currentOrder).then(res => {
        if (res && res.success) {
          console.log(res)
          dispatch({
            type: 'GET_ORDER_SUCCESS',
            order: res.order.number
          });
        } else {
          dispatch({
            type: 'GET_ORDER_FAILED'
          });
        }
      });
    };
  }