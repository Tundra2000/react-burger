import { combineReducers } from 'redux';
import { ingredientsReducer } from "./ingredients";
//import ingredientDetailsViewReducer from "./ingredient-detail";
//import orderReducer from "./order";
//import constructorReducer from "./constructor";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
        //ingredientDetailsView: ingredientDetailsViewReducer,
        //order: orderReducer,
        //constructor: constructorReducer,
  });