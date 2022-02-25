import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Route from "../../Constants/browserRoutes";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import WalletCards from "./WalletCards/index";
import TokenDetail from "./TokensDetail/index";
import { depositFiat } from "../../Redux/actions/actions";
import { connect } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Wallet = ({ depositFiat, history }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
  });
  const { amount } = formData;

  const [show, setShow] = useState(false);
  const [showPayPalButton, setShowPayPalButton] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowPayPalButton(false);
    setFormData({ ...formData, amount: "" });
  };
  const handleShow = () => setShow(true);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    setShowPayPalButton(true);
    // depositFiat({ formData, setFormData, setLoading, setShow });
  };

  const payViaBank = (e) => {
    history.push(Route.BANK_PAYMENT);
  };

  return (
    <div className="col-12 col-md-8 offset-md-2">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <WalletCards />
          </div>
        </div>
        <div className="col-md-12">
          {/* <div className="sec-heading">
            <h4>YOUR TOKEN</h4>
          </div> */}

          <div className="col-md-12 mb-4">
            {/* <h2 className="tbl-small-heading d-inline font-24">YOUR TOKENS</h2> */}
            {/* <Link
              className="exp-mr-link text-dr-green"
              to={Route.WALLET_DETAILS}
            >
              TRANSACTION DETAIL
            </Link> */}
          </div>

          <TokenDetail />
        </div>
        <div className="col-md-12 my-5 text-center">
          <button
            className="btn btn-success font-12 btn-green w-25 btn-lg"
            onClick={payViaBank}
          >
            Pay Via Bank
          </button>
          <button
            type="button"
            className="btn btn-primary w-25 btn-lg ml-3"
            onClick={handleShow}
          >
            Deposit Via Credit Card / Paypal{" "}
          </button>
        </div>
      </div>
      {/* modal start here */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title> Deposit Via Credit Card / Paypal </Modal.Title>
        </Modal.Header>
        <form className="form" onSubmit={onSubmit}>
          {!showPayPalButton && (
            <Modal.Body>
              {" "}
              <div className="form-group row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Enter amount in dollar</label>
                    <input
                      type="number"
                      // placeholder="10$"
                      className="form-control"
                      name="amount"
                      value={amount}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
          )}
          {showPayPalButton && (
            <Modal.Body>
              <PayPalButton
                amount={amount}
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                  // console.log({ details, data });
                  // alert(
                  //   "Transaction completed by " + details.payer.name.given_name
                  // );
                  // OPTIONAL: Call your server to save the transaction
                  // return fetch("/paypal-transaction-complete", {
                  //   method: "post",
                  //   body: JSON.stringify({
                  //     orderID: data.orderID,
                  //   }),
                  // });
                }}
                onError={() => {
                  // console.log("Paypal error,   -->");
                }}
                options={{
                  clientId: "EFGWLQ6ULWPGC",
                }}
              />
              {/* <PayPalScriptProvider options={{ "client-id": "test" }}>
                <PayPalButtons style={{ layout: "horizontal" }} />
              </PayPalScriptProvider> */}
            </Modal.Body>
          )}
          {!showPayPalButton && (
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}{" "}
                Submit
              </Button>
            </Modal.Footer>
          )}
        </form>
      </Modal>
      {/* <!-- end inner row --> */}
    </div>
  );
};

export default connect(null, { depositFiat })(withRouter(Wallet));
