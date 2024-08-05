import {
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  GET_REG_REQUEST,
  GET_REG_SUCCESS,
  GET_REG_FAILED,
  GET_FORGOT_REQUEST,
  GET_FORGOT_SUCCESS,
  GET_FORGOT_FAILED,
  GET_RESET_REQUEST,
  GET_RESET_SUCCESS,
  GET_RESET_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_EDIT_REQUEST,
  GET_EDIT_SUCCESS,
  GET_EDIT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_REFRESH_REQUEST,
  GET_REFRESH_SUCCESS,
  GET_REFRESH_FAILED,
} from "../actions/user";
import { TGetUserResponse} from "../../components/utils/types";

import { TUserActions } from "../actions/user";
import { TProfile } from "../../data/apis/user-api/user-types";

export type TUserState = {
    isUserAuth: boolean;
    isLoading: boolean;
    requestError: string; 
    //requestSucces: string;
    user: TProfile;
}

const userInitialState:TUserState = {
  isUserAuth: false,
  isLoading: false,
  requestError: "",
  //requestSucces: "",
  user: {
    name: '',
    email: '',
    password: '',
  },
};

export const userReducer = (state = userInitialState, action:TUserActions):TUserState => {
  switch (action.type) {
    case GET_AUTH_REQUEST:
    case GET_REG_REQUEST:
    case GET_EDIT_REQUEST:
    case GET_FORGOT_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_RESET_REQUEST:
    case GET_LOGOUT_REQUEST:
    case GET_REFRESH_REQUEST:
    case GET_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isUserAuth: false,
        requestError: "",
      };
    }
    case GET_AUTH_SUCCESS:
      let userData = action.data as TProfile;     
      return {
        ...state,
        isLoading: false,
        isUserAuth: true,
        user: {
          ...state.user,
          name: userData.name,
          email: userData.email,
      },
        requestError: "",
      };
    case GET_REG_SUCCESS:
    case GET_USER_SUCCESS:
    case GET_EDIT_SUCCESS: {
      let userData = action.data as TProfile;     
      return {
        ...state,
        isLoading: false,
        isUserAuth: true,
        user: {
          ...state.user,
          name: userData.name,
          email: userData.email,
      },
        requestError: "",
      };
    }

    case GET_FORGOT_SUCCESS: {
      return {
        ...state,
        isUserAuth: false,
      };
    }
    case GET_REFRESH_SUCCESS: {
      return {
        ...state,
        isUserAuth: false,
      };
    }
    case GET_RESET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isUserAuth: true,
        requestError: "",
      };
    }

    case GET_LOGOUT_SUCCESS: {
      return {
        ...state,
        isUserAuth: false,
        user: {
          name: '',
          email: '',
          password: '',
        },
      };
    }

    case GET_AUTH_FAILED:
    case GET_REG_FAILED:
    case GET_FORGOT_FAILED:
    case GET_LOGOUT_FAILED:
    case GET_RESET_FAILED:
    case GET_USER_FAILED:
    case GET_REFRESH_FAILED:
    case GET_EDIT_FAILED: {
      return {
        ...state,
        isLoading: false,
        isUserAuth: false,
        requestError: typeof(action.data),
      };
    }

    default: {
      return state;
    }
  }
};
