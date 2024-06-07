import api from "../../components/utils/api.jsx";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const ORDER_MODAL_CLOSE = "ORDER_MODAL_CLOSE";
export const ORDER_MODAL_OPEN = "ORDER_MODAL_OPEN";

export function postOrder(data) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    api
      .postOrder(data)
      .then((data) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          data: data.order.number,
        });
        dispatch({
          type: ORDER_MODAL_OPEN,
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_ORDER_FAILED,
          requestError: String(err),
        });
      });
  };
}
