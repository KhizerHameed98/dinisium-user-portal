import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getPaypalPaymentSuccess } from "../../../Redux/actions/actions";

const PaypalPaymentProcess = ({ getPaypalPaymentSuccess, location }) => {
  const history = useHistory();

  useEffect(() => {
    let query = location.search;
    getPaypalPaymentSuccess({ history, query });
  }, []);

  return <></>;
};

export default connect(null, {
  getPaypalPaymentSuccess,
})(PaypalPaymentProcess);
