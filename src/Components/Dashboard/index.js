import React, { useEffect } from "react";

import UserChart from "./Charts/userChart";
import ShortReport from "./ShortReport/shortReport";
import SubscriptionSection from "./SubscriptionSection/index";
import OnGoingITOSeries from "./OnGoingITOSeries/index";
import { useDispatch, useSelector } from "react-redux";
import { getTokenList } from "../../Services/walletService";
const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokenList());
  }, []);
  const state = useSelector((state) => state?.wallet?.TokensListt?.data);
  // console.log(state);
  return (
    <div className="col-12 col-md-10 offset-md-1">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-7">
          <div className="row">
            <ShortReport />
          </div>
          <div className="card mb-4">
            <div className="card-header ">AVAILABLE TOKENS</div>
            <div className="card-body">
              {/* <canvas id="myAreaChart" width="100%" height="80"></canvas> */}
              <UserChart chartData={state} />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          {/* <!-- subscription card --> */}
          <div className="card mb-4">
            <SubscriptionSection />
          </div>
          {/* <!-- end subscription card --> */}

          {/* <!-- ongoing card --> */}
          <div className="card mb-4">
            <OnGoingITOSeries />
          </div>
          {/* <!-- ongoing card --> */}
        </div>
      </div>
      {/* <!-- end inner row --> */}
    </div>
  );
};

export default Dashboard;
