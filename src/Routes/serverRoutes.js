const SERVER_URL = process.env.REACT_APP_SERVER_URL;
// const SERVER_URL =
// "http://44c2-101-53-242-135.ngrok.io/api";
// const SERVER_URL = "http://a4ed-101-53-242-135.ngrok.io/api";

export const auth = {
  SIGNUP: `${SERVER_URL}/v3/auth/signup`,
  VERIFY_USER: `${SERVER_URL}/v3/auth/verifyuser`,
  LOGIN: `${SERVER_URL}/v3/auth/login`,
  FORGET: `${SERVER_URL}/v3/auth/forgot`,
  VERIFY_FORGET: `${SERVER_URL}/v3/auth/verifyforgot`,
  UPDATE_PASSWORD: `${SERVER_URL}/v3/auth/updatepassword`,
  LOGGEDIN_USER: `${SERVER_URL}/v3/users/me`,

  //
  VERIFY_EMAIL: `${SERVER_URL}/v3/auth/verify/email`,
  FORGET_PASSWORD: `${SERVER_URL}/v3/auth/password/forget`,
  RESET_PASSWORD: `${SERVER_URL}/v3/auth/password/reset`,

  // google 2f verification
  VERIFY_2F_GOOGLE: `${SERVER_URL}/v3/auth/verify2fa`,
  VERIFY_2F_EMAIL: `${SERVER_URL}/v3/auth/verifyEmailSMSVerification`,
  VERIFY_2F_SMS: `${SERVER_URL}/v3/auth/verifySMSVCode`,

  // update profile data
  UPDATE_PROFILE: `${SERVER_URL}/v3`,

  // update password
  UPDATE_PASSWORD: `${SERVER_URL}/v3/auth/updatePassword`,

  // is_Verificatrion_on
  IS_EMAIL_AUTH_ON: `${SERVER_URL}/v3/auth/updateEmailVerification`,
  ENABLE_GOOGLE_AUTH: `${SERVER_URL}/v3/auth/enable2fa`,
  IS_GOOGLE_AUTH_ON: `${SERVER_URL}/v3/auth/update2faStatus`,
  IS_SMS_AUTH_ON: `${SERVER_URL}/v3/auth/updateSMSVerification`,
};

export const kyc = {
  ADD_KYC: `${SERVER_URL}/v1/add/kyc`,
  GET_KYC: `${SERVER_URL}/v1/kyc/loggedIn-user`,
};

export const exchange = {
  GET_EXCHANGEABLE_TOKENS: `${SERVER_URL}/v1/tokens/status/exchangeable`,
  GET_NON_TRADABLE_TOKENS: `${SERVER_URL}/v1/tokens/status/exchangeable?tradable=false`,
  // GET_EXCHANGEABLE_TOKENS: `${SERVER_URL}/v3/itoseries/ongoing/all`,
  GET_TOKEN_DETAIL: `${SERVER_URL}/v1/tokens/`, // /tokens/:id
  ONGOING_SERIES_BY_TOKEN_ID: `${SERVER_URL}/v3/itoseries/ito/`, //:itoId/ongoing
  EXCHANGE_ORDER: `${SERVER_URL}/v3/orders`,
  GET_USER_EXCHANGE_ORDER: `${SERVER_URL}/v3/orders/users/me`,
  BUY_TOKEN: `${SERVER_URL}/v3/orders/buytoken`,
  GET_ORDER: `${SERVER_URL}/v3/orders`,
  DELETE_ORDERS: `${SERVER_URL}/v3/orders/`, //:id
  UPDATE_ORDERS: `${SERVER_URL}/v3/orders/`, //:id
  SELL_TOKENS: `${SERVER_URL}/v3/tokens/status/sell`,
};

// wallet route
export const wallet = {
  GET_TOKEN_LIST: `${SERVER_URL}/v3/tokens/users/me`,
  GET_WALLET_DETAILS: `${SERVER_URL}/v3/wallets/users/me`,
  GET_FIAL_TRANSACTION_DETAILS: `${SERVER_URL}/v1/fiat/transactions/me`,
  DEPOSIT_PAYMENT: `${SERVER_URL}/v3/fiat/add/bank`,
  GET_USER_WALLET_DETAIL: `${SERVER_URL}/v3/wallets/users/me`,
  TOKEN_TRANSFER: `${SERVER_URL}/v3/wallet_transactions`,
  PAYPAL_DEPOSIT_FIAT: `${SERVER_URL}/v3/fiat/add/paypal`,

  PAYPAL_PAYMENT_SUCCESS: `${SERVER_URL}/v3/fiat/payment/process`,
  PAYPAL_PAYMENT_CANCEL: `${SERVER_URL}/v3/fiat/payment/cancel`,
  REQUEST_WITHDRAW: `${SERVER_URL}/v3/withdraw/create`,
  TOKEN_LISTING: `${SERVER_URL}/v3/wallets/list/accounts`,
  REQUEST_WITHDRAW_LIST: `${SERVER_URL}/v3/withdraw/list`,
  BANK_DETAILS: `${SERVER_URL}/v1/dinisium/bank/details`,
};

// export const userMangement = {};

// Subscriptions
export const subscription = {
  GET_SUBSCRIPTIONS: `${SERVER_URL}/v3/subscriptions/by_status`, //?status=upcoming || open
  BUY_SUBSCRIPTION: `${SERVER_URL}/v3/subscriptions/subscribe`,
  YOUR_SUBSCRIPTIONS: `${SERVER_URL}/v3/subscriptions/me`,
};

// voting
export const voting = {
  GET_VOTING: `${SERVER_URL}/v1/elections`,
  CAST_VOTE: `${SERVER_URL}/v1/votes`,
  GET_VOTE_STATUS: `${SERVER_URL}/v1/elections/`,
};

// Transfer
export const transfer = {
  GET_ALL_USERS: `${SERVER_URL}/v2/getAllUers`,
};

export const ito = {
  GET_AVAILABLE_ITO: `${SERVER_URL}/v1/itos/available`,
  ITO_SERIES_BY_STATUS: `${SERVER_URL}/v3/itoseries/ongoing/all`,
};
export const dashboard = {
  GET_AVAILABLE_TOEKNS_GRAPH: `${SERVER_URL}/v3/tokens/users/me`,
};
