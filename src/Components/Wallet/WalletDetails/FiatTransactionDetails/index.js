import React, { useState, useEffect } from "react";

import Pagination from "@material-ui/lab/Pagination";
import config from "../../../../Constants/config";

import FiatItem from "../FiatTransactionDetails/fiatItem";

import { connect } from "react-redux";
import { getFiatTransactionList } from "../../../../Redux/actions/actions";
import TableWithDetailButton from "../../../CommonComponents/TableWithDetailButton";
import { columns } from "./ColumnData";

const FiatTransactionDetails = ({
  getFiatTransactionList,
  wallet: { fiatTransactionList },
  auth,
}) => {
  useEffect(() => {
    const { userDetails } = auth;

    getFiatTransactionList(userDetails.user_id);
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
    if (countData % config.itemsPerScreen === 0) {
      setCount(Math.floor(countData / config.itemsPerScreen));
    } else {
      setCount(Math.floor(countData / config.itemsPerScreen) + 1);
    }
  }, [countData, config.itemsPerScreen]);

  return (
    <div className="card">
      <div className="table-responsive">
        <TableWithDetailButton
          data={fiatTransactionList}
          columns={columns}
          title={"FIAT TRANSACTION DETAILS"}
        />
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
  getFiatTransactionList,
})(FiatTransactionDetails);
