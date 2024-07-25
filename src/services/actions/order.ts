import { ordersUrl } from "../../components/utils/urls";
import { request } from "../../components/utils/api";
import { CLEAR_CONSTRUCTOR } from "./constructor";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const ORDER_MODAL_CLOSE = "ORDER_MODAL_CLOSE";
export const ORDER_MODAL_OPEN = "ORDER_MODAL_OPEN";

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
}

export type TOrderActions = IOrderReqAction | IOrderSuccessAction | IOrderFailedAction | IOrderModalCloseAction | IOrderModalOpenAction;


export function postOrder(data: any) {
  return function (dispatch: any) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    request(ordersUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(data),
    })
      .then((data) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          data: data.order.number,
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: POST_ORDER_FAILED,
        });
      });
  };
}
