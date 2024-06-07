import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientDetail } from "./ingredient-detail";
import { orderReducer } from "./order";
import { constructorReducer } from "./constructor";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  ingredientDetail: ingredientDetail,
});
