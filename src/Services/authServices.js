import axios from "axios";
import {
  REGISTER_MSG,
  REGISTER_FAIL,
  VERIFY_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  SET_AUTH_VERIFICATION,
  LOGIN_FAIL,
  LOGOUT,
  FORGET_MSG,
  FORGET_FAIL,
  FORGET_SUCCESS,
  RESET_SUCCESS,
  RESET_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  USER_LOADED_DATA,
  AUTH_ERROR_DATA,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERR,
  IS_EMAIL_AUTH_ON_SUCCESS,
  IS_EMAIL_AUTH_ON_ERR,
  IS_GOOGLE_AUTH_ON_SUCCESS,
  IS_GOOGLE_AUTH_ON_ERR,
  IS_SMS_AUTH_ON_SUCCESS,
  IS_SMS_AUTH_ON_ERR,
} from "../Redux/actions/types";
import { auth, wallet } from "../Routes/serverRoutes";
import Route from "../Constants/browserRoutes";
import setAuthToken from "../utils/setAuthToken";
import { toast } from "react-toastify";
import browserRoute from "../Constants/browserRoutes";
// import { auth } from "./../Routes/serverRoutes";

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

//Load User
export const loadUser = () => (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  axios
    .get(auth.LOGGEDIN_USER)
    .then((res) => {
      dispatch({
        type: USER_LOADED_DATA,
        payload: { userDetails: res.data && res.data.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR_DATA,
      });
    });
};

//Load User Wallet
export const loadUserWallet = () => (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  axios
    .get(wallet.GET_USER_WALLET_DETAIL)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: { userWallet: res.data.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//Register User
export const register =
  ({ formData, setCodeVerificationPage, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    axios
      .post(auth.SIGNUP, body, config)
      .then(async (res) => {
        if (res.status == 200) {
          await dispatch({
            type: REGISTER_MSG,
            payload: res.data,
          });
          setLoading(false);
          //  setCodeVerificationPage(true);
          alertToast(false, res && res.data && res.data.msg && res.data.msg);
          history.push(browserRoute.SIGNIN);
        }
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAIL,
        });
        setLoading(false);

        const errorMsg =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.msg &&
            err.response.data.msg) ||
          err.message;
        alertToast(true, errorMsg);
      });
  };

//verify emial after signup
export const TestFunction = (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let body = {
    token: formData,
  };
  axios
    .post(auth.VERIFY_EMAIL, body, config)
    .then(async (res) => {
      if (res.data.status == 200) {
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location = "/auth/signin";
      }
    })
    .catch((err) => {});
};

//Verify Email of User by using Verification Token
export const verifyUser =
  ({ verificationToken, email, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ verificationToken, email });
    axios
      .post(auth.VERIFY_USER, body, config)
      .then(async (res) => {
        if (res.data.status == 200) {
          await dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
          });
          // toast.success(res.data.msg);
          alertToast(false, res && res.data && res.data.msg && res.data.msg);
          history.push(Route.LOGIN_USER);
          setLoading(false);
        }
      })
      .catch((err) => {
        dispatch({
          type: VERIFY_FAIL,
        });
        setLoading(false);
      });
  };

