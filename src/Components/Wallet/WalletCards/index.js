import React, { Fragment, useEffect, useState } from "react";
import Route from "../../../Constants/browserRoutes";
import { connect, useDispatch } from "react-redux";
import RequestWithdraw from "../RequestWithdraw";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { getTokens } from "../../../Services/walletService";

const WalletCards = ({ auth: { userWallet } }) => {
  const history = useHistory();

  const requrestwithdraw = () => {
    history.push(Route.REQUEST_WITHDRAW);
  };

  const Tokens = useSelector((state) => state.wallet.TokensListt.sum);
  // console.log(Tokens);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokens());
  });

  return (
    <Fragment>
      <div className="container btns-container">
        <div className="row">
          <div className="col-6"></div>

          <div className="col-2"></div>

          <div className="col-lg-4">
            <button
              type="button"
              className="btn btn-primary btn-lg req-button"
              onClick={requrestwithdraw}
            >
              Request Withdraw{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card bg-cr-1 text-white mb-4">
          <div className="card-body">
            <div className="d-inline-block">
              <p className="dashboard-cd-amot font-30 fn-500">
                ${(userWallet && userWallet?.fiat_balances?.toFixed(2)) || 0}
              </p>
              <span className="dashboard-cd-blc">FIAT BALANCE</span>
            </div>
            <div className="dashboard-cd-icon d-inline-block float-right">
              <i className="far fa-chart-bar"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card bg-cr-2 text-white mb-4">
          <div className="card-body">
            <div className="d-inline-block">
              <p className="dashboard-cd-amot font-30 fn-500">
                {" "}
                {Tokens || 0}{" "}
              </p>
              <span className="dashboard-cd-blc">TOKENS</span>
            </div>
            <div className="dashboard-cd-icon d-inline-block float-right">
              <i className="fas fa-coins"></i>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mpaStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mpaStateToProps, null)(WalletCards);
