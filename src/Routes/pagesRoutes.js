import React from "react";
import Route from "../Constants/browserRoutes";

const Dashboard = React.lazy(() => import("../Components/Dashboard"));

const UserManagement = React.lazy(() =>
  import("../Components/UserManagement/ListofAllUsers/index")
);
const UserDetails = React.lazy(() =>
  import("../Components/UserManagement/UserDetails/index")
);
const InvestmentDetails = React.lazy(() =>
  import("./../Components/UserManagement/InvestmentDetails")
);

const Wallet = React.lazy(() => import("../Components/Wallet"));
const RequestWithdraw = React.lazy(() =>
  import("../Components/Wallet/RequestWithdraw")
);
const BankPayment = React.lazy(() =>
  import("../Components/Wallet/BankPayment")
);

const WalletDetails = React.lazy(() =>
  import("./../Components/Wallet/WalletDetails/index")
);

const FiatDetailList = React.lazy(() =>
  import(
    "./../Components/Wallet//WalletDetails/FiatTransactionDetails/fiatDetailList"
  )
);
const TokenDetailList = React.lazy(() =>
  import(
    "./../Components/Wallet//WalletDetails/TokenTransactionDetails/tokenDetailList"
  )
);

const KycManagement = React.lazy(() => import("../Components/KycManagement"));

const Exchange = React.lazy(() => import("../Components/Exchange"));
const ExchangeOrder = React.lazy(() =>
  import("../Components/Exchange/ExchangeOrder")
);

const Voting = React.lazy(() => import("./../Components/Voting/index"));
const VotingDetails = React.lazy(() =>
  import("../Components/Voting/CommonComponents/votingDetails")
);

const PastVotingList = React.lazy(() =>
  import("./../Components/Voting/PastVotingList/index")
);

const Calculator = React.lazy(() => import("./../Components/Calculator/index"));

const Subscription = React.lazy(() =>
  import("./../Components/Subscription/index")
);

const SubscriptionsParticipant = React.lazy(() =>
  import("./../Components/Subscription/SubscriptionsParticipant/index")
);

const OpenSubscriptionList = React.lazy(() =>
  import("./../Components/Subscription/openSubscription/OpenSubscriptionList")
);

const YourSubscriptionList = React.lazy(() =>
  import("./../Components/Subscription/YourSubscription/YourSubscriptionList")
);

const UpcommingSubscriptionList = React.lazy(() =>
  import(
    "./../Components/Subscription/upCommingSubscription/UpcommingSubscriptionList"
  )
);
const BuyToken = React.lazy(() => import("./../Components/BuyToken/index"));
const Profile = React.lazy(() => import("./../Components/Profile/index"));

// const Transfer = React.lazy(() => import("./../Components/Transfer/index"));

const EditProfile = React.lazy(() =>
  import("./../Components/Profile/EditProfile/index")
);

const PaypalPaymentProcess = React.lazy(() =>
  import("../Components/Wallet/PaypalPayment/PaypalPaymentProcess")
);

const PaypalPaymentCancel = React.lazy(() =>
  import("./../Components/Wallet/PaypalPayment/PaypalPaymentCancel")
);

