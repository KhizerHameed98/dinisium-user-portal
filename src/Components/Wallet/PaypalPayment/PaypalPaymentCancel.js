import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { getPaypalPaymentCancel } from "../../../Redux/actions/actions";

const PaypalPaymentCancel = ({ getPaypalPaymentCancel }) => {
  const history = useHistory();

  useEffect(() => {
    getPaypalPaymentCancel({ history });
  }, []);
  return <></>;
};

export default connect(null, {
  getPaypalPaymentCancel,
})(PaypalPaymentCancel);
