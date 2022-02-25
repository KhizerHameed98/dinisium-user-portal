import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Route from "../../../Constants/browserRoutes";

import FiatTransactionDetails from "./FiatTransactionDetails/index";
import TokenTransactionDetails from "./TokenTransactionDetails/index";

import { connect } from "react-redux";
import { getWalletDetails } from "../../../Redux/actions/actions";

const WalletDetails = ({ getWalletDetails, wallet }) => {
  const { walletDetails } = wallet;

  useEffect(() => {
    getWalletDetails();
  }, []);

  return (
    <div className="col-12 col-md-10 offset-md-1">
      {/* <!-- inner row --> */}
      <div className="row">
        {/* <h2>Wallet Transactions</h2> */}
        <div className="col-md-9">
          <div className="sec-heading py-3">
            <h4 className="tbl-small-heading mb-4">
              <Link
                className="view-mor-gr-link float-right"
                to={Route.FIAT_DETAIL}
              >
                Explore More
              </Link>
            </h4>
          </div>

          <FiatTransactionDetails />
        </div>
        <div className="col-md-3">
          <div className="row">
            <div className="col-md-12 mt-5">
              <div className="card bg-cr-1 text-white mb-4">
                <div className="card-body">
                  <div className="d-block">
                    <p className="dashboard-cd-amot font-30 fn-500">
                      {" "}
                      ${walletDetails.fiat_balances || 0}
                    </p>
                    <span className="dashboard-cd-blc">FIAT BALANCE</span>
                  </div>
                  <div className="dashboard-cd-icon d-block float-right">
                    <i className="far fa-chart-bar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="sec-heading py-3">
            {/* <h4 className="tbl-small-heading mb-4">
              <Link
                className="view-mor-gr-link float-right"
                to={Route.TOKEN_DETAIL}
              >
                Explore More
              </Link>
            </h4> */}
          </div>

          <TokenTransactionDetails />
        </div>
        <div className="col-md-3">
          <div className="row">
            <div className="col-md-12 mt-5">
              <div className="card bg-cr-2 text-white mb-4">
                <div className="card-body">
                  <div className="d-block">
                    <p className="dashboard-cd-amot font-30 fn-500">
                      {" "}
                      {walletDetails.tokens || 0}
                    </p>
                    <span className="dashboard-cd-blc">TOKENS</span>
                  </div>
                  <div className="dashboard-cd-icon d-block float-right">
                    <i className="fas fa-coins"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end inner row --> */}
    </div>
  );
};

const mpaStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};

export default connect(mpaStateToProps, {
  getWalletDetails,
})(WalletDetails);