const pageRoutes = [
  {
    path: Route.DASHBOARD,
    exact: true,
    name: "Dashboard",
    component: Dashboard,
    approvedkyc: "not-mandatory",
  },
  {
    path: Route.PAYPAL_PROCESS,
    exact: true,
    name: "PaypalPaymentProcess",
    component: PaypalPaymentProcess,
    approvedkyc: "not-mandatory",
  },
  {
    path: Route.PAYPAL_PAYMENT_CANCEL,
    exact: true,
    name: "PaypalPaymentCancel",
    component: PaypalPaymentCancel,
    approvedkyc: "not-mandatory",
  },
  // {
  //   path: Route.TRANSFER,
  //   exact: true,
  //   name: "Transfer",
  //   component: Transfer,
  //   approvedkyc: "mandatory",
  // },
  {
    path: Route.EDIT_PROFILE,
    exact: true,
    name: "EditProfile",
    component: EditProfile,
    approvedkyc: "not-mandatory",
  },
  {
    path: Route.PROFILE,
    exact: true,
    name: "PROFILE",
    component: Profile,
    approvedkyc: "not-mandatory",
  },
  {
    path: Route.SUBSCRIPTION,
    exact: true,
    name: "Subscription",
    component: Subscription,
    approvedkyc: "not-mandatory",
  },
  {
    path: Route.ALL_OPEN_SUBSCRIPTION,
    exact: true,
    name: "OpenSubscriptionList",
    component: OpenSubscriptionList,
    approvedkyc: "not-mandatory",
  },
  {
    path: Route.ALL_YOUR_SUBSCRIPTION,
    exact: true,
    name: "YourSubscriptionList",
    component: YourSubscriptionList,
    approvedkyc: "not-mandatory",
  },
  {
    path: Route.ALL_UPCOMMING_SUBSCRIPTION,
    exact: true,
    name: "UpcomingSubscriptionList",
    component: UpcommingSubscriptionList,
    approvedkyc: "not-mandatory",
  },
  {
    path: Route.SUBSCRIPTION_PARTICIPANT,
    exact: true,
    name: "SubscriptionsParticipant",
    component: SubscriptionsParticipant,
    approvedkyc: "mandatory",
  },
  // {
  //   path: Route.USER_MANAGEMENT,
  //   exact: true,
  //   name: "UserManagement",
  //   component: UserManagement,
  //   approvedkyc: "mandatory",
  // },
  // {
  //   path: Route.USER_DETAILS,
  //   exact: true,
  //   name: "UserDetails",
  //   component: UserDetails,
  //   approvedkyc: "mandatory",
  // },
  // {
  //   path: Route.INVESTMENT_DETAILS,
  //   exact: true,
  //   name: "InvestmentDetails",
  //   component: InvestmentDetails,
  //   approvedkyc: "mandatory",
  // },
  {
    path: Route.WALLET,
    exact: true,
    name: "Wallet",
    component: Wallet,
    approvedkyc: "mandatory",
  },
  {
    path: Route.REQUEST_WITHDRAW,
    exact: true,
    name: "RequestWithdraw",
    component: RequestWithdraw,
    approvedkyc: "mandatory",
  },
  {
    path: Route.WALLET_DETAILS,
    exact: true,
    name: "More Wallet Details",
    component: WalletDetails,
    approvedkyc: "mandatory",
  },
  {
    path: Route.FIAT_DETAIL,
    exact: true,
    name: "Fiat Transaction List",
    component: FiatDetailList,
    approvedkyc: "mandatory",
  },
  {
    path: Route.TOKEN_DETAIL,
    exact: true,
    name: "Token Transaction List",
    component: TokenDetailList,
    approvedkyc: "mandatory",
  },
  {
    path: Route.BANK_PAYMENT,
    exact: true,
    name: "BankPayment",
    component: BankPayment,
    approvedkyc: "mandatory",
  },
  {
    path: Route.KYC_MANAGEMENT,
    exact: true,
    name: "KycManagement",
    component: KycManagement,
    approvedkyc: "not-mandatory",
  },

  {
    path: Route.EXCHANGE,
    exact: true,
    name: "Exchange",
    component: Exchange,
    approvedkyc: "mandatory",
  },
  {
    path: Route.EXCHANGE_ORDER,
    exact: true,
    name: "ExchangeOrder",
    component: ExchangeOrder,
    approvedkyc: "mandatory",
  },
  {
    path: Route.VOTING,
    exact: true,
    name: "Voting",
    component: Voting,
    approvedkyc: "not-mandatory",
  },

  {
    path: Route.PAST_VOTING_LIST,
    exact: true,
    name: "PastVotingList",
    component: PastVotingList,
    approvedkyc: "not-mandatory",
  },
  {
    path: Route.VOTING_DETAILS,
    exact: true,
    name: "VotingDetails",
    component: VotingDetails,
    approvedkyc: "mandatory",
  },
  {
    path: Route.BUY_TOKEN,
    exact: true,
    name: "Buy Token",
    component: BuyToken,
    approvedkyc: "mandatory",
  },
  {
    path: Route.Calculator,
    exact: true,
    name: "Calculator",
    component: Calculator,
    approvedkyc: "mandatory",
  },
];

export default pageRoutes;