//Login User
export const login =
  ({ formData, history, setVerificationPage, verificationPage, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);

    axios
      .post(auth.LOGIN, body, config)
      .then(async (res) => {
        if (res.status == 200) {
          if (
            res &&
            res.data &&
            res.data.data &&
            res.data.data.userDetails &&
            res.data.data.userDetails.role !== "user"
          ) {
            alertToast(true, "Invalid Email Address");
            dispatch({
              type: LOGIN_FAIL,
            });
            setLoading(false);
          } else if (
            res &&
            res.data &&
            res.data.data &&
            res.data.data.authentication &&
            res.data.data.authentication
          ) {
            let dispatchData = {
              msg: res.data.msg,
              authentication: res.data.data,
            };
            const {
              data: { authentication },
            } = res.data;

            if (authentication === "sms") {
              if (res.data.result && res.data.result.request_id) {
                setVerificationPage({ ...verificationPage, smsPage: true });
                dispatchData.authentication["request_id"] =
                  res.data.result && res.data.result.request_id;
              } else {
                setLoading(false);
                return toast.error("Message not sending properly");
              }
            } else if (authentication === "email") {
              setVerificationPage({ ...verificationPage, emailPage: true });
            } else {
              setVerificationPage({ ...verificationPage, googlePage: true });
            }
            alertToast(false, res && res.data && res.data.msg && res.data.msg);
            dispatch({
              type: SET_AUTH_VERIFICATION,
              payload: { ...dispatchData },
            });
          } else {
            alertToast(false, res && res.data && res.data.msg && res.data.msg);
            await dispatch({
              type: LOGIN_SUCCESS,
              payload: {
                token:
                  res &&
                  res.data &&
                  res.data.data &&
                  res.data.data.token &&
                  res.data.data.token,
                userDetails:
                  res &&
                  res.data &&
                  res.data.data &&
                  res.data.data.userDetails &&
                  res.data.data.userDetails,
              },
            });
            setLoading(false);
            history.push(Route.DASHBOARD);
            dispatch(loadUserWallet());
          }
        }
      })

      .catch((err) => {
        const errorMessage =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.msg &&
            err.response.data.msg) ||
          err.message;
        alertToast(true, errorMessage);
        dispatch({
          type: LOGIN_FAIL,
        });
        setLoading(false);
      });
  };

//verify google 2f authentication
export const verifyGoogleAuthCode =
  ({ user, setVerificationPage, verificationCode, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = JSON.stringify({ token: verificationCode, id: user });
    axios
      .post(auth.VERIFY_2F_GOOGLE, data, config)
      .then(async (res) => {
        if (res.status == 200) {
          setVerificationPage({
            emailPage: false,
            smsPage: false,
            googlePage: false,
          });
          setLoading(false);
          await dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              token:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.token &&
                res.data.data.token,
              userDetails:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.userDetails &&
                res.data.data.userDetails,
            },
          });
          alertToast(false, res && res.data && res.data.msg && res.data.msg);
          history.push(Route.DASHBOARD);
          dispatch(loadUserWallet());
        }
      })
      .catch((err) => {
        setLoading(false);
        const errorMessage =
          err && err.response && err.response.data && err.response.data.msg;
        alertToast(false, errorMessage);
      });
  };

//verify email 2f authentication
export const verifyEmailAuthCode =
  ({ user, setVerificationPage, verificationCode, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = JSON.stringify({ token: verificationCode, id: user });
    axios
      .post(auth.VERIFY_2F_EMAIL, data, config)
      .then(async (res) => {
        if (res.status == 200) {
          setVerificationPage({
            emailPage: false,
            smsPage: false,
            googlePage: false,
          });
          setLoading(false);
          await dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              token:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.token &&
                res.data.data.token,
              userDetails:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.userDetails &&
                res.data.data.userDetails,
            },
          });
          alertToast(false, res && res.data && res.data.msg && res.data.msg);
          history.push(Route.DASHBOARD);
          dispatch(loadUserWallet());
        }
      })
      .catch((err) => {
        setLoading(false);

        const errorMessage =
          err && err.response && err.response.data && err.response.data.msg;
        alertToast(true, errorMessage);
      });
  };

//verify sms 2f authentication
export const verifySMSAuthCode =
  ({ user, setVerificationPage, verificationCode, history, requestId }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = JSON.stringify({
      code: verificationCode,
      id: user,
      requestId,
    });
    axios
      .post(auth.VERIFY_2F_SMS, data, config)
      .then(async (res) => {
        if (res.status == 200) {
          setVerificationPage({
            emailPage: false,
            smsPage: false,
            googlePage: false,
          });
          await dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              token:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.token &&
                res.data.data.token,
              userDetails:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.userDetails &&
                res.data.data.userDetails,
            },
          });
          alertToast(false, res && res.data && res.data.msg && res.data.msg);
          history.push(Route.DASHBOARD);
          dispatch(loadUserWallet());
        }
      })
      .catch((err) => {
        const errorMessage =
          err && err.response && err.response.data && err.response.data.msg;
        alertToast(true, errorMessage);
      });
  };

