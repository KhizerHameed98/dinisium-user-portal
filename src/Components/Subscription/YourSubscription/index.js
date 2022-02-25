import React, { useState, useEffect } from "react";
import config from "../../../Constants/config";
import Pagination from "@material-ui/lab/Pagination";
import Route from "../../../Constants/browserRoutes";

// import { data } from "../dummyData";
import { Link } from "react-router-dom";
import YourSubscriptionItem from "./YourSubscriptionItem";
import { getYourSubscriptions } from "../../../Redux/actions/actions";
import { connect } from "react-redux";
import { columns } from "./ColumnData";
import TableWithDetailButton from "../../CommonComponents/TableWithDetailButton";

const YourSubscription = ({
  subscription: {
    yourSubscriptions: { data },
  },
  getYourSubscriptions,
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
    getYourSubscriptions();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-body p-0">
        <div className="table-responsive">
          <TableWithDetailButton
            data={data}
            columns={columns}
            title={"Your subscriptions"}
            isViewIconlBtn={true}
            RouteForIconBtn={Route.ALL_YOUR_SUBSCRIPTION}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  subscription: state.subscription,
});

export default connect(mapStateToProps, { getYourSubscriptions })(
  YourSubscription
);
