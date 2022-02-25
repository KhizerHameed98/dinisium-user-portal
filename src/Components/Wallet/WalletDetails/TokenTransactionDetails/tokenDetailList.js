import React, { useState, useEffect } from "react";

import Pagination from "@material-ui/lab/Pagination";
import config from "../../../../Constants/config";

import TokenListItem from "./tokenListItem";

import { connect } from "react-redux";
import { getTokenTransactions } from "../../../../Redux/actions/actions";
import TableWithDetailButton from "../../../CommonComponents/TableWithDetailButton";
import { columns } from "./ColumnData";

const TokenDetailList = ({
  getTokenTransactions,
  wallet: { tokenTransactionList, walletDetails },
  auth: { userDetails },
}) => {
  //screen No. e.g; 1 or 2 or 3 etc
  const [screen, setScreen] = useState(1);
  //Total No Of Screens
  const [count, setCount] = useState(0);
  //No. of Items Per Screen

  const handleChange = (event, value) => {
    setScreen(value);
  };
  const countData = tokenTransactionList && tokenTransactionList.length;

  //noOfScreens
  useEffect(() => {
    if (countData % config.userPerScreen === 0) {
      setCount(Math.floor(countData / config.userPerScreen));
    } else {
      setCount(Math.floor(countData / config.userPerScreen) + 1);
    }
  }, [countData, config.userPerScreen]);

  useEffect(() => {
    let id = userDetails && userDetails.id;
    getTokenTransactions({ id });
  }, []);
  return (
    <div className="col-12 col-md-10 offset-md-1">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-9">
          <div className="card">
            <div className="table-responsive">
              <TableWithDetailButton
                data={tokenTransactionList}
                columns={columns}
                title={"TOKEN TRANSACTION DETAIL"}
              />
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="row">
            <div className="col-md-12 mt-5">
              <div className="card bg-cr-2 text-white mb-4">
                <div className="card-body">
                  <div className="d-block">
                    <p className="dashboard-cd-amot font-30 fn-500">
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
    auth: state.auth,
  };
};

export default connect(mpaStateToProps, {
  getTokenTransactions,
})(TokenDetailList);
