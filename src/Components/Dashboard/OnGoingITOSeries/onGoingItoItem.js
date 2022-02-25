import React from "react";
import Moment from "react-moment";

const OngoingItoItem = ({ item: { name, start_date, end_date } }) => {
  return (
    <>
      {/* <!-- this will repeat --> */}
      <div className="subs-main-crd">
        <div className="dash-sub-list-heading">
          <div className="on-going-pro-date">
            <h4 className="pro-heading-b">{name || ""}</h4>
            <p className="pro-date">
              <i className="far fa-calendar"></i>{" "}
              <Moment format="D MMM YYYY" withTitle>
                {start_date || " "}
              </Moment>{" "}
              -{" "}
              <Moment format="D MMM YYYY" withTitle>
                {end_date || " "}
              </Moment>
            </p>
          </div>
        </div>
      </div>
      {/* <!-- end --> */}
    </>
  );
};

export default OngoingItoItem;
