import { ingredientsUrl } from "../../components/utils/urls";
import { request } from "../../components/utils/api";
import { IIngredient } from "../../components/utils/types";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export interface IIngredientReqAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IIngredientSuccessAction {
  ingredients: IIngredient[];
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
}

export interface IIngredientFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientActions = IIngredientReqAction | IIngredientSuccessAction | IIngredientFailedAction;


export function getIngredients() {
  return function (dispatch: any) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    request(ingredientsUrl).then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
    });
  }  
}