//Forget Password
export const forgetPassword =
  ({ formData, setVerificationPage, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ formData });
    axios
      .post(auth.FORGET_PASSWORD, formData, config)
      .then(async (res) => {
        if (res.data.status == 200) {
          toast.success(res.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          await dispatch({
            type: FORGET_MSG,
            payload: res.data,
          });
          setLoading(false);
          setVerificationPage({
            forgotdPage: true,
            smsPage: false,
          });

          history.push(Route.SIGNIN);
        }
      })
      .catch((err) => {
        const errors = err;
        setLoading(false);

        dispatch({
          type: FORGET_FAIL,
        });
      });
  };

//Verify Email of User For Forget Password by using Verification Token
export const verifyForget =
  ({ verificationToken, email, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ verificationToken, email });
    axios
      .post(auth.VERIFY_FORGET, body, config)
      .then(async (res) => {
        if (res.data.status == 200) {
          toast.success(res.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          await dispatch({
            type: FORGET_SUCCESS,
            payload: res.data,
          });
          history.push(Route.RESET_PASSWORD + `?email=${email}`);
          setLoading(false);
        }
      })
      .catch((err) => {
        const errors =
          err && err.response && err.response.data && err.response.data.errors;
        const error =
          err && err.response && err.response.data && err.response.data.msg;
        dispatch({
          type: FORGET_FAIL,
        });
        setLoading(false);
      });
  };

//Reset Password
export const resetPasswordFunction =
  ({ data, setVerificationPage }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(auth.RESET_PASSWORD, data, config)
      .then(async (res) => {
        if (res.data.status == 200) {
          toast.success(res.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          await dispatch({
            type: RESET_SUCCESS,
            payload: res.data,
          });

          setVerificationPage({
            resetPage: true,
            smsPage: false,
            googlePage: false,
          });
          window.location = "/auth/signin";
        }
      })
      .catch((err) => {
        dispatch({
          type: RESET_FAIL,
        });
      });
  };

// Logout / Clear User
export const logout = (history) => async (dispatch) => {
  await dispatch({
    type: LOGOUT,
  });
  history.push(Route.LOGIN_USER);
};

// update profile data
export const updateProfile =
  ({ data, id, setFormData, setLoading }) =>
  (dispatch) => {
    axios
      .put(auth.UPDATE_PROFILE + `/users/${id}`, data)
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: { userDetails: res.data.data },
          });
          setLoading(false);
          let successMessage = "Profile update successfully";
          alertToast(false, successMessage);
          setFormData({
            fname: "",
            lname: "",
            contact_no: "",
            country: "",
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PROFILE_ERR,
        });
        setLoading(false);
        alertToast(true, err?.response?.data?.msg);
      });
  };

// IS_EMAIL_AUTH_ON User
export const emailAuthentiactionOn =
  (obj, { SetVerifySMS, SetVerifyGoogle, SetVerifyEmail, verifyEmail }) =>
  (dispatch) => {
    axios
      .put(auth.IS_EMAIL_AUTH_ON, obj)
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch({
            type: IS_EMAIL_AUTH_ON_SUCCESS,
            payload: { userDetails: res.data.data },
          });
          let successMessage = (res && res.data.msg) || res.message;
          alertToast(false, successMessage);

          if (verifyEmail) {
            SetVerifyEmail(false);
            SetVerifySMS(false);
            SetVerifyGoogle(false);
          } else {
            SetVerifyEmail(true);
            SetVerifySMS(false);
            SetVerifyGoogle(false);
          }
        }
      })
      .catch((err) => {
        let errorMessage =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.msg &&
            err.response.data.msg) ||
          err.message;
        alertToast(true, errorMessage);
        dispatch({
          type: IS_EMAIL_AUTH_ON_ERR,
        });
      });
  };

