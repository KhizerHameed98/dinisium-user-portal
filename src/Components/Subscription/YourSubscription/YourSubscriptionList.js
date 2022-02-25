import React, { useState, useEffect } from "react";
import { data } from "../dummyData";
import UpcommingSubscriptionItem from "./YourSubscriptionItem";

import { getYourSubscriptions } from "../../../Redux/actions/actions";
import { connect } from "react-redux";
import TableWithDetailButton from "../../CommonComponents/TableWithDetailButton";
import { columns } from "./ColumnData";

const YourSubscriptionList = ({
  subscription: {
    yourSubscriptions: { data },
  },
  getYourSubscriptions,
}) => {
  useEffect(() => {
    getYourSubscriptions();
  }, []);

  return (
    <div className="col-12 col-md-10 offset-md-1">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-header text-white bg-cr-2">
              My Subscriptions
            </div>
            <div className="card-body srl-bar p-0">
              <div className="table-responsive">
                {" "}
                <TableWithDetailButton
                  data={data}
                  columns={columns}
                  title={"Your subscriptions"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end inner row --> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  subscription: state.subscription,
});

export default connect(mapStateToProps, { getYourSubscriptions })(
  YourSubscriptionList
);
