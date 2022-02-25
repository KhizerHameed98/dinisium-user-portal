import React, { useState, useEffect } from "react";

import Pagination from "@material-ui/lab/Pagination";
import config from "../../../../Constants/config";

import FiatItem from "./fiatItem";

import { connect } from "react-redux";
import {
  getFiatTransactionList,
  getWalletDetails,
} from "../../../../Redux/actions/actions";
import TableWithDetailButton from "../../../CommonComponents/TableWithDetailButton";
import { columns } from "./ColumnData";

const FiatDetailList = ({
  getFiatTransactionList,
  getWalletDetails,
  wallet,
  auth,
}) => {
  const { fiatTransactionList, walletDetails } = wallet;

  useEffect(() => {
    const { userDetails } = auth;

    getFiatTransactionList(userDetails.user_id);
    getWalletDetails();
  }, []);

  //screen No. e.g; 1 or 2 or 3 etc
  const [screen, setScreen] = useState(1);
  //Total No Of Screens
  const [count, setCount] = useState(0);
  //No. of Items Per Screen

  const handleChange = (event, value) => {
    setScreen(value);
  };
  const countData = fiatTransactionList && fiatTransactionList.length;

  //noOfScreens
  useEffect(() => {
    if (countData % config.userPerScreen === 0) {
      setCount(Math.floor(countData / config.userPerScreen));
    } else {
      setCount(Math.floor(countData / config.userPerScreen) + 1);
    }
  }, [countData, config.userPerScreen]);

  return (
    <div className="col-12 col-md-10 offset-md-1">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-9">
          <div className="card">
            <div className="table-responsive">
              <TableWithDetailButton
                data={fiatTransactionList}
                columns={columns}
                title={"FIAT TRANSACTION DETAILS"}
              />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="row">
            <div className="col-md-12 mt-5">
              <div className="card bg-cr-1 text-white mb-4">
                <div className="card-body">
                  <div className="d-block">
                    <p className="dashboard-cd-amot font-30 fn-500">
                      {" "}
                      {walletDetails.fiat_balances || 0}$
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
      </div>
      {/* <!-- end inner row --> */}
    </div>
  );
};

const mpaStateToProps = (state) => {
  return {
    wallet: state.wallet,
    auth: state.auth,
  };
};

export default connect(mpaStateToProps, {
  getFiatTransactionList,
  getWalletDetails,
})(FiatDetailList);
