import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  ORDER_MODAL_OPEN,
  ORDER_MODAL_CLOSE,
} from "../actions/order";

// номер заказа
const checkoutInitialState = {
  order: 0,
  orderRequest: false,
  orderFailed: false,
  isVisible: false,
};

export const orderReducer = (state = checkoutInitialState, action) => {
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
    case ORDER_MODAL_OPEN: {
      return {
        ...state,
        isVisible: true,
      };
    }
    case ORDER_MODAL_CLOSE: {
      return {
        ...state,
        isVisible: false,
      };
    }
    default: {
      return state;
    }
  }
};
