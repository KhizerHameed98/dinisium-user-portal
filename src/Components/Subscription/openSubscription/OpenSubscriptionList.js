import React, { useState, useEffect } from "react";

import OpenSubscriptionItem from "./OpenSubscriptionItem";

import { getOpenSubscriptions } from "../../../Redux/actions/actions";
import { connect } from "react-redux";
import TableWithDetailButton from "../../CommonComponents/TableWithDetailButton";
import { columns } from "./ColumnData";
import browserRoute from "../../../Constants/browserRoutes";

const OpenSubscriptionList = ({
  subscription: {
    openSubscriptions: { data },
  },
  getOpenSubscriptions,
}) => {
  useEffect(() => {
    getOpenSubscriptions();
  }, []);

  return (
    <div className="col-12 col-md-10 offset-md-1">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body srl-bar p-0">
              <div className="table-responsive">
                <TableWithDetailButton
                  data={data}
                  columns={columns}
                  title={"Open subscriptions"}
                  isViewDetailBtn={true}
                  viewDetailButtonName={"Participate"}
                  RouteBtn={browserRoute.SUBSCRIPTION_PARTICIPANT_BTN}
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

export default connect(mapStateToProps, { getOpenSubscriptions })(
  OpenSubscriptionList
);
