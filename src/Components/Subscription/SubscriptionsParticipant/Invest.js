import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { buyTokenSubscription } from "../../../Redux/actions/actions";
import { toast } from "react-toastify";

const Invest = ({
  id,
  threshold,
  current,
  threshold_type,
  auth: {
    userWallet: { fiat_balances },
  },
  buyTokenSubscription,
}) => {
  const history = useHistory();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setAmount(e.target.value);
  };

  const investAmount = (e) => {
    e.preventDefault();
    const remainingThreshold = threshold - current;
    if (amount > fiat_balances) {
      return toast.error("Insufficent Funds");
    }
    if (amount > remainingThreshold && threshold_type === "limited") {
      return toast.error("Investment cannot exceed remaining threshold");
    }

    setLoading(true);
    buyTokenSubscription({
      history,
      amount,
      setAmount,
      id,
      setLoading,
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="font-18">Invest</h4>
        <div className="row" style={{ marginLeft: "0", paddingLeft: "0" }}>
          <div className="col-12 col-sm-12 p-0">
            <div className="form-group">
              <input
                type="number"
                style={{ height: "38px", width: "100%" }}
                placeholder="Enter Amount in dollars"
                name="amount"
                value={amount}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="col-12 col-sm-4 ml-0 pl-0">
            <button
              style={{ marginLeft: "0", paddingLeft: "0" }}
              className="btn bg-primary text-white py-2 px-4 rounded"
              onClick={investAmount}
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}{" "}
              Invest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { buyTokenSubscription })(Invest);
