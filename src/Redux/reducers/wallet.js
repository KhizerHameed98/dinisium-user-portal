import {
  GET_TOKEN_LIST_SUCCESS,
  GET_TOKEN_LIST_ERR,
  DEPOSIT_PAYMENT_ERR,
  DEPOSIT_PAYMENT_SUCCESS,
  GET_WALLET_DETAILS_ERR,
  GET_WALLET_DETAILS_SUCCESS,
  GET_FIAT_TRANSACTION_DETAILS_SUCCESS,
  GET_FIAT_TRANSACTION_DETAILS_ERR,
  TRANSFER_TOKEN_SUCCESS,
  TRANSFER_TOKEN_ERR,
  GET_TOKEN_TRANSACTIONS_SUCCESS,
  GET_TOKEN_TRANSACTIONS_ERR,
  DEPOSIT_FIAT_SUCCESS,
  DEPOSIT_FIAT_ERR,
  PAYPAL_PAYMENT_SUCCESS_SUCCESS,
  PAYPAL_PAYMENT_SUCCESS_ERR,
  PAYPAL_PAYMENT_CANCEL_SUCCESS,
  PAYPAL_PAYMENT_CANCEL_ERR,
  REQUEST_WITHDRAW,
  TOKEN_LIST,
  GET_WITHDRAW_LIST,
  GET_TOKENS,
  GET_BANK_DETAILS,
} from "../actions/types";

const initialState = {
  loading: true,
  depositPayment: {},
  walletDetails: {},
  tokenTransfer: {},
  tokenList: [],
  TokensList: [],
  tokenTransactionList: [],
  fiatTransactionList: [],
  RequestWithdraw: [],
  RequestWithdrawList: [],
  TokensListt: [],
  error: {},
  errors: [],
  fiat_balance: "",
  BankDetails:[]
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PAYPAL_PAYMENT_SUCCESS_SUCCESS:
    case PAYPAL_PAYMENT_CANCEL_SUCCESS:
    case DEPOSIT_FIAT_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case GET_TOKEN_LIST_SUCCESS:
      return {
        ...state,
        tokenList: payload,
        loading: false,
      };

    case TRANSFER_TOKEN_SUCCESS:
      return {
        ...state,
        tokenTransfer: payload.res,
        tokenList: state.tokenList.map((item) =>
          item.ito_token_id === payload.tokenId
            ? // transform the one with a matching id
              { ...item, amount: item.amount - payload.transferAmount }
            : // otherwise return original item
              item
        ),
        loading: false,
      };

    case GET_TOKEN_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        tokenTransactionList: payload,
        loading: false,
      };

    case GET_FIAT_TRANSACTION_DETAILS_SUCCESS:
      return {
        ...state,
        fiatTransactionList: payload,
        loading: false,
      };

    case PAYPAL_PAYMENT_SUCCESS_ERR:
    case PAYPAL_PAYMENT_CANCEL_ERR:
    case GET_TOKEN_TRANSACTIONS_ERR:
    case GET_TOKEN_LIST_ERR:
    case TRANSFER_TOKEN_ERR:
    case DEPOSIT_PAYMENT_ERR:
    case GET_WALLET_DETAILS_ERR:
    case GET_FIAT_TRANSACTION_DETAILS_ERR:
    case DEPOSIT_FIAT_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DEPOSIT_PAYMENT_SUCCESS:
      return {
        ...state,
        depositPayment: payload,
        loading: false,
      };
    case GET_WALLET_DETAILS_SUCCESS:
      return {
        ...state,
        walletDetails: payload,
        loading: false,
      };

    case REQUEST_WITHDRAW:
      return {
        ...state,
        RequestWithdraw: payload,
      };

    case TOKEN_LIST:
      return {
        ...state,
        TokensList: payload,
      };

    case GET_WITHDRAW_LIST:
      return {
        ...state,
        RequestWithdrawList: payload,
      };

    case GET_TOKENS:
      return {
        ...state,
        TokensListt: payload,
      };

      case GET_BANK_DETAILS:
        return {
          ...state, 
          BankDetails:payload
        }

    default:
      return state;
  }
};
