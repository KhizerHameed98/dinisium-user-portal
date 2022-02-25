import React, { useState, useEffect } from "react";
import TokenItem from "./tokenItem";
import { columns } from "./ColumnData";
import Pagination from "@material-ui/lab/Pagination";
import config from "../../../../Constants/config";

import { connect } from "react-redux";
import { getTokenTransactions } from "../../../../Redux/actions/actions";
import TableWithDetailButton from "../../../CommonComponents/TableWithDetailButton";

const TokenTransactionDetails = ({
  getTokenTransactions,
  wallet: { tokenTransactionList },
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
    if (countData % config.itemsPerScreen === 0) {
      setCount(Math.floor(countData / config.itemsPerScreen));
    } else {
      setCount(Math.floor(countData / config.itemsPerScreen) + 1);
    }
  }, [countData, config.itemsPerScreen]);

  useEffect(() => {
    let id = userDetails && userDetails.id;
    getTokenTransactions({ id });
  }, []);

  return (
    <div className="card">
      <div className="table-responsive">
        {/* <TableWithDetailButton
          data={tokenTransactionList}
          columns={columns}
          title={"TOKEN TRANSACTION DETAIL"}
        /> */}
      </div>
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
})(TokenTransactionDetails);
