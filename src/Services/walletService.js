import axios from "axios";

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
} from "../Redux/actions/types";
import { toast } from "react-toastify";
import { wallet } from "../Routes/serverRoutes";

import { loadUserWallet } from "./authServices";
import browserRoute from "./../Constants/browserRoutes";

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

//Get token List
export const getTokenList = () => (dispatch) => {
  axios
    .get(wallet.GET_TOKEN_LIST)
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
        type: GET_TOKEN_LIST_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_TOKEN_LIST_ERR,
      });
    });
};

//Get Fiat_Transaction deiails List
export const getFiatTransactionList = (userId) => (dispatch) => {
  axios
    // .get(wallet.GET_FIAL_TRANSACTION_DETAILS + `?user_id=${userId}`)
    .get(wallet.GET_FIAL_TRANSACTION_DETAILS)
    .then((res) => {
      dispatch({
        type: GET_FIAT_TRANSACTION_DETAILS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_FIAT_TRANSACTION_DETAILS_ERR,
      });
    });
};

//Get User Wallet Details
export const getWalletDetails = () => (dispatch) => {
  axios
    .get(wallet.GET_WALLET_DETAILS)
    .then((res) => {
      dispatch({
        type: GET_WALLET_DETAILS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_WALLET_DETAILS_ERR,
      });
    });
};

//Add wallet deposit payment
export const depositPayment =
  ({
    formData,
    setDepositForm,
    setBank_draft,
    setLoading,
    setTransferAmount,
    setTrasnferFees,
    setTotalAmount,
  }) =>
  (dispatch) => {
    // console.log(1);
    axios
      .post(wallet.DEPOSIT_PAYMENT, formData)
      .then((res) => {
        dispatch({
          type: DEPOSIT_PAYMENT_SUCCESS,
          payload: res.data.data,
        });
        let successMessage = (res && res.data.msg) || res.message;
        alertToast(false, successMessage);
        setDepositForm({
          country: "",
          swift: "",
          bank_name: "",
          account_no: "",
          account_name: "",
          from_account: "",
          currency: "",
          transfer_amount: "",
          transfer_fee: "",
          total_amount: "",
        });
        setTransferAmount("");
        setTrasnferFees("");
        setTotalAmount("");
        setBank_draft("");
        setLoading(false);
      })
      .catch((error) => {
        let errorMessage =
          (error &&
            error.response &&
            error.response.data &&
            error.response.data.msg) ||
          error.message;
        // console.log(error.response);
        alertToast(true, errorMessage);
        setLoading(false);

        dispatch({
          type: DEPOSIT_PAYMENT_ERR,
        });
      });
  };

// Transfer token
export const transferToken =
  ({ formData, setFormData, setLoading, setShow }) =>
  (dispatch) => {
    axios
      .post(wallet.TOKEN_TRANSFER, formData)
      .then((res) => {
        dispatch({
          type: TRANSFER_TOKEN_SUCCESS,
          payload: {
            res,
            tokenId: formData.token_id,
            transferAmount: formData.token_amount,
          },
        });
        dispatch(loadUserWallet());
        let successMessage = (res && res.data.msg) || res.message;
        alertToast(false, successMessage);
        setLoading(false);
        setShow(false);
        setFormData({ to_address: "", token_amounts: "", token_address: "" });
      })
      .catch((error) => {
        let errorMessage =
          (error &&
            error.response &&
            error.response.data &&
            error.response.data.msg) ||
          error.message;
        alertToast(true, errorMessage);
        setLoading(false);
        setShow(false);
        dispatch({
          type: TRANSFER_TOKEN_ERR,
        });
      });
  };

