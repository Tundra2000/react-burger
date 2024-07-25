import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
} from "../actions/ingredients";
import { IIngredient } from "../../components/utils/types";
import { TIngredientActions } from "../actions/ingredients";

export type TIngredientState = {
    ingredients: IIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
}

// список всех полученных ингредиентов
const ingredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientActions): TIngredientState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    default:
      return state;
  }
};
