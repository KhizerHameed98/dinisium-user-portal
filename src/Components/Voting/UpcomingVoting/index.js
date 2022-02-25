import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

import config from "./../../../Constants/config";

import { connect } from "react-redux";
import { getUpcomingVoting } from "../../../Redux/actions/actions";

import UpCommingVotingItem from "./upComingVotingItem";
import TableWithDetailButton from "../../CommonComponents/TableWithDetailButton";
import { columns } from "./ColumnData";
import browserRoute from "../../../Constants/browserRoutes";

const UpcomingVoting = ({
  ito_id,
  getUpcomingVoting,
  voting: { upComingVoting },
}) => {
  //screen No. e.g; 1 or 2 or 3 etc
  const [screen, setScreen] = useState(1);
  //Total No Of Screens
  const [count, setCount] = useState(0);
  //No. of Items Per Screen

  const handleChange = (event, value) => {
    setScreen(value);
  };
  const countData = upComingVoting && upComingVoting.length;

  //noOfScreens
  useEffect(() => {
    if (countData % config.itemsPerScreen === 0) {
      setCount(Math.floor(countData / config.itemsPerScreen));
    } else {
      setCount(Math.floor(countData / config.itemsPerScreen) + 1);
    }
  }, [countData]);

  useEffect(() => {
    getUpcomingVoting({ ito_id });
  }, [ito_id]);

  return (
    <div className="card mb-4">
      <div className="card-body  p-0">
        <div className="table-responsive">
          <TableWithDetailButton
            data={upComingVoting}
            title={"UPCOMING"}
            columns={columns}
            isViewDetailBtn={true}
            viewDetailButtonName={"View Results"}
            RouteBtn={browserRoute.VOTING_DETAILS_BTN}
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
  getUpcomingVoting,
})(UpcomingVoting);
