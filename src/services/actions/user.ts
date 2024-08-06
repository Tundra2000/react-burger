import {
  userUrl,
} from "../../components/utils/urls";
import {
  getCookie,
} from "../../components/utils/cookie";
import { request } from "../../components/utils/api";
import { TGetUserResponse} from "../../components/utils/types";
import { AppDispatch } from "../../components/utils/types";
import { TProfile } from "../../data/apis/user-api/user-types";
import { refreshToken as ref } from "../../data/apis/user-api/user-api";

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

export interface IAuthReqAction {
  readonly type: typeof GET_AUTH_REQUEST;
}

export interface IAuthSuccessAction {
  readonly type: typeof GET_AUTH_SUCCESS;
  data: TProfile;
}

export interface IAuthFailedAction {
  data: string;
  readonly type: typeof GET_AUTH_FAILED;
}

export interface IRegReqAction {
  readonly type: typeof GET_REG_REQUEST;
}

export interface IRegSuccessAction {
  data: TProfile;
  readonly type: typeof GET_REG_SUCCESS;
}

export interface IRegFailedAction {
  data: string;
  readonly type: typeof GET_REG_FAILED;
}

export interface IForgotReqAction {
  readonly type: typeof GET_FORGOT_REQUEST;
}

export interface IForgotSuccessAction {
  readonly type: typeof GET_FORGOT_SUCCESS;
}

export interface IForgotFailedAction {
  data: string;
  readonly type: typeof GET_FORGOT_FAILED;
}

export interface IResetReqAction {
  readonly type: typeof GET_RESET_REQUEST;
}

export interface IResetSuccessAction {
  readonly type: typeof GET_RESET_SUCCESS;
}

export interface IResetFailedAction {
  data: string;
  readonly type: typeof GET_RESET_FAILED;
}

export interface ILogoutReqAction {
  readonly type: typeof GET_LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof GET_LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  data: string;
  readonly type: typeof GET_LOGOUT_FAILED;
}

export interface IEditUserReqAction {
  readonly type: typeof GET_EDIT_REQUEST;
}

export interface IEditUserSuccessAction {
  readonly data: TProfile;
  readonly type: typeof GET_EDIT_SUCCESS;
}

export interface IEditUserFailedAction {
  data: string;
  readonly type: typeof GET_EDIT_FAILED;
}

export interface IUserReqAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  data: TProfile;
}

export interface IUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
  data: string;
}

export interface IRefreshReqAction {
  readonly type: typeof GET_REFRESH_REQUEST;
}

export interface IRefreshSuccessAction {
  readonly type: typeof GET_REFRESH_SUCCESS;
}

export interface IRefreshFailedAction {
  readonly type: typeof GET_REFRESH_FAILED;
  data: string;
}

//userApi
export interface IUserApiAction {
  readonly type: string;
  data?: TGetUserResponse | string;
}

export type TUserActions = IAuthFailedAction
| IAuthReqAction
| IAuthSuccessAction
| IEditUserFailedAction
| IEditUserReqAction
| IEditUserSuccessAction
| IForgotFailedAction
| IForgotReqAction
| IForgotSuccessAction
| ILogoutFailedAction
| ILogoutReqAction
| ILogoutSuccessAction
| IUserFailedAction
| IUserReqAction
| IUserSuccessAction
| IRefreshFailedAction
| IRefreshReqAction
| IRefreshSuccessAction  
| IRegFailedAction
| IRegReqAction
| IRegSuccessAction
| IResetFailedAction
| IResetReqAction
| IResetSuccessAction
| IUserApiAction


export function getUser() {
  return async (dispatch: AppDispatch) => {
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
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          data: res.user,
        });
      })
      .catch((err) => {
        console.error(err);
        if (err === 'jwt expired') {
          console.error("Обнови токен пользователя!!!");
          dispatch(ref());
      } else {
        dispatch({
          type: GET_USER_FAILED,
          data: String(err.message),
        });
      }
      });
  };
}
