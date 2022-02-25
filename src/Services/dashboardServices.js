import axios from "axios";
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
} from "../Redux/actions/types";
import { toast } from "react-toastify";
import {
  exchange,
  subscription,
  ito,
  wallet,
  dashboard,
} from "../Routes/serverRoutes";

//alert tost
const alertToast = (error, message) => {
  if (!error) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

//Get Exchange Order By User Id
export const getUserExchangeOrders = () => (dispatch) => {
  axios
    .get(exchange.GET_USER_EXCHANGE_ORDER)
    .then((res) => {
      dispatch({
        type: GET_EXCHANGE_ORDER_SUCCESS,
        payload: { orderData: res.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_EXCHANGE_ORDER_ERR,
      });
    });
};

//Get  Ongoing Subscription
export const getSubscriptionList = () => (dispatch) => {
  const status = "open";
  axios
    .get(subscription.GET_SUBSCRIPTIONS + `?status=${status}`)
    .then((res) => {
      dispatch({
        type: GET_SUBSCRIPTION_SUCCESS,
        payload: { subscriptionsList: res.data.data },
      });
    })
    .catch((err) => {
      if (err && err.response && err.response.data) {
        dispatch({
          type: GET_SUBSCRIPTION_ERR,
        });
      }
    });
};

//Get getOnGoingIto
export const getOnGoingIto = () => (dispatch) => {
  const status = "ongoing";
  axios
    .get(ito.ITO_SERIES_BY_STATUS)
    .then((res) => {
      dispatch({
        type: GET_ONGOING_ITO_SERIES_SUCCESS,
        payload: { onGoingItoSeriesList: res.data.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ONGOING_ITO_SERIES_ERR,
      });
    });
};

//Get getOnGoingIto
export const getUserTokenList = () => (dispatch) => {
  axios
    .get(wallet.GET_TOKEN_LIST)
    .then((res) => {
      dispatch({
        type: GET_USER_TOKEN_SUCCESS,
        payload: { userTokenList: res.data.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_USER_TOKEN_ERR,
      });
    });
};

export function getAvailableToeknsGraph(obj) {
  return async (dispatch) => {
    // console.log(
    //   dashboard.GET_TOKENS_MARKETCAP + `${obj.id}?filterWith=last${obj.name}`
    // );
    try {
      let data = await axios.get(dashboard.GET_AVAILABLE_TOEKNS_GRAPH);

      dispatch({
        type: GET_AVAILABLE_GRAPH,
        payload: data.data,
      });
      //Commenting the Irregular toast

      // alertToast(false, data.data.msg);
    } catch (err) {
      // alertToast(true, err.response.data.msg);
    }
  };
}
