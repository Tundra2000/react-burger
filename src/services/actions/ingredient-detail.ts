import { IIngredient } from "../../components/utils/types";

export const SET_DETAIL_INGREDIENT: 'SET_DETAIL_INGREDIENT' = "SET_DETAIL_INGREDIENT";
export const CLEAR_DETAIL_INGREDIENT: 'CLEAR_DETAIL_INGREDIENT' = "CLEAR_DETAIL_INGREDIENT";
// modal.ts

export interface ISetDetailIngredientActions {
    ingredient: IIngredient | null;
    readonly type: typeof SET_DETAIL_INGREDIENT;
}

export interface IClearDetailIngredientActions {
    readonly type: typeof CLEAR_DETAIL_INGREDIENT;
}


export type TDetailIngredientActions = ISetDetailIngredientActions | IClearDetailIngredientActions;