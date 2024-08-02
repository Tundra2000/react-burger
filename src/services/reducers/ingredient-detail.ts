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
  ingredient: {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0
}
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