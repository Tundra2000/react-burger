import {
    INGREDIENTS_SUCCESS,
    INGREDIENTS_FAILED,
    INGREDIENTS_REQUEST
  } from '../actions/ingredients';
  
  // список всех полученных ингредиентов
  const ingredientsInitialState = { 
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};
  
  export const ingredientsReducer = (state = ingredientsInitialState, action) => {
    switch (action.type) {
      case INGREDIENTS_REQUEST:
        return {
          ...state,
          ingredientsRequest: true,
        };
      case INGREDIENTS_SUCCESS:
        return {
          ...state,
          ingredients: action.ingredients,
          ingredientsRequest: false,
          ingredientsFailed: false,
        };
      case INGREDIENTS_FAILED:
        return {
          ...state,
          ingredientsRequest: false,
          ingredientsFailed: true
        };
      default:
        return state;
    }
  };