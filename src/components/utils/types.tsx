import type { ThunkDispatch } from 'redux-thunk';
import { TIngredientState } from '../../services/reducers/ingredients';
import { TOrderState } from '../../services/reducers/order';
import { TIngredientDetailState } from '../../services/reducers/ingredient-detail';
import { TBurgerConstructorState } from '../../services/reducers/constructor';
import { TUserState } from '../../services/reducers/user';
import { TWSState } from '../../services/reducers/websocket';
import { TConstructorActions } from '../../services/actions/constructor';
import { TDetailIngredientActions } from '../../services/actions/ingredient-detail';
import { TIngredientActions } from '../../services/actions/ingredients';
import { TOrderActions } from '../../services/actions/order';
import { TUserActions } from '../../services/actions/user';
import { TWSActions } from '../../services/actions/websocket';

export interface IBun {
    type: "top" | "bottom";
    isLocked: boolean;
    text: string;
    price: number;
    thumbnail: string;
}


  export interface IIngredient{
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
  }

export interface IConstructorIngredient extends IIngredient {
  uuid: string;
}

export interface ICheckSuccess {
  success: boolean;
}
    
export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}

export type TLogin = {
  email: string
  password: string
}

export interface IRegisterResponse extends ICheckSuccess {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  email: string; 
  name: string
}
export type TGetUserResponse = {
  success: boolean;
  user: IUser;
}

export interface IOrder {
  _id: string;
  ingredients?: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export type TGetOrdersResponse = {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}


export type RootState = {
    ingredients: TIngredientState,
    order: TOrderState,
    ingredientDetail: TIngredientDetailState,
    burgerConstructor: TBurgerConstructorState,
    user: TUserState,
    websocket: TWSState,
};

// Типизация всех экшенов приложения
type TApplicationActions = TConstructorActions | TDetailIngredientActions | TIngredientActions | TOrderActions | TUserActions | TWSActions | TUserApi; 
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;


export type TUserApi = {
  type:string; 
  data:{};
  callbackFunction: () => {}
}