import {
    loginUrl,
    tokenUrl,
  } from "../../../components/utils/urls";
  import {
    setCookie,
    deleteCookie,
    getCookie,
  } from "../../../components/utils/cookie";
  import { request } from "../../../components/utils/api";
  //import { Dispatch } from "redux";
  //import { TGetUserResponse, TUserApi, TLogin } from "../../../components/utils/types";
  import { TLogin, TUserDataResult } from "./user-types";
  import { AppDispatch } from "../../../components/utils/types";
import { GET_AUTH_FAILED, GET_AUTH_REQUEST, GET_AUTH_SUCCESS, GET_REFRESH_FAILED, GET_REFRESH_REQUEST, GET_REFRESH_SUCCESS } from "../../../services/actions/user";

export function postLogin(data: TLogin) {
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
                    data: res.user
                });
                saveTokens(res);
              } else {
                dispatch({
                    type: GET_AUTH_FAILED,
                    data: 'Ошибка запроса'
                });
                if (res.message === 'jwt expired') {
                  dispatch(refreshToken());
                }
              }
            })
            .catch((err) => {
                dispatch({
                    type: GET_AUTH_FAILED,
                    data: 'Ошибка запроса'
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
            data: String(err.message)
          });
        });
    };
}