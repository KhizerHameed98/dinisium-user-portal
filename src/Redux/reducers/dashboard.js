import {
  GET_EXCHANGE_ORDER_SUCCESS,
  GET_EXCHANGE_ORDER_ERR,
  GET_SUBSCRIPTION_SUCCESS,
  GET_SUBSCRIPTION_ERR,
  GET_ONGOING_ITO_SERIES_SUCCESS,
  GET_ONGOING_ITO_SERIES_ERR,
  GET_USER_TOKEN_SUCCESS,
  GET_USER_TOKEN_ERR,
  GET_AVAILABLE_GRAPH,
} from "../actions/types";

const initialState = {
  loading: true,
  tokenData: {},
  orderData: {},
  data: [],
  seriesData: [],
  subscriptionsList: [],
  userTokenList: [],
  onGoingItoSeriesList: [],
  buyTokenData: {},
  error: {},
  errors: [],
  AvailableGraphData: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ONGOING_ITO_SERIES_SUCCESS:
    case GET_EXCHANGE_ORDER_SUCCESS:
    case GET_SUBSCRIPTION_SUCCESS:
    case GET_USER_TOKEN_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case GET_EXCHANGE_ORDER_ERR:
    case GET_ONGOING_ITO_SERIES_ERR:
    case GET_SUBSCRIPTION_ERR:
    case GET_USER_TOKEN_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_AVAILABLE_GRAPH:
      return {
        ...state,
        AvailableGraphData: payload,
      };

    default:
      return state;
  }
};
