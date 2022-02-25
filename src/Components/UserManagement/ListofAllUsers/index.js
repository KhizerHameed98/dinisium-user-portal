import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import config from "./../../../Constants/config";

import { data } from "../dummyData";
import UserDataItem from "./userDataItem";

const UserManagement = () => {
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
  }, [countData, config.userPerScreen]);

  return (
    <>
      <div className="col-12 col-md-8 offset-md-2">
        {/* <!-- inner row --> */}
        <div className="row">
          <div className="col-md-12">
            <div>
              <h4 className="tbl-small-heading">LIST OF ALL USERS</h4>
            </div>

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
                    {data
                      .slice(
                        screen * config.userPerScreen - config.userPerScreen,
                        config.userPerScreen * screen
                      )
                      .map((item, index) => (
                        <tr key={index}>
                          <UserDataItem userData={item} />
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

export default UserManagement;
