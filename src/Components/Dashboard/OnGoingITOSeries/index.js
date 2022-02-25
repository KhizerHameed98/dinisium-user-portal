import React, { useState, useEffect } from "react";

import { getOnGoingIto } from "../../../Redux/actions/actions";
import { connect } from "react-redux";
import OngoingItoItem from "./onGoingItoItem";

const OnGoingITOSeries = ({
  getOnGoingIto,
  itoList: { onGoingItoSeriesList },
}) => {
  useEffect(() => {
    getOnGoingIto();
  }, []);

  return (
    <>
      {/* <div className="card-header font-weight-bold text-dr-blu"></div> */}
      <div className="card-header bg-cr-2 text-white"> OnGoing ITO Seriess</div>
      <div className="card-body subs-main-scroll p-0">
        {onGoingItoSeriesList &&
          onGoingItoSeriesList.map((item, index) => (
            <OngoingItoItem key={index} item={item} />
          ))}
        {(!onGoingItoSeriesList || onGoingItoSeriesList.length === 0) && (
          <h4 className="text-center mt-5">No Record Found ...</h4>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  itoList: state.dashboard,
});

export default connect(mapStateToProps, { getOnGoingIto })(OnGoingITOSeries);
