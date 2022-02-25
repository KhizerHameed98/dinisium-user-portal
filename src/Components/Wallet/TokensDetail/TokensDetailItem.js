import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import { transferToken } from "../../../Redux/actions/actions";

const TokensDetailItem = ({
  wallet: { userWallet },
  item: { token_name, token_price, amount, ito_token_id },
  transferToken,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    to_address: "",
    token_amount: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.to_address === "" || formData.token_amount === "") {
      setError(true);
    } else {
      setError(false);

      if (userWallet.tokens < formData.token_amount) {
        toast.info("insuffient tokens");
      } else if (formData.token_amount <= 0) {
        toast.info("tokens amount must be greater then 0");
      } else {
        setLoading(true);
        formData.token_id = ito_token_id;
        transferToken({ formData, setFormData, setLoading, setShow });
      }
    }
  };

  return (
    <Fragment>
      <td className="text-dr-blu">{token_name}</td>
      <td className="fn-600">{token_price}</td>
      <td>{amount}</td>
      <td>
        <button className="btn btn-info btn-sm" onClick={handleShow}>
          Transfer
        </button>
      </td>

      {/* <!-- end inner row --> */}

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transfer Tokens</Modal.Title>
        </Modal.Header>
        <form className="form" onSubmit={onSubmit}>
          <Modal.Body>
            {" "}
            <div className="form-group row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label>Token amounts</label>
                  <input
                    type="number"
                    placeholder="Token amounts"
                    className="form-control"
                    name="token_amount"
                    value={formData.token_amount}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  {/* {error && formData.token_amount === "" ? (
                    <div className="error-msg"> Token amounts is required </div>
                  ) : null} */}
                </div>
              </div>

              <div className="col-sm-12">
                <div className="form-group">
                  <label>To address</label>
                  <input
                    type="text"
                    placeholder="To address"
                    className="form-control"
                    name="to_address"
                    value={formData.to_address}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  {/* {error && formData.to_address === "" ? (
                    <div className="error-msg"> To address is required </div>
                  ) : null} */}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}{" "}
              Transfer
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

const mpaStateToProps = (state) => {
  return {
    wallet: state.auth,
  };
};

export default connect(mpaStateToProps, {
  transferToken,
})(TokensDetailItem);
