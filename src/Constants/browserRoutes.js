const browserRoute = {
  HOST: process.env.REACT_APP_HOST,
  // HOST: "http://139.59.7.248:5000",
  SERVER_URLL: "http://139.59.7.248:5000",
  BLANK_LINK: "#!",
  SIGNIN: "/auth/signin",
  VERIFY_EMAIL: "/verifyemail/:id",
  SMS_VERIFICATION: "/auth/sms-verification",
  GOOGLE_VERIFICATION: "/auth/google-verification",
  EMAIL_VERIFICATION: "/auth/email-verification",
  SIGNUP: "/auth/signup",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password/:id",
  SIGNUP_CODE_VERIFICATION: "/auth/code-verification",
  LOGGEDIN_DEFAULT: "/investor/dashboard",

  DASHBOARD: "/investor/dashboard",

  INVESTOR_ROUTE: "/investor",

  SUBSCRIPTION: "/investor/subscription",
  SUBSCRIPTION_PARTICIPANT:
    "/investor/subscription/subscription-participant/:id",
  SUBSCRIPTION_PARTICIPANT_BTN:
    "/investor/subscription/subscription-participant/",
  ALL_OPEN_SUBSCRIPTION: "/investor/subscription/all-open-subscription", //
  ALL_YOUR_SUBSCRIPTION: "/investor/subscription/all-your-subscription", //
  ALL_UPCOMMING_SUBSCRIPTION:
    "/investor/subscription/all-upcomming-subscription", //

  USER_MANAGEMENT: "/investor/user-management",
  USER_DETAILS: "/investor/user-management/user-details/:id",
  USER_DETAIL_BTN: "/investor/user-management/user-details/",
  INVESTMENT_DETAILS: "/investor/user-management/investment-details/:id",
  INVESTMENT_DETAIL_BTN: "/investor/user-management/investment-details/",

  WALLET: "/investor/wallet",
  REQUEST_WITHDRAW: "/Investor/requestWithdraw",
  WALLET_DETAILS: "/investor/wallet/details",
  BANK_PAYMENT: "/investor/wallet/pay-via-bank",
  FIAT_DETAIL: "/investor/wallet/fiat-detail",
  TOKEN_DETAIL: "/investor/wallet/token-detail",

  PAYPAL_PROCESS: "/investor/fiat/payment/process",

  PAYPAL_PAYMENT_CANCEL: "/investor/fiat/payment/cancel",

  KYC_MANAGEMENT: "/investor/kyc-management",
  // REQUEST_STATUS: "/investor/kyc-management/requst-status/:id",
  // REQUEST_STATUS_BTN: "/investor/kyc-management/requst-status/",
  APPROVED_REQUEST_STATUS_BTN:
    "/investor/kyc-management/approved-requst-status/",
  APPROVED_REQUEST_STATUS:
    "/investor/kyc-management/approved-requst-status/:id",

  PENDING_REQUEST_STATUS_BTN: "/investor/kyc-management/pending-requst-status/",
  PENDING_REQUEST_STATUS: "/investor/kyc-management/pending-requst-status/:id",

  REJECTED_REQUEST_STATUS_BTN:
    "/investor/kyc-management/rejected-requst-status/",
  REJECTED_REQUEST_STATUS:
    "/investor/kyc-management/rejected-requst-status/:id",

  EXCHANGE: "/investor/marketplace",
  EXCHANGE_ORDER: "/investor/marketplace/marketplace-order",

  VOTING: "/investor/voting",
  PAST_VOTING_LIST: "/investor/voting/past-voting-list",
  VOTING_DETAILS: "/investor/voting/details/:id",
  VOTING_DETAILS_BTN: "/investor/voting/details/",

  ITO_MANAGEMENT: "/investor/ito-management",
  CREATE_NEW_SERIES: "/investor/ito-management/create-new-sereis",
  ITO_MANAGEMENT_DETAILS: "/investor/ito-management/details/:id",
  ITO_MANAGEMENT_DETAILS_BTN: "/investor/ito-management/details/",

  ADMIN_MANAGEMENT: "/investor/admin-management",
  ADD_NEW_ADMIN: "/investor/admin-management/add-new-admin",
  ADMIN_DETAILS: "/investor/admin-management/details/:id",
  ADMIN_DETAILS_BTN: "/investor/admin-management/details/",

  CALCULATOR: "/investor/calculator",

  TRANSFER: "/investor/transfer",

  BUY_TOKEN: "/investor/buy-token",
  PROFILE: "/investor/profile",
  EDIT_PROFILE: "/investor/edit-profile",
};

export default browserRoute;
