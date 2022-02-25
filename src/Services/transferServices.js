import axios from "axios";
import {
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_ERR,
} from "../Redux/actions/types";
import { toast } from "react-toastify";
import { transfer } from "../Routes/serverRoutes";

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

//Get All Investors List
export const getUsersList = () => (dispatch) => {
  axios
    .get(transfer.GET_ALL_USERS + `?role=user`)
    .then((res) => {
      dispatch({
        type: GET_USERS_LIST_SUCCESS,
        payload: { usersList: res.data.response },
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_USERS_LIST_ERR,
      });
    });
};
