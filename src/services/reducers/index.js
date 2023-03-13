import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './ingrConstructor';
import { currentReducer } from './currentIngr';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    constructorReducer,
    ingredientsReducer,
    currentReducer,
    orderReducer
})