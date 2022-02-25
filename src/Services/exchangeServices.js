import axios from "axios";
import {
  GET_TRADEABLE_TOKENS_SUCCESS,
  GET_TRADEABLE_TOKENS_ERR,
  GET_NON_TRADEABLE_TOKENS_SUCCESS,
  GET_NON_TRADEABLE_TOKENS_ERR,
  GET_ONGOING_SERIES_SUCCESS,
  GET_ONGOING_SERIES_ERR,
  GET_TOKEN_DETAIL_SUCCESS,
  GET_TOKEN_DETAIL_ERR,
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
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_ERR,
  GET_SELL_TOKENS,
  VANISH_TOKEN,
} from "../Redux/actions/types";
import { toast } from "react-toastify";
import { exchange } from "../Routes/serverRoutes";
import { loadUserWallet } from "./authServices";

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

//Get Exchangeable TOKENS
export const getExchangeableTokens = (setOptions) => (dispatch) => {
  axios
    .get(exchange.GET_EXCHANGEABLE_TOKENS)
    .then((res) => {
      let data = res.data.data.reduce((acc, current) => {
        acc.push({
          ...current,
          label: current.token_name,
          value: current.token_name,
        });
        return acc;
      }, []);
      dispatch({
        type: GET_TRADEABLE_TOKENS_SUCCESS,
        payload: { data },
      });
      console.log("dataisHERE=========>", data);
      setOptions(data);
    })
    .catch((err) => {
      dispatch({
        type: GET_TRADEABLE_TOKENS_ERR,
      });
    });
};

//Get Exchangeable TOKENS
export const getNonTradableTokens = (refresh, setRefresh) => (dispatch) => {
  axios
    .get(exchange.GET_NON_TRADABLE_TOKENS)
    .then((res) => {
      // console.log(
      //   "THSESEEEEEEEEEEEEEEEE are non tradable tokens__________",
      //   res
      // );
      console.log("res at", res);
      let data = res.data.data.reduce((acc, current) => {
        console.log("current", current);
        acc.push({
          ...current,
          label: current.token_name,
          value: current.token_name,
          series_remaining_supply: current.series_remaining_supply,
          // series_remaining_supply: current.series_remaining_supply
        });
        return acc;
      }, []);
      console.log("dataaaaaa", data);
      dispatch({
        type: GET_NON_TRADEABLE_TOKENS_SUCCESS,
        payload: { data },
      });
      setRefresh(true);
    })

    .catch((err) => {
      dispatch({
        type: GET_NON_TRADEABLE_TOKENS_ERR,
      });
    });
};

//Get Token Detail By Id
export const getTokenDetailById = (id) => (dispatch) => {
  axios
    .get(exchange.GET_TOKEN_DETAIL + `${id}`)
    .then(async (res) => {
      await dispatch({
        type: GET_TOKEN_DETAIL_SUCCESS,
        payload: { tokenData: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_TOKEN_DETAIL_ERR,
      });
    });
};

export function isBuyRequestTokenSelected(status, data) {
  return {
    type: BUY_REQUEST_TOKEN_STATUS,
    payload: { buyTokenData: data, buyTokenSelected: status },
  };
}

export function isTokenSelected(status, data) {
  return {
    type: TOKEN_SELECTED_STATUS,
    payload: { myTokenData: data, tokenSelected: status },
  };
}

//Get Ongoing Series By Id
export const getOngoingSeriesById = (itoId, buyRequest) => (dispatch) => {
  axios
    .get(exchange.ONGOING_SERIES_BY_TOKEN_ID + `${itoId}/ongoing`)
    .then((res) => {
      let data = res.data.data.reduce((acc, current) => {
        acc.push({
          ...current,
          label: current.name,
          value: current.name,
        });
        return acc;
      }, []);
      dispatch({
        type: GET_ONGOING_SERIES_SUCCESS,
        payload: !buyRequest
          ? { seriesData: data }
          : { buyRequestSeriesData: data },
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ONGOING_SERIES_ERR,
      });
    });
};

export function isSeriesSelected(status, data) {
  return {
    type: SERIES_SELECTED_STATUS,
    payload: { selectedSeriesData: data, seriesSelected: status },
  };
}

export function isBuyRequestSeriesSelected(status, data) {
  return {
    type: BUY_REQUEST_SERIES_SELECTED,
    payload: {
      buyRequestSelectedSeriesData: data,
      buyRequestSeriesSelected: status,
    },
  };
}

//Create Exchange Order Request
export const exchangeOrderRequest =
  ({
    amount,
    orderType,
    tokenId,
    tokens,
    price_limit,
    setAmount,
    sub_order,
    setCountTokens,
    seriesId,
    setLoading,
  }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      amount: amount,
      price_limit,
      order_type: orderType === "buy" ? "buy_order" : "sell_order",
      ito_token_id: tokenId,
      tokens: tokens,
      sub_order: sub_order,
      // series_id: seriesId,
    });
    axios
      .post(exchange.EXCHANGE_ORDER, body, config)
      .then(async (res) => {
        await dispatch({
          type: CREATE_EXCHANGE_ORDER_SUCCESS,
          payload: { orderRequestData: res.data.data, orderType: orderType },
        });
        setLoading(false);
        alertToast(false, res.data.msg);
        setAmount("");
        setCountTokens("null");
      })
      .catch((err) => {
        dispatch({
          type: CREATE_EXCHANGE_ORDER_ERR,
        });
        setLoading(false);
        if (err && err.response && err.response.data && err.response.data.msg)
          alertToast(true, err.response.data.msg);
      });
  };

