import React, { useState, useEffect } from "react";
import { getSubscriptionList } from "../../../Redux/actions/actions";
import { connect } from "react-redux";
import SubscriptionItem from "./subscriptionItem";

const SubscriptionSection = ({
  subscriptionList: {
    subscriptionsList
  },
  getSubscriptionList,
}) => {
 
  useEffect(() => {
    getSubscriptionList();
  }, []);


  return (
    <>
      <div className="card-header bg-cr-2 text-white">Subscription</div>
      <div className="card-body subs-main-scroll p-0">
        {/* <!-- this will repeat --> */}

        {subscriptionsList &&
          subscriptionsList.map((item, index) => (
            <SubscriptionItem key={index} item={item} />
          ))}
        {(!subscriptionsList || subscriptionsList.length === 0) && (
          <h4 className="text-center mt-5">No Record Found ...</h4>
        )}

        {/* <!-- end --> */}
      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  subscriptionList: state.dashboard,
});

export default connect(mapStateToProps, { getSubscriptionList })(
  SubscriptionSection
);
