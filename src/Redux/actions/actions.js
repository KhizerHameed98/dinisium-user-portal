//Auth
export {
  loadUser,
  loadUserWallet,
  register,
  login,
  forgetPassword,
  resetPasswordFunction,
  verifyGoogleAuthCode,
  verifyEmailAuthCode,
  logout,
  verifySMSAuthCode,
  updateProfile,
  updatePassword,
  emailAuthentiactionOn,
  googleAuthentiactionOn,
  smsAuthentiactionOn,
} from "../../Services/authServices";

//Dashboard

//KYC
export { addKyc, getKycByUserId } from "../../Services/kycServices";

//Exchange
export {
  getExchangeableTokens,
  getNonTradableTokens,
  getTokenDetailById,
  isTokenSelected,
  isSeriesSelected,
  isBuyRequestTokenSelected,
  exchangeOrderRequest,
  getUserExchangeOrders,
  buyToken,
  getOngoingSeriesById,
  isBuyRequestSeriesSelected,
  getOrders,
  getExchangeOrder,
  DeleteOrder,
  BuyTokenn,
  updateOrder,
  getSellTokens,
  vanishData,
} from "../../Services/exchangeServices";

// Wallet
export {
  depositPayment,
  getTokenList,
  getWalletDetails,
  getFiatTransactionList,
  transferToken,
  depositFiat,
  getTokenTransactions,
  getPaypalPaymentSuccess,
  getPaypalPaymentCancel,
  RequestWithdraw,
  getTokenListing,
  getWithdrawRequestList,
  getTokens,
  getBankDetails,
} from "../../Services/walletService";

export {
  getOpenSubscriptions,
  getUpcomingSubscriptions,
  buyTokenSubscription,
  getYourSubscriptions,
} from "../../Services/subscription";

// voting
export {
  getOngoingVoting,
  getClosedVoting,
  getOnlyClosedVoting,
  getUpcomingVoting,
  getVoteDetailById,
  creatVote,
  castVote,
  getAllITO,
  getVoteStatus,
} from "../../Services/votingServices";

// tranfer
export { getUsersList } from "../../Services/transferServices";

// dashboard
export {
  getSubscriptionList,
  getOnGoingIto,
  getUserTokenList,
  getAvailableToeknsGraph,
} from "../../Services/dashboardServices";
