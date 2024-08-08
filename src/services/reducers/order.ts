import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  ORDER_MODAL_OPEN,
  ORDER_MODAL_CLOSE,
  ORDER_DETAIL
} from "../actions/order";
import { TOrderActions } from "../actions/order";
import { IOrder } from "../../components/utils/types";

export type TOrderState = {
    order: number;
    orderRequest: boolean;
    orderFailed: boolean;
    isVisible: boolean;
    orderDetail: IOrder;
}

// номер заказа
export const checkoutInitialState:TOrderState = {
  order: 0,
  orderRequest: false,
  orderFailed: false,
  isVisible: false,
  orderDetail: {
    _id: "",
    ingredients: [],
    status: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    number: 0
}
};

export const orderReducer = (state = checkoutInitialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
        order: 0,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.data,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        order: 0,
      };
    }
    case ORDER_DETAIL: {
      return { ...state, orderDetail: action.data };
    }
    case ORDER_MODAL_OPEN: {
      return {
        ...state, 
        orderDetail: action.data,
        isVisible: true,
      };
    }
    case ORDER_MODAL_CLOSE: {
      return {
        ...state,
        isVisible: false,
        orderDetail: {
          _id: "",
          ingredients: [],
          status: "",
          name: "",
          createdAt: "",
          updatedAt: "",
          number: 0
        }, 
        order: 0
      };
    }
    default: {
      return state;
    }
  }
};
