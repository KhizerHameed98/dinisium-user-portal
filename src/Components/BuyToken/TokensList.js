import React, { useState, useEffect } from "react";
import Select from "react-select";
// import { data } from "../Exchange/PlaceOrder/data";
import {
  getExchangeableTokens,
  // getNonTradableTokens,
  isTokenSelected,
  getTokenDetailById,
  getOngoingSeriesById,
  isSeriesSelected,
} from "../../Redux/actions/actions";
import { connect, useDispatch } from "react-redux";
import { getNonTradableTokens } from "../../Services/exchangeServices";

const TokensList = ({
  exchange: {
    tokenData,
    nonTradableTokens,
    data,
    tokenSelected,
    seriesData,
    selectedSeriesData,
    seriesSelected,
  },
  // getNonTradableTokens,
  getExchangeableTokens,
  isTokenSelected,
  isSeriesSelected,
  getTokenDetailById,
  getOngoingSeriesById,
}) => {
  const [tokenDetail, setTokenDetail] = useState({
    tokenName: "",
    tokenSymbol: "",
    remainingSupply: 0,
  });

  // console.log("%c tokenDetail is ", 'font-size:2rem', tokenDetail);
  console.log("non", nonTradableTokens);

  console.log('tokenData' , tokenData);

  const [refresh, setRefresh] = useState(false);

  console.log('refresh status' , refresh);
  const dispatch = useDispatch()

  const onChangeSelect = (e) => {
    if (e) {
      setTokenDetail({
        tokenName: e.token_name,
        tokenSymbol: e.token_symbol,
        remainingSupply: e.series_remaining_supply,
      });
      isTokenSelected(true, {});
      getTokenDetailById(e.id);
      // console.log('TOKEN IS' , e);
      getOngoingSeriesById(e.ito_id, false); // Buy_Request(exchange) is false as it is Direct buying process(buy token)
    } else {
      isSeriesSelected(false, {});
      isTokenSelected(false, {});
    }
  };
  const onChangeSeriesSelect = (e) => {
    if (
      tokenData &&
      tokenData.data &&
      selectedSeriesData &&
      selectedSeriesData.ito_id &&
      tokenData.data.ito_id !== selectedSeriesData.ito_id
    ) {
      isSeriesSelected(false, {});
    } else if (e) {
      // setTokenDetail({
      //   tokenName: e.token_name,
      //   tokenSymbol: e.token_symbol,
      // });
      isSeriesSelected(true, e);
    } else {
      isSeriesSelected(false, {});
    }
  };

 

  useEffect(() => {
    console.log('useEffect again called');
    dispatch(getNonTradableTokens(refresh , setRefresh));
    // getNonTradableTokens(refresh , setRefresh);
  }, [refresh]);

  // useEffect(() => {
  //   console.log("useeffect called");
  //   // getNonTradableTokens(refresh , setRefresh);
  // },[refresh])


  return (
    <div className="row">
      <div className="col-md-9">
        <div className="row">
          <div className="col-md-12">
            <h4 className="font-18">Select Token</h4>
            <div className="d-inline-block" style={{ width: "100%" }}>
              <div className="form-group">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={[]}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  options={
                    nonTradableTokens && nonTradableTokens?.data?.length > 0
                      ? nonTradableTokens?.data
                      : []
                  }
                  onChange={onChangeSelect}
                />
              </div>
            </div>
          </div>
          {/* <div className="col-md-6">
            <h4 className="font-18">Select Series</h4>
            <div className="d-inline-block" style={{ width: "100%" }}>
              <div className="form-group">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  //   defaultValue={data[0]}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  options={
                    seriesData && seriesData.length > 0 ? seriesData : []
                  }
                  onChange={onChangeSeriesSelect}
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="col-md-3">
        <div className="card bg-cr-1 text-white mb-4">
          <div className="card-body">
            <div className="d-inline-block">
              <span className="dashboard-cd-blc">Price</span>
              <p className="dashboard-cd-amot">
                {tokenSelected && tokenData && tokenData.data
                  ? "$ " +
                      parseFloat(
                        parseFloat(tokenData?.data?.price) +
                          parseFloat(
                            parseFloat(tokenData?.data?.price) *
                              parseFloat(tokenData?.data.selling_spread / 100)
                          )
                      ).toFixed(2) || "$0"
                  : "$0"}
              </p>
            </div>
            <div className="d-inline-block float-right">
              <span className="dashboard-cd-blc">Supply</span>
              <p className="dashboard-cd-amot">
                {tokenSelected && tokenData && tokenData.data
                  ? tokenDetail?.remainingSupply || "0"
                  : "0"}
                {/* {
                   tokenSelected && tokenData && nonTradableTokens?.data ? nonTradableTokens?.data?.series_remaining_supply : "0"
                  } */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  exchange: state.exchange,
});

export default connect(mapStateToProps, {
  getExchangeableTokens,
  // getNonTradableTokens,
  isTokenSelected,
  getTokenDetailById,
  getOngoingSeriesById,
  isSeriesSelected,
})(TokensList);
