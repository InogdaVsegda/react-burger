import { getData } from "../APIquery";

export const GET_INGREDIENTS_SUCCESS = {
    type: 'GET_INGREDIENTS_SUCCESS',
};
export const GET_INGREDIENTS_FAILED = {
    type: 'GET_INGREDIENTS_FAILED',
};
export const GET_INGREDIENTS_REQUEST = {
    type: 'GET_INGREDIENTS_REQUEST',
};

export function getIngredients() {
    return function(dispatch) {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });
      getData().then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      });
    };
  }