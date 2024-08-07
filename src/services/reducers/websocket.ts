import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_ORDERS } from '../actions/websocket'
import { TWSActions } from "../actions/websocket";
import { IOrder } from '../../components/utils/types';

export type TWSState = {
    wsConnected: boolean;
    orders: IOrder[];
    total: number,
    totalToday: number,
    error?: string;
}

export const checkoutInitialState: TWSState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const websocketReducer = (state = checkoutInitialState, action: TWSActions): TWSState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
          return {
            ...state,
            wsConnected: true
          };
    
        case WS_CONNECTION_ERROR:
          return {
            ...state,
            error: action.payload,
            wsConnected: false
          };
    
        case WS_CONNECTION_CLOSED:
          return {
            ...state,
            wsConnected: false
          };
    
        case WS_GET_ORDERS:         
          return {
            ...state,
            orders: action.payload.orders ? action.payload.orders : state.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday
          };
    
        default:
          return state;
      }
};