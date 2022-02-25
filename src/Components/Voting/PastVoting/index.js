import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

import config from "./../../../Constants/config";

import { connect } from "react-redux";
import { getClosedVoting } from "../../../Redux/actions/actions";
import PastVotingItem from "./pastVotingItem";
import { Link } from "react-router-dom";

import Route from "../../../Constants/browserRoutes";
import TableWithDetailButton from "../../CommonComponents/TableWithDetailButton";
import { columns } from "./ColumnData";
import browserRoute from "../../../Constants/browserRoutes";

const PastVoting = ({ ito_id, getClosedVoting, voting: { closedVoting } }) => {
  //screen No. e.g; 1 or 2 or 3 etc
  const [screen, setScreen] = useState(1);
  //Total No Of Screens
  const [count, setCount] = useState(0);
  //No. of Items Per Screen

  const handleChange = (event, value) => {
    setScreen(value);
  };
  const countData = closedVoting && closedVoting.length;

  //noOfScreens
  useEffect(() => {
    if (countData % config.itemsPerScreen === 0) {
      setCount(Math.floor(countData / config.itemsPerScreen));
    } else {
      setCount(Math.floor(countData / config.itemsPerScreen) + 1);
    }
  }, [countData]);

  useEffect(() => {
    getClosedVoting({ ito_id });
  }, [ito_id]);

  return (
    <div className="card mb-4">
      <div className="card-body p-0">
        <div className="table-responsive">
          <TableWithDetailButton
            data={closedVoting}
            columns={columns}
            title={"PAST"}
            isViewDetailBtn={true}
            viewDetailButtonName={"View Results"}
            RouteBtn={browserRoute.VOTING_DETAILS_BTN}
            isViewIconBtn={true}
            RouteForIconBtn={browserRoute.PAST_VOTING_LIST}
          />
        </div>
      </div>
    </div>
  );
};

const mpaStateToProps = (state) => {
  return {
    voting: state.voting,
  };
};

export default connect(mpaStateToProps, {
  getClosedVoting,
})(PastVoting);