// export const getOrders = (data) => async (dispatch) => {
//   console.log(data);
//   const datas = await axios.post(exchange.GET_ORDER, data);
//   await dispatch({
//     type: CREATE_ORDER,
//     payload: datas.data,
//   });
// };

//ORDER REQUEST with Toast and refresh Functionality
export const getOrders =
  ({ data1, setLoading, refresh, setRefresh }) =>
  (dispatch) => {
    axios
      .post(exchange.GET_ORDER, data1)
      .then(async (res) => {
        await dispatch({
          type: CREATE_ORDER,
          payload: res.data,
        });
        setRefresh(!refresh);
        setLoading(false);

        alertToast(false, res?.data?.msg);
      })
      .catch((err) => {
        setRefresh(!refresh);
        setLoading(false);
        alertToast(true, err?.response?.data?.msg);
      });
  };

//GET EXHANGE ORDER
export const getExchangeOrder = () => {
  return async (dispatch) => {
    const exchangeData = await axios.get(
      "http://0f02-2400-adc5-12a-9800-d560-aef6-8c6d-e098.ngrok.io/api/v3/orders/users/me"
    );
    // console.log("response are", exchangeData);
    await dispatch({
      type: GET_EXHANGE_ORDER,
      payload: exchangeData.data,
    });
  };
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

//Buy Token
export const buyToken =
  (
    refresh,
    setRefresh,
    { amount, tokenId, seriesId, setAmount, setCountTokens, setLoading }
  ) =>
  (dispatch) => {
    const body = {
      amount: amount,
      token_id: tokenId,
      ito_series_id: seriesId,
    };
    axios
      .post(exchange.BUY_TOKEN, body)
      .then(async (res) => {
        await dispatch({
          type: BUY_TOKEN_SUCCESS,
          payload: {
            seriesSupply: amount,
            seriesId: seriesId,
          },
        });
        alertToast(false, res.data.msg);
        setRefresh(!refresh);
        setAmount("");
        setCountTokens("");
        setLoading(false);
        dispatch(loadUserWallet());
      })
      .catch((err) => {
        dispatch({
          type: BUY_TOKEN_ERR,
        });
        setLoading(false);

        if (err && err.response && err.response.data && err.response.data.msg)
          alertToast(true, err.response.data.msg);
      });
  };
//Delete Order
export const DeleteOrder = ({ id, refresh, setRefresh }) => {
  return async (dispatch) => {
    try {
      const data = await axios.delete(exchange.DELETE_ORDERS + `${id}`);
      dispatch({
        type: DELETE_ORDER,
        payload: data.data,
      });
      alertToast(false, data.data.msg);
      setRefresh(!refresh);
    } catch (err) {
      alertToast(true, err.response.data.msg);
    }
  };
};

//Buy Token Component code

export const BuyTokenn = (data, refresh, setRefresh) => {
  console.log("data on buy", data);
  return async (dispatch) => {
    try {
      const txResponse = await axios.post(exchange.BUY_TOKEN, data);
      dispatch({
        type: BUY_TOKENSS,
        payload: txResponse.data,
      });
      alertToast(false, txResponse.data.msg);
      data.setLoading(false);
      setRefresh(!refresh);
    } catch (err) {
      alertToast(true, err.response.data.msg);
      // data.setLoading(false);
    }
  };
};
// update order

export const updateOrder =
  ({ id, formData1, refresh, setRefresh, setShow, show }) =>
  (dispatch) => {
    setShow(!show);
    axios
      .put(`${exchange.UPDATE_ORDERS}${id}`, formData1)
      .then((res) => {
        alertToast(false, res?.data?.msg);

        dispatch({
          type: UPDATE_ORDER_SUCCESS,
          payload: res.data,
        });
        setRefresh(!refresh);
      })
      .catch((err) => {
        alertToast(true, err?.response?.data?.msg);
        dispatch({
          type: UPDATE_ORDER_ERR,
          payload: err,
        });
        setRefresh(!refresh);
      });
  };

// export const updateOrder = ({ props, refresh, setRefresh }) => {
//   return async (dispatch) => {
//     try {
//       const data = await axios.put(
//         `${exchange.UPDATE_ORDERS}${props.id}`,
//         props.formData1
//       );
//       await dispatch({
//         type: UPDATE_ORDER_SUCCESS,
//         payload: data.data,
//       });
//       // toast.error("updated")
//       alertToast(false, data?.data?.msg);
//       setRefresh(!refresh);
//     } catch (err) {
//       dispatch({
//         type: UPDATE_ORDER_ERR,
//         payload: err,
//       });
//       alertToast(true ,err?.data?.data?.msg)
//       setRefresh(!refresh);
//     }
//   };
// };

export const getSellTokens = (setSellTokenData) => {
  return async (dispatch) => {
    try {
      const sellTokens = await axios.get(exchange.SELL_TOKENS);
      // let options = sellTokens.data.reduce((acc, current) => {
      //   acc.push({
      //     ...current,
      //     label: current.token_name,
      //     value: current.token_name,
      //   });
      //   return acc;
      // }, []);
      const options = sellTokens.data.data.map((items) => {
        console.log("items", items);
        return {
          label: items.token_name,
          value: items.token_name,
          symbol: items.token_symbol,
          price: items.price,
          remainning_supply: items.holdings,
          buying_spread: items.buying_spread,
          id: items.id,
        };
      });
      dispatch({
        type: GET_SELL_TOKENS,
        payload: { options },
      });
      setSellTokenData(sellTokens.data.data);
    } catch (err) {
      alertToast("No");
    }
  };
};

export const vanishData = () => {
  return {
    type: VANISH_TOKEN,
  };
};
