import {
  REGISTER_MSG,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  VERIFY_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FORGET_SUCCESS,
  FORGET_FAIL,
  FORGET_MSG,
  RESET_SUCCESS,
  RESET_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  ERR_USERS,
  USER_LOADED_DATA,
  AUTH_ERROR_DATA,
  LOGOUT,
  SET_AUTH_VERIFICATION,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERR,
  IS_EMAIL_AUTH_ON_SUCCESS,
  IS_EMAIL_AUTH_ON_ERR,
  IS_GOOGLE_AUTH_ON_SUCCESS,
  IS_GOOGLE_AUTH_ON_ERR,
  IS_SMS_AUTH_ON_SUCCESS,
  IS_SMS_AUTH_ON_ERR,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERR,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user"),
  loading: true,
  isAuthenticated: null,
  userDetails: {},
  updatePassword: {},
  userWallet: {},
  isEmailAuthOn: {},
  isGoogleAuthOn: {},
  isSMSAuthOn: {},
  userUpdate: {},
  users: [],
  error: {},
  errors: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADED:
    case REGISTER_MSG:
    case REGISTER_SUCCESS:
    case FORGET_MSG:
    case FORGET_SUCCESS:
    case RESET_SUCCESS:
    case IS_EMAIL_AUTH_ON_SUCCESS:
    case IS_GOOGLE_AUTH_ON_SUCCESS:
    case IS_SMS_AUTH_ON_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case ERR_USERS:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case REGISTER_FAIL:
    case VERIFY_FAIL:
    case FORGET_FAIL:
    case RESET_FAIL:
    case AUTH_ERROR_DATA:
    case AUTH_ERROR:
    case IS_EMAIL_AUTH_ON_ERR:
    case IS_GOOGLE_AUTH_ON_ERR:
    case IS_SMS_AUTH_ON_ERR:
    case UPDATE_PROFILE_ERR:
    case UPDATE_PASSWORD_ERR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    case SET_AUTH_VERIFICATION:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case USER_LOADED_DATA:
      localStorage.setItem("user", JSON.stringify(payload.userDetails));
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.userDetails));
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("persist:rootReducer");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
        userDetails: {},
        userWallet: {},
        user: null,
        users: [],
      };

    default:
      return state;
  }
};
