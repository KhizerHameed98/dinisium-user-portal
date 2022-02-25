import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import SellToken from "./SellToken";
import TokensList from "./TokensList";

const SellTokenRequest = ({
  exchange: {
    tokenData: { data },
    tokenSelected,
    myTokenData,
  },
}) => {
  const options = useSelector((state) => state?.exchange?.sellTokens?.options);
  const state = useSelector((state) => console.log("checking", state));

  console.log("mytokenData", myTokenData);
  return (
    <>
      {/* <div className="col-md-12"> */}
      <div className="row">
        <div className="col-md-9">
          <div className="col-lg-12">
            <h4 className="font-18">Select Token</h4>
          </div>
          <TokensList />
        </div>

        <div className="col-md-3">
          <div className="card bg-cr-1 text-white mb-4">
            <div className="card-body">
              <div className="d-inline-block">
                <span className="dashboard-cd-blc">Price</span>
                <p className="dashboard-cd-amot">
                  {tokenSelected && myTokenData?.price
                    ? "$ " +
                        parseFloat(
                          parseFloat(myTokenData?.price) -
                            parseFloat(
                              parseFloat(myTokenData?.price) *
                                parseFloat(myTokenData?.buying_spread / 100)
                            )
                        ).toFixed(2) || "$0"
                    : "$0"}
                </p>

                <span className="dashboard-cd-blc">Remainning Supply</span>
                <p className="dashboard-cd-amot">
                  {tokenSelected && myTokenData?.remainning_supply
                    ? myTokenData?.remainning_supply
                    : "0"}
                </p>
                {/* <p className="dashboard-cd-amot">
                {tokenSelected && myTokenData?.price
                    ? "$ " + myTokenData?.remainning_supply
                  </p> */}
              </div>
              {/* <div className="d-inline-block float-right">
                <span className="dashboard-cd-blc">Amount</span>
                <p className="dashboard-cd-amot">
                  {console.log(myTokenData)}
                  {tokenSelected && myTokenData.amount
                    ? myTokenData.amount || "0"
                    : "0"}
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <div className="col-md-12">
        <SellToken />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    exchange: state.exchange,
  };
};

export default connect(mapStateToProps)(SellTokenRequest);
