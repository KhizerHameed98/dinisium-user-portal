import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import config from "./../../../Constants/config";

import InvestmentDetailsItem from "../InvestmentDetails/investmentDetailsItem";
import { data } from "../dummyData";
import { Link } from "react-router-dom";
import Route from "./../../../Constants/browserRoutes";
import UserProfileInfo from "./userProfileInfo";

const UserDetails = ({ match }) => {
  //screen No. e.g; 1 or 2 or 3 etc
  const [screen, setScreen] = useState(1);
  //Total No Of Screens
  const [count, setCount] = useState(0);
  //No. of Items Per Screen

  const handleChange = (event, value) => {
    setScreen(value);
  };
  const countData = data && data.length;

  //noOfScreens
  useEffect(() => {
    if (countData % config.userPerScreen === 0) {
      setCount(Math.floor(countData / config.userPerScreen));
    } else {
      setCount(Math.floor(countData / config.userPerScreen) + 1);
    }
  }, [countData]);

  return (
    <>
      <div className="col-12 col-md-10 offset-md-1">
        {/* <!-- inner row --> */}
        <div className="row">
          <div className="col-sm-12">
            <UserProfileInfo />
          </div>

          <div className="col-sm-12">
            <div className="sec-heading py-3">
              <h4 className="tbl-small-heading mb-0">
                Invesment Details
                <Link
                  className="view-mor-gr-link float-right"
                  //   href="InvesmentDetails.html"
                  to={Route.INVESTMENT_DETAIL_BTN + `${match.params.id}`}
                >
                  Explore More
                </Link>
              </h4>
            </div>

            <div className="card">
              <div className="table-responsive">
                <table
                  className="table hover dils-table fn-500"
                  style={{
                    marginTop: "rig0ht",
                    width: "100%",
                    cellspacing: "0",
                  }}
                >
                  <thead className="bg-cr-1 text-white">
                    <tr>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Currency</th>
                      <th>Status</th>
                      <th>ITO Series</th>
                      <th>ITO Name</th>
                      <th>Time</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data
                      .slice(
                        screen * config.userPerScreen - config.userPerScreen,
                        config.userPerScreen * screen
                      )
                      .map((item, index) => (
                        <tr key={index}>
                          <InvestmentDetailsItem investmentDetailsData={item} />
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Pagination
                  count={count}
                  shape="rounded"
                  screen={screen}
                  onChange={handleChange}
                  showFirstButton
                  showLastButton
                />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end inner row --> */}
      </div>
    </>
  );
};

export default UserDetails;
