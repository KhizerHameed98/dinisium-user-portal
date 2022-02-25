import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Route from "../../Constants/browserRoutes";
import PlaceOrder from "./PlaceOrder";
import OrdersList from "./OrdersList";
import axios from "axios";
import { wallet } from "../../Routes/serverRoutes";
import { useDispatch } from "react-redux";
import { LOGIN_FAIL } from "../../Redux/actions/types";
import { toast } from "react-toastify";

const Exchange = () => {
  const [orderType, setorderType] = useState(true);
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

  useEffect(() => {
    console.log("i am working");
  });

  const [ress, setRess] = useState(null);

  const getApi = async () => {
    try {
      const data = await axios.get(wallet.GET_TOKEN_LIST);
      setRess(data.status);
    } catch (err) {
      setRess(err?.response?.status);
      alertToast(true, "You have been blocked by the admin");
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getApi();
    if (ress === 403) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  });

  return (
    <div className="container">
      <div className="col-lg-12 col-md-8 ">
        {/* <!-- inner row --> */}
        <div className="row">
          <div className="col-md-12">
            <PlaceOrder orderType={orderType} setorderType={setorderType} />
          </div>
          <div className="col-sm-12">
            {/* <div className="sec-heading py-3">
            <h4 className="tbl-small-heading mb-0">
              Your Order
              <Link
                className="view-mor-gr-link float-right"
                to={Route.EXCHANGE_ORDER}
              >
                Explore More
              </Link>
            </h4>
          </div> */}
            <div className="sec-heading py-3">
              <h4 className="tbl-small-heading mb-4">
                {/* <Link
                className="view-mor-gr-link float-right"
                to={Route.EXCHANGE_ORDER}
              >
                Explore More
              </Link> */}
              </h4>
            </div>

            <OrdersList orderType={orderType} />
          </div>
        </div>
        {/* <!-- end inner row --> */}
      </div>
    </div>
  );
};

export default Exchange;
