import {
    INGREDIENTS_SUCCESS,
    INGREDIENTS_ERROR,
    INGREDIENTS_REQUEST
  } from '../actions/ingredients';
  
  // список всех полученных ингредиентов
  const ingredientsInitialState = { 
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
};
  
  export const ingredientsReducer = (state = ingredientsInitialState, action) => {
    switch (action.type) {
      case INGREDIENTS_REQUEST:
        return {
          ...state,
          ingredientsRequest: true,
          ingredientsError: false,
        };
      case INGREDIENTS_SUCCESS:
        return {
          ...state,
          ingredients: action.data,
          ingredientsRequest: false,
          ingredientsError: false,
        };
      case INGREDIENTS_ERROR:
        return {
          ...state,
          ingredientsRequest: false,
          ingredientsError: true,
          ingredients: [],
        };
      default:
        return state;
    }
  };