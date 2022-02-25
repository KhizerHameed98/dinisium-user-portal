import axios from "axios";
import {
  GET_OPEN_SUBSCRIPTION_SUCCESS,
  GET_OPEN_SUBSCRIPTION_ERR,
  GET_YOUR_SUBSCRIPTION_SUCCESS,
  GET_YOUR_SUBSCRIPTION_ERR,
  GET_UPCOMING_SUBSCRIPTION_SUCCESS,
  GET_UPCOMING_SUBSCRIPTION_ERR,
  SUBSCRIPTION_BUY_SUCCESS,
  SUBSCRIPTION_BUY_ERR,
  LOGIN_FAIL,
} from "../Redux/actions/types";
import { toast } from "react-toastify";
import { subscription } from "../Routes/serverRoutes";

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

//Get OPEN/Ongoing Subscription
export const getOpenSubscriptions = () => (dispatch) => {
  const status = "open";

  axios
    .get(subscription.GET_SUBSCRIPTIONS + `?status=${status}`)
    .then((res) => {
      dispatch({
        type: GET_OPEN_SUBSCRIPTION_SUCCESS,
        payload: { openSubscriptions: res.data },
      });
    })
    .catch((err) => {
      if (err && err.response && err.response.data) {
        dispatch({
          type: GET_OPEN_SUBSCRIPTION_ERR,
        });
      }
    });
};

//Get Upcoming Subscription
export const getUpcomingSubscriptions = () => (dispatch) => {
  const status = "upcoming";
  axios
    .get(subscription.GET_SUBSCRIPTIONS + `?status=${status}`)
    .then((res) => {
      dispatch({
        type: GET_UPCOMING_SUBSCRIPTION_SUCCESS,
        payload: { upcomingSubscriptions: res.data },
      });
    })
    .catch((err) => {
      if (err && err.response && err.response.data) {
        dispatch({
          type: GET_UPCOMING_SUBSCRIPTION_ERR,
        });
      }
    });
};

//Get Your Subscription
export const getYourSubscriptions = () => (dispatch) => {
  axios
    .get(subscription.YOUR_SUBSCRIPTIONS)
    .then((res) => {
      console.log("RESULT IS", res);
      dispatch({
        type: GET_YOUR_SUBSCRIPTION_SUCCESS,
        payload: { yourSubscriptions: res.data },
      });
    })
    .catch((err) => {
      if (err.response.status === 403) {
        alertToast(true, err.response.msg);
        dispatch({
          type: LOGIN_FAIL,
        });
      } else {
        if (err && err.response && err.response.data) {
          dispatch({
            type: GET_YOUR_SUBSCRIPTION_ERR,
          });
        }
      }
    });
};

//Buy token from subscription
export const buyTokenSubscription =
  ({ history, amount, setAmount, id, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      subscription_id: id,
      investment: amount,
    });

    axios
      .post(subscription.BUY_SUBSCRIPTION, body, config)
      .then(async (res) => {
        await dispatch({
          type: SUBSCRIPTION_BUY_SUCCESS,
          payload: res.data?.data?.current,
        });

        alertToast(false, "Invested Successfully");
        if (history.location?.state?.current?.toString()) {
          const state = { ...history.location.state };
          state.current = res.data?.data?.current;
          history.replace({ ...history.location, state });
        }
        setAmount("");
        setLoading(false);
      })
      .catch((err) => {
        dispatch({
          type: SUBSCRIPTION_BUY_ERR,
        });
        setLoading(false);

        if (err.response?.data?.msg) alertToast(true, err.response.data.msg);
      });
  };
