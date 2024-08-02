import { ordersUrl } from "../../components/utils/urls";
import { request } from "../../components/utils/api";

import { getCookie } from "../../components/utils/cookie";
import { CLEAR_CONSTRUCTOR } from "./constructor";
import { IOrder } from "../../components/utils/types";

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = "POST_ORDER_FAILED";

export const ORDER_MODAL_CLOSE: 'ORDER_MODAL_CLOSE' = "ORDER_MODAL_CLOSE";
export const ORDER_MODAL_OPEN: 'ORDER_MODAL_OPEN'= "ORDER_MODAL_OPEN";
export const ORDER_DETAIL: 'ORDER_DETAIL' = 'ORDER_DETAIL';

export interface IOrderReqAction {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IOrderSuccessAction {
  data: number;
  readonly type: typeof POST_ORDER_SUCCESS;
}

export interface IOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface IOrderModalCloseAction {
  readonly type: typeof ORDER_MODAL_CLOSE;
}

export interface IOrderModalOpenAction {
  readonly type: typeof ORDER_MODAL_OPEN;
  readonly data: any;
}

export interface IOrderDetailActions {
    readonly type: typeof ORDER_DETAIL;
    readonly data: IOrder;
}

export type TOrderActions = IOrderReqAction | IOrderSuccessAction | IOrderFailedAction | IOrderModalCloseAction |
                            IOrderModalOpenAction | IOrderDetailActions;


export function postOrder(ingredients: Array<string>) {
  return function (dispatch: any) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    request(ordersUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      "authorization": 'Bearer ' + getCookie('token'),
      body: JSON.stringify({ingredients}),
    })
      .then((rez) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          data: rez.order.number,
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR,
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_ORDER_FAILED,
          requestError: String(err)
        });
      });
  };
}
