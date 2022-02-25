import {
  GET_TRADEABLE_TOKENS_SUCCESS,
  GET_TRADEABLE_TOKENS_ERR,
  GET_NON_TRADEABLE_TOKENS_SUCCESS,
  GET_NON_TRADEABLE_TOKENS_ERR,
  GET_ONGOING_SERIES_SUCCESS,
  GET_ONGOING_SERIES_ERR,
  GET_TOKEN_DETAIL_ERR,
  GET_TOKEN_DETAIL_SUCCESS,
  TOKEN_SELECTED_STATUS,
  SERIES_SELECTED_STATUS,
  BUY_REQUEST_TOKEN_STATUS,
  CREATE_EXCHANGE_ORDER_SUCCESS,
  CREATE_EXCHANGE_ORDER_ERR,
  GET_EXCHANGE_ORDER_SUCCESS,
  GET_EXCHANGE_ORDER_ERR,
  BUY_TOKEN_SUCCESS,
  BUY_TOKEN_ERR,
  BUY_REQUEST_SERIES_SELECTED,
  CREATE_ORDER,
  GET_EXHANGE_ORDER,
  DELETE_ORDER,
  BUY_TOKENSS,
  UPDATE_ORDER_ERR,
  UPDATE_ORDER_SUCCESS,
  GET_SELL_TOKENS,
  VANISH_TOKEN,
} from "../actions/types";

const initialState = {
  loading: true,
  tokenData: {},
  orderData: {},
  data: [],
  seriesData: [],
  deleteOrders: [],
  buyTokenss: [],
  updateOrder: {},
  buyRequestSeriesData: [],
  buyTokenData: {},
  selectedSeriesData: {},
  error: {},
  errors: [],
  response: [],
  exchangeOrder: [],
  nonTradableTokens: {},
  sellTokens: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TRADEABLE_TOKENS_SUCCESS:
    case GET_TOKEN_DETAIL_SUCCESS:
    case TOKEN_SELECTED_STATUS:
    case GET_EXCHANGE_ORDER_SUCCESS:
    case SERIES_SELECTED_STATUS:
    case GET_ONGOING_SERIES_SUCCESS:
    case BUY_REQUEST_TOKEN_STATUS:
    case BUY_REQUEST_SERIES_SELECTED:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case CREATE_EXCHANGE_ORDER_SUCCESS:
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          data: [
            {
              ...payload.orderRequestData,
              token_name:
                payload.orderType === "buy"
                  ? state.buyTokenData.token_name
                  : state.myTokenData.token_name,
              token_symbol:
                payload.orderType === "buy"
                  ? state.buyTokenData.token_symbol
                  : state.tokenData &&
                    state.tokenData.data &&
                    state.tokenData.data.token_symbol
                  ? state.tokenData.data.token_symbol
                  : "",
            },
            ...state.orderData.data,
          ],
        },
        loading: false,
      };
    case BUY_TOKEN_SUCCESS:
      return {
        ...state,
        seriesData: state.seriesData.map((item) =>
          item.id === payload.seriesId
            ? // transform the one with a matching id
              { ...item, supply: item.supply - payload.seriesSupply }
            : // otherwise return original item
              item
        ),

        selectedSeriesData: {
          supply: state.selectedSeriesData.supply - payload.seriesSupply,
        },
        loading: false,
      };

    case GET_TRADEABLE_TOKENS_ERR:
    case GET_NON_TRADEABLE_TOKENS_ERR:
    case GET_TOKEN_DETAIL_ERR:
    case CREATE_EXCHANGE_ORDER_ERR:
    case GET_EXCHANGE_ORDER_ERR:
    case BUY_TOKEN_ERR:
    case GET_ONGOING_SERIES_ERR:
    case UPDATE_ORDER_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CREATE_ORDER:
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        response: payload,
      };

    case GET_EXHANGE_ORDER:
      return {
        ...state,
        exchangeOrder: payload,
      };

    case DELETE_ORDER:
      return {
        ...state,
        deleteOrders: payload,
      };

    case BUY_TOKENSS:
      return {
        ...state,
        buyTokenss: payload,
      };
      
    case GET_NON_TRADEABLE_TOKENS_SUCCESS:
      return {
        ...state,
        nonTradableTokens: payload,
      };

    case GET_SELL_TOKENS:
      return {
        ...state,
        sellTokens: payload,
      };

      case  VANISH_TOKEN:
        return {
          ...state,
          buyTokenData: {}
        }

    default:
      return state;
  }
};
