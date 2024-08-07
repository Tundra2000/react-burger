import {
  SET_DETAIL_INGREDIENT,
  CLEAR_DETAIL_INGREDIENT,
} from "../actions/ingredient-detail";
import { IIngredient } from "../../components/utils/types";
import { TDetailIngredientActions } from "../actions/ingredient-detail";


export type TIngredientDetailState = {
  ingredient: IIngredient | null;
}

const ingredientDetailState:TIngredientDetailState = {
  ingredient: null
};

export const ingredientDetail = (state = ingredientDetailState, action:TDetailIngredientActions) => {
  switch (action.type) {
    case SET_DETAIL_INGREDIENT:
      return {
        ...state,
        ingredient: action.ingredient,
      };
    case CLEAR_DETAIL_INGREDIENT:
      return {
        ...state,
        ingredient: {},
      };
    default:
      return state;
  }
};