// IS_GOOGLE_AUTH_ON User
export const googleAuthentiactionOn =
  (
    obj,
    { SetVerifySMS, SetVerifyGoogle, SetVerifyEmail, verifyGoogle },
    setShowGoogleAuthQRcode,
    setGoogleQRcodeUrl
  ) =>
  (dispatch) => {
    let DISABLE_GOOGLE_AUTH = auth.IS_GOOGLE_AUTH_ON;
    let ENABLE_GOOGLE_AUTH = auth.ENABLE_GOOGLE_AUTH;
    let URL = DISABLE_GOOGLE_AUTH;
    let REQUEST_METHOD = "put";
    if (obj.status) {
      URL = ENABLE_GOOGLE_AUTH;
      REQUEST_METHOD = "post";
    } else {
      URL = DISABLE_GOOGLE_AUTH;
      REQUEST_METHOD = "put";
    }

    axios[REQUEST_METHOD](URL, obj)
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch({
            type: IS_GOOGLE_AUTH_ON_SUCCESS,
            payload: { userDetails: res.data.data },
          });
          let successMessage = (res && res.data && res.data.msg) || res.message;
          alertToast(false, successMessage);

          if (obj.status) {
            setShowGoogleAuthQRcode(true); // Show QRcode Modal
            setGoogleQRcodeUrl(res.data.dataURL); // Extract QRcode image URL
          } else {
            setShowGoogleAuthQRcode(false);
            setGoogleQRcodeUrl("");
          }

          if (verifyGoogle) {
            SetVerifyGoogle(false);
            SetVerifySMS(false);
            SetVerifyEmail(false);
          } else {
            SetVerifyGoogle(true);
            SetVerifySMS(false);
            SetVerifyEmail(false);
          }
        }
      })
      .catch((err) => {
        let errorMessage =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.msg &&
            err.response.data.msg) ||
          err.message;
        alertToast(true, errorMessage);
        dispatch({
          type: IS_GOOGLE_AUTH_ON_ERR,
        });
        setShowGoogleAuthQRcode(false);
      });
  };

// IS_SMS_AUTH_ON User
export const smsAuthentiactionOn =
  (obj, { SetVerifySMS, SetVerifyGoogle, SetVerifyEmail, verifySMS }) =>
  (dispatch) => {
    axios
      .put(auth.IS_SMS_AUTH_ON, obj)
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch({
            type: IS_SMS_AUTH_ON_SUCCESS,
            payload: { userDetails: res.data.data },
          });
          let successMessage = (res && res.data && res.data.msg) || res.message;
          alertToast(false, successMessage);
          if (verifySMS) {
            SetVerifySMS(false);
            SetVerifyGoogle(false);
            SetVerifyEmail(false);
          } else {
            SetVerifySMS(true);
            SetVerifyGoogle(false);
            SetVerifyEmail(false);
          }
        }
      })
      .catch((err) => {
        let errorMessage =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.msg &&
            err.response.data.msg) ||
          err.message;
        alertToast(true, errorMessage);
        dispatch({
          type: IS_SMS_AUTH_ON_ERR,
        });
      });
  };

// Update password
export const updatePassword =
  ({ data, setFormData, setLoading, setShow }) =>
  (dispatch) => {
    axios
      .put(auth.UPDATE_PASSWORD, data)
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: { updatePassword: res.data.data },
          });
          let successMessage = (res && res.data && res.data.msg) || res.message;
          alertToast(false, successMessage);
          setFormData({
            currentPassword: "",
            Password: "",
          });
          setLoading(false);
          setShow(false);
        }
      })
      .catch((err) => {
        // doing mapping because the erro rreceiving from backend is in array
        alertToast(true, err.response.data.msg);
        dispatch({
          type: UPDATE_PASSWORD_ERR,
        });
        setLoading(false);
        setShow(false);
      });
  };
