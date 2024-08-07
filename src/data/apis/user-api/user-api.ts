import {
    loginUrl,
    logoutUrl,
    passwordResetResetUrl,
    passwordResetUrl,
    registerUrl,
    tokenUrl,
    userUrl,
  } from "../../../components/utils/urls";
  import {
    setCookie,
    deleteCookie,
    getCookie,
  } from "../../../components/utils/cookie";
  import { request } from "../../../components/utils/api";
  import { TEdit, TLogin, TLogout, TProfile, TResetPassword, TUserDataResult } from "./user-types";
  import { AppDispatch } from "../../../components/utils/types";
import { GET_AUTH_FAILED, GET_AUTH_REQUEST, GET_AUTH_SUCCESS, GET_EDIT_FAILED, GET_EDIT_REQUEST, GET_EDIT_SUCCESS, GET_FORGOT_FAILED, GET_FORGOT_REQUEST, GET_FORGOT_SUCCESS, GET_LOGOUT_FAILED, GET_LOGOUT_REQUEST, GET_LOGOUT_SUCCESS, GET_REFRESH_FAILED, GET_REFRESH_REQUEST, GET_REFRESH_SUCCESS, GET_REG_FAILED, GET_REG_REQUEST, GET_REG_SUCCESS, GET_RESET_FAILED, GET_RESET_REQUEST, GET_RESET_SUCCESS } from "../../../services/actions/user";

export function postLogin(data: TLogin, callbackFunction = () => {}) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_AUTH_REQUEST
        });
        request(loginUrl, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: "Bearer " + getCookie("token"),
          }
        })
          .then((res) => {
            if (res.success) {
                dispatch({
                    type: GET_AUTH_SUCCESS,
                    user: res.user
                });
                saveTokens(res);
                callbackFunction();
              } else {
                dispatch({
                    type: GET_AUTH_FAILED,
                    message: 'Ошибка запроса'
                });
                if (res.message === 'jwt expired') {
                  dispatch(refreshToken());
                }
              }
            })
            .catch((err) => {
                dispatch({
                    type: GET_AUTH_FAILED,
                    message: 'Ошибка запроса'
                });
                if (err.message === 'jwt expired') {               
                  dispatch(refreshToken());
              }
            })
    };
  }
  
  export function saveTokens(data: TUserDataResult, isDeleted: boolean = false) {
              console.log("saveTokens");
              console.log(data.accessToken);
              let authToken;
              if (data.accessToken.indexOf("Bearer") === 0) {
                authToken = data.accessToken.split("Bearer ")[1];
              }
              if (authToken) {
                setCookie("token", authToken, { expires: 20 * 60 });
                localStorage.setItem("refreshToken", data.refreshToken);
              }
              delTokens(isDeleted);
  }
  
  export function delTokens(delTokens: boolean) {
    if (delTokens) {
      deleteCookie("token");
      localStorage.clear();
    }
  }
  
  
  
  
  export function refreshToken() {
    return async (dispatch: AppDispatch ) => {
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
        })
        .catch((err) => {
          console.error(err);
          dispatch({
            type: GET_REFRESH_FAILED,
            message: err
          });
        });
    };
}




//register
export function postRegister(data: TProfile, callbackFunction = () => {}) {
  return function (dispatch: AppDispatch) {
      dispatch({
          type: GET_REG_REQUEST
      });
      request(registerUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: "Bearer " + getCookie("token"),
        }
      })
        .then((res) => {
          if (res.success) {
              dispatch({
                  type: GET_REG_SUCCESS,
                  user: res.user
              });
              saveTokens(res);              
              callbackFunction();
            } else {
              dispatch({
                  type: GET_REG_FAILED,
                  message: 'Ошибка запроса'
              });
              if (res.message === 'jwt expired') {
                dispatch(refreshToken());
              }
            }
          })
          .catch((err) => {
              dispatch({
                  type: GET_REG_FAILED,
                  message: err
              });
              if (err.message === 'jwt expired') {               
                dispatch(refreshToken());
            }
          })
  };
}

//forgot
export function postForgot(email: string, callbackFunction = () => {}) {
  return async function (dispatch: AppDispatch) {
      dispatch({
          type: GET_FORGOT_REQUEST
      });
      request(passwordResetUrl, {
        method: "POST",
        body: JSON.stringify({
          email: email
      }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: "Bearer " + getCookie("token"),
        }
      })
        .then((res) => {
          if (res.success) {
              dispatch({
                  type: GET_FORGOT_SUCCESS
              });
              callbackFunction();
            } else {
              dispatch({
                  type: GET_FORGOT_FAILED,
                  message: 'Ошибка запроса'
              });
              if (res.message === 'jwt expired') {
                dispatch(refreshToken());
              }
            }
          })
          .catch((err) => {
              dispatch({
                  type: GET_REG_FAILED,
                  message: err
              });
              if (err === 'jwt expired') {               
                dispatch(refreshToken());
            }
          });        
  };
}

//reset
export function postResetPassword(data: TResetPassword, callbackFunction = () => {}) {
  return async function (dispatch: AppDispatch) {
      dispatch({
          type: GET_RESET_REQUEST
      });
      request(passwordResetResetUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: "Bearer " + getCookie("token"),
        }
      })
        .then((res) => {
          if (res.success) {
              dispatch({
                  type: GET_RESET_SUCCESS,
                  data: res.user
              });
              callbackFunction();
            } else {
              dispatch({
                  type: GET_RESET_FAILED,
                  message: 'Ошибка запроса'
              });
              if (res.message === 'jwt expired') {
                dispatch(refreshToken());
              }
            }
          })
          .catch((err) => {
              dispatch({
                  type: GET_RESET_FAILED,
                  message: err
              });
              if (err === 'jwt expired') {               
                dispatch(refreshToken());
            }
          });       
  };
}

//logout
export function postLogout(data: TLogout, callbackFunction = () => {}) {
  return async function (dispatch: AppDispatch) {
      dispatch({
          type: GET_LOGOUT_REQUEST
      });
      request(logoutUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: "Bearer " + getCookie("token"),
        }
      })
        .then((res) => {
          if (res.success) {
              dispatch({
                  type: GET_LOGOUT_SUCCESS
              });
              delTokens(true);
              callbackFunction();
            } else {
              dispatch({
                  type: GET_LOGOUT_FAILED,
                  message: 'Ошибка запроса'
              });
              if (res.message === 'jwt expired') {
                dispatch(refreshToken());
              }
            }
          })
          .catch((err) => {
              dispatch({
                  type: GET_LOGOUT_FAILED,
                  message: err
              });
              if (err === 'jwt expired') {               
                dispatch(refreshToken());
            }
          });        
  };
}

//edit
export function patchEdit(data: TEdit) {
  return async function (dispatch: AppDispatch) {
      dispatch({
          type: GET_EDIT_REQUEST
      });
      request(userUrl, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: "Bearer " + getCookie("token"),
        }
      })
        .then((res) => {
          if (res.success) {
              dispatch({
                  type: GET_EDIT_SUCCESS,
                  user: res.user
              });
            } else {
              dispatch({
                  type: GET_EDIT_FAILED,
                  message: 'Ошибка запроса'
              });
              if (res.message === 'jwt expired') {
                dispatch(refreshToken());
                dispatch(patchEdit(data));
              }
            }
          })
          .catch((err) => {
              dispatch({
                  type: GET_EDIT_FAILED,
                  message: err
              });
              if (err === 'jwt expired') {               
                dispatch(refreshToken());
                dispatch(patchEdit(data));
            }
          });        
  };
}