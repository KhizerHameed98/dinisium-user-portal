import React from "react";
import OpenSubscription from "./openSubscription";
import UpcommingSubscription from "./upCommingSubscription";
import YourSubscription from "./YourSubscription";

const Subscription = () => {
  return (
    <div className="col-12 col-md-10 offset-md-1">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-12">
          <OpenSubscription />
        </div>
        <div className="col-md-12">
          <UpcommingSubscription />
        </div>
        <div className="col-md-12">
          <YourSubscription />
        </div>
      </div>
      {/* <!-- end inner row --> */}
    </div>
  );
};

export default Subscription;
