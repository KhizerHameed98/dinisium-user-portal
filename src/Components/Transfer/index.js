import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import config from "../../Constants/config";

import TransferItem from "./transferItem";
import { getUsersList } from "../../Redux/actions/actions";
import { connect } from "react-redux";
import { data } from "./../Wallet/dummyData";

const Transfer = ({ transfer: { usersList }, getUsersList }) => {
  //screen No. e.g; 1 or 2 or 3 etc
  const [screen, setScreen] = useState(1);
  //Total No Of Screens
  const [count, setCount] = useState(0);
  //No. of Items Per Screen

  const handleChange = (event, value) => {
    setScreen(value);
  };
  const countData = usersList && usersList.length;

  //noOfScreens
  useEffect(() => {
    if (countData % config.userPerScreen === 0) {
      setCount(Math.floor(countData / config.userPerScreen));
    } else {
      setCount(Math.floor(countData / config.userPerScreen) + 1);
    }
  }, [countData, config.userPerScreen]);

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <>
      <div className="col-12 col-md-8 offset-md-2">
        {/* <!-- inner row --> */}
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="table-responsive">
                <table
                  className="table hover dils-table fn-500"
                  // width="100%"
                  // cellspacing="0"
                  //   style="margin-top:0;"
                  style={{
                    marginTop: "0",
                    width: "100%",
                    cellspacing: "0",
                  }}
                >
                  <thead className="bg-cr-1 text-white">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Country</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {usersList &&
                      usersList.length > 0 &&
                      usersList
                        .slice(
                          screen * config.userPerScreen - config.userPerScreen,
                          config.userPerScreen * screen
                        )
                        .map((item, index) => (
                          <tr key={index}>
                            <TransferItem item={item} />
                          </tr>
                        ))}
                  </tbody>
                </table>
                {(!usersList || (usersList && usersList.length === 0)) && (
                  <h4 className="text-center">No Record Found</h4>
                )}
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

const mapStateToProps = (state) => ({
  transfer: state.transfer,
});

export default connect(mapStateToProps, { getUsersList })(Transfer);
