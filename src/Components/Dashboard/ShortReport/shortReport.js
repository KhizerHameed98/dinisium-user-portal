import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTokens } from "../../../Redux/actions/actions";

const ShortReport = () => {
  const userWallet = useSelector((state) => state?.auth?.userWallet);
  const Tokens = useSelector((state) => state?.wallet?.TokensListt?.sum);
  const myState = useSelector((state) => state?.wallet);
  // console.log("%c myState is", "font-size: 2rem", myState);
  const dispatch = useDispatch();

  const userWalletFiatBalance = (userWallet) => {
    return userWallet?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fiatBalance = userWalletFiatBalance(
    userWallet?.fiat_balances?.toFixed(2)
  );

  const dashboardTokens = (Tokens) => {
    return Tokens?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const tokens = dashboardTokens(Tokens);

  useEffect(() => {
    console.log("useeffect called");
    dispatch(getTokens());
  }, []);

  return (
    <>
      <div className="col-md-6">
        <div className="card bg-cr-1 text-white mb-4">
          <div className="card-body">
            <div className="d-inline-block">
              <p className="dashboard-cd-amot">${fiatBalance || 0}</p>
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
              <p className="dashboard-cd-amot">{tokens || 0}</p>
              <span className="dashboard-cd-blc">TOKENS</span>
            </div>
            <div className="dashboard-cd-icon d-inline-block float-right">
              <i className="fas fa-coins"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortReport;
