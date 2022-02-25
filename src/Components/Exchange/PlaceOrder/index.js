import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import SellTokenRequest from "./SellTokenRequest";
import BuyTokenRequest from "./BuyTokenRequest";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { LOGIN_FAIL } from "../../../Redux/actions/types";
import { wallet } from "../../../Routes/serverRoutes";
import { toast } from "react-toastify";

const PlaceOrder = ({ orderType, setorderType, res }) => {
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
  const [key, setKey] = useState("buyRequest");
  console.log("i am working");
  const [ress, setRess] = useState([]);

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

  const handleSelect = (k) => {
    if (k == "sellRequest") {
      setorderType(false);
    } else {
      setorderType(true);
    }
  };
  return (
    <>
      <Tabs
        id="uncontrolled-tab-example"
        className="mb-3"
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
          handleSelect(k);
        }}
      >
        <Tab eventKey="buyRequest" title="Buy Request">
          <BuyTokenRequest />
        </Tab>
        <Tab eventKey="sellRequest" title="Sell Request">
          <SellTokenRequest />
        </Tab>
      </Tabs>
    </>
  );
};

export default PlaceOrder;
