import { IConstructorIngredient } from "../../components/utils/types";

export const ADD_TO_CONSTRUCTOR: 'ADD_TO_CONSTRUCTOR' = 'ADD_TO_CONSTRUCTOR';
export const DEL_FROM_CONSTRUCTOR: 'DEL_FROM_CONSTRUCTOR' = 'DEL_FROM_CONSTRUCTOR';
export const MOVE_IN_CONSTRUCTOR: 'MOVE_IN_CONSTRUCTOR' = 'MOVE_IN_CONSTRUCTOR';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';


export interface IConstructorAddAction {
    readonly type: typeof ADD_TO_CONSTRUCTOR;
    readonly item: IConstructorIngredient;
}

export interface IConstructorDelAction {
    readonly type: typeof DEL_FROM_CONSTRUCTOR;
    id: string;
    readonly index: number;
}

export interface IConstructorMoveAction {
    readonly type: typeof MOVE_IN_CONSTRUCTOR;
    readonly payload: {from: number; to: number;};
}

export interface IConstructorClearAction {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActions = IConstructorAddAction | IConstructorDelAction | IConstructorMoveAction | IConstructorClearAction;