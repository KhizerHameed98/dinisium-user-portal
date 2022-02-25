import {
  GET_OPEN_SUBSCRIPTION_SUCCESS,
  GET_OPEN_SUBSCRIPTION_ERR,
  GET_YOUR_SUBSCRIPTION_SUCCESS,
  GET_YOUR_SUBSCRIPTION_ERR,
  GET_UPCOMING_SUBSCRIPTION_SUCCESS,
  GET_UPCOMING_SUBSCRIPTION_ERR,
  SUBSCRIPTION_BUY_SUCCESS,
  SUBSCRIPTION_BUY_ERR,
} from "../actions/types";

const initialState = {
  loading: true,
  openSubscriptions: {},
  upcomingSubscriptions: {},
  yourSubscriptions: {},
  error: {},
  errors: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_OPEN_SUBSCRIPTION_SUCCESS:
    case GET_UPCOMING_SUBSCRIPTION_SUCCESS:
    case SUBSCRIPTION_BUY_SUCCESS:
    case GET_YOUR_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case GET_OPEN_SUBSCRIPTION_ERR:
    case GET_UPCOMING_SUBSCRIPTION_ERR:
    case SUBSCRIPTION_BUY_ERR:
    case GET_YOUR_SUBSCRIPTION_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
