import { TGetOrdersResponse } from "../../components/utils/types";
export const WS_ORDERS_START: 'WS_ORDERS_START' = 'WS_ORDERS_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';


export interface IWSConnectionStart {
    readonly type: typeof WS_ORDERS_START;
    readonly payload?: string;
    readonly token?: string;
  }
  
  export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload?: Event;
    readonly token?: string;
  }
  
  export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload?: string;
    readonly token?: string;
  }
  
  export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly payload?: Event;
    readonly token?: string;
  }
  
  export interface IWSGetFeedAction {
    readonly type: typeof WS_GET_ORDERS;
    readonly payload: TGetOrdersResponse;
    readonly token?: string;
  }
  
  export interface IWSSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: {message: string};
    readonly token?: string;
  }
  
  export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetFeedAction
    | IWSSendMessageAction;