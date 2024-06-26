import {
  userUrl,
  loginUrl,
  registerUrl,
  passwordResetUrl,
  passwordResetResetUrl,
  logoutUrl,
  tokenUrl,
} from "../../components/utils/urls.jsx";
import {
  setCookie,
  deleteCookie,
  getCookie,
} from "../../components/utils/cookie.jsx";
import { request } from "../../components/utils/api.jsx";

export const GET_AUTH_REQUEST = "GET_AUTH_REQUEST";
export const GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS";
export const GET_AUTH_FAILED = "GET_AUTH_FAILED";

export const GET_REG_REQUEST = "GET_REG_REQUEST";
export const GET_REG_SUCCESS = "GET_REG_SUCCESS";
export const GET_REG_FAILED = "GET_REG_FAILED";

export const GET_FORGOT_REQUEST = "GET_FORGOT_REQUEST";
export const GET_FORGOT_SUCCESS = "GET_FORGOT_SUCCESS";
export const GET_FORGOT_FAILED = "GET_FORGOT_FAILED";

export const GET_RESET_REQUEST = "GET_RESET_REQUEST";
export const GET_RESET_SUCCESS = "GET_RESET_SUCCESS";
export const GET_RESET_FAILED = "GET_RESET_FAILED";

export const GET_LOGOUT_REQUEST = "GET_LOGOUT_REQUEST";
export const GET_LOGOUT_SUCCESS = "GET_LOGOUT_SUCCESS";
export const GET_LOGOUT_FAILED = "GET_LOGOUT_FAILED";

export const GET_EDIT_REQUEST = "GET_EDIT_REQUEST";
export const GET_EDIT_SUCCESS = "GET_EDIT_SUCCESS";
export const GET_EDIT_FAILED = "GET_EDIT_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const GET_REFRESH_REQUEST = "GET_REFRESH_REQUEST";
export const GET_REFRESH_SUCCESS = "GET_REFRESH_SUCCESS";
export const GET_REFRESH_FAILED = "GET_REFRESH_FAILED";

export function getUser() {
  return async (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });
    request(userUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: "Bearer " + getCookie("token"),
      },
    })
      .then((data) => {
        dispatch({
          type: GET_USER_SUCCESS,
          data: data,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: GET_USER_FAILED,
          data: String(err.message),
        });
      });
  };
}

export function userApi(type, data = {}, callbackFunction = () => {}) {
  let endpoint = "";
  let method = "POST";
  let typeMatch = false;
  let saveTokens = false;
  let delTokens = false;
  let reqAction = "";
  let successAction = "";
  let failedAction = "";

  switch (type) {
    case "login":
      endpoint = loginUrl;
      typeMatch = true;
      saveTokens = true;
      reqAction = GET_AUTH_REQUEST;
      successAction = GET_AUTH_SUCCESS;
      failedAction = GET_AUTH_FAILED;
      break;

    case "register":
      endpoint = registerUrl;
      typeMatch = true;
      saveTokens = true;
      reqAction = GET_REG_REQUEST;
      successAction = GET_REG_SUCCESS;
      failedAction = GET_REG_FAILED;
      break;

    case "forgot":
      endpoint = passwordResetUrl;
      typeMatch = true;
      reqAction = GET_FORGOT_REQUEST;
      successAction = GET_FORGOT_SUCCESS;
      failedAction = GET_FORGOT_FAILED;
      break;

    case "reset":
      endpoint = passwordResetResetUrl;
      typeMatch = true;
      reqAction = GET_RESET_REQUEST;
      successAction = GET_RESET_SUCCESS;
      failedAction = GET_RESET_FAILED;
      break;

    case "logout":
      endpoint = logoutUrl;
      typeMatch = true;
      delTokens = true;
      reqAction = GET_LOGOUT_REQUEST;
      successAction = GET_LOGOUT_SUCCESS;
      failedAction = GET_LOGOUT_FAILED;
      break;

    case "edit":
      endpoint = userUrl;
      method = "PATCH";
      typeMatch = true;
      reqAction = GET_EDIT_REQUEST;
      successAction = GET_EDIT_SUCCESS;
      failedAction = GET_EDIT_FAILED;
      break;
  }

  if (typeMatch) {
    return async (dispatch) => {
      dispatch({
        type: reqAction,
      });
      request(endpoint, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: "Bearer " + getCookie("token"),
        },
      })
        .then((data) => {
          dispatch({
            type: successAction,
            data: data,
          });
          if (saveTokens) {
            let authToken;
            if (data.accessToken.indexOf("Bearer") === 0) {
              authToken = data.accessToken.split("Bearer ")[1];
            }
            if (authToken) {
              setCookie("token", authToken, { expires: 20 * 60 });
              localStorage.setItem("refreshToken", data.refreshToken);
            }
          }
          if (delTokens) {
            deleteCookie("token");
            localStorage.clear();
          }
          callbackFunction();
        })
        .catch((err) => {
          dispatch({
            type: failedAction,
            data: String(err.message),
          });
          if (err === "jwt expired") {
            dispatch(refreshToken(userApi(type, data, callbackFunction())));
          }
          console.error(err);
        });
    };
  }
}

const refreshToken = (afterRefresh) => (type, dataAfter, callbackFunction) => {
  return async (dispatch) => {
    dispatch({
      type: GET_REFRESH_REQUEST,
    });
    request(tokenUrl, {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((data) => {
        dispatch({
          type: GET_REFRESH_SUCCESS,
        });
        let authToken;
        if (data.accessToken.indexOf("Bearer") === 0) {
          authToken = data.accessToken.split("Bearer ")[1];
        }
        if (authToken) {
          setCookie("token", authToken, { expires: 20 * 60 });
          localStorage.setItem("refreshToken", data.refreshToken);
        }
        dispatch(afterRefresh(type, dataAfter, callbackFunction));
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: GET_REFRESH_FAILED,
          data: String(err.message),
        });
      });
  };
};
