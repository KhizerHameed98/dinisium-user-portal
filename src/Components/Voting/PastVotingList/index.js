import React, {  useEffect } from 'react';
import { connect } from "react-redux";
import { getOnlyClosedVoting } from "../../../Redux/actions/actions";
import PastVotingDataItem from './pastVotingDataItem'
const PastVotingList = ({ getOnlyClosedVoting, voting: { closedVoting } }) => {
  useEffect(() => {
    getOnlyClosedVoting();
  }, []);

  return (
    <>
      <div className="col-12 col-md-10 offset-md-1">
        {/* <!-- inner row --> */}
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table
                    className="table hover dils-table fn-500"
                    style={{
                      width: "100%",
                      cellspacing: "0",
                      marginTop: "0",
                    }}
                    // width="100%"
                    // cellspacing="0"
                    // style="margin-top:0;"
                  >
                    <thead className="bg-cr-1 text-white">
                      <tr>
                        <th>Election Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {closedVoting &&
                        closedVoting.map((item, index) => (
                          <tr key={index}>
                            <PastVotingDataItem item={item} />
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {(!closedVoting || closedVoting.length === 0) && (
                    <h4 className="text-center">No Record Found ...</h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end inner row --> */}
      </div>
    </>
  );
};

const mpaStateToProps = (state) => {
  return {
    voting: state.voting,
  };
};

export default connect(mpaStateToProps, {
  getOnlyClosedVoting,
})(PastVotingList);
