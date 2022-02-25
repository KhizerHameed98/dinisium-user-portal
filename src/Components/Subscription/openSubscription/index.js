import React, { useState, useEffect } from "react";
import config from "../../../Constants/config";
import Pagination from "@material-ui/lab/Pagination";
import Route from "../../../Constants/browserRoutes";
import { Link } from "react-router-dom";
import TableWithDetailButton from "../../CommonComponents/TableWithDetailButton";
import OpenSubscriptionItem from "./OpenSubscriptionItem";
// import { data } from "../dummyData";
import { getOpenSubscriptions } from "../../../Redux/actions/actions";
import { connect } from "react-redux";
import { columns } from "./ColumnData";
import browserRoute from "../../../Constants/browserRoutes";

const OpenSubscription = ({
  subscription: {
    openSubscriptions: { data },
  },
  getOpenSubscriptions,
}) => {
  //screen No. e.g; 1 or 2 or 3 etc
  const [screen, setScreen] = useState(1);
  //Total No Of Screens
  const [count, setCount] = useState(0);
  //No. of Items Per Screen
  const itemsPerScreen = config.itemsPerScreen;

  const handleChange = (event, value) => {
    setScreen(value);
  };
  const countData = data && data.length;

  //noOfScreens
  useEffect(() => {
    if (countData % itemsPerScreen === 0) {
      setCount(Math.floor(countData / itemsPerScreen));
    } else {
      setCount(Math.floor(countData / itemsPerScreen) + 1);
    }
  }, [countData, itemsPerScreen]);

  useEffect(() => {
    getOpenSubscriptions();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-body p-0">
        <div className="table-responsive">
          <TableWithDetailButton
            data={data}
            columns={columns}
            title={"Open subscriptions"}
            isViewDetailBtn={true}
            toSubscriptionParticipate={true}
            RouteBtn={browserRoute.SUBSCRIPTION_PARTICIPANT_BTN}
            // isViewIconBtn={true}
            RouteForIconBtn={Route.ALL_OPEN_SUBSCRIPTION}
            viewDetailButtonName={"Participate"}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  subscription: state.subscription,
});

export default connect(mapStateToProps, { getOpenSubscriptions })(
  OpenSubscription
);