// Paypal Deposit Fiat
export const depositFiat =
  ({ formData, setFormData, setLoading, setShow }) =>
  (dispatch) => {
    axios
      .post(wallet.PAYPAL_DEPOSIT_FIAT, formData)
      .then((res) => {
        dispatch({
          type: DEPOSIT_FIAT_SUCCESS,
          payload: { depositFiat: res.data },
        });
        window.open(res.data.paypalUrl);
        let successMessage = (res && res.data.msg) || res.message;
        alertToast(false, successMessage);
        setLoading(false);
        setShow(false);
        setFormData({
          amount: "",
        });
      })
      .catch((error) => {
        let errorMessage =
          (error &&
            error.response &&
            error.response.data &&
            error.response.data.msg) ||
          error.message;
        alertToast(true, errorMessage);
        setLoading(false);
        //  setFormData({
        //    amount: "",
        //  });
        dispatch({
          type: DEPOSIT_FIAT_ERR,
        });
      });
  };

// get token_transaction details
export const getTokenTransactions =
  ({ id }) =>
  (dispatch) => {
    axios
      .get(wallet.TOKEN_TRANSFER + `?user_id=${id}`)
      .then((res) => {
        dispatch({
          type: GET_TOKEN_TRANSACTIONS_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_TOKEN_TRANSACTIONS_ERR,
        });
      });
  };

// PAYPAL_PAYMENT_SUCCESS
export const getPaypalPaymentSuccess =
  ({ history, query }) =>
  (dispatch) => {
    axios
      .get(wallet.PAYPAL_PAYMENT_SUCCESS + `${query}`)
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: PAYPAL_PAYMENT_SUCCESS_SUCCESS,
          });
          let successMessage = (res && res.data.msg) || res.message;
          alertToast(false, successMessage);
          history.push(browserRoute.WALLET);
        }
      })
      .catch((err) => {
        dispatch({
          type: PAYPAL_PAYMENT_SUCCESS_ERR,
        });
        let errMessage =
          (err && err.response && err.response.data && err.response.data.msg) ||
          err.message;
        alertToast(true, errMessage);
        history.push(browserRoute.WALLET);
      });
  };

// PAYPAL_PAYMENT_CANCEL
export const getPaypalPaymentCancel =
  ({ history }) =>
  (dispatch) => {
    axios
      .get(wallet.PAYPAL_PAYMENT_CANCEL)
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: PAYPAL_PAYMENT_CANCEL_SUCCESS,
          });
          let successMessage = (res && res.data.msg) || res.message;
          alertToast(false, successMessage);
          history.push(browserRoute.WALLET);
        }
      })
      .catch((err) => {
        dispatch({
          type: PAYPAL_PAYMENT_CANCEL_ERR,
        });
        let errMessage =
          (err && err.response && err.response.data && err.response.data.msg) ||
          err.message;
        alertToast(true, errMessage);
        history.push(browserRoute.WALLET);
      });
  };

//Request Withdraw API
export const RequestWithdraw = (data) => {
  return async (dispatch) => {
    const RequestWithdraw = await axios.post(wallet.REQUEST_WITHDRAW, data);
    await dispatch({
      type: REQUEST_WITHDRAW,
      payload: RequestWithdraw.data,
    });
    toast.success("WithDraw Request Submitted Successfully");
  };
};

// Token Listing API
export const getTokenListing = (setResult) => {
  return async (dispatch) => {
    const Tokens = await axios.get(wallet.TOKEN_LISTING);
    dispatch({
      type: TOKEN_LIST,
      payload: Tokens.data,
    });
    setResult([Tokens.data]);
  };
};

//Request Withdraw Listing API

export const getWithdrawRequestList = () => {
  return async (dispatch) => {
    const result = await axios.get(wallet.REQUEST_WITHDRAW_LIST);
    dispatch({
      type: GET_WITHDRAW_LIST,
      payload: result.data,
    });
  };
};

//Get Tokens API

export const getTokens = () => {
  return async (dispatch) => {
    const Tokens = await axios.get(wallet.TOKEN_LISTING);
    dispatch({
      type: GET_TOKENS,
      payload: Tokens.data,
    });
  };
};

export const getBankDetails = () => {
  return async (dispatch) => {
    try {
      const BankDetails = await axios.get(wallet.BANK_DETAILS);
      dispatch({
        type: GET_BANK_DETAILS,
        payload: BankDetails.data,
      });
    } catch (err) {
      alert("Data not found");
    }
  };
};
