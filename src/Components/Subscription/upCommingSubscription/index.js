import React, { useState, useEffect } from "react";
import config from "../../../Constants/config";
import Pagination from "@material-ui/lab/Pagination";
import Route from "../../../Constants/browserRoutes";
import { columns } from "./ColumnData";
import { data } from "../dummyData";
import { Link } from "react-router-dom";
import UpcommingSubscriptionItem from "./UpcmminngSubscriptionItem";
import { getUpcomingSubscriptions } from "../../../Redux/actions/actions";
import { connect } from "react-redux";
import TableWithDetailButton from "../../CommonComponents/TableWithDetailButton";

const UpcommingSubscription = ({
  subscription: {
    upcomingSubscriptions: { data },
  },
  getUpcomingSubscriptions,
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
    getUpcomingSubscriptions();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-body p-0">
        <div className="table-responsive">
          <TableWithDetailButton
            data={data}
            columns={columns}
            title={"Upcomming subscriptions"}
            isViewIconlBtn={true}
            RouteForIconBtn={Route.ALL_UPCOMMING_SUBSCRIPTION}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  subscription: state.subscription,
});

export default connect(mapStateToProps, { getUpcomingSubscriptions })(
  UpcommingSubscription
);
