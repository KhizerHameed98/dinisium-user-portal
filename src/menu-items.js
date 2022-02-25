import Route from "./Constants/browserRoutes";

const MenuItems = {
  items: [
    {
      id: "menuItems",
      type: "group",
      children: [
        // {
        //   id: "dashboard",
        //   title: "Dashboard",
        //   type: "item",
        //   url: Route.DASHBOARD,
        //   icon: "fas fa-chart-line",
        //   breadcrumbs: true,
        // },
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: Route.DASHBOARD,
          icon: "fas fa-chart-line",
          breadcrumbs: true,
          subItems: [
            {
              id: "   Profile",
              title: "   Profile",
              type: "subItem",
              url: Route.PROFILE,
              icon: "far fa-user",
              breadcrumbs: true,
              subItemsChildren: [
                {
                  id: "EditProfile",
                  title: "Edit Profile",
                  type: "subItemChild",
                  url: Route.EDIT_PROFILE,
                  breadcrumbs: true,
                },
              ],
            },
          ],
        },

        {
          id: "wallet",
          title: "Wallet",
          type: "item",
          url: Route.WALLET,
          icon: "fas fa-wallet",
          breadcrumbs: true,
          subItems: [
            {
              id: "bankPayment",
              title: "Bank Payment",
              type: "subItem",
              url: Route.BANK_PAYMENT,
              breadcrumbs: true,
            },
            {
              id: "requestWithdraw",
              title: "Request Withdraw",
              type: "subItem",
              url: Route.REQUEST_WITHDRAW,
              breadcrumbs: true,
            },
            {
              id: "MoreDetails",
              title: "More Details",
              type: "subItem",
              url: Route.WALLET_DETAILS,
              breadcrumbs: true,
              subItemsChildren: [
                {
                  id: "Fiat Transaction Details",
                  title: "Fiat Transaction Details",
                  type: "subItemChild",
                  url: Route.FIAT_DETAIL,
                  breadcrumbs: true,
                },
                {
                  id: "Token Transaction Details",
                  title: "Token Transaction Details",
                  type: "subItemChild",
                  url: Route.TOKEN_DETAIL,
                  breadcrumbs: true,
                },
              ],
            },
          ],
        },

        {
          id: "Subscriptions",
          title: "Subscriptions",
          type: "item",
          url: Route.SUBSCRIPTION,
          icon: "fas fa-mobile-alt",
          breadcrumbs: true,
          subItems: [
            {
              id: "SubscriptionsParticipant",
              title: "Subscriptions Participant",
              type: "subItem",
              url: Route.SUBSCRIPTION_PARTICIPANT,
              breadcrumbs: true,
            },
            {
              id: "OpenSubscriptionList",
              title: "Open Subscription List",
              type: "subItem",
              url: Route.ALL_OPEN_SUBSCRIPTION,
              breadcrumbs: true,
            },
            {
              id: "UpcommingSubscriptionList",
              title: "Upcoming Subscription List",
              type: "subItem",
              url: Route.ALL_UPCOMMING_SUBSCRIPTION,
              breadcrumbs: true,
            },

            {
              id: "YourSubscriptionList",
              title: "My Subscription List",
              type: "subItem",
              url: Route.ALL_YOUR_SUBSCRIPTION,
              breadcrumbs: true,
            },
          ],
        },

        // {
        //   id: "BuyToken",
        //   title: "Buy Token",
        //   type: "item",
        //   url: Route.BUY_TOKEN,
        //   icon: "fas fa-mobile-alt",
        //   breadcrumbs: true,
        // },

        {
          id: "exchange",
          title: "Marketplace",
          type: "item",
          url: Route.EXCHANGE,
          icon: "fas fa-sync",
          breadcrumbs: true,
          subItems: [
            {
              id: "exchangeOrder",
              title: "Your Orders",
              type: "subItem",
              url: Route.EXCHANGE_ORDER,
              breadcrumbs: true,
            },
          ],
        },

        {
          id: "kycManagement",
          title: "KYC Management",
          type: "item",
          url: Route.KYC_MANAGEMENT,
          icon: "far fa-comment-dots",
          breadcrumbs: true,
          // subItems: [
          //   {
          //     id: "requestStatus",
          //     title: "Request Status",
          //     type: "subItem",
          //     url: Route.REQUEST_STATUS,
          //     breadcrumbs: true,
          //   },
          // ],
        },

        {
          id: "voting",
          title: "Voting",
          type: "item",
          url: Route.VOTING,
          icon: "fas fa-poll-h",
          breadcrumbs: true,
          subItems: [
            {
              id: "createNewVote",
              title: "Create New Election",
              type: "subItem",
              url: Route.CREATE_NEW_VOTE,
              breadcrumbs: true,
            },
            {
              id: "pastVotingList",
              title: "Past Voting List",
              type: "subItem",
              url: Route.PAST_VOTING_LIST,
              breadcrumbs: true,
            },
            {
              id: "votingDetails",
              title: "Voting Details",
              type: "subItem",
              url: Route.VOTING_DETAILS,
              breadcrumbs: true,
            },
          ],
        },

        // {
        //   id: "Profile",
        //   title: "Profile",
        //   // type: "item",
        //   url: Route.PROFILE,
        //   icon: "far fa-user",
        //   breadcrumbs: true,
        //   subItems: [
        //     {
        //       id: "EditProfile",
        //       title: "Edit Profile",
        //       type: "subItem",
        //       url: Route.EDIT_PROFILE,
        //       breadcrumbs: true,
        //     },
        //   ],
        // },

        // {
        //   id: "calculator",
        //   title: "Calculator",
        //   type: "item",
        //   url: Route.CALCULATOR,
        //   icon: "fas fa-calculator",
        //   breadcrumbs: true,
        // },
      ],
    },
  ],
};

export default MenuItems;
