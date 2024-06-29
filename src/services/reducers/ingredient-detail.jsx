import {
  SET_DETAIL_INGREDIENT,
  CLEAR_DETAIL_INGREDIENT,
} from "../actions/ingredient-detail";

const initialState = {
  ingredient: null,
};

export const ingredientDetail = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAIL_INGREDIENT:
      console.log(action.ingredient);
      return {
        ...state,
        ingredient: action.ingredient,
      };
    case CLEAR_DETAIL_INGREDIENT:
      console.log(action.ingredient);
      return {
        ...state,
        ingredient: {},
      };
    default:
      return state;
  }
};