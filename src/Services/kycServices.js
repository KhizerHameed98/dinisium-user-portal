import axios from "axios";
import {
  ADD_KYC_SUCCESS,
  ADD_KYC_ERR,
  GET_KYC_SUCCESS,
  GET_KYC_ERR,
} from "../Redux/actions/types";

import { toast } from "react-toastify";
import { kyc } from "./../Routes/serverRoutes";

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

//Add KYC

export const addKyc =
  ({ data, setUserStatus, setLoading, setrefresh, refresh }) =>
  (dispatch) => {
    axios
      .post(kyc.ADD_KYC, data)
      .then(async (res) => {
        if (res.status == 200) {
          await dispatch({
            type: ADD_KYC_SUCCESS,
            payload: res.data,
          });
          alertToast(false, res.data.msg);
          setUserStatus(true);
          setLoading(false);
          setrefresh(!refresh);
        }
      })
      .catch((err) => {
        dispatch({
          type: ADD_KYC_ERR,
        });
        setUserStatus(false);
        alertToast(
          true,
          err && err.response && err.response.data && err.response.data.msg
        );
        setLoading(false);
      });
  };

//Get KYC by user id
export const getKycByUserId =
  ({ userId, setUserStatus,setGetUserData }) =>
  (dispatch) => {
    axios
      .get(kyc.GET_KYC + `?userId=${userId}`)
      .then((res) => {
        dispatch({
          type: GET_KYC_SUCCESS,
          payload: res.data,
        });
        if (res.data.data) {
          setGetUserData(res.data.data)
          setUserStatus(true);
        } else setUserStatus(false);
      })
      .catch((err) => {
        dispatch({
          type: GET_KYC_ERR,
        });
        setUserStatus(false);
      });
  };
