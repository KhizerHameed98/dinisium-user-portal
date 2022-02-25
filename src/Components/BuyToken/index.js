import React, { useState, useEffect } from "react";
import Calculator from "./Calculator";
import PlaceOrder from "./PlaceOrder";
import TokenDetail from "./TokenDetail";
import TokensList from "./TokensList";
import { connect } from "react-redux";

const BuyToken = ({
  exchange: {
    tokenData: { data },
    tokenSelected,
  },
}) => {
  return (
    <div className="col-12 col-md-10 offset-md-1">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-12">
          <TokensList />
        </div>
        <div className="col-md-5">
          <TokenDetail />
          {/* <div className="card mb-4">
            <div className="card-body bg-lit-gr">
              <h4 className="font-18">Description</h4>
              <p className="font-14 text-justify">
                {tokenSelected && data
                  ? data.ito_description || "non"
                  : "NO TOKEN SELECTED YET..."}
              </p>
            </div>
          </div> */}
        </div>
        <div className="col-md-7">
          <Calculator />
        </div>
      </div>
      {/* <!-- end inner row --> */}

      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-5">
          {/* <TokenDetail /> */}
          <div className="card mb-4">
            <div className="card-body bg-lit-gr">
              <h4 className="font-18">Description</h4>
              <p className="font-14 text-justify">
                {tokenSelected && data
                  ? data.ito_description || "non"
                  : "NO TOKEN SELECTED YET..."}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-7">{/* <PlaceOrder /> */}</div>
      </div>
      {/* <!-- end inner row --> */}

      {/* <!-- Modal --> */}

      {/* <!--end Modal --> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  exchange: state.exchange,
});

export default connect(mapStateToProps, null)(BuyToken);
