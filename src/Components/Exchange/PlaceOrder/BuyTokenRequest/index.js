import React, { useEffect, useState, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { vanishData } from "../../../../Services/exchangeServices";
import BuyToken from "./buyToken";
import TokensList from "./TokensList";
import { getExchangeableTokens } from "../../../../Redux/actions/actions";
const BuyTokenRequest = ({
  exchange: {
    tokenData: { data },
    buyTokenSelected,
    buyTokenData,
    buyRequestSelectedSeriesData,
    buyRequestSeriesSelected,
  },
}) => {
  const dispatch = useDispatch();
  // const exchange = useSelector((state) => state?.exchange?.data);
  const [options, setOptions] = useState(null);
  useEffect(() => {
    dispatch(getExchangeableTokens(setOptions));
  }, []);
  // console.log("DATA-IS ===================> :", exchange);
  // console.log("%cDATA Options", "font-size:2rem", options);
  // console.log("tokenData now", buyTokenSelected, buyTokenData);
  const selectRef = useRef();
  // const [options, setOptions] = useState(tokenData);
  // console.log("%cDATA", "font-size:2rem", options);
  console.log("tokenData now", buyTokenSelected, buyTokenData);
  // const [options, setOptions] = useState(tokenData);
  // console.log("%cDATA", "font-size:2rem", options);
  useEffect(() => {
    dispatch(vanishData());
  }, []);
  return (
    <>
      {/* <div className="col-md-12"> */}

      <div className="row">
        <div className="col-md-9">
          {/* <div className="col-12"> 
            <h4 className="font-18">Select Token</h4> 
          </div> */}
          <TokensList selectRef={selectRef} option={options} />
        </div>

        <div className="col-md-3">
          <div className="card bg-cr-1 text-white mb-4">
            <div className="card-body">
              <div className="d-inline-block">
                <span className="dashboard-cd-blc">Price</span>
                <p className="dashboard-cd-amot">
                  {buyTokenSelected && buyTokenData && buyTokenData.price
                    ? "$ " +
                        parseFloat(
                          parseFloat(buyTokenData.price) +
                            parseFloat(
                              parseFloat(buyTokenData.price) *
                                parseFloat(buyTokenData.selling_spread / 100)
                            )
                        ).toFixed(2) || "$0"
                    : "$0"}
                </p>
                {/* </div> */}
                {/* <div className="d-inline-block float-right"> */}
                <span className="dashboard-cd-blc">Remaining Supply</span>
                <p className="dashboard-cd-amot">
                  {buyTokenData?.series_supply || "0"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <BuyToken selectRef={selectRef} setOptions={setOptions} />
      </div>
      {/* </div>  */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    exchange: state.exchange,
  };
};

export default connect(mapStateToProps)(BuyTokenRequest);
